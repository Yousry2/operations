var Wh = Object.defineProperty,
     Gh = Object.defineProperties;
var qh = Object.getOwnPropertyDescriptors;
var zu = Object.getOwnPropertySymbols;
var Zh = Object.prototype.hasOwnProperty,
     Yh = Object.prototype.propertyIsEnumerable;
var Wu = (t, e, r) => (e in t ? Wh(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : (t[e] = r)),
     m = (t, e) => {
          for (var r in (e ||= {})) Zh.call(e, r) && Wu(t, r, e[r]);
          if (zu) for (var r of zu(e)) Yh.call(e, r) && Wu(t, r, e[r]);
          return t;
     },
     H = (t, e) => Gh(t, qh(e));
function Qh(t, e) {
     return Object.is(t, e);
}
var q = null,
     xr = !1,
     _r = 1,
     Mn = Symbol('SIGNAL');
function ee(t) {
     let e = q;
     return (q = t), e;
}
var Ti = {
     version: 0,
     lastCleanEpoch: 0,
     dirty: !1,
     producerNode: void 0,
     producerLastReadVersion: void 0,
     producerIndexOfThis: void 0,
     nextProducerIndex: 0,
     liveConsumerNode: void 0,
     liveConsumerIndexOfThis: void 0,
     consumerAllowSignalWrites: !1,
     consumerIsAlwaysLive: !1,
     producerMustRecompute: () => !1,
     producerRecomputeValue: () => {},
     consumerMarkedDirty: () => {},
     consumerOnSignalRead: () => {},
};
function Kh(t) {
     if (xr) throw new Error('');
     if (q === null) return;
     q.consumerOnSignalRead(t);
     let e = q.nextProducerIndex++;
     if ((At(q), e < q.producerNode.length && q.producerNode[e] !== t && bn(q))) {
          let r = q.producerNode[e];
          Ar(r, q.producerIndexOfThis[e]);
     }
     q.producerNode[e] !== t && ((q.producerNode[e] = t), (q.producerIndexOfThis[e] = bn(q) ? Ku(t, q, e) : 0)),
          (q.producerLastReadVersion[e] = t.version);
}
function Jh() {
     _r++;
}
function Xh(t) {
     if (!(bn(t) && !t.dirty) && !(!t.dirty && t.lastCleanEpoch === _r)) {
          if (!t.producerMustRecompute(t) && !xi(t)) {
               (t.dirty = !1), (t.lastCleanEpoch = _r);
               return;
          }
          t.producerRecomputeValue(t), (t.dirty = !1), (t.lastCleanEpoch = _r);
     }
}
function Gu(t) {
     if (t.liveConsumerNode === void 0) return;
     let e = xr;
     xr = !0;
     try {
          for (let r of t.liveConsumerNode) r.dirty || ep(r);
     } finally {
          xr = e;
     }
}
function qu() {
     return q?.consumerAllowSignalWrites !== !1;
}
function ep(t) {
     (t.dirty = !0), Gu(t), t.consumerMarkedDirty?.(t);
}
function Zu(t) {
     return t && (t.nextProducerIndex = 0), ee(t);
}
function Yu(t, e) {
     if (
          (ee(e),
          !(
               !t ||
               t.producerNode === void 0 ||
               t.producerIndexOfThis === void 0 ||
               t.producerLastReadVersion === void 0
          ))
     ) {
          if (bn(t))
               for (let r = t.nextProducerIndex; r < t.producerNode.length; r++)
                    Ar(t.producerNode[r], t.producerIndexOfThis[r]);
          for (; t.producerNode.length > t.nextProducerIndex; )
               t.producerNode.pop(), t.producerLastReadVersion.pop(), t.producerIndexOfThis.pop();
     }
}
function xi(t) {
     At(t);
     for (let e = 0; e < t.producerNode.length; e++) {
          let r = t.producerNode[e],
               n = t.producerLastReadVersion[e];
          if (n !== r.version || (Xh(r), n !== r.version)) return !0;
     }
     return !1;
}
function Qu(t) {
     if ((At(t), bn(t)))
          for (let e = 0; e < t.producerNode.length; e++) Ar(t.producerNode[e], t.producerIndexOfThis[e]);
     (t.producerNode.length = t.producerLastReadVersion.length = t.producerIndexOfThis.length = 0),
          t.liveConsumerNode && (t.liveConsumerNode.length = t.liveConsumerIndexOfThis.length = 0);
}
function Ku(t, e, r) {
     if ((Ju(t), At(t), t.liveConsumerNode.length === 0))
          for (let n = 0; n < t.producerNode.length; n++) t.producerIndexOfThis[n] = Ku(t.producerNode[n], t, n);
     return t.liveConsumerIndexOfThis.push(r), t.liveConsumerNode.push(e) - 1;
}
function Ar(t, e) {
     if ((Ju(t), At(t), t.liveConsumerNode.length === 1))
          for (let n = 0; n < t.producerNode.length; n++) Ar(t.producerNode[n], t.producerIndexOfThis[n]);
     let r = t.liveConsumerNode.length - 1;
     if (
          ((t.liveConsumerNode[e] = t.liveConsumerNode[r]),
          (t.liveConsumerIndexOfThis[e] = t.liveConsumerIndexOfThis[r]),
          t.liveConsumerNode.length--,
          t.liveConsumerIndexOfThis.length--,
          e < t.liveConsumerNode.length)
     ) {
          let n = t.liveConsumerIndexOfThis[e],
               o = t.liveConsumerNode[e];
          At(o), (o.producerIndexOfThis[n] = e);
     }
}
function bn(t) {
     return t.consumerIsAlwaysLive || (t?.liveConsumerNode?.length ?? 0) > 0;
}
function At(t) {
     (t.producerNode ??= []), (t.producerIndexOfThis ??= []), (t.producerLastReadVersion ??= []);
}
function Ju(t) {
     (t.liveConsumerNode ??= []), (t.liveConsumerIndexOfThis ??= []);
}
function tp() {
     throw new Error();
}
var Xu = tp;
function ec() {
     Xu();
}
function tc(t) {
     Xu = t;
}
var np = null;
function nc(t) {
     let e = Object.create(rp);
     e.value = t;
     let r = () => (Kh(e), e.value);
     return (r[Mn] = e), r;
}
function _i(t, e) {
     qu() || ec();
     let r = t.value;
     Object.is(r, e) || t.equal(r, e) || ((t.value = e), op(t));
}
function rc(t, e) {
     qu() || ec(), _i(t, e(t.value));
}
var rp = (() => H(m({}, Ti), { equal: Qh, value: void 0 }))();
function op(t) {
     t.version++, Jh(), Gu(t), np?.();
}
function M(t) {
     return typeof t == 'function';
}
function Nt(t) {
     let r = t((n) => {
          Error.call(n), (n.stack = new Error().stack);
     });
     return (r.prototype = Object.create(Error.prototype)), (r.prototype.constructor = r), r;
}
var Nr = Nt(
     (t) =>
          function (r) {
               t(this),
                    (this.message = r
                         ? `${r.length} errors occurred during unsubscription:
${r.map((n, o) => `${o + 1}) ${n.toString()}`).join(`
  `)}`
                         : ''),
                    (this.name = 'UnsubscriptionError'),
                    (this.errors = r);
          }
);
function Sn(t, e) {
     if (t) {
          let r = t.indexOf(e);
          0 <= r && t.splice(r, 1);
     }
}
var Z = class t {
     constructor(e) {
          (this.initialTeardown = e), (this.closed = !1), (this._parentage = null), (this._finalizers = null);
     }
     unsubscribe() {
          let e;
          if (!this.closed) {
               this.closed = !0;
               let { _parentage: r } = this;
               if (r)
                    if (((this._parentage = null), Array.isArray(r))) for (let i of r) i.remove(this);
                    else r.remove(this);
               let { initialTeardown: n } = this;
               if (M(n))
                    try {
                         n();
                    } catch (i) {
                         e = i instanceof Nr ? i.errors : [i];
                    }
               let { _finalizers: o } = this;
               if (o) {
                    this._finalizers = null;
                    for (let i of o)
                         try {
                              oc(i);
                         } catch (s) {
                              (e = e ?? []), s instanceof Nr ? (e = [...e, ...s.errors]) : e.push(s);
                         }
               }
               if (e) throw new Nr(e);
          }
     }
     add(e) {
          var r;
          if (e && e !== this)
               if (this.closed) oc(e);
               else {
                    if (e instanceof t) {
                         if (e.closed || e._hasParent(this)) return;
                         e._addParent(this);
                    }
                    (this._finalizers = (r = this._finalizers) !== null && r !== void 0 ? r : []).push(e);
               }
     }
     _hasParent(e) {
          let { _parentage: r } = this;
          return r === e || (Array.isArray(r) && r.includes(e));
     }
     _addParent(e) {
          let { _parentage: r } = this;
          this._parentage = Array.isArray(r) ? (r.push(e), r) : r ? [r, e] : e;
     }
     _removeParent(e) {
          let { _parentage: r } = this;
          r === e ? (this._parentage = null) : Array.isArray(r) && Sn(r, e);
     }
     remove(e) {
          let { _finalizers: r } = this;
          r && Sn(r, e), e instanceof t && e._removeParent(this);
     }
};
Z.EMPTY = (() => {
     let t = new Z();
     return (t.closed = !0), t;
})();
var Ai = Z.EMPTY;
function Rr(t) {
     return t instanceof Z || (t && 'closed' in t && M(t.remove) && M(t.add) && M(t.unsubscribe));
}
function oc(t) {
     M(t) ? t() : t.unsubscribe();
}
var me = {
     onUnhandledError: null,
     onStoppedNotification: null,
     Promise: void 0,
     useDeprecatedSynchronousErrorHandling: !1,
     useDeprecatedNextContext: !1,
};
var Rt = {
     setTimeout(t, e, ...r) {
          let { delegate: n } = Rt;
          return n?.setTimeout ? n.setTimeout(t, e, ...r) : setTimeout(t, e, ...r);
     },
     clearTimeout(t) {
          let { delegate: e } = Rt;
          return (e?.clearTimeout || clearTimeout)(t);
     },
     delegate: void 0,
};
function Or(t) {
     Rt.setTimeout(() => {
          let { onUnhandledError: e } = me;
          if (e) e(t);
          else throw t;
     });
}
function Tn() {}
var ic = (() => Ni('C', void 0, void 0))();
function sc(t) {
     return Ni('E', void 0, t);
}
function ac(t) {
     return Ni('N', t, void 0);
}
function Ni(t, e, r) {
     return { kind: t, value: e, error: r };
}
var ht = null;
function Ot(t) {
     if (me.useDeprecatedSynchronousErrorHandling) {
          let e = !ht;
          if ((e && (ht = { errorThrown: !1, error: null }), t(), e)) {
               let { errorThrown: r, error: n } = ht;
               if (((ht = null), r)) throw n;
          }
     } else t();
}
function uc(t) {
     me.useDeprecatedSynchronousErrorHandling && ht && ((ht.errorThrown = !0), (ht.error = t));
}
var pt = class extends Z {
          constructor(e) {
               super(),
                    (this.isStopped = !1),
                    e ? ((this.destination = e), Rr(e) && e.add(this)) : (this.destination = ap);
          }
          static create(e, r, n) {
               return new Ve(e, r, n);
          }
          next(e) {
               this.isStopped ? Oi(ac(e), this) : this._next(e);
          }
          error(e) {
               this.isStopped ? Oi(sc(e), this) : ((this.isStopped = !0), this._error(e));
          }
          complete() {
               this.isStopped ? Oi(ic, this) : ((this.isStopped = !0), this._complete());
          }
          unsubscribe() {
               this.closed || ((this.isStopped = !0), super.unsubscribe(), (this.destination = null));
          }
          _next(e) {
               this.destination.next(e);
          }
          _error(e) {
               try {
                    this.destination.error(e);
               } finally {
                    this.unsubscribe();
               }
          }
          _complete() {
               try {
                    this.destination.complete();
               } finally {
                    this.unsubscribe();
               }
          }
     },
     ip = Function.prototype.bind;
function Ri(t, e) {
     return ip.call(t, e);
}
var Pi = class {
          constructor(e) {
               this.partialObserver = e;
          }
          next(e) {
               let { partialObserver: r } = this;
               if (r.next)
                    try {
                         r.next(e);
                    } catch (n) {
                         Pr(n);
                    }
          }
          error(e) {
               let { partialObserver: r } = this;
               if (r.error)
                    try {
                         r.error(e);
                    } catch (n) {
                         Pr(n);
                    }
               else Pr(e);
          }
          complete() {
               let { partialObserver: e } = this;
               if (e.complete)
                    try {
                         e.complete();
                    } catch (r) {
                         Pr(r);
                    }
          }
     },
     Ve = class extends pt {
          constructor(e, r, n) {
               super();
               let o;
               if (M(e) || !e) o = { next: e ?? void 0, error: r ?? void 0, complete: n ?? void 0 };
               else {
                    let i;
                    this && me.useDeprecatedNextContext
                         ? ((i = Object.create(e)),
                           (i.unsubscribe = () => this.unsubscribe()),
                           (o = {
                                next: e.next && Ri(e.next, i),
                                error: e.error && Ri(e.error, i),
                                complete: e.complete && Ri(e.complete, i),
                           }))
                         : (o = e);
               }
               this.destination = new Pi(o);
          }
     };
function Pr(t) {
     me.useDeprecatedSynchronousErrorHandling ? uc(t) : Or(t);
}
function sp(t) {
     throw t;
}
function Oi(t, e) {
     let { onStoppedNotification: r } = me;
     r && Rt.setTimeout(() => r(t, e));
}
var ap = { closed: !0, next: Tn, error: sp, complete: Tn };
var Pt = (() => (typeof Symbol == 'function' && Symbol.observable) || '@@observable')();
function te(t) {
     return t;
}
function Fi(...t) {
     return ki(t);
}
function ki(t) {
     return t.length === 0
          ? te
          : t.length === 1
          ? t[0]
          : function (r) {
                 return t.reduce((n, o) => o(n), r);
            };
}
var O = (() => {
     class t {
          constructor(r) {
               r && (this._subscribe = r);
          }
          lift(r) {
               let n = new t();
               return (n.source = this), (n.operator = r), n;
          }
          subscribe(r, n, o) {
               let i = cp(r) ? r : new Ve(r, n, o);
               return (
                    Ot(() => {
                         let { operator: s, source: a } = this;
                         i.add(s ? s.call(i, a) : a ? this._subscribe(i) : this._trySubscribe(i));
                    }),
                    i
               );
          }
          _trySubscribe(r) {
               try {
                    return this._subscribe(r);
               } catch (n) {
                    r.error(n);
               }
          }
          forEach(r, n) {
               return (
                    (n = cc(n)),
                    new n((o, i) => {
                         let s = new Ve({
                              next: (a) => {
                                   try {
                                        r(a);
                                   } catch (u) {
                                        i(u), s.unsubscribe();
                                   }
                              },
                              error: i,
                              complete: o,
                         });
                         this.subscribe(s);
                    })
               );
          }
          _subscribe(r) {
               var n;
               return (n = this.source) === null || n === void 0 ? void 0 : n.subscribe(r);
          }
          [Pt]() {
               return this;
          }
          pipe(...r) {
               return ki(r)(this);
          }
          toPromise(r) {
               return (
                    (r = cc(r)),
                    new r((n, o) => {
                         let i;
                         this.subscribe(
                              (s) => (i = s),
                              (s) => o(s),
                              () => n(i)
                         );
                    })
               );
          }
     }
     return (t.create = (e) => new t(e)), t;
})();
function cc(t) {
     var e;
     return (e = t ?? me.Promise) !== null && e !== void 0 ? e : Promise;
}
function up(t) {
     return t && M(t.next) && M(t.error) && M(t.complete);
}
function cp(t) {
     return (t && t instanceof pt) || (up(t) && Rr(t));
}
function Li(t) {
     return M(t?.lift);
}
function x(t) {
     return (e) => {
          if (Li(e))
               return e.lift(function (r) {
                    try {
                         return t(r, this);
                    } catch (n) {
                         this.error(n);
                    }
               });
          throw new TypeError('Unable to lift unknown Observable type');
     };
}
function _(t, e, r, n, o) {
     return new ji(t, e, r, n, o);
}
var ji = class extends pt {
     constructor(e, r, n, o, i, s) {
          super(e),
               (this.onFinalize = i),
               (this.shouldUnsubscribe = s),
               (this._next = r
                    ? function (a) {
                           try {
                                r(a);
                           } catch (u) {
                                e.error(u);
                           }
                      }
                    : super._next),
               (this._error = o
                    ? function (a) {
                           try {
                                o(a);
                           } catch (u) {
                                e.error(u);
                           } finally {
                                this.unsubscribe();
                           }
                      }
                    : super._error),
               (this._complete = n
                    ? function () {
                           try {
                                n();
                           } catch (a) {
                                e.error(a);
                           } finally {
                                this.unsubscribe();
                           }
                      }
                    : super._complete);
     }
     unsubscribe() {
          var e;
          if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
               let { closed: r } = this;
               super.unsubscribe(), !r && ((e = this.onFinalize) === null || e === void 0 || e.call(this));
          }
     }
};
function Ft() {
     return x((t, e) => {
          let r = null;
          t._refCount++;
          let n = _(e, void 0, void 0, void 0, () => {
               if (!t || t._refCount <= 0 || 0 < --t._refCount) {
                    r = null;
                    return;
               }
               let o = t._connection,
                    i = r;
               (r = null), o && (!i || o === i) && o.unsubscribe(), e.unsubscribe();
          });
          t.subscribe(n), n.closed || (r = t.connect());
     });
}
var kt = class extends O {
     constructor(e, r) {
          super(),
               (this.source = e),
               (this.subjectFactory = r),
               (this._subject = null),
               (this._refCount = 0),
               (this._connection = null),
               Li(e) && (this.lift = e.lift);
     }
     _subscribe(e) {
          return this.getSubject().subscribe(e);
     }
     getSubject() {
          let e = this._subject;
          return (!e || e.isStopped) && (this._subject = this.subjectFactory()), this._subject;
     }
     _teardown() {
          this._refCount = 0;
          let { _connection: e } = this;
          (this._subject = this._connection = null), e?.unsubscribe();
     }
     connect() {
          let e = this._connection;
          if (!e) {
               e = this._connection = new Z();
               let r = this.getSubject();
               e.add(
                    this.source.subscribe(
                         _(
                              r,
                              void 0,
                              () => {
                                   this._teardown(), r.complete();
                              },
                              (n) => {
                                   this._teardown(), r.error(n);
                              },
                              () => this._teardown()
                         )
                    )
               ),
                    e.closed && ((this._connection = null), (e = Z.EMPTY));
          }
          return e;
     }
     refCount() {
          return Ft()(this);
     }
};
var lc = Nt(
     (t) =>
          function () {
               t(this), (this.name = 'ObjectUnsubscribedError'), (this.message = 'object unsubscribed');
          }
);
var ne = (() => {
          class t extends O {
               constructor() {
                    super(),
                         (this.closed = !1),
                         (this.currentObservers = null),
                         (this.observers = []),
                         (this.isStopped = !1),
                         (this.hasError = !1),
                         (this.thrownError = null);
               }
               lift(r) {
                    let n = new Fr(this, this);
                    return (n.operator = r), n;
               }
               _throwIfClosed() {
                    if (this.closed) throw new lc();
               }
               next(r) {
                    Ot(() => {
                         if ((this._throwIfClosed(), !this.isStopped)) {
                              this.currentObservers || (this.currentObservers = Array.from(this.observers));
                              for (let n of this.currentObservers) n.next(r);
                         }
                    });
               }
               error(r) {
                    Ot(() => {
                         if ((this._throwIfClosed(), !this.isStopped)) {
                              (this.hasError = this.isStopped = !0), (this.thrownError = r);
                              let { observers: n } = this;
                              for (; n.length; ) n.shift().error(r);
                         }
                    });
               }
               complete() {
                    Ot(() => {
                         if ((this._throwIfClosed(), !this.isStopped)) {
                              this.isStopped = !0;
                              let { observers: r } = this;
                              for (; r.length; ) r.shift().complete();
                         }
                    });
               }
               unsubscribe() {
                    (this.isStopped = this.closed = !0), (this.observers = this.currentObservers = null);
               }
               get observed() {
                    var r;
                    return ((r = this.observers) === null || r === void 0 ? void 0 : r.length) > 0;
               }
               _trySubscribe(r) {
                    return this._throwIfClosed(), super._trySubscribe(r);
               }
               _subscribe(r) {
                    return this._throwIfClosed(), this._checkFinalizedStatuses(r), this._innerSubscribe(r);
               }
               _innerSubscribe(r) {
                    let { hasError: n, isStopped: o, observers: i } = this;
                    return n || o
                         ? Ai
                         : ((this.currentObservers = null),
                           i.push(r),
                           new Z(() => {
                                (this.currentObservers = null), Sn(i, r);
                           }));
               }
               _checkFinalizedStatuses(r) {
                    let { hasError: n, thrownError: o, isStopped: i } = this;
                    n ? r.error(o) : i && r.complete();
               }
               asObservable() {
                    let r = new O();
                    return (r.source = this), r;
               }
          }
          return (t.create = (e, r) => new Fr(e, r)), t;
     })(),
     Fr = class extends ne {
          constructor(e, r) {
               super(), (this.destination = e), (this.source = r);
          }
          next(e) {
               var r, n;
               (n = (r = this.destination) === null || r === void 0 ? void 0 : r.next) === null ||
                    n === void 0 ||
                    n.call(r, e);
          }
          error(e) {
               var r, n;
               (n = (r = this.destination) === null || r === void 0 ? void 0 : r.error) === null ||
                    n === void 0 ||
                    n.call(r, e);
          }
          complete() {
               var e, r;
               (r = (e = this.destination) === null || e === void 0 ? void 0 : e.complete) === null ||
                    r === void 0 ||
                    r.call(e);
          }
          _subscribe(e) {
               var r, n;
               return (n = (r = this.source) === null || r === void 0 ? void 0 : r.subscribe(e)) !== null &&
                    n !== void 0
                    ? n
                    : Ai;
          }
     };
var J = class extends ne {
     constructor(e) {
          super(), (this._value = e);
     }
     get value() {
          return this.getValue();
     }
     _subscribe(e) {
          let r = super._subscribe(e);
          return !r.closed && e.next(this._value), r;
     }
     getValue() {
          let { hasError: e, thrownError: r, _value: n } = this;
          if (e) throw r;
          return this._throwIfClosed(), n;
     }
     next(e) {
          super.next((this._value = e));
     }
};
var se = new O((t) => t.complete());
function dc(t) {
     return t && M(t.schedule);
}
function Vi(t) {
     return t[t.length - 1];
}
function kr(t) {
     return M(Vi(t)) ? t.pop() : void 0;
}
function Se(t) {
     return dc(Vi(t)) ? t.pop() : void 0;
}
function fc(t, e) {
     return typeof Vi(t) == 'number' ? t.pop() : e;
}
function pc(t, e, r, n) {
     function o(i) {
          return i instanceof r
               ? i
               : new r(function (s) {
                      s(i);
                 });
     }
     return new (r || (r = Promise))(function (i, s) {
          function a(l) {
               try {
                    c(n.next(l));
               } catch (d) {
                    s(d);
               }
          }
          function u(l) {
               try {
                    c(n.throw(l));
               } catch (d) {
                    s(d);
               }
          }
          function c(l) {
               l.done ? i(l.value) : o(l.value).then(a, u);
          }
          c((n = n.apply(t, e || [])).next());
     });
}
function hc(t) {
     var e = typeof Symbol == 'function' && Symbol.iterator,
          r = e && t[e],
          n = 0;
     if (r) return r.call(t);
     if (t && typeof t.length == 'number')
          return {
               next: function () {
                    return t && n >= t.length && (t = void 0), { value: t && t[n++], done: !t };
               },
          };
     throw new TypeError(e ? 'Object is not iterable.' : 'Symbol.iterator is not defined.');
}
function gt(t) {
     return this instanceof gt ? ((this.v = t), this) : new gt(t);
}
function gc(t, e, r) {
     if (!Symbol.asyncIterator) throw new TypeError('Symbol.asyncIterator is not defined.');
     var n = r.apply(t, e || []),
          o,
          i = [];
     return (
          (o = {}),
          s('next'),
          s('throw'),
          s('return'),
          (o[Symbol.asyncIterator] = function () {
               return this;
          }),
          o
     );
     function s(f) {
          n[f] &&
               (o[f] = function (h) {
                    return new Promise(function (g, S) {
                         i.push([f, h, g, S]) > 1 || a(f, h);
                    });
               });
     }
     function a(f, h) {
          try {
               u(n[f](h));
          } catch (g) {
               d(i[0][3], g);
          }
     }
     function u(f) {
          f.value instanceof gt ? Promise.resolve(f.value.v).then(c, l) : d(i[0][2], f);
     }
     function c(f) {
          a('next', f);
     }
     function l(f) {
          a('throw', f);
     }
     function d(f, h) {
          f(h), i.shift(), i.length && a(i[0][0], i[0][1]);
     }
}
function mc(t) {
     if (!Symbol.asyncIterator) throw new TypeError('Symbol.asyncIterator is not defined.');
     var e = t[Symbol.asyncIterator],
          r;
     return e
          ? e.call(t)
          : ((t = typeof hc == 'function' ? hc(t) : t[Symbol.iterator]()),
            (r = {}),
            n('next'),
            n('throw'),
            n('return'),
            (r[Symbol.asyncIterator] = function () {
                 return this;
            }),
            r);
     function n(i) {
          r[i] =
               t[i] &&
               function (s) {
                    return new Promise(function (a, u) {
                         (s = t[i](s)), o(a, u, s.done, s.value);
                    });
               };
     }
     function o(i, s, a, u) {
          Promise.resolve(u).then(function (c) {
               i({ value: c, done: a });
          }, s);
     }
}
var Lr = (t) => t && typeof t.length == 'number' && typeof t != 'function';
function jr(t) {
     return M(t?.then);
}
function Vr(t) {
     return M(t[Pt]);
}
function $r(t) {
     return Symbol.asyncIterator && M(t?.[Symbol.asyncIterator]);
}
function Ur(t) {
     return new TypeError(
          `You provided ${
               t !== null && typeof t == 'object' ? 'an invalid object' : `'${t}'`
          } where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`
     );
}
function lp() {
     return typeof Symbol != 'function' || !Symbol.iterator ? '@@iterator' : Symbol.iterator;
}
var Br = lp();
function Hr(t) {
     return M(t?.[Br]);
}
function zr(t) {
     return gc(this, arguments, function* () {
          let r = t.getReader();
          try {
               for (;;) {
                    let { value: n, done: o } = yield gt(r.read());
                    if (o) return yield gt(void 0);
                    yield yield gt(n);
               }
          } finally {
               r.releaseLock();
          }
     });
}
function Wr(t) {
     return M(t?.getReader);
}
function L(t) {
     if (t instanceof O) return t;
     if (t != null) {
          if (Vr(t)) return dp(t);
          if (Lr(t)) return fp(t);
          if (jr(t)) return hp(t);
          if ($r(t)) return vc(t);
          if (Hr(t)) return pp(t);
          if (Wr(t)) return gp(t);
     }
     throw Ur(t);
}
function dp(t) {
     return new O((e) => {
          let r = t[Pt]();
          if (M(r.subscribe)) return r.subscribe(e);
          throw new TypeError('Provided object does not correctly implement Symbol.observable');
     });
}
function fp(t) {
     return new O((e) => {
          for (let r = 0; r < t.length && !e.closed; r++) e.next(t[r]);
          e.complete();
     });
}
function hp(t) {
     return new O((e) => {
          t.then(
               (r) => {
                    e.closed || (e.next(r), e.complete());
               },
               (r) => e.error(r)
          ).then(null, Or);
     });
}
function pp(t) {
     return new O((e) => {
          for (let r of t) if ((e.next(r), e.closed)) return;
          e.complete();
     });
}
function vc(t) {
     return new O((e) => {
          mp(t, e).catch((r) => e.error(r));
     });
}
function gp(t) {
     return vc(zr(t));
}
function mp(t, e) {
     var r, n, o, i;
     return pc(this, void 0, void 0, function* () {
          try {
               for (r = mc(t); (n = yield r.next()), !n.done; ) {
                    let s = n.value;
                    if ((e.next(s), e.closed)) return;
               }
          } catch (s) {
               o = { error: s };
          } finally {
               try {
                    n && !n.done && (i = r.return) && (yield i.call(r));
               } finally {
                    if (o) throw o.error;
               }
          }
          e.complete();
     });
}
function ae(t, e, r, n = 0, o = !1) {
     let i = e.schedule(function () {
          r(), o ? t.add(this.schedule(null, n)) : this.unsubscribe();
     }, n);
     if ((t.add(i), !o)) return i;
}
function Gr(t, e = 0) {
     return x((r, n) => {
          r.subscribe(
               _(
                    n,
                    (o) => ae(n, t, () => n.next(o), e),
                    () => ae(n, t, () => n.complete(), e),
                    (o) => ae(n, t, () => n.error(o), e)
               )
          );
     });
}
function qr(t, e = 0) {
     return x((r, n) => {
          n.add(t.schedule(() => r.subscribe(n), e));
     });
}
function yc(t, e) {
     return L(t).pipe(qr(e), Gr(e));
}
function Dc(t, e) {
     return L(t).pipe(qr(e), Gr(e));
}
function wc(t, e) {
     return new O((r) => {
          let n = 0;
          return e.schedule(function () {
               n === t.length ? r.complete() : (r.next(t[n++]), r.closed || this.schedule());
          });
     });
}
function Cc(t, e) {
     return new O((r) => {
          let n;
          return (
               ae(r, e, () => {
                    (n = t[Br]()),
                         ae(
                              r,
                              e,
                              () => {
                                   let o, i;
                                   try {
                                        ({ value: o, done: i } = n.next());
                                   } catch (s) {
                                        r.error(s);
                                        return;
                                   }
                                   i ? r.complete() : r.next(o);
                              },
                              0,
                              !0
                         );
               }),
               () => M(n?.return) && n.return()
          );
     });
}
function Zr(t, e) {
     if (!t) throw new Error('Iterable cannot be null');
     return new O((r) => {
          ae(r, e, () => {
               let n = t[Symbol.asyncIterator]();
               ae(
                    r,
                    e,
                    () => {
                         n.next().then((o) => {
                              o.done ? r.complete() : r.next(o.value);
                         });
                    },
                    0,
                    !0
               );
          });
     });
}
function Ec(t, e) {
     return Zr(zr(t), e);
}
function Ic(t, e) {
     if (t != null) {
          if (Vr(t)) return yc(t, e);
          if (Lr(t)) return wc(t, e);
          if (jr(t)) return Dc(t, e);
          if ($r(t)) return Zr(t, e);
          if (Hr(t)) return Cc(t, e);
          if (Wr(t)) return Ec(t, e);
     }
     throw Ur(t);
}
function j(t, e) {
     return e ? Ic(t, e) : L(t);
}
function C(...t) {
     let e = Se(t);
     return j(t, e);
}
function Lt(t, e) {
     let r = M(t) ? t : () => t,
          n = (o) => o.error(r());
     return new O(e ? (o) => e.schedule(n, 0, o) : n);
}
function $i(t) {
     return !!t && (t instanceof O || (M(t.lift) && M(t.subscribe)));
}
var $e = Nt(
     (t) =>
          function () {
               t(this), (this.name = 'EmptyError'), (this.message = 'no elements in sequence');
          }
);
function R(t, e) {
     return x((r, n) => {
          let o = 0;
          r.subscribe(
               _(n, (i) => {
                    n.next(t.call(e, i, o++));
               })
          );
     });
}
var { isArray: vp } = Array;
function yp(t, e) {
     return vp(e) ? t(...e) : t(e);
}
function Yr(t) {
     return R((e) => yp(t, e));
}
var { isArray: Dp } = Array,
     { getPrototypeOf: wp, prototype: Cp, keys: Ep } = Object;
function Qr(t) {
     if (t.length === 1) {
          let e = t[0];
          if (Dp(e)) return { args: e, keys: null };
          if (Ip(e)) {
               let r = Ep(e);
               return { args: r.map((n) => e[n]), keys: r };
          }
     }
     return { args: t, keys: null };
}
function Ip(t) {
     return t && typeof t == 'object' && wp(t) === Cp;
}
function Kr(t, e) {
     return t.reduce((r, n, o) => ((r[n] = e[o]), r), {});
}
function xn(...t) {
     let e = Se(t),
          r = kr(t),
          { args: n, keys: o } = Qr(t);
     if (n.length === 0) return j([], e);
     let i = new O(bp(n, e, o ? (s) => Kr(o, s) : te));
     return r ? i.pipe(Yr(r)) : i;
}
function bp(t, e, r = te) {
     return (n) => {
          bc(
               e,
               () => {
                    let { length: o } = t,
                         i = new Array(o),
                         s = o,
                         a = o;
                    for (let u = 0; u < o; u++)
                         bc(
                              e,
                              () => {
                                   let c = j(t[u], e),
                                        l = !1;
                                   c.subscribe(
                                        _(
                                             n,
                                             (d) => {
                                                  (i[u] = d), l || ((l = !0), a--), a || n.next(r(i.slice()));
                                             },
                                             () => {
                                                  --s || n.complete();
                                             }
                                        )
                                   );
                              },
                              n
                         );
               },
               n
          );
     };
}
function bc(t, e, r) {
     t ? ae(r, t, e) : e();
}
function Mc(t, e, r, n, o, i, s, a) {
     let u = [],
          c = 0,
          l = 0,
          d = !1,
          f = () => {
               d && !u.length && !c && e.complete();
          },
          h = (S) => (c < n ? g(S) : u.push(S)),
          g = (S) => {
               i && e.next(S), c++;
               let I = !1;
               L(r(S, l++)).subscribe(
                    _(
                         e,
                         (v) => {
                              o?.(v), i ? h(v) : e.next(v);
                         },
                         () => {
                              I = !0;
                         },
                         void 0,
                         () => {
                              if (I)
                                   try {
                                        for (c--; u.length && c < n; ) {
                                             let v = u.shift();
                                             s ? ae(e, s, () => g(v)) : g(v);
                                        }
                                        f();
                                   } catch (v) {
                                        e.error(v);
                                   }
                         }
                    )
               );
          };
     return (
          t.subscribe(
               _(e, h, () => {
                    (d = !0), f();
               })
          ),
          () => {
               a?.();
          }
     );
}
function z(t, e, r = 1 / 0) {
     return M(e)
          ? z((n, o) => R((i, s) => e(n, i, o, s))(L(t(n, o))), r)
          : (typeof e == 'number' && (r = e), x((n, o) => Mc(n, o, t, r)));
}
function Ye(t = 1 / 0) {
     return z(te, t);
}
function Sc() {
     return Ye(1);
}
function jt(...t) {
     return Sc()(j(t, Se(t)));
}
function Jr(t) {
     return new O((e) => {
          L(t()).subscribe(e);
     });
}
function Mp(...t) {
     let e = kr(t),
          { args: r, keys: n } = Qr(t),
          o = new O((i) => {
               let { length: s } = r;
               if (!s) {
                    i.complete();
                    return;
               }
               let a = new Array(s),
                    u = s,
                    c = s;
               for (let l = 0; l < s; l++) {
                    let d = !1;
                    L(r[l]).subscribe(
                         _(
                              i,
                              (f) => {
                                   d || ((d = !0), c--), (a[l] = f);
                              },
                              () => u--,
                              void 0,
                              () => {
                                   (!u || !d) && (c || i.next(n ? Kr(n, a) : a), i.complete());
                              }
                         )
                    );
               }
          });
     return e ? o.pipe(Yr(e)) : o;
}
function Ui(...t) {
     let e = Se(t),
          r = fc(t, 1 / 0),
          n = t;
     return n.length ? (n.length === 1 ? L(n[0]) : Ye(r)(j(n, e))) : se;
}
function ue(t, e) {
     return x((r, n) => {
          let o = 0;
          r.subscribe(_(n, (i) => t.call(e, i, o++) && n.next(i)));
     });
}
function Qe(t) {
     return x((e, r) => {
          let n = null,
               o = !1,
               i;
          (n = e.subscribe(
               _(r, void 0, void 0, (s) => {
                    (i = L(t(s, Qe(t)(e)))), n ? (n.unsubscribe(), (n = null), i.subscribe(r)) : (o = !0);
               })
          )),
               o && (n.unsubscribe(), (n = null), i.subscribe(r));
     });
}
function Tc(t, e, r, n, o) {
     return (i, s) => {
          let a = r,
               u = e,
               c = 0;
          i.subscribe(
               _(
                    s,
                    (l) => {
                         let d = c++;
                         (u = a ? t(u, l, d) : ((a = !0), l)), n && s.next(u);
                    },
                    o &&
                         (() => {
                              a && s.next(u), s.complete();
                         })
               )
          );
     };
}
function Ue(t, e) {
     return M(e) ? z(t, e, 1) : z(t, 1);
}
function Ke(t) {
     return x((e, r) => {
          let n = !1;
          e.subscribe(
               _(
                    r,
                    (o) => {
                         (n = !0), r.next(o);
                    },
                    () => {
                         n || r.next(t), r.complete();
                    }
               )
          );
     });
}
function Be(t) {
     return t <= 0
          ? () => se
          : x((e, r) => {
                 let n = 0;
                 e.subscribe(
                      _(r, (o) => {
                           ++n <= t && (r.next(o), t <= n && r.complete());
                      })
                 );
            });
}
function Bi(t) {
     return R(() => t);
}
function Hi(t, e = te) {
     return (
          (t = t ?? Sp),
          x((r, n) => {
               let o,
                    i = !0;
               r.subscribe(
                    _(n, (s) => {
                         let a = e(s);
                         (i || !t(o, a)) && ((i = !1), (o = a), n.next(s));
                    })
               );
          })
     );
}
function Sp(t, e) {
     return t === e;
}
function Xr(t = Tp) {
     return x((e, r) => {
          let n = !1;
          e.subscribe(
               _(
                    r,
                    (o) => {
                         (n = !0), r.next(o);
                    },
                    () => (n ? r.complete() : r.error(t()))
               )
          );
     });
}
function Tp() {
     return new $e();
}
function Je(t) {
     return x((e, r) => {
          try {
               e.subscribe(r);
          } finally {
               r.add(t);
          }
     });
}
function Te(t, e) {
     let r = arguments.length >= 2;
     return (n) => n.pipe(t ? ue((o, i) => t(o, i, n)) : te, Be(1), r ? Ke(e) : Xr(() => new $e()));
}
function Vt(t) {
     return t <= 0
          ? () => se
          : x((e, r) => {
                 let n = [];
                 e.subscribe(
                      _(
                           r,
                           (o) => {
                                n.push(o), t < n.length && n.shift();
                           },
                           () => {
                                for (let o of n) r.next(o);
                                r.complete();
                           },
                           void 0,
                           () => {
                                n = null;
                           }
                      )
                 );
            });
}
function zi(t, e) {
     let r = arguments.length >= 2;
     return (n) => n.pipe(t ? ue((o, i) => t(o, i, n)) : te, Vt(1), r ? Ke(e) : Xr(() => new $e()));
}
function Wi(t, e) {
     return x(Tc(t, e, arguments.length >= 2, !0));
}
function eo(t = {}) {
     let {
          connector: e = () => new ne(),
          resetOnError: r = !0,
          resetOnComplete: n = !0,
          resetOnRefCountZero: o = !0,
     } = t;
     return (i) => {
          let s,
               a,
               u,
               c = 0,
               l = !1,
               d = !1,
               f = () => {
                    a?.unsubscribe(), (a = void 0);
               },
               h = () => {
                    f(), (s = u = void 0), (l = d = !1);
               },
               g = () => {
                    let S = s;
                    h(), S?.unsubscribe();
               };
          return x((S, I) => {
               c++, !d && !l && f();
               let v = (u = u ?? e());
               I.add(() => {
                    c--, c === 0 && !d && !l && (a = Gi(g, o));
               }),
                    v.subscribe(I),
                    !s &&
                         c > 0 &&
                         ((s = new Ve({
                              next: (B) => v.next(B),
                              error: (B) => {
                                   (d = !0), f(), (a = Gi(h, r, B)), v.error(B);
                              },
                              complete: () => {
                                   (l = !0), f(), (a = Gi(h, n)), v.complete();
                              },
                         })),
                         L(S).subscribe(s));
          })(i);
     };
}
function Gi(t, e, ...r) {
     if (e === !0) {
          t();
          return;
     }
     if (e === !1) return;
     let n = new Ve({
          next: () => {
               n.unsubscribe(), t();
          },
     });
     return L(e(...r)).subscribe(n);
}
function qi(...t) {
     let e = Se(t);
     return x((r, n) => {
          (e ? jt(t, r, e) : jt(t, r)).subscribe(n);
     });
}
function X(t, e) {
     return x((r, n) => {
          let o = null,
               i = 0,
               s = !1,
               a = () => s && !o && n.complete();
          r.subscribe(
               _(
                    n,
                    (u) => {
                         o?.unsubscribe();
                         let c = 0,
                              l = i++;
                         L(t(u, l)).subscribe(
                              (o = _(
                                   n,
                                   (d) => n.next(e ? e(u, d, l, c++) : d),
                                   () => {
                                        (o = null), a();
                                   }
                              ))
                         );
                    },
                    () => {
                         (s = !0), a();
                    }
               )
          );
     });
}
function to(t) {
     return x((e, r) => {
          L(t).subscribe(_(r, () => r.complete(), Tn)), !r.closed && e.subscribe(r);
     });
}
function W(t, e, r) {
     let n = M(t) || e || r ? { next: t, error: e, complete: r } : t;
     return n
          ? x((o, i) => {
                 var s;
                 (s = n.subscribe) === null || s === void 0 || s.call(n);
                 let a = !0;
                 o.subscribe(
                      _(
                           i,
                           (u) => {
                                var c;
                                (c = n.next) === null || c === void 0 || c.call(n, u), i.next(u);
                           },
                           () => {
                                var u;
                                (a = !1), (u = n.complete) === null || u === void 0 || u.call(n), i.complete();
                           },
                           (u) => {
                                var c;
                                (a = !1), (c = n.error) === null || c === void 0 || c.call(n, u), i.error(u);
                           },
                           () => {
                                var u, c;
                                a && ((u = n.unsubscribe) === null || u === void 0 || u.call(n)),
                                     (c = n.finalize) === null || c === void 0 || c.call(n);
                           }
                      )
                 );
            })
          : te;
}
function k(t) {
     for (let e in t) if (t[e] === k) return e;
     throw Error('Could not find renamed property on target object.');
}
function no(t, e) {
     for (let r in e) e.hasOwnProperty(r) && !t.hasOwnProperty(r) && (t[r] = e[r]);
}
function oe(t) {
     if (typeof t == 'string') return t;
     if (Array.isArray(t)) return '[' + t.map(oe).join(', ') + ']';
     if (t == null) return '' + t;
     if (t.overriddenName) return `${t.overriddenName}`;
     if (t.name) return `${t.name}`;
     let e = t.toString();
     if (e == null) return '' + e;
     let r = e.indexOf(`
`);
     return r === -1 ? e : e.substring(0, r);
}
function xc(t, e) {
     return t == null || t === '' ? (e === null ? '' : e) : e == null || e === '' ? t : t + ' ' + e;
}
var xp = k({ __forward_ref__: k });
function ll(t) {
     return (
          (t.__forward_ref__ = ll),
          (t.toString = function () {
               return oe(this());
          }),
          t
     );
}
function re(t) {
     return dl(t) ? t() : t;
}
function dl(t) {
     return typeof t == 'function' && t.hasOwnProperty(xp) && t.__forward_ref__ === ll;
}
function fl(t) {
     return t && !!t.ɵproviders;
}
var hl = 'https://g.co/ng/security#xss',
     y = class extends Error {
          constructor(e, r) {
               super(Ro(e, r)), (this.code = e);
          }
     };
function Ro(t, e) {
     return `${`NG0${Math.abs(t)}`}${e ? ': ' + e : ''}`;
}
var _p = k({ ɵcmp: k }),
     Ap = k({ ɵdir: k }),
     Np = k({ ɵpipe: k }),
     Rp = k({ ɵmod: k }),
     fo = k({ ɵfac: k }),
     _n = k({ __NG_ELEMENT_ID__: k }),
     _c = k({ __NG_ENV_ID__: k });
function Js(t) {
     return typeof t == 'string' ? t : t == null ? '' : String(t);
}
function Op(t) {
     return typeof t == 'function'
          ? t.name || t.toString()
          : typeof t == 'object' && t != null && typeof t.type == 'function'
          ? t.type.name || t.type.toString()
          : Js(t);
}
function Pp(t, e) {
     let r = e ? `. Dependency path: ${e.join(' > ')} > ${t}` : '';
     throw new y(-200, `Circular dependency in DI detected for ${t}${r}`);
}
function Xs(t, e) {
     let r = e ? ` in ${e}` : '';
     throw new y(-201, !1);
}
function Fp(t, e) {
     t == null && kp(e, t, null, '!=');
}
function kp(t, e, r, n) {
     throw new Error(`ASSERTION ERROR: ${t}` + (n == null ? '' : ` [Expected=> ${r} ${n} ${e} <=Actual]`));
}
function w(t) {
     return { token: t.token, providedIn: t.providedIn || null, factory: t.factory, value: void 0 };
}
function It(t) {
     return { providers: t.providers || [], imports: t.imports || [] };
}
function Oo(t) {
     return Ac(t, gl) || Ac(t, ml);
}
function pl(t) {
     return Oo(t) !== null;
}
function Ac(t, e) {
     return t.hasOwnProperty(e) ? t[e] : null;
}
function Lp(t) {
     let e = t && (t[gl] || t[ml]);
     return e || null;
}
function Nc(t) {
     return t && (t.hasOwnProperty(Rc) || t.hasOwnProperty(jp)) ? t[Rc] : null;
}
var gl = k({ ɵprov: k }),
     Rc = k({ ɵinj: k }),
     ml = k({ ngInjectableDef: k }),
     jp = k({ ngInjectorDef: k }),
     A = (function (t) {
          return (
               (t[(t.Default = 0)] = 'Default'),
               (t[(t.Host = 1)] = 'Host'),
               (t[(t.Self = 2)] = 'Self'),
               (t[(t.SkipSelf = 4)] = 'SkipSelf'),
               (t[(t.Optional = 8)] = 'Optional'),
               t
          );
     })(A || {}),
     cs;
function vl() {
     return cs;
}
function fe(t) {
     let e = cs;
     return (cs = t), e;
}
function yl(t, e, r) {
     let n = Oo(t);
     if (n && n.providedIn == 'root') return n.value === void 0 ? (n.value = n.factory()) : n.value;
     if (r & A.Optional) return null;
     if (e !== void 0) return e;
     Xs(oe(t), 'Injector');
}
var An = globalThis;
var E = class {
     constructor(e, r) {
          (this._desc = e),
               (this.ngMetadataName = 'InjectionToken'),
               (this.ɵprov = void 0),
               typeof r == 'number'
                    ? (this.__NG_ELEMENT_ID__ = r)
                    : r !== void 0 &&
                      (this.ɵprov = w({ token: this, providedIn: r.providedIn || 'root', factory: r.factory }));
     }
     get multi() {
          return this;
     }
     toString() {
          return `InjectionToken ${this._desc}`;
     }
};
var Vp = {},
     Nn = Vp,
     ls = '__NG_DI_FLAG__',
     ho = 'ngTempTokenPath',
     $p = 'ngTokenPath',
     Up = /\n/gm,
     Bp = '\u0275',
     Oc = '__source',
     zt;
function Hp() {
     return zt;
}
function Xe(t) {
     let e = zt;
     return (zt = t), e;
}
function zp(t, e = A.Default) {
     if (zt === void 0) throw new y(-203, !1);
     return zt === null ? yl(t, void 0, e) : zt.get(t, e & A.Optional ? null : void 0, e);
}
function D(t, e = A.Default) {
     return (vl() || zp)(re(t), e);
}
function p(t, e = A.Default) {
     return D(t, Po(e));
}
function Po(t) {
     return typeof t > 'u' || typeof t == 'number'
          ? t
          : 0 | (t.optional && 8) | (t.host && 1) | (t.self && 2) | (t.skipSelf && 4);
}
function ds(t) {
     let e = [];
     for (let r = 0; r < t.length; r++) {
          let n = re(t[r]);
          if (Array.isArray(n)) {
               if (n.length === 0) throw new y(900, !1);
               let o,
                    i = A.Default;
               for (let s = 0; s < n.length; s++) {
                    let a = n[s],
                         u = Wp(a);
                    typeof u == 'number' ? (u === -1 ? (o = a.token) : (i |= u)) : (o = a);
               }
               e.push(D(o, i));
          } else e.push(D(n));
     }
     return e;
}
function Dl(t, e) {
     return (t[ls] = e), (t.prototype[ls] = e), t;
}
function Wp(t) {
     return t[ls];
}
function Gp(t, e, r, n) {
     let o = t[ho];
     throw (
          (e[Oc] && o.unshift(e[Oc]),
          (t.message = qp(
               `
` + t.message,
               o,
               r,
               n
          )),
          (t[$p] = o),
          (t[ho] = null),
          t)
     );
}
function qp(t, e, r, n = null) {
     t =
          t &&
          t.charAt(0) ===
               `
` &&
          t.charAt(1) == Bp
               ? t.slice(2)
               : t;
     let o = oe(e);
     if (Array.isArray(e)) o = e.map(oe).join(' -> ');
     else if (typeof e == 'object') {
          let i = [];
          for (let s in e)
               if (e.hasOwnProperty(s)) {
                    let a = e[s];
                    i.push(s + ':' + (typeof a == 'string' ? JSON.stringify(a) : oe(a)));
               }
          o = `{${i.join(', ')}}`;
     }
     return `${r}${n ? '(' + n + ')' : ''}[${o}]: ${t.replace(
          Up,
          `
  `
     )}`;
}
function $n(t) {
     return { toString: t }.toString();
}
var wl = (function (t) {
          return (t[(t.OnPush = 0)] = 'OnPush'), (t[(t.Default = 1)] = 'Default'), t;
     })(wl || {}),
     Ae = (function (t) {
          return (
               (t[(t.Emulated = 0)] = 'Emulated'), (t[(t.None = 2)] = 'None'), (t[(t.ShadowDom = 3)] = 'ShadowDom'), t
          );
     })(Ae || {}),
     Gt = {},
     he = [];
function Cl(t, e, r) {
     let n = t.length;
     for (;;) {
          let o = t.indexOf(e, r);
          if (o === -1) return o;
          if (o === 0 || t.charCodeAt(o - 1) <= 32) {
               let i = e.length;
               if (o + i === n || t.charCodeAt(o + i) <= 32) return o;
          }
          r = o + 1;
     }
}
function fs(t, e, r) {
     let n = 0;
     for (; n < r.length; ) {
          let o = r[n];
          if (typeof o == 'number') {
               if (o !== 0) break;
               n++;
               let i = r[n++],
                    s = r[n++],
                    a = r[n++];
               t.setAttribute(e, s, a, i);
          } else {
               let i = o,
                    s = r[++n];
               Yp(i) ? t.setProperty(e, i, s) : t.setAttribute(e, i, s), n++;
          }
     }
     return n;
}
function Zp(t) {
     return t === 3 || t === 4 || t === 6;
}
function Yp(t) {
     return t.charCodeAt(0) === 64;
}
function Rn(t, e) {
     if (!(e === null || e.length === 0))
          if (t === null || t.length === 0) t = e.slice();
          else {
               let r = -1;
               for (let n = 0; n < e.length; n++) {
                    let o = e[n];
                    typeof o == 'number'
                         ? (r = o)
                         : r === 0 || (r === -1 || r === 2 ? Pc(t, r, o, null, e[++n]) : Pc(t, r, o, null, null));
               }
          }
     return t;
}
function Pc(t, e, r, n, o) {
     let i = 0,
          s = t.length;
     if (e === -1) s = -1;
     else
          for (; i < t.length; ) {
               let a = t[i++];
               if (typeof a == 'number') {
                    if (a === e) {
                         s = -1;
                         break;
                    } else if (a > e) {
                         s = i - 1;
                         break;
                    }
               }
          }
     for (; i < t.length; ) {
          let a = t[i];
          if (typeof a == 'number') break;
          if (a === r) {
               if (n === null) {
                    o !== null && (t[i + 1] = o);
                    return;
               } else if (n === t[i + 1]) {
                    t[i + 2] = o;
                    return;
               }
          }
          i++, n !== null && i++, o !== null && i++;
     }
     s !== -1 && (t.splice(s, 0, e), (i = s + 1)),
          t.splice(i++, 0, r),
          n !== null && t.splice(i++, 0, n),
          o !== null && t.splice(i++, 0, o);
}
var El = 'ng-template';
function Qp(t, e, r) {
     let n = 0,
          o = !0;
     for (; n < t.length; ) {
          let i = t[n++];
          if (typeof i == 'string' && o) {
               let s = t[n++];
               if (r && i === 'class' && Cl(s.toLowerCase(), e, 0) !== -1) return !0;
          } else if (i === 1) {
               for (; n < t.length && typeof (i = t[n++]) == 'string'; ) if (i.toLowerCase() === e) return !0;
               return !1;
          } else typeof i == 'number' && (o = !1);
     }
     return !1;
}
function Il(t) {
     return t.type === 4 && t.value !== El;
}
function Kp(t, e, r) {
     let n = t.type === 4 && !r ? El : t.value;
     return e === n;
}
function Jp(t, e, r) {
     let n = 4,
          o = t.attrs || [],
          i = tg(o),
          s = !1;
     for (let a = 0; a < e.length; a++) {
          let u = e[a];
          if (typeof u == 'number') {
               if (!s && !ve(n) && !ve(u)) return !1;
               if (s && ve(u)) continue;
               (s = !1), (n = u | (n & 1));
               continue;
          }
          if (!s)
               if (n & 4) {
                    if (((n = 2 | (n & 1)), (u !== '' && !Kp(t, u, r)) || (u === '' && e.length === 1))) {
                         if (ve(n)) return !1;
                         s = !0;
                    }
               } else {
                    let c = n & 8 ? u : e[++a];
                    if (n & 8 && t.attrs !== null) {
                         if (!Qp(t.attrs, c, r)) {
                              if (ve(n)) return !1;
                              s = !0;
                         }
                         continue;
                    }
                    let l = n & 8 ? 'class' : u,
                         d = Xp(l, o, Il(t), r);
                    if (d === -1) {
                         if (ve(n)) return !1;
                         s = !0;
                         continue;
                    }
                    if (c !== '') {
                         let f;
                         d > i ? (f = '') : (f = o[d + 1].toLowerCase());
                         let h = n & 8 ? f : null;
                         if ((h && Cl(h, c, 0) !== -1) || (n & 2 && c !== f)) {
                              if (ve(n)) return !1;
                              s = !0;
                         }
                    }
               }
     }
     return ve(n) || s;
}
function ve(t) {
     return (t & 1) === 0;
}
function Xp(t, e, r, n) {
     if (e === null) return -1;
     let o = 0;
     if (n || !r) {
          let i = !1;
          for (; o < e.length; ) {
               let s = e[o];
               if (s === t) return o;
               if (s === 3 || s === 6) i = !0;
               else if (s === 1 || s === 2) {
                    let a = e[++o];
                    for (; typeof a == 'string'; ) a = e[++o];
                    continue;
               } else {
                    if (s === 4) break;
                    if (s === 0) {
                         o += 4;
                         continue;
                    }
               }
               o += i ? 1 : 2;
          }
          return -1;
     } else return ng(e, t);
}
function eg(t, e, r = !1) {
     for (let n = 0; n < e.length; n++) if (Jp(t, e[n], r)) return !0;
     return !1;
}
function tg(t) {
     for (let e = 0; e < t.length; e++) {
          let r = t[e];
          if (Zp(r)) return e;
     }
     return t.length;
}
function ng(t, e) {
     let r = t.indexOf(4);
     if (r > -1)
          for (r++; r < t.length; ) {
               let n = t[r];
               if (typeof n == 'number') return -1;
               if (n === e) return r;
               r++;
          }
     return -1;
}
function Fc(t, e) {
     return t ? ':not(' + e.trim() + ')' : e;
}
function rg(t) {
     let e = t[0],
          r = 1,
          n = 2,
          o = '',
          i = !1;
     for (; r < t.length; ) {
          let s = t[r];
          if (typeof s == 'string')
               if (n & 2) {
                    let a = t[++r];
                    o += '[' + s + (a.length > 0 ? '="' + a + '"' : '') + ']';
               } else n & 8 ? (o += '.' + s) : n & 4 && (o += ' ' + s);
          else o !== '' && !ve(s) && ((e += Fc(i, o)), (o = '')), (n = s), (i = i || !ve(n));
          r++;
     }
     return o !== '' && (e += Fc(i, o)), e;
}
function og(t) {
     return t.map(rg).join(',');
}
function ig(t) {
     let e = [],
          r = [],
          n = 1,
          o = 2;
     for (; n < t.length; ) {
          let i = t[n];
          if (typeof i == 'string') o === 2 ? i !== '' && e.push(i, t[++n]) : o === 8 && r.push(i);
          else {
               if (!ve(o)) break;
               o = i;
          }
          n++;
     }
     return { attrs: e, classes: r };
}
function bl(t) {
     return $n(() => {
          let e = _l(t),
               r = H(m({}, e), {
                    decls: t.decls,
                    vars: t.vars,
                    template: t.template,
                    consts: t.consts || null,
                    ngContentSelectors: t.ngContentSelectors,
                    onPush: t.changeDetection === wl.OnPush,
                    directiveDefs: null,
                    pipeDefs: null,
                    dependencies: (e.standalone && t.dependencies) || null,
                    getStandaloneInjector: null,
                    signals: t.signals ?? !1,
                    data: t.data || {},
                    encapsulation: t.encapsulation || Ae.Emulated,
                    styles: t.styles || he,
                    _: null,
                    schemas: t.schemas || null,
                    tView: null,
                    id: '',
               });
          Al(r);
          let n = t.dependencies;
          return (r.directiveDefs = Lc(n, !1)), (r.pipeDefs = Lc(n, !0)), (r.id = ug(r)), r;
     });
}
function sg(t) {
     return nt(t) || Ml(t);
}
function ag(t) {
     return t !== null;
}
function bt(t) {
     return $n(() => ({
          type: t.type,
          bootstrap: t.bootstrap || he,
          declarations: t.declarations || he,
          imports: t.imports || he,
          exports: t.exports || he,
          transitiveCompileScopes: null,
          schemas: t.schemas || null,
          id: t.id || null,
     }));
}
function kc(t, e) {
     if (t == null) return Gt;
     let r = {};
     for (let n in t)
          if (t.hasOwnProperty(n)) {
               let o = t[n],
                    i = o;
               Array.isArray(o) && ((i = o[1]), (o = o[0])), (r[o] = n), e && (e[o] = i);
          }
     return r;
}
function Un(t) {
     return $n(() => {
          let e = _l(t);
          return Al(e), e;
     });
}
function nt(t) {
     return t[_p] || null;
}
function Ml(t) {
     return t[Ap] || null;
}
function Sl(t) {
     return t[Np] || null;
}
function Tl(t) {
     let e = nt(t) || Ml(t) || Sl(t);
     return e !== null ? e.standalone : !1;
}
function xl(t, e) {
     let r = t[Rp] || null;
     if (!r && e === !0) throw new Error(`Type ${oe(t)} does not have '\u0275mod' property.`);
     return r;
}
function _l(t) {
     let e = {};
     return {
          type: t.type,
          providersResolver: null,
          factory: null,
          hostBindings: t.hostBindings || null,
          hostVars: t.hostVars || 0,
          hostAttrs: t.hostAttrs || null,
          contentQueries: t.contentQueries || null,
          declaredInputs: e,
          inputTransforms: null,
          inputConfig: t.inputs || Gt,
          exportAs: t.exportAs || null,
          standalone: t.standalone === !0,
          signals: t.signals === !0,
          selectors: t.selectors || he,
          viewQuery: t.viewQuery || null,
          features: t.features || null,
          setInput: null,
          findHostDirectiveDefs: null,
          hostDirectives: null,
          inputs: kc(t.inputs, e),
          outputs: kc(t.outputs),
          debugInfo: null,
     };
}
function Al(t) {
     t.features?.forEach((e) => e(t));
}
function Lc(t, e) {
     if (!t) return null;
     let r = e ? Sl : sg;
     return () => (typeof t == 'function' ? t() : t).map((n) => r(n)).filter(ag);
}
function ug(t) {
     let e = 0,
          r = [
               t.selectors,
               t.ngContentSelectors,
               t.hostVars,
               t.hostAttrs,
               t.consts,
               t.vars,
               t.decls,
               t.encapsulation,
               t.standalone,
               t.signals,
               t.exportAs,
               JSON.stringify(t.inputs),
               JSON.stringify(t.outputs),
               Object.getOwnPropertyNames(t.type.prototype),
               !!t.contentQueries,
               !!t.viewQuery,
          ].join('|');
     for (let o of r) e = (Math.imul(31, e) + o.charCodeAt(0)) << 0;
     return (e += 2147483647 + 1), 'c' + e;
}
var ze = 0,
     N = 1,
     b = 2,
     G = 3,
     De = 4,
     Ce = 5,
     hs = 6,
     On = 7,
     pe = 8,
     qt = 9,
     Zt = 10,
     Y = 11,
     Pn = 12,
     jc = 13,
     rn = 14,
     Ne = 15,
     Fo = 16,
     $t = 17,
     Fn = 18,
     ko = 19,
     Nl = 20,
     et = 21,
     Zi = 22,
     vt = 23,
     Re = 25,
     Rl = 1;
var yt = 7,
     po = 8,
     go = 9,
     le = 10,
     Yt = (function (t) {
          return (
               (t[(t.None = 0)] = 'None'),
               (t[(t.HasTransplantedViews = 2)] = 'HasTransplantedViews'),
               (t[(t.HasChildViewsToRefresh = 4)] = 'HasChildViewsToRefresh'),
               t
          );
     })(Yt || {});
function tt(t) {
     return Array.isArray(t) && typeof t[Rl] == 'object';
}
function we(t) {
     return Array.isArray(t) && t[Rl] === !0;
}
function Ol(t) {
     return (t.flags & 4) !== 0;
}
function Lo(t) {
     return t.componentOffset > -1;
}
function ea(t) {
     return (t.flags & 1) === 1;
}
function rt(t) {
     return !!t.template;
}
function cg(t) {
     return (t[b] & 512) !== 0;
}
function Qt(t, e) {
     let r = t.hasOwnProperty(fo);
     return r ? t[fo] : null;
}
var ps = class {
     constructor(e, r, n) {
          (this.previousValue = e), (this.currentValue = r), (this.firstChange = n);
     }
     isFirstChange() {
          return this.firstChange;
     }
};
function Bn() {
     return Pl;
}
function Pl(t) {
     return t.type.prototype.ngOnChanges && (t.setInput = dg), lg;
}
Bn.ngInherit = !0;
function lg() {
     let t = kl(this),
          e = t?.current;
     if (e) {
          let r = t.previous;
          if (r === Gt) t.previous = e;
          else for (let n in e) r[n] = e[n];
          (t.current = null), this.ngOnChanges(e);
     }
}
function dg(t, e, r, n) {
     let o = this.declaredInputs[r],
          i = kl(t) || fg(t, { previous: Gt, current: null }),
          s = i.current || (i.current = {}),
          a = i.previous,
          u = a[o];
     (s[o] = new ps(u && u.currentValue, e, a === Gt)), (t[n] = e);
}
var Fl = '__ngSimpleChanges__';
function kl(t) {
     return t[Fl] || null;
}
function fg(t, e) {
     return (t[Fl] = e);
}
var Vc = null;
var xe = function (t, e, r) {
          Vc?.(t, e, r);
     },
     hg = 'svg',
     pg = 'math';
function Oe(t) {
     for (; Array.isArray(t); ) t = t[ze];
     return t;
}
function Ll(t, e) {
     return Oe(e[t]);
}
function Ee(t, e) {
     return Oe(e[t.index]);
}
function ta(t, e) {
     return t.data[e];
}
function it(t, e) {
     let r = e[t];
     return tt(r) ? r : r[ze];
}
function na(t) {
     return (t[b] & 128) === 128;
}
function gg(t) {
     return we(t[G]);
}
function mo(t, e) {
     return e == null ? null : t[e];
}
function jl(t) {
     t[$t] = 0;
}
function mg(t) {
     t[b] & 1024 || ((t[b] |= 1024), na(t) && jo(t));
}
function vg(t, e) {
     for (; t > 0; ) (e = e[rn]), t--;
     return e;
}
function Vl(t) {
     t[b] & 9216 && jo(t);
}
function jo(t) {
     let e = t[G];
     for (; e !== null && !((we(e) && e[b] & Yt.HasChildViewsToRefresh) || (tt(e) && e[b] & 8192)); ) {
          if (we(e)) e[b] |= Yt.HasChildViewsToRefresh;
          else if (((e[b] |= 8192), !na(e))) break;
          e = e[G];
     }
}
function $l(t, e) {
     if ((t[b] & 256) === 256) throw new y(911, !1);
     t[et] === null && (t[et] = []), t[et].push(e);
}
function yg(t, e) {
     if (t[et] === null) return;
     let r = t[et].indexOf(e);
     r !== -1 && t[et].splice(r, 1);
}
var P = { lFrame: ql(null), bindingsEnabled: !0, skipHydrationRootTNode: null };
function Dg() {
     return P.lFrame.elementDepthCount;
}
function wg() {
     P.lFrame.elementDepthCount++;
}
function Cg() {
     P.lFrame.elementDepthCount--;
}
function Ul() {
     return P.bindingsEnabled;
}
function Eg() {
     return P.skipHydrationRootTNode !== null;
}
function Ig(t) {
     return P.skipHydrationRootTNode === t;
}
function bg() {
     P.skipHydrationRootTNode = null;
}
function U() {
     return P.lFrame.lView;
}
function Ie() {
     return P.lFrame.tView;
}
function be() {
     let t = Bl();
     for (; t !== null && t.type === 64; ) t = t.parent;
     return t;
}
function Bl() {
     return P.lFrame.currentTNode;
}
function Mg() {
     let t = P.lFrame,
          e = t.currentTNode;
     return t.isParent ? e : e.parent;
}
function Hn(t, e) {
     let r = P.lFrame;
     (r.currentTNode = t), (r.isParent = e);
}
function Hl() {
     return P.lFrame.isParent;
}
function Sg() {
     P.lFrame.isParent = !1;
}
function Tg() {
     let t = P.lFrame,
          e = t.bindingRootIndex;
     return e === -1 && (e = t.bindingRootIndex = t.tView.bindingStartIndex), e;
}
function xg(t) {
     return (P.lFrame.bindingIndex = t);
}
function ra() {
     return P.lFrame.bindingIndex++;
}
function _g(t) {
     let e = P.lFrame,
          r = e.bindingIndex;
     return (e.bindingIndex = e.bindingIndex + t), r;
}
function Ag() {
     return P.lFrame.inI18n;
}
function Ng(t, e) {
     let r = P.lFrame;
     (r.bindingIndex = r.bindingRootIndex = t), gs(e);
}
function Rg() {
     return P.lFrame.currentDirectiveIndex;
}
function gs(t) {
     P.lFrame.currentDirectiveIndex = t;
}
function Og(t) {
     let e = P.lFrame.currentDirectiveIndex;
     return e === -1 ? null : t[e];
}
function zl(t) {
     P.lFrame.currentQueryIndex = t;
}
function Pg(t) {
     let e = t[N];
     return e.type === 2 ? e.declTNode : e.type === 1 ? t[Ce] : null;
}
function Wl(t, e, r) {
     if (r & A.SkipSelf) {
          let o = e,
               i = t;
          for (; (o = o.parent), o === null && !(r & A.Host); )
               if (((o = Pg(i)), o === null || ((i = i[rn]), o.type & 10))) break;
          if (o === null) return !1;
          (e = o), (t = i);
     }
     let n = (P.lFrame = Gl());
     return (n.currentTNode = e), (n.lView = t), !0;
}
function oa(t) {
     let e = Gl(),
          r = t[N];
     (P.lFrame = e),
          (e.currentTNode = r.firstChild),
          (e.lView = t),
          (e.tView = r),
          (e.contextLView = t),
          (e.bindingIndex = r.bindingStartIndex),
          (e.inI18n = !1);
}
function Gl() {
     let t = P.lFrame,
          e = t === null ? null : t.child;
     return e === null ? ql(t) : e;
}
function ql(t) {
     let e = {
          currentTNode: null,
          isParent: !0,
          lView: null,
          tView: null,
          selectedIndex: -1,
          contextLView: null,
          elementDepthCount: 0,
          currentNamespace: null,
          currentDirectiveIndex: -1,
          bindingRootIndex: -1,
          bindingIndex: -1,
          currentQueryIndex: 0,
          parent: t,
          child: null,
          inI18n: !1,
     };
     return t !== null && (t.child = e), e;
}
function Zl() {
     let t = P.lFrame;
     return (P.lFrame = t.parent), (t.currentTNode = null), (t.lView = null), t;
}
var Yl = Zl;
function ia() {
     let t = Zl();
     (t.isParent = !0),
          (t.tView = null),
          (t.selectedIndex = -1),
          (t.contextLView = null),
          (t.elementDepthCount = 0),
          (t.currentDirectiveIndex = -1),
          (t.currentNamespace = null),
          (t.bindingRootIndex = -1),
          (t.bindingIndex = -1),
          (t.currentQueryIndex = 0);
}
function Fg(t) {
     return (P.lFrame.contextLView = vg(t, P.lFrame.contextLView))[pe];
}
function on() {
     return P.lFrame.selectedIndex;
}
function Dt(t) {
     P.lFrame.selectedIndex = t;
}
function Ql() {
     let t = P.lFrame;
     return ta(t.tView, t.selectedIndex);
}
function kg() {
     return P.lFrame.currentNamespace;
}
var Kl = !0;
function sa() {
     return Kl;
}
function aa(t) {
     Kl = t;
}
function Lg(t, e, r) {
     let { ngOnChanges: n, ngOnInit: o, ngDoCheck: i } = e.type.prototype;
     if (n) {
          let s = Pl(e);
          (r.preOrderHooks ??= []).push(t, s), (r.preOrderCheckHooks ??= []).push(t, s);
     }
     o && (r.preOrderHooks ??= []).push(0 - t, o),
          i && ((r.preOrderHooks ??= []).push(t, i), (r.preOrderCheckHooks ??= []).push(t, i));
}
function ua(t, e) {
     for (let r = e.directiveStart, n = e.directiveEnd; r < n; r++) {
          let i = t.data[r].type.prototype,
               {
                    ngAfterContentInit: s,
                    ngAfterContentChecked: a,
                    ngAfterViewInit: u,
                    ngAfterViewChecked: c,
                    ngOnDestroy: l,
               } = i;
          s && (t.contentHooks ??= []).push(-r, s),
               a && ((t.contentHooks ??= []).push(r, a), (t.contentCheckHooks ??= []).push(r, a)),
               u && (t.viewHooks ??= []).push(-r, u),
               c && ((t.viewHooks ??= []).push(r, c), (t.viewCheckHooks ??= []).push(r, c)),
               l != null && (t.destroyHooks ??= []).push(r, l);
     }
}
function so(t, e, r) {
     Jl(t, e, 3, r);
}
function ao(t, e, r, n) {
     (t[b] & 3) === r && Jl(t, e, r, n);
}
function Yi(t, e) {
     let r = t[b];
     (r & 3) === e && ((r &= 16383), (r += 1), (t[b] = r));
}
function Jl(t, e, r, n) {
     let o = n !== void 0 ? t[$t] & 65535 : 0,
          i = n ?? -1,
          s = e.length - 1,
          a = 0;
     for (let u = o; u < s; u++)
          if (typeof e[u + 1] == 'number') {
               if (((a = e[u]), n != null && a >= n)) break;
          } else
               e[u] < 0 && (t[$t] += 65536),
                    (a < i || i == -1) && (jg(t, r, e, u), (t[$t] = (t[$t] & 4294901760) + u + 2)),
                    u++;
}
function $c(t, e) {
     xe(4, t, e);
     let r = ee(null);
     try {
          e.call(t);
     } finally {
          ee(r), xe(5, t, e);
     }
}
function jg(t, e, r, n) {
     let o = r[n] < 0,
          i = r[n + 1],
          s = o ? -r[n] : r[n],
          a = t[s];
     o ? t[b] >> 14 < t[$t] >> 16 && (t[b] & 3) === e && ((t[b] += 16384), $c(a, i)) : $c(a, i);
}
var Wt = -1,
     wt = class {
          constructor(e, r, n) {
               (this.factory = e), (this.resolving = !1), (this.canSeeViewProviders = r), (this.injectImpl = n);
          }
     };
function Vg(t) {
     return t instanceof wt;
}
function $g(t) {
     return (t.flags & 8) !== 0;
}
function Ug(t) {
     return (t.flags & 16) !== 0;
}
function Xl(t) {
     return t !== Wt;
}
function vo(t) {
     let e = t & 32767;
     return t & 32767;
}
function Bg(t) {
     return t >> 16;
}
function yo(t, e) {
     let r = Bg(t),
          n = e;
     for (; r > 0; ) (n = n[rn]), r--;
     return n;
}
var ms = !0;
function Uc(t) {
     let e = ms;
     return (ms = t), e;
}
var Hg = 256,
     ed = Hg - 1,
     td = 5,
     zg = 0,
     _e = {};
function Wg(t, e, r) {
     let n;
     typeof r == 'string' ? (n = r.charCodeAt(0) || 0) : r.hasOwnProperty(_n) && (n = r[_n]),
          n == null && (n = r[_n] = zg++);
     let o = n & ed,
          i = 1 << o;
     e.data[t + (o >> td)] |= i;
}
function Do(t, e) {
     let r = nd(t, e);
     if (r !== -1) return r;
     let n = e[N];
     n.firstCreatePass && ((t.injectorIndex = e.length), Qi(n.data, t), Qi(e, null), Qi(n.blueprint, null));
     let o = ca(t, e),
          i = t.injectorIndex;
     if (Xl(o)) {
          let s = vo(o),
               a = yo(o, e),
               u = a[N].data;
          for (let c = 0; c < 8; c++) e[i + c] = a[s + c] | u[s + c];
     }
     return (e[i + 8] = o), i;
}
function Qi(t, e) {
     t.push(0, 0, 0, 0, 0, 0, 0, 0, e);
}
function nd(t, e) {
     return t.injectorIndex === -1 ||
          (t.parent && t.parent.injectorIndex === t.injectorIndex) ||
          e[t.injectorIndex + 8] === null
          ? -1
          : t.injectorIndex;
}
function ca(t, e) {
     if (t.parent && t.parent.injectorIndex !== -1) return t.parent.injectorIndex;
     let r = 0,
          n = null,
          o = e;
     for (; o !== null; ) {
          if (((n = ad(o)), n === null)) return Wt;
          if ((r++, (o = o[rn]), n.injectorIndex !== -1)) return n.injectorIndex | (r << 16);
     }
     return Wt;
}
function vs(t, e, r) {
     Wg(t, e, r);
}
function rd(t, e, r) {
     if (r & A.Optional || t !== void 0) return t;
     Xs(e, 'NodeInjector');
}
function od(t, e, r, n) {
     if ((r & A.Optional && n === void 0 && (n = null), !(r & (A.Self | A.Host)))) {
          let o = t[qt],
               i = fe(void 0);
          try {
               return o ? o.get(e, n, r & A.Optional) : yl(e, n, r & A.Optional);
          } finally {
               fe(i);
          }
     }
     return rd(n, e, r);
}
function id(t, e, r, n = A.Default, o) {
     if (t !== null) {
          if (e[b] & 2048 && !(n & A.Self)) {
               let s = Qg(t, e, r, n, _e);
               if (s !== _e) return s;
          }
          let i = sd(t, e, r, n, _e);
          if (i !== _e) return i;
     }
     return od(e, r, n, o);
}
function sd(t, e, r, n, o) {
     let i = Zg(r);
     if (typeof i == 'function') {
          if (!Wl(e, t, n)) return n & A.Host ? rd(o, r, n) : od(e, r, n, o);
          try {
               let s;
               if (((s = i(n)), s == null && !(n & A.Optional))) Xs(r);
               else return s;
          } finally {
               Yl();
          }
     } else if (typeof i == 'number') {
          let s = null,
               a = nd(t, e),
               u = Wt,
               c = n & A.Host ? e[Ne][Ce] : null;
          for (
               (a === -1 || n & A.SkipSelf) &&
               ((u = a === -1 ? ca(t, e) : e[a + 8]),
               u === Wt || !Hc(n, !1) ? (a = -1) : ((s = e[N]), (a = vo(u)), (e = yo(u, e))));
               a !== -1;

          ) {
               let l = e[N];
               if (Bc(i, a, l.data)) {
                    let d = Gg(a, e, r, s, n, c);
                    if (d !== _e) return d;
               }
               (u = e[a + 8]),
                    u !== Wt && Hc(n, e[N].data[a + 8] === c) && Bc(i, a, e)
                         ? ((s = l), (a = vo(u)), (e = yo(u, e)))
                         : (a = -1);
          }
     }
     return o;
}
function Gg(t, e, r, n, o, i) {
     let s = e[N],
          a = s.data[t + 8],
          u = n == null ? Lo(a) && ms : n != s && (a.type & 3) !== 0,
          c = o & A.Host && i === a,
          l = qg(a, s, r, u, c);
     return l !== null ? Kt(e, s, l, a) : _e;
}
function qg(t, e, r, n, o) {
     let i = t.providerIndexes,
          s = e.data,
          a = i & 1048575,
          u = t.directiveStart,
          c = t.directiveEnd,
          l = i >> 20,
          d = n ? a : a + l,
          f = o ? a + l : c;
     for (let h = d; h < f; h++) {
          let g = s[h];
          if ((h < u && r === g) || (h >= u && g.type === r)) return h;
     }
     if (o) {
          let h = s[u];
          if (h && rt(h) && h.type === r) return u;
     }
     return null;
}
function Kt(t, e, r, n) {
     let o = t[r],
          i = e.data;
     if (Vg(o)) {
          let s = o;
          s.resolving && Pp(Op(i[r]));
          let a = Uc(s.canSeeViewProviders);
          s.resolving = !0;
          let u,
               c = s.injectImpl ? fe(s.injectImpl) : null,
               l = Wl(t, n, A.Default);
          try {
               (o = t[r] = s.factory(void 0, i, t, n)), e.firstCreatePass && r >= n.directiveStart && Lg(r, i[r], e);
          } finally {
               c !== null && fe(c), Uc(a), (s.resolving = !1), Yl();
          }
     }
     return o;
}
function Zg(t) {
     if (typeof t == 'string') return t.charCodeAt(0) || 0;
     let e = t.hasOwnProperty(_n) ? t[_n] : void 0;
     return typeof e == 'number' ? (e >= 0 ? e & ed : Yg) : e;
}
function Bc(t, e, r) {
     let n = 1 << t;
     return !!(r[e + (t >> td)] & n);
}
function Hc(t, e) {
     return !(t & A.Self) && !(t & A.Host && e);
}
var mt = class {
     constructor(e, r) {
          (this._tNode = e), (this._lView = r);
     }
     get(e, r, n) {
          return id(this._tNode, this._lView, e, Po(n), r);
     }
};
function Yg() {
     return new mt(be(), U());
}
function la(t) {
     return $n(() => {
          let e = t.prototype.constructor,
               r = e[fo] || ys(e),
               n = Object.prototype,
               o = Object.getPrototypeOf(t.prototype).constructor;
          for (; o && o !== n; ) {
               let i = o[fo] || ys(o);
               if (i && i !== r) return i;
               o = Object.getPrototypeOf(o);
          }
          return (i) => new i();
     });
}
function ys(t) {
     return dl(t)
          ? () => {
                 let e = ys(re(t));
                 return e && e();
            }
          : Qt(t);
}
function Qg(t, e, r, n, o) {
     let i = t,
          s = e;
     for (; i !== null && s !== null && s[b] & 2048 && !(s[b] & 512); ) {
          let a = sd(i, s, r, n | A.Self, _e);
          if (a !== _e) return a;
          let u = i.parent;
          if (!u) {
               let c = s[Nl];
               if (c) {
                    let l = c.get(r, _e, n);
                    if (l !== _e) return l;
               }
               (u = ad(s)), (s = s[rn]);
          }
          i = u;
     }
     return o;
}
function ad(t) {
     let e = t[N],
          r = e.type;
     return r === 2 ? e.declTNode : r === 1 ? t[Ce] : null;
}
var ro = '__parameters__';
function Kg(t) {
     return function (...r) {
          if (t) {
               let n = t(...r);
               for (let o in n) this[o] = n[o];
          }
     };
}
function ud(t, e, r) {
     return $n(() => {
          let n = Kg(e);
          function o(...i) {
               if (this instanceof o) return n.apply(this, i), this;
               let s = new o(...i);
               return (a.annotation = s), a;
               function a(u, c, l) {
                    let d = u.hasOwnProperty(ro) ? u[ro] : Object.defineProperty(u, ro, { value: [] })[ro];
                    for (; d.length <= l; ) d.push(null);
                    return (d[l] = d[l] || []).push(s), u;
               }
          }
          return (
               r && (o.prototype = Object.create(r.prototype)),
               (o.prototype.ngMetadataName = t),
               (o.annotationCls = o),
               o
          );
     });
}
function Jg(t) {
     return typeof t == 'function';
}
function da(t, e) {
     t.forEach((r) => (Array.isArray(r) ? da(r, e) : e(r)));
}
function cd(t, e, r) {
     e >= t.length ? t.push(r) : t.splice(e, 0, r);
}
function wo(t, e) {
     return e >= t.length - 1 ? t.pop() : t.splice(e, 1)[0];
}
function Xg(t, e) {
     let r = [];
     for (let n = 0; n < t; n++) r.push(e);
     return r;
}
function em(t, e, r, n) {
     let o = t.length;
     if (o == e) t.push(r, n);
     else if (o === 1) t.push(n, t[0]), (t[0] = r);
     else {
          for (o--, t.push(t[o - 1], t[o]); o > e; ) {
               let i = o - 2;
               (t[o] = t[i]), o--;
          }
          (t[e] = r), (t[e + 1] = n);
     }
}
function tm(t, e, r) {
     let n = zn(t, e);
     return n >= 0 ? (t[n | 1] = r) : ((n = ~n), em(t, n, e, r)), n;
}
function Ki(t, e) {
     let r = zn(t, e);
     if (r >= 0) return t[r | 1];
}
function zn(t, e) {
     return nm(t, e, 1);
}
function nm(t, e, r) {
     let n = 0,
          o = t.length >> r;
     for (; o !== n; ) {
          let i = n + ((o - n) >> 1),
               s = t[i << r];
          if (e === s) return i << r;
          s > e ? (o = i) : (n = i + 1);
     }
     return ~(o << r);
}
var Wn = Dl(ud('Optional'), 8);
var Vo = Dl(ud('SkipSelf'), 4);
var Gn = new E('ENVIRONMENT_INITIALIZER'),
     ld = new E('INJECTOR', -1),
     dd = new E('INJECTOR_DEF_TYPES'),
     Co = class {
          get(e, r = Nn) {
               if (r === Nn) {
                    let n = new Error(`NullInjectorError: No provider for ${oe(e)}!`);
                    throw ((n.name = 'NullInjectorError'), n);
               }
               return r;
          }
     };
function sn(t) {
     return { ɵproviders: t };
}
function rm(...t) {
     return { ɵproviders: fd(!0, t), ɵfromNgModule: !0 };
}
function fd(t, ...e) {
     let r = [],
          n = new Set(),
          o,
          i = (s) => {
               r.push(s);
          };
     return (
          da(e, (s) => {
               let a = s;
               Ds(a, i, [], n) && ((o ||= []), o.push(a));
          }),
          o !== void 0 && hd(o, i),
          r
     );
}
function hd(t, e) {
     for (let r = 0; r < t.length; r++) {
          let { ngModule: n, providers: o } = t[r];
          fa(o, (i) => {
               e(i, n);
          });
     }
}
function Ds(t, e, r, n) {
     if (((t = re(t)), !t)) return !1;
     let o = null,
          i = Nc(t),
          s = !i && nt(t);
     if (!i && !s) {
          let u = t.ngModule;
          if (((i = Nc(u)), i)) o = u;
          else return !1;
     } else {
          if (s && !s.standalone) return !1;
          o = t;
     }
     let a = n.has(o);
     if (s) {
          if (a) return !1;
          if ((n.add(o), s.dependencies)) {
               let u = typeof s.dependencies == 'function' ? s.dependencies() : s.dependencies;
               for (let c of u) Ds(c, e, r, n);
          }
     } else if (i) {
          if (i.imports != null && !a) {
               n.add(o);
               let c;
               try {
                    da(i.imports, (l) => {
                         Ds(l, e, r, n) && ((c ||= []), c.push(l));
                    });
               } finally {
               }
               c !== void 0 && hd(c, e);
          }
          if (!a) {
               let c = Qt(o) || (() => new o());
               e({ provide: o, useFactory: c, deps: he }, o),
                    e({ provide: dd, useValue: o, multi: !0 }, o),
                    e({ provide: Gn, useValue: () => D(o), multi: !0 }, o);
          }
          let u = i.providers;
          if (u != null && !a) {
               let c = t;
               fa(u, (l) => {
                    e(l, c);
               });
          }
     } else return !1;
     return o !== t && t.providers !== void 0;
}
function fa(t, e) {
     for (let r of t) fl(r) && (r = r.ɵproviders), Array.isArray(r) ? fa(r, e) : e(r);
}
var om = k({ provide: String, useValue: k });
function pd(t) {
     return t !== null && typeof t == 'object' && om in t;
}
function im(t) {
     return !!(t && t.useExisting);
}
function sm(t) {
     return !!(t && t.useFactory);
}
function Jt(t) {
     return typeof t == 'function';
}
function am(t) {
     return !!t.useClass;
}
var $o = new E('Set Injector scope.'),
     uo = {},
     um = {},
     Ji;
function ha() {
     return Ji === void 0 && (Ji = new Co()), Ji;
}
var ie = class {},
     kn = class extends ie {
          get destroyed() {
               return this._destroyed;
          }
          constructor(e, r, n, o) {
               super(),
                    (this.parent = r),
                    (this.source = n),
                    (this.scopes = o),
                    (this.records = new Map()),
                    (this._ngOnDestroyHooks = new Set()),
                    (this._onDestroyHooks = []),
                    (this._destroyed = !1),
                    Cs(e, (s) => this.processProvider(s)),
                    this.records.set(ld, Ut(void 0, this)),
                    o.has('environment') && this.records.set(ie, Ut(void 0, this));
               let i = this.records.get($o);
               i != null && typeof i.value == 'string' && this.scopes.add(i.value),
                    (this.injectorDefTypes = new Set(this.get(dd, he, A.Self)));
          }
          destroy() {
               this.assertNotDestroyed(), (this._destroyed = !0);
               try {
                    for (let r of this._ngOnDestroyHooks) r.ngOnDestroy();
                    let e = this._onDestroyHooks;
                    this._onDestroyHooks = [];
                    for (let r of e) r();
               } finally {
                    this.records.clear(), this._ngOnDestroyHooks.clear(), this.injectorDefTypes.clear();
               }
          }
          onDestroy(e) {
               return this.assertNotDestroyed(), this._onDestroyHooks.push(e), () => this.removeOnDestroy(e);
          }
          runInContext(e) {
               this.assertNotDestroyed();
               let r = Xe(this),
                    n = fe(void 0),
                    o;
               try {
                    return e();
               } finally {
                    Xe(r), fe(n);
               }
          }
          get(e, r = Nn, n = A.Default) {
               if ((this.assertNotDestroyed(), e.hasOwnProperty(_c))) return e[_c](this);
               n = Po(n);
               let o,
                    i = Xe(this),
                    s = fe(void 0);
               try {
                    if (!(n & A.SkipSelf)) {
                         let u = this.records.get(e);
                         if (u === void 0) {
                              let c = hm(e) && Oo(e);
                              c && this.injectableDefInScope(c) ? (u = Ut(ws(e), uo)) : (u = null),
                                   this.records.set(e, u);
                         }
                         if (u != null) return this.hydrate(e, u);
                    }
                    let a = n & A.Self ? ha() : this.parent;
                    return (r = n & A.Optional && r === Nn ? null : r), a.get(e, r);
               } catch (a) {
                    if (a.name === 'NullInjectorError') {
                         if (((a[ho] = a[ho] || []).unshift(oe(e)), i)) throw a;
                         return Gp(a, e, 'R3InjectorError', this.source);
                    } else throw a;
               } finally {
                    fe(s), Xe(i);
               }
          }
          resolveInjectorInitializers() {
               let e = Xe(this),
                    r = fe(void 0),
                    n;
               try {
                    let o = this.get(Gn, he, A.Self);
                    for (let i of o) i();
               } finally {
                    Xe(e), fe(r);
               }
          }
          toString() {
               let e = [],
                    r = this.records;
               for (let n of r.keys()) e.push(oe(n));
               return `R3Injector[${e.join(', ')}]`;
          }
          assertNotDestroyed() {
               if (this._destroyed) throw new y(205, !1);
          }
          processProvider(e) {
               e = re(e);
               let r = Jt(e) ? e : re(e && e.provide),
                    n = lm(e);
               if (!Jt(e) && e.multi === !0) {
                    let o = this.records.get(r);
                    o || ((o = Ut(void 0, uo, !0)), (o.factory = () => ds(o.multi)), this.records.set(r, o)),
                         (r = e),
                         o.multi.push(e);
               } else {
                    let o = this.records.get(r);
               }
               this.records.set(r, n);
          }
          hydrate(e, r) {
               return (
                    r.value === uo && ((r.value = um), (r.value = r.factory())),
                    typeof r.value == 'object' && r.value && fm(r.value) && this._ngOnDestroyHooks.add(r.value),
                    r.value
               );
          }
          injectableDefInScope(e) {
               if (!e.providedIn) return !1;
               let r = re(e.providedIn);
               return typeof r == 'string' ? r === 'any' || this.scopes.has(r) : this.injectorDefTypes.has(r);
          }
          removeOnDestroy(e) {
               let r = this._onDestroyHooks.indexOf(e);
               r !== -1 && this._onDestroyHooks.splice(r, 1);
          }
     };
function ws(t) {
     let e = Oo(t),
          r = e !== null ? e.factory : Qt(t);
     if (r !== null) return r;
     if (t instanceof E) throw new y(204, !1);
     if (t instanceof Function) return cm(t);
     throw new y(204, !1);
}
function cm(t) {
     let e = t.length;
     if (e > 0) {
          let n = Xg(e, '?');
          throw new y(204, !1);
     }
     let r = Lp(t);
     return r !== null ? () => r.factory(t) : () => new t();
}
function lm(t) {
     if (pd(t)) return Ut(void 0, t.useValue);
     {
          let e = gd(t);
          return Ut(e, uo);
     }
}
function gd(t, e, r) {
     let n;
     if (Jt(t)) {
          let o = re(t);
          return Qt(o) || ws(o);
     } else if (pd(t)) n = () => re(t.useValue);
     else if (sm(t)) n = () => t.useFactory(...ds(t.deps || []));
     else if (im(t)) n = () => D(re(t.useExisting));
     else {
          let o = re(t && (t.useClass || t.provide));
          if (dm(t)) n = () => new o(...ds(t.deps));
          else return Qt(o) || ws(o);
     }
     return n;
}
function Ut(t, e, r = !1) {
     return { factory: t, value: e, multi: r ? [] : void 0 };
}
function dm(t) {
     return !!t.deps;
}
function fm(t) {
     return t !== null && typeof t == 'object' && typeof t.ngOnDestroy == 'function';
}
function hm(t) {
     return typeof t == 'function' || (typeof t == 'object' && t instanceof E);
}
function Cs(t, e) {
     for (let r of t) Array.isArray(r) ? Cs(r, e) : r && fl(r) ? Cs(r.ɵproviders, e) : e(r);
}
function md(t, e) {
     t instanceof kn && t.assertNotDestroyed();
     let r,
          n = Xe(t),
          o = fe(void 0);
     try {
          return e();
     } finally {
          Xe(n), fe(o);
     }
}
function pm(t) {
     if (!vl() && !Hp()) throw new y(-203, !1);
}
function zc(t, e = null, r = null, n) {
     let o = vd(t, e, r, n);
     return o.resolveInjectorInitializers(), o;
}
function vd(t, e = null, r = null, n, o = new Set()) {
     let i = [r || he, rm(t)];
     return (n = n || (typeof t == 'object' ? void 0 : oe(t))), new kn(i, e || ha(), n || null, o);
}
var Fe = (() => {
     let e = class e {
          static create(n, o) {
               if (Array.isArray(n)) return zc({ name: '' }, o, n, '');
               {
                    let i = n.name ?? '';
                    return zc({ name: i }, n.parent, n.providers, i);
               }
          }
     };
     (e.THROW_IF_NOT_FOUND = Nn),
          (e.NULL = new Co()),
          (e.ɵprov = w({ token: e, providedIn: 'any', factory: () => D(ld) })),
          (e.__NG_ELEMENT_ID__ = -1);
     let t = e;
     return t;
})();
var Es;
function yd(t) {
     Es = t;
}
function gm() {
     if (Es !== void 0) return Es;
     if (typeof document < 'u') return document;
     throw new y(210, !1);
}
var pa = new E('AppId', { providedIn: 'root', factory: () => mm }),
     mm = 'ng',
     ga = new E('Platform Initializer'),
     ke = new E('Platform ID', { providedIn: 'platform', factory: () => 'unknown' });
var zT = new E('AnimationModuleType'),
     ma = new E('CSP nonce', {
          providedIn: 'root',
          factory: () => gm().body?.querySelector('[ngCspNonce]')?.getAttribute('ngCspNonce') || null,
     }),
     va = {
          breakpoints: [16, 32, 48, 64, 96, 128, 256, 384, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
          disableImageSizeWarning: !1,
          disableImageLazyLoadWarning: !1,
     },
     Dd = new E('ImageConfig', { providedIn: 'root', factory: () => va });
function wd(t) {
     return t instanceof Function ? t() : t;
}
function vm(t) {
     return (t ?? p(Fe)).get(ke) === 'browser';
}
function Cd(t) {
     return (t.flags & 128) === 128;
}
var He = (function (t) {
     return (t[(t.Important = 1)] = 'Important'), (t[(t.DashCase = 2)] = 'DashCase'), t;
})(He || {});
var Ed = new Map(),
     ym = 0;
function Dm() {
     return ym++;
}
function wm(t) {
     Ed.set(t[ko], t);
}
function Cm(t) {
     Ed.delete(t[ko]);
}
var Wc = '__ngContext__';
function Ct(t, e) {
     tt(e) ? ((t[Wc] = e[ko]), wm(e)) : (t[Wc] = e);
}
var Em;
function ya(t, e) {
     return Em(t, e);
}
function Da(t) {
     let e = t[G];
     return we(e) ? e[G] : e;
}
function Id(t) {
     return Md(t[Pn]);
}
function bd(t) {
     return Md(t[De]);
}
function Md(t) {
     for (; t !== null && !we(t); ) t = t[De];
     return t;
}
function Bt(t, e, r, n, o) {
     if (n != null) {
          let i,
               s = !1;
          we(n) ? (i = n) : tt(n) && ((s = !0), (n = n[ze]));
          let a = Oe(n);
          t === 0 && r !== null
               ? o == null
                    ? xd(e, r, a)
                    : Io(e, r, a, o || null, !0)
               : t === 1 && r !== null
               ? Io(e, r, a, o || null, !0)
               : t === 2
               ? $m(e, a, s)
               : t === 3 && e.destroyNode(a),
               i != null && Bm(e, t, i, r, o);
     }
}
function Im(t, e) {
     return t.createText(e);
}
function bm(t, e, r) {
     t.setValue(e, r);
}
function Sd(t, e, r) {
     return t.createElement(e, r);
}
function Mm(t, e) {
     let r = e[Y];
     qn(t, e, r, 2, null, null), (e[ze] = null), (e[Ce] = null);
}
function Sm(t, e, r, n, o, i) {
     (n[ze] = o), (n[Ce] = e), qn(t, n, r, 1, o, i);
}
function Tm(t, e) {
     qn(t, e, e[Y], 2, null, null);
}
function xm(t) {
     let e = t[Pn];
     if (!e) return Xi(t[N], t);
     for (; e; ) {
          let r = null;
          if (tt(e)) r = e[Pn];
          else {
               let n = e[le];
               n && (r = n);
          }
          if (!r) {
               for (; e && !e[De] && e !== t; ) tt(e) && Xi(e[N], e), (e = e[G]);
               e === null && (e = t), tt(e) && Xi(e[N], e), (r = e && e[De]);
          }
          e = r;
     }
}
function _m(t, e, r, n) {
     let o = le + n,
          i = r.length;
     n > 0 && (r[o - 1][De] = e),
          n < i - le ? ((e[De] = r[o]), cd(r, le + n, e)) : (r.push(e), (e[De] = null)),
          (e[G] = r);
     let s = e[Fo];
     s !== null && r !== s && Am(s, e);
     let a = e[Fn];
     a !== null && a.insertView(t), Vl(e), (e[b] |= 128);
}
function Am(t, e) {
     let r = t[go],
          o = e[G][G][Ne];
     e[Ne] !== o && (t[b] |= Yt.HasTransplantedViews), r === null ? (t[go] = [e]) : r.push(e);
}
function Td(t, e) {
     let r = t[go],
          n = r.indexOf(e),
          o = e[G];
     r.splice(n, 1);
}
function Eo(t, e) {
     if (t.length <= le) return;
     let r = le + e,
          n = t[r];
     if (n) {
          let o = n[Fo];
          o !== null && o !== t && Td(o, n), e > 0 && (t[r - 1][De] = n[De]);
          let i = wo(t, le + e);
          Mm(n[N], n);
          let s = i[Fn];
          s !== null && s.detachView(i[N]), (n[G] = null), (n[De] = null), (n[b] &= -129);
     }
     return n;
}
function wa(t, e) {
     if (!(e[b] & 256)) {
          let r = e[Y];
          e[vt] && Qu(e[vt]), r.destroyNode && qn(t, e, r, 3, null, null), xm(e);
     }
}
function Xi(t, e) {
     if (!(e[b] & 256)) {
          (e[b] &= -129), (e[b] |= 256), Rm(t, e), Nm(t, e), e[N].type === 1 && e[Y].destroy();
          let r = e[Fo];
          if (r !== null && we(e[G])) {
               r !== e[G] && Td(r, e);
               let n = e[Fn];
               n !== null && n.detachView(t);
          }
          Cm(e);
     }
}
function Nm(t, e) {
     let r = t.cleanup,
          n = e[On];
     if (r !== null)
          for (let i = 0; i < r.length - 1; i += 2)
               if (typeof r[i] == 'string') {
                    let s = r[i + 3];
                    s >= 0 ? n[s]() : n[-s].unsubscribe(), (i += 2);
               } else {
                    let s = n[r[i + 1]];
                    r[i].call(s);
               }
     n !== null && (e[On] = null);
     let o = e[et];
     if (o !== null) {
          e[et] = null;
          for (let i = 0; i < o.length; i++) {
               let s = o[i];
               s();
          }
     }
}
function Rm(t, e) {
     let r;
     if (t != null && (r = t.destroyHooks) != null)
          for (let n = 0; n < r.length; n += 2) {
               let o = e[r[n]];
               if (!(o instanceof wt)) {
                    let i = r[n + 1];
                    if (Array.isArray(i))
                         for (let s = 0; s < i.length; s += 2) {
                              let a = o[i[s]],
                                   u = i[s + 1];
                              xe(4, a, u);
                              try {
                                   u.call(a);
                              } finally {
                                   xe(5, a, u);
                              }
                         }
                    else {
                         xe(4, o, i);
                         try {
                              i.call(o);
                         } finally {
                              xe(5, o, i);
                         }
                    }
               }
          }
}
function Om(t, e, r) {
     return Pm(t, e.parent, r);
}
function Pm(t, e, r) {
     let n = e;
     for (; n !== null && n.type & 40; ) (e = n), (n = e.parent);
     if (n === null) return r[ze];
     {
          let { componentOffset: o } = n;
          if (o > -1) {
               let { encapsulation: i } = t.data[n.directiveStart + o];
               if (i === Ae.None || i === Ae.Emulated) return null;
          }
          return Ee(n, r);
     }
}
function Io(t, e, r, n, o) {
     t.insertBefore(e, r, n, o);
}
function xd(t, e, r) {
     t.appendChild(e, r);
}
function Gc(t, e, r, n, o) {
     n !== null ? Io(t, e, r, n, o) : xd(t, e, r);
}
function Fm(t, e, r, n) {
     t.removeChild(e, r, n);
}
function Ca(t, e) {
     return t.parentNode(e);
}
function km(t, e) {
     return t.nextSibling(e);
}
function Lm(t, e, r) {
     return Vm(t, e, r);
}
function jm(t, e, r) {
     return t.type & 40 ? Ee(t, r) : null;
}
var Vm = jm,
     qc;
function Ea(t, e, r, n) {
     let o = Om(t, n, e),
          i = e[Y],
          s = n.parent || e[Ce],
          a = Lm(s, n, e);
     if (o != null)
          if (Array.isArray(r)) for (let u = 0; u < r.length; u++) Gc(i, o, r[u], a, !1);
          else Gc(i, o, r, a, !1);
     qc !== void 0 && qc(i, n, e, r, o);
}
function co(t, e) {
     if (e !== null) {
          let r = e.type;
          if (r & 3) return Ee(e, t);
          if (r & 4) return Is(-1, t[e.index]);
          if (r & 8) {
               let n = e.child;
               if (n !== null) return co(t, n);
               {
                    let o = t[e.index];
                    return we(o) ? Is(-1, o) : Oe(o);
               }
          } else {
               if (r & 32) return ya(e, t)() || Oe(t[e.index]);
               {
                    let n = _d(t, e);
                    if (n !== null) {
                         if (Array.isArray(n)) return n[0];
                         let o = Da(t[Ne]);
                         return co(o, n);
                    } else return co(t, e.next);
               }
          }
     }
     return null;
}
function _d(t, e) {
     if (e !== null) {
          let n = t[Ne][Ce],
               o = e.projection;
          return n.projection[o];
     }
     return null;
}
function Is(t, e) {
     let r = le + t + 1;
     if (r < e.length) {
          let n = e[r],
               o = n[N].firstChild;
          if (o !== null) return co(n, o);
     }
     return e[yt];
}
function $m(t, e, r) {
     let n = Ca(t, e);
     n && Fm(t, n, e, r);
}
function Ia(t, e, r, n, o, i, s) {
     for (; r != null; ) {
          let a = n[r.index],
               u = r.type;
          if ((s && e === 0 && (a && Ct(Oe(a), n), (r.flags |= 2)), (r.flags & 32) !== 32))
               if (u & 8) Ia(t, e, r.child, n, o, i, !1), Bt(e, t, o, a, i);
               else if (u & 32) {
                    let c = ya(r, n),
                         l;
                    for (; (l = c()); ) Bt(e, t, o, l, i);
                    Bt(e, t, o, a, i);
               } else u & 16 ? Um(t, e, n, r, o, i) : Bt(e, t, o, a, i);
          r = s ? r.projectionNext : r.next;
     }
}
function qn(t, e, r, n, o, i) {
     Ia(r, n, t.firstChild, e, o, i, !1);
}
function Um(t, e, r, n, o, i) {
     let s = r[Ne],
          u = s[Ce].projection[n.projection];
     if (Array.isArray(u))
          for (let c = 0; c < u.length; c++) {
               let l = u[c];
               Bt(e, t, o, l, i);
          }
     else {
          let c = u,
               l = s[G];
          Cd(n) && (c.flags |= 128), Ia(t, e, c, l, o, i, !0);
     }
}
function Bm(t, e, r, n, o) {
     let i = r[yt],
          s = Oe(r);
     i !== s && Bt(e, t, n, i, o);
     for (let a = le; a < r.length; a++) {
          let u = r[a];
          qn(u[N], u, t, e, n, i);
     }
}
function Hm(t, e, r, n, o) {
     if (e) o ? t.addClass(r, n) : t.removeClass(r, n);
     else {
          let i = n.indexOf('-') === -1 ? void 0 : He.DashCase;
          o == null
               ? t.removeStyle(r, n, i)
               : (typeof o == 'string' && o.endsWith('!important') && ((o = o.slice(0, -10)), (i |= He.Important)),
                 t.setStyle(r, n, o, i));
     }
}
function zm(t, e, r) {
     t.setAttribute(e, 'style', r);
}
function Ad(t, e, r) {
     r === '' ? t.removeAttribute(e, 'class') : t.setAttribute(e, 'class', r);
}
function Nd(t, e, r) {
     let { mergedAttrs: n, classes: o, styles: i } = r;
     n !== null && fs(t, e, n), o !== null && Ad(t, e, o), i !== null && zm(t, e, i);
}
var bo = class {
     constructor(e) {
          this.changingThisBreaksApplicationSecurity = e;
     }
     toString() {
          return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${hl})`;
     }
};
function Zn(t) {
     return t instanceof bo ? t.changingThisBreaksApplicationSecurity : t;
}
function Rd(t, e) {
     let r = Wm(t);
     if (r != null && r !== e) {
          if (r === 'ResourceURL' && e === 'URL') return !0;
          throw new Error(`Required a safe ${e}, got a ${r} (see ${hl})`);
     }
     return r === e;
}
function Wm(t) {
     return (t instanceof bo && t.getTypeName()) || null;
}
var Gm = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:\/?#]*(?:[\/?#]|$))/i;
function Od(t) {
     return (t = String(t)), t.match(Gm) ? t : 'unsafe:' + t;
}
var ba = (function (t) {
     return (
          (t[(t.NONE = 0)] = 'NONE'),
          (t[(t.HTML = 1)] = 'HTML'),
          (t[(t.STYLE = 2)] = 'STYLE'),
          (t[(t.SCRIPT = 3)] = 'SCRIPT'),
          (t[(t.URL = 4)] = 'URL'),
          (t[(t.RESOURCE_URL = 5)] = 'RESOURCE_URL'),
          t
     );
})(ba || {});
function WT(t) {
     let e = qm();
     return e ? e.sanitize(ba.URL, t) || '' : Rd(t, 'URL') ? Zn(t) : Od(Js(t));
}
function qm() {
     let t = U();
     return t && t[Zt].sanitizer;
}
var Zm = 'h',
     Ym = 'b';
var Qm = (t, e, r) => null;
function Ma(t, e, r = !1) {
     return Qm(t, e, r);
}
var bs = class {},
     Mo = class {};
function Km(t) {
     let e = Error(`No component factory found for ${oe(t)}.`);
     return (e[Jm] = t), e;
}
var Jm = 'ngComponent';
var Ms = class {
          resolveComponentFactory(e) {
               throw Km(e);
          }
     },
     Uo = (() => {
          let e = class e {};
          e.NULL = new Ms();
          let t = e;
          return t;
     })();
function Xm() {
     return Sa(be(), U());
}
function Sa(t, e) {
     return new an(Ee(t, e));
}
var an = (() => {
     let e = class e {
          constructor(n) {
               this.nativeElement = n;
          }
     };
     e.__NG_ELEMENT_ID__ = Xm;
     let t = e;
     return t;
})();
var Ln = class {},
     Yn = (() => {
          let e = class e {
               constructor() {
                    this.destroyNode = null;
               }
          };
          e.__NG_ELEMENT_ID__ = () => ev();
          let t = e;
          return t;
     })();
function ev() {
     let t = U(),
          e = be(),
          r = it(e.index, t);
     return (tt(r) ? r : t)[Y];
}
var tv = (() => {
          let e = class e {};
          e.ɵprov = w({ token: e, providedIn: 'root', factory: () => null });
          let t = e;
          return t;
     })(),
     Xt = class {
          constructor(e) {
               (this.full = e),
                    (this.major = e.split('.')[0]),
                    (this.minor = e.split('.')[1]),
                    (this.patch = e.split('.').slice(2).join('.'));
          }
     },
     nv = new Xt('17.0.3'),
     es = {};
function GT(t, e) {
     let r = nc(t),
          n = r[Mn];
     return (
          e?.equal && (n.equal = e.equal),
          (r.set = (o) => _i(n, o)),
          (r.update = (o) => rc(n, o)),
          (r.asReadonly = rv.bind(r)),
          r
     );
}
function rv() {
     let t = this[Mn];
     if (t.readonlyFn === void 0) {
          let e = () => this();
          (e[Mn] = t), (t.readonlyFn = e);
     }
     return t.readonlyFn;
}
function Pd(t) {
     return Ta(t) ? Array.isArray(t) || (!(t instanceof Map) && Symbol.iterator in t) : !1;
}
function ov(t, e) {
     if (Array.isArray(t)) for (let r = 0; r < t.length; r++) e(t[r]);
     else {
          let r = t[Symbol.iterator](),
               n;
          for (; !(n = r.next()).done; ) e(n.value);
     }
}
function Ta(t) {
     return t !== null && (typeof t == 'function' || typeof t == 'object');
}
var Ss = class {
          constructor() {}
          supports(e) {
               return Pd(e);
          }
          create(e) {
               return new Ts(e);
          }
     },
     iv = (t, e) => e,
     Ts = class {
          constructor(e) {
               (this.length = 0),
                    (this._linkedRecords = null),
                    (this._unlinkedRecords = null),
                    (this._previousItHead = null),
                    (this._itHead = null),
                    (this._itTail = null),
                    (this._additionsHead = null),
                    (this._additionsTail = null),
                    (this._movesHead = null),
                    (this._movesTail = null),
                    (this._removalsHead = null),
                    (this._removalsTail = null),
                    (this._identityChangesHead = null),
                    (this._identityChangesTail = null),
                    (this._trackByFn = e || iv);
          }
          forEachItem(e) {
               let r;
               for (r = this._itHead; r !== null; r = r._next) e(r);
          }
          forEachOperation(e) {
               let r = this._itHead,
                    n = this._removalsHead,
                    o = 0,
                    i = null;
               for (; r || n; ) {
                    let s = !n || (r && r.currentIndex < Zc(n, o, i)) ? r : n,
                         a = Zc(s, o, i),
                         u = s.currentIndex;
                    if (s === n) o--, (n = n._nextRemoved);
                    else if (((r = r._next), s.previousIndex == null)) o++;
                    else {
                         i || (i = []);
                         let c = a - o,
                              l = u - o;
                         if (c != l) {
                              for (let f = 0; f < c; f++) {
                                   let h = f < i.length ? i[f] : (i[f] = 0),
                                        g = h + f;
                                   l <= g && g < c && (i[f] = h + 1);
                              }
                              let d = s.previousIndex;
                              i[d] = l - c;
                         }
                    }
                    a !== u && e(s, a, u);
               }
          }
          forEachPreviousItem(e) {
               let r;
               for (r = this._previousItHead; r !== null; r = r._nextPrevious) e(r);
          }
          forEachAddedItem(e) {
               let r;
               for (r = this._additionsHead; r !== null; r = r._nextAdded) e(r);
          }
          forEachMovedItem(e) {
               let r;
               for (r = this._movesHead; r !== null; r = r._nextMoved) e(r);
          }
          forEachRemovedItem(e) {
               let r;
               for (r = this._removalsHead; r !== null; r = r._nextRemoved) e(r);
          }
          forEachIdentityChange(e) {
               let r;
               for (r = this._identityChangesHead; r !== null; r = r._nextIdentityChange) e(r);
          }
          diff(e) {
               if ((e == null && (e = []), !Pd(e))) throw new y(900, !1);
               return this.check(e) ? this : null;
          }
          onDestroy() {}
          check(e) {
               this._reset();
               let r = this._itHead,
                    n = !1,
                    o,
                    i,
                    s;
               if (Array.isArray(e)) {
                    this.length = e.length;
                    for (let a = 0; a < this.length; a++)
                         (i = e[a]),
                              (s = this._trackByFn(a, i)),
                              r === null || !Object.is(r.trackById, s)
                                   ? ((r = this._mismatch(r, i, s, a)), (n = !0))
                                   : (n && (r = this._verifyReinsertion(r, i, s, a)),
                                     Object.is(r.item, i) || this._addIdentityChange(r, i)),
                              (r = r._next);
               } else
                    (o = 0),
                         ov(e, (a) => {
                              (s = this._trackByFn(o, a)),
                                   r === null || !Object.is(r.trackById, s)
                                        ? ((r = this._mismatch(r, a, s, o)), (n = !0))
                                        : (n && (r = this._verifyReinsertion(r, a, s, o)),
                                          Object.is(r.item, a) || this._addIdentityChange(r, a)),
                                   (r = r._next),
                                   o++;
                         }),
                         (this.length = o);
               return this._truncate(r), (this.collection = e), this.isDirty;
          }
          get isDirty() {
               return (
                    this._additionsHead !== null ||
                    this._movesHead !== null ||
                    this._removalsHead !== null ||
                    this._identityChangesHead !== null
               );
          }
          _reset() {
               if (this.isDirty) {
                    let e;
                    for (e = this._previousItHead = this._itHead; e !== null; e = e._next) e._nextPrevious = e._next;
                    for (e = this._additionsHead; e !== null; e = e._nextAdded) e.previousIndex = e.currentIndex;
                    for (
                         this._additionsHead = this._additionsTail = null, e = this._movesHead;
                         e !== null;
                         e = e._nextMoved
                    )
                         e.previousIndex = e.currentIndex;
                    (this._movesHead = this._movesTail = null),
                         (this._removalsHead = this._removalsTail = null),
                         (this._identityChangesHead = this._identityChangesTail = null);
               }
          }
          _mismatch(e, r, n, o) {
               let i;
               return (
                    e === null ? (i = this._itTail) : ((i = e._prev), this._remove(e)),
                    (e = this._unlinkedRecords === null ? null : this._unlinkedRecords.get(n, null)),
                    e !== null
                         ? (Object.is(e.item, r) || this._addIdentityChange(e, r), this._reinsertAfter(e, i, o))
                         : ((e = this._linkedRecords === null ? null : this._linkedRecords.get(n, o)),
                           e !== null
                                ? (Object.is(e.item, r) || this._addIdentityChange(e, r), this._moveAfter(e, i, o))
                                : (e = this._addAfter(new xs(r, n), i, o))),
                    e
               );
          }
          _verifyReinsertion(e, r, n, o) {
               let i = this._unlinkedRecords === null ? null : this._unlinkedRecords.get(n, null);
               return (
                    i !== null
                         ? (e = this._reinsertAfter(i, e._prev, o))
                         : e.currentIndex != o && ((e.currentIndex = o), this._addToMoves(e, o)),
                    e
               );
          }
          _truncate(e) {
               for (; e !== null; ) {
                    let r = e._next;
                    this._addToRemovals(this._unlink(e)), (e = r);
               }
               this._unlinkedRecords !== null && this._unlinkedRecords.clear(),
                    this._additionsTail !== null && (this._additionsTail._nextAdded = null),
                    this._movesTail !== null && (this._movesTail._nextMoved = null),
                    this._itTail !== null && (this._itTail._next = null),
                    this._removalsTail !== null && (this._removalsTail._nextRemoved = null),
                    this._identityChangesTail !== null && (this._identityChangesTail._nextIdentityChange = null);
          }
          _reinsertAfter(e, r, n) {
               this._unlinkedRecords !== null && this._unlinkedRecords.remove(e);
               let o = e._prevRemoved,
                    i = e._nextRemoved;
               return (
                    o === null ? (this._removalsHead = i) : (o._nextRemoved = i),
                    i === null ? (this._removalsTail = o) : (i._prevRemoved = o),
                    this._insertAfter(e, r, n),
                    this._addToMoves(e, n),
                    e
               );
          }
          _moveAfter(e, r, n) {
               return this._unlink(e), this._insertAfter(e, r, n), this._addToMoves(e, n), e;
          }
          _addAfter(e, r, n) {
               return (
                    this._insertAfter(e, r, n),
                    this._additionsTail === null
                         ? (this._additionsTail = this._additionsHead = e)
                         : (this._additionsTail = this._additionsTail._nextAdded = e),
                    e
               );
          }
          _insertAfter(e, r, n) {
               let o = r === null ? this._itHead : r._next;
               return (
                    (e._next = o),
                    (e._prev = r),
                    o === null ? (this._itTail = e) : (o._prev = e),
                    r === null ? (this._itHead = e) : (r._next = e),
                    this._linkedRecords === null && (this._linkedRecords = new So()),
                    this._linkedRecords.put(e),
                    (e.currentIndex = n),
                    e
               );
          }
          _remove(e) {
               return this._addToRemovals(this._unlink(e));
          }
          _unlink(e) {
               this._linkedRecords !== null && this._linkedRecords.remove(e);
               let r = e._prev,
                    n = e._next;
               return (
                    r === null ? (this._itHead = n) : (r._next = n), n === null ? (this._itTail = r) : (n._prev = r), e
               );
          }
          _addToMoves(e, r) {
               return (
                    e.previousIndex === r ||
                         (this._movesTail === null
                              ? (this._movesTail = this._movesHead = e)
                              : (this._movesTail = this._movesTail._nextMoved = e)),
                    e
               );
          }
          _addToRemovals(e) {
               return (
                    this._unlinkedRecords === null && (this._unlinkedRecords = new So()),
                    this._unlinkedRecords.put(e),
                    (e.currentIndex = null),
                    (e._nextRemoved = null),
                    this._removalsTail === null
                         ? ((this._removalsTail = this._removalsHead = e), (e._prevRemoved = null))
                         : ((e._prevRemoved = this._removalsTail),
                           (this._removalsTail = this._removalsTail._nextRemoved = e)),
                    e
               );
          }
          _addIdentityChange(e, r) {
               return (
                    (e.item = r),
                    this._identityChangesTail === null
                         ? (this._identityChangesTail = this._identityChangesHead = e)
                         : (this._identityChangesTail = this._identityChangesTail._nextIdentityChange = e),
                    e
               );
          }
     },
     xs = class {
          constructor(e, r) {
               (this.item = e),
                    (this.trackById = r),
                    (this.currentIndex = null),
                    (this.previousIndex = null),
                    (this._nextPrevious = null),
                    (this._prev = null),
                    (this._next = null),
                    (this._prevDup = null),
                    (this._nextDup = null),
                    (this._prevRemoved = null),
                    (this._nextRemoved = null),
                    (this._nextAdded = null),
                    (this._nextMoved = null),
                    (this._nextIdentityChange = null);
          }
     },
     _s = class {
          constructor() {
               (this._head = null), (this._tail = null);
          }
          add(e) {
               this._head === null
                    ? ((this._head = this._tail = e), (e._nextDup = null), (e._prevDup = null))
                    : ((this._tail._nextDup = e), (e._prevDup = this._tail), (e._nextDup = null), (this._tail = e));
          }
          get(e, r) {
               let n;
               for (n = this._head; n !== null; n = n._nextDup)
                    if ((r === null || r <= n.currentIndex) && Object.is(n.trackById, e)) return n;
               return null;
          }
          remove(e) {
               let r = e._prevDup,
                    n = e._nextDup;
               return (
                    r === null ? (this._head = n) : (r._nextDup = n),
                    n === null ? (this._tail = r) : (n._prevDup = r),
                    this._head === null
               );
          }
     },
     So = class {
          constructor() {
               this.map = new Map();
          }
          put(e) {
               let r = e.trackById,
                    n = this.map.get(r);
               n || ((n = new _s()), this.map.set(r, n)), n.add(e);
          }
          get(e, r) {
               let n = e,
                    o = this.map.get(n);
               return o ? o.get(e, r) : null;
          }
          remove(e) {
               let r = e.trackById;
               return this.map.get(r).remove(e) && this.map.delete(r), e;
          }
          get isEmpty() {
               return this.map.size === 0;
          }
          clear() {
               this.map.clear();
          }
     };
function Zc(t, e, r) {
     let n = t.previousIndex;
     if (n === null) return n;
     let o = 0;
     return r && n < r.length && (o = r[n]), n + e + o;
}
var As = class {
          constructor() {}
          supports(e) {
               return e instanceof Map || Ta(e);
          }
          create() {
               return new Ns();
          }
     },
     Ns = class {
          constructor() {
               (this._records = new Map()),
                    (this._mapHead = null),
                    (this._appendAfter = null),
                    (this._previousMapHead = null),
                    (this._changesHead = null),
                    (this._changesTail = null),
                    (this._additionsHead = null),
                    (this._additionsTail = null),
                    (this._removalsHead = null),
                    (this._removalsTail = null);
          }
          get isDirty() {
               return this._additionsHead !== null || this._changesHead !== null || this._removalsHead !== null;
          }
          forEachItem(e) {
               let r;
               for (r = this._mapHead; r !== null; r = r._next) e(r);
          }
          forEachPreviousItem(e) {
               let r;
               for (r = this._previousMapHead; r !== null; r = r._nextPrevious) e(r);
          }
          forEachChangedItem(e) {
               let r;
               for (r = this._changesHead; r !== null; r = r._nextChanged) e(r);
          }
          forEachAddedItem(e) {
               let r;
               for (r = this._additionsHead; r !== null; r = r._nextAdded) e(r);
          }
          forEachRemovedItem(e) {
               let r;
               for (r = this._removalsHead; r !== null; r = r._nextRemoved) e(r);
          }
          diff(e) {
               if (!e) e = new Map();
               else if (!(e instanceof Map || Ta(e))) throw new y(900, !1);
               return this.check(e) ? this : null;
          }
          onDestroy() {}
          check(e) {
               this._reset();
               let r = this._mapHead;
               if (
                    ((this._appendAfter = null),
                    this._forEach(e, (n, o) => {
                         if (r && r.key === o) this._maybeAddToChanges(r, n), (this._appendAfter = r), (r = r._next);
                         else {
                              let i = this._getOrCreateRecordForKey(o, n);
                              r = this._insertBeforeOrAppend(r, i);
                         }
                    }),
                    r)
               ) {
                    r._prev && (r._prev._next = null), (this._removalsHead = r);
                    for (let n = r; n !== null; n = n._nextRemoved)
                         n === this._mapHead && (this._mapHead = null),
                              this._records.delete(n.key),
                              (n._nextRemoved = n._next),
                              (n.previousValue = n.currentValue),
                              (n.currentValue = null),
                              (n._prev = null),
                              (n._next = null);
               }
               return (
                    this._changesTail && (this._changesTail._nextChanged = null),
                    this._additionsTail && (this._additionsTail._nextAdded = null),
                    this.isDirty
               );
          }
          _insertBeforeOrAppend(e, r) {
               if (e) {
                    let n = e._prev;
                    return (
                         (r._next = e),
                         (r._prev = n),
                         (e._prev = r),
                         n && (n._next = r),
                         e === this._mapHead && (this._mapHead = r),
                         (this._appendAfter = e),
                         e
                    );
               }
               return (
                    this._appendAfter
                         ? ((this._appendAfter._next = r), (r._prev = this._appendAfter))
                         : (this._mapHead = r),
                    (this._appendAfter = r),
                    null
               );
          }
          _getOrCreateRecordForKey(e, r) {
               if (this._records.has(e)) {
                    let o = this._records.get(e);
                    this._maybeAddToChanges(o, r);
                    let i = o._prev,
                         s = o._next;
                    return i && (i._next = s), s && (s._prev = i), (o._next = null), (o._prev = null), o;
               }
               let n = new Rs(e);
               return this._records.set(e, n), (n.currentValue = r), this._addToAdditions(n), n;
          }
          _reset() {
               if (this.isDirty) {
                    let e;
                    for (this._previousMapHead = this._mapHead, e = this._previousMapHead; e !== null; e = e._next)
                         e._nextPrevious = e._next;
                    for (e = this._changesHead; e !== null; e = e._nextChanged) e.previousValue = e.currentValue;
                    for (e = this._additionsHead; e != null; e = e._nextAdded) e.previousValue = e.currentValue;
                    (this._changesHead = this._changesTail = null),
                         (this._additionsHead = this._additionsTail = null),
                         (this._removalsHead = null);
               }
          }
          _maybeAddToChanges(e, r) {
               Object.is(r, e.currentValue) ||
                    ((e.previousValue = e.currentValue), (e.currentValue = r), this._addToChanges(e));
          }
          _addToAdditions(e) {
               this._additionsHead === null
                    ? (this._additionsHead = this._additionsTail = e)
                    : ((this._additionsTail._nextAdded = e), (this._additionsTail = e));
          }
          _addToChanges(e) {
               this._changesHead === null
                    ? (this._changesHead = this._changesTail = e)
                    : ((this._changesTail._nextChanged = e), (this._changesTail = e));
          }
          _forEach(e, r) {
               e instanceof Map ? e.forEach(r) : Object.keys(e).forEach((n) => r(e[n], n));
          }
     },
     Rs = class {
          constructor(e) {
               (this.key = e),
                    (this.previousValue = null),
                    (this.currentValue = null),
                    (this._nextPrevious = null),
                    (this._next = null),
                    (this._prev = null),
                    (this._nextAdded = null),
                    (this._nextRemoved = null),
                    (this._nextChanged = null);
          }
     };
function Yc() {
     return new xa([new Ss()]);
}
var xa = (() => {
     let e = class e {
          constructor(n) {
               this.factories = n;
          }
          static create(n, o) {
               if (o != null) {
                    let i = o.factories.slice();
                    n = n.concat(i);
               }
               return new e(n);
          }
          static extend(n) {
               return { provide: e, useFactory: (o) => e.create(n, o || Yc()), deps: [[e, new Vo(), new Wn()]] };
          }
          find(n) {
               let o = this.factories.find((i) => i.supports(n));
               if (o != null) return o;
               throw new y(901, !1);
          }
     };
     e.ɵprov = w({ token: e, providedIn: 'root', factory: Yc });
     let t = e;
     return t;
})();
function Qc() {
     return new _a([new As()]);
}
var _a = (() => {
     let e = class e {
          constructor(n) {
               this.factories = n;
          }
          static create(n, o) {
               if (o) {
                    let i = o.factories.slice();
                    n = n.concat(i);
               }
               return new e(n);
          }
          static extend(n) {
               return { provide: e, useFactory: (o) => e.create(n, o || Qc()), deps: [[e, new Vo(), new Wn()]] };
          }
          find(n) {
               let o = this.factories.find((i) => i.supports(n));
               if (o) return o;
               throw new y(901, !1);
          }
     };
     e.ɵprov = w({ token: e, providedIn: 'root', factory: Qc });
     let t = e;
     return t;
})();
function To(t, e, r, n, o = !1) {
     for (; r !== null; ) {
          let i = e[r.index];
          i !== null && n.push(Oe(i)), we(i) && sv(i, n);
          let s = r.type;
          if (s & 8) To(t, e, r.child, n);
          else if (s & 32) {
               let a = ya(r, e),
                    u;
               for (; (u = a()); ) n.push(u);
          } else if (s & 16) {
               let a = _d(e, r);
               if (Array.isArray(a)) n.push(...a);
               else {
                    let u = Da(e[Ne]);
                    To(u[N], u, a, n, !0);
               }
          }
          r = o ? r.projectionNext : r.next;
     }
     return n;
}
function sv(t, e) {
     for (let r = le; r < t.length; r++) {
          let n = t[r],
               o = n[N].firstChild;
          o !== null && To(n[N], n, o, e);
     }
     t[yt] !== t[ze] && e.push(t[yt]);
}
var Fd = [];
function av(t) {
     return t[vt] ?? uv(t);
}
function uv(t) {
     let e = Fd.pop() ?? Object.create(lv);
     return (e.lView = t), e;
}
function cv(t) {
     t.lView[vt] !== t && ((t.lView = null), Fd.push(t));
}
var lv = H(m({}, Ti), {
          consumerIsAlwaysLive: !0,
          consumerMarkedDirty: (t) => {
               jo(t.lView);
          },
          consumerOnSignalRead() {
               this.lView[vt] = this;
          },
     }),
     dv = 'ngOriginalError';
function ts(t) {
     return t[dv];
}
var Pe = class {
     constructor() {
          this._console = console;
     }
     handleError(e) {
          let r = this._findOriginalError(e);
          this._console.error('ERROR', e), r && this._console.error('ORIGINAL ERROR', r);
     }
     _findOriginalError(e) {
          let r = e && ts(e);
          for (; r && ts(r); ) r = ts(r);
          return r || null;
     }
};
var kd = !1,
     fv = new E('', { providedIn: 'root', factory: () => kd });
var st = {};
function qT(t) {
     Ld(Ie(), U(), on() + t, !1);
}
function Ld(t, e, r, n) {
     if (!n)
          if ((e[b] & 3) === 3) {
               let i = t.preOrderCheckHooks;
               i !== null && so(e, i, r);
          } else {
               let i = t.preOrderHooks;
               i !== null && ao(e, i, 0, r);
          }
     Dt(r);
}
function We(t, e = A.Default) {
     let r = U();
     if (r === null) return D(t, e);
     let n = be();
     return id(n, r, re(t), e);
}
function jd() {
     let t = 'invalid';
     throw new Error(t);
}
function hv(t, e) {
     let r = t.hostBindingOpCodes;
     if (r !== null)
          try {
               for (let n = 0; n < r.length; n++) {
                    let o = r[n];
                    if (o < 0) Dt(~o);
                    else {
                         let i = o,
                              s = r[++n],
                              a = r[++n];
                         Ng(s, i);
                         let u = e[i];
                         a(2, u);
                    }
               }
          } finally {
               Dt(-1);
          }
}
function Bo(t, e, r, n, o, i, s, a, u, c, l) {
     let d = e.blueprint.slice();
     return (
          (d[ze] = o),
          (d[b] = n | 4 | 128 | 8),
          (c !== null || (t && t[b] & 2048)) && (d[b] |= 2048),
          jl(d),
          (d[G] = d[rn] = t),
          (d[pe] = r),
          (d[Zt] = s || (t && t[Zt])),
          (d[Y] = a || (t && t[Y])),
          (d[qt] = u || (t && t[qt]) || null),
          (d[Ce] = i),
          (d[ko] = Dm()),
          (d[hs] = l),
          (d[Nl] = c),
          (d[Ne] = e.type == 2 ? t[Ne] : d),
          d
     );
}
function Ho(t, e, r, n, o) {
     let i = t.data[e];
     if (i === null) (i = pv(t, e, r, n, o)), Ag() && (i.flags |= 32);
     else if (i.type & 64) {
          (i.type = r), (i.value = n), (i.attrs = o);
          let s = Mg();
          i.injectorIndex = s === null ? -1 : s.injectorIndex;
     }
     return Hn(i, !0), i;
}
function pv(t, e, r, n, o) {
     let i = Bl(),
          s = Hl(),
          a = s ? i : i && i.parent,
          u = (t.data[e] = Dv(t, a, r, e, n, o));
     return (
          t.firstChild === null && (t.firstChild = u),
          i !== null &&
               (s
                    ? i.child == null && u.parent !== null && (i.child = u)
                    : i.next === null && ((i.next = u), (u.prev = i))),
          u
     );
}
function Vd(t, e, r, n) {
     if (r === 0) return -1;
     let o = e.length;
     for (let i = 0; i < r; i++) e.push(n), t.blueprint.push(n), t.data.push(null);
     return o;
}
function $d(t, e, r, n, o) {
     let i = on(),
          s = n & 2;
     try {
          Dt(-1), s && e.length > Re && Ld(t, e, Re, !1), xe(s ? 2 : 0, o), r(n, o);
     } finally {
          Dt(i), xe(s ? 3 : 1, o);
     }
}
function Ud(t, e, r) {
     if (Ol(e)) {
          let n = ee(null);
          try {
               let o = e.directiveStart,
                    i = e.directiveEnd;
               for (let s = o; s < i; s++) {
                    let a = t.data[s];
                    a.contentQueries && a.contentQueries(1, r[s], s);
               }
          } finally {
               ee(n);
          }
     }
}
function Bd(t, e, r) {
     Ul() && (Mv(t, e, r, Ee(r, e)), (r.flags & 64) === 64 && Zd(t, e, r));
}
function Hd(t, e, r = Ee) {
     let n = e.localNames;
     if (n !== null) {
          let o = e.index + 1;
          for (let i = 0; i < n.length; i += 2) {
               let s = n[i + 1],
                    a = s === -1 ? r(e, t) : t[s];
               t[o++] = a;
          }
     }
}
function zd(t) {
     let e = t.tView;
     return e === null || e.incompleteFirstPass
          ? (t.tView = Aa(
                 1,
                 null,
                 t.template,
                 t.decls,
                 t.vars,
                 t.directiveDefs,
                 t.pipeDefs,
                 t.viewQuery,
                 t.schemas,
                 t.consts,
                 t.id
            ))
          : e;
}
function Aa(t, e, r, n, o, i, s, a, u, c, l) {
     let d = Re + n,
          f = d + o,
          h = gv(d, f),
          g = typeof c == 'function' ? c() : c;
     return (h[N] = {
          type: t,
          blueprint: h,
          template: r,
          queries: null,
          viewQuery: a,
          declTNode: e,
          data: h.slice().fill(null, d),
          bindingStartIndex: d,
          expandoStartIndex: f,
          hostBindingOpCodes: null,
          firstCreatePass: !0,
          firstUpdatePass: !0,
          staticViewQueries: !1,
          staticContentQueries: !1,
          preOrderHooks: null,
          preOrderCheckHooks: null,
          contentHooks: null,
          contentCheckHooks: null,
          viewHooks: null,
          viewCheckHooks: null,
          destroyHooks: null,
          cleanup: null,
          contentQueries: null,
          components: null,
          directiveRegistry: typeof i == 'function' ? i() : i,
          pipeRegistry: typeof s == 'function' ? s() : s,
          firstChild: null,
          schemas: u,
          consts: g,
          incompleteFirstPass: !1,
          ssrId: l,
     });
}
function gv(t, e) {
     let r = [];
     for (let n = 0; n < e; n++) r.push(n < t ? null : st);
     return r;
}
function mv(t, e, r, n) {
     let i = n.get(fv, kd) || r === Ae.ShadowDom,
          s = t.selectRootElement(e, i);
     return vv(s), s;
}
function vv(t) {
     yv(t);
}
var yv = (t) => null;
function Dv(t, e, r, n, o, i) {
     let s = e ? e.injectorIndex : -1,
          a = 0;
     return (
          Eg() && (a |= 128),
          {
               type: r,
               index: n,
               insertBeforeIndex: null,
               injectorIndex: s,
               directiveStart: -1,
               directiveEnd: -1,
               directiveStylingLast: -1,
               componentOffset: -1,
               propertyBindings: null,
               flags: a,
               providerIndexes: 0,
               value: o,
               attrs: i,
               mergedAttrs: null,
               localNames: null,
               initialInputs: void 0,
               inputs: null,
               outputs: null,
               tView: null,
               next: null,
               prev: null,
               projectionNext: null,
               child: null,
               parent: e,
               projection: null,
               styles: null,
               stylesWithoutHost: null,
               residualStyles: void 0,
               classes: null,
               classesWithoutHost: null,
               residualClasses: void 0,
               classBindings: 0,
               styleBindings: 0,
          }
     );
}
function Kc(t, e, r, n) {
     for (let o in t)
          if (t.hasOwnProperty(o)) {
               r = r === null ? {} : r;
               let i = t[o];
               n === null ? Jc(r, e, o, i) : n.hasOwnProperty(o) && Jc(r, e, n[o], i);
          }
     return r;
}
function Jc(t, e, r, n) {
     t.hasOwnProperty(r) ? t[r].push(e, n) : (t[r] = [e, n]);
}
function wv(t, e, r) {
     let n = e.directiveStart,
          o = e.directiveEnd,
          i = t.data,
          s = e.attrs,
          a = [],
          u = null,
          c = null;
     for (let l = n; l < o; l++) {
          let d = i[l],
               f = r ? r.get(d) : null,
               h = f ? f.inputs : null,
               g = f ? f.outputs : null;
          (u = Kc(d.inputs, l, u, h)), (c = Kc(d.outputs, l, c, g));
          let S = u !== null && s !== null && !Il(e) ? Pv(u, l, s) : null;
          a.push(S);
     }
     u !== null && (u.hasOwnProperty('class') && (e.flags |= 8), u.hasOwnProperty('style') && (e.flags |= 16)),
          (e.initialInputs = a),
          (e.inputs = u),
          (e.outputs = c);
}
function Cv(t) {
     return t === 'class'
          ? 'className'
          : t === 'for'
          ? 'htmlFor'
          : t === 'formaction'
          ? 'formAction'
          : t === 'innerHtml'
          ? 'innerHTML'
          : t === 'readonly'
          ? 'readOnly'
          : t === 'tabindex'
          ? 'tabIndex'
          : t;
}
function Wd(t, e, r, n, o, i, s, a) {
     let u = Ee(e, r),
          c = e.inputs,
          l;
     !a && c != null && (l = c[n])
          ? (Na(t, r, l, n, o), Lo(e) && Ev(r, e.index))
          : e.type & 3
          ? ((n = Cv(n)), (o = s != null ? s(o, e.value || '', n) : o), i.setProperty(u, n, o))
          : e.type & 12;
}
function Ev(t, e) {
     let r = it(e, t);
     r[b] & 16 || (r[b] |= 64);
}
function Gd(t, e, r, n) {
     if (Ul()) {
          let o = n === null ? null : { '': -1 },
               i = Tv(t, r),
               s,
               a;
          i === null ? (s = a = null) : ([s, a] = i), s !== null && qd(t, e, r, s, o, a), o && xv(r, n, o);
     }
     r.mergedAttrs = Rn(r.mergedAttrs, r.attrs);
}
function qd(t, e, r, n, o, i) {
     for (let c = 0; c < n.length; c++) vs(Do(r, e), t, n[c].type);
     Av(r, t.data.length, n.length);
     for (let c = 0; c < n.length; c++) {
          let l = n[c];
          l.providersResolver && l.providersResolver(l);
     }
     let s = !1,
          a = !1,
          u = Vd(t, e, n.length, null);
     for (let c = 0; c < n.length; c++) {
          let l = n[c];
          (r.mergedAttrs = Rn(r.mergedAttrs, l.hostAttrs)),
               Nv(t, r, e, u, l),
               _v(u, l, o),
               l.contentQueries !== null && (r.flags |= 4),
               (l.hostBindings !== null || l.hostAttrs !== null || l.hostVars !== 0) && (r.flags |= 64);
          let d = l.type.prototype;
          !s && (d.ngOnChanges || d.ngOnInit || d.ngDoCheck) && ((t.preOrderHooks ??= []).push(r.index), (s = !0)),
               !a && (d.ngOnChanges || d.ngDoCheck) && ((t.preOrderCheckHooks ??= []).push(r.index), (a = !0)),
               u++;
     }
     wv(t, r, i);
}
function Iv(t, e, r, n, o) {
     let i = o.hostBindings;
     if (i) {
          let s = t.hostBindingOpCodes;
          s === null && (s = t.hostBindingOpCodes = []);
          let a = ~e.index;
          bv(s) != a && s.push(a), s.push(r, n, i);
     }
}
function bv(t) {
     let e = t.length;
     for (; e > 0; ) {
          let r = t[--e];
          if (typeof r == 'number' && r < 0) return r;
     }
     return 0;
}
function Mv(t, e, r, n) {
     let o = r.directiveStart,
          i = r.directiveEnd;
     Lo(r) && Rv(e, r, t.data[o + r.componentOffset]), t.firstCreatePass || Do(r, e), Ct(n, e);
     let s = r.initialInputs;
     for (let a = o; a < i; a++) {
          let u = t.data[a],
               c = Kt(e, t, a, r);
          if ((Ct(c, e), s !== null && Ov(e, a - o, c, u, r, s), rt(u))) {
               let l = it(r.index, e);
               l[pe] = Kt(e, t, a, r);
          }
     }
}
function Zd(t, e, r) {
     let n = r.directiveStart,
          o = r.directiveEnd,
          i = r.index,
          s = Rg();
     try {
          Dt(i);
          for (let a = n; a < o; a++) {
               let u = t.data[a],
                    c = e[a];
               gs(a), (u.hostBindings !== null || u.hostVars !== 0 || u.hostAttrs !== null) && Sv(u, c);
          }
     } finally {
          Dt(-1), gs(s);
     }
}
function Sv(t, e) {
     t.hostBindings !== null && t.hostBindings(1, e);
}
function Tv(t, e) {
     let r = t.directiveRegistry,
          n = null,
          o = null;
     if (r)
          for (let i = 0; i < r.length; i++) {
               let s = r[i];
               if (eg(e, s.selectors, !1))
                    if ((n || (n = []), rt(s)))
                         if (s.findHostDirectiveDefs !== null) {
                              let a = [];
                              (o = o || new Map()), s.findHostDirectiveDefs(s, a, o), n.unshift(...a, s);
                              let u = a.length;
                              Os(t, e, u);
                         } else n.unshift(s), Os(t, e, 0);
                    else (o = o || new Map()), s.findHostDirectiveDefs?.(s, n, o), n.push(s);
          }
     return n === null ? null : [n, o];
}
function Os(t, e, r) {
     (e.componentOffset = r), (t.components ??= []).push(e.index);
}
function xv(t, e, r) {
     if (e) {
          let n = (t.localNames = []);
          for (let o = 0; o < e.length; o += 2) {
               let i = r[e[o + 1]];
               if (i == null) throw new y(-301, !1);
               n.push(e[o], i);
          }
     }
}
function _v(t, e, r) {
     if (r) {
          if (e.exportAs) for (let n = 0; n < e.exportAs.length; n++) r[e.exportAs[n]] = t;
          rt(e) && (r[''] = t);
     }
}
function Av(t, e, r) {
     (t.flags |= 1), (t.directiveStart = e), (t.directiveEnd = e + r), (t.providerIndexes = e);
}
function Nv(t, e, r, n, o) {
     t.data[n] = o;
     let i = o.factory || (o.factory = Qt(o.type, !0)),
          s = new wt(i, rt(o), We);
     (t.blueprint[n] = s), (r[n] = s), Iv(t, e, n, Vd(t, r, o.hostVars, st), o);
}
function Rv(t, e, r) {
     let n = Ee(e, t),
          o = zd(r),
          i = t[Zt].rendererFactory,
          s = 16;
     r.signals ? (s = 4096) : r.onPush && (s = 64);
     let a = zo(t, Bo(t, o, null, s, n, e, null, i.createRenderer(n, r), null, null, null));
     t[e.index] = a;
}
function Ov(t, e, r, n, o, i) {
     let s = i[e];
     if (s !== null)
          for (let a = 0; a < s.length; ) {
               let u = s[a++],
                    c = s[a++],
                    l = s[a++];
               Yd(n, r, u, c, l);
          }
}
function Yd(t, e, r, n, o) {
     let i = ee(null);
     try {
          let s = t.inputTransforms;
          s !== null && s.hasOwnProperty(n) && (o = s[n].call(e, o)),
               t.setInput !== null ? t.setInput(e, o, r, n) : (e[n] = o);
     } finally {
          ee(i);
     }
}
function Pv(t, e, r) {
     let n = null,
          o = 0;
     for (; o < r.length; ) {
          let i = r[o];
          if (i === 0) {
               o += 4;
               continue;
          } else if (i === 5) {
               o += 2;
               continue;
          }
          if (typeof i == 'number') break;
          if (t.hasOwnProperty(i)) {
               n === null && (n = []);
               let s = t[i];
               for (let a = 0; a < s.length; a += 2)
                    if (s[a] === e) {
                         n.push(i, s[a + 1], r[o + 1]);
                         break;
                    }
          }
          o += 2;
     }
     return n;
}
function Qd(t, e, r, n) {
     return [t, !0, 0, e, null, n, null, r, null, null];
}
function Kd(t, e) {
     let r = t.contentQueries;
     if (r !== null) {
          let n = ee(null);
          try {
               for (let o = 0; o < r.length; o += 2) {
                    let i = r[o],
                         s = r[o + 1];
                    if (s !== -1) {
                         let a = t.data[s];
                         zl(i), a.contentQueries(2, e[s], s);
                    }
               }
          } finally {
               ee(n);
          }
     }
}
function zo(t, e) {
     return t[Pn] ? (t[jc][De] = e) : (t[Pn] = e), (t[jc] = e), e;
}
function Ps(t, e, r) {
     zl(0);
     let n = ee(null);
     try {
          e(t, r);
     } finally {
          ee(n);
     }
}
function Fv(t) {
     return t[On] || (t[On] = []);
}
function kv(t) {
     return t.cleanup || (t.cleanup = []);
}
function Jd(t, e) {
     let r = t[qt],
          n = r ? r.get(Pe, null) : null;
     n && n.handleError(e);
}
function Na(t, e, r, n, o) {
     for (let i = 0; i < r.length; ) {
          let s = r[i++],
               a = r[i++],
               u = e[s],
               c = t.data[s];
          Yd(c, u, n, a, o);
     }
}
function Lv(t, e, r) {
     let n = Ll(e, t);
     bm(t[Y], n, r);
}
var jv = 100;
function Vv(t, e = !0) {
     let r = t[Zt],
          n = r.rendererFactory,
          o = r.afterRenderEventManager,
          i = !1;
     i || (n.begin?.(), o?.begin());
     try {
          let s = t[N],
               a = t[pe];
          Xd(s, t, s.template, a), $v(t);
     } catch (s) {
          throw (e && Jd(t, s), s);
     } finally {
          i || (n.end?.(), r.inlineEffectRunner?.flush(), o?.end());
     }
}
function $v(t) {
     let e = 0;
     for (; t[b] & 9216 || t[vt]?.dirty; ) {
          if (e === jv) throw new y(103, !1);
          e++, nf(t, 1);
     }
}
function Xd(t, e, r, n) {
     let o = e[b];
     if ((o & 256) === 256) return;
     let i = !1;
     !i && e[Zt].inlineEffectRunner?.flush(), oa(e);
     let s = null,
          a = null;
     !i && Uv(t) && ((a = av(e)), (s = Zu(a)));
     try {
          jl(e), xg(t.bindingStartIndex), r !== null && $d(t, e, r, 2, n);
          let u = (o & 3) === 3;
          if (!i)
               if (u) {
                    let d = t.preOrderCheckHooks;
                    d !== null && so(e, d, null);
               } else {
                    let d = t.preOrderHooks;
                    d !== null && ao(e, d, 0, null), Yi(e, 0);
               }
          if ((Bv(e), ef(e, 0), t.contentQueries !== null && Kd(t, e), !i))
               if (u) {
                    let d = t.contentCheckHooks;
                    d !== null && so(e, d);
               } else {
                    let d = t.contentHooks;
                    d !== null && ao(e, d, 1), Yi(e, 1);
               }
          hv(t, e);
          let c = t.components;
          c !== null && rf(e, c, 0);
          let l = t.viewQuery;
          if ((l !== null && Ps(2, l, n), !i))
               if (u) {
                    let d = t.viewCheckHooks;
                    d !== null && so(e, d);
               } else {
                    let d = t.viewHooks;
                    d !== null && ao(e, d, 2), Yi(e, 2);
               }
          if ((t.firstUpdatePass === !0 && (t.firstUpdatePass = !1), e[Zi])) {
               for (let d of e[Zi]) d();
               e[Zi] = null;
          }
          i || (e[b] &= -73);
     } catch (u) {
          throw (jo(e), u);
     } finally {
          a !== null && (Yu(a, s), cv(a)), ia();
     }
}
function Uv(t) {
     return t.type !== 2;
}
function ef(t, e) {
     for (let r = Id(t); r !== null; r = bd(r)) {
          r[b] &= ~Yt.HasChildViewsToRefresh;
          for (let n = le; n < r.length; n++) {
               let o = r[n];
               tf(o, e);
          }
     }
}
function Bv(t) {
     for (let e = Id(t); e !== null; e = bd(e)) {
          if (!(e[b] & Yt.HasTransplantedViews)) continue;
          let r = e[go];
          for (let n = 0; n < r.length; n++) {
               let o = r[n],
                    i = o[G];
               mg(o);
          }
     }
}
function Hv(t, e, r) {
     let n = it(e, t);
     tf(n, r);
}
function tf(t, e) {
     na(t) && nf(t, e);
}
function nf(t, e) {
     let n = t[N],
          o = t[b],
          i = t[vt],
          s = !!(e === 0 && o & 16);
     if (
          ((s ||= !!(o & 64 && e === 0)),
          (s ||= !!(o & 1024)),
          (s ||= !!(i?.dirty && xi(i))),
          i && (i.dirty = !1),
          (t[b] &= -9217),
          s)
     )
          Xd(n, t, n.template, t[pe]);
     else if (o & 8192) {
          ef(t, 1);
          let a = n.components;
          a !== null && rf(t, a, 1);
     }
}
function rf(t, e, r) {
     for (let n = 0; n < e.length; n++) Hv(t, e[n], r);
}
function Ra(t) {
     for (; t; ) {
          t[b] |= 64;
          let e = Da(t);
          if (cg(t) && !e) return t;
          t = e;
     }
     return null;
}
var en = class {
          get rootNodes() {
               let e = this._lView,
                    r = e[N];
               return To(r, e, r.firstChild, []);
          }
          constructor(e, r, n = !0) {
               (this._lView = e),
                    (this._cdRefInjectingView = r),
                    (this.notifyErrorHandler = n),
                    (this._appRef = null),
                    (this._attachedToViewContainer = !1);
          }
          get context() {
               return this._lView[pe];
          }
          set context(e) {
               this._lView[pe] = e;
          }
          get destroyed() {
               return (this._lView[b] & 256) === 256;
          }
          destroy() {
               if (this._appRef) this._appRef.detachView(this);
               else if (this._attachedToViewContainer) {
                    let e = this._lView[G];
                    if (we(e)) {
                         let r = e[po],
                              n = r ? r.indexOf(this) : -1;
                         n > -1 && (Eo(e, n), wo(r, n));
                    }
                    this._attachedToViewContainer = !1;
               }
               wa(this._lView[N], this._lView);
          }
          onDestroy(e) {
               $l(this._lView, e);
          }
          markForCheck() {
               Ra(this._cdRefInjectingView || this._lView);
          }
          detach() {
               this._lView[b] &= -129;
          }
          reattach() {
               Vl(this._lView), (this._lView[b] |= 128);
          }
          detectChanges() {
               Vv(this._lView, this.notifyErrorHandler);
          }
          checkNoChanges() {}
          attachToViewContainerRef() {
               if (this._appRef) throw new y(902, !1);
               this._attachedToViewContainer = !0;
          }
          detachFromAppRef() {
               (this._appRef = null), Tm(this._lView[N], this._lView);
          }
          attachToAppRef(e) {
               if (this._attachedToViewContainer) throw new y(902, !1);
               this._appRef = e;
          }
     },
     Wo = (() => {
          let e = class e {};
          e.__NG_ELEMENT_ID__ = zv;
          let t = e;
          return t;
     })();
function zv(t) {
     return Wv(be(), U(), (t & 16) === 16);
}
function Wv(t, e, r) {
     if (Lo(t) && !r) {
          let n = it(t.index, e);
          return new en(n, n);
     } else if (t.type & 47) {
          let n = e[Ne];
          return new en(n, e);
     }
     return null;
}
var of = (() => {
          let e = class e {};
          (e.__NG_ELEMENT_ID__ = Gv), (e.__NG_ENV_ID__ = (n) => n);
          let t = e;
          return t;
     })(),
     Fs = class extends of {
          constructor(e) {
               super(), (this._lView = e);
          }
          onDestroy(e) {
               return $l(this._lView, e), () => yg(this._lView, e);
          }
     };
function Gv() {
     return new Fs(U());
}
var Xc = new Set();
function un(t) {
     Xc.has(t) || (Xc.add(t), performance?.mark?.('mark_use_counter', { detail: { feature: t } }));
}
var ks = class extends ne {
     constructor(e = !1) {
          super(), (this.__isAsync = e);
     }
     emit(e) {
          super.next(e);
     }
     subscribe(e, r, n) {
          let o = e,
               i = r || (() => null),
               s = n;
          if (e && typeof e == 'object') {
               let u = e;
               (o = u.next?.bind(u)), (i = u.error?.bind(u)), (s = u.complete?.bind(u));
          }
          this.__isAsync && ((i = ns(i)), o && (o = ns(o)), s && (s = ns(s)));
          let a = super.subscribe({ next: o, error: i, complete: s });
          return e instanceof Z && e.add(a), a;
     }
};
function ns(t) {
     return (e) => {
          setTimeout(t, void 0, e);
     };
}
var ye = ks;
function el(...t) {}
function qv() {
     let t = typeof An.requestAnimationFrame == 'function',
          e = An[t ? 'requestAnimationFrame' : 'setTimeout'],
          r = An[t ? 'cancelAnimationFrame' : 'clearTimeout'];
     if (typeof Zone < 'u' && e && r) {
          let n = e[Zone.__symbol__('OriginalDelegate')];
          n && (e = n);
          let o = r[Zone.__symbol__('OriginalDelegate')];
          o && (r = o);
     }
     return { nativeRequestAnimationFrame: e, nativeCancelAnimationFrame: r };
}
var V = class t {
          constructor({
               enableLongStackTrace: e = !1,
               shouldCoalesceEventChangeDetection: r = !1,
               shouldCoalesceRunChangeDetection: n = !1,
          }) {
               if (
                    ((this.hasPendingMacrotasks = !1),
                    (this.hasPendingMicrotasks = !1),
                    (this.isStable = !0),
                    (this.onUnstable = new ye(!1)),
                    (this.onMicrotaskEmpty = new ye(!1)),
                    (this.onStable = new ye(!1)),
                    (this.onError = new ye(!1)),
                    typeof Zone > 'u')
               )
                    throw new y(908, !1);
               Zone.assertZonePatched();
               let o = this;
               (o._nesting = 0),
                    (o._outer = o._inner = Zone.current),
                    Zone.TaskTrackingZoneSpec && (o._inner = o._inner.fork(new Zone.TaskTrackingZoneSpec())),
                    e && Zone.longStackTraceZoneSpec && (o._inner = o._inner.fork(Zone.longStackTraceZoneSpec)),
                    (o.shouldCoalesceEventChangeDetection = !n && r),
                    (o.shouldCoalesceRunChangeDetection = n),
                    (o.lastRequestAnimationFrameId = -1),
                    (o.nativeRequestAnimationFrame = qv().nativeRequestAnimationFrame),
                    Qv(o);
          }
          static isInAngularZone() {
               return typeof Zone < 'u' && Zone.current.get('isAngularZone') === !0;
          }
          static assertInAngularZone() {
               if (!t.isInAngularZone()) throw new y(909, !1);
          }
          static assertNotInAngularZone() {
               if (t.isInAngularZone()) throw new y(909, !1);
          }
          run(e, r, n) {
               return this._inner.run(e, r, n);
          }
          runTask(e, r, n, o) {
               let i = this._inner,
                    s = i.scheduleEventTask('NgZoneEvent: ' + o, e, Zv, el, el);
               try {
                    return i.runTask(s, r, n);
               } finally {
                    i.cancelTask(s);
               }
          }
          runGuarded(e, r, n) {
               return this._inner.runGuarded(e, r, n);
          }
          runOutsideAngular(e) {
               return this._outer.run(e);
          }
     },
     Zv = {};
function Oa(t) {
     if (t._nesting == 0 && !t.hasPendingMicrotasks && !t.isStable)
          try {
               t._nesting++, t.onMicrotaskEmpty.emit(null);
          } finally {
               if ((t._nesting--, !t.hasPendingMicrotasks))
                    try {
                         t.runOutsideAngular(() => t.onStable.emit(null));
                    } finally {
                         t.isStable = !0;
                    }
          }
}
function Yv(t) {
     t.isCheckStableRunning ||
          t.lastRequestAnimationFrameId !== -1 ||
          ((t.lastRequestAnimationFrameId = t.nativeRequestAnimationFrame.call(An, () => {
               t.fakeTopEventTask ||
                    (t.fakeTopEventTask = Zone.root.scheduleEventTask(
                         'fakeTopEventTask',
                         () => {
                              (t.lastRequestAnimationFrameId = -1),
                                   Ls(t),
                                   (t.isCheckStableRunning = !0),
                                   Oa(t),
                                   (t.isCheckStableRunning = !1);
                         },
                         void 0,
                         () => {},
                         () => {}
                    )),
                    t.fakeTopEventTask.invoke();
          })),
          Ls(t));
}
function Qv(t) {
     let e = () => {
          Yv(t);
     };
     t._inner = t._inner.fork({
          name: 'angular',
          properties: { isAngularZone: !0 },
          onInvokeTask: (r, n, o, i, s, a) => {
               if (Kv(a)) return r.invokeTask(o, i, s, a);
               try {
                    return tl(t), r.invokeTask(o, i, s, a);
               } finally {
                    ((t.shouldCoalesceEventChangeDetection && i.type === 'eventTask') ||
                         t.shouldCoalesceRunChangeDetection) &&
                         e(),
                         nl(t);
               }
          },
          onInvoke: (r, n, o, i, s, a, u) => {
               try {
                    return tl(t), r.invoke(o, i, s, a, u);
               } finally {
                    t.shouldCoalesceRunChangeDetection && e(), nl(t);
               }
          },
          onHasTask: (r, n, o, i) => {
               r.hasTask(o, i),
                    n === o &&
                         (i.change == 'microTask'
                              ? ((t._hasPendingMicrotasks = i.microTask), Ls(t), Oa(t))
                              : i.change == 'macroTask' && (t.hasPendingMacrotasks = i.macroTask));
          },
          onHandleError: (r, n, o, i) => (r.handleError(o, i), t.runOutsideAngular(() => t.onError.emit(i)), !1),
     });
}
function Ls(t) {
     t._hasPendingMicrotasks ||
     ((t.shouldCoalesceEventChangeDetection || t.shouldCoalesceRunChangeDetection) &&
          t.lastRequestAnimationFrameId !== -1)
          ? (t.hasPendingMicrotasks = !0)
          : (t.hasPendingMicrotasks = !1);
}
function tl(t) {
     t._nesting++, t.isStable && ((t.isStable = !1), t.onUnstable.emit(null));
}
function nl(t) {
     t._nesting--, Oa(t);
}
var sf = new E('', { providedIn: 'root', factory: af });
function af() {
     let t = p(V),
          e = !0,
          r = new O((o) => {
               (e = t.isStable && !t.hasPendingMacrotasks && !t.hasPendingMicrotasks),
                    t.runOutsideAngular(() => {
                         o.next(e), o.complete();
                    });
          }),
          n = new O((o) => {
               let i;
               t.runOutsideAngular(() => {
                    i = t.onStable.subscribe(() => {
                         V.assertNotInAngularZone(),
                              queueMicrotask(() => {
                                   !e && !t.hasPendingMacrotasks && !t.hasPendingMicrotasks && ((e = !0), o.next(!0));
                              });
                    });
               });
               let s = t.onUnstable.subscribe(() => {
                    V.assertInAngularZone(),
                         e &&
                              ((e = !1),
                              t.runOutsideAngular(() => {
                                   o.next(!1);
                              }));
               });
               return () => {
                    i.unsubscribe(), s.unsubscribe();
               };
          });
     return Ui(r, n.pipe(eo()));
}
function Kv(t) {
     return !Array.isArray(t) || t.length !== 1 ? !1 : t[0].data?.__ignore_ng_zone__ === !0;
}
var Ht = (function (t) {
          return (
               (t[(t.EarlyRead = 0)] = 'EarlyRead'),
               (t[(t.Write = 1)] = 'Write'),
               (t[(t.MixedReadWrite = 2)] = 'MixedReadWrite'),
               (t[(t.Read = 3)] = 'Read'),
               t
          );
     })(Ht || {}),
     Jv = { destroy() {} };
function Pa(t, e) {
     !e && pm(Pa);
     let r = e?.injector ?? p(Fe);
     if (!vm(r)) return Jv;
     un('NgAfterNextRender');
     let n = r.get(uf),
          o = (n.handler ??= new Vs()),
          i = e?.phase ?? Ht.MixedReadWrite,
          s = () => {
               o.unregister(u), a();
          },
          a = r.get(of).onDestroy(s),
          u = new js(r, i, () => {
               s(), t();
          });
     return o.register(u), { destroy: s };
}
var js = class {
          constructor(e, r, n) {
               (this.phase = r),
                    (this.callbackFn = n),
                    (this.zone = e.get(V)),
                    (this.errorHandler = e.get(Pe, null, { optional: !0 }));
          }
          invoke() {
               try {
                    this.zone.runOutsideAngular(this.callbackFn);
               } catch (e) {
                    this.errorHandler?.handleError(e);
               }
          }
     },
     Vs = class {
          constructor() {
               (this.executingCallbacks = !1),
                    (this.buckets = {
                         [Ht.EarlyRead]: new Set(),
                         [Ht.Write]: new Set(),
                         [Ht.MixedReadWrite]: new Set(),
                         [Ht.Read]: new Set(),
                    }),
                    (this.deferredCallbacks = new Set());
          }
          validateBegin() {
               if (this.executingCallbacks) throw new y(102, !1);
          }
          register(e) {
               (this.executingCallbacks ? this.deferredCallbacks : this.buckets[e.phase]).add(e);
          }
          unregister(e) {
               this.buckets[e.phase].delete(e), this.deferredCallbacks.delete(e);
          }
          execute() {
               this.executingCallbacks = !0;
               for (let e of Object.values(this.buckets)) for (let r of e) r.invoke();
               this.executingCallbacks = !1;
               for (let e of this.deferredCallbacks) this.buckets[e.phase].add(e);
               this.deferredCallbacks.clear();
          }
          destroy() {
               for (let e of Object.values(this.buckets)) e.clear();
               this.deferredCallbacks.clear();
          }
     },
     uf = (() => {
          let e = class e {
               constructor() {
                    (this.renderDepth = 0), (this.handler = null), (this.internalCallbacks = []);
               }
               begin() {
                    this.handler?.validateBegin(), this.renderDepth++;
               }
               end() {
                    if ((this.renderDepth--, this.renderDepth === 0)) {
                         for (let n of this.internalCallbacks) n();
                         (this.internalCallbacks.length = 0), this.handler?.execute();
                    }
               }
               ngOnDestroy() {
                    this.handler?.destroy(), (this.handler = null), (this.internalCallbacks.length = 0);
               }
          };
          e.ɵprov = w({ token: e, providedIn: 'root', factory: () => new e() });
          let t = e;
          return t;
     })();
function Xv(t, e) {
     let r = it(e, t),
          n = r[N];
     ey(n, r);
     let o = r[ze];
     o !== null && r[hs] === null && (r[hs] = Ma(o, r[qt])), Fa(n, r, r[pe]);
}
function ey(t, e) {
     for (let r = e.length; r < t.blueprint.length; r++) e.push(t.blueprint[r]);
}
function Fa(t, e, r) {
     oa(e);
     try {
          let n = t.viewQuery;
          n !== null && Ps(1, n, r);
          let o = t.template;
          o !== null && $d(t, e, o, 1, r),
               t.firstCreatePass && (t.firstCreatePass = !1),
               t.staticContentQueries && Kd(t, e),
               t.staticViewQueries && Ps(2, t.viewQuery, r);
          let i = t.components;
          i !== null && ty(e, i);
     } catch (n) {
          throw (t.firstCreatePass && ((t.incompleteFirstPass = !0), (t.firstCreatePass = !1)), n);
     } finally {
          (e[b] &= -5), ia();
     }
}
function ty(t, e) {
     for (let r = 0; r < e.length; r++) Xv(t, e[r]);
}
function $s(t, e, r) {
     let n = r ? t.styles : null,
          o = r ? t.classes : null,
          i = 0;
     if (e !== null)
          for (let s = 0; s < e.length; s++) {
               let a = e[s];
               if (typeof a == 'number') i = a;
               else if (i == 1) o = xc(o, a);
               else if (i == 2) {
                    let u = a,
                         c = e[++s];
                    n = xc(n, u + ': ' + c + ';');
               }
          }
     r ? (t.styles = n) : (t.stylesWithoutHost = n), r ? (t.classes = o) : (t.classesWithoutHost = o);
}
var xo = class extends Uo {
     constructor(e) {
          super(), (this.ngModule = e);
     }
     resolveComponentFactory(e) {
          let r = nt(e);
          return new tn(r, this.ngModule);
     }
};
function rl(t) {
     let e = [];
     for (let r in t)
          if (t.hasOwnProperty(r)) {
               let n = t[r];
               e.push({ propName: n, templateName: r });
          }
     return e;
}
function ny(t) {
     let e = t.toLowerCase();
     return e === 'svg' ? hg : e === 'math' ? pg : null;
}
var Us = class {
          constructor(e, r) {
               (this.injector = e), (this.parentInjector = r);
          }
          get(e, r, n) {
               n = Po(n);
               let o = this.injector.get(e, es, n);
               return o !== es || r === es ? o : this.parentInjector.get(e, r, n);
          }
     },
     tn = class extends Mo {
          get inputs() {
               let e = this.componentDef,
                    r = e.inputTransforms,
                    n = rl(e.inputs);
               if (r !== null) for (let o of n) r.hasOwnProperty(o.propName) && (o.transform = r[o.propName]);
               return n;
          }
          get outputs() {
               return rl(this.componentDef.outputs);
          }
          constructor(e, r) {
               super(),
                    (this.componentDef = e),
                    (this.ngModule = r),
                    (this.componentType = e.type),
                    (this.selector = og(e.selectors)),
                    (this.ngContentSelectors = e.ngContentSelectors ? e.ngContentSelectors : []),
                    (this.isBoundToModule = !!r);
          }
          create(e, r, n, o) {
               o = o || this.ngModule;
               let i = o instanceof ie ? o : o?.injector;
               i &&
                    this.componentDef.getStandaloneInjector !== null &&
                    (i = this.componentDef.getStandaloneInjector(i) || i);
               let s = i ? new Us(e, i) : e,
                    a = s.get(Ln, null);
               if (a === null) throw new y(407, !1);
               let u = s.get(tv, null),
                    c = s.get(uf, null),
                    l = { rendererFactory: a, sanitizer: u, inlineEffectRunner: null, afterRenderEventManager: c },
                    d = a.createRenderer(null, this.componentDef),
                    f = this.componentDef.selectors[0][0] || 'div',
                    h = n ? mv(d, n, this.componentDef.encapsulation, s) : Sd(d, f, ny(f)),
                    g = 4608,
                    S = this.componentDef.onPush ? 576 : 528,
                    I = this.componentDef.signals ? g : S,
                    v = null;
               h !== null && (v = Ma(h, s, !0));
               let B = Aa(0, null, null, 1, 0, null, null, null, null, null, null),
                    K = Bo(null, B, null, I, null, null, l, d, s, null, v);
               oa(K);
               let $, Me;
               try {
                    let ce = this.componentDef,
                         Ze,
                         Si = null;
                    ce.findHostDirectiveDefs
                         ? ((Ze = []), (Si = new Map()), ce.findHostDirectiveDefs(ce, Ze, Si), Ze.push(ce))
                         : (Ze = [ce]);
                    let Hh = ry(K, h),
                         zh = oy(Hh, h, ce, Ze, K, l, d);
                    (Me = ta(B, Re)),
                         h && ay(d, ce, h, n),
                         r !== void 0 && uy(Me, this.ngContentSelectors, r),
                         ($ = sy(zh, ce, Ze, Si, K, [cy])),
                         Fa(B, K, null);
               } finally {
                    ia();
               }
               return new Bs(this.componentType, $, Sa(Me, K), K, Me);
          }
     },
     Bs = class extends bs {
          constructor(e, r, n, o, i) {
               super(),
                    (this.location = n),
                    (this._rootLView = o),
                    (this._tNode = i),
                    (this.previousInputValues = null),
                    (this.instance = r),
                    (this.hostView = this.changeDetectorRef = new en(o, void 0, !1)),
                    (this.componentType = e);
          }
          setInput(e, r) {
               let n = this._tNode.inputs,
                    o;
               if (n !== null && (o = n[e])) {
                    if (
                         ((this.previousInputValues ??= new Map()),
                         this.previousInputValues.has(e) && Object.is(this.previousInputValues.get(e), r))
                    )
                         return;
                    let i = this._rootLView;
                    Na(i[N], i, o, e, r), this.previousInputValues.set(e, r);
                    let s = it(this._tNode.index, i);
                    Ra(s);
               }
          }
          get injector() {
               return new mt(this._tNode, this._rootLView);
          }
          destroy() {
               this.hostView.destroy();
          }
          onDestroy(e) {
               this.hostView.onDestroy(e);
          }
     };
function ry(t, e) {
     let r = t[N],
          n = Re;
     return (t[n] = e), Ho(r, n, 2, '#host', null);
}
function oy(t, e, r, n, o, i, s) {
     let a = o[N];
     iy(n, t, e, s);
     let u = null;
     e !== null && (u = Ma(e, o[qt]));
     let c = i.rendererFactory.createRenderer(e, r),
          l = 16;
     r.signals ? (l = 4096) : r.onPush && (l = 64);
     let d = Bo(o, zd(r), null, l, o[t.index], t, i, c, null, null, u);
     return a.firstCreatePass && Os(a, t, n.length - 1), zo(o, d), (o[t.index] = d);
}
function iy(t, e, r, n) {
     for (let o of t) e.mergedAttrs = Rn(e.mergedAttrs, o.hostAttrs);
     e.mergedAttrs !== null && ($s(e, e.mergedAttrs, !0), r !== null && Nd(n, r, e));
}
function sy(t, e, r, n, o, i) {
     let s = be(),
          a = o[N],
          u = Ee(s, o);
     qd(a, o, s, r, null, n);
     for (let l = 0; l < r.length; l++) {
          let d = s.directiveStart + l,
               f = Kt(o, a, d, s);
          Ct(f, o);
     }
     Zd(a, o, s), u && Ct(u, o);
     let c = Kt(o, a, s.directiveStart + s.componentOffset, s);
     if (((t[pe] = o[pe] = c), i !== null)) for (let l of i) l(c, e);
     return Ud(a, s, t), c;
}
function ay(t, e, r, n) {
     if (n) fs(t, r, ['ng-version', nv.full]);
     else {
          let { attrs: o, classes: i } = ig(e.selectors[0]);
          o && fs(t, r, o), i && i.length > 0 && Ad(t, r, i.join(' '));
     }
}
function uy(t, e, r) {
     let n = (t.projection = []);
     for (let o = 0; o < e.length; o++) {
          let i = r[o];
          n.push(i != null ? Array.from(i) : null);
     }
}
function cy() {
     let t = be();
     ua(U()[N], t);
}
function ly(t) {
     return Object.getPrototypeOf(t.prototype).constructor;
}
function dy(t) {
     let e = ly(t.type),
          r = !0,
          n = [t];
     for (; e; ) {
          let o;
          if (rt(t)) o = e.ɵcmp || e.ɵdir;
          else {
               if (e.ɵcmp) throw new y(903, !1);
               o = e.ɵdir;
          }
          if (o) {
               if (r) {
                    n.push(o);
                    let s = t;
                    (s.inputs = oo(t.inputs)),
                         (s.inputTransforms = oo(t.inputTransforms)),
                         (s.declaredInputs = oo(t.declaredInputs)),
                         (s.outputs = oo(t.outputs));
                    let a = o.hostBindings;
                    a && gy(t, a);
                    let u = o.viewQuery,
                         c = o.contentQueries;
                    if (
                         (u && hy(t, u),
                         c && py(t, c),
                         no(t.inputs, o.inputs),
                         no(t.declaredInputs, o.declaredInputs),
                         no(t.outputs, o.outputs),
                         o.inputTransforms !== null &&
                              (s.inputTransforms === null && (s.inputTransforms = {}),
                              no(s.inputTransforms, o.inputTransforms)),
                         rt(o) && o.data.animation)
                    ) {
                         let l = t.data;
                         l.animation = (l.animation || []).concat(o.data.animation);
                    }
               }
               let i = o.features;
               if (i)
                    for (let s = 0; s < i.length; s++) {
                         let a = i[s];
                         a && a.ngInherit && a(t), a === dy && (r = !1);
                    }
          }
          e = Object.getPrototypeOf(e);
     }
     fy(n);
}
function fy(t) {
     let e = 0,
          r = null;
     for (let n = t.length - 1; n >= 0; n--) {
          let o = t[n];
          (o.hostVars = e += o.hostVars), (o.hostAttrs = Rn(o.hostAttrs, (r = Rn(r, o.hostAttrs))));
     }
}
function oo(t) {
     return t === Gt ? {} : t === he ? [] : t;
}
function hy(t, e) {
     let r = t.viewQuery;
     r
          ? (t.viewQuery = (n, o) => {
                 e(n, o), r(n, o);
            })
          : (t.viewQuery = e);
}
function py(t, e) {
     let r = t.contentQueries;
     r
          ? (t.contentQueries = (n, o, i) => {
                 e(n, o, i), r(n, o, i);
            })
          : (t.contentQueries = e);
}
function gy(t, e) {
     let r = t.hostBindings;
     r
          ? (t.hostBindings = (n, o) => {
                 e(n, o), r(n, o);
            })
          : (t.hostBindings = e);
}
function ka(t) {
     let e = t.inputConfig,
          r = {};
     for (let n in e)
          if (e.hasOwnProperty(n)) {
               let o = e[n];
               Array.isArray(o) && o[2] && (r[n] = o[2]);
          }
     t.inputTransforms = r;
}
function my(t, e, r) {
     return (t[e] = r);
}
function Qn(t, e, r) {
     let n = t[e];
     return Object.is(n, r) ? !1 : ((t[e] = r), !0);
}
function cf(t, e, r, n) {
     return Qn(t, ra(), r) ? e + Js(r) + n : st;
}
function io(t, e) {
     return (t << 17) | (e << 2);
}
function Et(t) {
     return (t >> 17) & 32767;
}
function vy(t) {
     return (t & 2) == 2;
}
function yy(t, e) {
     return (t & 131071) | (e << 17);
}
function Hs(t) {
     return t | 2;
}
function nn(t) {
     return (t & 131068) >> 2;
}
function rs(t, e) {
     return (t & -131069) | (e << 2);
}
function Dy(t) {
     return (t & 1) === 1;
}
function zs(t) {
     return t | 1;
}
function wy(t, e, r, n, o, i) {
     let s = i ? e.classBindings : e.styleBindings,
          a = Et(s),
          u = nn(s);
     t[n] = r;
     let c = !1,
          l;
     if (Array.isArray(r)) {
          let d = r;
          (l = d[1]), (l === null || zn(d, l) > 0) && (c = !0);
     } else l = r;
     if (o)
          if (u !== 0) {
               let f = Et(t[a + 1]);
               (t[n + 1] = io(f, a)), f !== 0 && (t[f + 1] = rs(t[f + 1], n)), (t[a + 1] = yy(t[a + 1], n));
          } else (t[n + 1] = io(a, 0)), a !== 0 && (t[a + 1] = rs(t[a + 1], n)), (a = n);
     else (t[n + 1] = io(u, 0)), a === 0 ? (a = n) : (t[u + 1] = rs(t[u + 1], n)), (u = n);
     c && (t[n + 1] = Hs(t[n + 1])),
          ol(t, l, n, !0, i),
          ol(t, l, n, !1, i),
          Cy(e, l, t, n, i),
          (s = io(a, u)),
          i ? (e.classBindings = s) : (e.styleBindings = s);
}
function Cy(t, e, r, n, o) {
     let i = o ? t.residualClasses : t.residualStyles;
     i != null && typeof e == 'string' && zn(i, e) >= 0 && (r[n + 1] = zs(r[n + 1]));
}
function ol(t, e, r, n, o) {
     let i = t[r + 1],
          s = e === null,
          a = n ? Et(i) : nn(i),
          u = !1;
     for (; a !== 0 && (u === !1 || s); ) {
          let c = t[a],
               l = t[a + 1];
          Ey(c, e) && ((u = !0), (t[a + 1] = n ? zs(l) : Hs(l))), (a = n ? Et(l) : nn(l));
     }
     u && (t[r + 1] = n ? Hs(i) : zs(i));
}
function Ey(t, e) {
     return t === null || e == null || (Array.isArray(t) ? t[1] : t) === e
          ? !0
          : Array.isArray(t) && typeof e == 'string'
          ? zn(t, e) >= 0
          : !1;
}
function Iy(t, e, r) {
     let n = U(),
          o = ra();
     if (Qn(n, o, e)) {
          let i = Ie(),
               s = Ql();
          Wd(i, s, n, t, e, n[Y], r, !1);
     }
     return Iy;
}
function il(t, e, r, n, o) {
     let i = e.inputs,
          s = o ? 'class' : 'style';
     Na(t, r, i[s], s, n);
}
function La(t, e, r) {
     return lf(t, e, r, !1), La;
}
function by(t, e) {
     return lf(t, e, null, !0), by;
}
function lf(t, e, r, n) {
     let o = U(),
          i = Ie(),
          s = _g(2);
     if ((i.firstUpdatePass && Sy(i, t, s, n), e !== st && Qn(o, s, e))) {
          let a = i.data[on()];
          Ny(i, a, o, o[Y], t, (o[s + 1] = Ry(e, r)), n, s);
     }
}
function My(t, e) {
     return e >= t.expandoStartIndex;
}
function Sy(t, e, r, n) {
     let o = t.data;
     if (o[r + 1] === null) {
          let i = o[on()],
               s = My(t, r);
          Oy(i, n) && e === null && !s && (e = !1), (e = Ty(o, i, e, n)), wy(o, i, e, r, s, n);
     }
}
function Ty(t, e, r, n) {
     let o = Og(t),
          i = n ? e.residualClasses : e.residualStyles;
     if (o === null)
          (n ? e.classBindings : e.styleBindings) === 0 &&
               ((r = os(null, t, e, r, n)), (r = jn(r, e.attrs, n)), (i = null));
     else {
          let s = e.directiveStylingLast;
          if (s === -1 || t[s] !== o)
               if (((r = os(o, t, e, r, n)), i === null)) {
                    let u = xy(t, e, n);
                    u !== void 0 &&
                         Array.isArray(u) &&
                         ((u = os(null, t, e, u[1], n)), (u = jn(u, e.attrs, n)), _y(t, e, n, u));
               } else i = Ay(t, e, n);
     }
     return i !== void 0 && (n ? (e.residualClasses = i) : (e.residualStyles = i)), r;
}
function xy(t, e, r) {
     let n = r ? e.classBindings : e.styleBindings;
     if (nn(n) !== 0) return t[Et(n)];
}
function _y(t, e, r, n) {
     let o = r ? e.classBindings : e.styleBindings;
     t[Et(o)] = n;
}
function Ay(t, e, r) {
     let n,
          o = e.directiveEnd;
     for (let i = 1 + e.directiveStylingLast; i < o; i++) {
          let s = t[i].hostAttrs;
          n = jn(n, s, r);
     }
     return jn(n, e.attrs, r);
}
function os(t, e, r, n, o) {
     let i = null,
          s = r.directiveEnd,
          a = r.directiveStylingLast;
     for (a === -1 ? (a = r.directiveStart) : a++; a < s && ((i = e[a]), (n = jn(n, i.hostAttrs, o)), i !== t); ) a++;
     return t !== null && (r.directiveStylingLast = a), n;
}
function jn(t, e, r) {
     let n = r ? 1 : 2,
          o = -1;
     if (e !== null)
          for (let i = 0; i < e.length; i++) {
               let s = e[i];
               typeof s == 'number'
                    ? (o = s)
                    : o === n && (Array.isArray(t) || (t = t === void 0 ? [] : ['', t]), tm(t, s, r ? !0 : e[++i]));
          }
     return t === void 0 ? null : t;
}
function Ny(t, e, r, n, o, i, s, a) {
     if (!(e.type & 3)) return;
     let u = t.data,
          c = u[a + 1],
          l = Dy(c) ? sl(u, e, r, o, nn(c), s) : void 0;
     if (!_o(l)) {
          _o(i) || (vy(c) && (i = sl(u, null, r, o, a, s)));
          let d = Ll(on(), r);
          Hm(n, s, d, o, i);
     }
}
function sl(t, e, r, n, o, i) {
     let s = e === null,
          a;
     for (; o > 0; ) {
          let u = t[o],
               c = Array.isArray(u),
               l = c ? u[1] : u,
               d = l === null,
               f = r[o + 1];
          f === st && (f = d ? he : void 0);
          let h = d ? Ki(f, n) : l === n ? f : void 0;
          if ((c && !_o(h) && (h = Ki(u, n)), _o(h) && ((a = h), s))) return a;
          let g = t[o + 1];
          o = s ? Et(g) : nn(g);
     }
     if (e !== null) {
          let u = i ? e.residualClasses : e.residualStyles;
          u != null && (a = Ki(u, n));
     }
     return a;
}
function _o(t) {
     return t !== void 0;
}
function Ry(t, e) {
     return t == null || t === '' || (typeof e == 'string' ? (t = t + e) : typeof t == 'object' && (t = oe(Zn(t)))), t;
}
function Oy(t, e) {
     return (t.flags & (e ? 8 : 16)) !== 0;
}
var ZT = new RegExp(`^(\\d+)*(${Ym}|${Zm})*(.*)`);
var Py = (t, e) => null;
function Ws(t, e) {
     return Py(t, e);
}
function Fy(t, e, r, n) {
     let o = e.tView,
          s = t[b] & 4096 ? 4096 : 16,
          a = Bo(t, o, r, s, null, e, null, null, null, n?.injector ?? null, n?.dehydratedView ?? null),
          u = t[e.index];
     a[Fo] = u;
     let c = t[Fn];
     return c !== null && (a[Fn] = c.createEmbeddedView(o)), Fa(o, a, r), a;
}
function ky(t, e) {
     let r = le + e;
     if (r < t.length) return t[r];
}
function Gs(t, e) {
     return !e || Cd(t);
}
function df(t, e, r, n = !0) {
     let o = e[N];
     if ((_m(o, e, t, r), n)) {
          let i = Is(r, t),
               s = e[Y],
               a = Ca(s, t[yt]);
          a !== null && Sm(o, t[Ce], s, e, a, i);
     }
}
function Ly(t, e) {
     let r = Eo(t, e);
     return r !== void 0 && wa(r[N], r), r;
}
var Go = (() => {
     let e = class e {};
     e.__NG_ELEMENT_ID__ = jy;
     let t = e;
     return t;
})();
function jy() {
     let t = be();
     return $y(t, U());
}
var Vy = Go,
     ff = class extends Vy {
          constructor(e, r, n) {
               super(), (this._lContainer = e), (this._hostTNode = r), (this._hostLView = n);
          }
          get element() {
               return Sa(this._hostTNode, this._hostLView);
          }
          get injector() {
               return new mt(this._hostTNode, this._hostLView);
          }
          get parentInjector() {
               let e = ca(this._hostTNode, this._hostLView);
               if (Xl(e)) {
                    let r = yo(e, this._hostLView),
                         n = vo(e),
                         o = r[N].data[n + 8];
                    return new mt(o, r);
               } else return new mt(null, this._hostLView);
          }
          clear() {
               for (; this.length > 0; ) this.remove(this.length - 1);
          }
          get(e) {
               let r = al(this._lContainer);
               return (r !== null && r[e]) || null;
          }
          get length() {
               return this._lContainer.length - le;
          }
          createEmbeddedView(e, r, n) {
               let o, i;
               typeof n == 'number' ? (o = n) : n != null && ((o = n.index), (i = n.injector));
               let s = Ws(this._lContainer, e.ssrId),
                    a = e.createEmbeddedViewImpl(r || {}, i, s);
               return this.insertImpl(a, o, Gs(this._hostTNode, s)), a;
          }
          createComponent(e, r, n, o, i) {
               let s = e && !Jg(e),
                    a;
               if (s) a = r;
               else {
                    let g = r || {};
                    (a = g.index),
                         (n = g.injector),
                         (o = g.projectableNodes),
                         (i = g.environmentInjector || g.ngModuleRef);
               }
               let u = s ? e : new tn(nt(e)),
                    c = n || this.parentInjector;
               if (!i && u.ngModule == null) {
                    let S = (s ? c : this.parentInjector).get(ie, null);
                    S && (i = S);
               }
               let l = nt(u.componentType ?? {}),
                    d = Ws(this._lContainer, l?.id ?? null),
                    f = d?.firstChild ?? null,
                    h = u.create(c, o, f, i);
               return this.insertImpl(h.hostView, a, Gs(this._hostTNode, d)), h;
          }
          insert(e, r) {
               return this.insertImpl(e, r, !0);
          }
          insertImpl(e, r, n) {
               let o = e._lView;
               if (gg(o)) {
                    let a = this.indexOf(e);
                    if (a !== -1) this.detach(a);
                    else {
                         let u = o[G],
                              c = new ff(u, u[Ce], u[G]);
                         c.detach(c.indexOf(e));
                    }
               }
               let i = this._adjustIndex(r),
                    s = this._lContainer;
               return df(s, o, i, n), e.attachToViewContainerRef(), cd(is(s), i, e), e;
          }
          move(e, r) {
               return this.insert(e, r);
          }
          indexOf(e) {
               let r = al(this._lContainer);
               return r !== null ? r.indexOf(e) : -1;
          }
          remove(e) {
               let r = this._adjustIndex(e, -1),
                    n = Eo(this._lContainer, r);
               n && (wo(is(this._lContainer), r), wa(n[N], n));
          }
          detach(e) {
               let r = this._adjustIndex(e, -1),
                    n = Eo(this._lContainer, r);
               return n && wo(is(this._lContainer), r) != null ? new en(n) : null;
          }
          _adjustIndex(e, r = 0) {
               return e ?? this.length + r;
          }
     };
function al(t) {
     return t[po];
}
function is(t) {
     return t[po] || (t[po] = []);
}
function $y(t, e) {
     let r,
          n = e[t.index];
     return we(n) ? (r = n) : ((r = Qd(n, e, null, t)), (e[t.index] = r), zo(e, r)), By(r, e, t, n), new ff(r, t, e);
}
function Uy(t, e) {
     let r = t[Y],
          n = r.createComment(''),
          o = Ee(e, t),
          i = Ca(r, o);
     return Io(r, i, n, km(r, o), !1), n;
}
var By = Wy,
     Hy = (t, e, r) => !1;
function zy(t, e, r) {
     return Hy(t, e, r);
}
function Wy(t, e, r, n) {
     if (t[yt]) return;
     let o;
     r.type & 8 ? (o = Oe(n)) : (o = Uy(e, r)), (t[yt] = o);
}
function Gy(t, e, r, n, o, i, s, a, u) {
     let c = e.consts,
          l = Ho(e, t, 4, s || null, mo(c, a));
     Gd(e, r, l, mo(c, u)), ua(e, l);
     let d = (l.tView = Aa(2, l, n, o, i, e.directiveRegistry, e.pipeRegistry, null, e.schemas, c, null));
     return e.queries !== null && (e.queries.template(e, l), (d.queries = e.queries.embeddedTView(l))), l;
}
function qy(t, e, r, n, o, i, s, a) {
     let u = U(),
          c = Ie(),
          l = t + Re,
          d = c.firstCreatePass ? Gy(l, c, u, e, r, n, o, i, s) : c.data[l];
     Hn(d, !1);
     let f = Zy(c, u, d, t);
     sa() && Ea(c, u, f, d), Ct(f, u);
     let h = Qd(f, u, f, d);
     return (u[l] = h), zo(u, h), zy(h, d, u), ea(d) && Bd(c, u, d), s != null && Hd(u, d, a), qy;
}
var Zy = Yy;
function Yy(t, e, r, n) {
     return aa(!0), e[Y].createComment('');
}
function QT(t, e, r) {
     un('NgControlFlow');
     let n = U(),
          o = ra(),
          i = Qy(n, Re + t),
          s = 0;
     if (Qn(n, o, e)) {
          let a = ee(null);
          try {
               if ((Ly(i, s), e !== -1)) {
                    let u = Ky(n[N], e),
                         c = Ws(i, u.tView.ssrId),
                         l = Fy(n, u, r, { dehydratedView: c });
                    df(i, l, s, Gs(u, c));
               }
          } finally {
               ee(a);
          }
     } else {
          let a = ky(i, s);
          a !== void 0 && (a[pe] = r);
     }
}
function Qy(t, e) {
     return t[e];
}
function Ky(t, e) {
     return ta(t, e + Re);
}
function Jy(t, e, r, n, o, i) {
     let s = e.consts,
          a = mo(s, o),
          u = Ho(e, t, 2, n, a);
     return (
          Gd(e, r, u, mo(s, i)),
          u.attrs !== null && $s(u, u.attrs, !1),
          u.mergedAttrs !== null && $s(u, u.mergedAttrs, !0),
          e.queries !== null && e.queries.elementStart(e, u),
          u
     );
}
function hf(t, e, r, n) {
     let o = U(),
          i = Ie(),
          s = Re + t,
          a = o[Y],
          u = i.firstCreatePass ? Jy(s, i, o, e, r, n) : i.data[s],
          c = Xy(i, o, u, a, e, t);
     o[s] = c;
     let l = ea(u);
     return (
          Hn(u, !0),
          Nd(a, c, u),
          (u.flags & 32) !== 32 && sa() && Ea(i, o, c, u),
          Dg() === 0 && Ct(c, o),
          wg(),
          l && (Bd(i, o, u), Ud(i, u, o)),
          n !== null && Hd(o, u),
          hf
     );
}
function pf() {
     let t = be();
     Hl() ? Sg() : ((t = t.parent), Hn(t, !1));
     let e = t;
     Ig(e) && bg(), Cg();
     let r = Ie();
     return (
          r.firstCreatePass && (ua(r, t), Ol(t) && r.queries.elementEnd(t)),
          e.classesWithoutHost != null && $g(e) && il(r, e, U(), e.classesWithoutHost, !0),
          e.stylesWithoutHost != null && Ug(e) && il(r, e, U(), e.stylesWithoutHost, !1),
          pf
     );
}
function ja(t, e, r, n) {
     return hf(t, e, r, n), pf(), ja;
}
var Xy = (t, e, r, n, o, i) => (aa(!0), Sd(n, o, kg()));
var Ao = 'en-US';
var eD = Ao;
function tD(t) {
     Fp(t, 'Expected localeId to be defined'), typeof t == 'string' && (eD = t.toLowerCase().replace(/_/g, '-'));
}
function Kn(t) {
     return !!t && typeof t.then == 'function';
}
function gf(t) {
     return !!t && typeof t.subscribe == 'function';
}
function mf(t, e, r, n) {
     let o = U(),
          i = Ie(),
          s = be();
     return rD(i, o, o[Y], s, t, e, n), mf;
}
function nD(t, e, r, n) {
     let o = t.cleanup;
     if (o != null)
          for (let i = 0; i < o.length - 1; i += 2) {
               let s = o[i];
               if (s === r && o[i + 1] === n) {
                    let a = e[On],
                         u = o[i + 2];
                    return a.length > u ? a[u] : null;
               }
               typeof s == 'string' && (i += 2);
          }
     return null;
}
function rD(t, e, r, n, o, i, s) {
     let a = ea(n),
          c = t.firstCreatePass && kv(t),
          l = e[pe],
          d = Fv(e),
          f = !0;
     if (n.type & 3 || s) {
          let S = Ee(n, e),
               I = s ? s(S) : S,
               v = d.length,
               B = s ? ($) => s(Oe($[n.index])) : n.index,
               K = null;
          if ((!s && a && (K = nD(t, e, o, n.index)), K !== null)) {
               let $ = K.__ngLastListenerFn__ || K;
               ($.__ngNextListenerFn__ = i), (K.__ngLastListenerFn__ = i), (f = !1);
          } else {
               i = cl(n, e, l, i, !1);
               let $ = r.listen(I, o, i);
               d.push(i, $), c && c.push(o, B, v, v + 1);
          }
     } else i = cl(n, e, l, i, !1);
     let h = n.outputs,
          g;
     if (f && h !== null && (g = h[o])) {
          let S = g.length;
          if (S)
               for (let I = 0; I < S; I += 2) {
                    let v = g[I],
                         B = g[I + 1],
                         Me = e[v][B].subscribe(i),
                         ce = d.length;
                    d.push(i, Me), c && c.push(o, n.index, ce, -(ce + 1));
               }
     }
}
function ul(t, e, r, n) {
     try {
          return xe(6, e, r), r(n) !== !1;
     } catch (o) {
          return Jd(t, o), !1;
     } finally {
          xe(7, e, r);
     }
}
function cl(t, e, r, n, o) {
     return function i(s) {
          if (s === Function) return n;
          let a = t.componentOffset > -1 ? it(t.index, e) : e;
          Ra(a);
          let u = ul(e, r, n, s),
               c = i.__ngNextListenerFn__;
          for (; c; ) (u = ul(e, r, c, s) && u), (c = c.__ngNextListenerFn__);
          return o && u === !1 && s.preventDefault(), u;
     };
}
function KT(t = 1) {
     return Fg(t);
}
function oD(t, e, r, n, o) {
     let i = U(),
          s = cf(i, e, r, n);
     if (s !== st) {
          let a = Ie(),
               u = Ql();
          Wd(a, u, i, t, s, i[Y], o, !1);
     }
     return oD;
}
function JT(t, e = '') {
     let r = U(),
          n = Ie(),
          o = t + Re,
          i = n.firstCreatePass ? Ho(n, o, 1, e, null) : n.data[o],
          s = iD(n, r, i, e, t);
     (r[o] = s), sa() && Ea(n, r, s, i), Hn(i, !1);
}
var iD = (t, e, r, n, o) => (aa(!0), Im(e[Y], n));
function sD(t, e, r) {
     let n = U(),
          o = cf(n, t, e, r);
     return o !== st && Lv(n, on(), o), sD;
}
function aD(t, e, r) {
     let n = Ie();
     if (n.firstCreatePass) {
          let o = rt(t);
          qs(r, n.data, n.blueprint, o, !0), qs(e, n.data, n.blueprint, o, !1);
     }
}
function qs(t, e, r, n, o) {
     if (((t = re(t)), Array.isArray(t))) for (let i = 0; i < t.length; i++) qs(t[i], e, r, n, o);
     else {
          let i = Ie(),
               s = U(),
               a = be(),
               u = Jt(t) ? t : re(t.provide),
               c = gd(t),
               l = a.providerIndexes & 1048575,
               d = a.directiveStart,
               f = a.providerIndexes >> 20;
          if (Jt(t) || !t.multi) {
               let h = new wt(c, o, We),
                    g = as(u, e, o ? l : l + f, d);
               g === -1
                    ? (vs(Do(a, s), i, u),
                      ss(i, t, e.length),
                      e.push(u),
                      a.directiveStart++,
                      a.directiveEnd++,
                      o && (a.providerIndexes += 1048576),
                      r.push(h),
                      s.push(h))
                    : ((r[g] = h), (s[g] = h));
          } else {
               let h = as(u, e, l + f, d),
                    g = as(u, e, l, l + f),
                    S = h >= 0 && r[h],
                    I = g >= 0 && r[g];
               if ((o && !I) || (!o && !S)) {
                    vs(Do(a, s), i, u);
                    let v = lD(o ? cD : uD, r.length, o, n, c);
                    !o && I && (r[g].providerFactory = v),
                         ss(i, t, e.length, 0),
                         e.push(u),
                         a.directiveStart++,
                         a.directiveEnd++,
                         o && (a.providerIndexes += 1048576),
                         r.push(v),
                         s.push(v);
               } else {
                    let v = vf(r[o ? g : h], c, !o && n);
                    ss(i, t, h > -1 ? h : g, v);
               }
               !o && n && I && r[g].componentProviders++;
          }
     }
}
function ss(t, e, r, n) {
     let o = Jt(e),
          i = am(e);
     if (o || i) {
          let u = (i ? re(e.useClass) : e).prototype.ngOnDestroy;
          if (u) {
               let c = t.destroyHooks || (t.destroyHooks = []);
               if (!o && e.multi) {
                    let l = c.indexOf(r);
                    l === -1 ? c.push(r, [n, u]) : c[l + 1].push(n, u);
               } else c.push(r, u);
          }
     }
}
function vf(t, e, r) {
     return r && t.componentProviders++, t.multi.push(e) - 1;
}
function as(t, e, r, n) {
     for (let o = r; o < n; o++) if (e[o] === t) return o;
     return -1;
}
function uD(t, e, r, n) {
     return Zs(this.multi, []);
}
function cD(t, e, r, n) {
     let o = this.multi,
          i;
     if (this.providerFactory) {
          let s = this.providerFactory.componentProviders,
               a = Kt(r, r[N], this.providerFactory.index, n);
          (i = a.slice(0, s)), Zs(o, i);
          for (let u = s; u < a.length; u++) i.push(a[u]);
     } else (i = []), Zs(o, i);
     return i;
}
function Zs(t, e) {
     for (let r = 0; r < t.length; r++) {
          let n = t[r];
          e.push(n());
     }
     return e;
}
function lD(t, e, r, n, o) {
     let i = new wt(t, r, We);
     return (i.multi = []), (i.index = e), (i.componentProviders = 0), vf(i, o, n && !r), i;
}
function XT(t, e = []) {
     return (r) => {
          r.providersResolver = (n, o) => aD(n, o ? o(t) : t, e);
     };
}
var ot = class {},
     Vn = class {};
var Ys = class extends ot {
          constructor(e, r, n) {
               super(),
                    (this._parent = r),
                    (this._bootstrapComponents = []),
                    (this.destroyCbs = []),
                    (this.componentFactoryResolver = new xo(this));
               let o = xl(e);
               (this._bootstrapComponents = wd(o.bootstrap)),
                    (this._r3Injector = vd(
                         e,
                         r,
                         [
                              { provide: ot, useValue: this },
                              { provide: Uo, useValue: this.componentFactoryResolver },
                              ...n,
                         ],
                         oe(e),
                         new Set(['environment'])
                    )),
                    this._r3Injector.resolveInjectorInitializers(),
                    (this.instance = this._r3Injector.get(e));
          }
          get injector() {
               return this._r3Injector;
          }
          destroy() {
               let e = this._r3Injector;
               !e.destroyed && e.destroy(), this.destroyCbs.forEach((r) => r()), (this.destroyCbs = null);
          }
          onDestroy(e) {
               this.destroyCbs.push(e);
          }
     },
     Qs = class extends Vn {
          constructor(e) {
               super(), (this.moduleType = e);
          }
          create(e) {
               return new Ys(this.moduleType, e, []);
          }
     };
var No = class extends ot {
     constructor(e) {
          super(), (this.componentFactoryResolver = new xo(this)), (this.instance = null);
          let r = new kn(
               [
                    ...e.providers,
                    { provide: ot, useValue: this },
                    { provide: Uo, useValue: this.componentFactoryResolver },
               ],
               e.parent || ha(),
               e.debugName,
               new Set(['environment'])
          );
          (this.injector = r), e.runEnvironmentInitializers && r.resolveInjectorInitializers();
     }
     destroy() {
          this.injector.destroy();
     }
     onDestroy(e) {
          this.injector.onDestroy(e);
     }
};
function qo(t, e, r = null) {
     return new No({ providers: t, parent: e, debugName: r, runEnvironmentInitializers: !0 }).injector;
}
var dD = (() => {
     let e = class e {
          constructor(n) {
               (this._injector = n), (this.cachedInjectors = new Map());
          }
          getOrCreateStandaloneInjector(n) {
               if (!n.standalone) return null;
               if (!this.cachedInjectors.has(n)) {
                    let o = fd(!1, n.type),
                         i = o.length > 0 ? qo([o], this._injector, `Standalone[${n.type.name}]`) : null;
                    this.cachedInjectors.set(n, i);
               }
               return this.cachedInjectors.get(n);
          }
          ngOnDestroy() {
               try {
                    for (let n of this.cachedInjectors.values()) n !== null && n.destroy();
               } finally {
                    this.cachedInjectors.clear();
               }
          }
     };
     e.ɵprov = w({ token: e, providedIn: 'environment', factory: () => new e(D(ie)) });
     let t = e;
     return t;
})();
function yf(t) {
     un('NgStandalone'), (t.getStandaloneInjector = (e) => e.get(dD).getOrCreateStandaloneInjector(t));
}
function ex(t, e, r, n) {
     return hD(U(), Tg(), t, e, r, n);
}
function fD(t, e) {
     let r = t[e];
     return r === st ? void 0 : r;
}
function hD(t, e, r, n, o, i) {
     let s = e + r;
     return Qn(t, s, o) ? my(t, s + 1, i ? n.call(i, o) : n(o)) : fD(t, s + 1);
}
var Zo = new E('Application Initializer'),
     Df = (() => {
          let e = class e {
               constructor() {
                    (this.initialized = !1),
                         (this.done = !1),
                         (this.donePromise = new Promise((n, o) => {
                              (this.resolve = n), (this.reject = o);
                         })),
                         (this.appInits = p(Zo, { optional: !0 }) ?? []);
               }
               runInitializers() {
                    if (this.initialized) return;
                    let n = [];
                    for (let i of this.appInits) {
                         let s = i();
                         if (Kn(s)) n.push(s);
                         else if (gf(s)) {
                              let a = new Promise((u, c) => {
                                   s.subscribe({ complete: u, error: c });
                              });
                              n.push(a);
                         }
                    }
                    let o = () => {
                         (this.done = !0), this.resolve();
                    };
                    Promise.all(n)
                         .then(() => {
                              o();
                         })
                         .catch((i) => {
                              this.reject(i);
                         }),
                         n.length === 0 && o(),
                         (this.initialized = !0);
               }
          };
          (e.ɵfac = function (o) {
               return new (o || e)();
          }),
               (e.ɵprov = w({ token: e, factory: e.ɵfac, providedIn: 'root' }));
          let t = e;
          return t;
     })(),
     Yo = (() => {
          let e = class e {
               log(n) {
                    console.log(n);
               }
               warn(n) {
                    console.warn(n);
               }
          };
          (e.ɵfac = function (o) {
               return new (o || e)();
          }),
               (e.ɵprov = w({ token: e, factory: e.ɵfac, providedIn: 'platform' }));
          let t = e;
          return t;
     })();
function pD() {
     return (typeof $localize < 'u' && $localize.locale) || Ao;
}
var Va = new E('LocaleId', { providedIn: 'root', factory: () => p(Va, A.Optional | A.SkipSelf) || pD() });
var cn = (() => {
          let e = class e {
               constructor() {
                    (this.taskId = 0), (this.pendingTasks = new Set()), (this.hasPendingTasks = new J(!1));
               }
               add() {
                    this.hasPendingTasks.next(!0);
                    let n = this.taskId++;
                    return this.pendingTasks.add(n), n;
               }
               remove(n) {
                    this.pendingTasks.delete(n), this.pendingTasks.size === 0 && this.hasPendingTasks.next(!1);
               }
               ngOnDestroy() {
                    this.pendingTasks.clear(), this.hasPendingTasks.next(!1);
               }
          };
          (e.ɵfac = function (o) {
               return new (o || e)();
          }),
               (e.ɵprov = w({ token: e, factory: e.ɵfac, providedIn: 'root' }));
          let t = e;
          return t;
     })(),
     Ks = class {
          constructor(e, r) {
               (this.ngModuleFactory = e), (this.componentFactories = r);
          }
     },
     Qo = (() => {
          let e = class e {
               compileModuleSync(n) {
                    return new Qs(n);
               }
               compileModuleAsync(n) {
                    return Promise.resolve(this.compileModuleSync(n));
               }
               compileModuleAndAllComponentsSync(n) {
                    let o = this.compileModuleSync(n),
                         i = xl(n),
                         s = wd(i.declarations).reduce((a, u) => {
                              let c = nt(u);
                              return c && a.push(new tn(c)), a;
                         }, []);
                    return new Ks(o, s);
               }
               compileModuleAndAllComponentsAsync(n) {
                    return Promise.resolve(this.compileModuleAndAllComponentsSync(n));
               }
               clearCache() {}
               clearCacheFor(n) {}
               getModuleId(n) {}
          };
          (e.ɵfac = function (o) {
               return new (o || e)();
          }),
               (e.ɵprov = w({ token: e, factory: e.ɵfac, providedIn: 'root' }));
          let t = e;
          return t;
     })();
var wf = new E('');
var lo = null;
var Cf = new E('PlatformDestroyListeners'),
     Jn = new E('appBootstrapListener');
function gD() {
     tc(() => {
          throw new y(600, !1);
     });
}
function mD(t) {
     return t.isBoundToModule;
}
function vD(t = []) {
     if (lo) return lo;
     let e = DD(t);
     return (lo = e), gD(), yD(e), e;
}
function yD(t) {
     t.get(ga, null)?.forEach((r) => r());
}
function Ef(t) {
     try {
          let { rootComponent: e, appProviders: r, platformProviders: n } = t,
               o = vD(n),
               i = [MD(), ...(r || [])],
               a = new No({ providers: i, parent: o, debugName: '', runEnvironmentInitializers: !1 }).injector,
               u = a.get(V);
          return u.run(() => {
               a.resolveInjectorInitializers();
               let c = a.get(Pe, null),
                    l;
               u.runOutsideAngular(() => {
                    l = u.onError.subscribe({
                         next: (h) => {
                              c.handleError(h);
                         },
                    });
               });
               let d = () => a.destroy(),
                    f = o.get(Cf);
               return (
                    f.add(d),
                    a.onDestroy(() => {
                         l.unsubscribe(), f.delete(d);
                    }),
                    CD(c, u, () => {
                         let h = a.get(Df);
                         return (
                              h.runInitializers(),
                              h.donePromise.then(() => {
                                   let g = a.get(Va, Ao);
                                   tD(g || Ao);
                                   let S = a.get(ln);
                                   return e !== void 0 && S.bootstrap(e), S;
                              })
                         );
                    })
               );
          });
     } catch (e) {
          return Promise.reject(e);
     }
}
function DD(t = [], e) {
     return Fe.create({
          name: e,
          providers: [
               { provide: $o, useValue: 'platform' },
               { provide: Cf, useValue: new Set([() => (lo = null)]) },
               ...t,
          ],
     });
}
function wD(t) {
     return {
          enableLongStackTrace: !1,
          shouldCoalesceEventChangeDetection: t?.eventCoalescing ?? !1,
          shouldCoalesceRunChangeDetection: t?.runCoalescing ?? !1,
     };
}
function CD(t, e, r) {
     try {
          let n = r();
          return Kn(n)
               ? n.catch((o) => {
                      throw (e.runOutsideAngular(() => t.handleError(o)), o);
                 })
               : n;
     } catch (n) {
          throw (e.runOutsideAngular(() => t.handleError(n)), n);
     }
}
var ln = (() => {
     let e = class e {
          constructor() {
               (this._bootstrapListeners = []),
                    (this._runningTick = !1),
                    (this._destroyed = !1),
                    (this._destroyListeners = []),
                    (this._views = []),
                    (this.internalErrorHandler = p(If)),
                    (this.zoneIsStable = p(sf)),
                    (this.componentTypes = []),
                    (this.components = []),
                    (this.isStable = p(cn).hasPendingTasks.pipe(
                         X((n) => (n ? C(!1) : this.zoneIsStable)),
                         Hi(),
                         eo()
                    )),
                    (this._injector = p(ie));
          }
          get destroyed() {
               return this._destroyed;
          }
          get injector() {
               return this._injector;
          }
          bootstrap(n, o) {
               let i = n instanceof Mo;
               if (!this._injector.get(Df).done) {
                    let g =
                         'Cannot bootstrap as there are still asynchronous initializers running.' +
                         (!i && Tl(n) ? '' : ' Bootstrap components in the `ngDoBootstrap` method of the root module.');
                    throw new y(405, !1);
               }
               let a;
               i ? (a = n) : (a = this._injector.get(Uo).resolveComponentFactory(n)),
                    this.componentTypes.push(a.componentType);
               let u = mD(a) ? void 0 : this._injector.get(ot),
                    c = o || a.selector,
                    l = a.create(Fe.NULL, [], c, u),
                    d = l.location.nativeElement,
                    f = l.injector.get(wf, null);
               return (
                    f?.registerApplication(d),
                    l.onDestroy(() => {
                         this.detachView(l.hostView), us(this.components, l), f?.unregisterApplication(d);
                    }),
                    this._loadComponent(l),
                    l
               );
          }
          tick() {
               if (this._runningTick) throw new y(101, !1);
               try {
                    this._runningTick = !0;
                    for (let n of this._views) n.detectChanges();
               } catch (n) {
                    this.internalErrorHandler(n);
               } finally {
                    this._runningTick = !1;
               }
          }
          attachView(n) {
               let o = n;
               this._views.push(o), o.attachToAppRef(this);
          }
          detachView(n) {
               let o = n;
               us(this._views, o), o.detachFromAppRef();
          }
          _loadComponent(n) {
               this.attachView(n.hostView), this.tick(), this.components.push(n);
               let o = this._injector.get(Jn, []);
               [...this._bootstrapListeners, ...o].forEach((i) => i(n));
          }
          ngOnDestroy() {
               if (!this._destroyed)
                    try {
                         this._destroyListeners.forEach((n) => n()), this._views.slice().forEach((n) => n.destroy());
                    } finally {
                         (this._destroyed = !0),
                              (this._views = []),
                              (this._bootstrapListeners = []),
                              (this._destroyListeners = []);
                    }
          }
          onDestroy(n) {
               return this._destroyListeners.push(n), () => us(this._destroyListeners, n);
          }
          destroy() {
               if (this._destroyed) throw new y(406, !1);
               let n = this._injector;
               n.destroy && !n.destroyed && n.destroy();
          }
          get viewCount() {
               return this._views.length;
          }
          warnIfDestroyed() {}
     };
     (e.ɵfac = function (o) {
          return new (o || e)();
     }),
          (e.ɵprov = w({ token: e, factory: e.ɵfac, providedIn: 'root' }));
     let t = e;
     return t;
})();
function us(t, e) {
     let r = t.indexOf(e);
     r > -1 && t.splice(r, 1);
}
var If = new E('', { providedIn: 'root', factory: () => p(Pe).handleError.bind(void 0) });
function ED() {
     let t = p(V),
          e = p(Pe);
     return (r) => t.runOutsideAngular(() => e.handleError(r));
}
var ID = (() => {
     let e = class e {
          constructor() {
               (this.zone = p(V)), (this.applicationRef = p(ln));
          }
          initialize() {
               this._onMicrotaskEmptySubscription ||
                    (this._onMicrotaskEmptySubscription = this.zone.onMicrotaskEmpty.subscribe({
                         next: () => {
                              this.zone.run(() => {
                                   this.applicationRef.tick();
                              });
                         },
                    }));
          }
          ngOnDestroy() {
               this._onMicrotaskEmptySubscription?.unsubscribe();
          }
     };
     (e.ɵfac = function (o) {
          return new (o || e)();
     }),
          (e.ɵprov = w({ token: e, factory: e.ɵfac, providedIn: 'root' }));
     let t = e;
     return t;
})();
function bD(t) {
     return [
          { provide: V, useFactory: t },
          {
               provide: Gn,
               multi: !0,
               useFactory: () => {
                    let e = p(ID, { optional: !0 });
                    return () => e.initialize();
               },
          },
          { provide: If, useFactory: ED },
          { provide: sf, useFactory: af },
     ];
}
function MD(t) {
     let e = bD(() => new V(wD(t)));
     return sn([[], e]);
}
function Xn(t) {
     return typeof t == 'boolean' ? t : t != null && t !== 'false';
}
function $a(t, e = NaN) {
     return !isNaN(parseFloat(t)) && !isNaN(Number(t)) ? Number(t) : e;
}
function bf(t) {
     let e = nt(t);
     if (!e) return null;
     let r = new tn(e);
     return {
          get selector() {
               return r.selector;
          },
          get type() {
               return r.componentType;
          },
          get inputs() {
               return r.inputs;
          },
          get outputs() {
               return r.outputs;
          },
          get ngContentSelectors() {
               return r.ngContentSelectors;
          },
          get isStandalone() {
               return e.standalone;
          },
          get isSignal() {
               return e.signals;
          },
     };
}
var Ba = null;
function dn() {
     return Ba;
}
function xf(t) {
     Ba || (Ba = t);
}
var Jo = class {},
     Q = new E('DocumentToken'),
     za = (() => {
          let e = class e {
               historyGo(n) {
                    throw new Error('Not implemented');
               }
          };
          (e.ɵfac = function (o) {
               return new (o || e)();
          }),
               (e.ɵprov = w({ token: e, factory: () => (() => p(TD))(), providedIn: 'platform' }));
          let t = e;
          return t;
     })(),
     _f = new E('Location Initialized'),
     TD = (() => {
          let e = class e extends za {
               constructor() {
                    super(), (this._doc = p(Q)), (this._location = window.location), (this._history = window.history);
               }
               getBaseHrefFromDOM() {
                    return dn().getBaseHref(this._doc);
               }
               onPopState(n) {
                    let o = dn().getGlobalEventTarget(this._doc, 'window');
                    return o.addEventListener('popstate', n, !1), () => o.removeEventListener('popstate', n);
               }
               onHashChange(n) {
                    let o = dn().getGlobalEventTarget(this._doc, 'window');
                    return o.addEventListener('hashchange', n, !1), () => o.removeEventListener('hashchange', n);
               }
               get href() {
                    return this._location.href;
               }
               get protocol() {
                    return this._location.protocol;
               }
               get hostname() {
                    return this._location.hostname;
               }
               get port() {
                    return this._location.port;
               }
               get pathname() {
                    return this._location.pathname;
               }
               get search() {
                    return this._location.search;
               }
               get hash() {
                    return this._location.hash;
               }
               set pathname(n) {
                    this._location.pathname = n;
               }
               pushState(n, o, i) {
                    this._history.pushState(n, o, i);
               }
               replaceState(n, o, i) {
                    this._history.replaceState(n, o, i);
               }
               forward() {
                    this._history.forward();
               }
               back() {
                    this._history.back();
               }
               historyGo(n = 0) {
                    this._history.go(n);
               }
               getState() {
                    return this._history.state;
               }
          };
          (e.ɵfac = function (o) {
               return new (o || e)();
          }),
               (e.ɵprov = w({ token: e, factory: () => (() => new e())(), providedIn: 'platform' }));
          let t = e;
          return t;
     })();
function Wa(t, e) {
     if (t.length == 0) return e;
     if (e.length == 0) return t;
     let r = 0;
     return (
          t.endsWith('/') && r++, e.startsWith('/') && r++, r == 2 ? t + e.substring(1) : r == 1 ? t + e : t + '/' + e
     );
}
function Mf(t) {
     let e = t.match(/#|\?|$/),
          r = (e && e.index) || t.length,
          n = r - (t[r - 1] === '/' ? 1 : 0);
     return t.slice(0, n) + t.slice(r);
}
function Ge(t) {
     return t && t[0] !== '?' ? '?' + t : t;
}
var Mt = (() => {
          let e = class e {
               historyGo(n) {
                    throw new Error('Not implemented');
               }
          };
          (e.ɵfac = function (o) {
               return new (o || e)();
          }),
               (e.ɵprov = w({ token: e, factory: () => (() => p(Ga))(), providedIn: 'root' }));
          let t = e;
          return t;
     })(),
     Af = new E('appBaseHref'),
     Ga = (() => {
          let e = class e extends Mt {
               constructor(n, o) {
                    super(),
                         (this._platformLocation = n),
                         (this._removeListenerFns = []),
                         (this._baseHref =
                              o ?? this._platformLocation.getBaseHrefFromDOM() ?? p(Q).location?.origin ?? '');
               }
               ngOnDestroy() {
                    for (; this._removeListenerFns.length; ) this._removeListenerFns.pop()();
               }
               onPopState(n) {
                    this._removeListenerFns.push(
                         this._platformLocation.onPopState(n),
                         this._platformLocation.onHashChange(n)
                    );
               }
               getBaseHref() {
                    return this._baseHref;
               }
               prepareExternalUrl(n) {
                    return Wa(this._baseHref, n);
               }
               path(n = !1) {
                    let o = this._platformLocation.pathname + Ge(this._platformLocation.search),
                         i = this._platformLocation.hash;
                    return i && n ? `${o}${i}` : o;
               }
               pushState(n, o, i, s) {
                    let a = this.prepareExternalUrl(i + Ge(s));
                    this._platformLocation.pushState(n, o, a);
               }
               replaceState(n, o, i, s) {
                    let a = this.prepareExternalUrl(i + Ge(s));
                    this._platformLocation.replaceState(n, o, a);
               }
               forward() {
                    this._platformLocation.forward();
               }
               back() {
                    this._platformLocation.back();
               }
               getState() {
                    return this._platformLocation.getState();
               }
               historyGo(n = 0) {
                    this._platformLocation.historyGo?.(n);
               }
          };
          (e.ɵfac = function (o) {
               return new (o || e)(D(za), D(Af, 8));
          }),
               (e.ɵprov = w({ token: e, factory: e.ɵfac, providedIn: 'root' }));
          let t = e;
          return t;
     })(),
     Nf = (() => {
          let e = class e extends Mt {
               constructor(n, o) {
                    super(),
                         (this._platformLocation = n),
                         (this._baseHref = ''),
                         (this._removeListenerFns = []),
                         o != null && (this._baseHref = o);
               }
               ngOnDestroy() {
                    for (; this._removeListenerFns.length; ) this._removeListenerFns.pop()();
               }
               onPopState(n) {
                    this._removeListenerFns.push(
                         this._platformLocation.onPopState(n),
                         this._platformLocation.onHashChange(n)
                    );
               }
               getBaseHref() {
                    return this._baseHref;
               }
               path(n = !1) {
                    let o = this._platformLocation.hash;
                    return o == null && (o = '#'), o.length > 0 ? o.substring(1) : o;
               }
               prepareExternalUrl(n) {
                    let o = Wa(this._baseHref, n);
                    return o.length > 0 ? '#' + o : o;
               }
               pushState(n, o, i, s) {
                    let a = this.prepareExternalUrl(i + Ge(s));
                    a.length == 0 && (a = this._platformLocation.pathname), this._platformLocation.pushState(n, o, a);
               }
               replaceState(n, o, i, s) {
                    let a = this.prepareExternalUrl(i + Ge(s));
                    a.length == 0 && (a = this._platformLocation.pathname),
                         this._platformLocation.replaceState(n, o, a);
               }
               forward() {
                    this._platformLocation.forward();
               }
               back() {
                    this._platformLocation.back();
               }
               getState() {
                    return this._platformLocation.getState();
               }
               historyGo(n = 0) {
                    this._platformLocation.historyGo?.(n);
               }
          };
          (e.ɵfac = function (o) {
               return new (o || e)(D(za), D(Af, 8));
          }),
               (e.ɵprov = w({ token: e, factory: e.ɵfac }));
          let t = e;
          return t;
     })(),
     hn = (() => {
          let e = class e {
               constructor(n) {
                    (this._subject = new ye()),
                         (this._urlChangeListeners = []),
                         (this._urlChangeSubscription = null),
                         (this._locationStrategy = n);
                    let o = this._locationStrategy.getBaseHref();
                    (this._basePath = AD(Mf(Sf(o)))),
                         this._locationStrategy.onPopState((i) => {
                              this._subject.emit({ url: this.path(!0), pop: !0, state: i.state, type: i.type });
                         });
               }
               ngOnDestroy() {
                    this._urlChangeSubscription?.unsubscribe(), (this._urlChangeListeners = []);
               }
               path(n = !1) {
                    return this.normalize(this._locationStrategy.path(n));
               }
               getState() {
                    return this._locationStrategy.getState();
               }
               isCurrentPathEqualTo(n, o = '') {
                    return this.path() == this.normalize(n + Ge(o));
               }
               normalize(n) {
                    return e.stripTrailingSlash(_D(this._basePath, Sf(n)));
               }
               prepareExternalUrl(n) {
                    return n && n[0] !== '/' && (n = '/' + n), this._locationStrategy.prepareExternalUrl(n);
               }
               go(n, o = '', i = null) {
                    this._locationStrategy.pushState(i, '', n, o),
                         this._notifyUrlChangeListeners(this.prepareExternalUrl(n + Ge(o)), i);
               }
               replaceState(n, o = '', i = null) {
                    this._locationStrategy.replaceState(i, '', n, o),
                         this._notifyUrlChangeListeners(this.prepareExternalUrl(n + Ge(o)), i);
               }
               forward() {
                    this._locationStrategy.forward();
               }
               back() {
                    this._locationStrategy.back();
               }
               historyGo(n = 0) {
                    this._locationStrategy.historyGo?.(n);
               }
               onUrlChange(n) {
                    return (
                         this._urlChangeListeners.push(n),
                         this._urlChangeSubscription ||
                              (this._urlChangeSubscription = this.subscribe((o) => {
                                   this._notifyUrlChangeListeners(o.url, o.state);
                              })),
                         () => {
                              let o = this._urlChangeListeners.indexOf(n);
                              this._urlChangeListeners.splice(o, 1),
                                   this._urlChangeListeners.length === 0 &&
                                        (this._urlChangeSubscription?.unsubscribe(),
                                        (this._urlChangeSubscription = null));
                         }
                    );
               }
               _notifyUrlChangeListeners(n = '', o) {
                    this._urlChangeListeners.forEach((i) => i(n, o));
               }
               subscribe(n, o, i) {
                    return this._subject.subscribe({ next: n, error: o, complete: i });
               }
          };
          (e.normalizeQueryParams = Ge),
               (e.joinWithSlash = Wa),
               (e.stripTrailingSlash = Mf),
               (e.ɵfac = function (o) {
                    return new (o || e)(D(Mt));
               }),
               (e.ɵprov = w({ token: e, factory: () => xD(), providedIn: 'root' }));
          let t = e;
          return t;
     })();
function xD() {
     return new hn(D(Mt));
}
function _D(t, e) {
     if (!t || !e.startsWith(t)) return e;
     let r = e.substring(t.length);
     return r === '' || ['/', ';', '?', '#'].includes(r[0]) ? r : e;
}
function Sf(t) {
     return t.replace(/\/index.html$/, '');
}
function AD(t) {
     if (new RegExp('^(https?:)?//').test(t)) {
          let [, r] = t.split(/\/\/[^\/]+/);
          return r;
     }
     return t;
}
function Xo(t, e) {
     e = encodeURIComponent(e);
     for (let r of t.split(';')) {
          let n = r.indexOf('='),
               [o, i] = n == -1 ? [r, ''] : [r.slice(0, n), r.slice(n + 1)];
          if (o.trim() === e) return decodeURIComponent(i);
     }
     return null;
}
var Ua = /\s+/,
     Tf = [],
     Ex = (() => {
          let e = class e {
               constructor(n, o, i, s) {
                    (this._iterableDiffers = n),
                         (this._keyValueDiffers = o),
                         (this._ngEl = i),
                         (this._renderer = s),
                         (this.initialClasses = Tf),
                         (this.stateMap = new Map());
               }
               set klass(n) {
                    this.initialClasses = n != null ? n.trim().split(Ua) : Tf;
               }
               set ngClass(n) {
                    this.rawClass = typeof n == 'string' ? n.trim().split(Ua) : n;
               }
               ngDoCheck() {
                    for (let o of this.initialClasses) this._updateState(o, !0);
                    let n = this.rawClass;
                    if (Array.isArray(n) || n instanceof Set) for (let o of n) this._updateState(o, !0);
                    else if (n != null) for (let o of Object.keys(n)) this._updateState(o, !!n[o]);
                    this._applyStateDiff();
               }
               _updateState(n, o) {
                    let i = this.stateMap.get(n);
                    i !== void 0
                         ? (i.enabled !== o && ((i.changed = !0), (i.enabled = o)), (i.touched = !0))
                         : this.stateMap.set(n, { enabled: o, changed: !0, touched: !0 });
               }
               _applyStateDiff() {
                    for (let n of this.stateMap) {
                         let o = n[0],
                              i = n[1];
                         i.changed
                              ? (this._toggleClass(o, i.enabled), (i.changed = !1))
                              : i.touched || (i.enabled && this._toggleClass(o, !1), this.stateMap.delete(o)),
                              (i.touched = !1);
                    }
               }
               _toggleClass(n, o) {
                    (n = n.trim()),
                         n.length > 0 &&
                              n.split(Ua).forEach((i) => {
                                   o
                                        ? this._renderer.addClass(this._ngEl.nativeElement, i)
                                        : this._renderer.removeClass(this._ngEl.nativeElement, i);
                              });
               }
          };
          (e.ɵfac = function (o) {
               return new (o || e)(We(xa), We(_a), We(an), We(Yn));
          }),
               (e.ɵdir = Un({
                    type: e,
                    selectors: [['', 'ngClass', '']],
                    inputs: { klass: ['class', 'klass'], ngClass: 'ngClass' },
                    standalone: !0,
               }));
          let t = e;
          return t;
     })();
var ND = (() => {
          let e = class e {};
          (e.ɵfac = function (o) {
               return new (o || e)();
          }),
               (e.ɵmod = bt({ type: e })),
               (e.ɵinj = It({}));
          let t = e;
          return t;
     })(),
     Rf = 'browser',
     RD = 'server';
function ei(t) {
     return t === RD;
}
var Of = (() => {
          let e = class e {};
          e.ɵprov = w({ token: e, providedIn: 'root', factory: () => new Ha(D(Q), window) });
          let t = e;
          return t;
     })(),
     Ha = class {
          constructor(e, r) {
               (this.document = e), (this.window = r), (this.offset = () => [0, 0]);
          }
          setOffset(e) {
               Array.isArray(e) ? (this.offset = () => e) : (this.offset = e);
          }
          getScrollPosition() {
               return this.supportsScrolling() ? [this.window.pageXOffset, this.window.pageYOffset] : [0, 0];
          }
          scrollToPosition(e) {
               this.supportsScrolling() && this.window.scrollTo(e[0], e[1]);
          }
          scrollToAnchor(e) {
               if (!this.supportsScrolling()) return;
               let r = OD(this.document, e);
               r && (this.scrollToElement(r), r.focus());
          }
          setHistoryScrollRestoration(e) {
               this.supportsScrolling() && (this.window.history.scrollRestoration = e);
          }
          scrollToElement(e) {
               let r = e.getBoundingClientRect(),
                    n = r.left + this.window.pageXOffset,
                    o = r.top + this.window.pageYOffset,
                    i = this.offset();
               this.window.scrollTo(n - i[0], o - i[1]);
          }
          supportsScrolling() {
               try {
                    return !!this.window && !!this.window.scrollTo && 'pageXOffset' in this.window;
               } catch {
                    return !1;
               }
          }
     };
function OD(t, e) {
     let r = t.getElementById(e) || t.getElementsByName(e)[0];
     if (r) return r;
     if (typeof t.createTreeWalker == 'function' && t.body && typeof t.body.attachShadow == 'function') {
          let n = t.createTreeWalker(t.body, NodeFilter.SHOW_ELEMENT),
               o = n.currentNode;
          for (; o; ) {
               let i = o.shadowRoot;
               if (i) {
                    let s = i.getElementById(e) || i.querySelector(`[name="${e}"]`);
                    if (s) return s;
               }
               o = n.nextNode();
          }
     }
     return null;
}
var fn = class {};
var Pf = (t) => t.src,
     PD = new E('ImageLoader', { providedIn: 'root', factory: () => Pf });
var FD = new E('NG_OPTIMIZED_PRELOADED_IMAGES', { providedIn: 'root', factory: () => new Set() }),
     kD = (() => {
          let e = class e {
               constructor() {
                    (this.preloadedImages = p(FD)), (this.document = p(Q));
               }
               createPreloadLinkTag(n, o, i, s) {
                    if (this.preloadedImages.has(o)) return;
                    this.preloadedImages.add(o);
                    let a = n.createElement('link');
                    n.setAttribute(a, 'as', 'image'),
                         n.setAttribute(a, 'href', o),
                         n.setAttribute(a, 'rel', 'preload'),
                         n.setAttribute(a, 'fetchpriority', 'high'),
                         s && n.setAttribute(a, 'imageSizes', s),
                         i && n.setAttribute(a, 'imageSrcset', i),
                         n.appendChild(this.document.head, a);
               }
          };
          (e.ɵfac = function (o) {
               return new (o || e)();
          }),
               (e.ɵprov = w({ token: e, factory: e.ɵfac, providedIn: 'root' }));
          let t = e;
          return t;
     })();
var LD = /^((\s*\d+w\s*(,|$)){1,})$/;
var jD = [1, 2],
     VD = 640;
var $D = 1920,
     UD = 1080;
var Ix = (() => {
     let e = class e {
          constructor() {
               (this.imageLoader = p(PD)),
                    (this.config = BD(p(Dd))),
                    (this.renderer = p(Yn)),
                    (this.imgElement = p(an).nativeElement),
                    (this.injector = p(Fe)),
                    (this.isServer = ei(p(ke))),
                    (this.preloadLinkCreator = p(kD)),
                    (this.lcpObserver = null),
                    (this._renderedSrc = null),
                    (this.priority = !1),
                    (this.disableOptimizedSrcset = !1),
                    (this.fill = !1);
          }
          ngOnInit() {
               un('NgOptimizedImage'), this.setHostAttributes();
          }
          setHostAttributes() {
               this.fill
                    ? this.sizes || (this.sizes = '100vw')
                    : (this.setHostAttribute('width', this.width.toString()),
                      this.setHostAttribute('height', this.height.toString())),
                    this.setHostAttribute('loading', this.getLoadingBehavior()),
                    this.setHostAttribute('fetchpriority', this.getFetchPriority()),
                    this.setHostAttribute('ng-img', 'true');
               let n = this.updateSrcAndSrcset();
               this.sizes && this.setHostAttribute('sizes', this.sizes),
                    this.isServer &&
                         this.priority &&
                         this.preloadLinkCreator.createPreloadLinkTag(
                              this.renderer,
                              this.getRewrittenSrc(),
                              n,
                              this.sizes
                         );
          }
          ngOnChanges(n) {
               if (n.ngSrc && !n.ngSrc.isFirstChange()) {
                    let o = this._renderedSrc;
                    this.updateSrcAndSrcset(!0);
                    let i = this._renderedSrc;
                    this.lcpObserver !== null &&
                         o &&
                         i &&
                         o !== i &&
                         this.injector.get(V).runOutsideAngular(() => {
                              this.lcpObserver?.updateImage(o, i);
                         });
               }
          }
          callImageLoader(n) {
               let o = n;
               return this.loaderParams && (o.loaderParams = this.loaderParams), this.imageLoader(o);
          }
          getLoadingBehavior() {
               return !this.priority && this.loading !== void 0 ? this.loading : this.priority ? 'eager' : 'lazy';
          }
          getFetchPriority() {
               return this.priority ? 'high' : 'auto';
          }
          getRewrittenSrc() {
               if (!this._renderedSrc) {
                    let n = { src: this.ngSrc };
                    this._renderedSrc = this.callImageLoader(n);
               }
               return this._renderedSrc;
          }
          getRewrittenSrcset() {
               let n = LD.test(this.ngSrcset);
               return this.ngSrcset
                    .split(',')
                    .filter((i) => i !== '')
                    .map((i) => {
                         i = i.trim();
                         let s = n ? parseFloat(i) : parseFloat(i) * this.width;
                         return `${this.callImageLoader({ src: this.ngSrc, width: s })} ${i}`;
                    })
                    .join(', ');
          }
          getAutomaticSrcset() {
               return this.sizes ? this.getResponsiveSrcset() : this.getFixedSrcset();
          }
          getResponsiveSrcset() {
               let { breakpoints: n } = this.config,
                    o = n;
               return (
                    this.sizes?.trim() === '100vw' && (o = n.filter((s) => s >= VD)),
                    o.map((s) => `${this.callImageLoader({ src: this.ngSrc, width: s })} ${s}w`).join(', ')
               );
          }
          updateSrcAndSrcset(n = !1) {
               n && (this._renderedSrc = null);
               let o = this.getRewrittenSrc();
               this.setHostAttribute('src', o);
               let i;
               return (
                    this.ngSrcset
                         ? (i = this.getRewrittenSrcset())
                         : this.shouldGenerateAutomaticSrcset() && (i = this.getAutomaticSrcset()),
                    i && this.setHostAttribute('srcset', i),
                    i
               );
          }
          getFixedSrcset() {
               return jD
                    .map((o) => `${this.callImageLoader({ src: this.ngSrc, width: this.width * o })} ${o}x`)
                    .join(', ');
          }
          shouldGenerateAutomaticSrcset() {
               let n = !1;
               return (
                    this.sizes || (n = this.width > $D || this.height > UD),
                    !this.disableOptimizedSrcset && !this.srcset && this.imageLoader !== Pf && !n
               );
          }
          ngOnDestroy() {}
          setHostAttribute(n, o) {
               this.renderer.setAttribute(this.imgElement, n, o);
          }
     };
     (e.ɵfac = function (o) {
          return new (o || e)();
     }),
          (e.ɵdir = Un({
               type: e,
               selectors: [['img', 'ngSrc', '']],
               hostVars: 8,
               hostBindings: function (o, i) {
                    o & 2 &&
                         La('position', i.fill ? 'absolute' : null)('width', i.fill ? '100%' : null)(
                              'height',
                              i.fill ? '100%' : null
                         )('inset', i.fill ? '0px' : null);
               },
               inputs: {
                    ngSrc: ['ngSrc', 'ngSrc', HD],
                    ngSrcset: 'ngSrcset',
                    sizes: 'sizes',
                    width: ['width', 'width', $a],
                    height: ['height', 'height', $a],
                    loading: 'loading',
                    priority: ['priority', 'priority', Xn],
                    loaderParams: 'loaderParams',
                    disableOptimizedSrcset: ['disableOptimizedSrcset', 'disableOptimizedSrcset', Xn],
                    fill: ['fill', 'fill', Xn],
                    src: 'src',
                    srcset: 'srcset',
               },
               standalone: !0,
               features: [ka, Bn],
          }));
     let t = e;
     return t;
})();
function BD(t) {
     let e = {};
     return t.breakpoints && (e.breakpoints = t.breakpoints.sort((r, n) => r - n)), Object.assign({}, va, t, e);
}
function HD(t) {
     return typeof t == 'string' ? t : Zn(t);
}
var tr = class {},
     ni = class {},
     St = class t {
          constructor(e) {
               (this.normalizedNames = new Map()),
                    (this.lazyUpdate = null),
                    e
                         ? typeof e == 'string'
                              ? (this.lazyInit = () => {
                                     (this.headers = new Map()),
                                          e
                                               .split(
                                                    `
`
                                               )
                                               .forEach((r) => {
                                                    let n = r.indexOf(':');
                                                    if (n > 0) {
                                                         let o = r.slice(0, n),
                                                              i = o.toLowerCase(),
                                                              s = r.slice(n + 1).trim();
                                                         this.maybeSetNormalizedName(o, i),
                                                              this.headers.has(i)
                                                                   ? this.headers.get(i).push(s)
                                                                   : this.headers.set(i, [s]);
                                                    }
                                               });
                                })
                              : typeof Headers < 'u' && e instanceof Headers
                              ? ((this.headers = new Map()),
                                e.forEach((r, n) => {
                                     this.setHeaderEntries(n, r);
                                }))
                              : (this.lazyInit = () => {
                                     (this.headers = new Map()),
                                          Object.entries(e).forEach(([r, n]) => {
                                               this.setHeaderEntries(r, n);
                                          });
                                })
                         : (this.headers = new Map());
          }
          has(e) {
               return this.init(), this.headers.has(e.toLowerCase());
          }
          get(e) {
               this.init();
               let r = this.headers.get(e.toLowerCase());
               return r && r.length > 0 ? r[0] : null;
          }
          keys() {
               return this.init(), Array.from(this.normalizedNames.values());
          }
          getAll(e) {
               return this.init(), this.headers.get(e.toLowerCase()) || null;
          }
          append(e, r) {
               return this.clone({ name: e, value: r, op: 'a' });
          }
          set(e, r) {
               return this.clone({ name: e, value: r, op: 's' });
          }
          delete(e, r) {
               return this.clone({ name: e, value: r, op: 'd' });
          }
          maybeSetNormalizedName(e, r) {
               this.normalizedNames.has(r) || this.normalizedNames.set(r, e);
          }
          init() {
               this.lazyInit &&
                    (this.lazyInit instanceof t ? this.copyFrom(this.lazyInit) : this.lazyInit(),
                    (this.lazyInit = null),
                    this.lazyUpdate && (this.lazyUpdate.forEach((e) => this.applyUpdate(e)), (this.lazyUpdate = null)));
          }
          copyFrom(e) {
               e.init(),
                    Array.from(e.headers.keys()).forEach((r) => {
                         this.headers.set(r, e.headers.get(r)), this.normalizedNames.set(r, e.normalizedNames.get(r));
                    });
          }
          clone(e) {
               let r = new t();
               return (
                    (r.lazyInit = this.lazyInit && this.lazyInit instanceof t ? this.lazyInit : this),
                    (r.lazyUpdate = (this.lazyUpdate || []).concat([e])),
                    r
               );
          }
          applyUpdate(e) {
               let r = e.name.toLowerCase();
               switch (e.op) {
                    case 'a':
                    case 's':
                         let n = e.value;
                         if ((typeof n == 'string' && (n = [n]), n.length === 0)) return;
                         this.maybeSetNormalizedName(e.name, r);
                         let o = (e.op === 'a' ? this.headers.get(r) : void 0) || [];
                         o.push(...n), this.headers.set(r, o);
                         break;
                    case 'd':
                         let i = e.value;
                         if (!i) this.headers.delete(r), this.normalizedNames.delete(r);
                         else {
                              let s = this.headers.get(r);
                              if (!s) return;
                              (s = s.filter((a) => i.indexOf(a) === -1)),
                                   s.length === 0
                                        ? (this.headers.delete(r), this.normalizedNames.delete(r))
                                        : this.headers.set(r, s);
                         }
                         break;
               }
          }
          setHeaderEntries(e, r) {
               let n = (Array.isArray(r) ? r : [r]).map((i) => i.toString()),
                    o = e.toLowerCase();
               this.headers.set(o, n), this.maybeSetNormalizedName(e, o);
          }
          forEach(e) {
               this.init(),
                    Array.from(this.normalizedNames.keys()).forEach((r) =>
                         e(this.normalizedNames.get(r), this.headers.get(r))
                    );
          }
     };
var Za = class {
     encodeKey(e) {
          return Ff(e);
     }
     encodeValue(e) {
          return Ff(e);
     }
     decodeKey(e) {
          return decodeURIComponent(e);
     }
     decodeValue(e) {
          return decodeURIComponent(e);
     }
};
function qD(t, e) {
     let r = new Map();
     return (
          t.length > 0 &&
               t
                    .replace(/^\?/, '')
                    .split('&')
                    .forEach((o) => {
                         let i = o.indexOf('='),
                              [s, a] =
                                   i == -1
                                        ? [e.decodeKey(o), '']
                                        : [e.decodeKey(o.slice(0, i)), e.decodeValue(o.slice(i + 1))],
                              u = r.get(s) || [];
                         u.push(a), r.set(s, u);
                    }),
          r
     );
}
var ZD = /%(\d[a-f0-9])/gi,
     YD = { 40: '@', '3A': ':', 24: '$', '2C': ',', '3B': ';', '3D': '=', '3F': '?', '2F': '/' };
function Ff(t) {
     return encodeURIComponent(t).replace(ZD, (e, r) => YD[r] ?? e);
}
function ti(t) {
     return `${t}`;
}
var at = class t {
     constructor(e = {}) {
          if (((this.updates = null), (this.cloneFrom = null), (this.encoder = e.encoder || new Za()), e.fromString)) {
               if (e.fromObject) throw new Error('Cannot specify both fromString and fromObject.');
               this.map = qD(e.fromString, this.encoder);
          } else
               e.fromObject
                    ? ((this.map = new Map()),
                      Object.keys(e.fromObject).forEach((r) => {
                           let n = e.fromObject[r],
                                o = Array.isArray(n) ? n.map(ti) : [ti(n)];
                           this.map.set(r, o);
                      }))
                    : (this.map = null);
     }
     has(e) {
          return this.init(), this.map.has(e);
     }
     get(e) {
          this.init();
          let r = this.map.get(e);
          return r ? r[0] : null;
     }
     getAll(e) {
          return this.init(), this.map.get(e) || null;
     }
     keys() {
          return this.init(), Array.from(this.map.keys());
     }
     append(e, r) {
          return this.clone({ param: e, value: r, op: 'a' });
     }
     appendAll(e) {
          let r = [];
          return (
               Object.keys(e).forEach((n) => {
                    let o = e[n];
                    Array.isArray(o)
                         ? o.forEach((i) => {
                                r.push({ param: n, value: i, op: 'a' });
                           })
                         : r.push({ param: n, value: o, op: 'a' });
               }),
               this.clone(r)
          );
     }
     set(e, r) {
          return this.clone({ param: e, value: r, op: 's' });
     }
     delete(e, r) {
          return this.clone({ param: e, value: r, op: 'd' });
     }
     toString() {
          return (
               this.init(),
               this.keys()
                    .map((e) => {
                         let r = this.encoder.encodeKey(e);
                         return this.map
                              .get(e)
                              .map((n) => r + '=' + this.encoder.encodeValue(n))
                              .join('&');
                    })
                    .filter((e) => e !== '')
                    .join('&')
          );
     }
     clone(e) {
          let r = new t({ encoder: this.encoder });
          return (r.cloneFrom = this.cloneFrom || this), (r.updates = (this.updates || []).concat(e)), r;
     }
     init() {
          this.map === null && (this.map = new Map()),
               this.cloneFrom !== null &&
                    (this.cloneFrom.init(),
                    this.cloneFrom.keys().forEach((e) => this.map.set(e, this.cloneFrom.map.get(e))),
                    this.updates.forEach((e) => {
                         switch (e.op) {
                              case 'a':
                              case 's':
                                   let r = (e.op === 'a' ? this.map.get(e.param) : void 0) || [];
                                   r.push(ti(e.value)), this.map.set(e.param, r);
                                   break;
                              case 'd':
                                   if (e.value !== void 0) {
                                        let n = this.map.get(e.param) || [],
                                             o = n.indexOf(ti(e.value));
                                        o !== -1 && n.splice(o, 1),
                                             n.length > 0 ? this.map.set(e.param, n) : this.map.delete(e.param);
                                   } else {
                                        this.map.delete(e.param);
                                        break;
                                   }
                         }
                    }),
                    (this.cloneFrom = this.updates = null));
     }
};
var Ya = class {
     constructor() {
          this.map = new Map();
     }
     set(e, r) {
          return this.map.set(e, r), this;
     }
     get(e) {
          return this.map.has(e) || this.map.set(e, e.defaultValue()), this.map.get(e);
     }
     delete(e) {
          return this.map.delete(e), this;
     }
     has(e) {
          return this.map.has(e);
     }
     keys() {
          return this.map.keys();
     }
};
function QD(t) {
     switch (t) {
          case 'DELETE':
          case 'GET':
          case 'HEAD':
          case 'OPTIONS':
          case 'JSONP':
               return !1;
          default:
               return !0;
     }
}
function kf(t) {
     return typeof ArrayBuffer < 'u' && t instanceof ArrayBuffer;
}
function Lf(t) {
     return typeof Blob < 'u' && t instanceof Blob;
}
function jf(t) {
     return typeof FormData < 'u' && t instanceof FormData;
}
function KD(t) {
     return typeof URLSearchParams < 'u' && t instanceof URLSearchParams;
}
var er = class t {
          constructor(e, r, n, o) {
               (this.url = r),
                    (this.body = null),
                    (this.reportProgress = !1),
                    (this.withCredentials = !1),
                    (this.responseType = 'json'),
                    (this.method = e.toUpperCase());
               let i;
               if (
                    (QD(this.method) || o ? ((this.body = n !== void 0 ? n : null), (i = o)) : (i = n),
                    i &&
                         ((this.reportProgress = !!i.reportProgress),
                         (this.withCredentials = !!i.withCredentials),
                         i.responseType && (this.responseType = i.responseType),
                         i.headers && (this.headers = i.headers),
                         i.context && (this.context = i.context),
                         i.params && (this.params = i.params),
                         (this.transferCache = i.transferCache)),
                    this.headers || (this.headers = new St()),
                    this.context || (this.context = new Ya()),
                    !this.params)
               )
                    (this.params = new at()), (this.urlWithParams = r);
               else {
                    let s = this.params.toString();
                    if (s.length === 0) this.urlWithParams = r;
                    else {
                         let a = r.indexOf('?'),
                              u = a === -1 ? '?' : a < r.length - 1 ? '&' : '';
                         this.urlWithParams = r + u + s;
                    }
               }
          }
          serializeBody() {
               return this.body === null
                    ? null
                    : kf(this.body) || Lf(this.body) || jf(this.body) || KD(this.body) || typeof this.body == 'string'
                    ? this.body
                    : this.body instanceof at
                    ? this.body.toString()
                    : typeof this.body == 'object' || typeof this.body == 'boolean' || Array.isArray(this.body)
                    ? JSON.stringify(this.body)
                    : this.body.toString();
          }
          detectContentTypeHeader() {
               return this.body === null || jf(this.body)
                    ? null
                    : Lf(this.body)
                    ? this.body.type || null
                    : kf(this.body)
                    ? null
                    : typeof this.body == 'string'
                    ? 'text/plain'
                    : this.body instanceof at
                    ? 'application/x-www-form-urlencoded;charset=UTF-8'
                    : typeof this.body == 'object' || typeof this.body == 'number' || typeof this.body == 'boolean'
                    ? 'application/json'
                    : null;
          }
          clone(e = {}) {
               let r = e.method || this.method,
                    n = e.url || this.url,
                    o = e.responseType || this.responseType,
                    i = e.body !== void 0 ? e.body : this.body,
                    s = e.withCredentials !== void 0 ? e.withCredentials : this.withCredentials,
                    a = e.reportProgress !== void 0 ? e.reportProgress : this.reportProgress,
                    u = e.headers || this.headers,
                    c = e.params || this.params,
                    l = e.context ?? this.context;
               return (
                    e.setHeaders !== void 0 &&
                         (u = Object.keys(e.setHeaders).reduce((d, f) => d.set(f, e.setHeaders[f]), u)),
                    e.setParams && (c = Object.keys(e.setParams).reduce((d, f) => d.set(f, e.setParams[f]), c)),
                    new t(r, n, i, {
                         params: c,
                         headers: u,
                         context: l,
                         reportProgress: a,
                         responseType: o,
                         withCredentials: s,
                    })
               );
          }
     },
     pn = (function (t) {
          return (
               (t[(t.Sent = 0)] = 'Sent'),
               (t[(t.UploadProgress = 1)] = 'UploadProgress'),
               (t[(t.ResponseHeader = 2)] = 'ResponseHeader'),
               (t[(t.DownloadProgress = 3)] = 'DownloadProgress'),
               (t[(t.Response = 4)] = 'Response'),
               (t[(t.User = 5)] = 'User'),
               t
          );
     })(pn || {}),
     nr = class {
          constructor(e, r = 200, n = 'OK') {
               (this.headers = e.headers || new St()),
                    (this.status = e.status !== void 0 ? e.status : r),
                    (this.statusText = e.statusText || n),
                    (this.url = e.url || null),
                    (this.ok = this.status >= 200 && this.status < 300);
          }
     },
     Qa = class t extends nr {
          constructor(e = {}) {
               super(e), (this.type = pn.ResponseHeader);
          }
          clone(e = {}) {
               return new t({
                    headers: e.headers || this.headers,
                    status: e.status !== void 0 ? e.status : this.status,
                    statusText: e.statusText || this.statusText,
                    url: e.url || this.url || void 0,
               });
          }
     },
     ri = class t extends nr {
          constructor(e = {}) {
               super(e), (this.type = pn.Response), (this.body = e.body !== void 0 ? e.body : null);
          }
          clone(e = {}) {
               return new t({
                    body: e.body !== void 0 ? e.body : this.body,
                    headers: e.headers || this.headers,
                    status: e.status !== void 0 ? e.status : this.status,
                    statusText: e.statusText || this.statusText,
                    url: e.url || this.url || void 0,
               });
          }
     },
     oi = class extends nr {
          constructor(e) {
               super(e, 0, 'Unknown Error'),
                    (this.name = 'HttpErrorResponse'),
                    (this.ok = !1),
                    this.status >= 200 && this.status < 300
                         ? (this.message = `Http failure during parsing for ${e.url || '(unknown url)'}`)
                         : (this.message = `Http failure response for ${e.url || '(unknown url)'}: ${e.status} ${
                                e.statusText
                           }`),
                    (this.error = e.error || null);
          }
     };
function qa(t, e) {
     return {
          body: e,
          headers: t.headers,
          context: t.context,
          observe: t.observe,
          params: t.params,
          reportProgress: t.reportProgress,
          responseType: t.responseType,
          withCredentials: t.withCredentials,
          transferCache: t.transferCache,
     };
}
var JD = (() => {
     let e = class e {
          constructor(n) {
               this.handler = n;
          }
          request(n, o, i = {}) {
               let s;
               if (n instanceof er) s = n;
               else {
                    let c;
                    i.headers instanceof St ? (c = i.headers) : (c = new St(i.headers));
                    let l;
                    i.params && (i.params instanceof at ? (l = i.params) : (l = new at({ fromObject: i.params }))),
                         (s = new er(n, o, i.body !== void 0 ? i.body : null, {
                              headers: c,
                              context: i.context,
                              params: l,
                              reportProgress: i.reportProgress,
                              responseType: i.responseType || 'json',
                              withCredentials: i.withCredentials,
                              transferCache: i.transferCache,
                         }));
               }
               let a = C(s).pipe(Ue((c) => this.handler.handle(c)));
               if (n instanceof er || i.observe === 'events') return a;
               let u = a.pipe(ue((c) => c instanceof ri));
               switch (i.observe || 'body') {
                    case 'body':
                         switch (s.responseType) {
                              case 'arraybuffer':
                                   return u.pipe(
                                        R((c) => {
                                             if (c.body !== null && !(c.body instanceof ArrayBuffer))
                                                  throw new Error('Response is not an ArrayBuffer.');
                                             return c.body;
                                        })
                                   );
                              case 'blob':
                                   return u.pipe(
                                        R((c) => {
                                             if (c.body !== null && !(c.body instanceof Blob))
                                                  throw new Error('Response is not a Blob.');
                                             return c.body;
                                        })
                                   );
                              case 'text':
                                   return u.pipe(
                                        R((c) => {
                                             if (c.body !== null && typeof c.body != 'string')
                                                  throw new Error('Response is not a string.');
                                             return c.body;
                                        })
                                   );
                              case 'json':
                              default:
                                   return u.pipe(R((c) => c.body));
                         }
                    case 'response':
                         return u;
                    default:
                         throw new Error(`Unreachable: unhandled observe type ${i.observe}}`);
               }
          }
          delete(n, o = {}) {
               return this.request('DELETE', n, o);
          }
          get(n, o = {}) {
               return this.request('GET', n, o);
          }
          head(n, o = {}) {
               return this.request('HEAD', n, o);
          }
          jsonp(n, o) {
               return this.request('JSONP', n, {
                    params: new at().append(o, 'JSONP_CALLBACK'),
                    observe: 'body',
                    responseType: 'json',
               });
          }
          options(n, o = {}) {
               return this.request('OPTIONS', n, o);
          }
          patch(n, o, i = {}) {
               return this.request('PATCH', n, qa(i, o));
          }
          post(n, o, i = {}) {
               return this.request('POST', n, qa(i, o));
          }
          put(n, o, i = {}) {
               return this.request('PUT', n, qa(i, o));
          }
     };
     (e.ɵfac = function (o) {
          return new (o || e)(D(tr));
     }),
          (e.ɵprov = w({ token: e, factory: e.ɵfac }));
     let t = e;
     return t;
})();
function Bf(t, e) {
     return e(t);
}
function XD(t, e) {
     return (r, n) => e.intercept(r, { handle: (o) => t(o, n) });
}
function ew(t, e, r) {
     return (n, o) => r.runInContext(() => e(n, (i) => t(i, o)));
}
var tw = new E(''),
     Ka = new E(''),
     nw = new E(''),
     rw = new E('');
function ow() {
     let t = null;
     return (e, r) => {
          t === null && (t = (p(tw, { optional: !0 }) ?? []).reduceRight(XD, Bf));
          let n = p(cn),
               o = n.add();
          return t(e, r).pipe(Je(() => n.remove(o)));
     };
}
var Vf = (() => {
     let e = class e extends tr {
          constructor(n, o) {
               super(), (this.backend = n), (this.injector = o), (this.chain = null), (this.pendingTasks = p(cn));
               let i = p(rw, { optional: !0 });
               this.backend = i ?? n;
          }
          handle(n) {
               if (this.chain === null) {
                    let i = Array.from(new Set([...this.injector.get(Ka), ...this.injector.get(nw, [])]));
                    this.chain = i.reduceRight((s, a) => ew(s, a, this.injector), Bf);
               }
               let o = this.pendingTasks.add();
               return this.chain(n, (i) => this.backend.handle(i)).pipe(Je(() => this.pendingTasks.remove(o)));
          }
     };
     (e.ɵfac = function (o) {
          return new (o || e)(D(ni), D(ie));
     }),
          (e.ɵprov = w({ token: e, factory: e.ɵfac }));
     let t = e;
     return t;
})();
var iw = /^\)\]\}',?\n/;
function sw(t) {
     return 'responseURL' in t && t.responseURL
          ? t.responseURL
          : /^X-Request-URL:/m.test(t.getAllResponseHeaders())
          ? t.getResponseHeader('X-Request-URL')
          : null;
}
var $f = (() => {
          let e = class e {
               constructor(n) {
                    this.xhrFactory = n;
               }
               handle(n) {
                    if (n.method === 'JSONP') throw new y(-2800, !1);
                    let o = this.xhrFactory;
                    return (o.ɵloadImpl ? j(o.ɵloadImpl()) : C(null)).pipe(
                         X(
                              () =>
                                   new O((s) => {
                                        let a = o.build();
                                        if (
                                             (a.open(n.method, n.urlWithParams),
                                             n.withCredentials && (a.withCredentials = !0),
                                             n.headers.forEach((I, v) => a.setRequestHeader(I, v.join(','))),
                                             n.headers.has('Accept') ||
                                                  a.setRequestHeader('Accept', 'application/json, text/plain, */*'),
                                             !n.headers.has('Content-Type'))
                                        ) {
                                             let I = n.detectContentTypeHeader();
                                             I !== null && a.setRequestHeader('Content-Type', I);
                                        }
                                        if (n.responseType) {
                                             let I = n.responseType.toLowerCase();
                                             a.responseType = I !== 'json' ? I : 'text';
                                        }
                                        let u = n.serializeBody(),
                                             c = null,
                                             l = () => {
                                                  if (c !== null) return c;
                                                  let I = a.statusText || 'OK',
                                                       v = new St(a.getAllResponseHeaders()),
                                                       B = sw(a) || n.url;
                                                  return (
                                                       (c = new Qa({
                                                            headers: v,
                                                            status: a.status,
                                                            statusText: I,
                                                            url: B,
                                                       })),
                                                       c
                                                  );
                                             },
                                             d = () => {
                                                  let { headers: I, status: v, statusText: B, url: K } = l(),
                                                       $ = null;
                                                  v !== 204 &&
                                                       ($ = typeof a.response > 'u' ? a.responseText : a.response),
                                                       v === 0 && (v = $ ? 200 : 0);
                                                  let Me = v >= 200 && v < 300;
                                                  if (n.responseType === 'json' && typeof $ == 'string') {
                                                       let ce = $;
                                                       $ = $.replace(iw, '');
                                                       try {
                                                            $ = $ !== '' ? JSON.parse($) : null;
                                                       } catch (Ze) {
                                                            ($ = ce), Me && ((Me = !1), ($ = { error: Ze, text: $ }));
                                                       }
                                                  }
                                                  Me
                                                       ? (s.next(
                                                              new ri({
                                                                   body: $,
                                                                   headers: I,
                                                                   status: v,
                                                                   statusText: B,
                                                                   url: K || void 0,
                                                              })
                                                         ),
                                                         s.complete())
                                                       : s.error(
                                                              new oi({
                                                                   error: $,
                                                                   headers: I,
                                                                   status: v,
                                                                   statusText: B,
                                                                   url: K || void 0,
                                                              })
                                                         );
                                             },
                                             f = (I) => {
                                                  let { url: v } = l(),
                                                       B = new oi({
                                                            error: I,
                                                            status: a.status || 0,
                                                            statusText: a.statusText || 'Unknown Error',
                                                            url: v || void 0,
                                                       });
                                                  s.error(B);
                                             },
                                             h = !1,
                                             g = (I) => {
                                                  h || (s.next(l()), (h = !0));
                                                  let v = { type: pn.DownloadProgress, loaded: I.loaded };
                                                  I.lengthComputable && (v.total = I.total),
                                                       n.responseType === 'text' &&
                                                            a.responseText &&
                                                            (v.partialText = a.responseText),
                                                       s.next(v);
                                             },
                                             S = (I) => {
                                                  let v = { type: pn.UploadProgress, loaded: I.loaded };
                                                  I.lengthComputable && (v.total = I.total), s.next(v);
                                             };
                                        return (
                                             a.addEventListener('load', d),
                                             a.addEventListener('error', f),
                                             a.addEventListener('timeout', f),
                                             a.addEventListener('abort', f),
                                             n.reportProgress &&
                                                  (a.addEventListener('progress', g),
                                                  u !== null && a.upload && a.upload.addEventListener('progress', S)),
                                             a.send(u),
                                             s.next({ type: pn.Sent }),
                                             () => {
                                                  a.removeEventListener('error', f),
                                                       a.removeEventListener('abort', f),
                                                       a.removeEventListener('load', d),
                                                       a.removeEventListener('timeout', f),
                                                       n.reportProgress &&
                                                            (a.removeEventListener('progress', g),
                                                            u !== null &&
                                                                 a.upload &&
                                                                 a.upload.removeEventListener('progress', S)),
                                                       a.readyState !== a.DONE && a.abort();
                                             }
                                        );
                                   })
                         )
                    );
               }
          };
          (e.ɵfac = function (o) {
               return new (o || e)(D(fn));
          }),
               (e.ɵprov = w({ token: e, factory: e.ɵfac }));
          let t = e;
          return t;
     })(),
     Hf = new E('XSRF_ENABLED'),
     aw = 'XSRF-TOKEN',
     uw = new E('XSRF_COOKIE_NAME', { providedIn: 'root', factory: () => aw }),
     cw = 'X-XSRF-TOKEN',
     lw = new E('XSRF_HEADER_NAME', { providedIn: 'root', factory: () => cw }),
     ii = class {},
     dw = (() => {
          let e = class e {
               constructor(n, o, i) {
                    (this.doc = n),
                         (this.platform = o),
                         (this.cookieName = i),
                         (this.lastCookieString = ''),
                         (this.lastToken = null),
                         (this.parseCount = 0);
               }
               getToken() {
                    if (this.platform === 'server') return null;
                    let n = this.doc.cookie || '';
                    return (
                         n !== this.lastCookieString &&
                              (this.parseCount++,
                              (this.lastToken = Xo(n, this.cookieName)),
                              (this.lastCookieString = n)),
                         this.lastToken
                    );
               }
          };
          (e.ɵfac = function (o) {
               return new (o || e)(D(Q), D(ke), D(uw));
          }),
               (e.ɵprov = w({ token: e, factory: e.ɵfac }));
          let t = e;
          return t;
     })();
function fw(t, e) {
     let r = t.url.toLowerCase();
     if (!p(Hf) || t.method === 'GET' || t.method === 'HEAD' || r.startsWith('http://') || r.startsWith('https://'))
          return e(t);
     let n = p(ii).getToken(),
          o = p(lw);
     return n != null && !t.headers.has(o) && (t = t.clone({ headers: t.headers.set(o, n) })), e(t);
}
var zf = (function (t) {
     return (
          (t[(t.Interceptors = 0)] = 'Interceptors'),
          (t[(t.LegacyInterceptors = 1)] = 'LegacyInterceptors'),
          (t[(t.CustomXsrfConfiguration = 2)] = 'CustomXsrfConfiguration'),
          (t[(t.NoXsrfProtection = 3)] = 'NoXsrfProtection'),
          (t[(t.JsonpSupport = 4)] = 'JsonpSupport'),
          (t[(t.RequestsMadeViaParent = 5)] = 'RequestsMadeViaParent'),
          (t[(t.Fetch = 6)] = 'Fetch'),
          t
     );
})(zf || {});
function hw(t, e) {
     return { ɵkind: t, ɵproviders: e };
}
function pw(...t) {
     let e = [
          JD,
          $f,
          Vf,
          { provide: tr, useExisting: Vf },
          { provide: ni, useExisting: $f },
          { provide: Ka, useValue: fw, multi: !0 },
          { provide: Hf, useValue: !0 },
          { provide: ii, useClass: dw },
     ];
     for (let r of t) e.push(...r.ɵproviders);
     return sn(e);
}
var Uf = new E('LEGACY_INTERCEPTOR_FN');
function gw() {
     return hw(zf.LegacyInterceptors, [
          { provide: Uf, useFactory: ow },
          { provide: Ka, useExisting: Uf, multi: !0 },
     ]);
}
var jx = (() => {
     let e = class e {};
     (e.ɵfac = function (o) {
          return new (o || e)();
     }),
          (e.ɵmod = bt({ type: e })),
          (e.ɵinj = It({ providers: [pw(gw())] }));
     let t = e;
     return t;
})();
var eu = class extends Jo {
          constructor() {
               super(...arguments), (this.supportsDOMEvents = !0);
          }
     },
     tu = class t extends eu {
          static makeCurrent() {
               xf(new t());
          }
          onAndCancel(e, r, n) {
               return (
                    e.addEventListener(r, n),
                    () => {
                         e.removeEventListener(r, n);
                    }
               );
          }
          dispatchEvent(e, r) {
               e.dispatchEvent(r);
          }
          remove(e) {
               e.parentNode && e.parentNode.removeChild(e);
          }
          createElement(e, r) {
               return (r = r || this.getDefaultDocument()), r.createElement(e);
          }
          createHtmlDocument() {
               return document.implementation.createHTMLDocument('fakeTitle');
          }
          getDefaultDocument() {
               return document;
          }
          isElementNode(e) {
               return e.nodeType === Node.ELEMENT_NODE;
          }
          isShadowRoot(e) {
               return e instanceof DocumentFragment;
          }
          getGlobalEventTarget(e, r) {
               return r === 'window' ? window : r === 'document' ? e : r === 'body' ? e.body : null;
          }
          getBaseHref(e) {
               let r = mw();
               return r == null ? null : vw(r);
          }
          resetBaseElement() {
               rr = null;
          }
          getUserAgent() {
               return window.navigator.userAgent;
          }
          getCookie(e) {
               return Xo(document.cookie, e);
          }
     },
     rr = null;
function mw() {
     return (rr = rr || document.querySelector('base')), rr ? rr.getAttribute('href') : null;
}
var si;
function vw(t) {
     (si = si || document.createElement('a')), si.setAttribute('href', t);
     let e = si.pathname;
     return e.charAt(0) === '/' ? e : `/${e}`;
}
var yw = (() => {
          let e = class e {
               build() {
                    return new XMLHttpRequest();
               }
          };
          (e.ɵfac = function (o) {
               return new (o || e)();
          }),
               (e.ɵprov = w({ token: e, factory: e.ɵfac }));
          let t = e;
          return t;
     })(),
     nu = new E('EventManagerPlugins'),
     Zf = (() => {
          let e = class e {
               constructor(n, o) {
                    (this._zone = o),
                         (this._eventNameToPlugin = new Map()),
                         n.forEach((i) => {
                              i.manager = this;
                         }),
                         (this._plugins = n.slice().reverse());
               }
               addEventListener(n, o, i) {
                    return this._findPluginFor(o).addEventListener(n, o, i);
               }
               getZone() {
                    return this._zone;
               }
               _findPluginFor(n) {
                    let o = this._eventNameToPlugin.get(n);
                    if (o) return o;
                    if (((o = this._plugins.find((s) => s.supports(n))), !o)) throw new y(5101, !1);
                    return this._eventNameToPlugin.set(n, o), o;
               }
          };
          (e.ɵfac = function (o) {
               return new (o || e)(D(nu), D(V));
          }),
               (e.ɵprov = w({ token: e, factory: e.ɵfac }));
          let t = e;
          return t;
     })(),
     ai = class {
          constructor(e) {
               this._doc = e;
          }
     },
     Ja = 'ng-app-id',
     Yf = (() => {
          let e = class e {
               constructor(n, o, i, s = {}) {
                    (this.doc = n),
                         (this.appId = o),
                         (this.nonce = i),
                         (this.platformId = s),
                         (this.styleRef = new Map()),
                         (this.hostNodes = new Set()),
                         (this.styleNodesInDOM = this.collectServerRenderedStyles()),
                         (this.platformIsServer = ei(s)),
                         this.resetHostNodes();
               }
               addStyles(n) {
                    for (let o of n) this.changeUsageCount(o, 1) === 1 && this.onStyleAdded(o);
               }
               removeStyles(n) {
                    for (let o of n) this.changeUsageCount(o, -1) <= 0 && this.onStyleRemoved(o);
               }
               ngOnDestroy() {
                    let n = this.styleNodesInDOM;
                    n && (n.forEach((o) => o.remove()), n.clear());
                    for (let o of this.getAllStyles()) this.onStyleRemoved(o);
                    this.resetHostNodes();
               }
               addHost(n) {
                    this.hostNodes.add(n);
                    for (let o of this.getAllStyles()) this.addStyleToHost(n, o);
               }
               removeHost(n) {
                    this.hostNodes.delete(n);
               }
               getAllStyles() {
                    return this.styleRef.keys();
               }
               onStyleAdded(n) {
                    for (let o of this.hostNodes) this.addStyleToHost(o, n);
               }
               onStyleRemoved(n) {
                    let o = this.styleRef;
                    o.get(n)?.elements?.forEach((i) => i.remove()), o.delete(n);
               }
               collectServerRenderedStyles() {
                    let n = this.doc.head?.querySelectorAll(`style[${Ja}="${this.appId}"]`);
                    if (n?.length) {
                         let o = new Map();
                         return (
                              n.forEach((i) => {
                                   i.textContent != null && o.set(i.textContent, i);
                              }),
                              o
                         );
                    }
                    return null;
               }
               changeUsageCount(n, o) {
                    let i = this.styleRef;
                    if (i.has(n)) {
                         let s = i.get(n);
                         return (s.usage += o), s.usage;
                    }
                    return i.set(n, { usage: o, elements: [] }), o;
               }
               getStyleElement(n, o) {
                    let i = this.styleNodesInDOM,
                         s = i?.get(o);
                    if (s?.parentNode === n) return i.delete(o), s.removeAttribute(Ja), s;
                    {
                         let a = this.doc.createElement('style');
                         return (
                              this.nonce && a.setAttribute('nonce', this.nonce),
                              (a.textContent = o),
                              this.platformIsServer && a.setAttribute(Ja, this.appId),
                              n.appendChild(a),
                              a
                         );
                    }
               }
               addStyleToHost(n, o) {
                    let i = this.getStyleElement(n, o),
                         s = this.styleRef,
                         a = s.get(o)?.elements;
                    a ? a.push(i) : s.set(o, { elements: [i], usage: 1 });
               }
               resetHostNodes() {
                    let n = this.hostNodes;
                    n.clear(), n.add(this.doc.head);
               }
          };
          (e.ɵfac = function (o) {
               return new (o || e)(D(Q), D(pa), D(ma, 8), D(ke));
          }),
               (e.ɵprov = w({ token: e, factory: e.ɵfac }));
          let t = e;
          return t;
     })(),
     Xa = {
          svg: 'http://www.w3.org/2000/svg',
          xhtml: 'http://www.w3.org/1999/xhtml',
          xlink: 'http://www.w3.org/1999/xlink',
          xml: 'http://www.w3.org/XML/1998/namespace',
          xmlns: 'http://www.w3.org/2000/xmlns/',
          math: 'http://www.w3.org/1998/MathML/',
     },
     ou = /%COMP%/g,
     Qf = '%COMP%',
     Dw = `_nghost-${Qf}`,
     ww = `_ngcontent-${Qf}`,
     Cw = !0,
     Ew = new E('RemoveStylesOnCompDestroy', { providedIn: 'root', factory: () => Cw });
function Iw(t) {
     return ww.replace(ou, t);
}
function bw(t) {
     return Dw.replace(ou, t);
}
function Kf(t, e) {
     return e.map((r) => r.replace(ou, t));
}
var Wf = (() => {
          let e = class e {
               constructor(n, o, i, s, a, u, c, l = null) {
                    (this.eventManager = n),
                         (this.sharedStylesHost = o),
                         (this.appId = i),
                         (this.removeStylesOnCompDestroy = s),
                         (this.doc = a),
                         (this.platformId = u),
                         (this.ngZone = c),
                         (this.nonce = l),
                         (this.rendererByCompId = new Map()),
                         (this.platformIsServer = ei(u)),
                         (this.defaultRenderer = new or(n, a, c, this.platformIsServer));
               }
               createRenderer(n, o) {
                    if (!n || !o) return this.defaultRenderer;
                    this.platformIsServer &&
                         o.encapsulation === Ae.ShadowDom &&
                         (o = H(m({}, o), { encapsulation: Ae.Emulated }));
                    let i = this.getOrCreateRenderer(n, o);
                    return i instanceof ui ? i.applyToHost(n) : i instanceof ir && i.applyStyles(), i;
               }
               getOrCreateRenderer(n, o) {
                    let i = this.rendererByCompId,
                         s = i.get(o.id);
                    if (!s) {
                         let a = this.doc,
                              u = this.ngZone,
                              c = this.eventManager,
                              l = this.sharedStylesHost,
                              d = this.removeStylesOnCompDestroy,
                              f = this.platformIsServer;
                         switch (o.encapsulation) {
                              case Ae.Emulated:
                                   s = new ui(c, l, o, this.appId, d, a, u, f);
                                   break;
                              case Ae.ShadowDom:
                                   return new ru(c, l, n, o, a, u, this.nonce, f);
                              default:
                                   s = new ir(c, l, o, d, a, u, f);
                                   break;
                         }
                         i.set(o.id, s);
                    }
                    return s;
               }
               ngOnDestroy() {
                    this.rendererByCompId.clear();
               }
          };
          (e.ɵfac = function (o) {
               return new (o || e)(D(Zf), D(Yf), D(pa), D(Ew), D(Q), D(ke), D(V), D(ma));
          }),
               (e.ɵprov = w({ token: e, factory: e.ɵfac }));
          let t = e;
          return t;
     })(),
     or = class {
          constructor(e, r, n, o) {
               (this.eventManager = e),
                    (this.doc = r),
                    (this.ngZone = n),
                    (this.platformIsServer = o),
                    (this.data = Object.create(null)),
                    (this.throwOnSyntheticProps = !0),
                    (this.destroyNode = null);
          }
          destroy() {}
          createElement(e, r) {
               return r ? this.doc.createElementNS(Xa[r] || r, e) : this.doc.createElement(e);
          }
          createComment(e) {
               return this.doc.createComment(e);
          }
          createText(e) {
               return this.doc.createTextNode(e);
          }
          appendChild(e, r) {
               (Gf(e) ? e.content : e).appendChild(r);
          }
          insertBefore(e, r, n) {
               e && (Gf(e) ? e.content : e).insertBefore(r, n);
          }
          removeChild(e, r) {
               e && e.removeChild(r);
          }
          selectRootElement(e, r) {
               let n = typeof e == 'string' ? this.doc.querySelector(e) : e;
               if (!n) throw new y(-5104, !1);
               return r || (n.textContent = ''), n;
          }
          parentNode(e) {
               return e.parentNode;
          }
          nextSibling(e) {
               return e.nextSibling;
          }
          setAttribute(e, r, n, o) {
               if (o) {
                    r = o + ':' + r;
                    let i = Xa[o];
                    i ? e.setAttributeNS(i, r, n) : e.setAttribute(r, n);
               } else e.setAttribute(r, n);
          }
          removeAttribute(e, r, n) {
               if (n) {
                    let o = Xa[n];
                    o ? e.removeAttributeNS(o, r) : e.removeAttribute(`${n}:${r}`);
               } else e.removeAttribute(r);
          }
          addClass(e, r) {
               e.classList.add(r);
          }
          removeClass(e, r) {
               e.classList.remove(r);
          }
          setStyle(e, r, n, o) {
               o & (He.DashCase | He.Important)
                    ? e.style.setProperty(r, n, o & He.Important ? 'important' : '')
                    : (e.style[r] = n);
          }
          removeStyle(e, r, n) {
               n & He.DashCase ? e.style.removeProperty(r) : (e.style[r] = '');
          }
          setProperty(e, r, n) {
               e != null && (e[r] = n);
          }
          setValue(e, r) {
               e.nodeValue = r;
          }
          listen(e, r, n) {
               if (typeof e == 'string' && ((e = dn().getGlobalEventTarget(this.doc, e)), !e))
                    throw new Error(`Unsupported event target ${e} for event ${r}`);
               return this.eventManager.addEventListener(e, r, this.decoratePreventDefault(n));
          }
          decoratePreventDefault(e) {
               return (r) => {
                    if (r === '__ngUnwrap__') return e;
                    (this.platformIsServer ? this.ngZone.runGuarded(() => e(r)) : e(r)) === !1 && r.preventDefault();
               };
          }
     };
function Gf(t) {
     return t.tagName === 'TEMPLATE' && t.content !== void 0;
}
var ru = class extends or {
          constructor(e, r, n, o, i, s, a, u) {
               super(e, i, s, u),
                    (this.sharedStylesHost = r),
                    (this.hostEl = n),
                    (this.shadowRoot = n.attachShadow({ mode: 'open' })),
                    this.sharedStylesHost.addHost(this.shadowRoot);
               let c = Kf(o.id, o.styles);
               for (let l of c) {
                    let d = document.createElement('style');
                    a && d.setAttribute('nonce', a), (d.textContent = l), this.shadowRoot.appendChild(d);
               }
          }
          nodeOrShadowRoot(e) {
               return e === this.hostEl ? this.shadowRoot : e;
          }
          appendChild(e, r) {
               return super.appendChild(this.nodeOrShadowRoot(e), r);
          }
          insertBefore(e, r, n) {
               return super.insertBefore(this.nodeOrShadowRoot(e), r, n);
          }
          removeChild(e, r) {
               return super.removeChild(this.nodeOrShadowRoot(e), r);
          }
          parentNode(e) {
               return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(e)));
          }
          destroy() {
               this.sharedStylesHost.removeHost(this.shadowRoot);
          }
     },
     ir = class extends or {
          constructor(e, r, n, o, i, s, a, u) {
               super(e, i, s, a),
                    (this.sharedStylesHost = r),
                    (this.removeStylesOnCompDestroy = o),
                    (this.styles = u ? Kf(u, n.styles) : n.styles);
          }
          applyStyles() {
               this.sharedStylesHost.addStyles(this.styles);
          }
          destroy() {
               this.removeStylesOnCompDestroy && this.sharedStylesHost.removeStyles(this.styles);
          }
     },
     ui = class extends ir {
          constructor(e, r, n, o, i, s, a, u) {
               let c = o + '-' + n.id;
               super(e, r, n, i, s, a, u, c), (this.contentAttr = Iw(c)), (this.hostAttr = bw(c));
          }
          applyToHost(e) {
               this.applyStyles(), this.setAttribute(e, this.hostAttr, '');
          }
          createElement(e, r) {
               let n = super.createElement(e, r);
               return super.setAttribute(n, this.contentAttr, ''), n;
          }
     },
     Mw = (() => {
          let e = class e extends ai {
               constructor(n) {
                    super(n);
               }
               supports(n) {
                    return !0;
               }
               addEventListener(n, o, i) {
                    return n.addEventListener(o, i, !1), () => this.removeEventListener(n, o, i);
               }
               removeEventListener(n, o, i) {
                    return n.removeEventListener(o, i);
               }
          };
          (e.ɵfac = function (o) {
               return new (o || e)(D(Q));
          }),
               (e.ɵprov = w({ token: e, factory: e.ɵfac }));
          let t = e;
          return t;
     })(),
     qf = ['alt', 'control', 'meta', 'shift'],
     Sw = {
          '\b': 'Backspace',
          '	': 'Tab',
          '\x7F': 'Delete',
          '\x1B': 'Escape',
          Del: 'Delete',
          Esc: 'Escape',
          Left: 'ArrowLeft',
          Right: 'ArrowRight',
          Up: 'ArrowUp',
          Down: 'ArrowDown',
          Menu: 'ContextMenu',
          Scroll: 'ScrollLock',
          Win: 'OS',
     },
     Tw = { alt: (t) => t.altKey, control: (t) => t.ctrlKey, meta: (t) => t.metaKey, shift: (t) => t.shiftKey },
     xw = (() => {
          let e = class e extends ai {
               constructor(n) {
                    super(n);
               }
               supports(n) {
                    return e.parseEventName(n) != null;
               }
               addEventListener(n, o, i) {
                    let s = e.parseEventName(o),
                         a = e.eventCallback(s.fullKey, i, this.manager.getZone());
                    return this.manager.getZone().runOutsideAngular(() => dn().onAndCancel(n, s.domEventName, a));
               }
               static parseEventName(n) {
                    let o = n.toLowerCase().split('.'),
                         i = o.shift();
                    if (o.length === 0 || !(i === 'keydown' || i === 'keyup')) return null;
                    let s = e._normalizeKey(o.pop()),
                         a = '',
                         u = o.indexOf('code');
                    if (
                         (u > -1 && (o.splice(u, 1), (a = 'code.')),
                         qf.forEach((l) => {
                              let d = o.indexOf(l);
                              d > -1 && (o.splice(d, 1), (a += l + '.'));
                         }),
                         (a += s),
                         o.length != 0 || s.length === 0)
                    )
                         return null;
                    let c = {};
                    return (c.domEventName = i), (c.fullKey = a), c;
               }
               static matchEventFullKeyCode(n, o) {
                    let i = Sw[n.key] || n.key,
                         s = '';
                    return (
                         o.indexOf('code.') > -1 && ((i = n.code), (s = 'code.')),
                         i == null || !i
                              ? !1
                              : ((i = i.toLowerCase()),
                                i === ' ' ? (i = 'space') : i === '.' && (i = 'dot'),
                                qf.forEach((a) => {
                                     if (a !== i) {
                                          let u = Tw[a];
                                          u(n) && (s += a + '.');
                                     }
                                }),
                                (s += i),
                                s === o)
                    );
               }
               static eventCallback(n, o, i) {
                    return (s) => {
                         e.matchEventFullKeyCode(s, n) && i.runGuarded(() => o(s));
                    };
               }
               static _normalizeKey(n) {
                    return n === 'esc' ? 'escape' : n;
               }
          };
          (e.ɵfac = function (o) {
               return new (o || e)(D(Q));
          }),
               (e.ɵprov = w({ token: e, factory: e.ɵfac }));
          let t = e;
          return t;
     })();
function u_(t, e) {
     return Ef(m({ rootComponent: t }, _w(e)));
}
function _w(t) {
     return { appProviders: [...Pw, ...(t?.providers ?? [])], platformProviders: Ow };
}
function Aw() {
     tu.makeCurrent();
}
function Nw() {
     return new Pe();
}
function Rw() {
     return yd(document), document;
}
var Ow = [
     { provide: ke, useValue: Rf },
     { provide: ga, useValue: Aw, multi: !0 },
     { provide: Q, useFactory: Rw, deps: [] },
];
var Pw = [
     { provide: $o, useValue: 'root' },
     { provide: Pe, useFactory: Nw, deps: [] },
     { provide: nu, useClass: Mw, multi: !0, deps: [Q, V, ke] },
     { provide: nu, useClass: xw, multi: !0, deps: [Q] },
     Wf,
     Yf,
     Zf,
     { provide: Ln, useExisting: Wf },
     { provide: fn, useClass: yw, deps: [] },
     [],
];
function Fw() {
     return new iu(D(Q));
}
var iu = (() => {
     let e = class e {
          constructor(n) {
               this._doc = n;
          }
          getTitle() {
               return this._doc.title;
          }
          setTitle(n) {
               this._doc.title = n || '';
          }
     };
     (e.ɵfac = function (o) {
          return new (o || e)(D(Q));
     }),
          (e.ɵprov = w({
               token: e,
               factory: function (o) {
                    let i = null;
                    return o ? (i = new o()) : (i = Fw()), i;
               },
               providedIn: 'root',
          }));
     let t = e;
     return t;
})();
var l_ = { server: 'https://demo-api.vercel.app', production: !0 };
var T = 'primary',
     Cr = Symbol('RouteTitle'),
     lu = class {
          constructor(e) {
               this.params = e || {};
          }
          has(e) {
               return Object.prototype.hasOwnProperty.call(this.params, e);
          }
          get(e) {
               if (this.has(e)) {
                    let r = this.params[e];
                    return Array.isArray(r) ? r[0] : r;
               }
               return null;
          }
          getAll(e) {
               if (this.has(e)) {
                    let r = this.params[e];
                    return Array.isArray(r) ? r : [r];
               }
               return [];
          }
          get keys() {
               return Object.keys(this.params);
          }
     };
function Dn(t) {
     return new lu(t);
}
function Lw(t, e, r) {
     let n = r.path.split('/');
     if (n.length > t.length || (r.pathMatch === 'full' && (e.hasChildren() || n.length < t.length))) return null;
     let o = {};
     for (let i = 0; i < n.length; i++) {
          let s = n[i],
               a = t[i];
          if (s.startsWith(':')) o[s.substring(1)] = a;
          else if (s !== a.path) return null;
     }
     return { consumed: t.slice(0, n.length), posParams: o };
}
function jw(t, e) {
     if (t.length !== e.length) return !1;
     for (let r = 0; r < t.length; ++r) if (!Le(t[r], e[r])) return !1;
     return !0;
}
function Le(t, e) {
     let r = t ? du(t) : void 0,
          n = e ? du(e) : void 0;
     if (!r || !n || r.length != n.length) return !1;
     let o;
     for (let i = 0; i < r.length; i++) if (((o = r[i]), !ah(t[o], e[o]))) return !1;
     return !0;
}
function du(t) {
     return [...Object.keys(t), ...Object.getOwnPropertySymbols(t)];
}
function ah(t, e) {
     if (Array.isArray(t) && Array.isArray(e)) {
          if (t.length !== e.length) return !1;
          let r = [...t].sort(),
               n = [...e].sort();
          return r.every((o, i) => n[i] === o);
     } else return t === e;
}
function uh(t) {
     return t.length > 0 ? t[t.length - 1] : null;
}
function ft(t) {
     return $i(t) ? t : Kn(t) ? j(Promise.resolve(t)) : C(t);
}
var Vw = { exact: lh, subset: dh },
     ch = { exact: $w, subset: Uw, ignored: () => !0 };
function Jf(t, e, r) {
     return (
          Vw[r.paths](t.root, e.root, r.matrixParams) &&
          ch[r.queryParams](t.queryParams, e.queryParams) &&
          !(r.fragment === 'exact' && t.fragment !== e.fragment)
     );
}
function $w(t, e) {
     return Le(t, e);
}
function lh(t, e, r) {
     if (!xt(t.segments, e.segments) || !di(t.segments, e.segments, r) || t.numberOfChildren !== e.numberOfChildren)
          return !1;
     for (let n in e.children) if (!t.children[n] || !lh(t.children[n], e.children[n], r)) return !1;
     return !0;
}
function Uw(t, e) {
     return Object.keys(e).length <= Object.keys(t).length && Object.keys(e).every((r) => ah(t[r], e[r]));
}
function dh(t, e, r) {
     return fh(t, e, e.segments, r);
}
function fh(t, e, r, n) {
     if (t.segments.length > r.length) {
          let o = t.segments.slice(0, r.length);
          return !(!xt(o, r) || e.hasChildren() || !di(o, r, n));
     } else if (t.segments.length === r.length) {
          if (!xt(t.segments, r) || !di(t.segments, r, n)) return !1;
          for (let o in e.children) if (!t.children[o] || !dh(t.children[o], e.children[o], n)) return !1;
          return !0;
     } else {
          let o = r.slice(0, t.segments.length),
               i = r.slice(t.segments.length);
          return !xt(t.segments, o) || !di(t.segments, o, n) || !t.children[T] ? !1 : fh(t.children[T], e, i, n);
     }
}
function di(t, e, r) {
     return e.every((n, o) => ch[r](t[o].parameters, n.parameters));
}
var ut = class {
          constructor(e = new F([], {}), r = {}, n = null) {
               (this.root = e), (this.queryParams = r), (this.fragment = n);
          }
          get queryParamMap() {
               return this._queryParamMap || (this._queryParamMap = Dn(this.queryParams)), this._queryParamMap;
          }
          toString() {
               return zw.serialize(this);
          }
     },
     F = class {
          constructor(e, r) {
               (this.segments = e),
                    (this.children = r),
                    (this.parent = null),
                    Object.values(r).forEach((n) => (n.parent = this));
          }
          hasChildren() {
               return this.numberOfChildren > 0;
          }
          get numberOfChildren() {
               return Object.keys(this.children).length;
          }
          toString() {
               return fi(this);
          }
     },
     Tt = class {
          constructor(e, r) {
               (this.path = e), (this.parameters = r);
          }
          get parameterMap() {
               return this._parameterMap || (this._parameterMap = Dn(this.parameters)), this._parameterMap;
          }
          toString() {
               return ph(this);
          }
     };
function Bw(t, e) {
     return xt(t, e) && t.every((r, n) => Le(r.parameters, e[n].parameters));
}
function xt(t, e) {
     return t.length !== e.length ? !1 : t.every((r, n) => r.path === e[n].path);
}
function Hw(t, e) {
     let r = [];
     return (
          Object.entries(t.children).forEach(([n, o]) => {
               n === T && (r = r.concat(e(o, n)));
          }),
          Object.entries(t.children).forEach(([n, o]) => {
               n !== T && (r = r.concat(e(o, n)));
          }),
          r
     );
}
var Er = (() => {
          let e = class e {};
          (e.ɵfac = function (o) {
               return new (o || e)();
          }),
               (e.ɵprov = w({ token: e, factory: () => (() => new fr())(), providedIn: 'root' }));
          let t = e;
          return t;
     })(),
     fr = class {
          parse(e) {
               let r = new hu(e);
               return new ut(r.parseRootSegment(), r.parseQueryParams(), r.parseFragment());
          }
          serialize(e) {
               let r = `/${sr(e.root, !0)}`,
                    n = qw(e.queryParams),
                    o = typeof e.fragment == 'string' ? `#${Ww(e.fragment)}` : '';
               return `${r}${n}${o}`;
          }
     },
     zw = new fr();
function fi(t) {
     return t.segments.map((e) => ph(e)).join('/');
}
function sr(t, e) {
     if (!t.hasChildren()) return fi(t);
     if (e) {
          let r = t.children[T] ? sr(t.children[T], !1) : '',
               n = [];
          return (
               Object.entries(t.children).forEach(([o, i]) => {
                    o !== T && n.push(`${o}:${sr(i, !1)}`);
               }),
               n.length > 0 ? `${r}(${n.join('//')})` : r
          );
     } else {
          let r = Hw(t, (n, o) => (o === T ? [sr(t.children[T], !1)] : [`${o}:${sr(n, !1)}`]));
          return Object.keys(t.children).length === 1 && t.children[T] != null
               ? `${fi(t)}/${r[0]}`
               : `${fi(t)}/(${r.join('//')})`;
     }
}
function hh(t) {
     return encodeURIComponent(t).replace(/%40/g, '@').replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',');
}
function ci(t) {
     return hh(t).replace(/%3B/gi, ';');
}
function Ww(t) {
     return encodeURI(t);
}
function fu(t) {
     return hh(t).replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/%26/gi, '&');
}
function hi(t) {
     return decodeURIComponent(t);
}
function Xf(t) {
     return hi(t.replace(/\+/g, '%20'));
}
function ph(t) {
     return `${fu(t.path)}${Gw(t.parameters)}`;
}
function Gw(t) {
     return Object.keys(t)
          .map((e) => `;${fu(e)}=${fu(t[e])}`)
          .join('');
}
function qw(t) {
     let e = Object.keys(t)
          .map((r) => {
               let n = t[r];
               return Array.isArray(n) ? n.map((o) => `${ci(r)}=${ci(o)}`).join('&') : `${ci(r)}=${ci(n)}`;
          })
          .filter((r) => !!r);
     return e.length ? `?${e.join('&')}` : '';
}
var Zw = /^[^\/()?;#]+/;
function su(t) {
     let e = t.match(Zw);
     return e ? e[0] : '';
}
var Yw = /^[^\/()?;=#]+/;
function Qw(t) {
     let e = t.match(Yw);
     return e ? e[0] : '';
}
var Kw = /^[^=?&#]+/;
function Jw(t) {
     let e = t.match(Kw);
     return e ? e[0] : '';
}
var Xw = /^[^&#]+/;
function eC(t) {
     let e = t.match(Xw);
     return e ? e[0] : '';
}
var hu = class {
     constructor(e) {
          (this.url = e), (this.remaining = e);
     }
     parseRootSegment() {
          return (
               this.consumeOptional('/'),
               this.remaining === '' || this.peekStartsWith('?') || this.peekStartsWith('#')
                    ? new F([], {})
                    : new F([], this.parseChildren())
          );
     }
     parseQueryParams() {
          let e = {};
          if (this.consumeOptional('?'))
               do this.parseQueryParam(e);
               while (this.consumeOptional('&'));
          return e;
     }
     parseFragment() {
          return this.consumeOptional('#') ? decodeURIComponent(this.remaining) : null;
     }
     parseChildren() {
          if (this.remaining === '') return {};
          this.consumeOptional('/');
          let e = [];
          for (
               this.peekStartsWith('(') || e.push(this.parseSegment());
               this.peekStartsWith('/') && !this.peekStartsWith('//') && !this.peekStartsWith('/(');

          )
               this.capture('/'), e.push(this.parseSegment());
          let r = {};
          this.peekStartsWith('/(') && (this.capture('/'), (r = this.parseParens(!0)));
          let n = {};
          return (
               this.peekStartsWith('(') && (n = this.parseParens(!1)),
               (e.length > 0 || Object.keys(r).length > 0) && (n[T] = new F(e, r)),
               n
          );
     }
     parseSegment() {
          let e = su(this.remaining);
          if (e === '' && this.peekStartsWith(';')) throw new y(4009, !1);
          return this.capture(e), new Tt(hi(e), this.parseMatrixParams());
     }
     parseMatrixParams() {
          let e = {};
          for (; this.consumeOptional(';'); ) this.parseParam(e);
          return e;
     }
     parseParam(e) {
          let r = Qw(this.remaining);
          if (!r) return;
          this.capture(r);
          let n = '';
          if (this.consumeOptional('=')) {
               let o = su(this.remaining);
               o && ((n = o), this.capture(n));
          }
          e[hi(r)] = hi(n);
     }
     parseQueryParam(e) {
          let r = Jw(this.remaining);
          if (!r) return;
          this.capture(r);
          let n = '';
          if (this.consumeOptional('=')) {
               let s = eC(this.remaining);
               s && ((n = s), this.capture(n));
          }
          let o = Xf(r),
               i = Xf(n);
          if (e.hasOwnProperty(o)) {
               let s = e[o];
               Array.isArray(s) || ((s = [s]), (e[o] = s)), s.push(i);
          } else e[o] = i;
     }
     parseParens(e) {
          let r = {};
          for (this.capture('('); !this.consumeOptional(')') && this.remaining.length > 0; ) {
               let n = su(this.remaining),
                    o = this.remaining[n.length];
               if (o !== '/' && o !== ')' && o !== ';') throw new y(4010, !1);
               let i;
               n.indexOf(':') > -1
                    ? ((i = n.slice(0, n.indexOf(':'))), this.capture(i), this.capture(':'))
                    : e && (i = T);
               let s = this.parseChildren();
               (r[i] = Object.keys(s).length === 1 ? s[T] : new F([], s)), this.consumeOptional('//');
          }
          return r;
     }
     peekStartsWith(e) {
          return this.remaining.startsWith(e);
     }
     consumeOptional(e) {
          return this.peekStartsWith(e) ? ((this.remaining = this.remaining.substring(e.length)), !0) : !1;
     }
     capture(e) {
          if (!this.consumeOptional(e)) throw new y(4011, !1);
     }
};
function gh(t) {
     return t.segments.length > 0 ? new F([], { [T]: t }) : t;
}
function mh(t) {
     let e = {};
     for (let n of Object.keys(t.children)) {
          let o = t.children[n],
               i = mh(o);
          if (n === T && i.segments.length === 0 && i.hasChildren())
               for (let [s, a] of Object.entries(i.children)) e[s] = a;
          else (i.segments.length > 0 || i.hasChildren()) && (e[n] = i);
     }
     let r = new F(t.segments, e);
     return tC(r);
}
function tC(t) {
     if (t.numberOfChildren === 1 && t.children[T]) {
          let e = t.children[T];
          return new F(t.segments.concat(e.segments), e.children);
     }
     return t;
}
function wn(t) {
     return t instanceof ut;
}
function nC(t, e, r = null, n = null) {
     let o = vh(t);
     return yh(o, e, r, n);
}
function vh(t) {
     let e;
     function r(i) {
          let s = {};
          for (let u of i.children) {
               let c = r(u);
               s[u.outlet] = c;
          }
          let a = new F(i.url, s);
          return i === t && (e = a), a;
     }
     let n = r(t.root),
          o = gh(n);
     return e ?? o;
}
function yh(t, e, r, n) {
     let o = t;
     for (; o.parent; ) o = o.parent;
     if (e.length === 0) return au(o, o, o, r, n);
     let i = rC(e);
     if (i.toRoot()) return au(o, o, new F([], {}), r, n);
     let s = oC(i, o, t),
          a = s.processChildren ? cr(s.segmentGroup, s.index, i.commands) : wh(s.segmentGroup, s.index, i.commands);
     return au(o, s.segmentGroup, a, r, n);
}
function pi(t) {
     return typeof t == 'object' && t != null && !t.outlets && !t.segmentPath;
}
function hr(t) {
     return typeof t == 'object' && t != null && t.outlets;
}
function au(t, e, r, n, o) {
     let i = {};
     n &&
          Object.entries(n).forEach(([u, c]) => {
               i[u] = Array.isArray(c) ? c.map((l) => `${l}`) : `${c}`;
          });
     let s;
     t === e ? (s = r) : (s = Dh(t, e, r));
     let a = gh(mh(s));
     return new ut(a, i, o);
}
function Dh(t, e, r) {
     let n = {};
     return (
          Object.entries(t.children).forEach(([o, i]) => {
               i === e ? (n[o] = r) : (n[o] = Dh(i, e, r));
          }),
          new F(t.segments, n)
     );
}
var gi = class {
     constructor(e, r, n) {
          if (
               ((this.isAbsolute = e),
               (this.numberOfDoubleDots = r),
               (this.commands = n),
               e && n.length > 0 && pi(n[0]))
          )
               throw new y(4003, !1);
          let o = n.find(hr);
          if (o && o !== uh(n)) throw new y(4004, !1);
     }
     toRoot() {
          return this.isAbsolute && this.commands.length === 1 && this.commands[0] == '/';
     }
};
function rC(t) {
     if (typeof t[0] == 'string' && t.length === 1 && t[0] === '/') return new gi(!0, 0, t);
     let e = 0,
          r = !1,
          n = t.reduce((o, i, s) => {
               if (typeof i == 'object' && i != null) {
                    if (i.outlets) {
                         let a = {};
                         return (
                              Object.entries(i.outlets).forEach(([u, c]) => {
                                   a[u] = typeof c == 'string' ? c.split('/') : c;
                              }),
                              [...o, { outlets: a }]
                         );
                    }
                    if (i.segmentPath) return [...o, i.segmentPath];
               }
               return typeof i != 'string'
                    ? [...o, i]
                    : s === 0
                    ? (i.split('/').forEach((a, u) => {
                           (u == 0 && a === '.') ||
                                (u == 0 && a === '' ? (r = !0) : a === '..' ? e++ : a != '' && o.push(a));
                      }),
                      o)
                    : [...o, i];
          }, []);
     return new gi(r, e, n);
}
var vn = class {
     constructor(e, r, n) {
          (this.segmentGroup = e), (this.processChildren = r), (this.index = n);
     }
};
function oC(t, e, r) {
     if (t.isAbsolute) return new vn(e, !0, 0);
     if (!r) return new vn(e, !1, NaN);
     if (r.parent === null) return new vn(r, !0, 0);
     let n = pi(t.commands[0]) ? 0 : 1,
          o = r.segments.length - 1 + n;
     return iC(r, o, t.numberOfDoubleDots);
}
function iC(t, e, r) {
     let n = t,
          o = e,
          i = r;
     for (; i > o; ) {
          if (((i -= o), (n = n.parent), !n)) throw new y(4005, !1);
          o = n.segments.length;
     }
     return new vn(n, !1, o - i);
}
function sC(t) {
     return hr(t[0]) ? t[0].outlets : { [T]: t };
}
function wh(t, e, r) {
     if ((t || (t = new F([], {})), t.segments.length === 0 && t.hasChildren())) return cr(t, e, r);
     let n = aC(t, e, r),
          o = r.slice(n.commandIndex);
     if (n.match && n.pathIndex < t.segments.length) {
          let i = new F(t.segments.slice(0, n.pathIndex), {});
          return (i.children[T] = new F(t.segments.slice(n.pathIndex), t.children)), cr(i, 0, o);
     } else
          return n.match && o.length === 0
               ? new F(t.segments, {})
               : n.match && !t.hasChildren()
               ? pu(t, e, r)
               : n.match
               ? cr(t, 0, o)
               : pu(t, e, r);
}
function cr(t, e, r) {
     if (r.length === 0) return new F(t.segments, {});
     {
          let n = sC(r),
               o = {};
          if (
               Object.keys(n).some((i) => i !== T) &&
               t.children[T] &&
               t.numberOfChildren === 1 &&
               t.children[T].segments.length === 0
          ) {
               let i = cr(t.children[T], e, r);
               return new F(t.segments, i.children);
          }
          return (
               Object.entries(n).forEach(([i, s]) => {
                    typeof s == 'string' && (s = [s]), s !== null && (o[i] = wh(t.children[i], e, s));
               }),
               Object.entries(t.children).forEach(([i, s]) => {
                    n[i] === void 0 && (o[i] = s);
               }),
               new F(t.segments, o)
          );
     }
}
function aC(t, e, r) {
     let n = 0,
          o = e,
          i = { match: !1, pathIndex: 0, commandIndex: 0 };
     for (; o < t.segments.length; ) {
          if (n >= r.length) return i;
          let s = t.segments[o],
               a = r[n];
          if (hr(a)) break;
          let u = `${a}`,
               c = n < r.length - 1 ? r[n + 1] : null;
          if (o > 0 && u === void 0) break;
          if (u && c && typeof c == 'object' && c.outlets === void 0) {
               if (!th(u, c, s)) return i;
               n += 2;
          } else {
               if (!th(u, {}, s)) return i;
               n++;
          }
          o++;
     }
     return { match: !0, pathIndex: o, commandIndex: n };
}
function pu(t, e, r) {
     let n = t.segments.slice(0, e),
          o = 0;
     for (; o < r.length; ) {
          let i = r[o];
          if (hr(i)) {
               let u = uC(i.outlets);
               return new F(n, u);
          }
          if (o === 0 && pi(r[0])) {
               let u = t.segments[e];
               n.push(new Tt(u.path, eh(r[0]))), o++;
               continue;
          }
          let s = hr(i) ? i.outlets[T] : `${i}`,
               a = o < r.length - 1 ? r[o + 1] : null;
          s && a && pi(a) ? (n.push(new Tt(s, eh(a))), (o += 2)) : (n.push(new Tt(s, {})), o++);
     }
     return new F(n, {});
}
function uC(t) {
     let e = {};
     return (
          Object.entries(t).forEach(([r, n]) => {
               typeof n == 'string' && (n = [n]), n !== null && (e[r] = pu(new F([], {}), 0, n));
          }),
          e
     );
}
function eh(t) {
     let e = {};
     return Object.entries(t).forEach(([r, n]) => (e[r] = `${n}`)), e;
}
function th(t, e, r) {
     return t == r.path && Le(e, r.parameters);
}
var lr = 'imperative',
     ge = class {
          constructor(e, r) {
               (this.id = e), (this.url = r);
          }
     },
     Cn = class extends ge {
          constructor(e, r, n = 'imperative', o = null) {
               super(e, r), (this.type = 0), (this.navigationTrigger = n), (this.restoredState = o);
          }
          toString() {
               return `NavigationStart(id: ${this.id}, url: '${this.url}')`;
          }
     },
     qe = class extends ge {
          constructor(e, r, n) {
               super(e, r), (this.urlAfterRedirects = n), (this.type = 1);
          }
          toString() {
               return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`;
          }
     },
     ct = class extends ge {
          constructor(e, r, n, o) {
               super(e, r), (this.reason = n), (this.code = o), (this.type = 2);
          }
          toString() {
               return `NavigationCancel(id: ${this.id}, url: '${this.url}')`;
          }
     },
     lt = class extends ge {
          constructor(e, r, n, o) {
               super(e, r), (this.reason = n), (this.code = o), (this.type = 16);
          }
     },
     pr = class extends ge {
          constructor(e, r, n, o) {
               super(e, r), (this.error = n), (this.target = o), (this.type = 3);
          }
          toString() {
               return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`;
          }
     },
     mi = class extends ge {
          constructor(e, r, n, o) {
               super(e, r), (this.urlAfterRedirects = n), (this.state = o), (this.type = 4);
          }
          toString() {
               return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
          }
     },
     gu = class extends ge {
          constructor(e, r, n, o) {
               super(e, r), (this.urlAfterRedirects = n), (this.state = o), (this.type = 7);
          }
          toString() {
               return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
          }
     },
     mu = class extends ge {
          constructor(e, r, n, o, i) {
               super(e, r), (this.urlAfterRedirects = n), (this.state = o), (this.shouldActivate = i), (this.type = 8);
          }
          toString() {
               return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`;
          }
     },
     vu = class extends ge {
          constructor(e, r, n, o) {
               super(e, r), (this.urlAfterRedirects = n), (this.state = o), (this.type = 5);
          }
          toString() {
               return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
          }
     },
     yu = class extends ge {
          constructor(e, r, n, o) {
               super(e, r), (this.urlAfterRedirects = n), (this.state = o), (this.type = 6);
          }
          toString() {
               return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
          }
     },
     Du = class {
          constructor(e) {
               (this.route = e), (this.type = 9);
          }
          toString() {
               return `RouteConfigLoadStart(path: ${this.route.path})`;
          }
     },
     wu = class {
          constructor(e) {
               (this.route = e), (this.type = 10);
          }
          toString() {
               return `RouteConfigLoadEnd(path: ${this.route.path})`;
          }
     },
     Cu = class {
          constructor(e) {
               (this.snapshot = e), (this.type = 11);
          }
          toString() {
               return `ChildActivationStart(path: '${
                    (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ''
               }')`;
          }
     },
     Eu = class {
          constructor(e) {
               (this.snapshot = e), (this.type = 12);
          }
          toString() {
               return `ChildActivationEnd(path: '${
                    (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ''
               }')`;
          }
     },
     Iu = class {
          constructor(e) {
               (this.snapshot = e), (this.type = 13);
          }
          toString() {
               return `ActivationStart(path: '${(this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ''}')`;
          }
     },
     bu = class {
          constructor(e) {
               (this.snapshot = e), (this.type = 14);
          }
          toString() {
               return `ActivationEnd(path: '${(this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ''}')`;
          }
     },
     vi = class {
          constructor(e, r, n) {
               (this.routerEvent = e), (this.position = r), (this.anchor = n), (this.type = 15);
          }
          toString() {
               let e = this.position ? `${this.position[0]}, ${this.position[1]}` : null;
               return `Scroll(anchor: '${this.anchor}', position: '${e}')`;
          }
     },
     gr = class {},
     mr = class {
          constructor(e) {
               this.url = e;
          }
     };
var Mu = class {
          constructor() {
               (this.outlet = null),
                    (this.route = null),
                    (this.injector = null),
                    (this.children = new Ir()),
                    (this.attachRef = null);
          }
     },
     Ir = (() => {
          let e = class e {
               constructor() {
                    this.contexts = new Map();
               }
               onChildOutletCreated(n, o) {
                    let i = this.getOrCreateContext(n);
                    (i.outlet = o), this.contexts.set(n, i);
               }
               onChildOutletDestroyed(n) {
                    let o = this.getContext(n);
                    o && ((o.outlet = null), (o.attachRef = null));
               }
               onOutletDeactivated() {
                    let n = this.contexts;
                    return (this.contexts = new Map()), n;
               }
               onOutletReAttached(n) {
                    this.contexts = n;
               }
               getOrCreateContext(n) {
                    let o = this.getContext(n);
                    return o || ((o = new Mu()), this.contexts.set(n, o)), o;
               }
               getContext(n) {
                    return this.contexts.get(n) || null;
               }
          };
          (e.ɵfac = function (o) {
               return new (o || e)();
          }),
               (e.ɵprov = w({ token: e, factory: e.ɵfac, providedIn: 'root' }));
          let t = e;
          return t;
     })(),
     yi = class {
          constructor(e) {
               this._root = e;
          }
          get root() {
               return this._root.value;
          }
          parent(e) {
               let r = this.pathFromRoot(e);
               return r.length > 1 ? r[r.length - 2] : null;
          }
          children(e) {
               let r = Su(e, this._root);
               return r ? r.children.map((n) => n.value) : [];
          }
          firstChild(e) {
               let r = Su(e, this._root);
               return r && r.children.length > 0 ? r.children[0].value : null;
          }
          siblings(e) {
               let r = Tu(e, this._root);
               return r.length < 2 ? [] : r[r.length - 2].children.map((o) => o.value).filter((o) => o !== e);
          }
          pathFromRoot(e) {
               return Tu(e, this._root).map((r) => r.value);
          }
     };
function Su(t, e) {
     if (t === e.value) return e;
     for (let r of e.children) {
          let n = Su(t, r);
          if (n) return n;
     }
     return null;
}
function Tu(t, e) {
     if (t === e.value) return [e];
     for (let r of e.children) {
          let n = Tu(t, r);
          if (n.length) return n.unshift(e), n;
     }
     return [];
}
var de = class {
     constructor(e, r) {
          (this.value = e), (this.children = r);
     }
     toString() {
          return `TreeNode(${this.value})`;
     }
};
function mn(t) {
     let e = {};
     return t && t.children.forEach((r) => (e[r.value.outlet] = r)), e;
}
var Di = class extends yi {
     constructor(e, r) {
          super(e), (this.snapshot = r), Lu(this, e);
     }
     toString() {
          return this.snapshot.toString();
     }
};
function Ch(t, e) {
     let r = cC(t, e),
          n = new J([new Tt('', {})]),
          o = new J({}),
          i = new J({}),
          s = new J({}),
          a = new J(''),
          u = new _t(n, o, s, a, i, T, e, r.root);
     return (u.snapshot = r.root), new Di(new de(u, []), r);
}
function cC(t, e) {
     let r = {},
          n = {},
          o = {},
          i = '',
          s = new vr([], r, o, i, n, T, e, null, {});
     return new wi('', new de(s, []));
}
var _t = class {
     constructor(e, r, n, o, i, s, a, u) {
          (this.urlSubject = e),
               (this.paramsSubject = r),
               (this.queryParamsSubject = n),
               (this.fragmentSubject = o),
               (this.dataSubject = i),
               (this.outlet = s),
               (this.component = a),
               (this._futureSnapshot = u),
               (this.title = this.dataSubject?.pipe(R((c) => c[Cr])) ?? C(void 0)),
               (this.url = e),
               (this.params = r),
               (this.queryParams = n),
               (this.fragment = o),
               (this.data = i);
     }
     get routeConfig() {
          return this._futureSnapshot.routeConfig;
     }
     get root() {
          return this._routerState.root;
     }
     get parent() {
          return this._routerState.parent(this);
     }
     get firstChild() {
          return this._routerState.firstChild(this);
     }
     get children() {
          return this._routerState.children(this);
     }
     get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
     }
     get paramMap() {
          return this._paramMap || (this._paramMap = this.params.pipe(R((e) => Dn(e)))), this._paramMap;
     }
     get queryParamMap() {
          return (
               this._queryParamMap || (this._queryParamMap = this.queryParams.pipe(R((e) => Dn(e)))),
               this._queryParamMap
          );
     }
     toString() {
          return this.snapshot ? this.snapshot.toString() : `Future(${this._futureSnapshot})`;
     }
};
function ku(t, e, r = 'emptyOnly') {
     let n,
          { routeConfig: o } = t;
     return (
          e !== null && (r === 'always' || o?.path === '' || (!e.component && !e.routeConfig?.loadComponent))
               ? (n = {
                      params: m(m({}, e.params), t.params),
                      data: m(m({}, e.data), t.data),
                      resolve: m(m(m(m({}, t.data), e.data), o?.data), t._resolvedData),
                 })
               : (n = { params: t.params, data: t.data, resolve: m(m({}, t.data), t._resolvedData ?? {}) }),
          o && Ih(o) && (n.resolve[Cr] = o.title),
          n
     );
}
var vr = class {
          get title() {
               return this.data?.[Cr];
          }
          constructor(e, r, n, o, i, s, a, u, c) {
               (this.url = e),
                    (this.params = r),
                    (this.queryParams = n),
                    (this.fragment = o),
                    (this.data = i),
                    (this.outlet = s),
                    (this.component = a),
                    (this.routeConfig = u),
                    (this._resolve = c);
          }
          get root() {
               return this._routerState.root;
          }
          get parent() {
               return this._routerState.parent(this);
          }
          get firstChild() {
               return this._routerState.firstChild(this);
          }
          get children() {
               return this._routerState.children(this);
          }
          get pathFromRoot() {
               return this._routerState.pathFromRoot(this);
          }
          get paramMap() {
               return this._paramMap || (this._paramMap = Dn(this.params)), this._paramMap;
          }
          get queryParamMap() {
               return this._queryParamMap || (this._queryParamMap = Dn(this.queryParams)), this._queryParamMap;
          }
          toString() {
               let e = this.url.map((n) => n.toString()).join('/'),
                    r = this.routeConfig ? this.routeConfig.path : '';
               return `Route(url:'${e}', path:'${r}')`;
          }
     },
     wi = class extends yi {
          constructor(e, r) {
               super(r), (this.url = e), Lu(this, r);
          }
          toString() {
               return Eh(this._root);
          }
     };
function Lu(t, e) {
     (e.value._routerState = t), e.children.forEach((r) => Lu(t, r));
}
function Eh(t) {
     let e = t.children.length > 0 ? ` { ${t.children.map(Eh).join(', ')} } ` : '';
     return `${t.value}${e}`;
}
function uu(t) {
     if (t.snapshot) {
          let e = t.snapshot,
               r = t._futureSnapshot;
          (t.snapshot = r),
               Le(e.queryParams, r.queryParams) || t.queryParamsSubject.next(r.queryParams),
               e.fragment !== r.fragment && t.fragmentSubject.next(r.fragment),
               Le(e.params, r.params) || t.paramsSubject.next(r.params),
               jw(e.url, r.url) || t.urlSubject.next(r.url),
               Le(e.data, r.data) || t.dataSubject.next(r.data);
     } else (t.snapshot = t._futureSnapshot), t.dataSubject.next(t._futureSnapshot.data);
}
function xu(t, e) {
     let r = Le(t.params, e.params) && Bw(t.url, e.url),
          n = !t.parent != !e.parent;
     return r && !n && (!t.parent || xu(t.parent, e.parent));
}
function Ih(t) {
     return typeof t.title == 'string' || t.title === null;
}
var lC = (() => {
          let e = class e {
               constructor() {
                    (this.activated = null),
                         (this._activatedRoute = null),
                         (this.name = T),
                         (this.activateEvents = new ye()),
                         (this.deactivateEvents = new ye()),
                         (this.attachEvents = new ye()),
                         (this.detachEvents = new ye()),
                         (this.parentContexts = p(Ir)),
                         (this.location = p(Go)),
                         (this.changeDetector = p(Wo)),
                         (this.environmentInjector = p(ie)),
                         (this.inputBinder = p(bi, { optional: !0 })),
                         (this.supportsBindingToComponentInputs = !0);
               }
               get activatedComponentRef() {
                    return this.activated;
               }
               ngOnChanges(n) {
                    if (n.name) {
                         let { firstChange: o, previousValue: i } = n.name;
                         if (o) return;
                         this.isTrackedInParentContexts(i) &&
                              (this.deactivate(), this.parentContexts.onChildOutletDestroyed(i)),
                              this.initializeOutletWithName();
                    }
               }
               ngOnDestroy() {
                    this.isTrackedInParentContexts(this.name) && this.parentContexts.onChildOutletDestroyed(this.name),
                         this.inputBinder?.unsubscribeFromRouteData(this);
               }
               isTrackedInParentContexts(n) {
                    return this.parentContexts.getContext(n)?.outlet === this;
               }
               ngOnInit() {
                    this.initializeOutletWithName();
               }
               initializeOutletWithName() {
                    if ((this.parentContexts.onChildOutletCreated(this.name, this), this.activated)) return;
                    let n = this.parentContexts.getContext(this.name);
                    n?.route &&
                         (n.attachRef ? this.attach(n.attachRef, n.route) : this.activateWith(n.route, n.injector));
               }
               get isActivated() {
                    return !!this.activated;
               }
               get component() {
                    if (!this.activated) throw new y(4012, !1);
                    return this.activated.instance;
               }
               get activatedRoute() {
                    if (!this.activated) throw new y(4012, !1);
                    return this._activatedRoute;
               }
               get activatedRouteData() {
                    return this._activatedRoute ? this._activatedRoute.snapshot.data : {};
               }
               detach() {
                    if (!this.activated) throw new y(4012, !1);
                    this.location.detach();
                    let n = this.activated;
                    return (
                         (this.activated = null), (this._activatedRoute = null), this.detachEvents.emit(n.instance), n
                    );
               }
               attach(n, o) {
                    (this.activated = n),
                         (this._activatedRoute = o),
                         this.location.insert(n.hostView),
                         this.inputBinder?.bindActivatedRouteToOutletComponent(this),
                         this.attachEvents.emit(n.instance);
               }
               deactivate() {
                    if (this.activated) {
                         let n = this.component;
                         this.activated.destroy(),
                              (this.activated = null),
                              (this._activatedRoute = null),
                              this.deactivateEvents.emit(n);
                    }
               }
               activateWith(n, o) {
                    if (this.isActivated) throw new y(4013, !1);
                    this._activatedRoute = n;
                    let i = this.location,
                         a = n.snapshot.component,
                         u = this.parentContexts.getOrCreateContext(this.name).children,
                         c = new _u(n, u, i.injector);
                    (this.activated = i.createComponent(a, {
                         index: i.length,
                         injector: c,
                         environmentInjector: o ?? this.environmentInjector,
                    })),
                         this.changeDetector.markForCheck(),
                         this.inputBinder?.bindActivatedRouteToOutletComponent(this),
                         this.activateEvents.emit(this.activated.instance);
               }
          };
          (e.ɵfac = function (o) {
               return new (o || e)();
          }),
               (e.ɵdir = Un({
                    type: e,
                    selectors: [['router-outlet']],
                    inputs: { name: 'name' },
                    outputs: {
                         activateEvents: 'activate',
                         deactivateEvents: 'deactivate',
                         attachEvents: 'attach',
                         detachEvents: 'detach',
                    },
                    exportAs: ['outlet'],
                    standalone: !0,
                    features: [Bn],
               }));
          let t = e;
          return t;
     })(),
     _u = class {
          constructor(e, r, n) {
               (this.route = e), (this.childContexts = r), (this.parent = n);
          }
          get(e, r) {
               return e === _t ? this.route : e === Ir ? this.childContexts : this.parent.get(e, r);
          }
     },
     bi = new E(''),
     nh = (() => {
          let e = class e {
               constructor() {
                    this.outletDataSubscriptions = new Map();
               }
               bindActivatedRouteToOutletComponent(n) {
                    this.unsubscribeFromRouteData(n), this.subscribeToRouteData(n);
               }
               unsubscribeFromRouteData(n) {
                    this.outletDataSubscriptions.get(n)?.unsubscribe(), this.outletDataSubscriptions.delete(n);
               }
               subscribeToRouteData(n) {
                    let { activatedRoute: o } = n,
                         i = xn([o.queryParams, o.params, o.data])
                              .pipe(
                                   X(
                                        ([s, a, u], c) => (
                                             (u = m(m(m({}, s), a), u)), c === 0 ? C(u) : Promise.resolve(u)
                                        )
                                   )
                              )
                              .subscribe((s) => {
                                   if (
                                        !n.isActivated ||
                                        !n.activatedComponentRef ||
                                        n.activatedRoute !== o ||
                                        o.component === null
                                   ) {
                                        this.unsubscribeFromRouteData(n);
                                        return;
                                   }
                                   let a = bf(o.component);
                                   if (!a) {
                                        this.unsubscribeFromRouteData(n);
                                        return;
                                   }
                                   for (let { templateName: u } of a.inputs) n.activatedComponentRef.setInput(u, s[u]);
                              });
                    this.outletDataSubscriptions.set(n, i);
               }
          };
          (e.ɵfac = function (o) {
               return new (o || e)();
          }),
               (e.ɵprov = w({ token: e, factory: e.ɵfac }));
          let t = e;
          return t;
     })();
function dC(t, e, r) {
     let n = yr(t, e._root, r ? r._root : void 0);
     return new Di(n, e);
}
function yr(t, e, r) {
     if (r && t.shouldReuseRoute(e.value, r.value.snapshot)) {
          let n = r.value;
          n._futureSnapshot = e.value;
          let o = fC(t, e, r);
          return new de(n, o);
     } else {
          if (t.shouldAttach(e.value)) {
               let i = t.retrieve(e.value);
               if (i !== null) {
                    let s = i.route;
                    return (s.value._futureSnapshot = e.value), (s.children = e.children.map((a) => yr(t, a))), s;
               }
          }
          let n = hC(e.value),
               o = e.children.map((i) => yr(t, i));
          return new de(n, o);
     }
}
function fC(t, e, r) {
     return e.children.map((n) => {
          for (let o of r.children) if (t.shouldReuseRoute(n.value, o.value.snapshot)) return yr(t, n, o);
          return yr(t, n);
     });
}
function hC(t) {
     return new _t(
          new J(t.url),
          new J(t.params),
          new J(t.queryParams),
          new J(t.fragment),
          new J(t.data),
          t.outlet,
          t.component,
          t
     );
}
var bh = 'ngNavigationCancelingError';
function Mh(t, e) {
     let { redirectTo: r, navigationBehaviorOptions: n } = wn(e)
               ? { redirectTo: e, navigationBehaviorOptions: void 0 }
               : e,
          o = Sh(!1, 0, e);
     return (o.url = r), (o.navigationBehaviorOptions = n), o;
}
function Sh(t, e, r) {
     let n = new Error('NavigationCancelingError: ' + (t || ''));
     return (n[bh] = !0), (n.cancellationCode = e), r && (n.url = r), n;
}
function pC(t) {
     return Th(t) && wn(t.url);
}
function Th(t) {
     return t && t[bh];
}
var gC = (() => {
     let e = class e {};
     (e.ɵfac = function (o) {
          return new (o || e)();
     }),
          (e.ɵcmp = bl({
               type: e,
               selectors: [['ng-component']],
               standalone: !0,
               features: [yf],
               decls: 1,
               vars: 0,
               template: function (o, i) {
                    o & 1 && ja(0, 'router-outlet');
               },
               dependencies: [lC],
               encapsulation: 2,
          }));
     let t = e;
     return t;
})();
function mC(t, e) {
     return t.providers && !t._injector && (t._injector = qo(t.providers, e, `Route: ${t.path}`)), t._injector ?? e;
}
function ju(t) {
     let e = t.children && t.children.map(ju),
          r = e ? H(m({}, t), { children: e }) : m({}, t);
     return (
          !r.component && !r.loadComponent && (e || r.loadChildren) && r.outlet && r.outlet !== T && (r.component = gC),
          r
     );
}
function je(t) {
     return t.outlet || T;
}
function vC(t, e) {
     let r = t.filter((n) => je(n) === e);
     return r.push(...t.filter((n) => je(n) !== e)), r;
}
function br(t) {
     if (!t) return null;
     if (t.routeConfig?._injector) return t.routeConfig._injector;
     for (let e = t.parent; e; e = e.parent) {
          let r = e.routeConfig;
          if (r?._loadedInjector) return r._loadedInjector;
          if (r?._injector) return r._injector;
     }
     return null;
}
var yC = (t, e, r, n) => R((o) => (new Au(e, o.targetRouterState, o.currentRouterState, r, n).activate(t), o)),
     Au = class {
          constructor(e, r, n, o, i) {
               (this.routeReuseStrategy = e),
                    (this.futureState = r),
                    (this.currState = n),
                    (this.forwardEvent = o),
                    (this.inputBindingEnabled = i);
          }
          activate(e) {
               let r = this.futureState._root,
                    n = this.currState ? this.currState._root : null;
               this.deactivateChildRoutes(r, n, e), uu(this.futureState.root), this.activateChildRoutes(r, n, e);
          }
          deactivateChildRoutes(e, r, n) {
               let o = mn(r);
               e.children.forEach((i) => {
                    let s = i.value.outlet;
                    this.deactivateRoutes(i, o[s], n), delete o[s];
               }),
                    Object.values(o).forEach((i) => {
                         this.deactivateRouteAndItsChildren(i, n);
                    });
          }
          deactivateRoutes(e, r, n) {
               let o = e.value,
                    i = r ? r.value : null;
               if (o === i)
                    if (o.component) {
                         let s = n.getContext(o.outlet);
                         s && this.deactivateChildRoutes(e, r, s.children);
                    } else this.deactivateChildRoutes(e, r, n);
               else i && this.deactivateRouteAndItsChildren(r, n);
          }
          deactivateRouteAndItsChildren(e, r) {
               e.value.component && this.routeReuseStrategy.shouldDetach(e.value.snapshot)
                    ? this.detachAndStoreRouteSubtree(e, r)
                    : this.deactivateRouteAndOutlet(e, r);
          }
          detachAndStoreRouteSubtree(e, r) {
               let n = r.getContext(e.value.outlet),
                    o = n && e.value.component ? n.children : r,
                    i = mn(e);
               for (let s of Object.keys(i)) this.deactivateRouteAndItsChildren(i[s], o);
               if (n && n.outlet) {
                    let s = n.outlet.detach(),
                         a = n.children.onOutletDeactivated();
                    this.routeReuseStrategy.store(e.value.snapshot, { componentRef: s, route: e, contexts: a });
               }
          }
          deactivateRouteAndOutlet(e, r) {
               let n = r.getContext(e.value.outlet),
                    o = n && e.value.component ? n.children : r,
                    i = mn(e);
               for (let s of Object.keys(i)) this.deactivateRouteAndItsChildren(i[s], o);
               n &&
                    (n.outlet && (n.outlet.deactivate(), n.children.onOutletDeactivated()),
                    (n.attachRef = null),
                    (n.route = null));
          }
          activateChildRoutes(e, r, n) {
               let o = mn(r);
               e.children.forEach((i) => {
                    this.activateRoutes(i, o[i.value.outlet], n), this.forwardEvent(new bu(i.value.snapshot));
               }),
                    e.children.length && this.forwardEvent(new Eu(e.value.snapshot));
          }
          activateRoutes(e, r, n) {
               let o = e.value,
                    i = r ? r.value : null;
               if ((uu(o), o === i))
                    if (o.component) {
                         let s = n.getOrCreateContext(o.outlet);
                         this.activateChildRoutes(e, r, s.children);
                    } else this.activateChildRoutes(e, r, n);
               else if (o.component) {
                    let s = n.getOrCreateContext(o.outlet);
                    if (this.routeReuseStrategy.shouldAttach(o.snapshot)) {
                         let a = this.routeReuseStrategy.retrieve(o.snapshot);
                         this.routeReuseStrategy.store(o.snapshot, null),
                              s.children.onOutletReAttached(a.contexts),
                              (s.attachRef = a.componentRef),
                              (s.route = a.route.value),
                              s.outlet && s.outlet.attach(a.componentRef, a.route.value),
                              uu(a.route.value),
                              this.activateChildRoutes(e, null, s.children);
                    } else {
                         let a = br(o.snapshot);
                         (s.attachRef = null),
                              (s.route = o),
                              (s.injector = a),
                              s.outlet && s.outlet.activateWith(o, s.injector),
                              this.activateChildRoutes(e, null, s.children);
                    }
               } else this.activateChildRoutes(e, null, n);
          }
     },
     Ci = class {
          constructor(e) {
               (this.path = e), (this.route = this.path[this.path.length - 1]);
          }
     },
     yn = class {
          constructor(e, r) {
               (this.component = e), (this.route = r);
          }
     };
function DC(t, e, r) {
     let n = t._root,
          o = e ? e._root : null;
     return ar(n, o, r, [n.value]);
}
function wC(t) {
     let e = t.routeConfig ? t.routeConfig.canActivateChild : null;
     return !e || e.length === 0 ? null : { node: t, guards: e };
}
function In(t, e) {
     let r = Symbol(),
          n = e.get(t, r);
     return n === r ? (typeof t == 'function' && !pl(t) ? t : e.get(t)) : n;
}
function ar(t, e, r, n, o = { canDeactivateChecks: [], canActivateChecks: [] }) {
     let i = mn(e);
     return (
          t.children.forEach((s) => {
               CC(s, i[s.value.outlet], r, n.concat([s.value]), o), delete i[s.value.outlet];
          }),
          Object.entries(i).forEach(([s, a]) => dr(a, r.getContext(s), o)),
          o
     );
}
function CC(t, e, r, n, o = { canDeactivateChecks: [], canActivateChecks: [] }) {
     let i = t.value,
          s = e ? e.value : null,
          a = r ? r.getContext(t.value.outlet) : null;
     if (s && i.routeConfig === s.routeConfig) {
          let u = EC(s, i, i.routeConfig.runGuardsAndResolvers);
          u ? o.canActivateChecks.push(new Ci(n)) : ((i.data = s.data), (i._resolvedData = s._resolvedData)),
               i.component ? ar(t, e, a ? a.children : null, n, o) : ar(t, e, r, n, o),
               u && a && a.outlet && a.outlet.isActivated && o.canDeactivateChecks.push(new yn(a.outlet.component, s));
     } else
          s && dr(e, a, o),
               o.canActivateChecks.push(new Ci(n)),
               i.component ? ar(t, null, a ? a.children : null, n, o) : ar(t, null, r, n, o);
     return o;
}
function EC(t, e, r) {
     if (typeof r == 'function') return r(t, e);
     switch (r) {
          case 'pathParamsChange':
               return !xt(t.url, e.url);
          case 'pathParamsOrQueryParamsChange':
               return !xt(t.url, e.url) || !Le(t.queryParams, e.queryParams);
          case 'always':
               return !0;
          case 'paramsOrQueryParamsChange':
               return !xu(t, e) || !Le(t.queryParams, e.queryParams);
          case 'paramsChange':
          default:
               return !xu(t, e);
     }
}
function dr(t, e, r) {
     let n = mn(t),
          o = t.value;
     Object.entries(n).forEach(([i, s]) => {
          o.component ? (e ? dr(s, e.children.getContext(i), r) : dr(s, null, r)) : dr(s, e, r);
     }),
          o.component
               ? e && e.outlet && e.outlet.isActivated
                    ? r.canDeactivateChecks.push(new yn(e.outlet.component, o))
                    : r.canDeactivateChecks.push(new yn(null, o))
               : r.canDeactivateChecks.push(new yn(null, o));
}
function Mr(t) {
     return typeof t == 'function';
}
function IC(t) {
     return typeof t == 'boolean';
}
function bC(t) {
     return t && Mr(t.canLoad);
}
function MC(t) {
     return t && Mr(t.canActivate);
}
function SC(t) {
     return t && Mr(t.canActivateChild);
}
function TC(t) {
     return t && Mr(t.canDeactivate);
}
function xC(t) {
     return t && Mr(t.canMatch);
}
function xh(t) {
     return t instanceof $e || t?.name === 'EmptyError';
}
var li = Symbol('INITIAL_VALUE');
function En() {
     return X((t) =>
          xn(t.map((e) => e.pipe(Be(1), qi(li)))).pipe(
               R((e) => {
                    for (let r of e)
                         if (r !== !0) {
                              if (r === li) return li;
                              if (r === !1 || r instanceof ut) return r;
                         }
                    return !0;
               }),
               ue((e) => e !== li),
               Be(1)
          )
     );
}
function _C(t, e) {
     return z((r) => {
          let {
               targetSnapshot: n,
               currentSnapshot: o,
               guards: { canActivateChecks: i, canDeactivateChecks: s },
          } = r;
          return s.length === 0 && i.length === 0
               ? C(H(m({}, r), { guardsResult: !0 }))
               : AC(s, n, o, t).pipe(
                      z((a) => (a && IC(a) ? NC(n, i, t, e) : C(a))),
                      R((a) => H(m({}, r), { guardsResult: a }))
                 );
     });
}
function AC(t, e, r, n) {
     return j(t).pipe(
          z((o) => kC(o.component, o.route, r, e, n)),
          Te((o) => o !== !0, !0)
     );
}
function NC(t, e, r, n) {
     return j(e).pipe(
          Ue((o) => jt(OC(o.route.parent, n), RC(o.route, n), FC(t, o.path, r), PC(t, o.route, r))),
          Te((o) => o !== !0, !0)
     );
}
function RC(t, e) {
     return t !== null && e && e(new Iu(t)), C(!0);
}
function OC(t, e) {
     return t !== null && e && e(new Cu(t)), C(!0);
}
function PC(t, e, r) {
     let n = e.routeConfig ? e.routeConfig.canActivate : null;
     if (!n || n.length === 0) return C(!0);
     let o = n.map((i) =>
          Jr(() => {
               let s = br(e) ?? r,
                    a = In(i, s),
                    u = MC(a) ? a.canActivate(e, t) : s.runInContext(() => a(e, t));
               return ft(u).pipe(Te());
          })
     );
     return C(o).pipe(En());
}
function FC(t, e, r) {
     let n = e[e.length - 1],
          i = e
               .slice(0, e.length - 1)
               .reverse()
               .map((s) => wC(s))
               .filter((s) => s !== null)
               .map((s) =>
                    Jr(() => {
                         let a = s.guards.map((u) => {
                              let c = br(s.node) ?? r,
                                   l = In(u, c),
                                   d = SC(l) ? l.canActivateChild(n, t) : c.runInContext(() => l(n, t));
                              return ft(d).pipe(Te());
                         });
                         return C(a).pipe(En());
                    })
               );
     return C(i).pipe(En());
}
function kC(t, e, r, n, o) {
     let i = e && e.routeConfig ? e.routeConfig.canDeactivate : null;
     if (!i || i.length === 0) return C(!0);
     let s = i.map((a) => {
          let u = br(e) ?? o,
               c = In(a, u),
               l = TC(c) ? c.canDeactivate(t, e, r, n) : u.runInContext(() => c(t, e, r, n));
          return ft(l).pipe(Te());
     });
     return C(s).pipe(En());
}
function LC(t, e, r, n) {
     let o = e.canLoad;
     if (o === void 0 || o.length === 0) return C(!0);
     let i = o.map((s) => {
          let a = In(s, t),
               u = bC(a) ? a.canLoad(e, r) : t.runInContext(() => a(e, r));
          return ft(u);
     });
     return C(i).pipe(En(), _h(n));
}
function _h(t) {
     return Fi(
          W((e) => {
               if (wn(e)) throw Mh(t, e);
          }),
          R((e) => e === !0)
     );
}
function jC(t, e, r, n) {
     let o = e.canMatch;
     if (!o || o.length === 0) return C(!0);
     let i = o.map((s) => {
          let a = In(s, t),
               u = xC(a) ? a.canMatch(e, r) : t.runInContext(() => a(e, r));
          return ft(u);
     });
     return C(i).pipe(En(), _h(n));
}
var Dr = class {
          constructor(e) {
               this.segmentGroup = e || null;
          }
     },
     Ei = class extends Error {
          constructor(e) {
               super(), (this.urlTree = e);
          }
     };
function gn(t) {
     return Lt(new Dr(t));
}
function VC(t) {
     return Lt(new y(4e3, !1));
}
function $C(t) {
     return Lt(Sh(!1, 3));
}
var Nu = class {
          constructor(e, r) {
               (this.urlSerializer = e), (this.urlTree = r);
          }
          noMatchError(e) {
               return new y(4002, !1);
          }
          lineralizeSegments(e, r) {
               let n = [],
                    o = r.root;
               for (;;) {
                    if (((n = n.concat(o.segments)), o.numberOfChildren === 0)) return C(n);
                    if (o.numberOfChildren > 1 || !o.children[T]) return VC(e.redirectTo);
                    o = o.children[T];
               }
          }
          applyRedirectCommands(e, r, n) {
               let o = this.applyRedirectCreateUrlTree(r, this.urlSerializer.parse(r), e, n);
               if (r.startsWith('/')) throw new Ei(o);
               return o;
          }
          applyRedirectCreateUrlTree(e, r, n, o) {
               let i = this.createSegmentGroup(e, r.root, n, o);
               return new ut(i, this.createQueryParams(r.queryParams, this.urlTree.queryParams), r.fragment);
          }
          createQueryParams(e, r) {
               let n = {};
               return (
                    Object.entries(e).forEach(([o, i]) => {
                         if (typeof i == 'string' && i.startsWith(':')) {
                              let a = i.substring(1);
                              n[o] = r[a];
                         } else n[o] = i;
                    }),
                    n
               );
          }
          createSegmentGroup(e, r, n, o) {
               let i = this.createSegments(e, r.segments, n, o),
                    s = {};
               return (
                    Object.entries(r.children).forEach(([a, u]) => {
                         s[a] = this.createSegmentGroup(e, u, n, o);
                    }),
                    new F(i, s)
               );
          }
          createSegments(e, r, n, o) {
               return r.map((i) => (i.path.startsWith(':') ? this.findPosParam(e, i, o) : this.findOrReturn(i, n)));
          }
          findPosParam(e, r, n) {
               let o = n[r.path.substring(1)];
               if (!o) throw new y(4001, !1);
               return o;
          }
          findOrReturn(e, r) {
               let n = 0;
               for (let o of r) {
                    if (o.path === e.path) return r.splice(n), o;
                    n++;
               }
               return e;
          }
     },
     Ru = { matched: !1, consumedSegments: [], remainingSegments: [], parameters: {}, positionalParamSegments: {} };
function UC(t, e, r, n, o) {
     let i = Vu(t, e, r);
     return i.matched ? ((n = mC(e, n)), jC(n, e, r, o).pipe(R((s) => (s === !0 ? i : m({}, Ru))))) : C(i);
}
function Vu(t, e, r) {
     if (e.path === '')
          return e.pathMatch === 'full' && (t.hasChildren() || r.length > 0)
               ? m({}, Ru)
               : {
                      matched: !0,
                      consumedSegments: [],
                      remainingSegments: r,
                      parameters: {},
                      positionalParamSegments: {},
                 };
     let o = (e.matcher || Lw)(r, t, e);
     if (!o) return m({}, Ru);
     let i = {};
     Object.entries(o.posParams ?? {}).forEach(([a, u]) => {
          i[a] = u.path;
     });
     let s = o.consumed.length > 0 ? m(m({}, i), o.consumed[o.consumed.length - 1].parameters) : i;
     return {
          matched: !0,
          consumedSegments: o.consumed,
          remainingSegments: r.slice(o.consumed.length),
          parameters: s,
          positionalParamSegments: o.posParams ?? {},
     };
}
function rh(t, e, r, n) {
     return r.length > 0 && zC(t, r, n)
          ? { segmentGroup: new F(e, HC(n, new F(r, t.children))), slicedSegments: [] }
          : r.length === 0 && WC(t, r, n)
          ? { segmentGroup: new F(t.segments, BC(t, e, r, n, t.children)), slicedSegments: r }
          : { segmentGroup: new F(t.segments, t.children), slicedSegments: r };
}
function BC(t, e, r, n, o) {
     let i = {};
     for (let s of n)
          if (Mi(t, r, s) && !o[je(s)]) {
               let a = new F([], {});
               i[je(s)] = a;
          }
     return m(m({}, o), i);
}
function HC(t, e) {
     let r = {};
     r[T] = e;
     for (let n of t)
          if (n.path === '' && je(n) !== T) {
               let o = new F([], {});
               r[je(n)] = o;
          }
     return r;
}
function zC(t, e, r) {
     return r.some((n) => Mi(t, e, n) && je(n) !== T);
}
function WC(t, e, r) {
     return r.some((n) => Mi(t, e, n));
}
function Mi(t, e, r) {
     return (t.hasChildren() || e.length > 0) && r.pathMatch === 'full' ? !1 : r.path === '';
}
function GC(t, e, r, n) {
     return je(t) !== n && (n === T || !Mi(e, r, t)) ? !1 : t.path === '**' ? !0 : Vu(e, t, r).matched;
}
function qC(t, e, r) {
     return e.length === 0 && !t.children[r];
}
var Ou = class {};
function ZC(t, e, r, n, o, i, s = 'emptyOnly') {
     return new Pu(t, e, r, n, o, s, i).recognize();
}
var YC = 31,
     Pu = class {
          constructor(e, r, n, o, i, s, a) {
               (this.injector = e),
                    (this.configLoader = r),
                    (this.rootComponentType = n),
                    (this.config = o),
                    (this.urlTree = i),
                    (this.paramsInheritanceStrategy = s),
                    (this.urlSerializer = a),
                    (this.applyRedirects = new Nu(this.urlSerializer, this.urlTree)),
                    (this.absoluteRedirectCount = 0),
                    (this.allowRedirects = !0);
          }
          noMatchError(e) {
               return new y(4002, !1);
          }
          recognize() {
               let e = rh(this.urlTree.root, [], [], this.config).segmentGroup;
               return this.match(e).pipe(
                    R((r) => {
                         let n = new vr(
                                   [],
                                   Object.freeze({}),
                                   Object.freeze(m({}, this.urlTree.queryParams)),
                                   this.urlTree.fragment,
                                   {},
                                   T,
                                   this.rootComponentType,
                                   null,
                                   {}
                              ),
                              o = new de(n, r),
                              i = new wi('', o),
                              s = nC(n, [], this.urlTree.queryParams, this.urlTree.fragment);
                         return (
                              (s.queryParams = this.urlTree.queryParams),
                              (i.url = this.urlSerializer.serialize(s)),
                              this.inheritParamsAndData(i._root, null),
                              { state: i, tree: s }
                         );
                    })
               );
          }
          match(e) {
               return this.processSegmentGroup(this.injector, this.config, e, T).pipe(
                    Qe((n) => {
                         if (n instanceof Ei) return (this.urlTree = n.urlTree), this.match(n.urlTree.root);
                         throw n instanceof Dr ? this.noMatchError(n) : n;
                    })
               );
          }
          inheritParamsAndData(e, r) {
               let n = e.value,
                    o = ku(n, r, this.paramsInheritanceStrategy);
               (n.params = Object.freeze(o.params)),
                    (n.data = Object.freeze(o.data)),
                    e.children.forEach((i) => this.inheritParamsAndData(i, n));
          }
          processSegmentGroup(e, r, n, o) {
               return n.segments.length === 0 && n.hasChildren()
                    ? this.processChildren(e, r, n)
                    : this.processSegment(e, r, n, n.segments, o, !0).pipe(R((i) => (i instanceof de ? [i] : [])));
          }
          processChildren(e, r, n) {
               let o = [];
               for (let i of Object.keys(n.children)) i === 'primary' ? o.unshift(i) : o.push(i);
               return j(o).pipe(
                    Ue((i) => {
                         let s = n.children[i],
                              a = vC(r, i);
                         return this.processSegmentGroup(e, a, s, i);
                    }),
                    Wi((i, s) => (i.push(...s), i)),
                    Ke(null),
                    zi(),
                    z((i) => {
                         if (i === null) return gn(n);
                         let s = Ah(i);
                         return QC(s), C(s);
                    })
               );
          }
          processSegment(e, r, n, o, i, s) {
               return j(r).pipe(
                    Ue((a) =>
                         this.processSegmentAgainstRoute(a._injector ?? e, r, a, n, o, i, s).pipe(
                              Qe((u) => {
                                   if (u instanceof Dr) return C(null);
                                   throw u;
                              })
                         )
                    ),
                    Te((a) => !!a),
                    Qe((a) => {
                         if (xh(a)) return qC(n, o, i) ? C(new Ou()) : gn(n);
                         throw a;
                    })
               );
          }
          processSegmentAgainstRoute(e, r, n, o, i, s, a) {
               return GC(n, o, i, s)
                    ? n.redirectTo === void 0
                         ? this.matchSegmentAgainstRoute(e, o, n, i, s)
                         : this.allowRedirects && a
                         ? this.expandSegmentAgainstRouteUsingRedirect(e, o, r, n, i, s)
                         : gn(o)
                    : gn(o);
          }
          expandSegmentAgainstRouteUsingRedirect(e, r, n, o, i, s) {
               let {
                    matched: a,
                    consumedSegments: u,
                    positionalParamSegments: c,
                    remainingSegments: l,
               } = o.path === '**' ? oh(i) : Vu(r, o, i);
               if (!a) return gn(r);
               o.redirectTo.startsWith('/') &&
                    (this.absoluteRedirectCount++, this.absoluteRedirectCount > YC && (this.allowRedirects = !1));
               let d = this.applyRedirects.applyRedirectCommands(u, o.redirectTo, c);
               return this.applyRedirects
                    .lineralizeSegments(o, d)
                    .pipe(z((f) => this.processSegment(e, n, r, f.concat(l), s, !1)));
          }
          matchSegmentAgainstRoute(e, r, n, o, i) {
               let s;
               return (
                    n.path === '**' ? ((s = C(oh(o))), (r.children = {})) : (s = UC(r, n, o, e, this.urlSerializer)),
                    s.pipe(
                         X((a) =>
                              a.matched
                                   ? ((e = n._injector ?? e),
                                     this.getChildConfig(e, n, o).pipe(
                                          X(({ routes: u }) => {
                                               let c = n._loadedInjector ?? e,
                                                    { consumedSegments: l, remainingSegments: d, parameters: f } = a,
                                                    h = new vr(
                                                         l,
                                                         f,
                                                         Object.freeze(m({}, this.urlTree.queryParams)),
                                                         this.urlTree.fragment,
                                                         JC(n),
                                                         je(n),
                                                         n.component ?? n._loadedComponent ?? null,
                                                         n,
                                                         XC(n)
                                                    ),
                                                    { segmentGroup: g, slicedSegments: S } = rh(r, l, d, u);
                                               if (S.length === 0 && g.hasChildren())
                                                    return this.processChildren(c, u, g).pipe(
                                                         R((v) => (v === null ? null : new de(h, v)))
                                                    );
                                               if (u.length === 0 && S.length === 0) return C(new de(h, []));
                                               let I = je(n) === i;
                                               return this.processSegment(c, u, g, S, I ? T : i, !0).pipe(
                                                    R((v) => new de(h, v instanceof de ? [v] : []))
                                               );
                                          })
                                     ))
                                   : gn(r)
                         )
                    )
               );
          }
          getChildConfig(e, r, n) {
               return r.children
                    ? C({ routes: r.children, injector: e })
                    : r.loadChildren
                    ? r._loadedRoutes !== void 0
                         ? C({ routes: r._loadedRoutes, injector: r._loadedInjector })
                         : LC(e, r, n, this.urlSerializer).pipe(
                                z((o) =>
                                     o
                                          ? this.configLoader.loadChildren(e, r).pipe(
                                                 W((i) => {
                                                      (r._loadedRoutes = i.routes), (r._loadedInjector = i.injector);
                                                 })
                                            )
                                          : $C(r)
                                )
                           )
                    : C({ routes: [], injector: e });
          }
     };
function QC(t) {
     t.sort((e, r) =>
          e.value.outlet === T ? -1 : r.value.outlet === T ? 1 : e.value.outlet.localeCompare(r.value.outlet)
     );
}
function KC(t) {
     let e = t.value.routeConfig;
     return e && e.path === '';
}
function Ah(t) {
     let e = [],
          r = new Set();
     for (let n of t) {
          if (!KC(n)) {
               e.push(n);
               continue;
          }
          let o = e.find((i) => n.value.routeConfig === i.value.routeConfig);
          o !== void 0 ? (o.children.push(...n.children), r.add(o)) : e.push(n);
     }
     for (let n of r) {
          let o = Ah(n.children);
          e.push(new de(n.value, o));
     }
     return e.filter((n) => !r.has(n));
}
function JC(t) {
     return t.data || {};
}
function XC(t) {
     return t.resolve || {};
}
function oh(t) {
     return {
          matched: !0,
          parameters: t.length > 0 ? uh(t).parameters : {},
          consumedSegments: t,
          remainingSegments: [],
          positionalParamSegments: {},
     };
}
function eE(t, e, r, n, o, i) {
     return z((s) =>
          ZC(t, e, r, n, s.extractedUrl, o, i).pipe(
               R(({ state: a, tree: u }) => H(m({}, s), { targetSnapshot: a, urlAfterRedirects: u }))
          )
     );
}
function tE(t, e) {
     return z((r) => {
          let {
               targetSnapshot: n,
               guards: { canActivateChecks: o },
          } = r;
          if (!o.length) return C(r);
          let i = o.map((c) => c.route),
               s = new Set(i),
               a = Nh(i[0].parent).slice(1),
               u = 0;
          return j(a).pipe(
               Ue((c) => (s.has(c) ? nE(c, n, t, e) : ((c.data = ku(c, c.parent, t).resolve), C(void 0)))),
               W(() => u++),
               Vt(1),
               z((c) => (u === a.length ? C(r) : se))
          );
     });
}
function Nh(t) {
     let e = t.children.map((r) => Nh(r)).flat();
     return [t, ...e];
}
function nE(t, e, r, n) {
     let o = t.routeConfig,
          i = t._resolve;
     return (
          o?.title !== void 0 && !Ih(o) && (i[Cr] = o.title),
          rE(i, t, e, n).pipe(R((s) => ((t._resolvedData = s), (t.data = ku(t, t.parent, r).resolve), null)))
     );
}
function rE(t, e, r, n) {
     let o = du(t);
     if (o.length === 0) return C({});
     let i = {};
     return j(o).pipe(
          z((s) =>
               oE(t[s], e, r, n).pipe(
                    Te(),
                    W((a) => {
                         i[s] = a;
                    })
               )
          ),
          Vt(1),
          Bi(i),
          Qe((s) => (xh(s) ? se : Lt(s)))
     );
}
function oE(t, e, r, n) {
     let o = br(e) ?? n,
          i = In(t, o),
          s = i.resolve ? i.resolve(e, r) : o.runInContext(() => i(e, r));
     return ft(s);
}
function cu(t) {
     return X((e) => {
          let r = t(e);
          return r ? j(r).pipe(R(() => e)) : C(e);
     });
}
var Rh = (() => {
          let e = class e {
               buildTitle(n) {
                    let o,
                         i = n.root;
                    for (; i !== void 0; )
                         (o = this.getResolvedTitleForRoute(i) ?? o), (i = i.children.find((s) => s.outlet === T));
                    return o;
               }
               getResolvedTitleForRoute(n) {
                    return n.data[Cr];
               }
          };
          (e.ɵfac = function (o) {
               return new (o || e)();
          }),
               (e.ɵprov = w({ token: e, factory: () => (() => p(iE))(), providedIn: 'root' }));
          let t = e;
          return t;
     })(),
     iE = (() => {
          let e = class e extends Rh {
               constructor(n) {
                    super(), (this.title = n);
               }
               updateTitle(n) {
                    let o = this.buildTitle(n);
                    o !== void 0 && this.title.setTitle(o);
               }
          };
          (e.ɵfac = function (o) {
               return new (o || e)(D(iu));
          }),
               (e.ɵprov = w({ token: e, factory: e.ɵfac, providedIn: 'root' }));
          let t = e;
          return t;
     })(),
     Sr = new E('', { providedIn: 'root', factory: () => ({}) }),
     wr = new E('ROUTES'),
     $u = (() => {
          let e = class e {
               constructor() {
                    (this.componentLoaders = new WeakMap()),
                         (this.childrenLoaders = new WeakMap()),
                         (this.compiler = p(Qo));
               }
               loadComponent(n) {
                    if (this.componentLoaders.get(n)) return this.componentLoaders.get(n);
                    if (n._loadedComponent) return C(n._loadedComponent);
                    this.onLoadStartListener && this.onLoadStartListener(n);
                    let o = ft(n.loadComponent()).pipe(
                              R(Oh),
                              W((s) => {
                                   this.onLoadEndListener && this.onLoadEndListener(n), (n._loadedComponent = s);
                              }),
                              Je(() => {
                                   this.componentLoaders.delete(n);
                              })
                         ),
                         i = new kt(o, () => new ne()).pipe(Ft());
                    return this.componentLoaders.set(n, i), i;
               }
               loadChildren(n, o) {
                    if (this.childrenLoaders.get(o)) return this.childrenLoaders.get(o);
                    if (o._loadedRoutes) return C({ routes: o._loadedRoutes, injector: o._loadedInjector });
                    this.onLoadStartListener && this.onLoadStartListener(o);
                    let s = sE(o, this.compiler, n, this.onLoadEndListener).pipe(
                              Je(() => {
                                   this.childrenLoaders.delete(o);
                              })
                         ),
                         a = new kt(s, () => new ne()).pipe(Ft());
                    return this.childrenLoaders.set(o, a), a;
               }
          };
          (e.ɵfac = function (o) {
               return new (o || e)();
          }),
               (e.ɵprov = w({ token: e, factory: e.ɵfac, providedIn: 'root' }));
          let t = e;
          return t;
     })();
function sE(t, e, r, n) {
     return ft(t.loadChildren()).pipe(
          R(Oh),
          z((o) => (o instanceof Vn || Array.isArray(o) ? C(o) : j(e.compileModuleAsync(o)))),
          R((o) => {
               n && n(t);
               let i,
                    s,
                    a = !1;
               return (
                    Array.isArray(o)
                         ? ((s = o), (a = !0))
                         : ((i = o.create(r).injector), (s = i.get(wr, [], { optional: !0, self: !0 }).flat())),
                    { routes: s.map(ju), injector: i }
               );
          })
     );
}
function aE(t) {
     return t && typeof t == 'object' && 'default' in t;
}
function Oh(t) {
     return aE(t) ? t.default : t;
}
var Uu = (() => {
          let e = class e {};
          (e.ɵfac = function (o) {
               return new (o || e)();
          }),
               (e.ɵprov = w({ token: e, factory: () => (() => p(uE))(), providedIn: 'root' }));
          let t = e;
          return t;
     })(),
     uE = (() => {
          let e = class e {
               shouldProcessUrl(n) {
                    return !0;
               }
               extract(n) {
                    return n;
               }
               merge(n, o) {
                    return n;
               }
          };
          (e.ɵfac = function (o) {
               return new (o || e)();
          }),
               (e.ɵprov = w({ token: e, factory: e.ɵfac, providedIn: 'root' }));
          let t = e;
          return t;
     })(),
     Ph = new E(''),
     Fh = new E('');
function cE(t, e, r) {
     let n = t.get(Fh),
          o = t.get(Q);
     return t.get(V).runOutsideAngular(() => {
          if (!o.startViewTransition || n.skipNextTransition) return (n.skipNextTransition = !1), Promise.resolve();
          let i,
               s = new Promise((c) => {
                    i = c;
               }),
               a = o.startViewTransition(() => (i(), lE(t))),
               { onViewTransitionCreated: u } = n;
          return u && md(t, () => u({ transition: a, from: e, to: r })), s;
     });
}
function lE(t) {
     return new Promise((e) => {
          Pa(e, { injector: t });
     });
}
var Bu = (() => {
     let e = class e {
          get hasRequestedNavigation() {
               return this.navigationId !== 0;
          }
          constructor() {
               (this.currentNavigation = null),
                    (this.currentTransition = null),
                    (this.lastSuccessfulNavigation = null),
                    (this.events = new ne()),
                    (this.transitionAbortSubject = new ne()),
                    (this.configLoader = p($u)),
                    (this.environmentInjector = p(ie)),
                    (this.urlSerializer = p(Er)),
                    (this.rootContexts = p(Ir)),
                    (this.location = p(hn)),
                    (this.inputBindingEnabled = p(bi, { optional: !0 }) !== null),
                    (this.titleStrategy = p(Rh)),
                    (this.options = p(Sr, { optional: !0 }) || {}),
                    (this.paramsInheritanceStrategy = this.options.paramsInheritanceStrategy || 'emptyOnly'),
                    (this.urlHandlingStrategy = p(Uu)),
                    (this.createViewTransition = p(Ph, { optional: !0 })),
                    (this.navigationId = 0),
                    (this.afterPreactivation = () => C(void 0)),
                    (this.rootComponentType = null);
               let n = (i) => this.events.next(new Du(i)),
                    o = (i) => this.events.next(new wu(i));
               (this.configLoader.onLoadEndListener = o), (this.configLoader.onLoadStartListener = n);
          }
          complete() {
               this.transitions?.complete();
          }
          handleNavigationRequest(n) {
               let o = ++this.navigationId;
               this.transitions?.next(H(m(m({}, this.transitions.value), n), { id: o }));
          }
          setupNavigations(n, o, i) {
               return (
                    (this.transitions = new J({
                         id: 0,
                         currentUrlTree: o,
                         currentRawUrl: o,
                         extractedUrl: this.urlHandlingStrategy.extract(o),
                         urlAfterRedirects: this.urlHandlingStrategy.extract(o),
                         rawUrl: o,
                         extras: {},
                         resolve: null,
                         reject: null,
                         promise: Promise.resolve(!0),
                         source: lr,
                         restoredState: null,
                         currentSnapshot: i.snapshot,
                         targetSnapshot: null,
                         currentRouterState: i,
                         targetRouterState: null,
                         guards: { canActivateChecks: [], canDeactivateChecks: [] },
                         guardsResult: null,
                    })),
                    this.transitions.pipe(
                         ue((s) => s.id !== 0),
                         R((s) => H(m({}, s), { extractedUrl: this.urlHandlingStrategy.extract(s.rawUrl) })),
                         X((s) => {
                              this.currentTransition = s;
                              let a = !1,
                                   u = !1;
                              return C(s).pipe(
                                   W((c) => {
                                        this.currentNavigation = {
                                             id: c.id,
                                             initialUrl: c.rawUrl,
                                             extractedUrl: c.extractedUrl,
                                             trigger: c.source,
                                             extras: c.extras,
                                             previousNavigation: this.lastSuccessfulNavigation
                                                  ? H(m({}, this.lastSuccessfulNavigation), {
                                                         previousNavigation: null,
                                                    })
                                                  : null,
                                        };
                                   }),
                                   X((c) => {
                                        let l =
                                                  !n.navigated ||
                                                  this.isUpdatingInternalState() ||
                                                  this.isUpdatedBrowserUrl(),
                                             d = c.extras.onSameUrlNavigation ?? n.onSameUrlNavigation;
                                        if (!l && d !== 'reload') {
                                             let f = '';
                                             return (
                                                  this.events.next(
                                                       new lt(c.id, this.urlSerializer.serialize(c.rawUrl), f, 0)
                                                  ),
                                                  c.resolve(null),
                                                  se
                                             );
                                        }
                                        if (this.urlHandlingStrategy.shouldProcessUrl(c.rawUrl))
                                             return C(c).pipe(
                                                  X((f) => {
                                                       let h = this.transitions?.getValue();
                                                       return (
                                                            this.events.next(
                                                                 new Cn(
                                                                      f.id,
                                                                      this.urlSerializer.serialize(f.extractedUrl),
                                                                      f.source,
                                                                      f.restoredState
                                                                 )
                                                            ),
                                                            h !== this.transitions?.getValue() ? se : Promise.resolve(f)
                                                       );
                                                  }),
                                                  eE(
                                                       this.environmentInjector,
                                                       this.configLoader,
                                                       this.rootComponentType,
                                                       n.config,
                                                       this.urlSerializer,
                                                       this.paramsInheritanceStrategy
                                                  ),
                                                  W((f) => {
                                                       (s.targetSnapshot = f.targetSnapshot),
                                                            (s.urlAfterRedirects = f.urlAfterRedirects),
                                                            (this.currentNavigation = H(m({}, this.currentNavigation), {
                                                                 finalUrl: f.urlAfterRedirects,
                                                            }));
                                                       let h = new mi(
                                                            f.id,
                                                            this.urlSerializer.serialize(f.extractedUrl),
                                                            this.urlSerializer.serialize(f.urlAfterRedirects),
                                                            f.targetSnapshot
                                                       );
                                                       this.events.next(h);
                                                  })
                                             );
                                        if (l && this.urlHandlingStrategy.shouldProcessUrl(c.currentRawUrl)) {
                                             let { id: f, extractedUrl: h, source: g, restoredState: S, extras: I } = c,
                                                  v = new Cn(f, this.urlSerializer.serialize(h), g, S);
                                             this.events.next(v);
                                             let B = Ch(h, this.rootComponentType).snapshot;
                                             return (
                                                  (this.currentTransition = s =
                                                       H(m({}, c), {
                                                            targetSnapshot: B,
                                                            urlAfterRedirects: h,
                                                            extras: H(m({}, I), {
                                                                 skipLocationChange: !1,
                                                                 replaceUrl: !1,
                                                            }),
                                                       })),
                                                  (this.currentNavigation.finalUrl = h),
                                                  C(s)
                                             );
                                        } else {
                                             let f = '';
                                             return (
                                                  this.events.next(
                                                       new lt(c.id, this.urlSerializer.serialize(c.extractedUrl), f, 1)
                                                  ),
                                                  c.resolve(null),
                                                  se
                                             );
                                        }
                                   }),
                                   W((c) => {
                                        let l = new gu(
                                             c.id,
                                             this.urlSerializer.serialize(c.extractedUrl),
                                             this.urlSerializer.serialize(c.urlAfterRedirects),
                                             c.targetSnapshot
                                        );
                                        this.events.next(l);
                                   }),
                                   R(
                                        (c) => (
                                             (this.currentTransition = s =
                                                  H(m({}, c), {
                                                       guards: DC(
                                                            c.targetSnapshot,
                                                            c.currentSnapshot,
                                                            this.rootContexts
                                                       ),
                                                  })),
                                             s
                                        )
                                   ),
                                   _C(this.environmentInjector, (c) => this.events.next(c)),
                                   W((c) => {
                                        if (((s.guardsResult = c.guardsResult), wn(c.guardsResult)))
                                             throw Mh(this.urlSerializer, c.guardsResult);
                                        let l = new mu(
                                             c.id,
                                             this.urlSerializer.serialize(c.extractedUrl),
                                             this.urlSerializer.serialize(c.urlAfterRedirects),
                                             c.targetSnapshot,
                                             !!c.guardsResult
                                        );
                                        this.events.next(l);
                                   }),
                                   ue((c) => (c.guardsResult ? !0 : (this.cancelNavigationTransition(c, '', 3), !1))),
                                   cu((c) => {
                                        if (c.guards.canActivateChecks.length)
                                             return C(c).pipe(
                                                  W((l) => {
                                                       let d = new vu(
                                                            l.id,
                                                            this.urlSerializer.serialize(l.extractedUrl),
                                                            this.urlSerializer.serialize(l.urlAfterRedirects),
                                                            l.targetSnapshot
                                                       );
                                                       this.events.next(d);
                                                  }),
                                                  X((l) => {
                                                       let d = !1;
                                                       return C(l).pipe(
                                                            tE(
                                                                 this.paramsInheritanceStrategy,
                                                                 this.environmentInjector
                                                            ),
                                                            W({
                                                                 next: () => (d = !0),
                                                                 complete: () => {
                                                                      d || this.cancelNavigationTransition(l, '', 2);
                                                                 },
                                                            })
                                                       );
                                                  }),
                                                  W((l) => {
                                                       let d = new yu(
                                                            l.id,
                                                            this.urlSerializer.serialize(l.extractedUrl),
                                                            this.urlSerializer.serialize(l.urlAfterRedirects),
                                                            l.targetSnapshot
                                                       );
                                                       this.events.next(d);
                                                  })
                                             );
                                   }),
                                   cu((c) => {
                                        let l = (d) => {
                                             let f = [];
                                             d.routeConfig?.loadComponent &&
                                                  !d.routeConfig._loadedComponent &&
                                                  f.push(
                                                       this.configLoader.loadComponent(d.routeConfig).pipe(
                                                            W((h) => {
                                                                 d.component = h;
                                                            }),
                                                            R(() => {})
                                                       )
                                                  );
                                             for (let h of d.children) f.push(...l(h));
                                             return f;
                                        };
                                        return xn(l(c.targetSnapshot.root)).pipe(Ke(), Be(1));
                                   }),
                                   cu(() => this.afterPreactivation()),
                                   X(() => {
                                        let { currentSnapshot: c, targetSnapshot: l } = s,
                                             d = this.createViewTransition?.(this.environmentInjector, c.root, l.root);
                                        return d ? j(d).pipe(R(() => s)) : C(s);
                                   }),
                                   R((c) => {
                                        let l = dC(n.routeReuseStrategy, c.targetSnapshot, c.currentRouterState);
                                        return (
                                             (this.currentTransition = s = H(m({}, c), { targetRouterState: l })),
                                             (this.currentNavigation.targetRouterState = l),
                                             s
                                        );
                                   }),
                                   W(() => {
                                        this.events.next(new gr());
                                   }),
                                   yC(
                                        this.rootContexts,
                                        n.routeReuseStrategy,
                                        (c) => this.events.next(c),
                                        this.inputBindingEnabled
                                   ),
                                   Be(1),
                                   W({
                                        next: (c) => {
                                             (a = !0),
                                                  (this.lastSuccessfulNavigation = this.currentNavigation),
                                                  this.events.next(
                                                       new qe(
                                                            c.id,
                                                            this.urlSerializer.serialize(c.extractedUrl),
                                                            this.urlSerializer.serialize(c.urlAfterRedirects)
                                                       )
                                                  ),
                                                  this.titleStrategy?.updateTitle(c.targetRouterState.snapshot),
                                                  c.resolve(!0);
                                        },
                                        complete: () => {
                                             a = !0;
                                        },
                                   }),
                                   to(
                                        this.transitionAbortSubject.pipe(
                                             W((c) => {
                                                  throw c;
                                             })
                                        )
                                   ),
                                   Je(() => {
                                        if (!a && !u) {
                                             let c = '';
                                             this.cancelNavigationTransition(s, c, 1);
                                        }
                                        this.currentNavigation?.id === s.id && (this.currentNavigation = null);
                                   }),
                                   Qe((c) => {
                                        if (((u = !0), Th(c)))
                                             this.events.next(
                                                  new ct(
                                                       s.id,
                                                       this.urlSerializer.serialize(s.extractedUrl),
                                                       c.message,
                                                       c.cancellationCode
                                                  )
                                             ),
                                                  pC(c) ? this.events.next(new mr(c.url)) : s.resolve(!1);
                                        else {
                                             this.events.next(
                                                  new pr(
                                                       s.id,
                                                       this.urlSerializer.serialize(s.extractedUrl),
                                                       c,
                                                       s.targetSnapshot ?? void 0
                                                  )
                                             );
                                             try {
                                                  s.resolve(n.errorHandler(c));
                                             } catch (l) {
                                                  s.reject(l);
                                             }
                                        }
                                        return se;
                                   })
                              );
                         })
                    )
               );
          }
          cancelNavigationTransition(n, o, i) {
               let s = new ct(n.id, this.urlSerializer.serialize(n.extractedUrl), o, i);
               this.events.next(s), n.resolve(!1);
          }
          isUpdatingInternalState() {
               return (
                    this.currentTransition?.extractedUrl.toString() !==
                    this.currentTransition?.currentUrlTree.toString()
               );
          }
          isUpdatedBrowserUrl() {
               return (
                    this.urlHandlingStrategy.extract(this.urlSerializer.parse(this.location.path(!0))).toString() !==
                         this.currentTransition?.extractedUrl.toString() &&
                    !this.currentTransition?.extras.skipLocationChange
               );
          }
     };
     (e.ɵfac = function (o) {
          return new (o || e)();
     }),
          (e.ɵprov = w({ token: e, factory: e.ɵfac, providedIn: 'root' }));
     let t = e;
     return t;
})();
function dE(t) {
     return t !== lr;
}
var fE = (() => {
          let e = class e {};
          (e.ɵfac = function (o) {
               return new (o || e)();
          }),
               (e.ɵprov = w({ token: e, factory: () => (() => p(hE))(), providedIn: 'root' }));
          let t = e;
          return t;
     })(),
     Fu = class {
          shouldDetach(e) {
               return !1;
          }
          store(e, r) {}
          shouldAttach(e) {
               return !1;
          }
          retrieve(e) {
               return null;
          }
          shouldReuseRoute(e, r) {
               return e.routeConfig === r.routeConfig;
          }
     },
     hE = (() => {
          let e = class e extends Fu {};
          (e.ɵfac = (() => {
               let n;
               return function (i) {
                    return (n || (n = la(e)))(i || e);
               };
          })()),
               (e.ɵprov = w({ token: e, factory: e.ɵfac, providedIn: 'root' }));
          let t = e;
          return t;
     })(),
     kh = (() => {
          let e = class e {};
          (e.ɵfac = function (o) {
               return new (o || e)();
          }),
               (e.ɵprov = w({ token: e, factory: () => (() => p(pE))(), providedIn: 'root' }));
          let t = e;
          return t;
     })(),
     pE = (() => {
          let e = class e extends kh {
               constructor() {
                    super(...arguments),
                         (this.location = p(hn)),
                         (this.urlSerializer = p(Er)),
                         (this.options = p(Sr, { optional: !0 }) || {}),
                         (this.canceledNavigationResolution = this.options.canceledNavigationResolution || 'replace'),
                         (this.urlHandlingStrategy = p(Uu)),
                         (this.urlUpdateStrategy = this.options.urlUpdateStrategy || 'deferred'),
                         (this.currentUrlTree = new ut()),
                         (this.rawUrlTree = this.currentUrlTree),
                         (this.currentPageId = 0),
                         (this.lastSuccessfulId = -1),
                         (this.routerState = Ch(this.currentUrlTree, null)),
                         (this.stateMemento = this.createStateMemento());
               }
               getCurrentUrlTree() {
                    return this.currentUrlTree;
               }
               getRawUrlTree() {
                    return this.rawUrlTree;
               }
               restoredState() {
                    return this.location.getState();
               }
               get browserPageId() {
                    return this.canceledNavigationResolution !== 'computed'
                         ? this.currentPageId
                         : this.restoredState()?.ɵrouterPageId ?? this.currentPageId;
               }
               getRouterState() {
                    return this.routerState;
               }
               createStateMemento() {
                    return {
                         rawUrlTree: this.rawUrlTree,
                         currentUrlTree: this.currentUrlTree,
                         routerState: this.routerState,
                    };
               }
               registerNonRouterCurrentEntryChangeListener(n) {
                    return this.location.subscribe((o) => {
                         o.type === 'popstate' && n(o.url, o.state);
                    });
               }
               handleRouterEvent(n, o) {
                    if (n instanceof Cn) this.stateMemento = this.createStateMemento();
                    else if (n instanceof lt) this.rawUrlTree = o.initialUrl;
                    else if (n instanceof mi) {
                         if (this.urlUpdateStrategy === 'eager' && !o.extras.skipLocationChange) {
                              let i = this.urlHandlingStrategy.merge(o.finalUrl, o.initialUrl);
                              this.setBrowserUrl(i, o);
                         }
                    } else
                         n instanceof gr
                              ? ((this.currentUrlTree = o.finalUrl),
                                (this.rawUrlTree = this.urlHandlingStrategy.merge(o.finalUrl, o.initialUrl)),
                                (this.routerState = o.targetRouterState),
                                this.urlUpdateStrategy === 'deferred' &&
                                     (o.extras.skipLocationChange || this.setBrowserUrl(this.rawUrlTree, o)))
                              : n instanceof ct && (n.code === 3 || n.code === 2)
                              ? this.restoreHistory(o)
                              : n instanceof pr
                              ? this.restoreHistory(o, !0)
                              : n instanceof qe &&
                                ((this.lastSuccessfulId = n.id), (this.currentPageId = this.browserPageId));
               }
               setBrowserUrl(n, o) {
                    let i = this.urlSerializer.serialize(n);
                    if (this.location.isCurrentPathEqualTo(i) || o.extras.replaceUrl) {
                         let s = this.browserPageId,
                              a = m(m({}, o.extras.state), this.generateNgRouterState(o.id, s));
                         this.location.replaceState(i, '', a);
                    } else {
                         let s = m(m({}, o.extras.state), this.generateNgRouterState(o.id, this.browserPageId + 1));
                         this.location.go(i, '', s);
                    }
               }
               restoreHistory(n, o = !1) {
                    if (this.canceledNavigationResolution === 'computed') {
                         let i = this.browserPageId,
                              s = this.currentPageId - i;
                         s !== 0
                              ? this.location.historyGo(s)
                              : this.currentUrlTree === n.finalUrl &&
                                s === 0 &&
                                (this.resetState(n), this.resetUrlToCurrentUrlTree());
                    } else
                         this.canceledNavigationResolution === 'replace' &&
                              (o && this.resetState(n), this.resetUrlToCurrentUrlTree());
               }
               resetState(n) {
                    (this.routerState = this.stateMemento.routerState),
                         (this.currentUrlTree = this.stateMemento.currentUrlTree),
                         (this.rawUrlTree = this.urlHandlingStrategy.merge(
                              this.currentUrlTree,
                              n.finalUrl ?? this.rawUrlTree
                         ));
               }
               resetUrlToCurrentUrlTree() {
                    this.location.replaceState(
                         this.urlSerializer.serialize(this.rawUrlTree),
                         '',
                         this.generateNgRouterState(this.lastSuccessfulId, this.currentPageId)
                    );
               }
               generateNgRouterState(n, o) {
                    return this.canceledNavigationResolution === 'computed'
                         ? { navigationId: n, ɵrouterPageId: o }
                         : { navigationId: n };
               }
          };
          (e.ɵfac = (() => {
               let n;
               return function (i) {
                    return (n || (n = la(e)))(i || e);
               };
          })()),
               (e.ɵprov = w({ token: e, factory: e.ɵfac, providedIn: 'root' }));
          let t = e;
          return t;
     })(),
     ur = (function (t) {
          return (
               (t[(t.COMPLETE = 0)] = 'COMPLETE'),
               (t[(t.FAILED = 1)] = 'FAILED'),
               (t[(t.REDIRECTING = 2)] = 'REDIRECTING'),
               t
          );
     })(ur || {});
function Lh(t, e) {
     t.events
          .pipe(
               ue((r) => r instanceof qe || r instanceof ct || r instanceof pr || r instanceof lt),
               R((r) =>
                    r instanceof qe || r instanceof lt
                         ? ur.COMPLETE
                         : (r instanceof ct ? r.code === 0 || r.code === 1 : !1)
                         ? ur.REDIRECTING
                         : ur.FAILED
               ),
               ue((r) => r !== ur.REDIRECTING),
               Be(1)
          )
          .subscribe(() => {
               e();
          });
}
function gE(t) {
     throw t;
}
var mE = { paths: 'exact', fragment: 'ignored', matrixParams: 'ignored', queryParams: 'exact' },
     vE = { paths: 'subset', fragment: 'ignored', matrixParams: 'ignored', queryParams: 'subset' },
     dt = (() => {
          let e = class e {
               get currentUrlTree() {
                    return this.stateManager.getCurrentUrlTree();
               }
               get rawUrlTree() {
                    return this.stateManager.getRawUrlTree();
               }
               get events() {
                    return this._events;
               }
               get routerState() {
                    return this.stateManager.getRouterState();
               }
               constructor() {
                    (this.disposed = !1),
                         (this.isNgZoneEnabled = !1),
                         (this.console = p(Yo)),
                         (this.stateManager = p(kh)),
                         (this.options = p(Sr, { optional: !0 }) || {}),
                         (this.pendingTasks = p(cn)),
                         (this.urlUpdateStrategy = this.options.urlUpdateStrategy || 'deferred'),
                         (this.navigationTransitions = p(Bu)),
                         (this.urlSerializer = p(Er)),
                         (this.location = p(hn)),
                         (this.urlHandlingStrategy = p(Uu)),
                         (this._events = new ne()),
                         (this.errorHandler = this.options.errorHandler || gE),
                         (this.navigated = !1),
                         (this.routeReuseStrategy = p(fE)),
                         (this.onSameUrlNavigation = this.options.onSameUrlNavigation || 'ignore'),
                         (this.config = p(wr, { optional: !0 })?.flat() ?? []),
                         (this.componentInputBindingEnabled = !!p(bi, { optional: !0 })),
                         (this.eventsSubscription = new Z()),
                         (this.isNgZoneEnabled = p(V) instanceof V && V.isInAngularZone()),
                         this.resetConfig(this.config),
                         this.navigationTransitions
                              .setupNavigations(this, this.currentUrlTree, this.routerState)
                              .subscribe({
                                   error: (n) => {
                                        this.console.warn(n);
                                   },
                              }),
                         this.subscribeToNavigationEvents();
               }
               subscribeToNavigationEvents() {
                    let n = this.navigationTransitions.events.subscribe((o) => {
                         try {
                              let i = this.navigationTransitions.currentTransition,
                                   s = this.navigationTransitions.currentNavigation;
                              if (i !== null && s !== null) {
                                   if (
                                        (this.stateManager.handleRouterEvent(o, s),
                                        o instanceof ct && o.code !== 0 && o.code !== 1)
                                   )
                                        this.navigated = !0;
                                   else if (o instanceof qe) this.navigated = !0;
                                   else if (o instanceof mr) {
                                        let a = this.urlHandlingStrategy.merge(o.url, i.currentRawUrl),
                                             u = {
                                                  skipLocationChange: i.extras.skipLocationChange,
                                                  replaceUrl: this.urlUpdateStrategy === 'eager' || dE(i.source),
                                             };
                                        this.scheduleNavigation(a, lr, null, u, {
                                             resolve: i.resolve,
                                             reject: i.reject,
                                             promise: i.promise,
                                        });
                                   }
                              }
                              DE(o) && this._events.next(o);
                         } catch (i) {
                              this.navigationTransitions.transitionAbortSubject.next(i);
                         }
                    });
                    this.eventsSubscription.add(n);
               }
               resetRootComponentType(n) {
                    (this.routerState.root.component = n), (this.navigationTransitions.rootComponentType = n);
               }
               initialNavigation() {
                    this.setUpLocationChangeListener(),
                         this.navigationTransitions.hasRequestedNavigation ||
                              this.navigateToSyncWithBrowser(
                                   this.location.path(!0),
                                   lr,
                                   this.stateManager.restoredState()
                              );
               }
               setUpLocationChangeListener() {
                    this.nonRouterCurrentEntryChangeSubscription ||
                         (this.nonRouterCurrentEntryChangeSubscription =
                              this.stateManager.registerNonRouterCurrentEntryChangeListener((n, o) => {
                                   setTimeout(() => {
                                        this.navigateToSyncWithBrowser(n, 'popstate', o);
                                   }, 0);
                              }));
               }
               navigateToSyncWithBrowser(n, o, i) {
                    let s = { replaceUrl: !0 },
                         a = i?.navigationId ? i : null;
                    if (i) {
                         let c = m({}, i);
                         delete c.navigationId, delete c.ɵrouterPageId, Object.keys(c).length !== 0 && (s.state = c);
                    }
                    let u = this.parseUrl(n);
                    this.scheduleNavigation(u, o, a, s);
               }
               get url() {
                    return this.serializeUrl(this.currentUrlTree);
               }
               getCurrentNavigation() {
                    return this.navigationTransitions.currentNavigation;
               }
               get lastSuccessfulNavigation() {
                    return this.navigationTransitions.lastSuccessfulNavigation;
               }
               resetConfig(n) {
                    (this.config = n.map(ju)), (this.navigated = !1);
               }
               ngOnDestroy() {
                    this.dispose();
               }
               dispose() {
                    this.navigationTransitions.complete(),
                         this.nonRouterCurrentEntryChangeSubscription &&
                              (this.nonRouterCurrentEntryChangeSubscription.unsubscribe(),
                              (this.nonRouterCurrentEntryChangeSubscription = void 0)),
                         (this.disposed = !0),
                         this.eventsSubscription.unsubscribe();
               }
               createUrlTree(n, o = {}) {
                    let { relativeTo: i, queryParams: s, fragment: a, queryParamsHandling: u, preserveFragment: c } = o,
                         l = c ? this.currentUrlTree.fragment : a,
                         d = null;
                    switch (u) {
                         case 'merge':
                              d = m(m({}, this.currentUrlTree.queryParams), s);
                              break;
                         case 'preserve':
                              d = this.currentUrlTree.queryParams;
                              break;
                         default:
                              d = s || null;
                    }
                    d !== null && (d = this.removeEmptyProps(d));
                    let f;
                    try {
                         let h = i ? i.snapshot : this.routerState.snapshot.root;
                         f = vh(h);
                    } catch {
                         (typeof n[0] != 'string' || !n[0].startsWith('/')) && (n = []), (f = this.currentUrlTree.root);
                    }
                    return yh(f, n, d, l ?? null);
               }
               navigateByUrl(n, o = { skipLocationChange: !1 }) {
                    let i = wn(n) ? n : this.parseUrl(n),
                         s = this.urlHandlingStrategy.merge(i, this.rawUrlTree);
                    return this.scheduleNavigation(s, lr, null, o);
               }
               navigate(n, o = { skipLocationChange: !1 }) {
                    return yE(n), this.navigateByUrl(this.createUrlTree(n, o), o);
               }
               serializeUrl(n) {
                    return this.urlSerializer.serialize(n);
               }
               parseUrl(n) {
                    try {
                         return this.urlSerializer.parse(n);
                    } catch {
                         return this.urlSerializer.parse('/');
                    }
               }
               isActive(n, o) {
                    let i;
                    if ((o === !0 ? (i = m({}, mE)) : o === !1 ? (i = m({}, vE)) : (i = o), wn(n)))
                         return Jf(this.currentUrlTree, n, i);
                    let s = this.parseUrl(n);
                    return Jf(this.currentUrlTree, s, i);
               }
               removeEmptyProps(n) {
                    return Object.keys(n).reduce((o, i) => {
                         let s = n[i];
                         return s != null && (o[i] = s), o;
                    }, {});
               }
               scheduleNavigation(n, o, i, s, a) {
                    if (this.disposed) return Promise.resolve(!1);
                    let u, c, l;
                    a
                         ? ((u = a.resolve), (c = a.reject), (l = a.promise))
                         : (l = new Promise((f, h) => {
                                (u = f), (c = h);
                           }));
                    let d = this.pendingTasks.add();
                    return (
                         Lh(this, () => {
                              queueMicrotask(() => this.pendingTasks.remove(d));
                         }),
                         this.navigationTransitions.handleNavigationRequest({
                              source: o,
                              restoredState: i,
                              currentUrlTree: this.currentUrlTree,
                              currentRawUrl: this.currentUrlTree,
                              rawUrl: n,
                              extras: s,
                              resolve: u,
                              reject: c,
                              promise: l,
                              currentSnapshot: this.routerState.snapshot,
                              currentRouterState: this.routerState,
                         }),
                         l.catch((f) => Promise.reject(f))
                    );
               }
          };
          (e.ɵfac = function (o) {
               return new (o || e)();
          }),
               (e.ɵprov = w({ token: e, factory: e.ɵfac, providedIn: 'root' }));
          let t = e;
          return t;
     })();
function yE(t) {
     for (let e = 0; e < t.length; e++) if (t[e] == null) throw new y(4008, !1);
}
function DE(t) {
     return !(t instanceof gr) && !(t instanceof mr);
}
var Ii = class {};
var wE = (() => {
          let e = class e {
               constructor(n, o, i, s, a) {
                    (this.router = n), (this.injector = i), (this.preloadingStrategy = s), (this.loader = a);
               }
               setUpPreloading() {
                    this.subscription = this.router.events
                         .pipe(
                              ue((n) => n instanceof qe),
                              Ue(() => this.preload())
                         )
                         .subscribe(() => {});
               }
               preload() {
                    return this.processRoutes(this.injector, this.router.config);
               }
               ngOnDestroy() {
                    this.subscription && this.subscription.unsubscribe();
               }
               processRoutes(n, o) {
                    let i = [];
                    for (let s of o) {
                         s.providers && !s._injector && (s._injector = qo(s.providers, n, `Route: ${s.path}`));
                         let a = s._injector ?? n,
                              u = s._loadedInjector ?? a;
                         ((s.loadChildren && !s._loadedRoutes && s.canLoad === void 0) ||
                              (s.loadComponent && !s._loadedComponent)) &&
                              i.push(this.preloadConfig(a, s)),
                              (s.children || s._loadedRoutes) &&
                                   i.push(this.processRoutes(u, s.children ?? s._loadedRoutes));
                    }
                    return j(i).pipe(Ye());
               }
               preloadConfig(n, o) {
                    return this.preloadingStrategy.preload(o, () => {
                         let i;
                         o.loadChildren && o.canLoad === void 0 ? (i = this.loader.loadChildren(n, o)) : (i = C(null));
                         let s = i.pipe(
                              z((a) =>
                                   a === null
                                        ? C(void 0)
                                        : ((o._loadedRoutes = a.routes),
                                          (o._loadedInjector = a.injector),
                                          this.processRoutes(a.injector ?? n, a.routes))
                              )
                         );
                         if (o.loadComponent && !o._loadedComponent) {
                              let a = this.loader.loadComponent(o);
                              return j([s, a]).pipe(Ye());
                         } else return s;
                    });
               }
          };
          (e.ɵfac = function (o) {
               return new (o || e)(D(dt), D(Qo), D(ie), D(Ii), D($u));
          }),
               (e.ɵprov = w({ token: e, factory: e.ɵfac, providedIn: 'root' }));
          let t = e;
          return t;
     })(),
     jh = new E(''),
     CE = (() => {
          let e = class e {
               constructor(n, o, i, s, a = {}) {
                    (this.urlSerializer = n),
                         (this.transitions = o),
                         (this.viewportScroller = i),
                         (this.zone = s),
                         (this.options = a),
                         (this.lastId = 0),
                         (this.lastSource = 'imperative'),
                         (this.restoredId = 0),
                         (this.store = {}),
                         (a.scrollPositionRestoration = a.scrollPositionRestoration || 'disabled'),
                         (a.anchorScrolling = a.anchorScrolling || 'disabled');
               }
               init() {
                    this.options.scrollPositionRestoration !== 'disabled' &&
                         this.viewportScroller.setHistoryScrollRestoration('manual'),
                         (this.routerEventsSubscription = this.createScrollEvents()),
                         (this.scrollEventsSubscription = this.consumeScrollEvents());
               }
               createScrollEvents() {
                    return this.transitions.events.subscribe((n) => {
                         n instanceof Cn
                              ? ((this.store[this.lastId] = this.viewportScroller.getScrollPosition()),
                                (this.lastSource = n.navigationTrigger),
                                (this.restoredId = n.restoredState ? n.restoredState.navigationId : 0))
                              : n instanceof qe
                              ? ((this.lastId = n.id),
                                this.scheduleScrollEvent(n, this.urlSerializer.parse(n.urlAfterRedirects).fragment))
                              : n instanceof lt &&
                                n.code === 0 &&
                                ((this.lastSource = void 0),
                                (this.restoredId = 0),
                                this.scheduleScrollEvent(n, this.urlSerializer.parse(n.url).fragment));
                    });
               }
               consumeScrollEvents() {
                    return this.transitions.events.subscribe((n) => {
                         n instanceof vi &&
                              (n.position
                                   ? this.options.scrollPositionRestoration === 'top'
                                        ? this.viewportScroller.scrollToPosition([0, 0])
                                        : this.options.scrollPositionRestoration === 'enabled' &&
                                          this.viewportScroller.scrollToPosition(n.position)
                                   : n.anchor && this.options.anchorScrolling === 'enabled'
                                   ? this.viewportScroller.scrollToAnchor(n.anchor)
                                   : this.options.scrollPositionRestoration !== 'disabled' &&
                                     this.viewportScroller.scrollToPosition([0, 0]));
                    });
               }
               scheduleScrollEvent(n, o) {
                    this.zone.runOutsideAngular(() => {
                         setTimeout(() => {
                              this.zone.run(() => {
                                   this.transitions.events.next(
                                        new vi(
                                             n,
                                             this.lastSource === 'popstate' ? this.store[this.restoredId] : null,
                                             o
                                        )
                                   );
                              });
                         }, 0);
                    });
               }
               ngOnDestroy() {
                    this.routerEventsSubscription?.unsubscribe(), this.scrollEventsSubscription?.unsubscribe();
               }
          };
          (e.ɵfac = function (o) {
               jd();
          }),
               (e.ɵprov = w({ token: e, factory: e.ɵfac }));
          let t = e;
          return t;
     })();
function F_(t, ...e) {
     return sn([
          { provide: wr, multi: !0, useValue: t },
          [],
          { provide: _t, useFactory: Vh, deps: [dt] },
          { provide: Jn, multi: !0, useFactory: $h },
          e.map((r) => r.ɵproviders),
     ]);
}
function Vh(t) {
     return t.routerState.root;
}
function Tr(t, e) {
     return { ɵkind: t, ɵproviders: e };
}
function $h() {
     let t = p(Fe);
     return (e) => {
          let r = t.get(ln);
          if (e !== r.components[0]) return;
          let n = t.get(dt),
               o = t.get(Uh);
          t.get(Hu) === 1 && n.initialNavigation(),
               t.get(Bh, null, A.Optional)?.setUpPreloading(),
               t.get(jh, null, A.Optional)?.init(),
               n.resetRootComponentType(r.componentTypes[0]),
               o.closed || (o.next(), o.complete(), o.unsubscribe());
     };
}
var Uh = new E('', { factory: () => new ne() }),
     Hu = new E('', { providedIn: 'root', factory: () => 1 });
function EE() {
     return Tr(2, [
          { provide: Hu, useValue: 0 },
          {
               provide: Zo,
               multi: !0,
               deps: [Fe],
               useFactory: (e) => {
                    let r = e.get(_f, Promise.resolve());
                    return () =>
                         r.then(
                              () =>
                                   new Promise((n) => {
                                        let o = e.get(dt),
                                             i = e.get(Uh);
                                        Lh(o, () => {
                                             n(!0);
                                        }),
                                             (e.get(Bu).afterPreactivation = () => (n(!0), i.closed ? C(void 0) : i)),
                                             o.initialNavigation();
                                   })
                         );
               },
          },
     ]);
}
function IE() {
     return Tr(3, [
          {
               provide: Zo,
               multi: !0,
               useFactory: () => {
                    let e = p(dt);
                    return () => {
                         e.setUpLocationChangeListener();
                    };
               },
          },
          { provide: Hu, useValue: 2 },
     ]);
}
var Bh = new E('');
function bE(t) {
     return Tr(0, [
          { provide: Bh, useExisting: wE },
          { provide: Ii, useExisting: t },
     ]);
}
function ME() {
     return Tr(8, [nh, { provide: bi, useExisting: nh }]);
}
function SE(t) {
     let e = [
          { provide: Ph, useValue: cE },
          { provide: Fh, useValue: m({ skipNextTransition: !!t?.skipInitialTransition }, t) },
     ];
     return Tr(9, e);
}
var ih = new E('ROUTER_FORROOT_GUARD'),
     TE = [hn, { provide: Er, useClass: fr }, dt, Ir, { provide: _t, useFactory: Vh, deps: [dt] }, $u, []],
     k_ = (() => {
          let e = class e {
               constructor(n) {}
               static forRoot(n, o) {
                    return {
                         ngModule: e,
                         providers: [
                              TE,
                              [],
                              { provide: wr, multi: !0, useValue: n },
                              { provide: ih, useFactory: NE, deps: [[dt, new Wn(), new Vo()]] },
                              { provide: Sr, useValue: o || {} },
                              o?.useHash ? _E() : AE(),
                              xE(),
                              o?.preloadingStrategy ? bE(o.preloadingStrategy).ɵproviders : [],
                              o?.initialNavigation ? RE(o) : [],
                              o?.bindToComponentInputs ? ME().ɵproviders : [],
                              o?.enableViewTransitions ? SE().ɵproviders : [],
                              OE(),
                         ],
                    };
               }
               static forChild(n) {
                    return { ngModule: e, providers: [{ provide: wr, multi: !0, useValue: n }] };
               }
          };
          (e.ɵfac = function (o) {
               return new (o || e)(D(ih, 8));
          }),
               (e.ɵmod = bt({ type: e })),
               (e.ɵinj = It({}));
          let t = e;
          return t;
     })();
function xE() {
     return {
          provide: jh,
          useFactory: () => {
               let t = p(Of),
                    e = p(V),
                    r = p(Sr),
                    n = p(Bu),
                    o = p(Er);
               return r.scrollOffset && t.setOffset(r.scrollOffset), new CE(o, n, t, e, r);
          },
     };
}
function _E() {
     return { provide: Mt, useClass: Nf };
}
function AE() {
     return { provide: Mt, useClass: Ga };
}
function NE(t) {
     return 'guarded';
}
function RE(t) {
     return [
          t.initialNavigation === 'disabled' ? IE().ɵproviders : [],
          t.initialNavigation === 'enabledBlocking' ? EE().ɵproviders : [],
     ];
}
var sh = new E('');
function OE() {
     return [
          { provide: sh, useFactory: $h },
          { provide: Jn, multi: !0, useExisting: sh },
     ];
}
export {
     m as a,
     H as b,
     ne as c,
     j as d,
     R as e,
     Mp as f,
     to as g,
     ll as h,
     y as i,
     w as j,
     It as k,
     E as l,
     D as m,
     p as n,
     bl as o,
     bt as p,
     Un as q,
     Bn as r,
     la as s,
     zT as t,
     WT as u,
     an as v,
     Ln as w,
     Yn as x,
     GT as y,
     qT as z,
     We as A,
     Wo as B,
     ye as C,
     V as D,
     dy as E,
     Iy as F,
     by as G,
     qy as H,
     QT as I,
     hf as J,
     pf as K,
     ja as L,
     Kn as M,
     mf as N,
     KT as O,
     oD as P,
     JT as Q,
     sD as R,
     XT as S,
     yf as T,
     ex as U,
     ln as V,
     dn as W,
     Q as X,
     za as Y,
     Af as Z,
     Ex as _,
     ND as $,
     Ix as aa,
     JD as ba,
     jx as ca,
     Wf as da,
     u_ as ea,
     lC as fa,
     F_ as ga,
     EE as ha,
     ME as ia,
     k_ as ja,
     l_ as ka,
};
