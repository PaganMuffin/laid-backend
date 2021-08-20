import { decode } from './decode';
import {compressToEncodedURIComponent} from 'lz-string';

const cda_quality = {
    'vl':'360p',
    'lq':'480p',
    'sd':'720p',
    'hd':'1080p'
}

//const GEN_URL = 'https://backend.pamu.ga'
const GEN_URL = 'http://localhost:8787'

export class get_video_info {
    title = null;
    id = null;
    duration = null;
    thumb = null;
    type = null;
    hash = null;
    hash2 = null;
    qualities = null;


    element(element){
        const data = JSON.parse(element.getAttribute('player_data'))
        console.log(data)
        this.title = decodeURI(data['video']['title']).replaceAll(/%2C/gi, ',')
        this.id = data['video']['id']
        this.duration = data['video']['durationFull']
        this.hash = data['video']['hash']
        this.hash2 = data['video']['hash2']
        this.thumb = data['video']['thumb']
        this.type = data['video']['type']
        this.qualities = Object.entries(data['video']['qualities']).map((x) => {
            
            const data_string = JSON.stringify({
                'id':this.id,
                'quality':x[1],
                'ts':data['video']['ts'],
                'key':this.hash2,
                'partner':this.partner === 'partner' ? 1 : 0
            })
        

            const base = (compressToEncodedURIComponent(data_string))
            return {
                'quality':x[1],
                'resolution': x[0],
                'url':`${GEN_URL}/video/${base}`
            }
        })

    }
}

export class get_video_qualities {
    arr = []

    element(element){
        const q = element.getAttribute('data-quality')
        this.arr.push({
            'quality': q,
            'resolution': cda_quality[q]
        })
    }
}


export class get_video_url {
    url = null;

    element(element){
        const data = JSON.parse(element.getAttribute('player_data'))
        this.url = decode(data['video']['file'])
    }
}

export class check_premiun {
    premium = false;
    element(el){
        this.premium = true;
    }
}