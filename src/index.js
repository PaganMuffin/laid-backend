import { Router, listen } from 'worktop';
import { createClient } from '@supabase/supabase-js'
import * as CORS from 'worktop/cors' 
import { check_resolutions, get_url, check_status, get_data } from './cda';
import { build_player } from './functions';

// Fill you client credential here.
const db = createClient("https://ygggayldbzezqqsunqdd.supabase.co", 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyODQyMzg3NCwiZXhwIjoxOTQzOTk5ODc0fQ.8dFMJxk51smLydcuXwtmrwYztTHuRDqe6VKpzH-yY3g')
const API_VERSION_V1 = "v1"


const API = new Router();

API.prepare = CORS.preflight({
    origin:'*'
})

//https://www.cda.pl/video/7231309a2


//DB SECTION
//GET VIDEO WITH DB

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
    
    let d = await get_data(data['cda_id'])

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
        res.setHeader('content-type','text/html; charset=UTF-8')
        html = build_player(d, req['url'])
    }

    res.send(d['code'], html ? html : d['data'])
})

//GET VIDEO BY ID
API.add('GET',`/json/:id`, async (req, res) => {
    const data = await get_data(req.params.id)

    res.send(data['code'], data)
})


API.add('GET',`/player/:id`, async (req, res) => {
    const data = await get_data(req.params.id)
    let html = null
    if(data['code'] === 200){
        res.setHeader('content-type','text/html; charset=UTF-8')
        html = build_player(data, req['url'])
    }

    
    res.send(data['code'], html ? html : data['data'])
})


listen(API.run)
