// ==UserScript==
// @name       sc-download
// @namespace  mlntcandy
// @version    0.0.1
// @author     mlntcandy
// @match      https://soundcloud.com/*
// @require    https://cdn.jsdelivr.net/npm/preact@10.19.3/dist/preact.min.js
// @grant      GM_addStyle
// @run-at     document-start
// ==/UserScript==

(o=>{if(typeof GM_addStyle=="function"){GM_addStyle(o);return}const t=document.createElement("style");t.textContent=o,document.head.append(t)})(' #sc-download{position:fixed;top:6px;right:6px;z-index:9999;overflow:hidden;display:flex;flex-direction:column}#sc-download .app{transition:width .2s ease,height .2s ease;cursor:pointer;color:#fff;padding:4px;background-color:#000000d0;-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);width:24px;height:24px;border-radius:4px;position:relative;border:none}#sc-download .app:before{content:"\u23EC";position:absolute;font-size:16px;top:50%;left:50%;transform:translate(-50%,-50%)}#sc-download .app.open{width:400px;height:500px;cursor:default}#sc-download .app.open:before{content:""}#sc-download .app .title{font-size:16px;height:20px;font-weight:800;margin-bottom:4px;display:flex;align-items:center;justify-content:space-between}#sc-download .app .title a{color:#fff;text-decoration:none}#sc-download .app .title a:hover{text-decoration:underline}#sc-download .app .title .close{padding:0;background:none;border:none;color:#fff}#sc-download .app .title .left{display:flex;align-items:center;gap:6px}#sc-download .app .title .buttons{border-left:1px solid #ffffff30;padding-left:4px;display:flex;gap:6px}#sc-download .app .title .buttons button{font-size:14px;color:#fff;padding:1px;border:none;border-radius:4px;background-color:transparent;opacity:1;cursor:pointer;transition:opacity .2s ease}#sc-download .app .title .buttons button:hover{opacity:.6}#sc-download .app .title .buttons button.toggle{border:1px solid;border-color:#ffffffd0;background-color:transparent;transition:border-color .2s ease,background-color .2s ease}#sc-download .app .title .buttons button.toggle.on{border-color:#fff;background-color:#ffffff60}#sc-download .app .content{overflow-y:auto;width:100%;height:calc(100% - 24px)}#sc-download .tracks{border-top:1px solid #ffffff30;box-sizing:border-box}#sc-download .tracks .no-tracks{width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center}#sc-download .tracks .track{position:relative;display:flex;align-items:center;gap:6px;padding:6px 0;border-bottom:1px solid #ffffff30;background-color:#fff0;transition:background-color .2s ease}#sc-download .tracks .track.full{background-color:#51ff0010}#sc-download .tracks .track.none{background-color:#ff000010}#sc-download .tracks .track.stuck{background-color:#ff990010}#sc-download .tracks .track .info{flex-grow:1}#sc-download .tracks .track .buttons{display:flex;opacity:0;transition:opacity .2s ease}#sc-download .tracks .track .buttons button{border:none;background-color:transparent;color:#fff;cursor:pointer;transition:color .2s ease}#sc-download .tracks .track .buttons button:hover{color:#d6c0c0}#sc-download .tracks .track .art{width:40px;height:40px;border-radius:4px;overflow:hidden;flex-shrink:0}#sc-download .tracks .track .user{padding:0;margin:0}#sc-download .tracks .track:hover{background-color:#ffffff10}#sc-download .tracks .track:hover .buttons{opacity:1}#sc-download .tracks .track .parts{position:absolute;top:0;right:0;font-size:10px} ');

(function (preact) {
  'use strict';

  var __defProp = Object.defineProperty;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __publicField = (obj, key, value) => {
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
  };
  var t$1, r$1, u$1, i$1, o$1 = 0, f$1 = [], c$1 = [], e$1 = preact.options.__b, a$1 = preact.options.__r, v = preact.options.diffed, l = preact.options.__c, m = preact.options.unmount;
  function d(t2, u2) {
    preact.options.__h && preact.options.__h(r$1, t2, o$1 || u2), o$1 = 0;
    var i2 = r$1.__H || (r$1.__H = { __: [], __h: [] });
    return t2 >= i2.__.length && i2.__.push({ __V: c$1 }), i2.__[t2];
  }
  function h(n2) {
    return o$1 = 1, s$1(B, n2);
  }
  function s$1(n2, u2, i2) {
    var o2 = d(t$1++, 2);
    if (o2.t = n2, !o2.__c && (o2.__ = [i2 ? i2(u2) : B(void 0, u2), function(n3) {
      var t2 = o2.__N ? o2.__N[0] : o2.__[0], r2 = o2.t(t2, n3);
      t2 !== r2 && (o2.__N = [r2, o2.__[1]], o2.__c.setState({}));
    }], o2.__c = r$1, !r$1.u)) {
      var f2 = function(n3, t2, r2) {
        if (!o2.__c.__H)
          return true;
        var u3 = o2.__c.__H.__.filter(function(n4) {
          return n4.__c;
        });
        if (u3.every(function(n4) {
          return !n4.__N;
        }))
          return !c2 || c2.call(this, n3, t2, r2);
        var i3 = false;
        return u3.forEach(function(n4) {
          if (n4.__N) {
            var t3 = n4.__[0];
            n4.__ = n4.__N, n4.__N = void 0, t3 !== n4.__[0] && (i3 = true);
          }
        }), !(!i3 && o2.__c.props === n3) && (!c2 || c2.call(this, n3, t2, r2));
      };
      r$1.u = true;
      var c2 = r$1.shouldComponentUpdate, e2 = r$1.componentWillUpdate;
      r$1.componentWillUpdate = function(n3, t2, r2) {
        if (this.__e) {
          var u3 = c2;
          c2 = void 0, f2(n3, t2, r2), c2 = u3;
        }
        e2 && e2.call(this, n3, t2, r2);
      }, r$1.shouldComponentUpdate = f2;
    }
    return o2.__N || o2.__;
  }
  function p(u2, i2) {
    var o2 = d(t$1++, 3);
    !preact.options.__s && z(o2.__H, i2) && (o2.__ = u2, o2.i = i2, r$1.__H.__h.push(o2));
  }
  function b() {
    for (var t2; t2 = f$1.shift(); )
      if (t2.__P && t2.__H)
        try {
          t2.__H.__h.forEach(k), t2.__H.__h.forEach(w), t2.__H.__h = [];
        } catch (r2) {
          t2.__H.__h = [], preact.options.__e(r2, t2.__v);
        }
  }
  preact.options.__b = function(n2) {
    r$1 = null, e$1 && e$1(n2);
  }, preact.options.__r = function(n2) {
    a$1 && a$1(n2), t$1 = 0;
    var i2 = (r$1 = n2.__c).__H;
    i2 && (u$1 === r$1 ? (i2.__h = [], r$1.__h = [], i2.__.forEach(function(n3) {
      n3.__N && (n3.__ = n3.__N), n3.__V = c$1, n3.__N = n3.i = void 0;
    })) : (i2.__h.forEach(k), i2.__h.forEach(w), i2.__h = [], t$1 = 0)), u$1 = r$1;
  }, preact.options.diffed = function(t2) {
    v && v(t2);
    var o2 = t2.__c;
    o2 && o2.__H && (o2.__H.__h.length && (1 !== f$1.push(o2) && i$1 === preact.options.requestAnimationFrame || ((i$1 = preact.options.requestAnimationFrame) || j)(b)), o2.__H.__.forEach(function(n2) {
      n2.i && (n2.__H = n2.i), n2.__V !== c$1 && (n2.__ = n2.__V), n2.i = void 0, n2.__V = c$1;
    })), u$1 = r$1 = null;
  }, preact.options.__c = function(t2, r2) {
    r2.some(function(t3) {
      try {
        t3.__h.forEach(k), t3.__h = t3.__h.filter(function(n2) {
          return !n2.__ || w(n2);
        });
      } catch (u2) {
        r2.some(function(n2) {
          n2.__h && (n2.__h = []);
        }), r2 = [], preact.options.__e(u2, t3.__v);
      }
    }), l && l(t2, r2);
  }, preact.options.unmount = function(t2) {
    m && m(t2);
    var r2, u2 = t2.__c;
    u2 && u2.__H && (u2.__H.__.forEach(function(n2) {
      try {
        k(n2);
      } catch (n3) {
        r2 = n3;
      }
    }), u2.__H = void 0, r2 && preact.options.__e(r2, u2.__v));
  };
  var g = "function" == typeof requestAnimationFrame;
  function j(n2) {
    var t2, r2 = function() {
      clearTimeout(u2), g && cancelAnimationFrame(t2), setTimeout(n2);
    }, u2 = setTimeout(r2, 100);
    g && (t2 = requestAnimationFrame(r2));
  }
  function k(n2) {
    var t2 = r$1, u2 = n2.__c;
    "function" == typeof u2 && (n2.__c = void 0, u2()), r$1 = t2;
  }
  function w(n2) {
    var t2 = r$1;
    n2.__c = n2.__(), r$1 = t2;
  }
  function z(n2, t2) {
    return !n2 || n2.length !== t2.length || t2.some(function(t3, r2) {
      return t3 !== n2[r2];
    });
  }
  function B(n2, t2) {
    return "function" == typeof t2 ? t2(n2) : t2;
  }
  class Cache {
    constructor(fetcher) {
      __publicField(this, "cache", /* @__PURE__ */ new Map());
      __publicField(this, "fetcher");
      __publicField(this, "subscribers", /* @__PURE__ */ new Map());
      __publicField(this, "allSubscribers", []);
      this.fetcher = fetcher ?? (() => {
        throw new Error("No fetcher provided");
      });
    }
    async get(key) {
      return this.cache.get(key) ?? await this.getOnMiss(key);
    }
    set(key, value) {
      this.cache.set(key, value);
      this.notify(key);
    }
    remove(key) {
      this.cache.delete(key);
      this.notify(key);
    }
    has(key) {
      return this.cache.has(key);
    }
    async getOnMiss(key) {
      const value = await this.fetcher(key);
      this.set(key, value);
      return value;
    }
    subscribe(key, callback) {
      var _a;
      if (!this.subscribers.has(key)) {
        this.subscribers.set(key, []);
      }
      (_a = this.subscribers.get(key)) == null ? void 0 : _a.push(callback);
    }
    subscribeAll(callback) {
      this.allSubscribers.push(callback);
    }
    unsubscribeAll(callback) {
      const index = this.allSubscribers.indexOf(callback);
      if (index !== -1) {
        this.allSubscribers.splice(index, 1);
      }
    }
    unsubscribe(key, callback) {
      const subscribers = this.subscribers.get(key);
      if (!subscribers)
        return;
      const index = subscribers.indexOf(callback);
      if (index !== -1) {
        subscribers.splice(index, 1);
      }
    }
    dump() {
      return this.cache.entries();
    }
    keys() {
      return this.cache.keys();
    }
    values() {
      return this.cache.values();
    }
    clear() {
      const keys = Array.from(this.cache.keys());
      this.cache.clear();
      keys.forEach((k2) => this.notify(k2));
    }
    async notify(key) {
      const subscribers = this.subscribers.get(key);
      const value = await this.get(key).catch(() => null);
      if (subscribers) {
        subscribers.forEach((f2) => f2(value));
      }
      this.allSubscribers.forEach((f2) => f2(key, value, this));
    }
  }
  const playlistCache = new Cache();
  const apiDetails = {
    client_id: "",
    app_version: "",
    app_locale: "",
    ready: false,
    onReady: []
  };
  const trackDataCache = new Cache((id) => {
    function fetchData() {
      return fetch(`https://api-v2.soundcloud.com/tracks/${id}?client_id=${apiDetails.client_id}&app_version=${apiDetails.app_version}&app_locale=${apiDetails.app_locale}`).then((r2) => r2.json()).then((data) => {
        const regex = / [-–] /;
        const differentArtist = regex.test(data.title);
        const title = differentArtist ? data.title.split(regex)[1] : data.title;
        const user = differentArtist ? {
          ...data.user,
          username: data.title.split(regex)[0],
          // preserve original publisher for metadata
          originalPublisher: data.user.username
        } : data.user;
        return {
          ...data,
          title,
          user
        };
      });
    }
    if (!apiDetails.ready) {
      return new Promise((resolve) => {
        apiDetails.onReady.push(() => {
          fetchData().then(resolve);
        });
      });
    } else {
      return fetchData();
    }
  });
  const mp3Cache = new Cache((url) => fetch(url).then((r2) => r2.arrayBuffer()));
  function e(e2) {
    return String(e2).split("").map((e3) => e3.charCodeAt(0));
  }
  function t(t2) {
    return new Uint8Array(e(t2));
  }
  function a(t2) {
    const a2 = new ArrayBuffer(2 * t2.length), r2 = new Uint8Array(a2);
    return new Uint16Array(a2).set(e(t2)), r2;
  }
  function r(e2) {
    const t2 = 255;
    return [e2 >>> 24 & t2, e2 >>> 16 & t2, e2 >>> 8 & t2, e2 & t2];
  }
  function n(e2) {
    return 11 + e2;
  }
  function s(e2, t2, a2, r2) {
    return 11 + t2 + 1 + 1 + (r2 ? 2 + 2 * (a2 + 1) : a2 + 1) + e2;
  }
  function i(e2) {
    let t2 = 0;
    return e2.forEach((e3) => {
      t2 += 2 + 2 * e3[0].length + 2 + 2 + 2 * e3[1].length + 2;
    }), 11 + t2;
  }
  function c(e2, t2) {
    const a2 = 2 * t2;
    let r2 = 0;
    return e2.forEach((e3) => {
      r2 += 2 + 2 * e3[0].length + 2 + 4;
    }), 18 + a2 + 2 + r2;
  }
  class o {
    _setIntegerFrame(e2, t2) {
      const a2 = parseInt(t2, 10);
      this.frames.push({ name: e2, value: a2, size: n(a2.toString().length) });
    }
    _setStringFrame(e2, t2) {
      const a2 = t2.toString();
      let r2 = 13 + 2 * a2.length;
      "TDAT" === e2 && (r2 = n(a2.length)), this.frames.push({ name: e2, value: a2, size: r2 });
    }
    _setPictureFrame(e2, t2, a2, r2) {
      const n2 = function(e3) {
        if (!e3 || !e3.length)
          return null;
        if (255 === e3[0] && 216 === e3[1] && 255 === e3[2])
          return "image/jpeg";
        if (137 === e3[0] && 80 === e3[1] && 78 === e3[2] && 71 === e3[3])
          return "image/png";
        if (71 === e3[0] && 73 === e3[1] && 70 === e3[2])
          return "image/gif";
        if (87 === e3[8] && 69 === e3[9] && 66 === e3[10] && 80 === e3[11])
          return "image/webp";
        const t3 = 73 === e3[0] && 73 === e3[1] && 42 === e3[2] && 0 === e3[3], a3 = 77 === e3[0] && 77 === e3[1] && 0 === e3[2] && 42 === e3[3];
        return t3 || a3 ? "image/tiff" : 66 === e3[0] && 77 === e3[1] ? "image/bmp" : 0 === e3[0] && 0 === e3[1] && 1 === e3[2] && 0 === e3[3] ? "image/x-icon" : null;
      }(new Uint8Array(t2)), i2 = a2.toString();
      if (!n2)
        throw new Error("Unknown picture MIME type");
      a2 || (r2 = false), this.frames.push({ name: "APIC", value: t2, pictureType: e2, mimeType: n2, useUnicodeEncoding: r2, description: i2, size: s(t2.byteLength, n2.length, i2.length, r2) });
    }
    _setLyricsFrame(e2, t2, a2) {
      const r2 = e2.split("").map((e3) => e3.charCodeAt(0)), n2 = t2.toString(), s2 = a2.toString();
      var i2, c2;
      this.frames.push({ name: "USLT", value: s2, language: r2, description: n2, size: (i2 = n2.length, c2 = s2.length, 16 + 2 * i2 + 2 + 2 + 2 * c2) });
    }
    _setCommentFrame(e2, t2, a2) {
      const r2 = e2.split("").map((e3) => e3.charCodeAt(0)), n2 = t2.toString(), s2 = a2.toString();
      var i2, c2;
      this.frames.push({ name: "COMM", value: s2, language: r2, description: n2, size: (i2 = n2.length, c2 = s2.length, 16 + 2 * i2 + 2 + 2 + 2 * c2) });
    }
    _setPrivateFrame(e2, t2) {
      const a2 = e2.toString();
      var r2, n2;
      this.frames.push({ name: "PRIV", value: t2, id: a2, size: (r2 = a2.length, n2 = t2.byteLength, 10 + r2 + 1 + n2) });
    }
    _setUserStringFrame(e2, t2) {
      const a2 = e2.toString(), r2 = t2.toString();
      var n2, s2;
      this.frames.push({ name: "TXXX", description: a2, value: r2, size: (n2 = a2.length, s2 = r2.length, 13 + 2 * n2 + 2 + 2 + 2 * s2) });
    }
    _setUrlLinkFrame(e2, t2) {
      const a2 = t2.toString();
      var r2;
      this.frames.push({ name: e2, value: a2, size: (r2 = a2.length, 10 + r2) });
    }
    _setPairedTextFrame(e2, t2) {
      this.frames.push({ name: e2, value: t2, size: i(t2) });
    }
    _setSynchronisedLyricsFrame(e2, t2, a2, r2, n2) {
      const s2 = n2.toString(), i2 = r2.split("").map((e3) => e3.charCodeAt(0));
      this.frames.push({ name: "SYLT", value: t2, language: i2, description: s2, type: e2, timestampFormat: a2, size: c(t2, s2.length) });
    }
    constructor(e2) {
      if (!e2 || "object" != typeof e2 || !("byteLength" in e2))
        throw new Error("First argument should be an instance of ArrayBuffer or Buffer");
      this.arrayBuffer = e2, this.padding = 4096, this.frames = [], this.url = "";
    }
    setFrame(e2, t2) {
      switch (e2) {
        case "TPE1":
        case "TCOM":
        case "TCON": {
          if (!Array.isArray(t2))
            throw new Error(`${e2} frame value should be an array of strings`);
          const a2 = "TCON" === e2 ? ";" : "/", r2 = t2.join(a2);
          this._setStringFrame(e2, r2);
          break;
        }
        case "TLAN":
        case "TIT1":
        case "TIT2":
        case "TIT3":
        case "TALB":
        case "TPE2":
        case "TPE3":
        case "TPE4":
        case "TRCK":
        case "TPOS":
        case "TMED":
        case "TPUB":
        case "TCOP":
        case "TKEY":
        case "TEXT":
        case "TDAT":
        case "TSRC":
          this._setStringFrame(e2, t2);
          break;
        case "TBPM":
        case "TLEN":
        case "TYER":
          this._setIntegerFrame(e2, t2);
          break;
        case "USLT":
          if (t2.language = t2.language || "eng", "object" != typeof t2 || !("description" in t2) || !("lyrics" in t2))
            throw new Error("USLT frame value should be an object with keys description and lyrics");
          if (t2.language && !t2.language.match(/[a-z]{3}/i))
            throw new Error("Language must be coded following the ISO 639-2 standards");
          this._setLyricsFrame(t2.language, t2.description, t2.lyrics);
          break;
        case "APIC":
          if ("object" != typeof t2 || !("type" in t2) || !("data" in t2) || !("description" in t2))
            throw new Error("APIC frame value should be an object with keys type, data and description");
          if (t2.type < 0 || t2.type > 20)
            throw new Error("Incorrect APIC frame picture type");
          this._setPictureFrame(t2.type, t2.data, t2.description, !!t2.useUnicodeEncoding);
          break;
        case "TXXX":
          if ("object" != typeof t2 || !("description" in t2) || !("value" in t2))
            throw new Error("TXXX frame value should be an object with keys description and value");
          this._setUserStringFrame(t2.description, t2.value);
          break;
        case "WCOM":
        case "WCOP":
        case "WOAF":
        case "WOAR":
        case "WOAS":
        case "WORS":
        case "WPAY":
        case "WPUB":
          this._setUrlLinkFrame(e2, t2);
          break;
        case "COMM":
          if (t2.language = t2.language || "eng", "object" != typeof t2 || !("description" in t2) || !("text" in t2))
            throw new Error("COMM frame value should be an object with keys description and text");
          if (t2.language && !t2.language.match(/[a-z]{3}/i))
            throw new Error("Language must be coded following the ISO 639-2 standards");
          this._setCommentFrame(t2.language, t2.description, t2.text);
          break;
        case "PRIV":
          if ("object" != typeof t2 || !("id" in t2) || !("data" in t2))
            throw new Error("PRIV frame value should be an object with keys id and data");
          this._setPrivateFrame(t2.id, t2.data);
          break;
        case "IPLS":
          if (!Array.isArray(t2) || !Array.isArray(t2[0]))
            throw new Error("IPLS frame value should be an array of pairs");
          this._setPairedTextFrame(e2, t2);
          break;
        case "SYLT":
          if ("object" != typeof t2 || !("type" in t2) || !("text" in t2) || !("timestampFormat" in t2))
            throw new Error("SYLT frame value should be an object with keys type, text and timestampFormat");
          if (!Array.isArray(t2.text) || !Array.isArray(t2.text[0]))
            throw new Error("SYLT frame text value should be an array of pairs");
          if (t2.type < 0 || t2.type > 6)
            throw new Error("Incorrect SYLT frame content type");
          if (t2.timestampFormat < 1 || t2.timestampFormat > 2)
            throw new Error("Incorrect SYLT frame time stamp format");
          t2.language = t2.language || "eng", t2.description = t2.description || "", this._setSynchronisedLyricsFrame(t2.type, t2.text, t2.timestampFormat, t2.language, t2.description);
          break;
        default:
          throw new Error(`Unsupported frame ${e2}`);
      }
      return this;
    }
    removeTag() {
      if (this.arrayBuffer.byteLength < 10)
        return;
      const e2 = new Uint8Array(this.arrayBuffer), t2 = e2[3], a2 = ((r2 = [e2[6], e2[7], e2[8], e2[9]])[0] << 21) + (r2[1] << 14) + (r2[2] << 7) + r2[3] + 10;
      var r2, n2;
      73 !== (n2 = e2)[0] || 68 !== n2[1] || 51 !== n2[2] || t2 < 2 || t2 > 4 || (this.arrayBuffer = new Uint8Array(e2.subarray(a2)).buffer);
    }
    addTag() {
      this.removeTag();
      const e2 = [255, 254], n2 = 10 + this.frames.reduce((e3, t2) => e3 + t2.size, 0) + this.padding, s2 = new ArrayBuffer(this.arrayBuffer.byteLength + n2), i2 = new Uint8Array(s2);
      let c2 = 0, o2 = [];
      return o2 = [73, 68, 51, 3], i2.set(o2, c2), c2 += o2.length, c2++, c2++, o2 = function(e3) {
        const t2 = 127;
        return [e3 >>> 21 & t2, e3 >>> 14 & t2, e3 >>> 7 & t2, e3 & t2];
      }(n2 - 10), i2.set(o2, c2), c2 += o2.length, this.frames.forEach((n3) => {
        switch (o2 = t(n3.name), i2.set(o2, c2), c2 += o2.length, o2 = r(n3.size - 10), i2.set(o2, c2), c2 += o2.length, c2 += 2, n3.name) {
          case "WCOM":
          case "WCOP":
          case "WOAF":
          case "WOAR":
          case "WOAS":
          case "WORS":
          case "WPAY":
          case "WPUB":
            o2 = t(n3.value), i2.set(o2, c2), c2 += o2.length;
            break;
          case "TPE1":
          case "TCOM":
          case "TCON":
          case "TLAN":
          case "TIT1":
          case "TIT2":
          case "TIT3":
          case "TALB":
          case "TPE2":
          case "TPE3":
          case "TPE4":
          case "TRCK":
          case "TPOS":
          case "TKEY":
          case "TMED":
          case "TPUB":
          case "TCOP":
          case "TEXT":
          case "TSRC":
            o2 = [1].concat(e2), i2.set(o2, c2), c2 += o2.length, o2 = a(n3.value), i2.set(o2, c2), c2 += o2.length;
            break;
          case "TXXX":
          case "USLT":
          case "COMM":
            o2 = [1], "USLT" !== n3.name && "COMM" !== n3.name || (o2 = o2.concat(n3.language)), o2 = o2.concat(e2), i2.set(o2, c2), c2 += o2.length, o2 = a(n3.description), i2.set(o2, c2), c2 += o2.length, o2 = [0, 0].concat(e2), i2.set(o2, c2), c2 += o2.length, o2 = a(n3.value), i2.set(o2, c2), c2 += o2.length;
            break;
          case "TBPM":
          case "TLEN":
          case "TDAT":
          case "TYER":
            c2++, o2 = t(n3.value), i2.set(o2, c2), c2 += o2.length;
            break;
          case "PRIV":
            o2 = t(n3.id), i2.set(o2, c2), c2 += o2.length, c2++, i2.set(new Uint8Array(n3.value), c2), c2 += n3.value.byteLength;
            break;
          case "APIC":
            o2 = [n3.useUnicodeEncoding ? 1 : 0], i2.set(o2, c2), c2 += o2.length, o2 = t(n3.mimeType), i2.set(o2, c2), c2 += o2.length, o2 = [0, n3.pictureType], i2.set(o2, c2), c2 += o2.length, n3.useUnicodeEncoding ? (o2 = [].concat(e2), i2.set(o2, c2), c2 += o2.length, o2 = a(n3.description), i2.set(o2, c2), c2 += o2.length, c2 += 2) : (o2 = t(n3.description), i2.set(o2, c2), c2 += o2.length, c2++), i2.set(new Uint8Array(n3.value), c2), c2 += n3.value.byteLength;
            break;
          case "IPLS":
            o2 = [1], i2.set(o2, c2), c2 += o2.length, n3.value.forEach((t2) => {
              o2 = [].concat(e2), i2.set(o2, c2), c2 += o2.length, o2 = a(t2[0].toString()), i2.set(o2, c2), c2 += o2.length, o2 = [0, 0].concat(e2), i2.set(o2, c2), c2 += o2.length, o2 = a(t2[1].toString()), i2.set(o2, c2), c2 += o2.length, o2 = [0, 0], i2.set(o2, c2), c2 += o2.length;
            });
            break;
          case "SYLT":
            o2 = [1].concat(n3.language).concat(n3.timestampFormat).concat(n3.type), i2.set(o2, c2), c2 += o2.length, o2 = [].concat(e2), i2.set(o2, c2), c2 += o2.length, o2 = a(n3.description), i2.set(o2, c2), c2 += o2.length, c2 += 2, n3.value.forEach((t2) => {
              o2 = [].concat(e2), i2.set(o2, c2), c2 += o2.length, o2 = a(t2[0].toString()), i2.set(o2, c2), c2 += o2.length, o2 = [0, 0], i2.set(o2, c2), c2 += o2.length, o2 = r(t2[1]), i2.set(o2, c2), c2 += o2.length;
            });
        }
      }), c2 += this.padding, i2.set(new Uint8Array(this.arrayBuffer), c2), this.arrayBuffer = s2, s2;
    }
    getBlob() {
      return new Blob([this.arrayBuffer], { type: "audio/mpeg" });
    }
    getURL() {
      return this.url || (this.url = URL.createObjectURL(this.getBlob())), this.url;
    }
    revokeURL() {
      URL.revokeObjectURL(this.url);
    }
  }
  async function getCoverArt(track, x500 = true) {
    try {
      const response = await fetch(x500 ? track.artwork_url.replace("-large", "-t500x500") : track.artwork_url);
      if (!response.ok)
        throw new Error("Failed to fetch cover art");
      return await response.arrayBuffer();
    } catch (e2) {
      if (x500) {
        return getCoverArt(track, false);
      }
      console.error(e2);
      return null;
    }
  }
  async function attachTrackData(mp3, track) {
    const writer = new o(await mp3.arrayBuffer());
    writer.setFrame("TPE1", [track.user.username]).setFrame("TIT2", track.title).setFrame("TYER", new Date(track.display_date).getFullYear()).setFrame("TCON", [track.genre]).setFrame("WPAY", track.permalink_url).setFrame("TPUB", track.user.originalPublisher ?? track.user.username);
    const coverArt = await getCoverArt(track);
    if (coverArt) {
      writer.setFrame("APIC", {
        type: 3,
        data: coverArt,
        description: "Cover"
      });
    }
    writer.addTag();
    return writer.getBlob();
  }
  async function downloadBlob(blob, filename) {
    var a2 = document.createElement("a");
    document.body.appendChild(a2);
    a2.style.display = "none";
    var url = window.URL.createObjectURL(blob);
    a2.href = url;
    a2.download = filename;
    a2.click();
    window.URL.revokeObjectURL(url);
    a2.remove();
  }
  async function download(id, noSave = false) {
    const trackData = await trackDataCache.get(id);
    const m3u = await playlistCache.get(id).catch(() => {
      throw new Error("No M3U found for track");
    });
    const downloadedAudio = await Promise.all(m3u.map(async ({
      url,
      duration
    }) => {
      const arrayBuf = await mp3Cache.get(url);
      return {
        arrayBuf,
        duration
      };
    })).catch((e2) => {
      console.error(e2);
      playlistCache.remove(id);
      throw new Error("Failed to download audio");
    });
    if (noSave)
      return;
    const concattedBytes = downloadedAudio.reduce((acc, {
      arrayBuf
    }) => {
      const tmp = new Uint8Array(acc.byteLength + arrayBuf.byteLength);
      tmp.set(new Uint8Array(acc), 0);
      tmp.set(new Uint8Array(arrayBuf), acc.byteLength);
      return tmp.buffer;
    }, new ArrayBuffer(0));
    const concattedBlob = new Blob([concattedBytes], {
      type: "audio/mp3"
    });
    const withMeta = await attachTrackData(concattedBlob, trackData);
    downloadBlob(withMeta, `${trackData.user.username} - ${trackData.title}.mp3`);
  }
  const useCacheValue = (cache, key) => {
    const [value, setValue] = h(null);
    p(() => {
      cache.get(key).catch((e2) => null).then(setValue);
      cache.subscribe(key, setValue);
      return () => cache.unsubscribe(key, setValue);
    }, [key]);
    return value;
  };
  function iteratorToArray(iter) {
    return [...iter];
  }
  const useCacheKeys = (cache) => {
    const [keys, setKeys] = h(iteratorToArray(cache.keys()));
    p(() => {
      const handler = (k2, v2, c2) => setKeys(iteratorToArray(c2.keys()));
      cache.subscribeAll(handler);
      return () => cache.unsubscribeAll(handler);
    }, []);
    return keys;
  };
  const useTracks = () => useCacheKeys(trackDataCache);
  const useSavedState = (key, defaultValue) => {
    const [state, setState] = h(JSON.parse(localStorage.getItem(`sc-download:${key}`) || "null") || defaultValue);
    p(() => {
      localStorage.setItem(`sc-download:${key}`, JSON.stringify(state));
    }, [state]);
    return [state, setState];
  };
  var f = 0;
  function u(e2, t2, n2, o2, i2, u2) {
    var a2, c2, p2 = {};
    for (c2 in t2)
      "ref" == c2 ? a2 = t2[c2] : p2[c2] = t2[c2];
    var l2 = { type: e2, props: p2, key: n2, ref: a2, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, constructor: void 0, __v: --f, __i: -1, __u: 0, __source: i2, __self: u2 };
    if ("function" == typeof e2 && (a2 = e2.defaultProps))
      for (c2 in a2)
        void 0 === p2[c2] && (p2[c2] = a2[c2]);
    return preact.options.vnode && preact.options.vnode(l2), l2;
  }
  function Track({
    id
  }) {
    const track = useCacheValue(trackDataCache, id);
    const [partsDownloaded, setPartsDownloaded] = h([]);
    const parts = useCacheValue(playlistCache, id);
    p(() => {
      if (!parts) {
        setPartsDownloaded([]);
        return;
      }
      setPartsDownloaded(parts.map((_, i2) => {
        return mp3Cache.has(parts[i2].url);
      }));
      const handler = (k2) => {
        const index = parts.findIndex((p2) => p2.url === k2);
        if (index === -1)
          return;
        setPartsDownloaded((prev) => {
          const next = [...prev];
          next[index] = true;
          return next;
        });
      };
      mp3Cache.subscribeAll(handler);
      return () => mp3Cache.unsubscribeAll(handler);
    }, [parts]);
    if (!track)
      return null;
    const loaded = parts ? partsDownloaded.filter((p2) => p2).length / parts.length : 0;
    return u("div", {
      className: `track ${!parts ? "none" : ""} ${loaded === 1 ? "full" : ""} ${loaded === 0 ? "stuck" : ""}`,
      children: [u("img", {
        src: track.artwork_url,
        alt: "Album Art",
        class: "art"
      }), u("div", {
        className: "parts",
        children: [!parts && "🕒", parts && loaded < 1 && Math.floor(loaded * 100) + "%", parts && loaded === 1 && "✅"]
      }), u("div", {
        className: "info",
        children: [u("h3", {
          class: "tracktitle",
          children: track.title
        }), u("p", {
          class: "user",
          children: track.user.username
        })]
      }), u("div", {
        className: "buttons",
        children: [loaded < 1 && u("button", {
          className: "cache",
          onClick: () => download(id, true),
          title: "Save track to memory",
          children: "💾"
        }), u("button", {
          className: "download",
          onClick: () => download(id),
          title: "Download file",
          children: "⏬"
        })]
      })]
    });
  }
  function Tracks({
    autocache,
    tracks
  }) {
    p(() => {
      if (autocache) {
        tracks.forEach((id) => {
          trackDataCache.get(id);
          if (playlistCache.has(id)) {
            download(id, true);
          }
        });
      }
    }, [autocache, tracks]);
    return u("div", {
      className: "tracks",
      children: [tracks.length === 0 && u("div", {
        className: "no-tracks",
        children: [u("h4", {
          children: "No tracks"
        }), u("p", {
          children: "Start listening to tracks and they will show up here"
        })]
      }), tracks.map((trackId) => u(Track, {
        id: trackId
      }, trackId))]
    });
  }
  function App() {
    const [open, setOpen] = h(false);
    const [autocache, setAutocache] = useSavedState("autocache", false);
    const tracks = useTracks();
    if (!open)
      return u("div", {
        class: "app",
        onClick: () => setOpen(true)
      });
    return u("div", {
      className: "app open",
      children: [u("div", {
        className: "title",
        children: [u("div", {
          className: "left",
          children: [u("a", {
            href: "https://github.com/mlntcandy/sc-download",
            target: "_blank",
            title: "GitHub repo",
            children: u("h3", {
              children: "sc-download"
            })
          }), u("div", {
            className: "buttons",
            children: [u("button", {
              onClick: () => setAutocache((p2) => !p2),
              title: "Cache all tracks upon arrival - blocks player while caching! --- While ensures all tracks displayed are always available for download, we're not responsible for any blocks or bans from SoundCloud for excessive downloads.",
              className: `toggle ${autocache ? "on" : ""}`,
              children: "💾"
            }), u("button", {
              onClick: () => tracks.forEach((id) => download(id)),
              title: "Download everything",
              children: "⏬"
            })]
          })]
        }), u("button", {
          className: "close",
          onClick: () => setOpen(false),
          children: "X"
        })]
      }), u("div", {
        className: "content",
        children: u(Tracks, {
          autocache,
          tracks
        })
      })]
    });
  }
  function parsem3u(m3u) {
    const lines = m3u.split("\n");
    if (lines.shift() !== "#EXTM3U") {
      throw new Error("Invalid M3U file");
    }
    const output = [];
    for (let line = 0; line < lines.length; line++) {
      if (!lines[line].startsWith("#EXTINF") || lines[line].startsWith("http")) {
        continue;
      }
      if (lines[line].startsWith("#EXTINF")) {
        const duration = lines[line].split(",")[0].split(":")[1];
        const url = lines[line + 1];
        output.push({
          duration,
          url
        });
      }
      if (lines[line].startsWith("#EXT-X-ENDLIST")) {
        console.log("End of M3U", output);
        return output;
      }
    }
    return output;
  }
  const interceptors = [
    // playlists
    async (type, url, payload, response) => {
      if (url.includes("api") && url.includes("/stream/hls")) {
        console.log("Caught HLS stream request");
        let trackId = 0;
        url.split("/").forEach((part) => {
          if (!part.includes(":track"))
            return;
          trackId = parseInt(part.split(":")[2]);
        });
        if (trackId === 0) {
          console.error("Track ID not found in URL!");
          return;
        }
        const m3u8Url = JSON.parse(response).url;
        const m3u8Response = await fetch(m3u8Url);
        const m3u8Text = await m3u8Response.text();
        playlistCache.set(trackId, parsem3u(m3u8Text));
        trackDataCache.get(trackId);
      }
    },
    // api data (client_id, app_version, etc.)
    async (type, url, payload, response) => {
      if (url.includes("api-v2.soundcloud.com")) {
        const urlo = new URL(url);
        const client_id = urlo.searchParams.get("client_id");
        const app_version = urlo.searchParams.get("app_version");
        const app_locale = urlo.searchParams.get("app_locale");
        if (client_id)
          apiDetails.client_id = client_id;
        if (app_version)
          apiDetails.app_version = app_version;
        if (app_locale)
          apiDetails.app_locale = app_locale;
        apiDetails.ready = true;
        apiDetails.onReady.forEach((f2) => f2());
        apiDetails.onReady = [];
      }
    },
    // mp3s
    async (type, url, payload, response) => {
      if (type === "fetch" && url.includes("media.sndcdn.com") && url.includes(".mp3")) {
        mp3Cache.set(url, await response.arrayBuffer());
      }
    }
  ];
  async function middleware(type, url, payload, response) {
    interceptors.forEach((f2) => f2(type, url, payload, response));
  }
  function setupFetchInterception() {
    const {
      fetch: origFetch
    } = window;
    const fakeFetch = async (...args) => {
      const response = await origFetch(...args);
      const [inp, init] = args;
      const url = inp instanceof URL ? inp.href : response.url;
      const payload = (init == null ? void 0 : init.body) ?? null;
      const responseClone = response.clone();
      middleware("fetch", url, payload, responseClone);
      return response;
    };
    window.fetch = fakeFetch;
  }
  function setupXHRInterception() {
    const {
      open: realOpen,
      send: realSend
    } = window.XMLHttpRequest.prototype;
    window.XMLHttpRequest.prototype.send = function(body) {
      this._scdl_payload = body;
      realSend.apply(this, [body]);
    };
    window.XMLHttpRequest.prototype.open = function() {
      this.addEventListener("readystatechange", function() {
        if (this.readyState === 4) {
          middleware("xhr", this.responseURL, this._scdl_payload, this.response);
        }
      });
      realOpen.apply(this, arguments);
    };
  }
  function setupInterception() {
    setupFetchInterception();
    setupXHRInterception();
  }
  console.log("%csc-download", "font-size: 32px");
  setupInterception();
  preact.render(u(App, {}), (() => {
    const app = document.createElement("div");
    app.id = "sc-download";
    document.body.append(app);
    return app;
  })());

})(preact);