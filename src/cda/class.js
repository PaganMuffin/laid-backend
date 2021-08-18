import { decode } from './decode';

const cda_quality = {
    'vl':'360p',
    'lq':'480p',
    'sd':'720p',
    'hd':'1080p'
}

export class get_video_info {
    title = null;
    id = null;
    duration = null;
    thumb = null;
    type = null;
    quality_data = null
    //quality = null;
    //url = null;

    element(element){
        const data = JSON.parse(element.getAttribute('player_data'))
        this.title = decodeURI(data['video']['title']).replaceAll(/%2C/gi, ',')
        this.id = data['video']['id']
        this.duration = data['video']['durationFull']
        this.thumb = data['video']['thumb']
        this.type = data['video']['type']
        this.quality_data = {q:data['video']['quality'], h: data['video']['height']}
        //this.url = decode(data['video']['file'])
        //this.quality = data['video']['height'] + 'p'
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
        console.log(data)
        this.url = decode(data['video']['file'])
    }
}

export class check_premiun {
    premium = false;
    element(el){
        this.premium = true;
    }
}