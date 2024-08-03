var h = (t) => {
  throw TypeError(t);
};
var p = (t, s, o) => s.has(t) || h("Cannot " + o);
var a = (t, s, o) => (p(t, s, "read from private field"), o ? o.call(t) : s.get(t)), i = (t, s, o) => s.has(t) ? h("Cannot add the same private member more than once") : s instanceof WeakSet ? s.add(t) : s.set(t, o), m = (t, s, o, r) => (p(t, s, "write to private field"), r ? r.call(t, o) : s.set(t, o), o);
import { UmbControllerBase as l } from "@umbraco-cms/backoffice/class-api";
import { UmbContextToken as C } from "@umbraco-cms/backoffice/context-api";
import { UmbBasicState as d } from "@umbraco-cms/backoffice/observable-api";
import { A as f } from "./index.ts-o8X6ZDjj.js";
var n, e;
class A extends l {
  constructor(o) {
    super(o);
    i(this, n);
    i(this, e);
    m(this, e, new d(void 0)), this.anchors = a(this, e).asObservable(), this.provideContext(b, this), m(this, n, new f(this));
  }
  async getContentBlockIds(o, r) {
    const { data: c } = await a(this, n).getContentBlockIds(o, r);
    c && a(this, e).setValue(c);
  }
}
n = new WeakMap(), e = new WeakMap();
const b = new C(A.name);
export {
  b as ANCHORS_MANAGEMENT_CONTEXT_TOKEN,
  A as AnchorsManagementContext,
  A as default
};
//# sourceMappingURL=anchors.context-Drjz1b7i.js.map
