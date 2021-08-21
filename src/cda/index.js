import { check_premiun, get_video_info, get_video_qualities, get_video_url } from "./class"


// prem 7933922d0
// partner 81132173d | atUDLsAsi
// 404 7231309a2
// GIT 8143319c8
// Jedna rozdzielczość 81332304a
const options = (key, method = 'GET', body = null) => {
    return {
        method: method,
        headers: {
            "User-Agent": 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36'
        },
        body: body,
        cf: {
            cacheTtl: 3600,
            cacheEverything: true,
            cacheKey: key,
        }
    }
}

export const check_resolutions = async (cda_id) => {
    const url = `https://ebd.cda.pl/620x395/${cda_id}`
    const f = await fetch(url, options(url))
    const new_url = f.url
        
    const info = new get_video_info()

    const is_premium = new check_premiun()
    await new HTMLRewriter()
        .on(`#mediaplayer${cda_id}`, info)
        .on(`.xs-txt`, is_premium)
        .transform(f)
        .text()
        
    info['code'] = f.status
    info['premium'] = is_premium['premium']
    info['url'] = new_url

    return {info}
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

export const get_url = async (data) => {

    const cda_url = 'https://www.cda.pl/'
    const body = JSON.stringify(
        {
            "jsonrpc":"2.0",
            "method":"videoGetLink",
            "params":[
                data['id'], //id
                data['quality'], //quality
                data['ts'], //ts
                data['key'], //key
                {}],
            "id":2}
    )
    const f = await fetch(`${cda_url}`,options(cda_url + `?quality=${data['quality']}&id=${data['id']}`,'POST',body))

    if(f.status !== 200){
        return null
    }
    
    return (await f.json()).result.resp
}
 
export const get_data = async (cda_id)  => {

    if(!cda_id){
        return {'code':400, 'msg':"Bad Request", 'data':null}
    }

    const d = await check_resolutions(cda_id)

    //const arr = d['arr']
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
    

    
    //delete info['quality_data']
    delete info['url']
    delete info['premium']
    delete info['id']
    delete info['type']
    delete info['code']
    delete info['hash']
    delete info['hash2']


    return {'code':200, 'msg':"ok", 'data':info}
}