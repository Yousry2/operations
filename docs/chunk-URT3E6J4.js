import {
     $ as W,
     A as c,
     B as ue,
     C as j,
     E as _,
     F as C,
     G as de,
     H as w,
     I as E,
     J as l,
     K as s,
     L as h,
     M as Ie,
     N as F,
     O as ce,
     P as V,
     Q as u,
     R as Ne,
     S as M,
     T as $,
     U as Oe,
     W as he,
     Y as Pe,
     Z as T,
     _ as ke,
     a as y,
     aa as je,
     b as D,
     ba as Te,
     c as we,
     ca as Ge,
     d as Ee,
     e as Me,
     f as Fe,
     fa as Ue,
     g as xe,
     h as I,
     i as H,
     j as N,
     ja as Re,
     k as O,
     ka as Be,
     l as A,
     n as m,
     o as L,
     p as P,
     q as g,
     r as oe,
     s as se,
     u as k,
     v as ae,
     x as le,
     y as Se,
     z as d,
} from './chunk-THPUVWE3.js';
var xt = Be.server + '/users',
     q = (() => {
          let e = class e {
               constructor() {
                    this.http = m(Te);
               }
               signup(i) {
                    return this.http.post(xt, { user: i });
               }
          };
          (e.ɵfac = function (r) {
               return new (r || e)();
          }),
               (e.ɵprov = N({ token: e, factory: e.ɵfac, providedIn: 'root' }));
          let t = e;
          return t;
     })();
function He(t, e) {
     return (n) =>
          n.value.length === 0 ||
          t.every(
               (r) =>
                    n.parent?.get(r)?.value.length === 0 ||
                    !n.value.toLowerCase().includes(n.parent?.get(r)?.value.toLowerCase())
          )
               ? null
               : e;
}
function Le(t, e) {
     return (n) => (t.forEach((i) => n.parent?.get(i)?.updateValueAndValidity()), null);
}
var $e = () => {
     let t = new we();
     return (
          m(ue).onDestroy(() => {
               t.next(), t.complete();
          }),
          t
     );
};
function We(t) {
     return t.getBaseHrefFromDOM();
}
var qe = (() => {
     let e = class e {
          constructor(i) {
               this.baseHref = i;
          }
     };
     (e.ɵfac = function (r) {
          return new (r || e)(c(T));
     }),
          (e.ɵcmp = L({
               type: e,
               selectors: [['operations-fedex-auth']],
               standalone: !0,
               features: [M([q, { provide: T, useFactory: We, deps: [Pe] }]), $],
               decls: 9,
               vars: 3,
               consts: [
                    [1, 'flex', 'min-h-screen', 'justify-center', 'items-center', 'font-quicksand', 'bg-gray-50'],
                    [1, 'flex', 'backdrop-blur-md', 'p-3', 'shadow-lg', 'max-w-6xl', 'shadow-gray-400', 'rounded-2xl'],
                    [1, 'w-1/2', 'max-lg:hidden', 'rounded-2xl'],
                    [
                         'priority',
                         '',
                         'width',
                         '500',
                         'height',
                         '200',
                         'alt',
                         '',
                         1,
                         'min-w-full',
                         'h-full',
                         'object-center',
                         'object-fill',
                         'rounded-2xl',
                         3,
                         'ngSrc',
                    ],
                    [1, 'w-1/2', 'max-lg:w-full'],
                    [1, 'flex', 'flex-col', 'mx-12', 'mt-4', 'max-sm:mx-4'],
                    ['alt', 'logo', 'height', '20', 'priority', '', 'width', '20', 1, 'self-end', 'w-32', 3, 'ngSrc'],
               ],
               template: function (r, o) {
                    r & 1 &&
                         (u(0),
                         l(1, 'main', 0)(2, 'section', 1)(3, 'div', 2),
                         h(4, 'img', 3),
                         s(),
                         l(5, 'div', 4)(6, 'div', 5),
                         h(7, 'img', 6)(8, 'router-outlet'),
                         s()()()()),
                         r & 2 &&
                              (Ne(
                                   '',
                                   o.baseHref,
                                   `
`
                              ),
                              d(4),
                              V('ngSrc', '', o.baseHref, 'assets/fedex-auth/images/register7.jpeg'),
                              d(3),
                              V('ngSrc', '', o.baseHref, 'assets/fedex-auth/images/logo.png'));
               },
               dependencies: [W, Re, Ue, je, Ge],
               changeDetection: 0,
          }));
     let t = e;
     return t;
})();
var Qe = (() => {
          let e = class e {
               constructor(i, r) {
                    (this._renderer = i),
                         (this._elementRef = r),
                         (this.onChange = (o) => {}),
                         (this.onTouched = () => {});
               }
               setProperty(i, r) {
                    this._renderer.setProperty(this._elementRef.nativeElement, i, r);
               }
               registerOnTouched(i) {
                    this.onTouched = i;
               }
               registerOnChange(i) {
                    this.onChange = i;
               }
               setDisabledState(i) {
                    this.setProperty('disabled', i);
               }
          };
          (e.ɵfac = function (r) {
               return new (r || e)(c(le), c(ae));
          }),
               (e.ɵdir = g({ type: e }));
          let t = e;
          return t;
     })(),
     et = (() => {
          let e = class e extends Qe {};
          (e.ɵfac = (() => {
               let i;
               return function (o) {
                    return (i || (i = se(e)))(o || e);
               };
          })()),
               (e.ɵdir = g({ type: e, features: [_] }));
          let t = e;
          return t;
     })(),
     ye = new A('NgValueAccessor'),
     St = { provide: ye, useExisting: I(() => _e), multi: !0 },
     _e = (() => {
          let e = class e extends et {
               writeValue(i) {
                    this.setProperty('checked', i);
               }
          };
          (e.ɵfac = (() => {
               let i;
               return function (o) {
                    return (i || (i = se(e)))(o || e);
               };
          })()),
               (e.ɵdir = g({
                    type: e,
                    selectors: [
                         ['input', 'type', 'checkbox', 'formControlName', ''],
                         ['input', 'type', 'checkbox', 'formControl', ''],
                         ['input', 'type', 'checkbox', 'ngModel', ''],
                    ],
                    hostBindings: function (r, o) {
                         r & 1 &&
                              F('change', function (f) {
                                   return o.onChange(f.target.checked);
                              })('blur', function () {
                                   return o.onTouched();
                              });
                    },
                    features: [M([St]), _],
               }));
          let t = e;
          return t;
     })(),
     It = { provide: ye, useExisting: I(() => te), multi: !0 };
function Nt() {
     let t = he() ? he().getUserAgent() : '';
     return /android (\d+)/.test(t.toLowerCase());
}
var Ot = new A('CompositionEventMode'),
     te = (() => {
          let e = class e extends Qe {
               constructor(i, r, o) {
                    super(i, r),
                         (this._compositionMode = o),
                         (this._composing = !1),
                         this._compositionMode == null && (this._compositionMode = !Nt());
               }
               writeValue(i) {
                    let r = i ?? '';
                    this.setProperty('value', r);
               }
               _handleInput(i) {
                    (!this._compositionMode || (this._compositionMode && !this._composing)) && this.onChange(i);
               }
               _compositionStart() {
                    this._composing = !0;
               }
               _compositionEnd(i) {
                    (this._composing = !1), this._compositionMode && this.onChange(i);
               }
          };
          (e.ɵfac = function (r) {
               return new (r || e)(c(le), c(ae), c(Ot, 8));
          }),
               (e.ɵdir = g({
                    type: e,
                    selectors: [
                         ['input', 'formControlName', '', 3, 'type', 'checkbox'],
                         ['textarea', 'formControlName', ''],
                         ['input', 'formControl', '', 3, 'type', 'checkbox'],
                         ['textarea', 'formControl', ''],
                         ['input', 'ngModel', '', 3, 'type', 'checkbox'],
                         ['textarea', 'ngModel', ''],
                         ['', 'ngDefaultControl', ''],
                    ],
                    hostBindings: function (r, o) {
                         r & 1 &&
                              F('input', function (f) {
                                   return o._handleInput(f.target.value);
                              })('blur', function () {
                                   return o.onTouched();
                              })('compositionstart', function () {
                                   return o._compositionStart();
                              })('compositionend', function (f) {
                                   return o._compositionEnd(f.target.value);
                              });
                    },
                    features: [M([It]), _],
               }));
          let t = e;
          return t;
     })();
function b(t) {
     return t == null || ((typeof t == 'string' || Array.isArray(t)) && t.length === 0);
}
function tt(t) {
     return t != null && typeof t.length == 'number';
}
var it = new A('NgValidators'),
     nt = new A('NgAsyncValidators'),
     Pt =
          /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
     p = class {
          static min(e) {
               return kt(e);
          }
          static max(e) {
               return jt(e);
          }
          static required(e) {
               return Tt(e);
          }
          static requiredTrue(e) {
               return Gt(e);
          }
          static email(e) {
               return Ut(e);
          }
          static minLength(e) {
               return Rt(e);
          }
          static maxLength(e) {
               return Bt(e);
          }
          static pattern(e) {
               return Ht(e);
          }
          static nullValidator(e) {
               return rt(e);
          }
          static compose(e) {
               return dt(e);
          }
          static composeAsync(e) {
               return ht(e);
          }
     };
function kt(t) {
     return (e) => {
          if (b(e.value) || b(t)) return null;
          let n = parseFloat(e.value);
          return !isNaN(n) && n < t ? { min: { min: t, actual: e.value } } : null;
     };
}
function jt(t) {
     return (e) => {
          if (b(e.value) || b(t)) return null;
          let n = parseFloat(e.value);
          return !isNaN(n) && n > t ? { max: { max: t, actual: e.value } } : null;
     };
}
function Tt(t) {
     return b(t.value) ? { required: !0 } : null;
}
function Gt(t) {
     return t.value === !0 ? null : { required: !0 };
}
function Ut(t) {
     return b(t.value) || Pt.test(t.value) ? null : { email: !0 };
}
function Rt(t) {
     return (e) =>
          b(e.value) || !tt(e.value)
               ? null
               : e.value.length < t
               ? { minlength: { requiredLength: t, actualLength: e.value.length } }
               : null;
}
function Bt(t) {
     return (e) =>
          tt(e.value) && e.value.length > t ? { maxlength: { requiredLength: t, actualLength: e.value.length } } : null;
}
function Ht(t) {
     if (!t) return rt;
     let e, n;
     return (
          typeof t == 'string'
               ? ((n = ''),
                 t.charAt(0) !== '^' && (n += '^'),
                 (n += t),
                 t.charAt(t.length - 1) !== '$' && (n += '$'),
                 (e = new RegExp(n)))
               : ((n = t.toString()), (e = t)),
          (i) => {
               if (b(i.value)) return null;
               let r = i.value;
               return e.test(r) ? null : { pattern: { requiredPattern: n, actualValue: r } };
          }
     );
}
function rt(t) {
     return null;
}
function ot(t) {
     return t != null;
}
function st(t) {
     return Ie(t) ? Ee(t) : t;
}
function at(t) {
     let e = {};
     return (
          t.forEach((n) => {
               e = n != null ? y(y({}, e), n) : e;
          }),
          Object.keys(e).length === 0 ? null : e
     );
}
function lt(t, e) {
     return e.map((n) => n(t));
}
function Lt(t) {
     return !t.validate;
}
function ut(t) {
     return t.map((e) => (Lt(e) ? e : (n) => e.validate(n)));
}
function dt(t) {
     if (!t) return null;
     let e = t.filter(ot);
     return e.length == 0
          ? null
          : function (n) {
                 return at(lt(n, e));
            };
}
function ct(t) {
     return t != null ? dt(ut(t)) : null;
}
function ht(t) {
     if (!t) return null;
     let e = t.filter(ot);
     return e.length == 0
          ? null
          : function (n) {
                 let i = lt(n, e).map(st);
                 return Fe(i).pipe(Me(at));
            };
}
function ft(t) {
     return t != null ? ht(ut(t)) : null;
}
function ze(t, e) {
     return t === null ? [e] : Array.isArray(t) ? [...t, e] : [t, e];
}
function pt(t) {
     return t._rawValidators;
}
function mt(t) {
     return t._rawAsyncValidators;
}
function pe(t) {
     return t ? (Array.isArray(t) ? t : [t]) : [];
}
function Z(t, e) {
     return Array.isArray(t) ? t.includes(e) : t === e;
}
function Ze(t, e) {
     let n = pe(e);
     return (
          pe(t).forEach((r) => {
               Z(n, r) || n.push(r);
          }),
          n
     );
}
function Xe(t, e) {
     return pe(e).filter((n) => !Z(t, n));
}
var X = class {
          constructor() {
               (this._rawValidators = []), (this._rawAsyncValidators = []), (this._onDestroyCallbacks = []);
          }
          get value() {
               return this.control ? this.control.value : null;
          }
          get valid() {
               return this.control ? this.control.valid : null;
          }
          get invalid() {
               return this.control ? this.control.invalid : null;
          }
          get pending() {
               return this.control ? this.control.pending : null;
          }
          get disabled() {
               return this.control ? this.control.disabled : null;
          }
          get enabled() {
               return this.control ? this.control.enabled : null;
          }
          get errors() {
               return this.control ? this.control.errors : null;
          }
          get pristine() {
               return this.control ? this.control.pristine : null;
          }
          get dirty() {
               return this.control ? this.control.dirty : null;
          }
          get touched() {
               return this.control ? this.control.touched : null;
          }
          get status() {
               return this.control ? this.control.status : null;
          }
          get untouched() {
               return this.control ? this.control.untouched : null;
          }
          get statusChanges() {
               return this.control ? this.control.statusChanges : null;
          }
          get valueChanges() {
               return this.control ? this.control.valueChanges : null;
          }
          get path() {
               return null;
          }
          _setValidators(e) {
               (this._rawValidators = e || []), (this._composedValidatorFn = ct(this._rawValidators));
          }
          _setAsyncValidators(e) {
               (this._rawAsyncValidators = e || []), (this._composedAsyncValidatorFn = ft(this._rawAsyncValidators));
          }
          get validator() {
               return this._composedValidatorFn || null;
          }
          get asyncValidator() {
               return this._composedAsyncValidatorFn || null;
          }
          _registerOnDestroy(e) {
               this._onDestroyCallbacks.push(e);
          }
          _invokeOnDestroyCallbacks() {
               this._onDestroyCallbacks.forEach((e) => e()), (this._onDestroyCallbacks = []);
          }
          reset(e = void 0) {
               this.control && this.control.reset(e);
          }
          hasError(e, n) {
               return this.control ? this.control.hasError(e, n) : !1;
          }
          getError(e, n) {
               return this.control ? this.control.getError(e, n) : null;
          }
     },
     R = class extends X {
          get formDirective() {
               return null;
          }
          get path() {
               return null;
          }
     },
     B = class extends X {
          constructor() {
               super(...arguments), (this._parent = null), (this.name = null), (this.valueAccessor = null);
          }
     },
     Y = class {
          constructor(e) {
               this._cd = e;
          }
          get isTouched() {
               return !!this._cd?.control?.touched;
          }
          get isUntouched() {
               return !!this._cd?.control?.untouched;
          }
          get isPristine() {
               return !!this._cd?.control?.pristine;
          }
          get isDirty() {
               return !!this._cd?.control?.dirty;
          }
          get isValid() {
               return !!this._cd?.control?.valid;
          }
          get isInvalid() {
               return !!this._cd?.control?.invalid;
          }
          get isPending() {
               return !!this._cd?.control?.pending;
          }
          get isSubmitted() {
               return !!this._cd?.submitted;
          }
     },
     $t = {
          '[class.ng-untouched]': 'isUntouched',
          '[class.ng-touched]': 'isTouched',
          '[class.ng-pristine]': 'isPristine',
          '[class.ng-dirty]': 'isDirty',
          '[class.ng-valid]': 'isValid',
          '[class.ng-invalid]': 'isInvalid',
          '[class.ng-pending]': 'isPending',
     },
     vn = D(y({}, $t), { '[class.ng-submitted]': 'isSubmitted' }),
     gt = (() => {
          let e = class e extends Y {
               constructor(i) {
                    super(i);
               }
          };
          (e.ɵfac = function (r) {
               return new (r || e)(c(B, 2));
          }),
               (e.ɵdir = g({
                    type: e,
                    selectors: [
                         ['', 'formControlName', ''],
                         ['', 'ngModel', ''],
                         ['', 'formControl', ''],
                    ],
                    hostVars: 14,
                    hostBindings: function (r, o) {
                         r & 2 &&
                              de('ng-untouched', o.isUntouched)('ng-touched', o.isTouched)('ng-pristine', o.isPristine)(
                                   'ng-dirty',
                                   o.isDirty
                              )('ng-valid', o.isValid)('ng-invalid', o.isInvalid)('ng-pending', o.isPending);
                    },
                    features: [_],
               }));
          let t = e;
          return t;
     })(),
     vt = (() => {
          let e = class e extends Y {
               constructor(i) {
                    super(i);
               }
          };
          (e.ɵfac = function (r) {
               return new (r || e)(c(R, 10));
          }),
               (e.ɵdir = g({
                    type: e,
                    selectors: [
                         ['', 'formGroupName', ''],
                         ['', 'formArrayName', ''],
                         ['', 'ngModelGroup', ''],
                         ['', 'formGroup', ''],
                         ['form', 3, 'ngNoForm', ''],
                         ['', 'ngForm', ''],
                    ],
                    hostVars: 16,
                    hostBindings: function (r, o) {
                         r & 2 &&
                              de('ng-untouched', o.isUntouched)('ng-touched', o.isTouched)('ng-pristine', o.isPristine)(
                                   'ng-dirty',
                                   o.isDirty
                              )('ng-valid', o.isValid)('ng-invalid', o.isInvalid)('ng-pending', o.isPending)(
                                   'ng-submitted',
                                   o.isSubmitted
                              );
                    },
                    features: [_],
               }));
          let t = e;
          return t;
     })();
var G = 'VALID',
     z = 'INVALID',
     x = 'PENDING',
     U = 'DISABLED';
function Ce(t) {
     return (ie(t) ? t.validators : t) || null;
}
function Wt(t) {
     return Array.isArray(t) ? ct(t) : t || null;
}
function Ve(t, e) {
     return (ie(e) ? e.asyncValidators : t) || null;
}
function qt(t) {
     return Array.isArray(t) ? ft(t) : t || null;
}
function ie(t) {
     return t != null && !Array.isArray(t) && typeof t == 'object';
}
function yt(t, e, n) {
     let i = t.controls;
     if (!(e ? Object.keys(i) : i).length) throw new H(1e3, '');
     if (!i[n]) throw new H(1001, '');
}
function _t(t, e, n) {
     t._forEachChild((i, r) => {
          if (n[r] === void 0) throw new H(1002, '');
     });
}
var S = class {
          constructor(e, n) {
               (this._pendingDirty = !1),
                    (this._hasOwnPendingAsyncValidator = !1),
                    (this._pendingTouched = !1),
                    (this._onCollectionChange = () => {}),
                    (this._parent = null),
                    (this.pristine = !0),
                    (this.touched = !1),
                    (this._onDisabledChange = []),
                    this._assignValidators(e),
                    this._assignAsyncValidators(n);
          }
          get validator() {
               return this._composedValidatorFn;
          }
          set validator(e) {
               this._rawValidators = this._composedValidatorFn = e;
          }
          get asyncValidator() {
               return this._composedAsyncValidatorFn;
          }
          set asyncValidator(e) {
               this._rawAsyncValidators = this._composedAsyncValidatorFn = e;
          }
          get parent() {
               return this._parent;
          }
          get valid() {
               return this.status === G;
          }
          get invalid() {
               return this.status === z;
          }
          get pending() {
               return this.status == x;
          }
          get disabled() {
               return this.status === U;
          }
          get enabled() {
               return this.status !== U;
          }
          get dirty() {
               return !this.pristine;
          }
          get untouched() {
               return !this.touched;
          }
          get updateOn() {
               return this._updateOn ? this._updateOn : this.parent ? this.parent.updateOn : 'change';
          }
          setValidators(e) {
               this._assignValidators(e);
          }
          setAsyncValidators(e) {
               this._assignAsyncValidators(e);
          }
          addValidators(e) {
               this.setValidators(Ze(e, this._rawValidators));
          }
          addAsyncValidators(e) {
               this.setAsyncValidators(Ze(e, this._rawAsyncValidators));
          }
          removeValidators(e) {
               this.setValidators(Xe(e, this._rawValidators));
          }
          removeAsyncValidators(e) {
               this.setAsyncValidators(Xe(e, this._rawAsyncValidators));
          }
          hasValidator(e) {
               return Z(this._rawValidators, e);
          }
          hasAsyncValidator(e) {
               return Z(this._rawAsyncValidators, e);
          }
          clearValidators() {
               this.validator = null;
          }
          clearAsyncValidators() {
               this.asyncValidator = null;
          }
          markAsTouched(e = {}) {
               (this.touched = !0), this._parent && !e.onlySelf && this._parent.markAsTouched(e);
          }
          markAllAsTouched() {
               this.markAsTouched({ onlySelf: !0 }), this._forEachChild((e) => e.markAllAsTouched());
          }
          markAsUntouched(e = {}) {
               (this.touched = !1),
                    (this._pendingTouched = !1),
                    this._forEachChild((n) => {
                         n.markAsUntouched({ onlySelf: !0 });
                    }),
                    this._parent && !e.onlySelf && this._parent._updateTouched(e);
          }
          markAsDirty(e = {}) {
               (this.pristine = !1), this._parent && !e.onlySelf && this._parent.markAsDirty(e);
          }
          markAsPristine(e = {}) {
               (this.pristine = !0),
                    (this._pendingDirty = !1),
                    this._forEachChild((n) => {
                         n.markAsPristine({ onlySelf: !0 });
                    }),
                    this._parent && !e.onlySelf && this._parent._updatePristine(e);
          }
          markAsPending(e = {}) {
               (this.status = x),
                    e.emitEvent !== !1 && this.statusChanges.emit(this.status),
                    this._parent && !e.onlySelf && this._parent.markAsPending(e);
          }
          disable(e = {}) {
               let n = this._parentMarkedDirty(e.onlySelf);
               (this.status = U),
                    (this.errors = null),
                    this._forEachChild((i) => {
                         i.disable(D(y({}, e), { onlySelf: !0 }));
                    }),
                    this._updateValue(),
                    e.emitEvent !== !1 && (this.valueChanges.emit(this.value), this.statusChanges.emit(this.status)),
                    this._updateAncestors(D(y({}, e), { skipPristineCheck: n })),
                    this._onDisabledChange.forEach((i) => i(!0));
          }
          enable(e = {}) {
               let n = this._parentMarkedDirty(e.onlySelf);
               (this.status = G),
                    this._forEachChild((i) => {
                         i.enable(D(y({}, e), { onlySelf: !0 }));
                    }),
                    this.updateValueAndValidity({ onlySelf: !0, emitEvent: e.emitEvent }),
                    this._updateAncestors(D(y({}, e), { skipPristineCheck: n })),
                    this._onDisabledChange.forEach((i) => i(!1));
          }
          _updateAncestors(e) {
               this._parent &&
                    !e.onlySelf &&
                    (this._parent.updateValueAndValidity(e),
                    e.skipPristineCheck || this._parent._updatePristine(),
                    this._parent._updateTouched());
          }
          setParent(e) {
               this._parent = e;
          }
          getRawValue() {
               return this.value;
          }
          updateValueAndValidity(e = {}) {
               this._setInitialStatus(),
                    this._updateValue(),
                    this.enabled &&
                         (this._cancelExistingSubscription(),
                         (this.errors = this._runValidator()),
                         (this.status = this._calculateStatus()),
                         (this.status === G || this.status === x) && this._runAsyncValidator(e.emitEvent)),
                    e.emitEvent !== !1 && (this.valueChanges.emit(this.value), this.statusChanges.emit(this.status)),
                    this._parent && !e.onlySelf && this._parent.updateValueAndValidity(e);
          }
          _updateTreeValidity(e = { emitEvent: !0 }) {
               this._forEachChild((n) => n._updateTreeValidity(e)),
                    this.updateValueAndValidity({ onlySelf: !0, emitEvent: e.emitEvent });
          }
          _setInitialStatus() {
               this.status = this._allControlsDisabled() ? U : G;
          }
          _runValidator() {
               return this.validator ? this.validator(this) : null;
          }
          _runAsyncValidator(e) {
               if (this.asyncValidator) {
                    (this.status = x), (this._hasOwnPendingAsyncValidator = !0);
                    let n = st(this.asyncValidator(this));
                    this._asyncValidationSubscription = n.subscribe((i) => {
                         (this._hasOwnPendingAsyncValidator = !1), this.setErrors(i, { emitEvent: e });
                    });
               }
          }
          _cancelExistingSubscription() {
               this._asyncValidationSubscription &&
                    (this._asyncValidationSubscription.unsubscribe(), (this._hasOwnPendingAsyncValidator = !1));
          }
          setErrors(e, n = {}) {
               (this.errors = e), this._updateControlsErrors(n.emitEvent !== !1);
          }
          get(e) {
               let n = e;
               return n == null || (Array.isArray(n) || (n = n.split('.')), n.length === 0)
                    ? null
                    : n.reduce((i, r) => i && i._find(r), this);
          }
          getError(e, n) {
               let i = n ? this.get(n) : this;
               return i && i.errors ? i.errors[e] : null;
          }
          hasError(e, n) {
               return !!this.getError(e, n);
          }
          get root() {
               let e = this;
               for (; e._parent; ) e = e._parent;
               return e;
          }
          _updateControlsErrors(e) {
               (this.status = this._calculateStatus()),
                    e && this.statusChanges.emit(this.status),
                    this._parent && this._parent._updateControlsErrors(e);
          }
          _initObservables() {
               (this.valueChanges = new j()), (this.statusChanges = new j());
          }
          _calculateStatus() {
               return this._allControlsDisabled()
                    ? U
                    : this.errors
                    ? z
                    : this._hasOwnPendingAsyncValidator || this._anyControlsHaveStatus(x)
                    ? x
                    : this._anyControlsHaveStatus(z)
                    ? z
                    : G;
          }
          _anyControlsHaveStatus(e) {
               return this._anyControls((n) => n.status === e);
          }
          _anyControlsDirty() {
               return this._anyControls((e) => e.dirty);
          }
          _anyControlsTouched() {
               return this._anyControls((e) => e.touched);
          }
          _updatePristine(e = {}) {
               (this.pristine = !this._anyControlsDirty()),
                    this._parent && !e.onlySelf && this._parent._updatePristine(e);
          }
          _updateTouched(e = {}) {
               (this.touched = this._anyControlsTouched()),
                    this._parent && !e.onlySelf && this._parent._updateTouched(e);
          }
          _registerOnCollectionChange(e) {
               this._onCollectionChange = e;
          }
          _setUpdateStrategy(e) {
               ie(e) && e.updateOn != null && (this._updateOn = e.updateOn);
          }
          _parentMarkedDirty(e) {
               let n = this._parent && this._parent.dirty;
               return !e && !!n && !this._parent._anyControlsDirty();
          }
          _find(e) {
               return null;
          }
          _assignValidators(e) {
               (this._rawValidators = Array.isArray(e) ? e.slice() : e),
                    (this._composedValidatorFn = Wt(this._rawValidators));
          }
          _assignAsyncValidators(e) {
               (this._rawAsyncValidators = Array.isArray(e) ? e.slice() : e),
                    (this._composedAsyncValidatorFn = qt(this._rawAsyncValidators));
          }
     },
     K = class extends S {
          constructor(e, n, i) {
               super(Ce(n), Ve(i, n)),
                    (this.controls = e),
                    this._initObservables(),
                    this._setUpdateStrategy(n),
                    this._setUpControls(),
                    this.updateValueAndValidity({ onlySelf: !0, emitEvent: !!this.asyncValidator });
          }
          registerControl(e, n) {
               return this.controls[e]
                    ? this.controls[e]
                    : ((this.controls[e] = n),
                      n.setParent(this),
                      n._registerOnCollectionChange(this._onCollectionChange),
                      n);
          }
          addControl(e, n, i = {}) {
               this.registerControl(e, n),
                    this.updateValueAndValidity({ emitEvent: i.emitEvent }),
                    this._onCollectionChange();
          }
          removeControl(e, n = {}) {
               this.controls[e] && this.controls[e]._registerOnCollectionChange(() => {}),
                    delete this.controls[e],
                    this.updateValueAndValidity({ emitEvent: n.emitEvent }),
                    this._onCollectionChange();
          }
          setControl(e, n, i = {}) {
               this.controls[e] && this.controls[e]._registerOnCollectionChange(() => {}),
                    delete this.controls[e],
                    n && this.registerControl(e, n),
                    this.updateValueAndValidity({ emitEvent: i.emitEvent }),
                    this._onCollectionChange();
          }
          contains(e) {
               return this.controls.hasOwnProperty(e) && this.controls[e].enabled;
          }
          setValue(e, n = {}) {
               _t(this, !0, e),
                    Object.keys(e).forEach((i) => {
                         yt(this, !0, i), this.controls[i].setValue(e[i], { onlySelf: !0, emitEvent: n.emitEvent });
                    }),
                    this.updateValueAndValidity(n);
          }
          patchValue(e, n = {}) {
               e != null &&
                    (Object.keys(e).forEach((i) => {
                         let r = this.controls[i];
                         r && r.patchValue(e[i], { onlySelf: !0, emitEvent: n.emitEvent });
                    }),
                    this.updateValueAndValidity(n));
          }
          reset(e = {}, n = {}) {
               this._forEachChild((i, r) => {
                    i.reset(e ? e[r] : null, { onlySelf: !0, emitEvent: n.emitEvent });
               }),
                    this._updatePristine(n),
                    this._updateTouched(n),
                    this.updateValueAndValidity(n);
          }
          getRawValue() {
               return this._reduceChildren({}, (e, n, i) => ((e[i] = n.getRawValue()), e));
          }
          _syncPendingControls() {
               let e = this._reduceChildren(!1, (n, i) => (i._syncPendingControls() ? !0 : n));
               return e && this.updateValueAndValidity({ onlySelf: !0 }), e;
          }
          _forEachChild(e) {
               Object.keys(this.controls).forEach((n) => {
                    let i = this.controls[n];
                    i && e(i, n);
               });
          }
          _setUpControls() {
               this._forEachChild((e) => {
                    e.setParent(this), e._registerOnCollectionChange(this._onCollectionChange);
               });
          }
          _updateValue() {
               this.value = this._reduceValue();
          }
          _anyControls(e) {
               for (let [n, i] of Object.entries(this.controls)) if (this.contains(n) && e(i)) return !0;
               return !1;
          }
          _reduceValue() {
               let e = {};
               return this._reduceChildren(e, (n, i, r) => ((i.enabled || this.disabled) && (n[r] = i.value), n));
          }
          _reduceChildren(e, n) {
               let i = e;
               return (
                    this._forEachChild((r, o) => {
                         i = n(i, r, o);
                    }),
                    i
               );
          }
          _allControlsDisabled() {
               for (let e of Object.keys(this.controls)) if (this.controls[e].enabled) return !1;
               return Object.keys(this.controls).length > 0 || this.disabled;
          }
          _find(e) {
               return this.controls.hasOwnProperty(e) ? this.controls[e] : null;
          }
     };
var me = class extends K {};
var ne = new A('CallSetDisabledState', { providedIn: 'root', factory: () => re }),
     re = 'always';
function ge(t, e, n = re) {
     be(t, e),
          e.valueAccessor.writeValue(t.value),
          (t.disabled || n === 'always') && e.valueAccessor.setDisabledState?.(t.disabled),
          Zt(t, e),
          Yt(t, e),
          Xt(t, e),
          zt(t, e);
}
function J(t, e, n = !0) {
     let i = () => {};
     e.valueAccessor && (e.valueAccessor.registerOnChange(i), e.valueAccessor.registerOnTouched(i)),
          ee(t, e),
          t && (e._invokeOnDestroyCallbacks(), t._registerOnCollectionChange(() => {}));
}
function Q(t, e) {
     t.forEach((n) => {
          n.registerOnValidatorChange && n.registerOnValidatorChange(e);
     });
}
function zt(t, e) {
     if (e.valueAccessor.setDisabledState) {
          let n = (i) => {
               e.valueAccessor.setDisabledState(i);
          };
          t.registerOnDisabledChange(n),
               e._registerOnDestroy(() => {
                    t._unregisterOnDisabledChange(n);
               });
     }
}
function be(t, e) {
     let n = pt(t);
     e.validator !== null ? t.setValidators(ze(n, e.validator)) : typeof n == 'function' && t.setValidators([n]);
     let i = mt(t);
     e.asyncValidator !== null
          ? t.setAsyncValidators(ze(i, e.asyncValidator))
          : typeof i == 'function' && t.setAsyncValidators([i]);
     let r = () => t.updateValueAndValidity();
     Q(e._rawValidators, r), Q(e._rawAsyncValidators, r);
}
function ee(t, e) {
     let n = !1;
     if (t !== null) {
          if (e.validator !== null) {
               let r = pt(t);
               if (Array.isArray(r) && r.length > 0) {
                    let o = r.filter((a) => a !== e.validator);
                    o.length !== r.length && ((n = !0), t.setValidators(o));
               }
          }
          if (e.asyncValidator !== null) {
               let r = mt(t);
               if (Array.isArray(r) && r.length > 0) {
                    let o = r.filter((a) => a !== e.asyncValidator);
                    o.length !== r.length && ((n = !0), t.setAsyncValidators(o));
               }
          }
     }
     let i = () => {};
     return Q(e._rawValidators, i), Q(e._rawAsyncValidators, i), n;
}
function Zt(t, e) {
     e.valueAccessor.registerOnChange((n) => {
          (t._pendingValue = n), (t._pendingChange = !0), (t._pendingDirty = !0), t.updateOn === 'change' && Ct(t, e);
     });
}
function Xt(t, e) {
     e.valueAccessor.registerOnTouched(() => {
          (t._pendingTouched = !0),
               t.updateOn === 'blur' && t._pendingChange && Ct(t, e),
               t.updateOn !== 'submit' && t.markAsTouched();
     });
}
function Ct(t, e) {
     t._pendingDirty && t.markAsDirty(),
          t.setValue(t._pendingValue, { emitModelToViewChange: !1 }),
          e.viewToModelUpdate(t._pendingValue),
          (t._pendingChange = !1);
}
function Yt(t, e) {
     let n = (i, r) => {
          e.valueAccessor.writeValue(i), r && e.viewToModelUpdate(i);
     };
     t.registerOnChange(n),
          e._registerOnDestroy(() => {
               t._unregisterOnChange(n);
          });
}
function Kt(t, e) {
     t == null, be(t, e);
}
function Jt(t, e) {
     return ee(t, e);
}
function Qt(t, e) {
     if (!t.hasOwnProperty('model')) return !1;
     let n = t.model;
     return n.isFirstChange() ? !0 : !Object.is(e, n.currentValue);
}
function ei(t) {
     return Object.getPrototypeOf(t.constructor) === et;
}
function ti(t, e) {
     t._syncPendingControls(),
          e.forEach((n) => {
               let i = n.control;
               i.updateOn === 'submit' &&
                    i._pendingChange &&
                    (n.viewToModelUpdate(i._pendingValue), (i._pendingChange = !1));
          });
}
function ii(t, e) {
     if (!e) return null;
     Array.isArray(e);
     let n, i, r;
     return (
          e.forEach((o) => {
               o.constructor === te ? (n = o) : ei(o) ? (i = o) : (r = o);
          }),
          r || i || n || null
     );
}
function ni(t, e) {
     let n = t.indexOf(e);
     n > -1 && t.splice(n, 1);
}
function Ye(t, e) {
     let n = t.indexOf(e);
     n > -1 && t.splice(n, 1);
}
function Ke(t) {
     return typeof t == 'object' && t !== null && Object.keys(t).length === 2 && 'value' in t && 'disabled' in t;
}
var v = class extends S {
     constructor(e = null, n, i) {
          super(Ce(n), Ve(i, n)),
               (this.defaultValue = null),
               (this._onChange = []),
               (this._pendingChange = !1),
               this._applyFormState(e),
               this._setUpdateStrategy(n),
               this._initObservables(),
               this.updateValueAndValidity({ onlySelf: !0, emitEvent: !!this.asyncValidator }),
               ie(n) &&
                    (n.nonNullable || n.initialValueIsDefault) &&
                    (Ke(e) ? (this.defaultValue = e.value) : (this.defaultValue = e));
     }
     setValue(e, n = {}) {
          (this.value = this._pendingValue = e),
               this._onChange.length &&
                    n.emitModelToViewChange !== !1 &&
                    this._onChange.forEach((i) => i(this.value, n.emitViewToModelChange !== !1)),
               this.updateValueAndValidity(n);
     }
     patchValue(e, n = {}) {
          this.setValue(e, n);
     }
     reset(e = this.defaultValue, n = {}) {
          this._applyFormState(e),
               this.markAsPristine(n),
               this.markAsUntouched(n),
               this.setValue(this.value, n),
               (this._pendingChange = !1);
     }
     _updateValue() {}
     _anyControls(e) {
          return !1;
     }
     _allControlsDisabled() {
          return this.disabled;
     }
     registerOnChange(e) {
          this._onChange.push(e);
     }
     _unregisterOnChange(e) {
          Ye(this._onChange, e);
     }
     registerOnDisabledChange(e) {
          this._onDisabledChange.push(e);
     }
     _unregisterOnDisabledChange(e) {
          Ye(this._onDisabledChange, e);
     }
     _forEachChild(e) {}
     _syncPendingControls() {
          return this.updateOn === 'submit' &&
               (this._pendingDirty && this.markAsDirty(),
               this._pendingTouched && this.markAsTouched(),
               this._pendingChange)
               ? (this.setValue(this._pendingValue, { onlySelf: !0, emitModelToViewChange: !1 }), !0)
               : !1;
     }
     _applyFormState(e) {
          Ke(e)
               ? ((this.value = this._pendingValue = e.value),
                 e.disabled
                      ? this.disable({ onlySelf: !0, emitEvent: !1 })
                      : this.enable({ onlySelf: !0, emitEvent: !1 }))
               : (this.value = this._pendingValue = e);
     }
};
var ri = (t) => t instanceof v;
var Vt = (() => {
     let e = class e {};
     (e.ɵfac = function (r) {
          return new (r || e)();
     }),
          (e.ɵdir = g({
               type: e,
               selectors: [['form', 3, 'ngNoForm', '', 3, 'ngNativeValidate', '']],
               hostAttrs: ['novalidate', ''],
          }));
     let t = e;
     return t;
})();
var oi = (() => {
     let e = class e {};
     (e.ɵfac = function (r) {
          return new (r || e)();
     }),
          (e.ɵmod = P({ type: e })),
          (e.ɵinj = O({}));
     let t = e;
     return t;
})();
var bt = new A('NgModelWithFormControlWarning'),
     si = { provide: B, useExisting: I(() => De) },
     De = (() => {
          let e = class e extends B {
               set isDisabled(i) {}
               constructor(i, r, o, a, f) {
                    super(),
                         (this._ngModelWarningConfig = a),
                         (this.callSetDisabledState = f),
                         (this.update = new j()),
                         (this._ngModelWarningSent = !1),
                         this._setValidators(i),
                         this._setAsyncValidators(r),
                         (this.valueAccessor = ii(this, o));
               }
               ngOnChanges(i) {
                    if (this._isControlChanged(i)) {
                         let r = i.form.previousValue;
                         r && J(r, this, !1),
                              ge(this.form, this, this.callSetDisabledState),
                              this.form.updateValueAndValidity({ emitEvent: !1 });
                    }
                    Qt(i, this.viewModel) && (this.form.setValue(this.model), (this.viewModel = this.model));
               }
               ngOnDestroy() {
                    this.form && J(this.form, this, !1);
               }
               get path() {
                    return [];
               }
               get control() {
                    return this.form;
               }
               viewToModelUpdate(i) {
                    (this.viewModel = i), this.update.emit(i);
               }
               _isControlChanged(i) {
                    return i.hasOwnProperty('form');
               }
          };
          (e._ngModelWarningSentOnce = !1),
               (e.ɵfac = function (r) {
                    return new (r || e)(c(it, 10), c(nt, 10), c(ye, 10), c(bt, 8), c(ne, 8));
               }),
               (e.ɵdir = g({
                    type: e,
                    selectors: [['', 'formControl', '']],
                    inputs: {
                         form: ['formControl', 'form'],
                         isDisabled: ['disabled', 'isDisabled'],
                         model: ['ngModel', 'model'],
                    },
                    outputs: { update: 'ngModelChange' },
                    exportAs: ['ngForm'],
                    features: [M([si]), _, oe],
               }));
          let t = e;
          return t;
     })(),
     ai = { provide: R, useExisting: I(() => Ae) },
     Ae = (() => {
          let e = class e extends R {
               constructor(i, r, o) {
                    super(),
                         (this.callSetDisabledState = o),
                         (this.submitted = !1),
                         (this._onCollectionChange = () => this._updateDomValue()),
                         (this.directives = []),
                         (this.form = null),
                         (this.ngSubmit = new j()),
                         this._setValidators(i),
                         this._setAsyncValidators(r);
               }
               ngOnChanges(i) {
                    this._checkFormPresent(),
                         i.hasOwnProperty('form') &&
                              (this._updateValidators(),
                              this._updateDomValue(),
                              this._updateRegistrations(),
                              (this._oldForm = this.form));
               }
               ngOnDestroy() {
                    this.form &&
                         (ee(this.form, this),
                         this.form._onCollectionChange === this._onCollectionChange &&
                              this.form._registerOnCollectionChange(() => {}));
               }
               get formDirective() {
                    return this;
               }
               get control() {
                    return this.form;
               }
               get path() {
                    return [];
               }
               addControl(i) {
                    let r = this.form.get(i.path);
                    return (
                         ge(r, i, this.callSetDisabledState),
                         r.updateValueAndValidity({ emitEvent: !1 }),
                         this.directives.push(i),
                         r
                    );
               }
               getControl(i) {
                    return this.form.get(i.path);
               }
               removeControl(i) {
                    J(i.control || null, i, !1), ni(this.directives, i);
               }
               addFormGroup(i) {
                    this._setUpFormContainer(i);
               }
               removeFormGroup(i) {
                    this._cleanUpFormContainer(i);
               }
               getFormGroup(i) {
                    return this.form.get(i.path);
               }
               addFormArray(i) {
                    this._setUpFormContainer(i);
               }
               removeFormArray(i) {
                    this._cleanUpFormContainer(i);
               }
               getFormArray(i) {
                    return this.form.get(i.path);
               }
               updateModel(i, r) {
                    this.form.get(i.path).setValue(r);
               }
               onSubmit(i) {
                    return (
                         (this.submitted = !0),
                         ti(this.form, this.directives),
                         this.ngSubmit.emit(i),
                         i?.target?.method === 'dialog'
                    );
               }
               onReset() {
                    this.resetForm();
               }
               resetForm(i = void 0) {
                    this.form.reset(i), (this.submitted = !1);
               }
               _updateDomValue() {
                    this.directives.forEach((i) => {
                         let r = i.control,
                              o = this.form.get(i.path);
                         r !== o && (J(r || null, i), ri(o) && (ge(o, i, this.callSetDisabledState), (i.control = o)));
                    }),
                         this.form._updateTreeValidity({ emitEvent: !1 });
               }
               _setUpFormContainer(i) {
                    let r = this.form.get(i.path);
                    Kt(r, i), r.updateValueAndValidity({ emitEvent: !1 });
               }
               _cleanUpFormContainer(i) {
                    if (this.form) {
                         let r = this.form.get(i.path);
                         r && Jt(r, i) && r.updateValueAndValidity({ emitEvent: !1 });
                    }
               }
               _updateRegistrations() {
                    this.form._registerOnCollectionChange(this._onCollectionChange),
                         this._oldForm && this._oldForm._registerOnCollectionChange(() => {});
               }
               _updateValidators() {
                    be(this.form, this), this._oldForm && ee(this._oldForm, this);
               }
               _checkFormPresent() {
                    this.form;
               }
          };
          (e.ɵfac = function (r) {
               return new (r || e)(c(it, 10), c(nt, 10), c(ne, 8));
          }),
               (e.ɵdir = g({
                    type: e,
                    selectors: [['', 'formGroup', '']],
                    hostBindings: function (r, o) {
                         r & 1 &&
                              F('submit', function (f) {
                                   return o.onSubmit(f);
                              })('reset', function () {
                                   return o.onReset();
                              });
                    },
                    inputs: { form: ['formGroup', 'form'] },
                    outputs: { ngSubmit: 'ngSubmit' },
                    exportAs: ['ngForm'],
                    features: [M([ai]), _, oe],
               }));
          let t = e;
          return t;
     })();
var Dt = (() => {
          let e = class e {};
          (e.ɵfac = function (r) {
               return new (r || e)();
          }),
               (e.ɵmod = P({ type: e })),
               (e.ɵinj = O({ imports: [oi] }));
          let t = e;
          return t;
     })(),
     ve = class extends S {
          constructor(e, n, i) {
               super(Ce(n), Ve(i, n)),
                    (this.controls = e),
                    this._initObservables(),
                    this._setUpdateStrategy(n),
                    this._setUpControls(),
                    this.updateValueAndValidity({ onlySelf: !0, emitEvent: !!this.asyncValidator });
          }
          at(e) {
               return this.controls[this._adjustIndex(e)];
          }
          push(e, n = {}) {
               this.controls.push(e),
                    this._registerControl(e),
                    this.updateValueAndValidity({ emitEvent: n.emitEvent }),
                    this._onCollectionChange();
          }
          insert(e, n, i = {}) {
               this.controls.splice(e, 0, n),
                    this._registerControl(n),
                    this.updateValueAndValidity({ emitEvent: i.emitEvent });
          }
          removeAt(e, n = {}) {
               let i = this._adjustIndex(e);
               i < 0 && (i = 0),
                    this.controls[i] && this.controls[i]._registerOnCollectionChange(() => {}),
                    this.controls.splice(i, 1),
                    this.updateValueAndValidity({ emitEvent: n.emitEvent });
          }
          setControl(e, n, i = {}) {
               let r = this._adjustIndex(e);
               r < 0 && (r = 0),
                    this.controls[r] && this.controls[r]._registerOnCollectionChange(() => {}),
                    this.controls.splice(r, 1),
                    n && (this.controls.splice(r, 0, n), this._registerControl(n)),
                    this.updateValueAndValidity({ emitEvent: i.emitEvent }),
                    this._onCollectionChange();
          }
          get length() {
               return this.controls.length;
          }
          setValue(e, n = {}) {
               _t(this, !1, e),
                    e.forEach((i, r) => {
                         yt(this, !1, r), this.at(r).setValue(i, { onlySelf: !0, emitEvent: n.emitEvent });
                    }),
                    this.updateValueAndValidity(n);
          }
          patchValue(e, n = {}) {
               e != null &&
                    (e.forEach((i, r) => {
                         this.at(r) && this.at(r).patchValue(i, { onlySelf: !0, emitEvent: n.emitEvent });
                    }),
                    this.updateValueAndValidity(n));
          }
          reset(e = [], n = {}) {
               this._forEachChild((i, r) => {
                    i.reset(e[r], { onlySelf: !0, emitEvent: n.emitEvent });
               }),
                    this._updatePristine(n),
                    this._updateTouched(n),
                    this.updateValueAndValidity(n);
          }
          getRawValue() {
               return this.controls.map((e) => e.getRawValue());
          }
          clear(e = {}) {
               this.controls.length < 1 ||
                    (this._forEachChild((n) => n._registerOnCollectionChange(() => {})),
                    this.controls.splice(0),
                    this.updateValueAndValidity({ emitEvent: e.emitEvent }));
          }
          _adjustIndex(e) {
               return e < 0 ? e + this.length : e;
          }
          _syncPendingControls() {
               let e = this.controls.reduce((n, i) => (i._syncPendingControls() ? !0 : n), !1);
               return e && this.updateValueAndValidity({ onlySelf: !0 }), e;
          }
          _forEachChild(e) {
               this.controls.forEach((n, i) => {
                    e(n, i);
               });
          }
          _updateValue() {
               this.value = this.controls.filter((e) => e.enabled || this.disabled).map((e) => e.value);
          }
          _anyControls(e) {
               return this.controls.some((n) => n.enabled && e(n));
          }
          _setUpControls() {
               this._forEachChild((e) => this._registerControl(e));
          }
          _allControlsDisabled() {
               for (let e of this.controls) if (e.enabled) return !1;
               return this.controls.length > 0 || this.disabled;
          }
          _registerControl(e) {
               e.setParent(this), e._registerOnCollectionChange(this._onCollectionChange);
          }
          _find(e) {
               return this.at(e) ?? null;
          }
     };
function Je(t) {
     return !!t && (t.asyncValidators !== void 0 || t.validators !== void 0 || t.updateOn !== void 0);
}
var li = (() => {
          let e = class e {
               constructor() {
                    this.useNonNullable = !1;
               }
               get nonNullable() {
                    let i = new e();
                    return (i.useNonNullable = !0), i;
               }
               group(i, r = null) {
                    let o = this._reduceControls(i),
                         a = {};
                    return (
                         Je(r)
                              ? (a = r)
                              : r !== null && ((a.validators = r.validator), (a.asyncValidators = r.asyncValidator)),
                         new K(o, a)
                    );
               }
               record(i, r = null) {
                    let o = this._reduceControls(i);
                    return new me(o, r);
               }
               control(i, r, o) {
                    let a = {};
                    return this.useNonNullable
                         ? (Je(r) ? (a = r) : ((a.validators = r), (a.asyncValidators = o)),
                           new v(i, D(y({}, a), { nonNullable: !0 })))
                         : new v(i, r, o);
               }
               array(i, r, o) {
                    let a = i.map((f) => this._createControl(f));
                    return new ve(a, r, o);
               }
               _reduceControls(i) {
                    let r = {};
                    return (
                         Object.keys(i).forEach((o) => {
                              r[o] = this._createControl(i[o]);
                         }),
                         r
                    );
               }
               _createControl(i) {
                    if (i instanceof v) return i;
                    if (i instanceof S) return i;
                    if (Array.isArray(i)) {
                         let r = i[0],
                              o = i.length > 1 ? i[1] : null,
                              a = i.length > 2 ? i[2] : null;
                         return this.control(r, o, a);
                    } else return this.control(i);
               }
          };
          (e.ɵfac = function (r) {
               return new (r || e)();
          }),
               (e.ɵprov = N({ token: e, factory: e.ɵfac, providedIn: 'root' }));
          let t = e;
          return t;
     })(),
     At = (() => {
          let e = class e {};
          (e.ɵfac = function (r) {
               return new (r || e)();
          }),
               (e.ɵprov = N({ token: e, factory: () => (() => m(li).nonNullable)(), providedIn: 'root' }));
          let t = e;
          return t;
     })();
var wt = (() => {
          let e = class e {
               static withConfig(i) {
                    return { ngModule: e, providers: [{ provide: ne, useValue: i.callSetDisabledState ?? re }] };
               }
          };
          (e.ɵfac = function (r) {
               return new (r || e)();
          }),
               (e.ɵmod = P({ type: e })),
               (e.ɵinj = O({ imports: [Dt] }));
          let t = e;
          return t;
     })(),
     Et = (() => {
          let e = class e {
               static withConfig(i) {
                    return {
                         ngModule: e,
                         providers: [
                              { provide: bt, useValue: i.warnOnNgModelWithFormControl ?? 'always' },
                              { provide: ne, useValue: i.callSetDisabledState ?? re },
                         ],
                    };
               }
          };
          (e.ɵfac = function (r) {
               return new (r || e)();
          }),
               (e.ɵmod = P({ type: e })),
               (e.ɵinj = O({ imports: [Dt] }));
          let t = e;
          return t;
     })();
function di(t, e) {
     t & 1 && u(0, ' Email is Required ');
}
function ci(t, e) {
     t & 1 && u(0, ' Please Enter a valid email ');
}
function hi(t, e) {
     if ((t & 1 && (l(0, 'span', 40), w(1, di, 1, 0)(2, ci, 1, 0), s()), t & 2)) {
          let n = ce();
          d(1),
               E(
                    1,
                    n.f.email.errors != null && n.f.email.errors.required
                         ? 1
                         : n.f.email.errors != null && n.f.email.errors.email
                         ? 2
                         : -1
               );
     }
}
function fi(t, e) {
     t & 1 && u(0, ' Password is Required ');
}
function pi(t, e) {
     t & 1 && u(0, ' Password has to be at least 8 characters and contains upper and lower case ');
}
function mi(t, e) {
     t & 1 && u(0, " Password shouldn't contain first or last name ");
}
function gi(t, e) {
     if ((t & 1 && (l(0, 'span', 41), w(1, fi, 1, 0)(2, pi, 1, 0)(3, mi, 1, 0), s()), t & 2)) {
          let n = ce();
          d(1),
               E(
                    1,
                    n.f.password.errors != null && n.f.password.errors.required
                         ? 1
                         : n.submitted &&
                           ((n.f.password.errors != null && n.f.password.errors.pattern) ||
                                (n.f.password.errors != null && n.f.password.errors.minlength))
                         ? 2
                         : n.submitted && n.f.password.errors != null && n.f.password.errors.containsFirstOrLastName
                         ? 3
                         : -1
               );
     }
}
function vi(t, e) {
     t & 1 && (l(0, 'span', 42), u(1, ' Required '), s());
}
function yi(t, e) {
     t & 1 && (l(0, 'span', 43), u(1, ' Required '), s());
}
var _i = (t) => ({ 'ring-offset-2 ring- ring-opacity-50 ring ring-red-400 ': t }),
     Mt = [p.required, Le(['password'], {})],
     Ci = [
          p.required,
          p.minLength(8),
          p.pattern(new RegExp('(?=.*[A-Z])')),
          p.pattern(new RegExp('(?=.*[a-z])')),
          He(['firstName', 'lastName'], { containsFirstOrLastName: !0 }),
     ],
     Ft = (() => {
          let e = class e {
               constructor() {
                    (this.fedexAuthApiService = m(q)),
                         (this.baseHref = m(T)),
                         (this.formBuilder = m(At)),
                         (this.signUpForm = this.createSignUpForm()),
                         (this.submitted = !1),
                         (this.isLoading = Se(!1)),
                         (this.destroy$ = $e());
               }
               createSignUpForm() {
                    return this.formBuilder.group({
                         firstName: new v('', { validators: [...Mt], nonNullable: !0 }),
                         lastName: new v('', { validators: [...Mt], nonNullable: !0 }),
                         email: new v('', { validators: [p.required, p.email], nonNullable: !0 }),
                         password: new v('', { validators: [...Ci], nonNullable: !0 }),
                         termsAndConditions: new v(!1, { validators: [p.requiredTrue], nonNullable: !0 }),
                    });
               }
               submitForm() {
                    this.signUpForm.controls.password.updateValueAndValidity(),
                         (this.submitted = !0),
                         this.signUpForm.valid &&
                              (this.isLoading.set(!0),
                              this.fedexAuthApiService
                                   .signup({
                                        firstName: this.signUpForm.value.firstName,
                                        lastName: this.signUpForm.value.lastName,
                                        email: this.signUpForm.value.email,
                                   })
                                   .pipe(xe(this.destroy$))
                                   .subscribe({
                                        next: (i) => console.debug(i),
                                        error: (i) => console.log(i),
                                        complete: () => this.isLoading.set(!1),
                                   }));
               }
               get f() {
                    return this.signUpForm.controls;
               }
          };
          (e.ɵfac = function (r) {
               return new (r || e)();
          }),
               (e.ɵcmp = L({
                    type: e,
                    selectors: [['operations-fedex-signup']],
                    standalone: !0,
                    features: [$],
                    decls: 66,
                    vars: 18,
                    consts: [
                         [1, 'mt-6'],
                         [1, 'text-3xl', 'font-bold', 'leading-loose'],
                         [1, 'text-purple-900', 'font-extrabold'],
                         [1, 'text-orange-600', 'font-extrabold'],
                         [1, 'text-base', 'text-gray-500'],
                         [3, 'formGroup', 'ngSubmit'],
                         [1, 'my-4'],
                         [1, 'mt-4'],
                         [1, 'flex', 'justify-between', 'space-x-7'],
                         ['for', 'email'],
                         ['class', 'text-red-500', 'test-id', 'fedex-auth-signup-email-input-notValid'],
                         [
                              1,
                              'flex',
                              'items-center',
                              'mt-2',
                              'w-full',
                              'rounded-lg',
                              'border',
                              'border-gray-400',
                              'transition-all',
                              'duration-300',
                              'focus-within:shadow-xl',
                              'focus-within:border-purple-500',
                         ],
                         [1, 'pl-4', 'flex', 'justify-center', 'items-center'],
                         ['alt', 'email', 1, 'w-6', 'h-6', 'pointer-events-none', 3, 'src'],
                         [
                              'type',
                              'text',
                              'test-id',
                              'fedex-auth-signup-email-input',
                              'name',
                              'email',
                              'id',
                              'email',
                              'placeholder',
                              'Enter your email address',
                              1,
                              'px-4',
                              'py-4',
                              'w-full',
                              'bg-transparent',
                              'placeholder-gray-500',
                              'leading-3',
                              'focus:outline-none',
                              'font-light',
                              'border-0',
                              'focus:ring-0',
                              3,
                              'formControl',
                         ],
                         [1, 'flex', 'justify-between', 'space-x-8'],
                         ['for', 'password'],
                         ['class', 'text-red-500 text-right', 'test-id', 'fedex-auth-signup-password-input-notValid'],
                         ['alt', 'password', 1, 'w-6', 'h-6', 'pointer-events-none', 3, 'src'],
                         [
                              'type',
                              'password',
                              'test-id',
                              'fedex-auth-signup-password-input',
                              'name',
                              'password',
                              'id',
                              'password',
                              'placeholder',
                              'Enter your password',
                              1,
                              'px-4',
                              'py-4',
                              'w-full',
                              'bg-transparent',
                              'placeholder-gray-500',
                              'leading-3',
                              'focus:outline-none',
                              'font-light',
                              'border-0',
                              'focus:ring-0',
                              3,
                              'formControl',
                         ],
                         [1, 'my-6'],
                         [1, 'flex', 'justify-between', 'items-center'],
                         [1, 'w-full', 'border-gray-400'],
                         [1, 'px-4', 'font-light', 'tracking-wider', 'text-sm', 'text-gray-500', 'whitespace-nowrap'],
                         [
                              1,
                              'flex',
                              'max-md:flex-col',
                              'max-md:space-y-4',
                              'max-md:space-x-0',
                              'space-x-8',
                              'mt-4',
                              'justify-between',
                              'items-stretch',
                         ],
                         ['for', 'firstName'],
                         ['class', 'text-red-500 text-right', 'test-id', 'fedex-auth-signup-firstName-input-required'],
                         [
                              1,
                              'flex',
                              'items-center',
                              'mt-2',
                              'w-full',
                              'rounded-lg',
                              'border',
                              'border-gray-400',
                              'transition-all',
                              'duration-300',
                              'focus-within:shadow-xl',
                              'focus-within:border-purple-300',
                         ],
                         ['alt', 'user', 1, 'w-6', 'h-6', 'pointer-events-none', 3, 'src'],
                         [
                              'type',
                              'firstName',
                              'value',
                              'test',
                              'test-id',
                              'fedex-auth-signup-firstName-input',
                              'name',
                              'firstName',
                              'id',
                              'firstName',
                              'placeholder',
                              'Enter your name',
                              1,
                              'px-4',
                              'py-4',
                              'w-full',
                              'bg-transparent',
                              'placeholder:text-sm',
                              'placeholder-gray-500',
                              'leading-3',
                              'focus:outline-none',
                              'font-light',
                              'border-0',
                              'focus:ring-0',
                              3,
                              'formControl',
                         ],
                         ['for', 'lastName'],
                         ['class', 'text-red-500 text-right', 'test-id', 'fedex-auth-signup-lastName-input-required'],
                         [
                              'type',
                              'lastName',
                              'test-id',
                              'fedex-auth-signup-lastName-input',
                              'name',
                              'lastName',
                              'id',
                              'lastName',
                              'placeholder',
                              'Enter your name',
                              1,
                              'px-4',
                              'py-4',
                              'w-full',
                              'bg-transparent',
                              'placeholder:text-sm',
                              'placeholder-gray-500',
                              'leading-3',
                              'focus:outline-none',
                              'font-light',
                              'border-0',
                              'focus:ring-0',
                              3,
                              'formControl',
                         ],
                         [1, 'flex', 'flex-col', 'my-4'],
                         [1, 'text-red-500'],
                         [1, 'flex', 'items-center'],
                         [
                              'type',
                              'checkbox',
                              'test-id',
                              'fedex-auth-signup-termsAndConditions-input',
                              'name',
                              'termsAndConditions',
                              'id',
                              'termsAndConditions',
                              1,
                              'w-5',
                              'h-5',
                              'rounded',
                              'bg-white',
                              'text-purple-500',
                              'border',
                              'border-gray-400',
                              'focus:outline-none',
                              'focus:ring-purple-300',
                              3,
                              'formControl',
                              'ngClass',
                         ],
                         ['for', 'termsAndConditions', 1, 'pl-4', 'text-sm', 'font-light', 'text-gray-900'],
                         ['href', '#', 1, 'text-sm', 'text-orange-600', 'hover:text-orange-300'],
                         [
                              'type',
                              'submit',
                              'test-id',
                              'fedex-auth-signup-submit-button',
                              1,
                              'py-4',
                              'px-8',
                              'w-full',
                              'text-white',
                              'bg-orange-500',
                              'rounded-lg',
                              'shadow-lg',
                              'disabled:opacity-50',
                              'opacity-90',
                              'hover:opacity-100',
                              'focus:ring-8',
                              'focus:ring-red-100',
                              'focus:outline-none',
                              3,
                              'disabled',
                         ],
                         ['test-id', 'fedex-auth-signup-email-input-notValid', 1, 'text-red-500'],
                         ['test-id', 'fedex-auth-signup-password-input-notValid', 1, 'text-red-500', 'text-right'],
                         ['test-id', 'fedex-auth-signup-firstName-input-required', 1, 'text-red-500', 'text-right'],
                         ['test-id', 'fedex-auth-signup-lastName-input-required', 1, 'text-red-500', 'text-right'],
                    ],
                    template: function (r, o) {
                         r & 1 &&
                              (l(0, 'div', 0)(1, 'div', 1),
                              u(2, ' Hi, Welcome to '),
                              l(3, 'span', 2),
                              u(4, 'Fed'),
                              s(),
                              l(5, 'span', 3),
                              u(6, 'Ex'),
                              s()(),
                              l(7, 'div', 4),
                              u(8, 'Create your Fedex profile and track your shipping online.'),
                              s()(),
                              l(9, 'form', 5),
                              F('ngSubmit', function () {
                                   return o.submitForm();
                              }),
                              l(10, 'div', 6)(11, 'div', 7)(12, 'div', 8)(13, 'label', 9),
                              u(14, 'Email Address'),
                              s(),
                              w(15, hi, 3, 1, 'span', 10),
                              s(),
                              l(16, 'div', 11)(17, 'div', 12),
                              h(18, 'img', 13),
                              s(),
                              h(19, 'input', 14),
                              s()(),
                              l(20, 'div', 7)(21, 'div', 15)(22, 'label', 16),
                              u(23, 'Password'),
                              s(),
                              w(24, gi, 4, 1, 'span', 17),
                              s(),
                              l(25, 'div', 11)(26, 'div', 12),
                              h(27, 'img', 18),
                              s(),
                              h(28, 'input', 19),
                              s()()(),
                              l(29, 'div', 20)(30, 'div', 21),
                              h(31, 'hr', 22),
                              l(32, 'span', 23),
                              u(33, 'Personal Information'),
                              s(),
                              h(34, 'hr', 22),
                              s(),
                              l(35, 'div', 24)(36, 'span')(37, 'div', 15)(38, 'label', 25),
                              u(39, 'First Name'),
                              s(),
                              w(40, vi, 2, 0, 'span', 26),
                              s(),
                              l(41, 'div', 27)(42, 'div', 12),
                              h(43, 'img', 28),
                              s(),
                              h(44, 'input', 29),
                              s()(),
                              l(45, 'span')(46, 'div', 15)(47, 'label', 30),
                              u(48, 'Last Name'),
                              s(),
                              w(49, yi, 2, 0, 'span', 31),
                              s(),
                              l(50, 'div', 11)(51, 'div', 12),
                              h(52, 'img', 28),
                              s(),
                              h(53, 'input', 32),
                              s()()()(),
                              l(54, 'div', 33),
                              h(55, 'span', 34),
                              l(56, 'div', 21)(57, 'div', 35),
                              h(58, 'input', 36),
                              l(59, 'label', 37),
                              u(60, ' I agree to the terms conditions for Fedex '),
                              s()(),
                              l(61, 'a', 38),
                              u(62, 'Terms and conditions'),
                              s()()(),
                              l(63, 'div', 6)(64, 'button', 39),
                              u(65, ' Sign up '),
                              s()()()),
                              r & 2 &&
                                   (d(9),
                                   C('formGroup', o.signUpForm),
                                   d(6),
                                   E(15, o.f.email.invalid && (o.f.email.touched || o.submitted) ? 15 : -1),
                                   d(3),
                                   V('src', '', o.baseHref, 'assets/fedex-auth/icons/email.svg', k),
                                   d(1),
                                   C('formControl', o.f.email),
                                   d(5),
                                   E(24, o.f.password.invalid && (o.f.password.touched || o.submitted) ? 24 : -1),
                                   d(3),
                                   V('src', '', o.baseHref, 'assets/fedex-auth/icons/lock.svg', k),
                                   d(1),
                                   C('formControl', o.f.password),
                                   d(12),
                                   E(
                                        40,
                                        (o.submitted || o.f.firstName.touched) &&
                                             o.f.firstName.errors != null &&
                                             o.f.firstName.errors.required
                                             ? 40
                                             : -1
                                   ),
                                   d(3),
                                   V('src', '', o.baseHref, 'assets/fedex-auth/icons/user.svg', k),
                                   d(1),
                                   C('formControl', o.f.firstName),
                                   d(5),
                                   E(
                                        49,
                                        (o.submitted || o.f.lastName.touched) &&
                                             o.f.lastName.errors != null &&
                                             o.f.lastName.errors.required
                                             ? 49
                                             : -1
                                   ),
                                   d(3),
                                   V('src', '', o.baseHref, 'assets/fedex-auth/icons/user.svg', k),
                                   d(1),
                                   C('formControl', o.f.lastName),
                                   d(5),
                                   C('formControl', o.f.termsAndConditions)(
                                        'ngClass',
                                        Oe(
                                             16,
                                             _i,
                                             (o.submitted || o.f.termsAndConditions.touched) &&
                                                  o.f.termsAndConditions.value === !1
                                        )
                                   ),
                                   d(6),
                                   C('disabled', o.isLoading()));
                    },
                    dependencies: [W, ke, Et, Vt, te, _e, gt, vt, De, Ae, wt],
                    changeDetection: 0,
               }));
          let t = e;
          return t;
     })();
var On = [
     {
          path: '',
          component: qe,
          children: [
               { path: '', pathMatch: 'full', redirectTo: 'signup' },
               { path: 'signup', component: Ft },
          ],
     },
];
export { On as fedexAuthRoutes };
