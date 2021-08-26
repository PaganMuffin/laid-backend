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

  // node_modules/lz-string/libs/lz-string.js
  var require_lz_string = __commonJS({
    "node_modules/lz-string/libs/lz-string.js"(exports, module) {
      var LZString = function() {
        var f = String.fromCharCode;
        var keyStrBase64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        var keyStrUriSafe = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$";
        var baseReverseDic = {};
        function getBaseValue(alphabet, character) {
          if (!baseReverseDic[alphabet]) {
            baseReverseDic[alphabet] = {};
            for (var i = 0; i < alphabet.length; i++) {
              baseReverseDic[alphabet][alphabet.charAt(i)] = i;
            }
          }
          return baseReverseDic[alphabet][character];
        }
        var LZString2 = {
          compressToBase64: function(input) {
            if (input == null)
              return "";
            var res = LZString2._compress(input, 6, function(a) {
              return keyStrBase64.charAt(a);
            });
            switch (res.length % 4) {
              default:
              case 0:
                return res;
              case 1:
                return res + "===";
              case 2:
                return res + "==";
              case 3:
                return res + "=";
            }
          },
          decompressFromBase64: function(input) {
            if (input == null)
              return "";
            if (input == "")
              return null;
            return LZString2._decompress(input.length, 32, function(index) {
              return getBaseValue(keyStrBase64, input.charAt(index));
            });
          },
          compressToUTF16: function(input) {
            if (input == null)
              return "";
            return LZString2._compress(input, 15, function(a) {
              return f(a + 32);
            }) + " ";
          },
          decompressFromUTF16: function(compressed) {
            if (compressed == null)
              return "";
            if (compressed == "")
              return null;
            return LZString2._decompress(compressed.length, 16384, function(index) {
              return compressed.charCodeAt(index) - 32;
            });
          },
          compressToUint8Array: function(uncompressed) {
            var compressed = LZString2.compress(uncompressed);
            var buf = new Uint8Array(compressed.length * 2);
            for (var i = 0, TotalLen = compressed.length; i < TotalLen; i++) {
              var current_value = compressed.charCodeAt(i);
              buf[i * 2] = current_value >>> 8;
              buf[i * 2 + 1] = current_value % 256;
            }
            return buf;
          },
          decompressFromUint8Array: function(compressed) {
            if (compressed === null || compressed === void 0) {
              return LZString2.decompress(compressed);
            } else {
              var buf = new Array(compressed.length / 2);
              for (var i = 0, TotalLen = buf.length; i < TotalLen; i++) {
                buf[i] = compressed[i * 2] * 256 + compressed[i * 2 + 1];
              }
              var result = [];
              buf.forEach(function(c2) {
                result.push(f(c2));
              });
              return LZString2.decompress(result.join(""));
            }
          },
          compressToEncodedURIComponent: function(input) {
            if (input == null)
              return "";
            return LZString2._compress(input, 6, function(a) {
              return keyStrUriSafe.charAt(a);
            });
          },
          decompressFromEncodedURIComponent: function(input) {
            if (input == null)
              return "";
            if (input == "")
              return null;
            input = input.replace(/ /g, "+");
            return LZString2._decompress(input.length, 32, function(index) {
              return getBaseValue(keyStrUriSafe, input.charAt(index));
            });
          },
          compress: function(uncompressed) {
            return LZString2._compress(uncompressed, 16, function(a) {
              return f(a);
            });
          },
          _compress: function(uncompressed, bitsPerChar, getCharFromInt) {
            if (uncompressed == null)
              return "";
            var i, value, context_dictionary = {}, context_dictionaryToCreate = {}, context_c = "", context_wc = "", context_w = "", context_enlargeIn = 2, context_dictSize = 3, context_numBits = 2, context_data = [], context_data_val = 0, context_data_position = 0, ii;
            for (ii = 0; ii < uncompressed.length; ii += 1) {
              context_c = uncompressed.charAt(ii);
              if (!Object.prototype.hasOwnProperty.call(context_dictionary, context_c)) {
                context_dictionary[context_c] = context_dictSize++;
                context_dictionaryToCreate[context_c] = true;
              }
              context_wc = context_w + context_c;
              if (Object.prototype.hasOwnProperty.call(context_dictionary, context_wc)) {
                context_w = context_wc;
              } else {
                if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate, context_w)) {
                  if (context_w.charCodeAt(0) < 256) {
                    for (i = 0; i < context_numBits; i++) {
                      context_data_val = context_data_val << 1;
                      if (context_data_position == bitsPerChar - 1) {
                        context_data_position = 0;
                        context_data.push(getCharFromInt(context_data_val));
                        context_data_val = 0;
                      } else {
                        context_data_position++;
                      }
                    }
                    value = context_w.charCodeAt(0);
                    for (i = 0; i < 8; i++) {
                      context_data_val = context_data_val << 1 | value & 1;
                      if (context_data_position == bitsPerChar - 1) {
                        context_data_position = 0;
                        context_data.push(getCharFromInt(context_data_val));
                        context_data_val = 0;
                      } else {
                        context_data_position++;
                      }
                      value = value >> 1;
                    }
                  } else {
                    value = 1;
                    for (i = 0; i < context_numBits; i++) {
                      context_data_val = context_data_val << 1 | value;
                      if (context_data_position == bitsPerChar - 1) {
                        context_data_position = 0;
                        context_data.push(getCharFromInt(context_data_val));
                        context_data_val = 0;
                      } else {
                        context_data_position++;
                      }
                      value = 0;
                    }
                    value = context_w.charCodeAt(0);
                    for (i = 0; i < 16; i++) {
                      context_data_val = context_data_val << 1 | value & 1;
                      if (context_data_position == bitsPerChar - 1) {
                        context_data_position = 0;
                        context_data.push(getCharFromInt(context_data_val));
                        context_data_val = 0;
                      } else {
                        context_data_position++;
                      }
                      value = value >> 1;
                    }
                  }
                  context_enlargeIn--;
                  if (context_enlargeIn == 0) {
                    context_enlargeIn = Math.pow(2, context_numBits);
                    context_numBits++;
                  }
                  delete context_dictionaryToCreate[context_w];
                } else {
                  value = context_dictionary[context_w];
                  for (i = 0; i < context_numBits; i++) {
                    context_data_val = context_data_val << 1 | value & 1;
                    if (context_data_position == bitsPerChar - 1) {
                      context_data_position = 0;
                      context_data.push(getCharFromInt(context_data_val));
                      context_data_val = 0;
                    } else {
                      context_data_position++;
                    }
                    value = value >> 1;
                  }
                }
                context_enlargeIn--;
                if (context_enlargeIn == 0) {
                  context_enlargeIn = Math.pow(2, context_numBits);
                  context_numBits++;
                }
                context_dictionary[context_wc] = context_dictSize++;
                context_w = String(context_c);
              }
            }
            if (context_w !== "") {
              if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate, context_w)) {
                if (context_w.charCodeAt(0) < 256) {
                  for (i = 0; i < context_numBits; i++) {
                    context_data_val = context_data_val << 1;
                    if (context_data_position == bitsPerChar - 1) {
                      context_data_position = 0;
                      context_data.push(getCharFromInt(context_data_val));
                      context_data_val = 0;
                    } else {
                      context_data_position++;
                    }
                  }
                  value = context_w.charCodeAt(0);
                  for (i = 0; i < 8; i++) {
                    context_data_val = context_data_val << 1 | value & 1;
                    if (context_data_position == bitsPerChar - 1) {
                      context_data_position = 0;
                      context_data.push(getCharFromInt(context_data_val));
                      context_data_val = 0;
                    } else {
                      context_data_position++;
                    }
                    value = value >> 1;
                  }
                } else {
                  value = 1;
                  for (i = 0; i < context_numBits; i++) {
                    context_data_val = context_data_val << 1 | value;
                    if (context_data_position == bitsPerChar - 1) {
                      context_data_position = 0;
                      context_data.push(getCharFromInt(context_data_val));
                      context_data_val = 0;
                    } else {
                      context_data_position++;
                    }
                    value = 0;
                  }
                  value = context_w.charCodeAt(0);
                  for (i = 0; i < 16; i++) {
                    context_data_val = context_data_val << 1 | value & 1;
                    if (context_data_position == bitsPerChar - 1) {
                      context_data_position = 0;
                      context_data.push(getCharFromInt(context_data_val));
                      context_data_val = 0;
                    } else {
                      context_data_position++;
                    }
                    value = value >> 1;
                  }
                }
                context_enlargeIn--;
                if (context_enlargeIn == 0) {
                  context_enlargeIn = Math.pow(2, context_numBits);
                  context_numBits++;
                }
                delete context_dictionaryToCreate[context_w];
              } else {
                value = context_dictionary[context_w];
                for (i = 0; i < context_numBits; i++) {
                  context_data_val = context_data_val << 1 | value & 1;
                  if (context_data_position == bitsPerChar - 1) {
                    context_data_position = 0;
                    context_data.push(getCharFromInt(context_data_val));
                    context_data_val = 0;
                  } else {
                    context_data_position++;
                  }
                  value = value >> 1;
                }
              }
              context_enlargeIn--;
              if (context_enlargeIn == 0) {
                context_enlargeIn = Math.pow(2, context_numBits);
                context_numBits++;
              }
            }
            value = 2;
            for (i = 0; i < context_numBits; i++) {
              context_data_val = context_data_val << 1 | value & 1;
              if (context_data_position == bitsPerChar - 1) {
                context_data_position = 0;
                context_data.push(getCharFromInt(context_data_val));
                context_data_val = 0;
              } else {
                context_data_position++;
              }
              value = value >> 1;
            }
            while (true) {
              context_data_val = context_data_val << 1;
              if (context_data_position == bitsPerChar - 1) {
                context_data.push(getCharFromInt(context_data_val));
                break;
              } else
                context_data_position++;
            }
            return context_data.join("");
          },
          decompress: function(compressed) {
            if (compressed == null)
              return "";
            if (compressed == "")
              return null;
            return LZString2._decompress(compressed.length, 32768, function(index) {
              return compressed.charCodeAt(index);
            });
          },
          _decompress: function(length, resetValue, getNextValue) {
            var dictionary = [], next, enlargeIn = 4, dictSize = 4, numBits = 3, entry = "", result = [], i, w, bits, resb, maxpower, power, c2, data = { val: getNextValue(0), position: resetValue, index: 1 };
            for (i = 0; i < 3; i += 1) {
              dictionary[i] = i;
            }
            bits = 0;
            maxpower = Math.pow(2, 2);
            power = 1;
            while (power != maxpower) {
              resb = data.val & data.position;
              data.position >>= 1;
              if (data.position == 0) {
                data.position = resetValue;
                data.val = getNextValue(data.index++);
              }
              bits |= (resb > 0 ? 1 : 0) * power;
              power <<= 1;
            }
            switch (next = bits) {
              case 0:
                bits = 0;
                maxpower = Math.pow(2, 8);
                power = 1;
                while (power != maxpower) {
                  resb = data.val & data.position;
                  data.position >>= 1;
                  if (data.position == 0) {
                    data.position = resetValue;
                    data.val = getNextValue(data.index++);
                  }
                  bits |= (resb > 0 ? 1 : 0) * power;
                  power <<= 1;
                }
                c2 = f(bits);
                break;
              case 1:
                bits = 0;
                maxpower = Math.pow(2, 16);
                power = 1;
                while (power != maxpower) {
                  resb = data.val & data.position;
                  data.position >>= 1;
                  if (data.position == 0) {
                    data.position = resetValue;
                    data.val = getNextValue(data.index++);
                  }
                  bits |= (resb > 0 ? 1 : 0) * power;
                  power <<= 1;
                }
                c2 = f(bits);
                break;
              case 2:
                return "";
            }
            dictionary[3] = c2;
            w = c2;
            result.push(c2);
            while (true) {
              if (data.index > length) {
                return "";
              }
              bits = 0;
              maxpower = Math.pow(2, numBits);
              power = 1;
              while (power != maxpower) {
                resb = data.val & data.position;
                data.position >>= 1;
                if (data.position == 0) {
                  data.position = resetValue;
                  data.val = getNextValue(data.index++);
                }
                bits |= (resb > 0 ? 1 : 0) * power;
                power <<= 1;
              }
              switch (c2 = bits) {
                case 0:
                  bits = 0;
                  maxpower = Math.pow(2, 8);
                  power = 1;
                  while (power != maxpower) {
                    resb = data.val & data.position;
                    data.position >>= 1;
                    if (data.position == 0) {
                      data.position = resetValue;
                      data.val = getNextValue(data.index++);
                    }
                    bits |= (resb > 0 ? 1 : 0) * power;
                    power <<= 1;
                  }
                  dictionary[dictSize++] = f(bits);
                  c2 = dictSize - 1;
                  enlargeIn--;
                  break;
                case 1:
                  bits = 0;
                  maxpower = Math.pow(2, 16);
                  power = 1;
                  while (power != maxpower) {
                    resb = data.val & data.position;
                    data.position >>= 1;
                    if (data.position == 0) {
                      data.position = resetValue;
                      data.val = getNextValue(data.index++);
                    }
                    bits |= (resb > 0 ? 1 : 0) * power;
                    power <<= 1;
                  }
                  dictionary[dictSize++] = f(bits);
                  c2 = dictSize - 1;
                  enlargeIn--;
                  break;
                case 2:
                  return result.join("");
              }
              if (enlargeIn == 0) {
                enlargeIn = Math.pow(2, numBits);
                numBits++;
              }
              if (dictionary[c2]) {
                entry = dictionary[c2];
              } else {
                if (c2 === dictSize) {
                  entry = w + w.charAt(0);
                } else {
                  return null;
                }
              }
              result.push(entry);
              dictionary[dictSize++] = w + entry.charAt(0);
              enlargeIn--;
              w = entry;
              if (enlargeIn == 0) {
                enlargeIn = Math.pow(2, numBits);
                numBits++;
              }
            }
          }
        };
        return LZString2;
      }();
      if (typeof define === "function" && define.amd) {
        define(function() {
          return LZString;
        });
      } else if (typeof module !== "undefined" && module != null) {
        module.exports = LZString;
      }
    }
  });

  // src/index.js
  var import_itty_router = __toModule(require_itty_router_min());
  var import_lz_string2 = __toModule(require_lz_string());

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
  var import_lz_string = __toModule(require_lz_string());
  var get_video_info = class {
    title = null;
    id = null;
    duration = null;
    thumb = null;
    type = null;
    hash = null;
    hash2 = null;
    qualities = null;
    element(element) {
      const data = JSON.parse(element.getAttribute("player_data"));
      console.log(data);
      this.title = decodeURI(data["video"]["title"]).replaceAll(/%2C/gi, ",");
      this.id = data["video"]["id"];
      this.duration = data["video"]["durationFull"];
      this.hash = data["video"]["hash"];
      this.hash2 = data["video"]["hash2"];
      this.thumb = data["video"]["thumb"];
      this.type = data["video"]["type"];
      this.qualities = Object.entries(data["video"]["qualities"]).map((x) => {
        return {
          "quality": x[1],
          "resolution": x[0],
          "url": `${API_URL}/video/${this.type === "partner" ? 1 : 0}/${this.id}/${x[0]}`
        };
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
  var options = (key, method = "GET", body = null) => {
    return {
      method,
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36"
      },
      body,
      cf: {
        cacheTtl: 3600,
        cacheEverything: true,
        cacheKey: key
      }
    };
  };
  var check_resolutions = async (cda_id) => {
    const url = `https://ebd.cda.pl/620x395/${cda_id}`;
    const f = await fetch(url, options(url));
    const new_url = f.url;
    const info = new get_video_info();
    const is_premium = new check_premiun();
    await new HTMLRewriter().on(`#mediaplayer${cda_id}`, info).on(`.xs-txt`, is_premium).transform(f).text();
    info["code"] = f.status;
    info["premium"] = is_premium["premium"];
    info["url"] = new_url;
    return { info };
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
    delete info["url"];
    delete info["premium"];
    delete info["id"];
    delete info["type"];
    delete info["code"];
    delete info["hash"];
    delete info["hash2"];
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
    header.set("Access-Control-Allow-Origin", "*");
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
    header.set("Access-Control-Allow-Origin", "*");
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
    let res = new Response("", { status: data["code"], headers: header });
    data["timestamp"] = new Date().getTime();
    if (data["code"] === 200) {
      header.set("Cache-Control", "public, max-age=60");
      res = new Response(JSON.stringify(data), { headers: header, status: data["code"] });
      console.log("PUT TO CACHE");
      const new_req = new Request(url_to_check, req);
      event.waitUntil(cache.put(new_req, res.clone()));
      event.waitUntil(update_stats_global("cda-gen-json"));
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
    console.log(req.params);
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
  API.get("/stats", show_request, async (req, res) => {
    return new Response(JSON.stringify(await get_stats_global()), { status: 200 });
  });
  API.all("*", () => new Response("Not Found.", { status: 404, headers: {
    "Access-Control-Allow-Origin": "*"
  } }));
  addEventListener("fetch", (event) => event.respondWith(API.handle(event.request, event)));
})();
//# sourceMappingURL=index.js.map
