import { Hono } from 'hono'
import { check_status, get_data, get_url } from './cda'
import {
    build_player,
    get_stats_global,
    send_stats,
    update_stats_global,
} from './functions'
import { get_playlist } from './functions/supabase'

const API = new Hono()

API.use('*', async (c, next) => {
    await next()
    const log = {
        pathname: new URL(c.req.url).pathname,
        method: c.req.method,
        status: c.res.status,
        timestamp: new Date().getTime(),
    }
})

API.get(`/player/:id`, async (c) => {
    console.log('START')
    const req = c.req
    const cda_id = req.param('id')
    const header = new Headers()
    header.set('Access-Control-Allow-Origin', '*')

    //CACHE CHECK
    let cache = caches.default
    const url = new URL(req.url)
    const url_to_check = url.origin + url.pathname
    const inCache = await cache.match(url_to_check)
    if (inCache) {
        console.log('FROM CACHE')

        c.executionCtx.waitUntil(
            send_stats(
                c,
                cda_id,
                inCache.status,
                'player',
                new URL(req.url).pathname,
                true,
            ),
        )
        return inCache
    }

    //GET DATA FROM CDA
    const data = await get_data(cda_id, c.env.API_URL)
    let html = null
    if (data['code'] === 200) {
        header.set('content-type', 'text/html; charset=UTF-8')
        header.set('Cache-Control', 'public, max-age=60')

        html = build_player(data, req['url'])
    } else {
        header.set('content-type', 'application/json')
    }

    //Build Response
    const res = new Response(html ? html : JSON.stringify(data['data']), {
        headers: header,
        status: data['code'],
    })

    //PUT IN CACHE IF 200
    if (data['code'] === 200) {
        console.log('PUT TO CACHE')
        const new_req = new Request(url_to_check, req)
        c.executionCtx.waitUntil(cache.put(new_req, res.clone()))
    }

    c.executionCtx.waitUntil(
        send_stats(
            c,
            cda_id,
            res.status,
            'player',
            new URL(req.url).pathname,
            false,
        ),
    )

    return res
})

API.get('/json/:id', async (c) => {
    console.log('START')
    const req = c.req
    const cda_id = req.param('id')
    const header = new Headers()
    header.set('Access-Control-Allow-Origin', '*')

    //CACHE CHECK
    let cache = caches.default
    const url = new URL(req.url)
    const url_to_check = url.origin + url.pathname
    const inCache = await cache.match(url_to_check)
    if (inCache) {
        console.log('FROM CACHE')
        c.executionCtx.waitUntil(
            send_stats(
                c,
                cda_id,
                inCache.status,
                'json',
                new URL(req.url).pathname,
                true,
            ),
        )
        return inCache
    }

    //GET DATA FROM CDA
    const data = await get_data(cda_id, c.env.API_URL)

    let res = new Response('', { status: data['code'], headers: header })

    data['timestamp'] = new Date().getTime()

    if (data['code'] === 200) {
        //Create response
        header.set('Cache-Control', 'public, max-age=60')

        res = new Response(JSON.stringify(data), {
            headers: header,
            status: data['code'],
        })

        console.log('PUT TO CACHE')
        const new_req = new Request(url_to_check, req)

        c.executionCtx.waitUntil(cache.put(new_req, res.clone()))
    }

    c.executionCtx.waitUntil(
        send_stats(
            c,
            cda_id,
            res.status,
            'player',
            new URL(req.url).pathname,
            false,
        ),
    )

    return res
})

API.get('/video/:p/:id/:res', async (c) => {
    const req = c.req
    let cache = caches.default
    const url = new URL(req.url)
    const url_to_check = url.origin + url.pathname
    const inCache = await cache.match(url_to_check)
    const partner = req.param('p') === '1' ? true : false
    const cda_id = req.param('id')
    const resolution = req.param('res')
    if (inCache) {
        console.log('FROM CACHE')

        c.executionCtx.waitUntil(
            send_stats(
                c,
                cda_id,
                inCache.status,
                'video',
                new URL(req.url).pathname,
                true,
                resolution,
            ),
        )

        return inCache
    }

    const cda_url = `https://ebd.cda.pl/620x395/${cda_id}${
        partner ? '/vfilm' : ''
    }`
    const video_url = await get_url(cda_url, resolution, cda_id)
    if (video_url === null) {
        return new Response('', { status: 500 })
    }

    const header = new Headers()

    header.set('Cache-Control', 'public, max-age=18000')
    header.set('location', video_url)
    header.set('Access-Control-Allow-Origin', '*')

    const res = new Response('', { headers: header, status: 301 })

    //PUT IN CACHE IF 200
    console.log('PUT TO CACHE')
    const new_req = new Request(url_to_check, req)
    c.executionCtx.waitUntil(cache.put(new_req, res.clone()))
    c.executionCtx.waitUntil(
        send_stats(
            c,
            cda_id,
            res.status,
            'video',
            new URL(req.url).pathname,
            false,
            resolution,
        ),
    )
    return res
})

//Dashboard

API.get('/playlist/:id', async (c) => {
    const req = c.req

    let cache = caches.default
    const url = new URL(req.url)
    const url_to_check = url.origin + url.pathname
    const inCache = await cache.match(url_to_check)
    if (inCache) {
        console.log('FROM CACHE')
        //if(inCache.status === 200) c.executionCtx.waitUntil(update_stats_global('cda-gen-json'))
        return inCache
    }
    const header = new Headers()
    header.set('Access-Control-Allow-Origin', '*')
    header.set('content-type', 'application/json')

    const id = req.param('id')
    if (!id) return new Response('', { status: 400 })

    const data = await get_playlist(id, c)

    const res = new Response(JSON.stringify(data), {
        status: data.code,
        headers: header,
    })

    return res
})

API.get(`/info/:id`, async (c) => {
    console.log('START')
    const req = c.req
    const cda_id = req.param('id')
    const header = new Headers()
    header.set('Access-Control-Allow-Origin', '*')

    //CACHE CHECK
    let cache = caches.default
    const url = new URL(req.url)
    const url_to_check = url.origin + url.pathname
    const inCache = await cache.match(url_to_check)
    if (inCache) {
        console.log('FROM CACHE')
        c.executionCtx.waitUntil(
            send_stats(
                c,
                cda_id,
                inCache.status,
                'info',
                new URL(req.url).pathname,
                true,
            ),
        )
        return inCache
    }

    //GET DATA FROM CDA
    const data = await get_data(cda_id, c.env.API_URL)

    let res = new Response('', { status: data['code'], headers: header })

    //data['timestamp'] = new Date().getTime()

    if (data['code'] === 200) {
        delete data['data']['qualities']
        //Create response
        header.set('Cache-Control', 'public, max-age=60')

        res = new Response(JSON.stringify(data), {
            headers: header,
            status: data['code'],
        })

        console.log('PUT TO CACHE')
        const new_req = new Request(url_to_check, req)
        c.executionCtx.waitUntil(cache.put(new_req, res.clone()))
    }
    c.executionCtx.waitUntil(
        send_stats(
            c,
            cda_id,
            res.status,
            'info',
            new URL(req.url).pathname,
            true,
        ),
    )

    return res
})

export default API
