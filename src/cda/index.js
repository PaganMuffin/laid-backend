import {
    check_premiun,
    get_nick,
    get_video_info,
    get_video_qualities,
    get_video_url,
    check_adult,
} from './class'

// prem 7933922d0
// partner 81132173d | atUDLsAsi
// 404 7231309a2
// GIT 8143319c8
// Jedna rozdzielczość 81332304a
const options = (key, method = 'GET', body = null) => {
    return {
        method: method,
        headers: {
            'User-Agent':
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36',
        },
        body: body,
        cf: {
            cacheTtl: 3600,
            cacheEverything: true,
            cacheKey: key,
        },
    }
}

export const check_resolutions = async (cda_id) => {
    let info = await parse(cda_id, false)
    if (info['is_adult']) {
        info = await parse(cda_id, true)
    }

    return info
}

export const check_status = async (cda_id) => {
    const url = `https://ebd.cda.pl/620x395/${cda_id}`
    const f = await fetch(url, options(url))
    const t = await f.text()
    if (f.status !== 200 || t.includes('Trwa konwersja')) {
        return {
            exist: false,
            partner: false,
            premium: false,
        }
    } else if (
        f.url.includes('vfilm') &&
        t.includes('Ten film jest dostępny dla użytkowników premium')
    ) {
        //To samo dla partnerów i premium
        return {
            exist: true,
            partner: false,
            premium: true,
        }
    } else if (f.url.includes('vfilm')) {
        return {
            exist: true,
            partner: true,
            premium: false,
        }
    } else {
        return {
            exist: true,
            partner: false,
            premium: false,
        }
    }
}

export const get_url = async (url, res, cda_id) => {
    const s = res ? `?wersja=${res}` : ''
    const f = await fetch(`${url}${s}`, options(`${url}${s}`))
    console.log(f.status)
    if (f.status !== 200) {
        return null
    }
    const video_url = new get_video_url()
    await new HTMLRewriter()
        .on(`#mediaplayer${cda_id}`, video_url)
        .transform(f)
        .text()

    return video_url['url']
}

export const get_data = async (cda_id) => {
    if (!cda_id) {
        return { code: 400, msg: 'Bad Request', data: null }
    }

    let info = await check_resolutions(cda_id)

    if (info['code'] === 404) {
        return { code: info['code'], msg: 'Not Found', data: null }
    }

    if (info['code'] === 410) {
        return { code: info['code'], msg: 'Copyright', data: null }
    }

    if (info['code'] !== 200) {
        return { code: info['code'], msg: 'Blabla', data: null }
    }
    if (info['premium']) {
        return { code: 400, msg: 'Premium', data: null }
    }

    //delete info['quality_data']
    delete info['url']
    delete info['premium']
    //delete info['id']
    delete info['type']
    delete info['code']
    delete info['hash']
    delete info['hash2']

    return { code: 200, msg: 'ok', data: info }
}

const parse = async (cda_id, adult) => {
    const url = `https://www.cda.pl/video/${cda_id}`
    let f = null

    if (adult) {
        const fd = new FormData()
        fd.append('age_confirm', '')
        f = await fetch(url, options(url, 'POST', fd))
    } else {
        f = await fetch(url, options(url))
    }

    const new_url = f.url

    let info = new get_video_info()

    const is_premium = new check_premiun()
    const nick = new get_nick()
    const is_adult = new check_adult()

    await new HTMLRewriter()
        .on(`#mediaplayer${cda_id}`, info)
        .on(`.xs-txt`, is_premium)
        .on(`#filmy_spolecznosc2 > div > div > div.boxAdult > div`, is_adult)
        .on(
            `#leftCol > div:nth-child(2) > div.DescrVID > div.DescrVID-left > div > div > div > div:nth-child(1) > a > span > span`,
            nick,
        )
        .transform(f)
        .text()
    info = JSON.parse(JSON.stringify(info))
    info['code'] = f.status
    info['author'] = nick['nick']
    info['premium'] = is_premium['premium']
    info['url'] = new_url
    info['is_adult'] = is_adult['adult']

    return info
}
