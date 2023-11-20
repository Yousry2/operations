import {
     D as yt,
     L as gt,
     T as _t,
     V as Et,
     X as St,
     da as vt,
     ea as Tt,
     fa as wt,
     ga as bt,
     ha as At,
     i as S,
     ia as Pt,
     j as pe,
     ja as Mt,
     ka as Nt,
     m as ne,
     o as mt,
     t as Ie,
     w as pt,
} from './chunk-THPUVWE3.js';
var Dt = [
     { path: '', pathMatch: 'full', redirectTo: 'auth' },
     { path: 'auth', loadChildren: () => import('./chunk-URT3E6J4.js').then((n) => n.fedexAuthRoutes) },
];
var q = '*';
function Ct(n, e = null) {
     return { type: 2, steps: n, options: e };
}
function Le(n) {
     return { type: 6, styles: n, offset: null };
}
var U = class {
          constructor(e = 0, t = 0) {
               (this._onDoneFns = []),
                    (this._onStartFns = []),
                    (this._onDestroyFns = []),
                    (this._originalOnDoneFns = []),
                    (this._originalOnStartFns = []),
                    (this._started = !1),
                    (this._destroyed = !1),
                    (this._finished = !1),
                    (this._position = 0),
                    (this.parentPlayer = null),
                    (this.totalTime = e + t);
          }
          _onFinish() {
               this._finished || ((this._finished = !0), this._onDoneFns.forEach((e) => e()), (this._onDoneFns = []));
          }
          onStart(e) {
               this._originalOnStartFns.push(e), this._onStartFns.push(e);
          }
          onDone(e) {
               this._originalOnDoneFns.push(e), this._onDoneFns.push(e);
          }
          onDestroy(e) {
               this._onDestroyFns.push(e);
          }
          hasStarted() {
               return this._started;
          }
          init() {}
          play() {
               this.hasStarted() || (this._onStart(), this.triggerMicrotask()), (this._started = !0);
          }
          triggerMicrotask() {
               queueMicrotask(() => this._onFinish());
          }
          _onStart() {
               this._onStartFns.forEach((e) => e()), (this._onStartFns = []);
          }
          pause() {}
          restart() {}
          finish() {
               this._onFinish();
          }
          destroy() {
               this._destroyed ||
                    ((this._destroyed = !0),
                    this.hasStarted() || this._onStart(),
                    this.finish(),
                    this._onDestroyFns.forEach((e) => e()),
                    (this._onDestroyFns = []));
          }
          reset() {
               (this._started = !1),
                    (this._finished = !1),
                    (this._onStartFns = this._originalOnStartFns),
                    (this._onDoneFns = this._originalOnDoneFns);
          }
          setPosition(e) {
               this._position = this.totalTime ? e * this.totalTime : 1;
          }
          getPosition() {
               return this.totalTime ? this._position / this.totalTime : 1;
          }
          triggerCallback(e) {
               let t = e == 'start' ? this._onStartFns : this._onDoneFns;
               t.forEach((s) => s()), (t.length = 0);
          }
     },
     re = class {
          constructor(e) {
               (this._onDoneFns = []),
                    (this._onStartFns = []),
                    (this._finished = !1),
                    (this._started = !1),
                    (this._destroyed = !1),
                    (this._onDestroyFns = []),
                    (this.parentPlayer = null),
                    (this.totalTime = 0),
                    (this.players = e);
               let t = 0,
                    s = 0,
                    i = 0,
                    r = this.players.length;
               r == 0
                    ? queueMicrotask(() => this._onFinish())
                    : this.players.forEach((o) => {
                           o.onDone(() => {
                                ++t == r && this._onFinish();
                           }),
                                o.onDestroy(() => {
                                     ++s == r && this._onDestroy();
                                }),
                                o.onStart(() => {
                                     ++i == r && this._onStart();
                                });
                      }),
                    (this.totalTime = this.players.reduce((o, a) => Math.max(o, a.totalTime), 0));
          }
          _onFinish() {
               this._finished || ((this._finished = !0), this._onDoneFns.forEach((e) => e()), (this._onDoneFns = []));
          }
          init() {
               this.players.forEach((e) => e.init());
          }
          onStart(e) {
               this._onStartFns.push(e);
          }
          _onStart() {
               this.hasStarted() ||
                    ((this._started = !0), this._onStartFns.forEach((e) => e()), (this._onStartFns = []));
          }
          onDone(e) {
               this._onDoneFns.push(e);
          }
          onDestroy(e) {
               this._onDestroyFns.push(e);
          }
          hasStarted() {
               return this._started;
          }
          play() {
               this.parentPlayer || this.init(), this._onStart(), this.players.forEach((e) => e.play());
          }
          pause() {
               this.players.forEach((e) => e.pause());
          }
          restart() {
               this.players.forEach((e) => e.restart());
          }
          finish() {
               this._onFinish(), this.players.forEach((e) => e.finish());
          }
          destroy() {
               this._onDestroy();
          }
          _onDestroy() {
               this._destroyed ||
                    ((this._destroyed = !0),
                    this._onFinish(),
                    this.players.forEach((e) => e.destroy()),
                    this._onDestroyFns.forEach((e) => e()),
                    (this._onDestroyFns = []));
          }
          reset() {
               this.players.forEach((e) => e.reset()),
                    (this._destroyed = !1),
                    (this._finished = !1),
                    (this._started = !1);
          }
          setPosition(e) {
               let t = e * this.totalTime;
               this.players.forEach((s) => {
                    let i = s.totalTime ? Math.min(1, t / s.totalTime) : 1;
                    s.setPosition(i);
               });
          }
          getPosition() {
               let e = this.players.reduce((t, s) => (t === null || s.totalTime > t.totalTime ? s : t), null);
               return e != null ? e.getPosition() : 0;
          }
          beforeDestroy() {
               this.players.forEach((e) => {
                    e.beforeDestroy && e.beforeDestroy();
               });
          }
          triggerCallback(e) {
               let t = e == 'start' ? this._onStartFns : this._onDoneFns;
               t.forEach((s) => s()), (t.length = 0);
          }
     },
     ye = '!';
function kt(n) {
     return new S(3e3, !1);
}
function cs() {
     return new S(3100, !1);
}
function fs() {
     return new S(3101, !1);
}
function ds(n) {
     return new S(3001, !1);
}
function ms(n) {
     return new S(3003, !1);
}
function ps(n) {
     return new S(3004, !1);
}
function ys(n, e) {
     return new S(3005, !1);
}
function gs() {
     return new S(3006, !1);
}
function _s() {
     return new S(3007, !1);
}
function Es(n, e) {
     return new S(3008, !1);
}
function Ss(n) {
     return new S(3002, !1);
}
function vs(n, e, t, s, i) {
     return new S(3010, !1);
}
function Ts() {
     return new S(3011, !1);
}
function ws() {
     return new S(3012, !1);
}
function bs() {
     return new S(3200, !1);
}
function As() {
     return new S(3202, !1);
}
function Ps() {
     return new S(3013, !1);
}
function Ms(n) {
     return new S(3014, !1);
}
function Ns(n) {
     return new S(3015, !1);
}
function Ds(n) {
     return new S(3016, !1);
}
function Cs(n, e) {
     return new S(3404, !1);
}
function ks(n) {
     return new S(3502, !1);
}
function Fs(n) {
     return new S(3503, !1);
}
function Os() {
     return new S(3300, !1);
}
function Rs(n) {
     return new S(3504, !1);
}
function Is(n) {
     return new S(3301, !1);
}
function Ls(n, e) {
     return new S(3302, !1);
}
function zs(n) {
     return new S(3303, !1);
}
function qs(n, e) {
     return new S(3400, !1);
}
function Ks(n) {
     return new S(3401, !1);
}
function Bs(n) {
     return new S(3402, !1);
}
function Qs(n, e) {
     return new S(3505, !1);
}
function W(n) {
     switch (n.length) {
          case 0:
               return new U();
          case 1:
               return n[0];
          default:
               return new re(n);
     }
}
function Wt(n, e, t = new Map(), s = new Map()) {
     let i = [],
          r = [],
          o = -1,
          a = null;
     if (
          (e.forEach((l) => {
               let h = l.get('offset'),
                    c = h == o,
                    u = (c && a) || new Map();
               l.forEach((_, g) => {
                    let d = g,
                         y = _;
                    if (g !== 'offset')
                         switch (((d = n.normalizePropertyName(d, i)), y)) {
                              case ye:
                                   y = t.get(g);
                                   break;
                              case q:
                                   y = s.get(g);
                                   break;
                              default:
                                   y = n.normalizeStyleValue(g, d, y, i);
                                   break;
                         }
                    u.set(d, y);
               }),
                    c || r.push(u),
                    (a = u),
                    (o = h);
          }),
          i.length)
     )
          throw ks(i);
     return r;
}
function nt(n, e, t, s) {
     switch (e) {
          case 'start':
               n.onStart(() => s(t && ze(t, 'start', n)));
               break;
          case 'done':
               n.onDone(() => s(t && ze(t, 'done', n)));
               break;
          case 'destroy':
               n.onDestroy(() => s(t && ze(t, 'destroy', n)));
               break;
     }
}
function ze(n, e, t) {
     let s = t.totalTime,
          i = !!t.disabled,
          r = rt(n.element, n.triggerName, n.fromState, n.toState, e || n.phaseName, s ?? n.totalTime, i),
          o = n._data;
     return o != null && (r._data = o), r;
}
function rt(n, e, t, s, i = '', r = 0, o) {
     return { element: n, triggerName: e, fromState: t, toState: s, phaseName: i, totalTime: r, disabled: !!o };
}
function F(n, e, t) {
     let s = n.get(e);
     return s || n.set(e, (s = t)), s;
}
function Ft(n) {
     let e = n.indexOf(':'),
          t = n.substring(1, e),
          s = n.slice(e + 1);
     return [t, s];
}
var $s = (() => (typeof document > 'u' ? null : document.documentElement))();
function ot(n) {
     let e = n.parentNode || n.host || null;
     return e === $s ? null : e;
}
function Vs(n) {
     return n.substring(1, 6) == 'ebkit';
}
var x = null,
     Ot = !1;
function js(n) {
     x || ((x = Us() || {}), (Ot = x.style ? 'WebkitAppearance' in x.style : !1));
     let e = !0;
     return (
          x.style &&
               !Vs(n) &&
               ((e = n in x.style), !e && Ot && (e = 'Webkit' + n.charAt(0).toUpperCase() + n.slice(1) in x.style)),
          e
     );
}
function Us() {
     return typeof document < 'u' ? document.body : null;
}
function Gt(n, e) {
     for (; e; ) {
          if (e === n) return !0;
          e = ot(e);
     }
     return !1;
}
function Ht(n, e, t) {
     if (t) return Array.from(n.querySelectorAll(e));
     let s = n.querySelector(e);
     return s ? [s] : [];
}
var at = (() => {
          let e = class e {
               validateStyleProperty(s) {
                    return js(s);
               }
               matchesElement(s, i) {
                    return !1;
               }
               containsElement(s, i) {
                    return Gt(s, i);
               }
               getParentElement(s) {
                    return ot(s);
               }
               query(s, i, r) {
                    return Ht(s, i, r);
               }
               computeStyle(s, i, r) {
                    return r || '';
               }
               animate(s, i, r, o, a, l = [], h) {
                    return new U(r, o);
               }
          };
          (e.ɵfac = function (i) {
               return new (i || e)();
          }),
               (e.ɵprov = pe({ token: e, factory: e.ɵfac }));
          let n = e;
          return n;
     })(),
     fe = (() => {
          let e = class e {};
          e.NOOP = new at();
          let n = e;
          return n;
     })(),
     Z = class {};
var Ws = 1e3,
     xt = '{{',
     Gs = '}}',
     Yt = 'ng-enter',
     Ve = 'ng-leave',
     ge = 'ng-trigger',
     Te = '.ng-trigger',
     Rt = 'ng-animating',
     je = '.ng-animating';
function V(n) {
     if (typeof n == 'number') return n;
     let e = n.match(/^(-?[\.\d]+)(m?s)/);
     return !e || e.length < 2 ? 0 : Ue(parseFloat(e[1]), e[2]);
}
function Ue(n, e) {
     switch (e) {
          case 's':
               return n * Ws;
          default:
               return n;
     }
}
function we(n, e, t) {
     return n.hasOwnProperty('duration') ? n : Hs(n, e, t);
}
function Hs(n, e, t) {
     let s = /^(-?[\.\d]+)(m?s)(?:\s+(-?[\.\d]+)(m?s))?(?:\s+([-a-z]+(?:\(.+?\))?))?$/i,
          i,
          r = 0,
          o = '';
     if (typeof n == 'string') {
          let a = n.match(s);
          if (a === null) return e.push(kt(n)), { duration: 0, delay: 0, easing: '' };
          i = Ue(parseFloat(a[1]), a[2]);
          let l = a[3];
          l != null && (r = Ue(parseFloat(l), a[4]));
          let h = a[5];
          h && (o = h);
     } else i = n;
     if (!t) {
          let a = !1,
               l = e.length;
          i < 0 && (e.push(cs()), (a = !0)), r < 0 && (e.push(fs()), (a = !0)), a && e.splice(l, 0, kt(n));
     }
     return { duration: i, delay: r, easing: o };
}
function de(n, e = {}) {
     return (
          Object.keys(n).forEach((t) => {
               e[t] = n[t];
          }),
          e
     );
}
function Xt(n) {
     let e = new Map();
     return (
          Object.keys(n).forEach((t) => {
               let s = n[t];
               e.set(t, s);
          }),
          e
     );
}
function xs(n) {
     return n.length ? (n[0] instanceof Map ? n : n.map((e) => Xt(e))) : [];
}
function te(n, e = new Map(), t) {
     if (t) for (let [s, i] of t) e.set(s, i);
     for (let [s, i] of n) e.set(s, i);
     return e;
}
function K(n, e, t) {
     e.forEach((s, i) => {
          let r = lt(i);
          t && !t.has(i) && t.set(i, n.style[r]), (n.style[r] = s);
     });
}
function X(n, e) {
     e.forEach((t, s) => {
          let i = lt(s);
          n.style[i] = '';
     });
}
function oe(n) {
     return Array.isArray(n) ? (n.length == 1 ? n[0] : Ct(n)) : n;
}
function Ys(n, e, t) {
     let s = e.params || {},
          i = Zt(n);
     i.length &&
          i.forEach((r) => {
               s.hasOwnProperty(r) || t.push(ds(r));
          });
}
var We = new RegExp(`${xt}\\s*(.+?)\\s*${Gs}`, 'g');
function Zt(n) {
     let e = [];
     if (typeof n == 'string') {
          let t;
          for (; (t = We.exec(n)); ) e.push(t[1]);
          We.lastIndex = 0;
     }
     return e;
}
function le(n, e, t) {
     let s = n.toString(),
          i = s.replace(We, (r, o) => {
               let a = e[o];
               return a == null && (t.push(ms(o)), (a = '')), a.toString();
          });
     return i == s ? n : i;
}
function be(n) {
     let e = [],
          t = n.next();
     for (; !t.done; ) e.push(t.value), (t = n.next());
     return e;
}
var Xs = /-+([a-z0-9])/g;
function lt(n) {
     return n.replace(Xs, (...e) => e[1].toUpperCase());
}
function Zs(n, e) {
     return n === 0 || e === 0;
}
function Js(n, e, t) {
     if (t.size && e.length) {
          let s = e[0],
               i = [];
          if (
               (t.forEach((r, o) => {
                    s.has(o) || i.push(o), s.set(o, r);
               }),
               i.length)
          )
               for (let r = 1; r < e.length; r++) {
                    let o = e[r];
                    i.forEach((a) => o.set(a, Jt(n, a)));
               }
     }
     return e;
}
function k(n, e, t) {
     switch (e.type) {
          case 7:
               return n.visitTrigger(e, t);
          case 0:
               return n.visitState(e, t);
          case 1:
               return n.visitTransition(e, t);
          case 2:
               return n.visitSequence(e, t);
          case 3:
               return n.visitGroup(e, t);
          case 4:
               return n.visitAnimate(e, t);
          case 5:
               return n.visitKeyframes(e, t);
          case 6:
               return n.visitStyle(e, t);
          case 8:
               return n.visitReference(e, t);
          case 9:
               return n.visitAnimateChild(e, t);
          case 10:
               return n.visitAnimateRef(e, t);
          case 11:
               return n.visitQuery(e, t);
          case 12:
               return n.visitStagger(e, t);
          default:
               throw ps(e.type);
     }
}
function Jt(n, e) {
     return window.getComputedStyle(n)[e];
}
var ei = new Set([
          'width',
          'height',
          'minWidth',
          'minHeight',
          'maxWidth',
          'maxHeight',
          'left',
          'top',
          'bottom',
          'right',
          'fontSize',
          'outlineWidth',
          'outlineOffset',
          'paddingTop',
          'paddingLeft',
          'paddingBottom',
          'paddingRight',
          'marginTop',
          'marginLeft',
          'marginBottom',
          'marginRight',
          'borderRadius',
          'borderWidth',
          'borderTopWidth',
          'borderLeftWidth',
          'borderRightWidth',
          'borderBottomWidth',
          'textIndent',
          'perspective',
     ]),
     Ae = class extends Z {
          normalizePropertyName(e, t) {
               return lt(e);
          }
          normalizeStyleValue(e, t, s, i) {
               let r = '',
                    o = s.toString().trim();
               if (ei.has(t) && s !== 0 && s !== '0')
                    if (typeof s == 'number') r = 'px';
                    else {
                         let a = s.match(/^[+-]?[\d\.]+([a-z]*)$/);
                         a && a[1].length == 0 && i.push(ys(e, s));
                    }
               return o + r;
          }
     };
var Pe = '*';
function ti(n, e) {
     let t = [];
     return typeof n == 'string' ? n.split(/\s*,\s*/).forEach((s) => si(s, t, e)) : t.push(n), t;
}
function si(n, e, t) {
     if (n[0] == ':') {
          let l = ii(n, t);
          if (typeof l == 'function') {
               e.push(l);
               return;
          }
          n = l;
     }
     let s = n.match(/^(\*|[-\w]+)\s*(<?[=-]>)\s*(\*|[-\w]+)$/);
     if (s == null || s.length < 4) return t.push(Ns(n)), e;
     let i = s[1],
          r = s[2],
          o = s[3];
     e.push(It(i, o));
     let a = i == Pe && o == Pe;
     r[0] == '<' && !a && e.push(It(o, i));
}
function ii(n, e) {
     switch (n) {
          case ':enter':
               return 'void => *';
          case ':leave':
               return '* => void';
          case ':increment':
               return (t, s) => parseFloat(s) > parseFloat(t);
          case ':decrement':
               return (t, s) => parseFloat(s) < parseFloat(t);
          default:
               return e.push(Ds(n)), '* => *';
     }
}
var _e = new Set(['true', '1']),
     Ee = new Set(['false', '0']);
function It(n, e) {
     let t = _e.has(n) || Ee.has(n),
          s = _e.has(e) || Ee.has(e);
     return (i, r) => {
          let o = n == Pe || n == i,
               a = e == Pe || e == r;
          return (
               !o && t && typeof i == 'boolean' && (o = i ? _e.has(n) : Ee.has(n)),
               !a && s && typeof r == 'boolean' && (a = r ? _e.has(e) : Ee.has(e)),
               o && a
          );
     };
}
var es = ':self',
     ni = new RegExp(`s*${es}s*,?`, 'g');
function ts(n, e, t, s) {
     return new Ge(n).build(e, t, s);
}
var Lt = '',
     Ge = class {
          constructor(e) {
               this._driver = e;
          }
          build(e, t, s) {
               let i = new He(t);
               return this._resetContextStyleTimingState(i), k(this, oe(e), i);
          }
          _resetContextStyleTimingState(e) {
               (e.currentQuerySelector = Lt),
                    (e.collectedStyles = new Map()),
                    e.collectedStyles.set(Lt, new Map()),
                    (e.currentTime = 0);
          }
          visitTrigger(e, t) {
               let s = (t.queryCount = 0),
                    i = (t.depCount = 0),
                    r = [],
                    o = [];
               return (
                    e.name.charAt(0) == '@' && t.errors.push(gs()),
                    e.definitions.forEach((a) => {
                         if ((this._resetContextStyleTimingState(t), a.type == 0)) {
                              let l = a,
                                   h = l.name;
                              h
                                   .toString()
                                   .split(/\s*,\s*/)
                                   .forEach((c) => {
                                        (l.name = c), r.push(this.visitState(l, t));
                                   }),
                                   (l.name = h);
                         } else if (a.type == 1) {
                              let l = this.visitTransition(a, t);
                              (s += l.queryCount), (i += l.depCount), o.push(l);
                         } else t.errors.push(_s());
                    }),
                    { type: 7, name: e.name, states: r, transitions: o, queryCount: s, depCount: i, options: null }
               );
          }
          visitState(e, t) {
               let s = this.visitStyle(e.styles, t),
                    i = (e.options && e.options.params) || null;
               if (s.containsDynamicStyles) {
                    let r = new Set(),
                         o = i || {};
                    if (
                         (s.styles.forEach((a) => {
                              a instanceof Map &&
                                   a.forEach((l) => {
                                        Zt(l).forEach((h) => {
                                             o.hasOwnProperty(h) || r.add(h);
                                        });
                                   });
                         }),
                         r.size)
                    ) {
                         let a = be(r.values());
                         t.errors.push(Es(e.name, a));
                    }
               }
               return { type: 0, name: e.name, style: s, options: i ? { params: i } : null };
          }
          visitTransition(e, t) {
               (t.queryCount = 0), (t.depCount = 0);
               let s = k(this, oe(e.animation), t);
               return {
                    type: 1,
                    matchers: ti(e.expr, t.errors),
                    animation: s,
                    queryCount: t.queryCount,
                    depCount: t.depCount,
                    options: Y(e.options),
               };
          }
          visitSequence(e, t) {
               return { type: 2, steps: e.steps.map((s) => k(this, s, t)), options: Y(e.options) };
          }
          visitGroup(e, t) {
               let s = t.currentTime,
                    i = 0,
                    r = e.steps.map((o) => {
                         t.currentTime = s;
                         let a = k(this, o, t);
                         return (i = Math.max(i, t.currentTime)), a;
                    });
               return (t.currentTime = i), { type: 3, steps: r, options: Y(e.options) };
          }
          visitAnimate(e, t) {
               let s = li(e.timings, t.errors);
               t.currentAnimateTimings = s;
               let i,
                    r = e.styles ? e.styles : Le({});
               if (r.type == 5) i = this.visitKeyframes(r, t);
               else {
                    let o = e.styles,
                         a = !1;
                    if (!o) {
                         a = !0;
                         let h = {};
                         s.easing && (h.easing = s.easing), (o = Le(h));
                    }
                    t.currentTime += s.duration + s.delay;
                    let l = this.visitStyle(o, t);
                    (l.isEmptyStep = a), (i = l);
               }
               return (t.currentAnimateTimings = null), { type: 4, timings: s, style: i, options: null };
          }
          visitStyle(e, t) {
               let s = this._makeStyleAst(e, t);
               return this._validateStyleAst(s, t), s;
          }
          _makeStyleAst(e, t) {
               let s = [],
                    i = Array.isArray(e.styles) ? e.styles : [e.styles];
               for (let a of i) typeof a == 'string' ? (a === q ? s.push(a) : t.errors.push(Ss(a))) : s.push(Xt(a));
               let r = !1,
                    o = null;
               return (
                    s.forEach((a) => {
                         if (a instanceof Map && (a.has('easing') && ((o = a.get('easing')), a.delete('easing')), !r)) {
                              for (let l of a.values())
                                   if (l.toString().indexOf(xt) >= 0) {
                                        r = !0;
                                        break;
                                   }
                         }
                    }),
                    { type: 6, styles: s, easing: o, offset: e.offset, containsDynamicStyles: r, options: null }
               );
          }
          _validateStyleAst(e, t) {
               let s = t.currentAnimateTimings,
                    i = t.currentTime,
                    r = t.currentTime;
               s && r > 0 && (r -= s.duration + s.delay),
                    e.styles.forEach((o) => {
                         typeof o != 'string' &&
                              o.forEach((a, l) => {
                                   let h = t.collectedStyles.get(t.currentQuerySelector),
                                        c = h.get(l),
                                        u = !0;
                                   c &&
                                        (r != i &&
                                             r >= c.startTime &&
                                             i <= c.endTime &&
                                             (t.errors.push(vs(l, c.startTime, c.endTime, r, i)), (u = !1)),
                                        (r = c.startTime)),
                                        u && h.set(l, { startTime: r, endTime: i }),
                                        t.options && Ys(a, t.options, t.errors);
                              });
                    });
          }
          visitKeyframes(e, t) {
               let s = { type: 5, styles: [], options: null };
               if (!t.currentAnimateTimings) return t.errors.push(Ts()), s;
               let i = 1,
                    r = 0,
                    o = [],
                    a = !1,
                    l = !1,
                    h = 0,
                    c = e.steps.map((w) => {
                         let b = this._makeStyleAst(w, t),
                              N = b.offset != null ? b.offset : ai(b.styles),
                              P = 0;
                         return (
                              N != null && (r++, (P = b.offset = N)),
                              (l = l || P < 0 || P > 1),
                              (a = a || P < h),
                              (h = P),
                              o.push(P),
                              b
                         );
                    });
               l && t.errors.push(ws()), a && t.errors.push(bs());
               let u = e.steps.length,
                    _ = 0;
               r > 0 && r < u ? t.errors.push(As()) : r == 0 && (_ = i / (u - 1));
               let g = u - 1,
                    d = t.currentTime,
                    y = t.currentAnimateTimings,
                    v = y.duration;
               return (
                    c.forEach((w, b) => {
                         let N = _ > 0 ? (b == g ? 1 : _ * b) : o[b],
                              P = N * v;
                         (t.currentTime = d + y.delay + P),
                              (y.duration = P),
                              this._validateStyleAst(w, t),
                              (w.offset = N),
                              s.styles.push(w);
                    }),
                    s
               );
          }
          visitReference(e, t) {
               return { type: 8, animation: k(this, oe(e.animation), t), options: Y(e.options) };
          }
          visitAnimateChild(e, t) {
               return t.depCount++, { type: 9, options: Y(e.options) };
          }
          visitAnimateRef(e, t) {
               return { type: 10, animation: this.visitReference(e.animation, t), options: Y(e.options) };
          }
          visitQuery(e, t) {
               let s = t.currentQuerySelector,
                    i = e.options || {};
               t.queryCount++, (t.currentQuery = e);
               let [r, o] = ri(e.selector);
               (t.currentQuerySelector = s.length ? s + ' ' + r : r),
                    F(t.collectedStyles, t.currentQuerySelector, new Map());
               let a = k(this, oe(e.animation), t);
               return (
                    (t.currentQuery = null),
                    (t.currentQuerySelector = s),
                    {
                         type: 11,
                         selector: r,
                         limit: i.limit || 0,
                         optional: !!i.optional,
                         includeSelf: o,
                         animation: a,
                         originalSelector: e.selector,
                         options: Y(e.options),
                    }
               );
          }
          visitStagger(e, t) {
               t.currentQuery || t.errors.push(Ps());
               let s = e.timings === 'full' ? { duration: 0, delay: 0, easing: 'full' } : we(e.timings, t.errors, !0);
               return { type: 12, animation: k(this, oe(e.animation), t), timings: s, options: null };
          }
     };
function ri(n) {
     let e = !!n.split(/\s*,\s*/).find((t) => t == es);
     return (
          e && (n = n.replace(ni, '')),
          (n = n
               .replace(/@\*/g, Te)
               .replace(/@\w+/g, (t) => Te + '-' + t.slice(1))
               .replace(/:animating/g, je)),
          [n, e]
     );
}
function oi(n) {
     return n ? de(n) : null;
}
var He = class {
     constructor(e) {
          (this.errors = e),
               (this.queryCount = 0),
               (this.depCount = 0),
               (this.currentTransition = null),
               (this.currentQuery = null),
               (this.currentQuerySelector = null),
               (this.currentAnimateTimings = null),
               (this.currentTime = 0),
               (this.collectedStyles = new Map()),
               (this.options = null),
               (this.unsupportedCSSPropertiesFound = new Set());
     }
};
function ai(n) {
     if (typeof n == 'string') return null;
     let e = null;
     if (Array.isArray(n))
          n.forEach((t) => {
               if (t instanceof Map && t.has('offset')) {
                    let s = t;
                    (e = parseFloat(s.get('offset'))), s.delete('offset');
               }
          });
     else if (n instanceof Map && n.has('offset')) {
          let t = n;
          (e = parseFloat(t.get('offset'))), t.delete('offset');
     }
     return e;
}
function li(n, e) {
     if (n.hasOwnProperty('duration')) return n;
     if (typeof n == 'number') {
          let r = we(n, e).duration;
          return qe(r, 0, '');
     }
     let t = n;
     if (t.split(/\s+/).some((r) => r.charAt(0) == '{' && r.charAt(1) == '{')) {
          let r = qe(0, 0, '');
          return (r.dynamic = !0), (r.strValue = t), r;
     }
     let i = we(t, e);
     return qe(i.duration, i.delay, i.easing);
}
function Y(n) {
     return n ? ((n = de(n)), n.params && (n.params = oi(n.params))) : (n = {}), n;
}
function qe(n, e, t) {
     return { duration: n, delay: e, easing: t };
}
function ht(n, e, t, s, i, r, o = null, a = !1) {
     return {
          type: 1,
          element: n,
          keyframes: e,
          preStyleProps: t,
          postStyleProps: s,
          duration: i,
          delay: r,
          totalTime: i + r,
          easing: o,
          subTimeline: a,
     };
}
var he = class {
          constructor() {
               this._map = new Map();
          }
          get(e) {
               return this._map.get(e) || [];
          }
          append(e, t) {
               let s = this._map.get(e);
               s || this._map.set(e, (s = [])), s.push(...t);
          }
          has(e) {
               return this._map.has(e);
          }
          clear() {
               this._map.clear();
          }
     },
     hi = 1,
     ui = ':enter',
     ci = new RegExp(ui, 'g'),
     fi = ':leave',
     di = new RegExp(fi, 'g');
function ss(n, e, t, s, i, r = new Map(), o = new Map(), a, l, h = []) {
     return new xe().buildKeyframes(n, e, t, s, i, r, o, a, l, h);
}
var xe = class {
          buildKeyframes(e, t, s, i, r, o, a, l, h, c = []) {
               h = h || new he();
               let u = new Ye(e, t, h, i, r, c, []);
               u.options = l;
               let _ = l.delay ? V(l.delay) : 0;
               u.currentTimeline.delayNextStep(_), u.currentTimeline.setStyles([o], null, u.errors, l), k(this, s, u);
               let g = u.timelines.filter((d) => d.containsAnimation());
               if (g.length && a.size) {
                    let d;
                    for (let y = g.length - 1; y >= 0; y--) {
                         let v = g[y];
                         if (v.element === t) {
                              d = v;
                              break;
                         }
                    }
                    d && !d.allowOnlyTimelineStyles() && d.setStyles([a], null, u.errors, l);
               }
               return g.length ? g.map((d) => d.buildKeyframes()) : [ht(t, [], [], [], 0, _, '', !1)];
          }
          visitTrigger(e, t) {}
          visitState(e, t) {}
          visitTransition(e, t) {}
          visitAnimateChild(e, t) {
               let s = t.subInstructions.get(t.element);
               if (s) {
                    let i = t.createSubContext(e.options),
                         r = t.currentTimeline.currentTime,
                         o = this._visitSubInstructions(s, i, i.options);
                    r != o && t.transformIntoNewTimeline(o);
               }
               t.previousNode = e;
          }
          visitAnimateRef(e, t) {
               let s = t.createSubContext(e.options);
               s.transformIntoNewTimeline(),
                    this._applyAnimationRefDelays([e.options, e.animation.options], t, s),
                    this.visitReference(e.animation, s),
                    t.transformIntoNewTimeline(s.currentTimeline.currentTime),
                    (t.previousNode = e);
          }
          _applyAnimationRefDelays(e, t, s) {
               for (let i of e) {
                    let r = i?.delay;
                    if (r) {
                         let o = typeof r == 'number' ? r : V(le(r, i?.params ?? {}, t.errors));
                         s.delayNextStep(o);
                    }
               }
          }
          _visitSubInstructions(e, t, s) {
               let r = t.currentTimeline.currentTime,
                    o = s.duration != null ? V(s.duration) : null,
                    a = s.delay != null ? V(s.delay) : null;
               return (
                    o !== 0 &&
                         e.forEach((l) => {
                              let h = t.appendInstructionToTimeline(l, o, a);
                              r = Math.max(r, h.duration + h.delay);
                         }),
                    r
               );
          }
          visitReference(e, t) {
               t.updateOptions(e.options, !0), k(this, e.animation, t), (t.previousNode = e);
          }
          visitSequence(e, t) {
               let s = t.subContextCount,
                    i = t,
                    r = e.options;
               if (
                    r &&
                    (r.params || r.delay) &&
                    ((i = t.createSubContext(r)), i.transformIntoNewTimeline(), r.delay != null)
               ) {
                    i.previousNode.type == 6 && (i.currentTimeline.snapshotCurrentStyles(), (i.previousNode = Me));
                    let o = V(r.delay);
                    i.delayNextStep(o);
               }
               e.steps.length &&
                    (e.steps.forEach((o) => k(this, o, i)),
                    i.currentTimeline.applyStylesToKeyframe(),
                    i.subContextCount > s && i.transformIntoNewTimeline()),
                    (t.previousNode = e);
          }
          visitGroup(e, t) {
               let s = [],
                    i = t.currentTimeline.currentTime,
                    r = e.options && e.options.delay ? V(e.options.delay) : 0;
               e.steps.forEach((o) => {
                    let a = t.createSubContext(e.options);
                    r && a.delayNextStep(r),
                         k(this, o, a),
                         (i = Math.max(i, a.currentTimeline.currentTime)),
                         s.push(a.currentTimeline);
               }),
                    s.forEach((o) => t.currentTimeline.mergeTimelineCollectedStyles(o)),
                    t.transformIntoNewTimeline(i),
                    (t.previousNode = e);
          }
          _visitTiming(e, t) {
               if (e.dynamic) {
                    let s = e.strValue,
                         i = t.params ? le(s, t.params, t.errors) : s;
                    return we(i, t.errors);
               } else return { duration: e.duration, delay: e.delay, easing: e.easing };
          }
          visitAnimate(e, t) {
               let s = (t.currentAnimateTimings = this._visitTiming(e.timings, t)),
                    i = t.currentTimeline;
               s.delay && (t.incrementTime(s.delay), i.snapshotCurrentStyles());
               let r = e.style;
               r.type == 5
                    ? this.visitKeyframes(r, t)
                    : (t.incrementTime(s.duration), this.visitStyle(r, t), i.applyStylesToKeyframe()),
                    (t.currentAnimateTimings = null),
                    (t.previousNode = e);
          }
          visitStyle(e, t) {
               let s = t.currentTimeline,
                    i = t.currentAnimateTimings;
               !i && s.hasCurrentStyleProperties() && s.forwardFrame();
               let r = (i && i.easing) || e.easing;
               e.isEmptyStep ? s.applyEmptyStep(r) : s.setStyles(e.styles, r, t.errors, t.options),
                    (t.previousNode = e);
          }
          visitKeyframes(e, t) {
               let s = t.currentAnimateTimings,
                    i = t.currentTimeline.duration,
                    r = s.duration,
                    a = t.createSubContext().currentTimeline;
               (a.easing = s.easing),
                    e.styles.forEach((l) => {
                         let h = l.offset || 0;
                         a.forwardTime(h * r),
                              a.setStyles(l.styles, l.easing, t.errors, t.options),
                              a.applyStylesToKeyframe();
                    }),
                    t.currentTimeline.mergeTimelineCollectedStyles(a),
                    t.transformIntoNewTimeline(i + r),
                    (t.previousNode = e);
          }
          visitQuery(e, t) {
               let s = t.currentTimeline.currentTime,
                    i = e.options || {},
                    r = i.delay ? V(i.delay) : 0;
               r &&
                    (t.previousNode.type === 6 || (s == 0 && t.currentTimeline.hasCurrentStyleProperties())) &&
                    (t.currentTimeline.snapshotCurrentStyles(), (t.previousNode = Me));
               let o = s,
                    a = t.invokeQuery(e.selector, e.originalSelector, e.limit, e.includeSelf, !!i.optional, t.errors);
               t.currentQueryTotal = a.length;
               let l = null;
               a.forEach((h, c) => {
                    t.currentQueryIndex = c;
                    let u = t.createSubContext(e.options, h);
                    r && u.delayNextStep(r),
                         h === t.element && (l = u.currentTimeline),
                         k(this, e.animation, u),
                         u.currentTimeline.applyStylesToKeyframe();
                    let _ = u.currentTimeline.currentTime;
                    o = Math.max(o, _);
               }),
                    (t.currentQueryIndex = 0),
                    (t.currentQueryTotal = 0),
                    t.transformIntoNewTimeline(o),
                    l && (t.currentTimeline.mergeTimelineCollectedStyles(l), t.currentTimeline.snapshotCurrentStyles()),
                    (t.previousNode = e);
          }
          visitStagger(e, t) {
               let s = t.parentContext,
                    i = t.currentTimeline,
                    r = e.timings,
                    o = Math.abs(r.duration),
                    a = o * (t.currentQueryTotal - 1),
                    l = o * t.currentQueryIndex;
               switch (r.duration < 0 ? 'reverse' : r.easing) {
                    case 'reverse':
                         l = a - l;
                         break;
                    case 'full':
                         l = s.currentStaggerTime;
                         break;
               }
               let c = t.currentTimeline;
               l && c.delayNextStep(l);
               let u = c.currentTime;
               k(this, e.animation, t),
                    (t.previousNode = e),
                    (s.currentStaggerTime = i.currentTime - u + (i.startTime - s.currentTimeline.startTime));
          }
     },
     Me = {},
     Ye = class n {
          constructor(e, t, s, i, r, o, a, l) {
               (this._driver = e),
                    (this.element = t),
                    (this.subInstructions = s),
                    (this._enterClassName = i),
                    (this._leaveClassName = r),
                    (this.errors = o),
                    (this.timelines = a),
                    (this.parentContext = null),
                    (this.currentAnimateTimings = null),
                    (this.previousNode = Me),
                    (this.subContextCount = 0),
                    (this.options = {}),
                    (this.currentQueryIndex = 0),
                    (this.currentQueryTotal = 0),
                    (this.currentStaggerTime = 0),
                    (this.currentTimeline = l || new Ne(this._driver, t, 0)),
                    a.push(this.currentTimeline);
          }
          get params() {
               return this.options.params;
          }
          updateOptions(e, t) {
               if (!e) return;
               let s = e,
                    i = this.options;
               s.duration != null && (i.duration = V(s.duration)), s.delay != null && (i.delay = V(s.delay));
               let r = s.params;
               if (r) {
                    let o = i.params;
                    o || (o = this.options.params = {}),
                         Object.keys(r).forEach((a) => {
                              (!t || !o.hasOwnProperty(a)) && (o[a] = le(r[a], o, this.errors));
                         });
               }
          }
          _copyOptions() {
               let e = {};
               if (this.options) {
                    let t = this.options.params;
                    if (t) {
                         let s = (e.params = {});
                         Object.keys(t).forEach((i) => {
                              s[i] = t[i];
                         });
                    }
               }
               return e;
          }
          createSubContext(e = null, t, s) {
               let i = t || this.element,
                    r = new n(
                         this._driver,
                         i,
                         this.subInstructions,
                         this._enterClassName,
                         this._leaveClassName,
                         this.errors,
                         this.timelines,
                         this.currentTimeline.fork(i, s || 0)
                    );
               return (
                    (r.previousNode = this.previousNode),
                    (r.currentAnimateTimings = this.currentAnimateTimings),
                    (r.options = this._copyOptions()),
                    r.updateOptions(e),
                    (r.currentQueryIndex = this.currentQueryIndex),
                    (r.currentQueryTotal = this.currentQueryTotal),
                    (r.parentContext = this),
                    this.subContextCount++,
                    r
               );
          }
          transformIntoNewTimeline(e) {
               return (
                    (this.previousNode = Me),
                    (this.currentTimeline = this.currentTimeline.fork(this.element, e)),
                    this.timelines.push(this.currentTimeline),
                    this.currentTimeline
               );
          }
          appendInstructionToTimeline(e, t, s) {
               let i = {
                         duration: t ?? e.duration,
                         delay: this.currentTimeline.currentTime + (s ?? 0) + e.delay,
                         easing: '',
                    },
                    r = new Xe(
                         this._driver,
                         e.element,
                         e.keyframes,
                         e.preStyleProps,
                         e.postStyleProps,
                         i,
                         e.stretchStartingKeyframe
                    );
               return this.timelines.push(r), i;
          }
          incrementTime(e) {
               this.currentTimeline.forwardTime(this.currentTimeline.duration + e);
          }
          delayNextStep(e) {
               e > 0 && this.currentTimeline.delayNextStep(e);
          }
          invokeQuery(e, t, s, i, r, o) {
               let a = [];
               if ((i && a.push(this.element), e.length > 0)) {
                    (e = e.replace(ci, '.' + this._enterClassName)), (e = e.replace(di, '.' + this._leaveClassName));
                    let l = s != 1,
                         h = this._driver.query(this.element, e, l);
                    s !== 0 && (h = s < 0 ? h.slice(h.length + s, h.length) : h.slice(0, s)), a.push(...h);
               }
               return !r && a.length == 0 && o.push(Ms(t)), a;
          }
     },
     Ne = class n {
          constructor(e, t, s, i) {
               (this._driver = e),
                    (this.element = t),
                    (this.startTime = s),
                    (this._elementTimelineStylesLookup = i),
                    (this.duration = 0),
                    (this.easing = null),
                    (this._previousKeyframe = new Map()),
                    (this._currentKeyframe = new Map()),
                    (this._keyframes = new Map()),
                    (this._styleSummary = new Map()),
                    (this._localTimelineStyles = new Map()),
                    (this._pendingStyles = new Map()),
                    (this._backFill = new Map()),
                    (this._currentEmptyStepKeyframe = null),
                    this._elementTimelineStylesLookup || (this._elementTimelineStylesLookup = new Map()),
                    (this._globalTimelineStyles = this._elementTimelineStylesLookup.get(t)),
                    this._globalTimelineStyles ||
                         ((this._globalTimelineStyles = this._localTimelineStyles),
                         this._elementTimelineStylesLookup.set(t, this._localTimelineStyles)),
                    this._loadKeyframe();
          }
          containsAnimation() {
               switch (this._keyframes.size) {
                    case 0:
                         return !1;
                    case 1:
                         return this.hasCurrentStyleProperties();
                    default:
                         return !0;
               }
          }
          hasCurrentStyleProperties() {
               return this._currentKeyframe.size > 0;
          }
          get currentTime() {
               return this.startTime + this.duration;
          }
          delayNextStep(e) {
               let t = this._keyframes.size === 1 && this._pendingStyles.size;
               this.duration || t
                    ? (this.forwardTime(this.currentTime + e), t && this.snapshotCurrentStyles())
                    : (this.startTime += e);
          }
          fork(e, t) {
               return (
                    this.applyStylesToKeyframe(),
                    new n(this._driver, e, t || this.currentTime, this._elementTimelineStylesLookup)
               );
          }
          _loadKeyframe() {
               this._currentKeyframe && (this._previousKeyframe = this._currentKeyframe),
                    (this._currentKeyframe = this._keyframes.get(this.duration)),
                    this._currentKeyframe ||
                         ((this._currentKeyframe = new Map()),
                         this._keyframes.set(this.duration, this._currentKeyframe));
          }
          forwardFrame() {
               (this.duration += hi), this._loadKeyframe();
          }
          forwardTime(e) {
               this.applyStylesToKeyframe(), (this.duration = e), this._loadKeyframe();
          }
          _updateStyle(e, t) {
               this._localTimelineStyles.set(e, t),
                    this._globalTimelineStyles.set(e, t),
                    this._styleSummary.set(e, { time: this.currentTime, value: t });
          }
          allowOnlyTimelineStyles() {
               return this._currentEmptyStepKeyframe !== this._currentKeyframe;
          }
          applyEmptyStep(e) {
               e && this._previousKeyframe.set('easing', e);
               for (let [t, s] of this._globalTimelineStyles)
                    this._backFill.set(t, s || q), this._currentKeyframe.set(t, q);
               this._currentEmptyStepKeyframe = this._currentKeyframe;
          }
          setStyles(e, t, s, i) {
               t && this._previousKeyframe.set('easing', t);
               let r = (i && i.params) || {},
                    o = mi(e, this._globalTimelineStyles);
               for (let [a, l] of o) {
                    let h = le(l, r, s);
                    this._pendingStyles.set(a, h),
                         this._localTimelineStyles.has(a) ||
                              this._backFill.set(a, this._globalTimelineStyles.get(a) ?? q),
                         this._updateStyle(a, h);
               }
          }
          applyStylesToKeyframe() {
               this._pendingStyles.size != 0 &&
                    (this._pendingStyles.forEach((e, t) => {
                         this._currentKeyframe.set(t, e);
                    }),
                    this._pendingStyles.clear(),
                    this._localTimelineStyles.forEach((e, t) => {
                         this._currentKeyframe.has(t) || this._currentKeyframe.set(t, e);
                    }));
          }
          snapshotCurrentStyles() {
               for (let [e, t] of this._localTimelineStyles) this._pendingStyles.set(e, t), this._updateStyle(e, t);
          }
          getFinalKeyframe() {
               return this._keyframes.get(this.duration);
          }
          get properties() {
               let e = [];
               for (let t in this._currentKeyframe) e.push(t);
               return e;
          }
          mergeTimelineCollectedStyles(e) {
               e._styleSummary.forEach((t, s) => {
                    let i = this._styleSummary.get(s);
                    (!i || t.time > i.time) && this._updateStyle(s, t.value);
               });
          }
          buildKeyframes() {
               this.applyStylesToKeyframe();
               let e = new Set(),
                    t = new Set(),
                    s = this._keyframes.size === 1 && this.duration === 0,
                    i = [];
               this._keyframes.forEach((a, l) => {
                    let h = te(a, new Map(), this._backFill);
                    h.forEach((c, u) => {
                         c === ye ? e.add(u) : c === q && t.add(u);
                    }),
                         s || h.set('offset', l / this.duration),
                         i.push(h);
               });
               let r = e.size ? be(e.values()) : [],
                    o = t.size ? be(t.values()) : [];
               if (s) {
                    let a = i[0],
                         l = new Map(a);
                    a.set('offset', 0), l.set('offset', 1), (i = [a, l]);
               }
               return ht(this.element, i, r, o, this.duration, this.startTime, this.easing, !1);
          }
     },
     Xe = class extends Ne {
          constructor(e, t, s, i, r, o, a = !1) {
               super(e, t, o.delay),
                    (this.keyframes = s),
                    (this.preStyleProps = i),
                    (this.postStyleProps = r),
                    (this._stretchStartingKeyframe = a),
                    (this.timings = { duration: o.duration, delay: o.delay, easing: o.easing });
          }
          containsAnimation() {
               return this.keyframes.length > 1;
          }
          buildKeyframes() {
               let e = this.keyframes,
                    { delay: t, duration: s, easing: i } = this.timings;
               if (this._stretchStartingKeyframe && t) {
                    let r = [],
                         o = s + t,
                         a = t / o,
                         l = te(e[0]);
                    l.set('offset', 0), r.push(l);
                    let h = te(e[0]);
                    h.set('offset', zt(a)), r.push(h);
                    let c = e.length - 1;
                    for (let u = 1; u <= c; u++) {
                         let _ = te(e[u]),
                              g = _.get('offset'),
                              d = t + g * s;
                         _.set('offset', zt(d / o)), r.push(_);
                    }
                    (s = o), (t = 0), (i = ''), (e = r);
               }
               return ht(this.element, e, this.preStyleProps, this.postStyleProps, s, t, i, !0);
          }
     };
function zt(n, e = 3) {
     let t = Math.pow(10, e - 1);
     return Math.round(n * t) / t;
}
function mi(n, e) {
     let t = new Map(),
          s;
     return (
          n.forEach((i) => {
               if (i === '*') {
                    s = s || e.keys();
                    for (let r of s) t.set(r, q);
               } else te(i, t);
          }),
          t
     );
}
function qt(n, e, t, s, i, r, o, a, l, h, c, u, _) {
     return {
          type: 0,
          element: n,
          triggerName: e,
          isRemovalTransition: i,
          fromState: t,
          fromStyles: r,
          toState: s,
          toStyles: o,
          timelines: a,
          queriedElements: l,
          preStyleProps: h,
          postStyleProps: c,
          totalTime: u,
          errors: _,
     };
}
var Ke = {},
     De = class {
          constructor(e, t, s) {
               (this._triggerName = e), (this.ast = t), (this._stateStyles = s);
          }
          match(e, t, s, i) {
               return pi(this.ast.matchers, e, t, s, i);
          }
          buildStyles(e, t, s) {
               let i = this._stateStyles.get('*');
               return (
                    e !== void 0 && (i = this._stateStyles.get(e?.toString()) || i), i ? i.buildStyles(t, s) : new Map()
               );
          }
          build(e, t, s, i, r, o, a, l, h, c) {
               let u = [],
                    _ = (this.ast.options && this.ast.options.params) || Ke,
                    g = (a && a.params) || Ke,
                    d = this.buildStyles(s, g, u),
                    y = (l && l.params) || Ke,
                    v = this.buildStyles(i, y, u),
                    w = new Set(),
                    b = new Map(),
                    N = new Map(),
                    P = i === 'void',
                    J = { params: yi(y, _), delay: this.ast.options?.delay },
                    L = c ? [] : ss(e, t, this.ast.animation, r, o, d, v, J, h, u),
                    D = 0;
               if (
                    (L.forEach((Q) => {
                         D = Math.max(Q.duration + Q.delay, D);
                    }),
                    u.length)
               )
                    return qt(t, this._triggerName, s, i, P, d, v, [], [], b, N, D, u);
               L.forEach((Q) => {
                    let $ = Q.element,
                         ut = F(b, $, new Set());
                    Q.preStyleProps.forEach((G) => ut.add(G));
                    let ie = F(N, $, new Set());
                    Q.postStyleProps.forEach((G) => ie.add(G)), $ !== t && w.add($);
               });
               let B = be(w.values());
               return qt(t, this._triggerName, s, i, P, d, v, L, B, b, N, D);
          }
     };
function pi(n, e, t, s, i) {
     return n.some((r) => r(e, t, s, i));
}
function yi(n, e) {
     let t = de(e);
     for (let s in n) n.hasOwnProperty(s) && n[s] != null && (t[s] = n[s]);
     return t;
}
var Ze = class {
     constructor(e, t, s) {
          (this.styles = e), (this.defaultParams = t), (this.normalizer = s);
     }
     buildStyles(e, t) {
          let s = new Map(),
               i = de(this.defaultParams);
          return (
               Object.keys(e).forEach((r) => {
                    let o = e[r];
                    o !== null && (i[r] = o);
               }),
               this.styles.styles.forEach((r) => {
                    typeof r != 'string' &&
                         r.forEach((o, a) => {
                              o && (o = le(o, i, t));
                              let l = this.normalizer.normalizePropertyName(a, t);
                              (o = this.normalizer.normalizeStyleValue(a, l, o, t)), s.set(a, o);
                         });
               }),
               s
          );
     }
};
function gi(n, e, t) {
     return new Je(n, e, t);
}
var Je = class {
     constructor(e, t, s) {
          (this.name = e),
               (this.ast = t),
               (this._normalizer = s),
               (this.transitionFactories = []),
               (this.states = new Map()),
               t.states.forEach((i) => {
                    let r = (i.options && i.options.params) || {};
                    this.states.set(i.name, new Ze(i.style, r, s));
               }),
               Kt(this.states, 'true', '1'),
               Kt(this.states, 'false', '0'),
               t.transitions.forEach((i) => {
                    this.transitionFactories.push(new De(e, i, this.states));
               }),
               (this.fallbackTransition = _i(e, this.states, this._normalizer));
     }
     get containsQueries() {
          return this.ast.queryCount > 0;
     }
     matchTransition(e, t, s, i) {
          return this.transitionFactories.find((o) => o.match(e, t, s, i)) || null;
     }
     matchStyles(e, t, s) {
          return this.fallbackTransition.buildStyles(e, t, s);
     }
};
function _i(n, e, t) {
     let r = {
          type: 1,
          animation: { type: 2, steps: [], options: null },
          matchers: [(o, a) => !0],
          options: null,
          queryCount: 0,
          depCount: 0,
     };
     return new De(n, r, e);
}
function Kt(n, e, t) {
     n.has(e) ? n.has(t) || n.set(t, n.get(e)) : n.has(t) && n.set(e, n.get(t));
}
var Ei = new he(),
     et = class {
          constructor(e, t, s) {
               (this.bodyNode = e),
                    (this._driver = t),
                    (this._normalizer = s),
                    (this._animations = new Map()),
                    (this._playersById = new Map()),
                    (this.players = []);
          }
          register(e, t) {
               let s = [],
                    i = [],
                    r = ts(this._driver, t, s, i);
               if (s.length) throw Fs(s);
               i.length && void 0, this._animations.set(e, r);
          }
          _buildPlayer(e, t, s) {
               let i = e.element,
                    r = Wt(this._normalizer, e.keyframes, t, s);
               return this._driver.animate(i, r, e.duration, e.delay, e.easing, [], !0);
          }
          create(e, t, s = {}) {
               let i = [],
                    r = this._animations.get(e),
                    o,
                    a = new Map();
               if (
                    (r
                         ? ((o = ss(this._driver, t, r, Yt, Ve, new Map(), new Map(), s, Ei, i)),
                           o.forEach((c) => {
                                let u = F(a, c.element, new Map());
                                c.postStyleProps.forEach((_) => u.set(_, null));
                           }))
                         : (i.push(Os()), (o = [])),
                    i.length)
               )
                    throw Rs(i);
               a.forEach((c, u) => {
                    c.forEach((_, g) => {
                         c.set(g, this._driver.computeStyle(u, g, q));
                    });
               });
               let l = o.map((c) => {
                         let u = a.get(c.element);
                         return this._buildPlayer(c, new Map(), u);
                    }),
                    h = W(l);
               return this._playersById.set(e, h), h.onDestroy(() => this.destroy(e)), this.players.push(h), h;
          }
          destroy(e) {
               let t = this._getPlayer(e);
               t.destroy(), this._playersById.delete(e);
               let s = this.players.indexOf(t);
               s >= 0 && this.players.splice(s, 1);
          }
          _getPlayer(e) {
               let t = this._playersById.get(e);
               if (!t) throw Is(e);
               return t;
          }
          listen(e, t, s, i) {
               let r = rt(t, '', '', '');
               return nt(this._getPlayer(e), s, r, i), () => {};
          }
          command(e, t, s, i) {
               if (s == 'register') {
                    this.register(e, i[0]);
                    return;
               }
               if (s == 'create') {
                    let o = i[0] || {};
                    this.create(e, t, o);
                    return;
               }
               let r = this._getPlayer(e);
               switch (s) {
                    case 'play':
                         r.play();
                         break;
                    case 'pause':
                         r.pause();
                         break;
                    case 'reset':
                         r.reset();
                         break;
                    case 'restart':
                         r.restart();
                         break;
                    case 'finish':
                         r.finish();
                         break;
                    case 'init':
                         r.init();
                         break;
                    case 'setPosition':
                         r.setPosition(parseFloat(i[0]));
                         break;
                    case 'destroy':
                         this.destroy(e);
                         break;
               }
          }
     },
     Bt = 'ng-animate-queued',
     Si = '.ng-animate-queued',
     Be = 'ng-animate-disabled',
     vi = '.ng-animate-disabled',
     Ti = 'ng-star-inserted',
     wi = '.ng-star-inserted',
     bi = [],
     is = { namespaceId: '', setForRemoval: !1, setForMove: !1, hasAnimation: !1, removedBeforeQueried: !1 },
     Ai = { namespaceId: '', setForMove: !1, setForRemoval: !1, hasAnimation: !1, removedBeforeQueried: !0 },
     I = '__ng_removed',
     ue = class {
          get params() {
               return this.options.params;
          }
          constructor(e, t = '') {
               this.namespaceId = t;
               let s = e && e.hasOwnProperty('value'),
                    i = s ? e.value : e;
               if (((this.value = Mi(i)), s)) {
                    let r = de(e);
                    delete r.value, (this.options = r);
               } else this.options = {};
               this.options.params || (this.options.params = {});
          }
          absorbOptions(e) {
               let t = e.params;
               if (t) {
                    let s = this.options.params;
                    Object.keys(t).forEach((i) => {
                         s[i] == null && (s[i] = t[i]);
                    });
               }
          }
     },
     ae = 'void',
     Qe = new ue(ae),
     tt = class {
          constructor(e, t, s) {
               (this.id = e),
                    (this.hostElement = t),
                    (this._engine = s),
                    (this.players = []),
                    (this._triggers = new Map()),
                    (this._queue = []),
                    (this._elementListeners = new Map()),
                    (this._hostClassName = 'ng-tns-' + e),
                    R(t, this._hostClassName);
          }
          listen(e, t, s, i) {
               if (!this._triggers.has(t)) throw Ls(s, t);
               if (s == null || s.length == 0) throw zs(t);
               if (!Ni(s)) throw qs(s, t);
               let r = F(this._elementListeners, e, []),
                    o = { name: t, phase: s, callback: i };
               r.push(o);
               let a = F(this._engine.statesByElement, e, new Map());
               return (
                    a.has(t) || (R(e, ge), R(e, ge + '-' + t), a.set(t, Qe)),
                    () => {
                         this._engine.afterFlush(() => {
                              let l = r.indexOf(o);
                              l >= 0 && r.splice(l, 1), this._triggers.has(t) || a.delete(t);
                         });
                    }
               );
          }
          register(e, t) {
               return this._triggers.has(e) ? !1 : (this._triggers.set(e, t), !0);
          }
          _getTrigger(e) {
               let t = this._triggers.get(e);
               if (!t) throw Ks(e);
               return t;
          }
          trigger(e, t, s, i = !0) {
               let r = this._getTrigger(t),
                    o = new ce(this.id, t, e),
                    a = this._engine.statesByElement.get(e);
               a || (R(e, ge), R(e, ge + '-' + t), this._engine.statesByElement.set(e, (a = new Map())));
               let l = a.get(t),
                    h = new ue(s, this.id);
               if (
                    (!(s && s.hasOwnProperty('value')) && l && h.absorbOptions(l.options),
                    a.set(t, h),
                    l || (l = Qe),
                    !(h.value === ae) && l.value === h.value)
               ) {
                    if (!ki(l.params, h.params)) {
                         let y = [],
                              v = r.matchStyles(l.value, l.params, y),
                              w = r.matchStyles(h.value, h.params, y);
                         y.length
                              ? this._engine.reportError(y)
                              : this._engine.afterFlush(() => {
                                     X(e, v), K(e, w);
                                });
                    }
                    return;
               }
               let _ = F(this._engine.playersByElement, e, []);
               _.forEach((y) => {
                    y.namespaceId == this.id && y.triggerName == t && y.queued && y.destroy();
               });
               let g = r.matchTransition(l.value, h.value, e, h.params),
                    d = !1;
               if (!g) {
                    if (!i) return;
                    (g = r.fallbackTransition), (d = !0);
               }
               return (
                    this._engine.totalQueuedPlayers++,
                    this._queue.push({
                         element: e,
                         triggerName: t,
                         transition: g,
                         fromState: l,
                         toState: h,
                         player: o,
                         isFallbackTransition: d,
                    }),
                    d ||
                         (R(e, Bt),
                         o.onStart(() => {
                              ee(e, Bt);
                         })),
                    o.onDone(() => {
                         let y = this.players.indexOf(o);
                         y >= 0 && this.players.splice(y, 1);
                         let v = this._engine.playersByElement.get(e);
                         if (v) {
                              let w = v.indexOf(o);
                              w >= 0 && v.splice(w, 1);
                         }
                    }),
                    this.players.push(o),
                    _.push(o),
                    o
               );
          }
          deregister(e) {
               this._triggers.delete(e),
                    this._engine.statesByElement.forEach((t) => t.delete(e)),
                    this._elementListeners.forEach((t, s) => {
                         this._elementListeners.set(
                              s,
                              t.filter((i) => i.name != e)
                         );
                    });
          }
          clearElementCache(e) {
               this._engine.statesByElement.delete(e), this._elementListeners.delete(e);
               let t = this._engine.playersByElement.get(e);
               t && (t.forEach((s) => s.destroy()), this._engine.playersByElement.delete(e));
          }
          _signalRemovalForInnerTriggers(e, t) {
               let s = this._engine.driver.query(e, Te, !0);
               s.forEach((i) => {
                    if (i[I]) return;
                    let r = this._engine.fetchNamespacesByElement(i);
                    r.size ? r.forEach((o) => o.triggerLeaveAnimation(i, t, !1, !0)) : this.clearElementCache(i);
               }),
                    this._engine.afterFlushAnimationsDone(() => s.forEach((i) => this.clearElementCache(i)));
          }
          triggerLeaveAnimation(e, t, s, i) {
               let r = this._engine.statesByElement.get(e),
                    o = new Map();
               if (r) {
                    let a = [];
                    if (
                         (r.forEach((l, h) => {
                              if ((o.set(h, l.value), this._triggers.has(h))) {
                                   let c = this.trigger(e, h, ae, i);
                                   c && a.push(c);
                              }
                         }),
                         a.length)
                    )
                         return (
                              this._engine.markElementAsRemoved(this.id, e, !0, t, o),
                              s && W(a).onDone(() => this._engine.processLeaveNode(e)),
                              !0
                         );
               }
               return !1;
          }
          prepareLeaveAnimationListeners(e) {
               let t = this._elementListeners.get(e),
                    s = this._engine.statesByElement.get(e);
               if (t && s) {
                    let i = new Set();
                    t.forEach((r) => {
                         let o = r.name;
                         if (i.has(o)) return;
                         i.add(o);
                         let l = this._triggers.get(o).fallbackTransition,
                              h = s.get(o) || Qe,
                              c = new ue(ae),
                              u = new ce(this.id, o, e);
                         this._engine.totalQueuedPlayers++,
                              this._queue.push({
                                   element: e,
                                   triggerName: o,
                                   transition: l,
                                   fromState: h,
                                   toState: c,
                                   player: u,
                                   isFallbackTransition: !0,
                              });
                    });
               }
          }
          removeNode(e, t) {
               let s = this._engine;
               if (
                    (e.childElementCount && this._signalRemovalForInnerTriggers(e, t),
                    this.triggerLeaveAnimation(e, t, !0))
               )
                    return;
               let i = !1;
               if (s.totalAnimations) {
                    let r = s.players.length ? s.playersByQueriedElement.get(e) : [];
                    if (r && r.length) i = !0;
                    else {
                         let o = e;
                         for (; (o = o.parentNode); )
                              if (s.statesByElement.get(o)) {
                                   i = !0;
                                   break;
                              }
                    }
               }
               if ((this.prepareLeaveAnimationListeners(e), i)) s.markElementAsRemoved(this.id, e, !1, t);
               else {
                    let r = e[I];
                    (!r || r === is) &&
                         (s.afterFlush(() => this.clearElementCache(e)),
                         s.destroyInnerAnimations(e),
                         s._onRemovalComplete(e, t));
               }
          }
          insertNode(e, t) {
               R(e, this._hostClassName);
          }
          drainQueuedTransitions(e) {
               let t = [];
               return (
                    this._queue.forEach((s) => {
                         let i = s.player;
                         if (i.destroyed) return;
                         let r = s.element,
                              o = this._elementListeners.get(r);
                         o &&
                              o.forEach((a) => {
                                   if (a.name == s.triggerName) {
                                        let l = rt(r, s.triggerName, s.fromState.value, s.toState.value);
                                        (l._data = e), nt(s.player, a.phase, l, a.callback);
                                   }
                              }),
                              i.markedForDestroy
                                   ? this._engine.afterFlush(() => {
                                          i.destroy();
                                     })
                                   : t.push(s);
                    }),
                    (this._queue = []),
                    t.sort((s, i) => {
                         let r = s.transition.ast.depCount,
                              o = i.transition.ast.depCount;
                         return r == 0 || o == 0
                              ? r - o
                              : this._engine.driver.containsElement(s.element, i.element)
                              ? 1
                              : -1;
                    })
               );
          }
          destroy(e) {
               this.players.forEach((t) => t.destroy()), this._signalRemovalForInnerTriggers(this.hostElement, e);
          }
     },
     st = class {
          _onRemovalComplete(e, t) {
               this.onRemovalComplete(e, t);
          }
          constructor(e, t, s) {
               (this.bodyNode = e),
                    (this.driver = t),
                    (this._normalizer = s),
                    (this.players = []),
                    (this.newHostElements = new Map()),
                    (this.playersByElement = new Map()),
                    (this.playersByQueriedElement = new Map()),
                    (this.statesByElement = new Map()),
                    (this.disabledNodes = new Set()),
                    (this.totalAnimations = 0),
                    (this.totalQueuedPlayers = 0),
                    (this._namespaceLookup = {}),
                    (this._namespaceList = []),
                    (this._flushFns = []),
                    (this._whenQuietFns = []),
                    (this.namespacesByHostElement = new Map()),
                    (this.collectedEnterElements = []),
                    (this.collectedLeaveElements = []),
                    (this.onRemovalComplete = (i, r) => {});
          }
          get queuedPlayers() {
               let e = [];
               return (
                    this._namespaceList.forEach((t) => {
                         t.players.forEach((s) => {
                              s.queued && e.push(s);
                         });
                    }),
                    e
               );
          }
          createNamespace(e, t) {
               let s = new tt(e, t, this);
               return (
                    this.bodyNode && this.driver.containsElement(this.bodyNode, t)
                         ? this._balanceNamespaceList(s, t)
                         : (this.newHostElements.set(t, s), this.collectEnterElement(t)),
                    (this._namespaceLookup[e] = s)
               );
          }
          _balanceNamespaceList(e, t) {
               let s = this._namespaceList,
                    i = this.namespacesByHostElement;
               if (s.length - 1 >= 0) {
                    let o = !1,
                         a = this.driver.getParentElement(t);
                    for (; a; ) {
                         let l = i.get(a);
                         if (l) {
                              let h = s.indexOf(l);
                              s.splice(h + 1, 0, e), (o = !0);
                              break;
                         }
                         a = this.driver.getParentElement(a);
                    }
                    o || s.unshift(e);
               } else s.push(e);
               return i.set(t, e), e;
          }
          register(e, t) {
               let s = this._namespaceLookup[e];
               return s || (s = this.createNamespace(e, t)), s;
          }
          registerTrigger(e, t, s) {
               let i = this._namespaceLookup[e];
               i && i.register(t, s) && this.totalAnimations++;
          }
          destroy(e, t) {
               e &&
                    (this.afterFlush(() => {}),
                    this.afterFlushAnimationsDone(() => {
                         let s = this._fetchNamespace(e);
                         this.namespacesByHostElement.delete(s.hostElement);
                         let i = this._namespaceList.indexOf(s);
                         i >= 0 && this._namespaceList.splice(i, 1), s.destroy(t), delete this._namespaceLookup[e];
                    }));
          }
          _fetchNamespace(e) {
               return this._namespaceLookup[e];
          }
          fetchNamespacesByElement(e) {
               let t = new Set(),
                    s = this.statesByElement.get(e);
               if (s) {
                    for (let i of s.values())
                         if (i.namespaceId) {
                              let r = this._fetchNamespace(i.namespaceId);
                              r && t.add(r);
                         }
               }
               return t;
          }
          trigger(e, t, s, i) {
               if (Se(t)) {
                    let r = this._fetchNamespace(e);
                    if (r) return r.trigger(t, s, i), !0;
               }
               return !1;
          }
          insertNode(e, t, s, i) {
               if (!Se(t)) return;
               let r = t[I];
               if (r && r.setForRemoval) {
                    (r.setForRemoval = !1), (r.setForMove = !0);
                    let o = this.collectedLeaveElements.indexOf(t);
                    o >= 0 && this.collectedLeaveElements.splice(o, 1);
               }
               if (e) {
                    let o = this._fetchNamespace(e);
                    o && o.insertNode(t, s);
               }
               i && this.collectEnterElement(t);
          }
          collectEnterElement(e) {
               this.collectedEnterElements.push(e);
          }
          markElementAsDisabled(e, t) {
               t
                    ? this.disabledNodes.has(e) || (this.disabledNodes.add(e), R(e, Be))
                    : this.disabledNodes.has(e) && (this.disabledNodes.delete(e), ee(e, Be));
          }
          removeNode(e, t, s) {
               if (Se(t)) {
                    let i = e ? this._fetchNamespace(e) : null;
                    i ? i.removeNode(t, s) : this.markElementAsRemoved(e, t, !1, s);
                    let r = this.namespacesByHostElement.get(t);
                    r && r.id !== e && r.removeNode(t, s);
               } else this._onRemovalComplete(t, s);
          }
          markElementAsRemoved(e, t, s, i, r) {
               this.collectedLeaveElements.push(t),
                    (t[I] = {
                         namespaceId: e,
                         setForRemoval: i,
                         hasAnimation: s,
                         removedBeforeQueried: !1,
                         previousTriggersValues: r,
                    });
          }
          listen(e, t, s, i, r) {
               return Se(t) ? this._fetchNamespace(e).listen(t, s, i, r) : () => {};
          }
          _buildInstruction(e, t, s, i, r) {
               return e.transition.build(
                    this.driver,
                    e.element,
                    e.fromState.value,
                    e.toState.value,
                    s,
                    i,
                    e.fromState.options,
                    e.toState.options,
                    t,
                    r
               );
          }
          destroyInnerAnimations(e) {
               let t = this.driver.query(e, Te, !0);
               t.forEach((s) => this.destroyActiveAnimationsForElement(s)),
                    this.playersByQueriedElement.size != 0 &&
                         ((t = this.driver.query(e, je, !0)),
                         t.forEach((s) => this.finishActiveQueriedAnimationOnElement(s)));
          }
          destroyActiveAnimationsForElement(e) {
               let t = this.playersByElement.get(e);
               t &&
                    t.forEach((s) => {
                         s.queued ? (s.markedForDestroy = !0) : s.destroy();
                    });
          }
          finishActiveQueriedAnimationOnElement(e) {
               let t = this.playersByQueriedElement.get(e);
               t && t.forEach((s) => s.finish());
          }
          whenRenderingDone() {
               return new Promise((e) => {
                    if (this.players.length) return W(this.players).onDone(() => e());
                    e();
               });
          }
          processLeaveNode(e) {
               let t = e[I];
               if (t && t.setForRemoval) {
                    if (((e[I] = is), t.namespaceId)) {
                         this.destroyInnerAnimations(e);
                         let s = this._fetchNamespace(t.namespaceId);
                         s && s.clearElementCache(e);
                    }
                    this._onRemovalComplete(e, t.setForRemoval);
               }
               e.classList?.contains(Be) && this.markElementAsDisabled(e, !1),
                    this.driver.query(e, vi, !0).forEach((s) => {
                         this.markElementAsDisabled(s, !1);
                    });
          }
          flush(e = -1) {
               let t = [];
               if (
                    (this.newHostElements.size &&
                         (this.newHostElements.forEach((s, i) => this._balanceNamespaceList(s, i)),
                         this.newHostElements.clear()),
                    this.totalAnimations && this.collectedEnterElements.length)
               )
                    for (let s = 0; s < this.collectedEnterElements.length; s++) {
                         let i = this.collectedEnterElements[s];
                         R(i, Ti);
                    }
               if (this._namespaceList.length && (this.totalQueuedPlayers || this.collectedLeaveElements.length)) {
                    let s = [];
                    try {
                         t = this._flushAnimations(s, e);
                    } finally {
                         for (let i = 0; i < s.length; i++) s[i]();
                    }
               } else
                    for (let s = 0; s < this.collectedLeaveElements.length; s++) {
                         let i = this.collectedLeaveElements[s];
                         this.processLeaveNode(i);
                    }
               if (
                    ((this.totalQueuedPlayers = 0),
                    (this.collectedEnterElements.length = 0),
                    (this.collectedLeaveElements.length = 0),
                    this._flushFns.forEach((s) => s()),
                    (this._flushFns = []),
                    this._whenQuietFns.length)
               ) {
                    let s = this._whenQuietFns;
                    (this._whenQuietFns = []),
                         t.length
                              ? W(t).onDone(() => {
                                     s.forEach((i) => i());
                                })
                              : s.forEach((i) => i());
               }
          }
          reportError(e) {
               throw Bs(e);
          }
          _flushAnimations(e, t) {
               let s = new he(),
                    i = [],
                    r = new Map(),
                    o = [],
                    a = new Map(),
                    l = new Map(),
                    h = new Map(),
                    c = new Set();
               this.disabledNodes.forEach((f) => {
                    c.add(f);
                    let m = this.driver.query(f, Si, !0);
                    for (let p = 0; p < m.length; p++) c.add(m[p]);
               });
               let u = this.bodyNode,
                    _ = Array.from(this.statesByElement.keys()),
                    g = Vt(_, this.collectedEnterElements),
                    d = new Map(),
                    y = 0;
               g.forEach((f, m) => {
                    let p = Yt + y++;
                    d.set(m, p), f.forEach((E) => R(E, p));
               });
               let v = [],
                    w = new Set(),
                    b = new Set();
               for (let f = 0; f < this.collectedLeaveElements.length; f++) {
                    let m = this.collectedLeaveElements[f],
                         p = m[I];
                    p &&
                         p.setForRemoval &&
                         (v.push(m),
                         w.add(m),
                         p.hasAnimation ? this.driver.query(m, wi, !0).forEach((E) => w.add(E)) : b.add(m));
               }
               let N = new Map(),
                    P = Vt(_, Array.from(w));
               P.forEach((f, m) => {
                    let p = Ve + y++;
                    N.set(m, p), f.forEach((E) => R(E, p));
               }),
                    e.push(() => {
                         g.forEach((f, m) => {
                              let p = d.get(m);
                              f.forEach((E) => ee(E, p));
                         }),
                              P.forEach((f, m) => {
                                   let p = N.get(m);
                                   f.forEach((E) => ee(E, p));
                              }),
                              v.forEach((f) => {
                                   this.processLeaveNode(f);
                              });
                    });
               let J = [],
                    L = [];
               for (let f = this._namespaceList.length - 1; f >= 0; f--)
                    this._namespaceList[f].drainQueuedTransitions(t).forEach((p) => {
                         let E = p.player,
                              A = p.element;
                         if ((J.push(E), this.collectedEnterElements.length)) {
                              let M = A[I];
                              if (M && M.setForMove) {
                                   if (M.previousTriggersValues && M.previousTriggersValues.has(p.triggerName)) {
                                        let H = M.previousTriggersValues.get(p.triggerName),
                                             O = this.statesByElement.get(p.element);
                                        if (O && O.has(p.triggerName)) {
                                             let me = O.get(p.triggerName);
                                             (me.value = H), O.set(p.triggerName, me);
                                        }
                                   }
                                   E.destroy();
                                   return;
                              }
                         }
                         let z = !u || !this.driver.containsElement(u, A),
                              C = N.get(A),
                              j = d.get(A),
                              T = this._buildInstruction(p, s, j, C, z);
                         if (T.errors && T.errors.length) {
                              L.push(T);
                              return;
                         }
                         if (z) {
                              E.onStart(() => X(A, T.fromStyles)), E.onDestroy(() => K(A, T.toStyles)), i.push(E);
                              return;
                         }
                         if (p.isFallbackTransition) {
                              E.onStart(() => X(A, T.fromStyles)), E.onDestroy(() => K(A, T.toStyles)), i.push(E);
                              return;
                         }
                         let dt = [];
                         T.timelines.forEach((M) => {
                              (M.stretchStartingKeyframe = !0), this.disabledNodes.has(M.element) || dt.push(M);
                         }),
                              (T.timelines = dt),
                              s.append(A, T.timelines);
                         let us = { instruction: T, player: E, element: A };
                         o.push(us),
                              T.queriedElements.forEach((M) => F(a, M, []).push(E)),
                              T.preStyleProps.forEach((M, H) => {
                                   if (M.size) {
                                        let O = l.get(H);
                                        O || l.set(H, (O = new Set())), M.forEach((me, Re) => O.add(Re));
                                   }
                              }),
                              T.postStyleProps.forEach((M, H) => {
                                   let O = h.get(H);
                                   O || h.set(H, (O = new Set())), M.forEach((me, Re) => O.add(Re));
                              });
                    });
               if (L.length) {
                    let f = [];
                    L.forEach((m) => {
                         f.push(Qs(m.triggerName, m.errors));
                    }),
                         J.forEach((m) => m.destroy()),
                         this.reportError(f);
               }
               let D = new Map(),
                    B = new Map();
               o.forEach((f) => {
                    let m = f.element;
                    s.has(m) && (B.set(m, m), this._beforeAnimationBuild(f.player.namespaceId, f.instruction, D));
               }),
                    i.forEach((f) => {
                         let m = f.element;
                         this._getPreviousPlayers(m, !1, f.namespaceId, f.triggerName, null).forEach((E) => {
                              F(D, m, []).push(E), E.destroy();
                         });
                    });
               let Q = v.filter((f) => jt(f, l, h)),
                    $ = new Map();
               $t($, this.driver, b, h, q).forEach((f) => {
                    jt(f, l, h) && Q.push(f);
               });
               let ie = new Map();
               g.forEach((f, m) => {
                    $t(ie, this.driver, new Set(f), l, ye);
               }),
                    Q.forEach((f) => {
                         let m = $.get(f),
                              p = ie.get(f);
                         $.set(f, new Map([...(m?.entries() ?? []), ...(p?.entries() ?? [])]));
                    });
               let G = [],
                    ct = [],
                    ft = {};
               o.forEach((f) => {
                    let { element: m, player: p, instruction: E } = f;
                    if (s.has(m)) {
                         if (c.has(m)) {
                              p.onDestroy(() => K(m, E.toStyles)),
                                   (p.disabled = !0),
                                   p.overrideTotalTime(E.totalTime),
                                   i.push(p);
                              return;
                         }
                         let A = ft;
                         if (B.size > 1) {
                              let C = m,
                                   j = [];
                              for (; (C = C.parentNode); ) {
                                   let T = B.get(C);
                                   if (T) {
                                        A = T;
                                        break;
                                   }
                                   j.push(C);
                              }
                              j.forEach((T) => B.set(T, A));
                         }
                         let z = this._buildAnimation(p.namespaceId, E, D, r, ie, $);
                         if ((p.setRealPlayer(z), A === ft)) G.push(p);
                         else {
                              let C = this.playersByElement.get(A);
                              C && C.length && (p.parentPlayer = W(C)), i.push(p);
                         }
                    } else X(m, E.fromStyles), p.onDestroy(() => K(m, E.toStyles)), ct.push(p), c.has(m) && i.push(p);
               }),
                    ct.forEach((f) => {
                         let m = r.get(f.element);
                         if (m && m.length) {
                              let p = W(m);
                              f.setRealPlayer(p);
                         }
                    }),
                    i.forEach((f) => {
                         f.parentPlayer ? f.syncPlayerEvents(f.parentPlayer) : f.destroy();
                    });
               for (let f = 0; f < v.length; f++) {
                    let m = v[f],
                         p = m[I];
                    if ((ee(m, Ve), p && p.hasAnimation)) continue;
                    let E = [];
                    if (a.size) {
                         let z = a.get(m);
                         z && z.length && E.push(...z);
                         let C = this.driver.query(m, je, !0);
                         for (let j = 0; j < C.length; j++) {
                              let T = a.get(C[j]);
                              T && T.length && E.push(...T);
                         }
                    }
                    let A = E.filter((z) => !z.destroyed);
                    A.length ? Di(this, m, A) : this.processLeaveNode(m);
               }
               return (
                    (v.length = 0),
                    G.forEach((f) => {
                         this.players.push(f),
                              f.onDone(() => {
                                   f.destroy();
                                   let m = this.players.indexOf(f);
                                   this.players.splice(m, 1);
                              }),
                              f.play();
                    }),
                    G
               );
          }
          afterFlush(e) {
               this._flushFns.push(e);
          }
          afterFlushAnimationsDone(e) {
               this._whenQuietFns.push(e);
          }
          _getPreviousPlayers(e, t, s, i, r) {
               let o = [];
               if (t) {
                    let a = this.playersByQueriedElement.get(e);
                    a && (o = a);
               } else {
                    let a = this.playersByElement.get(e);
                    if (a) {
                         let l = !r || r == ae;
                         a.forEach((h) => {
                              h.queued || (!l && h.triggerName != i) || o.push(h);
                         });
                    }
               }
               return (s || i) && (o = o.filter((a) => !((s && s != a.namespaceId) || (i && i != a.triggerName)))), o;
          }
          _beforeAnimationBuild(e, t, s) {
               let i = t.triggerName,
                    r = t.element,
                    o = t.isRemovalTransition ? void 0 : e,
                    a = t.isRemovalTransition ? void 0 : i;
               for (let l of t.timelines) {
                    let h = l.element,
                         c = h !== r,
                         u = F(s, h, []);
                    this._getPreviousPlayers(h, c, o, a, t.toState).forEach((g) => {
                         let d = g.getRealPlayer();
                         d.beforeDestroy && d.beforeDestroy(), g.destroy(), u.push(g);
                    });
               }
               X(r, t.fromStyles);
          }
          _buildAnimation(e, t, s, i, r, o) {
               let a = t.triggerName,
                    l = t.element,
                    h = [],
                    c = new Set(),
                    u = new Set(),
                    _ = t.timelines.map((d) => {
                         let y = d.element;
                         c.add(y);
                         let v = y[I];
                         if (v && v.removedBeforeQueried) return new U(d.duration, d.delay);
                         let w = y !== l,
                              b = Ci((s.get(y) || bi).map((D) => D.getRealPlayer())).filter((D) => {
                                   let B = D;
                                   return B.element ? B.element === y : !1;
                              }),
                              N = r.get(y),
                              P = o.get(y),
                              J = Wt(this._normalizer, d.keyframes, N, P),
                              L = this._buildPlayer(d, J, b);
                         if ((d.subTimeline && i && u.add(y), w)) {
                              let D = new ce(e, a, y);
                              D.setRealPlayer(L), h.push(D);
                         }
                         return L;
                    });
               h.forEach((d) => {
                    F(this.playersByQueriedElement, d.element, []).push(d),
                         d.onDone(() => Pi(this.playersByQueriedElement, d.element, d));
               }),
                    c.forEach((d) => R(d, Rt));
               let g = W(_);
               return (
                    g.onDestroy(() => {
                         c.forEach((d) => ee(d, Rt)), K(l, t.toStyles);
                    }),
                    u.forEach((d) => {
                         F(i, d, []).push(g);
                    }),
                    g
               );
          }
          _buildPlayer(e, t, s) {
               return t.length > 0
                    ? this.driver.animate(e.element, t, e.duration, e.delay, e.easing, s)
                    : new U(e.duration, e.delay);
          }
     },
     ce = class {
          constructor(e, t, s) {
               (this.namespaceId = e),
                    (this.triggerName = t),
                    (this.element = s),
                    (this._player = new U()),
                    (this._containsRealPlayer = !1),
                    (this._queuedCallbacks = new Map()),
                    (this.destroyed = !1),
                    (this.parentPlayer = null),
                    (this.markedForDestroy = !1),
                    (this.disabled = !1),
                    (this.queued = !0),
                    (this.totalTime = 0);
          }
          setRealPlayer(e) {
               this._containsRealPlayer ||
                    ((this._player = e),
                    this._queuedCallbacks.forEach((t, s) => {
                         t.forEach((i) => nt(e, s, void 0, i));
                    }),
                    this._queuedCallbacks.clear(),
                    (this._containsRealPlayer = !0),
                    this.overrideTotalTime(e.totalTime),
                    (this.queued = !1));
          }
          getRealPlayer() {
               return this._player;
          }
          overrideTotalTime(e) {
               this.totalTime = e;
          }
          syncPlayerEvents(e) {
               let t = this._player;
               t.triggerCallback && e.onStart(() => t.triggerCallback('start')),
                    e.onDone(() => this.finish()),
                    e.onDestroy(() => this.destroy());
          }
          _queueEvent(e, t) {
               F(this._queuedCallbacks, e, []).push(t);
          }
          onDone(e) {
               this.queued && this._queueEvent('done', e), this._player.onDone(e);
          }
          onStart(e) {
               this.queued && this._queueEvent('start', e), this._player.onStart(e);
          }
          onDestroy(e) {
               this.queued && this._queueEvent('destroy', e), this._player.onDestroy(e);
          }
          init() {
               this._player.init();
          }
          hasStarted() {
               return this.queued ? !1 : this._player.hasStarted();
          }
          play() {
               !this.queued && this._player.play();
          }
          pause() {
               !this.queued && this._player.pause();
          }
          restart() {
               !this.queued && this._player.restart();
          }
          finish() {
               this._player.finish();
          }
          destroy() {
               (this.destroyed = !0), this._player.destroy();
          }
          reset() {
               !this.queued && this._player.reset();
          }
          setPosition(e) {
               this.queued || this._player.setPosition(e);
          }
          getPosition() {
               return this.queued ? 0 : this._player.getPosition();
          }
          triggerCallback(e) {
               let t = this._player;
               t.triggerCallback && t.triggerCallback(e);
          }
     };
function Pi(n, e, t) {
     let s = n.get(e);
     if (s) {
          if (s.length) {
               let i = s.indexOf(t);
               s.splice(i, 1);
          }
          s.length == 0 && n.delete(e);
     }
     return s;
}
function Mi(n) {
     return n ?? null;
}
function Se(n) {
     return n && n.nodeType === 1;
}
function Ni(n) {
     return n == 'start' || n == 'done';
}
function Qt(n, e) {
     let t = n.style.display;
     return (n.style.display = e ?? 'none'), t;
}
function $t(n, e, t, s, i) {
     let r = [];
     t.forEach((l) => r.push(Qt(l)));
     let o = [];
     s.forEach((l, h) => {
          let c = new Map();
          l.forEach((u) => {
               let _ = e.computeStyle(h, u, i);
               c.set(u, _), (!_ || _.length == 0) && ((h[I] = Ai), o.push(h));
          }),
               n.set(h, c);
     });
     let a = 0;
     return t.forEach((l) => Qt(l, r[a++])), o;
}
function Vt(n, e) {
     let t = new Map();
     if ((n.forEach((a) => t.set(a, [])), e.length == 0)) return t;
     let s = 1,
          i = new Set(e),
          r = new Map();
     function o(a) {
          if (!a) return s;
          let l = r.get(a);
          if (l) return l;
          let h = a.parentNode;
          return t.has(h) ? (l = h) : i.has(h) ? (l = s) : (l = o(h)), r.set(a, l), l;
     }
     return (
          e.forEach((a) => {
               let l = o(a);
               l !== s && t.get(l).push(a);
          }),
          t
     );
}
function R(n, e) {
     n.classList?.add(e);
}
function ee(n, e) {
     n.classList?.remove(e);
}
function Di(n, e, t) {
     W(t).onDone(() => n.processLeaveNode(e));
}
function Ci(n) {
     let e = [];
     return ns(n, e), e;
}
function ns(n, e) {
     for (let t = 0; t < n.length; t++) {
          let s = n[t];
          s instanceof re ? ns(s.players, e) : e.push(s);
     }
}
function ki(n, e) {
     let t = Object.keys(n),
          s = Object.keys(e);
     if (t.length != s.length) return !1;
     for (let i = 0; i < t.length; i++) {
          let r = t[i];
          if (!e.hasOwnProperty(r) || n[r] !== e[r]) return !1;
     }
     return !0;
}
function jt(n, e, t) {
     let s = t.get(n);
     if (!s) return !1;
     let i = e.get(n);
     return i ? s.forEach((r) => i.add(r)) : e.set(n, s), t.delete(n), !0;
}
var se = class {
     constructor(e, t, s) {
          (this._driver = t),
               (this._normalizer = s),
               (this._triggerCache = {}),
               (this.onRemovalComplete = (i, r) => {}),
               (this._transitionEngine = new st(e.body, t, s)),
               (this._timelineEngine = new et(e.body, t, s)),
               (this._transitionEngine.onRemovalComplete = (i, r) => this.onRemovalComplete(i, r));
     }
     registerTrigger(e, t, s, i, r) {
          let o = e + '-' + i,
               a = this._triggerCache[o];
          if (!a) {
               let l = [],
                    h = [],
                    c = ts(this._driver, r, l, h);
               if (l.length) throw Cs(i, l);
               h.length && void 0, (a = gi(i, c, this._normalizer)), (this._triggerCache[o] = a);
          }
          this._transitionEngine.registerTrigger(t, i, a);
     }
     register(e, t) {
          this._transitionEngine.register(e, t);
     }
     destroy(e, t) {
          this._transitionEngine.destroy(e, t);
     }
     onInsert(e, t, s, i) {
          this._transitionEngine.insertNode(e, t, s, i);
     }
     onRemove(e, t, s) {
          this._transitionEngine.removeNode(e, t, s);
     }
     disableAnimations(e, t) {
          this._transitionEngine.markElementAsDisabled(e, t);
     }
     process(e, t, s, i) {
          if (s.charAt(0) == '@') {
               let [r, o] = Ft(s),
                    a = i;
               this._timelineEngine.command(r, t, o, a);
          } else this._transitionEngine.trigger(e, t, s, i);
     }
     listen(e, t, s, i, r) {
          if (s.charAt(0) == '@') {
               let [o, a] = Ft(s);
               return this._timelineEngine.listen(o, t, a, r);
          }
          return this._transitionEngine.listen(e, t, s, i, r);
     }
     flush(e = -1) {
          this._transitionEngine.flush(e);
     }
     get players() {
          return [...this._transitionEngine.players, ...this._timelineEngine.players];
     }
     whenRenderingDone() {
          return this._transitionEngine.whenRenderingDone();
     }
     afterFlushAnimationsDone(e) {
          this._transitionEngine.afterFlushAnimationsDone(e);
     }
};
function Fi(n, e) {
     let t = null,
          s = null;
     return (
          Array.isArray(e) && e.length
               ? ((t = $e(e[0])), e.length > 1 && (s = $e(e[e.length - 1])))
               : e instanceof Map && (t = $e(e)),
          t || s ? new Oi(n, t, s) : null
     );
}
var Oi = (() => {
     let e = class e {
          constructor(s, i, r) {
               (this._element = s), (this._startStyles = i), (this._endStyles = r), (this._state = 0);
               let o = e.initialStylesByElement.get(s);
               o || e.initialStylesByElement.set(s, (o = new Map())), (this._initialStyles = o);
          }
          start() {
               this._state < 1 &&
                    (this._startStyles && K(this._element, this._startStyles, this._initialStyles), (this._state = 1));
          }
          finish() {
               this.start(),
                    this._state < 2 &&
                         (K(this._element, this._initialStyles),
                         this._endStyles && (K(this._element, this._endStyles), (this._endStyles = null)),
                         (this._state = 1));
          }
          destroy() {
               this.finish(),
                    this._state < 3 &&
                         (e.initialStylesByElement.delete(this._element),
                         this._startStyles && (X(this._element, this._startStyles), (this._endStyles = null)),
                         this._endStyles && (X(this._element, this._endStyles), (this._endStyles = null)),
                         K(this._element, this._initialStyles),
                         (this._state = 3));
          }
     };
     e.initialStylesByElement = new WeakMap();
     let n = e;
     return n;
})();
function $e(n) {
     let e = null;
     return (
          n.forEach((t, s) => {
               Ri(s) && ((e = e || new Map()), e.set(s, t));
          }),
          e
     );
}
function Ri(n) {
     return n === 'display' || n === 'position';
}
var Ce = class {
          constructor(e, t, s, i) {
               (this.element = e),
                    (this.keyframes = t),
                    (this.options = s),
                    (this._specialStyles = i),
                    (this._onDoneFns = []),
                    (this._onStartFns = []),
                    (this._onDestroyFns = []),
                    (this._initialized = !1),
                    (this._finished = !1),
                    (this._started = !1),
                    (this._destroyed = !1),
                    (this._originalOnDoneFns = []),
                    (this._originalOnStartFns = []),
                    (this.time = 0),
                    (this.parentPlayer = null),
                    (this.currentSnapshot = new Map()),
                    (this._duration = s.duration),
                    (this._delay = s.delay || 0),
                    (this.time = this._duration + this._delay);
          }
          _onFinish() {
               this._finished || ((this._finished = !0), this._onDoneFns.forEach((e) => e()), (this._onDoneFns = []));
          }
          init() {
               this._buildPlayer(), this._preparePlayerBeforeStart();
          }
          _buildPlayer() {
               if (this._initialized) return;
               this._initialized = !0;
               let e = this.keyframes;
               (this.domPlayer = this._triggerWebAnimation(this.element, e, this.options)),
                    (this._finalKeyframe = e.length ? e[e.length - 1] : new Map());
               let t = () => this._onFinish();
               this.domPlayer.addEventListener('finish', t),
                    this.onDestroy(() => {
                         this.domPlayer.removeEventListener('finish', t);
                    });
          }
          _preparePlayerBeforeStart() {
               this._delay ? this._resetDomPlayerState() : this.domPlayer.pause();
          }
          _convertKeyframesToObject(e) {
               let t = [];
               return (
                    e.forEach((s) => {
                         t.push(Object.fromEntries(s));
                    }),
                    t
               );
          }
          _triggerWebAnimation(e, t, s) {
               return e.animate(this._convertKeyframesToObject(t), s);
          }
          onStart(e) {
               this._originalOnStartFns.push(e), this._onStartFns.push(e);
          }
          onDone(e) {
               this._originalOnDoneFns.push(e), this._onDoneFns.push(e);
          }
          onDestroy(e) {
               this._onDestroyFns.push(e);
          }
          play() {
               this._buildPlayer(),
                    this.hasStarted() ||
                         (this._onStartFns.forEach((e) => e()),
                         (this._onStartFns = []),
                         (this._started = !0),
                         this._specialStyles && this._specialStyles.start()),
                    this.domPlayer.play();
          }
          pause() {
               this.init(), this.domPlayer.pause();
          }
          finish() {
               this.init(),
                    this._specialStyles && this._specialStyles.finish(),
                    this._onFinish(),
                    this.domPlayer.finish();
          }
          reset() {
               this._resetDomPlayerState(),
                    (this._destroyed = !1),
                    (this._finished = !1),
                    (this._started = !1),
                    (this._onStartFns = this._originalOnStartFns),
                    (this._onDoneFns = this._originalOnDoneFns);
          }
          _resetDomPlayerState() {
               this.domPlayer && this.domPlayer.cancel();
          }
          restart() {
               this.reset(), this.play();
          }
          hasStarted() {
               return this._started;
          }
          destroy() {
               this._destroyed ||
                    ((this._destroyed = !0),
                    this._resetDomPlayerState(),
                    this._onFinish(),
                    this._specialStyles && this._specialStyles.destroy(),
                    this._onDestroyFns.forEach((e) => e()),
                    (this._onDestroyFns = []));
          }
          setPosition(e) {
               this.domPlayer === void 0 && this.init(), (this.domPlayer.currentTime = e * this.time);
          }
          getPosition() {
               return +(this.domPlayer.currentTime ?? 0) / this.time;
          }
          get totalTime() {
               return this._delay + this._duration;
          }
          beforeDestroy() {
               let e = new Map();
               this.hasStarted() &&
                    this._finalKeyframe.forEach((s, i) => {
                         i !== 'offset' && e.set(i, this._finished ? s : Jt(this.element, i));
                    }),
                    (this.currentSnapshot = e);
          }
          triggerCallback(e) {
               let t = e === 'start' ? this._onStartFns : this._onDoneFns;
               t.forEach((s) => s()), (t.length = 0);
          }
     },
     ke = class {
          validateStyleProperty(e) {
               return !0;
          }
          validateAnimatableStyleProperty(e) {
               return !0;
          }
          matchesElement(e, t) {
               return !1;
          }
          containsElement(e, t) {
               return Gt(e, t);
          }
          getParentElement(e) {
               return ot(e);
          }
          query(e, t, s) {
               return Ht(e, t, s);
          }
          computeStyle(e, t, s) {
               return window.getComputedStyle(e)[t];
          }
          animate(e, t, s, i, r, o = []) {
               let a = i == 0 ? 'both' : 'forwards',
                    l = { duration: s, delay: i, fill: a };
               r && (l.easing = r);
               let h = new Map(),
                    c = o.filter((g) => g instanceof Ce);
               Zs(s, i) &&
                    c.forEach((g) => {
                         g.currentSnapshot.forEach((d, y) => h.set(y, d));
                    });
               let u = xs(t).map((g) => te(g));
               u = Js(e, u, h);
               let _ = Fi(e, u);
               return new Ce(e, u, l, _);
          }
     };
var ve = '@',
     rs = '@.disabled',
     Fe = class {
          constructor(e, t, s, i) {
               (this.namespaceId = e), (this.delegate = t), (this.engine = s), (this._onDestroy = i), (this.ɵtype = 0);
          }
          get data() {
               return this.delegate.data;
          }
          destroyNode(e) {
               this.delegate.destroyNode?.(e);
          }
          destroy() {
               this.engine.destroy(this.namespaceId, this.delegate),
                    this.engine.afterFlushAnimationsDone(() => {
                         queueMicrotask(() => {
                              this.delegate.destroy();
                         });
                    }),
                    this._onDestroy?.();
          }
          createElement(e, t) {
               return this.delegate.createElement(e, t);
          }
          createComment(e) {
               return this.delegate.createComment(e);
          }
          createText(e) {
               return this.delegate.createText(e);
          }
          appendChild(e, t) {
               this.delegate.appendChild(e, t), this.engine.onInsert(this.namespaceId, t, e, !1);
          }
          insertBefore(e, t, s, i = !0) {
               this.delegate.insertBefore(e, t, s), this.engine.onInsert(this.namespaceId, t, e, i);
          }
          removeChild(e, t, s) {
               this.engine.onRemove(this.namespaceId, t, this.delegate);
          }
          selectRootElement(e, t) {
               return this.delegate.selectRootElement(e, t);
          }
          parentNode(e) {
               return this.delegate.parentNode(e);
          }
          nextSibling(e) {
               return this.delegate.nextSibling(e);
          }
          setAttribute(e, t, s, i) {
               this.delegate.setAttribute(e, t, s, i);
          }
          removeAttribute(e, t, s) {
               this.delegate.removeAttribute(e, t, s);
          }
          addClass(e, t) {
               this.delegate.addClass(e, t);
          }
          removeClass(e, t) {
               this.delegate.removeClass(e, t);
          }
          setStyle(e, t, s, i) {
               this.delegate.setStyle(e, t, s, i);
          }
          removeStyle(e, t, s) {
               this.delegate.removeStyle(e, t, s);
          }
          setProperty(e, t, s) {
               t.charAt(0) == ve && t == rs ? this.disableAnimations(e, !!s) : this.delegate.setProperty(e, t, s);
          }
          setValue(e, t) {
               this.delegate.setValue(e, t);
          }
          listen(e, t, s) {
               return this.delegate.listen(e, t, s);
          }
          disableAnimations(e, t) {
               this.engine.disableAnimations(e, t);
          }
     },
     it = class extends Fe {
          constructor(e, t, s, i, r) {
               super(t, s, i, r), (this.factory = e), (this.namespaceId = t);
          }
          setProperty(e, t, s) {
               t.charAt(0) == ve
                    ? t.charAt(1) == '.' && t == rs
                         ? ((s = s === void 0 ? !0 : !!s), this.disableAnimations(e, s))
                         : this.engine.process(this.namespaceId, e, t.slice(1), s)
                    : this.delegate.setProperty(e, t, s);
          }
          listen(e, t, s) {
               if (t.charAt(0) == ve) {
                    let i = Ii(e),
                         r = t.slice(1),
                         o = '';
                    return (
                         r.charAt(0) != ve && ([r, o] = Li(r)),
                         this.engine.listen(this.namespaceId, i, r, o, (a) => {
                              let l = a._data || -1;
                              this.factory.scheduleListenerCallback(l, s, a);
                         })
                    );
               }
               return this.delegate.listen(e, t, s);
          }
     };
function Ii(n) {
     switch (n) {
          case 'body':
               return document.body;
          case 'document':
               return document;
          case 'window':
               return window;
          default:
               return n;
     }
}
function Li(n) {
     let e = n.indexOf('.'),
          t = n.substring(0, e),
          s = n.slice(e + 1);
     return [t, s];
}
var Oe = class {
     constructor(e, t, s) {
          (this.delegate = e),
               (this.engine = t),
               (this._zone = s),
               (this._currentId = 0),
               (this._microtaskId = 1),
               (this._animationCallbacksBuffer = []),
               (this._rendererCache = new Map()),
               (this._cdRecurDepth = 0),
               (t.onRemovalComplete = (i, r) => {
                    let o = r?.parentNode(i);
                    o && r.removeChild(o, i);
               });
     }
     createRenderer(e, t) {
          let s = '',
               i = this.delegate.createRenderer(e, t);
          if (!e || !t?.data?.animation) {
               let h = this._rendererCache,
                    c = h.get(i);
               if (!c) {
                    let u = () => h.delete(i);
                    (c = new Fe(s, i, this.engine, u)), h.set(i, c);
               }
               return c;
          }
          let r = t.id,
               o = t.id + '-' + this._currentId;
          this._currentId++, this.engine.register(o, e);
          let a = (h) => {
               Array.isArray(h) ? h.forEach(a) : this.engine.registerTrigger(r, o, e, h.name, h);
          };
          return t.data.animation.forEach(a), new it(this, o, i, this.engine);
     }
     begin() {
          this._cdRecurDepth++, this.delegate.begin && this.delegate.begin();
     }
     _scheduleCountTask() {
          queueMicrotask(() => {
               this._microtaskId++;
          });
     }
     scheduleListenerCallback(e, t, s) {
          if (e >= 0 && e < this._microtaskId) {
               this._zone.run(() => t(s));
               return;
          }
          let i = this._animationCallbacksBuffer;
          i.length == 0 &&
               queueMicrotask(() => {
                    this._zone.run(() => {
                         i.forEach((r) => {
                              let [o, a] = r;
                              o(a);
                         }),
                              (this._animationCallbacksBuffer = []);
                    });
               }),
               i.push([t, s]);
     }
     end() {
          this._cdRecurDepth--,
               this._cdRecurDepth == 0 &&
                    this._zone.runOutsideAngular(() => {
                         this._scheduleCountTask(), this.engine.flush(this._microtaskId);
                    }),
               this.delegate.end && this.delegate.end();
     }
     whenRenderingDone() {
          return this.engine.whenRenderingDone();
     }
};
var qi = (() => {
     let e = class e extends se {
          constructor(s, i, r, o) {
               super(s, i, r);
          }
          ngOnDestroy() {
               this.flush();
          }
     };
     (e.ɵfac = function (i) {
          return new (i || e)(ne(St), ne(fe), ne(Z), ne(Et));
     }),
          (e.ɵprov = pe({ token: e, factory: e.ɵfac }));
     let n = e;
     return n;
})();
function Ki() {
     return new Ae();
}
function Bi(n, e, t) {
     return new Oe(n, e, t);
}
var os = [
          { provide: Z, useFactory: Ki },
          { provide: se, useClass: qi },
          { provide: pt, useFactory: Bi, deps: [vt, se, yt] },
     ],
     Qi = [{ provide: fe, useFactory: () => new ke() }, { provide: Ie, useValue: 'BrowserAnimations' }, ...os],
     nn = [{ provide: fe, useClass: at }, { provide: Ie, useValue: 'NoopAnimations' }, ...os];
function as() {
     return [...Qi];
}
var ls = { providers: [bt(Dt, Pt(), At()), as()] };
var hs = (() => {
     let e = class e {
          constructor() {
               this.title = 'Fedex';
          }
     };
     (e.ɵfac = function (i) {
          return new (i || e)();
     }),
          (e.ɵcmp = mt({
               type: e,
               selectors: [['operations-root']],
               standalone: !0,
               features: [_t],
               decls: 1,
               vars: 0,
               template: function (i, r) {
                    i & 1 && gt(0, 'router-outlet');
               },
               dependencies: [Mt, wt],
          }));
     let n = e;
     return n;
})();
Tt(hs, ls).catch((n) => console.error(n));
Nt.production && void 0;
