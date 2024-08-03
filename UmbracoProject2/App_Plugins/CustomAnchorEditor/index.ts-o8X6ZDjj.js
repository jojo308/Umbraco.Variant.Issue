var A = (t) => {
  throw TypeError(t);
};
var _ = (t, e, r) => e.has(t) || A("Cannot " + r);
var p = (t, e, r) => (_(t, e, "read from private field"), r ? r.call(t) : e.get(t)), m = (t, e, r) => e.has(t) ? A("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, r), b = (t, e, r, s) => (_(t, e, "write to private field"), s ? s.call(t, r) : e.set(t, r), r);
import { UMB_AUTH_CONTEXT as O } from "@umbraco-cms/backoffice/auth";
import { UmbControllerBase as x } from "@umbraco-cms/backoffice/class-api";
import { tryExecuteAndNotify as D } from "@umbraco-cms/backoffice/resources";
const q = [
  {
    type: "propertyEditorUi",
    alias: "CustomAnchorEditor",
    name: "Custom Anchor Editor",
    elementName: "anchor-tag-picker",
    js: () => import("./anchor-tag-picker-DsqTlvZb.js"),
    meta: {
      label: "Custom Anchor Picker",
      icon: "icon-tags",
      group: "common",
      propertyEditorSchemaAlias: "Umbraco.Plain.Json"
    }
  }
], B = [...q], P = [
  {
    type: "globalContext",
    alias: "anchors.context",
    name: "Anchors context",
    js: () => import("./anchors.context-Drjz1b7i.js")
  }
], H = [...P];
class S extends Error {
  constructor(e, r, s) {
    super(s), this.name = "ApiError", this.url = r.url, this.status = r.status, this.statusText = r.statusText, this.body = r.body, this.request = e;
  }
}
class U extends Error {
  constructor(e) {
    super(e), this.name = "CancelError";
  }
  get isCancelled() {
    return !0;
  }
}
class v {
  constructor(e) {
    this._isResolved = !1, this._isRejected = !1, this._isCancelled = !1, this.cancelHandlers = [], this.promise = new Promise((r, s) => {
      this._resolve = r, this._reject = s;
      const n = (a) => {
        this._isResolved || this._isRejected || this._isCancelled || (this._isResolved = !0, this._resolve && this._resolve(a));
      }, o = (a) => {
        this._isResolved || this._isRejected || this._isCancelled || (this._isRejected = !0, this._reject && this._reject(a));
      }, i = (a) => {
        this._isResolved || this._isRejected || this._isCancelled || this.cancelHandlers.push(a);
      };
      return Object.defineProperty(i, "isResolved", {
        get: () => this._isResolved
      }), Object.defineProperty(i, "isRejected", {
        get: () => this._isRejected
      }), Object.defineProperty(i, "isCancelled", {
        get: () => this._isCancelled
      }), e(n, o, i);
    });
  }
  get [Symbol.toStringTag]() {
    return "Cancellable Promise";
  }
  then(e, r) {
    return this.promise.then(e, r);
  }
  catch(e) {
    return this.promise.catch(e);
  }
  finally(e) {
    return this.promise.finally(e);
  }
  cancel() {
    if (!(this._isResolved || this._isRejected || this._isCancelled)) {
      if (this._isCancelled = !0, this.cancelHandlers.length)
        try {
          for (const e of this.cancelHandlers)
            e();
        } catch (e) {
          console.warn("Cancellation threw an error", e);
          return;
        }
      this.cancelHandlers.length = 0, this._reject && this._reject(new U("Request aborted"));
    }
  }
  get isCancelled() {
    return this._isCancelled;
  }
}
class w {
  constructor() {
    this._fns = [];
  }
  eject(e) {
    const r = this._fns.indexOf(e);
    r !== -1 && (this._fns = [...this._fns.slice(0, r), ...this._fns.slice(r + 1)]);
  }
  use(e) {
    this._fns = [...this._fns, e];
  }
}
const y = {
  BASE: "",
  CREDENTIALS: "include",
  ENCODE_PATH: void 0,
  HEADERS: void 0,
  PASSWORD: void 0,
  TOKEN: void 0,
  USERNAME: void 0,
  VERSION: "Latest",
  WITH_CREDENTIALS: !1,
  interceptors: {
    request: new w(),
    response: new w()
  }
}, h = (t) => typeof t == "string", R = (t) => h(t) && t !== "", E = (t) => t instanceof Blob, j = (t) => t instanceof FormData, $ = (t) => {
  try {
    return btoa(t);
  } catch {
    return Buffer.from(t).toString("base64");
  }
}, L = (t) => {
  const e = [], r = (n, o) => {
    e.push(`${encodeURIComponent(n)}=${encodeURIComponent(String(o))}`);
  }, s = (n, o) => {
    o != null && (o instanceof Date ? r(n, o.toISOString()) : Array.isArray(o) ? o.forEach((i) => s(n, i)) : typeof o == "object" ? Object.entries(o).forEach(([i, a]) => s(`${n}[${i}]`, a)) : r(n, o));
  };
  return Object.entries(t).forEach(([n, o]) => s(n, o)), e.length ? `?${e.join("&")}` : "";
}, k = (t, e) => {
  const r = encodeURI, s = e.url.replace("{api-version}", t.VERSION).replace(/{(.*?)}/g, (o, i) => {
    var a;
    return (a = e.path) != null && a.hasOwnProperty(i) ? r(String(e.path[i])) : o;
  }), n = t.BASE + s;
  return e.query ? n + L(e.query) : n;
}, F = (t) => {
  if (t.formData) {
    const e = new FormData(), r = (s, n) => {
      h(n) || E(n) ? e.append(s, n) : e.append(s, JSON.stringify(n));
    };
    return Object.entries(t.formData).filter(([, s]) => s != null).forEach(([s, n]) => {
      Array.isArray(n) ? n.forEach((o) => r(s, o)) : r(s, n);
    }), e;
  }
}, f = async (t, e) => typeof e == "function" ? e(t) : e, M = async (t, e) => {
  const [r, s, n, o] = await Promise.all([
    // @ts-ignore
    f(e, t.TOKEN),
    // @ts-ignore
    f(e, t.USERNAME),
    // @ts-ignore
    f(e, t.PASSWORD),
    // @ts-ignore
    f(e, t.HEADERS)
  ]), i = Object.entries({
    Accept: "application/json",
    ...o,
    ...e.headers
  }).filter(([, a]) => a != null).reduce((a, [d, c]) => ({
    ...a,
    [d]: String(c)
  }), {});
  if (R(r) && (i.Authorization = `Bearer ${r}`), R(s) && R(n)) {
    const a = $(`${s}:${n}`);
    i.Authorization = `Basic ${a}`;
  }
  return e.body !== void 0 && (e.mediaType ? i["Content-Type"] = e.mediaType : E(e.body) ? i["Content-Type"] = e.body.type || "application/octet-stream" : h(e.body) ? i["Content-Type"] = "text/plain" : j(e.body) || (i["Content-Type"] = "application/json")), new Headers(i);
}, G = (t) => {
  var e, r;
  if (t.body !== void 0)
    return (e = t.mediaType) != null && e.includes("application/json") || (r = t.mediaType) != null && r.includes("+json") ? JSON.stringify(t.body) : h(t.body) || E(t.body) || j(t.body) ? t.body : JSON.stringify(t.body);
}, W = async (t, e, r, s, n, o, i) => {
  const a = new AbortController();
  let d = {
    headers: o,
    body: s ?? n,
    method: e.method,
    signal: a.signal
  };
  t.WITH_CREDENTIALS && (d.credentials = t.CREDENTIALS);
  for (const c of t.interceptors.request._fns)
    d = await c(d);
  return i(() => a.abort()), await fetch(r, d);
}, J = (t, e) => {
  if (e) {
    const r = t.headers.get(e);
    if (h(r))
      return r;
  }
}, V = async (t) => {
  if (t.status !== 204)
    try {
      const e = t.headers.get("Content-Type");
      if (e) {
        const r = ["application/octet-stream", "application/pdf", "application/zip", "audio/", "image/", "video/"];
        if (e.includes("application/json") || e.includes("+json"))
          return await t.json();
        if (r.some((s) => e.includes(s)))
          return await t.blob();
        if (e.includes("multipart/form-data"))
          return await t.formData();
        if (e.includes("text/"))
          return await t.text();
      }
    } catch (e) {
      console.error(e);
    }
}, z = (t, e) => {
  const s = {
    400: "Bad Request",
    401: "Unauthorized",
    402: "Payment Required",
    403: "Forbidden",
    404: "Not Found",
    405: "Method Not Allowed",
    406: "Not Acceptable",
    407: "Proxy Authentication Required",
    408: "Request Timeout",
    409: "Conflict",
    410: "Gone",
    411: "Length Required",
    412: "Precondition Failed",
    413: "Payload Too Large",
    414: "URI Too Long",
    415: "Unsupported Media Type",
    416: "Range Not Satisfiable",
    417: "Expectation Failed",
    418: "Im a teapot",
    421: "Misdirected Request",
    422: "Unprocessable Content",
    423: "Locked",
    424: "Failed Dependency",
    425: "Too Early",
    426: "Upgrade Required",
    428: "Precondition Required",
    429: "Too Many Requests",
    431: "Request Header Fields Too Large",
    451: "Unavailable For Legal Reasons",
    500: "Internal Server Error",
    501: "Not Implemented",
    502: "Bad Gateway",
    503: "Service Unavailable",
    504: "Gateway Timeout",
    505: "HTTP Version Not Supported",
    506: "Variant Also Negotiates",
    507: "Insufficient Storage",
    508: "Loop Detected",
    510: "Not Extended",
    511: "Network Authentication Required",
    ...t.errors
  }[e.status];
  if (s)
    throw new S(t, e, s);
  if (!e.ok) {
    const n = e.status ?? "unknown", o = e.statusText ?? "unknown", i = (() => {
      try {
        return JSON.stringify(e.body, null, 2);
      } catch {
        return;
      }
    })();
    throw new S(
      t,
      e,
      `Generic Error: status: ${n}; status text: ${o}; body: ${i}`
    );
  }
}, K = (t, e) => new v(async (r, s, n) => {
  try {
    const o = k(t, e), i = F(e), a = G(e), d = await M(t, e);
    if (!n.isCancelled) {
      let c = await W(t, e, o, a, i, d, n);
      for (const N of t.interceptors.response._fns)
        c = await N(c);
      const g = await V(c), I = J(c, e.responseHeader);
      let C = g;
      e.responseTransformer && c.ok && (C = await e.responseTransformer(g));
      const T = {
        url: o,
        ok: c.ok,
        status: c.status,
        statusText: c.statusText,
        body: I ?? C
      };
      z(e, T), r(T.body);
    }
  } catch (o) {
    s(o);
  }
}), Q = (t = {}) => K(y, {
  method: "GET",
  url: "/umbraco/management/api/v1/AnchorEditor/GetContentBlockIds",
  query: {
    nodeId: t.nodeId,
    culture: t.culture
  }
});
var l;
class X {
  constructor(e) {
    m(this, l);
    b(this, l, e);
  }
  async getContentBlockIds(e, r) {
    return await D(p(this, l), Q({ nodeId: e, culture: r }));
  }
}
l = new WeakMap();
var u;
class Y extends x {
  constructor(r) {
    super(r);
    m(this, u);
    b(this, u, new X(this));
  }
  async getContentBlockIds(r, s) {
    return p(this, u).getContentBlockIds(r, s);
  }
}
u = new WeakMap();
const Z = [
  {
    type: "repository",
    alias: "anchors.repository",
    name: "Anchors Repository",
    api: Y
  }
], ee = [...Z], oe = (t, e) => {
  e.registerMany([
    ...B,
    ...H,
    ...ee
  ]), t.consumeContext(O, (r) => {
    const s = r.getOpenApiConfiguration();
    y.TOKEN = s.token, y.BASE = s.base, y.WITH_CREDENTIALS = s.withCredentials;
  });
};
export {
  Y as A,
  oe as o
};
//# sourceMappingURL=index.ts-o8X6ZDjj.js.map
