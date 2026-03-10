import Lr, { createContext as _t, useReducer as da, useMemo as g, useContext as jt, useRef as ur, useState as Rr, useCallback as ce, useEffect as St, forwardRef as fa } from "react";
import { ResponsiveContainer as ae, LineChart as oa, CartesianGrid as We, XAxis as Ce, YAxis as ge, Tooltip as le, Line as Nt, Brush as pt, AreaChart as ha, Area as ma, BarChart as kt, Bar as fr, Cell as er, PieChart as ba, Pie as ya, ScatterChart as xa, Scatter as Wr, ComposedChart as va, RadarChart as _a, PolarGrid as Et, PolarAngleAxis as Tt, PolarRadiusAxis as ja, Radar as Sa, Treemap as Na, FunnelChart as pa, Funnel as ka, LabelList as Ea, Sankey as Ta, RadialBarChart as Ca, RadialBar as Ur } from "recharts";
var pr = { exports: {} }, Xe = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Yr;
function ga() {
  if (Yr) return Xe;
  Yr = 1;
  var e = Lr, r = Symbol.for("react.element"), t = Symbol.for("react.fragment"), l = Object.prototype.hasOwnProperty, a = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, i = { key: !0, ref: !0, __self: !0, __source: !0 };
  function u(s, d, f) {
    var o, h = {}, m = null, b = null;
    f !== void 0 && (m = "" + f), d.key !== void 0 && (m = "" + d.key), d.ref !== void 0 && (b = d.ref);
    for (o in d) l.call(d, o) && !i.hasOwnProperty(o) && (h[o] = d[o]);
    if (s && s.defaultProps) for (o in d = s.defaultProps, d) h[o] === void 0 && (h[o] = d[o]);
    return { $$typeof: r, type: s, key: m, ref: b, props: h, _owner: a.current };
  }
  return Xe.Fragment = t, Xe.jsx = u, Xe.jsxs = u, Xe;
}
var Ae = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Gr;
function Da() {
  return Gr || (Gr = 1, process.env.NODE_ENV !== "production" && function() {
    var e = Lr, r = Symbol.for("react.element"), t = Symbol.for("react.portal"), l = Symbol.for("react.fragment"), a = Symbol.for("react.strict_mode"), i = Symbol.for("react.profiler"), u = Symbol.for("react.provider"), s = Symbol.for("react.context"), d = Symbol.for("react.forward_ref"), f = Symbol.for("react.suspense"), o = Symbol.for("react.suspense_list"), h = Symbol.for("react.memo"), m = Symbol.for("react.lazy"), b = Symbol.for("react.offscreen"), S = Symbol.iterator, j = "@@iterator";
    function y(c) {
      if (c === null || typeof c != "object")
        return null;
      var _ = S && c[S] || c[j];
      return typeof _ == "function" ? _ : null;
    }
    var x = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function v(c) {
      {
        for (var _ = arguments.length, E = new Array(_ > 1 ? _ - 1 : 0), C = 1; C < _; C++)
          E[C - 1] = arguments[C];
        N("error", c, E);
      }
    }
    function N(c, _, E) {
      {
        var C = x.ReactDebugCurrentFrame, V = C.getStackAddendum();
        V !== "" && (_ += "%s", E = E.concat([V]));
        var w = E.map(function(M) {
          return String(M);
        });
        w.unshift("Warning: " + _), Function.prototype.apply.call(console[c], console, w);
      }
    }
    var k = !1, T = !1, D = !1, P = !1, L = !1, G;
    G = Symbol.for("react.module.reference");
    function R(c) {
      return !!(typeof c == "string" || typeof c == "function" || c === l || c === i || L || c === a || c === f || c === o || P || c === b || k || T || D || typeof c == "object" && c !== null && (c.$$typeof === m || c.$$typeof === h || c.$$typeof === u || c.$$typeof === s || c.$$typeof === d || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      c.$$typeof === G || c.getModuleId !== void 0));
    }
    function O(c, _, E) {
      var C = c.displayName;
      if (C)
        return C;
      var V = _.displayName || _.name || "";
      return V !== "" ? E + "(" + V + ")" : E;
    }
    function ie(c) {
      return c.displayName || "Context";
    }
    function W(c) {
      if (c == null)
        return null;
      if (typeof c.tag == "number" && v("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof c == "function")
        return c.displayName || c.name || null;
      if (typeof c == "string")
        return c;
      switch (c) {
        case l:
          return "Fragment";
        case t:
          return "Portal";
        case i:
          return "Profiler";
        case a:
          return "StrictMode";
        case f:
          return "Suspense";
        case o:
          return "SuspenseList";
      }
      if (typeof c == "object")
        switch (c.$$typeof) {
          case s:
            var _ = c;
            return ie(_) + ".Consumer";
          case u:
            var E = c;
            return ie(E._context) + ".Provider";
          case d:
            return O(c, c.render, "ForwardRef");
          case h:
            var C = c.displayName || null;
            return C !== null ? C : W(c.type) || "Memo";
          case m: {
            var V = c, w = V._payload, M = V._init;
            try {
              return W(M(w));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var Y = Object.assign, X = 0, xe, ve, _e, de, je, Le, Re;
    function ee() {
    }
    ee.__reactDisabledLog = !0;
    function ar() {
      {
        if (X === 0) {
          xe = console.log, ve = console.info, _e = console.warn, de = console.error, je = console.group, Le = console.groupCollapsed, Re = console.groupEnd;
          var c = {
            configurable: !0,
            enumerable: !0,
            value: ee,
            writable: !0
          };
          Object.defineProperties(console, {
            info: c,
            log: c,
            warn: c,
            error: c,
            group: c,
            groupCollapsed: c,
            groupEnd: c
          });
        }
        X++;
      }
    }
    function lr() {
      {
        if (X--, X === 0) {
          var c = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: Y({}, c, {
              value: xe
            }),
            info: Y({}, c, {
              value: ve
            }),
            warn: Y({}, c, {
              value: _e
            }),
            error: Y({}, c, {
              value: de
            }),
            group: Y({}, c, {
              value: je
            }),
            groupCollapsed: Y({}, c, {
              value: Le
            }),
            groupEnd: Y({}, c, {
              value: Re
            })
          });
        }
        X < 0 && v("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var Ie = x.ReactCurrentDispatcher, me;
    function $e(c, _, E) {
      {
        if (me === void 0)
          try {
            throw Error();
          } catch (V) {
            var C = V.stack.trim().match(/\n( *(at )?)/);
            me = C && C[1] || "";
          }
        return `
` + me + c;
      }
    }
    var Se = !1, Fe;
    {
      var mr = typeof WeakMap == "function" ? WeakMap : Map;
      Fe = new mr();
    }
    function Ue(c, _) {
      if (!c || Se)
        return "";
      {
        var E = Fe.get(c);
        if (E !== void 0)
          return E;
      }
      var C;
      Se = !0;
      var V = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var w;
      w = Ie.current, Ie.current = null, ar();
      try {
        if (_) {
          var M = function() {
            throw Error();
          };
          if (Object.defineProperty(M.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(M, []);
            } catch (A) {
              C = A;
            }
            Reflect.construct(c, [], M);
          } else {
            try {
              M.call();
            } catch (A) {
              C = A;
            }
            c.call(M.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (A) {
            C = A;
          }
          c();
        }
      } catch (A) {
        if (A && C && typeof A.stack == "string") {
          for (var $ = A.stack.split(`
`), H = C.stack.split(`
`), z = $.length - 1, U = H.length - 1; z >= 1 && U >= 0 && $[z] !== H[U]; )
            U--;
          for (; z >= 1 && U >= 0; z--, U--)
            if ($[z] !== H[U]) {
              if (z !== 1 || U !== 1)
                do
                  if (z--, U--, U < 0 || $[z] !== H[U]) {
                    var te = `
` + $[z].replace(" at new ", " at ");
                    return c.displayName && te.includes("<anonymous>") && (te = te.replace("<anonymous>", c.displayName)), typeof c == "function" && Fe.set(c, te), te;
                  }
                while (z >= 1 && U >= 0);
              break;
            }
        }
      } finally {
        Se = !1, Ie.current = w, lr(), Error.prepareStackTrace = V;
      }
      var we = c ? c.displayName || c.name : "", Te = we ? $e(we) : "";
      return typeof c == "function" && Fe.set(c, Te), Te;
    }
    function nr(c, _, E) {
      return Ue(c, !1);
    }
    function Ye(c) {
      var _ = c.prototype;
      return !!(_ && _.isReactComponent);
    }
    function Pe(c, _, E) {
      if (c == null)
        return "";
      if (typeof c == "function")
        return Ue(c, Ye(c));
      if (typeof c == "string")
        return $e(c);
      switch (c) {
        case f:
          return $e("Suspense");
        case o:
          return $e("SuspenseList");
      }
      if (typeof c == "object")
        switch (c.$$typeof) {
          case d:
            return nr(c.render);
          case h:
            return Pe(c.type, _, E);
          case m: {
            var C = c, V = C._payload, w = C._init;
            try {
              return Pe(w(V), _, E);
            } catch {
            }
          }
        }
      return "";
    }
    var Ne = Object.prototype.hasOwnProperty, ir = {}, Ge = x.ReactDebugCurrentFrame;
    function pe(c) {
      if (c) {
        var _ = c._owner, E = Pe(c.type, c._source, _ ? _.type : null);
        Ge.setExtraStackFrame(E);
      } else
        Ge.setExtraStackFrame(null);
    }
    function p(c, _, E, C, V) {
      {
        var w = Function.call.bind(Ne);
        for (var M in c)
          if (w(c, M)) {
            var $ = void 0;
            try {
              if (typeof c[M] != "function") {
                var H = Error((C || "React class") + ": " + E + " type `" + M + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof c[M] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw H.name = "Invariant Violation", H;
              }
              $ = c[M](_, M, C, E, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (z) {
              $ = z;
            }
            $ && !($ instanceof Error) && (pe(V), v("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", C || "React class", E, M, typeof $), pe(null)), $ instanceof Error && !($.message in ir) && (ir[$.message] = !0, pe(V), v("Failed %s type: %s", E, $.message), pe(null));
          }
      }
    }
    var I = Array.isArray;
    function F(c) {
      return I(c);
    }
    function K(c) {
      {
        var _ = typeof Symbol == "function" && Symbol.toStringTag, E = _ && c[Symbol.toStringTag] || c.constructor.name || "Object";
        return E;
      }
    }
    function re(c) {
      try {
        return ke(c), !1;
      } catch {
        return !0;
      }
    }
    function ke(c) {
      return "" + c;
    }
    function Ze(c) {
      if (re(c))
        return v("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", K(c)), ke(c);
    }
    var Ee = x.ReactCurrentOwner, He = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Me, se;
    function fe(c) {
      if (Ne.call(c, "ref")) {
        var _ = Object.getOwnPropertyDescriptor(c, "ref").get;
        if (_ && _.isReactWarning)
          return !1;
      }
      return c.ref !== void 0;
    }
    function oe(c) {
      if (Ne.call(c, "key")) {
        var _ = Object.getOwnPropertyDescriptor(c, "key").get;
        if (_ && _.isReactWarning)
          return !1;
      }
      return c.key !== void 0;
    }
    function Xt(c, _) {
      typeof c.ref == "string" && Ee.current;
    }
    function At(c, _) {
      {
        var E = function() {
          Me || (Me = !0, v("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", _));
        };
        E.isReactWarning = !0, Object.defineProperty(c, "key", {
          get: E,
          configurable: !0
        });
      }
    }
    function Jt(c, _) {
      {
        var E = function() {
          se || (se = !0, v("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", _));
        };
        E.isReactWarning = !0, Object.defineProperty(c, "ref", {
          get: E,
          configurable: !0
        });
      }
    }
    var Qt = function(c, _, E, C, V, w, M) {
      var $ = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: r,
        // Built-in properties that belong on the element
        type: c,
        key: _,
        ref: E,
        props: M,
        // Record the component responsible for creating this element.
        _owner: w
      };
      return $._store = {}, Object.defineProperty($._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty($, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: C
      }), Object.defineProperty($, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: V
      }), Object.freeze && (Object.freeze($.props), Object.freeze($)), $;
    };
    function qt(c, _, E, C, V) {
      {
        var w, M = {}, $ = null, H = null;
        E !== void 0 && (Ze(E), $ = "" + E), oe(_) && (Ze(_.key), $ = "" + _.key), fe(_) && (H = _.ref, Xt(_, V));
        for (w in _)
          Ne.call(_, w) && !He.hasOwnProperty(w) && (M[w] = _[w]);
        if (c && c.defaultProps) {
          var z = c.defaultProps;
          for (w in z)
            M[w] === void 0 && (M[w] = z[w]);
        }
        if ($ || H) {
          var U = typeof c == "function" ? c.displayName || c.name || "Unknown" : c;
          $ && At(M, U), H && Jt(M, U);
        }
        return Qt(c, $, H, V, C, Ee.current, M);
      }
    }
    var br = x.ReactCurrentOwner, Mr = x.ReactDebugCurrentFrame;
    function Ve(c) {
      if (c) {
        var _ = c._owner, E = Pe(c.type, c._source, _ ? _.type : null);
        Mr.setExtraStackFrame(E);
      } else
        Mr.setExtraStackFrame(null);
    }
    var yr;
    yr = !1;
    function xr(c) {
      return typeof c == "object" && c !== null && c.$$typeof === r;
    }
    function Vr() {
      {
        if (br.current) {
          var c = W(br.current.type);
          if (c)
            return `

Check the render method of \`` + c + "`.";
        }
        return "";
      }
    }
    function ea(c) {
      return "";
    }
    var wr = {};
    function ra(c) {
      {
        var _ = Vr();
        if (!_) {
          var E = typeof c == "string" ? c : c.displayName || c.name;
          E && (_ = `

Check the top-level render call using <` + E + ">.");
        }
        return _;
      }
    }
    function Or(c, _) {
      {
        if (!c._store || c._store.validated || c.key != null)
          return;
        c._store.validated = !0;
        var E = ra(_);
        if (wr[E])
          return;
        wr[E] = !0;
        var C = "";
        c && c._owner && c._owner !== br.current && (C = " It was passed a child from " + W(c._owner.type) + "."), Ve(c), v('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', E, C), Ve(null);
      }
    }
    function Kr(c, _) {
      {
        if (typeof c != "object")
          return;
        if (F(c))
          for (var E = 0; E < c.length; E++) {
            var C = c[E];
            xr(C) && Or(C, _);
          }
        else if (xr(c))
          c._store && (c._store.validated = !0);
        else if (c) {
          var V = y(c);
          if (typeof V == "function" && V !== c.entries)
            for (var w = V.call(c), M; !(M = w.next()).done; )
              xr(M.value) && Or(M.value, _);
        }
      }
    }
    function ta(c) {
      {
        var _ = c.type;
        if (_ == null || typeof _ == "string")
          return;
        var E;
        if (typeof _ == "function")
          E = _.propTypes;
        else if (typeof _ == "object" && (_.$$typeof === d || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        _.$$typeof === h))
          E = _.propTypes;
        else
          return;
        if (E) {
          var C = W(_);
          p(E, c.props, "prop", C, c);
        } else if (_.PropTypes !== void 0 && !yr) {
          yr = !0;
          var V = W(_);
          v("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", V || "Unknown");
        }
        typeof _.getDefaultProps == "function" && !_.getDefaultProps.isReactClassApproved && v("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function aa(c) {
      {
        for (var _ = Object.keys(c.props), E = 0; E < _.length; E++) {
          var C = _[E];
          if (C !== "children" && C !== "key") {
            Ve(c), v("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", C), Ve(null);
            break;
          }
        }
        c.ref !== null && (Ve(c), v("Invalid attribute `ref` supplied to `React.Fragment`."), Ve(null));
      }
    }
    var zr = {};
    function Br(c, _, E, C, V, w) {
      {
        var M = R(c);
        if (!M) {
          var $ = "";
          (c === void 0 || typeof c == "object" && c !== null && Object.keys(c).length === 0) && ($ += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var H = ea();
          H ? $ += H : $ += Vr();
          var z;
          c === null ? z = "null" : F(c) ? z = "array" : c !== void 0 && c.$$typeof === r ? (z = "<" + (W(c.type) || "Unknown") + " />", $ = " Did you accidentally export a JSX literal instead of a component?") : z = typeof c, v("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", z, $);
        }
        var U = qt(c, _, E, V, w);
        if (U == null)
          return U;
        if (M) {
          var te = _.children;
          if (te !== void 0)
            if (C)
              if (F(te)) {
                for (var we = 0; we < te.length; we++)
                  Kr(te[we], c);
                Object.freeze && Object.freeze(te);
              } else
                v("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Kr(te, c);
        }
        if (Ne.call(_, "key")) {
          var Te = W(c), A = Object.keys(_).filter(function(ca) {
            return ca !== "key";
          }), vr = A.length > 0 ? "{key: someKey, " + A.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!zr[Te + vr]) {
            var ua = A.length > 0 ? "{" + A.join(": ..., ") + ": ...}" : "{}";
            v(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, vr, Te, ua, Te), zr[Te + vr] = !0;
          }
        }
        return c === l ? aa(U) : ta(U), U;
      }
    }
    function la(c, _, E) {
      return Br(c, _, E, !0);
    }
    function na(c, _, E) {
      return Br(c, _, E, !1);
    }
    var ia = na, sa = la;
    Ae.Fragment = l, Ae.jsx = ia, Ae.jsxs = sa;
  }()), Ae;
}
process.env.NODE_ENV === "production" ? pr.exports = ga() : pr.exports = Da();
var n = pr.exports;
const Z = {
  SET_CONTEXT: "dashboard/SET_CONTEXT",
  SET_GLOBAL_FILTERS: "dashboard/SET_GLOBAL_FILTERS",
  ADD_SELECTION: "dashboard/ADD_SELECTION",
  REMOVE_SELECTION: "dashboard/REMOVE_SELECTION",
  CLEAR_SELECTIONS: "dashboard/CLEAR_SELECTIONS",
  PUSH_DRILL: "dashboard/PUSH_DRILL",
  POP_DRILL: "dashboard/POP_DRILL",
  SET_PANEL_STATE: "dashboard/SET_PANEL_STATE"
}, La = ({ dashboardId: e, datasetId: r }) => ({
  type: Z.SET_CONTEXT,
  payload: { dashboardId: e, datasetId: r }
}), Ra = (e) => ({
  type: Z.SET_GLOBAL_FILTERS,
  payload: { filters: e }
}), Ia = (e) => ({
  type: Z.ADD_SELECTION,
  payload: { selection: e }
}), $a = (e) => ({
  type: Z.REMOVE_SELECTION,
  payload: { selectionId: e }
}), Fa = () => ({
  type: Z.CLEAR_SELECTIONS
}), Pa = (e) => ({
  type: Z.PUSH_DRILL,
  payload: { entry: e }
}), Ma = () => ({
  type: Z.POP_DRILL
}), Va = (e, r) => ({
  type: Z.SET_PANEL_STATE,
  payload: { panelId: e, nextState: r }
}), wa = (e = {}) => ({
  dashboardId: null,
  datasetId: null,
  globalFilters: [],
  selections: [],
  drillPath: [],
  panelStateById: {},
  ...e
}), Oa = (e, r, t) => ({
  ...e,
  [r]: {
    ...e[r] || {},
    ...t
  }
}), Ka = (e, r) => {
  switch (r.type) {
    case Z.SET_CONTEXT:
      return {
        ...e,
        dashboardId: r.payload.dashboardId ?? e.dashboardId,
        datasetId: r.payload.datasetId ?? e.datasetId
      };
    case Z.SET_GLOBAL_FILTERS:
      return {
        ...e,
        globalFilters: r.payload.filters
      };
    case Z.ADD_SELECTION:
      return {
        ...e,
        selections: [...e.selections, r.payload.selection]
      };
    case Z.REMOVE_SELECTION:
      return {
        ...e,
        selections: e.selections.filter(
          (t) => t.id !== r.payload.selectionId
        )
      };
    case Z.CLEAR_SELECTIONS:
      return {
        ...e,
        selections: []
      };
    case Z.PUSH_DRILL:
      return {
        ...e,
        drillPath: [...e.drillPath, r.payload.entry]
      };
    case Z.POP_DRILL:
      return {
        ...e,
        drillPath: e.drillPath.slice(0, -1)
      };
    case Z.SET_PANEL_STATE:
      return {
        ...e,
        panelStateById: Oa(
          e.panelStateById,
          r.payload.panelId,
          r.payload.nextState
        )
      };
    default:
      return e;
  }
}, Ct = _t(null), gt = _t(null), za = (e) => ({
  setDashboardContext: (r) => e(La(r)),
  setGlobalFilters: (r) => e(Ra(r)),
  addSelection: (r) => e(Ia(r)),
  removeSelection: (r) => e($a(r)),
  clearSelections: () => e(Fa()),
  pushDrillPath: (r) => e(Pa(r)),
  popDrillPath: () => e(Ma()),
  setPanelState: (r, t) => e(Va(r, t))
}), is = ({ children: e, initialState: r }) => {
  const [t, l] = da(
    Ka,
    wa(r)
  ), a = g(() => za(l), [l]);
  return /* @__PURE__ */ n.jsx(Ct.Provider, { value: t, children: /* @__PURE__ */ n.jsx(gt.Provider, { value: a, children: e }) });
}, ss = () => {
  const e = jt(Ct);
  if (!e)
    throw new Error("useDashboardState must be used within a DashboardProvider");
  return e;
}, us = () => {
  const e = jt(gt);
  if (!e)
    throw new Error("useDashboardActions must be used within a DashboardProvider");
  return e;
};
function Ba({ message: e = "Loading data…" }) {
  return /* @__PURE__ */ n.jsxs("div", { className: "ladf-panel__state ladf-panel__state--loading", children: [
    /* @__PURE__ */ n.jsx("span", { className: "ladf-panel__state-icon", "aria-hidden": "true", children: "⏳" }),
    /* @__PURE__ */ n.jsx("p", { className: "ladf-panel__state-text", children: e })
  ] });
}
function Wa({ title: e = "No data yet", message: r = "Try adjusting filters or refreshing the panel." }) {
  return /* @__PURE__ */ n.jsxs("div", { className: "ladf-panel__state ladf-panel__state--empty", children: [
    /* @__PURE__ */ n.jsx("p", { className: "ladf-panel__state-title", children: e }),
    /* @__PURE__ */ n.jsx("p", { className: "ladf-panel__state-text", children: r })
  ] });
}
function Ua({ title: e = "Something went wrong", message: r = "Please try again." }) {
  return /* @__PURE__ */ n.jsxs("div", { className: "ladf-panel__state ladf-panel__state--error", children: [
    /* @__PURE__ */ n.jsx("p", { className: "ladf-panel__state-title", children: e }),
    /* @__PURE__ */ n.jsx("p", { className: "ladf-panel__state-text", children: r })
  ] });
}
const Ya = (e) => e ? typeof e == "string" ? e : e.message || "Something went wrong." : null;
function Ga({ status: e = "ready", isEmpty: r = !1, emptyMessage: t, error: l, children: a }) {
  let i = /* @__PURE__ */ n.jsx("div", { className: "ladf-panel__content", children: a });
  return e === "loading" && (i = /* @__PURE__ */ n.jsx(Ba, {})), e === "error" && (i = /* @__PURE__ */ n.jsx(Ua, { message: Ya(l) })), (e === "empty" || r) && (i = /* @__PURE__ */ n.jsx(Wa, { message: t })), /* @__PURE__ */ n.jsx("div", { className: "ladf-panel__body", children: i });
}
function Za({ title: e, subtitle: r, actions: t }) {
  return !e && !r && !t ? null : /* @__PURE__ */ n.jsxs("div", { className: "ladf-panel__header", children: [
    /* @__PURE__ */ n.jsxs("div", { className: "ladf-panel__heading", children: [
      e ? /* @__PURE__ */ n.jsx("h2", { className: "ladf-panel__title", children: e }) : null,
      r ? /* @__PURE__ */ n.jsx("p", { className: "ladf-panel__subtitle", children: r }) : null
    ] }),
    t ? /* @__PURE__ */ n.jsx("div", { className: "ladf-panel__actions", children: t }) : null
  ] });
}
const Ha = (e = {}) => ({
  datasetId: e.datasetId ?? null,
  measures: Array.isArray(e.measures) ? [...e.measures] : [],
  dimensions: Array.isArray(e.dimensions) ? [...e.dimensions] : [],
  filters: Array.isArray(e.filters) ? [...e.filters] : [],
  timeRange: e.timeRange ?? null,
  grain: e.grain ?? null,
  sort: e.sort ?? null,
  limit: e.limit ?? null,
  offset: e.offset ?? null,
  timezone: e.timezone ?? null,
  transforms: Array.isArray(e.transforms) ? [...e.transforms] : []
}), Q = (e) => e ? Array.isArray(e) ? e : [e] : [], Xa = ({ panelId: e, field: r, value: t }) => `${e || "panel"}:${r}:${String(t)}`, Aa = ({
  panelId: e,
  field: r,
  value: t,
  op: l = "IN",
  label: a
}) => {
  if (!r)
    return null;
  const i = Array.isArray(t) ? t : [t], u = a ? `${a}: ${i.join(", ")}` : `${r}: ${i.join(", ")}`;
  return {
    id: Xa({ panelId: e, field: r, value: i.join("|") }),
    sourcePanelId: e || null,
    label: u,
    /** @type {Filter} */
    filter: {
      field: r,
      op: l,
      values: i
    }
  };
}, Dt = (e, r) => {
  var l, a, i;
  if (!e || !r)
    return null;
  if (e.payload && e.payload[r] !== void 0)
    return e.payload[r];
  if ((l = e.payload) != null && l.payload && e.payload.payload[r] !== void 0)
    return e.payload.payload[r];
  const t = (i = (a = e.activePayload) == null ? void 0 : a[0]) == null ? void 0 : i.payload;
  return t && t[r] !== void 0 ? t[r] : e.activeLabel !== void 0 && r === e.activeLabelField ? e.activeLabel : e[r] !== void 0 ? e[r] : null;
}, cs = ({
  event: e,
  panelId: r,
  field: t,
  op: l,
  label: a
}) => {
  const i = Dt(e, t);
  return i == null ? null : Aa({
    panelId: r,
    field: t,
    value: i,
    op: l,
    label: a
  });
}, Lt = (e) => {
  var t, l;
  if (!e)
    return "";
  if (e.label)
    return e.label;
  const r = ((t = e.filter) == null ? void 0 : t.values) || [];
  return `${((l = e.filter) == null ? void 0 : l.field) || "Filter"}: ${r.join(", ")}`;
}, ds = (e = [], r) => r ? e.some((t) => t.id === r.id) : !1, Ja = ({ panelId: e, dimension: r, value: t }) => `${e || "panel"}:${r}:${String(t)}`, Qa = ({
  panelId: e,
  dimension: r,
  to: t,
  value: l,
  label: a
}) => {
  if (!r || l === void 0 || l === null)
    return null;
  const i = a ? `${a}: ${l}` : `${r}: ${l}`;
  return {
    id: Ja({ panelId: e, dimension: r, value: l }),
    sourcePanelId: e || null,
    dimension: r,
    to: t,
    value: l,
    label: i,
    /** @type {Filter} */
    filter: {
      field: r,
      op: "IN",
      values: [l]
    }
  };
}, fs = ({
  event: e,
  panelId: r,
  dimension: t,
  to: l,
  label: a
}) => {
  const i = Dt(e, t);
  return i == null ? null : Qa({
    panelId: r,
    dimension: t,
    to: l,
    value: i,
    label: a
  });
}, qa = ({
  dimensions: e = [],
  drillPath: r = [],
  drilldownConfig: t
}) => !t || !r.length ? e : r.reduce((l, a) => !(a != null && a.dimension) || !(a != null && a.to) ? l : l.map(
  (i) => i === a.dimension ? a.to : i
), [...e]), os = (e = [], r) => r ? e.some((t) => t.id === r.id) : !1, Ir = (e) => e ? e.label ? e.label : `${e.dimension || "Dimension"}: ${e.value}` : "", el = (e) => e ? e.filter ? e.filter : e.filters ? e.filters : e.dimension && e.value !== void 0 ? {
  field: e.dimension,
  op: "IN",
  values: [e.value]
} : null : null, rl = ({ globalFilters: e, selections: r, drillPath: t, panelFilters: l }) => {
  const a = (r || []).flatMap((u) => u.filter ? Q(u.filter) : u.filters ? Q(u.filters) : []), i = (t || []).flatMap(
    (u) => Q(el(u))
  );
  return [
    ...Q(e),
    ...a,
    ...i,
    ...Q(l)
  ].filter(Boolean);
}, tl = (e = {}, r = {}) => {
  var u;
  const t = e.query || {}, l = e.datasetId ?? r.datasetId ?? null, a = t.dimensions || [], i = rl({
    globalFilters: r.globalFilters,
    selections: r.selections,
    drillPath: r.drillPath,
    panelFilters: t.filters
  });
  return Ha({
    datasetId: l,
    measures: t.measures || [],
    dimensions: qa({
      dimensions: a,
      drillPath: r.drillPath,
      drilldownConfig: (u = e.interactions) == null ? void 0 : u.drilldown
    }),
    filters: i,
    timeRange: t.timeRange ?? r.timeRange ?? null,
    grain: t.grain ?? null,
    sort: t.sort ?? null,
    limit: t.limit ?? null,
    offset: t.offset ?? null,
    timezone: t.timezone ?? r.timezone ?? null,
    transforms: t.transforms || []
  });
}, Be = (e) => Array.isArray(e) ? e : [], Zr = (e, r = "Filter") => {
  if (!e)
    return r;
  const t = Be(e.values), l = t.length ? t.join(", ") : "Any";
  return `${e.field || r} ${e.op || "IN"} ${l}`;
}, Rt = (e) => e ? e.filter ? e.filter : e.filters ? e.filters : e.dimension && e.value !== void 0 ? {
  field: e.dimension,
  op: "IN",
  values: [e.value]
} : null : null, al = (e = []) => e.flatMap((r) => r.filter ? Q(r.filter) : r.filters ? Q(r.filters) : []), ll = (e = []) => e.flatMap((r) => Q(Rt(r))), nl = (e) => e.dashboardId, il = (e) => e.datasetId, sl = (e) => e.globalFilters, ul = (e) => e.selections, cl = (e) => e.drillPath, dl = (e) => e.panelStateById, fl = (e, r) => e.panelStateById[r] || {}, ol = (e, r = null) => {
  var i;
  const t = [];
  return Q(e.globalFilters).forEach((u, s) => {
    t.push({
      id: `global-${u.field || "filter"}-${s}`,
      source: "global",
      field: u.field,
      op: u.op,
      values: Be(u.values),
      label: Zr(u, "Global filter")
    });
  }), (e.selections || []).forEach((u) => {
    Q(u.filter || u.filters).forEach((d, f) => {
      t.push({
        id: `selection-${u.id || f}`,
        source: "selection",
        field: d.field,
        op: d.op,
        values: Be(d.values),
        label: u.label || Lt(u)
      });
    });
  }), (e.drillPath || []).forEach((u, s) => {
    Q(Rt(u)).forEach((f) => {
      t.push({
        id: `drill-${u.id || s}`,
        source: "drill",
        field: f.field,
        op: f.op,
        values: Be(f.values),
        label: u.label || Ir(u)
      });
    });
  }), Q((i = r == null ? void 0 : r.query) == null ? void 0 : i.filters).forEach((u, s) => {
    t.push({
      id: `panel-${(r == null ? void 0 : r.id) || "panel"}-${s}`,
      source: "panel",
      field: u.field,
      op: u.op,
      values: Be(u.values),
      label: Zr(u, "Panel filter")
    });
  }), t;
}, hl = (e) => (e.drillPath || []).map((r, t) => ({
  id: r.id || `${r.dimension || "dimension"}-${t}`,
  label: r.label || Ir(r),
  entry: r,
  index: t
})), ml = (e) => (e.selections || []).map((r) => {
  const t = Q(r.filter || r.filters), l = t.map((i) => i.field).filter(Boolean), a = t.flatMap((i) => Be(i.values));
  return {
    selectionId: r.id,
    sourcePanelId: r.sourcePanelId ?? null,
    label: r.label || Lt(r),
    fields: l,
    values: a
  };
}), bl = (e, r) => tl(r, e), yl = (e) => al(e.selections), xl = (e) => ll(e.drillPath), hs = {
  selectDashboardId: nl,
  selectDatasetId: il,
  selectGlobalFilters: sl,
  selectSelections: ul,
  selectDrillPath: cl,
  selectPanelStateById: dl,
  selectPanelState: fl,
  selectActiveFiltersSummary: ol,
  selectDrillBreadcrumbs: hl,
  selectSelectedEntities: ml,
  selectDerivedQueryInputs: bl,
  selectSelectionFilters: yl,
  selectDrillFilters: xl
}, It = (e, { validateResult: r } = {}) => ({
  execute: e,
  validateResult: r
}), kr = (e) => !!(e && typeof e.execute == "function"), ms = (e = {}, { defaultProvider: r } = {}) => {
  const t = Object.entries(e || {}).filter(
    ([, i]) => kr(i)
  ), l = new Map(t), a = r && kr(r) ? r : null;
  return It(async (i, u) => {
    const s = i == null ? void 0 : i.datasetId, d = l.get(s) || a;
    if (!d)
      throw new Error(
        `No data provider registered for datasetId "${s ?? "unknown"}".`
      );
    return d.execute(i, u);
  });
}, vl = (e) => {
  if (!kr(e))
    throw new Error("DataProvider must implement execute(querySpec, options)");
  return e;
}, _l = (e, r) => new Promise((t, l) => {
  if (r != null && r.aborted) {
    l(new DOMException("Aborted", "AbortError"));
    return;
  }
  const a = setTimeout(t, e);
  r && r.addEventListener(
    "abort",
    () => {
      clearTimeout(a), l(new DOMException("Aborted", "AbortError"));
    },
    { once: !0 }
  );
}), jl = (e) => {
  let r = e;
  return () => {
    r += 1831565813;
    let t = Math.imul(r ^ r >>> 15, r | 1);
    return t ^= t + Math.imul(t ^ t >>> 7, t | 61), ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}, Sl = (e) => {
  const r = JSON.stringify({
    datasetId: e.datasetId,
    measures: e.measures,
    dimensions: e.dimensions,
    filters: e.filters,
    grain: e.grain,
    timeRange: e.timeRange
  });
  let t = 2166136261;
  for (let l = 0; l < r.length; l += 1)
    t ^= r.charCodeAt(l), t = Math.imul(t, 16777619);
  return t >>> 0;
}, or = (e) => Array.isArray(e) ? e : [], $t = (e) => e ? Array.isArray(e) ? { start: e[0], end: e[1] } : e.start || e.end ? { start: e.start ?? null, end: e.end ?? null } : null : null, Hr = (e) => {
  if (!e)
    return null;
  const r = new Date(e);
  return Number.isNaN(r.getTime()) ? null : r;
}, Nl = (e) => e.toISOString().slice(0, 10), pl = (e, r, t) => Math.min(t, Math.max(r, e)), kl = (e) => {
  const t = or(e).find(
    (i) => {
      var u, s;
      return i && i.op === "BETWEEN" && Array.isArray(i.values) && i.values.length >= 2 && (((u = i.field) == null ? void 0 : u.includes("date")) || ((s = i.field) == null ? void 0 : s.includes("day")));
    }
  );
  if (!t)
    return null;
  const [l, a] = t.values;
  return !l && !a ? null : { start: l ?? null, end: a ?? null };
}, Je = {
  category: ["Alpha", "Beta", "Gamma", "Delta"],
  region: ["North", "South", "East", "West"],
  segment: ["Consumer", "SMB", "Enterprise"]
}, El = (e) => Je[e] ? Je[e] : e != null && e.includes("region") ? Je.region : e != null && e.includes("segment") ? Je.segment : e != null && e.includes("category") ? Je.category : ["A", "B", "C", "D"].map((t, l) => `${e || "dim"}-${t}${l + 1}`), Tl = ({ measures: e, dimensions: r, timeRange: t, random: l }) => {
  const a = or(r);
  if (!a.length)
    return [
      e.reduce((d, f, o) => (d[f] = Math.round(500 + l() * 500 + o * 40), d), {})
    ];
  const i = [], u = a.map((d) => {
    if (d != null && d.includes("date") || d != null && d.includes("day")) {
      const f = $t(t), o = Hr(f == null ? void 0 : f.start) ?? new Date(Date.now() - 6 * 864e5), h = Hr(f == null ? void 0 : f.end) ?? /* @__PURE__ */ new Date(), m = pl(Math.ceil((h - o) / 864e5) + 1, 2, 14);
      return Array.from({ length: m }, (b, S) => {
        const j = new Date(o);
        return j.setDate(j.getDate() + S), Nl(j);
      });
    }
    return El(d);
  }), s = (d, f) => {
    if (d >= a.length) {
      const h = { ...f };
      e.forEach((m, b) => {
        const S = l() * 0.3 + 0.85;
        h[m] = Math.round(200 * S + b * 50 + l() * 120);
      }), i.push(h);
      return;
    }
    const o = a[d];
    u[d].forEach((h, m) => {
      s(d + 1, {
        ...f,
        [o]: h,
        [`${o}_order`]: m
      });
    });
  };
  return s(0, {}), i;
}, Cl = async (e, { signal: r } = {}) => {
  const t = Sl(e), l = jl(t), a = 180 + Math.floor(l() * 220);
  await _l(a, r);
  const i = or(e.measures), u = or(e.dimensions), s = $t(e.timeRange) ?? kl(e.filters), d = Tl({
    measures: i,
    dimensions: u,
    timeRange: s,
    random: l
  }), f = d.reduce((o, h) => (i.forEach((m) => {
    o[m] = (o[m] || 0) + (h[m] || 0);
  }), o), {});
  return {
    rows: d,
    meta: {
      total: f,
      rowCount: d.length,
      generatedAt: (/* @__PURE__ */ new Date()).toISOString()
    }
  };
}, bs = It(Cl), hr = (e) => !!(e && typeof e == "object" && !Array.isArray(e)), qe = (e) => hr(e) ? Object.keys(e).sort().reduce((r, t) => {
  const l = e[t];
  return l === void 0 || (r[t] = Array.isArray(l) ? l.map((a) => qe(a)) : hr(l) ? qe(l) : l), r;
}, {}) : e, gl = (e) => {
  if (!Array.isArray(e))
    return e;
  const r = e.map(
    (l) => hr(l) ? qe(l) : l
  );
  return r.every(
    (l) => l === null || ["string", "number", "boolean"].includes(typeof l)
  ) ? [...r].sort() : r;
}, Dl = (e) => {
  if (!hr(e))
    return e;
  const r = gl(
    e.values ?? (e.value !== void 0 ? [e.value] : [])
  );
  return {
    ...e,
    values: r
  };
}, Ll = (e) => Array.isArray(e) ? e.filter(Boolean).map((t) => Dl(t)).map((t) => ({
  sortKey: JSON.stringify(t),
  filter: t
})).sort((t, l) => t.sortKey.localeCompare(l.sortKey)).map((t) => t.filter) : [], Xr = (e) => Array.isArray(e) ? [...e.filter(Boolean)].sort() : [], Rl = (e = {}) => ({
  datasetId: e.datasetId ?? null,
  measures: Xr(e.measures),
  dimensions: Xr(e.dimensions),
  filters: Ll(e.filters),
  timeRange: e.timeRange ?? null,
  grain: e.grain ?? null,
  sort: qe(e.sort ?? null),
  limit: e.limit ?? null,
  offset: e.offset ?? null,
  timezone: e.timezone ?? null,
  transforms: Array.isArray(e.transforms) ? e.transforms.map((r) => qe(r)) : []
}), Er = (e) => Array.isArray(e) ? `[${e.map((r) => Er(r)).join(",")}]` : e && typeof e == "object" ? `{${Object.keys(e).sort().map((t) => `${JSON.stringify(t)}:${Er(e[t])}`).join(",")}}` : JSON.stringify(e), Il = (e) => {
  let r = 5381;
  for (let t = 0; t < e.length; t += 1)
    r = r * 33 ^ e.charCodeAt(t);
  return (r >>> 0).toString(16);
}, $l = (e = {}) => {
  const r = Rl(e), t = Er(r);
  return `qs_${Il(t)}`;
}, Fl = () => /* @__PURE__ */ new Map(), Ar = (e, r, t) => {
  e.has(r) && e.delete(r), e.set(r, t);
}, Pl = ({ maxSize: e = 500 } = {}) => {
  const r = Fl(), t = () => {
    if (e <= 0) {
      r.clear();
      return;
    }
    for (; r.size > e; ) {
      const l = r.keys().next().value;
      r.delete(l);
    }
  };
  return {
    get: (l) => {
      if (!r.has(l))
        return;
      const a = r.get(l);
      return Ar(r, l, a), a;
    },
    set: (l, a) => (Ar(r, l, a), t(), a),
    has: (l) => r.has(l),
    delete: (l) => r.delete(l),
    clear: () => r.clear(),
    entries: () => Array.from(r.entries()),
    size: () => r.size,
    prune: t
  };
}, Ml = Pl(), Tr = () => Date.now(), Ft = (e) => !!(e && typeof e == "object" && !Array.isArray(e)), Vl = (e) => {
  const r = [];
  return Array.isArray(e == null ? void 0 : e.rows) || r.push("rows must be an array"), (e == null ? void 0 : e.meta) != null && !Ft(e.meta) && r.push("meta must be an object when provided"), r;
}, wl = (e, r, t) => {
  if (!e)
    return [];
  try {
    const l = e(r, t);
    return l == null || l === !0 ? [] : l === !1 ? ["custom validation failed"] : typeof l == "string" ? [l] : Array.isArray(l) ? l : typeof l == "object" && l.valid === !1 ? Array.isArray(l.errors) ? l.errors : typeof l.error == "string" ? [l.error] : ["custom validation failed"] : [];
  } catch (l) {
    return [(l == null ? void 0 : l.message) || "custom validation threw an error"];
  }
}, Ol = (e) => ({
  rows: Array.isArray(e == null ? void 0 : e.rows) ? e.rows : [],
  meta: Ft(e == null ? void 0 : e.meta) ? e.meta : null
}), Jr = (e) => ({
  status: (e == null ? void 0 : e.status) ?? "idle",
  data: (e == null ? void 0 : e.data) ?? null,
  meta: (e == null ? void 0 : e.meta) ?? null,
  error: (e == null ? void 0 : e.error) ?? null,
  updatedAt: (e == null ? void 0 : e.updatedAt) ?? null
}), Qr = (e, r) => !(e != null && e.updatedAt) || r === 0 ? !0 : r === 1 / 0 ? !1 : Tr() - e.updatedAt > r, ys = (e, {
  provider: r,
  cache: t = Ml,
  staleTime: l = 3e4,
  enabled: a = !0,
  onSuccess: i,
  onError: u,
  validateResult: s,
  strictResultValidation: d = !1
} = {}) => {
  const f = g(() => vl(r), [r]), o = g(() => $l(e), [e]), h = ur(null), [m, b] = Rr(
    () => Jr(t.get(o))
  ), S = ce(async (j) => {
    const y = t.get(j);
    if (y != null && y.promise)
      return y.promise;
    const x = new AbortController();
    h.current = x;
    const v = f.execute(e, { signal: x.signal }).then((N) => {
      const k = s || (f == null ? void 0 : f.validateResult), T = [
        ...Vl(N),
        ...wl(k, N, e)
      ].filter(Boolean);
      if (T.length > 0) {
        const L = `Invalid provider result: ${T.join("; ")}`;
        if (d)
          throw new Error(L);
        console.warn(L, { result: N, querySpec: e });
      }
      const D = Ol(N), P = {
        status: "success",
        data: T.length > 0 ? [] : D.rows,
        meta: T.length > 0 ? null : D.meta,
        error: null,
        updatedAt: Tr()
      };
      return t.set(j, P), t.prune && t.prune(), b(P), i && i(P), P;
    }).catch((N) => {
      if ((N == null ? void 0 : N.name) === "AbortError")
        return null;
      const k = {
        status: "error",
        data: null,
        meta: null,
        error: N,
        updatedAt: Tr()
      };
      return t.set(j, k), t.prune && t.prune(), b(k), u && u(N), k;
    }).finally(() => {
      const N = t.get(j);
      (N == null ? void 0 : N.promise) === v && t.set(j, { ...N, promise: null });
    });
    return t.set(j, {
      status: (y == null ? void 0 : y.status) ?? "loading",
      data: (y == null ? void 0 : y.data) ?? null,
      meta: (y == null ? void 0 : y.meta) ?? null,
      error: (y == null ? void 0 : y.error) ?? null,
      updatedAt: (y == null ? void 0 : y.updatedAt) ?? null,
      promise: v
    }), t.prune && t.prune(), v;
  }, [
    f,
    t,
    u,
    i,
    e,
    d,
    s
  ]);
  return St(() => {
    if (!a)
      return;
    const j = t.get(o);
    return j != null && j.data ? b(Jr(j)) : j || b((y) => ({
      ...y,
      status: "loading",
      error: null
    })), (!j || Qr(j, l)) && S(o), () => {
      h.current && h.current.abort();
    };
  }, [o, a, l, t, S]), {
    data: m.data,
    meta: m.meta,
    loading: m.status === "loading",
    error: m.error,
    status: m.status,
    updatedAt: m.updatedAt,
    isStale: Qr(t.get(o), l),
    refetch: () => S(o)
  };
}, Pt = (e = "registry") => {
  const r = /* @__PURE__ */ new Map();
  return {
    label: e,
    register: (l, a) => {
      if (!l)
        throw new Error(`${e} key is required.`);
      if (!a)
        throw new Error(`${e} component is required.`);
      return r.set(l, a), a;
    },
    get: (l) => r.get(l),
    has: (l) => r.has(l),
    list: () => Array.from(r.keys())
  };
}, Mt = Pt("vizRegistry"), Cr = Pt("insightRegistry"), J = (e, r) => Mt.register(e, r), _r = (e, r) => Cr.register(e, r);
function q({ title: e, subtitle: r, footer: t, children: l }) {
  return /* @__PURE__ */ n.jsxs("div", { className: "ladf-chart", children: [
    (e || r) && /* @__PURE__ */ n.jsx("div", { className: "ladf-chart__header", children: /* @__PURE__ */ n.jsxs("div", { className: "ladf-chart__heading", children: [
      e ? /* @__PURE__ */ n.jsx("p", { className: "ladf-chart__title", children: e }) : null,
      r ? /* @__PURE__ */ n.jsx("p", { className: "ladf-chart__subtitle", children: r }) : null
    ] }) }),
    /* @__PURE__ */ n.jsx("div", { className: "ladf-chart__canvas", children: l }),
    t ? /* @__PURE__ */ n.jsx("div", { className: "ladf-chart__footer", children: t }) : null
  ] });
}
const Kl = "analytics", qr = 12, zl = 9, Bl = 4, et = (e = Kl) => `ladf-palette-${e}`, Vt = (e, r, t) => Number.isFinite(e) ? Math.min(t, Math.max(r, Math.trunc(e))) : r, De = (e, r = qr) => {
  const t = Number.isInteger(e) ? e : 0, l = Number.isInteger(r) && r > 0 ? r : qr;
  return `var(--ladf-series-${(t % l + l) % l + 1})`;
}, jr = (e) => `var(--ladf-seq-${Vt(e, 1, zl)})`, Oe = (e, r) => {
  if (e === "zero")
    return "var(--ladf-div-zero)";
  const t = Vt(r, 1, Bl);
  return `var(--ladf-div-${e === "neg" ? "neg" : "pos"}-${t})`;
}, wt = 12, Wl = (e) => {
  if (!Array.isArray(e))
    return [];
  const r = /* @__PURE__ */ new Set(), t = [];
  return e.forEach((l) => {
    if (l == null)
      return;
    const a = String(l);
    r.has(a) || (r.add(a), t.push(a));
  }), t;
}, B = (e, r = wt) => De(e, r), ye = (e) => Wl(e).reduce((t, l, a) => (t[l] = B(a, wt), t), {}), rt = 12, gr = Array.from(
  { length: rt },
  (e, r) => B(r, rt)
), Ul = (e) => {
  const r = Number.isInteger(e) ? e : 0;
  return gr[r % gr.length];
}, Ot = (e) => `ladf-chart-color-${(Number.isInteger(e) ? e : 0) % gr.length}`;
function ne({ active: e, label: r, payload: t }) {
  return !e || !t || t.length === 0 ? null : /* @__PURE__ */ n.jsxs("div", { className: "ladf-chart-tooltip", children: [
    r ? /* @__PURE__ */ n.jsx("p", { className: "ladf-chart-tooltip__label", children: r }) : null,
    /* @__PURE__ */ n.jsx("ul", { className: "ladf-chart-tooltip__list", children: t.map((l, a) => /* @__PURE__ */ n.jsxs("li", { className: "ladf-chart-tooltip__item", children: [
      /* @__PURE__ */ n.jsx(
        "span",
        {
          className: [
            "ladf-chart-tooltip__swatch",
            Ot(a)
          ].join(" ")
        }
      ),
      /* @__PURE__ */ n.jsx("span", { className: "ladf-chart-tooltip__name", children: l.name }),
      /* @__PURE__ */ n.jsx("span", { className: "ladf-chart-tooltip__value", children: l.value })
    ] }, l.dataKey || l.name || a)) })
  ] });
}
const Kt = (e = [], { index: r, column: t, value: l, fill: a = 0, sortColumns: i = !0 } = {}) => {
  const u = Array.isArray(e) ? e : [];
  if (!r || !t || !l)
    return [...u];
  const s = Array.from(
    new Set(u.map((o) => o == null ? void 0 : o[t]).filter((o) => o !== void 0))
  ), d = i ? [...s].sort() : s, f = /* @__PURE__ */ new Map();
  return u.forEach((o) => {
    const h = o == null ? void 0 : o[r], m = o == null ? void 0 : o[t];
    if (h === void 0 || m === void 0)
      return;
    const b = f.get(h) || { [r]: h };
    b[m] = o == null ? void 0 : o[l], f.set(h, b);
  }), Array.from(f.values()).map((o) => {
    const h = { ...o };
    return d.forEach((m) => {
      h[m] === void 0 && (h[m] = a);
    }), h;
  });
}, Yl = (e, r) => e ? Array.isArray(e.y) ? e.y : e.y ? [e.y] : r != null && r.length ? Object.keys(r[0]).filter((t) => t !== e.x) : [] : [], Gl = (e) => {
  if (e === 0 || e === "0" || e == null || e === "")
    return !0;
  if (typeof e == "number")
    return Number.isFinite(e) && e === 0;
  const r = Number(e);
  return Number.isFinite(r) && r === 0;
}, tt = (e, r) => !e || !Array.isArray(r) || r.length === 0 ? !1 : r.every((t) => Gl(e == null ? void 0 : e[t]));
function Zl({
  data: e = [],
  encodings: r = {},
  options: t = {},
  handlers: l = {},
  colorAssignment: a,
  hiddenKeys: i
}) {
  const u = g(() => (a == null ? void 0 : a.mode) === "series" || (a == null ? void 0 : a.mode) === "single" || (a == null ? void 0 : a.mode) === "category" ? a.items.map((y) => y.key) : [], [a]), { chartData: s, seriesKeys: d } = g(() => {
    const y = (t == null ? void 0 : t.filterZeroRows) === !0, x = r.group || t.seriesBy, v = r.x, N = r.y, k = x && v && typeof N == "string" && Array.isArray(e) && e.length;
    if (k) {
      const L = Kt(e, {
        index: v,
        column: x,
        value: N,
        fill: null
      }), G = u.length ? u : Array.from(
        new Set(
          e.map((O) => O == null ? void 0 : O[x]).filter((O) => O != null)
        )
      ).map((O) => String(O));
      return { chartData: y ? L.filter((O) => !tt(O, G)) : L, seriesKeys: G };
    }
    const D = u.length && ((a == null ? void 0 : a.mode) !== "category" || k) ? u : Yl(r, e);
    return { chartData: y ? e.filter((L) => !tt(L, D)) : e, seriesKeys: D };
  }, [
    e,
    r,
    u,
    a,
    t.filterZeroRows,
    t.seriesBy
  ]), f = d.filter((y) => !(i != null && i.has(String(y)))), o = t.tooltip !== !1, h = t.brush || {}, m = !!h.enabled && s.length > 1, b = g(
    () => ye(d),
    [d]
  ), S = typeof h.startIndex == "number" ? h.startIndex : void 0, j = typeof h.endIndex == "number" ? h.endIndex : void 0;
  return /* @__PURE__ */ n.jsx(q, { children: /* @__PURE__ */ n.jsx(ae, { width: "100%", height: 280, children: /* @__PURE__ */ n.jsxs(oa, { data: s, margin: { top: 8, right: 16, left: 0, bottom: 8 }, children: [
    /* @__PURE__ */ n.jsx(We, { stroke: "var(--ladf-chart-grid)", strokeDasharray: "3 3" }),
    /* @__PURE__ */ n.jsx(
      Ce,
      {
        dataKey: r.x,
        tick: { fill: "var(--ladf-text-muted)", fontSize: 12 },
        axisLine: { stroke: "var(--ladf-border-divider)" }
      }
    ),
    /* @__PURE__ */ n.jsx(
      ge,
      {
        tick: { fill: "var(--ladf-text-muted)", fontSize: 12 },
        axisLine: { stroke: "var(--ladf-border-divider)" }
      }
    ),
    o ? /* @__PURE__ */ n.jsx(le, { content: /* @__PURE__ */ n.jsx(ne, {}) }) : null,
    f.map((y, x) => {
      var v;
      return /* @__PURE__ */ n.jsx(
        Nt,
        {
          type: "monotone",
          dataKey: y,
          stroke: ((v = a == null ? void 0 : a.getColor) == null ? void 0 : v.call(a, y)) || b[y] || B(x),
          strokeWidth: 2,
          dot: { r: 3 },
          activeDot: { r: 5, onClick: l.onClick },
          onClick: l.onClick
        },
        y
      );
    }),
    m ? /* @__PURE__ */ n.jsx(
      pt,
      {
        className: "ladf-chart__brush",
        dataKey: r.x,
        height: 24,
        travellerWidth: 12,
        stroke: "var(--ladf-accent-primary)",
        startIndex: S,
        endIndex: j,
        onChange: (y) => {
          l.onBrushChange && l.onBrushChange({
            ...y,
            data: s,
            dataKey: r.x
          });
        }
      }
    ) : null
  ] }) }) });
}
const Hl = (e, r) => e ? Array.isArray(e.y) ? e.y : e.y ? [e.y] : r != null && r.length ? Object.keys(r[0]).filter((t) => t !== e.x) : [] : [];
function Xl({
  data: e = [],
  encodings: r = {},
  options: t = {},
  handlers: l = {},
  colorAssignment: a,
  hiddenKeys: i
}) {
  const u = g(() => (a == null ? void 0 : a.mode) === "series" || (a == null ? void 0 : a.mode) === "single" || (a == null ? void 0 : a.mode) === "category" ? a.items.map((y) => y.key) : [], [a]), { chartData: s, seriesKeys: d } = g(() => {
    const y = r.group || t.seriesBy, x = r.x, v = r.y, N = y && x && typeof v == "string" && Array.isArray(e) && e.length;
    if (N) {
      const D = Kt(e, {
        index: x,
        column: y,
        value: v,
        fill: null
      }), P = u.length ? u : Array.from(
        new Set(
          e.map((L) => L == null ? void 0 : L[y]).filter((L) => L != null)
        )
      ).map((L) => String(L));
      return { chartData: D, seriesKeys: P };
    }
    const T = u.length && ((a == null ? void 0 : a.mode) !== "category" || N) ? u : Hl(r, e);
    return { chartData: e, seriesKeys: T };
  }, [u, a, e, r, t.seriesBy]), f = d.filter((y) => !(i != null && i.has(String(y)))), o = t.tooltip !== !1, h = t.brush || {}, m = !!h.enabled && s.length > 1, b = g(
    () => ye(d),
    [d]
  ), S = typeof h.startIndex == "number" ? h.startIndex : void 0, j = typeof h.endIndex == "number" ? h.endIndex : void 0;
  return /* @__PURE__ */ n.jsx(q, { children: /* @__PURE__ */ n.jsx(ae, { width: "100%", height: 280, children: /* @__PURE__ */ n.jsxs(
    ha,
    {
      data: s,
      margin: { top: 8, right: 16, left: 0, bottom: 8 },
      children: [
        /* @__PURE__ */ n.jsx(We, { stroke: "var(--ladf-chart-grid)", strokeDasharray: "3 3" }),
        /* @__PURE__ */ n.jsx(
          Ce,
          {
            dataKey: r.x,
            tick: { fill: "var(--ladf-text-muted)", fontSize: 12 },
            axisLine: { stroke: "var(--ladf-border-divider)" }
          }
        ),
        /* @__PURE__ */ n.jsx(
          ge,
          {
            tick: { fill: "var(--ladf-text-muted)", fontSize: 12 },
            axisLine: { stroke: "var(--ladf-border-divider)" }
          }
        ),
        o ? /* @__PURE__ */ n.jsx(le, { content: /* @__PURE__ */ n.jsx(ne, {}) }) : null,
        f.map((y, x) => {
          var N;
          const v = ((N = a == null ? void 0 : a.getColor) == null ? void 0 : N.call(a, y)) || b[y] || B(x);
          return /* @__PURE__ */ n.jsx(
            ma,
            {
              type: "monotone",
              dataKey: y,
              stroke: v,
              fill: v,
              fillOpacity: 0.2,
              dot: { r: 3 },
              activeDot: { r: 5, onClick: l.onClick },
              onClick: l.onClick
            },
            y
          );
        }),
        m ? /* @__PURE__ */ n.jsx(
          pt,
          {
            className: "ladf-chart__brush",
            dataKey: r.x,
            height: 24,
            travellerWidth: 12,
            stroke: "var(--ladf-accent-primary)",
            startIndex: S,
            endIndex: j,
            onChange: (y) => {
              l.onBrushChange && l.onBrushChange({
                ...y,
                data: s,
                dataKey: r.x
              });
            }
          }
        ) : null
      ]
    }
  ) }) });
}
const Al = (e, r) => e ? Array.isArray(e.y) ? e.y : e.y ? [e.y] : r != null && r.length ? Object.keys(r[0]).filter((t) => t !== e.x) : [] : [], Jl = (e) => {
  if (e === 0 || e === "0" || e == null || e === "")
    return !0;
  if (typeof e == "number")
    return Number.isFinite(e) && e === 0;
  const r = Number(e);
  return Number.isFinite(r) && r === 0;
}, Ql = (e, r) => !e || !Array.isArray(r) || r.length === 0 ? !1 : r.every((t) => Jl(e == null ? void 0 : e[t]));
function ql({
  data: e = [],
  encodings: r = {},
  options: t = {},
  handlers: l = {},
  colorAssignment: a,
  hiddenKeys: i
}) {
  var y;
  const u = (a == null ? void 0 : a.mode) === "series" || (a == null ? void 0 : a.mode) === "single" ? a.items.map((x) => x.key) : [], s = u.length ? u : Al(r, e), d = t.tooltip !== !1, f = t.stacked === !0 || Array.isArray(t.stackedKeys), o = g(
    () => ye(s),
    [s]
  ), h = s.filter(
    (x) => !(i != null && i.has(String(x)))
  ), m = (a == null ? void 0 : a.mode) === "category", b = (a == null ? void 0 : a.mode) === "series", S = (a == null ? void 0 : a.mode) === "category" || (a == null ? void 0 : a.mode) === "diverging" || (a == null ? void 0 : a.mode) === "sequential", j = g(() => {
    const x = m && (i != null && i.size) ? e.filter((N) => !i.has(String(N == null ? void 0 : N[r.x]))) : e;
    if (t.filterZeroRows !== !0)
      return x;
    const v = b ? s : Array.isArray(r.y) ? r.y : r.y ? [r.y] : [];
    return v.length ? x.filter((N) => !Ql(N, v)) : x;
  }, [
    e,
    r.x,
    r.y,
    i,
    m,
    b,
    t.filterZeroRows,
    s
  ]);
  return /* @__PURE__ */ n.jsx(q, { children: /* @__PURE__ */ n.jsx(ae, { width: "100%", height: 280, children: /* @__PURE__ */ n.jsxs(kt, { data: j, margin: { top: 8, right: 16, left: 0, bottom: 8 }, children: [
    /* @__PURE__ */ n.jsx(We, { stroke: "var(--ladf-chart-grid)", strokeDasharray: "3 3" }),
    /* @__PURE__ */ n.jsx(
      Ce,
      {
        dataKey: r.x,
        tick: { fill: "var(--ladf-text-muted)", fontSize: 12 },
        axisLine: { stroke: "var(--ladf-border-divider)" }
      }
    ),
    /* @__PURE__ */ n.jsx(
      ge,
      {
        tick: { fill: "var(--ladf-text-muted)", fontSize: 12 },
        axisLine: { stroke: "var(--ladf-border-divider)" }
      }
    ),
    d ? /* @__PURE__ */ n.jsx(le, { content: /* @__PURE__ */ n.jsx(ne, {}) }) : null,
    b ? h.map((x, v) => {
      var N;
      return /* @__PURE__ */ n.jsx(
        fr,
        {
          dataKey: x,
          fill: ((N = a == null ? void 0 : a.getColor) == null ? void 0 : N.call(a, x)) || o[x] || B(v),
          stackId: f ? "ladf-stack" : void 0,
          radius: [6, 6, 0, 0],
          onClick: l.onClick
        },
        x
      );
    }) : /* @__PURE__ */ n.jsx(
      fr,
      {
        dataKey: r.y,
        fill: ((y = a == null ? void 0 : a.getColor) == null ? void 0 : y.call(a, r.y)) || B(0),
        radius: [6, 6, 0, 0],
        onClick: l.onClick,
        children: S ? j.map((x, v) => {
          var D, P;
          const N = x == null ? void 0 : x[r.x], k = x == null ? void 0 : x[r.y], T = (a == null ? void 0 : a.mode) === "category" ? (D = a == null ? void 0 : a.getColor) == null ? void 0 : D.call(a, N) : (P = a == null ? void 0 : a.getColor) == null ? void 0 : P.call(a, k);
          return /* @__PURE__ */ n.jsx(
            er,
            {
              fill: T || B(v)
            },
            `cell-${v}`
          );
        }) : null
      }
    )
  ] }) }) });
}
const at = {
  "var(--ladf-accent-primary)": "ladf-chart-legend__swatch--accent-primary",
  "var(--ladf-accent-secondary)": "ladf-chart-legend__swatch--accent-secondary",
  "var(--ladf-accent-success)": "ladf-chart-legend__swatch--accent-success",
  "var(--ladf-accent-warning)": "ladf-chart-legend__swatch--accent-warning",
  "var(--ladf-accent-danger)": "ladf-chart-legend__swatch--accent-danger"
}, en = (e, r) => e && at[e] ? at[e] : Ot(r), rn = ({ row: e, index: r, encodings: t, options: l, colorAssignment: a }) => {
  var i, u, s;
  if (typeof (l == null ? void 0 : l.colorFn) == "function")
    return l.colorFn(e);
  if (t != null && t.color)
    return e != null && e[t.color] ? "var(--ladf-accent-warning)" : "var(--ladf-accent-primary)";
  if ((a == null ? void 0 : a.mode) === "category") {
    const d = e == null ? void 0 : e[t == null ? void 0 : t.x], f = (i = a == null ? void 0 : a.getColor) == null ? void 0 : i.call(a, d);
    if (f)
      return f;
  }
  if ((a == null ? void 0 : a.mode) === "diverging" || (a == null ? void 0 : a.mode) === "sequential") {
    const d = e == null ? void 0 : e[t == null ? void 0 : t.y], f = (u = a == null ? void 0 : a.getColor) == null ? void 0 : u.call(a, d);
    if (f)
      return f;
  }
  if ((a == null ? void 0 : a.mode) === "series" || (a == null ? void 0 : a.mode) === "single") {
    const d = (s = a == null ? void 0 : a.getColor) == null ? void 0 : s.call(a, t == null ? void 0 : t.y);
    if (d)
      return d;
  }
  return "var(--ladf-accent-primary)";
};
function tn({
  data: e = [],
  encodings: r = {},
  options: t = {},
  handlers: l = {},
  colorAssignment: a,
  hiddenKeys: i
}) {
  const u = t.tooltip !== !1, s = Array.isArray(t.legendItems) ? t.legendItems : [], f = (t.orientation === "horizontal" ? "horizontal" : "vertical") === "horizontal", o = g(() => i != null && i.size && (r != null && r.x) ? e.filter((m) => !i.has(String(m == null ? void 0 : m[r.x]))) : e, [e, r.x, i]), h = f ? [0, 6, 6, 0] : [6, 6, 0, 0];
  return /* @__PURE__ */ n.jsxs(q, { children: [
    /* @__PURE__ */ n.jsx(ae, { width: "100%", height: 280, children: /* @__PURE__ */ n.jsxs(
      kt,
      {
        data: o,
        layout: f ? "vertical" : "horizontal",
        margin: { top: 8, right: 16, left: 0, bottom: 8 },
        children: [
          /* @__PURE__ */ n.jsx(We, { stroke: "var(--ladf-chart-grid)", strokeDasharray: "3 3" }),
          f ? /* @__PURE__ */ n.jsxs(n.Fragment, { children: [
            /* @__PURE__ */ n.jsx(
              Ce,
              {
                type: "number",
                tick: { fill: "var(--ladf-text-muted)", fontSize: 12 },
                axisLine: { stroke: "var(--ladf-border-divider)" }
              }
            ),
            /* @__PURE__ */ n.jsx(
              ge,
              {
                type: "category",
                dataKey: r.x,
                tick: { fill: "var(--ladf-text-muted)", fontSize: 12 },
                axisLine: { stroke: "var(--ladf-border-divider)" }
              }
            )
          ] }) : /* @__PURE__ */ n.jsxs(n.Fragment, { children: [
            /* @__PURE__ */ n.jsx(
              Ce,
              {
                dataKey: r.x,
                tick: { fill: "var(--ladf-text-muted)", fontSize: 12 },
                axisLine: { stroke: "var(--ladf-border-divider)" }
              }
            ),
            /* @__PURE__ */ n.jsx(
              ge,
              {
                tick: { fill: "var(--ladf-text-muted)", fontSize: 12 },
                axisLine: { stroke: "var(--ladf-border-divider)" }
              }
            )
          ] }),
          u ? /* @__PURE__ */ n.jsx(le, { content: /* @__PURE__ */ n.jsx(ne, {}) }) : null,
          /* @__PURE__ */ n.jsx(
            fr,
            {
              dataKey: r.y,
              fill: B(0),
              radius: h,
              onClick: l.onClick,
              children: o.map((m, b) => /* @__PURE__ */ n.jsx(
                er,
                {
                  fill: rn({ row: m, index: b, encodings: r, options: t, colorAssignment: a }) || Ul(b)
                },
                `cell-${b}`
              ))
            }
          )
        ]
      }
    ) }),
    s.length ? /* @__PURE__ */ n.jsx("ul", { className: "ladf-chart-legend", children: s.map((m, b) => /* @__PURE__ */ n.jsxs(
      "li",
      {
        className: "ladf-chart-legend__item",
        children: [
          /* @__PURE__ */ n.jsx(
            "span",
            {
              className: [
                "ladf-chart-legend__swatch",
                en(m.color, b)
              ].join(" ")
            }
          ),
          /* @__PURE__ */ n.jsx("span", { className: "ladf-chart-legend__label", children: m.label })
        ]
      },
      `${m.label || "legend"}-${b}`
    )) }) : null
  ] });
}
const lt = (e, r = "") => e == null || Number.isNaN(e) ? "—" : `${e.toLocaleString(void 0, { maximumFractionDigits: 1 })}${r}`, an = fa(function({
  active: r,
  payload: t,
  row: l,
  nameKey: a,
  valueKey: i,
  colorKey: u,
  percentKey: s,
  colorMap: d,
  position: f,
  visible: o,
  markerLabel: h,
  getMarkerValue: m,
  getExceeds: b
}, S) {
  var W;
  const j = Array.isArray(t) && t.length > 0;
  if (!(j ? r : o)) return null;
  const x = j ? (W = t[0]) == null ? void 0 : W.payload : l;
  if (!x) return null;
  const v = x[a] ?? "Unknown", N = x[i] ?? 0, k = u ? x[u] : null, T = s ? x[s] : null, D = Number.isFinite(Number(T)) ? Number(T) : null, P = m ? m(x) : null, L = b ? b(x) : !1, G = k ? String(k).replace(/_/g, " ").replace(/\b\w/g, (Y) => Y.toUpperCase()) : null, R = k != null ? d == null ? void 0 : d.get(String(k)) : null, O = Number.isInteger(R == null ? void 0 : R.index) ? `ladf-chart-color-${R.index}` : "ladf-chart-color-0", ie = f ? { left: `${f.x}px`, top: `${f.y}px` } : void 0;
  return /* @__PURE__ */ n.jsxs("div", { ref: S, className: "ladf-chart-tooltip ladf-bullet-tooltip", style: ie, children: [
    /* @__PURE__ */ n.jsxs("div", { className: "ladf-bullet-tooltip__header", children: [
      /* @__PURE__ */ n.jsx("span", { className: ["ladf-bullet-tooltip__dot", O].join(" ") }),
      /* @__PURE__ */ n.jsx("span", { className: "ladf-bullet-tooltip__name", children: v })
    ] }),
    G && /* @__PURE__ */ n.jsxs("div", { className: "ladf-bullet-tooltip__row", children: [
      /* @__PURE__ */ n.jsx("span", { className: "ladf-bullet-tooltip__label", children: "Department" }),
      /* @__PURE__ */ n.jsx("span", { className: "ladf-bullet-tooltip__value", children: G })
    ] }),
    /* @__PURE__ */ n.jsxs("div", { className: "ladf-bullet-tooltip__row ladf-bullet-tooltip__row--primary", children: [
      /* @__PURE__ */ n.jsx("span", { className: "ladf-bullet-tooltip__label", children: "OT Hours" }),
      /* @__PURE__ */ n.jsx("span", { className: "ladf-bullet-tooltip__value ladf-bullet-tooltip__value--primary", children: lt(N, "h") })
    ] }),
    P != null && /* @__PURE__ */ n.jsxs("div", { className: "ladf-bullet-tooltip__row", children: [
      /* @__PURE__ */ n.jsx("span", { className: "ladf-bullet-tooltip__label", children: h || "Dept average" }),
      /* @__PURE__ */ n.jsx("span", { className: "ladf-bullet-tooltip__value", children: lt(P, "h") })
    ] }),
    D != null && /* @__PURE__ */ n.jsxs("div", { className: "ladf-bullet-tooltip__row", children: [
      /* @__PURE__ */ n.jsx("span", { className: "ladf-bullet-tooltip__label", children: "% of Total" }),
      /* @__PURE__ */ n.jsxs("span", { className: "ladf-bullet-tooltip__value", children: [
        Number(D).toFixed(1),
        "%"
      ] })
    ] }),
    L && /* @__PURE__ */ n.jsxs("div", { className: "ladf-bullet-tooltip__warning", children: [
      /* @__PURE__ */ n.jsx("span", { className: "ladf-bullet-tooltip__warning-icon", children: "⚠" }),
      /* @__PURE__ */ n.jsx("span", { className: "ladf-bullet-tooltip__warning-text", children: "Higher than most peers" })
    ] })
  ] });
}), ln = 12, be = (e) => e == null ? null : String(e), nn = (e) => {
  if (!e)
    return null;
  const r = e.trim();
  if (r.startsWith("#")) {
    const t = r.replace("#", "");
    return t.length === 3 ? {
      r: parseInt(t[0] + t[0], 16),
      g: parseInt(t[1] + t[1], 16),
      b: parseInt(t[2] + t[2], 16)
    } : t.length === 6 ? {
      r: parseInt(t.slice(0, 2), 16),
      g: parseInt(t.slice(2, 4), 16),
      b: parseInt(t.slice(4, 6), 16)
    } : null;
  }
  if (r.startsWith("rgb")) {
    const t = r.match(/rgba?\(([^)]+)\)/i);
    if (!t)
      return null;
    const l = t[1].split(",").map((a) => parseFloat(a.trim()));
    return l.length < 3 ? null : { r: l[0], g: l[1], b: l[2] };
  }
  return null;
}, sn = ({ r: e, g: r, b: t }) => {
  const l = e / 255, a = r / 255, i = t / 255, u = Math.max(l, a, i), s = Math.min(l, a, i), d = u - s;
  let f = 0, o = 0;
  const h = (u + s) / 2;
  return d !== 0 && (u === l ? f = (a - i) / d % 6 : u === a ? f = (i - l) / d + 2 : f = (l - a) / d + 4, f = Math.round(f * 60), f < 0 && (f += 360), o = d / (1 - Math.abs(2 * h - 1))), { h: f, s: o, l: h };
}, un = (e) => {
  const r = nn(e);
  if (!r)
    return !1;
  const { h: t, s: l, l: a } = sn(r);
  return (t <= 20 || t >= 340) && l > 0.35 && a > 0.2 && a < 0.85;
}, cn = () => {
  const e = Array.from({ length: ln }, (l, a) => a);
  if (typeof window > "u" || !window.getComputedStyle)
    return e.filter((l) => l !== 2);
  const r = window.getComputedStyle(document.documentElement), t = e.filter((l) => {
    const a = r.getPropertyValue(`--ladf-series-${l + 1}`);
    return !un(a);
  });
  return t.length ? t : e;
}, nt = (e, r, t) => {
  if (!r || !(e != null && e.length))
    return /* @__PURE__ */ new Map();
  const l = [], a = /* @__PURE__ */ new Set();
  e.forEach((u) => {
    const s = be(u[r]);
    s && !a.has(s) && (a.add(s), l.push(s));
  });
  const i = /* @__PURE__ */ new Map();
  return l.forEach((u, s) => {
    const d = t[s % t.length] ?? 0;
    i.set(u, {
      color: De(d),
      index: d
    });
  }), i;
}, it = (e, r) => {
  if (!e.length)
    return null;
  const t = (e.length - 1) * r, l = Math.floor(t), a = t - l;
  return e[l + 1] != null ? e[l] + a * (e[l + 1] - e[l]) : e[l];
}, dn = (e, r, t) => {
  const l = /* @__PURE__ */ new Map();
  e.forEach((i) => {
    const u = be(r ? i[r] : "all"), s = i[t];
    u && Number.isFinite(s) && (l.has(u) || l.set(u, []), l.get(u).push(s));
  });
  const a = /* @__PURE__ */ new Map();
  return l.forEach((i, u) => {
    const s = [...i].sort((h, m) => h - m), d = it(s, 0.25), f = it(s, 0.75);
    if (d == null || f == null)
      return;
    const o = f - d;
    a.set(u, f + 1.5 * o);
  }), a;
}, fn = (e, r, t) => {
  const l = /* @__PURE__ */ new Map();
  e.forEach((i) => {
    const u = be(r ? i[r] : "all"), s = i[t];
    if (u && Number.isFinite(s)) {
      l.has(u) || l.set(u, { total: 0, count: 0 });
      const d = l.get(u);
      d.total += s, d.count += 1;
    }
  });
  const a = /* @__PURE__ */ new Map();
  return l.forEach((i, u) => {
    i.count > 0 && a.set(u, i.total / i.count);
  }), a;
};
function on({
  row: e,
  xKey: r,
  yKey: t,
  colorKey: l,
  dotColorKey: a,
  barColorMap: i,
  dotColorMap: u,
  showAnnotations: s,
  maxValue: d,
  markerValue: f,
  markerColor: o,
  markerEnabled: h,
  outlierBound: m,
  percentKey: b,
  showPercent: S,
  onClick: j,
  onMouseEnter: y,
  onMouseMove: x,
  onMouseLeave: v
}) {
  const N = Number(e == null ? void 0 : e[r]), k = Number.isFinite(N) ? N : 0, T = e[t] || "", D = be(e[l]), P = be(e[a]), L = D ? i.get(D) : null, G = P ? u.get(P) : null, R = L ? `ladf-chart-color-${L.index}` : "ladf-chart-color-0", O = G ? `ladf-chart-color-${G.index}` : R, ie = S && b ? e[b] : null, W = Number.isFinite(Number(ie)) ? Number(ie) : null, Y = d > 0 ? k / d * 100 : 0, X = h && f != null && d > 0 ? f / d * 100 : null, xe = m != null && k > m, ve = ce(
    (de) => {
      y == null || y(e, de);
    },
    [e, y]
  ), _e = ce(
    (de) => {
      x == null || x(e, de);
    },
    [e, x]
  );
  return /* @__PURE__ */ n.jsxs(
    "div",
    {
      className: "ladf-bullet__row",
      onClick: () => j == null ? void 0 : j(e),
      onMouseEnter: ve,
      onMouseMove: _e,
      onMouseLeave: v,
      role: "button",
      tabIndex: 0,
      children: [
        /* @__PURE__ */ n.jsxs("div", { className: "ladf-bullet__name-cell", children: [
          s ? /* @__PURE__ */ n.jsx(
            "span",
            {
              className: ["ladf-bullet__dot", O, "slide-from-left-strong"].join(" ")
            }
          ) : null,
          /* @__PURE__ */ n.jsx("span", { className: "ladf-bullet__name slide-from-left", children: T })
        ] }),
        /* @__PURE__ */ n.jsx("div", { className: "ladf-bullet__bar-cell", children: /* @__PURE__ */ n.jsxs("div", { className: "ladf-bullet__track", children: [
          /* @__PURE__ */ n.jsx("div", { className: "ladf-bullet__track-bg" }),
          /* @__PURE__ */ n.jsx(
            "div",
            {
              className: [
                "ladf-bullet__bar",
                R,
                xe ? "ladf-bullet__bar--exceeded" : "",
                "expand-in"
              ].filter(Boolean).join(" "),
              style: {
                width: `${Y}%`
              },
              children: /* @__PURE__ */ n.jsxs("span", { className: "ladf-bullet__value-label", children: [
                k.toLocaleString(void 0, { maximumFractionDigits: 1 }),
                "h"
              ] })
            }
          ),
          X != null && h && /* @__PURE__ */ n.jsx(
            "div",
            {
              className: "ladf-bullet__marker fade-in",
              style: {
                left: `${X}%`,
                background: o || "var(--ladf-text-muted)"
              }
            }
          )
        ] }) }),
        S && /* @__PURE__ */ n.jsx("div", { className: "ladf-bullet__pct-cell slide-from-right", children: W != null ? `${W.toFixed(1)}%` : "—" })
      ]
    }
  );
}
function hn({ data: e = [], encodings: r = {}, options: t = {}, handlers: l = {}, hiddenKeys: a }) {
  var Ge, pe;
  const i = ur(null), u = ur(null), [s, d] = Rr({
    visible: !1,
    row: null,
    position: null
  }), f = t.orientation !== "vertical", o = t.markerLines || t.thresholdMarkers || {}, h = (o == null ? void 0 : o.enabled) !== !1, m = t.outlierRule || {}, b = r.color || t.colorBy, S = t.leftAnnotations || {}, j = S.colorBy || b, y = S.enabled !== !1 && S.type !== "none", x = t.showPercentColumn !== !1, v = t.tooltip !== !1, N = t.percentKey || null, k = f ? r.x : r.y, T = f ? r.y : r.x, D = g(() => cn(), []), P = g(() => !(e != null && e.length) || !k ? 0 : e.reduce((p, I) => {
    const F = Number(I == null ? void 0 : I[k]);
    return Number.isFinite(F) ? p + F : p;
  }, 0), [e, k]), L = N || (x ? "__LADFPercent" : null), G = g(() => !(e != null && e.length) || N || !L ? e : P <= 0 ? e.map((p) => ({ ...p, [L]: null })) : e.map((p) => {
    const I = Number(p == null ? void 0 : p[k]), F = Number.isFinite(I) ? I / P * 100 : null;
    return { ...p, [L]: F };
  }), [e, N, L, P, k]), R = g(() => !(a != null && a.size) || !b ? G : G.filter((p) => !a.has(p[b])), [G, a, b]), O = g(
    () => nt(R, b, D),
    [R, b, D]
  ), ie = g(
    () => j === b ? O : nt(R, j, D),
    [R, j, b, D, O]
  ), W = g(() => {
    if (!b || !(R != null && R.length))
      return [];
    const p = [], I = /* @__PURE__ */ new Set();
    return R.forEach((F) => {
      const K = be(F[b]);
      K && !I.has(K) && (I.add(K), p.push(K));
    }), p.map((F) => {
      const K = O.get(F);
      return {
        key: F,
        label: F.replace(/_/g, " ").replace(/\b\w/g, (re) => re.toUpperCase()),
        index: (K == null ? void 0 : K.index) ?? 0
      };
    });
  }, [R, b, O]), Y = m.valueKey || t.iqrValueKey || t.outlierValueKey || ((Ge = t.thresholdMarkers) == null ? void 0 : Ge.valueKey) || null, X = ((pe = t.markerLines) == null ? void 0 : pe.valueKey) || (o.valueKey && o.valueKey !== Y ? o.valueKey : null) || t.averageKey || null, xe = g(
    () => R.some((p) => Number.isFinite(p == null ? void 0 : p[Y])),
    [R, Y]
  ), ve = g(() => xe ? /* @__PURE__ */ new Map() : dn(R, b, k), [R, b, k, xe]), _e = g(
    () => R.some((p) => Number.isFinite(p == null ? void 0 : p[X])),
    [R, X]
  ), de = g(() => _e ? /* @__PURE__ */ new Map() : fn(R, b, k), [R, b, k, _e]), je = ce(
    (p) => {
      if (!h)
        return null;
      if (Number.isFinite(p == null ? void 0 : p[X]))
        return p[X];
      const I = be(b ? p[b] : "all");
      return de.get(I) ?? null;
    },
    [h, X, de, b]
  ), Le = ce(
    (p) => {
      if (Number.isFinite(p == null ? void 0 : p[Y]))
        return p[Y];
      const I = be(b ? p[b] : "all");
      return ve.get(I) ?? null;
    },
    [Y, ve, b]
  ), Re = ce(
    (p) => {
      const I = Le(p), F = p == null ? void 0 : p[k];
      return Number.isFinite(I) && Number.isFinite(F) && F > I;
    },
    [Le, k]
  ), ee = g(() => {
    if (!R.length) return 100;
    let p = 0;
    return R.forEach((I) => {
      const F = Number(I == null ? void 0 : I[k]), K = Number.isFinite(F) ? F : 0, re = Number(je(I)), ke = Number.isFinite(re) ? re : 0;
      p = Math.max(p, K, ke);
    }), p > 0 ? p * 1.1 : 0;
  }, [R, k, je]), ar = ee > 0 ? ee : 1, lr = g(() => {
    if (!Number.isFinite(ee) || ee <= 0)
      return [0];
    const p = Math.ceil(ee / 4 / 50) * 50, I = p > 0 ? p : Math.max(1, Math.ceil(ee / 4)), F = [];
    for (let K = 0; K <= ee; K += I)
      F.push(K);
    return F;
  }, [ee]), Ie = g(
    () => R.some((p) => Re(p)),
    [R, Re]
  ), me = ce((p) => {
    const I = i.current;
    if (!I) return null;
    const F = I.getBoundingClientRect(), K = p.clientX - F.left, re = p.clientY - F.top, ke = K > F.width / 2, Ze = re > F.height / 2, Ee = u.current, He = Ee ? Ee.offsetWidth : 250, Me = Ee ? Ee.offsetHeight : 150, se = 25;
    let fe, oe;
    return ke && Ze ? (fe = K - He - se, oe = re - Me - se) : ke ? (fe = K - He - se, oe = re + se * 2) : Ze ? (fe = K + se, oe = re - Me - se) : (fe = K + se, oe = re + se * 2), fe = Math.max(0, Math.min(fe, F.width - He)), oe = Math.max(0, Math.min(oe, F.height - Me)), { x: fe, y: oe };
  }, []), $e = ce(
    (p, I) => {
      d({
        visible: !0,
        row: p,
        position: me(I)
      });
    },
    [me]
  ), Se = ur(null), Fe = ce(
    (p, I) => {
      Se.current && cancelAnimationFrame(Se.current), Se.current = requestAnimationFrame(() => {
        d((F) => ({
          ...F,
          row: p,
          position: me(I)
        }));
      });
    },
    [me]
  ), mr = ce(() => {
    d((p) => ({ ...p, visible: !1 }));
  }, []), Ue = o.label || "Dept average", nr = o.color || "var(--ladf-accent-warning, var(--ladf-viz-marker))", Ye = t.headerTitles || {}, Pe = Ye.xTitle || "", Ne = Ye.yTitle || "", ir = Ye.percentTitle || "";
  return /* @__PURE__ */ n.jsx(q, { children: /* @__PURE__ */ n.jsxs("div", { className: "ladf-bullet", ref: i, children: [
    /* @__PURE__ */ n.jsxs("div", { className: "ladf-bullet__header", children: [
      /* @__PURE__ */ n.jsx("div", { className: "ladf-bullet__name-cell", children: /* @__PURE__ */ n.jsx("span", { className: "ladf-bullet__axis-label ladf-bullet-name-label", children: Pe }) }),
      /* @__PURE__ */ n.jsx("div", { className: "ladf-bullet__bar-cell", children: /* @__PURE__ */ n.jsx("span", { className: "ladf-bullet__axis-label", children: Ne }) }),
      x && /* @__PURE__ */ n.jsx("div", { className: "ladf-bullet__pct-cell ladf-bullet__pct-header", children: ir })
    ] }),
    /* @__PURE__ */ n.jsxs("div", { className: "ladf-bullet__body", children: [
      /* @__PURE__ */ n.jsxs("div", { className: "ladf-bullet__grid-lines", children: [
        /* @__PURE__ */ n.jsx("div", { className: "ladf-bullet__name-cell" }),
        /* @__PURE__ */ n.jsx("div", { className: "ladf-bullet__bar-cell", children: /* @__PURE__ */ n.jsx("div", { className: "ladf-bullet__grid-container", children: lr.map((p) => /* @__PURE__ */ n.jsx(
          "div",
          {
            className: "ladf-bullet__grid-line",
            style: { left: `${p / ar * 100}%` }
          },
          p
        )) }) }),
        x && /* @__PURE__ */ n.jsx("div", { className: "ladf-bullet__pct-cell" })
      ] }),
      R.map((p, I) => /* @__PURE__ */ n.jsx(
        on,
        {
          row: p,
          xKey: k,
          yKey: T,
          colorKey: b,
          dotColorKey: j,
          barColorMap: O,
          dotColorMap: ie,
          showAnnotations: y,
          maxValue: ee,
          markerValue: je(p),
          markerColor: nr,
          markerEnabled: h,
          outlierBound: Le(p),
          percentKey: L,
          showPercent: x,
          onClick: l.onClick,
          onMouseEnter: v ? $e : void 0,
          onMouseMove: v ? Fe : void 0,
          onMouseLeave: v ? mr : void 0
        },
        p[T] || I
      ))
    ] }),
    /* @__PURE__ */ n.jsxs("div", { className: "ladf-bullet__axis", children: [
      /* @__PURE__ */ n.jsx("div", { className: "ladf-bullet__name-cell" }),
      /* @__PURE__ */ n.jsx("div", { className: "ladf-bullet__bar-cell", children: /* @__PURE__ */ n.jsx("div", { className: "ladf-bullet__axis-ticks", children: lr.map((p) => /* @__PURE__ */ n.jsx(
        "span",
        {
          className: "ladf-bullet__tick",
          style: { left: `${p / ar * 100}%` },
          children: p.toLocaleString()
        },
        p
      )) }) }),
      x && /* @__PURE__ */ n.jsx("div", { className: "ladf-bullet__pct-cell" })
    ] }),
    (W.length > 0 || h || Ie) && /* @__PURE__ */ n.jsx("div", { className: "ladf-bullet__legend", children: /* @__PURE__ */ n.jsxs("ul", { className: "ladf-bullet__legend-list", children: [
      W.map((p) => {
        const I = a == null ? void 0 : a.has(p.key);
        return /* @__PURE__ */ n.jsx(
          "li",
          {
            className: [
              "ladf-bullet__legend-item",
              I ? "ladf-bullet__legend-item--hidden" : ""
            ].filter(Boolean).join(" "),
            children: /* @__PURE__ */ n.jsxs(
              "button",
              {
                type: "button",
                className: "ladf-bullet__legend-button",
                onClick: () => {
                  var F;
                  return (F = l.onLegendToggle) == null ? void 0 : F.call(l, p.key);
                },
                children: [
                  /* @__PURE__ */ n.jsx(
                    "span",
                    {
                      className: [
                        "ladf-bullet__legend-swatch",
                        `ladf-chart-color-${p.index}`,
                        "slide-from-bottom"
                      ].join(" ")
                    }
                  ),
                  /* @__PURE__ */ n.jsx("span", { className: "ladf-bullet__legend-label slide-from-bottom", children: p.label })
                ]
              }
            )
          },
          p.key
        );
      }),
      h && /* @__PURE__ */ n.jsxs("li", { className: "ladf-bullet__legend-item ladf-bullet__legend-item--marker", children: [
        /* @__PURE__ */ n.jsx(
          "span",
          {
            className: "ladf-bullet__legend-line slide-from-bottom",
            style: {
              background: nr
            }
          }
        ),
        /* @__PURE__ */ n.jsx("span", { className: "ladf-bullet__legend-label slide-from-bottom", children: Ue })
      ] }),
      Ie && /* @__PURE__ */ n.jsxs("li", { className: "ladf-bullet__legend-item ladf-bullet__legend-item--exceeded", children: [
        /* @__PURE__ */ n.jsx("span", { className: "ladf-bullet__legend-exceeded-swatch slide-from-bottom" }),
        /* @__PURE__ */ n.jsx("span", { className: "ladf-bullet__legend-label slide-from-bottom", children: "Higher than most peers" })
      ] })
    ] }) }),
    v ? /* @__PURE__ */ n.jsx(
      an,
      {
        row: s.row,
        nameKey: T,
        valueKey: k,
        colorKey: b,
        percentKey: L,
        markerLabel: Ue,
        colorMap: O,
        position: s.position,
        visible: s.visible,
        getMarkerValue: je,
        getExceeds: Re,
        ref: u
      }
    ) : null
  ] }) });
}
const mn = /* @__PURE__ */ new Set([
  "clean",
  "accent",
  "gradient",
  "icon",
  "compact"
]), bn = /* @__PURE__ */ new Set(["neutral", "success", "warning", "danger"]), yn = /* @__PURE__ */ new Set(["success", "warning", "danger", "accent", "primary"]), xn = /* @__PURE__ */ new Set([
  "positive",
  "negative",
  "neutral",
  "accent",
  "success",
  "warning",
  "danger"
]), vn = /* @__PURE__ */ new Set(["up", "down", "flat"]), _n = /* @__PURE__ */ new Set(["first", "last"]), Dr = /* @__PURE__ */ new Map(), zt = 1e6, $r = (e, r = 0) => Number.isFinite(e) && e >= 0 ? e : r, Bt = (e) => e == null ? "" : typeof e == "string" ? e.trim() : String(e), st = (e) => e == null ? "" : typeof e == "string" ? e.trim() : String(e), jn = (e) => {
  if (typeof e != "string")
    return "clean";
  const r = e.trim().toLowerCase();
  return !r || ["clean", "minimal", "minimal-clean", "minimal/clean", "minimal clean"].includes(r) ? "clean" : r.includes("accent") ? "accent" : r.includes("gradient") || r.includes("backdrop") || r.includes("halo") ? "gradient" : r.includes("icon") ? "icon" : r.includes("compact") ? "compact" : mn.has(r) ? r : "clean";
}, Wt = (e) => {
  const r = typeof e == "string" ? e.toLowerCase() : e;
  return _n.has(r) ? r : null;
}, Sn = (e) => {
  if (e == null)
    return "standard";
  const r = String(e).trim().toLowerCase();
  return r ? r.replace(/[^a-z0-9]+/g, "-") : "standard";
}, Nn = (e) => {
  const r = typeof e == "string" ? e.toLowerCase() : e;
  return bn.has(r) ? r : "neutral";
}, ut = (e) => {
  const r = typeof e == "string" ? e.toLowerCase() : e;
  return r === "primary" ? "accent" : yn.has(r) ? r : void 0;
}, cr = (e) => {
  const r = typeof e == "string" ? e.toLowerCase() : e;
  if (r === "positive") return "positive";
  if (r === "negative") return "negative";
  if (r === "neutral") return "neutral";
  if (r === "primary") return "accent";
  if (xn.has(r))
    return r;
}, Ut = (e) => {
  const r = typeof e == "string" ? e.toLowerCase() : e;
  if (r)
    return r === "up" || r === "increase" || r === "positive" ? "up" : r === "down" || r === "decrease" || r === "negative" ? "down" : r === "flat" || r === "neutral" || r === "even" ? "flat" : vn.has(r) ? r : void 0;
}, dr = (e) => e != null && e !== "", Yt = (e) => {
  if (typeof e == "number")
    return e;
  if (typeof e == "string") {
    const t = e.match(/-?\d+(\.\d+)?/);
    if (t) {
      const l = Number(t[0]);
      if (Number.isFinite(l))
        return l;
    }
  }
  if (e == null)
    return NaN;
  const r = Number(e);
  return Number.isFinite(r) ? r : NaN;
}, pn = (e, r, t) => {
  if (!t)
    return null;
  const l = (e == null ? void 0 : e.ratioNumeratorKey) || (r == null ? void 0 : r.numerator) || (r == null ? void 0 : r.left) || (r == null ? void 0 : r.ratioNumerator) || null, a = (e == null ? void 0 : e.ratioDenominatorKey) || (r == null ? void 0 : r.denominator) || (r == null ? void 0 : r.right) || (r == null ? void 0 : r.ratioDenominator) || null;
  if (!l && !a && (e == null ? void 0 : e.ratioDenominator) == null)
    return null;
  const i = l ? t == null ? void 0 : t[l] : void 0, u = a ? t == null ? void 0 : t[a] : (e == null ? void 0 : e.ratioDenominator) ?? void 0;
  return i == null && u == null ? null : { numerator: i, denominator: u };
}, kn = (e, r) => {
  if (e != null && e.value)
    return e.value;
  if (e != null && e.y)
    return e.y;
  if (r != null && r.length) {
    const t = r[0];
    return Object.keys(t || {}).find((l) => typeof t[l] == "number") || null;
  }
  return null;
}, En = (e, r) => !Array.isArray(e) || e.length === 0 ? null : (Wt(r == null ? void 0 : r.valueFrom) || (r != null && r.sparklineFromData ? "last" : "first")) === "last" ? e[e.length - 1] ?? null : e[0] ?? null, Tn = (e, r, t, l, a = null) => {
  if (e != null && e.title || e != null && e.label)
    return e.title || e.label;
  if (l != null && l.title)
    return l.title;
  const i = r == null ? void 0 : r.label, u = a || (t == null ? void 0 : t[0]);
  return i && (u == null ? void 0 : u[i]) != null ? String(u[i]) : typeof i == "string" ? i : "";
}, Cn = (e, r) => (e == null ? void 0 : e.subtitle) || (e == null ? void 0 : e.caption) || (r == null ? void 0 : r.subtitle) || "", gn = (e, r, t) => {
  if ((e == null ? void 0 : e.trendChipValue) !== void 0 && (e == null ? void 0 : e.trendChipValue) !== null)
    return e.trendChipValue;
  if ((e == null ? void 0 : e.trendValue) !== void 0 && (e == null ? void 0 : e.trendValue) !== null)
    return e.trendValue;
  const l = (e == null ? void 0 : e.trendChipValueKey) || (e == null ? void 0 : e.trendValueKey) || (r == null ? void 0 : r.trendChipValue) || (r == null ? void 0 : r.trendValue) || (r == null ? void 0 : r.trend) || null;
  return l && t && t[l] != null ? t[l] : null;
}, Dn = (e, r, t) => {
  const l = (e == null ? void 0 : e.trendLabelKey) || (r == null ? void 0 : r.trendLabel) || (r == null ? void 0 : r.context) || null;
  return l && t && t[l] != null ? String(t[l]) : e != null && e.trendLabel ? e.trendLabel : "";
}, Ln = (e, r, t) => {
  const l = (e == null ? void 0 : e.trendChipLabelKey) || (r == null ? void 0 : r.trendChipLabel) || null;
  return l && t && t[l] != null ? String(t[l]) : e != null && e.trendChipLabel ? e.trendChipLabel : "";
}, Rn = (e, r) => {
  if (e == null || e === "")
    return "";
  if (typeof e == "string")
    return e;
  if (typeof e == "number" && Number.isFinite(e)) {
    const t = Number.isFinite(r == null ? void 0 : r.trendDecimals) ? r.trendDecimals : 1;
    return e.toLocaleString(void 0, {
      minimumFractionDigits: t,
      maximumFractionDigits: t
    });
  }
  return String(e);
}, ct = (e, r) => {
  const t = Ut(e);
  if (t)
    return t;
  const l = Yt(r);
  if (Number.isFinite(l))
    return l > 0 ? "up" : l < 0 ? "down" : "flat";
}, dt = (e, r) => {
  const t = cr(e);
  if (t)
    return t;
  if (r)
    return r === "up" ? "positive" : r === "down" ? "negative" : "neutral";
}, In = (e, r) => e || (r === "up" ? "trend-up" : r === "down" ? "trend-down" : r === "flat" ? "minus" : null), $n = (e) => {
  const r = Yt(e);
  if (Number.isFinite(r)) {
    if (r < 0)
      return "danger";
    if (r > 0)
      return "neutral";
  }
}, Fn = (e) => {
  if (!Array.isArray(e) || e.length < 2)
    return;
  const r = e[0], t = e[e.length - 1];
  if (!(!Number.isFinite(r) || !Number.isFinite(t)))
    return t > r ? "up" : t < r ? "down" : "flat";
}, Sr = (e, r) => {
  if (!Array.isArray(e) || e.length === 0)
    return null;
  if (typeof e[0] == "number") {
    const a = e.filter((i) => Number.isFinite(i));
    return a.length >= 2 ? a : null;
  }
  const t = r || "value", l = e.map((a) => a == null ? NaN : typeof a == "number" ? a : Number(typeof a == "object" ? a[t] : a)).filter((a) => Number.isFinite(a));
  return l.length >= 2 ? l : null;
}, Pn = (e, r, t, l, a) => {
  if (Array.isArray(e == null ? void 0 : e.sparkline))
    return Sr(e.sparkline, e.sparklineValueKey || a);
  const i = (e == null ? void 0 : e.sparklineKey) || (r == null ? void 0 : r.sparkline) || null;
  if (i && l)
    return Sr(
      l[i],
      (e == null ? void 0 : e.sparklineValueKey) || a
    );
  if (e != null && e.sparklineFromData && Array.isArray(t) && t.length > 1) {
    const u = (e == null ? void 0 : e.sparklineValueKey) || a;
    if (u) {
      const s = t.map((d) => d == null ? void 0 : d[u]).filter((d) => d != null);
      return Sr(s, u);
    }
  }
  return null;
}, Mn = (e, r = 100, t = 32, l = 2) => {
  if (!Array.isArray(e) || e.length < 2)
    return null;
  const a = Math.min(...e), i = Math.max(...e), u = i - a || 1, s = r / (e.length - 1), d = t - l * 2, f = e.map((b, S) => {
    const j = S * s, y = l + (i - b) * (d / u);
    return [j, y];
  }), o = f.map((b, S) => `${S === 0 ? "M" : "L"}${b[0]},${b[1]}`).join(" "), h = f[f.length - 1], m = `${o} L${h[0]},${t} L0,${t} Z`;
  return { line: o, area: m };
}, Vn = (e, r) => {
  const t = Math.min(6, $r(r, 0)), l = e < 0 ? "-" : "", a = Math.abs(e), i = Math.floor(a / 3600), u = Math.floor(a % 3600 / 60), s = a % 60, d = [];
  i && d.push(`${i}h`), (u || i) && d.push(`${u}m`);
  const f = t > 0 ? s.toFixed(t) : Math.round(s).toString();
  return (s || !i && !u) && d.push(`${f}s`), `${l}${d.join(" ")}`.trim();
}, wn = (e, r) => {
  if (Array.isArray(e) && e.length >= 2)
    return `${e[0]}:${e[1]}`;
  if (e && typeof e == "object") {
    const a = e.numerator ?? e.n ?? e.left ?? e.a ?? e.top ?? e[0], i = e.denominator ?? e.d ?? e.right ?? e.b ?? e.bottom ?? e[1];
    if (a != null && i != null)
      return `${a}:${i}`;
  }
  if (typeof e == "string")
    return e;
  const t = typeof e == "number" ? e : Number(e), l = (r == null ? void 0 : r.ratioDenominator) != null ? Number(r.ratioDenominator) : null;
  return Number.isFinite(t) && Number.isFinite(l) ? `${t}:${l}` : Number.isFinite(t) ? t.toLocaleString(void 0, { maximumFractionDigits: 0 }) : e == null ? "--" : String(e);
}, On = (e, r) => {
  if (!r || e == null || e === "" || e === "--")
    return e;
  const t = Bt(r);
  if (!t)
    return e;
  const l = !/^[%)]/.test(t);
  return `${e}${l ? " " : ""}${t}`;
}, Kn = (e, r) => {
  const t = typeof e == "number" ? e : Number(e);
  if (!Number.isFinite(t))
    return e == null ? "--" : String(e);
  const l = Math.min(6, $r(r, 1));
  return `${t.toLocaleString(void 0, {
    minimumFractionDigits: l,
    maximumFractionDigits: l
  })}h`;
}, zn = (e, r) => {
  const t = r.format || "number", l = $r(r.decimals, 0);
  if (e == null || e === "")
    return "--";
  if (t === "ratio")
    return wn(e, r);
  if (t === "hours" || t === "time")
    return Kn(e, l);
  const a = typeof e == "number" ? e : Number(e);
  if (!Number.isFinite(a))
    return String(e);
  if (t === "currency") {
    const u = Number.isFinite(r.compactThreshold) ? r.compactThreshold : zt, s = r.compact === !0 || r.compact === "auto" && Math.abs(a) >= u, d = {
      style: "currency",
      currency: r.currency || "USD",
      minimumFractionDigits: l,
      maximumFractionDigits: l
    };
    return s && (d.notation = "compact", d.compactDisplay = "short"), a.toLocaleString(void 0, d);
  }
  if (t === "percent")
    return `${(a * 100).toLocaleString(void 0, {
      minimumFractionDigits: l,
      maximumFractionDigits: l
    })}%`;
  if (t === "compact") {
    const u = l === 0 ? 1 : l;
    return a.toLocaleString(void 0, {
      notation: "compact",
      maximumFractionDigits: u
    });
  }
  return t === "duration" ? Vn(a, l || 0) : t === "custom" ? typeof r.formatter == "function" ? r.formatter(a, r) : typeof r.customFormat == "function" ? r.customFormat(a, r) : String(a) : a.toLocaleString(void 0, {
    minimumFractionDigits: l,
    maximumFractionDigits: l
  });
}, Bn = {
  standard: {},
  currency: {
    format: "currency",
    compact: "auto",
    compactThreshold: zt,
    decimals: 0
  },
  "large-value": { format: "compact", decimals: 1 },
  integer: { format: "number", decimals: 0 },
  count: { format: "number", decimals: 0 },
  percentage: { format: "percent", decimals: 1 },
  "decimal-percentage": { format: "percent", decimals: 2 },
  decimal: { format: "number", decimals: 2 },
  ratio: { format: "ratio" },
  amount: { format: "currency", decimals: 0 },
  time: { format: "hours", decimals: 1 },
  negative: { valueTone: "danger" },
  duration: { format: "duration", decimals: 0 },
  index: { format: "number", decimals: 0 }
}, Wn = {
  icon: {
    standard: { icon: "users" },
    rating: { icon: "star", format: "number", decimals: 1 },
    alert: {
      icon: "alert",
      valueTone: "danger",
      iconTone: "danger",
      format: "number",
      decimals: 0
    },
    capacity: { icon: "box", valueTone: "warning", iconTone: "warning" },
    velocity: { icon: "spark", valueTone: "success", iconTone: "success" }
  },
  compact: {
    standard: {
      badgeText: "+12% vs last month",
      badgeTone: "success",
      badgeIcon: "check"
    },
    growth: {
      badgeText: "+28% growth",
      badgeTone: "success",
      badgeIcon: "trend-up"
    },
    minimal: {
      badgeText: "All systems operational",
      badgeTone: "success",
      badgeIcon: "check"
    },
    score: {
      badgeText: "No change",
      badgeTone: "neutral",
      badgeIcon: "minus"
    },
    efficiency: {
      badgeText: "-8% reduction",
      badgeTone: "success",
      badgeIcon: "trend-down"
    }
  }
}, Un = {
  icon: { icon: "users" },
  compact: {
    badgeText: "+12% vs last month",
    badgeTone: "success",
    badgeIcon: "check"
  }
}, Yn = (e, r, t) => {
  const l = (e || "").toLowerCase(), a = (r || "").toLowerCase(), i = {
    ...Bn,
    ...Wn[l] || {}
  }, u = i[a] || i.standard || {}, s = {
    ...Un[l] || {},
    ...u
  }, d = { ...t };
  return !t.format && s.format && (d.format = s.format), t.compact == null && s.compact != null && (d.compact = s.compact), t.compactThreshold == null && s.compactThreshold != null && (d.compactThreshold = s.compactThreshold), !t.icon && s.icon && (d.icon = s.icon), !t.valueSuffix && s.valueSuffix && (d.valueSuffix = s.valueSuffix), !t.badgeText && s.badgeText && (d.badgeText = s.badgeText), !t.badgeIcon && s.badgeIcon && (d.badgeIcon = s.badgeIcon), t.badgeTone === "neutral" && s.badgeTone && (d.badgeTone = s.badgeTone), t.valueTone == null && s.valueTone && (d.valueTone = s.valueTone), t.iconTone == null && s.iconTone && (d.iconTone = s.iconTone), t.trendTone == null && s.trendTone && (d.trendTone = s.trendTone), t.trendChipTone == null && s.trendTone && (d.trendChipTone = s.trendTone), t.sparklineTone == null && s.sparklineTone && (d.sparklineTone = s.sparklineTone), typeof s.decimals == "number" && t.decimals == null && (d.decimals = s.decimals), d;
}, Gn = (e) => ({
  variant: jn(e == null ? void 0 : e.variant),
  subvariant: Sn((e == null ? void 0 : e.subvariant) ?? (e == null ? void 0 : e.subtype)),
  format: e == null ? void 0 : e.format,
  currency: (e == null ? void 0 : e.currency) || "USD",
  decimals: Number.isFinite(e == null ? void 0 : e.decimals) ? e.decimals : null,
  compact: (e == null ? void 0 : e.compact) ?? null,
  compactThreshold: Number.isFinite(e == null ? void 0 : e.compactThreshold) ? e.compactThreshold : null,
  ratioDenominator: (e == null ? void 0 : e.ratioDenominator) ?? null,
  ratioNumeratorKey: st(
    (e == null ? void 0 : e.ratioNumeratorKey) ?? (e == null ? void 0 : e.ratioLeftKey)
  ),
  ratioDenominatorKey: st(
    (e == null ? void 0 : e.ratioDenominatorKey) ?? (e == null ? void 0 : e.ratioRightKey)
  ),
  title: (e == null ? void 0 : e.title) || (e == null ? void 0 : e.label) || "",
  subtitle: (e == null ? void 0 : e.subtitle) || (e == null ? void 0 : e.caption) || "",
  valueFrom: Wt(e == null ? void 0 : e.valueFrom),
  badgeText: (e == null ? void 0 : e.badgeText) || "",
  badgeTone: Nn(e == null ? void 0 : e.badgeTone),
  badgeIcon: (e == null ? void 0 : e.badgeIcon) || "",
  icon: (e == null ? void 0 : e.icon) || "",
  valueTone: ut(e == null ? void 0 : e.valueTone),
  iconTone: ut(e == null ? void 0 : e.iconTone),
  trendValue: (e == null ? void 0 : e.trendValue) ?? (e == null ? void 0 : e.delta) ?? (e == null ? void 0 : e.change) ?? null,
  trendValueKey: (e == null ? void 0 : e.trendValueKey) || (e == null ? void 0 : e.trendKey) || (e == null ? void 0 : e.deltaKey) || "",
  trendLabel: (e == null ? void 0 : e.trendLabel) || (e == null ? void 0 : e.contextLabel) || "",
  trendLabelKey: (e == null ? void 0 : e.trendLabelKey) || (e == null ? void 0 : e.contextKey) || "",
  trendChipValue: (e == null ? void 0 : e.trendChipValue) ?? null,
  trendChipValueKey: (e == null ? void 0 : e.trendChipValueKey) || "",
  trendChipLabel: (e == null ? void 0 : e.trendChipLabel) || "",
  trendChipLabelKey: (e == null ? void 0 : e.trendChipLabelKey) || "",
  trendTone: cr((e == null ? void 0 : e.trendTone) ?? (e == null ? void 0 : e.trendChipTone)),
  trendChipTone: cr((e == null ? void 0 : e.trendChipTone) ?? (e == null ? void 0 : e.trendTone)),
  trendDirection: Ut((e == null ? void 0 : e.trendDirection) ?? (e == null ? void 0 : e.trendChipDirection)),
  trendIcon: (e == null ? void 0 : e.trendIcon) || "",
  trendChipIcon: (e == null ? void 0 : e.trendChipIcon) || "",
  trendDecimals: Number.isFinite(e == null ? void 0 : e.trendDecimals) ? e.trendDecimals : null,
  sparkline: Array.isArray(e == null ? void 0 : e.sparkline) ? e.sparkline : null,
  sparklineKey: (e == null ? void 0 : e.sparklineKey) || (e == null ? void 0 : e.sparklineField) || "",
  sparklineValueKey: (e == null ? void 0 : e.sparklineValueKey) || "",
  sparklineFromData: (e == null ? void 0 : e.sparklineFromData) === !0,
  sparklineTone: cr(e == null ? void 0 : e.sparklineTone),
  showSparkline: (e == null ? void 0 : e.showSparkline) ?? null,
  valueSuffix: Bt(
    (e == null ? void 0 : e.valueSuffix) ?? (e == null ? void 0 : e.suffix) ?? (e == null ? void 0 : e.unit) ?? (e == null ? void 0 : e.capacitySuffix)
  ),
  value: e == null ? void 0 : e.value
}), Fr = (e) => ({
  star: /* @__PURE__ */ n.jsx("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", fill: "currentColor", children: /* @__PURE__ */ n.jsx("polygon", { points: "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" }) }),
  alert: /* @__PURE__ */ n.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", children: [
    /* @__PURE__ */ n.jsx("circle", { cx: "12", cy: "12", r: "10", fill: "none", stroke: "currentColor", strokeWidth: "2" }),
    /* @__PURE__ */ n.jsx("line", { x1: "12", y1: "8", x2: "12", y2: "12", stroke: "currentColor", strokeWidth: "2" }),
    /* @__PURE__ */ n.jsx("line", { x1: "12", y1: "16", x2: "12.01", y2: "16", stroke: "currentColor", strokeWidth: "2" })
  ] }),
  box: /* @__PURE__ */ n.jsx("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ n.jsx(
    "path",
    {
      d: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2"
    }
  ) }),
  users: /* @__PURE__ */ n.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", children: [
    /* @__PURE__ */ n.jsx(
      "path",
      {
        d: "M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round"
      }
    ),
    /* @__PURE__ */ n.jsx(
      "circle",
      {
        cx: "11",
        cy: "7",
        r: "4",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2"
      }
    )
  ] }),
  spark: /* @__PURE__ */ n.jsx("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ n.jsx(
    "polyline",
    {
      points: "4 14 9 9 13 13 20 6",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }
  ) }),
  check: /* @__PURE__ */ n.jsx("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ n.jsx(
    "polyline",
    {
      points: "20 6 9 17 4 12",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "3",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }
  ) }),
  minus: /* @__PURE__ */ n.jsx("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ n.jsx("line", { x1: "3", y1: "12", x2: "21", y2: "12", stroke: "currentColor", strokeWidth: "2" }) }),
  "trend-up": /* @__PURE__ */ n.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", children: [
    /* @__PURE__ */ n.jsx(
      "polyline",
      {
        points: "23 6 13.5 15.5 8.5 10.5 1 18",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    ),
    /* @__PURE__ */ n.jsx(
      "polyline",
      {
        points: "17 6 23 6 23 12",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    )
  ] }),
  "trend-down": /* @__PURE__ */ n.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", children: [
    /* @__PURE__ */ n.jsx(
      "polyline",
      {
        points: "23 18 13.5 8.5 8.5 13.5 1 6",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    ),
    /* @__PURE__ */ n.jsx(
      "polyline",
      {
        points: "17 18 23 18 23 12",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    )
  ] })
})[e] || /* @__PURE__ */ n.jsx("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ n.jsx("circle", { cx: "12", cy: "12", r: "8", fill: "none", stroke: "currentColor", strokeWidth: "2" }) });
class rr {
  constructor(r) {
    this.viewModel = r;
  }
  className() {
    const r = this.viewModel.subvariant ? String(this.viewModel.subvariant).toLowerCase().replace(/[^a-z0-9]+/g, "-") : null;
    return [
      "ladf-kpi",
      `ladf-kpi--${this.viewModel.variant}`,
      r ? `ladf-kpi--subvariant-${r}` : null,
      r ? `ladf-kpi--subtype-${r}` : null,
      this.viewModel.sparklinePaths ? "ladf-kpi--has-sparkline" : null,
      this.viewModel.hasFooter ? "ladf-kpi--has-footer" : null
    ].filter(Boolean).join(" ");
  }
  renderLabel() {
    return this.viewModel.label ? /* @__PURE__ */ n.jsx("div", { className: "ladf-kpi__label", children: this.viewModel.label }) : null;
  }
  renderValue() {
    const r = this.viewModel.valueTone ? `ladf-kpi__value--${this.viewModel.valueTone}` : "";
    return /* @__PURE__ */ n.jsx("div", { className: `ladf-kpi__value ${r}`.trim(), children: this.viewModel.formattedValue });
  }
  renderCaption() {
    return this.viewModel.caption ? /* @__PURE__ */ n.jsx("div", { className: "ladf-kpi__caption", children: this.viewModel.caption }) : null;
  }
  renderSparkline() {
    if (!this.viewModel.sparklinePaths)
      return null;
    const r = this.viewModel.sparklineTone ? `ladf-kpi__sparkline--${this.viewModel.sparklineTone}` : "";
    return /* @__PURE__ */ n.jsxs(
      "svg",
      {
        className: `ladf-kpi__sparkline ${r}`.trim(),
        viewBox: "0 0 100 32",
        preserveAspectRatio: "none",
        "aria-hidden": "true",
        children: [
          /* @__PURE__ */ n.jsx("path", { className: "ladf-kpi__sparkline-line", d: this.viewModel.sparklinePaths.line }),
          /* @__PURE__ */ n.jsx("path", { className: "ladf-kpi__sparkline-fill", d: this.viewModel.sparklinePaths.area })
        ]
      }
    );
  }
  renderTrendChip() {
    if (!dr(this.viewModel.trendChipValue))
      return null;
    const r = this.viewModel.trendChipTone ? `ladf-kpi__trend-chip--${this.viewModel.trendChipTone}` : "", t = this.viewModel.trendIconKey, l = t ? Fr(t) : null;
    return /* @__PURE__ */ n.jsxs("div", { className: `ladf-kpi__trend-chip ${r}`.trim(), children: [
      l ? /* @__PURE__ */ n.jsx("span", { className: "ladf-kpi__trend-chip-icon", children: l }) : null,
      /* @__PURE__ */ n.jsxs("span", { className: "ladf-kpi__trend-chip-text", children: [
        this.viewModel.trendChipValue,
        this.viewModel.trendChipLabel
      ] })
    ] });
  }
  renderFooter() {
    const r = this.renderTrendChip(), t = this.viewModel.trendLabel ? /* @__PURE__ */ n.jsx("div", { className: "ladf-kpi__trend-label", children: this.viewModel.trendLabel }) : null;
    return !r && !t ? null : /* @__PURE__ */ n.jsxs("div", { className: "ladf-kpi__footer", children: [
      r,
      t
    ] });
  }
  renderContent() {
    return /* @__PURE__ */ n.jsxs(n.Fragment, { children: [
      this.renderLabel(),
      this.renderValue(),
      this.renderCaption(),
      this.renderSparkline(),
      this.renderFooter()
    ] });
  }
  render() {
    return /* @__PURE__ */ n.jsx("div", { className: this.className(), children: this.renderContent() });
  }
}
class Zn extends rr {
}
class Hn extends rr {
}
class Xn extends rr {
}
class An extends rr {
  renderIcon() {
    if (!this.viewModel.icon && !this.viewModel.label)
      return null;
    const r = Fr(this.viewModel.icon || "spark"), t = this.viewModel.label ? /* @__PURE__ */ n.jsx("div", { className: "ladf-kpi__label", children: this.viewModel.label }) : null, l = this.viewModel.iconTone ? `ladf-kpi__icon--${this.viewModel.iconTone}` : "";
    return /* @__PURE__ */ n.jsxs("div", { className: "ladf-kpi__header", children: [
      /* @__PURE__ */ n.jsx("div", { className: `ladf-kpi__icon ${l}`.trim(), children: r }),
      t
    ] });
  }
  renderContent() {
    return /* @__PURE__ */ n.jsxs(n.Fragment, { children: [
      this.renderIcon(),
      this.renderValue(),
      this.renderCaption(),
      this.renderSparkline(),
      this.renderFooter()
    ] });
  }
}
class Jn extends rr {
  renderBadge() {
    if (!this.viewModel.badgeText)
      return null;
    const r = this.viewModel.badgeIcon ? Fr(this.viewModel.badgeIcon) : null;
    return /* @__PURE__ */ n.jsxs("div", { className: `ladf-kpi__badge ladf-kpi__badge--${this.viewModel.badgeTone}`, children: [
      r ? /* @__PURE__ */ n.jsx("span", { className: "ladf-kpi__badge-icon", children: r }) : null,
      this.viewModel.badgeText
    ] });
  }
  renderFooter() {
    const r = this.renderBadge();
    return r ? /* @__PURE__ */ n.jsx("div", { className: "ladf-kpi__footer", children: r }) : null;
  }
  renderContent() {
    return /* @__PURE__ */ n.jsxs(n.Fragment, { children: [
      this.renderLabel(),
      this.renderValue(),
      this.renderCaption(),
      this.renderFooter()
    ] });
  }
}
const tr = (e, r) => Dr.set(e, r);
tr("clean", Zn);
tr("accent", Hn);
tr("gradient", Xn);
tr("icon", An);
tr("compact", Jn);
const Qn = (e) => Dr.get(e) || Dr.get("clean");
function qn({ data: e = [], encodings: r = {}, options: t = {}, panelConfig: l = null }) {
  const a = g(() => {
    const s = Gn(t), d = kn(r, e), f = En(e, s), o = s.format === "ratio" ? pn(s, r, f) : null, h = s.value !== void 0 && s.value !== null ? s.value : o || (d ? f == null ? void 0 : f[d] : null), m = Tn(s, r, e, l, f), b = Cn(s, l), S = Yn(s.variant, s.subvariant, {
      ...s,
      valueKey: d,
      rawValue: h,
      label: m,
      caption: b
    }), j = gn(S, r, f), y = Rn(j, S), x = Ln(S, r, f), v = Dn(S, r, f), N = ct(S.trendDirection, j), k = S.trendTone != null ? S.trendTone : dt(null, N), T = S.trendChipTone != null ? S.trendChipTone : k, D = In(
      S.trendChipIcon || S.trendIcon,
      N
    ), P = Pn(
      S,
      r,
      e,
      f,
      d
    ), G = !!P && !!S.showSparkline ? Mn(P) : null, R = Fn(P), O = S.valueTone != null ? S.valueTone : $n(h), ie = S.sparklineTone != null ? S.sparklineTone : dt(
      null,
      R || N || ct(null, h)
    ) || O || "success", W = dr(y) || dr(v) || dr(S.badgeText);
    return {
      ...S,
      valueTone: O,
      trendChipValue: y,
      trendChipLabel: x,
      trendChipTone: T,
      trendValue: y,
      trendLabel: v,
      trendTone: k,
      trendDirection: N,
      trendIconKey: D,
      sparklinePaths: G,
      sparklineTone: ie,
      hasFooter: W,
      isStandardLayout: !G || !W,
      formattedValue: On(
        zn(h, S),
        S.valueSuffix
      )
    };
  }, [e, r, t, l]), i = Qn(a.variant);
  return g(() => new i(a), [i, a]).render();
}
const ei = (e, r) => {
  if (!Array.isArray(e) || !r)
    return [];
  const t = /* @__PURE__ */ new Set(), l = [];
  return e.forEach((a) => {
    const i = a == null ? void 0 : a[r];
    if (i == null)
      return;
    const u = String(i);
    t.has(u) || (t.add(u), l.push(u));
  }), l;
};
function ri({
  data: e = [],
  encodings: r = {},
  options: t = {},
  handlers: l = {},
  colorAssignment: a,
  hiddenKeys: i
}) {
  const u = r.category, s = r.value, d = t.tooltip !== !1, f = t.labels === !0, o = t.donut === !0, h = g(
    () => ei(e, u),
    [e, u]
  ), m = g(
    () => ye(h),
    [h]
  ), b = i != null && i.size ? e.filter(
    (j) => !i.has(String(j == null ? void 0 : j[u]))
  ) : e, S = ({ cx: j, cy: y, midAngle: x, outerRadius: v, name: N }) => {
    if (!f)
      return null;
    const k = v + 14, T = -x * Math.PI / 180, D = j + k * Math.cos(T), P = y + k * Math.sin(T), L = N != null ? String(N) : "";
    return L ? /* @__PURE__ */ n.jsx(
      "text",
      {
        x: D,
        y: P,
        textAnchor: D > j ? "start" : "end",
        dominantBaseline: "central",
        fill: "var(--ladf-text-muted)",
        fontSize: 12,
        children: L
      }
    ) : null;
  };
  return /* @__PURE__ */ n.jsx(q, { children: /* @__PURE__ */ n.jsx(ae, { width: "100%", height: 280, children: /* @__PURE__ */ n.jsxs(ba, { children: [
    d ? /* @__PURE__ */ n.jsx(le, { content: /* @__PURE__ */ n.jsx(ne, {}) }) : null,
    /* @__PURE__ */ n.jsx(
      ya,
      {
        data: b,
        dataKey: s,
        nameKey: u,
        innerRadius: o ? "55%" : 0,
        outerRadius: "80%",
        paddingAngle: 1,
        label: f ? S : !1,
        labelLine: !1,
        onClick: l.onClick,
        children: b.map((j, y) => {
          var N;
          const x = j == null ? void 0 : j[u], v = ((N = a == null ? void 0 : a.getColor) == null ? void 0 : N.call(a, x)) || m[String(x)] || B(y);
          return /* @__PURE__ */ n.jsx(er, { fill: v }, `slice-${y}`);
        })
      }
    )
  ] }) }) });
}
const ti = (e, r) => {
  if (!Array.isArray(e) || !r)
    return { keys: [], groups: /* @__PURE__ */ new Map() };
  const t = /* @__PURE__ */ new Map();
  return e.forEach((l) => {
    const a = l == null ? void 0 : l[r];
    if (a == null)
      return;
    const i = String(a), u = t.get(i) || [];
    u.push(l), t.set(i, u);
  }), { keys: Array.from(t.keys()), groups: t };
};
function ai({
  data: e = [],
  encodings: r = {},
  options: t = {},
  handlers: l = {},
  colorAssignment: a,
  hiddenKeys: i
}) {
  var S;
  const u = t.tooltip !== !1, s = typeof t.pointSize == "number" && t.pointSize > 0 ? t.pointSize : 6, d = r.group, { keys: f, groups: o } = g(
    () => ti(e, d),
    [e, d]
  ), h = f.filter(
    (j) => !(i != null && i.has(String(j)))
  ), m = g(
    () => ye(f),
    [f]
  ), b = (j) => {
    const { cx: y, cy: x, fill: v } = j;
    return y == null || x == null ? null : /* @__PURE__ */ n.jsx("circle", { cx: y, cy: x, r: s, fill: v });
  };
  return /* @__PURE__ */ n.jsx(q, { children: /* @__PURE__ */ n.jsx(ae, { width: "100%", height: 280, children: /* @__PURE__ */ n.jsxs(xa, { margin: { top: 8, right: 16, left: 0, bottom: 8 }, children: [
    /* @__PURE__ */ n.jsx(We, { stroke: "var(--ladf-chart-grid)", strokeDasharray: "3 3" }),
    /* @__PURE__ */ n.jsx(
      Ce,
      {
        dataKey: r.x,
        tick: { fill: "var(--ladf-text-muted)", fontSize: 12 },
        axisLine: { stroke: "var(--ladf-border-divider)" }
      }
    ),
    /* @__PURE__ */ n.jsx(
      ge,
      {
        dataKey: r.y,
        tick: { fill: "var(--ladf-text-muted)", fontSize: 12 },
        axisLine: { stroke: "var(--ladf-border-divider)" }
      }
    ),
    u ? /* @__PURE__ */ n.jsx(le, { content: /* @__PURE__ */ n.jsx(ne, {}) }) : null,
    d ? h.map((j, y) => {
      var v;
      const x = ((v = a == null ? void 0 : a.getColor) == null ? void 0 : v.call(a, j)) || m[j] || B(y);
      return /* @__PURE__ */ n.jsx(
        Wr,
        {
          name: j,
          data: o.get(j) || [],
          fill: x,
          shape: b,
          onClick: l.onClick
        },
        j
      );
    }) : /* @__PURE__ */ n.jsx(
      Wr,
      {
        data: e,
        fill: ((S = a == null ? void 0 : a.getColor) == null ? void 0 : S.call(a, r.y)) || B(0),
        shape: b,
        onClick: l.onClick
      }
    )
  ] }) }) });
}
const li = (e, r) => e ? Array.isArray(e.y) ? e.y : e.y ? [e.y] : r != null && r.length ? Object.keys(r[0]).filter((t) => t !== e.x) : [] : [], ft = (e) => {
  if (!Array.isArray(e))
    return [];
  const r = /* @__PURE__ */ new Set(), t = [];
  return e.forEach((l) => {
    if (l == null)
      return;
    const a = String(l);
    r.has(a) || (r.add(a), t.push(a));
  }), t;
};
function ni({
  data: e = [],
  encodings: r = {},
  options: t = {},
  handlers: l = {},
  colorAssignment: a,
  hiddenKeys: i
}) {
  const u = (a == null ? void 0 : a.mode) === "series" || (a == null ? void 0 : a.mode) === "single" ? a.items.map((x) => x.key) : [], s = u.length ? u : li(r, e), d = ft(t.barKeys), f = ft(t.lineKeys), o = d.length || f.length ? [] : s, h = d.length ? d : o, m = f.length ? f : s.filter((x) => !h.includes(x)), b = h.filter((x) => !(i != null && i.has(String(x)))), S = m.filter((x) => !(i != null && i.has(String(x)))), j = t.tooltip !== !1, y = g(
    () => ye(s),
    [s]
  );
  return /* @__PURE__ */ n.jsx(q, { children: /* @__PURE__ */ n.jsx(ae, { width: "100%", height: 280, children: /* @__PURE__ */ n.jsxs(va, { data: e, margin: { top: 8, right: 16, left: 0, bottom: 8 }, children: [
    /* @__PURE__ */ n.jsx(We, { stroke: "var(--ladf-chart-grid)", strokeDasharray: "3 3" }),
    /* @__PURE__ */ n.jsx(
      Ce,
      {
        dataKey: r.x,
        tick: { fill: "var(--ladf-text-muted)", fontSize: 12 },
        axisLine: { stroke: "var(--ladf-border-divider)" }
      }
    ),
    /* @__PURE__ */ n.jsx(
      ge,
      {
        tick: { fill: "var(--ladf-text-muted)", fontSize: 12 },
        axisLine: { stroke: "var(--ladf-border-divider)" }
      }
    ),
    j ? /* @__PURE__ */ n.jsx(le, { content: /* @__PURE__ */ n.jsx(ne, {}) }) : null,
    b.map((x, v) => {
      var N;
      return /* @__PURE__ */ n.jsx(
        fr,
        {
          dataKey: x,
          fill: ((N = a == null ? void 0 : a.getColor) == null ? void 0 : N.call(a, x)) || y[x] || B(v),
          radius: [6, 6, 0, 0],
          onClick: l.onClick
        },
        `bar-${x}`
      );
    }),
    S.map((x, v) => {
      var N;
      return /* @__PURE__ */ n.jsx(
        Nt,
        {
          type: "monotone",
          dataKey: x,
          stroke: ((N = a == null ? void 0 : a.getColor) == null ? void 0 : N.call(a, x)) || y[x] || B(v + b.length),
          strokeWidth: 2,
          dot: { r: 3 },
          activeDot: { r: 5, onClick: l.onClick },
          onClick: l.onClick
        },
        `line-${x}`
      );
    })
  ] }) }) });
}
const ii = (e, r) => e ? Array.isArray(e.y) ? e.y : e.y ? [e.y] : r != null && r.length ? Object.keys(r[0]).filter((t) => t !== e.x) : [] : [];
function si({
  data: e = [],
  encodings: r = {},
  options: t = {},
  handlers: l = {},
  colorAssignment: a,
  hiddenKeys: i
}) {
  const u = (a == null ? void 0 : a.mode) === "series" || (a == null ? void 0 : a.mode) === "single" ? a.items.map((m) => m.key) : [], s = u.length ? u : ii(r, e), d = s.filter(
    (m) => !(i != null && i.has(String(m)))
  ), f = t.tooltip !== !1, o = typeof t.fillOpacity == "number" ? t.fillOpacity : 0.2, h = g(
    () => ye(s),
    [s]
  );
  return /* @__PURE__ */ n.jsx(q, { children: /* @__PURE__ */ n.jsx(ae, { width: "100%", height: 280, children: /* @__PURE__ */ n.jsxs(_a, { data: e, children: [
    /* @__PURE__ */ n.jsx(Et, { stroke: "var(--ladf-chart-grid)" }),
    /* @__PURE__ */ n.jsx(
      Tt,
      {
        dataKey: r.x,
        tick: { fill: "var(--ladf-text-muted)", fontSize: 12 }
      }
    ),
    /* @__PURE__ */ n.jsx(
      ja,
      {
        tick: { fill: "var(--ladf-text-muted)", fontSize: 12 },
        axisLine: { stroke: "var(--ladf-border-divider)" }
      }
    ),
    f ? /* @__PURE__ */ n.jsx(le, { content: /* @__PURE__ */ n.jsx(ne, {}) }) : null,
    d.map((m, b) => {
      var j;
      const S = ((j = a == null ? void 0 : a.getColor) == null ? void 0 : j.call(a, m)) || h[m] || B(b);
      return /* @__PURE__ */ n.jsx(
        Sa,
        {
          dataKey: m,
          stroke: S,
          fill: S,
          fillOpacity: o,
          onClick: l.onClick
        },
        m
      );
    })
  ] }) }) });
}
const ui = (e, r, t) => {
  if (!e)
    return { data: [], nameKey: r, valueKey: t };
  if (Array.isArray(e)) {
    if (e.some((i) => Array.isArray(i == null ? void 0 : i.children)))
      return { data: e, nameKey: r, valueKey: t };
    const a = e.map((i) => ({
      name: i == null ? void 0 : i[r],
      value: i == null ? void 0 : i[t]
    })).filter((i) => i.name != null && i.value != null);
    return {
      data: a.length ? [{ name: "root", children: a }] : [],
      nameKey: "name",
      valueKey: "value"
    };
  }
  return Array.isArray(e.children) ? { data: [e], nameKey: r, valueKey: t } : { data: [], nameKey: r, valueKey: t };
};
function ci({
  data: e,
  encodings: r = {},
  options: t = {},
  handlers: l = {},
  colorAssignment: a
}) {
  const i = r.category || r.x || "name", u = r.value || r.y || "value", s = t.tooltip !== !1, d = t.labels === !0, f = t.colorBy === "depth", o = g(
    () => ui(e, i, u),
    [e, i, u]
  ), h = (m) => {
    var L;
    const {
      x: b,
      y: S,
      width: j,
      height: y,
      depth: x,
      index: v,
      name: N,
      children: k
    } = m;
    if (j < 4 || y < 4)
      return null;
    const T = !k || k.length === 0, D = f ? B(x) : ((L = a == null ? void 0 : a.getColor) == null ? void 0 : L.call(a, N)) || B(v), P = d && T && j > 40 && y > 18;
    return /* @__PURE__ */ n.jsxs("g", { children: [
      /* @__PURE__ */ n.jsx(
        "rect",
        {
          x: b,
          y: S,
          width: j,
          height: y,
          fill: D,
          stroke: "var(--ladf-border-divider)",
          strokeWidth: 1
        }
      ),
      P ? /* @__PURE__ */ n.jsx(
        "text",
        {
          x: b + 6,
          y: S + 16,
          fill: "var(--ladf-text-primary)",
          fontSize: 12,
          children: N
        }
      ) : null
    ] });
  };
  return /* @__PURE__ */ n.jsx(q, { children: /* @__PURE__ */ n.jsx(ae, { width: "100%", height: 280, children: /* @__PURE__ */ n.jsx(
    Na,
    {
      data: o.data,
      dataKey: o.valueKey,
      nameKey: o.nameKey,
      stroke: "var(--ladf-border-divider)",
      content: h,
      onClick: l.onClick,
      children: s ? /* @__PURE__ */ n.jsx(le, { content: /* @__PURE__ */ n.jsx(ne, {}) }) : null
    }
  ) }) });
}
const di = (e, r, t) => Array.isArray(e) ? e.map((l) => ({
  name: l == null ? void 0 : l[r],
  value: l == null ? void 0 : l[t],
  raw: l
})).filter((l) => l.name != null && l.value != null) : [];
function fi({
  data: e = [],
  encodings: r = {},
  options: t = {},
  handlers: l = {},
  colorAssignment: a
}) {
  const i = r.category || r.x || "name", u = r.value || r.y || "value", s = t.tooltip !== !1, d = t.labelMode || "name", f = t.sort || "input", o = g(() => {
    const b = di(e, i, u);
    if (f === "asc" || f === "desc") {
      const S = f === "asc" ? 1 : -1;
      return [...b].sort((j, y) => {
        const x = Number(j.value) || 0, v = Number(y.value) || 0;
        return S * (x - v);
      });
    }
    return b;
  }, [e, i, u, f]), h = g(
    () => o.reduce((b, S) => b + (Number(S.value) || 0), 0),
    [o]
  ), m = (b) => {
    const { x: S, y: j, width: y, height: x, value: v, name: N } = b;
    if (d === "none" || y < 20 || x < 12)
      return null;
    let k = "";
    if (d === "value")
      k = String(v ?? "");
    else if (d === "percent") {
      const T = h ? (Number(v) || 0) / h : 0;
      k = `${Math.round(T * 100)}%`;
    } else
      k = String(N ?? "");
    return k ? /* @__PURE__ */ n.jsx(
      "text",
      {
        x: S + y / 2,
        y: j + x / 2,
        textAnchor: "middle",
        dominantBaseline: "middle",
        fill: "var(--ladf-text-primary)",
        fontSize: 12,
        children: k
      }
    ) : null;
  };
  return /* @__PURE__ */ n.jsx(q, { children: /* @__PURE__ */ n.jsx(ae, { width: "100%", height: 280, children: /* @__PURE__ */ n.jsxs(pa, { children: [
    s ? /* @__PURE__ */ n.jsx(le, { content: /* @__PURE__ */ n.jsx(ne, {}) }) : null,
    /* @__PURE__ */ n.jsxs(
      ka,
      {
        data: o,
        dataKey: "value",
        nameKey: "name",
        onClick: l.onClick,
        children: [
          d !== "none" ? /* @__PURE__ */ n.jsx(Ea, { content: m }) : null,
          o.map((b, S) => {
            var y;
            const j = ((y = a == null ? void 0 : a.getColor) == null ? void 0 : y.call(a, b.name)) || B(S);
            return /* @__PURE__ */ n.jsx(er, { fill: j }, `funnel-${S}`);
          })
        ]
      }
    )
  ] }) }) });
}
const oi = (e) => {
  var r, t;
  return e != null && e.nodes && (e != null && e.links) ? e : Array.isArray(e) && ((r = e[0]) != null && r.nodes) && ((t = e[0]) != null && t.links) ? e[0] : null;
};
function hi({
  data: e,
  options: r = {},
  handlers: t = {},
  colorAssignment: l
}) {
  var o, h;
  const a = r.tooltip !== !1, i = r.colorBy || "node", u = g(() => oi(e), [e]), s = (m, b) => {
    var S;
    return ((S = l == null ? void 0 : l.getColor) == null ? void 0 : S.call(l, m == null ? void 0 : m.name)) || B(b);
  }, d = (m) => {
    const { x: b, y: S, width: j, height: y, index: x, payload: v } = m, N = (v == null ? void 0 : v.name) ?? (v == null ? void 0 : v.id) ?? "", k = s(v, x), T = j > 40 && y > 14;
    return /* @__PURE__ */ n.jsxs("g", { children: [
      /* @__PURE__ */ n.jsx(
        "rect",
        {
          x: b,
          y: S,
          width: j,
          height: y,
          fill: k,
          stroke: "var(--ladf-border-divider)",
          strokeWidth: 1,
          rx: 4,
          ry: 4
        }
      ),
      T ? /* @__PURE__ */ n.jsx(
        "text",
        {
          x: b + j + 6,
          y: S + y / 2,
          fill: "var(--ladf-text-muted)",
          fontSize: 12,
          dominantBaseline: "middle",
          children: N
        }
      ) : null
    ] });
  }, f = (m) => {
    const {
      sourceX: b,
      sourceY: S,
      targetX: j,
      targetY: y,
      sourceControlX: x,
      targetControlX: v,
      linkWidth: N,
      payload: k
    } = m, T = k == null ? void 0 : k.source, D = k == null ? void 0 : k.target;
    let P = "var(--ladf-border-divider)";
    i === "source" || i === "node" ? P = s(T, (T == null ? void 0 : T.index) || 0) : i === "target" && (P = s(D, (D == null ? void 0 : D.index) || 0));
    const L = `M${b},${S}C${x},${S} ${v},${y} ${j},${y}`;
    return /* @__PURE__ */ n.jsx(
      "path",
      {
        d: L,
        fill: "none",
        stroke: P,
        strokeOpacity: 0.35,
        strokeWidth: Math.max(1, N)
      }
    );
  };
  return !((o = u == null ? void 0 : u.nodes) != null && o.length) || !((h = u == null ? void 0 : u.links) != null && h.length) ? /* @__PURE__ */ n.jsxs("div", { className: "ladf-viz__missing", children: [
    /* @__PURE__ */ n.jsx("p", { className: "ladf-viz__missing-title", children: "Sankey data required" }),
    /* @__PURE__ */ n.jsx("p", { className: "ladf-viz__missing-text", children: "Provide nodes and links arrays to render a sankey diagram." })
  ] }) : /* @__PURE__ */ n.jsx(q, { children: /* @__PURE__ */ n.jsx(ae, { width: "100%", height: 280, children: /* @__PURE__ */ n.jsx(
    Ta,
    {
      data: u,
      nodePadding: 12,
      nodeWidth: 16,
      linkCurvature: 0.5,
      node: d,
      link: f,
      onClick: t.onClick,
      children: a ? /* @__PURE__ */ n.jsx(le, { content: /* @__PURE__ */ n.jsx(ne, {}) }) : null
    }
  ) }) });
}
const mi = (e, r) => e ? Array.isArray(e.y) ? e.y : e.y ? [e.y] : r != null && r.length ? Object.keys(r[0]).filter((t) => t !== e.x) : [] : [], ot = (e, r) => typeof e == "number" && Number.isFinite(e) || typeof e == "string" && e.trim() ? e : r;
function bi({
  data: e = [],
  encodings: r = {},
  options: t = {},
  handlers: l = {},
  colorAssignment: a,
  hiddenKeys: i
}) {
  var x;
  const u = (a == null ? void 0 : a.mode) === "series" || (a == null ? void 0 : a.mode) === "single" ? a.items.map((v) => v.key) : [], s = u.length ? u : mi(r, e), d = s.filter(
    (v) => !(i != null && i.has(String(v)))
  ), f = r.category || r.x, o = t.tooltip !== !1, h = t.labels === !0, m = ot(t.innerRadius, "20%"), b = ot(t.outerRadius, "80%"), S = g(
    () => ye(s),
    [s]
  ), j = (a == null ? void 0 : a.mode) === "category", y = j && (i != null && i.size) && f ? e.filter((v) => !i.has(String(v == null ? void 0 : v[f]))) : e;
  return /* @__PURE__ */ n.jsx(q, { children: /* @__PURE__ */ n.jsx(ae, { width: "100%", height: 280, children: /* @__PURE__ */ n.jsxs(
    Ca,
    {
      data: y,
      innerRadius: m,
      outerRadius: b,
      barSize: 10,
      children: [
        /* @__PURE__ */ n.jsx(Et, { stroke: "var(--ladf-chart-grid)" }),
        /* @__PURE__ */ n.jsx(
          Tt,
          {
            dataKey: f,
            tick: { fill: "var(--ladf-text-muted)", fontSize: 12 }
          }
        ),
        o ? /* @__PURE__ */ n.jsx(le, { content: /* @__PURE__ */ n.jsx(ne, {}) }) : null,
        d.length > 1 ? d.map((v, N) => {
          var k;
          return /* @__PURE__ */ n.jsx(
            Ur,
            {
              dataKey: v,
              fill: ((k = a == null ? void 0 : a.getColor) == null ? void 0 : k.call(a, v)) || S[v] || B(N),
              onClick: l.onClick,
              label: h ? { fill: "var(--ladf-text-primary)", position: "insideStart" } : !1
            },
            v
          );
        }) : /* @__PURE__ */ n.jsx(
          Ur,
          {
            dataKey: d[0] || r.value || r.y,
            fill: ((x = a == null ? void 0 : a.getColor) == null ? void 0 : x.call(a, d[0])) || B(0),
            onClick: l.onClick,
            label: h ? { fill: "var(--ladf-text-primary)", position: "insideStart" } : !1,
            children: j && f ? y.map((v, N) => {
              var D;
              const k = v == null ? void 0 : v[f], T = ((D = a == null ? void 0 : a.getColor) == null ? void 0 : D.call(a, k)) || B(N);
              return /* @__PURE__ */ n.jsx(er, { fill: T }, `cell-${N}`);
            }) : null
          }
        )
      ]
    }
  ) }) });
}
const xs = () => {
  J("line", Zl), J("area", Xl), J("bar", ql), J("barWithConditionalColoring", tn), J("bulletChart", hn), J("kpi", qn), J("pie", ri), J("scatter", ai), J("composed", ni), J("radar", si), J("treemap", ci), J("funnel", fi), J("sankey", hi), J("radialBar", bi);
}, Pr = (e, r) => {
  var a;
  if ((a = r == null ? void 0 : r.measures) != null && a.length)
    return r.measures[0];
  const t = e == null ? void 0 : e[0];
  return t && Object.keys(t).find((i) => typeof t[i] == "number") || null;
}, Ke = (e) => e == null || Number.isNaN(e) ? "0" : Number(e).toLocaleString(void 0, { maximumFractionDigits: 2 }), yi = (e, r) => (e || []).map((t) => Number(t == null ? void 0 : t[r])).filter((t) => Number.isFinite(t)), xi = ({ rows: e, querySpec: r, meta: t }) => {
  const l = Pr(e, r);
  if (!l)
    return [];
  const a = yi(e, l);
  if (a.length < 2)
    return [];
  const i = a[0], u = a[a.length - 1], s = u - i, d = i !== 0 ? s / Math.abs(i) : null, f = s > 0 ? "upward" : s < 0 ? "downward" : "flat", o = d != null ? Math.abs(d) : null, h = o == null ? "info" : o > 0.2 ? "positive" : o > 0.08 ? "info" : "neutral", m = d == null ? null : `${Math.abs(d * 100).toFixed(1)}%`, b = (t == null ? void 0 : t.rowCount) ?? (e == null ? void 0 : e.length) ?? 0, S = f === "flat" ? `The ${l} metric stayed flat across ${b} points.` : `The ${l} metric moved ${f}, changing ${m || Ke(Math.abs(s))} from ${Ke(i)} to ${Ke(u)} across ${b} points.`;
  return {
    title: `Trend is ${f}`,
    severity: h,
    narrative: S,
    recommendedAction: f === "downward" ? "Investigate recent drivers impacting the downward shift." : f === "upward" ? "Sustain the current momentum and identify leading contributors." : "Monitor for any emerging shifts over the next period.",
    evidence: [
      `Start: ${Ke(i)}`,
      `End: ${Ke(u)}`,
      m ? `Net change: ${m}` : `Net change: ${Ke(s)}`
    ]
  };
}, ht = {
  id: "trend",
  label: "Trend Summary",
  analyze: xi
}, vi = (e) => e.reduce((r, t) => r + t, 0) / e.length, _i = (e, r) => {
  const t = e.reduce((l, a) => l + (a - r) ** 2, 0) / e.length;
  return Math.sqrt(t);
}, ji = ({ rows: e, querySpec: r }) => {
  const t = Pr(e, r);
  if (!t)
    return [];
  const l = (e || []).map((d) => Number(d == null ? void 0 : d[t])).filter((d) => Number.isFinite(d));
  if (l.length < 5)
    return [];
  const a = l[l.length - 1], i = vi(l.slice(0, -1)), u = _i(l.slice(0, -1), i);
  if (u === 0)
    return [];
  const s = (a - i) / u;
  return Math.abs(s) < 2.2 ? [] : {
    title: "Recent anomaly detected",
    severity: s > 0 ? "warning" : "negative",
    narrative: `The latest ${t} value deviates from the recent average by ${Math.abs(s).toFixed(1)} standard deviations.`,
    recommendedAction: "Review the contributing drivers behind this spike or dip.",
    evidence: [
      `Latest value: ${a.toLocaleString()}`,
      `Recent average: ${i.toFixed(1)}`
    ]
  };
}, mt = {
  id: "anomaly",
  label: "Anomaly Detection",
  analyze: ji
}, Si = ({ rows: e, querySpec: r }) => {
  var o;
  const t = (o = r == null ? void 0 : r.dimensions) == null ? void 0 : o[0], l = Pr(e, r);
  if (!t || !l)
    return [];
  const a = (e || []).filter((h) => h && h[t] != null);
  if (a.length < 2)
    return [];
  const i = a.reduce((h, m) => h + Number(m[l] || 0), 0);
  if (!i)
    return [];
  const u = [...a].sort((h, m) => (m[l] || 0) - (h[l] || 0)), s = u[0], d = Number(s[l] || 0) / i;
  if (d < 0.2)
    return [];
  const f = u.slice(0, 3).map((h) => {
    const m = Number(h[l] || 0), b = i ? `${(m / i * 100).toFixed(1)}%` : "0%";
    return `${h[t]}: ${m.toLocaleString()} (${b})`;
  });
  return {
    title: `Top driver: ${s[t]}`,
    severity: "info",
    narrative: `${s[t]} contributes ${(d * 100).toFixed(1)}% of ${l}.`,
    recommendedAction: `Validate why ${s[t]} is outpacing other segments and replicate the drivers if positive.`,
    evidence: f
  };
}, bt = {
  id: "topDrivers",
  label: "Top Drivers",
  analyze: Si
}, vs = () => {
  _r(ht.id, ht), _r(mt.id, mt), _r(bt.id, bt);
}, Ni = 12, sr = (e, r) => typeof e != "number" || Number.isNaN(e) ? r : e > 0 ? e : r, pi = (e) => {
  if (!e)
    return "ladf-grid__item";
  const r = sr(e.x, 1), t = sr(e.y, 1), l = sr(e.w, Ni), a = sr(e.h, 1);
  return [
    "ladf-grid__item",
    `ladf-grid__item--col-start-${r}`,
    `ladf-grid__item--col-span-${l}`,
    `ladf-grid__item--row-start-${t}`,
    `ladf-grid__item--row-span-${a}`
  ].join(" ");
};
function _s({ panels: e, renderPanel: r, className: t }) {
  const l = ["ladf-grid", t].filter(Boolean).join(" ");
  return /* @__PURE__ */ n.jsx("div", { className: l, children: e.map((a) => /* @__PURE__ */ n.jsx("div", { className: pi(a.layout), children: r(a) }, a.id)) });
}
function js({
  title: e,
  subtitle: r,
  actions: t,
  className: l,
  hideHeader: a = !1,
  chromeless: i = !1,
  status: u,
  error: s,
  isEmpty: d,
  emptyMessage: f,
  footer: o,
  children: h
}) {
  const m = [
    "ladf-panel",
    i ? "ladf-panel--chromeless" : null,
    l
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ n.jsxs("section", { className: m, children: [
    a ? null : /* @__PURE__ */ n.jsx(Za, { title: e, subtitle: r, actions: t }),
    /* @__PURE__ */ n.jsx(
      Ga,
      {
        status: u,
        error: s,
        isEmpty: d,
        emptyMessage: f,
        children: h
      }
    ),
    o ? /* @__PURE__ */ n.jsx("div", { className: "ladf-panel__footer", children: o }) : null
  ] });
}
const ki = "Something went wrong", Ei = "An unexpected error occurred. You can try reloading the page to continue.";
class Ss extends Lr.Component {
  constructor(r) {
    super(r), this.state = { hasError: !1, error: null }, this.handleReset = this.handleReset.bind(this);
  }
  /**
   * Updates local state so the fallback UI renders after an error.
   *
   * @param {Error} error
   * @returns {{hasError: boolean, error: Error}}
   */
  static getDerivedStateFromError(r) {
    return { hasError: !0, error: r };
  }
  /**
   * Lifecycle hook invoked after an error is thrown within children.
   *
   * @param {Error} error
   * @param {React.ErrorInfo} info
   * @returns {void}
   */
  componentDidCatch(r, t) {
    this.props.onError && this.props.onError(r, t);
  }
  /**
   * Resets the boundary to render children again.
   *
   * @returns {void}
   */
  handleReset() {
    this.setState({ hasError: !1, error: null }), this.props.onReset && this.props.onReset();
  }
  /**
   * Renders children or fallback UI when an error has been caught.
   *
   * Uses:
   * - `ladf-error-boundary`
   * - `ladf-error-boundary__content`
   * - `ladf-error-boundary__title`
   * - `ladf-error-boundary__message`
   * - `ladf-error-boundary__action`
   *
   * @returns {JSX.Element | React.ReactNode}
   */
  render() {
    const { hasError: r } = this.state;
    if (!r)
      return this.props.children;
    const t = this.props.title || ki, l = this.props.message || Ei;
    return /* @__PURE__ */ n.jsx("section", { className: "ladf-error-boundary", children: /* @__PURE__ */ n.jsxs("div", { className: "ladf-error-boundary__content", children: [
      /* @__PURE__ */ n.jsx("h2", { className: "ladf-error-boundary__title", children: t }),
      /* @__PURE__ */ n.jsx("p", { className: "ladf-error-boundary__message", children: l }),
      /* @__PURE__ */ n.jsx(
        "button",
        {
          className: "ladf-button ladf-error-boundary__action",
          type: "button",
          onClick: this.handleReset,
          children: "Reload dashboard"
        }
      )
    ] }) });
  }
}
const Ti = /* @__PURE__ */ new Set(["kpi", "kpiVariant", "text", "metric", "number", "markdown"]), Ci = /* @__PURE__ */ new Set(["line", "area", "composed", "time-series", "timeseries"]), gi = /* @__PURE__ */ new Set(["line", "area", "time-series", "timeseries"]), Di = /* @__PURE__ */ new Set(["bar", "column", "histogram"]), Li = /* @__PURE__ */ new Set(["pie", "donut"]), Ri = /* @__PURE__ */ new Set(["scatter"]), Ii = /* @__PURE__ */ new Set(["radar"]), $i = /* @__PURE__ */ new Set(["treemap"]), Fi = /* @__PURE__ */ new Set(["funnel"]), Pi = /* @__PURE__ */ new Set(["sankey"]), Mi = /* @__PURE__ */ new Set(["radialBar"]), Vi = /* @__PURE__ */ new Set(["heatmap", "choropleth", "density"]), he = (e) => e == null ? null : String(e), ze = (e) => {
  if (!Array.isArray(e))
    return [];
  const r = /* @__PURE__ */ new Set(), t = [];
  return e.forEach((l) => {
    const a = he(l);
    !a || r.has(a) || (r.add(a), t.push(a));
  }), t;
}, Nr = (e) => {
  const r = ze(e);
  return r.length ? {
    mode: "category",
    ...ue({ seriesKeys: r, seriesDefinitions: [] })
  } : null;
}, wi = (e, r = "name") => Array.isArray(e) ? e.some((l) => Array.isArray(l == null ? void 0 : l.children)) ? e.map((l) => (l == null ? void 0 : l.name) ?? (l == null ? void 0 : l[r])) : e.map((l) => (l == null ? void 0 : l[r]) ?? (l == null ? void 0 : l.name)) : Array.isArray(e == null ? void 0 : e.children) ? e.children.map((t) => t == null ? void 0 : t.name) : [], Oi = (e, r) => Array.isArray(e) ? e.map((t) => (t == null ? void 0 : t[r]) ?? (t == null ? void 0 : t.name)) : [], Ki = (e) => e != null && e.nodes ? e.nodes.map((r) => (r == null ? void 0 : r.name) ?? (r == null ? void 0 : r.id)) : [], Gt = (e) => Array.isArray(e == null ? void 0 : e.series) ? e.series.map((r) => ({
  key: he(r == null ? void 0 : r.key),
  label: (r == null ? void 0 : r.label) ?? he(r == null ? void 0 : r.key)
})).filter((r) => r.key) : [], zi = ({ encodings: e, options: r, panelConfig: t, data: l }) => {
  const a = Gt(t);
  if (a.length)
    return a.map((i) => i.key);
  if (Array.isArray(r == null ? void 0 : r.seriesKeys) && r.seriesKeys.length)
    return ze(r.seriesKeys);
  if (Array.isArray(r == null ? void 0 : r.stackedKeys) && r.stackedKeys.length)
    return ze(r.stackedKeys);
  if (Array.isArray(e == null ? void 0 : e.y))
    return ze(e.y);
  if (e != null && e.y)
    return ze([e.y]);
  if (Array.isArray(l) && l.length > 0) {
    const i = l[0] || {};
    return ze(Object.keys(i).filter((u) => u !== (e == null ? void 0 : e.x)));
  }
  return [];
}, yt = (e) => Array.isArray(e == null ? void 0 : e.y) ? e.y[0] : (e == null ? void 0 : e.y) ?? null, Bi = ({ panelConfig: e, vizType: r, options: t }) => e != null && e.paletteIntent ? e.paletteIntent : (t == null ? void 0 : t.diverging) === !0 ? "diverging" : Vi.has(r) ? "sequential" : "categorical", ue = ({ seriesKeys: e, seriesDefinitions: r }) => {
  const t = new Map(r.map((i) => [i.key, i.label])), l = e.map((i, u) => ({
    key: i,
    label: t.get(i) ?? i,
    colorVar: De(u)
  })), a = new Map(l.map((i) => [i.key, i.colorVar]));
  return {
    items: l,
    getColor: (i) => a.get(he(i)) ?? De(0),
    getLabel: (i) => t.get(he(i)) ?? he(i)
  };
}, Qe = ({ data: e, xKey: r }) => {
  const t = Array.isArray(e) ? e.map((s) => s == null ? void 0 : s[r]).filter((s) => s != null) : [], l = Array.from(new Set(t)), a = l.every((s) => typeof s == "number");
  l.sort((s, d) => a ? s - d : String(s).localeCompare(String(d), void 0, { numeric: !0 }));
  const i = l.map((s, d) => {
    const f = he(s);
    return {
      key: f,
      label: f,
      colorVar: De(d)
    };
  }), u = new Map(i.map((s) => [s.key, s.colorVar]));
  return {
    items: i,
    getColor: (s) => u.get(he(s)) ?? De(0),
    getLabel: (s) => he(s)
  };
}, Wi = ({ data: e, valueKey: r }) => {
  const t = Array.isArray(e) ? e.map((f) => f == null ? void 0 : f[r]).filter((f) => typeof f == "number" && Number.isFinite(f)) : [];
  let l = 0, a = 0;
  t.forEach((f) => {
    l = Math.min(l, f), a = Math.max(a, f);
  });
  const i = Math.max(Math.abs(l), Math.abs(a)), u = l < 0 && a > 0;
  return {
    items: [
      { key: "neg", label: "Negative", colorVar: Oe("neg", 3) },
      { key: "zero", label: "Neutral", colorVar: Oe("zero") },
      { key: "pos", label: "Positive", colorVar: Oe("pos", 3) }
    ],
    getColor: (f) => {
      if (!u || !Number.isFinite(f))
        return De(0);
      if (f === 0)
        return Oe("zero");
      if (i === 0)
        return Oe(f < 0 ? "neg" : "pos", 1);
      const o = Math.min(1, Math.abs(f) / i), h = Math.max(1, Math.ceil(o * 4));
      return Oe(f < 0 ? "neg" : "pos", h);
    },
    getLabel: (f) => f === "neg" ? "Negative" : f === "pos" ? "Positive" : f === "zero" ? "Neutral" : null
  };
}, Ui = ({ data: e, valueKey: r }) => {
  const t = Array.isArray(e) ? e.map((s) => s == null ? void 0 : s[r]).filter((s) => typeof s == "number" && Number.isFinite(s)) : [];
  let l = 0, a = 0;
  t.forEach((s) => {
    l = Math.min(l, s), a = Math.max(a, s);
  });
  const i = a - l;
  return {
    items: [],
    getColor: (s) => {
      if (!Number.isFinite(s))
        return jr(1);
      if (i === 0)
        return jr(5);
      const d = (s - l) / i, f = Math.max(1, Math.min(9, Math.ceil(d * 9)));
      return jr(f);
    },
    getLabel: () => null
  };
}, Yi = ({
  panelConfig: e,
  vizType: r,
  encodings: t,
  options: l,
  data: a
}) => {
  if ((e == null ? void 0 : e.panelType) !== "viz" || Ti.has(r))
    return null;
  const i = Bi({ panelConfig: e, vizType: r, options: l });
  if (i === "none")
    return null;
  const u = Gt(e), s = zi({ encodings: t, options: l, panelConfig: e, data: a }), d = u.length > 0 || Array.isArray(t == null ? void 0 : t.y) || Array.isArray(l == null ? void 0 : l.seriesKeys) && l.seriesKeys.length > 1 || Array.isArray(l == null ? void 0 : l.stackedKeys) && l.stackedKeys.length > 0;
  if (i === "diverging" && (l == null ? void 0 : l.diverging) === !0) {
    const o = yt(t);
    return {
      mode: "diverging",
      ...Wi({ data: a, valueKey: o })
    };
  }
  if (i === "sequential") {
    const o = yt(t);
    return {
      mode: "sequential",
      ...Ui({ data: a, valueKey: o })
    };
  }
  if (Ci.has(r)) {
    const o = (t == null ? void 0 : t.group) || (l == null ? void 0 : l.seriesBy);
    return gi.has(r) && o && !Array.isArray(t == null ? void 0 : t.y) ? {
      mode: "category",
      ...Qe({ data: a, xKey: o })
    } : d ? {
      mode: "series",
      ...ue({ seriesKeys: s, seriesDefinitions: u })
    } : { mode: "single", ...ue({
      seriesKeys: s.slice(0, 1),
      seriesDefinitions: u
    }) };
  }
  if (Di.has(r))
    return d ? {
      mode: "series",
      ...ue({ seriesKeys: s, seriesDefinitions: u })
    } : (l == null ? void 0 : l.colorBy) === "category" || (l == null ? void 0 : l.legendMode) === "category" || (l == null ? void 0 : l.legend) === !0 ? {
      mode: "category",
      ...Qe({ data: a, xKey: t == null ? void 0 : t.x })
    } : { mode: "single", ...ue({
      seriesKeys: s.slice(0, 1),
      seriesDefinitions: u
    }) };
  if (Li.has(r))
    return {
      mode: "category",
      ...Qe({ data: a, xKey: (t == null ? void 0 : t.category) ?? (t == null ? void 0 : t.x) })
    };
  if (Ri.has(r)) {
    if (t != null && t.group)
      return {
        mode: "category",
        ...Qe({ data: a, xKey: t.group })
      };
    const o = (t == null ? void 0 : t.y) ?? "value";
    return {
      mode: "single",
      ...ue({
        seriesKeys: [o],
        seriesDefinitions: u
      })
    };
  }
  if (Ii.has(r))
    return s.length > 1 ? {
      mode: "series",
      ...ue({ seriesKeys: s, seriesDefinitions: u })
    } : { mode: "single", ...ue({
      seriesKeys: s.slice(0, 1),
      seriesDefinitions: u
    }) };
  if ($i.has(r)) {
    const o = (t == null ? void 0 : t.category) || (t == null ? void 0 : t.x) || "name";
    return Nr(wi(a, o));
  }
  if (Fi.has(r)) {
    const o = (t == null ? void 0 : t.category) || (t == null ? void 0 : t.x) || "name";
    return Nr(Oi(a, o));
  }
  return Pi.has(r) ? Nr(Ki(a)) : Mi.has(r) ? d ? {
    mode: "series",
    ...ue({ seriesKeys: s, seriesDefinitions: u })
  } : {
    mode: "category",
    ...Qe({
      data: a,
      xKey: (t == null ? void 0 : t.category) || (t == null ? void 0 : t.x)
    })
  } : s.length > 1 ? {
    mode: "series",
    ...ue({ seriesKeys: s, seriesDefinitions: u })
  } : { mode: "single", ...ue({
    seriesKeys: s.slice(0, 1),
    seriesDefinitions: u
  }) };
}, Gi = (e) => {
  if (typeof e != "string")
    return "ladf-swatch--1";
  const r = e.match(/--ladf-series-(\d+)/);
  if (r)
    return `ladf-swatch--${r[1]}`;
  const t = e.match(/--ladf-seq-(\d+)/);
  if (t)
    return `ladf-swatch--seq-${t[1]}`;
  const l = e.match(/--ladf-div-neg-(\d+)/);
  if (l)
    return `ladf-swatch--div-neg-${l[1]}`;
  const a = e.match(/--ladf-div-pos-(\d+)/);
  return a ? `ladf-swatch--div-pos-${a[1]}` : e.includes("--ladf-div-zero") ? "ladf-swatch--div-zero" : "ladf-swatch--1";
};
function Zi({
  items: e = [],
  hiddenKeys: r,
  onToggle: t,
  position: l = "bottom"
}) {
  if (!e.length)
    return null;
  const a = typeof t == "function";
  return /* @__PURE__ */ n.jsx("div", { className: ["ladf-legend", `ladf-legend--${l}`].join(" "), children: /* @__PURE__ */ n.jsx("ul", { className: "ladf-legend__list", children: e.map((i) => {
    const u = r == null ? void 0 : r.has(i.key), s = Gi(i.colorVar);
    return /* @__PURE__ */ n.jsx(
      "li",
      {
        className: [
          "ladf-legend__item",
          s,
          a ? "ladf-legend__item--toggleable" : "",
          u ? "ladf-legend__item--hidden" : ""
        ].filter(Boolean).join(" "),
        children: /* @__PURE__ */ n.jsxs(
          "button",
          {
            className: "ladf-legend__button",
            type: "button",
            onClick: () => {
              a && t(i.key);
            },
            children: [
              /* @__PURE__ */ n.jsx("span", { className: "ladf-legend__swatch" }),
              /* @__PURE__ */ n.jsx("span", { className: "ladf-legend__label", children: i.label })
            ]
          }
        )
      },
      i.key
    );
  }) }) });
}
function Ns({
  panelConfig: e,
  vizType: r,
  data: t,
  encodings: l,
  options: a,
  handlers: i
}) {
  const u = Mt.get(r), s = g(
    () => Yi({
      panelConfig: e,
      vizType: r,
      encodings: l,
      options: a,
      data: t
    }),
    [e, r, l, a, t]
  ), [d, f] = Rr(/* @__PURE__ */ new Set()), o = g(() => (s == null ? void 0 : s.items) ?? [], [s]), h = (a == null ? void 0 : a.legendMode) ?? "auto", m = (a == null ? void 0 : a.legendPosition) ?? "bottom", b = (a == null ? void 0 : a.legend) !== !1 && o.length > 0 && (h !== "auto" || o.length > 1), S = (s == null ? void 0 : s.mode) === "series" || (s == null ? void 0 : s.mode) === "category", j = ce(
    (N) => {
      S && f((k) => {
        const T = new Set(k);
        return T.has(N) ? T.delete(N) : T.add(N), T;
      });
    },
    [S]
  );
  if (St(() => {
    if (!d.size)
      return;
    const N = new Set(o.map((T) => T.key)), k = [...d].filter((T) => N.has(T));
    k.length !== d.size && f(new Set(k));
  }, [o, d]), !u)
    return /* @__PURE__ */ n.jsxs("div", { className: "ladf-viz__missing", children: [
      /* @__PURE__ */ n.jsx("p", { className: "ladf-viz__missing-title", children: "Visualization unavailable" }),
      /* @__PURE__ */ n.jsxs("p", { className: "ladf-viz__missing-text", children: [
        'The viz type "',
        r,
        '" has not been registered yet.'
      ] })
    ] });
  const y = m === "right" ? "ladf-viz__layout ladf-viz__layout--right" : "ladf-viz__layout", x = b ? /* @__PURE__ */ n.jsx(
    Zi,
    {
      items: o,
      hiddenKeys: d,
      onToggle: S ? j : void 0,
      position: m
    }
  ) : null, v = /* @__PURE__ */ n.jsx(
    u,
    {
      data: t,
      encodings: l,
      options: a,
      handlers: i,
      panelConfig: e,
      colorAssignment: s,
      hiddenKeys: d
    }
  );
  return /* @__PURE__ */ n.jsxs("div", { className: y, children: [
    m === "top" ? x : null,
    v,
    m !== "top" ? x : null
  ] });
}
const Hi = (e = []) => e.length ? /* @__PURE__ */ n.jsx("ul", { className: "ladf-insight-card__evidence", children: e.map((r, t) => /* @__PURE__ */ n.jsx("li", { className: "ladf-insight-card__evidence-item", children: r }, `${r}-${t}`)) }) : null;
function ps({ insights: e = [] }) {
  return /* @__PURE__ */ n.jsx("div", { className: "ladf-insights", children: e.map((r) => /* @__PURE__ */ n.jsxs(
    "article",
    {
      className: `ladf-insight-card ladf-insight-card--${r.severity || "info"}`,
      children: [
        /* @__PURE__ */ n.jsxs("header", { className: "ladf-insight-card__header", children: [
          /* @__PURE__ */ n.jsxs("div", { children: [
            /* @__PURE__ */ n.jsx("h3", { className: "ladf-insight-card__title", children: r.title }),
            r.source ? /* @__PURE__ */ n.jsxs("p", { className: "ladf-insight-card__source", children: [
              "Source: ",
              r.source
            ] }) : null
          ] }),
          r.severity ? /* @__PURE__ */ n.jsx("span", { className: "ladf-insight-card__badge", children: r.severity }) : null
        ] }),
        r.narrative ? /* @__PURE__ */ n.jsx("p", { className: "ladf-insight-card__narrative", children: r.narrative }) : null,
        Hi(r.evidence),
        r.recommendedAction ? /* @__PURE__ */ n.jsxs("p", { className: "ladf-insight-card__action", children: [
          /* @__PURE__ */ n.jsx("strong", { children: "Recommended:" }),
          " ",
          r.recommendedAction
        ] }) : null
      ]
    },
    r.id
  )) });
}
const Zt = (e) => Array.isArray(e) ? e : e ? [e] : [], Xi = ({ insight: e, fallbackId: r, analyzerId: t, analyzerLabel: l }) => {
  if (!e || typeof e != "object")
    return null;
  const a = e.title || l || "Insight";
  return {
    id: e.id || r,
    title: a,
    severity: e.severity || "info",
    narrative: e.narrative || "",
    recommendedAction: e.recommendedAction || null,
    evidence: Zt(e.evidence),
    source: e.source || t
  };
}, Ai = {
  /**
   * Run analyzers and normalize the resulting insights for rendering.
   * @param {InsightEngineParams} params - Input data and analyzer list.
   * @returns {Insight[]} Normalized insights.
   */
  analyze({ rows: e = [], meta: r = null, querySpec: t = null, dashboardState: l = null, analyzers: a = [] }) {
    const i = { rows: e, meta: r, querySpec: t, dashboardState: l };
    return a.flatMap((u, s) => {
      if (!u || typeof u.analyze != "function")
        return [];
      const d = u.analyze(i);
      return Zt(d).map(
        (o, h) => Xi({
          insight: o,
          analyzerId: u.id,
          analyzerLabel: u.label,
          fallbackId: `${u.id || "insight"}-${s}-${h}`
        })
      ).filter(Boolean);
    });
  }
}, Ji = (e) => Array.isArray(e) && e.length ? e : Cr.list().map((r) => Cr.get(r)).filter(Boolean), ks = ({
  rows: e = [],
  meta: r = null,
  querySpec: t = null,
  dashboardState: l = null,
  analyzers: a,
  enabled: i = !0
} = {}) => {
  const u = g(() => Ji(a), [a]), s = g(() => i ? Ai.analyze({
    rows: e,
    meta: r,
    querySpec: t,
    dashboardState: l,
    analyzers: u
  }) : [], [e, r, t, l, u, i]);
  return {
    insights: s,
    hasInsights: s.length > 0
  };
}, Es = ({ drillPath: e = [], onCrumbClick: r, onReset: t }) => e.length ? /* @__PURE__ */ n.jsxs("div", { className: "ladf-drill", children: [
  /* @__PURE__ */ n.jsx("span", { className: "ladf-drill__title", children: "Drill path" }),
  /* @__PURE__ */ n.jsx("div", { className: "ladf-drill__crumbs", children: e.map((l, a) => /* @__PURE__ */ n.jsx(
    "button",
    {
      type: "button",
      className: "ladf-drill__crumb",
      onClick: () => r == null ? void 0 : r(a),
      children: Ir(l)
    },
    l.id || `${l.dimension}-${a}`
  )) }),
  /* @__PURE__ */ n.jsx("button", { type: "button", className: "ladf-drill__reset", onClick: t, children: "Reset" })
] }) : null, xt = (e, r, t) => Math.min(t, Math.max(r, e)), Ts = ({ data: e, startIndex: r, endIndex: t, xKey: l }) => {
  var o, h;
  if (!Array.isArray(e) || e.length === 0 || !l)
    return null;
  const a = xt(r ?? 0, 0, e.length - 1), i = xt(t ?? e.length - 1, 0, e.length - 1), u = Math.min(a, i), s = Math.max(a, i), d = (o = e[u]) == null ? void 0 : o[l], f = (h = e[s]) == null ? void 0 : h[l];
  return d === void 0 || f === void 0 ? null : {
    startIndex: u,
    endIndex: s,
    startValue: d,
    endValue: f
  };
}, Cs = (e) => e ? e.startValue === e.endValue ? `${e.startValue}` : `${e.startValue} – ${e.endValue}` : "Full range", gs = ({ field: e, range: r }) => {
  if (!e || !r || r.startValue === void 0 || r.endValue === void 0)
    return null;
  const [t, l] = r.startValue <= r.endValue ? [r.startValue, r.endValue] : [r.endValue, r.startValue];
  return {
    field: e,
    op: "BETWEEN",
    values: [t, l]
  };
}, Ds = (e = [], r) => r ? [
  ...e.filter((t) => t.field !== r.field),
  r
] : e, Ls = (e = [], r) => r ? e.filter((t) => t.field !== r) : e, Qi = /* @__PURE__ */ new Set(["kpi", "kpiVariant", "text", "metric", "number", "markdown"]), qi = /* @__PURE__ */ new Set(["heatmap", "choropleth", "density"]), es = ({ panelConfig: e, vizType: r }) => (e == null ? void 0 : e.vizRole) === "text" || Qi.has(r), vt = ({ panelConfig: e, vizType: r, options: t }) => e != null && e.paletteIntent ? e.paletteIntent : (t == null ? void 0 : t.diverging) === !0 ? "diverging" : qi.has(r) ? "sequential" : "categorical", rs = (e) => e === "diverging" ? "rdylgn" : e === "sequential" ? "viridis" : "analytics", Rs = ({ panelConfig: e, vizType: r, encodings: t, options: l, data: a }) => {
  if ((e == null ? void 0 : e.panelType) !== "viz" || es({ panelConfig: e, vizType: r }) || (e == null ? void 0 : e.paletteIntent) === "none")
    return null;
  if (e != null && e.paletteId)
    return {
      paletteId: e.paletteId,
      paletteClass: et(e.paletteId),
      intent: vt({ panelConfig: e, vizType: r, options: l })
    };
  const i = vt({ panelConfig: e, vizType: r, options: l });
  if (i === "none")
    return null;
  const u = rs(i);
  return {
    paletteId: u,
    paletteClass: et(u),
    intent: i
  };
}, Is = ({
  id: e,
  label: r,
  dimensions: t = [],
  metrics: l = [],
  hierarchies: a = [],
  defaultGrain: i = null,
  timezone: u = "UTC"
} = {}) => {
  if (!e)
    throw new Error("Dataset requires an id");
  if (!r)
    throw new Error(`Dataset ${e} requires a label`);
  const s = Object.fromEntries(
    t.map((f) => [f.id, f])
  ), d = Object.fromEntries(
    l.map((f) => [f.id, f])
  );
  return {
    id: e,
    label: r,
    dimensions: t,
    metrics: l,
    hierarchies: a,
    defaultGrain: i,
    timezone: u,
    fields: {
      dimensions: t,
      metrics: l,
      dimensionById: s,
      metricById: d
    }
  };
}, $s = ({ id: e, type: r, levels: t, label: l }) => ({
  id: e,
  type: r,
  levels: t,
  label: l || e
}), Ht = {
  STRING: "string",
  NUMBER: "number",
  DATE: "date",
  BOOLEAN: "boolean",
  GEO: "geo"
}, ts = Object.values(Ht), as = (e) => ts.includes(e), Fs = ({ id: e, label: r, type: t, hierarchy: l, formatter: a } = {}) => {
  if (!e)
    throw new Error("Dimension requires an id");
  if (!r)
    throw new Error(`Dimension ${e} requires a label`);
  if (!as(t))
    throw new Error(
      `Dimension ${e} has invalid type. Expected one of ${Object.values(
        Ht
      ).join(", ")}.`
    );
  return {
    id: e,
    label: r,
    type: t,
    hierarchy: l || null,
    formatter: a || null
  };
}, Ps = ({
  id: e,
  label: r,
  format: t,
  dependsOn: l,
  query: a,
  compute: i,
  validGrains: u,
  constraints: s
} = {}) => {
  if (!e)
    throw new Error("Metric requires an id");
  if (!r)
    throw new Error(`Metric ${e} requires a label`);
  if (!a && !i)
    throw new Error(`Metric ${e} must define query or compute`);
  return {
    id: e,
    label: r,
    format: t || "number",
    dependsOn: l || [],
    query: a || null,
    compute: i || null,
    validGrains: u || [],
    constraints: s || null
  };
};
export {
  is as DashboardProvider,
  It as DataProvider,
  Es as DrillBreadcrumbs,
  Ss as ErrorBoundary,
  Ht as FIELD_TYPES,
  _s as GridLayout,
  ps as InsightsPanel,
  bs as MockDataProvider,
  js as Panel,
  Ga as PanelBody,
  Za as PanelHeader,
  Ns as VizRenderer,
  qa as applyDrilldownToDimensions,
  vl as assertDataProvider,
  gs as buildBrushFilter,
  cs as buildCrossFilterSelectionFromEvent,
  fs as buildDrilldownEntryFromEvent,
  tl as buildQuerySpec,
  It as createDataProvider,
  Is as createDataset,
  Fs as createDimension,
  $s as createHierarchy,
  Ps as createMetric,
  ms as createMultiDataProvider,
  hs as dashboardSelectors,
  Cs as formatBrushRangeLabel,
  Ts as getBrushRange,
  kr as isDataProvider,
  os as isDrilldownDuplicate,
  ds as isSelectionDuplicate,
  xs as registerCharts,
  vs as registerInsights,
  Ls as removeBrushFilter,
  Rs as resolvePalette,
  Ds as upsertBrushFilter,
  us as useDashboardActions,
  ss as useDashboardState,
  ks as useInsights,
  ys as useQuery
};
