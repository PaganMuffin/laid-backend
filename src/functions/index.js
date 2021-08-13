export const build_player = (data, url) => {
    return `
    <html>
        <head>
            <!-- META  -->
            <title>${data['data']['title']}</title>
            <meta property="og:title" content="${data['data']['title']}" />
            <meta property="og:url" content="${url}" />
            <meta property="og:image" content="${data['data']['thumb']}" />
            <meta property="og:type" content="website" />
            <style>
                body {
                    margin: 0 auto;
                    background-color: black;
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