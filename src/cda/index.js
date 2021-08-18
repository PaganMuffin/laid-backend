import { check_premiun, get_video_info, get_video_qualities, get_video_url } from "./class"


// prem 7933922d0
// partner 81132173d | atUDLsAsi
// 404 7231309a2
// GIT 8143319c8
// Jedna rozdzielczość 81332304a
const options = (key) => {
    return { method: 'GET',
        headers: {
            "User-Agent": 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36'
        },
        cf: {
            cacheTtl: 3600,
            cacheEverything: true,
            cacheKey: key,
        }
    }
}

//const GEN_URL = 'https://backend.pamu.ga'
const GEN_URL = 'http://localhost:8787'

export const check_resolutions = async (cda_id) => {
    const url = `https://ebd.cda.pl/620x395/${cda_id}`
    const f = await fetch(url, options(url))
    const new_url = f.url
        
    const info = new get_video_info()
    const arr = new get_video_qualities()
    const is_premium = new check_premiun()
    await new HTMLRewriter()
        .on(`.quality-btn`, arr)
        .on(`#mediaplayer${cda_id}`, info)
        .on(`.xs-txt`, is_premium)
        .transform(f)
        .text()
        
    info['code'] = f.status
    info['premium'] = is_premium['premium']
    info['url'] = new_url

    return {info, arr:arr['arr']}
}

export const check_status = async (cda_id) => {
    const url = `https://ebd.cda.pl/620x395/${cda_id}`
    const f = await fetch(url, options(url))
    const t = await f.text()
    if(f.status !== 200 || t.includes('Trwa konwersja')){
        return {
            'exist':false,
            'partner':false,
            'premium':false,
        }
    } else if(f.url.includes('vfilm') && t.includes('Ten film jest dostępny dla użytkowników premium')){ //To samo dla partnerów i premium 
        return {
            'exist':true,
            'partner':false,
            'premium':true
        }
    }
    else if (f.url.includes('vfilm')){
        return {
            'exist':true,
            'partner':true,
            'premium':false
        }
    } else {
        return {
            'exist':true,
            'partner':false,
            'premium':false
        }
    }
}

export const get_url = async (url, res, cda_id) => {

    const s = res ? `?wersja=${res}` : ''
    const f = await fetch(`${url}${s}`,options(`${url}${s}`))
    console.log(f.status)
    if(f.status !== 200){
        return null
    }
    const video_url  = new get_video_url() 
    await new HTMLRewriter()
        .on(`#mediaplayer${cda_id}`, video_url)
        .transform(f)
        .text()
    
    return video_url['url']
}
 
export const get_data = async (cda_id)  => {

    if(!cda_id){
        return {'code':400, 'msg':"Bad Request", 'data':null}
    }

    const d = await check_resolutions(cda_id)

    const arr = d['arr']
    let info = d['info']

    if (info['code'] === 404){
        return {'code':info['code'], 'msg':"Not Found", 'data':null}
    }

    if (info['code'] !== 200){
        return {'code':info['code'], 'msg':"Blabla", 'data':null}
    }
    if (info['premium']){
        return {'code':400, 'msg':"Premium", 'data':null}
    }

    let q = []
    
    if (info['title'] && info['duration'] && arr.length === 0){
        q = [{
                'quality':info['quality_data']['q'],
                'resolution': info['quality_data']['h'] + 'p',
                'url':`${GEN_URL}/video/${info['type'] === 'partner' ? '1' : '0'}/${cda_id}/`
                //'url':await get_url(info['url'],null, cda_id)
            }]
        delete info['quality_data']
    } else {
        q = await Promise.all(arr.map(async (x) => {
            return {
                'quality':x['quality'],
                'resolution': x['resolution'],
                'url':`${GEN_URL}/video/${info['type'] === 'partner' ? '1' : '0'}/${cda_id}/${x['resolution']}`
                //'url':await get_url(info['url'], x['resolution'], cda_id)
            }
        }))

    }


    delete info['url']
    delete info['premium']
    delete info['id']
    delete info['type']
    delete info['code']

    info['qualities'] = q
    return {'code':200, 'msg':"ok", 'data':info}
}