export const build_player = (data, url) => {
    return `
    <html>
        <head>
            <!-- META  -->
            <title>${data['data']['title']}</title>
            <meta property="og:title" content="${data['data']['title']}" />
            <meta property="og:url" content="${url}" />
            <meta property="og:image" content="${data['data']['thumb']}" />
            <meta property="og:type" content="video.movie" />
            <meta property="og:site_name" content="PaMu" />
            <style>
                body {
                    margin: 0 auto;
                    background-color: black;
                    width:100%;
                    height:100%;
                }
            </style>     
        </head>

        <body>
            <video id="player"></video>
        </body>

        <script src="https://cdn.plyr.io/3.6.8/plyr.js"></script>
        <link rel="stylesheet" href="https://cdn.plyr.io/3.6.8/plyr.css" />
        <script>
            const player = new Plyr('#player');
            player.source = {
                autoplay: true,
                type: 'video',
                title: '${data['data']['title']}',
                sources: ${JSON.stringify(data['data']['qualities'].map((x) => {return {'src':x['url'],'type':'video/mp4','size':x['resolution'].replace('p','')}}))},
                poster: '${data['data']['thumb']}',
            };
            player.on('qualitychange', (e) => {
                player.play()
            })
        </script>
        <style>
            .plyr__controls{
                position:fixed!important;
            }
            .plyr__video-wrapper{
                height: 100vh;
            }
        </style>
    </html>
`
}

const namespace = "NS_64dadcc7-59a6-4b78-9d0c-7eea040cdec3"

export const update_stats_global = async (key) => {
    const url = `https://api.countapi.xyz/hit/${namespace}/${key}`
    await fetch(url)
}

export const get_stats_global = async () => {
    const endpoints = [
        'cda-gen-player',
        'cda-gen-json',
        'db-read-player',
        'db-read-json',
        'db-entries',
    ]
    //console.log(endpoints.map(x => `https://api.countapi.xyz/get/${namespace}/${x}`))
    const p_arr = await Promise.all(endpoints.map(x => fetch(`https://api.countapi.xyz/get/${namespace}/${x}`)))
    const r_arr = await Promise.all(p_arr.map(async (x) => {
        const name = x.url.split('/').pop()
        return {
            'name':name,
            'value':(await x.json())['value'],
        }
    }))
    return r_arr
}