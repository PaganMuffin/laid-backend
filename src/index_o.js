import { Router, compose } from 'worktop';
import * as Cache from 'worktop/cache';
import { createClient } from '@supabase/supabase-js'
import * as CORS from 'worktop/cors' 
import { check_status, get_data, get_url } from './cda';
import { build_player, get_stats_global, update_stats_global } from './functions';

// Fill you client credential here.
const db = createClient("https://ygggayldbzezqqsunqdd.supabase.co", 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyODQyMzg3NCwiZXhwIjoxOTQzOTk5ODc0fQ.8dFMJxk51smLydcuXwtmrwYztTHuRDqe6VKpzH-yY3g')
const API_VERSION_V1 = "v1"


const API = new Router();

API.prepare = (req, res) => { console.log(req)}


//https://www.cda.pl/video/7231309a2


//DB SECTION
//GET VIDEO WITH DB

API.add('GET', '/redirect', (req, res) => {
    res.setHeader('location','https://google.com')
    res.send(301)
    
})

API.add('GET', '/cache', (req, res) => {

    res.setHeader('Cache-Control', 'public, max-age=60');
    const obj = {
        'timestamp': new Date().getTime(),
        'colo':req.cf.colo,
        'country': req.cf.country
    }
    res.send(200, obj)
})

API.add('GET',`/${API_VERSION_V1}/add/:id`, async (req, res) => {


    const cda_id = req.params.id

    if(!cda_id){
        res.send(400, {'code':400, 'msg':"Bad Request", 'data':null})
        res.end()
    }

    const check = await check_status(cda_id)

    if(!check['exist']){
        res.send(404, {'code':404, 'msg':"Not Found", 'data':null})
        res.end()
    }

    if(check['premium']){
        res.send(418, {'code':418, 'msg':"Premium", 'data':null})
    }

    const obj = {
        'short':`${await (await fetch(`https://uuid.rocks/nanoid?len=9`)).text()}`,
        'cda_id':cda_id
    }

    const {data, error} = await db
        .from('urls')
        .insert(obj)
        

    if(error) throw error

    req.extend(
        update_stats_global('db-entries')
    )

    res.send(200, {'code':200, 'msg':"ok", 'data':obj})
})


API.add('GET',`/${API_VERSION_V1}/json/:id`, async (req, res) => {
    const short = req.params.id

    if(!short){
        res.send(400, {'code':400, 'msg':"Bad Request", 'data':null})
        res.end()
    }

    const {data, error} = await db
        .from('urls')
        .select('cda_id')
        .eq('short', short)
        .single()


    if(error && !data) {
        res.send(404, {'code':404, 'msg':"Not Found", 'data':null})
        res.end()
    }
    
    console.log(data)
    let d = await get_data(data['cda_id'])
    if(d['code'] === 200){
        req.extend(
            update_stats_global('db-read-json')
        )
    }
    res.send(d['code'], d)
})

API.add('GET',`/${API_VERSION_V1}/player/:id`, async (req, res) => {
    const short = req.params.id

    if(!short){
        res.send(400, {'code':400, 'msg':"Bad Request", 'data':null})
        res.end()
    }

    const {data, error} = await db
        .from('urls')
        .select('cda_id')
        .eq('short', short)
        .single()


    if(error && !data) {
        res.send(404, {'code':404, 'msg':"Not Found", 'data':null})
        res.end()
    }
    
    let d = await get_data(data['cda_id'])

    let html = null
    if(d['code'] === 200){
        console.log(await update_stats_views(short))
        res.setHeader('content-type','text/html; charset=UTF-8')
        html = build_player(d, req['url'])
        req.extend(
            update_stats_global('db-read-player')
        )
    }

    res.send(d['code'], html ? html : d['data'])
})

//GET VIDEO BY ID
API.add('GET',`/json/:id`, async (req, res) => {
    const data = await get_data(req.params.id)
    if(data['code'] === 200){
        req.extend(
            update_stats_global('cda-gen-json')
        )
    }
    data['timestamp'] = new Date().getTime()
    res.setHeader('Cache-Control', 'public, max-age=18000');
    res.send(data['code'], data)
    res.end()
})


API.add('GET',`/player/:id`, async (req, res) => {
    const data = await get_data(req.params.id)
    let html = null
    if(data['code'] === 200){
        res.setHeader('content-type','text/html; charset=UTF-8')
        html = build_player(data, req['url'])
        req.extend(
            update_stats_global('cda-gen-player')
        )
    }

    res.setHeader('Cache-Control', 'public, max-age=18000');
    res.send(data['code'], html ? html : data['data'])
    res.end()
})

// 
API.add('GET', '/video/:p/:id/:res/', async (req, res) => {
    const partner = req.params.p === '1' ? true : false
    const cda_id = req.params.id
    const resolution = req.params.res
    const url = `https://ebd.cda.pl/620x395/${cda_id}${partner ? '/vfilm' : ''}`
    const video_url = await get_url(url,resolution,cda_id)
    res.setHeader('Cache-Control', 'public, max-age=18000');
    res.setHeader('location',video_url)
    res.send(301)
    res.end()
})

API.add('GET', '/video/:p/:id', async (req, res) => {
    const partner = req.params.p === '1' ? true : false
    const cda_id = req.params.id
    const url = `https://ebd.cda.pl/620x395/${cda_id}${partner ? '/vfilm' : ''}`
    const video_url = await get_url(url,null,cda_id)
    res.setHeader('Cache-Control', 'public, max-age=18000');
    res.setHeader('location',video_url)
    res.send(301)
    res.end()
})



// inne

API.add('GET', '/stats', async (req, res) => {
    res.send(200, await get_stats_global())
    res.end()
})

Cache.listen(API.run)