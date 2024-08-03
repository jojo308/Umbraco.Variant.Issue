import { LitElement as B, html as U, property as g, state as c, customElement as R } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin as M } from "@umbraco-cms/backoffice/element-api";
import { ANCHORS_MANAGEMENT_CONTEXT_TOKEN as A } from "./anchors.context-Drjz1b7i.js";
import { UMB_WORKSPACE_CONTEXT as v, UMB_ENTITY_WORKSPACE_CONTEXT as x } from "@umbraco-cms/backoffice/workspace";
import { UMB_PROPERTY_DATASET_CONTEXT as X, UMB_PROPERTY_CONTEXT as d } from "@umbraco-cms/backoffice/property";
import { UMB_ENTITY_CONTEXT as W } from "@umbraco-cms/backoffice/entity";
import { UMB_DOCUMENT_WORKSPACE_CONTEXT as m } from "@umbraco-cms/backoffice/document";
var k = Object.defineProperty, S = Object.getOwnPropertyDescriptor, P = (e) => {
  throw TypeError(e);
}, T = (e, t, o, s) => {
  for (var n = s > 1 ? void 0 : s ? S(t, o) : t, r = e.length - 1, i; r >= 0; r--)
    (i = e[r]) && (n = (s ? i(t, o, n) : i(n)) || n);
  return s && n && k(t, o, n), n;
}, I = (e, t, o) => t.has(e) || P("Cannot " + o), Y = (e, t, o) => t.has(e) ? P("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, o), K = (e, t, o) => (I(e, t, "access private method"), o), a, y;
let _ = class extends M(B) {
  constructor() {
    super(), Y(this, a), this._anchors = [], this._nodeId = "", this._culture = "", this.consumeContext(W, (e) => {
      this._entityContext = e, this._nodeId = this._entityContext.getUnique() ?? "", console.log("UMB_ENTITY_CONTEXT", e);
    }), this.consumeContext(A, (e) => {
      this._anchorsContext = e, this.observe(e.anchors, (t) => {
        this._anchors = t;
      });
    });
  }
  async connectedCallback() {
    var e, t, o, s, n, r, i, l, C, E, p, O, h, u, N;
    super.connectedCallback(), K(this, a, y).call(this), console.log("UMB_WORKSPACE_CONTEXT:contentBlocks", (e = this._workspaceContext) == null ? void 0 : e.getPropertyValue("contentBlocks")), console.log("UMB_WORKSPACE_CONTEXT:title", (t = this._workspaceContext) == null ? void 0 : t.getPropertyValue("title")), console.log("UMB_PROPERTY_DATASET_CONTEXT:variantId", (o = this._propertyDatasetContext) == null ? void 0 : o.getVariantId()), console.log("UMB_PROPERTY_DATASET_CONTEXT:unique", (s = this._propertyDatasetContext) == null ? void 0 : s.getUnique()), console.log("UMB_DOCUMENT_WORKSPACE_CONTEXT:collectionAlias:", (n = this._documentWorkspaceContext) == null ? void 0 : n.getCollectionAlias()), console.log("UMB_DOCUMENT_WORKSPACE_CONTEXT:data:", (r = this._documentWorkspaceContext) == null ? void 0 : r.getData()), console.log("UMB_DOCUMENT_WORKSPACE_CONTEXT:contentBlocks", (i = this._documentWorkspaceContext) == null ? void 0 : i.getPropertyValue("contentBlocks")), console.log("UMB_PROPERTY_CONTEXT:variantId:", (l = this._propertyContext) == null ? void 0 : l.getVariantId()), console.log("UMB_PROPERTY_CONTEXT:getAlias:", (C = this._propertyContext) == null ? void 0 : C.getAlias()), console.log("UMB_ENTITY_CONTEXT:unique:", (E = this._entityContext) == null ? void 0 : E.getUnique()), console.log("UMB_ENTITY_WORKSPACE_CONTEXT:type:", (p = this._entityWorkspaceContext) == null ? void 0 : p.getEntityType()), console.log("UMB_ENTITY_WORKSPACE_CONTEXT:unique:", (O = this._entityWorkspaceContext) == null ? void 0 : O.getUnique()), console.log("UMB_ENTITY_WORKSPACE_CONTEXT:type2:", (h = this._entityWorkspaceContext) == null ? void 0 : h.getEntityType()), console.log("UMB_ENTITY_WORKSPACE_CONTEXT:unique2:", (u = this._entityWorkspaceContext) == null ? void 0 : u.getUnique()), await ((N = this._anchorsContext) == null ? void 0 : N.getContentBlockIds(this._nodeId ?? "", "nl-NL"));
  }
  render() {
    return U`
        <uui-box>    
            <p>anchor tag editor</p>              
        </uui-box>
        <umb-debug visible></umb-debug>
        `;
  }
};
a = /* @__PURE__ */ new WeakSet();
y = function() {
  this.consumeContext(v, (e) => {
    this._workspaceContext = e, console.log("UMB_WORKSPACE_CONTEXT", e), this.observe(this._workspaceContext.variantOptions, (t) => {
      console.log("UMB_WORKSPACE_CONTEXT:variant options:", t);
    }), this.observe(this._workspaceContext.variants, (t) => {
      console.log("UMB_WORKSPACE_CONTEXT:variants:", t);
    });
  }), this.consumeContext(X, (e) => {
    this._propertyDatasetContext = e, console.log("UMB_PROPERTY_DATASET_CONTEXT", e), this._propertyDatasetContext.propertyVariantId && this._propertyDatasetContext.propertyVariantId("contentBlocks").then((t) => {
      this.observe(t, (o) => {
        console.log("UMB_PROPERTY_DATASET_CONTEXT:contentBlocks:", o);
      });
    });
  }), this.consumeContext(m, (e) => {
    console.log("UMB_DOCUMENT_WORKSPACE_CONTEXT", e), this._documentWorkspaceContext = e;
  }), this.consumeContext(d, (e) => {
    console.log("UMB_PROPERTY_CONTEXT", e), this._propertyContext = e, this.observe(this._propertyContext.variantId, (t) => {
      console.log("UMB_PROPERTY_CONTEXT:variantId:", t), t && t.culture !== void 0 ? (this._culture = t.culture ?? "", console.log(":UMB_PROPERTY_CONTEXTculture:", this._culture)) : console.log("UMB_PROPERTY_CONTEXT:culture is undefined");
    });
  }), this.consumeContext(x, (e) => {
    console.log("UMB_ENTITY_WORKSPACE_CONTEXT", e), this._entityWorkspaceContext = e, this.observe(this._entityWorkspaceContext.variantOptions, (t) => {
      console.log("UMB_ENTITY_WORKSPACE_CONTEXT:variant options:", t);
    }), this.observe(this._entityWorkspaceContext.variants, (t) => {
      console.log("UMB_ENTITY_WORKSPACE_CONTEXT:variants:", t);
    }), this._entityWorkspaceContext.propertyValueByAlias("contentBlocks").then((t) => {
      this.observe(t, (o) => {
        console.log("UMB_ENTITY_WORKSPACE_CONTEXT:contentBlocks:", o);
      });
    }), this._entityWorkspaceContext.propertyValueByAlias("title").then((t) => {
      this.observe(t, (o) => {
        console.log("UMB_ENTITY_WORKSPACE_CONTEXT:title:", o);
      });
    });
  });
};
T([
  g({ type: Object })
], _.prototype, "value", 2);
T([
  g({ type: Object })
], _.prototype, "config", 2);
T([
  c()
], _.prototype, "_anchors", 2);
T([
  c()
], _.prototype, "_nodeId", 2);
T([
  c()
], _.prototype, "_culture", 2);
_ = T([
  R("anchor-tag-picker")
], _);
export {
  _ as default
};
//# sourceMappingURL=anchor-tag-picker-DsqTlvZb.js.map
