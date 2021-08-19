(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __reExport = (target, module, desc) => {
    if (module && typeof module === "object" || typeof module === "function") {
      for (let key of __getOwnPropNames(module))
        if (!__hasOwnProp.call(target, key) && key !== "default")
          __defProp(target, key, { get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable });
    }
    return target;
  };
  var __toModule = (module) => {
    return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", module && module.__esModule && "default" in module ? { get: () => module.default, enumerable: true } : { value: module, enumerable: true })), module);
  };

  // node_modules/itty-router/dist/itty-router.min.js
  var require_itty_router_min = __commonJS({
    "node_modules/itty-router/dist/itty-router.min.js"(exports, module) {
      module.exports = { Router: ({ base: t = "", routes: l = [] } = {}) => ({ __proto__: new Proxy({}, { get: (e, a, o) => (e2, ...r) => l.push([a.toUpperCase(), RegExp(`^${(t + e2).replace(/(\/?)\*/g, "($1.*)?").replace(/\/$/, "").replace(/:(\w+)(\?)?(\.)?/g, "$2(?<$1>[^/]+)$2$3").replace(/\.(?=[\w(])/, "\\.")}/*$`), r]) && o }), routes: l, async handle(e, ...r) {
        let a, o, t2 = new URL(e.url);
        e.query = Object.fromEntries(t2.searchParams);
        for (var [p, s, u] of l)
          if ((p === e.method || p === "ALL") && (o = t2.pathname.match(s))) {
            e.params = o.groups;
            for (var c2 of u)
              if ((a = await c2(e.proxy || e, ...r)) !== void 0)
                return a;
          }
      } }) };
    }
  });

  // src/index.js
  var import_itty_router = __toModule(require_itty_router_min());

  // src/cda/decode.js
  var decode = (a) => {
    String.fromCharCode(("Z" >= a ? 11 : 344) >= (c = a.charCodeAt(0) + 22) ? c : c - 11);
    a = a.replace("_XDDD", "");
    a = a.replace("_CDA", "");
    a = a.replace("_ADC", "");
    a = a.replace("_CXD", "");
    a = a.replace("_QWE", "");
    a = a.replace("_Q5", "");
    a = a.replace("_IKSDE", "");
    a = K(a);
    a = ba(a);
    return a;
  };
  var K = (a) => {
    return a.replace(/[a-zA-Z]/g, function(a2) {
      return String.fromCharCode(("Z" >= a2 ? 90 : 122) >= (a2 = a2.charCodeAt(0) + 13) ? a2 : a2 - 26);
    });
  };
  var ba = (a) => {
    a = K(a);
    a = ca(a);
    a = aa(a);
    return a;
  };
  var aa = (a) => {
    String.fromCharCode(("Z" >= a ? 82 : 132) >= (c = a.charCodeAt(0) + 11) ? c : c - 55);
    return L(a);
  };
  var L = (a) => {
    for (var b = [], e = 0; e < a.length; e++) {
      var f = a.charCodeAt(e);
      b[e] = 33 <= f && 126 >= f ? String.fromCharCode(33 + (f + 14) % 94) : String.fromCharCode(f);
    }
    return da(b.join(""));
  };
  var ca = (a) => {
    return decodeURIComponent(a);
  };
  var da = (a) => {
    a = a.replace(".cda.mp4", "");
    a = a.replace(".2cda.pl", ".cda.pl");
    a = a.replace(".3cda.pl", ".cda.pl");
    return -1 < a.indexOf("/upstream") ? (a = a.replace("/upstream", ".mp4/upstream"), "https://" + a) : "https://" + a + ".mp4";
  };

  // src/cda/class.js
  var cda_quality = {
    "vl": "360p",
    "lq": "480p",
    "sd": "720p",
    "hd": "1080p"
  };
  var get_video_info = class {
    title = null;
    id = null;
    duration = null;
    thumb = null;
    type = null;
    quality_data = null;
    element(element) {
      const data = JSON.parse(element.getAttribute("player_data"));
      this.title = decodeURI(data["video"]["title"]).replaceAll(/%2C/gi, ",");
      this.id = data["video"]["id"];
      this.duration = data["video"]["durationFull"];
      this.thumb = data["video"]["thumb"];
      this.type = data["video"]["type"];
      this.quality_data = { q: data["video"]["quality"], h: data["video"]["height"] };
    }
  };
  var get_video_qualities = class {
    arr = [];
    element(element) {
      const q = element.getAttribute("data-quality");
      this.arr.push({
        "quality": q,
        "resolution": cda_quality[q]
      });
    }
  };
  var get_video_url = class {
    url = null;
    element(element) {
      const data = JSON.parse(element.getAttribute("player_data"));
      this.url = decode(data["video"]["file"]);
    }
  };
  var check_premiun = class {
    premium = false;
    element(el) {
      this.premium = true;
    }
  };

  // src/cda/index.js
  var options = (key) => {
    return {
      method: "GET",
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36"
      },
      cf: {
        cacheTtl: 3600,
        cacheEverything: true,
        cacheKey: key
      }
    };
  };
  var GEN_URL = "https://backend.pamu.ga";
  var check_resolutions = async (cda_id) => {
    const url = `https://ebd.cda.pl/620x395/${cda_id}`;
    const f = await fetch(url, options(url));
    const new_url = f.url;
    const info = new get_video_info();
    const arr = new get_video_qualities();
    const is_premium = new check_premiun();
    await new HTMLRewriter().on(`.quality-btn`, arr).on(`#mediaplayer${cda_id}`, info).on(`.xs-txt`, is_premium).transform(f).text();
    info["code"] = f.status;
    info["premium"] = is_premium["premium"];
    info["url"] = new_url;
    return { info, arr: arr["arr"] };
  };
  var get_url = async (url, res, cda_id) => {
    const s = res ? `?wersja=${res}` : "";
    const f = await fetch(`${url}${s}`, options(`${url}${s}`));
    console.log(f.status);
    if (f.status !== 200) {
      return null;
    }
    const video_url = new get_video_url();
    await new HTMLRewriter().on(`#mediaplayer${cda_id}`, video_url).transform(f).text();
    return video_url["url"];
  };
  var get_data = async (cda_id) => {
    if (!cda_id) {
      return { "code": 400, "msg": "Bad Request", "data": null };
    }
    const d = await check_resolutions(cda_id);
    const arr = d["arr"];
    let info = d["info"];
    if (info["code"] === 404) {
      return { "code": info["code"], "msg": "Not Found", "data": null };
    }
    if (info["code"] !== 200) {
      return { "code": info["code"], "msg": "Blabla", "data": null };
    }
    if (info["premium"]) {
      return { "code": 400, "msg": "Premium", "data": null };
    }
    let q = [];
    if (info["title"] && info["duration"] && arr.length === 0) {
      q = [{
        "quality": info["quality_data"]["q"],
        "resolution": info["quality_data"]["h"] + "p",
        "url": `${GEN_URL}/video/${info["type"] === "partner" ? "1" : "0"}/${cda_id}/`
      }];
    } else {
      q = await Promise.all(arr.map(async (x) => {
        return {
          "quality": x["quality"],
          "resolution": x["resolution"],
          "url": `${GEN_URL}/video/${info["type"] === "partner" ? "1" : "0"}/${cda_id}/${x["resolution"]}`
        };
      }));
    }
    delete info["quality_data"];
    delete info["url"];
    delete info["premium"];
    delete info["id"];
    delete info["type"];
    delete info["code"];
    info["qualities"] = q;
    return { "code": 200, "msg": "ok", "data": info };
  };

  // src/functions/index.js
  var build_player = (data, url) => {
    return `
    <html>
        <head>
            <!-- META  -->
            <title>${data["data"]["title"]}</title>
            <meta property="og:title" content="${data["data"]["title"]}" />
            <meta property="og:url" content="${url}" />
            <meta property="og:image" content="${data["data"]["thumb"]}" />
            <meta property="og:type" content="video.movie" />
            <link rel="icon" type="image/png" href="https://pamu.ga/android-icon-144x144.png"/>
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

        <script src="https://cdn.plyr.io/3.6.8/plyr.js"><\/script>
        <link rel="stylesheet" href="https://cdn.plyr.io/3.6.8/plyr.css" />
        <script>
            const player = new Plyr('#player');
            player.source = {
                autoplay: true,
                type: 'video',
                title: '${data["data"]["title"]}',
                sources: ${JSON.stringify(data["data"]["qualities"].map((x) => {
      return { "src": x["url"], "type": "video/mp4", "size": x["resolution"].replace("p", "") };
    }))},
                poster: '${data["data"]["thumb"]}',
            };
            player.on('qualitychange', (e) => {
                player.play()
            })
        <\/script>
        <style>
            .plyr__controls{
                position:fixed!important;
            }
            .plyr__video-wrapper{
                height: 100vh;
            }
        </style>
    </html>
`;
  };
  var namespace = "NS_64dadcc7-59a6-4b78-9d0c-7eea040cdec3";
  var update_stats_global = async (key) => {
    const url = `https://api.countapi.xyz/hit/${namespace}/${key}`;
    await fetch(url);
  };
  var get_stats_global = async () => {
    const endpoints = [
      "cda-gen-player",
      "cda-gen-json",
      "db-read-player",
      "db-read-json",
      "db-entries"
    ];
    const p_arr = await Promise.all(endpoints.map((x) => fetch(`https://api.countapi.xyz/get/${namespace}/${x}`)));
    const r_arr = await Promise.all(p_arr.map(async (x) => {
      const name = x.url.split("/").pop();
      return {
        "name": name,
        "value": (await x.json())["value"]
      };
    }));
    return r_arr;
  };

  // src/index.js
  var API = (0, import_itty_router.Router)();
  var show_request = (req) => {
    console.log(req.headers.get("cf-connecting-ip"), req.cf.colo, req.cf.country, req.cf.region, req.headers.get("user-agent"));
  };
  API.get(`/player/:id`, show_request, async (req, event) => {
    console.log("START");
    const cda_id = req.params.id;
    const header = new Headers();
    let cache = caches.default;
    const url = new URL(req.url);
    const url_to_check = url.origin + url.pathname;
    const inCache = await cache.match(url_to_check);
    if (inCache) {
      console.log("FROM CACHE");
      if (inCache.status === 200)
        event.waitUntil(update_stats_global("cda-gen-player"));
      return inCache;
    }
    const data = await get_data(cda_id);
    let html = null;
    if (data["code"] === 200) {
      header.set("content-type", "text/html; charset=UTF-8");
      header.set("Cache-Control", "public, max-age=60");
      header.set("Access-Control-Allow-Origin", "*");
      html = build_player(data, req["url"]);
      event.waitUntil(update_stats_global("cda-gen-player"));
    } else {
      header.set("content-type", "application/json");
    }
    const res = new Response(html ? html : JSON.stringify(data["data"]), {
      headers: header,
      status: data["code"]
    });
    if (data["code"] === 200) {
      console.log("PUT TO CACHE");
      const new_req = new Request(url_to_check, req);
      event.waitUntil(cache.put(new_req, res.clone()));
    }
    return res;
  });
  API.get("/json/:id", show_request, async (req, event) => {
    console.log("START");
    const cda_id = req.params.id;
    const header = new Headers();
    let cache = caches.default;
    const url = new URL(req.url);
    const url_to_check = url.origin + url.pathname;
    const inCache = await cache.match(url_to_check);
    if (inCache) {
      console.log("FROM CACHE");
      if (inCache.status === 200)
        event.waitUntil(update_stats_global("cda-gen-json"));
      return inCache;
    }
    const data = await get_data(cda_id);
    data["timestamp"] = new Date().getTime();
    if (data["code"] === 200) {
      header.set("Cache-Control", "public, max-age=60");
      event.waitUntil(update_stats_global("cda-gen-json"));
    }
    header.set("Access-Control-Allow-Origin", "*");
    const res = new Response(JSON.stringify(data), { headers: header, status: data["code"] });
    if (data["code"] === 200) {
      console.log("PUT TO CACHE");
      const new_req = new Request(url_to_check, req);
      event.waitUntil(cache.put(new_req, res.clone()));
    }
    return res;
  });
  API.get("/video/:p/:id/:res", show_request, async (req, event) => {
    let cache = caches.default;
    const url = new URL(req.url);
    const url_to_check = url.origin + url.pathname;
    const inCache = await cache.match(url_to_check);
    if (inCache) {
      console.log("FROM CACHE");
      return inCache;
    }
    const partner = req.params.p === "1" ? true : false;
    const cda_id = req.params.id;
    const resolution = req.params.res;
    const cda_url = `https://ebd.cda.pl/620x395/${cda_id}${partner ? "/vfilm" : ""}`;
    const video_url = await get_url(cda_url, resolution, cda_id);
    if (video_url === null) {
      return new Response("", { status: 500 });
    }
    const header = new Headers();
    header.set("Cache-Control", "public, max-age=18000");
    header.set("location", video_url);
    header.set("Access-Control-Allow-Origin", "*");
    const res = new Response("", { headers: header, status: 301 });
    console.log("PUT TO CACHE");
    const new_req = new Request(url_to_check, req);
    event.waitUntil(cache.put(new_req, res.clone()));
    return res;
  });
  API.get("/video/:p/:id", show_request, async (req, event) => {
    let cache = caches.default;
    const url = new URL(req.url);
    const url_to_check = url.origin + url.pathname;
    const inCache = await cache.match(url_to_check);
    if (inCache) {
      console.log("FROM CACHE");
      return inCache;
    }
    const partner = req.params.p === "1" ? true : false;
    const cda_id = req.params.id;
    const cda_url = `https://ebd.cda.pl/620x395/${cda_id}${partner ? "/vfilm" : ""}`;
    const video_url = await get_url(cda_url, null, cda_id);
    if (video_url === null) {
      return new Response("", { status: 500 });
    }
    const header = new Headers();
    header.set("Cache-Control", "public, max-age=18000");
    header.set("location", video_url);
    header.set("Access-Control-Allow-Origin", "*");
    const res = new Response("", { headers: header, status: 301 });
    console.log("PUT TO CACHE");
    const new_req = new Request(url_to_check, req);
    event.waitUntil(cache.put(new_req, res.clone()));
    return res;
  });
  API.head("/video/:p/:id/:res", show_request, async (req, event) => {
    let cache = caches.default;
    const url = new URL(req.url);
    const url_to_check = url.origin + url.pathname;
    const inCache = await cache.match(url_to_check);
    if (inCache) {
      console.log("FROM CACHE");
      return inCache;
    }
    const partner = req.params.p === "1" ? true : false;
    const cda_id = req.params.id;
    const resolution = req.params.res;
    const cda_url = `https://ebd.cda.pl/620x395/${cda_id}${partner ? "/vfilm" : ""}`;
    const video_url = await get_url(cda_url, resolution, cda_id);
    if (video_url === null) {
      return new Response("", { status: 500 });
    }
    const header = new Headers();
    header.set("Cache-Control", "public, max-age=18000");
    header.set("location", video_url);
    header.set("Access-Control-Allow-Origin", "*");
    const res = new Response("", { headers: header, status: 301 });
    console.log("PUT TO CACHE");
    const new_req = new Request(url_to_check, req);
    event.waitUntil(cache.put(new_req, res.clone()));
    return res;
  });
  API.head("/video/:p/:id", show_request, async (req, event) => {
    let cache = caches.default;
    const url = new URL(req.url);
    const url_to_check = url.origin + url.pathname;
    const inCache = await cache.match(url_to_check);
    if (inCache) {
      console.log("FROM CACHE");
      return inCache;
    }
    const partner = req.params.p === "1" ? true : false;
    const cda_id = req.params.id;
    const cda_url = `https://ebd.cda.pl/620x395/${cda_id}${partner ? "/vfilm" : ""}`;
    const video_url = await get_url(cda_url, null, cda_id);
    if (video_url === null) {
      return new Response("", { status: 500 });
    }
    const header = new Headers();
    header.set("Cache-Control", "public, max-age=18000");
    header.set("location", video_url);
    header.set("Access-Control-Allow-Origin", "*");
    const res = new Response("", { headers: header, status: 301 });
    console.log("PUT TO CACHE");
    const new_req = new Request(url_to_check, req);
    event.waitUntil(cache.put(new_req, res.clone()));
    return res;
  });
  API.get("/stats", async (req, res) => {
    return new Response(JSON.stringify(await get_stats_global()), { status: 200 });
  });
  API.all("*", () => new Response("Not Found.", { status: 404, headers: {
    "Access-Control-Allow-Origin": "*"
  } }));
  addEventListener("fetch", (event) => event.respondWith(API.handle(event.request, event)));
})();
