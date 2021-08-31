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
  var __export = (target, all) => {
    __markAsModule(target);
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
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

  // external-global-plugin:cross-fetch
  var require_cross_fetch = __commonJS({
    "external-global-plugin:cross-fetch"(exports, module) {
      module.exports = fetch;
    }
  });

  // node_modules/es5-ext/global.js
  var require_global = __commonJS({
    "node_modules/es5-ext/global.js"(exports, module) {
      var naiveFallback = function() {
        if (typeof self === "object" && self)
          return self;
        if (typeof window === "object" && window)
          return window;
        throw new Error("Unable to resolve global `this`");
      };
      module.exports = function() {
        if (this)
          return this;
        if (typeof globalThis === "object" && globalThis)
          return globalThis;
        try {
          Object.defineProperty(Object.prototype, "__global__", {
            get: function() {
              return this;
            },
            configurable: true
          });
        } catch (error) {
          return naiveFallback();
        }
        try {
          if (!__global__)
            return naiveFallback();
          return __global__;
        } finally {
          delete Object.prototype.__global__;
        }
      }();
    }
  });

  // node_modules/websocket/package.json
  var require_package = __commonJS({
    "node_modules/websocket/package.json"(exports, module) {
      module.exports = {
        name: "websocket",
        description: "Websocket Client & Server Library implementing the WebSocket protocol as specified in RFC 6455.",
        keywords: [
          "websocket",
          "websockets",
          "socket",
          "networking",
          "comet",
          "push",
          "RFC-6455",
          "realtime",
          "server",
          "client"
        ],
        author: "Brian McKelvey <theturtle32@gmail.com> (https://github.com/theturtle32)",
        contributors: [
          "I\xF1aki Baz Castillo <ibc@aliax.net> (http://dev.sipdoc.net)"
        ],
        version: "1.0.34",
        repository: {
          type: "git",
          url: "https://github.com/theturtle32/WebSocket-Node.git"
        },
        homepage: "https://github.com/theturtle32/WebSocket-Node",
        engines: {
          node: ">=4.0.0"
        },
        dependencies: {
          bufferutil: "^4.0.1",
          debug: "^2.2.0",
          "es5-ext": "^0.10.50",
          "typedarray-to-buffer": "^3.1.5",
          "utf-8-validate": "^5.0.2",
          yaeti: "^0.0.6"
        },
        devDependencies: {
          "buffer-equal": "^1.0.0",
          gulp: "^4.0.2",
          "gulp-jshint": "^2.0.4",
          "jshint-stylish": "^2.2.1",
          jshint: "^2.0.0",
          tape: "^4.9.1"
        },
        config: {
          verbose: false
        },
        scripts: {
          test: "tape test/unit/*.js",
          gulp: "gulp"
        },
        main: "index",
        directories: {
          lib: "./lib"
        },
        browser: "lib/browser.js",
        license: "Apache-2.0"
      };
    }
  });

  // node_modules/websocket/lib/version.js
  var require_version = __commonJS({
    "node_modules/websocket/lib/version.js"(exports, module) {
      module.exports = require_package().version;
    }
  });

  // node_modules/websocket/lib/browser.js
  var require_browser = __commonJS({
    "node_modules/websocket/lib/browser.js"(exports, module) {
      var _globalThis;
      if (typeof globalThis === "object") {
        _globalThis = globalThis;
      } else {
        try {
          _globalThis = require_global();
        } catch (error) {
        } finally {
          if (!_globalThis && typeof window !== "undefined") {
            _globalThis = window;
          }
          if (!_globalThis) {
            throw new Error("Could not determine global this");
          }
        }
      }
      var NativeWebSocket = _globalThis.WebSocket || _globalThis.MozWebSocket;
      var websocket_version = require_version();
      function W3CWebSocket(uri, protocols) {
        var native_instance;
        if (protocols) {
          native_instance = new NativeWebSocket(uri, protocols);
        } else {
          native_instance = new NativeWebSocket(uri);
        }
        return native_instance;
      }
      if (NativeWebSocket) {
        ["CONNECTING", "OPEN", "CLOSING", "CLOSED"].forEach(function(prop) {
          Object.defineProperty(W3CWebSocket, prop, {
            get: function() {
              return NativeWebSocket[prop];
            }
          });
        });
      }
      module.exports = {
        "w3cwebsocket": NativeWebSocket ? W3CWebSocket : null,
        "version": websocket_version
      };
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

  // node_modules/@supabase/supabase-js/dist/module/lib/constants.js
  var DEFAULT_HEADERS = {};

  // node_modules/@supabase/gotrue-js/dist/module/lib/fetch.js
  var import_cross_fetch = __toModule(require_cross_fetch());
  var __awaiter = function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var _getErrorMessage = (err) => err.msg || err.message || err.error_description || err.error || JSON.stringify(err);
  var handleError = (error, reject) => {
    if (typeof error.json !== "function") {
      return reject(error);
    }
    error.json().then((err) => {
      return reject({
        message: _getErrorMessage(err),
        status: (error === null || error === void 0 ? void 0 : error.status) || 500
      });
    });
  };
  var _getRequestParams = (method, options2, body) => {
    const params = { method, headers: (options2 === null || options2 === void 0 ? void 0 : options2.headers) || {} };
    if (method === "GET") {
      return params;
    }
    params.headers = Object.assign({ "Content-Type": "text/plain;charset=UTF-8" }, options2 === null || options2 === void 0 ? void 0 : options2.headers);
    params.body = JSON.stringify(body);
    return params;
  };
  function _handleRequest(method, url, options2, body) {
    return __awaiter(this, void 0, void 0, function* () {
      return new Promise((resolve, reject) => {
        (0, import_cross_fetch.default)(url, _getRequestParams(method, options2, body)).then((result) => {
          if (!result.ok)
            throw result;
          if (options2 === null || options2 === void 0 ? void 0 : options2.noResolveJson)
            return resolve;
          return result.json();
        }).then((data) => resolve(data)).catch((error) => handleError(error, reject));
      });
    });
  }
  function get(url, options2) {
    return __awaiter(this, void 0, void 0, function* () {
      return _handleRequest("GET", url, options2);
    });
  }
  function post(url, body, options2) {
    return __awaiter(this, void 0, void 0, function* () {
      return _handleRequest("POST", url, options2, body);
    });
  }
  function put(url, body, options2) {
    return __awaiter(this, void 0, void 0, function* () {
      return _handleRequest("PUT", url, options2, body);
    });
  }
  function remove(url, body, options2) {
    return __awaiter(this, void 0, void 0, function* () {
      return _handleRequest("DELETE", url, options2, body);
    });
  }

  // node_modules/@supabase/gotrue-js/dist/module/lib/constants.js
  var GOTRUE_URL = "http://localhost:9999";
  var DEFAULT_HEADERS2 = {};
  var EXPIRY_MARGIN = 60 * 1e3;
  var STORAGE_KEY = "supabase.auth.token";
  var COOKIE_OPTIONS = {
    name: "sb:token",
    lifetime: 60 * 60 * 8,
    domain: "",
    path: "/",
    sameSite: "lax"
  };

  // node_modules/@supabase/gotrue-js/dist/module/lib/cookies.js
  function serialize(name, val, options2) {
    const opt = options2 || {};
    const enc = encodeURIComponent;
    const fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
    if (typeof enc !== "function") {
      throw new TypeError("option encode is invalid");
    }
    if (!fieldContentRegExp.test(name)) {
      throw new TypeError("argument name is invalid");
    }
    const value = enc(val);
    if (value && !fieldContentRegExp.test(value)) {
      throw new TypeError("argument val is invalid");
    }
    let str = name + "=" + value;
    if (opt.maxAge != null) {
      const maxAge = opt.maxAge - 0;
      if (isNaN(maxAge) || !isFinite(maxAge)) {
        throw new TypeError("option maxAge is invalid");
      }
      str += "; Max-Age=" + Math.floor(maxAge);
    }
    if (opt.domain) {
      if (!fieldContentRegExp.test(opt.domain)) {
        throw new TypeError("option domain is invalid");
      }
      str += "; Domain=" + opt.domain;
    }
    if (opt.path) {
      if (!fieldContentRegExp.test(opt.path)) {
        throw new TypeError("option path is invalid");
      }
      str += "; Path=" + opt.path;
    }
    if (opt.expires) {
      if (typeof opt.expires.toUTCString !== "function") {
        throw new TypeError("option expires is invalid");
      }
      str += "; Expires=" + opt.expires.toUTCString();
    }
    if (opt.httpOnly) {
      str += "; HttpOnly";
    }
    if (opt.secure) {
      str += "; Secure";
    }
    if (opt.sameSite) {
      const sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
      switch (sameSite) {
        case "lax":
          str += "; SameSite=Lax";
          break;
        case "strict":
          str += "; SameSite=Strict";
          break;
        case "none":
          str += "; SameSite=None";
          break;
        default:
          throw new TypeError("option sameSite is invalid");
      }
    }
    return str;
  }
  function isSecureEnvironment(req) {
    if (!req || !req.headers || !req.headers.host) {
      throw new Error('The "host" request header is not available');
    }
    const host = req.headers.host.indexOf(":") > -1 && req.headers.host.split(":")[0] || req.headers.host;
    if (["localhost", "127.0.0.1"].indexOf(host) > -1 || host.endsWith(".local")) {
      return false;
    }
    return true;
  }
  function serializeCookie(cookie, secure) {
    var _a, _b, _c;
    return serialize(cookie.name, cookie.value, {
      maxAge: cookie.maxAge,
      expires: new Date(Date.now() + cookie.maxAge * 1e3),
      httpOnly: true,
      secure,
      path: (_a = cookie.path) !== null && _a !== void 0 ? _a : "/",
      domain: (_b = cookie.domain) !== null && _b !== void 0 ? _b : "",
      sameSite: (_c = cookie.sameSite) !== null && _c !== void 0 ? _c : "lax"
    });
  }
  function setCookies(req, res, cookies) {
    const strCookies = cookies.map((c2) => serializeCookie(c2, isSecureEnvironment(req)));
    const previousCookies = res.getHeader("Set-Cookie");
    if (previousCookies) {
      if (previousCookies instanceof Array) {
        Array.prototype.push.apply(strCookies, previousCookies);
      } else if (typeof previousCookies === "string") {
        strCookies.push(previousCookies);
      }
    }
    res.setHeader("Set-Cookie", strCookies);
  }
  function setCookie(req, res, cookie) {
    setCookies(req, res, [cookie]);
  }
  function deleteCookie(req, res, name) {
    setCookie(req, res, {
      name,
      value: "",
      maxAge: -1
    });
  }

  // node_modules/@supabase/gotrue-js/dist/module/lib/helpers.js
  function expiresAt(expiresIn) {
    const timeNow = Math.round(Date.now() / 1e3);
    return timeNow + expiresIn;
  }
  function uuid() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c2) {
      var r = Math.random() * 16 | 0, v = c2 == "x" ? r : r & 3 | 8;
      return v.toString(16);
    });
  }
  var isBrowser = () => typeof window !== "undefined";
  function getParameterByName(name, url) {
    if (!url)
      url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&#]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(url);
    if (!results)
      return null;
    if (!results[2])
      return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }
  var LocalStorage = class {
    constructor(localStorage) {
      this.localStorage = localStorage || globalThis.localStorage;
    }
    clear() {
      return this.localStorage.clear();
    }
    key(index) {
      return this.localStorage.key(index);
    }
    setItem(key, value) {
      return this.localStorage.setItem(key, value);
    }
    getItem(key) {
      return this.localStorage.getItem(key);
    }
    removeItem(key) {
      return this.localStorage.removeItem(key);
    }
  };

  // node_modules/@supabase/gotrue-js/dist/module/GoTrueApi.js
  var __awaiter2 = function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var GoTrueApi = class {
    constructor({ url = "", headers = {}, cookieOptions }) {
      this.url = url;
      this.headers = headers;
      this.cookieOptions = Object.assign(Object.assign({}, COOKIE_OPTIONS), cookieOptions);
    }
    signUpWithEmail(email, password, options2 = {}) {
      return __awaiter2(this, void 0, void 0, function* () {
        try {
          let headers = Object.assign({}, this.headers);
          let queryString = "";
          if (options2.redirectTo) {
            queryString = "?redirect_to=" + encodeURIComponent(options2.redirectTo);
          }
          const data = yield post(`${this.url}/signup${queryString}`, { email, password }, { headers });
          let session = Object.assign({}, data);
          if (session.expires_in)
            session.expires_at = expiresAt(data.expires_in);
          return { data: session, error: null };
        } catch (error) {
          return { data: null, error };
        }
      });
    }
    signInWithEmail(email, password, options2 = {}) {
      return __awaiter2(this, void 0, void 0, function* () {
        try {
          let headers = Object.assign({}, this.headers);
          let queryString = "?grant_type=password";
          if (options2.redirectTo) {
            queryString += "&redirect_to=" + encodeURIComponent(options2.redirectTo);
          }
          const data = yield post(`${this.url}/token${queryString}`, { email, password }, { headers });
          let session = Object.assign({}, data);
          if (session.expires_in)
            session.expires_at = expiresAt(data.expires_in);
          return { data: session, error: null };
        } catch (error) {
          return { data: null, error };
        }
      });
    }
    signUpWithPhone(phone, password) {
      return __awaiter2(this, void 0, void 0, function* () {
        try {
          let headers = Object.assign({}, this.headers);
          const data = yield post(`${this.url}/signup`, { phone, password }, { headers });
          let session = Object.assign({}, data);
          if (session.expires_in)
            session.expires_at = expiresAt(data.expires_in);
          return { data: session, error: null };
        } catch (error) {
          return { data: null, error };
        }
      });
    }
    signInWithPhone(phone, password) {
      return __awaiter2(this, void 0, void 0, function* () {
        try {
          let headers = Object.assign({}, this.headers);
          let queryString = "?grant_type=password";
          const data = yield post(`${this.url}/token${queryString}`, { phone, password }, { headers });
          let session = Object.assign({}, data);
          if (session.expires_in)
            session.expires_at = expiresAt(data.expires_in);
          return { data: session, error: null };
        } catch (error) {
          return { data: null, error };
        }
      });
    }
    sendMagicLinkEmail(email, options2 = {}) {
      return __awaiter2(this, void 0, void 0, function* () {
        try {
          let headers = Object.assign({}, this.headers);
          let queryString = "";
          if (options2.redirectTo) {
            queryString += "?redirect_to=" + encodeURIComponent(options2.redirectTo);
          }
          const data = yield post(`${this.url}/magiclink${queryString}`, { email }, { headers });
          return { data, error: null };
        } catch (error) {
          return { data: null, error };
        }
      });
    }
    sendMobileOTP(phone) {
      return __awaiter2(this, void 0, void 0, function* () {
        try {
          let headers = Object.assign({}, this.headers);
          const data = yield post(`${this.url}/otp`, { phone }, { headers });
          return { data, error: null };
        } catch (error) {
          return { data: null, error };
        }
      });
    }
    verifyMobileOTP(phone, token, options2 = {}) {
      return __awaiter2(this, void 0, void 0, function* () {
        try {
          let headers = Object.assign({}, this.headers);
          const data = yield post(`${this.url}/verify`, { phone, token, type: "sms", redirect_to: options2.redirectTo }, { headers });
          return { data, error: null };
        } catch (error) {
          return { data: null, error };
        }
      });
    }
    inviteUserByEmail(email, options2 = {}) {
      return __awaiter2(this, void 0, void 0, function* () {
        try {
          let headers = Object.assign({}, this.headers);
          let queryString = "";
          if (options2.redirectTo) {
            queryString += "?redirect_to=" + encodeURIComponent(options2.redirectTo);
          }
          const data = yield post(`${this.url}/invite${queryString}`, { email }, { headers });
          return { data, error: null };
        } catch (error) {
          return { data: null, error };
        }
      });
    }
    resetPasswordForEmail(email, options2 = {}) {
      return __awaiter2(this, void 0, void 0, function* () {
        try {
          let headers = Object.assign({}, this.headers);
          let queryString = "";
          if (options2.redirectTo) {
            queryString += "?redirect_to=" + encodeURIComponent(options2.redirectTo);
          }
          const data = yield post(`${this.url}/recover${queryString}`, { email }, { headers });
          return { data, error: null };
        } catch (error) {
          return { data: null, error };
        }
      });
    }
    _createRequestHeaders(jwt) {
      const headers = Object.assign({}, this.headers);
      headers["Authorization"] = `Bearer ${jwt}`;
      return headers;
    }
    signOut(jwt) {
      return __awaiter2(this, void 0, void 0, function* () {
        try {
          yield post(`${this.url}/logout`, {}, { headers: this._createRequestHeaders(jwt), noResolveJson: true });
          return { error: null };
        } catch (error) {
          return { error };
        }
      });
    }
    getUrlForProvider(provider, options2) {
      let urlParams = [`provider=${encodeURIComponent(provider)}`];
      if (options2 === null || options2 === void 0 ? void 0 : options2.redirectTo) {
        urlParams.push(`redirect_to=${encodeURIComponent(options2.redirectTo)}`);
      }
      if (options2 === null || options2 === void 0 ? void 0 : options2.scopes) {
        urlParams.push(`scopes=${encodeURIComponent(options2.scopes)}`);
      }
      return `${this.url}/authorize?${urlParams.join("&")}`;
    }
    getUser(jwt) {
      return __awaiter2(this, void 0, void 0, function* () {
        try {
          const data = yield get(`${this.url}/user`, { headers: this._createRequestHeaders(jwt) });
          return { user: data, data, error: null };
        } catch (error) {
          return { user: null, data: null, error };
        }
      });
    }
    updateUser(jwt, attributes) {
      return __awaiter2(this, void 0, void 0, function* () {
        try {
          const data = yield put(`${this.url}/user`, attributes, {
            headers: this._createRequestHeaders(jwt)
          });
          return { user: data, data, error: null };
        } catch (error) {
          return { user: null, data: null, error };
        }
      });
    }
    deleteUser(uid, jwt) {
      return __awaiter2(this, void 0, void 0, function* () {
        try {
          const data = yield remove(`${this.url}/admin/users/${uid}`, {}, {
            headers: this._createRequestHeaders(jwt)
          });
          return { user: data, data, error: null };
        } catch (error) {
          return { user: null, data: null, error };
        }
      });
    }
    refreshAccessToken(refreshToken) {
      return __awaiter2(this, void 0, void 0, function* () {
        try {
          const data = yield post(`${this.url}/token?grant_type=refresh_token`, { refresh_token: refreshToken }, { headers: this.headers });
          let session = Object.assign({}, data);
          if (session.expires_in)
            session.expires_at = expiresAt(data.expires_in);
          return { data: session, error: null };
        } catch (error) {
          return { data: null, error };
        }
      });
    }
    setAuthCookie(req, res) {
      if (req.method !== "POST") {
        res.setHeader("Allow", "POST");
        res.status(405).end("Method Not Allowed");
      }
      const { event, session } = req.body;
      if (!event)
        throw new Error("Auth event missing!");
      if (event === "SIGNED_IN") {
        if (!session)
          throw new Error("Auth session missing!");
        setCookie(req, res, {
          name: this.cookieOptions.name,
          value: session.access_token,
          domain: this.cookieOptions.domain,
          maxAge: this.cookieOptions.lifetime,
          path: this.cookieOptions.path,
          sameSite: this.cookieOptions.sameSite
        });
      }
      if (event === "SIGNED_OUT")
        deleteCookie(req, res, this.cookieOptions.name);
      res.status(200).json({});
    }
    getUserByCookie(req) {
      return __awaiter2(this, void 0, void 0, function* () {
        try {
          if (!req.cookies)
            throw new Error("Not able to parse cookies! When using Express make sure the cookie-parser middleware is in use!");
          if (!req.cookies[this.cookieOptions.name])
            throw new Error("No cookie found!");
          const token = req.cookies[this.cookieOptions.name];
          const { user, error } = yield this.getUser(token);
          if (error)
            throw error;
          return { user, data: user, error: null };
        } catch (error) {
          return { user: null, data: null, error };
        }
      });
    }
    generateLink(type, email, options2 = {}) {
      return __awaiter2(this, void 0, void 0, function* () {
        try {
          const data = yield post(`${this.url}/admin/generate_link`, {
            type,
            email,
            password: options2.password,
            data: options2.data,
            redirect_to: options2.redirectTo
          }, { headers: this.headers });
          return { data, error: null };
        } catch (error) {
          return { data: null, error };
        }
      });
    }
  };

  // node_modules/@supabase/gotrue-js/dist/module/lib/polyfills.js
  function polyfillGlobalThis() {
    if (typeof globalThis === "object")
      return;
    try {
      Object.defineProperty(Object.prototype, "__magic__", {
        get: function() {
          return this;
        },
        configurable: true
      });
      __magic__.globalThis = __magic__;
      delete Object.prototype.__magic__;
    } catch (e) {
      if (typeof self !== "undefined") {
        self.globalThis = self;
      }
    }
  }

  // node_modules/@supabase/gotrue-js/dist/module/GoTrueClient.js
  var __awaiter3 = function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  polyfillGlobalThis();
  var DEFAULT_OPTIONS = {
    url: GOTRUE_URL,
    autoRefreshToken: true,
    persistSession: true,
    localStorage: globalThis.localStorage,
    detectSessionInUrl: true,
    headers: DEFAULT_HEADERS2
  };
  var GoTrueClient = class {
    constructor(options2) {
      this.stateChangeEmitters = new Map();
      const settings = Object.assign(Object.assign({}, DEFAULT_OPTIONS), options2);
      this.currentUser = null;
      this.currentSession = null;
      this.autoRefreshToken = settings.autoRefreshToken;
      this.persistSession = settings.persistSession;
      this.localStorage = new LocalStorage(settings.localStorage);
      this.api = new GoTrueApi({
        url: settings.url,
        headers: settings.headers,
        cookieOptions: settings.cookieOptions
      });
      this._recoverSession();
      this._recoverAndRefresh();
      try {
        if (settings.detectSessionInUrl && isBrowser() && !!getParameterByName("access_token")) {
          this.getSessionFromUrl({ storeSession: true });
        }
      } catch (error) {
        console.log("Error getting session from URL.");
      }
    }
    signUp({ email, password, phone }, options2 = {}) {
      return __awaiter3(this, void 0, void 0, function* () {
        try {
          this._removeSession();
          const { data, error } = phone && password ? yield this.api.signUpWithPhone(phone, password) : yield this.api.signUpWithEmail(email, password, {
            redirectTo: options2.redirectTo
          });
          if (error) {
            throw error;
          }
          if (!data) {
            throw "An error occurred on sign up.";
          }
          let session = null;
          let user = null;
          if (data.access_token) {
            session = data;
            user = session.user;
            this._saveSession(session);
            this._notifyAllSubscribers("SIGNED_IN");
          }
          if (data.id) {
            user = data;
          }
          return { data, user, session, error: null };
        } catch (error) {
          return { data: null, user: null, session: null, error };
        }
      });
    }
    signIn({ email, phone, password, refreshToken, provider }, options2 = {}) {
      return __awaiter3(this, void 0, void 0, function* () {
        try {
          this._removeSession();
          if (email && !password) {
            const { error } = yield this.api.sendMagicLinkEmail(email, {
              redirectTo: options2.redirectTo
            });
            return { data: null, user: null, session: null, error };
          }
          if (email && password) {
            return this._handleEmailSignIn(email, password, {
              redirectTo: options2.redirectTo
            });
          }
          if (phone && !password) {
            const { error } = yield this.api.sendMobileOTP(phone);
            return { data: null, user: null, session: null, error };
          }
          if (phone && password) {
            return this._handlePhoneSignIn(phone, password);
          }
          if (refreshToken) {
            const { error } = yield this._callRefreshToken(refreshToken);
            if (error)
              throw error;
            return {
              data: this.currentSession,
              user: this.currentUser,
              session: this.currentSession,
              error: null
            };
          }
          if (provider) {
            return this._handleProviderSignIn(provider, {
              redirectTo: options2.redirectTo,
              scopes: options2.scopes
            });
          }
          throw new Error(`You must provide either an email, phone number or a third-party provider.`);
        } catch (error) {
          return { data: null, user: null, session: null, error };
        }
      });
    }
    verifyOTP({ phone, token }, options2 = {}) {
      return __awaiter3(this, void 0, void 0, function* () {
        try {
          this._removeSession();
          const { data, error } = yield this.api.verifyMobileOTP(phone, token, options2);
          if (error) {
            throw error;
          }
          if (!data) {
            throw "An error occurred on token verification.";
          }
          let session = null;
          let user = null;
          if (data.access_token) {
            session = data;
            user = session.user;
            this._saveSession(session);
            this._notifyAllSubscribers("SIGNED_IN");
          }
          if (data.id) {
            user = data;
          }
          return { data, user, session, error: null };
        } catch (error) {
          return { data: null, user: null, session: null, error };
        }
      });
    }
    user() {
      return this.currentUser;
    }
    session() {
      return this.currentSession;
    }
    refreshSession() {
      var _a;
      return __awaiter3(this, void 0, void 0, function* () {
        try {
          if (!((_a = this.currentSession) === null || _a === void 0 ? void 0 : _a.access_token))
            throw new Error("Not logged in.");
          const { error } = yield this._callRefreshToken();
          if (error)
            throw error;
          return { data: this.currentSession, user: this.currentUser, error: null };
        } catch (error) {
          return { data: null, user: null, error };
        }
      });
    }
    update(attributes) {
      var _a;
      return __awaiter3(this, void 0, void 0, function* () {
        try {
          if (!((_a = this.currentSession) === null || _a === void 0 ? void 0 : _a.access_token))
            throw new Error("Not logged in.");
          const { user, error } = yield this.api.updateUser(this.currentSession.access_token, attributes);
          if (error)
            throw error;
          if (!user)
            throw Error("Invalid user data.");
          const session = Object.assign(Object.assign({}, this.currentSession), { user });
          this._saveSession(session);
          this._notifyAllSubscribers("USER_UPDATED");
          return { data: user, user, error: null };
        } catch (error) {
          return { data: null, user: null, error };
        }
      });
    }
    setSession(refresh_token) {
      return __awaiter3(this, void 0, void 0, function* () {
        try {
          if (!refresh_token) {
            throw new Error("No current session.");
          }
          const { data, error } = yield this.api.refreshAccessToken(refresh_token);
          if (error) {
            return { session: null, error };
          }
          if (!data) {
            return {
              session: null,
              error: { name: "Invalid refresh_token", message: "JWT token provided is Invalid" }
            };
          }
          this._saveSession(data);
          this._notifyAllSubscribers("SIGNED_IN");
          return { session: data, error: null };
        } catch (error) {
          return { error, session: null };
        }
      });
    }
    setAuth(access_token) {
      this.currentSession = Object.assign(Object.assign({}, this.currentSession), { access_token, token_type: "bearer", user: null });
      return this.currentSession;
    }
    getSessionFromUrl(options2) {
      return __awaiter3(this, void 0, void 0, function* () {
        try {
          if (!isBrowser())
            throw new Error("No browser detected.");
          const error_description = getParameterByName("error_description");
          if (error_description)
            throw new Error(error_description);
          const provider_token = getParameterByName("provider_token");
          const access_token = getParameterByName("access_token");
          if (!access_token)
            throw new Error("No access_token detected.");
          const expires_in = getParameterByName("expires_in");
          if (!expires_in)
            throw new Error("No expires_in detected.");
          const refresh_token = getParameterByName("refresh_token");
          if (!refresh_token)
            throw new Error("No refresh_token detected.");
          const token_type = getParameterByName("token_type");
          if (!token_type)
            throw new Error("No token_type detected.");
          const timeNow = Math.round(Date.now() / 1e3);
          const expires_at = timeNow + parseInt(expires_in);
          const { user, error } = yield this.api.getUser(access_token);
          if (error)
            throw error;
          const session = {
            provider_token,
            access_token,
            expires_in: parseInt(expires_in),
            expires_at,
            refresh_token,
            token_type,
            user
          };
          if (options2 === null || options2 === void 0 ? void 0 : options2.storeSession) {
            this._saveSession(session);
            this._notifyAllSubscribers("SIGNED_IN");
            if (getParameterByName("type") === "recovery") {
              this._notifyAllSubscribers("PASSWORD_RECOVERY");
            }
          }
          window.location.hash = "";
          return { data: session, error: null };
        } catch (error) {
          return { data: null, error };
        }
      });
    }
    signOut() {
      var _a;
      return __awaiter3(this, void 0, void 0, function* () {
        const accessToken = (_a = this.currentSession) === null || _a === void 0 ? void 0 : _a.access_token;
        this._removeSession();
        this._notifyAllSubscribers("SIGNED_OUT");
        if (accessToken) {
          const { error } = yield this.api.signOut(accessToken);
          if (error)
            return { error };
        }
        return { error: null };
      });
    }
    onAuthStateChange(callback) {
      try {
        const id = uuid();
        const self2 = this;
        const subscription = {
          id,
          callback,
          unsubscribe: () => {
            self2.stateChangeEmitters.delete(id);
          }
        };
        this.stateChangeEmitters.set(id, subscription);
        return { data: subscription, error: null };
      } catch (error) {
        return { data: null, error };
      }
    }
    _handleEmailSignIn(email, password, options2 = {}) {
      var _a, _b;
      return __awaiter3(this, void 0, void 0, function* () {
        try {
          const { data, error } = yield this.api.signInWithEmail(email, password, {
            redirectTo: options2.redirectTo
          });
          if (error || !data)
            return { data: null, user: null, session: null, error };
          if (((_a = data === null || data === void 0 ? void 0 : data.user) === null || _a === void 0 ? void 0 : _a.confirmed_at) || ((_b = data === null || data === void 0 ? void 0 : data.user) === null || _b === void 0 ? void 0 : _b.email_confirmed_at)) {
            this._saveSession(data);
            this._notifyAllSubscribers("SIGNED_IN");
          }
          return { data, user: data.user, session: data, error: null };
        } catch (error) {
          return { data: null, user: null, session: null, error };
        }
      });
    }
    _handlePhoneSignIn(phone, password) {
      var _a;
      return __awaiter3(this, void 0, void 0, function* () {
        try {
          const { data, error } = yield this.api.signInWithPhone(phone, password);
          if (error || !data)
            return { data: null, user: null, session: null, error };
          if ((_a = data === null || data === void 0 ? void 0 : data.user) === null || _a === void 0 ? void 0 : _a.phone_confirmed_at) {
            this._saveSession(data);
            this._notifyAllSubscribers("SIGNED_IN");
          }
          return { data, user: data.user, session: data, error: null };
        } catch (error) {
          return { data: null, user: null, session: null, error };
        }
      });
    }
    _handleProviderSignIn(provider, options2 = {}) {
      const url = this.api.getUrlForProvider(provider, {
        redirectTo: options2.redirectTo,
        scopes: options2.scopes
      });
      try {
        if (isBrowser()) {
          window.location.href = url;
        }
        return { provider, url, data: null, session: null, user: null, error: null };
      } catch (error) {
        if (!!url)
          return { provider, url, data: null, session: null, user: null, error: null };
        return { data: null, user: null, session: null, error };
      }
    }
    _recoverSession() {
      var _a;
      try {
        const json = isBrowser() && ((_a = this.localStorage) === null || _a === void 0 ? void 0 : _a.getItem(STORAGE_KEY));
        if (!json || typeof json !== "string") {
          return null;
        }
        const data = JSON.parse(json);
        const { currentSession, expiresAt: expiresAt2 } = data;
        const timeNow = Math.round(Date.now() / 1e3);
        if (expiresAt2 >= timeNow && (currentSession === null || currentSession === void 0 ? void 0 : currentSession.user)) {
          this._saveSession(currentSession);
          this._notifyAllSubscribers("SIGNED_IN");
        }
      } catch (error) {
        console.log("error", error);
      }
    }
    _recoverAndRefresh() {
      return __awaiter3(this, void 0, void 0, function* () {
        try {
          const json = isBrowser() && (yield this.localStorage.getItem(STORAGE_KEY));
          if (!json) {
            return null;
          }
          const data = JSON.parse(json);
          const { currentSession, expiresAt: expiresAt2 } = data;
          const timeNow = Math.round(Date.now() / 1e3);
          if (expiresAt2 < timeNow) {
            if (this.autoRefreshToken && currentSession.refresh_token) {
              const { error } = yield this._callRefreshToken(currentSession.refresh_token);
              if (error) {
                console.log(error.message);
                yield this._removeSession();
              }
            } else {
              this._removeSession();
            }
          } else if (!currentSession || !currentSession.user) {
            console.log("Current session is missing data.");
            this._removeSession();
          } else {
            this._saveSession(currentSession);
            this._notifyAllSubscribers("SIGNED_IN");
          }
        } catch (err) {
          console.error(err);
          return null;
        }
      });
    }
    _callRefreshToken(refresh_token) {
      var _a;
      if (refresh_token === void 0) {
        refresh_token = (_a = this.currentSession) === null || _a === void 0 ? void 0 : _a.refresh_token;
      }
      return __awaiter3(this, void 0, void 0, function* () {
        try {
          if (!refresh_token) {
            throw new Error("No current session.");
          }
          const { data, error } = yield this.api.refreshAccessToken(refresh_token);
          if (error)
            throw error;
          if (!data)
            throw Error("Invalid session data.");
          this._saveSession(data);
          this._notifyAllSubscribers("SIGNED_IN");
          return { data, error: null };
        } catch (error) {
          return { data: null, error };
        }
      });
    }
    _notifyAllSubscribers(event) {
      this.stateChangeEmitters.forEach((x) => x.callback(event, this.currentSession));
    }
    _saveSession(session) {
      this.currentSession = session;
      this.currentUser = session.user;
      const expiresAt2 = session.expires_at;
      if (expiresAt2) {
        const timeNow = Math.round(Date.now() / 1e3);
        const expiresIn = expiresAt2 - timeNow;
        const refreshDurationBeforeExpires = expiresIn > 60 ? 60 : 0.5;
        this._startAutoRefreshToken((expiresIn - refreshDurationBeforeExpires) * 1e3);
      }
      if (this.persistSession && session.expires_at) {
        this._persistSession(this.currentSession);
      }
    }
    _persistSession(currentSession) {
      const data = { currentSession, expiresAt: currentSession.expires_at };
      isBrowser() && this.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
    _removeSession() {
      return __awaiter3(this, void 0, void 0, function* () {
        this.currentSession = null;
        this.currentUser = null;
        if (this.refreshTokenTimer)
          clearTimeout(this.refreshTokenTimer);
        isBrowser() && (yield this.localStorage.removeItem(STORAGE_KEY));
      });
    }
    _startAutoRefreshToken(value) {
      if (this.refreshTokenTimer)
        clearTimeout(this.refreshTokenTimer);
      if (value <= 0 || !this.autoRefreshToken)
        return;
      this.refreshTokenTimer = setTimeout(() => this._callRefreshToken(), value);
      if (typeof this.refreshTokenTimer.unref === "function")
        this.refreshTokenTimer.unref();
    }
  };

  // node_modules/@supabase/supabase-js/dist/module/lib/SupabaseAuthClient.js
  var SupabaseAuthClient = class extends GoTrueClient {
    constructor(options2) {
      super(options2);
    }
  };

  // node_modules/@supabase/postgrest-js/dist/module/lib/types.js
  var import_cross_fetch2 = __toModule(require_cross_fetch());
  var __awaiter4 = function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var PostgrestBuilder = class {
    constructor(builder) {
      Object.assign(this, builder);
    }
    throwOnError() {
      this.shouldThrowOnError = true;
      return this;
    }
    then(onfulfilled, onrejected) {
      if (typeof this.schema === "undefined") {
      } else if (["GET", "HEAD"].includes(this.method)) {
        this.headers["Accept-Profile"] = this.schema;
      } else {
        this.headers["Content-Profile"] = this.schema;
      }
      if (this.method !== "GET" && this.method !== "HEAD") {
        this.headers["Content-Type"] = "application/json";
      }
      return (0, import_cross_fetch2.default)(this.url.toString(), {
        method: this.method,
        headers: this.headers,
        body: JSON.stringify(this.body)
      }).then((res) => __awaiter4(this, void 0, void 0, function* () {
        var _a, _b, _c;
        let error = null;
        let data = null;
        let count = null;
        if (res.ok) {
          const isReturnMinimal = (_a = this.headers["Prefer"]) === null || _a === void 0 ? void 0 : _a.split(",").includes("return=minimal");
          if (this.method !== "HEAD" && !isReturnMinimal) {
            const text = yield res.text();
            if (!text) {
            } else if (this.headers["Accept"] === "text/csv") {
              data = text;
            } else {
              data = JSON.parse(text);
            }
          }
          const countHeader = (_b = this.headers["Prefer"]) === null || _b === void 0 ? void 0 : _b.match(/count=(exact|planned|estimated)/);
          const contentRange = (_c = res.headers.get("content-range")) === null || _c === void 0 ? void 0 : _c.split("/");
          if (countHeader && contentRange && contentRange.length > 1) {
            count = parseInt(contentRange[1]);
          }
        } else {
          error = yield res.json();
          if (error && this.shouldThrowOnError) {
            throw error;
          }
        }
        const postgrestResponse = {
          error,
          data,
          count,
          status: res.status,
          statusText: res.statusText,
          body: data
        };
        return postgrestResponse;
      })).then(onfulfilled, onrejected);
    }
  };

  // node_modules/@supabase/postgrest-js/dist/module/lib/PostgrestTransformBuilder.js
  var PostgrestTransformBuilder = class extends PostgrestBuilder {
    select(columns = "*") {
      let quoted = false;
      const cleanedColumns = columns.split("").map((c2) => {
        if (/\s/.test(c2) && !quoted) {
          return "";
        }
        if (c2 === '"') {
          quoted = !quoted;
        }
        return c2;
      }).join("");
      this.url.searchParams.set("select", cleanedColumns);
      return this;
    }
    order(column, { ascending = true, nullsFirst = false, foreignTable } = {}) {
      const key = typeof foreignTable === "undefined" ? "order" : `${foreignTable}.order`;
      const existingOrder = this.url.searchParams.get(key);
      this.url.searchParams.set(key, `${existingOrder ? `${existingOrder},` : ""}${column}.${ascending ? "asc" : "desc"}.${nullsFirst ? "nullsfirst" : "nullslast"}`);
      return this;
    }
    limit(count, { foreignTable } = {}) {
      const key = typeof foreignTable === "undefined" ? "limit" : `${foreignTable}.limit`;
      this.url.searchParams.set(key, `${count}`);
      return this;
    }
    range(from, to, { foreignTable } = {}) {
      const keyOffset = typeof foreignTable === "undefined" ? "offset" : `${foreignTable}.offset`;
      const keyLimit = typeof foreignTable === "undefined" ? "limit" : `${foreignTable}.limit`;
      this.url.searchParams.set(keyOffset, `${from}`);
      this.url.searchParams.set(keyLimit, `${to - from + 1}`);
      return this;
    }
    single() {
      this.headers["Accept"] = "application/vnd.pgrst.object+json";
      return this;
    }
    maybeSingle() {
      this.headers["Accept"] = "application/vnd.pgrst.object+json";
      const _this = new PostgrestTransformBuilder(this);
      _this.then = (onfulfilled, onrejected) => this.then((res) => {
        var _a;
        if ((_a = res.error) === null || _a === void 0 ? void 0 : _a.details.includes("Results contain 0 rows")) {
          return onfulfilled({
            error: null,
            data: null,
            count: res.count,
            status: 200,
            statusText: "OK",
            body: null
          });
        }
        return onfulfilled(res);
      }, onrejected);
      return _this;
    }
    csv() {
      this.headers["Accept"] = "text/csv";
      return this;
    }
  };

  // node_modules/@supabase/postgrest-js/dist/module/lib/PostgrestFilterBuilder.js
  var PostgrestFilterBuilder = class extends PostgrestTransformBuilder {
    constructor() {
      super(...arguments);
      this.cs = this.contains;
      this.cd = this.containedBy;
      this.sl = this.rangeLt;
      this.sr = this.rangeGt;
      this.nxl = this.rangeGte;
      this.nxr = this.rangeLte;
      this.adj = this.rangeAdjacent;
      this.ov = this.overlaps;
    }
    not(column, operator, value) {
      this.url.searchParams.append(`${column}`, `not.${operator}.${value}`);
      return this;
    }
    or(filters, { foreignTable } = {}) {
      const key = typeof foreignTable === "undefined" ? "or" : `${foreignTable}.or`;
      this.url.searchParams.append(key, `(${filters})`);
      return this;
    }
    eq(column, value) {
      this.url.searchParams.append(`${column}`, `eq.${value}`);
      return this;
    }
    neq(column, value) {
      this.url.searchParams.append(`${column}`, `neq.${value}`);
      return this;
    }
    gt(column, value) {
      this.url.searchParams.append(`${column}`, `gt.${value}`);
      return this;
    }
    gte(column, value) {
      this.url.searchParams.append(`${column}`, `gte.${value}`);
      return this;
    }
    lt(column, value) {
      this.url.searchParams.append(`${column}`, `lt.${value}`);
      return this;
    }
    lte(column, value) {
      this.url.searchParams.append(`${column}`, `lte.${value}`);
      return this;
    }
    like(column, pattern) {
      this.url.searchParams.append(`${column}`, `like.${pattern}`);
      return this;
    }
    ilike(column, pattern) {
      this.url.searchParams.append(`${column}`, `ilike.${pattern}`);
      return this;
    }
    is(column, value) {
      this.url.searchParams.append(`${column}`, `is.${value}`);
      return this;
    }
    in(column, values) {
      const cleanedValues = values.map((s) => {
        if (typeof s === "string" && new RegExp("[,()]").test(s))
          return `"${s}"`;
        else
          return `${s}`;
      }).join(",");
      this.url.searchParams.append(`${column}`, `in.(${cleanedValues})`);
      return this;
    }
    contains(column, value) {
      if (typeof value === "string") {
        this.url.searchParams.append(`${column}`, `cs.${value}`);
      } else if (Array.isArray(value)) {
        this.url.searchParams.append(`${column}`, `cs.{${value.join(",")}}`);
      } else {
        this.url.searchParams.append(`${column}`, `cs.${JSON.stringify(value)}`);
      }
      return this;
    }
    containedBy(column, value) {
      if (typeof value === "string") {
        this.url.searchParams.append(`${column}`, `cd.${value}`);
      } else if (Array.isArray(value)) {
        this.url.searchParams.append(`${column}`, `cd.{${value.join(",")}}`);
      } else {
        this.url.searchParams.append(`${column}`, `cd.${JSON.stringify(value)}`);
      }
      return this;
    }
    rangeLt(column, range) {
      this.url.searchParams.append(`${column}`, `sl.${range}`);
      return this;
    }
    rangeGt(column, range) {
      this.url.searchParams.append(`${column}`, `sr.${range}`);
      return this;
    }
    rangeGte(column, range) {
      this.url.searchParams.append(`${column}`, `nxl.${range}`);
      return this;
    }
    rangeLte(column, range) {
      this.url.searchParams.append(`${column}`, `nxr.${range}`);
      return this;
    }
    rangeAdjacent(column, range) {
      this.url.searchParams.append(`${column}`, `adj.${range}`);
      return this;
    }
    overlaps(column, value) {
      if (typeof value === "string") {
        this.url.searchParams.append(`${column}`, `ov.${value}`);
      } else {
        this.url.searchParams.append(`${column}`, `ov.{${value.join(",")}}`);
      }
      return this;
    }
    textSearch(column, query, { config, type = null } = {}) {
      let typePart = "";
      if (type === "plain") {
        typePart = "pl";
      } else if (type === "phrase") {
        typePart = "ph";
      } else if (type === "websearch") {
        typePart = "w";
      }
      const configPart = config === void 0 ? "" : `(${config})`;
      this.url.searchParams.append(`${column}`, `${typePart}fts${configPart}.${query}`);
      return this;
    }
    fts(column, query, { config } = {}) {
      const configPart = typeof config === "undefined" ? "" : `(${config})`;
      this.url.searchParams.append(`${column}`, `fts${configPart}.${query}`);
      return this;
    }
    plfts(column, query, { config } = {}) {
      const configPart = typeof config === "undefined" ? "" : `(${config})`;
      this.url.searchParams.append(`${column}`, `plfts${configPart}.${query}`);
      return this;
    }
    phfts(column, query, { config } = {}) {
      const configPart = typeof config === "undefined" ? "" : `(${config})`;
      this.url.searchParams.append(`${column}`, `phfts${configPart}.${query}`);
      return this;
    }
    wfts(column, query, { config } = {}) {
      const configPart = typeof config === "undefined" ? "" : `(${config})`;
      this.url.searchParams.append(`${column}`, `wfts${configPart}.${query}`);
      return this;
    }
    filter(column, operator, value) {
      this.url.searchParams.append(`${column}`, `${operator}.${value}`);
      return this;
    }
    match(query) {
      Object.keys(query).forEach((key) => {
        this.url.searchParams.append(`${key}`, `eq.${query[key]}`);
      });
      return this;
    }
  };

  // node_modules/@supabase/postgrest-js/dist/module/lib/PostgrestQueryBuilder.js
  var PostgrestQueryBuilder = class extends PostgrestBuilder {
    constructor(url, { headers = {}, schema } = {}) {
      super({});
      this.url = new URL(url);
      this.headers = Object.assign({}, headers);
      this.schema = schema;
    }
    select(columns = "*", { head = false, count = null } = {}) {
      this.method = "GET";
      let quoted = false;
      const cleanedColumns = columns.split("").map((c2) => {
        if (/\s/.test(c2) && !quoted) {
          return "";
        }
        if (c2 === '"') {
          quoted = !quoted;
        }
        return c2;
      }).join("");
      this.url.searchParams.set("select", cleanedColumns);
      if (count) {
        this.headers["Prefer"] = `count=${count}`;
      }
      if (head) {
        this.method = "HEAD";
      }
      return new PostgrestFilterBuilder(this);
    }
    insert(values, { upsert = false, onConflict, returning = "representation", count = null } = {}) {
      this.method = "POST";
      const prefersHeaders = [`return=${returning}`];
      if (upsert)
        prefersHeaders.push("resolution=merge-duplicates");
      if (upsert && onConflict !== void 0)
        this.url.searchParams.set("on_conflict", onConflict);
      this.body = values;
      if (count) {
        prefersHeaders.push(`count=${count}`);
      }
      this.headers["Prefer"] = prefersHeaders.join(",");
      if (Array.isArray(values)) {
        const columns = values.reduce((acc, x) => acc.concat(Object.keys(x)), []);
        if (columns.length > 0) {
          const uniqueColumns = [...new Set(columns)];
          this.url.searchParams.set("columns", uniqueColumns.join(","));
        }
      }
      return new PostgrestFilterBuilder(this);
    }
    upsert(values, { onConflict, returning = "representation", count = null, ignoreDuplicates = false } = {}) {
      this.method = "POST";
      const prefersHeaders = [
        `resolution=${ignoreDuplicates ? "ignore" : "merge"}-duplicates`,
        `return=${returning}`
      ];
      if (onConflict !== void 0)
        this.url.searchParams.set("on_conflict", onConflict);
      this.body = values;
      if (count) {
        prefersHeaders.push(`count=${count}`);
      }
      this.headers["Prefer"] = prefersHeaders.join(",");
      return new PostgrestFilterBuilder(this);
    }
    update(values, { returning = "representation", count = null } = {}) {
      this.method = "PATCH";
      const prefersHeaders = [`return=${returning}`];
      this.body = values;
      if (count) {
        prefersHeaders.push(`count=${count}`);
      }
      this.headers["Prefer"] = prefersHeaders.join(",");
      return new PostgrestFilterBuilder(this);
    }
    delete({ returning = "representation", count = null } = {}) {
      this.method = "DELETE";
      const prefersHeaders = [`return=${returning}`];
      if (count) {
        prefersHeaders.push(`count=${count}`);
      }
      this.headers["Prefer"] = prefersHeaders.join(",");
      return new PostgrestFilterBuilder(this);
    }
  };

  // node_modules/@supabase/postgrest-js/dist/module/lib/PostgrestRpcBuilder.js
  var PostgrestRpcBuilder = class extends PostgrestBuilder {
    constructor(url, { headers = {}, schema } = {}) {
      super({});
      this.url = new URL(url);
      this.headers = Object.assign({}, headers);
      this.schema = schema;
    }
    rpc(params, { count = null } = {}) {
      this.method = "POST";
      this.body = params;
      if (count) {
        if (this.headers["Prefer"] !== void 0)
          this.headers["Prefer"] += `,count=${count}`;
        else
          this.headers["Prefer"] = `count=${count}`;
      }
      return new PostgrestFilterBuilder(this);
    }
  };

  // node_modules/@supabase/postgrest-js/dist/module/PostgrestClient.js
  var PostgrestClient = class {
    constructor(url, { headers = {}, schema } = {}) {
      this.url = url;
      this.headers = headers;
      this.schema = schema;
    }
    auth(token) {
      this.headers["Authorization"] = `Bearer ${token}`;
      return this;
    }
    from(table) {
      const url = `${this.url}/${table}`;
      return new PostgrestQueryBuilder(url, { headers: this.headers, schema: this.schema });
    }
    rpc(fn, params, { count = null } = {}) {
      const url = `${this.url}/rpc/${fn}`;
      return new PostgrestRpcBuilder(url, {
        headers: this.headers,
        schema: this.schema
      }).rpc(params, { count });
    }
  };

  // node_modules/@supabase/realtime-js/dist/module/lib/transformers.js
  var transformers_exports = {};
  __export(transformers_exports, {
    PostgresTypes: () => PostgresTypes,
    convertCell: () => convertCell,
    convertChangeData: () => convertChangeData,
    convertColumn: () => convertColumn,
    toArray: () => toArray,
    toBoolean: () => toBoolean,
    toDate: () => toDate,
    toDateRange: () => toDateRange,
    toFloat: () => toFloat,
    toInt: () => toInt,
    toIntRange: () => toIntRange,
    toJson: () => toJson,
    toTimestampString: () => toTimestampString
  });
  var PostgresTypes;
  (function(PostgresTypes2) {
    PostgresTypes2["abstime"] = "abstime";
    PostgresTypes2["bool"] = "bool";
    PostgresTypes2["date"] = "date";
    PostgresTypes2["daterange"] = "daterange";
    PostgresTypes2["float4"] = "float4";
    PostgresTypes2["float8"] = "float8";
    PostgresTypes2["int2"] = "int2";
    PostgresTypes2["int4"] = "int4";
    PostgresTypes2["int4range"] = "int4range";
    PostgresTypes2["int8"] = "int8";
    PostgresTypes2["int8range"] = "int8range";
    PostgresTypes2["json"] = "json";
    PostgresTypes2["jsonb"] = "jsonb";
    PostgresTypes2["money"] = "money";
    PostgresTypes2["numeric"] = "numeric";
    PostgresTypes2["oid"] = "oid";
    PostgresTypes2["reltime"] = "reltime";
    PostgresTypes2["time"] = "time";
    PostgresTypes2["timestamp"] = "timestamp";
    PostgresTypes2["timestamptz"] = "timestamptz";
    PostgresTypes2["timetz"] = "timetz";
    PostgresTypes2["tsrange"] = "tsrange";
    PostgresTypes2["tstzrange"] = "tstzrange";
  })(PostgresTypes || (PostgresTypes = {}));
  var convertChangeData = (columns, records, options2 = {}) => {
    let result = {};
    let skipTypes = typeof options2.skipTypes !== "undefined" ? options2.skipTypes : [];
    Object.entries(records).map(([key, value]) => {
      result[key] = convertColumn(key, columns, records, skipTypes);
    });
    return result;
  };
  var convertColumn = (columnName, columns, records, skipTypes) => {
    let column = columns.find((x) => x.name == columnName);
    if (!column || skipTypes.includes(column.type)) {
      return noop(records[columnName]);
    } else {
      return convertCell(column.type, records[columnName]);
    }
  };
  var convertCell = (type, stringValue) => {
    try {
      if (stringValue === null)
        return null;
      if (type.charAt(0) === "_") {
        let arrayValue = type.slice(1, type.length);
        return toArray(stringValue, arrayValue);
      }
      switch (type) {
        case PostgresTypes.abstime:
          return noop(stringValue);
        case PostgresTypes.bool:
          return toBoolean(stringValue);
        case PostgresTypes.date:
          return noop(stringValue);
        case PostgresTypes.daterange:
          return toDateRange(stringValue);
        case PostgresTypes.float4:
          return toFloat(stringValue);
        case PostgresTypes.float8:
          return toFloat(stringValue);
        case PostgresTypes.int2:
          return toInt(stringValue);
        case PostgresTypes.int4:
          return toInt(stringValue);
        case PostgresTypes.int4range:
          return toIntRange(stringValue);
        case PostgresTypes.int8:
          return toInt(stringValue);
        case PostgresTypes.int8range:
          return toIntRange(stringValue);
        case PostgresTypes.json:
          return toJson(stringValue);
        case PostgresTypes.jsonb:
          return toJson(stringValue);
        case PostgresTypes.money:
          return toFloat(stringValue);
        case PostgresTypes.numeric:
          return toFloat(stringValue);
        case PostgresTypes.oid:
          return toInt(stringValue);
        case PostgresTypes.reltime:
          return noop(stringValue);
        case PostgresTypes.time:
          return noop(stringValue);
        case PostgresTypes.timestamp:
          return toTimestampString(stringValue);
        case PostgresTypes.timestamptz:
          return noop(stringValue);
        case PostgresTypes.timetz:
          return noop(stringValue);
        case PostgresTypes.tsrange:
          return toDateRange(stringValue);
        case PostgresTypes.tstzrange:
          return toDateRange(stringValue);
        default:
          return noop(stringValue);
      }
    } catch (error) {
      console.log(`Could not convert cell of type ${type} and value ${stringValue}`);
      console.log(`This is the error: ${error}`);
      return stringValue;
    }
  };
  var noop = (stringValue) => {
    return stringValue;
  };
  var toBoolean = (stringValue) => {
    switch (stringValue) {
      case "t":
        return true;
      case "f":
        return false;
      default:
        return null;
    }
  };
  var toDate = (stringValue) => {
    return new Date(stringValue);
  };
  var toDateRange = (stringValue) => {
    let arr = JSON.parse(stringValue);
    return [new Date(arr[0]), new Date(arr[1])];
  };
  var toFloat = (stringValue) => {
    return parseFloat(stringValue);
  };
  var toInt = (stringValue) => {
    return parseInt(stringValue);
  };
  var toIntRange = (stringValue) => {
    let arr = JSON.parse(stringValue);
    return [parseInt(arr[0]), parseInt(arr[1])];
  };
  var toJson = (stringValue) => {
    return JSON.parse(stringValue);
  };
  var toArray = (stringValue, type) => {
    let stringEnriched = stringValue.slice(1, stringValue.length - 1);
    let stringArray = stringEnriched.length > 0 ? stringEnriched.split(",") : [];
    let array = stringArray.map((string) => {
      return convertCell(type, string);
    });
    return array;
  };
  var toTimestampString = (stringValue) => {
    return stringValue.replace(" ", "T");
  };

  // node_modules/@supabase/realtime-js/dist/module/lib/constants.js
  var VSN = "1.0.0";
  var DEFAULT_TIMEOUT = 1e4;
  var WS_CLOSE_NORMAL = 1e3;
  var SOCKET_STATES;
  (function(SOCKET_STATES2) {
    SOCKET_STATES2[SOCKET_STATES2["connecting"] = 0] = "connecting";
    SOCKET_STATES2[SOCKET_STATES2["open"] = 1] = "open";
    SOCKET_STATES2[SOCKET_STATES2["closing"] = 2] = "closing";
    SOCKET_STATES2[SOCKET_STATES2["closed"] = 3] = "closed";
  })(SOCKET_STATES || (SOCKET_STATES = {}));
  var CHANNEL_STATES;
  (function(CHANNEL_STATES2) {
    CHANNEL_STATES2["closed"] = "closed";
    CHANNEL_STATES2["errored"] = "errored";
    CHANNEL_STATES2["joined"] = "joined";
    CHANNEL_STATES2["joining"] = "joining";
    CHANNEL_STATES2["leaving"] = "leaving";
  })(CHANNEL_STATES || (CHANNEL_STATES = {}));
  var CHANNEL_EVENTS;
  (function(CHANNEL_EVENTS2) {
    CHANNEL_EVENTS2["close"] = "phx_close";
    CHANNEL_EVENTS2["error"] = "phx_error";
    CHANNEL_EVENTS2["join"] = "phx_join";
    CHANNEL_EVENTS2["reply"] = "phx_reply";
    CHANNEL_EVENTS2["leave"] = "phx_leave";
  })(CHANNEL_EVENTS || (CHANNEL_EVENTS = {}));
  var TRANSPORTS;
  (function(TRANSPORTS2) {
    TRANSPORTS2["websocket"] = "websocket";
  })(TRANSPORTS || (TRANSPORTS = {}));

  // node_modules/@supabase/realtime-js/dist/module/lib/timer.js
  var Timer = class {
    constructor(callback, timerCalc) {
      this.callback = callback;
      this.timerCalc = timerCalc;
      this.timer = void 0;
      this.tries = 0;
      this.callback = callback;
      this.timerCalc = timerCalc;
    }
    reset() {
      this.tries = 0;
      clearTimeout(this.timer);
    }
    scheduleTimeout() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.tries = this.tries + 1;
        this.callback();
      }, this.timerCalc(this.tries + 1));
    }
  };

  // node_modules/@supabase/realtime-js/dist/module/lib/push.js
  var Push = class {
    constructor(channel, event, payload = {}, timeout = DEFAULT_TIMEOUT) {
      this.channel = channel;
      this.event = event;
      this.payload = payload;
      this.timeout = timeout;
      this.sent = false;
      this.timeoutTimer = void 0;
      this.ref = "";
      this.receivedResp = null;
      this.recHooks = [];
      this.refEvent = null;
    }
    resend(timeout) {
      this.timeout = timeout;
      this._cancelRefEvent();
      this.ref = "";
      this.refEvent = null;
      this.receivedResp = null;
      this.sent = false;
      this.send();
    }
    send() {
      if (this._hasReceived("timeout")) {
        return;
      }
      this.startTimeout();
      this.sent = true;
      this.channel.socket.push({
        topic: this.channel.topic,
        event: this.event,
        payload: this.payload,
        ref: this.ref
      });
    }
    receive(status, callback) {
      var _a;
      if (this._hasReceived(status)) {
        callback((_a = this.receivedResp) === null || _a === void 0 ? void 0 : _a.response);
      }
      this.recHooks.push({ status, callback });
      return this;
    }
    startTimeout() {
      if (this.timeoutTimer) {
        return;
      }
      this.ref = this.channel.socket.makeRef();
      this.refEvent = this.channel.replyEventName(this.ref);
      this.channel.on(this.refEvent, (payload) => {
        this._cancelRefEvent();
        this._cancelTimeout();
        this.receivedResp = payload;
        this._matchReceive(payload);
      });
      this.timeoutTimer = setTimeout(() => {
        this.trigger("timeout", {});
      }, this.timeout);
    }
    trigger(status, response) {
      if (this.refEvent)
        this.channel.trigger(this.refEvent, { status, response });
    }
    destroy() {
      this._cancelRefEvent();
      this._cancelTimeout();
    }
    _cancelRefEvent() {
      if (!this.refEvent) {
        return;
      }
      this.channel.off(this.refEvent);
    }
    _cancelTimeout() {
      clearTimeout(this.timeoutTimer);
      this.timeoutTimer = void 0;
    }
    _matchReceive({ status, response }) {
      this.recHooks.filter((h) => h.status === status).forEach((h) => h.callback(response));
    }
    _hasReceived(status) {
      return this.receivedResp && this.receivedResp.status === status;
    }
  };

  // node_modules/@supabase/realtime-js/dist/module/RealtimeSubscription.js
  var RealtimeSubscription = class {
    constructor(topic, params = {}, socket) {
      this.topic = topic;
      this.params = params;
      this.socket = socket;
      this.bindings = [];
      this.state = CHANNEL_STATES.closed;
      this.joinedOnce = false;
      this.pushBuffer = [];
      this.timeout = this.socket.timeout;
      this.joinPush = new Push(this, CHANNEL_EVENTS.join, this.params, this.timeout);
      this.rejoinTimer = new Timer(() => this.rejoinUntilConnected(), this.socket.reconnectAfterMs);
      this.joinPush.receive("ok", () => {
        this.state = CHANNEL_STATES.joined;
        this.rejoinTimer.reset();
        this.pushBuffer.forEach((pushEvent) => pushEvent.send());
        this.pushBuffer = [];
      });
      this.onClose(() => {
        this.rejoinTimer.reset();
        this.socket.log("channel", `close ${this.topic} ${this.joinRef()}`);
        this.state = CHANNEL_STATES.closed;
        this.socket.remove(this);
      });
      this.onError((reason) => {
        if (this.isLeaving() || this.isClosed()) {
          return;
        }
        this.socket.log("channel", `error ${this.topic}`, reason);
        this.state = CHANNEL_STATES.errored;
        this.rejoinTimer.scheduleTimeout();
      });
      this.joinPush.receive("timeout", () => {
        if (!this.isJoining()) {
          return;
        }
        this.socket.log("channel", `timeout ${this.topic}`, this.joinPush.timeout);
        this.state = CHANNEL_STATES.errored;
        this.rejoinTimer.scheduleTimeout();
      });
      this.on(CHANNEL_EVENTS.reply, (payload, ref) => {
        this.trigger(this.replyEventName(ref), payload);
      });
    }
    rejoinUntilConnected() {
      this.rejoinTimer.scheduleTimeout();
      if (this.socket.isConnected()) {
        this.rejoin();
      }
    }
    subscribe(timeout = this.timeout) {
      if (this.joinedOnce) {
        throw `tried to subscribe multiple times. 'subscribe' can only be called a single time per channel instance`;
      } else {
        this.joinedOnce = true;
        this.rejoin(timeout);
        return this.joinPush;
      }
    }
    onClose(callback) {
      this.on(CHANNEL_EVENTS.close, callback);
    }
    onError(callback) {
      this.on(CHANNEL_EVENTS.error, (reason) => callback(reason));
    }
    on(event, callback) {
      this.bindings.push({ event, callback });
    }
    off(event) {
      this.bindings = this.bindings.filter((bind) => bind.event !== event);
    }
    canPush() {
      return this.socket.isConnected() && this.isJoined();
    }
    push(event, payload, timeout = this.timeout) {
      if (!this.joinedOnce) {
        throw `tried to push '${event}' to '${this.topic}' before joining. Use channel.subscribe() before pushing events`;
      }
      let pushEvent = new Push(this, event, payload, timeout);
      if (this.canPush()) {
        pushEvent.send();
      } else {
        pushEvent.startTimeout();
        this.pushBuffer.push(pushEvent);
      }
      return pushEvent;
    }
    unsubscribe(timeout = this.timeout) {
      this.state = CHANNEL_STATES.leaving;
      let onClose = () => {
        this.socket.log("channel", `leave ${this.topic}`);
        this.trigger(CHANNEL_EVENTS.close, "leave", this.joinRef());
      };
      this.joinPush.destroy();
      let leavePush = new Push(this, CHANNEL_EVENTS.leave, {}, timeout);
      leavePush.receive("ok", () => onClose()).receive("timeout", () => onClose());
      leavePush.send();
      if (!this.canPush()) {
        leavePush.trigger("ok", {});
      }
      return leavePush;
    }
    onMessage(event, payload, ref) {
      return payload;
    }
    isMember(topic) {
      return this.topic === topic;
    }
    joinRef() {
      return this.joinPush.ref;
    }
    sendJoin(timeout) {
      this.state = CHANNEL_STATES.joining;
      this.joinPush.resend(timeout);
    }
    rejoin(timeout = this.timeout) {
      if (this.isLeaving()) {
        return;
      }
      this.sendJoin(timeout);
    }
    trigger(event, payload, ref) {
      let { close, error, leave, join } = CHANNEL_EVENTS;
      let events = [close, error, leave, join];
      if (ref && events.indexOf(event) >= 0 && ref !== this.joinRef()) {
        return;
      }
      let handledPayload = this.onMessage(event, payload, ref);
      if (payload && !handledPayload) {
        throw "channel onMessage callbacks must return the payload, modified or unmodified";
      }
      this.bindings.filter((bind) => {
        if (bind.event === "*") {
          return event === (payload === null || payload === void 0 ? void 0 : payload.type);
        } else {
          return bind.event === event;
        }
      }).map((bind) => bind.callback(handledPayload, ref));
    }
    replyEventName(ref) {
      return `chan_reply_${ref}`;
    }
    isClosed() {
      return this.state === CHANNEL_STATES.closed;
    }
    isErrored() {
      return this.state === CHANNEL_STATES.errored;
    }
    isJoined() {
      return this.state === CHANNEL_STATES.joined;
    }
    isJoining() {
      return this.state === CHANNEL_STATES.joining;
    }
    isLeaving() {
      return this.state === CHANNEL_STATES.leaving;
    }
  };

  // node_modules/@supabase/realtime-js/dist/module/RealtimeClient.js
  var import_websocket = __toModule(require_browser());

  // node_modules/@supabase/realtime-js/dist/module/lib/serializer.js
  var Serializer = class {
    constructor() {
      this.HEADER_LENGTH = 1;
    }
    decode(rawPayload, callback) {
      if (rawPayload.constructor === ArrayBuffer) {
        return callback(this._binaryDecode(rawPayload));
      }
      if (typeof rawPayload === "string") {
        return callback(JSON.parse(rawPayload));
      }
      return callback({});
    }
    _binaryDecode(buffer) {
      const view = new DataView(buffer);
      const decoder = new TextDecoder();
      return this._decodeBroadcast(buffer, view, decoder);
    }
    _decodeBroadcast(buffer, view, decoder) {
      const topicSize = view.getUint8(1);
      const eventSize = view.getUint8(2);
      let offset = this.HEADER_LENGTH + 2;
      const topic = decoder.decode(buffer.slice(offset, offset + topicSize));
      offset = offset + topicSize;
      const event = decoder.decode(buffer.slice(offset, offset + eventSize));
      offset = offset + eventSize;
      const data = JSON.parse(decoder.decode(buffer.slice(offset, buffer.byteLength)));
      return { ref: null, topic, event, payload: data };
    }
  };

  // node_modules/@supabase/realtime-js/dist/module/RealtimeClient.js
  var __awaiter5 = function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var noop2 = () => {
  };
  var RealtimeClient = class {
    constructor(endPoint, options2) {
      this.channels = [];
      this.endPoint = "";
      this.headers = {};
      this.params = {};
      this.timeout = DEFAULT_TIMEOUT;
      this.transport = import_websocket.w3cwebsocket;
      this.heartbeatIntervalMs = 3e4;
      this.longpollerTimeout = 2e4;
      this.heartbeatTimer = void 0;
      this.pendingHeartbeatRef = null;
      this.ref = 0;
      this.logger = noop2;
      this.conn = null;
      this.sendBuffer = [];
      this.serializer = new Serializer();
      this.stateChangeCallbacks = {
        open: [],
        close: [],
        error: [],
        message: []
      };
      this.endPoint = `${endPoint}/${TRANSPORTS.websocket}`;
      if (options2 === null || options2 === void 0 ? void 0 : options2.params)
        this.params = options2.params;
      if (options2 === null || options2 === void 0 ? void 0 : options2.headers)
        this.headers = options2.headers;
      if (options2 === null || options2 === void 0 ? void 0 : options2.timeout)
        this.timeout = options2.timeout;
      if (options2 === null || options2 === void 0 ? void 0 : options2.logger)
        this.logger = options2.logger;
      if (options2 === null || options2 === void 0 ? void 0 : options2.transport)
        this.transport = options2.transport;
      if (options2 === null || options2 === void 0 ? void 0 : options2.heartbeatIntervalMs)
        this.heartbeatIntervalMs = options2.heartbeatIntervalMs;
      if (options2 === null || options2 === void 0 ? void 0 : options2.longpollerTimeout)
        this.longpollerTimeout = options2.longpollerTimeout;
      this.reconnectAfterMs = (options2 === null || options2 === void 0 ? void 0 : options2.reconnectAfterMs) ? options2.reconnectAfterMs : (tries) => {
        return [1e3, 2e3, 5e3, 1e4][tries - 1] || 1e4;
      };
      this.encode = (options2 === null || options2 === void 0 ? void 0 : options2.encode) ? options2.encode : (payload, callback) => {
        return callback(JSON.stringify(payload));
      };
      this.decode = (options2 === null || options2 === void 0 ? void 0 : options2.decode) ? options2.decode : this.serializer.decode.bind(this.serializer);
      this.reconnectTimer = new Timer(() => __awaiter5(this, void 0, void 0, function* () {
        yield this.disconnect();
        this.connect();
      }), this.reconnectAfterMs);
    }
    connect() {
      if (this.conn) {
        return;
      }
      this.conn = new this.transport(this.endPointURL(), [], null, this.headers);
      if (this.conn) {
        this.conn.binaryType = "arraybuffer";
        this.conn.onopen = () => this._onConnOpen();
        this.conn.onerror = (error) => this._onConnError(error);
        this.conn.onmessage = (event) => this.onConnMessage(event);
        this.conn.onclose = (event) => this._onConnClose(event);
      }
    }
    disconnect(code, reason) {
      return new Promise((resolve, _reject) => {
        try {
          if (this.conn) {
            this.conn.onclose = function() {
            };
            if (code) {
              this.conn.close(code, reason || "");
            } else {
              this.conn.close();
            }
            this.conn = null;
            this.heartbeatTimer && clearInterval(this.heartbeatTimer);
            this.reconnectTimer.reset();
          }
          resolve({ error: null, data: true });
        } catch (error) {
          resolve({ error, data: false });
        }
      });
    }
    log(kind, msg, data) {
      this.logger(kind, msg, data);
    }
    onOpen(callback) {
      this.stateChangeCallbacks.open.push(callback);
    }
    onClose(callback) {
      this.stateChangeCallbacks.close.push(callback);
    }
    onError(callback) {
      this.stateChangeCallbacks.error.push(callback);
    }
    onMessage(callback) {
      this.stateChangeCallbacks.message.push(callback);
    }
    connectionState() {
      switch (this.conn && this.conn.readyState) {
        case SOCKET_STATES.connecting:
          return "connecting";
        case SOCKET_STATES.open:
          return "open";
        case SOCKET_STATES.closing:
          return "closing";
        default:
          return "closed";
      }
    }
    isConnected() {
      return this.connectionState() === "open";
    }
    remove(channel) {
      this.channels = this.channels.filter((c2) => c2.joinRef() !== channel.joinRef());
    }
    channel(topic, chanParams = {}) {
      let chan = new RealtimeSubscription(topic, chanParams, this);
      this.channels.push(chan);
      return chan;
    }
    push(data) {
      let { topic, event, payload, ref } = data;
      let callback = () => {
        this.encode(data, (result) => {
          var _a;
          (_a = this.conn) === null || _a === void 0 ? void 0 : _a.send(result);
        });
      };
      this.log("push", `${topic} ${event} (${ref})`, payload);
      if (this.isConnected()) {
        callback();
      } else {
        this.sendBuffer.push(callback);
      }
    }
    onConnMessage(rawMessage) {
      this.decode(rawMessage.data, (msg) => {
        let { topic, event, payload, ref } = msg;
        if (ref && ref === this.pendingHeartbeatRef) {
          this.pendingHeartbeatRef = null;
        } else if (event === (payload === null || payload === void 0 ? void 0 : payload.type)) {
          this._resetHeartbeat();
        }
        this.log("receive", `${payload.status || ""} ${topic} ${event} ${ref && "(" + ref + ")" || ""}`, payload);
        this.channels.filter((channel) => channel.isMember(topic)).forEach((channel) => channel.trigger(event, payload, ref));
        this.stateChangeCallbacks.message.forEach((callback) => callback(msg));
      });
    }
    endPointURL() {
      return this._appendParams(this.endPoint, Object.assign({}, this.params, { vsn: VSN }));
    }
    makeRef() {
      let newRef = this.ref + 1;
      if (newRef === this.ref) {
        this.ref = 0;
      } else {
        this.ref = newRef;
      }
      return this.ref.toString();
    }
    _onConnOpen() {
      this.log("transport", `connected to ${this.endPointURL()}`);
      this._flushSendBuffer();
      this.reconnectTimer.reset();
      this._resetHeartbeat();
      this.stateChangeCallbacks.open.forEach((callback) => callback());
    }
    _onConnClose(event) {
      this.log("transport", "close", event);
      this._triggerChanError();
      this.heartbeatTimer && clearInterval(this.heartbeatTimer);
      this.reconnectTimer.scheduleTimeout();
      this.stateChangeCallbacks.close.forEach((callback) => callback(event));
    }
    _onConnError(error) {
      this.log("transport", error.message);
      this._triggerChanError();
      this.stateChangeCallbacks.error.forEach((callback) => callback(error));
    }
    _triggerChanError() {
      this.channels.forEach((channel) => channel.trigger(CHANNEL_EVENTS.error));
    }
    _appendParams(url, params) {
      if (Object.keys(params).length === 0) {
        return url;
      }
      const prefix = url.match(/\?/) ? "&" : "?";
      const query = new URLSearchParams(params);
      return `${url}${prefix}${query}`;
    }
    _flushSendBuffer() {
      if (this.isConnected() && this.sendBuffer.length > 0) {
        this.sendBuffer.forEach((callback) => callback());
        this.sendBuffer = [];
      }
    }
    _resetHeartbeat() {
      this.pendingHeartbeatRef = null;
      this.heartbeatTimer && clearInterval(this.heartbeatTimer);
      this.heartbeatTimer = setInterval(() => this._sendHeartbeat(), this.heartbeatIntervalMs);
    }
    _sendHeartbeat() {
      var _a;
      if (!this.isConnected()) {
        return;
      }
      if (this.pendingHeartbeatRef) {
        this.pendingHeartbeatRef = null;
        this.log("transport", "heartbeat timeout. Attempting to re-establish connection");
        (_a = this.conn) === null || _a === void 0 ? void 0 : _a.close(WS_CLOSE_NORMAL, "hearbeat timeout");
        return;
      }
      this.pendingHeartbeatRef = this.makeRef();
      this.push({
        topic: "phoenix",
        event: "heartbeat",
        payload: {},
        ref: this.pendingHeartbeatRef
      });
    }
  };

  // node_modules/@supabase/supabase-js/dist/module/lib/SupabaseRealtimeClient.js
  var SupabaseRealtimeClient = class {
    constructor(socket, schema, tableName) {
      const topic = tableName === "*" ? `realtime:${schema}` : `realtime:${schema}:${tableName}`;
      this.subscription = socket.channel(topic);
    }
    getPayloadRecords(payload) {
      const records = {
        new: {},
        old: {}
      };
      if (payload.type === "INSERT" || payload.type === "UPDATE") {
        records.new = transformers_exports.convertChangeData(payload.columns, payload.record);
      }
      if (payload.type === "UPDATE" || payload.type === "DELETE") {
        records.old = transformers_exports.convertChangeData(payload.columns, payload.old_record);
      }
      return records;
    }
    on(event, callback) {
      this.subscription.on(event, (payload) => {
        let enrichedPayload = {
          schema: payload.schema,
          table: payload.table,
          commit_timestamp: payload.commit_timestamp,
          eventType: payload.type,
          new: {},
          old: {}
        };
        enrichedPayload = Object.assign(Object.assign({}, enrichedPayload), this.getPayloadRecords(payload));
        callback(enrichedPayload);
      });
      return this;
    }
    subscribe(callback = () => {
    }) {
      this.subscription.onError((e) => callback("SUBSCRIPTION_ERROR", e));
      this.subscription.onClose(() => callback("CLOSED"));
      this.subscription.subscribe().receive("ok", () => callback("SUBSCRIBED")).receive("error", (e) => callback("SUBSCRIPTION_ERROR", e)).receive("timeout", () => callback("RETRYING_AFTER_TIMEOUT"));
      return this.subscription;
    }
  };

  // node_modules/@supabase/supabase-js/dist/module/lib/SupabaseQueryBuilder.js
  var SupabaseQueryBuilder = class extends PostgrestQueryBuilder {
    constructor(url, { headers = {}, schema, realtime, table }) {
      super(url, { headers, schema });
      this._subscription = new SupabaseRealtimeClient(realtime, schema, table);
      this._realtime = realtime;
    }
    on(event, callback) {
      if (!this._realtime.isConnected()) {
        this._realtime.connect();
      }
      return this._subscription.on(event, callback);
    }
  };

  // node_modules/@supabase/storage-js/dist/module/lib/fetch.js
  var import_cross_fetch3 = __toModule(require_cross_fetch());
  var __awaiter6 = function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var _getErrorMessage2 = (err) => err.msg || err.message || err.error_description || err.error || JSON.stringify(err);
  var handleError2 = (error, reject) => {
    if (typeof error.json !== "function") {
      return reject(error);
    }
    error.json().then((err) => {
      return reject({
        message: _getErrorMessage2(err),
        status: (error === null || error === void 0 ? void 0 : error.status) || 500
      });
    });
  };
  var _getRequestParams2 = (method, options2, parameters, body) => {
    const params = { method, headers: (options2 === null || options2 === void 0 ? void 0 : options2.headers) || {} };
    if (method === "GET") {
      return params;
    }
    params.headers = Object.assign({ "Content-Type": "application/json" }, options2 === null || options2 === void 0 ? void 0 : options2.headers);
    params.body = JSON.stringify(body);
    return Object.assign(Object.assign({}, params), parameters);
  };
  function _handleRequest2(method, url, options2, parameters, body) {
    return __awaiter6(this, void 0, void 0, function* () {
      return new Promise((resolve, reject) => {
        (0, import_cross_fetch3.default)(url, _getRequestParams2(method, options2, parameters, body)).then((result) => {
          if (!result.ok)
            throw result;
          if (options2 === null || options2 === void 0 ? void 0 : options2.noResolveJson)
            return resolve(result);
          return result.json();
        }).then((data) => resolve(data)).catch((error) => handleError2(error, reject));
      });
    });
  }
  function get2(url, options2, parameters) {
    return __awaiter6(this, void 0, void 0, function* () {
      return _handleRequest2("GET", url, options2, parameters);
    });
  }
  function post2(url, body, options2, parameters) {
    return __awaiter6(this, void 0, void 0, function* () {
      return _handleRequest2("POST", url, options2, parameters, body);
    });
  }
  function put2(url, body, options2, parameters) {
    return __awaiter6(this, void 0, void 0, function* () {
      return _handleRequest2("PUT", url, options2, parameters, body);
    });
  }
  function remove2(url, body, options2, parameters) {
    return __awaiter6(this, void 0, void 0, function* () {
      return _handleRequest2("DELETE", url, options2, parameters, body);
    });
  }

  // node_modules/@supabase/storage-js/dist/module/lib/StorageBucketApi.js
  var __awaiter7 = function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var StorageBucketApi = class {
    constructor(url, headers = {}) {
      this.url = url;
      this.headers = headers;
    }
    listBuckets() {
      return __awaiter7(this, void 0, void 0, function* () {
        try {
          const data = yield get2(`${this.url}/bucket`, { headers: this.headers });
          return { data, error: null };
        } catch (error) {
          return { data: null, error };
        }
      });
    }
    getBucket(id) {
      return __awaiter7(this, void 0, void 0, function* () {
        try {
          const data = yield get2(`${this.url}/bucket/${id}`, { headers: this.headers });
          return { data, error: null };
        } catch (error) {
          return { data: null, error };
        }
      });
    }
    createBucket(id, options2 = { public: false }) {
      return __awaiter7(this, void 0, void 0, function* () {
        try {
          const data = yield post2(`${this.url}/bucket`, { id, name: id, public: options2.public }, { headers: this.headers });
          return { data: data.name, error: null };
        } catch (error) {
          return { data: null, error };
        }
      });
    }
    updateBucket(id, options2) {
      return __awaiter7(this, void 0, void 0, function* () {
        try {
          const data = yield put2(`${this.url}/bucket/${id}`, { id, name: id, public: options2.public }, { headers: this.headers });
          return { data, error: null };
        } catch (error) {
          return { data: null, error };
        }
      });
    }
    emptyBucket(id) {
      return __awaiter7(this, void 0, void 0, function* () {
        try {
          const data = yield post2(`${this.url}/bucket/${id}/empty`, {}, { headers: this.headers });
          return { data, error: null };
        } catch (error) {
          return { data: null, error };
        }
      });
    }
    deleteBucket(id) {
      return __awaiter7(this, void 0, void 0, function* () {
        try {
          const data = yield remove2(`${this.url}/bucket/${id}`, {}, { headers: this.headers });
          return { data, error: null };
        } catch (error) {
          return { data: null, error };
        }
      });
    }
  };

  // node_modules/@supabase/storage-js/dist/module/lib/StorageFileApi.js
  var import_cross_fetch4 = __toModule(require_cross_fetch());
  var __awaiter8 = function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var DEFAULT_SEARCH_OPTIONS = {
    limit: 100,
    offset: 0,
    sortBy: {
      column: "name",
      order: "asc"
    }
  };
  var DEFAULT_FILE_OPTIONS = {
    cacheControl: "3600",
    contentType: "text/plain;charset=UTF-8",
    upsert: false
  };
  var StorageFileApi = class {
    constructor(url, headers = {}, bucketId) {
      this.url = url;
      this.headers = headers;
      this.bucketId = bucketId;
    }
    uploadOrUpdate(method, path, fileBody, fileOptions) {
      return __awaiter8(this, void 0, void 0, function* () {
        try {
          let body;
          const options2 = Object.assign(Object.assign({}, DEFAULT_FILE_OPTIONS), fileOptions);
          const headers = Object.assign(Object.assign({}, this.headers), method === "POST" && { "x-upsert": String(options2.upsert) });
          if (typeof Blob !== "undefined" && fileBody instanceof Blob) {
            body = new FormData();
            body.append("cacheControl", options2.cacheControl);
            body.append("", fileBody);
          } else if (typeof FormData !== "undefined" && fileBody instanceof FormData) {
            body = fileBody;
            body.append("cacheControl", options2.cacheControl);
          } else {
            body = fileBody;
            headers["cache-control"] = `max-age=${options2.cacheControl}`;
            headers["content-type"] = options2.contentType;
          }
          const _path = this._getFinalPath(path);
          const res = yield (0, import_cross_fetch4.default)(`${this.url}/object/${_path}`, {
            method,
            body,
            headers
          });
          if (res.ok) {
            return { data: { Key: _path }, error: null };
          } else {
            const error = yield res.json();
            return { data: null, error };
          }
        } catch (error) {
          return { data: null, error };
        }
      });
    }
    upload(path, fileBody, fileOptions) {
      return __awaiter8(this, void 0, void 0, function* () {
        return this.uploadOrUpdate("POST", path, fileBody, fileOptions);
      });
    }
    update(path, fileBody, fileOptions) {
      return __awaiter8(this, void 0, void 0, function* () {
        return this.uploadOrUpdate("PUT", path, fileBody, fileOptions);
      });
    }
    move(fromPath, toPath) {
      return __awaiter8(this, void 0, void 0, function* () {
        try {
          const data = yield post2(`${this.url}/object/move`, { bucketId: this.bucketId, sourceKey: fromPath, destinationKey: toPath }, { headers: this.headers });
          return { data, error: null };
        } catch (error) {
          return { data: null, error };
        }
      });
    }
    createSignedUrl(path, expiresIn) {
      return __awaiter8(this, void 0, void 0, function* () {
        try {
          const _path = this._getFinalPath(path);
          let data = yield post2(`${this.url}/object/sign/${_path}`, { expiresIn }, { headers: this.headers });
          const signedURL = `${this.url}${data.signedURL}`;
          data = { signedURL };
          return { data, error: null, signedURL };
        } catch (error) {
          return { data: null, error, signedURL: null };
        }
      });
    }
    download(path) {
      return __awaiter8(this, void 0, void 0, function* () {
        try {
          const _path = this._getFinalPath(path);
          const res = yield get2(`${this.url}/object/${_path}`, {
            headers: this.headers,
            noResolveJson: true
          });
          const data = yield res.blob();
          return { data, error: null };
        } catch (error) {
          return { data: null, error };
        }
      });
    }
    getPublicUrl(path) {
      try {
        const _path = this._getFinalPath(path);
        const publicURL = `${this.url}/object/public/${_path}`;
        const data = { publicURL };
        return { data, error: null, publicURL };
      } catch (error) {
        return { data: null, error, publicURL: null };
      }
    }
    remove(paths) {
      return __awaiter8(this, void 0, void 0, function* () {
        try {
          const data = yield remove2(`${this.url}/object/${this.bucketId}`, { prefixes: paths }, { headers: this.headers });
          return { data, error: null };
        } catch (error) {
          return { data: null, error };
        }
      });
    }
    list(path, options2, parameters) {
      return __awaiter8(this, void 0, void 0, function* () {
        try {
          const body = Object.assign(Object.assign(Object.assign({}, DEFAULT_SEARCH_OPTIONS), options2), { prefix: path || "" });
          const data = yield post2(`${this.url}/object/list/${this.bucketId}`, body, { headers: this.headers }, parameters);
          return { data, error: null };
        } catch (error) {
          return { data: null, error };
        }
      });
    }
    _getFinalPath(path) {
      return `${this.bucketId}/${path}`;
    }
  };

  // node_modules/@supabase/storage-js/dist/module/SupabaseStorageClient.js
  var SupabaseStorageClient = class extends StorageBucketApi {
    constructor(url, headers = {}) {
      super(url, headers);
    }
    from(id) {
      return new StorageFileApi(this.url, this.headers, id);
    }
  };

  // node_modules/@supabase/supabase-js/dist/module/SupabaseClient.js
  var __awaiter9 = function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var DEFAULT_OPTIONS2 = {
    schema: "public",
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    localStorage: globalThis.localStorage,
    headers: DEFAULT_HEADERS
  };
  var SupabaseClient = class {
    constructor(supabaseUrl, supabaseKey, options2) {
      this.supabaseUrl = supabaseUrl;
      this.supabaseKey = supabaseKey;
      if (!supabaseUrl)
        throw new Error("supabaseUrl is required.");
      if (!supabaseKey)
        throw new Error("supabaseKey is required.");
      const settings = Object.assign(Object.assign({}, DEFAULT_OPTIONS2), options2);
      this.restUrl = `${supabaseUrl}/rest/v1`;
      this.realtimeUrl = `${supabaseUrl}/realtime/v1`.replace("http", "ws");
      this.authUrl = `${supabaseUrl}/auth/v1`;
      this.storageUrl = `${supabaseUrl}/storage/v1`;
      this.schema = settings.schema;
      this.auth = this._initSupabaseAuthClient(settings);
      this.realtime = this._initRealtimeClient(settings.realtime);
    }
    get storage() {
      return new SupabaseStorageClient(this.storageUrl, this._getAuthHeaders());
    }
    from(table) {
      const url = `${this.restUrl}/${table}`;
      return new SupabaseQueryBuilder(url, {
        headers: this._getAuthHeaders(),
        schema: this.schema,
        realtime: this.realtime,
        table
      });
    }
    rpc(fn, params) {
      const rest = this._initPostgRESTClient();
      return rest.rpc(fn, params);
    }
    removeSubscription(subscription) {
      return new Promise((resolve) => __awaiter9(this, void 0, void 0, function* () {
        try {
          yield this._closeSubscription(subscription);
          const openSubscriptions = this.getSubscriptions().length;
          if (!openSubscriptions) {
            const { error } = yield this.realtime.disconnect();
            if (error)
              return resolve({ error });
          }
          return resolve({ error: null, data: { openSubscriptions } });
        } catch (error) {
          return resolve({ error });
        }
      }));
    }
    _closeSubscription(subscription) {
      return __awaiter9(this, void 0, void 0, function* () {
        if (!subscription.isClosed()) {
          yield this._closeChannel(subscription);
        }
      });
    }
    getSubscriptions() {
      return this.realtime.channels;
    }
    _initSupabaseAuthClient({ autoRefreshToken, persistSession, detectSessionInUrl, localStorage }) {
      return new SupabaseAuthClient({
        url: this.authUrl,
        headers: {
          Authorization: `Bearer ${this.supabaseKey}`,
          apikey: `${this.supabaseKey}`
        },
        autoRefreshToken,
        persistSession,
        detectSessionInUrl,
        localStorage
      });
    }
    _initRealtimeClient(options2) {
      return new RealtimeClient(this.realtimeUrl, Object.assign(Object.assign({}, options2), { params: Object.assign(Object.assign({}, options2 === null || options2 === void 0 ? void 0 : options2.params), { apikey: this.supabaseKey }) }));
    }
    _initPostgRESTClient() {
      return new PostgrestClient(this.restUrl, {
        headers: this._getAuthHeaders(),
        schema: this.schema
      });
    }
    _getAuthHeaders() {
      var _a, _b;
      const headers = {};
      const authBearer = (_b = (_a = this.auth.session()) === null || _a === void 0 ? void 0 : _a.access_token) !== null && _b !== void 0 ? _b : this.supabaseKey;
      headers["apikey"] = this.supabaseKey;
      headers["Authorization"] = `Bearer ${authBearer}`;
      return headers;
    }
    _closeChannel(subscription) {
      return new Promise((resolve, reject) => {
        subscription.unsubscribe().receive("ok", () => {
          this.realtime.remove(subscription);
          return resolve(true);
        }).receive("error", (e) => reject(e));
      });
    }
  };

  // node_modules/@supabase/supabase-js/dist/module/index.js
  var createClient = (supabaseUrl, supabaseKey, options2) => {
    return new SupabaseClient(supabaseUrl, supabaseKey, options2);
  };

  // src/functions/supabase.js
  var supabase = createClient(SUPABASE_URL, SUPABASE_ANON);
  var get_playlist = async (id) => {
    const { data, error } = await supabase.from("playlist").select(`
            id,name,
            items:playlist_video (
                id,title,thumb,cda_id,order
            )
        `).eq("id", id);
    if (error)
      return { "code": 500, "msg": "Internal Error", "data": null };
    if (data.length !== 1)
      return { "code": 404, "msg": "Not Found", "data": null };
    return { "code": 200, "msg": "ok", "data": data[0] };
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
  API.get("/playlist/:id", show_request, async (req, event) => {
    let cache = caches.default;
    const url = new URL(req.url);
    const url_to_check = url.origin + url.pathname;
    const inCache = await cache.match(url_to_check);
    if (inCache) {
      console.log("FROM CACHE");
      return inCache;
    }
    const header = new Headers();
    header.set("Access-Control-Allow-Origin", "*");
    header.set("content-type", "application/json");
    const id = req.params.id;
    if (!id)
      return new Response("", { status: 400 });
    const data = await get_playlist(id);
    return new Response(JSON.stringify(data), { status: data.code, headers: header });
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
