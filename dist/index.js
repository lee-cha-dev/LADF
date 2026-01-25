import we, { createContext as gr, useReducer as St, useMemo as k, useContext as xr, useRef as jt, useState as Sr, useCallback as jr, useEffect as Rr } from "react";
import { ResponsiveContainer as Nr, LineChart as Rt, CartesianGrid as Tr, XAxis as Dr, YAxis as wr, Tooltip as Pr, Line as Nt, Brush as Tt, BarChart as Dt, Bar as ar, Cell as wt } from "recharts";
var Re = { exports: {} }, re = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var nr;
function Pt() {
  if (nr) return re;
  nr = 1;
  var e = we, r = Symbol.for("react.element"), t = Symbol.for("react.fragment"), a = Object.prototype.hasOwnProperty, n = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, l = { key: !0, ref: !0, __self: !0, __source: !0 };
  function o(i, d, f) {
    var h, v = {}, y = null, T = null;
    f !== void 0 && (y = "" + f), d.key !== void 0 && (y = "" + d.key), d.ref !== void 0 && (T = d.ref);
    for (h in d) a.call(d, h) && !l.hasOwnProperty(h) && (v[h] = d[h]);
    if (i && i.defaultProps) for (h in d = i.defaultProps, d) v[h] === void 0 && (v[h] = d[h]);
    return { $$typeof: r, type: i, key: y, ref: T, props: v, _owner: n.current };
  }
  return re.Fragment = t, re.jsx = o, re.jsxs = o, re;
}
var te = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var sr;
function It() {
  return sr || (sr = 1, process.env.NODE_ENV !== "production" && function() {
    var e = we, r = Symbol.for("react.element"), t = Symbol.for("react.portal"), a = Symbol.for("react.fragment"), n = Symbol.for("react.strict_mode"), l = Symbol.for("react.profiler"), o = Symbol.for("react.provider"), i = Symbol.for("react.context"), d = Symbol.for("react.forward_ref"), f = Symbol.for("react.suspense"), h = Symbol.for("react.suspense_list"), v = Symbol.for("react.memo"), y = Symbol.for("react.lazy"), T = Symbol.for("react.offscreen"), w = Symbol.iterator, _ = "@@iterator";
    function x(s) {
      if (s === null || typeof s != "object")
        return null;
      var c = w && s[w] || s[_];
      return typeof c == "function" ? c : null;
    }
    var E = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function N(s) {
      {
        for (var c = arguments.length, m = new Array(c > 1 ? c - 1 : 0), b = 1; b < c; b++)
          m[b - 1] = arguments[b];
        j("error", s, m);
      }
    }
    function j(s, c, m) {
      {
        var b = E.ReactDebugCurrentFrame, S = b.getStackAddendum();
        S !== "" && (c += "%s", m = m.concat([S]));
        var R = m.map(function(g) {
          return String(g);
        });
        R.unshift("Warning: " + c), Function.prototype.apply.call(console[s], console, R);
      }
    }
    var L = !1, I = !1, B = !1, M = !1, le = !1, $e;
    $e = Symbol.for("react.module.reference");
    function Jr(s) {
      return !!(typeof s == "string" || typeof s == "function" || s === a || s === l || le || s === n || s === f || s === h || M || s === T || L || I || B || typeof s == "object" && s !== null && (s.$$typeof === y || s.$$typeof === v || s.$$typeof === o || s.$$typeof === i || s.$$typeof === d || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      s.$$typeof === $e || s.getModuleId !== void 0));
    }
    function Qr(s, c, m) {
      var b = s.displayName;
      if (b)
        return b;
      var S = c.displayName || c.name || "";
      return S !== "" ? m + "(" + S + ")" : m;
    }
    function Oe(s) {
      return s.displayName || "Context";
    }
    function z(s) {
      if (s == null)
        return null;
      if (typeof s.tag == "number" && N("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof s == "function")
        return s.displayName || s.name || null;
      if (typeof s == "string")
        return s;
      switch (s) {
        case a:
          return "Fragment";
        case t:
          return "Portal";
        case l:
          return "Profiler";
        case n:
          return "StrictMode";
        case f:
          return "Suspense";
        case h:
          return "SuspenseList";
      }
      if (typeof s == "object")
        switch (s.$$typeof) {
          case i:
            var c = s;
            return Oe(c) + ".Consumer";
          case o:
            var m = s;
            return Oe(m._context) + ".Provider";
          case d:
            return Qr(s, s.render, "ForwardRef");
          case v:
            var b = s.displayName || null;
            return b !== null ? b : z(s.type) || "Memo";
          case y: {
            var S = s, R = S._payload, g = S._init;
            try {
              return z(g(R));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var K = Object.assign, q = 0, Le, Fe, Ae, Ce, ke, Me, Ve;
    function ze() {
    }
    ze.__reactDisabledLog = !0;
    function Xr() {
      {
        if (q === 0) {
          Le = console.log, Fe = console.info, Ae = console.warn, Ce = console.error, ke = console.group, Me = console.groupCollapsed, Ve = console.groupEnd;
          var s = {
            configurable: !0,
            enumerable: !0,
            value: ze,
            writable: !0
          };
          Object.defineProperties(console, {
            info: s,
            log: s,
            warn: s,
            error: s,
            group: s,
            groupCollapsed: s,
            groupEnd: s
          });
        }
        q++;
      }
    }
    function Zr() {
      {
        if (q--, q === 0) {
          var s = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: K({}, s, {
              value: Le
            }),
            info: K({}, s, {
              value: Fe
            }),
            warn: K({}, s, {
              value: Ae
            }),
            error: K({}, s, {
              value: Ce
            }),
            group: K({}, s, {
              value: ke
            }),
            groupCollapsed: K({}, s, {
              value: Me
            }),
            groupEnd: K({}, s, {
              value: Ve
            })
          });
        }
        q < 0 && N("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var me = E.ReactCurrentDispatcher, ve;
    function ie(s, c, m) {
      {
        if (ve === void 0)
          try {
            throw Error();
          } catch (S) {
            var b = S.stack.trim().match(/\n( *(at )?)/);
            ve = b && b[1] || "";
          }
        return `
` + ve + s;
      }
    }
    var be = !1, oe;
    {
      var Hr = typeof WeakMap == "function" ? WeakMap : Map;
      oe = new Hr();
    }
    function Be(s, c) {
      if (!s || be)
        return "";
      {
        var m = oe.get(s);
        if (m !== void 0)
          return m;
      }
      var b;
      be = !0;
      var S = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var R;
      R = me.current, me.current = null, Xr();
      try {
        if (c) {
          var g = function() {
            throw Error();
          };
          if (Object.defineProperty(g.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(g, []);
            } catch (F) {
              b = F;
            }
            Reflect.construct(s, [], g);
          } else {
            try {
              g.call();
            } catch (F) {
              b = F;
            }
            s.call(g.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (F) {
            b = F;
          }
          s();
        }
      } catch (F) {
        if (F && b && typeof F.stack == "string") {
          for (var p = F.stack.split(`
`), O = b.stack.split(`
`), D = p.length - 1, P = O.length - 1; D >= 1 && P >= 0 && p[D] !== O[P]; )
            P--;
          for (; D >= 1 && P >= 0; D--, P--)
            if (p[D] !== O[P]) {
              if (D !== 1 || P !== 1)
                do
                  if (D--, P--, P < 0 || p[D] !== O[P]) {
                    var C = `
` + p[D].replace(" at new ", " at ");
                    return s.displayName && C.includes("<anonymous>") && (C = C.replace("<anonymous>", s.displayName)), typeof s == "function" && oe.set(s, C), C;
                  }
                while (D >= 1 && P >= 0);
              break;
            }
        }
      } finally {
        be = !1, me.current = R, Zr(), Error.prepareStackTrace = S;
      }
      var W = s ? s.displayName || s.name : "", U = W ? ie(W) : "";
      return typeof s == "function" && oe.set(s, U), U;
    }
    function qr(s, c, m) {
      return Be(s, !1);
    }
    function et(s) {
      var c = s.prototype;
      return !!(c && c.isReactComponent);
    }
    function ue(s, c, m) {
      if (s == null)
        return "";
      if (typeof s == "function")
        return Be(s, et(s));
      if (typeof s == "string")
        return ie(s);
      switch (s) {
        case f:
          return ie("Suspense");
        case h:
          return ie("SuspenseList");
      }
      if (typeof s == "object")
        switch (s.$$typeof) {
          case d:
            return qr(s.render);
          case v:
            return ue(s.type, c, m);
          case y: {
            var b = s, S = b._payload, R = b._init;
            try {
              return ue(R(S), c, m);
            } catch {
            }
          }
        }
      return "";
    }
    var ee = Object.prototype.hasOwnProperty, Ke = {}, Ue = E.ReactDebugCurrentFrame;
    function ce(s) {
      if (s) {
        var c = s._owner, m = ue(s.type, s._source, c ? c.type : null);
        Ue.setExtraStackFrame(m);
      } else
        Ue.setExtraStackFrame(null);
    }
    function rt(s, c, m, b, S) {
      {
        var R = Function.call.bind(ee);
        for (var g in s)
          if (R(s, g)) {
            var p = void 0;
            try {
              if (typeof s[g] != "function") {
                var O = Error((b || "React class") + ": " + m + " type `" + g + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof s[g] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw O.name = "Invariant Violation", O;
              }
              p = s[g](c, g, b, m, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (D) {
              p = D;
            }
            p && !(p instanceof Error) && (ce(S), N("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", b || "React class", m, g, typeof p), ce(null)), p instanceof Error && !(p.message in Ke) && (Ke[p.message] = !0, ce(S), N("Failed %s type: %s", m, p.message), ce(null));
          }
      }
    }
    var tt = Array.isArray;
    function ye(s) {
      return tt(s);
    }
    function at(s) {
      {
        var c = typeof Symbol == "function" && Symbol.toStringTag, m = c && s[Symbol.toStringTag] || s.constructor.name || "Object";
        return m;
      }
    }
    function nt(s) {
      try {
        return Ye(s), !1;
      } catch {
        return !0;
      }
    }
    function Ye(s) {
      return "" + s;
    }
    function We(s) {
      if (nt(s))
        return N("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", at(s)), Ye(s);
    }
    var Ge = E.ReactCurrentOwner, st = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Je, Qe;
    function lt(s) {
      if (ee.call(s, "ref")) {
        var c = Object.getOwnPropertyDescriptor(s, "ref").get;
        if (c && c.isReactWarning)
          return !1;
      }
      return s.ref !== void 0;
    }
    function it(s) {
      if (ee.call(s, "key")) {
        var c = Object.getOwnPropertyDescriptor(s, "key").get;
        if (c && c.isReactWarning)
          return !1;
      }
      return s.key !== void 0;
    }
    function ot(s, c) {
      typeof s.ref == "string" && Ge.current;
    }
    function ut(s, c) {
      {
        var m = function() {
          Je || (Je = !0, N("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", c));
        };
        m.isReactWarning = !0, Object.defineProperty(s, "key", {
          get: m,
          configurable: !0
        });
      }
    }
    function ct(s, c) {
      {
        var m = function() {
          Qe || (Qe = !0, N("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", c));
        };
        m.isReactWarning = !0, Object.defineProperty(s, "ref", {
          get: m,
          configurable: !0
        });
      }
    }
    var dt = function(s, c, m, b, S, R, g) {
      var p = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: r,
        // Built-in properties that belong on the element
        type: s,
        key: c,
        ref: m,
        props: g,
        // Record the component responsible for creating this element.
        _owner: R
      };
      return p._store = {}, Object.defineProperty(p._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(p, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: b
      }), Object.defineProperty(p, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: S
      }), Object.freeze && (Object.freeze(p.props), Object.freeze(p)), p;
    };
    function ft(s, c, m, b, S) {
      {
        var R, g = {}, p = null, O = null;
        m !== void 0 && (We(m), p = "" + m), it(c) && (We(c.key), p = "" + c.key), lt(c) && (O = c.ref, ot(c, S));
        for (R in c)
          ee.call(c, R) && !st.hasOwnProperty(R) && (g[R] = c[R]);
        if (s && s.defaultProps) {
          var D = s.defaultProps;
          for (R in D)
            g[R] === void 0 && (g[R] = D[R]);
        }
        if (p || O) {
          var P = typeof s == "function" ? s.displayName || s.name || "Unknown" : s;
          p && ut(g, P), O && ct(g, P);
        }
        return dt(s, p, O, S, b, Ge.current, g);
      }
    }
    var _e = E.ReactCurrentOwner, Xe = E.ReactDebugCurrentFrame;
    function Y(s) {
      if (s) {
        var c = s._owner, m = ue(s.type, s._source, c ? c.type : null);
        Xe.setExtraStackFrame(m);
      } else
        Xe.setExtraStackFrame(null);
    }
    var pe;
    pe = !1;
    function Ee(s) {
      return typeof s == "object" && s !== null && s.$$typeof === r;
    }
    function Ze() {
      {
        if (_e.current) {
          var s = z(_e.current.type);
          if (s)
            return `

Check the render method of \`` + s + "`.";
        }
        return "";
      }
    }
    function ht(s) {
      return "";
    }
    var He = {};
    function mt(s) {
      {
        var c = Ze();
        if (!c) {
          var m = typeof s == "string" ? s : s.displayName || s.name;
          m && (c = `

Check the top-level render call using <` + m + ">.");
        }
        return c;
      }
    }
    function qe(s, c) {
      {
        if (!s._store || s._store.validated || s.key != null)
          return;
        s._store.validated = !0;
        var m = mt(c);
        if (He[m])
          return;
        He[m] = !0;
        var b = "";
        s && s._owner && s._owner !== _e.current && (b = " It was passed a child from " + z(s._owner.type) + "."), Y(s), N('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', m, b), Y(null);
      }
    }
    function er(s, c) {
      {
        if (typeof s != "object")
          return;
        if (ye(s))
          for (var m = 0; m < s.length; m++) {
            var b = s[m];
            Ee(b) && qe(b, c);
          }
        else if (Ee(s))
          s._store && (s._store.validated = !0);
        else if (s) {
          var S = x(s);
          if (typeof S == "function" && S !== s.entries)
            for (var R = S.call(s), g; !(g = R.next()).done; )
              Ee(g.value) && qe(g.value, c);
        }
      }
    }
    function vt(s) {
      {
        var c = s.type;
        if (c == null || typeof c == "string")
          return;
        var m;
        if (typeof c == "function")
          m = c.propTypes;
        else if (typeof c == "object" && (c.$$typeof === d || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        c.$$typeof === v))
          m = c.propTypes;
        else
          return;
        if (m) {
          var b = z(c);
          rt(m, s.props, "prop", b, s);
        } else if (c.PropTypes !== void 0 && !pe) {
          pe = !0;
          var S = z(c);
          N("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", S || "Unknown");
        }
        typeof c.getDefaultProps == "function" && !c.getDefaultProps.isReactClassApproved && N("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function bt(s) {
      {
        for (var c = Object.keys(s.props), m = 0; m < c.length; m++) {
          var b = c[m];
          if (b !== "children" && b !== "key") {
            Y(s), N("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", b), Y(null);
            break;
          }
        }
        s.ref !== null && (Y(s), N("Invalid attribute `ref` supplied to `React.Fragment`."), Y(null));
      }
    }
    var rr = {};
    function tr(s, c, m, b, S, R) {
      {
        var g = Jr(s);
        if (!g) {
          var p = "";
          (s === void 0 || typeof s == "object" && s !== null && Object.keys(s).length === 0) && (p += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var O = ht();
          O ? p += O : p += Ze();
          var D;
          s === null ? D = "null" : ye(s) ? D = "array" : s !== void 0 && s.$$typeof === r ? (D = "<" + (z(s.type) || "Unknown") + " />", p = " Did you accidentally export a JSX literal instead of a component?") : D = typeof s, N("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", D, p);
        }
        var P = ft(s, c, m, S, R);
        if (P == null)
          return P;
        if (g) {
          var C = c.children;
          if (C !== void 0)
            if (b)
              if (ye(C)) {
                for (var W = 0; W < C.length; W++)
                  er(C[W], s);
                Object.freeze && Object.freeze(C);
              } else
                N("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              er(C, s);
        }
        if (ee.call(c, "key")) {
          var U = z(s), F = Object.keys(c).filter(function(xt) {
            return xt !== "key";
          }), ge = F.length > 0 ? "{key: someKey, " + F.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!rr[U + ge]) {
            var gt = F.length > 0 ? "{" + F.join(": ..., ") + ": ...}" : "{}";
            N(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, ge, U, gt, U), rr[U + ge] = !0;
          }
        }
        return s === a ? bt(P) : vt(P), P;
      }
    }
    function yt(s, c, m) {
      return tr(s, c, m, !0);
    }
    function _t(s, c, m) {
      return tr(s, c, m, !1);
    }
    var pt = _t, Et = yt;
    te.Fragment = a, te.jsx = pt, te.jsxs = Et;
  }()), te;
}
process.env.NODE_ENV === "production" ? Re.exports = Pt() : Re.exports = It();
var u = Re.exports;
const $ = {
  SET_CONTEXT: "dashboard/SET_CONTEXT",
  SET_GLOBAL_FILTERS: "dashboard/SET_GLOBAL_FILTERS",
  ADD_SELECTION: "dashboard/ADD_SELECTION",
  REMOVE_SELECTION: "dashboard/REMOVE_SELECTION",
  CLEAR_SELECTIONS: "dashboard/CLEAR_SELECTIONS",
  PUSH_DRILL: "dashboard/PUSH_DRILL",
  POP_DRILL: "dashboard/POP_DRILL",
  SET_PANEL_STATE: "dashboard/SET_PANEL_STATE"
}, $t = ({ dashboardId: e, datasetId: r }) => ({
  type: $.SET_CONTEXT,
  payload: { dashboardId: e, datasetId: r }
}), Ot = (e) => ({
  type: $.SET_GLOBAL_FILTERS,
  payload: { filters: e }
}), Lt = (e) => ({
  type: $.ADD_SELECTION,
  payload: { selection: e }
}), Ft = (e) => ({
  type: $.REMOVE_SELECTION,
  payload: { selectionId: e }
}), At = () => ({
  type: $.CLEAR_SELECTIONS
}), Ct = (e) => ({
  type: $.PUSH_DRILL,
  payload: { entry: e }
}), kt = () => ({
  type: $.POP_DRILL
}), Mt = (e, r) => ({
  type: $.SET_PANEL_STATE,
  payload: { panelId: e, nextState: r }
}), Vt = (e = {}) => ({
  dashboardId: null,
  datasetId: null,
  globalFilters: [],
  selections: [],
  drillPath: [],
  panelStateById: {},
  ...e
}), zt = (e, r, t) => ({
  ...e,
  [r]: {
    ...e[r] || {},
    ...t
  }
}), Bt = (e, r) => {
  switch (r.type) {
    case $.SET_CONTEXT:
      return {
        ...e,
        dashboardId: r.payload.dashboardId ?? e.dashboardId,
        datasetId: r.payload.datasetId ?? e.datasetId
      };
    case $.SET_GLOBAL_FILTERS:
      return {
        ...e,
        globalFilters: r.payload.filters
      };
    case $.ADD_SELECTION:
      return {
        ...e,
        selections: [...e.selections, r.payload.selection]
      };
    case $.REMOVE_SELECTION:
      return {
        ...e,
        selections: e.selections.filter(
          (t) => t.id !== r.payload.selectionId
        )
      };
    case $.CLEAR_SELECTIONS:
      return {
        ...e,
        selections: []
      };
    case $.PUSH_DRILL:
      return {
        ...e,
        drillPath: [...e.drillPath, r.payload.entry]
      };
    case $.POP_DRILL:
      return {
        ...e,
        drillPath: e.drillPath.slice(0, -1)
      };
    case $.SET_PANEL_STATE:
      return {
        ...e,
        panelStateById: zt(
          e.panelStateById,
          r.payload.panelId,
          r.payload.nextState
        )
      };
    default:
      return e;
  }
}, Ir = gr(null), $r = gr(null), Kt = (e) => ({
  setDashboardContext: (r) => e($t(r)),
  setGlobalFilters: (r) => e(Ot(r)),
  addSelection: (r) => e(Lt(r)),
  removeSelection: (r) => e(Ft(r)),
  clearSelections: () => e(At()),
  pushDrillPath: (r) => e(Ct(r)),
  popDrillPath: () => e(kt()),
  setPanelState: (r, t) => e(Mt(r, t))
}), kn = ({ children: e, initialState: r }) => {
  const [t, a] = St(
    Bt,
    Vt(r)
  ), n = k(() => Kt(a), [a]);
  return /* @__PURE__ */ u.jsx(Ir.Provider, { value: t, children: /* @__PURE__ */ u.jsx($r.Provider, { value: n, children: e }) });
}, Mn = () => {
  const e = xr(Ir);
  if (!e)
    throw new Error("useDashboardState must be used within a DashboardProvider");
  return e;
}, Vn = () => {
  const e = xr($r);
  if (!e)
    throw new Error("useDashboardActions must be used within a DashboardProvider");
  return e;
};
function Ut({ message: e = "Loading data…" }) {
  return /* @__PURE__ */ u.jsxs("div", { className: "radf-panel__state radf-panel__state--loading", children: [
    /* @__PURE__ */ u.jsx("span", { className: "radf-panel__state-icon", "aria-hidden": "true", children: "⏳" }),
    /* @__PURE__ */ u.jsx("p", { className: "radf-panel__state-text", children: e })
  ] });
}
function Yt({ title: e = "No data yet", message: r = "Try adjusting filters or refreshing the panel." }) {
  return /* @__PURE__ */ u.jsxs("div", { className: "radf-panel__state radf-panel__state--empty", children: [
    /* @__PURE__ */ u.jsx("p", { className: "radf-panel__state-title", children: e }),
    /* @__PURE__ */ u.jsx("p", { className: "radf-panel__state-text", children: r })
  ] });
}
function Wt({ title: e = "Something went wrong", message: r = "Please try again." }) {
  return /* @__PURE__ */ u.jsxs("div", { className: "radf-panel__state radf-panel__state--error", children: [
    /* @__PURE__ */ u.jsx("p", { className: "radf-panel__state-title", children: e }),
    /* @__PURE__ */ u.jsx("p", { className: "radf-panel__state-text", children: r })
  ] });
}
const Gt = (e) => e ? typeof e == "string" ? e : e.message || "Something went wrong." : null;
function Jt({ status: e = "ready", isEmpty: r = !1, emptyMessage: t, error: a, children: n }) {
  let l = /* @__PURE__ */ u.jsx("div", { className: "radf-panel__content", children: n });
  return e === "loading" && (l = /* @__PURE__ */ u.jsx(Ut, {})), e === "error" && (l = /* @__PURE__ */ u.jsx(Wt, { message: Gt(a) })), (e === "empty" || r) && (l = /* @__PURE__ */ u.jsx(Yt, { message: t })), /* @__PURE__ */ u.jsx("div", { className: "radf-panel__body", children: l });
}
function Qt({ title: e, subtitle: r, actions: t }) {
  return !e && !r && !t ? null : /* @__PURE__ */ u.jsxs("div", { className: "radf-panel__header", children: [
    /* @__PURE__ */ u.jsxs("div", { className: "radf-panel__heading", children: [
      e ? /* @__PURE__ */ u.jsx("h2", { className: "radf-panel__title", children: e }) : null,
      r ? /* @__PURE__ */ u.jsx("p", { className: "radf-panel__subtitle", children: r }) : null
    ] }),
    t ? /* @__PURE__ */ u.jsx("div", { className: "radf-panel__actions", children: t }) : null
  ] });
}
const Xt = (e = {}) => ({
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
}), A = (e) => e ? Array.isArray(e) ? e : [e] : [], Zt = ({ panelId: e, field: r, value: t }) => `${e || "panel"}:${r}:${String(t)}`, Ht = ({
  panelId: e,
  field: r,
  value: t,
  op: a = "IN",
  label: n
}) => {
  if (!r)
    return null;
  const l = Array.isArray(t) ? t : [t], o = n ? `${n}: ${l.join(", ")}` : `${r}: ${l.join(", ")}`;
  return {
    id: Zt({ panelId: e, field: r, value: l.join("|") }),
    sourcePanelId: e || null,
    label: o,
    /** @type {Filter} */
    filter: {
      field: r,
      op: a,
      values: l
    }
  };
}, Or = (e, r) => {
  var a, n, l;
  if (!e || !r)
    return null;
  if (e.payload && e.payload[r] !== void 0)
    return e.payload[r];
  if ((a = e.payload) != null && a.payload && e.payload.payload[r] !== void 0)
    return e.payload.payload[r];
  const t = (l = (n = e.activePayload) == null ? void 0 : n[0]) == null ? void 0 : l.payload;
  return t && t[r] !== void 0 ? t[r] : e.activeLabel !== void 0 && r === e.activeLabelField ? e.activeLabel : e[r] !== void 0 ? e[r] : null;
}, zn = ({
  event: e,
  panelId: r,
  field: t,
  op: a,
  label: n
}) => {
  const l = Or(e, t);
  return l == null ? null : Ht({
    panelId: r,
    field: t,
    value: l,
    op: a,
    label: n
  });
}, Lr = (e) => {
  var t, a;
  if (!e)
    return "";
  if (e.label)
    return e.label;
  const r = ((t = e.filter) == null ? void 0 : t.values) || [];
  return `${((a = e.filter) == null ? void 0 : a.field) || "Filter"}: ${r.join(", ")}`;
}, Bn = (e = [], r) => r ? e.some((t) => t.id === r.id) : !1, qt = ({ panelId: e, dimension: r, value: t }) => `${e || "panel"}:${r}:${String(t)}`, ea = ({
  panelId: e,
  dimension: r,
  to: t,
  value: a,
  label: n
}) => {
  if (!r || a === void 0 || a === null)
    return null;
  const l = n ? `${n}: ${a}` : `${r}: ${a}`;
  return {
    id: qt({ panelId: e, dimension: r, value: a }),
    sourcePanelId: e || null,
    dimension: r,
    to: t,
    value: a,
    label: l,
    /** @type {Filter} */
    filter: {
      field: r,
      op: "IN",
      values: [a]
    }
  };
}, Kn = ({
  event: e,
  panelId: r,
  dimension: t,
  to: a,
  label: n
}) => {
  const l = Or(e, t);
  return l == null ? null : ea({
    panelId: r,
    dimension: t,
    to: a,
    value: l,
    label: n
  });
}, ra = ({
  dimensions: e = [],
  drillPath: r = [],
  drilldownConfig: t
}) => !t || !r.length ? e : r.reduce((a, n) => !(n != null && n.dimension) || !(n != null && n.to) ? a : a.map(
  (l) => l === n.dimension ? n.to : l
), [...e]), Un = (e = [], r) => r ? e.some((t) => t.id === r.id) : !1, Pe = (e) => e ? e.label ? e.label : `${e.dimension || "Dimension"}: ${e.value}` : "", ta = (e) => e ? e.filter ? e.filter : e.filters ? e.filters : e.dimension && e.value !== void 0 ? {
  field: e.dimension,
  op: "IN",
  values: [e.value]
} : null : null, aa = ({ globalFilters: e, selections: r, drillPath: t, panelFilters: a }) => {
  const n = (r || []).flatMap((o) => o.filter ? A(o.filter) : o.filters ? A(o.filters) : []), l = (t || []).flatMap(
    (o) => A(ta(o))
  );
  return [
    ...A(e),
    ...n,
    ...l,
    ...A(a)
  ].filter(Boolean);
}, na = (e = {}, r = {}) => {
  var o;
  const t = e.query || {}, a = e.datasetId ?? r.datasetId ?? null, n = t.dimensions || [], l = aa({
    globalFilters: r.globalFilters,
    selections: r.selections,
    drillPath: r.drillPath,
    panelFilters: t.filters
  });
  return Xt({
    datasetId: a,
    measures: t.measures || [],
    dimensions: ra({
      dimensions: n,
      drillPath: r.drillPath,
      drilldownConfig: (o = e.interactions) == null ? void 0 : o.drilldown
    }),
    filters: l,
    timeRange: t.timeRange ?? r.timeRange ?? null,
    grain: t.grain ?? null,
    sort: t.sort ?? null,
    limit: t.limit ?? null,
    offset: t.offset ?? null,
    timezone: t.timezone ?? r.timezone ?? null,
    transforms: t.transforms || []
  });
}, X = (e) => Array.isArray(e) ? e : [], lr = (e, r = "Filter") => {
  if (!e)
    return r;
  const t = X(e.values), a = t.length ? t.join(", ") : "Any";
  return `${e.field || r} ${e.op || "IN"} ${a}`;
}, Fr = (e) => e ? e.filter ? e.filter : e.filters ? e.filters : e.dimension && e.value !== void 0 ? {
  field: e.dimension,
  op: "IN",
  values: [e.value]
} : null : null, sa = (e = []) => e.flatMap((r) => r.filter ? A(r.filter) : r.filters ? A(r.filters) : []), la = (e = []) => e.flatMap((r) => A(Fr(r))), ia = (e) => e.dashboardId, oa = (e) => e.datasetId, ua = (e) => e.globalFilters, ca = (e) => e.selections, da = (e) => e.drillPath, fa = (e) => e.panelStateById, ha = (e, r) => e.panelStateById[r] || {}, ma = (e, r = null) => {
  var l;
  const t = [];
  return A(e.globalFilters).forEach((o, i) => {
    t.push({
      id: `global-${o.field || "filter"}-${i}`,
      source: "global",
      field: o.field,
      op: o.op,
      values: X(o.values),
      label: lr(o, "Global filter")
    });
  }), (e.selections || []).forEach((o) => {
    A(o.filter || o.filters).forEach((d, f) => {
      t.push({
        id: `selection-${o.id || f}`,
        source: "selection",
        field: d.field,
        op: d.op,
        values: X(d.values),
        label: o.label || Lr(o)
      });
    });
  }), (e.drillPath || []).forEach((o, i) => {
    A(Fr(o)).forEach((f) => {
      t.push({
        id: `drill-${o.id || i}`,
        source: "drill",
        field: f.field,
        op: f.op,
        values: X(f.values),
        label: o.label || Pe(o)
      });
    });
  }), A((l = r == null ? void 0 : r.query) == null ? void 0 : l.filters).forEach((o, i) => {
    t.push({
      id: `panel-${(r == null ? void 0 : r.id) || "panel"}-${i}`,
      source: "panel",
      field: o.field,
      op: o.op,
      values: X(o.values),
      label: lr(o, "Panel filter")
    });
  }), t;
}, va = (e) => (e.drillPath || []).map((r, t) => ({
  id: r.id || `${r.dimension || "dimension"}-${t}`,
  label: r.label || Pe(r),
  entry: r,
  index: t
})), ba = (e) => (e.selections || []).map((r) => {
  const t = A(r.filter || r.filters), a = t.map((l) => l.field).filter(Boolean), n = t.flatMap((l) => X(l.values));
  return {
    selectionId: r.id,
    sourcePanelId: r.sourcePanelId ?? null,
    label: r.label || Lr(r),
    fields: a,
    values: n
  };
}), ya = (e, r) => na(r, e), _a = (e) => sa(e.selections), pa = (e) => la(e.drillPath), Yn = {
  selectDashboardId: ia,
  selectDatasetId: oa,
  selectGlobalFilters: ua,
  selectSelections: ca,
  selectDrillPath: da,
  selectPanelStateById: fa,
  selectPanelState: ha,
  selectActiveFiltersSummary: ma,
  selectDrillBreadcrumbs: va,
  selectSelectedEntities: ba,
  selectDerivedQueryInputs: ya,
  selectSelectionFilters: _a,
  selectDrillFilters: pa
}, Ea = (e, { validateResult: r } = {}) => ({
  execute: e,
  validateResult: r
}), ga = (e) => !!(e && typeof e.execute == "function"), xa = (e) => {
  if (!ga(e))
    throw new Error("DataProvider must implement execute(querySpec, options)");
  return e;
}, Sa = (e, r) => new Promise((t, a) => {
  if (r != null && r.aborted) {
    a(new DOMException("Aborted", "AbortError"));
    return;
  }
  const n = setTimeout(t, e);
  r && r.addEventListener(
    "abort",
    () => {
      clearTimeout(n), a(new DOMException("Aborted", "AbortError"));
    },
    { once: !0 }
  );
}), ja = (e) => {
  let r = e;
  return () => {
    r += 1831565813;
    let t = Math.imul(r ^ r >>> 15, r | 1);
    return t ^= t + Math.imul(t ^ t >>> 7, t | 61), ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}, Ra = (e) => {
  const r = JSON.stringify({
    datasetId: e.datasetId,
    measures: e.measures,
    dimensions: e.dimensions,
    filters: e.filters,
    grain: e.grain,
    timeRange: e.timeRange
  });
  let t = 2166136261;
  for (let a = 0; a < r.length; a += 1)
    t ^= r.charCodeAt(a), t = Math.imul(t, 16777619);
  return t >>> 0;
}, fe = (e) => Array.isArray(e) ? e : [], Ar = (e) => e ? Array.isArray(e) ? { start: e[0], end: e[1] } : e.start || e.end ? { start: e.start ?? null, end: e.end ?? null } : null : null, ir = (e) => {
  if (!e)
    return null;
  const r = new Date(e);
  return Number.isNaN(r.getTime()) ? null : r;
}, Na = (e) => e.toISOString().slice(0, 10), Ta = (e, r, t) => Math.min(t, Math.max(r, e)), Da = (e) => {
  const t = fe(e).find(
    (l) => {
      var o, i;
      return l && l.op === "BETWEEN" && Array.isArray(l.values) && l.values.length >= 2 && (((o = l.field) == null ? void 0 : o.includes("date")) || ((i = l.field) == null ? void 0 : i.includes("day")));
    }
  );
  if (!t)
    return null;
  const [a, n] = t.values;
  return !a && !n ? null : { start: a ?? null, end: n ?? null };
}, ae = {
  category: ["Alpha", "Beta", "Gamma", "Delta"],
  region: ["North", "South", "East", "West"],
  segment: ["Consumer", "SMB", "Enterprise"]
}, wa = (e) => ae[e] ? ae[e] : e != null && e.includes("region") ? ae.region : e != null && e.includes("segment") ? ae.segment : e != null && e.includes("category") ? ae.category : ["A", "B", "C", "D"].map((t, a) => `${e || "dim"}-${t}${a + 1}`), Pa = ({ measures: e, dimensions: r, timeRange: t, random: a }) => {
  const n = fe(r);
  if (!n.length)
    return [
      e.reduce((d, f, h) => (d[f] = Math.round(500 + a() * 500 + h * 40), d), {})
    ];
  const l = [], o = n.map((d) => {
    if (d != null && d.includes("date") || d != null && d.includes("day")) {
      const f = Ar(t), h = ir(f == null ? void 0 : f.start) ?? new Date(Date.now() - 6 * 864e5), v = ir(f == null ? void 0 : f.end) ?? /* @__PURE__ */ new Date(), y = Ta(Math.ceil((v - h) / 864e5) + 1, 2, 14);
      return Array.from({ length: y }, (T, w) => {
        const _ = new Date(h);
        return _.setDate(_.getDate() + w), Na(_);
      });
    }
    return wa(d);
  }), i = (d, f) => {
    if (d >= n.length) {
      const v = { ...f };
      e.forEach((y, T) => {
        const w = a() * 0.3 + 0.85;
        v[y] = Math.round(200 * w + T * 50 + a() * 120);
      }), l.push(v);
      return;
    }
    const h = n[d];
    o[d].forEach((v, y) => {
      i(d + 1, {
        ...f,
        [h]: v,
        [`${h}_order`]: y
      });
    });
  };
  return i(0, {}), l;
}, Ia = async (e, { signal: r } = {}) => {
  const t = Ra(e), a = ja(t), n = 180 + Math.floor(a() * 220);
  await Sa(n, r);
  const l = fe(e.measures), o = fe(e.dimensions), i = Ar(e.timeRange) ?? Da(e.filters), d = Pa({
    measures: l,
    dimensions: o,
    timeRange: i,
    random: a
  }), f = d.reduce((h, v) => (l.forEach((y) => {
    h[y] = (h[y] || 0) + (v[y] || 0);
  }), h), {});
  return {
    rows: d,
    meta: {
      total: f,
      rowCount: d.length,
      generatedAt: (/* @__PURE__ */ new Date()).toISOString()
    }
  };
}, Wn = Ea(Ia), he = (e) => !!(e && typeof e == "object" && !Array.isArray(e)), se = (e) => he(e) ? Object.keys(e).sort().reduce((r, t) => {
  const a = e[t];
  return a === void 0 || (r[t] = Array.isArray(a) ? a.map((n) => se(n)) : he(a) ? se(a) : a), r;
}, {}) : e, $a = (e) => {
  if (!Array.isArray(e))
    return e;
  const r = e.map(
    (a) => he(a) ? se(a) : a
  );
  return r.every(
    (a) => a === null || ["string", "number", "boolean"].includes(typeof a)
  ) ? [...r].sort() : r;
}, Oa = (e) => {
  if (!he(e))
    return e;
  const r = $a(
    e.values ?? (e.value !== void 0 ? [e.value] : [])
  );
  return {
    ...e,
    values: r
  };
}, La = (e) => Array.isArray(e) ? e.filter(Boolean).map((t) => Oa(t)).map((t) => ({
  sortKey: JSON.stringify(t),
  filter: t
})).sort((t, a) => t.sortKey.localeCompare(a.sortKey)).map((t) => t.filter) : [], or = (e) => Array.isArray(e) ? [...e.filter(Boolean)].sort() : [], Fa = (e = {}) => ({
  datasetId: e.datasetId ?? null,
  measures: or(e.measures),
  dimensions: or(e.dimensions),
  filters: La(e.filters),
  timeRange: e.timeRange ?? null,
  grain: e.grain ?? null,
  sort: se(e.sort ?? null),
  limit: e.limit ?? null,
  offset: e.offset ?? null,
  timezone: e.timezone ?? null,
  transforms: Array.isArray(e.transforms) ? e.transforms.map((r) => se(r)) : []
}), Ne = (e) => Array.isArray(e) ? `[${e.map((r) => Ne(r)).join(",")}]` : e && typeof e == "object" ? `{${Object.keys(e).sort().map((t) => `${JSON.stringify(t)}:${Ne(e[t])}`).join(",")}}` : JSON.stringify(e), Aa = (e) => {
  let r = 5381;
  for (let t = 0; t < e.length; t += 1)
    r = r * 33 ^ e.charCodeAt(t);
  return (r >>> 0).toString(16);
}, Ca = (e = {}) => {
  const r = Fa(e), t = Ne(r);
  return `qs_${Aa(t)}`;
}, ka = () => /* @__PURE__ */ new Map(), ur = (e, r, t) => {
  e.has(r) && e.delete(r), e.set(r, t);
}, Ma = ({ maxSize: e = 500 } = {}) => {
  const r = ka(), t = () => {
    if (e <= 0) {
      r.clear();
      return;
    }
    for (; r.size > e; ) {
      const a = r.keys().next().value;
      r.delete(a);
    }
  };
  return {
    get: (a) => {
      if (!r.has(a))
        return;
      const n = r.get(a);
      return ur(r, a, n), n;
    },
    set: (a, n) => (ur(r, a, n), t(), n),
    has: (a) => r.has(a),
    delete: (a) => r.delete(a),
    clear: () => r.clear(),
    entries: () => Array.from(r.entries()),
    size: () => r.size,
    prune: t
  };
}, Va = Ma(), Te = () => Date.now(), Cr = (e) => !!(e && typeof e == "object" && !Array.isArray(e)), za = (e) => {
  const r = [];
  return Array.isArray(e == null ? void 0 : e.rows) || r.push("rows must be an array"), (e == null ? void 0 : e.meta) != null && !Cr(e.meta) && r.push("meta must be an object when provided"), r;
}, Ba = (e, r, t) => {
  if (!e)
    return [];
  try {
    const a = e(r, t);
    return a == null || a === !0 ? [] : a === !1 ? ["custom validation failed"] : typeof a == "string" ? [a] : Array.isArray(a) ? a : typeof a == "object" && a.valid === !1 ? Array.isArray(a.errors) ? a.errors : typeof a.error == "string" ? [a.error] : ["custom validation failed"] : [];
  } catch (a) {
    return [(a == null ? void 0 : a.message) || "custom validation threw an error"];
  }
}, Ka = (e) => ({
  rows: Array.isArray(e == null ? void 0 : e.rows) ? e.rows : [],
  meta: Cr(e == null ? void 0 : e.meta) ? e.meta : null
}), cr = (e) => ({
  status: (e == null ? void 0 : e.status) ?? "idle",
  data: (e == null ? void 0 : e.data) ?? null,
  meta: (e == null ? void 0 : e.meta) ?? null,
  error: (e == null ? void 0 : e.error) ?? null,
  updatedAt: (e == null ? void 0 : e.updatedAt) ?? null
}), dr = (e, r) => !(e != null && e.updatedAt) || r === 0 ? !0 : r === 1 / 0 ? !1 : Te() - e.updatedAt > r, Gn = (e, {
  provider: r,
  cache: t = Va,
  staleTime: a = 3e4,
  enabled: n = !0,
  onSuccess: l,
  onError: o,
  validateResult: i,
  strictResultValidation: d = !1
} = {}) => {
  const f = k(() => xa(r), [r]), h = k(() => Ca(e), [e]), v = jt(null), [y, T] = Sr(
    () => cr(t.get(h))
  ), w = jr(async (_) => {
    const x = t.get(_);
    if (x != null && x.promise)
      return x.promise;
    const E = new AbortController();
    v.current = E;
    const N = f.execute(e, { signal: E.signal }).then((j) => {
      const L = i || (f == null ? void 0 : f.validateResult), I = [
        ...za(j),
        ...Ba(L, j, e)
      ].filter(Boolean);
      if (I.length > 0) {
        const le = `Invalid provider result: ${I.join("; ")}`;
        if (d)
          throw new Error(le);
        console.warn(le, { result: j, querySpec: e });
      }
      const B = Ka(j), M = {
        status: "success",
        data: I.length > 0 ? [] : B.rows,
        meta: I.length > 0 ? null : B.meta,
        error: null,
        updatedAt: Te()
      };
      return t.set(_, M), t.prune && t.prune(), T(M), l && l(M), M;
    }).catch((j) => {
      if ((j == null ? void 0 : j.name) === "AbortError")
        return null;
      const L = {
        status: "error",
        data: null,
        meta: null,
        error: j,
        updatedAt: Te()
      };
      return t.set(_, L), t.prune && t.prune(), T(L), o && o(j), L;
    }).finally(() => {
      const j = t.get(_);
      (j == null ? void 0 : j.promise) === N && t.set(_, { ...j, promise: null });
    });
    return t.set(_, {
      status: (x == null ? void 0 : x.status) ?? "loading",
      data: (x == null ? void 0 : x.data) ?? null,
      meta: (x == null ? void 0 : x.meta) ?? null,
      error: (x == null ? void 0 : x.error) ?? null,
      updatedAt: (x == null ? void 0 : x.updatedAt) ?? null,
      promise: N
    }), t.prune && t.prune(), N;
  }, [
    f,
    t,
    o,
    l,
    e,
    d,
    i
  ]);
  return Rr(() => {
    if (!n)
      return;
    const _ = t.get(h);
    return _ != null && _.data ? T(cr(_)) : _ || T((x) => ({
      ...x,
      status: "loading",
      error: null
    })), (!_ || dr(_, a)) && w(h), () => {
      v.current && v.current.abort();
    };
  }, [h, n, a, t, w]), {
    data: y.data,
    meta: y.meta,
    loading: y.status === "loading",
    error: y.error,
    status: y.status,
    updatedAt: y.updatedAt,
    isStale: dr(t.get(h), a),
    refetch: () => w(h)
  };
}, kr = (e = "registry") => {
  const r = /* @__PURE__ */ new Map();
  return {
    label: e,
    register: (a, n) => {
      if (!a)
        throw new Error(`${e} key is required.`);
      if (!n)
        throw new Error(`${e} component is required.`);
      return r.set(a, n), n;
    },
    get: (a) => r.get(a),
    has: (a) => r.has(a),
    list: () => Array.from(r.keys())
  };
}, Mr = kr("vizRegistry"), De = kr("insightRegistry"), xe = (e, r) => Mr.register(e, r), Se = (e, r) => De.register(e, r);
function Vr({ title: e, subtitle: r, footer: t, children: a }) {
  return /* @__PURE__ */ u.jsxs("div", { className: "radf-chart", children: [
    (e || r) && /* @__PURE__ */ u.jsx("div", { className: "radf-chart__header", children: /* @__PURE__ */ u.jsxs("div", { className: "radf-chart__heading", children: [
      e ? /* @__PURE__ */ u.jsx("p", { className: "radf-chart__title", children: e }) : null,
      r ? /* @__PURE__ */ u.jsx("p", { className: "radf-chart__subtitle", children: r }) : null
    ] }) }),
    /* @__PURE__ */ u.jsx("div", { className: "radf-chart__canvas", children: a }),
    t ? /* @__PURE__ */ u.jsx("div", { className: "radf-chart__footer", children: t }) : null
  ] });
}
const Ua = "analytics", fr = 12, Ya = 9, Wa = 4, hr = (e = Ua) => `radf-palette-${e}`, zr = (e, r, t) => Number.isFinite(e) ? Math.min(t, Math.max(r, Math.trunc(e))) : r, H = (e, r = fr) => {
  const t = Number.isInteger(e) ? e : 0, a = Number.isInteger(r) && r > 0 ? r : fr;
  return `var(--radf-series-${(t % a + a) % a + 1})`;
}, je = (e) => `var(--radf-seq-${zr(e, 1, Ya)})`, G = (e, r) => {
  if (e === "zero")
    return "var(--radf-div-zero)";
  const t = zr(r, 1, Wa);
  return `var(--radf-div-${e === "neg" ? "neg" : "pos"}-${t})`;
}, Br = 12, Ga = (e) => {
  if (!Array.isArray(e))
    return [];
  const r = /* @__PURE__ */ new Set(), t = [];
  return e.forEach((a) => {
    if (a == null)
      return;
    const n = String(a);
    r.has(n) || (r.add(n), t.push(n));
  }), t;
}, Z = (e, r = Br) => H(e, r), Kr = (e) => Ga(e).reduce((t, a, n) => (t[a] = Z(n, Br), t), {}), mr = 12, Ja = Array.from(
  { length: mr },
  (e, r) => Z(r, mr)
), Qa = (e) => `radf-chart-color-${(Number.isInteger(e) ? e : 0) % Ja.length}`;
function Ur({ active: e, label: r, payload: t }) {
  return !e || !t || t.length === 0 ? null : /* @__PURE__ */ u.jsxs("div", { className: "radf-chart-tooltip", children: [
    r ? /* @__PURE__ */ u.jsx("p", { className: "radf-chart-tooltip__label", children: r }) : null,
    /* @__PURE__ */ u.jsx("ul", { className: "radf-chart-tooltip__list", children: t.map((a, n) => /* @__PURE__ */ u.jsxs("li", { className: "radf-chart-tooltip__item", children: [
      /* @__PURE__ */ u.jsx(
        "span",
        {
          className: [
            "radf-chart-tooltip__swatch",
            Qa(n)
          ].join(" ")
        }
      ),
      /* @__PURE__ */ u.jsx("span", { className: "radf-chart-tooltip__name", children: a.name }),
      /* @__PURE__ */ u.jsx("span", { className: "radf-chart-tooltip__value", children: a.value })
    ] }, a.dataKey || a.name || n)) })
  ] });
}
const Xa = (e, r) => e ? Array.isArray(e.y) ? e.y : e.y ? [e.y] : r != null && r.length ? Object.keys(r[0]).filter((t) => t !== e.x) : [] : [];
function Za({
  data: e = [],
  encodings: r = {},
  options: t = {},
  handlers: a = {},
  colorAssignment: n,
  hiddenKeys: l
}) {
  const o = (n == null ? void 0 : n.mode) === "series" || (n == null ? void 0 : n.mode) === "single" ? n.items.map((_) => _.key) : [], i = o.length ? o : Xa(r, e), d = i.filter(
    (_) => !(l != null && l.has(String(_)))
  ), f = t.tooltip !== !1, h = t.brush || {}, v = !!h.enabled && e.length > 1, y = k(
    () => Kr(i),
    [i]
  ), T = typeof h.startIndex == "number" ? h.startIndex : void 0, w = typeof h.endIndex == "number" ? h.endIndex : void 0;
  return /* @__PURE__ */ u.jsx(Vr, { children: /* @__PURE__ */ u.jsx(Nr, { width: "100%", height: 280, children: /* @__PURE__ */ u.jsxs(Rt, { data: e, margin: { top: 8, right: 16, left: 0, bottom: 8 }, children: [
    /* @__PURE__ */ u.jsx(Tr, { stroke: "var(--radf-chart-grid)", strokeDasharray: "3 3" }),
    /* @__PURE__ */ u.jsx(
      Dr,
      {
        dataKey: r.x,
        tick: { fill: "var(--radf-text-muted)", fontSize: 12 },
        axisLine: { stroke: "var(--radf-border-divider)" }
      }
    ),
    /* @__PURE__ */ u.jsx(
      wr,
      {
        tick: { fill: "var(--radf-text-muted)", fontSize: 12 },
        axisLine: { stroke: "var(--radf-border-divider)" }
      }
    ),
    f ? /* @__PURE__ */ u.jsx(Pr, { content: /* @__PURE__ */ u.jsx(Ur, {}) }) : null,
    d.map((_, x) => {
      var E;
      return /* @__PURE__ */ u.jsx(
        Nt,
        {
          type: "monotone",
          dataKey: _,
          stroke: ((E = n == null ? void 0 : n.getColor) == null ? void 0 : E.call(n, _)) || y[_] || Z(x),
          strokeWidth: 2,
          dot: { r: 3 },
          activeDot: { r: 5, onClick: a.onClick },
          onClick: a.onClick
        },
        _
      );
    }),
    v ? /* @__PURE__ */ u.jsx(
      Tt,
      {
        className: "radf-chart__brush",
        dataKey: r.x,
        height: 24,
        travellerWidth: 12,
        stroke: "var(--radf-accent-primary)",
        startIndex: T,
        endIndex: w,
        onChange: (_) => {
          a.onBrushChange && a.onBrushChange({
            ..._,
            data: e,
            dataKey: r.x
          });
        }
      }
    ) : null
  ] }) }) });
}
const Ha = (e, r) => e ? Array.isArray(e.y) ? e.y : e.y ? [e.y] : r != null && r.length ? Object.keys(r[0]).filter((t) => t !== e.x) : [] : [];
function qa({
  data: e = [],
  encodings: r = {},
  options: t = {},
  handlers: a = {},
  colorAssignment: n,
  hiddenKeys: l
}) {
  var x;
  const o = (n == null ? void 0 : n.mode) === "series" || (n == null ? void 0 : n.mode) === "single" ? n.items.map((E) => E.key) : [], i = o.length ? o : Ha(r, e), d = t.tooltip !== !1, f = t.stacked === !0 || Array.isArray(t.stackedKeys), h = k(
    () => Kr(i),
    [i]
  ), v = i.filter(
    (E) => !(l != null && l.has(String(E)))
  ), y = (n == null ? void 0 : n.mode) === "category", T = (n == null ? void 0 : n.mode) === "series", w = (n == null ? void 0 : n.mode) === "category" || (n == null ? void 0 : n.mode) === "diverging" || (n == null ? void 0 : n.mode) === "sequential", _ = y && (l != null && l.size) ? e.filter((E) => !l.has(String(E == null ? void 0 : E[r.x]))) : e;
  return /* @__PURE__ */ u.jsx(Vr, { children: /* @__PURE__ */ u.jsx(Nr, { width: "100%", height: 280, children: /* @__PURE__ */ u.jsxs(Dt, { data: _, margin: { top: 8, right: 16, left: 0, bottom: 8 }, children: [
    /* @__PURE__ */ u.jsx(Tr, { stroke: "var(--radf-chart-grid)", strokeDasharray: "3 3" }),
    /* @__PURE__ */ u.jsx(
      Dr,
      {
        dataKey: r.x,
        tick: { fill: "var(--radf-text-muted)", fontSize: 12 },
        axisLine: { stroke: "var(--radf-border-divider)" }
      }
    ),
    /* @__PURE__ */ u.jsx(
      wr,
      {
        tick: { fill: "var(--radf-text-muted)", fontSize: 12 },
        axisLine: { stroke: "var(--radf-border-divider)" }
      }
    ),
    d ? /* @__PURE__ */ u.jsx(Pr, { content: /* @__PURE__ */ u.jsx(Ur, {}) }) : null,
    T ? v.map((E, N) => {
      var j;
      return /* @__PURE__ */ u.jsx(
        ar,
        {
          dataKey: E,
          fill: ((j = n == null ? void 0 : n.getColor) == null ? void 0 : j.call(n, E)) || h[E] || Z(N),
          stackId: f ? "radf-stack" : void 0,
          radius: [6, 6, 0, 0],
          onClick: a.onClick
        },
        E
      );
    }) : /* @__PURE__ */ u.jsx(
      ar,
      {
        dataKey: r.y,
        fill: ((x = n == null ? void 0 : n.getColor) == null ? void 0 : x.call(n, r.y)) || Z(0),
        radius: [6, 6, 0, 0],
        onClick: a.onClick,
        children: w ? _.map((E, N) => {
          var B, M;
          const j = E == null ? void 0 : E[r.x], L = E == null ? void 0 : E[r.y], I = (n == null ? void 0 : n.mode) === "category" ? (B = n == null ? void 0 : n.getColor) == null ? void 0 : B.call(n, j) : (M = n == null ? void 0 : n.getColor) == null ? void 0 : M.call(n, L);
          return /* @__PURE__ */ u.jsx(
            wt,
            {
              fill: I || Z(N)
            },
            `cell-${N}`
          );
        }) : null
      }
    )
  ] }) }) });
}
const en = (e, r) => e != null && e.value ? e.value : e != null && e.y ? e.y : r != null && r.length ? Object.keys(r[0]).find((t) => typeof r[0][t] == "number") : null, rn = (e, r, t = {}) => e == null || Number.isNaN(e) ? "--" : typeof e != "number" ? String(e) : r === "currency" ? e.toLocaleString(void 0, {
  style: "currency",
  currency: t.currency || "USD",
  maximumFractionDigits: 0
}) : r === "percent" ? `${(e * 100).toFixed(1)}%` : r === "integer" ? Math.round(e).toLocaleString() : e.toLocaleString(void 0, { maximumFractionDigits: 2 });
function tn({ data: e = [], encodings: r = {}, options: t = {} }) {
  var i;
  const a = k(() => en(r, e), [r, e]), n = a ? (i = e == null ? void 0 : e[0]) == null ? void 0 : i[a] : null, l = rn(n, t.format, t), o = t.label || (r == null ? void 0 : r.label);
  return /* @__PURE__ */ u.jsxs("div", { className: "radf-kpi", children: [
    o ? /* @__PURE__ */ u.jsx("div", { className: "radf-kpi__label", children: o }) : null,
    /* @__PURE__ */ u.jsx("div", { className: "radf-kpi__value", children: l }),
    t.caption ? /* @__PURE__ */ u.jsx("div", { className: "radf-kpi__caption", children: t.caption }) : null
  ] });
}
const Jn = () => {
  xe("line", Za), xe("bar", qa), xe("kpi", tn);
}, Ie = (e, r) => {
  var n;
  if ((n = r == null ? void 0 : r.measures) != null && n.length)
    return r.measures[0];
  const t = e == null ? void 0 : e[0];
  return t && Object.keys(t).find((l) => typeof t[l] == "number") || null;
}, J = (e) => e == null || Number.isNaN(e) ? "0" : Number(e).toLocaleString(void 0, { maximumFractionDigits: 2 }), an = (e, r) => (e || []).map((t) => Number(t == null ? void 0 : t[r])).filter((t) => Number.isFinite(t)), nn = ({ rows: e, querySpec: r, meta: t }) => {
  const a = Ie(e, r);
  if (!a)
    return [];
  const n = an(e, a);
  if (n.length < 2)
    return [];
  const l = n[0], o = n[n.length - 1], i = o - l, d = l !== 0 ? i / Math.abs(l) : null, f = i > 0 ? "upward" : i < 0 ? "downward" : "flat", h = d != null ? Math.abs(d) : null, v = h == null ? "info" : h > 0.2 ? "positive" : h > 0.08 ? "info" : "neutral", y = d == null ? null : `${Math.abs(d * 100).toFixed(1)}%`, T = (t == null ? void 0 : t.rowCount) ?? (e == null ? void 0 : e.length) ?? 0, w = f === "flat" ? `The ${a} metric stayed flat across ${T} points.` : `The ${a} metric moved ${f}, changing ${y || J(Math.abs(i))} from ${J(l)} to ${J(o)} across ${T} points.`;
  return {
    title: `Trend is ${f}`,
    severity: v,
    narrative: w,
    recommendedAction: f === "downward" ? "Investigate recent drivers impacting the downward shift." : f === "upward" ? "Sustain the current momentum and identify leading contributors." : "Monitor for any emerging shifts over the next period.",
    evidence: [
      `Start: ${J(l)}`,
      `End: ${J(o)}`,
      y ? `Net change: ${y}` : `Net change: ${J(i)}`
    ]
  };
}, vr = {
  id: "trend",
  label: "Trend Summary",
  analyze: nn
}, sn = (e) => e.reduce((r, t) => r + t, 0) / e.length, ln = (e, r) => {
  const t = e.reduce((a, n) => a + (n - r) ** 2, 0) / e.length;
  return Math.sqrt(t);
}, on = ({ rows: e, querySpec: r }) => {
  const t = Ie(e, r);
  if (!t)
    return [];
  const a = (e || []).map((d) => Number(d == null ? void 0 : d[t])).filter((d) => Number.isFinite(d));
  if (a.length < 5)
    return [];
  const n = a[a.length - 1], l = sn(a.slice(0, -1)), o = ln(a.slice(0, -1), l);
  if (o === 0)
    return [];
  const i = (n - l) / o;
  return Math.abs(i) < 2.2 ? [] : {
    title: "Recent anomaly detected",
    severity: i > 0 ? "warning" : "negative",
    narrative: `The latest ${t} value deviates from the recent average by ${Math.abs(i).toFixed(1)} standard deviations.`,
    recommendedAction: "Review the contributing drivers behind this spike or dip.",
    evidence: [
      `Latest value: ${n.toLocaleString()}`,
      `Recent average: ${l.toFixed(1)}`
    ]
  };
}, br = {
  id: "anomaly",
  label: "Anomaly Detection",
  analyze: on
}, un = ({ rows: e, querySpec: r }) => {
  var h;
  const t = (h = r == null ? void 0 : r.dimensions) == null ? void 0 : h[0], a = Ie(e, r);
  if (!t || !a)
    return [];
  const n = (e || []).filter((v) => v && v[t] != null);
  if (n.length < 2)
    return [];
  const l = n.reduce((v, y) => v + Number(y[a] || 0), 0);
  if (!l)
    return [];
  const o = [...n].sort((v, y) => (y[a] || 0) - (v[a] || 0)), i = o[0], d = Number(i[a] || 0) / l;
  if (d < 0.2)
    return [];
  const f = o.slice(0, 3).map((v) => {
    const y = Number(v[a] || 0), T = l ? `${(y / l * 100).toFixed(1)}%` : "0%";
    return `${v[t]}: ${y.toLocaleString()} (${T})`;
  });
  return {
    title: `Top driver: ${i[t]}`,
    severity: "info",
    narrative: `${i[t]} contributes ${(d * 100).toFixed(1)}% of ${a}.`,
    recommendedAction: `Validate why ${i[t]} is outpacing other segments and replicate the drivers if positive.`,
    evidence: f
  };
}, yr = {
  id: "topDrivers",
  label: "Top Drivers",
  analyze: un
}, Qn = () => {
  Se(vr.id, vr), Se(br.id, br), Se(yr.id, yr);
}, cn = 12, de = (e, r) => typeof e != "number" || Number.isNaN(e) ? r : e > 0 ? e : r, dn = (e) => {
  if (!e)
    return "radf-grid__item";
  const r = de(e.x, 1), t = de(e.y, 1), a = de(e.w, cn), n = de(e.h, 1);
  return [
    "radf-grid__item",
    `radf-grid__item--col-start-${r}`,
    `radf-grid__item--col-span-${a}`,
    `radf-grid__item--row-start-${t}`,
    `radf-grid__item--row-span-${n}`
  ].join(" ");
};
function Xn({ panels: e, renderPanel: r, className: t }) {
  const a = ["radf-grid", t].filter(Boolean).join(" ");
  return /* @__PURE__ */ u.jsx("div", { className: a, children: e.map((n) => /* @__PURE__ */ u.jsx("div", { className: dn(n.layout), children: r(n) }, n.id)) });
}
function Zn({
  title: e,
  subtitle: r,
  actions: t,
  className: a,
  status: n,
  error: l,
  isEmpty: o,
  emptyMessage: i,
  footer: d,
  children: f
}) {
  const h = ["radf-panel", a].filter(Boolean).join(" ");
  return /* @__PURE__ */ u.jsxs("section", { className: h, children: [
    /* @__PURE__ */ u.jsx(Qt, { title: e, subtitle: r, actions: t }),
    /* @__PURE__ */ u.jsx(
      Jt,
      {
        status: n,
        error: l,
        isEmpty: o,
        emptyMessage: i,
        children: f
      }
    ),
    d ? /* @__PURE__ */ u.jsx("div", { className: "radf-panel__footer", children: d }) : null
  ] });
}
const fn = "Something went wrong", hn = "An unexpected error occurred. You can try reloading the page to continue.";
class Hn extends we.Component {
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
   * - `radf-error-boundary`
   * - `radf-error-boundary__content`
   * - `radf-error-boundary__title`
   * - `radf-error-boundary__message`
   * - `radf-error-boundary__action`
   *
   * @returns {JSX.Element | React.ReactNode}
   */
  render() {
    const { hasError: r } = this.state;
    if (!r)
      return this.props.children;
    const t = this.props.title || fn, a = this.props.message || hn;
    return /* @__PURE__ */ u.jsx("section", { className: "radf-error-boundary", children: /* @__PURE__ */ u.jsxs("div", { className: "radf-error-boundary__content", children: [
      /* @__PURE__ */ u.jsx("h2", { className: "radf-error-boundary__title", children: t }),
      /* @__PURE__ */ u.jsx("p", { className: "radf-error-boundary__message", children: a }),
      /* @__PURE__ */ u.jsx(
        "button",
        {
          className: "radf-button radf-error-boundary__action",
          type: "button",
          onClick: this.handleReset,
          children: "Reload dashboard"
        }
      )
    ] }) });
  }
}
const mn = /* @__PURE__ */ new Set(["kpi", "text", "metric", "number", "markdown"]), vn = /* @__PURE__ */ new Set(["line", "area", "composed", "time-series", "timeseries"]), bn = /* @__PURE__ */ new Set(["bar", "column", "histogram"]), yn = /* @__PURE__ */ new Set(["heatmap", "choropleth", "density"]), V = (e) => e == null ? null : String(e), ne = (e) => {
  if (!Array.isArray(e))
    return [];
  const r = /* @__PURE__ */ new Set(), t = [];
  return e.forEach((a) => {
    const n = V(a);
    !n || r.has(n) || (r.add(n), t.push(n));
  }), t;
}, Yr = (e) => Array.isArray(e == null ? void 0 : e.series) ? e.series.map((r) => ({
  key: V(r == null ? void 0 : r.key),
  label: (r == null ? void 0 : r.label) ?? V(r == null ? void 0 : r.key)
})).filter((r) => r.key) : [], _n = ({ encodings: e, options: r, panelConfig: t, data: a }) => {
  const n = Yr(t);
  if (n.length)
    return n.map((l) => l.key);
  if (Array.isArray(r == null ? void 0 : r.seriesKeys) && r.seriesKeys.length)
    return ne(r.seriesKeys);
  if (Array.isArray(r == null ? void 0 : r.stackedKeys) && r.stackedKeys.length)
    return ne(r.stackedKeys);
  if (Array.isArray(e == null ? void 0 : e.y))
    return ne(e.y);
  if (e != null && e.y)
    return ne([e.y]);
  if (Array.isArray(a) && a.length > 0) {
    const l = a[0] || {};
    return ne(Object.keys(l).filter((o) => o !== (e == null ? void 0 : e.x)));
  }
  return [];
}, _r = (e) => Array.isArray(e == null ? void 0 : e.y) ? e.y[0] : (e == null ? void 0 : e.y) ?? null, pn = ({ panelConfig: e, vizType: r, options: t }) => e != null && e.paletteIntent ? e.paletteIntent : (t == null ? void 0 : t.diverging) === !0 ? "diverging" : yn.has(r) ? "sequential" : "categorical", Q = ({ seriesKeys: e, seriesDefinitions: r }) => {
  const t = new Map(r.map((l) => [l.key, l.label])), a = e.map((l, o) => ({
    key: l,
    label: t.get(l) ?? l,
    colorVar: H(o)
  })), n = new Map(a.map((l) => [l.key, l.colorVar]));
  return {
    items: a,
    getColor: (l) => n.get(V(l)) ?? H(0),
    getLabel: (l) => t.get(V(l)) ?? V(l)
  };
}, En = ({ data: e, xKey: r }) => {
  const t = Array.isArray(e) ? e.map((i) => i == null ? void 0 : i[r]).filter((i) => i != null) : [], a = Array.from(new Set(t)), n = a.every((i) => typeof i == "number");
  a.sort((i, d) => n ? i - d : String(i).localeCompare(String(d), void 0, { numeric: !0 }));
  const l = a.map((i, d) => {
    const f = V(i);
    return {
      key: f,
      label: f,
      colorVar: H(d)
    };
  }), o = new Map(l.map((i) => [i.key, i.colorVar]));
  return {
    items: l,
    getColor: (i) => o.get(V(i)) ?? H(0),
    getLabel: (i) => V(i)
  };
}, gn = ({ data: e, valueKey: r }) => {
  const t = Array.isArray(e) ? e.map((f) => f == null ? void 0 : f[r]).filter((f) => typeof f == "number" && Number.isFinite(f)) : [];
  let a = 0, n = 0;
  t.forEach((f) => {
    a = Math.min(a, f), n = Math.max(n, f);
  });
  const l = Math.max(Math.abs(a), Math.abs(n)), o = a < 0 && n > 0;
  return {
    items: [
      { key: "neg", label: "Negative", colorVar: G("neg", 3) },
      { key: "zero", label: "Neutral", colorVar: G("zero") },
      { key: "pos", label: "Positive", colorVar: G("pos", 3) }
    ],
    getColor: (f) => {
      if (!o || !Number.isFinite(f))
        return H(0);
      if (f === 0)
        return G("zero");
      if (l === 0)
        return G(f < 0 ? "neg" : "pos", 1);
      const h = Math.min(1, Math.abs(f) / l), v = Math.max(1, Math.ceil(h * 4));
      return G(f < 0 ? "neg" : "pos", v);
    },
    getLabel: (f) => f === "neg" ? "Negative" : f === "pos" ? "Positive" : f === "zero" ? "Neutral" : null
  };
}, xn = ({ data: e, valueKey: r }) => {
  const t = Array.isArray(e) ? e.map((i) => i == null ? void 0 : i[r]).filter((i) => typeof i == "number" && Number.isFinite(i)) : [];
  let a = 0, n = 0;
  t.forEach((i) => {
    a = Math.min(a, i), n = Math.max(n, i);
  });
  const l = n - a;
  return {
    items: [],
    getColor: (i) => {
      if (!Number.isFinite(i))
        return je(1);
      if (l === 0)
        return je(5);
      const d = (i - a) / l, f = Math.max(1, Math.min(9, Math.ceil(d * 9)));
      return je(f);
    },
    getLabel: () => null
  };
}, Sn = ({
  panelConfig: e,
  vizType: r,
  encodings: t,
  options: a,
  data: n
}) => {
  if ((e == null ? void 0 : e.panelType) !== "viz" || mn.has(r))
    return null;
  const l = pn({ panelConfig: e, vizType: r, options: a });
  if (l === "none")
    return null;
  const o = Yr(e), i = _n({ encodings: t, options: a, panelConfig: e, data: n }), d = o.length > 0 || Array.isArray(t == null ? void 0 : t.y) || Array.isArray(a == null ? void 0 : a.seriesKeys) && a.seriesKeys.length > 1 || Array.isArray(a == null ? void 0 : a.stackedKeys) && a.stackedKeys.length > 0;
  if (l === "diverging" && (a == null ? void 0 : a.diverging) === !0) {
    const h = _r(t);
    return {
      mode: "diverging",
      ...gn({ data: n, valueKey: h })
    };
  }
  if (l === "sequential") {
    const h = _r(t);
    return {
      mode: "sequential",
      ...xn({ data: n, valueKey: h })
    };
  }
  return vn.has(r) ? d ? {
    mode: "series",
    ...Q({ seriesKeys: i, seriesDefinitions: o })
  } : { mode: "single", ...Q({
    seriesKeys: i.slice(0, 1),
    seriesDefinitions: o
  }) } : bn.has(r) ? d ? {
    mode: "series",
    ...Q({ seriesKeys: i, seriesDefinitions: o })
  } : (a == null ? void 0 : a.colorBy) === "category" || (a == null ? void 0 : a.legendMode) === "category" || (a == null ? void 0 : a.legend) === !0 ? {
    mode: "category",
    ...En({ data: n, xKey: t == null ? void 0 : t.x })
  } : { mode: "single", ...Q({
    seriesKeys: i.slice(0, 1),
    seriesDefinitions: o
  }) } : i.length > 1 ? {
    mode: "series",
    ...Q({ seriesKeys: i, seriesDefinitions: o })
  } : { mode: "single", ...Q({
    seriesKeys: i.slice(0, 1),
    seriesDefinitions: o
  }) };
}, jn = (e) => {
  if (typeof e != "string")
    return "radf-swatch--1";
  const r = e.match(/--radf-series-(\d+)/);
  if (r)
    return `radf-swatch--${r[1]}`;
  const t = e.match(/--radf-seq-(\d+)/);
  if (t)
    return `radf-swatch--seq-${t[1]}`;
  const a = e.match(/--radf-div-neg-(\d+)/);
  if (a)
    return `radf-swatch--div-neg-${a[1]}`;
  const n = e.match(/--radf-div-pos-(\d+)/);
  return n ? `radf-swatch--div-pos-${n[1]}` : e.includes("--radf-div-zero") ? "radf-swatch--div-zero" : "radf-swatch--1";
};
function Rn({
  items: e = [],
  hiddenKeys: r,
  onToggle: t,
  position: a = "bottom"
}) {
  if (!e.length)
    return null;
  const n = typeof t == "function";
  return /* @__PURE__ */ u.jsx("div", { className: ["radf-legend", `radf-legend--${a}`].join(" "), children: /* @__PURE__ */ u.jsx("ul", { className: "radf-legend__list", children: e.map((l) => {
    const o = r == null ? void 0 : r.has(l.key), i = jn(l.colorVar);
    return /* @__PURE__ */ u.jsx(
      "li",
      {
        className: [
          "radf-legend__item",
          i,
          n ? "radf-legend__item--toggleable" : "",
          o ? "radf-legend__item--hidden" : ""
        ].filter(Boolean).join(" "),
        children: /* @__PURE__ */ u.jsxs(
          "button",
          {
            className: "radf-legend__button",
            type: "button",
            onClick: () => {
              n && t(l.key);
            },
            children: [
              /* @__PURE__ */ u.jsx("span", { className: "radf-legend__swatch" }),
              /* @__PURE__ */ u.jsx("span", { className: "radf-legend__label", children: l.label })
            ]
          }
        )
      },
      l.key
    );
  }) }) });
}
function qn({
  panelConfig: e,
  vizType: r,
  data: t,
  encodings: a,
  options: n,
  handlers: l
}) {
  const o = Mr.get(r), i = k(
    () => Sn({
      panelConfig: e,
      vizType: r,
      encodings: a,
      options: n,
      data: t
    }),
    [e, r, a, n, t]
  ), [d, f] = Sr(/* @__PURE__ */ new Set()), h = k(() => (i == null ? void 0 : i.items) ?? [], [i]), v = (n == null ? void 0 : n.legendMode) ?? "auto", y = (n == null ? void 0 : n.legendPosition) ?? "bottom", T = (n == null ? void 0 : n.legend) !== !1 && h.length > 0 && (v !== "auto" || h.length > 1), w = (i == null ? void 0 : i.mode) === "series" || (i == null ? void 0 : i.mode) === "category", _ = jr(
    (j) => {
      w && f((L) => {
        const I = new Set(L);
        return I.has(j) ? I.delete(j) : I.add(j), I;
      });
    },
    [w]
  );
  if (Rr(() => {
    if (!d.size)
      return;
    const j = new Set(h.map((I) => I.key)), L = [...d].filter((I) => j.has(I));
    L.length !== d.size && f(new Set(L));
  }, [h, d]), !o)
    return /* @__PURE__ */ u.jsxs("div", { className: "radf-viz__missing", children: [
      /* @__PURE__ */ u.jsx("p", { className: "radf-viz__missing-title", children: "Visualization unavailable" }),
      /* @__PURE__ */ u.jsxs("p", { className: "radf-viz__missing-text", children: [
        'The viz type "',
        r,
        '" has not been registered yet.'
      ] })
    ] });
  const x = y === "right" ? "radf-viz__layout radf-viz__layout--right" : "radf-viz__layout", E = T ? /* @__PURE__ */ u.jsx(
    Rn,
    {
      items: h,
      hiddenKeys: d,
      onToggle: w ? _ : void 0,
      position: y
    }
  ) : null, N = /* @__PURE__ */ u.jsx(
    o,
    {
      data: t,
      encodings: a,
      options: n,
      handlers: l,
      colorAssignment: i,
      hiddenKeys: d
    }
  );
  return /* @__PURE__ */ u.jsxs("div", { className: x, children: [
    y === "top" ? E : null,
    N,
    y !== "top" ? E : null
  ] });
}
const Nn = (e = []) => e.length ? /* @__PURE__ */ u.jsx("ul", { className: "radf-insight-card__evidence", children: e.map((r, t) => /* @__PURE__ */ u.jsx("li", { className: "radf-insight-card__evidence-item", children: r }, `${r}-${t}`)) }) : null;
function es({ insights: e = [] }) {
  return /* @__PURE__ */ u.jsx("div", { className: "radf-insights", children: e.map((r) => /* @__PURE__ */ u.jsxs(
    "article",
    {
      className: `radf-insight-card radf-insight-card--${r.severity || "info"}`,
      children: [
        /* @__PURE__ */ u.jsxs("header", { className: "radf-insight-card__header", children: [
          /* @__PURE__ */ u.jsxs("div", { children: [
            /* @__PURE__ */ u.jsx("h3", { className: "radf-insight-card__title", children: r.title }),
            r.source ? /* @__PURE__ */ u.jsxs("p", { className: "radf-insight-card__source", children: [
              "Source: ",
              r.source
            ] }) : null
          ] }),
          r.severity ? /* @__PURE__ */ u.jsx("span", { className: "radf-insight-card__badge", children: r.severity }) : null
        ] }),
        r.narrative ? /* @__PURE__ */ u.jsx("p", { className: "radf-insight-card__narrative", children: r.narrative }) : null,
        Nn(r.evidence),
        r.recommendedAction ? /* @__PURE__ */ u.jsxs("p", { className: "radf-insight-card__action", children: [
          /* @__PURE__ */ u.jsx("strong", { children: "Recommended:" }),
          " ",
          r.recommendedAction
        ] }) : null
      ]
    },
    r.id
  )) });
}
const Wr = (e) => Array.isArray(e) ? e : e ? [e] : [], Tn = ({ insight: e, fallbackId: r, analyzerId: t, analyzerLabel: a }) => {
  if (!e || typeof e != "object")
    return null;
  const n = e.title || a || "Insight";
  return {
    id: e.id || r,
    title: n,
    severity: e.severity || "info",
    narrative: e.narrative || "",
    recommendedAction: e.recommendedAction || null,
    evidence: Wr(e.evidence),
    source: e.source || t
  };
}, Dn = {
  /**
   * Run analyzers and normalize the resulting insights for rendering.
   * @param {InsightEngineParams} params - Input data and analyzer list.
   * @returns {Insight[]} Normalized insights.
   */
  analyze({ rows: e = [], meta: r = null, querySpec: t = null, dashboardState: a = null, analyzers: n = [] }) {
    const l = { rows: e, meta: r, querySpec: t, dashboardState: a };
    return n.flatMap((o, i) => {
      if (!o || typeof o.analyze != "function")
        return [];
      const d = o.analyze(l);
      return Wr(d).map(
        (h, v) => Tn({
          insight: h,
          analyzerId: o.id,
          analyzerLabel: o.label,
          fallbackId: `${o.id || "insight"}-${i}-${v}`
        })
      ).filter(Boolean);
    });
  }
}, wn = (e) => Array.isArray(e) && e.length ? e : De.list().map((r) => De.get(r)).filter(Boolean), rs = ({
  rows: e = [],
  meta: r = null,
  querySpec: t = null,
  dashboardState: a = null,
  analyzers: n,
  enabled: l = !0
} = {}) => {
  const o = k(() => wn(n), [n]), i = k(() => l ? Dn.analyze({
    rows: e,
    meta: r,
    querySpec: t,
    dashboardState: a,
    analyzers: o
  }) : [], [e, r, t, a, o, l]);
  return {
    insights: i,
    hasInsights: i.length > 0
  };
}, ts = ({ drillPath: e = [], onCrumbClick: r, onReset: t }) => e.length ? /* @__PURE__ */ u.jsxs("div", { className: "radf-drill", children: [
  /* @__PURE__ */ u.jsx("span", { className: "radf-drill__title", children: "Drill path" }),
  /* @__PURE__ */ u.jsx("div", { className: "radf-drill__crumbs", children: e.map((a, n) => /* @__PURE__ */ u.jsx(
    "button",
    {
      type: "button",
      className: "radf-drill__crumb",
      onClick: () => r == null ? void 0 : r(n),
      children: Pe(a)
    },
    a.id || `${a.dimension}-${n}`
  )) }),
  /* @__PURE__ */ u.jsx("button", { type: "button", className: "radf-drill__reset", onClick: t, children: "Reset" })
] }) : null, pr = (e, r, t) => Math.min(t, Math.max(r, e)), as = ({ data: e, startIndex: r, endIndex: t, xKey: a }) => {
  var h, v;
  if (!Array.isArray(e) || e.length === 0 || !a)
    return null;
  const n = pr(r ?? 0, 0, e.length - 1), l = pr(t ?? e.length - 1, 0, e.length - 1), o = Math.min(n, l), i = Math.max(n, l), d = (h = e[o]) == null ? void 0 : h[a], f = (v = e[i]) == null ? void 0 : v[a];
  return d === void 0 || f === void 0 ? null : {
    startIndex: o,
    endIndex: i,
    startValue: d,
    endValue: f
  };
}, ns = (e) => e ? e.startValue === e.endValue ? `${e.startValue}` : `${e.startValue} – ${e.endValue}` : "Full range", ss = ({ field: e, range: r }) => {
  if (!e || !r || r.startValue === void 0 || r.endValue === void 0)
    return null;
  const [t, a] = r.startValue <= r.endValue ? [r.startValue, r.endValue] : [r.endValue, r.startValue];
  return {
    field: e,
    op: "BETWEEN",
    values: [t, a]
  };
}, ls = (e = [], r) => r ? [
  ...e.filter((t) => t.field !== r.field),
  r
] : e, is = (e = [], r) => r ? e.filter((t) => t.field !== r) : e, Pn = /* @__PURE__ */ new Set(["kpi", "text", "metric", "number", "markdown"]), In = /* @__PURE__ */ new Set(["heatmap", "choropleth", "density"]), $n = ({ panelConfig: e, vizType: r }) => (e == null ? void 0 : e.vizRole) === "text" || Pn.has(r), Er = ({ panelConfig: e, vizType: r, options: t }) => e != null && e.paletteIntent ? e.paletteIntent : (t == null ? void 0 : t.diverging) === !0 ? "diverging" : In.has(r) ? "sequential" : "categorical", On = (e) => e === "diverging" ? "rdylgn" : e === "sequential" ? "viridis" : "analytics", os = ({ panelConfig: e, vizType: r, encodings: t, options: a, data: n }) => {
  if ((e == null ? void 0 : e.panelType) !== "viz" || $n({ panelConfig: e, vizType: r }) || (e == null ? void 0 : e.paletteIntent) === "none")
    return null;
  if (e != null && e.paletteId)
    return {
      paletteId: e.paletteId,
      paletteClass: hr(e.paletteId),
      intent: Er({ panelConfig: e, vizType: r, options: a })
    };
  const l = Er({ panelConfig: e, vizType: r, options: a });
  if (l === "none")
    return null;
  const o = On(l);
  return {
    paletteId: o,
    paletteClass: hr(o),
    intent: l
  };
}, us = ({
  id: e,
  label: r,
  dimensions: t = [],
  metrics: a = [],
  hierarchies: n = [],
  defaultGrain: l = null,
  timezone: o = "UTC"
} = {}) => {
  if (!e)
    throw new Error("Dataset requires an id");
  if (!r)
    throw new Error(`Dataset ${e} requires a label`);
  const i = Object.fromEntries(
    t.map((f) => [f.id, f])
  ), d = Object.fromEntries(
    a.map((f) => [f.id, f])
  );
  return {
    id: e,
    label: r,
    dimensions: t,
    metrics: a,
    hierarchies: n,
    defaultGrain: l,
    timezone: o,
    fields: {
      dimensions: t,
      metrics: a,
      dimensionById: i,
      metricById: d
    }
  };
}, cs = ({ id: e, type: r, levels: t, label: a }) => ({
  id: e,
  type: r,
  levels: t,
  label: a || e
}), Gr = {
  STRING: "string",
  NUMBER: "number",
  DATE: "date",
  BOOLEAN: "boolean",
  GEO: "geo"
}, Ln = Object.values(Gr), Fn = (e) => Ln.includes(e), ds = ({ id: e, label: r, type: t, hierarchy: a, formatter: n } = {}) => {
  if (!e)
    throw new Error("Dimension requires an id");
  if (!r)
    throw new Error(`Dimension ${e} requires a label`);
  if (!Fn(t))
    throw new Error(
      `Dimension ${e} has invalid type. Expected one of ${Object.values(
        Gr
      ).join(", ")}.`
    );
  return {
    id: e,
    label: r,
    type: t,
    hierarchy: a || null,
    formatter: n || null
  };
}, fs = ({
  id: e,
  label: r,
  format: t,
  dependsOn: a,
  query: n,
  compute: l,
  validGrains: o,
  constraints: i
} = {}) => {
  if (!e)
    throw new Error("Metric requires an id");
  if (!r)
    throw new Error(`Metric ${e} requires a label`);
  if (!n && !l)
    throw new Error(`Metric ${e} must define query or compute`);
  return {
    id: e,
    label: r,
    format: t || "number",
    dependsOn: a || [],
    query: n || null,
    compute: l || null,
    validGrains: o || [],
    constraints: i || null
  };
};
export {
  kn as DashboardProvider,
  Ea as DataProvider,
  ts as DrillBreadcrumbs,
  Hn as ErrorBoundary,
  Gr as FIELD_TYPES,
  Xn as GridLayout,
  es as InsightsPanel,
  Wn as MockDataProvider,
  Zn as Panel,
  Jt as PanelBody,
  Qt as PanelHeader,
  qn as VizRenderer,
  ra as applyDrilldownToDimensions,
  xa as assertDataProvider,
  ss as buildBrushFilter,
  zn as buildCrossFilterSelectionFromEvent,
  Kn as buildDrilldownEntryFromEvent,
  na as buildQuerySpec,
  Ea as createDataProvider,
  us as createDataset,
  ds as createDimension,
  cs as createHierarchy,
  fs as createMetric,
  Yn as dashboardSelectors,
  ns as formatBrushRangeLabel,
  as as getBrushRange,
  ga as isDataProvider,
  Un as isDrilldownDuplicate,
  Bn as isSelectionDuplicate,
  Jn as registerCharts,
  Qn as registerInsights,
  is as removeBrushFilter,
  os as resolvePalette,
  ls as upsertBrushFilter,
  Vn as useDashboardActions,
  Mn as useDashboardState,
  rs as useInsights,
  Gn as useQuery
};
