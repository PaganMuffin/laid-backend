import { Router,listen } from 'worktop';
import * as Cache from 'worktop/cache';


const API = new Router();


API.add('GET', '/cache', async (req, res) => {

    const url = req.url
    const isCache = (await Cache.lookup(null, url))
    console.log(isCache)
    if(isCache){
        res.send(200, isCache)
        res.end()
    }
    res.setHeader('Cache-Control', 'public, max-age=60');
    const obj = {
        'timestamp': new Date().getTime(),
        'colo':req.cf.colo,
        'country': req.cf.country
    }
    res.send(200,obj)
    console.log(Cache.isCacheable(res))

    const Cached = Cache.save(null, res, url)
    res.end()
})

listen(API.run)