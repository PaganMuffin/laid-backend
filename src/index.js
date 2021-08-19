import { Router } from 'itty-router'
import { check_status, get_data, get_url } from './cda';
import { build_player, get_stats_global, update_stats_global } from './functions';

const API = Router();

const origins = ['localhost:3000', 'localhost:8787', 'backend.pamu.ga', 'pamu.ga']

const CORS_Test = (req, event) => {
    try{
        const org = (new URL(req.headers.get('origin'))).host
        console.log(org)

    }
    catch(e){
        console.log(e['code'])
    }
    //return new Response("TEST", {status:400})
}

const show_request = (req) => {
    console.log(req.headers.get('cf-connecting-ip'), req.cf.colo, req.cf.country, req.cf.region, req.headers.get('user-agent'))
}

API.get(`/player/:id`, show_request, async (req, event) => {
    
    console.log("START")
    const cda_id = req.params.id
    const header = new Headers()

    //CACHE CHECK
    let cache = caches.default;
    const url = new URL(req.url)
    const url_to_check =  url.origin + url.pathname
    const inCache = await cache.match(url_to_check)
    if (inCache) {
        console.log("FROM CACHE")
        if(inCache.status === 200) event.waitUntil(update_stats_global('cda-gen-player'))
        return inCache
    }

    //GET DATA FROM CDA
    const data = await get_data(cda_id)
    let html = null
    if(data['code'] === 200){
        header.set('content-type','text/html; charset=UTF-8')
        header.set('Cache-Control', 'public, max-age=60');
        header.set('Access-Control-Allow-Origin','*')

        html = build_player(data, req['url'])
        event.waitUntil(update_stats_global('cda-gen-player'))
    } else {
        header.set('content-type','application/json')
    }

    //Build Response
    const res = new Response(
        html ? html : JSON.stringify(data['data']),
        {
            headers:header,
            status:data['code']
        })

    //PUT IN CACHE IF 200
    if(data['code'] === 200){
        console.log("PUT TO CACHE")
        const new_req = new Request(url_to_check, req)
        event.waitUntil(cache.put(new_req, res.clone()))
    }

    return res 
})


API.get('/json/:id', show_request, async (req, event) => {
    console.log("START")
    const cda_id = req.params.id
    const header = new Headers()

    //CACHE CHECK
    let cache = caches.default;
    const url = new URL(req.url)
    const url_to_check =  url.origin + url.pathname
    const inCache = await cache.match(url_to_check)
    if (inCache) {
        console.log("FROM CACHE")
        if(inCache.status === 200) event.waitUntil(update_stats_global('cda-gen-json'))
        return inCache
    }

    

    //GET DATA FROM CDA
    const data = await get_data(cda_id)
    data['timestamp'] = new Date().getTime()
    if(data['code'] === 200){
        header.set('Cache-Control', 'public, max-age=60')
        event.waitUntil(update_stats_global('cda-gen-json'))
    }
    

    //CREATE RESPONSE
    
    header.set('Access-Control-Allow-Origin','*')
    const res = new Response(JSON.stringify(data), {headers:header, status:data['code']})
    
    //PUT IN CACHE IF 200
    if(data['code'] === 200){
        console.log("PUT TO CACHE")
        const new_req = new Request(url_to_check, req)
        event.waitUntil(cache.put(new_req, res.clone()))
    }

    return res
})

API.get('/video/:p/:id/:res',show_request, async (req, event) => {

    //CACHE CHECK
    let cache = caches.default;
    const url = new URL(req.url)
    const url_to_check =  url.origin + url.pathname
    const inCache = await cache.match(url_to_check)
    if (inCache) {
        console.log("FROM CACHE")
        //if(inCache.status === 200) event.waitUntil(update_stats_global('cda-gen-json'))
        return inCache
    }

    const partner = req.params.p === '1' ? true : false
    const cda_id = req.params.id
    const resolution = req.params.res
    const cda_url = `https://ebd.cda.pl/620x395/${cda_id}${partner ? '/vfilm' : ''}`
    const video_url = await get_url(cda_url,resolution,cda_id)
    if(video_url === null){
        return new Response('', {status: 500})
    }

    const header = new Headers()

    header.set('Cache-Control', 'public, max-age=18000');
    header.set('location',video_url)
    header.set('Access-Control-Allow-Origin','*')

    const res = new Response('',{headers:header, status:301})

    //PUT IN CACHE IF 200
    console.log("PUT TO CACHE")
    const new_req = new Request(url_to_check, req)
    event.waitUntil(cache.put(new_req, res.clone()))
    //event.waitUntil(update_stats_global('cda-gen-json'))

    return res
})

API.get('/video/:p/:id',show_request, async (req, event) => {
    //CACHE CHECK
    let cache = caches.default;
    const url = new URL(req.url)
    const url_to_check =  url.origin + url.pathname
    const inCache = await cache.match(url_to_check)
    if (inCache) {
        console.log("FROM CACHE")
        //if(inCache.status === 200) event.waitUntil(update_stats_global('cda-gen-json'))
        return inCache
    }

    const partner = req.params.p === '1' ? true : false
    const cda_id = req.params.id

    const cda_url = `https://ebd.cda.pl/620x395/${cda_id}${partner ? '/vfilm' : ''}`
    const video_url = await get_url(cda_url,null,cda_id)
    if(video_url === null){
        return new Response('', {status: 500})
    }

    const header = new Headers()

    header.set('Cache-Control', 'public, max-age=18000');
    header.set('location',video_url)
    header.set('Access-Control-Allow-Origin','*')

    const res = new Response('',{headers:header, status:301})

    //PUT IN CACHE IF 200
    console.log("PUT TO CACHE")
    const new_req = new Request(url_to_check, req)
    event.waitUntil(cache.put(new_req, res.clone()))
    //event.waitUntil(update_stats_global('cda-gen-json'))
    
    return res
})

API.head('/video/:p/:id/:res',show_request, async (req, event) => {

    //CACHE CHECK
    let cache = caches.default;
    const url = new URL(req.url)
    const url_to_check =  url.origin + url.pathname
    const inCache = await cache.match(url_to_check)
    if (inCache) {
        console.log("FROM CACHE")
        //if(inCache.status === 200) event.waitUntil(update_stats_global('cda-gen-json'))
        return inCache
    }

    const partner = req.params.p === '1' ? true : false
    const cda_id = req.params.id
    const resolution = req.params.res
    const cda_url = `https://ebd.cda.pl/620x395/${cda_id}${partner ? '/vfilm' : ''}`
    const video_url = await get_url(cda_url,resolution,cda_id)
    if(video_url === null){
        return new Response('', {status: 500})
    }

    const header = new Headers()

    header.set('Cache-Control', 'public, max-age=18000');
    header.set('location',video_url)
    header.set('Access-Control-Allow-Origin','*')

    const res = new Response('',{headers:header, status:301})

    //PUT IN CACHE IF 200
    console.log("PUT TO CACHE")
    const new_req = new Request(url_to_check, req)
    event.waitUntil(cache.put(new_req, res.clone()))
    //event.waitUntil(update_stats_global('cda-gen-json'))

    return res
})

API.head('/video/:p/:id',show_request, async (req, event) => {
    //CACHE CHECK
    let cache = caches.default;
    const url = new URL(req.url)
    const url_to_check =  url.origin + url.pathname
    const inCache = await cache.match(url_to_check)
    if (inCache) {
        console.log("FROM CACHE")
        //if(inCache.status === 200) event.waitUntil(update_stats_global('cda-gen-json'))
        return inCache
    }

    const partner = req.params.p === '1' ? true : false
    const cda_id = req.params.id

    const cda_url = `https://ebd.cda.pl/620x395/${cda_id}${partner ? '/vfilm' : ''}`
    const video_url = await get_url(cda_url,null,cda_id)
    if(video_url === null){
        return new Response('', {status: 500})
    }

    const header = new Headers()

    header.set('Cache-Control', 'public, max-age=18000');
    header.set('location',video_url)
    header.set('Access-Control-Allow-Origin','*')

    const res = new Response('',{headers:header, status:301})

    //PUT IN CACHE IF 200
    console.log("PUT TO CACHE")
    const new_req = new Request(url_to_check, req)
    event.waitUntil(cache.put(new_req, res.clone()))
    //event.waitUntil(update_stats_global('cda-gen-json'))
    
    return res
})


API.get('/stats', async (req, res) => {
    return new Response(JSON.stringify(await get_stats_global()), {status:200})
})

API.all('*', () => new Response('Not Found.', { status: 404, headers: {
   'Access-Control-Allow-Origin':"*" 
} }))

addEventListener('fetch', event =>
  event.respondWith(API.handle(event.request, event))
)