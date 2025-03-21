(() => {
  var q = { autoSleep: 120, force3D: "auto", nullTargetWarn: 1, units: { lineHeight: "" } },
    qe = { duration: 0.5, overwrite: !1, delay: 0 },
    qt,
    _e = 1e8,
    D = 1 / _e,
    Qt = Math.PI * 2,
    Sr = Qt / 4,
    Cr = 0,
    Yi = Math.sqrt,
    Mr = Math.cos,
    Er = Math.sin,
    j = (s) => typeof s == "string",
    W = (s) => typeof s == "function",
    ue = (s) => typeof s == "number",
    bt = (s) => typeof s == "undefined",
    Te = (s) => typeof s == "object",
    Z = (s) => s !== !1,
    qi = () => typeof window != "undefined",
    Qi = (s) => W(s) || j(s),
    Zi = (typeof ArrayBuffer == "function" && ArrayBuffer.isView) || function () {},
    ne = Array.isArray,
    Zt = /(?:-?\.?\d|\.)+/gi,
    Kt = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,
    Be = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g,
    Jt = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,
    $t = /[+-]=-?[.\d]+/,
    Ki = /[#\-+.]*\b[a-z\d-=+%.]+/gi,
    Dr = /[\d.+\-=]+(?:e[-+]\d*)*/i,
    B,
    me,
    ei,
    Ji,
    te = {},
    wt = {},
    $i,
    es = (s) => (wt = Qe(s, te)) && oe,
    Tt = (s, e) =>
      console.warn("Invalid property", s, "set to", e, "Missing plugin? gsap.registerPlugin()"),
    ts = (s, e) => !e && console.warn(s),
    is = (s, e) => (s && (te[s] = e) && wt && (wt[s] = e)) || te,
    lt = () => 0,
    ti = {},
    Me = [],
    ii = {},
    ss,
    K = {},
    si = {},
    rs = 30,
    Pt = [],
    ri = "",
    ai = (s) => {
      let e = s[0],
        t,
        i;
      if ((Te(e) || W(e) || (s = [s]), !(t = (e._gsap || {}).harness))) {
        for (i = Pt.length; i-- && !Pt[i].targetTest(e); );
        t = Pt[i];
      }
      for (i = s.length; i--; )
        (s[i] && (s[i]._gsap || (s[i]._gsap = new Rt(s[i], t)))) || s.splice(i, 1);
      return s;
    },
    Ee = (s) => s._gsap || ai(xe(s))[0]._gsap,
    ni = (s, e, t) =>
      (t = s[e]) && W(t) ? s[e]() : (bt(t) && s.getAttribute && s.getAttribute(e)) || t,
    J = (s, e) => (s = s.split(",")).forEach(e) || s,
    S = (s) => Math.round(s * 1e5) / 1e5 || 0,
    Lr = (s, e) => {
      let t = e.length,
        i = 0;
      for (; s.indexOf(e[i]) < 0 && ++i < t; );
      return i < t;
    },
    dt = (s, e, t) => {
      let i = ue(s[1]),
        r = (i ? 2 : 1) + (e < 2 ? 0 : 1),
        a = s[r],
        n;
      if ((i && (a.duration = s[1]), (a.parent = t), e)) {
        for (n = a; t && !("immediateRender" in n); )
          (n = t.vars.defaults || {}), (t = Z(t.vars.inherit) && t.parent);
        (a.immediateRender = Z(n.immediateRender)),
          e < 2 ? (a.runBackwards = 1) : (a.startAt = s[r - 1]);
      }
      return a;
    },
    St = () => {
      let s = Me.length,
        e = Me.slice(0),
        t,
        i;
      for (ii = {}, Me.length = 0, t = 0; t < s; t++)
        (i = e[t]), i && i._lazy && (i.render(i._lazy[0], i._lazy[1], !0)._lazy = 0);
    },
    as = (s, e, t, i) => {
      Me.length && St(), s.render(e, t, i), Me.length && St();
    },
    ns = (s) => {
      let e = parseFloat(s);
      return (e || e === 0) && (s + "").match(Ki).length < 2 ? e : j(s) ? s.trim() : s;
    },
    os = (s) => s,
    he = (s, e) => {
      for (let t in e) t in s || (s[t] = e[t]);
      return s;
    },
    Ar = (s, e) => {
      for (let t in e) t in s || t === "duration" || t === "ease" || (s[t] = e[t]);
    },
    Qe = (s, e) => {
      for (let t in e) s[t] = e[t];
      return s;
    },
    oi = (s, e) => {
      for (let t in e)
        t !== "__proto__" &&
          t !== "constructor" &&
          t !== "prototype" &&
          (s[t] = Te(e[t]) ? oi(s[t] || (s[t] = {}), e[t]) : e[t]);
      return s;
    },
    hi = (s, e) => {
      let t = {},
        i;
      for (i in s) i in e || (t[i] = s[i]);
      return t;
    },
    Ct = (s) => {
      let e = s.parent || B,
        t = s.keyframes ? Ar : he;
      if (Z(s.inherit)) for (; e; ) t(s, e.vars.defaults), (e = e.parent || e._dp);
      return s;
    },
    kr = (s, e) => {
      let t = s.length,
        i = t === e.length;
      for (; i && t-- && s[t] === e[t]; );
      return t < 0;
    },
    Or = (s, e, t = "_first", i = "_last", r) => {
      let a = s[i],
        n;
      if (r) for (n = e[r]; a && a[r] > n; ) a = a._prev;
      return (
        a ? ((e._next = a._next), (a._next = e)) : ((e._next = s[t]), (s[t] = e)),
        e._next ? (e._next._prev = e) : (s[i] = e),
        (e._prev = a),
        (e.parent = e._dp = s),
        e
      );
    },
    Mt = (s, e, t = "_first", i = "_last") => {
      let r = e._prev,
        a = e._next;
      r ? (r._next = a) : s[t] === e && (s[t] = a),
        a ? (a._prev = r) : s[i] === e && (s[i] = r),
        (e._next = e._prev = e.parent = null);
    },
    De = (s, e) => {
      s.parent && (!e || s.parent.autoRemoveChildren) && s.parent.remove(s), (s._act = 0);
    },
    Ne = (s, e) => {
      if (s && (!e || e._end > s._dur || e._start < 0)) {
        let t = s;
        for (; t; ) (t._dirty = 1), (t = t.parent);
      }
      return s;
    },
    Fr = (s) => {
      let e = s.parent;
      for (; e && e.parent; ) (e._dirty = 1), e.totalDuration(), (e = e.parent);
      return s;
    },
    hs = (s) => !s || (s._ts && hs(s.parent)),
    ls = (s) => (s._repeat ? Ze(s._tTime, (s = s.duration() + s._rDelay)) * s : 0),
    Ze = (s, e) => {
      let t = Math.floor((s /= e));
      return s && t === s ? t - 1 : t;
    },
    Et = (s, e) =>
      (s - e._start) * e._ts + (e._ts >= 0 ? 0 : e._dirty ? e.totalDuration() : e._tDur),
    li = (s) => (s._end = S(s._start + (s._tDur / Math.abs(s._ts || s._rts || D) || 0))),
    ds = (s, e) => {
      let t = s._dp;
      return (
        t &&
          t.smoothChildTiming &&
          s._ts &&
          ((s._start = S(
            t._time -
              (s._ts > 0 ? e / s._ts : ((s._dirty ? s.totalDuration() : s._tDur) - e) / -s._ts)
          )),
          li(s),
          t._dirty || Ne(t, s)),
        s
      );
    },
    Dt = (s, e) => {
      let t;
      if (
        ((e._time || (e._initted && !e._dur)) &&
          ((t = Et(s.rawTime(), e)),
          (!e._dur || ut(0, e.totalDuration(), t) - e._tTime > D) && e.render(t, !0)),
        Ne(s, e)._dp && s._initted && s._time >= s._dur && s._ts)
      ) {
        if (s._dur < s.duration())
          for (t = s; t._dp; ) t.rawTime() >= 0 && t.totalTime(t._tTime), (t = t._dp);
        s._zTime = -D;
      }
    },
    Pe = (s, e, t, i) => (
      e.parent && De(e),
      (e._start = S(t + e._delay)),
      (e._end = S(e._start + (e.totalDuration() / Math.abs(e.timeScale()) || 0))),
      Or(s, e, "_first", "_last", s._sort ? "_start" : 0),
      (s._recent = e),
      i || Dt(s, e),
      s
    ),
    us = (s, e) => (te.ScrollTrigger || Tt("scrollTrigger", e)) && te.ScrollTrigger.create(e, s),
    fs = (s, e, t, i) => {
      if ((cs(s, e), !s._initted)) return 1;
      if (
        !t &&
        s._pt &&
        ((s._dur && s.vars.lazy !== !1) || (!s._dur && s.vars.lazy)) &&
        ss !== ie.frame
      )
        return Me.push(s), (s._lazy = [e, i]), 1;
    },
    ps = ({ parent: s }) => s && s._ts && s._initted && !s._lock && (s.rawTime() < 0 || ps(s)),
    Vr = (s, e, t, i) => {
      let r = s.ratio,
        a =
          e < 0 ||
          (!e &&
            ((!s._start && ps(s)) ||
              ((s._ts < 0 || s._dp._ts < 0) && s.data !== "isFromStart" && s.data !== "isStart")))
            ? 0
            : 1,
        n = s._rDelay,
        o = 0,
        l,
        h,
        d;
      if (
        (n &&
          s._repeat &&
          ((o = ut(0, s._tDur, e)),
          (h = Ze(o, n)),
          (d = Ze(s._tTime, n)),
          s._yoyo && h & 1 && (a = 1 - a),
          h !== d && ((r = 1 - a), s.vars.repeatRefresh && s._initted && s.invalidate())),
        a !== r || i || s._zTime === D || (!e && s._zTime))
      ) {
        if (!s._initted && fs(s, e, i, t)) return;
        for (
          d = s._zTime,
            s._zTime = e || (t ? D : 0),
            t || (t = e && !d),
            s.ratio = a,
            s._from && (a = 1 - a),
            s._time = 0,
            s._tTime = o,
            t || se(s, "onStart"),
            l = s._pt;
          l;

        )
          l.r(a, l.d), (l = l._next);
        s._startAt && e < 0 && s._startAt.render(e, !0, !0),
          s._onUpdate && !t && se(s, "onUpdate"),
          o && s._repeat && !t && s.parent && se(s, "onRepeat"),
          (e >= s._tDur || e < 0) &&
            s.ratio === a &&
            (a && De(s, 1),
            t || (se(s, a ? "onComplete" : "onReverseComplete", !0), s._prom && s._prom()));
      } else s._zTime || (s._zTime = e);
    },
    zr = (s, e, t) => {
      let i;
      if (t > e)
        for (i = s._first; i && i._start <= t; ) {
          if (!i._dur && i.data === "isPause" && i._start > e) return i;
          i = i._next;
        }
      else
        for (i = s._last; i && i._start >= t; ) {
          if (!i._dur && i.data === "isPause" && i._start < e) return i;
          i = i._prev;
        }
    },
    Ke = (s, e, t, i) => {
      let r = s._repeat,
        a = S(e) || 0,
        n = s._tTime / s._tDur;
      return (
        n && !i && (s._time *= a / s._dur),
        (s._dur = a),
        (s._tDur = r ? (r < 0 ? 1e10 : S(a * (r + 1) + s._rDelay * r)) : a),
        n && !i ? ds(s, (s._tTime = s._tDur * n)) : s.parent && li(s),
        t || Ne(s.parent, s),
        s
      );
    },
    gs = (s) => (s instanceof G ? Ne(s) : Ke(s, s._dur)),
    Ir = { _start: 0, endTime: lt },
    H = (s, e) => {
      let t = s.labels,
        i = s._recent || Ir,
        r = s.duration() >= _e ? i.endTime(!1) : s._dur,
        a,
        n;
      return j(e) && (isNaN(e) || e in t)
        ? ((a = e.charAt(0)),
          a === "<" || a === ">"
            ? (a === "<" ? i._start : i.endTime(i._repeat >= 0)) + (parseFloat(e.substr(1)) || 0)
            : ((a = e.indexOf("=")),
              a < 0
                ? (e in t || (t[e] = r), t[e])
                : ((n = +(e.charAt(a - 1) + e.substr(a + 1))),
                  a > 1 ? H(s, e.substr(0, a - 1)) + n : r + n)))
        : e == null
        ? r
        : +e;
    },
    Le = (s, e) => (s || s === 0 ? e(s) : e),
    ut = (s, e, t) => (t < s ? s : t > e ? e : t),
    $ = (s) => {
      if (typeof s != "string") return "";
      let e = Dr.exec(s);
      return e ? s.substr(e.index + e[0].length) : "";
    },
    Ur = (s, e, t) => Le(t, (i) => ut(s, e, i)),
    di = [].slice,
    _s = (s, e) =>
      s &&
      Te(s) &&
      "length" in s &&
      ((!e && !s.length) || (s.length - 1 in s && Te(s[0]))) &&
      !s.nodeType &&
      s !== me,
    Br = (s, e, t = []) =>
      s.forEach((i) => ((j(i) && !e) || _s(i, 1) ? t.push(...xe(i)) : t.push(i))) || t,
    xe = (s, e) =>
      j(s) && !e && (ei || !Je())
        ? di.call(Ji.querySelectorAll(s), 0)
        : ne(s)
        ? Br(s, e)
        : _s(s)
        ? di.call(s, 0)
        : s
        ? [s]
        : [],
    ms = (s) => s.sort(() => 0.5 - Math.random()),
    ys = (s) => {
      if (W(s)) return s;
      let e = Te(s) ? s : { each: s },
        t = $e(e.ease),
        i = e.from || 0,
        r = parseFloat(e.base) || 0,
        a = {},
        n = i > 0 && i < 1,
        o = isNaN(i) || n,
        l = e.axis,
        h = i,
        d = i;
      return (
        j(i)
          ? (h = d = { center: 0.5, edges: 0.5, end: 1 }[i] || 0)
          : !n && o && ((h = i[0]), (d = i[1])),
        (c, p, f) => {
          let u = (f || e).length,
            g = a[u],
            _,
            v,
            x,
            T,
            m,
            y,
            w,
            b,
            P;
          if (!g) {
            if (((P = e.grid === "auto" ? 0 : (e.grid || [1, _e])[1]), !P)) {
              for (w = -_e; w < (w = f[P++].getBoundingClientRect().left) && P < u; );
              P--;
            }
            for (
              g = a[u] = [],
                _ = o ? Math.min(P, u) * h - 0.5 : i % P,
                v = o ? (u * d) / P - 0.5 : (i / P) | 0,
                w = 0,
                b = _e,
                y = 0;
              y < u;
              y++
            )
              (x = (y % P) - _),
                (T = v - ((y / P) | 0)),
                (g[y] = m = l ? Math.abs(l === "y" ? T : x) : Yi(x * x + T * T)),
                m > w && (w = m),
                m < b && (b = m);
            i === "random" && ms(g),
              (g.max = w - b),
              (g.min = b),
              (g.v = u =
                (parseFloat(e.amount) ||
                  parseFloat(e.each) *
                    (P > u ? u - 1 : l ? (l === "y" ? u / P : P) : Math.max(P, u / P)) ||
                  0) * (i === "edges" ? -1 : 1)),
              (g.b = u < 0 ? r - u : r),
              (g.u = $(e.amount || e.each) || 0),
              (t = t && u < 0 ? xs(t) : t);
          }
          return (u = (g[c] - g.min) / g.max || 0), S(g.b + (t ? t(u) : u) * g.v) + g.u;
        }
      );
    },
    ui = (s) => {
      let e = s < 1 ? Math.pow(10, (s + "").length - 2) : 1;
      return (t) => {
        let i = Math.round(parseFloat(t) / s) * s * e;
        return (i - (i % 1)) / e + (ue(t) ? 0 : $(t));
      };
    },
    vs = (s, e) => {
      let t = ne(s),
        i,
        r;
      return (
        !t &&
          Te(s) &&
          ((i = t = s.radius || _e),
          s.values ? ((s = xe(s.values)), (r = !ue(s[0])) && (i *= i)) : (s = ui(s.increment))),
        Le(
          e,
          t
            ? W(s)
              ? (a) => ((r = s(a)), Math.abs(r - a) <= i ? r : a)
              : (a) => {
                  let n = parseFloat(r ? a.x : a),
                    o = parseFloat(r ? a.y : 0),
                    l = _e,
                    h = 0,
                    d = s.length,
                    c,
                    p;
                  for (; d--; )
                    r
                      ? ((c = s[d].x - n), (p = s[d].y - o), (c = c * c + p * p))
                      : (c = Math.abs(s[d] - n)),
                      c < l && ((l = c), (h = d));
                  return (h = !i || l <= i ? s[h] : a), r || h === a || ue(a) ? h : h + $(a);
                }
            : ui(s)
        )
      );
    },
    bs = (s, e, t, i) =>
      Le(ne(s) ? !e : t === !0 ? !!(t = 0) : !i, () =>
        ne(s)
          ? s[~~(Math.random() * s.length)]
          : (t = t || 1e-5) &&
            (i = t < 1 ? 10 ** ((t + "").length - 2) : 1) &&
            Math.floor(Math.round((s - t / 2 + Math.random() * (e - s + t * 0.99)) / t) * t * i) / i
      ),
    Nr =
      (...s) =>
      (e) =>
        s.reduce((t, i) => i(t), e),
    Wr = (s, e) => (t) => s(parseFloat(t)) + (e || $(t)),
    jr = (s, e, t) => ws(s, e, 0, 1, t),
    Ts = (s, e, t) => Le(t, (i) => s[~~e(i)]),
    Ps = function (s, e, t) {
      let i = e - s;
      return ne(s) ? Ts(s, Ps(0, s.length), e) : Le(t, (r) => ((i + ((r - s) % i)) % i) + s);
    },
    Rs = (s, e, t) => {
      let i = e - s,
        r = i * 2;
      return ne(s)
        ? Ts(s, Rs(0, s.length - 1), e)
        : Le(t, (a) => ((a = (r + ((a - s) % r)) % r || 0), s + (a > i ? r - a : a)));
    },
    ct = (s) => {
      let e = 0,
        t = "",
        i,
        r,
        a,
        n;
      for (; ~(i = s.indexOf("random(", e)); )
        (a = s.indexOf(")", i)),
          (n = s.charAt(i + 7) === "["),
          (r = s.substr(i + 7, a - i - 7).match(n ? Ki : Zt)),
          (t += s.substr(e, i - e) + bs(n ? r : +r[0], n ? 0 : +r[1], +r[2] || 1e-5)),
          (e = a + 1);
      return t + s.substr(e, s.length - e);
    },
    ws = (s, e, t, i, r) => {
      let a = e - s,
        n = i - t;
      return Le(r, (o) => t + (((o - s) / a) * n || 0));
    },
    Ss = (s, e, t, i) => {
      let r = isNaN(s + e) ? 0 : (a) => (1 - a) * s + a * e;
      if (!r) {
        let a = j(s),
          n = {},
          o,
          l,
          h,
          d,
          c;
        if ((t === !0 && (i = 1) && (t = null), a)) (s = { p: s }), (e = { p: e });
        else if (ne(s) && !ne(e)) {
          for (h = [], d = s.length, c = d - 2, l = 1; l < d; l++) h.push(Ss(s[l - 1], s[l]));
          d--,
            (r = (p) => {
              p *= d;
              let f = Math.min(c, ~~p);
              return h[f](p - f);
            }),
            (t = e);
        } else i || (s = Qe(ne(s) ? [] : {}, s));
        if (!h) {
          for (o in e) ci.call(n, s, o, "get", e[o]);
          r = (p) => fi(p, n) || (a ? s.p : s);
        }
      }
      return Le(t, r);
    },
    Cs = (s, e, t) => {
      let i = s.labels,
        r = _e,
        a,
        n,
        o;
      for (a in i) (n = i[a] - e), n < 0 == !!t && n && r > (n = Math.abs(n)) && ((o = a), (r = n));
      return o;
    },
    se = (s, e, t) => {
      let i = s.vars,
        r = i[e],
        a,
        n;
      if (!!r)
        return (
          (a = i[e + "Params"]),
          (n = i.callbackScope || s),
          t && Me.length && St(),
          a ? r.apply(n, a) : r.call(n)
        );
    },
    ft = (s) => (De(s), s.progress() < 1 && se(s, "onInterrupt"), s),
    et,
    Xr = (s) => {
      s = (!s.name && s.default) || s;
      let e = s.name,
        t = W(s),
        i =
          e && !t && s.init
            ? function () {
                this._props = [];
              }
            : s,
        r = { init: lt, render: fi, add: ci, kill: Hr, modifier: Gr, rawVars: 0 },
        a = { targetTest: 0, get: 0, getSetter: Lt, aliases: {}, register: 0 };
      if ((Je(), s !== i)) {
        if (K[e]) return;
        he(i, he(hi(s, r), a)),
          Qe(i.prototype, Qe(r, hi(s, a))),
          (K[(i.prop = e)] = i),
          s.targetTest && (Pt.push(i), (ti[e] = 1)),
          (e = (e === "css" ? "CSS" : e.charAt(0).toUpperCase() + e.substr(1)) + "Plugin");
      }
      is(e, i), s.register && s.register(oe, i, X);
    },
    O = 255,
    pt = {
      aqua: [0, O, O],
      lime: [0, O, 0],
      silver: [192, 192, 192],
      black: [0, 0, 0],
      maroon: [128, 0, 0],
      teal: [0, 128, 128],
      blue: [0, 0, O],
      navy: [0, 0, 128],
      white: [O, O, O],
      olive: [128, 128, 0],
      yellow: [O, O, 0],
      orange: [O, 165, 0],
      gray: [128, 128, 128],
      purple: [128, 0, 128],
      green: [0, 128, 0],
      red: [O, 0, 0],
      pink: [O, 192, 203],
      cyan: [0, O, O],
      transparent: [O, O, O, 0],
    },
    pi = (s, e, t) => (
      (s = s < 0 ? s + 1 : s > 1 ? s - 1 : s),
      ((s * 6 < 1
        ? e + (t - e) * s * 6
        : s < 0.5
        ? t
        : s * 3 < 2
        ? e + (t - e) * (2 / 3 - s) * 6
        : e) *
        O +
        0.5) |
        0
    ),
    Ms = (s, e, t) => {
      let i = s ? (ue(s) ? [s >> 16, (s >> 8) & O, s & O] : 0) : pt.black,
        r,
        a,
        n,
        o,
        l,
        h,
        d,
        c,
        p,
        f;
      if (!i) {
        if ((s.substr(-1) === "," && (s = s.substr(0, s.length - 1)), pt[s])) i = pt[s];
        else if (s.charAt(0) === "#") {
          if (
            (s.length < 6 &&
              ((r = s.charAt(1)),
              (a = s.charAt(2)),
              (n = s.charAt(3)),
              (s =
                "#" + r + r + a + a + n + n + (s.length === 5 ? s.charAt(4) + s.charAt(4) : ""))),
            s.length === 9)
          )
            return (
              (i = parseInt(s.substr(1, 6), 16)),
              [i >> 16, (i >> 8) & O, i & O, parseInt(s.substr(7), 16) / 255]
            );
          (s = parseInt(s.substr(1), 16)), (i = [s >> 16, (s >> 8) & O, s & O]);
        } else if (s.substr(0, 3) === "hsl") {
          if (((i = f = s.match(Zt)), !e))
            (o = (+i[0] % 360) / 360),
              (l = +i[1] / 100),
              (h = +i[2] / 100),
              (a = h <= 0.5 ? h * (l + 1) : h + l - h * l),
              (r = h * 2 - a),
              i.length > 3 && (i[3] *= 1),
              (i[0] = pi(o + 1 / 3, r, a)),
              (i[1] = pi(o, r, a)),
              (i[2] = pi(o - 1 / 3, r, a));
          else if (~s.indexOf("=")) return (i = s.match(Kt)), t && i.length < 4 && (i[3] = 1), i;
        } else i = s.match(Zt) || pt.transparent;
        i = i.map(Number);
      }
      return (
        e &&
          !f &&
          ((r = i[0] / O),
          (a = i[1] / O),
          (n = i[2] / O),
          (d = Math.max(r, a, n)),
          (c = Math.min(r, a, n)),
          (h = (d + c) / 2),
          d === c
            ? (o = l = 0)
            : ((p = d - c),
              (l = h > 0.5 ? p / (2 - d - c) : p / (d + c)),
              (o =
                d === r
                  ? (a - n) / p + (a < n ? 6 : 0)
                  : d === a
                  ? (n - r) / p + 2
                  : (r - a) / p + 4),
              (o *= 60)),
          (i[0] = ~~(o + 0.5)),
          (i[1] = ~~(l * 100 + 0.5)),
          (i[2] = ~~(h * 100 + 0.5))),
        t && i.length < 4 && (i[3] = 1),
        i
      );
    },
    Es = (s) => {
      let e = [],
        t = [],
        i = -1;
      return (
        s.split(tt).forEach((r) => {
          let a = r.match(Be) || [];
          e.push(...a), t.push((i += a.length + 1));
        }),
        (e.c = t),
        e
      );
    },
    Ds = (s, e, t) => {
      let i = "",
        r = (s + i).match(tt),
        a = e ? "hsla(" : "rgba(",
        n = 0,
        o,
        l,
        h,
        d;
      if (!r) return s;
      if (
        ((r = r.map(
          (c) =>
            (c = Ms(c, e, 1)) &&
            a + (e ? c[0] + "," + c[1] + "%," + c[2] + "%," + c[3] : c.join(",")) + ")"
        )),
        t && ((h = Es(s)), (o = t.c), o.join(i) !== h.c.join(i)))
      )
        for (l = s.replace(tt, "1").split(Be), d = l.length - 1; n < d; n++)
          i +=
            l[n] +
            (~o.indexOf(n)
              ? r.shift() || a + "0,0,0,0)"
              : (h.length ? h : r.length ? r : t).shift());
      if (!l) for (l = s.split(tt), d = l.length - 1; n < d; n++) i += l[n] + r[n];
      return i + l[d];
    },
    tt = (function () {
      let s = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",
        e;
      for (e in pt) s += "|" + e + "\\b";
      return new RegExp(s + ")", "gi");
    })(),
    Yr = /hsl[a]?\(/,
    gi = (s) => {
      let e = s.join(" "),
        t;
      if (((tt.lastIndex = 0), tt.test(e)))
        return (t = Yr.test(e)), (s[1] = Ds(s[1], t)), (s[0] = Ds(s[0], t, Es(s[1]))), !0;
    },
    At,
    ie = (function () {
      let s = Date.now,
        e = 500,
        t = 33,
        i = s(),
        r = i,
        a = 1e3 / 240,
        n = a,
        o = [],
        l,
        h,
        d,
        c,
        p,
        f,
        u = (g) => {
          let _ = s() - r,
            v = g === !0,
            x,
            T,
            m,
            y;
          if (
            (_ > e && (i += _ - t),
            (r += _),
            (m = r - i),
            (x = m - n),
            (x > 0 || v) &&
              ((y = ++c.frame),
              (p = m - c.time * 1e3),
              (c.time = m = m / 1e3),
              (n += x + (x >= a ? 4 : a - x)),
              (T = 1)),
            v || (l = h(u)),
            T)
          )
            for (f = 0; f < o.length; f++) o[f](m, p, y, g);
        };
      return (
        (c = {
          time: 0,
          frame: 0,
          tick() {
            u(!0);
          },
          deltaRatio(g) {
            return p / (1e3 / (g || 60));
          },
          wake() {
            $i &&
              (!ei &&
                qi() &&
                ((me = ei = window),
                (Ji = me.document || {}),
                (te.gsap = oe),
                (me.gsapVersions || (me.gsapVersions = [])).push(oe.version),
                es(wt || me.GreenSockGlobals || (!me.gsap && me) || {}),
                (d = me.requestAnimationFrame)),
              l && c.sleep(),
              (h = d || ((g) => setTimeout(g, (n - c.time * 1e3 + 1) | 0))),
              (At = 1),
              u(2));
          },
          sleep() {
            (d ? me.cancelAnimationFrame : clearTimeout)(l), (At = 0), (h = lt);
          },
          lagSmoothing(g, _) {
            (e = g || 1 / D), (t = Math.min(_, e, 0));
          },
          fps(g) {
            (a = 1e3 / (g || 240)), (n = c.time * 1e3 + a);
          },
          add(g) {
            o.indexOf(g) < 0 && o.push(g), Je();
          },
          remove(g) {
            let _;
            ~(_ = o.indexOf(g)) && o.splice(_, 1) && f >= _ && f--;
          },
          _listeners: o,
        }),
        c
      );
    })(),
    Je = () => !At && ie.wake(),
    Y = {},
    qr = /^[\d.\-M][\d.\-,\s]/,
    Qr = /["']/g,
    Zr = (s) => {
      let e = {},
        t = s.substr(1, s.length - 3).split(":"),
        i = t[0],
        r = 1,
        a = t.length,
        n,
        o,
        l;
      for (; r < a; r++)
        (o = t[r]),
          (n = r !== a - 1 ? o.lastIndexOf(",") : o.length),
          (l = o.substr(0, n)),
          (e[i] = isNaN(l) ? l.replace(Qr, "").trim() : +l),
          (i = o.substr(n + 1).trim());
      return e;
    },
    Kr = (s) => {
      let e = s.indexOf("(") + 1,
        t = s.indexOf(")"),
        i = s.indexOf("(", e);
      return s.substring(e, ~i && i < t ? s.indexOf(")", t + 1) : t);
    },
    Jr = (s) => {
      let e = (s + "").split("("),
        t = Y[e[0]];
      return t && e.length > 1 && t.config
        ? t.config.apply(null, ~s.indexOf("{") ? [Zr(e[1])] : Kr(s).split(",").map(ns))
        : Y._CE && qr.test(s)
        ? Y._CE("", s)
        : t;
    },
    xs = (s) => (e) => 1 - s(1 - e),
    kt = (s, e) => {
      let t = s._first,
        i;
      for (; t; )
        t instanceof G
          ? kt(t, e)
          : t.vars.yoyoEase &&
            (!t._yoyo || !t._repeat) &&
            t._yoyo !== e &&
            (t.timeline
              ? kt(t.timeline, e)
              : ((i = t._ease), (t._ease = t._yEase), (t._yEase = i), (t._yoyo = e))),
          (t = t._next);
    },
    $e = (s, e) => (s && (W(s) ? s : Y[s] || Jr(s))) || e,
    We = (
      s,
      e,
      t = (r) => 1 - e(1 - r),
      i = (r) => (r < 0.5 ? e(r * 2) / 2 : 1 - e((1 - r) * 2) / 2)
    ) => {
      let r = { easeIn: e, easeOut: t, easeInOut: i },
        a;
      return (
        J(s, (n) => {
          (Y[n] = te[n] = r), (Y[(a = n.toLowerCase())] = t);
          for (let o in r)
            Y[a + (o === "easeIn" ? ".in" : o === "easeOut" ? ".out" : ".inOut")] = Y[n + "." + o] =
              r[o];
        }),
        r
      );
    },
    Ls = (s) => (e) => e < 0.5 ? (1 - s(1 - e * 2)) / 2 : 0.5 + s((e - 0.5) * 2) / 2,
    Ot = (s, e, t) => {
      let i = e >= 1 ? e : 1,
        r = (t || (s ? 0.3 : 0.45)) / (e < 1 ? e : 1),
        a = (r / Qt) * (Math.asin(1 / i) || 0),
        n = (l) => (l === 1 ? 1 : i * 2 ** (-10 * l) * Er((l - a) * r) + 1),
        o = s === "out" ? n : s === "in" ? (l) => 1 - n(1 - l) : Ls(n);
      return (r = Qt / r), (o.config = (l, h) => Ot(s, l, h)), o;
    },
    Ft = (s, e = 1.70158) => {
      let t = (r) => (r ? --r * r * ((e + 1) * r + e) + 1 : 0),
        i = s === "out" ? t : s === "in" ? (r) => 1 - t(1 - r) : Ls(t);
      return (i.config = (r) => Ft(s, r)), i;
    };
  J("Linear,Quad,Cubic,Quart,Quint,Strong", (s, e) => {
    let t = e < 5 ? e + 1 : e;
    We(
      s + ",Power" + (t - 1),
      e ? (i) => i ** t : (i) => i,
      (i) => 1 - (1 - i) ** t,
      (i) => (i < 0.5 ? (i * 2) ** t / 2 : 1 - ((1 - i) * 2) ** t / 2)
    );
  });
  Y.Linear.easeNone = Y.none = Y.Linear.easeIn;
  We("Elastic", Ot("in"), Ot("out"), Ot());
  ((s, e) => {
    let t = 1 / e,
      i = 2 * t,
      r = 2.5 * t,
      a = (n) =>
        n < t
          ? s * n * n
          : n < i
          ? s * (n - 1.5 / e) ** 2 + 0.75
          : n < r
          ? s * (n -= 2.25 / e) * n + 0.9375
          : s * (n - 2.625 / e) ** 2 + 0.984375;
    We("Bounce", (n) => 1 - a(1 - n), a);
  })(7.5625, 2.75);
  We("Expo", (s) => (s ? 2 ** (10 * (s - 1)) : 0));
  We("Circ", (s) => -(Yi(1 - s * s) - 1));
  We("Sine", (s) => (s === 1 ? 1 : -Mr(s * Sr) + 1));
  We("Back", Ft("in"), Ft("out"), Ft());
  Y.SteppedEase =
    Y.steps =
    te.SteppedEase =
      {
        config(s = 1, e) {
          let t = 1 / s,
            i = s + (e ? 0 : 1),
            r = e ? 1 : 0,
            a = 1 - D;
          return (n) => (((i * ut(0, a, n)) | 0) + r) * t;
        },
      };
  qe.ease = Y["quad.out"];
  J(
    "onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",
    (s) => (ri += s + "," + s + "Params,")
  );
  var Rt = class {
      constructor(e, t) {
        (this.id = Cr++),
          (e._gsap = this),
          (this.target = e),
          (this.harness = t),
          (this.get = t ? t.get : ni),
          (this.set = t ? t.getSetter : Lt);
      }
    },
    it = class {
      constructor(e, t) {
        let i = e.parent || B;
        (this.vars = e),
          (this._delay = +e.delay || 0),
          (this._repeat = e.repeat === Infinity ? -2 : e.repeat || 0) &&
            ((this._rDelay = e.repeatDelay || 0), (this._yoyo = !!e.yoyo || !!e.yoyoEase)),
          (this._ts = 1),
          Ke(this, +e.duration, 1, 1),
          (this.data = e.data),
          At || ie.wake(),
          i && Pe(i, this, t || t === 0 ? t : i._time, 1),
          e.reversed && this.reverse(),
          e.paused && this.paused(!0);
      }
      delay(e) {
        return e || e === 0
          ? (this.parent &&
              this.parent.smoothChildTiming &&
              this.startTime(this._start + e - this._delay),
            (this._delay = e),
            this)
          : this._delay;
      }
      duration(e) {
        return arguments.length
          ? this.totalDuration(this._repeat > 0 ? e + (e + this._rDelay) * this._repeat : e)
          : this.totalDuration() && this._dur;
      }
      totalDuration(e) {
        return arguments.length
          ? ((this._dirty = 0),
            Ke(this, this._repeat < 0 ? e : (e - this._repeat * this._rDelay) / (this._repeat + 1)))
          : this._tDur;
      }
      totalTime(e, t) {
        if ((Je(), !arguments.length)) return this._tTime;
        let i = this._dp;
        if (i && i.smoothChildTiming && this._ts) {
          for (ds(this, e), !i._dp || i.parent || Dt(i, this); i.parent; )
            i.parent._time !==
              i._start +
                (i._ts >= 0 ? i._tTime / i._ts : (i.totalDuration() - i._tTime) / -i._ts) &&
              i.totalTime(i._tTime, !0),
              (i = i.parent);
          !this.parent &&
            this._dp.autoRemoveChildren &&
            ((this._ts > 0 && e < this._tDur) || (this._ts < 0 && e > 0) || (!this._tDur && !e)) &&
            Pe(this._dp, this, this._start - this._delay);
        }
        return (
          (this._tTime !== e ||
            (!this._dur && !t) ||
            (this._initted && Math.abs(this._zTime) === D) ||
            (!e && !this._initted && (this.add || this._ptLookup))) &&
            (this._ts || (this._pTime = e), as(this, e, t)),
          this
        );
      }
      time(e, t) {
        return arguments.length
          ? this.totalTime(
              Math.min(this.totalDuration(), e + ls(this)) % this._dur || (e ? this._dur : 0),
              t
            )
          : this._time;
      }
      totalProgress(e, t) {
        return arguments.length
          ? this.totalTime(this.totalDuration() * e, t)
          : this.totalDuration()
          ? Math.min(1, this._tTime / this._tDur)
          : this.ratio;
      }
      progress(e, t) {
        return arguments.length
          ? this.totalTime(
              this.duration() * (this._yoyo && !(this.iteration() & 1) ? 1 - e : e) + ls(this),
              t
            )
          : this.duration()
          ? Math.min(1, this._time / this._dur)
          : this.ratio;
      }
      iteration(e, t) {
        let i = this.duration() + this._rDelay;
        return arguments.length
          ? this.totalTime(this._time + (e - 1) * i, t)
          : this._repeat
          ? Ze(this._tTime, i) + 1
          : 1;
      }
      timeScale(e) {
        if (!arguments.length) return this._rts === -D ? 0 : this._rts;
        if (this._rts === e) return this;
        let t = this.parent && this._ts ? Et(this.parent._time, this) : this._tTime;
        return (
          (this._rts = +e || 0),
          (this._ts = this._ps || e === -D ? 0 : this._rts),
          Fr(this.totalTime(ut(-this._delay, this._tDur, t), !0))
        );
      }
      paused(e) {
        return arguments.length
          ? (this._ps !== e &&
              ((this._ps = e),
              e
                ? ((this._pTime = this._tTime || Math.max(-this._delay, this.rawTime())),
                  (this._ts = this._act = 0))
                : (Je(),
                  (this._ts = this._rts),
                  this.totalTime(
                    this.parent && !this.parent.smoothChildTiming
                      ? this.rawTime()
                      : this._tTime || this._pTime,
                    this.progress() === 1 && (this._tTime -= D) && Math.abs(this._zTime) !== D
                  ))),
            this)
          : this._ps;
      }
      startTime(e) {
        if (arguments.length) {
          this._start = e;
          let t = this.parent || this._dp;
          return t && (t._sort || !this.parent) && Pe(t, this, e - this._delay), this;
        }
        return this._start;
      }
      endTime(e) {
        return this._start + (Z(e) ? this.totalDuration() : this.duration()) / Math.abs(this._ts);
      }
      rawTime(e) {
        let t = this.parent || this._dp;
        return t
          ? e && (!this._ts || (this._repeat && this._time && this.totalProgress() < 1))
            ? this._tTime % (this._dur + this._rDelay)
            : this._ts
            ? Et(t.rawTime(e), this)
            : this._tTime
          : this._tTime;
      }
      globalTime(e) {
        let t = this,
          i = arguments.length ? e : t.rawTime();
        for (; t; ) (i = t._start + i / (t._ts || 1)), (t = t._dp);
        return i;
      }
      repeat(e) {
        return arguments.length
          ? ((this._repeat = e === Infinity ? -2 : e), gs(this))
          : this._repeat === -2
          ? Infinity
          : this._repeat;
      }
      repeatDelay(e) {
        return arguments.length ? ((this._rDelay = e), gs(this)) : this._rDelay;
      }
      yoyo(e) {
        return arguments.length ? ((this._yoyo = e), this) : this._yoyo;
      }
      seek(e, t) {
        return this.totalTime(H(this, e), Z(t));
      }
      restart(e, t) {
        return this.play().totalTime(e ? -this._delay : 0, Z(t));
      }
      play(e, t) {
        return e != null && this.seek(e, t), this.reversed(!1).paused(!1);
      }
      reverse(e, t) {
        return e != null && this.seek(e || this.totalDuration(), t), this.reversed(!0).paused(!1);
      }
      pause(e, t) {
        return e != null && this.seek(e, t), this.paused(!0);
      }
      resume() {
        return this.paused(!1);
      }
      reversed(e) {
        return arguments.length
          ? (!!e !== this.reversed() && this.timeScale(-this._rts || (e ? -D : 0)), this)
          : this._rts < 0;
      }
      invalidate() {
        return (this._initted = this._act = 0), (this._zTime = -D), this;
      }
      isActive() {
        let e = this.parent || this._dp,
          t = this._start,
          i;
        return !!(
          !e ||
          (this._ts &&
            this._initted &&
            e.isActive() &&
            (i = e.rawTime(!0)) >= t &&
            i < this.endTime(!0) - D)
        );
      }
      eventCallback(e, t, i) {
        let r = this.vars;
        return arguments.length > 1
          ? (t
              ? ((r[e] = t), i && (r[e + "Params"] = i), e === "onUpdate" && (this._onUpdate = t))
              : delete r[e],
            this)
          : r[e];
      }
      then(e) {
        let t = this;
        return new Promise((i) => {
          let r = W(e) ? e : os,
            a = () => {
              let n = t.then;
              (t.then = null),
                W(r) && (r = r(t)) && (r.then || r === t) && (t.then = n),
                i(r),
                (t.then = n);
            };
          (t._initted && t.totalProgress() === 1 && t._ts >= 0) || (!t._tTime && t._ts < 0)
            ? a()
            : (t._prom = a);
        });
      }
      kill() {
        ft(this);
      }
    };
  he(it.prototype, {
    _time: 0,
    _start: 0,
    _end: 0,
    _tTime: 0,
    _tDur: 0,
    _dirty: 0,
    _repeat: 0,
    _yoyo: !1,
    parent: null,
    _initted: !1,
    _rDelay: 0,
    _ts: 1,
    _dp: 0,
    ratio: 0,
    _zTime: -D,
    _prom: 0,
    _ps: !1,
    _rts: 1,
  });
  var G = class extends it {
    constructor(e = {}, t) {
      super(e, t);
      (this.labels = {}),
        (this.smoothChildTiming = !!e.smoothChildTiming),
        (this.autoRemoveChildren = !!e.autoRemoveChildren),
        (this._sort = Z(e.sortChildren)),
        this.parent && Dt(this.parent, this),
        e.scrollTrigger && us(this, e.scrollTrigger);
    }
    to(e, t, i) {
      return new L(e, dt(arguments, 0, this), H(this, ue(t) ? arguments[3] : i)), this;
    }
    from(e, t, i) {
      return new L(e, dt(arguments, 1, this), H(this, ue(t) ? arguments[3] : i)), this;
    }
    fromTo(e, t, i, r) {
      return new L(e, dt(arguments, 2, this), H(this, ue(t) ? arguments[4] : r)), this;
    }
    set(e, t, i) {
      return (
        (t.duration = 0),
        (t.parent = this),
        Ct(t).repeatDelay || (t.repeat = 0),
        (t.immediateRender = !!t.immediateRender),
        new L(e, t, H(this, i), 1),
        this
      );
    }
    call(e, t, i) {
      return Pe(this, L.delayedCall(0, e, t), H(this, i));
    }
    staggerTo(e, t, i, r, a, n, o) {
      return (
        (i.duration = t),
        (i.stagger = i.stagger || r),
        (i.onComplete = n),
        (i.onCompleteParams = o),
        (i.parent = this),
        new L(e, i, H(this, a)),
        this
      );
    }
    staggerFrom(e, t, i, r, a, n, o) {
      return (
        (i.runBackwards = 1),
        (Ct(i).immediateRender = Z(i.immediateRender)),
        this.staggerTo(e, t, i, r, a, n, o)
      );
    }
    staggerFromTo(e, t, i, r, a, n, o, l) {
      return (
        (r.startAt = i),
        (Ct(r).immediateRender = Z(r.immediateRender)),
        this.staggerTo(e, t, r, a, n, o, l)
      );
    }
    render(e, t, i) {
      let r = this._time,
        a = this._dirty ? this.totalDuration() : this._tDur,
        n = this._dur,
        o = this !== B && e > a - D && e >= 0 ? a : e < D ? 0 : e,
        l = this._zTime < 0 != e < 0 && (this._initted || !n),
        h,
        d,
        c,
        p,
        f,
        u,
        g,
        _,
        v,
        x,
        T,
        m;
      if (o !== this._tTime || i || l) {
        if (
          (r !== this._time && n && ((o += this._time - r), (e += this._time - r)),
          (h = o),
          (v = this._start),
          (_ = this._ts),
          (u = !_),
          l && (n || (r = this._zTime), (e || !t) && (this._zTime = e)),
          this._repeat)
        ) {
          if (((T = this._yoyo), (f = n + this._rDelay), this._repeat < -1 && e < 0))
            return this.totalTime(f * 100 + e, t, i);
          if (
            ((h = S(o % f)),
            o === a
              ? ((p = this._repeat), (h = n))
              : ((p = ~~(o / f)), p && p === o / f && ((h = n), p--), h > n && (h = n)),
            (x = Ze(this._tTime, f)),
            !r && this._tTime && x !== p && (x = p),
            T && p & 1 && ((h = n - h), (m = 1)),
            p !== x && !this._lock)
          ) {
            let y = T && x & 1,
              w = y === (T && p & 1);
            if (
              (p < x && (y = !y),
              (r = y ? 0 : n),
              (this._lock = 1),
              (this.render(r || (m ? 0 : S(p * f)), t, !n)._lock = 0),
              !t && this.parent && se(this, "onRepeat"),
              this.vars.repeatRefresh && !m && (this.invalidate()._lock = 1),
              r !== this._time || u !== !this._ts)
            )
              return this;
            if (
              ((n = this._dur),
              (a = this._tDur),
              w &&
                ((this._lock = 2),
                (r = y ? n : -1e-4),
                this.render(r, !0),
                this.vars.repeatRefresh && !m && this.invalidate()),
              (this._lock = 0),
              !this._ts && !u)
            )
              return this;
            kt(this, m);
          }
        }
        if (
          (this._hasPause &&
            !this._forcing &&
            this._lock < 2 &&
            ((g = zr(this, S(r), S(h))), g && (o -= h - (h = g._start))),
          (this._tTime = o),
          (this._time = h),
          (this._act = !_),
          this._initted ||
            ((this._onUpdate = this.vars.onUpdate),
            (this._initted = 1),
            (this._zTime = e),
            (r = 0)),
          !r && (h || (!n && e >= 0)) && !t && se(this, "onStart"),
          h >= r && e >= 0)
        )
          for (d = this._first; d; ) {
            if (((c = d._next), (d._act || h >= d._start) && d._ts && g !== d)) {
              if (d.parent !== this) return this.render(e, t, i);
              if (
                (d.render(
                  d._ts > 0
                    ? (h - d._start) * d._ts
                    : (d._dirty ? d.totalDuration() : d._tDur) + (h - d._start) * d._ts,
                  t,
                  i
                ),
                h !== this._time || (!this._ts && !u))
              ) {
                (g = 0), c && (o += this._zTime = -D);
                break;
              }
            }
            d = c;
          }
        else {
          d = this._last;
          let y = e < 0 ? e : h;
          for (; d; ) {
            if (((c = d._prev), (d._act || y <= d._end) && d._ts && g !== d)) {
              if (d.parent !== this) return this.render(e, t, i);
              if (
                (d.render(
                  d._ts > 0
                    ? (y - d._start) * d._ts
                    : (d._dirty ? d.totalDuration() : d._tDur) + (y - d._start) * d._ts,
                  t,
                  i
                ),
                h !== this._time || (!this._ts && !u))
              ) {
                (g = 0), c && (o += this._zTime = y ? -D : D);
                break;
              }
            }
            d = c;
          }
        }
        if (
          g &&
          !t &&
          (this.pause(), (g.render(h >= r ? 0 : -D)._zTime = h >= r ? 1 : -1), this._ts)
        )
          return (this._start = v), li(this), this.render(e, t, i);
        this._onUpdate && !t && se(this, "onUpdate", !0),
          ((o === a && a >= this.totalDuration()) || (!o && r)) &&
            (v === this._start || Math.abs(_) !== Math.abs(this._ts)) &&
            (this._lock ||
              ((e || !n) && ((o === a && this._ts > 0) || (!o && this._ts < 0)) && De(this, 1),
              !t &&
                !(e < 0 && !r) &&
                (o || r) &&
                (se(this, o === a ? "onComplete" : "onReverseComplete", !0),
                this._prom && !(o < a && this.timeScale() > 0) && this._prom())));
      }
      return this;
    }
    add(e, t) {
      if ((ue(t) || (t = H(this, t)), !(e instanceof it))) {
        if (ne(e)) return e.forEach((i) => this.add(i, t)), this;
        if (j(e)) return this.addLabel(e, t);
        if (W(e)) e = L.delayedCall(0, e);
        else return this;
      }
      return this !== e ? Pe(this, e, t) : this;
    }
    getChildren(e = !0, t = !0, i = !0, r = -_e) {
      let a = [],
        n = this._first;
      for (; n; )
        n._start >= r &&
          (n instanceof L
            ? t && a.push(n)
            : (i && a.push(n), e && a.push(...n.getChildren(!0, t, i)))),
          (n = n._next);
      return a;
    }
    getById(e) {
      let t = this.getChildren(1, 1, 1),
        i = t.length;
      for (; i--; ) if (t[i].vars.id === e) return t[i];
    }
    remove(e) {
      return j(e)
        ? this.removeLabel(e)
        : W(e)
        ? this.killTweensOf(e)
        : (Mt(this, e), e === this._recent && (this._recent = this._last), Ne(this));
    }
    totalTime(e, t) {
      return arguments.length
        ? ((this._forcing = 1),
          !this._dp &&
            this._ts &&
            (this._start = S(
              ie.time - (this._ts > 0 ? e / this._ts : (this.totalDuration() - e) / -this._ts)
            )),
          super.totalTime(e, t),
          (this._forcing = 0),
          this)
        : this._tTime;
    }
    addLabel(e, t) {
      return (this.labels[e] = H(this, t)), this;
    }
    removeLabel(e) {
      return delete this.labels[e], this;
    }
    addPause(e, t, i) {
      let r = L.delayedCall(0, t || lt, i);
      return (r.data = "isPause"), (this._hasPause = 1), Pe(this, r, H(this, e));
    }
    removePause(e) {
      let t = this._first;
      for (e = H(this, e); t; ) t._start === e && t.data === "isPause" && De(t), (t = t._next);
    }
    killTweensOf(e, t, i) {
      let r = this.getTweensOf(e, i),
        a = r.length;
      for (; a--; ) Ae !== r[a] && r[a].kill(e, t);
      return this;
    }
    getTweensOf(e, t) {
      let i = [],
        r = xe(e),
        a = this._first,
        n = ue(t),
        o;
      for (; a; )
        a instanceof L
          ? Lr(a._targets, r) &&
            (n
              ? (!Ae || (a._initted && a._ts)) &&
                a.globalTime(0) <= t &&
                a.globalTime(a.totalDuration()) > t
              : !t || a.isActive()) &&
            i.push(a)
          : (o = a.getTweensOf(r, t)).length && i.push(...o),
          (a = a._next);
      return i;
    }
    tweenTo(e, t) {
      t = t || {};
      let i = this,
        r = H(i, e),
        { startAt: a, onStart: n, onStartParams: o, immediateRender: l } = t,
        h = L.to(
          i,
          he(
            {
              ease: "none",
              lazy: !1,
              immediateRender: !1,
              time: r,
              overwrite: "auto",
              duration:
                t.duration ||
                Math.abs((r - (a && "time" in a ? a.time : i._time)) / i.timeScale()) ||
                D,
              onStart: () => {
                i.pause();
                let d = t.duration || Math.abs((r - i._time) / i.timeScale());
                h._dur !== d && Ke(h, d, 0, 1).render(h._time, !0, !0), n && n.apply(h, o || []);
              },
            },
            t
          )
        );
      return l ? h.render(0) : h;
    }
    tweenFromTo(e, t, i) {
      return this.tweenTo(t, he({ startAt: { time: H(this, e) } }, i));
    }
    recent() {
      return this._recent;
    }
    nextLabel(e = this._time) {
      return Cs(this, H(this, e));
    }
    previousLabel(e = this._time) {
      return Cs(this, H(this, e), 1);
    }
    currentLabel(e) {
      return arguments.length ? this.seek(e, !0) : this.previousLabel(this._time + D);
    }
    shiftChildren(e, t, i = 0) {
      let r = this._first,
        a = this.labels,
        n;
      for (; r; ) r._start >= i && ((r._start += e), (r._end += e)), (r = r._next);
      if (t) for (n in a) a[n] >= i && (a[n] += e);
      return Ne(this);
    }
    invalidate() {
      let e = this._first;
      for (this._lock = 0; e; ) e.invalidate(), (e = e._next);
      return super.invalidate();
    }
    clear(e = !0) {
      let t = this._first,
        i;
      for (; t; ) (i = t._next), this.remove(t), (t = i);
      return (
        this._dp && (this._time = this._tTime = this._pTime = 0), e && (this.labels = {}), Ne(this)
      );
    }
    totalDuration(e) {
      let t = 0,
        i = this,
        r = i._last,
        a = _e,
        n,
        o,
        l;
      if (arguments.length)
        return i.timeScale(
          (i._repeat < 0 ? i.duration() : i.totalDuration()) / (i.reversed() ? -e : e)
        );
      if (i._dirty) {
        for (l = i.parent; r; )
          (n = r._prev),
            r._dirty && r.totalDuration(),
            (o = r._start),
            o > a && i._sort && r._ts && !i._lock
              ? ((i._lock = 1), (Pe(i, r, o - r._delay, 1)._lock = 0))
              : (a = o),
            o < 0 &&
              r._ts &&
              ((t -= o),
              ((!l && !i._dp) || (l && l.smoothChildTiming)) &&
                ((i._start += o / i._ts), (i._time -= o), (i._tTime -= o)),
              i.shiftChildren(-o, !1, -Infinity),
              (a = 0)),
            r._end > t && r._ts && (t = r._end),
            (r = n);
        Ke(i, i === B && i._time > t ? i._time : t, 1, 1), (i._dirty = 0);
      }
      return i._tDur;
    }
    static updateRoot(e) {
      if ((B._ts && (as(B, Et(e, B)), (ss = ie.frame)), ie.frame >= rs)) {
        rs += q.autoSleep || 120;
        let t = B._first;
        if ((!t || !t._ts) && q.autoSleep && ie._listeners.length < 2) {
          for (; t && !t._ts; ) t = t._next;
          t || ie.sleep();
        }
      }
    }
  };
  he(G.prototype, { _lock: 0, _hasPause: 0, _forcing: 0 });
  var $r = function (s, e, t, i, r, a, n) {
      let o = new X(this._pt, s, e, 0, 1, _i, null, r),
        l = 0,
        h = 0,
        d,
        c,
        p,
        f,
        u,
        g,
        _,
        v;
      for (
        o.b = t,
          o.e = i,
          t += "",
          i += "",
          (_ = ~i.indexOf("random(")) && (i = ct(i)),
          a && ((v = [t, i]), a(v, s, e), (t = v[0]), (i = v[1])),
          c = t.match(Jt) || [];
        (d = Jt.exec(i));

      )
        (f = d[0]),
          (u = i.substring(l, d.index)),
          p ? (p = (p + 1) % 5) : u.substr(-5) === "rgba(" && (p = 1),
          f !== c[h++] &&
            ((g = parseFloat(c[h - 1]) || 0),
            (o._pt = {
              _next: o._pt,
              p: u || h === 1 ? u : ",",
              s: g,
              c:
                f.charAt(1) === "="
                  ? parseFloat(f.substr(2)) * (f.charAt(0) === "-" ? -1 : 1)
                  : parseFloat(f) - g,
              m: p && p < 4 ? Math.round : 0,
            }),
            (l = Jt.lastIndex));
      return (
        (o.c = l < i.length ? i.substring(l, i.length) : ""),
        (o.fp = n),
        ($t.test(i) || _) && (o.e = 0),
        (this._pt = o),
        o
      );
    },
    ci = function (s, e, t, i, r, a, n, o, l) {
      W(i) && (i = i(r || 0, s, a));
      let h = s[e],
        d =
          t !== "get"
            ? t
            : W(h)
            ? l
              ? s[e.indexOf("set") || !W(s["get" + e.substr(3)]) ? e : "get" + e.substr(3)](l)
              : s[e]()
            : h,
        c = W(h) ? (l ? ea : As) : mi,
        p;
      if (
        (j(i) &&
          (~i.indexOf("random(") && (i = ct(i)),
          i.charAt(1) === "=" &&
            (i =
              parseFloat(d) +
              parseFloat(i.substr(2)) * (i.charAt(0) === "-" ? -1 : 1) +
              ($(d) || 0))),
        d !== i)
      )
        return isNaN(d * i)
          ? (!h && !(e in s) && Tt(e, i), $r.call(this, s, e, d, i, c, o || q.stringFilter, l))
          : ((p = new X(
              this._pt,
              s,
              e,
              +d || 0,
              i - (d || 0),
              typeof h == "boolean" ? ta : ks,
              0,
              c
            )),
            l && (p.fp = l),
            n && p.modifier(n, this, s),
            (this._pt = p));
    },
    ia = (s, e, t, i, r) => {
      if ((W(s) && (s = gt(s, r, e, t, i)), !Te(s) || (s.style && s.nodeType) || ne(s) || Zi(s)))
        return j(s) ? gt(s, r, e, t, i) : s;
      let a = {},
        n;
      for (n in s) a[n] = gt(s[n], r, e, t, i);
      return a;
    },
    xi = (s, e, t, i, r, a) => {
      let n, o, l, h;
      if (
        K[s] &&
        (n = new K[s]()).init(r, n.rawVars ? e[s] : ia(e[s], i, r, a, t), t, i, a) !== !1 &&
        ((t._pt = o = new X(t._pt, r, s, 0, 1, n.render, n, 0, n.priority)), t !== et)
      )
        for (l = t._ptLookup[t._targets.indexOf(r)], h = n._props.length; h--; ) l[n._props[h]] = o;
      return n;
    },
    Ae,
    cs = (s, e) => {
      let t = s.vars,
        {
          ease: i,
          startAt: r,
          immediateRender: a,
          lazy: n,
          onUpdate: o,
          onUpdateParams: l,
          callbackScope: h,
          runBackwards: d,
          yoyoEase: c,
          keyframes: p,
          autoRevert: f,
        } = t,
        u = s._dur,
        g = s._startAt,
        _ = s._targets,
        v = s.parent,
        x = v && v.data === "nested" ? v.parent._targets : _,
        T = s._overwrite === "auto" && !qt,
        m = s.timeline,
        y,
        w,
        b,
        P,
        C,
        E,
        F,
        I,
        k,
        U,
        V,
        M,
        fe;
      if (
        (m && (!p || !i) && (i = "none"),
        (s._ease = $e(i, qe.ease)),
        (s._yEase = c ? xs($e(c === !0 ? i : c, qe.ease)) : 0),
        c && s._yoyo && !s._repeat && ((c = s._yEase), (s._yEase = s._ease), (s._ease = c)),
        !m)
      ) {
        if (
          ((I = _[0] ? Ee(_[0]).harness : 0),
          (M = I && t[I.prop]),
          (y = hi(t, ti)),
          g && g.render(-1, !0).kill(),
          r)
        ) {
          if (
            (De(
              (s._startAt = L.set(
                _,
                he(
                  {
                    data: "isStart",
                    overwrite: !1,
                    parent: v,
                    immediateRender: !0,
                    lazy: Z(n),
                    startAt: null,
                    delay: 0,
                    onUpdate: o,
                    onUpdateParams: l,
                    callbackScope: h,
                    stagger: 0,
                  },
                  r
                )
              ))
            ),
            a)
          ) {
            if (e > 0) f || (s._startAt = 0);
            else if (u && !(e < 0 && g)) {
              e && (s._zTime = e);
              return;
            }
          }
        } else if (d && u) {
          if (g) !f && (s._startAt = 0);
          else if (
            (e && (a = !1),
            (b = he(
              {
                overwrite: !1,
                data: "isFromStart",
                lazy: a && Z(n),
                immediateRender: a,
                stagger: 0,
                parent: v,
              },
              y
            )),
            M && (b[I.prop] = M),
            De((s._startAt = L.set(_, b))),
            !a)
          )
            cs(s._startAt, D);
          else if (!e) return;
        }
        for (s._pt = 0, n = (u && Z(n)) || (n && !u), w = 0; w < _.length; w++) {
          if (
            ((C = _[w]),
            (F = C._gsap || ai(_)[w]._gsap),
            (s._ptLookup[w] = U = {}),
            ii[F.id] && Me.length && St(),
            (V = x === _ ? w : x.indexOf(C)),
            I &&
              (k = new I()).init(C, M || y, s, V, x) !== !1 &&
              ((s._pt = P = new X(s._pt, C, k.name, 0, 1, k.render, k, 0, k.priority)),
              k._props.forEach((pe) => {
                U[pe] = P;
              }),
              k.priority && (E = 1)),
            !I || M)
          )
            for (b in y)
              K[b] && (k = xi(b, y, s, V, C, x))
                ? k.priority && (E = 1)
                : (U[b] = P = ci.call(s, C, b, "get", y[b], V, x, 0, t.stringFilter));
          s._op && s._op[w] && s.kill(C, s._op[w]),
            T &&
              s._pt &&
              ((Ae = s), B.killTweensOf(C, U, s.globalTime(0)), (fe = !s.parent), (Ae = 0)),
            s._pt && n && (ii[F.id] = 1);
        }
        E && yi(s), s._onInit && s._onInit(s);
      }
      (s._from = !m && !!t.runBackwards),
        (s._onUpdate = o),
        (s._initted = (!s._op || s._pt) && !fe);
    },
    sa = (s, e) => {
      let t = s[0] ? Ee(s[0]).harness : 0,
        i = t && t.aliases,
        r,
        a,
        n,
        o;
      if (!i) return e;
      r = Qe({}, e);
      for (a in i) if (a in r) for (o = i[a].split(","), n = o.length; n--; ) r[o[n]] = r[a];
      return r;
    },
    gt = (s, e, t, i, r) => (W(s) ? s.call(e, t, i, r) : j(s) && ~s.indexOf("random(") ? ct(s) : s),
    Os = ri + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase",
    ra = (Os + ",id,stagger,delay,duration,paused,scrollTrigger").split(","),
    L = class extends it {
      constructor(e, t, i, r) {
        typeof t == "number" && ((i.duration = t), (t = i), (i = null)), super(r ? t : Ct(t), i);
        let {
            duration: a,
            delay: n,
            immediateRender: o,
            stagger: l,
            overwrite: h,
            keyframes: d,
            defaults: c,
            scrollTrigger: p,
            yoyoEase: f,
          } = this.vars,
          u = this.parent,
          g = (ne(e) || Zi(e) ? ue(e[0]) : "length" in t) ? [e] : xe(e),
          _,
          v,
          x,
          T,
          m,
          y,
          w,
          b;
        if (
          ((this._targets = g.length
            ? ai(g)
            : ts("GSAP target " + e + " not found. https://greensock.com", !q.nullTargetWarn) ||
              []),
          (this._ptLookup = []),
          (this._overwrite = h),
          d || l || Qi(a) || Qi(n))
        ) {
          if (
            ((t = this.vars),
            (_ = this.timeline = new G({ data: "nested", defaults: c || {} })),
            _.kill(),
            (_.parent = _._dp = this),
            (_._start = 0),
            d)
          )
            he(_.vars.defaults, { ease: "none" }), d.forEach((P) => _.to(g, P, ">"));
          else {
            if (((T = g.length), (w = l ? ys(l) : lt), Te(l)))
              for (m in l) ~Os.indexOf(m) && (b || (b = {}), (b[m] = l[m]));
            for (v = 0; v < T; v++) {
              x = {};
              for (m in t) ra.indexOf(m) < 0 && (x[m] = t[m]);
              (x.stagger = 0),
                f && (x.yoyoEase = f),
                b && Qe(x, b),
                (y = g[v]),
                (x.duration = +gt(a, this, v, y, g)),
                (x.delay = (+gt(n, this, v, y, g) || 0) - this._delay),
                !l &&
                  T === 1 &&
                  x.delay &&
                  ((this._delay = n = x.delay), (this._start += n), (x.delay = 0)),
                _.to(y, x, w(v, y, g));
            }
            _.duration() ? (a = n = 0) : (this.timeline = 0);
          }
          a || this.duration((a = _.duration()));
        } else this.timeline = 0;
        h === !0 && !qt && ((Ae = this), B.killTweensOf(g), (Ae = 0)),
          u && Dt(u, this),
          (o ||
            (!a && !d && this._start === S(u._time) && Z(o) && hs(this) && u.data !== "nested")) &&
            ((this._tTime = -D), this.render(Math.max(0, -n))),
          p && us(this, p);
      }
      render(e, t, i) {
        let r = this._time,
          a = this._tDur,
          n = this._dur,
          o = e > a - D && e >= 0 ? a : e < D ? 0 : e,
          l,
          h,
          d,
          c,
          p,
          f,
          u,
          g,
          _;
        if (!n) Vr(this, e, t, i);
        else if (
          o !== this._tTime ||
          !e ||
          i ||
          (!this._initted && this._tTime) ||
          (this._startAt && this._zTime < 0 != e < 0)
        ) {
          if (((l = o), (g = this.timeline), this._repeat)) {
            if (((c = n + this._rDelay), this._repeat < -1 && e < 0))
              return this.totalTime(c * 100 + e, t, i);
            if (
              ((l = S(o % c)),
              o === a
                ? ((d = this._repeat), (l = n))
                : ((d = ~~(o / c)), d && d === o / c && ((l = n), d--), l > n && (l = n)),
              (f = this._yoyo && d & 1),
              f && ((_ = this._yEase), (l = n - l)),
              (p = Ze(this._tTime, c)),
              l === r && !i && this._initted)
            )
              return this;
            d !== p &&
              (g && this._yEase && kt(g, f),
              this.vars.repeatRefresh &&
                !f &&
                !this._lock &&
                ((this._lock = i = 1), (this.render(S(c * d), !0).invalidate()._lock = 0)));
          }
          if (!this._initted) {
            if (fs(this, e < 0 ? e : l, i, t)) return (this._tTime = 0), this;
            if (n !== this._dur) return this.render(e, t, i);
          }
          for (
            this._tTime = o,
              this._time = l,
              !this._act && this._ts && ((this._act = 1), (this._lazy = 0)),
              this.ratio = u = (_ || this._ease)(l / n),
              this._from && (this.ratio = u = 1 - u),
              l && !r && !t && se(this, "onStart"),
              h = this._pt;
            h;

          )
            h.r(u, h.d), (h = h._next);
          (g && g.render(e < 0 ? e : !l && f ? -D : g._dur * u, t, i)) ||
            (this._startAt && (this._zTime = e)),
            this._onUpdate &&
              !t &&
              (e < 0 && this._startAt && this._startAt.render(e, !0, i), se(this, "onUpdate")),
            this._repeat &&
              d !== p &&
              this.vars.onRepeat &&
              !t &&
              this.parent &&
              se(this, "onRepeat"),
            (o === this._tDur || !o) &&
              this._tTime === o &&
              (e < 0 && this._startAt && !this._onUpdate && this._startAt.render(e, !0, !0),
              (e || !n) &&
                ((o === this._tDur && this._ts > 0) || (!o && this._ts < 0)) &&
                De(this, 1),
              !t &&
                !(e < 0 && !r) &&
                (o || r) &&
                (se(this, o === a ? "onComplete" : "onReverseComplete", !0),
                this._prom && !(o < a && this.timeScale() > 0) && this._prom()));
        }
        return this;
      }
      targets() {
        return this._targets;
      }
      invalidate() {
        return (
          (this._pt = this._op = this._startAt = this._onUpdate = this._lazy = this.ratio = 0),
          (this._ptLookup = []),
          this.timeline && this.timeline.invalidate(),
          super.invalidate()
        );
      }
      kill(e, t = "all") {
        if (!e && (!t || t === "all"))
          return (this._lazy = this._pt = 0), this.parent ? ft(this) : this;
        if (this.timeline) {
          let u = this.timeline.totalDuration();
          return (
            this.timeline.killTweensOf(e, t, Ae && Ae.vars.overwrite !== !0)._first || ft(this),
            this.parent &&
              u !== this.timeline.totalDuration() &&
              Ke(this, (this._dur * this.timeline._tDur) / u, 0, 1),
            this
          );
        }
        let i = this._targets,
          r = e ? xe(e) : i,
          a = this._ptLookup,
          n = this._pt,
          o,
          l,
          h,
          d,
          c,
          p,
          f;
        if ((!t || t === "all") && kr(i, r)) return t === "all" && (this._pt = 0), ft(this);
        for (
          o = this._op = this._op || [],
            t !== "all" && (j(t) && ((c = {}), J(t, (u) => (c[u] = 1)), (t = c)), (t = sa(i, t))),
            f = i.length;
          f--;

        )
          if (~r.indexOf(i[f])) {
            (l = a[f]),
              t === "all" ? ((o[f] = t), (d = l), (h = {})) : ((h = o[f] = o[f] || {}), (d = t));
            for (c in d)
              (p = l && l[c]),
                p && ((!("kill" in p.d) || p.d.kill(c) === !0) && Mt(this, p, "_pt"), delete l[c]),
                h !== "all" && (h[c] = 1);
          }
        return this._initted && !this._pt && n && ft(this), this;
      }
      static to(e, t) {
        return new L(e, t, arguments[2]);
      }
      static from(e, t) {
        return new L(e, dt(arguments, 1));
      }
      static delayedCall(e, t, i, r) {
        return new L(t, 0, {
          immediateRender: !1,
          lazy: !1,
          overwrite: !1,
          delay: e,
          onComplete: t,
          onReverseComplete: t,
          onCompleteParams: i,
          onReverseCompleteParams: i,
          callbackScope: r,
        });
      }
      static fromTo(e, t, i) {
        return new L(e, dt(arguments, 2));
      }
      static set(e, t) {
        return (t.duration = 0), t.repeatDelay || (t.repeat = 0), new L(e, t);
      }
      static killTweensOf(e, t, i) {
        return B.killTweensOf(e, t, i);
      }
    };
  he(L.prototype, { _targets: [], _lazy: 0, _startAt: 0, _op: 0, _onInit: 0 });
  J("staggerTo,staggerFrom,staggerFromTo", (s) => {
    L[s] = function () {
      let e = new G(),
        t = di.call(arguments, 0);
      return t.splice(s === "staggerFromTo" ? 5 : 4, 0, 0), e[s].apply(e, t);
    };
  });
  var mi = (s, e, t) => (s[e] = t),
    As = (s, e, t) => s[e](t),
    ea = (s, e, t, i) => s[e](i.fp, t),
    aa = (s, e, t) => s.setAttribute(e, t),
    Lt = (s, e) => (W(s[e]) ? As : bt(s[e]) && s.setAttribute ? aa : mi),
    ks = (s, e) => e.set(e.t, e.p, Math.round((e.s + e.c * s) * 1e4) / 1e4, e),
    ta = (s, e) => e.set(e.t, e.p, !!(e.s + e.c * s), e),
    _i = function (s, e) {
      let t = e._pt,
        i = "";
      if (!s && e.b) i = e.b;
      else if (s === 1 && e.e) i = e.e;
      else {
        for (; t; )
          (i = t.p + (t.m ? t.m(t.s + t.c * s) : Math.round((t.s + t.c * s) * 1e4) / 1e4) + i),
            (t = t._next);
        i += e.c;
      }
      e.set(e.t, e.p, i, e);
    },
    fi = function (s, e) {
      let t = e._pt;
      for (; t; ) t.r(s, t.d), (t = t._next);
    },
    Gr = function (s, e, t, i) {
      let r = this._pt,
        a;
      for (; r; ) (a = r._next), r.p === i && r.modifier(s, e, t), (r = a);
    },
    Hr = function (s) {
      let e = this._pt,
        t,
        i;
      for (; e; )
        (i = e._next),
          (e.p === s && !e.op) || e.op === s ? Mt(this, e, "_pt") : e.dep || (t = 1),
          (e = i);
      return !t;
    },
    na = (s, e, t, i) => {
      i.mSet(s, e, i.m.call(i.tween, t, i.mt), i);
    },
    yi = (s) => {
      let e = s._pt,
        t,
        i,
        r,
        a;
      for (; e; ) {
        for (t = e._next, i = r; i && i.pr > e.pr; ) i = i._next;
        (e._prev = i ? i._prev : a) ? (e._prev._next = e) : (r = e),
          (e._next = i) ? (i._prev = e) : (a = e),
          (e = t);
      }
      s._pt = r;
    },
    X = class {
      constructor(e, t, i, r, a, n, o, l, h) {
        (this.t = t),
          (this.s = r),
          (this.c = a),
          (this.p = i),
          (this.r = n || ks),
          (this.d = o || this),
          (this.set = l || mi),
          (this.pr = h || 0),
          (this._next = e),
          e && (e._prev = this);
      }
      modifier(e, t, i) {
        (this.mSet = this.mSet || this.set),
          (this.set = na),
          (this.m = e),
          (this.mt = i),
          (this.tween = t);
      }
    };
  J(
    ri +
      "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger",
    (s) => (ti[s] = 1)
  );
  te.TweenMax = te.TweenLite = L;
  te.TimelineLite = te.TimelineMax = G;
  B = new G({
    sortChildren: !1,
    defaults: qe,
    autoRemoveChildren: !0,
    id: "root",
    smoothChildTiming: !0,
  });
  q.stringFilter = gi;
  var Vt = {
    registerPlugin(...s) {
      s.forEach((e) => Xr(e));
    },
    timeline(s) {
      return new G(s);
    },
    getTweensOf(s, e) {
      return B.getTweensOf(s, e);
    },
    getProperty(s, e, t, i) {
      j(s) && (s = xe(s)[0]);
      let r = Ee(s || {}).get,
        a = t ? os : ns;
      return (
        t === "native" && (t = ""),
        s &&
          (e
            ? a(((K[e] && K[e].get) || r)(s, e, t, i))
            : (n, o, l) => a(((K[n] && K[n].get) || r)(s, n, o, l)))
      );
    },
    quickSetter(s, e, t) {
      if (((s = xe(s)), s.length > 1)) {
        let o = s.map((h) => oe.quickSetter(h, e, t)),
          l = o.length;
        return (h) => {
          let d = l;
          for (; d--; ) o[d](h);
        };
      }
      s = s[0] || {};
      let i = K[e],
        r = Ee(s),
        a = (r.harness && (r.harness.aliases || {})[e]) || e,
        n = i
          ? (o) => {
              let l = new i();
              (et._pt = 0),
                l.init(s, t ? o + t : o, et, 0, [s]),
                l.render(1, l),
                et._pt && fi(1, et);
            }
          : r.set(s, a);
      return i ? n : (o) => n(s, a, t ? o + t : o, r, 1);
    },
    isTweening(s) {
      return B.getTweensOf(s, !0).length > 0;
    },
    defaults(s) {
      return s && s.ease && (s.ease = $e(s.ease, qe.ease)), oi(qe, s || {});
    },
    config(s) {
      return oi(q, s || {});
    },
    registerEffect({ name: s, effect: e, plugins: t, defaults: i, extendTimeline: r }) {
      (t || "")
        .split(",")
        .forEach((a) => a && !K[a] && !te[a] && ts(s + " effect requires " + a + " plugin.")),
        (si[s] = (a, n, o) => e(xe(a), he(n || {}, i), o)),
        r &&
          (G.prototype[s] = function (a, n, o) {
            return this.add(si[s](a, Te(n) ? n : (o = n) && {}, this), o);
          });
    },
    registerEase(s, e) {
      Y[s] = $e(e);
    },
    parseEase(s, e) {
      return arguments.length ? $e(s, e) : Y;
    },
    getById(s) {
      return B.getById(s);
    },
    exportRoot(s = {}, e) {
      let t = new G(s),
        i,
        r;
      for (
        t.smoothChildTiming = Z(s.smoothChildTiming),
          B.remove(t),
          t._dp = 0,
          t._time = t._tTime = B._time,
          i = B._first;
        i;

      )
        (r = i._next),
          (e || !(!i._dur && i instanceof L && i.vars.onComplete === i._targets[0])) &&
            Pe(t, i, i._start - i._delay),
          (i = r);
      return Pe(B, t, 0), t;
    },
    utils: {
      wrap: Ps,
      wrapYoyo: Rs,
      distribute: ys,
      random: bs,
      snap: vs,
      normalize: jr,
      getUnit: $,
      clamp: Ur,
      splitColor: Ms,
      toArray: xe,
      mapRange: ws,
      pipe: Nr,
      unitize: Wr,
      interpolate: Ss,
      shuffle: ms,
    },
    install: es,
    effects: si,
    ticker: ie,
    updateRoot: G.updateRoot,
    plugins: K,
    globalTimeline: B,
    core: {
      PropTween: X,
      globals: is,
      Tween: L,
      Timeline: G,
      Animation: it,
      getCache: Ee,
      _removeLinkedListItem: Mt,
      suppressOverwrites: (s) => (qt = s),
    },
  };
  J("to,from,fromTo,delayedCall,set,killTweensOf", (s) => (Vt[s] = L[s]));
  ie.add(G.updateRoot);
  et = Vt.to({}, { duration: 0 });
  var oa = (s, e) => {
      let t = s._pt;
      for (; t && t.p !== e && t.op !== e && t.fp !== e; ) t = t._next;
      return t;
    },
    ha = (s, e) => {
      let t = s._targets,
        i,
        r,
        a;
      for (i in e)
        for (r = t.length; r--; )
          (a = s._ptLookup[r][i]),
            a &&
              (a = a.d) &&
              (a._pt && (a = oa(a, i)), a && a.modifier && a.modifier(e[i], s, t[r], i));
    },
    vi = (s, e) => ({
      name: s,
      rawVars: 1,
      init(t, i, r) {
        r._onInit = (a) => {
          let n, o;
          if ((j(i) && ((n = {}), J(i, (l) => (n[l] = 1)), (i = n)), e)) {
            n = {};
            for (o in i) n[o] = e(i[o]);
            i = n;
          }
          ha(a, i);
        };
      },
    }),
    oe =
      Vt.registerPlugin(
        {
          name: "attr",
          init(s, e, t, i, r) {
            let a, n;
            for (a in e)
              (n = this.add(s, "setAttribute", (s.getAttribute(a) || 0) + "", e[a], i, r, 0, 0, a)),
                n && (n.op = a),
                this._props.push(a);
          },
        },
        {
          name: "endArray",
          init(s, e) {
            let t = e.length;
            for (; t--; ) this.add(s, t, s[t] || 0, e[t]);
          },
        },
        vi("roundProps", ui),
        vi("modifiers"),
        vi("snap", vs)
      ) || Vt;
  L.version = G.version = oe.version = "3.6.0";
  $i = 1;
  qi() && Je();
  var Fs,
    ye,
    st,
    bi,
    je,
    _t,
    Vs,
    la = () => typeof window != "undefined",
    ke = {},
    Ge = 180 / Math.PI,
    rt = Math.PI / 180,
    at = Math.atan2,
    zs = 1e8,
    Is = /([A-Z])/g,
    da = /(?:left|right|width|margin|padding|x)/i,
    ua = /[\s,\(]\S/,
    Oe = { autoAlpha: "opacity,visibility", scale: "scaleX,scaleY", alpha: "opacity" },
    Us = (s, e) => e.set(e.t, e.p, Math.round((e.s + e.c * s) * 1e4) / 1e4 + e.u, e),
    ca = (s, e) =>
      e.set(e.t, e.p, s === 1 ? e.e : Math.round((e.s + e.c * s) * 1e4) / 1e4 + e.u, e),
    fa = (s, e) => e.set(e.t, e.p, s ? Math.round((e.s + e.c * s) * 1e4) / 1e4 + e.u : e.b, e),
    pa = (s, e) => {
      let t = e.s + e.c * s;
      e.set(e.t, e.p, ~~(t + (t < 0 ? -0.5 : 0.5)) + e.u, e);
    },
    Bs = (s, e) => e.set(e.t, e.p, s ? e.e : e.b, e),
    Ns = (s, e) => e.set(e.t, e.p, s !== 1 ? e.b : e.e, e),
    ga = (s, e, t) => (s.style[e] = t),
    _a = (s, e, t) => s.style.setProperty(e, t),
    ma = (s, e, t) => (s._gsap[e] = t),
    xa = (s, e, t) => (s._gsap.scaleX = s._gsap.scaleY = t),
    ya = (s, e, t, i, r) => {
      let a = s._gsap;
      (a.scaleX = a.scaleY = t), a.renderTransform(r, a);
    },
    va = (s, e, t, i, r) => {
      let a = s._gsap;
      (a[e] = t), a.renderTransform(r, a);
    },
    re = "transform",
    Fe = re + "Origin",
    Ws,
    wi = (s, e) => {
      let t = ye.createElementNS
        ? ye.createElementNS((e || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), s)
        : ye.createElement(s);
      return t.style ? t : ye.createElement(s);
    },
    ve = (s, e, t) => {
      let i = getComputedStyle(s);
      return (
        i[e] ||
        i.getPropertyValue(e.replace(Is, "-$1").toLowerCase()) ||
        i.getPropertyValue(e) ||
        (!t && ve(s, nt(e) || e, 1)) ||
        ""
      );
    },
    js = "O,Moz,ms,Ms,Webkit".split(","),
    nt = (s, e, t) => {
      let i = e || je,
        r = i.style,
        a = 5;
      if (s in r && !t) return s;
      for (s = s.charAt(0).toUpperCase() + s.substr(1); a-- && !(js[a] + s in r); );
      return a < 0 ? null : (a === 3 ? "ms" : a >= 0 ? js[a] : "") + s;
    },
    Ti = () => {
      la() &&
        window.document &&
        ((Fs = window),
        (ye = Fs.document),
        (st = ye.documentElement),
        (je = wi("div") || { style: {} }),
        (_t = wi("div")),
        (re = nt(re)),
        (Fe = re + "Origin"),
        (je.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0"),
        (Ws = !!nt("perspective")),
        (bi = 1));
    },
    zt = function (s) {
      let e = wi(
          "svg",
          (this.ownerSVGElement && this.ownerSVGElement.getAttribute("xmlns")) ||
            "http://www.w3.org/2000/svg"
        ),
        t = this.parentNode,
        i = this.nextSibling,
        r = this.style.cssText,
        a;
      if ((st.appendChild(e), e.appendChild(this), (this.style.display = "block"), s))
        try {
          (a = this.getBBox()), (this._gsapBBox = this.getBBox), (this.getBBox = zt);
        } catch (n) {}
      else this._gsapBBox && (a = this._gsapBBox());
      return (
        t && (i ? t.insertBefore(this, i) : t.appendChild(this)),
        st.removeChild(e),
        (this.style.cssText = r),
        a
      );
    },
    Gs = (s, e) => {
      let t = e.length;
      for (; t--; ) if (s.hasAttribute(e[t])) return s.getAttribute(e[t]);
    },
    Hs = (s) => {
      let e;
      try {
        e = s.getBBox();
      } catch (t) {
        e = zt.call(s, !0);
      }
      return (
        (e && (e.width || e.height)) || s.getBBox === zt || (e = zt.call(s, !0)),
        e && !e.width && !e.x && !e.y
          ? {
              x: +Gs(s, ["x", "cx", "x1"]) || 0,
              y: +Gs(s, ["y", "cy", "y1"]) || 0,
              width: 0,
              height: 0,
            }
          : e
      );
    },
    Xs = (s) => !!(s.getCTM && (!s.parentNode || s.ownerSVGElement) && Hs(s)),
    It = (s, e) => {
      if (e) {
        let t = s.style;
        e in ke && e !== Fe && (e = re),
          t.removeProperty
            ? ((e.substr(0, 2) === "ms" || e.substr(0, 6) === "webkit") && (e = "-" + e),
              t.removeProperty(e.replace(Is, "-$1").toLowerCase()))
            : t.removeAttribute(e);
      }
    },
    Ve = (s, e, t, i, r, a) => {
      let n = new X(s._pt, e, t, 0, 1, a ? Ns : Bs);
      return (s._pt = n), (n.b = i), (n.e = r), s._props.push(t), n;
    },
    Ys = { deg: 1, rad: 1, turn: 1 },
    Re = (s, e, t, i) => {
      let r = parseFloat(t) || 0,
        a = (t + "").trim().substr((r + "").length) || "px",
        n = je.style,
        o = da.test(e),
        l = s.tagName.toLowerCase() === "svg",
        h = (l ? "client" : "offset") + (o ? "Width" : "Height"),
        d = 100,
        c = i === "px",
        p = i === "%",
        f,
        u,
        g,
        _;
      return i === a || !r || Ys[i] || Ys[a]
        ? r
        : (a !== "px" && !c && (r = Re(s, e, t, "px")),
          (_ = s.getCTM && Xs(s)),
          (p || a === "%") && (ke[e] || ~e.indexOf("adius"))
            ? ((f = _ ? s.getBBox()[o ? "width" : "height"] : s[h]),
              S(p ? (r / f) * d : (r / 100) * f))
            : ((n[o ? "width" : "height"] = d + (c ? a : i)),
              (u = ~e.indexOf("adius") || (i === "em" && s.appendChild && !l) ? s : s.parentNode),
              _ && (u = (s.ownerSVGElement || {}).parentNode),
              (!u || u === ye || !u.appendChild) && (u = ye.body),
              (g = u._gsap),
              g && p && g.width && o && g.time === ie.time
                ? S((r / g.width) * d)
                : ((p || a === "%") && (n.position = ve(s, "position")),
                  u === s && (n.position = "static"),
                  u.appendChild(je),
                  (f = je[h]),
                  u.removeChild(je),
                  (n.position = "absolute"),
                  o && p && ((g = Ee(u)), (g.time = ie.time), (g.width = u[h])),
                  S(c ? (f * r) / d : f && r ? (d / f) * r : 0))));
    },
    ot = (s, e, t, i) => {
      let r;
      return (
        bi || Ti(),
        e in Oe && e !== "transform" && ((e = Oe[e]), ~e.indexOf(",") && (e = e.split(",")[0])),
        ke[e] && e !== "transform"
          ? ((r = Bt(s, i)),
            (r = e !== "transformOrigin" ? r[e] : Nt(ve(s, Fe)) + " " + r.zOrigin + "px"))
          : ((r = s.style[e]),
            (!r || r === "auto" || i || ~(r + "").indexOf("calc(")) &&
              (r = (Ut[e] && Ut[e](s, e, t)) || ve(s, e) || ni(s, e) || (e === "opacity" ? 1 : 0))),
        t && !~(r + "").trim().indexOf(" ") ? Re(s, e, r, t) + t : r
      );
    },
    ba = function (s, e, t, i) {
      if (!t || t === "none") {
        let m = nt(e, s, 1),
          y = m && ve(s, m, 1);
        y && y !== t ? ((e = m), (t = y)) : e === "borderColor" && (t = ve(s, "borderTopColor"));
      }
      let r = new X(this._pt, s.style, e, 0, 1, _i),
        a = 0,
        n = 0,
        o,
        l,
        h,
        d,
        c,
        p,
        f,
        u,
        g,
        _,
        v,
        x,
        T;
      if (
        ((r.b = t),
        (r.e = i),
        (t += ""),
        (i += ""),
        i === "auto" && ((s.style[e] = i), (i = ve(s, e) || i), (s.style[e] = t)),
        (o = [t, i]),
        gi(o),
        (t = o[0]),
        (i = o[1]),
        (h = t.match(Be) || []),
        (T = i.match(Be) || []),
        T.length)
      ) {
        for (; (l = Be.exec(i)); )
          (f = l[0]),
            (g = i.substring(a, l.index)),
            c
              ? (c = (c + 1) % 5)
              : (g.substr(-5) === "rgba(" || g.substr(-5) === "hsla(") && (c = 1),
            f !== (p = h[n++] || "") &&
              ((d = parseFloat(p) || 0),
              (v = p.substr((d + "").length)),
              (x = f.charAt(1) === "=" ? +(f.charAt(0) + "1") : 0),
              x && (f = f.substr(2)),
              (u = parseFloat(f)),
              (_ = f.substr((u + "").length)),
              (a = Be.lastIndex - _.length),
              _ || ((_ = _ || q.units[e] || v), a === i.length && ((i += _), (r.e += _))),
              v !== _ && (d = Re(s, e, p, _) || 0),
              (r._pt = {
                _next: r._pt,
                p: g || n === 1 ? g : ",",
                s: d,
                c: x ? x * u : u - d,
                m: (c && c < 4) || e === "zIndex" ? Math.round : 0,
              }));
        r.c = a < i.length ? i.substring(a, i.length) : "";
      } else r.r = e === "display" && i === "none" ? Ns : Bs;
      return $t.test(i) && (r.e = 0), (this._pt = r), r;
    },
    qs = { top: "0%", bottom: "100%", left: "0%", right: "100%", center: "50%" },
    wa = (s) => {
      let e = s.split(" "),
        t = e[0],
        i = e[1] || "50%";
      return (
        (t === "top" || t === "bottom" || i === "left" || i === "right") &&
          ((s = t), (t = i), (i = s)),
        (e[0] = qs[t] || t),
        (e[1] = qs[i] || i),
        e.join(" ")
      );
    },
    Ta = (s, e) => {
      if (e.tween && e.tween._time === e.tween._dur) {
        let t = e.t,
          i = t.style,
          r = e.u,
          a = t._gsap,
          n,
          o,
          l;
        if (r === "all" || r === !0) (i.cssText = ""), (o = 1);
        else
          for (r = r.split(","), l = r.length; --l > -1; )
            (n = r[l]), ke[n] && ((o = 1), (n = n === "transformOrigin" ? Fe : re)), It(t, n);
        o && (It(t, re), a && (a.svg && t.removeAttribute("transform"), Bt(t, 1), (a.uncache = 1)));
      }
    },
    Ut = {
      clearProps(s, e, t, i, r) {
        if (r.data !== "isFromStart") {
          let a = (s._pt = new X(s._pt, e, t, 0, 0, Ta));
          return (a.u = i), (a.pr = -10), (a.tween = r), s._props.push(t), 1;
        }
      },
    },
    mt = [1, 0, 0, 1, 0, 0],
    Qs = {},
    Zs = (s) => s === "matrix(1, 0, 0, 1, 0, 0)" || s === "none" || !s,
    Ks = (s) => {
      let e = ve(s, re);
      return Zs(e) ? mt : e.substr(7).match(Kt).map(S);
    },
    Pi = (s, e) => {
      let t = s._gsap || Ee(s),
        i = s.style,
        r = Ks(s),
        a,
        n,
        o,
        l;
      return t.svg && s.getAttribute("transform")
        ? ((o = s.transform.baseVal.consolidate().matrix),
          (r = [o.a, o.b, o.c, o.d, o.e, o.f]),
          r.join(",") === "1,0,0,1,0,0" ? mt : r)
        : (r === mt &&
            !s.offsetParent &&
            s !== st &&
            !t.svg &&
            ((o = i.display),
            (i.display = "block"),
            (a = s.parentNode),
            (!a || !s.offsetParent) && ((l = 1), (n = s.nextSibling), st.appendChild(s)),
            (r = Ks(s)),
            o ? (i.display = o) : It(s, "display"),
            l && (n ? a.insertBefore(s, n) : a ? a.appendChild(s) : st.removeChild(s))),
          e && r.length > 6 ? [r[0], r[1], r[4], r[5], r[12], r[13]] : r);
    },
    Ri = (s, e, t, i, r, a) => {
      let n = s._gsap,
        o = r || Pi(s, !0),
        l = n.xOrigin || 0,
        h = n.yOrigin || 0,
        d = n.xOffset || 0,
        c = n.yOffset || 0,
        p = o[0],
        f = o[1],
        u = o[2],
        g = o[3],
        _ = o[4],
        v = o[5],
        x = e.split(" "),
        T = parseFloat(x[0]) || 0,
        m = parseFloat(x[1]) || 0,
        y,
        w,
        b,
        P;
      t
        ? o !== mt &&
          (w = p * g - f * u) &&
          ((b = T * (g / w) + m * (-u / w) + (u * v - g * _) / w),
          (P = T * (-f / w) + m * (p / w) - (p * v - f * _) / w),
          (T = b),
          (m = P))
        : ((y = Hs(s)),
          (T = y.x + (~x[0].indexOf("%") ? (T / 100) * y.width : T)),
          (m = y.y + (~(x[1] || x[0]).indexOf("%") ? (m / 100) * y.height : m))),
        i || (i !== !1 && n.smooth)
          ? ((_ = T - l),
            (v = m - h),
            (n.xOffset = d + (_ * p + v * u) - _),
            (n.yOffset = c + (_ * f + v * g) - v))
          : (n.xOffset = n.yOffset = 0),
        (n.xOrigin = T),
        (n.yOrigin = m),
        (n.smooth = !!i),
        (n.origin = e),
        (n.originIsAbsolute = !!t),
        (s.style[Fe] = "0px 0px"),
        a &&
          (Ve(a, n, "xOrigin", l, T),
          Ve(a, n, "yOrigin", h, m),
          Ve(a, n, "xOffset", d, n.xOffset),
          Ve(a, n, "yOffset", c, n.yOffset)),
        s.setAttribute("data-svg-origin", T + " " + m);
    },
    Bt = (s, e) => {
      let t = s._gsap || new Rt(s);
      if ("x" in t && !e && !t.uncache) return t;
      let i = s.style,
        r = t.scaleX < 0,
        a = "px",
        n = "deg",
        o = ve(s, Fe) || "0",
        l,
        h,
        d,
        c,
        p,
        f,
        u,
        g,
        _,
        v,
        x,
        T,
        m,
        y,
        w,
        b,
        P,
        C,
        E,
        F,
        I,
        k,
        U,
        V,
        M,
        fe,
        pe,
        Ce,
        ge,
        Xi,
        we,
        Ue;
      return (
        (l = h = d = f = u = g = _ = v = x = 0),
        (c = p = 1),
        (t.svg = !!(s.getCTM && Xs(s))),
        (y = Pi(s, t.svg)),
        t.svg &&
          ((V = !t.uncache && s.getAttribute("data-svg-origin")),
          Ri(s, V || o, !!V || t.originIsAbsolute, t.smooth !== !1, y)),
        (T = t.xOrigin || 0),
        (m = t.yOrigin || 0),
        y !== mt &&
          ((C = y[0]),
          (E = y[1]),
          (F = y[2]),
          (I = y[3]),
          (l = k = y[4]),
          (h = U = y[5]),
          y.length === 6
            ? ((c = Math.sqrt(C * C + E * E)),
              (p = Math.sqrt(I * I + F * F)),
              (f = C || E ? at(E, C) * Ge : 0),
              (_ = F || I ? at(F, I) * Ge + f : 0),
              _ && (p *= Math.cos(_ * rt)),
              t.svg && ((l -= T - (T * C + m * F)), (h -= m - (T * E + m * I))))
            : ((Ue = y[6]),
              (Xi = y[7]),
              (pe = y[8]),
              (Ce = y[9]),
              (ge = y[10]),
              (we = y[11]),
              (l = y[12]),
              (h = y[13]),
              (d = y[14]),
              (w = at(Ue, ge)),
              (u = w * Ge),
              w &&
                ((b = Math.cos(-w)),
                (P = Math.sin(-w)),
                (V = k * b + pe * P),
                (M = U * b + Ce * P),
                (fe = Ue * b + ge * P),
                (pe = k * -P + pe * b),
                (Ce = U * -P + Ce * b),
                (ge = Ue * -P + ge * b),
                (we = Xi * -P + we * b),
                (k = V),
                (U = M),
                (Ue = fe)),
              (w = at(-F, ge)),
              (g = w * Ge),
              w &&
                ((b = Math.cos(-w)),
                (P = Math.sin(-w)),
                (V = C * b - pe * P),
                (M = E * b - Ce * P),
                (fe = F * b - ge * P),
                (we = I * P + we * b),
                (C = V),
                (E = M),
                (F = fe)),
              (w = at(E, C)),
              (f = w * Ge),
              w &&
                ((b = Math.cos(w)),
                (P = Math.sin(w)),
                (V = C * b + E * P),
                (M = k * b + U * P),
                (E = E * b - C * P),
                (U = U * b - k * P),
                (C = V),
                (k = M)),
              u && Math.abs(u) + Math.abs(f) > 359.9 && ((u = f = 0), (g = 180 - g)),
              (c = S(Math.sqrt(C * C + E * E + F * F))),
              (p = S(Math.sqrt(U * U + Ue * Ue))),
              (w = at(k, U)),
              (_ = Math.abs(w) > 2e-4 ? w * Ge : 0),
              (x = we ? 1 / (we < 0 ? -we : we) : 0)),
          t.svg &&
            ((V = s.getAttribute("transform")),
            (t.forceCSS = s.setAttribute("transform", "") || !Zs(ve(s, re))),
            V && s.setAttribute("transform", V))),
        Math.abs(_) > 90 &&
          Math.abs(_) < 270 &&
          (r
            ? ((c *= -1), (_ += f <= 0 ? 180 : -180), (f += f <= 0 ? 180 : -180))
            : ((p *= -1), (_ += _ <= 0 ? 180 : -180))),
        (t.x =
          l -
          ((t.xPercent =
            l && (t.xPercent || (Math.round(s.offsetWidth / 2) === Math.round(-l) ? -50 : 0)))
            ? (s.offsetWidth * t.xPercent) / 100
            : 0) +
          a),
        (t.y =
          h -
          ((t.yPercent =
            h && (t.yPercent || (Math.round(s.offsetHeight / 2) === Math.round(-h) ? -50 : 0)))
            ? (s.offsetHeight * t.yPercent) / 100
            : 0) +
          a),
        (t.z = d + a),
        (t.scaleX = S(c)),
        (t.scaleY = S(p)),
        (t.rotation = S(f) + n),
        (t.rotationX = S(u) + n),
        (t.rotationY = S(g) + n),
        (t.skewX = _ + n),
        (t.skewY = v + n),
        (t.transformPerspective = x + a),
        (t.zOrigin = parseFloat(o.split(" ")[2]) || 0) && (i[Fe] = Nt(o)),
        (t.xOffset = t.yOffset = 0),
        (t.force3D = q.force3D),
        (t.renderTransform = t.svg ? Ra : Ws ? Js : Pa),
        (t.uncache = 0),
        t
      );
    },
    Nt = (s) => (s = s.split(" "))[0] + " " + s[1],
    Si = (s, e, t) => {
      let i = $(e);
      return S(parseFloat(e) + parseFloat(Re(s, "x", t + "px", i))) + i;
    },
    Pa = (s, e) => {
      (e.z = "0px"), (e.rotationY = e.rotationX = "0deg"), (e.force3D = 0), Js(s, e);
    },
    He = "0deg",
    xt = "0px",
    Xe = ") ",
    Js = function (s, e) {
      let {
          xPercent: t,
          yPercent: i,
          x: r,
          y: a,
          z: n,
          rotation: o,
          rotationY: l,
          rotationX: h,
          skewX: d,
          skewY: c,
          scaleX: p,
          scaleY: f,
          transformPerspective: u,
          force3D: g,
          target: _,
          zOrigin: v,
        } = e || this,
        x = "",
        T = (g === "auto" && s && s !== 1) || g === !0;
      if (v && (h !== He || l !== He)) {
        let m = parseFloat(l) * rt,
          y = Math.sin(m),
          w = Math.cos(m),
          b;
        (m = parseFloat(h) * rt),
          (b = Math.cos(m)),
          (r = Si(_, r, y * b * -v)),
          (a = Si(_, a, -Math.sin(m) * -v)),
          (n = Si(_, n, w * b * -v + v));
      }
      u !== xt && (x += "perspective(" + u + Xe),
        (t || i) && (x += "translate(" + t + "%, " + i + "%) "),
        (T || r !== xt || a !== xt || n !== xt) &&
          (x +=
            n !== xt || T
              ? "translate3d(" + r + ", " + a + ", " + n + ") "
              : "translate(" + r + ", " + a + Xe),
        o !== He && (x += "rotate(" + o + Xe),
        l !== He && (x += "rotateY(" + l + Xe),
        h !== He && (x += "rotateX(" + h + Xe),
        (d !== He || c !== He) && (x += "skew(" + d + ", " + c + Xe),
        (p !== 1 || f !== 1) && (x += "scale(" + p + ", " + f + Xe),
        (_.style[re] = x || "translate(0, 0)");
    },
    Ra = function (s, e) {
      let {
          xPercent: t,
          yPercent: i,
          x: r,
          y: a,
          rotation: n,
          skewX: o,
          skewY: l,
          scaleX: h,
          scaleY: d,
          target: c,
          xOrigin: p,
          yOrigin: f,
          xOffset: u,
          yOffset: g,
          forceCSS: _,
        } = e || this,
        v = parseFloat(r),
        x = parseFloat(a),
        T,
        m,
        y,
        w,
        b;
      (n = parseFloat(n)),
        (o = parseFloat(o)),
        (l = parseFloat(l)),
        l && ((l = parseFloat(l)), (o += l), (n += l)),
        n || o
          ? ((n *= rt),
            (o *= rt),
            (T = Math.cos(n) * h),
            (m = Math.sin(n) * h),
            (y = Math.sin(n - o) * -d),
            (w = Math.cos(n - o) * d),
            o &&
              ((l *= rt),
              (b = Math.tan(o - l)),
              (b = Math.sqrt(1 + b * b)),
              (y *= b),
              (w *= b),
              l && ((b = Math.tan(l)), (b = Math.sqrt(1 + b * b)), (T *= b), (m *= b))),
            (T = S(T)),
            (m = S(m)),
            (y = S(y)),
            (w = S(w)))
          : ((T = h), (w = d), (m = y = 0)),
        ((v && !~(r + "").indexOf("px")) || (x && !~(a + "").indexOf("px"))) &&
          ((v = Re(c, "x", r, "px")), (x = Re(c, "y", a, "px"))),
        (p || f || u || g) &&
          ((v = S(v + p - (p * T + f * y) + u)), (x = S(x + f - (p * m + f * w) + g))),
        (t || i) &&
          ((b = c.getBBox()), (v = S(v + (t / 100) * b.width)), (x = S(x + (i / 100) * b.height))),
        (b = "matrix(" + T + "," + m + "," + y + "," + w + "," + v + "," + x + ")"),
        c.setAttribute("transform", b),
        _ && (c.style[re] = b);
    },
    Sa = function (s, e, t, i, r, a) {
      let n = 360,
        o = j(r),
        l = parseFloat(r) * (o && ~r.indexOf("rad") ? Ge : 1),
        h = a ? l * a : l - i,
        d = i + h + "deg",
        c,
        p;
      return (
        o &&
          ((c = r.split("_")[1]),
          c === "short" && ((h %= n), h !== h % (n / 2) && (h += h < 0 ? n : -n)),
          c === "cw" && h < 0
            ? (h = ((h + n * zs) % n) - ~~(h / n) * n)
            : c === "ccw" && h > 0 && (h = ((h - n * zs) % n) - ~~(h / n) * n)),
        (s._pt = p = new X(s._pt, e, t, i, h, ca)),
        (p.e = d),
        (p.u = "deg"),
        s._props.push(t),
        p
      );
    },
    Ca = (s, e, t) => {
      let i = _t.style,
        r = t._gsap,
        a = "perspective,force3D,transformOrigin,svgOrigin",
        n,
        o,
        l,
        h,
        d,
        c,
        p,
        f;
      (i.cssText = getComputedStyle(t).cssText + ";position:absolute;display:block;"),
        (i[re] = e),
        ye.body.appendChild(_t),
        (n = Bt(_t, 1));
      for (o in ke)
        (l = r[o]),
          (h = n[o]),
          l !== h &&
            a.indexOf(o) < 0 &&
            ((p = $(l)),
            (f = $(h)),
            (d = p !== f ? Re(t, o, l, f) : parseFloat(l)),
            (c = parseFloat(h)),
            (s._pt = new X(s._pt, r, o, d, c - d, Us)),
            (s._pt.u = f || 0),
            s._props.push(o));
      ye.body.removeChild(_t);
    };
  J("padding,margin,Width,Radius", (s, e) => {
    let t = "Top",
      i = "Right",
      r = "Bottom",
      a = "Left",
      n = (e < 3 ? [t, i, r, a] : [t + a, t + i, r + i, r + a]).map((o) =>
        e < 2 ? s + o : "border" + o + s
      );
    Ut[e > 1 ? "border" + s : s] = function (o, l, h, d, c) {
      let p, f;
      if (arguments.length < 4)
        return (
          (p = n.map((u) => ot(o, u, h))), (f = p.join(" ")), f.split(p[0]).length === 5 ? p[0] : f
        );
      (p = (d + "").split(" ")),
        (f = {}),
        n.forEach((u, g) => (f[u] = p[g] = p[g] || p[((g - 1) / 2) | 0])),
        o.init(l, f, c);
    };
  });
  var Ci = {
    name: "css",
    register: Ti,
    targetTest(s) {
      return s.style && s.nodeType;
    },
    init(s, e, t, i, r) {
      let a = this._props,
        n = s.style,
        o = t.vars.startAt,
        l,
        h,
        d,
        c,
        p,
        f,
        u,
        g,
        _,
        v,
        x,
        T,
        m,
        y,
        w;
      bi || Ti();
      for (u in e)
        if (u !== "autoRound" && ((h = e[u]), !(K[u] && xi(u, e, t, i, s, r)))) {
          if (
            ((p = typeof h),
            (f = Ut[u]),
            p === "function" && ((h = h.call(t, i, s, r)), (p = typeof h)),
            p === "string" && ~h.indexOf("random(") && (h = ct(h)),
            f)
          )
            f(this, s, u, h, t) && (w = 1);
          else if (u.substr(0, 2) === "--")
            (l = (getComputedStyle(s).getPropertyValue(u) + "").trim()),
              (h += ""),
              (g = $(l)),
              (_ = $(h)),
              _ ? g !== _ && (l = Re(s, u, l, _) + _) : g && (h += g),
              this.add(n, "setProperty", l, h, i, r, 0, 0, u);
          else if (p !== "undefined") {
            if (
              (o && u in o
                ? ((l = typeof o[u] == "function" ? o[u].call(t, i, s, r) : o[u]),
                  u in q.units && !$(l) && (l += q.units[u]),
                  (l + "").charAt(1) === "=" && (l = ot(s, u)))
                : (l = ot(s, u)),
              (c = parseFloat(l)),
              (v = p === "string" && h.charAt(1) === "=" ? +(h.charAt(0) + "1") : 0),
              v && (h = h.substr(2)),
              (d = parseFloat(h)),
              u in Oe &&
                (u === "autoAlpha" &&
                  (c === 1 && ot(s, "visibility") === "hidden" && d && (c = 0),
                  Ve(
                    this,
                    n,
                    "visibility",
                    c ? "inherit" : "hidden",
                    d ? "inherit" : "hidden",
                    !d
                  )),
                u !== "scale" &&
                  u !== "transform" &&
                  ((u = Oe[u]), ~u.indexOf(",") && (u = u.split(",")[0]))),
              (x = u in ke),
              x)
            ) {
              if (
                (T ||
                  ((m = s._gsap),
                  (m.renderTransform && !e.parseTransform) || Bt(s, e.parseTransform),
                  (y = e.smoothOrigin !== !1 && m.smooth),
                  (T = this._pt = new X(this._pt, n, re, 0, 1, m.renderTransform, m, 0, -1)),
                  (T.dep = 1)),
                u === "scale")
              )
                (this._pt = new X(this._pt, m, "scaleY", m.scaleY, v ? v * d : d - m.scaleY)),
                  a.push("scaleY", u),
                  (u += "X");
              else if (u === "transformOrigin") {
                (h = wa(h)),
                  m.svg
                    ? Ri(s, h, 0, y, 0, this)
                    : ((_ = parseFloat(h.split(" ")[2]) || 0),
                      _ !== m.zOrigin && Ve(this, m, "zOrigin", m.zOrigin, _),
                      Ve(this, n, u, Nt(l), Nt(h)));
                continue;
              } else if (u === "svgOrigin") {
                Ri(s, h, 1, y, 0, this);
                continue;
              } else if (u in Qs) {
                Sa(this, m, u, c, h, v);
                continue;
              } else if (u === "smoothOrigin") {
                Ve(this, m, "smooth", m.smooth, h);
                continue;
              } else if (u === "force3D") {
                m[u] = h;
                continue;
              } else if (u === "transform") {
                Ca(this, h, s);
                continue;
              }
            } else u in n || (u = nt(u) || u);
            if (x || ((d || d === 0) && (c || c === 0) && !ua.test(h) && u in n))
              (g = (l + "").substr((c + "").length)),
                d || (d = 0),
                (_ = $(h) || (u in q.units ? q.units[u] : g)),
                g !== _ && (c = Re(s, u, l, _)),
                (this._pt = new X(
                  this._pt,
                  x ? m : n,
                  u,
                  c,
                  v ? v * d : d - c,
                  !x && (_ === "px" || u === "zIndex") && e.autoRound !== !1 ? pa : Us
                )),
                (this._pt.u = _ || 0),
                g !== _ && ((this._pt.b = l), (this._pt.r = fa));
            else if (u in n) ba.call(this, s, u, l, h);
            else if (u in s) this.add(s, u, s[u], h, i, r);
            else {
              Tt(u, h);
              continue;
            }
            a.push(u);
          }
        }
      w && yi(this);
    },
    get: ot,
    aliases: Oe,
    getSetter(s, e, t) {
      let i = Oe[e];
      return (
        i && i.indexOf(",") < 0 && (e = i),
        e in ke && e !== Fe && (s._gsap.x || ot(s, "x"))
          ? t && Vs === t
            ? e === "scale"
              ? xa
              : ma
            : (Vs = t || {}) && (e === "scale" ? ya : va)
          : s.style && !bt(s.style[e])
          ? ga
          : ~e.indexOf("-")
          ? _a
          : Lt(s, e)
      );
    },
    core: { _removeProperty: It, _getMatrix: Pi },
  };
  oe.utils.checkPrefix = nt;
  (function (s, e, t, i) {
    let r = J(s + "," + e + "," + t, (a) => {
      ke[a] = 1;
    });
    J(e, (a) => {
      (q.units[a] = "deg"), (Qs[a] = 1);
    }),
      (Oe[r[13]] = s + "," + e),
      J(i, (a) => {
        let n = a.split(":");
        Oe[n[1]] = r[n[0]];
      });
  })(
    "x,y,z,scale,scaleX,scaleY,xPercent,yPercent",
    "rotation,rotationX,rotationY,skewX,skewY",
    "transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective",
    "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY"
  );
  J("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", (s) => {
    q.units[s] = "px";
  });
  oe.registerPlugin(Ci);
  var ee = oe.registerPlugin(Ci) || oe,
    Dn = ee.core.Tween;
  ("use strict");
  var $s = 0,
    Mi = class {
      constructor({ root: e, rootMargin: t = "0px", threshold: i = 0 }) {
        window.IntersectionObserver
          ? ((this.root = document.querySelector(e)),
            this.root || (this.root = "viewport"),
            (this.rootMargin = t),
            (this.threshold = i),
            (this.els = []),
            (this._staggerEls = []),
            (this.observer = new IntersectionObserver(this._callback.bind(this), {
              root: this.root === "viewport" ? null : this.root,
              rootMargin: this.rootMargin,
              threshold: this.threshold,
            })))
          : setTimeout(() => {
              this._onErrorCallback && this._onErrorCallback();
            }, 0);
      }
      _callback(e) {
        e.forEach((t) => {
          let i = this.els.find((r) => r.el.isSameNode(t.target));
          if (i) {
            if (t.intersectionRatio > i.triggerRatio) {
              if (i.alwaysTrigger || !i.inView) {
                i.onBeforeElVisible && i.onBeforeElVisible(i);
                let r = i.stagger;
                this._staggerEls.forEach((a) => {
                  a.inView && (r += a.stagger);
                }),
                  this._staggerEls.push(i),
                  setTimeout(() => {
                    i.onElVisible && i.onElVisible(i),
                      (this._staggerEls = this._staggerEls.filter((a) => i.id !== a.id));
                  }, r);
              }
              i.inView = !0;
            } else
              i.inView &&
                t.intersectionRatio <= i.triggerRatio &&
                ((i.inView = !1),
                i.onElHidden && i.onElHidden(i),
                i.keepObserving || this._unobserve(i));
            (i.ratio = t.intersectionRatio), (i.boundingClientRect = t.boundingClientRect);
          }
        });
      }
      observe({
        elements: e = [],
        selector: t,
        keepObserving: i = !1,
        triggerRatio: r = 0,
        alwaysTrigger: a = !0,
        stagger: n = 0,
        onBeforeElVisible: o = () => {},
        onElVisible: l = () => {},
        onElHidden: h = () => {},
      }) {
        let d = e.length ? e : document.querySelectorAll(t);
        for (let c = 0; c < d.length; c++)
          this.els.push({
            el: d[c],
            id: $s,
            keepObserving: i,
            triggerRatio: Math.max(0, Math.min(1, r)) || 0,
            alwaysTrigger: a,
            ratio: 0,
            stagger: n,
            onBeforeElVisible: o,
            onElVisible: l,
            onElHidden: h,
            inView: !1,
            boundingClientRect: {
              x: 0,
              y: 0,
              width: 0,
              height: 0,
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
            },
          }),
            $s++,
            this.observer.observe(d[c]);
      }
      _unobserve(e) {
        this.observer.unobserve(e.el), (this.els = this.els.filter((t) => !t.el.isSameNode(e.el)));
      }
      unobserveEl(e) {
        let t = this.els.find((i) => i.el.isSameNode(e));
        t && this._unobserve(t);
      }
      unobserveEls(e) {
        for (let t = 0; t < e.length; t++) this.unobserveEl(e[t]);
      }
      unobserveAll() {
        this.observer.disconnect(), (this.els = []);
      }
      onError(e) {
        return e && (this._onErrorCallback = e), this;
      }
    };
  ("use strict");
  var Ei = class {
    constructor({
      container: e = document.body,
      cancelNavigationClass: t,
      cacheLinks: i,
      cacheNavigatedPages: r = !1,
      cacheLength: a = 10,
      isiOS: n = !1,
      onStart: o = { value: () => {} },
      onReady: l = { value: () => {} },
      onLeaving: h = { duration: 1e3, value: () => {} },
      onWaiting: d = { value: () => {} },
      onError: c = { value: () => {} },
    }) {
      (this.container = e),
        (this.isiOS = n),
        (this.params = {
          cancelNavigationClass: t,
          cacheLinks: i,
          cacheNavigatedPages: r,
          cacheLength: a,
          onStart: o,
          onReady: l,
          onLeaving: h,
          onWaiting: d,
          onError: c,
        }),
        (this.router = { history: [{ href: window.location.href, title: document.title }] }),
        (this.cache = []),
        (this._isLoading = !1),
        (this._ajaxCalls = 0),
        (this._transitionsManager = { override: !1, overrideDuration: 50, isWaiting: !1 }),
        (this.lastLinkClicked = null),
        (this._mutations = { mutationObserver: null, isActive: !1 }),
        this._initEvents(),
        this.params.cacheNavigatedPages &&
          this._cacheResponse(window.location.href, document.documentElement.innerHTML),
        this.params.cacheLinks && this._cacheContainerLinks();
    }
    _initEvents() {
      if (
        (window.addEventListener("hashchange", () => {
          this.router.history.push({ href: window.location.href, title: document.title });
        }),
        window.addEventListener("popstate", () => {
          let e, t;
          (e = this.router.history[this.router.history.length - 1].href),
            (t = window.location.href);
          let i,
            r,
            a = !1;
          if (e.indexOf("#") !== -1) {
            let n = e.indexOf("#");
            i = e.substring(0, n);
          } else i = e;
          if (t.indexOf("#") !== -1) {
            let n = t.indexOf("#");
            r = t.substring(0, n);
          } else r = t;
          i === r && (a = !0), a || this._launchNavigation(window.location.href, !1);
        }),
        window.addEventListener("click", (e) => this._handleClick(e)),
        this.isiOS)
      ) {
        let e = 0,
          t,
          i = { x: 0, y: 0 },
          r = { x: 0, y: 0 };
        window.addEventListener(
          "touchstart",
          (a) => {
            (e = performance.now()),
              (t = a.target),
              a.targetTouches
                ? ((i = { x: a.targetTouches[0].clientX, y: a.targetTouches[0].clientY }),
                  (r = { x: a.targetTouches[0].clientX, y: a.targetTouches[0].clientY }))
                : ((i = { x: a.clientX, y: a.clientY }), (r = { x: a.clientX, y: a.clientY }));
          },
          { passive: !0 }
        ),
          window.addEventListener(
            "touchmove",
            (a) => {
              a.targetTouches
                ? (r = { x: a.targetTouches[0].clientX, y: a.targetTouches[0].clientY })
                : (r = { x: a.clientX, y: a.clientY });
            },
            { passive: !0 }
          ),
          window.addEventListener("touchend", (a) => {
            let n = performance.now() - e,
              o = { x: Math.abs(i.x - r.x), y: Math.abs(i.y - r.y) };
            n < 150 && t.isEqualNode(a.target) && o.x + o.y < 40 && this._handleClick(a);
          });
      }
      window.MutationObserver &&
        ((this._mutations.isActive = !0),
        (this._mutations.mutationObserver = new MutationObserver((e, t) => {
          this._observedMutation(e);
        })));
    }
    _handleClick(e) {
      let t = e.target;
      if ((t.name !== "li" && (t = t.closest("li")), !t)) return;
      let i = t.getAttribute("href");
      if (
        !(
          this.params.cancelNavigationClass &&
          t.classList.contains(this.params.cancelNavigationClass)
        ) &&
        i.indexOf("mailto:") === -1 &&
        !t.getAttribute("download") &&
        !(e.ctrlKey || e.metaKey || e.shiftKey || e.altKey)
      ) {
        if (window.location.pathname === i || window.location.href === i) {
          e.preventDefault(), e.stopPropagation();
          return;
        }
        (this.lastLinkClicked = t),
          e.preventDefault(),
          e.stopPropagation(),
          this._launchNavigation(i, !0);
      }
    }
    _cacheResponse(e, t) {
      let i = {
        href: e,
        HTMLContent: this._parseResponseContent(t),
        title: t.match(/<title[^>]*>([^<]+)<\/title>/)[1],
      };
      this.cache.length >= this.params.cacheLength && this.cache.splice(0, 1), this.cache.push(i);
    }
    _cacheContainerLinks() {
      let e = this.container.querySelectorAll(this.params.cacheLinks);
      for (let t = 0; t < e.length; t++) {
        let i = e[t].href;
        this.cache.find((a) => a.href === i) ||
          this._AJAXCall(i, !1, (a, n) => this._cacheResponse(n, a));
      }
    }
    loadPage(e, t) {
      let i = (performance || Date).now(),
        r = this.cache.find((a) => a.href === e);
      r && t
        ? t({
            url: e,
            content: r.HTMLContent,
            title: r.title,
            duration: (performance || Date).now() - i,
          })
        : this._AJAXCall(e, !1, (a, n) => {
            this.params.cacheNavigatedPages && this._cacheResponse(n, a),
              t &&
                t({
                  url: n,
                  content: this._parseResponseContent(a),
                  title: a.match(/<title[^>]*>([^<]+)<\/title>/)[1],
                  duration: (performance || Date).now() - i,
                });
          });
    }
    updateHistory(e, t, i = !0) {
      let r = e || this.router.nextTitle,
        a = t || this.router.nextHref;
      i && window.history.pushState({}, r, a),
        (document.title = r),
        this.router.history.push({ href: a, title: r });
    }
    _launchNavigation(e, t) {
      if (!this._isLoading) {
        (this.router.nextHTMLContent = null),
          this.params.onStart.value(this.router.history[this.router.history.length - 1].href, e);
        let i = this._transitionsManager.isOverriding
            ? this._transitionsManager.overrideDuration
            : this.params.onLeaving.duration,
          r = this.cache.find((a) => a.href === e);
        r
          ? ((this.router.nextHref = r.href),
            (this.router.nextHTMLContent = r.HTMLContent),
            (this.router.nextTitle = r.title))
          : this._routing(e, t),
          setTimeout(() => {
            this.params.onLeaving.value(
              this.router.history[this.router.history.length - 1].href,
              e
            ),
              this.router.nextHTMLContent ? this._appendData(t) : this._waitForData(t);
          }, i);
      }
    }
    _parseResponseContent(e) {
      let t = document.createElement("html");
      t.innerHTML = e;
      let i = "";
      if (this.container.getAttribute("id")) i = "#" + this.container.getAttribute("id");
      else if (this.container.classList.length)
        for (let a = 0; a < this.container.classList.length; a++)
          i += "." + this.container.classList[a];
      else i = this.container.tagName;
      let r = t.querySelector(i) ? t.querySelector(i).innerHTML : t.querySelector("body").innerHTML;
      return (t = null), r;
    }
    _routing(e, t) {
      (this._isLoading = !0),
        (this.router.nextHref = null),
        e
          ? (this.router.nextHref = e)
          : this.router.history.length > 0 &&
            (this.router.nextHref = this.router.history[this.router.history.length - 1].href),
        this.router.nextHref &&
          this._AJAXCall(e, t, (i, r) => {
            (this.router.nextHTMLContent = this._parseResponseContent(i)),
              (this.router.nextTitle = i.match(/<title[^>]*>([^<]+)<\/title>/)[1]),
              this.params.cacheNavigatedPages &&
                (this.cache.find((n) => n.href === e) || this._cacheResponse(r, i));
          });
    }
    _AJAXCall(e, t, i) {
      let r = new XMLHttpRequest();
      (r.onreadystatechange = () => {
        r.readyState === 4 && (r.status === 200 || r.status === 0)
          ? i && i(r.response, r.responseURL)
          : r.readyState === 4 && r.status !== 404 && this._ajaxCalls < 4
          ? (this._ajaxCalls === 0 &&
              !this._transitionsManager.isWaiting &&
              ((this._transitionsManager.isWaiting = !0),
              this.params.onWaiting.value(
                this.router.history[this.router.history.length - 1].href,
                this.router.nextHref
              )),
            this._ajaxCalls++,
            this._routing(r.responseURL, t, i))
          : r.readyState === 4 &&
            (this._resetRoutingState(),
            this.params.onError.value(
              this.router.history[this.router.history.length - 1].href,
              this.router.nextHref
            ));
      }),
        r.open("GET", e, !0),
        r.setRequestHeader("Accept", "text/html"),
        r.send(null);
    }
    _waitForData(e) {
      this._transitionsManager.isWaiting ||
        ((this._transitionsManager.isWaiting = !0),
        this.params.onWaiting.value(
          this.router.history[this.router.history.length - 1].href,
          this.router.nextHref
        ));
      let t = setInterval(() => {
        this.router.nextHTMLContent && (clearInterval(t), this._appendData(e));
      }, 1e3);
    }
    _observedMutation(e) {
      for (let t = 0; t < e.length; t++)
        if (e[t].addedNodes.length && e[t].target.isEqualNode(this.container)) {
          this._mutations.mutationObserver.disconnect(),
            setTimeout(() => {
              this._newContentAdded();
            }, 34);
          break;
        }
    }
    _newContentAdded() {
      setTimeout(() => {
        this.params.onReady.value(
          this.router.history[this.router.history.length - 2].href,
          this.router.history[this.router.history.length - 1].href
        ),
          this._resetRoutingState(),
          this.params.cacheLinks && this._cacheContainerLinks();
      }, 0);
    }
    _appendData(e) {
      this.updateHistory(this.router.nextTitle, this.router.nextHref, e);
      let t = this.router.nextHTMLContent;
      t &&
        (this._mutations.isActive
          ? this._mutations.mutationObserver.observe(this.container, { childList: !0 })
          : setTimeout(() => {
              this._newContentAdded();
            }, t.children.length * 25),
        (this.container.innerHTML = t));
    }
    _resetRoutingState() {
      (this._ajaxCalls = 0),
        (this._isLoading = !1),
        (this._transitionsManager.isWaiting = !1),
        (this._transitionsManager.isOverriding = !1);
    }
    overrideTransitionDuration(e = 50) {
      (this._transitionsManager.isOverriding = !0), (this._transitionsManager.overrideDuration = e);
    }
    isTransitionOverrided() {
      return this._transitionsManager.isOverriding;
    }
  };
  var Di = 0;
  function R() {
    if (!(Di > 100)) {
      if (Di === 100) console.warn("Curtains: too many warnings thrown, stop logging.");
      else {
        let s = Array.prototype.slice.call(arguments);
        console.warn.apply(console, s);
      }
      Di++;
    }
  }
  function z() {
    let s = Array.prototype.slice.call(arguments);
    console.error.apply(console, s);
  }
  function ht() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (s) => {
      let e = (Math.random() * 16) | 0;
      return (s === "x" ? e : (e & 3) | 8).toString(16).toUpperCase();
    });
  }
  function ce(s) {
    return (s & (s - 1)) == 0;
  }
  function er(s, e, t) {
    return (1 - t) * s + t * e;
  }
  var Li = class {
    constructor(e) {
      (this.type = "Scene"),
        !e || e.type !== "Renderer"
          ? z(this.type + ": Renderer not passed as first argument", e)
          : e.gl || z(this.type + ": Renderer WebGL context is undefined", e),
        (this.renderer = e),
        (this.gl = e.gl),
        this.initStacks();
    }
    initStacks() {
      this.stacks = {
        pingPong: [],
        renderTargets: [],
        opaque: [],
        transparent: [],
        renderPasses: [],
        scenePasses: [],
      };
    }
    resetPlaneStacks() {
      (this.stacks.pingPong = []),
        (this.stacks.renderTargets = []),
        (this.stacks.opaque = []),
        (this.stacks.transparent = []);
      for (let e = 0; e < this.renderer.planes.length; e++) this.addPlane(this.renderer.planes[e]);
    }
    resetShaderPassStacks() {
      (this.stacks.scenePasses = []), (this.stacks.renderPasses = []);
      for (let e = 0; e < this.renderer.shaderPasses.length; e++)
        (this.renderer.shaderPasses[e].index = e),
          this.renderer.shaderPasses[e]._isScenePass
            ? this.stacks.scenePasses.push(this.renderer.shaderPasses[e])
            : this.stacks.renderPasses.push(this.renderer.shaderPasses[e]);
      this.stacks.scenePasses.length === 0 && (this.renderer.state.scenePassIndex = null);
    }
    addToRenderTargetsStack(e) {
      let t = this.renderer.planes.filter(
          (r) => r.type !== "PingPongPlane" && r.target && r.uuid !== e.uuid
        ),
        i = -1;
      if (e.target._depth) {
        for (let r = t.length - 1; r >= 0; r--)
          if (t[r].target.uuid === e.target.uuid) {
            i = r + 1;
            break;
          }
      } else i = t.findIndex((r) => r.target.uuid === e.target.uuid);
      (i = Math.max(0, i)),
        t.splice(i, 0, e),
        e.target._depth
          ? (t.sort((r, a) => r.index - a.index), t.sort((r, a) => a.renderOrder - r.renderOrder))
          : (t.sort((r, a) => a.index - r.index), t.sort((r, a) => r.renderOrder - a.renderOrder)),
        t.sort((r, a) => r.target.index - a.target.index),
        (this.stacks.renderTargets = t);
    }
    addToRegularPlaneStack(e) {
      let t = this.renderer.planes.filter(
          (r) =>
            r.type !== "PingPongPlane" &&
            !r.target &&
            r._transparent === e._transparent &&
            r.uuid !== e.uuid
        ),
        i = -1;
      for (let r = t.length - 1; r >= 0; r--)
        if (t[r]._geometry.definition.id === e._geometry.definition.id) {
          i = r + 1;
          break;
        }
      return (i = Math.max(0, i)), t.splice(i, 0, e), t.sort((r, a) => r.index - a.index), t;
    }
    addPlane(e) {
      if (e.type === "PingPongPlane") this.stacks.pingPong.push(e);
      else if (e.target) this.addToRenderTargetsStack(e);
      else if (e._transparent) {
        let t = this.addToRegularPlaneStack(e);
        t.sort((i, r) => r.relativeTranslation.z - i.relativeTranslation.z),
          t.sort((i, r) => r.renderOrder - i.renderOrder),
          (this.stacks.transparent = t);
      } else {
        let t = this.addToRegularPlaneStack(e);
        t.sort((i, r) => r.renderOrder - i.renderOrder), (this.stacks.opaque = t);
      }
    }
    removePlane(e) {
      e.type === "PingPongPlane"
        ? (this.stacks.pingPong = this.stacks.pingPong.filter((t) => t.uuid !== e.uuid))
        : e.target
        ? (this.stacks.renderTargets = this.stacks.renderTargets.filter((t) => t.uuid !== e.uuid))
        : e._transparent
        ? (this.stacks.transparent = this.stacks.transparent.filter((t) => t.uuid !== e.uuid))
        : (this.stacks.opaque = this.stacks.opaque.filter((t) => t.uuid !== e.uuid));
    }
    setPlaneRenderOrder(e) {
      if (e.type === "ShaderPass")
        this.sortShaderPassStack(
          e._isScenePass ? this.stacks.scenePasses : this.stacks.renderPasses
        );
      else if (e.type === "PingPongPlane") return;
      if (e.target)
        e.target._depth
          ? (this.stacks.renderTargets.sort((t, i) => t.index - i.index),
            this.stacks.renderTargets.sort((t, i) => i.renderOrder - t.renderOrder))
          : (this.stacks.renderTargets.sort((t, i) => i.index - t.index),
            this.stacks.renderTargets.sort((t, i) => t.renderOrder - i.renderOrder)),
          this.stacks.renderTargets.sort((t, i) => t.target.index - i.target.index);
      else {
        let t = e._transparent ? this.stacks.transparent : this.stacks.opaque,
          i = this.stacks.scenePasses.find((r, a) => r._isScenePass && !r._depth && a === 0);
        !this.renderer.depth || i
          ? (t.sort((r, a) => a.index - r.index),
            e._transparent && t.sort((r, a) => r.relativeTranslation.z - a.relativeTranslation.z),
            t.sort((r, a) => r.renderOrder - a.renderOrder))
          : (t.sort((r, a) => r.index - a.index),
            e._transparent && t.sort((r, a) => a.relativeTranslation.z - r.relativeTranslation.z),
            t.sort((r, a) => a.renderOrder - r.renderOrder));
      }
    }
    addShaderPass(e) {
      e._isScenePass
        ? (this.stacks.scenePasses.push(e), this.sortShaderPassStack(this.stacks.scenePasses))
        : (this.stacks.renderPasses.push(e), this.sortShaderPassStack(this.stacks.renderPasses));
    }
    removeShaderPass(e) {
      this.resetShaderPassStacks();
    }
    sortShaderPassStack(e) {
      e.sort((t, i) => t.index - i.index), e.sort((t, i) => t.renderOrder - i.renderOrder);
    }
    enableShaderPass() {
      this.stacks.scenePasses.length &&
        this.stacks.renderPasses.length === 0 &&
        this.renderer.planes.length &&
        ((this.renderer.state.scenePassIndex = 0),
        this.renderer.bindFrameBuffer(this.stacks.scenePasses[0].target));
    }
    drawRenderPasses() {
      this.stacks.scenePasses.length &&
        this.stacks.renderPasses.length &&
        this.renderer.planes.length &&
        ((this.renderer.state.scenePassIndex = 0),
        this.renderer.bindFrameBuffer(this.stacks.scenePasses[0].target));
      for (let e = 0; e < this.stacks.renderPasses.length; e++)
        this.stacks.renderPasses[e]._startDrawing(), this.renderer.clearDepth();
    }
    drawScenePasses() {
      for (let e = 0; e < this.stacks.scenePasses.length; e++)
        this.stacks.scenePasses[e]._startDrawing();
    }
    drawPingPongStack() {
      for (let e = 0; e < this.stacks.pingPong.length; e++) {
        let t = this.stacks.pingPong[e];
        t && t._startDrawing();
      }
    }
    drawStack(e) {
      for (let t = 0; t < this.stacks[e].length; t++) {
        let i = this.stacks[e][t];
        i && i._startDrawing();
      }
    }
    draw() {
      this.drawPingPongStack(),
        this.enableShaderPass(),
        this.drawStack("renderTargets"),
        this.drawRenderPasses(),
        this.drawStack("transparent"),
        this.drawStack("opaque"),
        this.drawScenePasses();
    }
  };
  var Ai = class {
    constructor() {
      (this.geometries = []), this.clear();
    }
    clear() {
      (this.textures = []), (this.programs = []);
    }
    getGeometryFromID(e) {
      return this.geometries.find((t) => t.id === e);
    }
    addGeometry(e, t, i) {
      this.geometries.push({ id: e, vertices: t, uvs: i });
    }
    isSameShader(e, t) {
      return e.localeCompare(t) === 0;
    }
    getProgramFromShaders(e, t) {
      return this.programs.find(
        (i) => this.isSameShader(i.vsCode, e) && this.isSameShader(i.fsCode, t)
      );
    }
    addProgram(e) {
      this.programs.push(e);
    }
    getTextureFromSource(e) {
      let t = typeof e == "string" ? e : e.src;
      return this.textures.find((i) => i.source && i.source.src === t);
    }
    addTexture(e) {
      this.getTextureFromSource(e.source) || this.textures.push(e);
    }
    removeTexture(e) {
      this.textures = this.textures.filter((t) => t.uuid !== e.uuid);
    }
  };
  var ki = class {
    constructor() {
      this.clear();
    }
    clear() {
      this.queue = [];
    }
    add(e, t = !1) {
      let i = { callback: e, keep: t, timeout: null };
      return (
        (i.timeout = setTimeout(() => {
          this.queue.push(i);
        }, 0)),
        i
      );
    }
    execute() {
      this.queue.map((e) => {
        e.callback && e.callback(), clearTimeout(this.queue.timeout);
      }),
        (this.queue = this.queue.filter((e) => e.keep));
    }
  };
  var Oi = class {
    constructor({
      alpha: e,
      antialias: t,
      premultipliedAlpha: i,
      depth: r,
      failIfMajorPerformanceCaveat: a,
      preserveDrawingBuffer: n,
      stencil: o,
      container: l,
      pixelRatio: h,
      renderingScale: d,
      production: c,
      onError: p,
      onSuccess: f,
      onContextLost: u,
      onContextRestored: g,
      onDisposed: _,
      onSceneChange: v,
    }) {
      (this.type = "Renderer"),
        (this.alpha = e),
        (this.antialias = t),
        (this.premultipliedAlpha = i),
        (this.depth = r),
        (this.failIfMajorPerformanceCaveat = a),
        (this.preserveDrawingBuffer = n),
        (this.stencil = o),
        (this.container = l),
        (this.pixelRatio = h),
        (this._renderingScale = d),
        (this.production = c),
        (this.onError = p),
        (this.onSuccess = f),
        (this.onContextLost = u),
        (this.onContextRestored = g),
        (this.onDisposed = _),
        (this.onSceneChange = v),
        this.initState(),
        (this.canvas = document.createElement("canvas"));
      let x = {
        alpha: this.alpha,
        premultipliedAlpha: this.premultipliedAlpha,
        antialias: this.antialias,
        depth: this.depth,
        failIfMajorPerformanceCaveat: this.failIfMajorPerformanceCaveat,
        preserveDrawingBuffer: this.preserveDrawingBuffer,
        stencil: this.stencil,
      };
      if (
        ((this.gl = this.canvas.getContext("webgl2", x)),
        (this._isWebGL2 = !!this.gl),
        this.gl ||
          (this.gl =
            this.canvas.getContext("webgl", x) || this.canvas.getContext("experimental-webgl", x)),
        this.gl)
      )
        this.onSuccess && this.onSuccess();
      else {
        this.production || R(this.type + ": WebGL context could not be created"),
          (this.state.isActive = !1),
          this.onError && this.onError();
        return;
      }
      this.initRenderer();
    }
    initState() {
      this.state = {
        isActive: !0,
        isContextLost: !0,
        drawingEnabled: !0,
        forceRender: !1,
        currentProgramID: null,
        currentGeometryID: null,
        forceBufferUpdate: !1,
        depthTest: null,
        cullFace: null,
        frameBufferID: null,
        scenePassIndex: null,
        activeTexture: null,
        unpackAlignment: null,
        flipY: null,
        premultiplyAlpha: null,
      };
    }
    initCallbackQueueManager() {
      this.nextRender = new ki();
    }
    initRenderer() {
      (this.planes = []),
        (this.renderTargets = []),
        (this.shaderPasses = []),
        (this.state.isContextLost = !1),
        this.initCallbackQueueManager(),
        this.setBlendFunc(),
        this.setDepthTest(!0),
        (this.cache = new Ai()),
        (this.scene = new Li(this)),
        this.getExtensions(),
        (this._contextLostHandler = this.contextLost.bind(this)),
        this.canvas.addEventListener("webglcontextlost", this._contextLostHandler, !1),
        (this._contextRestoredHandler = this.contextRestored.bind(this)),
        this.canvas.addEventListener("webglcontextrestored", this._contextRestoredHandler, !1);
    }
    getExtensions() {
      (this.extensions = []),
        this._isWebGL2
          ? ((this.extensions.EXT_color_buffer_float =
              this.gl.getExtension("EXT_color_buffer_float")),
            (this.extensions.OES_texture_float_linear = this.gl.getExtension(
              "OES_texture_float_linear"
            )),
            (this.extensions.EXT_texture_filter_anisotropic = this.gl.getExtension(
              "EXT_texture_filter_anisotropic"
            )),
            (this.extensions.WEBGL_lose_context = this.gl.getExtension("WEBGL_lose_context")),
            (this.extensions.KHR_parallel_shader_compile = this.gl.getExtension(
              "KHR_parallel_shader_compile"
            )))
          : ((this.extensions.OES_vertex_array_object =
              this.gl.getExtension("OES_vertex_array_object")),
            (this.extensions.OES_texture_float = this.gl.getExtension("OES_texture_float")),
            (this.extensions.OES_texture_float_linear = this.gl.getExtension(
              "OES_texture_float_linear"
            )),
            (this.extensions.OES_texture_half_float =
              this.gl.getExtension("OES_texture_half_float")),
            (this.extensions.OES_texture_half_float_linear = this.gl.getExtension(
              "OES_texture_half_float_linear"
            )),
            (this.extensions.EXT_texture_filter_anisotropic = this.gl.getExtension(
              "EXT_texture_filter_anisotropic"
            )),
            (this.extensions.OES_element_index_uint =
              this.gl.getExtension("OES_element_index_uint")),
            (this.extensions.OES_standard_derivatives = this.gl.getExtension(
              "OES_standard_derivatives"
            )),
            (this.extensions.EXT_sRGB = this.gl.getExtension("EXT_sRGB")),
            (this.extensions.WEBGL_depth_texture = this.gl.getExtension("WEBGL_depth_texture")),
            (this.extensions.WEBGL_draw_buffers = this.gl.getExtension("WEBGL_draw_buffers")),
            (this.extensions.WEBGL_lose_context = this.gl.getExtension("WEBGL_lose_context")),
            (this.extensions.KHR_parallel_shader_compile = this.gl.getExtension(
              "KHR_parallel_shader_compile"
            )));
    }
    contextLost(e) {
      (this.state.isContextLost = !0),
        !!this.state.isActive &&
          (e.preventDefault(),
          this.nextRender.add(() => this.onContextLost && this.onContextLost()));
    }
    restoreContext() {
      !this.state.isActive ||
        (this.initState(),
        this.gl && this.extensions.WEBGL_lose_context
          ? this.extensions.WEBGL_lose_context.restoreContext()
          : (!this.gl && !this.production
              ? R(this.type + ": Could not restore the context because the context is not defined")
              : !this.extensions.WEBGL_lose_context &&
                !this.production &&
                R(
                  this.type +
                    ": Could not restore the context because the restore context extension is not defined"
                ),
            this.onError && this.onError()));
    }
    isContextexFullyRestored() {
      let e = !0;
      for (let t = 0; t < this.renderTargets.length; t++) {
        this.renderTargets[t].textures[0]._canDraw || (e = !1);
        break;
      }
      if (e)
        for (let t = 0; t < this.planes.length; t++)
          if (this.planes[t]._canDraw) {
            for (let i = 0; i < this.planes[t].textures.length; i++)
              if (!this.planes[t].textures[i]._canDraw) {
                e = !1;
                break;
              }
          } else {
            e = !1;
            break;
          }
      if (e)
        for (let t = 0; t < this.shaderPasses.length; t++)
          if (this.shaderPasses[t]._canDraw) {
            for (let i = 0; i < this.shaderPasses[t].textures.length; i++)
              if (!this.shaderPasses[t].textures[i]._canDraw) {
                e = !1;
                break;
              }
          } else {
            e = !1;
            break;
          }
      return e;
    }
    contextRestored() {
      this.getExtensions(),
        this.setBlendFunc(),
        this.setDepthTest(!0),
        this.cache.clear(),
        this.scene.initStacks();
      for (let t = 0; t < this.renderTargets.length; t++) this.renderTargets[t]._restoreContext();
      for (let t = 0; t < this.planes.length; t++) this.planes[t]._restoreContext();
      for (let t = 0; t < this.shaderPasses.length; t++) this.shaderPasses[t]._restoreContext();
      let e = this.nextRender.add(() => {
        this.isContextexFullyRestored() &&
          ((e.keep = !1),
          (this.state.isContextLost = !1),
          this.onContextRestored && this.onContextRestored(),
          this.onSceneChange(),
          this.needRender());
      }, !0);
    }
    setPixelRatio(e) {
      this.pixelRatio = e;
    }
    setSize() {
      if (!this.gl) return;
      let e = this.container.getBoundingClientRect();
      this._boundingRect = {
        width: e.width * this.pixelRatio,
        height: e.height * this.pixelRatio,
        top: e.top * this.pixelRatio,
        left: e.left * this.pixelRatio,
      };
      let t = !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/),
        i = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
      if (t && i) {
        function r(a) {
          let n = 0;
          for (; a && !isNaN(a.offsetTop); ) (n += a.offsetTop - a.scrollTop), (a = a.offsetParent);
          return n;
        }
        this._boundingRect.top = r(this.container) * this.pixelRatio;
      }
      (this.canvas.style.width = Math.floor(this._boundingRect.width / this.pixelRatio) + "px"),
        (this.canvas.style.height = Math.floor(this._boundingRect.height / this.pixelRatio) + "px"),
        (this.canvas.width = Math.floor(this._boundingRect.width * this._renderingScale)),
        (this.canvas.height = Math.floor(this._boundingRect.height * this._renderingScale)),
        this.gl.viewport(0, 0, this.gl.drawingBufferWidth, this.gl.drawingBufferHeight);
    }
    resize() {
      for (let e = 0; e < this.planes.length; e++)
        this.planes[e]._canDraw && this.planes[e].resize();
      for (let e = 0; e < this.shaderPasses.length; e++)
        this.shaderPasses[e]._canDraw && this.shaderPasses[e].resize();
      for (let e = 0; e < this.renderTargets.length; e++) this.renderTargets[e].resize();
      this.needRender();
    }
    clear() {
      this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    }
    clearDepth() {
      this.gl.clear(this.gl.DEPTH_BUFFER_BIT);
    }
    clearColor() {
      this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    }
    bindFrameBuffer(e, t) {
      let i = null;
      e
        ? ((i = e.index),
          i !== this.state.frameBufferID &&
            (this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, e._frameBuffer),
            this.gl.viewport(0, 0, e._size.width, e._size.height),
            e._shouldClear && !t && this.clear()))
        : this.state.frameBufferID !== null &&
          (this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null),
          this.gl.viewport(0, 0, this.gl.drawingBufferWidth, this.gl.drawingBufferHeight)),
        (this.state.frameBufferID = i);
    }
    setDepthTest(e) {
      e && !this.state.depthTest
        ? ((this.state.depthTest = e), this.gl.enable(this.gl.DEPTH_TEST))
        : !e &&
          this.state.depthTest &&
          ((this.state.depthTest = e), this.gl.disable(this.gl.DEPTH_TEST));
    }
    setBlendFunc() {
      this.gl.enable(this.gl.BLEND),
        this.premultipliedAlpha
          ? this.gl.blendFuncSeparate(
              this.gl.ONE,
              this.gl.ONE_MINUS_SRC_ALPHA,
              this.gl.ONE,
              this.gl.ONE_MINUS_SRC_ALPHA
            )
          : this.gl.blendFuncSeparate(
              this.gl.SRC_ALPHA,
              this.gl.ONE_MINUS_SRC_ALPHA,
              this.gl.ONE,
              this.gl.ONE_MINUS_SRC_ALPHA
            );
    }
    setFaceCulling(e) {
      if (this.state.cullFace !== e)
        if (((this.state.cullFace = e), e === "none")) this.gl.disable(this.gl.CULL_FACE);
        else {
          let t = e === "front" ? this.gl.FRONT : this.gl.BACK;
          this.gl.enable(this.gl.CULL_FACE), this.gl.cullFace(t);
        }
    }
    useProgram(e) {
      (this.state.currentProgramID === null || this.state.currentProgramID !== e.id) &&
        (this.gl.useProgram(e.program), (this.state.currentProgramID = e.id));
    }
    removePlane(e) {
      !this.gl ||
        ((this.planes = this.planes.filter((t) => t.uuid !== e.uuid)),
        this.scene.removePlane(e),
        (e = null),
        this.gl && this.clear(),
        this.onSceneChange());
    }
    removeRenderTarget(e) {
      if (!this.gl) return;
      let t = this.planes.find(
        (i) => i.type !== "PingPongPlane" && i.target && i.target.uuid === e.uuid
      );
      for (let i = 0; i < this.planes.length; i++)
        this.planes[i].target &&
          this.planes[i].target.uuid === e.uuid &&
          (this.planes[i].target = null);
      this.renderTargets = this.renderTargets.filter((i) => i.uuid !== e.uuid);
      for (let i = 0; i < this.renderTargets.length; i++) this.renderTargets[i].index = i;
      (e = null), this.gl && this.clear(), t && this.scene.resetPlaneStacks(), this.onSceneChange();
    }
    removeShaderPass(e) {
      !this.gl ||
        ((this.shaderPasses = this.shaderPasses.filter((t) => t.uuid !== e.uuid)),
        this.scene.removeShaderPass(e),
        (e = null),
        this.gl && this.clear(),
        this.onSceneChange());
    }
    enableDrawing() {
      this.state.drawingEnabled = !0;
    }
    disableDrawing() {
      this.state.drawingEnabled = !1;
    }
    needRender() {
      this.state.forceRender = !0;
    }
    render() {
      !this.gl || (this.clear(), (this.state.currentGeometryID = null), this.scene.draw());
    }
    deletePrograms() {
      for (let e = 0; e < this.cache.programs.length; e++) {
        let t = this.cache.programs[e];
        this.gl.deleteProgram(t.program);
      }
    }
    dispose() {
      if (!this.gl) return;
      for (this.state.isActive = !1; this.planes.length > 0; ) this.removePlane(this.planes[0]);
      for (; this.shaderPasses.length > 0; ) this.removeShaderPass(this.shaderPasses[0]);
      for (; this.renderTargets.length > 0; ) this.removeRenderTarget(this.renderTargets[0]);
      let e = this.nextRender.add(() => {
        this.planes.length === 0 &&
          this.shaderPasses.length === 0 &&
          this.renderTargets.length === 0 &&
          ((e.keep = !1),
          this.deletePrograms(),
          this.clear(),
          this.canvas.removeEventListener("webgllost", this._contextLostHandler, !1),
          this.canvas.removeEventListener("webglrestored", this._contextRestoredHandler, !1),
          this.gl &&
            this.extensions.WEBGL_lose_context &&
            this.extensions.WEBGL_lose_context.loseContext(),
          (this.canvas.width = this.canvas.width),
          (this.gl = null),
          this.container.removeChild(this.canvas),
          (this.container = null),
          (this.canvas = null),
          this.onDisposed && this.onDisposed());
      }, !0);
    }
  };
  var Fi = class {
    constructor({
      xOffset: e = 0,
      yOffset: t = 0,
      lastXDelta: i = 0,
      lastYDelta: r = 0,
      shouldWatch: a = !0,
      onScroll: n = () => {},
    } = {}) {
      (this.xOffset = e),
        (this.yOffset = t),
        (this.lastXDelta = i),
        (this.lastYDelta = r),
        (this.shouldWatch = a),
        (this.onScroll = n),
        (this.handler = this.scroll.bind(this, !0)),
        this.shouldWatch && window.addEventListener("scroll", this.handler, { passive: !0 });
    }
    scroll() {
      this.updateScrollValues(window.pageXOffset, window.pageYOffset);
    }
    updateScrollValues(e, t) {
      let i = this.xOffset;
      (this.xOffset = e), (this.lastXDelta = i - this.xOffset);
      let r = this.yOffset;
      (this.yOffset = t),
        (this.lastYDelta = r - this.yOffset),
        this.onScroll && this.onScroll(this.lastXDelta, this.lastYDelta);
    }
    dispose() {
      this.shouldWatch && window.removeEventListener("scroll", this.handler, { passive: !0 });
    }
  };
  var Wt = class {
    constructor({
      container: e,
      alpha: t = !0,
      premultipliedAlpha: i = !1,
      antialias: r = !0,
      depth: a = !0,
      failIfMajorPerformanceCaveat: n = !0,
      preserveDrawingBuffer: o = !1,
      stencil: l = !1,
      autoResize: h = !0,
      autoRender: d = !0,
      watchScroll: c = !0,
      pixelRatio: p = window.devicePixelRatio || 1,
      renderingScale: f = 1,
      production: u = !1,
    } = {}) {
      (this.type = "Curtains"),
        (this._autoResize = h),
        (this._autoRender = d),
        (this._watchScroll = c),
        (this.pixelRatio = p),
        (f = isNaN(f) ? 1 : parseFloat(f)),
        (this._renderingScale = Math.max(0.25, Math.min(1, f))),
        (this.premultipliedAlpha = i),
        (this.alpha = t),
        (this.antialias = r),
        (this.depth = a),
        (this.failIfMajorPerformanceCaveat = n),
        (this.preserveDrawingBuffer = o),
        (this.stencil = l),
        (this.production = u),
        (this.errors = !1),
        e
          ? this.setContainer(e)
          : this.production ||
            R(
              this.type +
                ": no container provided in the initial parameters. Use setContainer() method to set one later and initialize the WebGL context"
            );
    }
    setContainer(e) {
      if (e)
        if (typeof e == "string")
          if (((e = document.getElementById(e)), e)) this.container = e;
          else {
            let t = document.createElement("div");
            t.setAttribute("id", "curtains-canvas"),
              document.body.appendChild(t),
              (this.container = t),
              this.production ||
                R(
                  'Curtains: no valid container HTML element or ID provided, created a div with "curtains-canvas" ID instead'
                );
          }
        else e instanceof Element && (this.container = e);
      else {
        let t = document.createElement("div");
        t.setAttribute("id", "curtains-canvas"),
          document.body.appendChild(t),
          (this.container = t),
          this.production ||
            R(
              'Curtains: no valid container HTML element or ID provided, created a div with "curtains-canvas" ID instead'
            );
      }
      this._initCurtains();
    }
    _initCurtains() {
      (this.planes = []),
        (this.renderTargets = []),
        (this.shaderPasses = []),
        this._initRenderer(),
        !!this.gl &&
          (this._initScroll(),
          this._setSize(),
          this._addListeners(),
          this.container.appendChild(this.canvas),
          (this._animationFrameID = null),
          this._autoRender && this._animate());
    }
    _initRenderer() {
      (this.renderer = new Oi({
        alpha: this.alpha,
        antialias: this.antialias,
        premultipliedAlpha: this.premultipliedAlpha,
        depth: this.depth,
        failIfMajorPerformanceCaveat: this.failIfMajorPerformanceCaveat,
        preserveDrawingBuffer: this.preserveDrawingBuffer,
        stencil: this.stencil,
        container: this.container,
        pixelRatio: this.pixelRatio,
        renderingScale: this._renderingScale,
        production: this.production,
        onError: () => this._onRendererError(),
        onSuccess: () => this._onRendererSuccess(),
        onContextLost: () => this._onRendererContextLost(),
        onContextRestored: () => this._onRendererContextRestored(),
        onDisposed: () => this._onRendererDisposed(),
        onSceneChange: () => this._keepSync(),
      })),
        (this.gl = this.renderer.gl),
        (this.canvas = this.renderer.canvas);
    }
    restoreContext() {
      this.renderer.restoreContext();
    }
    _animate() {
      this.render(),
        (this._animationFrameID = window.requestAnimationFrame(this._animate.bind(this)));
    }
    enableDrawing() {
      this.renderer.enableDrawing();
    }
    disableDrawing() {
      this.renderer.disableDrawing();
    }
    needRender() {
      this.renderer.needRender();
    }
    nextRender(e, t = !1) {
      return this.renderer.nextRender.add(e, t);
    }
    clear() {
      this.renderer && this.renderer.clear();
    }
    clearDepth() {
      this.renderer && this.renderer.clearDepth();
    }
    clearColor() {
      this.renderer && this.renderer.clearColor();
    }
    isWebGL2() {
      return this.gl ? this.renderer._isWebGL2 : !1;
    }
    render() {
      this.renderer.nextRender.execute(),
        !(!this.renderer.state.drawingEnabled && !this.renderer.state.forceRender) &&
          (this.renderer.state.forceRender && (this.renderer.state.forceRender = !1),
          this._onRenderCallback && this._onRenderCallback(),
          this.renderer.render());
    }
    _addListeners() {
      (this._resizeHandler = null),
        this._autoResize &&
          ((this._resizeHandler = this.resize.bind(this, !0)),
          window.addEventListener("resize", this._resizeHandler, !1));
    }
    setPixelRatio(e, t) {
      (this.pixelRatio = parseFloat(Math.max(e, 1)) || 1),
        this.renderer.setPixelRatio(e),
        this.resize(t);
    }
    _setSize() {
      this.renderer.setSize(),
        this._scrollManager.shouldWatch &&
          ((this._scrollManager.xOffset = window.pageXOffset),
          (this._scrollManager.yOffset = window.pageYOffset));
    }
    getBoundingRect() {
      return this.renderer._boundingRect;
    }
    resize(e) {
      !this.gl ||
        (this._setSize(),
        this.renderer.resize(),
        this.nextRender(() => {
          this._onAfterResizeCallback && e && this._onAfterResizeCallback();
        }));
    }
    _initScroll() {
      this._scrollManager = new Fi({
        xOffset: window.pageXOffset,
        yOffset: window.pageYOffset,
        lastXDelta: 0,
        lastYDelta: 0,
        shouldWatch: this._watchScroll,
        onScroll: (e, t) => this._updateScroll(e, t),
      });
    }
    _updateScroll(e, t) {
      for (let i = 0; i < this.planes.length; i++)
        this.planes[i].watchScroll && this.planes[i].updateScrollPosition(e, t);
      this.renderer.needRender(), this._onScrollCallback && this._onScrollCallback();
    }
    updateScrollValues(e, t) {
      this._scrollManager.updateScrollValues(e, t);
    }
    getScrollDeltas() {
      return { x: this._scrollManager.lastXDelta, y: this._scrollManager.lastYDelta };
    }
    getScrollValues() {
      return { x: this._scrollManager.xOffset, y: this._scrollManager.yOffset };
    }
    _keepSync() {
      (this.planes = this.renderer.planes),
        (this.shaderPasses = this.renderer.shaderPasses),
        (this.renderTargets = this.renderer.renderTargets);
    }
    lerp(e, t, i) {
      return er(e, t, i);
    }
    onAfterResize(e) {
      return e && (this._onAfterResizeCallback = e), this;
    }
    onError(e) {
      return e && (this._onErrorCallback = e), this;
    }
    _onRendererError() {
      setTimeout(() => {
        this._onErrorCallback && !this.errors && this._onErrorCallback(), (this.errors = !0);
      }, 0);
    }
    onSuccess(e) {
      return e && (this._onSuccessCallback = e), this;
    }
    _onRendererSuccess() {
      setTimeout(() => {
        this._onSuccessCallback && this._onSuccessCallback();
      }, 0);
    }
    onContextLost(e) {
      return e && (this._onContextLostCallback = e), this;
    }
    _onRendererContextLost() {
      this._onContextLostCallback && this._onContextLostCallback();
    }
    onContextRestored(e) {
      return e && (this._onContextRestoredCallback = e), this;
    }
    _onRendererContextRestored() {
      this._onContextRestoredCallback && this._onContextRestoredCallback();
    }
    onRender(e) {
      return e && (this._onRenderCallback = e), this;
    }
    onScroll(e) {
      return e && (this._onScrollCallback = e), this;
    }
    dispose() {
      this.renderer.dispose();
    }
    _onRendererDisposed() {
      this._animationFrameID && window.cancelAnimationFrame(this._animationFrameID),
        this._resizeHandler && window.removeEventListener("resize", this._resizeHandler, !1),
        this._scrollManager && this._scrollManager.dispose();
    }
  };
  var Vi = class {
    constructor(e, t, i) {
      if (
        ((this.type = "Uniforms"),
        !e || e.type !== "Renderer"
          ? z(this.type + ": Renderer not passed as first argument", e)
          : e.gl || z(this.type + ": Renderer WebGL context is undefined", e),
        (this.renderer = e),
        (this.gl = e.gl),
        (this.program = t),
        (this.uniforms = {}),
        i)
      )
        for (let r in i) {
          let a = i[r];
          this.uniforms[r] = {
            name: a.name,
            type: a.type,
            value: a.value.clone && typeof a.value.clone == "function" ? a.value.clone() : a.value,
            update: null,
          };
        }
    }
    handleUniformSetting(e) {
      switch (e.type) {
        case "1i":
          e.update = this.setUniform1i.bind(this);
          break;
        case "1iv":
          e.update = this.setUniform1iv.bind(this);
          break;
        case "1f":
          e.update = this.setUniform1f.bind(this);
          break;
        case "1fv":
          e.update = this.setUniform1fv.bind(this);
          break;
        case "2i":
          e.update = this.setUniform2i.bind(this);
          break;
        case "2iv":
          e.update = this.setUniform2iv.bind(this);
          break;
        case "2f":
          e.update = this.setUniform2f.bind(this);
          break;
        case "2fv":
          e.update = this.setUniform2fv.bind(this);
          break;
        case "3i":
          e.update = this.setUniform3i.bind(this);
          break;
        case "3iv":
          e.update = this.setUniform3iv.bind(this);
          break;
        case "3f":
          e.update = this.setUniform3f.bind(this);
          break;
        case "3fv":
          e.update = this.setUniform3fv.bind(this);
          break;
        case "4i":
          e.update = this.setUniform4i.bind(this);
          break;
        case "4iv":
          e.update = this.setUniform4iv.bind(this);
          break;
        case "4f":
          e.update = this.setUniform4f.bind(this);
          break;
        case "4fv":
          e.update = this.setUniform4fv.bind(this);
          break;
        case "mat2":
          e.update = this.setUniformMatrix2fv.bind(this);
          break;
        case "mat3":
          e.update = this.setUniformMatrix3fv.bind(this);
          break;
        case "mat4":
          e.update = this.setUniformMatrix4fv.bind(this);
          break;
        default:
          this.renderer.production ||
            R(this.type + ": This uniform type is not handled : ", e.type);
      }
    }
    setInternalFormat(e) {
      e.value.type === "Vec2"
        ? ((e._internalFormat = "Vec2"), (e.lastValue = e.value.clone()))
        : e.value.type === "Vec3"
        ? ((e._internalFormat = "Vec3"), (e.lastValue = e.value.clone()))
        : e.value.type === "Mat4"
        ? ((e._internalFormat = "Mat4"), (e.lastValue = e.value.clone()))
        : e.value.type === "Quat"
        ? ((e._internalFormat = "Quat"), (e.lastValue = e.value.clone()))
        : Array.isArray(e.value)
        ? ((e._internalFormat = "array"), (e.lastValue = Array.from(e.value)))
        : e.value.constructor === Float32Array
        ? ((e._internalFormat = "mat"), (e.lastValue = e.value))
        : ((e._internalFormat = "float"), (e.lastValue = e.value));
    }
    setUniforms() {
      if (this.uniforms)
        for (let e in this.uniforms) {
          let t = this.uniforms[e];
          (t.location = this.gl.getUniformLocation(this.program, t.name)),
            t._internalFormat || this.setInternalFormat(t),
            t.type ||
              (t._internalFormat === "Vec2"
                ? (t.type = "2f")
                : t._internalFormat === "Vec3"
                ? (t.type = "3f")
                : t._internalFormat === "Mat4"
                ? (t.type = "mat4")
                : t._internalFormat === "array"
                ? t.value.length === 4
                  ? ((t.type = "4f"),
                    this.renderer.production ||
                      R(
                        this.type +
                          ": No uniform type declared for " +
                          t.name +
                          ", applied a 4f (array of 4 floats) uniform type"
                      ))
                  : t.value.length === 3
                  ? ((t.type = "3f"),
                    this.renderer.production ||
                      R(
                        this.type +
                          ": No uniform type declared for " +
                          t.name +
                          ", applied a 3f (array of 3 floats) uniform type"
                      ))
                  : t.value.length === 2 &&
                    ((t.type = "2f"),
                    this.renderer.production ||
                      R(
                        this.type +
                          ": No uniform type declared for " +
                          t.name +
                          ", applied a 2f (array of 2 floats) uniform type"
                      ))
                : t._internalFormat === "mat"
                ? t.value.length === 16
                  ? ((t.type = "mat4"),
                    this.renderer.production ||
                      R(
                        this.type +
                          ": No uniform type declared for " +
                          t.name +
                          ", applied a mat4 (4x4 matrix array) uniform type"
                      ))
                  : t.value.length === 9
                  ? ((t.type = "mat3"),
                    this.renderer.production ||
                      R(
                        this.type +
                          ": No uniform type declared for " +
                          t.name +
                          ", applied a mat3 (3x3 matrix array) uniform type"
                      ))
                  : t.value.length === 4 &&
                    ((t.type = "mat2"),
                    this.renderer.production ||
                      R(
                        this.type +
                          ": No uniform type declared for " +
                          t.name +
                          ", applied a mat2 (2x2 matrix array) uniform type"
                      ))
                : ((t.type = "1f"),
                  this.renderer.production ||
                    R(
                      this.type +
                        ": No uniform type declared for " +
                        t.name +
                        ", applied a 1f (float) uniform type"
                    ))),
            this.handleUniformSetting(t),
            t.update && t.update(t);
        }
    }
    updateUniforms() {
      if (this.uniforms)
        for (let e in this.uniforms) {
          let t = this.uniforms[e],
            i = !1;
          t._internalFormat === "Vec2" ||
          t._internalFormat === "Vec3" ||
          t._internalFormat === "Quat"
            ? t.value.equals(t.lastValue) || ((i = !0), t.lastValue.copy(t.value))
            : t.value.length
            ? JSON.stringify(t.value) !== JSON.stringify(t.lastValue) &&
              ((i = !0), (t.lastValue = Array.from(t.value)))
            : t.value !== t.lastValue && ((i = !0), (t.lastValue = t.value)),
            i && t.update && t.update(t);
        }
    }
    setUniform1i(e) {
      this.gl.uniform1i(e.location, e.value);
    }
    setUniform1iv(e) {
      this.gl.uniform1iv(e.location, e.value);
    }
    setUniform1f(e) {
      this.gl.uniform1f(e.location, e.value);
    }
    setUniform1fv(e) {
      this.gl.uniform1fv(e.location, e.value);
    }
    setUniform2i(e) {
      e._internalFormat === "Vec2"
        ? this.gl.uniform2i(e.location, e.value.x, e.value.y)
        : this.gl.uniform2i(e.location, e.value[0], e.value[1]);
    }
    setUniform2iv(e) {
      e._internalFormat === "Vec2"
        ? this.gl.uniform2iv(e.location, [e.value.x, e.value.y])
        : this.gl.uniform2iv(e.location, e.value);
    }
    setUniform2f(e) {
      e._internalFormat === "Vec2"
        ? this.gl.uniform2f(e.location, e.value.x, e.value.y)
        : this.gl.uniform2f(e.location, e.value[0], e.value[1]);
    }
    setUniform2fv(e) {
      e._internalFormat === "Vec2"
        ? this.gl.uniform2fv(e.location, [e.value.x, e.value.y])
        : this.gl.uniform2fv(e.location, e.value);
    }
    setUniform3i(e) {
      e._internalFormat === "Vec3"
        ? this.gl.uniform3i(e.location, e.value.x, e.value.y, e.value.z)
        : this.gl.uniform3i(e.location, e.value[0], e.value[1], e.value[2]);
    }
    setUniform3iv(e) {
      e._internalFormat === "Vec3"
        ? this.gl.uniform3iv(e.location, [e.value.x, e.value.y, e.value.z])
        : this.gl.uniform3iv(e.location, e.value);
    }
    setUniform3f(e) {
      e._internalFormat === "Vec3"
        ? this.gl.uniform3f(e.location, e.value.x, e.value.y, e.value.z)
        : this.gl.uniform3f(e.location, e.value[0], e.value[1], e.value[2]);
    }
    setUniform3fv(e) {
      e._internalFormat === "Vec3"
        ? this.gl.uniform3fv(e.location, [e.value.x, e.value.y, e.value.z])
        : this.gl.uniform3fv(e.location, e.value);
    }
    setUniform4i(e) {
      e._internalFormat === "Quat"
        ? this.gl.uniform4i(
            e.location,
            e.value.elements[0],
            e.value.elements[1],
            e.value.elements[2],
            e.value[3]
          )
        : this.gl.uniform4i(e.location, e.value[0], e.value[1], e.value[2], e.value[3]);
    }
    setUniform4iv(e) {
      e._internalFormat === "Quat"
        ? this.gl.uniform4iv(e.location, [
            e.value.elements[0],
            e.value.elements[1],
            e.value.elements[2],
            e.value[3],
          ])
        : this.gl.uniform4iv(e.location, e.value);
    }
    setUniform4f(e) {
      e._internalFormat === "Quat"
        ? this.gl.uniform4f(
            e.location,
            e.value.elements[0],
            e.value.elements[1],
            e.value.elements[2],
            e.value[3]
          )
        : this.gl.uniform4f(e.location, e.value[0], e.value[1], e.value[2], e.value[3]);
    }
    setUniform4fv(e) {
      e._internalFormat === "Quat"
        ? this.gl.uniform4fv(e.location, [
            e.value.elements[0],
            e.value.elements[1],
            e.value.elements[2],
            e.value[3],
          ])
        : this.gl.uniform4fv(e.location, e.value);
    }
    setUniformMatrix2fv(e) {
      this.gl.uniformMatrix2fv(e.location, !1, e.value);
    }
    setUniformMatrix3fv(e) {
      this.gl.uniformMatrix3fv(e.location, !1, e.value);
    }
    setUniformMatrix4fv(e) {
      e._internalFormat === "Mat4"
        ? this.gl.uniformMatrix4fv(e.location, !1, e.value.elements)
        : this.gl.uniformMatrix4fv(e.location, !1, e.value);
    }
  };
  var Ma = `
precision mediump float;
`,
    ze = Ma.replace(/\n/g, "");
  var Ea = `
attribute vec3 aVertexPosition;
attribute vec2 aTextureCoord;
`,
    jt = Ea.replace(/\n/g, "");
  var Da = `
varying vec3 vVertexPosition;
varying vec2 vTextureCoord;
`,
    Ie = Da.replace(/\n/g, "");
  var La =
      ze +
      jt +
      Ie +
      `
uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;

void main() {
    vTextureCoord = aTextureCoord;
    vVertexPosition = aVertexPosition;
    
    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
}
`,
    tr = La.replace(/\n/g, "");
  var Aa =
      ze +
      Ie +
      `
void main() {
    gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
}
`,
    ir = Aa.replace(/\n/g, "");
  var ka =
      ze +
      jt +
      Ie +
      `
void main() {
    vTextureCoord = aTextureCoord;
    vVertexPosition = aVertexPosition;
    
    gl_Position = vec4(aVertexPosition, 1.0);
}
`,
    sr = ka.replace(/\n/g, "");
  var Oa =
      ze +
      Ie +
      `
uniform sampler2D uRenderTexture;

void main() {
    gl_FragColor = texture2D(uRenderTexture, vTextureCoord);
}
`,
    rr = Oa.replace(/\n/g, "");
  var ar = 0,
    Gt = class {
      constructor(e, { parent: t, vertexShader: i, fragmentShader: r } = {}) {
        (this.type = "Program"),
          !e || e.type !== "Renderer"
            ? z(this.type + ": Renderer not passed as first argument", e)
            : e.gl || z(this.type + ": Renderer WebGL context is undefined", e),
          (this.renderer = e),
          (this.gl = this.renderer.gl),
          (this.parent = t),
          (this.defaultVsCode = this.parent.type === "Plane" ? tr : sr),
          (this.defaultFsCode = this.parent.type === "Plane" ? ir : rr),
          i
            ? (this.vsCode = i)
            : (!this.renderer.production &&
                this.parent.type === "Plane" &&
                R(this.parent.type + ": No vertex shader provided, will use a default one"),
              (this.vsCode = this.defaultVsCode)),
          r
            ? (this.fsCode = r)
            : (this.renderer.production ||
                R(this.parent.type + ": No fragment shader provided, will use a default one"),
              (this.fsCode = this.defaultFsCode)),
          (this.compiled = !0),
          this.setupProgram();
      }
      createShader(e, t) {
        let i = this.gl.createShader(t);
        if (
          (this.gl.shaderSource(i, e),
          this.gl.compileShader(i),
          !this.renderer.production && !this.gl.getShaderParameter(i, this.gl.COMPILE_STATUS))
        ) {
          let r = t === this.gl.VERTEX_SHADER ? "vertex shader" : "fragment shader",
            n = this.gl.getShaderSource(i).split(`
`);
          for (let o = 0; o < n.length; o++) n[o] = o + 1 + ": " + n[o];
          return (
            (n = n.join(`
`)),
            R(
              this.type + ": Errors occurred while compiling the",
              r,
              `:
`,
              this.gl.getShaderInfoLog(i)
            ),
            z(n),
            R(this.type + ": Will use a default", r),
            this.createShader(
              t === this.gl.VERTEX_SHADER ? this.defaultVsCode : this.defaultFsCode,
              t
            )
          );
        }
        return i;
      }
      useNewShaders() {
        (this.vertexShader = this.createShader(this.vsCode, this.gl.VERTEX_SHADER)),
          (this.fragmentShader = this.createShader(this.fsCode, this.gl.FRAGMENT_SHADER)),
          (!this.vertexShader || !this.fragmentShader) &&
            (this.renderer.production ||
              R(this.type + ": Unable to find or compile the vertex or fragment shader"));
      }
      setupProgram() {
        let e = this.renderer.cache.getProgramFromShaders(this.vsCode, this.fsCode);
        e
          ? ((this.vertexShader = e.vertexShader),
            (this.fragmentShader = e.fragmentShader),
            (this.activeUniforms = e.activeUniforms),
            this.createProgram())
          : (this.useNewShaders(),
            this.compiled && (this.createProgram(), this.renderer.cache.addProgram(this)));
      }
      createProgram() {
        if (
          (ar++,
          (this.id = ar),
          (this.program = this.gl.createProgram()),
          this.gl.attachShader(this.program, this.vertexShader),
          this.gl.attachShader(this.program, this.fragmentShader),
          this.gl.linkProgram(this.program),
          !this.renderer.production &&
            !this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS))
        ) {
          R(
            this.type +
              ": Unable to initialize the shader program: " +
              this.gl.getProgramInfoLog(this.program)
          ),
            R(this.type + ": Will use default vertex and fragment shaders"),
            (this.vertexShader = this.createShader(this.defaultVsCode, this.gl.VERTEX_SHADER)),
            (this.fragmentShader = this.createShader(this.defaultFsCode, this.gl.FRAGMENT_SHADER)),
            this.createProgram();
          return;
        }
        if (
          (this.gl.deleteShader(this.vertexShader),
          this.gl.deleteShader(this.fragmentShader),
          !this.activeUniforms)
        ) {
          this.activeUniforms = { textures: [], textureMatrices: [] };
          let e = this.gl.getProgramParameter(this.program, this.gl.ACTIVE_UNIFORMS);
          for (let t = 0; t < e; t++) {
            let i = this.gl.getActiveUniform(this.program, t);
            i.type === this.gl.SAMPLER_2D && this.activeUniforms.textures.push(i.name),
              i.type === this.gl.FLOAT_MAT4 &&
                i.name !== "uMVMatrix" &&
                i.name !== "uPMatrix" &&
                this.activeUniforms.textureMatrices.push(i.name);
          }
        }
      }
      createUniforms(e) {
        (this.uniformsManager = new Vi(this.renderer, this.program, e)), this.setUniforms();
      }
      setUniforms() {
        this.renderer.useProgram(this), this.uniformsManager.setUniforms();
      }
      updateUniforms() {
        this.renderer.useProgram(this), this.uniformsManager.updateUniforms();
      }
    };
  var zi = class {
    constructor(e, { program: t = null, width: i = 1, height: r = 1 } = {}) {
      (this.type = "Geometry"),
        !e || e.type !== "Renderer"
          ? z(this.type + ": Renderer not passed as first argument", e)
          : e.gl || z(this.type + ": Renderer WebGL context is undefined", e),
        (this.renderer = e),
        (this.gl = this.renderer.gl),
        (this.definition = { id: i * r + i, width: i, height: r }),
        this.setDefaultAttributes(),
        this.setVerticesUVs();
    }
    restoreContext(e) {
      (this.program = null), this.setDefaultAttributes(), this.setVerticesUVs(), this.setProgram(e);
    }
    setDefaultAttributes() {
      this.attributes = {
        vertexPosition: { name: "aVertexPosition", size: 3 },
        textureCoord: { name: "aTextureCoord", size: 3 },
      };
    }
    setVerticesUVs() {
      let e = this.renderer.cache.getGeometryFromID(this.definition.id);
      e
        ? ((this.attributes.vertexPosition.array = e.vertices),
          (this.attributes.textureCoord.array = e.uvs))
        : (this.computeVerticesUVs(),
          this.renderer.cache.addGeometry(
            this.definition.id,
            this.attributes.vertexPosition.array,
            this.attributes.textureCoord.array
          ));
    }
    setProgram(e) {
      (this.program = e.program),
        this.initAttributes(),
        this.renderer._isWebGL2
          ? ((this._vao = this.gl.createVertexArray()), this.gl.bindVertexArray(this._vao))
          : this.renderer.extensions.OES_vertex_array_object &&
            ((this._vao = this.renderer.extensions.OES_vertex_array_object.createVertexArrayOES()),
            this.renderer.extensions.OES_vertex_array_object.bindVertexArrayOES(this._vao)),
        this.initializeBuffers();
    }
    initAttributes() {
      for (let e in this.attributes)
        (this.attributes[e].location = this.gl.getAttribLocation(
          this.program,
          this.attributes[e].name
        )),
          (this.attributes[e].buffer = this.gl.createBuffer()),
          (this.attributes[e].numberOfItems =
            this.definition.width * this.definition.height * this.attributes[e].size * 2);
    }
    computeVerticesUVs() {
      (this.attributes.vertexPosition.array = []), (this.attributes.textureCoord.array = []);
      let e = this.attributes.vertexPosition.array,
        t = this.attributes.textureCoord.array;
      for (let i = 0; i < this.definition.height; i++) {
        let r = i / this.definition.height;
        for (let a = 0; a < this.definition.width; a++) {
          let n = a / this.definition.width;
          t.push(n),
            t.push(r),
            t.push(0),
            e.push((n - 0.5) * 2),
            e.push((r - 0.5) * 2),
            e.push(0),
            t.push(n + 1 / this.definition.width),
            t.push(r),
            t.push(0),
            e.push((n + 1 / this.definition.width - 0.5) * 2),
            e.push((r - 0.5) * 2),
            e.push(0),
            t.push(n),
            t.push(r + 1 / this.definition.height),
            t.push(0),
            e.push((n - 0.5) * 2),
            e.push((r + 1 / this.definition.height - 0.5) * 2),
            e.push(0),
            t.push(n),
            t.push(r + 1 / this.definition.height),
            t.push(0),
            e.push((n - 0.5) * 2),
            e.push((r + 1 / this.definition.height - 0.5) * 2),
            e.push(0),
            t.push(n + 1 / this.definition.width),
            t.push(r),
            t.push(0),
            e.push((n + 1 / this.definition.width - 0.5) * 2),
            e.push((r - 0.5) * 2),
            e.push(0),
            t.push(n + 1 / this.definition.width),
            t.push(r + 1 / this.definition.height),
            t.push(0),
            e.push((n + 1 / this.definition.width - 0.5) * 2),
            e.push((r + 1 / this.definition.height - 0.5) * 2),
            e.push(0);
        }
      }
    }
    initializeBuffers() {
      if (!!this.attributes) {
        for (let e in this.attributes)
          this.gl.enableVertexAttribArray(this.attributes[e].location),
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.attributes[e].buffer),
            this.gl.bufferData(
              this.gl.ARRAY_BUFFER,
              new Float32Array(this.attributes[e].array),
              this.gl.STATIC_DRAW
            ),
            this.gl.vertexAttribPointer(
              this.attributes[e].location,
              this.attributes[e].size,
              this.gl.FLOAT,
              !1,
              0,
              0
            );
        this.renderer.state.currentGeometryID = this.definition.id;
      }
    }
    bindBuffers() {
      if (this._vao)
        this.renderer._isWebGL2
          ? this.gl.bindVertexArray(this._vao)
          : this.renderer.extensions.OES_vertex_array_object.bindVertexArrayOES(this._vao);
      else
        for (let e in this.attributes)
          this.gl.enableVertexAttribArray(this.attributes[e].location),
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.attributes[e].buffer),
            this.gl.vertexAttribPointer(
              this.attributes[e].location,
              this.attributes[e].size,
              this.gl.FLOAT,
              !1,
              0,
              0
            );
      this.renderer.state.currentGeometryID = this.definition.id;
    }
    draw() {
      this.gl.drawArrays(this.gl.TRIANGLES, 0, this.attributes.vertexPosition.numberOfItems);
    }
    dispose() {
      this._vao &&
        (this.renderer._isWebGL2
          ? this.gl.deleteVertexArray(this._vao)
          : this.renderer.extensions.OES_vertex_array_object.deleteVertexArrayOES(this._vao));
      for (let e in this.attributes)
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.attributes[e].buffer),
          this.gl.bufferData(this.gl.ARRAY_BUFFER, 1, this.gl.STATIC_DRAW),
          this.gl.deleteBuffer(this.attributes[e].buffer);
      (this.attributes = null), (this.renderer.state.currentGeometryID = null);
    }
  };
  var Q = class {
    constructor(e = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])) {
      (this.type = "Mat4"), (this.elements = e);
    }
    setFromArray(e) {
      for (let t = 0; t < this.elements.length; t++) this.elements[t] = e[t];
      return this;
    }
    copy(e) {
      let t = e.elements;
      return (
        (this.elements[0] = t[0]),
        (this.elements[1] = t[1]),
        (this.elements[2] = t[2]),
        (this.elements[3] = t[3]),
        (this.elements[4] = t[4]),
        (this.elements[5] = t[5]),
        (this.elements[6] = t[6]),
        (this.elements[7] = t[7]),
        (this.elements[8] = t[8]),
        (this.elements[9] = t[9]),
        (this.elements[10] = t[10]),
        (this.elements[11] = t[11]),
        (this.elements[12] = t[12]),
        (this.elements[13] = t[13]),
        (this.elements[14] = t[14]),
        (this.elements[15] = t[15]),
        this
      );
    }
    clone() {
      return new Q().copy(this);
    }
    multiply(e) {
      let t = this.elements,
        i = e.elements,
        r = new Q();
      return (
        (r.elements[0] = i[0] * t[0] + i[1] * t[4] + i[2] * t[8] + i[3] * t[12]),
        (r.elements[1] = i[0] * t[1] + i[1] * t[5] + i[2] * t[9] + i[3] * t[13]),
        (r.elements[2] = i[0] * t[2] + i[1] * t[6] + i[2] * t[10] + i[3] * t[14]),
        (r.elements[3] = i[0] * t[3] + i[1] * t[7] + i[2] * t[11] + i[3] * t[15]),
        (r.elements[4] = i[4] * t[0] + i[5] * t[4] + i[6] * t[8] + i[7] * t[12]),
        (r.elements[5] = i[4] * t[1] + i[5] * t[5] + i[6] * t[9] + i[7] * t[13]),
        (r.elements[6] = i[4] * t[2] + i[5] * t[6] + i[6] * t[10] + i[7] * t[14]),
        (r.elements[7] = i[4] * t[3] + i[5] * t[7] + i[6] * t[11] + i[7] * t[15]),
        (r.elements[8] = i[8] * t[0] + i[9] * t[4] + i[10] * t[8] + i[11] * t[12]),
        (r.elements[9] = i[8] * t[1] + i[9] * t[5] + i[10] * t[9] + i[11] * t[13]),
        (r.elements[10] = i[8] * t[2] + i[9] * t[6] + i[10] * t[10] + i[11] * t[14]),
        (r.elements[11] = i[8] * t[3] + i[9] * t[7] + i[10] * t[11] + i[11] * t[15]),
        (r.elements[12] = i[12] * t[0] + i[13] * t[4] + i[14] * t[8] + i[15] * t[12]),
        (r.elements[13] = i[12] * t[1] + i[13] * t[5] + i[14] * t[9] + i[15] * t[13]),
        (r.elements[14] = i[12] * t[2] + i[13] * t[6] + i[14] * t[10] + i[15] * t[14]),
        (r.elements[15] = i[12] * t[3] + i[13] * t[7] + i[14] * t[11] + i[15] * t[15]),
        r
      );
    }
    getInverse() {
      let e = this.elements,
        t = new Q(),
        i = t.elements,
        r = e[0],
        a = e[1],
        n = e[2],
        o = e[3],
        l = e[4],
        h = e[5],
        d = e[6],
        c = e[7],
        p = e[8],
        f = e[9],
        u = e[10],
        g = e[11],
        _ = e[12],
        v = e[13],
        x = e[14],
        T = e[15],
        m = r * h - a * l,
        y = r * d - n * l,
        w = r * c - o * l,
        b = a * d - n * h,
        P = a * c - o * h,
        C = n * c - o * d,
        E = p * v - f * _,
        F = p * x - u * _,
        I = p * T - g * _,
        k = f * x - u * v,
        U = f * T - g * v,
        V = u * T - g * x,
        M = m * V - y * U + w * k + b * I - P * F + C * E;
      return M
        ? ((M = 1 / M),
          (i[0] = (h * V - d * U + c * k) * M),
          (i[1] = (n * U - a * V - o * k) * M),
          (i[2] = (v * C - x * P + T * b) * M),
          (i[3] = (u * P - f * C - g * b) * M),
          (i[4] = (d * I - l * V - c * F) * M),
          (i[5] = (r * V - n * I + o * F) * M),
          (i[6] = (x * w - _ * C - T * y) * M),
          (i[7] = (p * C - u * w + g * y) * M),
          (i[8] = (l * U - h * I + c * E) * M),
          (i[9] = (a * I - r * U - o * E) * M),
          (i[10] = (_ * P - v * w + T * m) * M),
          (i[11] = (f * w - p * P - g * m) * M),
          (i[12] = (h * F - l * k - d * E) * M),
          (i[13] = (r * k - a * F + n * E) * M),
          (i[14] = (v * y - _ * b - x * m) * M),
          (i[15] = (p * b - f * y + u * m) * M),
          t)
        : null;
    }
    scale(e) {
      let t = this.elements;
      return (
        (t[0] *= e.x),
        (t[1] *= e.x),
        (t[2] *= e.x),
        (t[3] *= e.x),
        (t[4] *= e.y),
        (t[5] *= e.y),
        (t[6] *= e.y),
        (t[7] *= e.y),
        (t[8] *= e.z),
        (t[9] *= e.z),
        (t[10] *= e.z),
        (t[11] *= e.z),
        this
      );
    }
    compose(e, t, i) {
      let r = this.elements,
        a = t.elements[0],
        n = t.elements[1],
        o = t.elements[2],
        l = t.elements[3],
        h = a + a,
        d = n + n,
        c = o + o,
        p = a * h,
        f = a * d,
        u = a * c,
        g = n * d,
        _ = n * c,
        v = o * c,
        x = l * h,
        T = l * d,
        m = l * c,
        y = i.x,
        w = i.y,
        b = i.z;
      return (
        (r[0] = (1 - (g + v)) * y),
        (r[1] = (f + m) * y),
        (r[2] = (u - T) * y),
        (r[3] = 0),
        (r[4] = (f - m) * w),
        (r[5] = (1 - (p + v)) * w),
        (r[6] = (_ + x) * w),
        (r[7] = 0),
        (r[8] = (u + T) * b),
        (r[9] = (_ - x) * b),
        (r[10] = (1 - (p + g)) * b),
        (r[11] = 0),
        (r[12] = e.x),
        (r[13] = e.y),
        (r[14] = e.z),
        (r[15] = 1),
        this
      );
    }
    composeFromOrigin(e, t, i, r) {
      let a = this.elements,
        n = t.elements[0],
        o = t.elements[1],
        l = t.elements[2],
        h = t.elements[3],
        d = n + n,
        c = o + o,
        p = l + l,
        f = n * d,
        u = n * c,
        g = n * p,
        _ = o * c,
        v = o * p,
        x = l * p,
        T = h * d,
        m = h * c,
        y = h * p,
        w = i.x,
        b = i.y,
        P = i.z,
        C = r.x,
        E = r.y,
        F = r.z,
        I = (1 - (_ + x)) * w,
        k = (u + y) * w,
        U = (g - m) * w,
        V = (u - y) * b,
        M = (1 - (f + x)) * b,
        fe = (v + T) * b,
        pe = (g + m) * P,
        Ce = (v - T) * P,
        ge = (1 - (f + _)) * P;
      return (
        (a[0] = I),
        (a[1] = k),
        (a[2] = U),
        (a[3] = 0),
        (a[4] = V),
        (a[5] = M),
        (a[6] = fe),
        (a[7] = 0),
        (a[8] = pe),
        (a[9] = Ce),
        (a[10] = ge),
        (a[11] = 0),
        (a[12] = e.x + C - (I * C + V * E + pe * F)),
        (a[13] = e.y + E - (k * C + M * E + Ce * F)),
        (a[14] = e.z + F - (U * C + fe * E + ge * F)),
        (a[15] = 1),
        this
      );
    }
  };
  var N = class {
    constructor(e = 0, t = e) {
      (this.type = "Vec2"), (this._x = e), (this._y = t);
    }
    get x() {
      return this._x;
    }
    get y() {
      return this._y;
    }
    set x(e) {
      let t = e !== this._x;
      (this._x = e), t && this._onChangeCallback && this._onChangeCallback();
    }
    set y(e) {
      let t = e !== this._y;
      (this._y = e), t && this._onChangeCallback && this._onChangeCallback();
    }
    onChange(e) {
      return e && (this._onChangeCallback = e), this;
    }
    set(e, t) {
      return (this._x = e), (this._y = t), this;
    }
    add(e) {
      return (this._x += e.x), (this._y += e.y), this;
    }
    addScalar(e) {
      return (this._x += e), (this._y += e), this;
    }
    sub(e) {
      return (this._x -= e.x), (this._y -= e.y), this;
    }
    subScalar(e) {
      return (this._x -= e), (this._y -= e), this;
    }
    multiply(e) {
      return (this._x *= e.x), (this._y *= e.y), this;
    }
    multiplyScalar(e) {
      return (this._x *= e), (this._y *= e), this;
    }
    copy(e) {
      return (this._x = e.x), (this._y = e.y), this;
    }
    clone() {
      return new N(this._x, this._y);
    }
    sanitizeNaNValuesWith(e) {
      return (
        (this._x = isNaN(this._x) ? e.x : parseFloat(this._x)),
        (this._y = isNaN(this._y) ? e.y : parseFloat(this._y)),
        this
      );
    }
    max(e) {
      return (this._x = Math.max(this._x, e.x)), (this._y = Math.max(this._y, e.y)), this;
    }
    min(e) {
      return (this._x = Math.min(this._x, e.x)), (this._y = Math.min(this._y, e.y)), this;
    }
    equals(e) {
      return this._x === e.x && this._y === e.y;
    }
    normalize() {
      let e = this._x * this._x + this._y * this._y;
      return e > 0 && (e = 1 / Math.sqrt(e)), (this._x *= e), (this._y *= e), this;
    }
    dot(e) {
      return this._x * e.x + this._y * e.y;
    }
  };
  var A = class {
    constructor(e = 0, t = e, i = e) {
      (this.type = "Vec3"), (this._x = e), (this._y = t), (this._z = i);
    }
    get x() {
      return this._x;
    }
    get y() {
      return this._y;
    }
    get z() {
      return this._z;
    }
    set x(e) {
      let t = e !== this._x;
      (this._x = e), t && this._onChangeCallback && this._onChangeCallback();
    }
    set y(e) {
      let t = e !== this._y;
      (this._y = e), t && this._onChangeCallback && this._onChangeCallback();
    }
    set z(e) {
      let t = e !== this._z;
      (this._z = e), t && this._onChangeCallback && this._onChangeCallback();
    }
    onChange(e) {
      return e && (this._onChangeCallback = e), this;
    }
    set(e, t, i) {
      return (this._x = e), (this._y = t), (this._z = i), this;
    }
    add(e) {
      return (this._x += e.x), (this._y += e.y), (this._z += e.z), this;
    }
    addScalar(e) {
      return (this._x += e), (this._y += e), (this._z += e), this;
    }
    sub(e) {
      return (this._x -= e.x), (this._y -= e.y), (this._z -= e.z), this;
    }
    subScalar(e) {
      return (this._x -= e), (this._y -= e), (this._z -= e), this;
    }
    multiply(e) {
      return (this._x *= e.x), (this._y *= e.y), (this._z *= e.z), this;
    }
    multiplyScalar(e) {
      return (this._x *= e), (this._y *= e), (this._z *= e), this;
    }
    copy(e) {
      return (this._x = e.x), (this._y = e.y), (this._z = e.z), this;
    }
    clone() {
      return new A(this._x, this._y, this._z);
    }
    sanitizeNaNValuesWith(e) {
      return (
        (this._x = isNaN(this._x) ? e.x : parseFloat(this._x)),
        (this._y = isNaN(this._y) ? e.y : parseFloat(this._y)),
        (this._z = isNaN(this._z) ? e.z : parseFloat(this._z)),
        this
      );
    }
    max(e) {
      return (
        (this._x = Math.max(this._x, e.x)),
        (this._y = Math.max(this._y, e.y)),
        (this._z = Math.max(this._z, e.z)),
        this
      );
    }
    min(e) {
      return (
        (this._x = Math.min(this._x, e.x)),
        (this._y = Math.min(this._y, e.y)),
        (this._z = Math.min(this._z, e.z)),
        this
      );
    }
    equals(e) {
      return this._x === e.x && this._y === e.y && this._z === e.z;
    }
    normalize() {
      let e = this._x * this._x + this._y * this._y + this._z * this._z;
      return e > 0 && (e = 1 / Math.sqrt(e)), (this._x *= e), (this._y *= e), (this._z *= e), this;
    }
    dot(e) {
      return this._x * e.x + this._y * e.y + this._z * e.z;
    }
    applyMat4(e) {
      let t = this._x,
        i = this._y,
        r = this._z,
        a = e.elements,
        n = a[3] * t + a[7] * i + a[11] * r + a[15];
      return (
        (n = n || 1),
        (this._x = (a[0] * t + a[4] * i + a[8] * r + a[12]) / n),
        (this._y = (a[1] * t + a[5] * i + a[9] * r + a[13]) / n),
        (this._z = (a[2] * t + a[6] * i + a[10] * r + a[14]) / n),
        this
      );
    }
    applyQuat(e) {
      let t = this._x,
        i = this._y,
        r = this._z,
        a = e.elements[0],
        n = e.elements[1],
        o = e.elements[2],
        l = e.elements[3],
        h = l * t + n * r - o * i,
        d = l * i + o * t - a * r,
        c = l * r + a * i - n * t,
        p = -a * t - n * i - o * r;
      return (
        (this._x = h * l + p * -a + d * -o - c * -n),
        (this._y = d * l + p * -n + c * -a - h * -o),
        (this._z = c * l + p * -o + h * -n - d * -a),
        this
      );
    }
    project(e) {
      return this.applyMat4(e.viewMatrix).applyMat4(e.projectionMatrix), this;
    }
    unproject(e) {
      return this.applyMat4(e.projectionMatrix.getInverse()).applyMat4(e.worldMatrix), this;
    }
  };
  var Ii = new N(),
    Fa = new A(),
    Va = new Q(),
    ae = class {
      constructor(
        e,
        {
          isFBOTexture: t = !1,
          fromTexture: i = !1,
          loader: r,
          sampler: a,
          floatingPoint: n = "none",
          premultiplyAlpha: o = !1,
          anisotropy: l = 1,
          generateMipmap: h = null,
          wrapS: d,
          wrapT: c,
          minFilter: p,
          magFilter: f,
        } = {}
      ) {
        if (
          ((this.type = "Texture"),
          (e = (e && e.renderer) || e),
          !e || e.type !== "Renderer"
            ? z(this.type + ": Renderer not passed as first argument", e)
            : e.gl || z(this.type + ": Renderer WebGL context is undefined", e),
          (this.renderer = e),
          (this.gl = this.renderer.gl),
          (this.uuid = ht()),
          (this._globalParameters = {
            unpackAlignment: 4,
            flipY: !t,
            premultiplyAlpha: !1,
            shouldPremultiplyAlpha: o,
            floatingPoint: n,
            type: this.gl.UNSIGNED_BYTE,
            internalFormat: this.gl.RGBA,
            format: this.gl.RGBA,
          }),
          (this.parameters = {
            anisotropy: l,
            generateMipmap: h,
            wrapS: d || this.gl.CLAMP_TO_EDGE,
            wrapT: c || this.gl.CLAMP_TO_EDGE,
            minFilter: p || this.gl.LINEAR,
            magFilter: f || this.gl.LINEAR,
            _shouldUpdate: !0,
          }),
          this._initState(),
          (this.sourceType = t ? "fbo" : "empty"),
          (this._samplerName = a),
          (this._sampler = { isActive: !1, isTextureBound: !1, texture: this.gl.createTexture() }),
          (this._textureMatrix = { matrix: new Q(), isActive: !1 }),
          (this._size = { width: 1, height: 1 }),
          (this.scale = new N(1)),
          this.scale.onChange(() => this.resize()),
          (this.offset = new N()),
          this.offset.onChange(() => this.resize()),
          (this._loader = r),
          (this._sourceLoaded = !1),
          (this._uploaded = !1),
          (this._willUpdate = !1),
          (this.shouldUpdate = !1),
          (this._forceUpdate = !1),
          (this.userData = {}),
          (this._canDraw = !1),
          i)
        ) {
          (this._copyOnInit = !0), (this._copiedFrom = i);
          return;
        }
        (this._copyOnInit = !1), this._initTexture();
      }
      _initState() {
        this._state = {
          anisotropy: 1,
          generateMipmap: !1,
          wrapS: null,
          wrapT: null,
          minFilter: null,
          magFilter: this.gl.LINEAR,
        };
      }
      _initTexture() {
        this.gl.bindTexture(this.gl.TEXTURE_2D, this._sampler.texture),
          this.sourceType === "empty" &&
            ((this._globalParameters.flipY = !1),
            this._updateGlobalTexParameters(),
            this.gl.texImage2D(
              this.gl.TEXTURE_2D,
              0,
              this.gl.RGBA,
              1,
              1,
              0,
              this.gl.RGBA,
              this.gl.UNSIGNED_BYTE,
              new Uint8Array([0, 0, 0, 255])
            ),
            (this._canDraw = !0));
      }
      _restoreFromTexture() {
        this._copyOnInit || this._initTexture(),
          this._parent && (this._setTextureUniforms(), this._setSize()),
          this.copy(this._copiedFrom),
          (this._canDraw = !0);
      }
      _restoreContext() {
        if (
          ((this._canDraw = !1),
          (this._sampler.isActive = !1),
          this._initState(),
          (this._state.generateMipmap = !1),
          (this.parameters._shouldUpdate = !0),
          !this._copiedFrom)
        )
          this._initTexture(),
            this._parent && this._setParent(),
            this.source &&
              (this.setSource(this.source),
              this.sourceType === "image"
                ? this.renderer.cache.addTexture(this)
                : this.needUpdate()),
            (this._canDraw = !0);
        else {
          let e = this.renderer.nextRender.add(() => {
            this._copiedFrom._canDraw && (this._restoreFromTexture(), (e.keep = !1));
          }, !0);
        }
      }
      addParent(e) {
        if (
          !e ||
          (e.type !== "Plane" &&
            e.type !== "PingPongPlane" &&
            e.type !== "ShaderPass" &&
            e.type !== "RenderTarget")
        ) {
          this.renderer.production ||
            R(
              this.type + ": cannot add texture as a child of ",
              e,
              " because it is not a valid parent"
            );
          return;
        }
        (this._parent = e),
          (this.index = this._parent.textures.length),
          this._parent.textures.push(this),
          this._setParent();
      }
      _setParent() {
        if (
          ((this._sampler.name = this._samplerName || "uSampler" + this.index),
          (this._textureMatrix.name = this._samplerName
            ? this._samplerName + "Matrix"
            : "uTextureMatrix" + this.index),
          this._parent._program)
        ) {
          if (!this._parent._program.compiled) {
            this.renderer.production ||
              R(this.type + ": Unable to create the texture because the program is not valid");
            return;
          }
          if ((this._setTextureUniforms(), this._copyOnInit)) {
            let e = this.renderer.nextRender.add(() => {
              this._copiedFrom._canDraw &&
                this._copiedFrom._uploaded &&
                (this.copy(this._copiedFrom), (e.keep = !1));
            }, !0);
            return;
          }
          this.source
            ? this._parent.loader &&
              this._parent.loader._addSourceToParent(this.source, this.sourceType)
            : (this._size = {
                width: this._parent._boundingRect.document.width,
                height: this._parent._boundingRect.document.height,
              }),
            this._setSize();
        } else
          this._parent.type === "RenderTarget" &&
            ((this._size = {
              width:
                (this._parent._size && this._parent._size.width) ||
                this.renderer._boundingRect.width,
              height:
                (this._parent._size && this._parent._size.height) ||
                this.renderer._boundingRect.height,
            }),
            (this._globalParameters.premultiplyAlpha =
              this._globalParameters.shouldPremultiplyAlpha),
            this._upload(),
            this._updateTexParameters(),
            (this._canDraw = !0));
      }
      hasParent() {
        return !!this._parent;
      }
      _setTextureUniforms() {
        let e = this._parent._program.activeUniforms;
        for (let t = 0; t < e.textures.length; t++)
          e.textures[t] === this._sampler.name &&
            ((this._sampler.isActive = !0),
            this.renderer.useProgram(this._parent._program),
            (this._sampler.location = this.gl.getUniformLocation(
              this._parent._program.program,
              this._sampler.name
            )),
            e.textureMatrices.find((r) => r === this._textureMatrix.name) &&
              ((this._textureMatrix.isActive = !0),
              (this._textureMatrix.location = this.gl.getUniformLocation(
                this._parent._program.program,
                this._textureMatrix.name
              ))),
            this.gl.uniform1i(this._sampler.location, this.index));
      }
      copy(e) {
        if (!e || e.type !== "Texture") {
          this.renderer.production || R(this.type + ": Unable to set the texture from texture:", e);
          return;
        }
        (this._globalParameters = e._globalParameters),
          (this.parameters = e.parameters),
          (this._state = e._state),
          (this._size = e._size),
          !this._sourceLoaded &&
            e._sourceLoaded &&
            this._onSourceLoadedCallback &&
            this._onSourceLoadedCallback(),
          (this._sourceLoaded = e._sourceLoaded),
          !this._uploaded &&
            e._uploaded &&
            this._onSourceUploadedCallback &&
            this._onSourceUploadedCallback(),
          (this._uploaded = e._uploaded),
          (this.sourceType = e.sourceType),
          (this.source = e.source),
          (this._videoFrameCallbackID = e._videoFrameCallbackID),
          (this._sampler.texture = e._sampler.texture),
          (this._copiedFrom = e),
          this._parent &&
            this._parent._program &&
            (!this._canDraw || !this._textureMatrix.matrix) &&
            (this._setSize(), (this._canDraw = !0)),
          this.renderer.needRender();
      }
      setSource(e) {
        this._sourceLoaded ||
          this.renderer.nextRender.add(
            () => this._onSourceLoadedCallback && this._onSourceLoadedCallback()
          );
        let t = this.renderer.cache.getTextureFromSource(e);
        if (t && t.uuid !== this.uuid) {
          this._uploaded ||
            (this.renderer.nextRender.add(
              () => this._onSourceUploadedCallback && this._onSourceUploadedCallback()
            ),
            (this._uploaded = !0)),
            this.copy(t),
            this.resize();
          return;
        }
        (this.source = e),
          this.sourceType === "empty" &&
            (e.tagName.toUpperCase() === "IMG"
              ? (this.sourceType = "image")
              : e.tagName.toUpperCase() === "VIDEO"
              ? ((this.sourceType = "video"), (this.shouldUpdate = !0))
              : e.tagName.toUpperCase() === "CANVAS"
              ? ((this.sourceType = "canvas"), (this._willUpdate = !0), (this.shouldUpdate = !0))
              : this.renderer.production ||
                R(this.type + ": this HTML tag could not be converted into a texture:", e.tagName)),
          (this._size = {
            width: this.source.naturalWidth || this.source.width || this.source.videoWidth,
            height: this.source.naturalHeight || this.source.height || this.source.videoHeight,
          }),
          (this._sourceLoaded = !0),
          this.gl.bindTexture(this.gl.TEXTURE_2D, this._sampler.texture),
          this.resize(),
          (this._globalParameters.flipY = !0),
          (this._globalParameters.premultiplyAlpha = this._globalParameters.shouldPremultiplyAlpha),
          this.sourceType === "image" &&
            ((this.parameters.generateMipmap =
              this.parameters.generateMipmap || this.parameters.generateMipmap === null),
            (this.parameters._shouldUpdate = this.parameters.generateMipmap),
            (this._state.generateMipmap = !1),
            this._upload()),
          this.renderer.needRender();
      }
      _updateGlobalTexParameters() {
        this.renderer.state.unpackAlignment !== this._globalParameters.unpackAlignment &&
          (this.gl.pixelStorei(this.gl.UNPACK_ALIGNMENT, this._globalParameters.unpackAlignment),
          (this.renderer.state.unpackAlignment = this._globalParameters.unpackAlignment)),
          this.renderer.state.flipY !== this._globalParameters.flipY &&
            (this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, this._globalParameters.flipY),
            (this.renderer.state.flipY = this._globalParameters.flipY)),
          this.renderer.state.premultiplyAlpha !== this._globalParameters.premultiplyAlpha &&
            (this.gl.pixelStorei(
              this.gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL,
              this._globalParameters.premultiplyAlpha
            ),
            (this.renderer.state.premultiplyAlpha = this._globalParameters.premultiplyAlpha)),
          this._globalParameters.floatingPoint === "half-float"
            ? this.renderer._isWebGL2 && this.renderer.extensions.EXT_color_buffer_float
              ? ((this._globalParameters.internalFormat = this.gl.RGBA16F),
                (this._globalParameters.type = this.gl.HALF_FLOAT))
              : this.renderer.extensions.OES_texture_half_float
              ? (this._globalParameters.type =
                  this.renderer.extensions.OES_texture_half_float.HALF_FLOAT_OES)
              : this.renderer.production ||
                R(
                  this.type +
                    ": could not use half-float textures because the extension is not available"
                )
            : this._globalParameters.floatingPoint === "float" &&
              (this.renderer._isWebGL2 && this.renderer.extensions.EXT_color_buffer_float
                ? ((this._globalParameters.internalFormat = this.gl.RGBA16F),
                  (this._globalParameters.type = this.gl.FLOAT))
                : this.renderer.extensions.OES_texture_float
                ? (this._globalParameters.type =
                    this.renderer.extensions.OES_texture_half_float.FLOAT)
                : this.renderer.production ||
                  R(
                    this.type +
                      ": could not use float textures because the extension is not available"
                  ));
      }
      _updateTexParameters() {
        this.index && this.renderer.state.activeTexture !== this.index && this._bindTexture(this),
          this.parameters.wrapS !== this._state.wrapS &&
            (!this.renderer._isWebGL2 &&
              (!ce(this._size.width) || !ce(this._size.height)) &&
              (this.parameters.wrapS = this.gl.CLAMP_TO_EDGE),
            this.parameters.wrapS !== this.gl.REPEAT &&
              this.parameters.wrapS !== this.gl.CLAMP_TO_EDGE &&
              this.parameters.wrapS !== this.gl.MIRRORED_REPEAT &&
              (this.renderer.production ||
                R(
                  this.type + ": Wrong wrapS value",
                  this.parameters.wrapS,
                  "for this texture:",
                  this,
                  `
gl.CLAMP_TO_EDGE wrapping will be used instead`
                ),
              (this.parameters.wrapS = this.gl.CLAMP_TO_EDGE)),
            this.gl.texParameteri(
              this.gl.TEXTURE_2D,
              this.gl.TEXTURE_WRAP_S,
              this.parameters.wrapS
            ),
            (this._state.wrapS = this.parameters.wrapS)),
          this.parameters.wrapT !== this._state.wrapT &&
            (!this.renderer._isWebGL2 &&
              (!ce(this._size.width) || !ce(this._size.height)) &&
              (this.parameters.wrapT = this.gl.CLAMP_TO_EDGE),
            this.parameters.wrapT !== this.gl.REPEAT &&
              this.parameters.wrapT !== this.gl.CLAMP_TO_EDGE &&
              this.parameters.wrapT !== this.gl.MIRRORED_REPEAT &&
              (this.renderer.production ||
                R(
                  this.type + ": Wrong wrapT value",
                  this.parameters.wrapT,
                  "for this texture:",
                  this,
                  `
gl.CLAMP_TO_EDGE wrapping will be used instead`
                ),
              (this.parameters.wrapT = this.gl.CLAMP_TO_EDGE)),
            this.gl.texParameteri(
              this.gl.TEXTURE_2D,
              this.gl.TEXTURE_WRAP_T,
              this.parameters.wrapT
            ),
            (this._state.wrapT = this.parameters.wrapT)),
          this.parameters.generateMipmap &&
            !this._state.generateMipmap &&
            this.source &&
            (!this.renderer._isWebGL2 && (!ce(this._size.width) || !ce(this._size.height))
              ? (this.parameters.generateMipmap = !1)
              : this.gl.generateMipmap(this.gl.TEXTURE_2D),
            (this._state.generateMipmap = this.parameters.generateMipmap)),
          this.parameters.minFilter !== this._state.minFilter &&
            (!this.renderer._isWebGL2 &&
              (!ce(this._size.width) || !ce(this._size.height)) &&
              (this.parameters.minFilter = this.gl.LINEAR),
            !this.parameters.generateMipmap &&
              this.parameters.generateMipmap !== null &&
              (this.parameters.minFilter = this.gl.LINEAR),
            this.parameters.minFilter !== this.gl.LINEAR &&
              this.parameters.minFilter !== this.gl.NEAREST &&
              this.parameters.minFilter !== this.gl.NEAREST_MIPMAP_NEAREST &&
              this.parameters.minFilter !== this.gl.LINEAR_MIPMAP_NEAREST &&
              this.parameters.minFilter !== this.gl.NEAREST_MIPMAP_LINEAR &&
              this.parameters.minFilter !== this.gl.LINEAR_MIPMAP_LINEAR &&
              (this.renderer.production ||
                R(
                  this.type + ": Wrong minFilter value",
                  this.parameters.minFilter,
                  "for this texture:",
                  this,
                  `
gl.LINEAR filtering will be used instead`
                ),
              (this.parameters.minFilter = this.gl.LINEAR)),
            this.gl.texParameteri(
              this.gl.TEXTURE_2D,
              this.gl.TEXTURE_MIN_FILTER,
              this.parameters.minFilter
            ),
            (this._state.minFilter = this.parameters.minFilter)),
          this.parameters.magFilter !== this._state.magFilter &&
            (!this.renderer._isWebGL2 &&
              (!ce(this._size.width) || !ce(this._size.height)) &&
              (this.parameters.magFilter = this.gl.LINEAR),
            this.parameters.magFilter !== this.gl.LINEAR &&
              this.parameters.magFilter !== this.gl.NEAREST &&
              (this.renderer.production ||
                R(
                  this.type + ": Wrong magFilter value",
                  this.parameters.magFilter,
                  "for this texture:",
                  this,
                  `
gl.LINEAR filtering will be used instead`
                ),
              (this.parameters.magFilter = this.gl.LINEAR)),
            this.gl.texParameteri(
              this.gl.TEXTURE_2D,
              this.gl.TEXTURE_MAG_FILTER,
              this.parameters.magFilter
            ),
            (this._state.magFilter = this.parameters.magFilter));
        let e = this.renderer.extensions.EXT_texture_filter_anisotropic;
        if (e && this.parameters.anisotropy !== this._state.anisotropy) {
          let t = this.gl.getParameter(e.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
          (this.parameters.anisotropy = Math.max(1, Math.min(this.parameters.anisotropy, t))),
            this.gl.texParameterf(
              this.gl.TEXTURE_2D,
              e.TEXTURE_MAX_ANISOTROPY_EXT,
              this.parameters.anisotropy
            ),
            (this._state.anisotropy = this.parameters.anisotropy);
        }
      }
      setWrapS(e) {
        this.parameters.wrapS !== e &&
          ((this.parameters.wrapS = e), (this.parameters._shouldUpdate = !0));
      }
      setWrapT(e) {
        this.parameters.wrapT !== e &&
          ((this.parameters.wrapT = e), (this.parameters._shouldUpdate = !0));
      }
      setMinFilter(e) {
        this.parameters.minFilter !== e &&
          ((this.parameters.minFilter = e), (this.parameters._shouldUpdate = !0));
      }
      setMagFilter(e) {
        this.parameters.magFilter !== e &&
          ((this.parameters.magFilter = e), (this.parameters._shouldUpdate = !0));
      }
      setAnisotropy(e) {
        (e = isNaN(e) ? this.parameters.anisotropy : e),
          this.parameters.anisotropy !== e &&
            ((this.parameters.anisotropy = e), (this.parameters._shouldUpdate = !0));
      }
      needUpdate() {
        this._forceUpdate = !0;
      }
      _videoFrameCallback() {
        (this._willUpdate = !0),
          this.source.requestVideoFrameCallback(() => this._videoFrameCallback());
      }
      _upload() {
        this._updateGlobalTexParameters(),
          this.source
            ? this.gl.texImage2D(
                this.gl.TEXTURE_2D,
                0,
                this._globalParameters.internalFormat,
                this._globalParameters.format,
                this._globalParameters.type,
                this.source
              )
            : this.sourceType === "fbo" &&
              this.gl.texImage2D(
                this.gl.TEXTURE_2D,
                0,
                this._globalParameters.internalFormat,
                this._size.width,
                this._size.height,
                0,
                this._globalParameters.format,
                this._globalParameters.type,
                this.source || null
              ),
          this._uploaded ||
            (this.renderer.nextRender.add(
              () => this._onSourceUploadedCallback && this._onSourceUploadedCallback()
            ),
            (this._uploaded = !0));
      }
      _getSizes() {
        if (this.sourceType === "fbo")
          return {
            parentWidth: this._parent._boundingRect.document.width,
            parentHeight: this._parent._boundingRect.document.height,
            sourceWidth: this._parent._boundingRect.document.width,
            sourceHeight: this._parent._boundingRect.document.height,
            xOffset: 0,
            yOffset: 0,
          };
        let e = this._parent.scale
            ? Ii.set(this._parent.scale.x, this._parent.scale.y)
            : Ii.set(1, 1),
          t = this._parent._boundingRect.document.width * e.x,
          i = this._parent._boundingRect.document.height * e.y,
          r = this._size.width,
          a = this._size.height,
          n = r / a,
          o = t / i,
          l = 0,
          h = 0;
        return (
          o > n ? (h = Math.min(0, i - t * (1 / n))) : o < n && (l = Math.min(0, t - i * n)),
          {
            parentWidth: t,
            parentHeight: i,
            sourceWidth: r,
            sourceHeight: a,
            xOffset: l,
            yOffset: h,
          }
        );
      }
      setScale(e) {
        if (!e.type || e.type !== "Vec2") {
          this.renderer.production ||
            R(
              this.type + ": Cannot set scale because the parameter passed is not of Vec2 type:",
              e
            );
          return;
        }
        e.sanitizeNaNValuesWith(this.scale).max(Ii.set(0.001, 0.001)),
          e.equals(this.scale) || (this.scale.copy(e), this.resize());
      }
      setOffset(e) {
        if (!e.type || e.type !== "Vec2") {
          this.renderer.production ||
            R(
              this.type + ": Cannot set offset because the parameter passed is not of Vec2 type:",
              scale
            );
          return;
        }
        e.sanitizeNaNValuesWith(this.offset),
          e.equals(this.offset) || (this.offset.copy(e), this.resize());
      }
      _setSize() {
        if (this._parent && this._parent._program) {
          let e = this._getSizes();
          this._updateTextureMatrix(e);
        }
      }
      resize() {
        this.sourceType === "fbo"
          ? ((this._size = {
              width:
                (this._parent._size && this._parent._size.width) ||
                this._parent._boundingRect.document.width,
              height:
                (this._parent._size && this._parent._size.height) ||
                this._parent._boundingRect.document.height,
            }),
            this._copiedFrom ||
              (this.gl.bindTexture(this.gl.TEXTURE_2D, this._sampler.texture),
              this.gl.texImage2D(
                this.gl.TEXTURE_2D,
                0,
                this._globalParameters.internalFormat,
                this._size.width,
                this._size.height,
                0,
                this._globalParameters.format,
                this._globalParameters.type,
                null
              )))
          : this.source &&
            (this._size = {
              width: this.source.naturalWidth || this.source.width || this.source.videoWidth,
              height: this.source.naturalHeight || this.source.height || this.source.videoHeight,
            }),
          this._setSize();
      }
      _updateTextureMatrix(e) {
        let t = Fa.set(
          e.parentWidth / (e.parentWidth - e.xOffset),
          e.parentHeight / (e.parentHeight - e.yOffset),
          1
        );
        (t.x /= this.scale.x),
          (t.y /= this.scale.y),
          (this._textureMatrix.matrix = Va.setFromArray([
            t.x,
            0,
            0,
            0,
            0,
            t.y,
            0,
            0,
            0,
            0,
            1,
            0,
            (1 - t.x) / 2 + this.offset.x,
            (1 - t.y) / 2 + this.offset.y,
            0,
            1,
          ])),
          this._updateMatrixUniform();
      }
      _updateMatrixUniform() {
        this._textureMatrix.isActive &&
          (this.renderer.useProgram(this._parent._program),
          this.gl.uniformMatrix4fv(
            this._textureMatrix.location,
            !1,
            this._textureMatrix.matrix.elements
          ));
      }
      _onSourceLoaded(e) {
        this.setSource(e), this.sourceType === "image" && this.renderer.cache.addTexture(this);
      }
      _bindTexture() {
        this._canDraw &&
          (this.renderer.state.activeTexture !== this.index &&
            (this.gl.activeTexture(this.gl.TEXTURE0 + this.index),
            (this.renderer.state.activeTexture = this.index)),
          this.gl.bindTexture(this.gl.TEXTURE_2D, this._sampler.texture),
          this._sampler.isTextureBound ||
            ((this._sampler.isTextureBound = !!this.gl.getParameter(this.gl.TEXTURE_BINDING_2D)),
            this._sampler.isTextureBound && this.renderer.needRender()));
      }
      _draw() {
        this._sampler.isActive &&
          (this._bindTexture(this),
          this.sourceType === "video" &&
            this.source &&
            !this._videoFrameCallbackID &&
            this.source.readyState >= this.source.HAVE_CURRENT_DATA &&
            !this.source.paused &&
            (this._willUpdate = !0),
          (this._forceUpdate || (this._willUpdate && this.shouldUpdate)) &&
            ((this._state.generateMipmap = !1), this._upload()),
          this.sourceType === "video" && (this._willUpdate = !1),
          (this._forceUpdate = !1)),
          this.parameters._shouldUpdate &&
            (this._updateTexParameters(), (this.parameters._shouldUpdate = !1));
      }
      onSourceLoaded(e) {
        return e && (this._onSourceLoadedCallback = e), this;
      }
      onSourceUploaded(e) {
        return e && (this._onSourceUploadedCallback = e), this;
      }
      _dispose(e = !1) {
        this.sourceType === "video" ||
        (this.sourceType === "image" && !this.renderer.state.isActive)
          ? (this._loader && this._loader._removeSource(this), (this.source = null))
          : this.sourceType === "canvas" &&
            ((this.source.width = this.source.width), (this.source = null)),
          (this._parent = null),
          this.gl &&
            !this._copiedFrom &&
            (e || this.sourceType !== "image" || !this.renderer.state.isActive) &&
            ((this._canDraw = !1),
            this.renderer.cache.removeTexture(this),
            this.gl.activeTexture(this.gl.TEXTURE0 + this.index),
            this.gl.bindTexture(this.gl.TEXTURE_2D, null),
            this.gl.deleteTexture(this._sampler.texture));
      }
    };
  var Ht = class {
    constructor(e, t = "anonymous") {
      (this.type = "TextureLoader"),
        (e = (e && e.renderer) || e),
        !e || e.type !== "Renderer"
          ? z(this.type + ": Renderer not passed as first argument", e)
          : e.gl || z(this.type + ": Renderer WebGL context is undefined", e),
        (this.renderer = e),
        (this.gl = this.renderer.gl),
        (this.crossOrigin = t),
        (this.elements = []);
    }
    _addElement(e, t, i, r) {
      let a = {
        source: e,
        texture: t,
        load: this._sourceLoaded.bind(this, e, t, i),
        error: this._sourceLoadError.bind(this, e, r),
      };
      return this.elements.push(a), a;
    }
    _sourceLoadError(e, t, i) {
      t && t(e, i);
    }
    _sourceLoaded(e, t, i) {
      t._sourceLoaded ||
        (t._onSourceLoaded(e),
        this._parent &&
          (this._increment && this._increment(),
          this.renderer.nextRender.add(
            () => this._parent._onLoadingCallback && this._parent._onLoadingCallback(t)
          ))),
        i && i(t);
    }
    _getSourceType(e) {
      let t;
      return (
        typeof e == "string"
          ? e.match(/\.(jpeg|jpg|jfif|pjpeg|pjp|gif|bmp|png|webp|svg)$/) !== null
            ? (t = "image")
            : e.match(/\.(webm|mp4|ogg|mov)$/) !== null && (t = "video")
          : e.tagName.toUpperCase() === "IMG"
          ? (t = "image")
          : e.tagName.toUpperCase() === "VIDEO"
          ? (t = "video")
          : e.tagName.toUpperCase() === "CANVAS" && (t = "canvas"),
        t
      );
    }
    _createImage(e) {
      if (typeof e == "string" || !e.hasAttribute("crossOrigin")) {
        let t = new Image();
        return (
          (t.crossOrigin = this.crossOrigin),
          typeof e == "string"
            ? (t.src = e)
            : ((t.src = e.src),
              e.hasAttribute("data-sampler") &&
                t.setAttribute("data-sampler", e.getAttribute("data-sampler"))),
          t
        );
      } else return e;
    }
    _createVideo(e) {
      if (typeof e == "string" || e.getAttribute("crossOrigin") === null) {
        let t = document.createElement("video");
        return (
          (t.crossOrigin = this.crossOrigin),
          typeof e == "string"
            ? (t.src = e)
            : ((t.src = e.src),
              e.hasAttribute("data-sampler") &&
                t.setAttribute("data-sampler", e.getAttribute("data-sampler"))),
          t
        );
      } else return e;
    }
    loadSource(e, t, i, r) {
      switch (this._getSourceType(e)) {
        case "image":
          this.loadImage(e, t, i, r);
          break;
        case "video":
          this.loadVideo(e, t, i, r);
          break;
        case "canvas":
          this.loadCanvas(e, t, i);
          break;
        default:
          this._sourceLoadError(e, r, "this source could not be converted into a texture: " + e);
          break;
      }
    }
    loadSources(e, t, i, r) {
      for (let a = 0; a < e.length; a++) this.loadSource(e[a], t, i, r);
    }
    loadImage(e, t = {}, i, r) {
      let a = this.renderer.cache.getTextureFromSource(e),
        n = Object.assign({}, t);
      if (
        (this._parent && (n = Object.assign(n, this._parent._texturesOptions)),
        (n.loader = this),
        a)
      ) {
        (n.sampler =
          typeof e != "string" && e.hasAttribute("data-sampler")
            ? e.getAttribute("data-sampler")
            : n.sampler),
          (n.fromTexture = a);
        let d = new ae(this.renderer, n);
        this._sourceLoaded(a.source, d, i), this._parent && this._addToParent(d, a.source, "image");
        return;
      }
      let o = this._createImage(e);
      n.sampler = o.hasAttribute("data-sampler") ? o.getAttribute("data-sampler") : n.sampler;
      let l = new ae(this.renderer, n),
        h = this._addElement(o, l, i, r);
      o.complete
        ? this._sourceLoaded(o, l, i)
        : o.decode
        ? o
            .decode()
            .then(this._sourceLoaded.bind(this, o, l, i))
            .catch(() => {
              o.addEventListener("load", h.load, !1), o.addEventListener("error", h.error, !1);
            })
        : (o.addEventListener("load", h.load, !1), o.addEventListener("error", h.error, !1)),
        this._parent && this._addToParent(l, o, "image");
    }
    loadImages(e, t, i, r) {
      for (let a = 0; a < e.length; a++) this.loadImage(e[a], t, i, r);
    }
    loadVideo(e, t = {}, i, r) {
      let a = this._createVideo(e);
      (a.preload = !0),
        (a.muted = !0),
        (a.loop = !0),
        a.setAttribute("playsinline", ""),
        (a.crossOrigin = this.crossOrigin);
      let n = Object.assign({}, t);
      this._parent && (n = Object.assign(t, this._parent._texturesOptions)),
        (n.loader = this),
        (n.sampler = a.hasAttribute("data-sampler") ? a.getAttribute("data-sampler") : n.sampler);
      let o = new ae(this.renderer, n),
        l = this._addElement(a, o, i, r);
      a.addEventListener("canplaythrough", l.load, !1),
        a.addEventListener("error", l.error, !1),
        a.readyState >= a.HAVE_FUTURE_DATA && i && this._sourceLoaded(a, o, i),
        a.load(),
        this._addToParent && this._addToParent(o, a, "video"),
        "requestVideoFrameCallback" in HTMLVideoElement.prototype &&
          ((l.videoFrameCallback = o._videoFrameCallback.bind(o)),
          (o._videoFrameCallbackID = a.requestVideoFrameCallback(l.videoFrameCallback)));
    }
    loadVideos(e, t, i, r) {
      for (let a = 0; a < e.length; a++) this.loadVideo(e[a], t, i, r);
    }
    loadCanvas(e, t = {}, i) {
      let r = Object.assign({}, t);
      this._parent && (r = Object.assign(t, this._parent._texturesOptions)),
        (r.loader = this),
        (r.sampler = e.hasAttribute("data-sampler") ? e.getAttribute("data-sampler") : r.sampler);
      let a = new ae(this.renderer, r);
      this._addElement(e, a, i, null),
        this._sourceLoaded(e, a, i),
        this._parent && this._addToParent(a, e, "canvas");
    }
    loadCanvases(e, t, i) {
      for (let r = 0; r < e.length; r++) this.loadCanvas(e[r], t, i);
    }
    _removeSource(e) {
      let t = this.elements.find((i) => i.texture.uuid === e.uuid);
      t &&
        (e.sourceType === "image"
          ? t.source.removeEventListener("load", t.load, !1)
          : e.sourceType === "video" &&
            (t.videoFrameCallback &&
              e._videoFrameCallbackID &&
              t.source.cancelVideoFrameCallback(e._videoFrameCallbackID),
            t.source.removeEventListener("canplaythrough", t.load, !1),
            t.source.pause(),
            t.source.removeAttribute("src"),
            t.source.load()),
        t.source.removeEventListener("error", t.error, !1));
    }
  };
  var Ui = class extends Ht {
    constructor(
      e,
      t,
      {
        sourcesLoaded: i = 0,
        sourcesToLoad: r = 0,
        complete: a = !1,
        onComplete: n = () => {},
      } = {}
    ) {
      super(e, t.crossOrigin);
      (this.type = "PlaneTextureLoader"),
        (this._parent = t),
        this._parent.type !== "Plane" &&
          this._parent.type !== "PingPongPlane" &&
          this._parent.type !== "ShaderPass" &&
          (R(this.type + ": Wrong parent type assigned to this loader"), (this._parent = null)),
        (this.sourcesLoaded = i),
        (this.sourcesToLoad = r),
        (this.complete = a),
        (this.onComplete = n);
    }
    _setLoaderSize(e) {
      (this.sourcesToLoad = e),
        this.sourcesToLoad === 0 &&
          ((this.complete = !0),
          this.renderer.nextRender.add(() => this.onComplete && this.onComplete()));
    }
    _increment() {
      this.sourcesLoaded++,
        this.sourcesLoaded >= this.sourcesToLoad &&
          !this.complete &&
          ((this.complete = !0),
          this.renderer.nextRender.add(() => this.onComplete && this.onComplete()));
    }
    _addSourceToParent(e, t) {
      if (t === "image") {
        let i = this._parent.images;
        !i.find((a) => a.src === e.src) && i.push(e);
      } else if (t === "video") {
        let i = this._parent.videos;
        !i.find((a) => a.src === e.src) && i.push(e);
      } else if (t === "canvas") {
        let i = this._parent.canvases;
        !i.find((a) => a.isSameNode(e)) && i.push(e);
      }
    }
    _addToParent(e, t, i) {
      this._addSourceToParent(t, i), this._parent && e.addParent(this._parent);
    }
  };
  var Bi = class {
    constructor(
      e,
      t = "Mesh",
      {
        vertexShaderID: i,
        fragmentShaderID: r,
        vertexShader: a,
        fragmentShader: n,
        uniforms: o = {},
        widthSegments: l = 1,
        heightSegments: h = 1,
        renderOrder: d = 0,
        depthTest: c = !0,
        cullFace: p = "back",
        texturesOptions: f = {},
        crossOrigin: u = "anonymous",
      } = {}
    ) {
      (this.type = t),
        (e = (e && e.renderer) || e),
        (!e || e.type !== "Renderer") &&
          (z(
            this.type + ": Curtains not passed as first argument or Curtains Renderer is missing",
            e
          ),
          setTimeout(() => {
            this._onErrorCallback && this._onErrorCallback();
          }, 0)),
        (this.renderer = e),
        (this.gl = this.renderer.gl),
        this.gl ||
          (this.renderer.production ||
            z(
              this.type +
                ": Unable to create a " +
                this.type +
                " because the Renderer WebGl context is not defined"
            ),
          setTimeout(() => {
            this._onErrorCallback && this._onErrorCallback();
          }, 0)),
        (this._canDraw = !1),
        (this.renderOrder = d),
        (this._depthTest = c),
        (this.cullFace = p),
        this.cullFace !== "back" &&
          this.cullFace !== "front" &&
          this.cullFace !== "none" &&
          (this.cullFace = "back"),
        (this.textures = []),
        (f = Object.assign(
          {
            premultiplyAlpha: !1,
            anisotropy: 1,
            floatingPoint: "none",
            wrapS: this.gl.CLAMP_TO_EDGE,
            wrapT: this.gl.CLAMP_TO_EDGE,
            minFilter: this.gl.LINEAR,
            magFilter: this.gl.LINEAR,
          },
          f
        )),
        (this._texturesOptions = f),
        (this.crossOrigin = u),
        !a && i && document.getElementById(i) && (a = document.getElementById(i).innerHTML),
        !n && r && document.getElementById(r) && (n = document.getElementById(r).innerHTML),
        this._initMesh(),
        (l = parseInt(l)),
        (h = parseInt(h)),
        (this._geometry = new zi(this.renderer, { width: l, height: h })),
        (this._program = new Gt(this.renderer, {
          parent: this,
          vertexShader: a,
          fragmentShader: n,
        })),
        this._program.compiled
          ? (this._program.createUniforms(o),
            (this.uniforms = this._program.uniformsManager.uniforms),
            this._geometry.setProgram(this._program),
            this.renderer.onSceneChange())
          : this.renderer.nextRender.add(() => this._onErrorCallback && this._onErrorCallback());
    }
    _initMesh() {
      (this.uuid = ht()),
        (this.loader = new Ui(this.renderer, this, {
          sourcesLoaded: 0,
          initSourcesToLoad: 0,
          complete: !1,
          onComplete: () => {
            this._onReadyCallback && this._onReadyCallback(), this.renderer.needRender();
          },
        })),
        (this.images = []),
        (this.videos = []),
        (this.canvases = []),
        (this.userData = {}),
        (this._canDraw = !0);
    }
    _restoreContext() {
      (this._canDraw = !1),
        this._matrices && (this._matrices = null),
        (this._program = new Gt(this.renderer, {
          parent: this,
          vertexShader: this._program.vsCode,
          fragmentShader: this._program.fsCode,
        })),
        this._program.compiled &&
          (this._geometry.restoreContext(this._program),
          this._program.createUniforms(this.uniforms),
          (this.uniforms = this._program.uniformsManager.uniforms),
          this._programRestored());
    }
    setRenderTarget(e) {
      if (!e || e.type !== "RenderTarget") {
        this.renderer.production ||
          R(
            this.type +
              ": Could not set the render target because the argument passed is not a RenderTarget class object",
            e
          );
        return;
      }
      this.type === "Plane" && this.renderer.scene.removePlane(this),
        (this.target = e),
        this.type === "Plane" && this.renderer.scene.addPlane(this);
    }
    setRenderOrder(e = 0) {
      (e = isNaN(e) ? this.renderOrder : parseInt(e)),
        e !== this.renderOrder &&
          ((this.renderOrder = e), this.renderer.scene.setPlaneRenderOrder(this));
    }
    createTexture(e = {}) {
      let t = new ae(this.renderer, Object.assign(this._texturesOptions, e));
      return t.addParent(this), t;
    }
    addTexture(e) {
      if (!e || e.type !== "Texture") {
        this.renderer.production ||
          R(
            this.type + ": cannot add ",
            e,
            " to this " + this.type + " because it is not a valid texture"
          );
        return;
      }
      e.addParent(this);
    }
    loadSources(e, t = {}, i, r) {
      for (let a = 0; a < e.length; a++) this.loadSource(e[a], t, i, r);
    }
    loadSource(e, t = {}, i, r) {
      this.loader.loadSource(
        e,
        Object.assign(t, this._texturesOptions),
        (a) => {
          i && i(a);
        },
        (a, n) => {
          this.renderer.production ||
            R(this.type + ": this HTML tag could not be converted into a texture:", a.tagName),
            r && r(a, n);
        }
      );
    }
    loadImage(e, t = {}, i, r) {
      this.loader.loadImage(
        e,
        Object.assign(t, this._texturesOptions),
        (a) => {
          i && i(a);
        },
        (a, n) => {
          this.renderer.production ||
            R(
              this.type +
                `: There has been an error:
`,
              n,
              `
while loading this image:
`,
              a
            ),
            r && r(a, n);
        }
      );
    }
    loadVideo(e, t = {}, i, r) {
      this.loader.loadVideo(
        e,
        Object.assign(t, this._texturesOptions),
        (a) => {
          i && i(a);
        },
        (a, n) => {
          this.renderer.production ||
            R(
              this.type +
                `: There has been an error:
`,
              n,
              `
while loading this video:
`,
              a
            ),
            r && r(a, n);
        }
      );
    }
    loadCanvas(e, t = {}, i) {
      this.loader.loadCanvas(e, Object.assign(t, this._texturesOptions), (r) => {
        i && i(r);
      });
    }
    loadImages(e, t = {}, i, r) {
      for (let a = 0; a < e.length; a++) this.loadImage(e[a], t, i, r);
    }
    loadVideos(e, t = {}, i, r) {
      for (let a = 0; a < e.length; a++) this.loadVideo(e[a], t, i, r);
    }
    loadCanvases(e, t = {}, i) {
      for (let r = 0; r < e.length; r++) this.loadCanvas(e[r], t, i);
    }
    playVideos() {
      for (let e = 0; e < this.textures.length; e++) {
        let t = this.textures[e];
        if (t.sourceType === "video") {
          let i = t.source.play();
          i !== void 0 &&
            i.catch((r) => {
              this.renderer.production || R(this.type + ": Could not play the video : ", r);
            });
        }
      }
    }
    _draw() {
      this.renderer.setDepthTest(this._depthTest),
        this.renderer.setFaceCulling(this.cullFace),
        this._program.updateUniforms(),
        this._geometry.bindBuffers(),
        (this.renderer.state.forceBufferUpdate = !1);
      for (let e = 0; e < this.textures.length; e++)
        if ((this.textures[e]._draw(), !this.textures[e]._sampler.isTextureBound)) return;
      this._geometry.draw(),
        (this.renderer.state.activeTexture = null),
        this._onAfterRenderCallback && this._onAfterRenderCallback();
    }
    onError(e) {
      return e && (this._onErrorCallback = e), this;
    }
    onLoading(e) {
      return e && (this._onLoadingCallback = e), this;
    }
    onReady(e) {
      return e && (this._onReadyCallback = e), this;
    }
    onRender(e) {
      return e && (this._onRenderCallback = e), this;
    }
    onAfterRender(e) {
      return e && (this._onAfterRenderCallback = e), this;
    }
    remove() {
      (this._canDraw = !1),
        this.target && this.renderer.bindFrameBuffer(null),
        this._dispose(),
        this.type === "Plane"
          ? this.renderer.removePlane(this)
          : this.type === "ShaderPass" &&
            (this.target &&
              ((this.target._shaderPass = null), this.target.remove(), (this.target = null)),
            this.renderer.removeShaderPass(this));
    }
    _dispose() {
      if (this.gl) {
        this._geometry && this._geometry.dispose(),
          this.target &&
            this.type === "ShaderPass" &&
            (this.renderer.removeRenderTarget(this.target), this.textures.shift());
        for (let e = 0; e < this.textures.length; e++) this.textures[e]._dispose();
        this.textures = [];
      }
    }
  };
  var nr = new N(),
    za = new N(),
    yt = class extends Bi {
      constructor(
        e,
        t,
        i = "DOMMesh",
        {
          widthSegments: r,
          heightSegments: a,
          renderOrder: n,
          depthTest: o,
          cullFace: l,
          uniforms: h,
          vertexShaderID: d,
          fragmentShaderID: c,
          vertexShader: p,
          fragmentShader: f,
          texturesOptions: u,
          crossOrigin: g,
        } = {}
      ) {
        (d = d || (t && t.getAttribute("data-vs-id"))),
          (c = c || (t && t.getAttribute("data-fs-id"))),
          super(e, i, {
            widthSegments: r,
            heightSegments: a,
            renderOrder: n,
            depthTest: o,
            cullFace: l,
            uniforms: h,
            vertexShaderID: d,
            fragmentShaderID: c,
            vertexShader: p,
            fragmentShader: f,
            texturesOptions: u,
            crossOrigin: g,
          }),
          (this.htmlElement = t),
          (!this.htmlElement || this.htmlElement.length === 0) &&
            (this.renderer.production ||
              R(
                this.type + ": The HTML element you specified does not currently exists in the DOM"
              )),
          this._setDocumentSizes();
      }
      _setDocumentSizes() {
        let e = this.htmlElement.getBoundingClientRect();
        this._boundingRect || (this._boundingRect = {}),
          (this._boundingRect.document = {
            width: e.width * this.renderer.pixelRatio,
            height: e.height * this.renderer.pixelRatio,
            top: e.top * this.renderer.pixelRatio,
            left: e.left * this.renderer.pixelRatio,
          });
      }
      getBoundingRect() {
        return {
          width: this._boundingRect.document.width,
          height: this._boundingRect.document.height,
          top: this._boundingRect.document.top,
          left: this._boundingRect.document.left,
          right: this._boundingRect.document.left + this._boundingRect.document.width,
          bottom: this._boundingRect.document.top + this._boundingRect.document.height,
        };
      }
      resize() {
        this._setDocumentSizes(),
          this.type === "Plane" &&
            (this.setPerspective(this.camera.fov, this.camera.near, this.camera.far),
            this._setWorldSizes(),
            this._applyWorldPositions());
        for (let e = 0; e < this.textures.length; e++) this.textures[e].resize();
        this.renderer.nextRender.add(
          () => this._onAfterResizeCallback && this._onAfterResizeCallback()
        );
      }
      mouseToPlaneCoords(e) {
        let t = this.scale ? this.scale : za.set(1, 1),
          i = nr.set(
            (this._boundingRect.document.width - this._boundingRect.document.width * t.x) / 2,
            (this._boundingRect.document.height - this._boundingRect.document.height * t.y) / 2
          ),
          r = {
            width: (this._boundingRect.document.width * t.x) / this.renderer.pixelRatio,
            height: (this._boundingRect.document.height * t.y) / this.renderer.pixelRatio,
            top: (this._boundingRect.document.top + i.y) / this.renderer.pixelRatio,
            left: (this._boundingRect.document.left + i.x) / this.renderer.pixelRatio,
          };
        return nr.set(((e.x - r.left) / r.width) * 2 - 1, 1 - ((e.y - r.top) / r.height) * 2);
      }
      onAfterResize(e) {
        return e && (this._onAfterResizeCallback = e), this;
      }
    };
  var Ni = class {
    constructor({
      fov: e = 50,
      near: t = 0.1,
      far: i = 150,
      width: r,
      height: a,
      pixelRatio: n = 1,
    } = {}) {
      (this.position = new A()),
        (this.projectionMatrix = new Q()),
        (this.worldMatrix = new Q()),
        (this.viewMatrix = new Q()),
        (this._shouldUpdate = !1),
        this.setSize(),
        this.setPerspective(e, t, i, r, a, n);
    }
    setFov(e) {
      (e = isNaN(e) ? this.fov : parseFloat(e)),
        (e = Math.max(1, Math.min(e, 179))),
        e !== this.fov && ((this.fov = e), this.setPosition(), (this._shouldUpdate = !0)),
        this.setCSSPerspective();
    }
    setNear(e) {
      (e = isNaN(e) ? this.near : parseFloat(e)),
        (e = Math.max(e, 0.01)),
        e !== this.near && ((this.near = e), (this._shouldUpdate = !0));
    }
    setFar(e) {
      (e = isNaN(e) ? this.far : parseFloat(e)),
        (e = Math.max(e, 50)),
        e !== this.far && ((this.far = e), (this._shouldUpdate = !0));
    }
    setPixelRatio(e) {
      e !== this.pixelRatio && (this._shouldUpdate = !0), (this.pixelRatio = e);
    }
    setSize(e, t) {
      (e !== this.width || t !== this.height) && (this._shouldUpdate = !0),
        (this.width = e),
        (this.height = t);
    }
    setPerspective(e, t, i, r, a, n) {
      this.setPixelRatio(n),
        this.setSize(r, a),
        this.setFov(e),
        this.setNear(t),
        this.setFar(i),
        this._shouldUpdate && this.updateProjectionMatrix();
    }
    setPosition() {
      this.position.set(0, 0, 1),
        this.worldMatrix.setFromArray([
          1,
          0,
          0,
          0,
          0,
          1,
          0,
          0,
          0,
          0,
          1,
          0,
          this.position.x,
          this.position.y,
          this.position.z,
          1,
        ]),
        (this.viewMatrix = this.viewMatrix.copy(this.worldMatrix).getInverse());
    }
    setCSSPerspective() {
      this.CSSPerspective =
        Math.pow(
          Math.pow(this.width / (2 * this.pixelRatio), 2) +
            Math.pow(this.height / (2 * this.pixelRatio), 2),
          0.5
        ) / Math.tan((this.fov * 0.5 * Math.PI) / 180);
    }
    getScreenRatiosFromFov(e = 0) {
      let t = this.position.z;
      e < t ? (e -= t) : (e += t);
      let i = (this.fov * Math.PI) / 180,
        r = 2 * Math.tan(i / 2) * Math.abs(e);
      return { width: (r * this.width) / this.height, height: r };
    }
    updateProjectionMatrix() {
      let e = this.width / this.height,
        t = this.near * Math.tan((Math.PI / 180) * 0.5 * this.fov),
        i = 2 * t,
        r = e * i,
        a = -0.5 * r,
        n = a + r,
        o = t - i,
        l = (2 * this.near) / (n - a),
        h = (2 * this.near) / (t - o),
        d = (n + a) / (n - a),
        c = (t + o) / (t - o),
        p = -(this.far + this.near) / (this.far - this.near),
        f = (-2 * this.far * this.near) / (this.far - this.near);
      this.projectionMatrix.setFromArray([l, 0, 0, 0, 0, h, 0, 0, d, c, p, -1, 0, 0, f, 0]);
    }
    forceUpdate() {
      this._shouldUpdate = !0;
    }
    cancelUpdate() {
      this._shouldUpdate = !1;
    }
  };
  var Ye = class {
    constructor(e = new Float32Array([0, 0, 0, 1]), t = "XYZ") {
      (this.type = "Quat"), (this.elements = e), (this.axisOrder = t);
    }
    setFromArray(e) {
      return (
        (this.elements[0] = e[0]),
        (this.elements[1] = e[1]),
        (this.elements[2] = e[2]),
        (this.elements[3] = e[3]),
        this
      );
    }
    setAxisOrder(e) {
      switch (((e = e.toUpperCase()), e)) {
        case "XYZ":
        case "YXZ":
        case "ZXY":
        case "ZYX":
        case "YZX":
        case "XZY":
          this.axisOrder = e;
          break;
        default:
          this.axisOrder = "XYZ";
      }
      return this;
    }
    copy(e) {
      return (this.elements = e.elements), (this.axisOrder = e.axisOrder), this;
    }
    clone() {
      return new Ye().copy(this);
    }
    equals(e) {
      return (
        this.elements[0] === e.elements[0] &&
        this.elements[1] === e.elements[1] &&
        this.elements[2] === e.elements[2] &&
        this.elements[3] === e.elements[3] &&
        this.axisOrder === e.axisOrder
      );
    }
    setFromVec3(e) {
      let t = e.x * 0.5,
        i = e.y * 0.5,
        r = e.z * 0.5,
        a = Math.cos(t),
        n = Math.cos(i),
        o = Math.cos(r),
        l = Math.sin(t),
        h = Math.sin(i),
        d = Math.sin(r);
      return (
        this.axisOrder === "XYZ"
          ? ((this.elements[0] = l * n * o + a * h * d),
            (this.elements[1] = a * h * o - l * n * d),
            (this.elements[2] = a * n * d + l * h * o),
            (this.elements[3] = a * n * o - l * h * d))
          : this.axisOrder === "YXZ"
          ? ((this.elements[0] = l * n * o + a * h * d),
            (this.elements[1] = a * h * o - l * n * d),
            (this.elements[2] = a * n * d - l * h * o),
            (this.elements[3] = a * n * o + l * h * d))
          : this.axisOrder === "ZXY"
          ? ((this.elements[0] = l * n * o - a * h * d),
            (this.elements[1] = a * h * o + l * n * d),
            (this.elements[2] = a * n * d + l * h * o),
            (this.elements[3] = a * n * o - l * h * d))
          : this.axisOrder === "ZYX"
          ? ((this.elements[0] = l * n * o - a * h * d),
            (this.elements[1] = a * h * o + l * n * d),
            (this.elements[2] = a * n * d - l * h * o),
            (this.elements[3] = a * n * o + l * h * d))
          : this.axisOrder === "YZX"
          ? ((this.elements[0] = l * n * o + a * h * d),
            (this.elements[1] = a * h * o + l * n * d),
            (this.elements[2] = a * n * d - l * h * o),
            (this.elements[3] = a * n * o - l * h * d))
          : this.axisOrder === "XZY" &&
            ((this.elements[0] = l * n * o - a * h * d),
            (this.elements[1] = a * h * o - l * n * d),
            (this.elements[2] = a * n * d + l * h * o),
            (this.elements[3] = a * n * o + l * h * d)),
        this
      );
    }
  };
  var Ia = new N(),
    Ua = new A(),
    Ba = new A(),
    Na = new A(),
    Wa = new A(),
    ja = new A(),
    Ga = new A(),
    le = new A(),
    de = new A(),
    or = new Ye(),
    Ha = new A(0.5, 0.5, 0),
    Xa = new A(),
    Ya = new A(),
    qa = new A(),
    Qa = new A(),
    Za = new N(),
    be = class extends yt {
      constructor(
        e,
        t,
        {
          widthSegments: i,
          heightSegments: r,
          renderOrder: a,
          depthTest: n,
          cullFace: o,
          uniforms: l,
          vertexShaderID: h,
          fragmentShaderID: d,
          vertexShader: c,
          fragmentShader: p,
          texturesOptions: f,
          crossOrigin: u,
          alwaysDraw: g = !1,
          visible: _ = !0,
          transparent: v = !1,
          drawCheckMargins: x = { top: 0, right: 0, bottom: 0, left: 0 },
          autoloadSources: T = !0,
          watchScroll: m = !0,
          fov: y = 50,
        } = {}
      ) {
        super(e, t, "Plane", {
          widthSegments: i,
          heightSegments: r,
          renderOrder: a,
          depthTest: n,
          cullFace: o,
          uniforms: l,
          vertexShaderID: h,
          fragmentShaderID: d,
          vertexShader: c,
          fragmentShader: p,
          texturesOptions: f,
          crossOrigin: u,
        });
        (this.index = this.renderer.planes.length),
          (this.target = null),
          (this.alwaysDraw = g),
          (this._shouldDraw = !0),
          (this.visible = _),
          (this._transparent = v),
          (this.drawCheckMargins = x),
          (this.autoloadSources = T),
          (this.watchScroll = m),
          (this._updateMVMatrix = !1),
          (this.camera = new Ni({
            fov: y,
            width: this.renderer._boundingRect.width,
            height: this.renderer._boundingRect.height,
            pixelRatio: this.renderer.pixelRatio,
          })),
          this._program.compiled &&
            (this._initPlane(),
            this.renderer.scene.addPlane(this),
            this.renderer.planes.push(this));
      }
      _programRestored() {
        this.target && this.setRenderTarget(this.renderer.renderTargets[this.target.index]),
          this._initMatrices(),
          this.setPerspective(this.camera.fov, this.camera.near, this.camera.far),
          this._setWorldSizes(),
          this._applyWorldPositions(),
          this.renderer.scene.addPlane(this);
        for (let e = 0; e < this.textures.length; e++)
          (this.textures[e]._parent = this), this.textures[e]._restoreContext();
        this._canDraw = !0;
      }
      _initPlane() {
        this._initTransformValues(),
          this._initPositions(),
          this.setPerspective(this.camera.fov, this.camera.near, this.camera.far),
          this._initSources();
      }
      _initTransformValues() {
        (this.rotation = new A()),
          this.rotation.onChange(() => this._applyRotation()),
          (this.quaternion = new Ye()),
          (this.relativeTranslation = new A()),
          this.relativeTranslation.onChange(() => this._setTranslation()),
          (this._translation = new A()),
          (this.scale = new A(1)),
          this.scale.onChange(() => {
            (this.scale.z = 1), this._applyScale();
          }),
          (this.transformOrigin = new A(0.5, 0.5, 0)),
          this.transformOrigin.onChange(() => {
            this._setWorldTransformOrigin(), (this._updateMVMatrix = !0);
          });
      }
      resetPlane(e) {
        this._initTransformValues(),
          this._setWorldTransformOrigin(),
          e !== null && !!e
            ? ((this.htmlElement = e), this.updatePosition())
            : !e &&
              !this.renderer.production &&
              R(
                this.type +
                  ": You are trying to reset a plane with a HTML element that does not exist. The old HTML element will be kept instead."
              );
      }
      removeRenderTarget() {
        this.target &&
          (this.renderer.scene.removePlane(this),
          (this.target = null),
          this.renderer.scene.addPlane(this));
      }
      _initPositions() {
        this._initMatrices(), this._setWorldSizes(), this._applyWorldPositions();
      }
      _initMatrices() {
        let e = new Q();
        this._matrices = {
          world: { matrix: e },
          modelView: {
            name: "uMVMatrix",
            matrix: e,
            location: this.gl.getUniformLocation(this._program.program, "uMVMatrix"),
          },
          projection: {
            name: "uPMatrix",
            matrix: e,
            location: this.gl.getUniformLocation(this._program.program, "uPMatrix"),
          },
          modelViewProjection: { matrix: e },
        };
      }
      _setPerspectiveMatrix() {
        this.camera._shouldUpdate &&
          (this.renderer.useProgram(this._program),
          this.gl.uniformMatrix4fv(
            this._matrices.projection.location,
            !1,
            this._matrices.projection.matrix.elements
          )),
          this.camera.cancelUpdate();
      }
      setPerspective(e, t, i) {
        this.camera.setPerspective(
          e,
          t,
          i,
          this.renderer._boundingRect.width,
          this.renderer._boundingRect.height,
          this.renderer.pixelRatio
        ),
          this.renderer.state.isContextLost && this.camera.forceUpdate(),
          (this._matrices.projection.matrix = this.camera.projectionMatrix),
          this.camera._shouldUpdate &&
            (this._setWorldSizes(),
            this._applyWorldPositions(),
            (this._translation.z = this.relativeTranslation.z / this.camera.CSSPerspective)),
          (this._updateMVMatrix = this.camera._shouldUpdate);
      }
      _setMVMatrix() {
        this._updateMVMatrix &&
          ((this._matrices.world.matrix = this._matrices.world.matrix.composeFromOrigin(
            this._translation,
            this.quaternion,
            this.scale,
            this._boundingRect.world.transformOrigin
          )),
          this._matrices.world.matrix.scale({
            x: this._boundingRect.world.width,
            y: this._boundingRect.world.height,
            z: 1,
          }),
          this._matrices.modelView.matrix.copy(this._matrices.world.matrix),
          (this._matrices.modelView.matrix.elements[14] -= this.camera.position.z),
          (this._matrices.modelViewProjection.matrix = this._matrices.projection.matrix.multiply(
            this._matrices.modelView.matrix
          )),
          this.alwaysDraw || this._shouldDrawCheck(),
          this.renderer.useProgram(this._program),
          this.gl.uniformMatrix4fv(
            this._matrices.modelView.location,
            !1,
            this._matrices.modelView.matrix.elements
          )),
          (this._updateMVMatrix = !1);
      }
      _setWorldTransformOrigin() {
        this._boundingRect.world.transformOrigin = new A(
          (this.transformOrigin.x * 2 - 1) * this._boundingRect.world.width,
          -(this.transformOrigin.y * 2 - 1) * this._boundingRect.world.height,
          this.transformOrigin.z
        );
      }
      _documentToWorldSpace(e) {
        return Ba.set(
          ((e.x * this.renderer.pixelRatio) / this.renderer._boundingRect.width) *
            this._boundingRect.world.ratios.width,
          -((e.y * this.renderer.pixelRatio) / this.renderer._boundingRect.height) *
            this._boundingRect.world.ratios.height,
          e.z
        );
      }
      _setWorldSizes() {
        let e = this.camera.getScreenRatiosFromFov();
        (this._boundingRect.world = {
          width:
            ((this._boundingRect.document.width / this.renderer._boundingRect.width) * e.width) / 2,
          height:
            ((this._boundingRect.document.height / this.renderer._boundingRect.height) * e.height) /
            2,
          ratios: e,
        }),
          this._setWorldTransformOrigin();
      }
      _setWorldPosition() {
        let e = {
            x: this._boundingRect.document.width / 2 + this._boundingRect.document.left,
            y: this._boundingRect.document.height / 2 + this._boundingRect.document.top,
          },
          t = {
            x: this.renderer._boundingRect.width / 2 + this.renderer._boundingRect.left,
            y: this.renderer._boundingRect.height / 2 + this.renderer._boundingRect.top,
          };
        (this._boundingRect.world.top =
          ((t.y - e.y) / this.renderer._boundingRect.height) *
          this._boundingRect.world.ratios.height),
          (this._boundingRect.world.left =
            ((e.x - t.x) / this.renderer._boundingRect.width) *
            this._boundingRect.world.ratios.width);
      }
      setScale(e) {
        if (!e.type || e.type !== "Vec2") {
          this.renderer.production ||
            R(
              this.type + ": Cannot set scale because the parameter passed is not of Vec2 type:",
              e
            );
          return;
        }
        e.sanitizeNaNValuesWith(this.scale).max(Ia.set(0.001, 0.001)),
          (e.x !== this.scale.x || e.y !== this.scale.y) &&
            (this.scale.set(e.x, e.y, 1), this._applyScale());
      }
      _applyScale() {
        for (let e = 0; e < this.textures.length; e++) this.textures[e].resize();
        this._updateMVMatrix = !0;
      }
      setRotation(e) {
        if (!e.type || e.type !== "Vec3") {
          this.renderer.production ||
            R(
              this.type + ": Cannot set rotation because the parameter passed is not of Vec3 type:",
              e
            );
          return;
        }
        e.sanitizeNaNValuesWith(this.rotation),
          e.equals(this.rotation) || (this.rotation.copy(e), this._applyRotation());
      }
      _applyRotation() {
        this.quaternion.setFromVec3(this.rotation), (this._updateMVMatrix = !0);
      }
      setTransformOrigin(e) {
        if (!e.type || e.type !== "Vec3") {
          this.renderer.production ||
            R(
              this.type +
                ": Cannot set transform origin because the parameter passed is not of Vec3 type:",
              e
            );
          return;
        }
        e.sanitizeNaNValuesWith(this.transformOrigin),
          e.equals(this.transformOrigin) ||
            (this.transformOrigin.copy(e),
            this._setWorldTransformOrigin(),
            (this._updateMVMatrix = !0));
      }
      _setTranslation() {
        let e = Ua.set(0, 0, 0);
        this.relativeTranslation.equals(e) ||
          (e = this._documentToWorldSpace(this.relativeTranslation)),
          this._translation.set(
            this._boundingRect.world.left + e.x,
            this._boundingRect.world.top + e.y,
            this.relativeTranslation.z / this.camera.CSSPerspective
          ),
          (this._updateMVMatrix = !0);
      }
      setRelativeTranslation(e) {
        if (!e.type || e.type !== "Vec3") {
          this.renderer.production ||
            R(
              this.type +
                ": Cannot set translation because the parameter passed is not of Vec3 type:",
              e
            );
          return;
        }
        e.sanitizeNaNValuesWith(this.relativeTranslation),
          e.equals(this.relativeTranslation) ||
            (this.relativeTranslation.copy(e), this._setTranslation());
      }
      _applyWorldPositions() {
        this._setWorldPosition(), this._setTranslation();
      }
      updatePosition() {
        this._setDocumentSizes(), this._applyWorldPositions();
      }
      updateScrollPosition(e, t) {
        (e || t) &&
          ((this._boundingRect.document.top += t * this.renderer.pixelRatio),
          (this._boundingRect.document.left += e * this.renderer.pixelRatio),
          this._applyWorldPositions());
      }
      _getIntersection(e, t) {
        let i = t.clone().sub(e),
          r = e.clone();
        for (; r.z > -1; ) r.add(i);
        return r;
      }
      _getNearPlaneIntersections(e, t, i) {
        let r = this._matrices.modelViewProjection.matrix;
        if (i.length === 1)
          i[0] === 0
            ? ((t[0] = this._getIntersection(t[1], le.set(0.95, 1, 0).applyMat4(r))),
              t.push(this._getIntersection(t[3], de.set(-1, -0.95, 0).applyMat4(r))))
            : i[0] === 1
            ? ((t[1] = this._getIntersection(t[0], le.set(-0.95, 1, 0).applyMat4(r))),
              t.push(this._getIntersection(t[2], de.set(1, -0.95, 0).applyMat4(r))))
            : i[0] === 2
            ? ((t[2] = this._getIntersection(t[3], le.set(-0.95, -1, 0).applyMat4(r))),
              t.push(this._getIntersection(t[1], de.set(1, 0.95, 0).applyMat4(r))))
            : i[0] === 3 &&
              ((t[3] = this._getIntersection(t[2], le.set(0.95, -1, 0).applyMat4(r))),
              t.push(this._getIntersection(t[0], de.set(-1, 0.95, 0).applyMat4(r))));
        else if (i.length === 2)
          i[0] === 0 && i[1] === 1
            ? ((t[0] = this._getIntersection(t[3], le.set(-1, -0.95, 0).applyMat4(r))),
              (t[1] = this._getIntersection(t[2], de.set(1, -0.95, 0).applyMat4(r))))
            : i[0] === 1 && i[1] === 2
            ? ((t[1] = this._getIntersection(t[0], le.set(-0.95, 1, 0).applyMat4(r))),
              (t[2] = this._getIntersection(t[3], de.set(-0.95, -1, 0).applyMat4(r))))
            : i[0] === 2 && i[1] === 3
            ? ((t[2] = this._getIntersection(t[1], le.set(1, 0.95, 0).applyMat4(r))),
              (t[3] = this._getIntersection(t[0], de.set(-1, 0.95, 0).applyMat4(r))))
            : i[0] === 0 &&
              i[1] === 3 &&
              ((t[0] = this._getIntersection(t[1], le.set(0.95, 1, 0).applyMat4(r))),
              (t[3] = this._getIntersection(t[2], de.set(0.95, -1, 0).applyMat4(r))));
        else if (i.length === 3) {
          let a = 0;
          for (let n = 0; n < e.length; n++) i.includes(n) || (a = n);
          (t = [t[a]]),
            a === 0
              ? (t.push(this._getIntersection(t[0], le.set(-0.95, 1, 0).applyMat4(r))),
                t.push(this._getIntersection(t[0], de.set(-1, 0.95, 0).applyMat4(r))))
              : a === 1
              ? (t.push(this._getIntersection(t[0], le.set(0.95, 1, 0).applyMat4(r))),
                t.push(this._getIntersection(t[0], de.set(1, 0.95, 0).applyMat4(r))))
              : a === 2
              ? (t.push(this._getIntersection(t[0], le.set(0.95, -1, 0).applyMat4(r))),
                t.push(this._getIntersection(t[0], de.set(1, -0.95, 0).applyMat4(r))))
              : a === 3 &&
                (t.push(this._getIntersection(t[0], le.set(-0.95, -1, 0).applyMat4(r))),
                t.push(this._getIntersection(t[0], de.set(-1 - 0.95, 0).applyMat4(r))));
        } else for (let a = 0; a < e.length; a++) (t[a][0] = 1e4), (t[a][1] = 1e4);
        return t;
      }
      _getWorldCoords() {
        let e = [Na.set(-1, 1, 0), Wa.set(1, 1, 0), ja.set(1, -1, 0), Ga.set(-1, -1, 0)],
          t = [],
          i = [];
        for (let l = 0; l < e.length; l++) {
          let h = e[l].applyMat4(this._matrices.modelViewProjection.matrix);
          t.push(h), Math.abs(h.z) > 1 && i.push(l);
        }
        i.length && (t = this._getNearPlaneIntersections(e, t, i));
        let r = Infinity,
          a = -Infinity,
          n = Infinity,
          o = -Infinity;
        for (let l = 0; l < t.length; l++) {
          let h = t[l];
          h.x < r && (r = h.x), h.x > a && (a = h.x), h.y < n && (n = h.y), h.y > o && (o = h.y);
        }
        return { top: o, right: a, bottom: n, left: r };
      }
      _computeWebGLBoundingRect() {
        let e = this._getWorldCoords(),
          t = {
            top: 1 - (e.top + 1) / 2,
            right: (e.right + 1) / 2,
            bottom: 1 - (e.bottom + 1) / 2,
            left: (e.left + 1) / 2,
          };
        (t.width = t.right - t.left),
          (t.height = t.bottom - t.top),
          (this._boundingRect.worldToDocument = {
            width: t.width * this.renderer._boundingRect.width,
            height: t.height * this.renderer._boundingRect.height,
            top: t.top * this.renderer._boundingRect.height + this.renderer._boundingRect.top,
            left: t.left * this.renderer._boundingRect.width + this.renderer._boundingRect.left,
            right:
              t.left * this.renderer._boundingRect.width +
              this.renderer._boundingRect.left +
              t.width * this.renderer._boundingRect.width,
            bottom:
              t.top * this.renderer._boundingRect.height +
              this.renderer._boundingRect.top +
              t.height * this.renderer._boundingRect.height,
          });
      }
      getWebGLBoundingRect() {
        if (this._matrices.modelViewProjection)
          (!this._boundingRect.worldToDocument || this.alwaysDraw) &&
            this._computeWebGLBoundingRect();
        else return this._boundingRect.document;
        return this._boundingRect.worldToDocument;
      }
      _getWebGLDrawRect() {
        return (
          this._computeWebGLBoundingRect(),
          {
            top: this._boundingRect.worldToDocument.top - this.drawCheckMargins.top,
            right: this._boundingRect.worldToDocument.right + this.drawCheckMargins.right,
            bottom: this._boundingRect.worldToDocument.bottom + this.drawCheckMargins.bottom,
            left: this._boundingRect.worldToDocument.left - this.drawCheckMargins.left,
          }
        );
      }
      _shouldDrawCheck() {
        let e = this._getWebGLDrawRect();
        Math.round(e.right) <= this.renderer._boundingRect.left ||
        Math.round(e.left) >=
          this.renderer._boundingRect.left + this.renderer._boundingRect.width ||
        Math.round(e.bottom) <= this.renderer._boundingRect.top ||
        Math.round(e.top) >= this.renderer._boundingRect.top + this.renderer._boundingRect.height
          ? this._shouldDraw &&
            ((this._shouldDraw = !1),
            this.renderer.nextRender.add(
              () => this._onLeaveViewCallback && this._onLeaveViewCallback()
            ))
          : (this._shouldDraw ||
              this.renderer.nextRender.add(
                () => this._onReEnterViewCallback && this._onReEnterViewCallback()
              ),
            (this._shouldDraw = !0));
      }
      isDrawn() {
        return this._canDraw && this.visible && (this._shouldDraw || this.alwaysDraw);
      }
      enableDepthTest(e) {
        this._depthTest = e;
      }
      _initSources() {
        let e = 0;
        if (this.autoloadSources) {
          let t = this.htmlElement.getElementsByTagName("img"),
            i = this.htmlElement.getElementsByTagName("video"),
            r = this.htmlElement.getElementsByTagName("canvas");
          t.length && this.loadImages(t),
            i.length && this.loadVideos(t),
            r.length && this.loadCanvases(t),
            (e = t.length + i.length + r.length);
        }
        this.loader._setLoaderSize(e), (this._canDraw = !0);
      }
      _startDrawing() {
        this._canDraw &&
          (this._onRenderCallback && this._onRenderCallback(),
          this.target
            ? this.renderer.bindFrameBuffer(this.target)
            : this.renderer.state.scenePassIndex === null && this.renderer.bindFrameBuffer(null),
          this._setPerspectiveMatrix(),
          this._setMVMatrix(),
          (this.alwaysDraw || this._shouldDraw) && this.visible && this._draw());
      }
      mouseToPlaneCoords(e) {
        if (
          (or.setAxisOrder(this.quaternion.axisOrder),
          or.equals(this.quaternion) && Ha.equals(this.transformOrigin))
        )
          return super.mouseToPlaneCoords(e);
        {
          let t = {
              x: 2 * (e.x / (this.renderer._boundingRect.width / this.renderer.pixelRatio)) - 1,
              y:
                2 * (1 - e.y / (this.renderer._boundingRect.height / this.renderer.pixelRatio)) - 1,
            },
            i = this.camera.position.clone(),
            r = Xa.set(t.x, t.y, -0.5);
          r.unproject(this.camera), r.sub(i).normalize();
          let a = Ya.set(0, 0, -1);
          a.applyQuat(this.quaternion).normalize();
          let n = Qa.set(0, 0, 0),
            o = a.dot(r);
          if (Math.abs(o) >= 1e-4) {
            let l = this._matrices.world.matrix.getInverse().multiply(this.camera.viewMatrix),
              h = this._boundingRect.world.transformOrigin.clone().add(this._translation),
              d = qa.set(
                this._translation.x - h.x,
                this._translation.y - h.y,
                this._translation.z - h.z
              );
            d.applyQuat(this.quaternion), h.add(d);
            let c = a.dot(h.clone().sub(i)) / o;
            n.copy(i.add(r.multiplyScalar(c))), n.applyMat4(l);
          } else n.set(Infinity, Infinity, Infinity);
          return Za.set(n.x, n.y);
        }
      }
      onReEnterView(e) {
        return e && (this._onReEnterViewCallback = e), this;
      }
      onLeaveView(e) {
        return e && (this._onLeaveViewCallback = e), this;
      }
    };
  var Se = class {
    constructor(
      e,
      {
        shaderPass: t,
        depth: i = !1,
        clear: r = !0,
        minWidth: a = 1024,
        minHeight: n = 1024,
        texturesOptions: o = {},
      } = {}
    ) {
      (this.type = "RenderTarget"),
        (e = (e && e.renderer) || e),
        !e || e.type !== "Renderer"
          ? z(this.type + ": Renderer not passed as first argument", e)
          : e.gl || z(this.type + ": Renderer WebGL context is undefined", e),
        (this.renderer = e),
        (this.gl = this.renderer.gl),
        (this.index = this.renderer.renderTargets.length),
        (this._shaderPass = t),
        (this._depth = i),
        (this._shouldClear = r),
        (this._minSize = {
          width: a * this.renderer.pixelRatio,
          height: n * this.renderer.pixelRatio,
        }),
        (o = Object.assign(
          {
            sampler: "uRenderTexture",
            isFBOTexture: !0,
            premultiplyAlpha: !1,
            anisotropy: 1,
            generateMipmap: !1,
            floatingPoint: "none",
            wrapS: this.gl.CLAMP_TO_EDGE,
            wrapT: this.gl.CLAMP_TO_EDGE,
            minFilter: this.gl.LINEAR,
            magFilter: this.gl.LINEAR,
          },
          o
        )),
        (this._texturesOptions = o),
        (this.userData = {}),
        (this.uuid = ht()),
        this.renderer.renderTargets.push(this),
        this.renderer.onSceneChange(),
        this._initRenderTarget();
    }
    _initRenderTarget() {
      this._setSize(), (this.textures = []), this._createFrameBuffer();
    }
    _restoreContext() {
      this._setSize(), this._createFrameBuffer();
    }
    _setSize() {
      this._shaderPass && this._shaderPass._isScenePass
        ? (this._size = {
            width: this.renderer._boundingRect.width,
            height: this.renderer._boundingRect.height,
          })
        : (this._size = {
            width: Math.max(this._minSize.width, this.renderer._boundingRect.width),
            height: Math.max(this._minSize.height, this.renderer._boundingRect.height),
          });
    }
    resize() {
      this._shaderPass &&
        (this._setSize(),
        this.textures[0].resize(),
        this.renderer.bindFrameBuffer(this, !0),
        this._depth && this._bindDepthBuffer(),
        this.renderer.bindFrameBuffer(null));
    }
    _bindDepthBuffer() {
      this._depthBuffer &&
        (this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, this._depthBuffer),
        this.gl.renderbufferStorage(
          this.gl.RENDERBUFFER,
          this.gl.DEPTH_COMPONENT16,
          this._size.width,
          this._size.height
        ),
        this.gl.framebufferRenderbuffer(
          this.gl.FRAMEBUFFER,
          this.gl.DEPTH_ATTACHMENT,
          this.gl.RENDERBUFFER,
          this._depthBuffer
        ));
    }
    _createFrameBuffer() {
      (this._frameBuffer = this.gl.createFramebuffer()),
        this.renderer.bindFrameBuffer(this, !0),
        this.textures.length
          ? ((this.textures[0]._parent = this), this.textures[0]._restoreContext())
          : new ae(this.renderer, this._texturesOptions).addParent(this),
        this.gl.framebufferTexture2D(
          this.gl.FRAMEBUFFER,
          this.gl.COLOR_ATTACHMENT0,
          this.gl.TEXTURE_2D,
          this.textures[0]._sampler.texture,
          0
        ),
        this._depth &&
          ((this._depthBuffer = this.gl.createRenderbuffer()), this._bindDepthBuffer()),
        this.renderer.bindFrameBuffer(null);
    }
    getTexture() {
      return this.textures[0];
    }
    remove() {
      if (this._shaderPass) {
        this.renderer.production ||
          R(
            this.type +
              ": You're trying to remove a RenderTarget attached to a ShaderPass. You should remove that ShaderPass instead:",
            this._shaderPass
          );
        return;
      }
      this._dispose(), this.renderer.removeRenderTarget(this);
    }
    _dispose() {
      this._frameBuffer &&
        (this.gl.deleteFramebuffer(this._frameBuffer), (this._frameBuffer = null)),
        this._depthBuffer &&
          (this.gl.deleteRenderbuffer(this._depthBuffer), (this._depthBuffer = null)),
        this.textures[0]._dispose(),
        (this.textures = []);
    }
  };
  var vt = class extends yt {
    constructor(
      e,
      {
        widthSegments: t,
        heightSegments: i,
        renderOrder: r,
        depthTest: a,
        cullFace: n,
        uniforms: o,
        vertexShaderID: l,
        fragmentShaderID: h,
        vertexShader: d,
        fragmentShader: c,
        texturesOptions: p,
        crossOrigin: f,
        depth: u = !1,
        clear: g = !0,
        renderTarget: _,
      } = {}
    ) {
      (t = 1),
        (i = 1),
        (n = "back"),
        super(e, e.container, "ShaderPass", {
          widthSegments: t,
          heightSegments: i,
          renderOrder: r,
          depthTest: a,
          cullFace: n,
          uniforms: o,
          vertexShaderID: l,
          fragmentShaderID: h,
          vertexShader: d,
          fragmentShader: c,
          texturesOptions: p,
          crossOrigin: f,
        }),
        (this._isScenePass = !0),
        (this.index = this.renderer.shaderPasses.length),
        (this._depth = u),
        (this._shouldClear = g),
        (this.target = _),
        this.target && ((this._isScenePass = !1), (this._shouldClear = this.target._shouldClear)),
        this._program.compiled &&
          (this._initShaderPass(),
          this.renderer.shaderPasses.push(this),
          this.renderer.nextRender.add(() => {
            this.renderer.scene.addShaderPass(this);
          }));
    }
    _programRestored() {
      this._isScenePass
        ? this.renderer.scene.stacks.scenePasses.push(this.index)
        : this.renderer.scene.stacks.renderPasses.push(this.index);
      for (let e = 0; e < this.textures.length; e++)
        (this.textures[e]._parent = this), this.textures[e]._restoreContext();
      this._canDraw = !0;
    }
    _initShaderPass() {
      this.target
        ? (this.setRenderTarget(this.target), (this.target._shaderPass = this))
        : this._createFrameBuffer(),
        new ae(this.renderer, {
          sampler: "uRenderTexture",
          isFBOTexture: !0,
          fromTexture: this.target.getTexture(),
        }).addParent(this),
        this.loader._setLoaderSize(0),
        (this._canDraw = !0),
        this.renderer.needRender();
    }
    _createFrameBuffer() {
      let e = new Se(this.renderer, {
        shaderPass: this,
        clear: this._shouldClear,
        depth: this._depth,
        texturesOptions: this._texturesOptions,
      });
      this.setRenderTarget(e);
    }
    _startDrawing() {
      this._canDraw &&
        (this._onRenderCallback && this._onRenderCallback(),
        this._isScenePass
          ? this.renderer.state.scenePassIndex + 1 < this.renderer.scene.stacks.scenePasses.length
            ? (this.renderer.bindFrameBuffer(
                this.renderer.scene.stacks.scenePasses[this.renderer.state.scenePassIndex + 1]
                  .target
              ),
              this.renderer.state.scenePassIndex++)
            : this.renderer.bindFrameBuffer(null)
          : this.renderer.state.scenePassIndex === null && this.renderer.bindFrameBuffer(null),
        (this.renderer.state.forceBufferUpdate = !0),
        this._draw());
    }
  };
  var Xt = class extends be {
    constructor(
      e,
      t,
      {
        sampler: i = "uPingPongTexture",
        widthSegments: r,
        heightSegments: a,
        renderOrder: n,
        depthTest: o,
        cullFace: l,
        uniforms: h,
        vertexShaderID: d,
        fragmentShaderID: c,
        vertexShader: p,
        fragmentShader: f,
        texturesOptions: u,
        crossOrigin: g,
        alwaysDraw: _,
        visible: v,
        transparent: x,
        drawCheckMargins: T,
        autoloadSources: m,
        watchScroll: y,
        fov: w,
      } = {}
    ) {
      (o = !1),
        (m = !1),
        super(e, t, {
          widthSegments: r,
          heightSegments: a,
          renderOrder: n,
          depthTest: o,
          cullFace: l,
          uniforms: h,
          vertexShaderID: d,
          fragmentShaderID: c,
          vertexShader: p,
          fragmentShader: f,
          texturesOptions: u,
          crossOrigin: g,
          alwaysDraw: _,
          visible: v,
          transparent: x,
          drawCheckMargins: T,
          autoloadSources: m,
          watchScroll: y,
          fov: w,
        }),
        this.renderer.scene.removePlane(this),
        (this.type = "PingPongPlane"),
        this.renderer.scene.addPlane(this),
        (this.readPass = new Se(e, { depth: !1, clear: !1, texturesOptions: u })),
        (this.writePass = new Se(e, { depth: !1, clear: !1, texturesOptions: u }));
      let b = this.createTexture({ sampler: i }),
        P = 0;
      this.readPass.getTexture().onSourceUploaded(() => {
        P++, this._checkIfReady(P);
      }),
        this.writePass.getTexture().onSourceUploaded(() => {
          P++, this._checkIfReady(P);
        }),
        this.setRenderTarget(this.readPass),
        (this._onRenderCallback = () => {
          this.readPass &&
            this.writePass &&
            this.textures[0] &&
            this.textures[0]._uploaded &&
            this.setRenderTarget(this.writePass),
            this._onPingPongRenderCallback && this._onPingPongRenderCallback();
        }),
        (this._onAfterRenderCallback = () => {
          this.readPass &&
            this.writePass &&
            this.textures[0] &&
            this.textures[0]._uploaded &&
            this._swapPasses(),
            this._onPingPongAfterRenderCallback && this._onPingPongAfterRenderCallback();
        });
    }
    _checkIfReady(e) {
      e === 2 &&
        this.renderer.nextRender.add(() => {
          this.textures[0].copy(this.target.getTexture());
        });
    }
    _swapPasses() {
      let e = this.readPass;
      (this.readPass = this.writePass),
        (this.writePass = e),
        this.textures[0].copy(this.readPass.getTexture());
    }
    getTexture() {
      return this.textures[0];
    }
    onRender(e) {
      return e && (this._onPingPongRenderCallback = e), this;
    }
    onAfterRender(e) {
      return e && (this._onPingPongAfterRenderCallback = e), this;
    }
    remove() {
      (this.target = null),
        this.renderer.bindFrameBuffer(null),
        this.writePass && (this.writePass.remove(), (this.writePass = null)),
        this.readPass && (this.readPass.remove(), (this.readPass = null)),
        super.remove();
    }
  };
  var Yt = class {
    constructor({
      plane: e,
      textElement: t,
      skipFontLoading: i = !1,
      verticalAlign: r = "top",
      allowedLineEndSpace: a = 0.5,
      fillType: n = "fill",
      sampler: o = "uTextTexture",
      texturesOptions: l = {},
      resolution: h = 1,
      onBeforeWordMeasuring: d = () => {},
      onAfterWordMeasuring: c = () => {},
      onBeforeWordWriting: p = () => {},
      onAfterWordWriting: f = () => {},
    } = {}) {
      let u = ["Plane", "PingPongPlane", "ShaderPass"];
      if (!e || !e.type || !u.find((g) => g === e.type)) {
        console.error("TextTexture: can't be created without a plane");
        return;
      }
      if (!e.gl) {
        console.error("TextTexture: can't be created because the WebGL context is undefined");
        return;
      }
      (this.plane = e),
        t || (t = this.plane.hmltElement),
        (this.textElement = t),
        (this.resolution = h),
        (this.skipFontLoading = i),
        (this.allowedLineEndSpace = a),
        (this.onBeforeWordMeasuring = d),
        (this.onAfterWordMeasuring = c),
        (this.onBeforeWordWriting = p),
        (this.onAfterWordWriting = f),
        (this.content = {
          verticalAlign: r,
          text: this.textElement.textContent.replace(/[\n\r]+|[\s]{2,}/g, " ").trim(),
        }),
        (this.canvas = document.createElement("canvas")),
        (this.context = this.canvas.getContext("2d")),
        (this.content.style = window.getComputedStyle(this.textElement)),
        (this.content.style.fillType = n !== "fill" && n !== "stroke" ? "fill" : n),
        this.setCanvasSize(),
        this.setWords(),
        this.loadFont(),
        (l = Object.assign(l, { sampler: o })),
        this.plane.loadCanvas(this.canvas, l, (g) => {
          (this.texture = g),
            (this.texture.shouldUpdate = !1),
            this.content.fontLoaded && !this.content.firstWrite && this.writeTexture();
        }),
        (this.plane._onAfterResizeCallback = () => {
          this._onAfterResizeCallback && this._onAfterResizeCallback(), this.resize();
        }),
        (this.plane.onAfterResize = (g) => (g && (this._onAfterResizeCallback = g), this.plane));
    }
    setCanvasSize() {
      this.pixelRatio = this.plane.renderer.pixelRatio;
      let e = this.plane.getBoundingRect();
      (this.canvas.width = e.width * this.resolution),
        (this.canvas.height = e.height * this.resolution),
        (this.context.width = e.width),
        (this.context.height = e.height),
        this.context.scale(this.resolution, this.resolution),
        (this.content.boundingRect = this.textElement.getBoundingClientRect()),
        (this.content.innerBoundingRect = {
          width:
            this.content.boundingRect.width -
            parseFloat(this.content.style.paddingLeft) -
            parseFloat(this.content.style.paddingRight),
          height:
            this.content.boundingRect.height -
            parseFloat(this.content.style.paddingTop) -
            parseFloat(this.content.style.paddingBottom),
          top:
            parseFloat(this.content.style.paddingTop) +
            (this.content.boundingRect.top - e.top / this.pixelRatio),
          left:
            parseFloat(this.content.style.paddingLeft) +
            (this.content.boundingRect.left - e.left / this.pixelRatio),
        }),
        (this.content.innerBoundingRect.right =
          this.content.innerBoundingRect.left + this.content.innerBoundingRect.width),
        (this.content.innerBoundingRect.bottom =
          this.content.innerBoundingRect.top + this.content.innerBoundingRect.height),
        (this.content.innerBoundingRect.width *= this.pixelRatio),
        (this.content.innerBoundingRect.height *= this.pixelRatio),
        (this.content.innerBoundingRect.top *= this.pixelRatio),
        (this.content.innerBoundingRect.left *= this.pixelRatio),
        (this.content.innerBoundingRect.right *= this.pixelRatio),
        (this.content.innerBoundingRect.bottom *= this.pixelRatio);
    }
    setWords() {
      this.content.words = [];
      let e = this.content.text.split("-"),
        t = [],
        i = e.length;
      e.forEach((r, a) => {
        a < i - 1 ? (t.push(r), t.push("-")) : t.push(r);
      }),
        t.forEach((r) => {
          let a = r.split(" ");
          a.forEach((n, o) => {
            this.content.words.push({
              word: n,
              spaceAfter: !(n === "-" || o === a.length - 1 || n === ""),
            });
          });
        });
    }
    loadFont() {
      this.skipFontLoading
        ? (this.content.fontLoaded = !0)
        : document.fonts
            .load(
              this.content.style.fontStyle +
                " " +
                this.content.style.fontWeight +
                " 1em " +
                this.content.style.fontFamily
            )
            .then(() => {
              (this.content.fontLoaded = !0),
                this.texture &&
                  !this.content.firstWrite &&
                  (this.plane.resize(), this.writeTexture());
            });
    }
    writeTexture(e = !0) {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height),
        (this.context.fillStyle = this.content.style.color),
        (this.context.strokeStyle = this.content.style.color),
        (this.context.font =
          this.content.style.fontStyle +
          " " +
          this.content.style.fontWeight +
          " " +
          parseFloat(this.content.style.fontSize) * this.plane.renderer.pixelRatio +
          "px " +
          this.content.style.fontFamily),
        (this.context.lineHeight = this.content.style.lineHeight);
      let t = this.content.innerBoundingRect.left,
        i = parseFloat(this.content.style.lineHeight) * this.pixelRatio,
        r = parseFloat(this.content.style.fontSize) * this.pixelRatio,
        a = this.context.measureText(" ").width;
      this.context.textBaseline = "top";
      let n = i / r,
        o = r * 0.1 + (n - 1) * r * 0.5;
      navigator.userAgent.indexOf("Safari") !== -1 &&
        navigator.userAgent.indexOf("Chrome") === -1 &&
        (o = ((n - 1.4) * r) / 2);
      let l = { x: t, y: this.content.innerBoundingRect.top + o };
      (e || !this.lines) &&
        ((this.lines = []),
        this.content.words.forEach((c, p) => {
          this.content.style.textTransform === "uppercase"
            ? (c.word = c.word.toUpperCase())
            : this.content.style.textTransform === "lowercase" && (c.word = c.word.toLowerCase()),
            this.onBeforeWordMeasuring && this.onBeforeWordMeasuring(this.context, c, p);
          let f = this.context.measureText(c.word).width;
          this.onAfterWordMeasuring && this.onAfterWordMeasuring(this.context, c, p),
            ((p > 0 &&
              l.x + f >
                this.content.innerBoundingRect.width +
                  this.content.innerBoundingRect.left +
                  a * this.allowedLineEndSpace) ||
              c.word === "") &&
              ((l.x = t), (l.y += i)),
            l.x === t && this.lines.push([]),
            this.lines[this.lines.length - 1].push({
              word: c.word,
              wordWidth: f,
              position: { x: l.x, y: l.y },
              spaceAfter: c.spaceAfter,
            }),
            (l.x += f),
            c.spaceAfter && (l.x += a);
        }));
      let h = { x: 0, y: 0 },
        d = this.lines[0][0].position.y + this.lines[this.lines.length - 1][0].position.y + r;
      this.content.verticalAlign === "center"
        ? (h.y = (this.content.innerBoundingRect.height - d) * 0.5 - o * 0.5)
        : this.content.verticalAlign === "bottom" &&
          (h.y = this.content.innerBoundingRect.height - d + o * 0.5),
        this.lines.forEach((c, p) => {
          c.forEach((f) => {
            let u = c[0].position.x + c[c.length - 1].position.x + c[c.length - 1].wordWidth - t;
            this.content.style.textAlign === "right" || this.content.style.textAlign === "end"
              ? (h.x = this.content.innerBoundingRect.right - u)
              : this.content.style.textAlign === "center" &&
                (h.x = (this.content.innerBoundingRect.right - u) / 2),
              this.onBeforeWordWriting &&
                this.onBeforeWordWriting(
                  this.context,
                  f,
                  {
                    left: f.position.x + h.x,
                    top: f.position.y + h.y,
                    right: f.position.x + h.x + f.wordWidth,
                    bottom: f.position.y + h.y + r,
                  },
                  this.content.style,
                  p
                ),
              this.content.style.fillType === "stroke"
                ? ((this.context.miterLimit = 2),
                  this.context.strokeText(f.word, f.position.x + h.x, f.position.y + h.y))
                : this.context.fillText(f.word, f.position.x + h.x, f.position.y + h.y),
              this.onAfterWordWriting &&
                this.onAfterWordWriting(this.context, f, h, this.content.style, p);
          });
        }),
        e && this.texture.resize(),
        this.texture.needUpdate(),
        (this.content.firstWrite = !0);
    }
    resize() {
      this.texture && (this.setCanvasSize(), this.writeTexture());
    }
    dispose() {
      (this.content = {}), (this.textElement = null), (this.plane = null), (this.texture = null);
    }
  };
  var hr = `
    #ifdef GL_FRAGMENT_PRECISION_HIGH
    precision highp float;
    #else
    precision mediump float;
    #endif
    
    // default mandatory variables
    attribute vec3 aVertexPosition;
    attribute vec2 aTextureCoord;

    uniform mat4 uMVMatrix;
    uniform mat4 uPMatrix;

    // custom variables
    varying vec2 vTextureCoord;

    void main() {
        gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
        vTextureCoord = aTextureCoord;
    }
`,
    lr = `
    #ifdef GL_FRAGMENT_PRECISION_HIGH
    precision highp float;
    #else
    precision mediump float;
    #endif
    
    uniform vec2 uResolution;
    uniform vec2 uMousePosition;
    uniform vec2 uVelocity;
    uniform int uTime;
    uniform sampler2D uRipples;
    
    uniform float uViscosity;
    uniform float uSpeed;
    uniform float uSize;
    uniform float uPixelRatio;
    uniform float uDissipation;
    
    varying vec2 vTextureCoord;

    
    void main() {
        // uniformize size for different screens
        float size = uSize;
        vec2 refScreen = vec2(1600.0, 900.0);
        float resoLength = length(uResolution / uPixelRatio);

        float screenRatio = length(refScreen) / resoLength;
        // flatten result for wider screens
        screenRatio = pow(screenRatio, min(1.0, screenRatio));
        size *= screenRatio;

        //gyeon 3
    
        float velocity = clamp(length(uVelocity), 0.9, 1.5);
        vec3 speed = vec3(vec2(uSpeed) / (uResolution.xy * screenRatio), 0.0);
                   
        vec2 mouse = (uMousePosition + 1.0) * 0.5;       

        vec4 color = texture2D(uRipples, vTextureCoord);                
     
        float shade = smoothstep(0.01 * size * velocity, 0.0, length(mouse - vTextureCoord));
    
        vec4 texelColor = color;
        
        float d = shade * uViscosity;
        
        float top = texture2D(uRipples, vTextureCoord - speed.zy, 1.0).x;
        float right = texture2D(uRipples, vTextureCoord - speed.xz, 1.0).x;
        float bottom = texture2D(uRipples, vTextureCoord + speed.xz, 1.0).x;
        float left = texture2D(uRipples, vTextureCoord + speed.zy, 1.0).x;
        

        //@gyeon 1

        d += -(texelColor.y - 0.5) * 2.0 + (top + right + bottom + left - 2.0);
        d *= uDissipation;
        
        // skip first frames
        d *= float(uTime > 5);
        
        d = d * 0.5 + 0.5;
        
        color = vec4(d, texelColor.x, 0.0, 1.0);
        
        gl_FragColor = color;
    }
`;
  var dr = `
    #ifdef GL_FRAGMENT_PRECISION_HIGH
    precision highp float;
    #else
    precision mediump float;
    #endif
    
    // default mandatory variables
    attribute vec3 aVertexPosition;
    attribute vec2 aTextureCoord;
    
    uniform mat4 uMVMatrix;
    uniform mat4 uPMatrix;
    
    uniform float uFadeIn;
    
    // custom variables
    varying vec3 vVertexPosition;
    varying vec2 vTextureCoord;

    varying float vMaxDepth;
    
    void main() {
        vec3 vertexPosition = aVertexPosition;
        
        float distanceFromCenter = distance(vec2(0.0), vertexPosition.xy);
        float waveSinusoid = sin(3.141595 * 0.75 * (distanceFromCenter - uFadeIn * 1.5));
        
        float distanceStrength = (0.4 / (distanceFromCenter + 0.4));
        distanceStrength = 1.0;
        
        vMaxDepth = 0.125;
        float distortionEffect = distanceStrength * waveSinusoid * vMaxDepth;

        // apply it to our vertex position
        vertexPosition.z -=  distortionEffect * (1.0 - uFadeIn);
        
        gl_Position = uPMatrix * uMVMatrix * vec4(vertexPosition, 1.0);
        
        // varyings
        vVertexPosition = vertexPosition;
        vTextureCoord = aTextureCoord;
    }
`,
    ur = `
    #ifdef GL_FRAGMENT_PRECISION_HIGH
    precision highp float;
    #else
    precision mediump float;
    #endif
    
    varying vec3 vVertexPosition;
    varying vec2 vTextureCoord;
    
    varying float vMaxDepth;
    
    uniform sampler2D uTexture;
    uniform float uFadeIn;
    
    void main( void ) {      
        vec4 text = texture2D(uTexture, vTextureCoord);
        
        text.a *= (1.0 - abs(vVertexPosition.z) * 0.75 / vMaxDepth) * uFadeIn;
        
        gl_FragColor = text;
    }
`,
    Wi = `
    #ifdef GL_FRAGMENT_PRECISION_HIGH
    precision highp float;
    #else
    precision mediump float;
    #endif

    // default mandatory variables
    attribute vec3 aVertexPosition;
    attribute vec2 aTextureCoord;

    uniform mat4 uMVMatrix;
    uniform mat4 uPMatrix;

    // custom variables
    varying vec2 vTextureCoord;
    
    uniform float uFadeIn;
    
    void main() {
        gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
        vTextureCoord = aTextureCoord;
    }
`,
    ji = `
    #ifdef GL_FRAGMENT_PRECISION_HIGH
    precision highp float;
    #else
    precision mediump float;
    #endif

    varying vec2 vTextureCoord;

    uniform sampler2D uTexture;
    uniform float uFadeIn;
    
    void main() {       
        float time = (1.0 - uFadeIn);
        
        vec4 title = texture2D(uTexture, vec2(vTextureCoord.x, vTextureCoord.y + time * 0.5));
        title.a *= uFadeIn;
        
        gl_FragColor = title;
    }
`;
  var cr = `
    #ifdef GL_FRAGMENT_PRECISION_HIGH
    precision highp float;
    #else
    precision mediump float;
    #endif

    // default mandatory variables
    attribute vec3 aVertexPosition;
    attribute vec2 aTextureCoord;

    uniform mat4 uMVMatrix;
    uniform mat4 uPMatrix;

    // custom variables
    varying vec2 vTextureCoord;
    
    uniform float uFadeIn;
    
    void main() {
        gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
        vTextureCoord = aTextureCoord;
    }
`,
    fr = `
    #ifdef GL_FRAGMENT_PRECISION_HIGH
    precision highp float;
    #else
    precision mediump float;
    #endif

    varying vec2 vTextureCoord;

    uniform sampler2D uTexture;
    uniform float uFadeIn;
    uniform float uOpacity;

    void main() {
        vec4 color = vec4(5.0 / 255.0, 5.0 / 255.0, 175.0 / 255.0, uOpacity); // #0505AF blue
        
        if(vTextureCoord.x > uFadeIn) {
            discard;
        }
        
        gl_FragColor = color;
    }
`;
  var pr = `
    #ifdef GL_FRAGMENT_PRECISION_HIGH
    precision highp float;
    #else
    precision mediump float;
    #endif
    
    // default mandatory variables
    attribute vec3 aVertexPosition;
    attribute vec2 aTextureCoord;
    
    uniform mat4 uMVMatrix;
    uniform mat4 uPMatrix;
    
    uniform mat4 planeTextureMatrix;
    
    uniform float uFadeIn;
    
    // custom variables
    varying vec3 vVertexPosition;
    varying vec2 vTextureCoord;
    varying vec2 vPlaneTextureCoord;

    varying float vMaxDepth;
    
    void main() {
        vec3 vertexPosition = aVertexPosition;
        
        float effectStrength = uFadeIn;
        
        float distanceFromCenter = distance(vec2(0.0), vertexPosition.xy);
        float waveSinusoid = sin(3.141595 * 0.75 * (distanceFromCenter - effectStrength * 1.5));
        
        float distanceStrength = (0.4 / (distanceFromCenter + 0.4));
        distanceStrength = 1.0;
        
        vMaxDepth = 0.125;
        float distortionEffect = distanceStrength * waveSinusoid * vMaxDepth;

        // apply it to our vertex position
        vertexPosition.z -=  distortionEffect * (1.0 - effectStrength);
        
        gl_Position = uPMatrix * uMVMatrix * vec4(vertexPosition, 1.0);
        
        // varyings
        vVertexPosition = vertexPosition;
        
        vTextureCoord = aTextureCoord;
        vPlaneTextureCoord = (planeTextureMatrix * vec4(aTextureCoord, 0.0, 1.0)).xy;
    }
`,
    gr = `
    #ifdef GL_FRAGMENT_PRECISION_HIGH
    precision highp float;
    #else
    precision mediump float;
    #endif
    
    varying vec3 vVertexPosition;
    varying vec2 vTextureCoord;
    varying vec2 vPlaneTextureCoord;
    
    varying float vMaxDepth;
    
    uniform sampler2D planeTexture;
    uniform float uFadeIn;
    uniform float uIsGrayScale;
    uniform float uHoverEffect;
    
    uniform float uOpacity;
    
    void main( void ) { 
        float hoverEffect = 1.0 - uHoverEffect;
        float distanceFromCenter = distance(vPlaneTextureCoord, vec2(0.5));
        float spreadFromCenter = clamp((hoverEffect * (sqrt(0.5) - distanceFromCenter)) + hoverEffect, 0.0, 1.0);
        
        vec2 dir = vTextureCoord - vec2(0.5);
        vec2 offset = dir * (sin(distanceFromCenter * 20.0 * hoverEffect) + 0.5) * (1.0 - hoverEffect);
        
        vec4 image = texture2D(planeTexture, vPlaneTextureCoord - offset * 0.125 * hoverEffect);
        
        vec3 grayScale = vec3(0.299, 0.587, 0.114);            
        float gray = dot(image.rgb, grayScale);
        
        image.rgb = mix(image.rgb, vec3(gray), uIsGrayScale);
        
        image.a *= (1.0 - abs(vVertexPosition.z) * 0.75 / vMaxDepth) * uFadeIn * uOpacity;
        
        gl_FragColor = image;
    }
`;
  var _r = `
    #ifdef GL_FRAGMENT_PRECISION_HIGH
    precision highp float;
    #else
    precision mediump float;
    #endif
    
    // default mandatory variables
    attribute vec3 aVertexPosition;
    attribute vec2 aTextureCoord;
    
    uniform mat4 uMVMatrix;
    uniform mat4 uPMatrix;
    
    uniform mat4 planeTextureMatrix;
    
    uniform float uFadeIn;
    
    // custom variables
    varying vec3 vVertexPosition;
    varying vec2 vTextureCoord;
    varying vec2 vPlaneTextureCoord;

    varying float vMaxDepth;
    
    void main() {
        vec3 vertexPosition = aVertexPosition;
        
        float distanceFromCenter = distance(vec2(0.0), vertexPosition.xy);
        float waveSinusoid = sin(3.141595 * 0.75 * (distanceFromCenter - uFadeIn * 1.5));
        
        float distanceStrength = (0.4 / (distanceFromCenter + 0.4));
        distanceStrength = 1.0;
        
        vMaxDepth = 0.125;
        float distortionEffect = distanceStrength * waveSinusoid * vMaxDepth;

        // apply it to our vertex position
        vertexPosition.z -=  distortionEffect * (1.0 - uFadeIn);
        
        gl_Position = uPMatrix * uMVMatrix * vec4(vertexPosition, 1.0);
        
        // varyings
        vVertexPosition = vertexPosition;
        
        vTextureCoord = aTextureCoord;
        vPlaneTextureCoord = (planeTextureMatrix * vec4(aTextureCoord, 0.0, 1.0)).xy;
    }
`,
    mr = `
    #ifdef GL_FRAGMENT_PRECISION_HIGH
    precision highp float;
    #else
    precision mediump float;
    #endif
    
    varying vec3 vVertexPosition;
    varying vec2 vTextureCoord;
    varying vec3 vNoise;
    
    uniform sampler2D videoPoster;
    uniform sampler2D planeTexture;
    uniform float uFadeIn;
    
    uniform float uVideoStarted;
    
    varying float vMaxDepth;
    
    void main( void ) {
        float time = (1.0 - uFadeIn);
    
        vec2 textureCoord = vTextureCoord;
        vec2 dir = textureCoord - vec2(0.5);
        float dist = distance(textureCoord, vec2(0.5, 1.0));
        vec2 offset = dir * (sin(dist * 40.0 - time)) * 0.2 * time;
        textureCoord = textureCoord + offset;
                      
        vec4 poster = texture2D(videoPoster, textureCoord);
        vec4 video = texture2D(planeTexture, textureCoord);
        
        vec4 result = mix(poster, video, uVideoStarted);
        
        result.a *= (1.0 - abs(vVertexPosition.z) * 0.75 / vMaxDepth) * uFadeIn;
        
        result.rgb *= result.a;
        gl_FragColor = result;
    }
`;
  var xr = `
    #ifdef GL_FRAGMENT_PRECISION_HIGH
    precision highp float;
    #else
    precision mediump float;
    #endif
    
    varying vec3 vVertexPosition;
    varying vec2 vTextureCoord;
    
    uniform sampler2D uRenderTexture;
    
    // lerped scroll deltas
    // negative when scrolling down, positive when scrolling up
    uniform float uScrollEffect;
    
    // default to 2.5
    uniform float uScrollStrength;
    
    
    void main() {
        vec2 scrollTextCoords = vTextureCoord;
        float horizontalStretch;
        
        // branching on an uniform is ok
        if(uScrollEffect >= 0.0) {
            scrollTextCoords.y *= 1.0 + -uScrollEffect * 0.00625 * uScrollStrength;
            horizontalStretch = sin(scrollTextCoords.y);
        }
        else if(uScrollEffect < 0.0) {
            scrollTextCoords.y += (scrollTextCoords.y - 1.0) * uScrollEffect * 0.00625 * uScrollStrength;
            horizontalStretch = sin(-1.0 * (1.0 - scrollTextCoords.y));
        }
        
        scrollTextCoords.x = scrollTextCoords.x * 2.0 - 1.0;
        scrollTextCoords.x *= 1.0 + uScrollEffect * 0.0035 * horizontalStretch * uScrollStrength;
        scrollTextCoords.x = (scrollTextCoords.x + 1.0) * 0.5;

        gl_FragColor = texture2D(uRenderTexture, scrollTextCoords);
    }
`;
  var Ka = `
    #ifdef GL_FRAGMENT_PRECISION_HIGH
    precision highp float;
    #else
    precision mediump float;
    #endif
    
    varying vec3 vVertexPosition;
    varying vec2 vTextureCoord;
    
    uniform sampler2D uRenderTexture;
    uniform sampler2D uRipplesTexture;
    
    uniform vec2 uResolution;
    
    uniform float uTransition;
    uniform float uTransitionDirection;
    uniform float uTime;    
    
    #define PI 3.14159265359  
    
    
    vec3 hueRotate(vec3 col, float hue) {
        vec3 k = vec3(0.57735, 0.57735, 0.57735);
        float cosAngle = cos(hue);
        return col * cosAngle + cross(k, col) * sin(hue) + k * dot(k, col) * (1.0 - cosAngle);
    }

    vec3 saturate(vec3 rgb, float adjustment) {
        vec3 W = vec3(0.2125, 0.7154, 0.0721);
        vec3 intensity = vec3(dot(rgb, W));
        return mix(intensity, rgb, adjustment);
    }
    
    
    
    float bumpMap(vec2 uv, float height, inout vec3 colormap) {
        vec3 shade = texture2D(uRipplesTexture, vTextureCoord).rgb;            
        return 1.0 - shade.r * height;
    }
    
    float bumpMap(vec2 uv, float height) {
        vec3 colormap;
        return bumpMap(uv, height, colormap);
    }
    
    
    float transitionShape(float transitionValue, float curveStrength) {
        vec2 textCoords = vTextureCoord;
        
        textCoords.y += ((sin(textCoords.x * PI * 1.5) * ((textCoords.x) * 0.5 + 0.5) * sin(transitionValue * uTransitionDirection * PI)) * curveStrength);
        vec2 shaper = vec2(step(textCoords.x, 1.0), step(1.0 - textCoords.y, transitionValue));
        
        return shaper.x * shaper.y;
    }
`,
    Ja = `#version 300 es
    #ifdef GL_OES_standard_derivatives
    #extension GL_OES_standard_derivatives : enable
    #endif
    
    #ifdef GL_FRAGMENT_PRECISION_HIGH
    precision highp float;
    #else
    precision mediump float;
    #endif
    
    in vec3 vVertexPosition;
    in vec2 vTextureCoord;
    
    uniform sampler2D uRenderTexture;
    uniform sampler2D uRipplesTexture;
    
    uniform vec2 uResolution;
    
    uniform float uTransition;
    uniform float uTransitionDirection;
    uniform float uTime;
    
    
    #define PI 3.14159265359  
    
    out vec4 outColor;
    
    
    vec3 hueRotate(vec3 col, float hue) {

      //gyeon 4

        vec3 k = vec3(0.27735, 0.97735, 0.37735);
        float cosAngle = cos(hue);
        return col * cosAngle + cross(k, col) * sin(hue) + k * dot(k, col) * (2.0 - cosAngle);
    }

    vec3 saturate(vec3 rgb, float adjustment) {
        vec3 W = vec3(0.2125, 0.7154, 0.0721);
        vec3 intensity = vec3(dot(rgb, W));
        return mix(intensity, rgb, adjustment);
    }
        
    
    float bumpMap(vec2 uv, float height, inout vec3 colormap) {
        vec3 shade = texture(uRipplesTexture, vTextureCoord).rgb;            
        return 1.0 - shade.r * height;
    }
    
    float bumpMap(vec2 uv, float height) {
        vec3 colormap;
        return bumpMap(uv, height, colormap);
    }
    
    // from https://github.com/glslify/glsl-aastep
    float aastep(float threshold, float value) {
        #ifdef GL_OES_standard_derivatives
            float afwidth = length(vec2(dFdx(value), dFdy(value))) * 0.70710678118654757;
            return smoothstep(threshold-afwidth, threshold+afwidth, value);
        #else
            return step(threshold, value);
        #endif  
    }
    
    float transitionShape(float transitionValue, float curveStrength) {
        vec2 textCoords = vTextureCoord;
        
        textCoords.y += ((sin(textCoords.x * PI * 1.5) * ((textCoords.x) * 0.5 + 0.5) * sin(transitionValue * uTransitionDirection * PI)) * curveStrength);
        vec2 shaper = vec2(aastep(textCoords.x, 1.0), aastep(1.0 - textCoords.y, transitionValue));
        
        return shaper.x * shaper.y;
    }
`,
    yr = `
    const float displacement = 0.75; // 0.75
    const float attenuation = 7.75; // 7.75
    const float waveMotion = 0.25; // 0.25 
    
    const float lightStrength = 5.0;
    const float lightColorEffect = 1.0;
    const float shadowStrength = 1.25;
    const float shadowColorEffect = 0.4375;
    
    const float hue = 4.28;
    const float saturation = 1.5;
    
    // Holy fuck balls, fresnel!
    const float bias = 0.2;
    const float scale = 10.0;
    const float power = 10.1;
`,
    vr = `
    vec3 rgb2glsl(vec3 rgb) {
        return vec3(rgb.r / 255.0, rgb.g / 255.0, rgb.b / 255.0);
    }
    
    vec4 rgb2glsl(vec4 rgb) {
        return vec4(rgb2glsl(rgb.rgb), rgb.a);
    }

    
    // add bump map, reflections and lightnings to the ripples render target texture
    vec4 renderPass(vec2 uv, inout float distortion) {
        vec3 surfacePos = vec3(uv, 0.0);
        vec3 ray = normalize(vec3(uv, 1.0));

        //vec3 lightPos = vec3(2.0, 3.0, -3.0);
        //vec3 lightPos = vec3(1.0, 2.0, -4.0);
        vec3 lightPos = vec3(0.0, 0.0, -4.0);
        vec3 normal = vec3(0.0, 0.0, -1.0);
        
        vec2 sampleDistance = vec2(0.005, 0.0);
        
        vec3 colormap;
        
        float fx = bumpMap(sampleDistance.xy, 0.2);
        float fy = bumpMap(sampleDistance.yx, 0.2);
        float f = bumpMap(vec2(0.0), 0.2, colormap);
        
        distortion = f;
        
        fx = (fx - f) / sampleDistance.x;
        fy = (fy - f) / sampleDistance.x;
        normal = normalize(normal + vec3(fx, fy, 0.0) * 0.2);
        
        
        vec3 lightV = lightPos - surfacePos;
        float lightDist = max(length(lightV), 0.001);
        lightV /= lightDist;
        
        // light color based on light intensity
        vec3 lightColor = vec3(1.0);
        
        float shininess = 0.1;
        // brightness also based on light intensity
        float brightness = 1.0;
        
        float falloff = 0.1;
        // finally attenuation based on light intensity as well
        float attenuation = 3.0 / (1.0 + lightDist * lightDist * falloff);
        
        float diffuse = max(dot(normal, lightV), 0.0);
        float specular = pow(max(dot( reflect(-lightV, normal), -ray), 0.0), 64.0) * shininess;
        
        vec3 texCol = (vec3(0.5) * brightness) * 0.5;
        
        float metalness = (1.0 - colormap.x);
        metalness *= metalness;
        
        vec3 color = (texCol * (diffuse * vec3(0.9) * 2.0 + 0.5) + lightColor * specular * f * 2.0 * metalness) * attenuation ;

        return vec4(color, 1.0);
    }
`,
    $a = `
    void main() {
        // distortion is the output of our ripples effect + scene lightning
        float distortion;
        vec4 reflections = renderPass(vTextureCoord, distortion);       
        
        vec4 ripples = vec4(vec3(0.5), 1.0);            
        ripples += distortion * 0.1 - 0.1;
        ripples += reflections * 0.5;

        // distort front coords based on the ripple effect
        vec2 frontRippleCoords = vTextureCoord + distortion * (displacement / (250.0 * attenuation));
        
        // slight wavy effect
        float time = uTime * 0.01;
        float dx = vTextureCoord.y * PI + time;
        float dy = vTextureCoord.x * PI + time;
        
        vec2 waves = vec2(cos(dx + dy) * 0.05 * cos(dy), sin(dx - dy) * 0.05 * cos(dy));
        
        // add the wavy effect to the foreground coords
        frontRippleCoords += waves * waveMotion / attenuation;

        // foreground
        vec4 foreground = texture2D(uRenderTexture, frontRippleCoords);
`,
    en = `
    void main() {
        // distortion is the output of our ripples effect + scene lightning
        float distortion;
        vec4 reflections = renderPass(vTextureCoord, distortion);            
        
        vec4 ripples = vec4(vec3(0.5), 1.0);            
        ripples += distortion * 0.1 - 0.1;
        ripples += reflections * 0.5;

        // distort front coords based on the ripple effect
        vec2 frontRippleCoords = vTextureCoord + distortion * (displacement / (250.0 * attenuation));
        
        // slight wavy effect
        float time = uTime * 0.01;
        float dx = vTextureCoord.y * PI + time;
        float dy = vTextureCoord.x * PI + time;
        
        vec2 waves = vec2(cos(dx + dy) * 0.05 * cos(dy), sin(dx - dy) * 0.05 * cos(dy));
        
        // add the wavy effect to the foreground coords
        frontRippleCoords += waves * waveMotion / attenuation;

        // finally get our front texture
        vec4 foreground = texture(uRenderTexture, frontRippleCoords);
`,
    br = `            
        vec4 bgColor = vec4(1.0);
        
        // main color for ripple effect and page transitions
        vec4 secondaryColor = rgb2glsl(vec4(232.0, 48.0, 48.0, 1.0)); // red
        
        // ligths & shadows
        float lights = max(0.001, ripples.r - (0.7 + lightStrength * 0.025));
        float shadow = max(0.001, 1.0 - (ripples.r + 0.5));
        
        // slightly apply lights & shadows to foreground
        foreground.rgb += lights * (lightStrength / (10.0 * attenuation));
        foreground.rgb -= shadow * (shadowStrength / (10.0 * attenuation));
        
        
        // gold colors TEST 3
        /*vec3 gold1 = rgb2glsl(vec3(248.0, 197.0, 72.0)); // light pink
        vec3 gold2 = rgb2glsl(vec3(243.0, 179.0, 12.0)); // violet
        vec3 gold3 = rgb2glsl(vec3(179.0, 129.0, 6.0)); // azure
        vec3 gold4 = rgb2glsl(vec3(91.0, 66.0, 2.0)); // light brown
        vec3 gold5 = rgb2glsl(vec3(248.0, 199.0, 67.0)); // light violet
        vec3 gold6 = rgb2glsl(vec3(251.0, 226.0, 162.0)); // light violet
        vec3 gold7 = rgb2glsl(vec3(254.0, 231.0, 182.0)); // light yellow*/
        
        
        // gold colors TEST 4
        vec3 gold1 = rgb2glsl(vec3(247.0, 182.0, 26.0)); // light pink
        vec3 gold2 = rgb2glsl(vec3(218.0, 155.0, 7.0)); // violet
        vec3 gold3 = rgb2glsl(vec3(189.0, 136.0, 4.0)); // azure
        vec3 gold4 = rgb2glsl(vec3(127.0, 91.0, 3.0)); // light brown
        vec3 gold5 = rgb2glsl(vec3(68.0, 50.0, 2.0)); // light violet
        vec3 gold6 = rgb2glsl(vec3(247.0, 186.0, 35.0)); // light violet
        vec3 gold7 = rgb2glsl(vec3(249.0, 196.0, 79.0)); // light yellow
        
        
        gold1 = saturate(hueRotate(gold1, hue), saturation);
        gold2 = saturate(hueRotate(gold2, hue), saturation);
        gold3 = saturate(hueRotate(gold3, hue), saturation);
        gold4 = saturate(hueRotate(gold4, hue), saturation);
        gold5 = saturate(hueRotate(gold5, hue), saturation);
        gold6 = saturate(hueRotate(gold6, hue), saturation);
        gold7 = saturate(hueRotate(gold7, hue), saturation);
        
        
        
        // get values to mix white and the colors for lights                
        /*float lightMixValue = clamp(pow(lights, 4.0) * 5.0, 0.0, 1.0);
        float lightMixValue2 = clamp(pow(lights * 0.95, 6.0) * 10.0, 0.0, 1.0);*/
        
        /*float lightMixValue = clamp(pow(lights, 3.5) * 5.0, 0.0, 1.0);
        float lightMixValue2 = clamp(pow(lights * 0.95, 5.0) * 10.0, 0.0, 1.0);
        float lightMixValue3 = clamp(pow(lights * 0.9, 6.5) * 15.0, 0.0, 1.0);
        float lightMixValue4 = clamp(pow(lights * 0.85, 8.0) * 20.0, 0.0, 1.0);
        float lightMixValue5 = clamp(pow(lights * 0.8, 12.0) * 25.0, 0.0, 1.0);
        float lightMixValue6 = clamp(pow(lights * 0.75, 16.0) * 30.0, 0.0, 1.0);
        float lightMixValue7 = clamp(pow(lights * 0.7, 20.0) * 20.0, 0.0, 1.0);*/
        
        float lightMixValue = clamp(pow(lights, 3.5) * 5.0, 0.0, 1.0);
        float lightMixValue2 = clamp(pow(lights * 0.95, 5.0) * 10.0, 0.0, 1.0);
        float lightMixValue3 = clamp(pow(lights * 0.9, 6.5) * 15.0, 0.0, 1.0);
        float lightMixValue4 = clamp(pow(lights * 0.85, 7.0) * 30.0, 0.0, 1.0);
        float lightMixValue5 = clamp(pow(lights * 0.8, 7.25) * 70.0, 0.0, 1.0);
        float lightMixValue6 = clamp(pow(lights * 0.75, 8.5) * 100.0, 0.0, 1.0);
        float lightMixValue7 = clamp(pow(lights * 0.7, 10.0) * 50.0, 0.0, 1.0);
        
        // apply colors to lights, separated by slight black areas to add iridescence 
        vec3 lightColor = mix(bgColor.rgb, gold1, lightMixValue);
        lightColor = mix(lightColor, gold2, lightMixValue2);
        lightColor = mix(lightColor, gold3, lightMixValue3);
        lightColor = mix(lightColor, gold4, lightMixValue4);
        lightColor = mix(lightColor, gold5, lightMixValue5);
        lightColor = mix(lightColor, gold6, lightMixValue6);
        lightColor = mix(lightColor, gold7, lightMixValue7);
        
        
        // add lights to background
        bgColor.rgb = mix(bgColor.rgb, lightColor, lightColorEffect);
        
        
        // get values to mix black and the colors for shadowss        
        float shadowMixValue = clamp(pow(shadow, 3.0) * 5.0, 0.0, 1.0);
        float shadowMixValue2 = clamp(pow(shadow * 0.95, 5.0) * 10.0, 0.0, 1.0);
        float shadowMixValue3 = clamp(pow(shadow * 0.9, 6.5) * 15.0, 0.0, 1.0);
        float shadowMixValue4 = clamp(pow(shadow * 0.85, 8.0) * 20.0, 0.0, 1.0);
        float shadowMixValue5 = clamp(pow(shadow * 0.8, 12.0) * 25.0, 0.0, 1.0);
        float shadowMixValue6 = clamp(pow(shadow * 0.75, 16.0) * 30.0, 0.0, 1.0);
        float shadowMixValue7 = clamp(pow(shadow * 0.7, 20.0) * 20.0, 0.0, 1.0);
        
        // gyeon 6
        float shadowAttenuation = 0.475;
        
        vec3 shadowColor = mix(bgColor.rgb, gold1 * shadowAttenuation, shadowMixValue);
        shadowColor = mix(shadowColor, gold2 * shadowAttenuation, shadowMixValue2);
        shadowColor = mix(shadowColor, gold3 * shadowAttenuation, shadowMixValue3);
        shadowColor = mix(shadowColor, gold4 * shadowAttenuation, shadowMixValue4);
        shadowColor = mix(shadowColor, gold5 * shadowAttenuation, shadowMixValue5);
        shadowColor = mix(shadowColor, gold6 * shadowAttenuation, shadowMixValue6);
        shadowColor = mix(shadowColor, gold7 * shadowAttenuation, shadowMixValue7);

        // add shadows to the background      
        //bgColor.rgb = shadowColor;
        bgColor.rgb = mix(bgColor.rgb, shadowColor, shadowColorEffect); 
        
        

        
        // sharpen texts
        foreground.a = pow(foreground.a, 1.5);
        //foreground.a = sin(foreground.a);
        
        //foreground.a = mix(smoothstep(0.0, 1.0, foreground.a), foreground.a, foreground.a);
        //foreground.a = smoothstep(0.0, 1.0, foreground.a);
        
        // mix foreground and background, gyeon 5
        vec4 render;
        render.rgb = foreground.rgb + (bgColor.rgb * (1.0 - foreground.a));
        render.a = foreground.a + (bgColor.a * (1.0 - foreground.a));
        
        
        // finally the transition effect
        float curveStrength = 0.1;
        if(uResolution.y > uResolution.x) {
            curveStrength = 0.0625;
        }
        
        float transition1 = uTransition;
        float transition2 = pow(uTransition, 3.0);
        float transition3 = pow(uTransition, 6.0);
        float transition4 = pow(uTransition, 9.0);
        
        float shape1 = transitionShape(transition1, curveStrength);
        vec4 finalShape1 = vec4(vec3(shape1 * gold5), shape1);
        
        float shape2 = transitionShape(transition2, curveStrength);
        vec4 finalShape2 = vec4(vec3(shape2 * gold4), shape2);
        
        float shape3 = transitionShape(transition3, curveStrength);
        vec4 finalShape3 = vec4(vec3(shape3 * gold3), shape3);
        
        float shape4 = transitionShape(transition4, curveStrength);
        vec4 finalShape4 = vec4(vec3(shape4 * gold2), shape4);
        
        
        vec4 finalColor = mix(render, finalShape1, shape1);
        finalColor = mix(finalColor, finalShape2, shape2);
        finalColor = mix(finalColor, finalShape3, shape3);
        finalColor = mix(finalColor, finalShape4, shape4); 
`,
    tn = `          
        gl_FragColor = finalColor;
    }
`,
    sn = `       
        // out color after page transitions
        outColor = finalColor;
    }
`,
    wr = Ka + yr + vr + $a + br + tn,
    Tr = `#version 300 es
    #ifdef GL_FRAGMENT_PRECISION_HIGH
    precision highp float;
    #else
    precision mediump float;
    #endif
    
    in vec3 aVertexPosition;
    in vec2 aTextureCoord;
    
    out vec3 vVertexPosition;
    out vec2 vTextureCoord;
    
    void main() {
        vTextureCoord = aTextureCoord;
        vVertexPosition = aVertexPosition;
        gl_Position = vec4(aVertexPosition, 1.0);
    }
`,
    Pr = Ja + yr + vr + en + br + sn;
  var Gi = class {
    constructor({
      container: e = "canvas",
      production: t = !1,
      width: i = 0,
      height: r = 0,
      smoothScroll: a,
      isMobile: n,
      onWebGLLayerError: o = () => {},
      onWebGLSuccess: l = () => {},
    }) {
      (this.production = t),
        (this.smoothScroll = a),
        (this.isMobile = n),
        (this.onWebGLLayerError = o),
        (this.onWebGLSuccess = l),
        (this.width = i),
        (this.height = r),
        (this.isPortrait = i < r),
        (this.textColor = "#121212"),
        (this.curtains = new Wt({
          container: e,
          pixelRatio: Math.min(1.5, window.devicePixelRatio),
          autoRender: !1,
          autoResize: !1,
          antialias: !1,
          production: this.production,
          watchScroll: !1,
        })),
        this.curtains
          .onSuccess(() => {
            (this.scroll = { value: 0, lastValue: 0, effect: 0 }),
              (this.mouse = {
                last: new N(),
                current: new N(),
                velocity: new N(),
                updateVelocity: !1,
                lastTime: null,
              }),
              (this.size = this.curtains.getBoundingRect()),
              this.addRipples(),
              this.addRenderPasses(),
              this.addHeaderLinkPlanes(),
              this.onWebGLSuccess && this.onWebGLSuccess();
          })
          .onError(() => {
            this.onWebGLLayerError && this.onWebGLLayerError();
          })
          .onContextLost(() => {
            this.curtains.restoreContext();
          });
    }
    onResize(e) {
      (this.width = e.width),
        (this.height = e.height),
        (this.isPortrait = e.width < e.height),
        this.curtains.resize();
    }
    onRender() {
      this.curtains.render();
    }
    onScroll(e) {
      this.curtains.updateScrollValues(0, e.current),
        this.scrollPass &&
          e.velocity &&
          (this.scrollPass.uniforms.scrollEffect.value = Math.max(
            -30,
            Math.min(30, e.velocity / 2)
          ));
    }
    onMouseMove(e) {
      if (this.ripples) {
        this.mouse.last.copy(this.mouse.current),
          (this.mouse.updateVelocity = !0),
          this.mouse.lastTime || (this.mouse.lastTime = (performance || Date).now()),
          this.mouse.last.x === 0 &&
            this.mouse.last.y === 0 &&
            this.mouse.current.x === 0 &&
            this.mouse.current.y === 0 &&
            (this.mouse.updateVelocity = !1),
          this.mouse.current.set(e.x, e.y);
        let t = this.ripples.mouseToPlaneCoords(this.mouse.current);
        if (((this.ripples.uniforms.mousePosition.value = t), this.mouse.updateVelocity)) {
          let i = (performance || Date).now(),
            r = Math.max(14, i - this.mouse.lastTime);
          (this.mouse.lastTime = i),
            this.mouse.velocity.set(
              (this.mouse.current.x - this.mouse.last.x) / r,
              (this.mouse.current.y - this.mouse.last.y) / r
            );
        }
      }
    }
    addRipples() {
      (this.ripples = new Xt(this.curtains, document.getElementById("ripples"), {
        vertexShader: hr,
        fragmentShader: lr,
        autoloadSources: !1,
        watchScroll: !1,
        sampler: "uRipples",
        texturesOptions: { floatingPoint: "half-float" },
        uniforms: {
          mousePosition: { name: "uMousePosition", type: "2f", value: this.mouse.current },
          velocity: { name: "uVelocity", type: "2f", value: this.mouse.velocity },
          resolution: {
            name: "uResolution",
            type: "2f",
            value: new N(this.size.width, this.size.height),
          },
          pixelRatio: { name: "uPixelRatio", type: "1f", value: this.curtains.pixelRatio },
          time: { name: "uTime", type: "1i", value: -1 },

          //@gyeon 2

          viscosity: { name: "uViscosity", type: "1f", value: 25.75 },
          speed: { name: "uSpeed", type: "1f", value: 4.75 },
          size: { name: "uSize", type: "1f", value: 2 },
          dissipation: {
            name: "uDissipation",
            type: "1f",
            value: this.isPortrait ? 0.985 : 0.9875,
          },
        },
      })),
        this.ripples
          .onRender(() => {
            this.mouse.velocity.set(
              this.curtains.lerp(this.mouse.velocity.x, 0, 0.05),
              this.curtains.lerp(this.mouse.velocity.y, 0, 0.1)
            ),
              (this.ripples.uniforms.velocity.value = this.mouse.velocity.clone()),
              this.ripples.uniforms.time.value++;
          })
          .onAfterResize(() => {
            let e = this.ripples.getBoundingRect();
            this.ripples.uniforms.resolution.value.set(e.width, e.height),
              (this.ripples.uniforms.dissipation.value = this.isPortrait ? 0.985 : 0.9875);
          });
    }
    addRenderPasses() {
      (this.scrollTarget = new Se(this.curtains)),
        (this.scrollPass = new vt(this.curtains, {
          fragmentShader: xr,
          renderTarget: this.scrollTarget,
          depth: !1,
          uniforms: {
            scrollEffect: { name: "uScrollEffect", type: "1f", value: this.scroll.effect },
            scrollStrength: {
              name: "uScrollStrength",
              type: "1f",
              value: this.isPortrait ? 3 : 2,
            },
          },
        })),
        this.scrollPass
          .onRender(() => {
            this.smoothScroll ||
              ((this.scroll.lastValue = this.scroll.value),
              (this.scroll.value = this.curtains.getScrollValues().y),
              (this.scroll.delta = Math.max(
                -30,
                Math.min(30, this.scroll.lastValue - this.scroll.value)
              )),
              (this.scroll.effect = this.curtains.lerp(
                this.scroll.effect,
                this.scroll.delta,
                0.05
              )),
              (this.scrollPass.uniforms.scrollEffect.value = this.scroll.effect));
          })
          .onAfterResize(() => {
            let i = this.scrollPass.getBoundingRect();
            this.scrollPass.uniforms.scrollStrength.value = i.width >= i.height ? 1.5 : 3;
          });
      let e = {
          resolution: {
            name: "uResolution",
            type: "2f",
            value: new N(this.size.width, this.size.height),
          },
          time: { name: "uTime", type: "1f", value: 0 },
          pageTransition: { name: "uTransition", type: "1f", value: 0 },
          transitionDirection: { name: "uTransitionDirection", type: "1f", value: 1 },
        },
        t = { fragmentShader: wr, depth: !1, uniforms: e };
      this.curtains.isWebGL2() && ((t.vertexShader = Tr), (t.fragmentShader = Pr)),
        (this.renderPass = new vt(this.curtains, t)),
        this.renderPass
          .onRender(() => {
            this.renderPass.uniforms.time.value++;
          })
          .onAfterResize(() => {
            let i = this.renderPass.getBoundingRect();
            this.renderPass.uniforms.resolution.value.set(i.width, i.height);
          }),
        this.renderPass.createTexture({
          sampler: "uRipplesTexture",
          fromTexture: this.ripples.getTexture(),
        });
    }
    addPlanes() {
      this.addRegularPlanes(), this.addVideoPlanes(), this.addTextPlanes(), this.addHRPlanes();
    }
    removePlanes() {
      this.curtains.planes.forEach((e) => {
        e.type !== "PingPongPlane" &&
          e.userData.name !== "homeLink" &&
          (e.userData.tween && (e.userData.tween.kill(), (e.userData.tween = null)),
          e.userData.mouseEl &&
            e.userData.mouseEnter &&
            e.userData.mouseEl.removeEventListener("mouseenter", e.userData.mouseEnter),
          e.userData.mouseEl &&
            e.userData.mouseLeave &&
            e.userData.mouseEl.removeEventListener("mouseleave", e.userData.mouseLeave),
          e.userData.links &&
            e.userData.links.forEach((t) => {
              t.el.removeEventListener("mouseenter", t.mouseEnter),
                t.el.removeEventListener("mouseleave", t.mouseLeave);
            }),
          e.userData.textTexture && e.userData.textTexture.dispose(),
          e.remove());
      });
    }
    addHeaderLinkPlanes() {
      document.querySelectorAll("#header .header-plane").forEach((e) => {
        let t = e.classList.contains("header-link"),
          i = new be(this.curtains, e, {
            vertexShader: Wi,
            fragmentShader: ji,
            watchScroll: !1,
            uniforms: { fadeIn: { name: "uFadeIn", type: "1f", value: 0 } },
          });
        (i.userData.fadeDuration = 1.75),
          (i.userData.name = "homeLink"),
          (i.userData.isHovered = !1),
          t && (e.innerText = e.textContent.split(" ").join('"'));
        let r = (n, o, l) => {
            o.word.indexOf('"') !== -1 && (o.word = o.word.replace(/\"/g, " ")),
              (n.fillStyle = this.textColor),
              (n.strokeStyle = this.textColor),
              (n.lineWidth = 2),
              i.userData.isHovered &&
                (n.beginPath(),
                n.moveTo(l.left, l.bottom),
                n.lineTo(l.right, l.bottom),
                n.stroke());
          },
          a = new Yt({
            plane: i,
            textElement: i.htmlElement,
            sampler: "uTexture",
            skipFontLoading: !0,
            onBeforeWordWriting: r,
            resolution: 1.5,
          });
        t &&
          !this.isMobile &&
          (e.addEventListener("mouseenter", () => {
            (i.userData.isHovered = !0), a.writeTexture(!1);
          }),
          e.addEventListener("mouseleave", () => {
            (i.userData.isHovered = !1), a.writeTexture(!1);
          })),
          (i.userData.textTexture = a);
      });
    }
    addTextPlanes() {
      document.querySelectorAll(".text-plane").forEach((e) => {
        this.addSingleTextPlane(e);
      });
    }
    addSingleTextPlane(e) {
      let t = e.classList.contains("main-title-text"),
        i = e.classList.contains("project-title-line"),
        r = e.classList.contains("project-number"),
        a = i || r,
        n = e.classList.contains("text-plane-has-link"),
        o = e.classList.contains("text-plane-is-link"),
        l = o || (e.hasAttribute("id") && e.getAttribute("id") === "scroll-to-top"),
        h = new be(this.curtains, e, {
          vertexShader: t ? Wi : dr,
          fragmentShader: t ? ji : ur,
          widthSegments: t ? 1 : 15,
          heightSegments: t ? 1 : 10,
          renderOrder: a ? 1 : 0,
          fov: 75,
          uniforms: { fadeIn: { name: "uFadeIn", type: "1f", value: 0 } },
        });
      h.setRenderTarget(this.scrollTarget),
        (h.userData.fadeDuration = t ? 1.75 : 2.5),
        (h.userData.ease = t ? "power4.out" : "back.out"),
        n &&
          e.querySelectorAll("li").forEach((f) => {
            let u = f.textContent;
            f.innerText = u
              .replace(/[\n\r]+|[\s]{2,}/g, " ")
              .trim()
              .split(" ")
              .join('"');
          });
      let d = () => {};
      if (n) {
        let p = e.querySelectorAll("li");
        (h.userData.links = []),
          p.forEach((f) => {
            let u = { word: f.innerText, isHovered: !1, el: f };
            this.isMobile ||
              ((u.mouseEnter = () => {
                (u.isHovered = !0), c.writeTexture();
              }),
              (u.mouseLeave = () => {
                (u.isHovered = !1), c.writeTexture();
              }),
              u.el.addEventListener("mouseenter", u.mouseEnter),
              u.el.addEventListener("mouseleave", u.mouseLeave)),
              h.userData.links.push(u);
          }),
          (d = (f, u, g) => {
            f.fillStyle = this.textColor;
            let _ = h.userData.links.find((v) => v.word === u.word);
            _ &&
              ((f.strokeStyle = this.textColor),
              (f.lineWidth = 2),
              _.isHovered ||
                (f.beginPath(),
                f.moveTo(g.left, g.bottom - 1),
                f.lineTo(g.right, g.bottom - 1),
                f.stroke()),
              u.word.indexOf('"') !== -1 && (u.word = u.word.replace(/\"/g, " ")));
          });
      }
      o &&
        ((h.userData.isHovered = !1),
        (h.userData.mouseEl = e),
        this.isMobile ||
          ((h.userData.mouseEnter = () => {
            (h.userData.isHovered = !0),
              h.userData.textTexture && h.userData.textTexture.writeTexture(!1);
          }),
          (h.userData.mouseLeave = () => {
            (h.userData.isHovered = !1),
              h.userData.textTexture && h.userData.textTexture.writeTexture(!1);
          }),
          h.userData.mouseEl.addEventListener("mouseenter", h.userData.mouseEnter),
          h.userData.mouseEl.addEventListener("mouseleave", h.userData.mouseLeave)),
        (d = (p, f, u) => {
          (p.fillStyle = this.textColor),
            h.userData.isHovered &&
              ((p.strokeStyle = this.textColor),
              (p.lineWidth = 2),
              p.beginPath(),
              p.moveTo(u.left, u.bottom - 1),
              p.lineTo(u.right, u.bottom - 1),
              p.stroke());
        }));
      let c = new Yt({
        plane: h,
        textElement: h.htmlElement,
        sampler: "uTexture",
        resolution: 1.5,
        skipFontLoading: !0,
        allowedLineEndSpace: l ? 2 : 0.5,
        onBeforeWordWriting: d,
      });
      if (((h.userData.textTexture = c), a)) {
        let p = e.closest(".project").querySelector(".project-plane"),
          f = this.curtains.planes.filter((g) => g.htmlElement.isEqualNode(p));
        h.userData.refParallaxPlane = (f && f[0]) || null;
        let u = () => {
          if (h.userData.refParallaxPlane)
            if (this.isPortrait) h.relativeTranslation.y !== 0 && (h.relativeTranslation.y = 0);
            else {
              let g = h.userData.refParallaxPlane.getBoundingRect(),
                v = (g.top + g.height / 2 - this.height / 2) / this.height;
              h.relativeTranslation.y = (v * this.height) / 6;
            }
        };
        h.onRender(() => {
          u();
        });
      }
    }
    addHRPlanes() {
      document.querySelectorAll(".hr-plane").forEach((e) => {
        this.addSingleHRPlane(e);
      });
    }
    addSingleHRPlane(e) {
      let t =
          e.classList.contains("site-list-separator") || e.classList.contains("project-separator")
            ? 0.5
            : 1,
        i = new be(this.curtains, e, {
          vertexShader: cr,
          fragmentShader: fr,
          uniforms: {
            fadeIn: { name: "uFadeIn", type: "1f", value: 0 },
            opacity: { name: "uOpacity", type: "1f", value: t },
          },
        });
      i.setRenderTarget(this.scrollTarget), (i.userData.fadeDuration = 1.5);
    }
    addRegularPlanes() {
      document.querySelectorAll(".plane").forEach((e) => {
        this.addSingleRegularPlane(e);
      });
    }
    addSingleRegularPlane(e) {
      let t = e.classList.contains("main-project-plane"),
        i = e.classList.contains("project-plane"),
        r = e.hasAttribute("data-min-opacity") ? e.getAttribute("data-min-opacity") : 1,
        a = t && this.isPortrait ? 1 : r,
        n = new be(this.curtains, e, {
          vertexShader: pr,
          fragmentShader: gr,
          widthSegments: 15,
          heightSegments: 10,
          texturesOptions: { minFilter: this.curtains.gl.LINEAR_MIPMAP_NEAREST },
          uniforms: {
            fadeIn: { name: "uFadeIn", type: "1f", value: 0 },
            opacity: { name: "uOpacity", type: "1f", value: a },
            grayScale: { name: "uIsGrayScale", type: "1f", value: t ? 0 : 0 },
            hoverEffect: { name: "uHoverEffect", type: "1f", value: 0 },
          },
        });
      n.setRenderTarget(this.scrollTarget),
        (n.userData.fadeDuration = 3),
        (n.userData.ease = "back.out"),
        i &&
          ((n.userData.hoverDuration = 2.5),
          (n.userData.minOpacity = r),
          (n.userData.isHovered = !1),
          this.isMobile ||
            ((n.userData.mouseEl = e.closest("li")),
            (n.userData.mouseEnter = () => {
              (n.userData.isHovered = !0),
                this.isPortrait || (n.visible = !0),
                n.userData.tween && (n.userData.tween.kill(), (n.userData.tween = null));
              let o = {
                opacity: n.uniforms.opacity.value,
                hoverEffect: n.uniforms.hoverEffect.value,
                textScale: n.textures[0].scale.x,
              };
              n.userData.tween = ee.to(o, {
                opacity: 1,
                hoverEffect: 1,
                textScale: 1.15,
                duration: n.userData.hoverDuration,
                ease: "back.out",
                onUpdate: () => {
                  this.isPortrait ||
                    ((n.uniforms.opacity.value = o.opacity),
                    (n.uniforms.hoverEffect.value = o.hoverEffect),
                    (n.textures[0].scale.x = o.textScale),
                    (n.textures[0].scale.y = o.textScale));
                },
                onComplete: () => {
                  n.userData.tween = null;
                },
              });
            }),
            (n.userData.mouseLeave = () => {
              n.userData.tween && (n.userData.tween.kill(), (n.userData.tween = null));
              let o = {
                opacity: n.uniforms.opacity.value,
                hoverEffect: n.uniforms.hoverEffect.value,
                textScale: n.textures[0].scale.x,
              };
              n.userData.tween = ee.to(o, {
                opacity: n.userData.minOpacity,
                hoverEffect: 0,
                textScale: 1,
                duration: n.userData.hoverDuration,
                ease: "back.out",
                onUpdate: () => {
                  this.isPortrait ||
                    ((n.uniforms.opacity.value = o.opacity),
                    (n.uniforms.hoverEffect.value = o.hoverEffect),
                    (n.textures[0].scale.x = o.textScale),
                    (n.textures[0].scale.y = o.textScale));
                },
                onComplete: () => {
                  (n.userData.tween = null), (n.userData.isHovered = !1);
                },
              });
            }),
            n.userData.mouseEl.addEventListener("mouseenter", n.userData.mouseEnter),
            n.userData.mouseEl.addEventListener("mouseleave", n.userData.mouseLeave)),
          n.onAfterResize(() => {
            this.isPortrait
              ? ((n.userData.isHovered = !1), (n.uniforms.opacity.value = 1))
              : ((n.userData.isHovered = !1), (n.uniforms.opacity.value = n.userData.minOpacity));
          }));
    }
    addVideoPlanes() {
      document.querySelectorAll(".video-plane").forEach((e) => {
        this.addSingleVideoPlane(e);
      });
    }
    addSingleVideoPlane(e) {
      let t = new be(this.curtains, e, {
        vertexShader: _r,
        fragmentShader: mr,
        widthSegments: 15,
        heightSegments: 10,
        autoloadSources: !1,
        uniforms: {
          fadeIn: { name: "uFadeIn", type: "1f", value: 0 },
          videoStarted: { name: "uVideoStarted", type: "1f", value: 0 },
        },
      });
      t.setRenderTarget(this.scrollTarget),
        (t.userData.fadeDuration = 1.75),
        (t.userData.shown = !1),
        (t.userData.videoLoaded = !1),
        t.loadImage(e.querySelector("img").getAttribute("data-video-poster"), {
          sampler: "videoPoster",
        }),
        t.loadVideo(e.querySelector("img").getAttribute("data-video"), { sampler: "planeTexture" }),
        t
          .onLoading((i) => {
            i.sourceType === "video" &&
              (i.onSourceUploaded(() => {
                t.uniforms.videoStarted.value = 1;
              }),
              (t.userData.videoLoaded = !0),
              t.userData.videoLoaded &&
                t.userData.shown &&
                ((t.userData.playPromise = i.source.play()),
                (t.userData.canPlay = !0),
                t.userData.playPromise !== void 0 &&
                  t.userData.playPromise.catch(() => {
                    (t.uniforms.videoStarted.value = 0), (t.userData.canPlay = !1);
                  })));
          })
          .onReEnterView(() => {
            t.userData.videoLoaded &&
              t.userData.shown &&
              t.textures[1].source &&
              t.textures[1].source.paused &&
              t.userData.canPlay &&
              t.textures[1].source.play();
          })
          .onLeaveView(() => {
            t.userData.videoLoaded &&
              t.userData.shown &&
              t.textures[1].source &&
              !t.textures[1].source.paused &&
              t.userData.canPlay &&
              t.textures[1].source.pause();
          });
    }
  };
  ("use strict");
  var Hi = class {
    constructor({ container: e, inertia: t = 0.1, threshold: i = 0.5, useRaf: r = !1 } = {}) {
      if (((this.container = e), !this.container)) {
        console.warn(
          "Can't init SmoothScroll class because the container passed does not exist:",
          e
        );
        return;
      }
      (this.inertia = t),
        (this.threshold = i),
        (this._useRaf = r),
        (this._raf = null),
        (this._isScrolling = !1),
        (this.scroll = {}),
        (this.store = {}),
        this.resize(),
        this.init();
    }
    init() {
      (this.container.style.position = "fixed"),
        (this.container.style.top = 0),
        (this.container.style.left = 0),
        (this.container.style.width = "100%"),
        this.scroll.current !== 0 &&
          (this.scrollTo(this.scroll.current),
          setTimeout(() => {
            this.emitScroll();
          }, 0)),
        window.addEventListener("scroll", () => this.scrollEvent()),
        this._useRaf && this.animate();
    }
    update() {
      (this.store.documentHeight = this.container.clientHeight),
        (this.store.windowHeight = window.innerHeight),
        (document.body.style.height = this.store.documentHeight + "px");
    }
    resize() {
      this.update();
      let e = window.pageYOffset;
      (this.scroll = { target: e, current: e, velocity: 0 }), this.scrollTo(this.scroll.current);
    }
    lerp(e, t, i) {
      return ((1 - i) * e + i * t).toFixed(2);
    }
    scrollEvent() {
      this.scroll.target = window.pageYOffset;
    }
    emitScroll() {
      this.onScrollCallback &&
        this.onScrollCallback({
          current: this.scroll.current,
          target: this.scroll.target,
          velocity: this.scroll.velocity,
        });
    }
    scrollTo(e) {
      (e = Math.max(0, Math.min(e, this.store.documentHeight - this.store.windowHeight))),
        (this.scroll.current = e),
        (this.scroll.target = e),
        (this.scroll.velocity = 0),
        window.scrollTo(0, e),
        this.updatePosition(),
        this.emitScroll();
    }
    updatePosition() {
      this.container.style.transform = "translateY(" + -this.scroll.current + "px)";
    }
    render() {
      let e = this.scroll.current;
      (this.scroll.current = this.lerp(this.scroll.current, this.scroll.target, this.inertia)),
        (this.scroll.velocity = this.scroll.current - e),
        Math.abs(this.scroll.current - this.scroll.target) >= this.threshold
          ? ((this._isScrolling = !0), this.updatePosition(), this.emitScroll())
          : this._isScrolling &&
            ((this._isScrolling = !1),
            (this.scroll.current = this.scroll.target),
            (this.scroll.velocity = 0),
            this.updatePosition(),
            this.emitScroll());
    }
    animate() {
      this.render(), (this._raf = window.requestAnimationFrame(() => this.animate()));
    }
    onScroll(e) {
      e && (this.onScrollCallback = e);
    }
    destroy() {
      this._raf && window.cancelAnimationFrame(this._raf),
        window.removeEventListener(this.scrollEvent);
    }
  };
  var Rr = class {
      constructor({
        production: e = !1,
        analyticsID: t,
        appContainer: i,
        webglContainer: r,
        transitionDuration: a = 1e3,
      }) {
        (this.production = e),
          (this.state = {
            loader: {
              el: document.getElementById("loader"),
              startTs: (performance || Date).now(),
              loaded: !1,
              minDuration: 1e3,
            },
            isMobile: /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
              navigator.userAgent
            ),
            isiOS: /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream,
            fontsLoaded: !1,
            windowLoaded: !1,
            webglPerfThreshold: 4,
            hasWebgl: !1,
            webglStarted: !1,
            hasObserver: !0,
            namespace: "home",
            fonts: {
              loaded: 0,
              list: [],
            },
          }),
          this.checkPerf(),
          (this.transitionDuration = a),
          this.initEventsEmitters(),
          (this.observers = []),
          (this.analyticsID = t),
          (this.appContainer = i),
          (this.webglContainer = r),
          this.init();
      }
      init() {
        this.initStore(),
          this.initAnalytics(),
          this.loadFonts(),
          this.production &&
            (console.log(),
            console.log(),
            console.log(),
            console.log(),
            console.log(),
            console.log(),
            console.log()),
          window.addEventListener("load", this.onWindowLoad.bind(this));
      }
      loadFonts() {
        this.state.fonts.list.forEach((e) => {
          document.fonts.load(e).then(() => {
            this.state.fonts.loaded++,
              this.state.fonts.loaded === this.state.fonts.list.length && this.onCurtainsReady();
          });
        });
      }
      onWebGLLayerError() {
        (this.state.hasWebgl = !1),
          (this.webglLayer = null),
          document.body.classList.add("reduced-motion");
      }
      onWebGLSuccess() {
        (this.state.hasWebgl = !0),
          document.body.classList.add("has-webgl"),
          this.onCurtainsReady();
      }
      checkPerf() {
        this.perf = 0;
        let e = (performance || Date).now(),
          t = [];
        for (let a = 0; a < 2e4; a++) t = Math.pow(Math.sin(Math.random()), 2);
        let i = (performance || Date).now() - e;
        i < 7
          ? (this.perf += 1)
          : i < 14
          ? (this.perf += 2)
          : i < 22
          ? (this.perf += 3)
          : (this.perf += 4);
        let r = window.matchMedia("(prefers-reduced-motion: reduce");
        window.location.href.indexOf("no-motion") !== -1
          ? (r = !1)
          : window.location.href.indexOf("no-webgl") !== -1 &&
            (this.perf = this.state.webglPerfThreshold + 1),
          !r || r.matches
            ? ((this.perf = 6), document.body.classList.add("no-motion"))
            : this.perf > this.state.webglPerfThreshold &&
              document.body.classList.add("reduced-motion");
      }
      startServiceWorker() {
        "serviceWorker" in navigator && navigator.serviceWorker.register("./");
      }
      initAnalytics() {
        this.analyticsID &&
          this.production &&
          ((window.dataLayer = window.dataLayer || []),
          (this.gtag = function () {
            dataLayer.push(arguments);
          }),
          this.gtag("js", new Date()),
          this.gtag("config", this.analyticsID),
          this.perf >= 6
            ? this.gtag("event", "load", {
                event_category: "Version displayed",
                event_label: "No motion",
                non_interaction: !0,
              })
            : this.perf > this.state.webglPerfThreshold &&
              this.gtag("event", "load", {
                event_category: "Version displayed",
                event_label: "No WebGL",
                non_interaction: !0,
              }));
      }
      initStore() {
        let e = window.innerWidth,
          t = window.innerHeight;
        this.store = {
          windowWidth: e,
          windowHeight: t,
          mouse: { current: { x: 0, y: 0 } },
          scroll: { x: 0, y: 0 },
          pageTweens: [],
        };
      }
      initEventsEmitters() {
        this.listeners = { resize: [], render: [], mouse: [], scroll: [] };
      }
      addEvents(e) {
        for (let [t, i] of Object.entries(e)) this.listeners[t].push({ callback: i });
      }
      emitEvent(e, t = {}) {
        for (let i = 0; i < this.listeners[e].length; i++)
          this.listeners[e][i].callback && this.listeners[e][i].callback(t);
      }
      onResize() {
        let e = window.innerWidth,
          t = this.state.isMobile && this.store.windowWidth === e;
        (this.store.windowWidth = e),
          (this.store.windowHeight = window.innerHeight),
          t ||
            this.emitEvent("resize", {
              width: this.store.windowWidth,
              height: this.store.windowHeight,
            });
      }
      onScroll(e) {
        (this.store.scroll = { x: 0, y: e.current }), this.emitEvent("scroll", e);
      }
      onRender() {
        this.emitEvent("render");
      }
      onMouseMove(e) {
        e.targetTouches
          ? (this.store.mouse.current = {
              x: e.targetTouches[0].clientX,
              y: e.targetTouches[0].clientY,
            })
          : (this.store.mouse.current = { x: e.clientX, y: e.clientY }),
          this.emitEvent("mouse", this.store.mouse.current);
      }
      onWindowLoad() {
        window.addEventListener("resize", this.onResize.bind(this)),
          !this.state.isMobile && this.perf < 6
            ? ((this.smoothScroll = new Hi({
                container: document.getElementById(this.appContainer),
              })),
              this.smoothScroll.onScroll((e) => {
                this.onScroll(e);
              }),
              this.addEvents({
                resize: this.smoothScroll.resize.bind(this.smoothScroll),
                render: this.smoothScroll.render.bind(this.smoothScroll),
              }),
              window.addEventListener("keyup", (e) => {
                if ((e.keyCode ? e.keyCode : e.which) === 9) {
                  let i = document.activeElement;
                  i.classList.contains("header-plane") ||
                    this.smoothScroll.scrollTo(
                      i.getBoundingClientRect().top + this.store.scroll.y - 100
                    );
                }
              }))
            : window.addEventListener("scroll", () => {
                this.onScroll({ current: window.pageYOffset, velocity: null });
              }),
          this.perf <= this.state.webglPerfThreshold &&
            (window.addEventListener("mousemove", this.onMouseMove.bind(this), !1),
            window.addEventListener("touchmove", this.onMouseMove.bind(this), { passive: !0 }),
            (this.webglLayer = new Gi({
              production: this.production,
              container: this.webglContainer,
              width: this.store.windowWidth,
              height: this.store.windowHeight,
              smoothScroll: this.smoothScroll,
              isMobile: this.state.isMobile,
              onWebGLLayerError: () => this.onWebGLLayerError(),
              onWebGLSuccess: () => this.onWebGLSuccess(),
            }))),
          (this.state.windowLoaded = !0),
          this.onCurtainsReady(),
          this.startServiceWorker(),
          this.perf < 6 &&
            (this.startRouting(),
            this.setObserver({ name: "main", threshold: 0 }),
            ee && ee.ticker.add(this.onRender.bind(this))),
          this.onPageLoad();
      }
      onCurtainsReady() {
        this.state.windowLoaded &&
          this.state.hasWebgl &&
          !this.state.webglStarted &&
          (this.addEvents({
            resize: this.webglLayer.onResize.bind(this.webglLayer),
            render: this.webglLayer.onRender.bind(this.webglLayer),
            mouse: this.webglLayer.onMouseMove.bind(this.webglLayer),
            scroll: this.webglLayer.onScroll.bind(this.webglLayer),
          }),
          this.webglLayer.addPlanes(),
          (this.state.webglStarted = !0),
          "requestIdleCallback" in window
            ? requestIdleCallback(() => {
                this.state.loader.el.classList.remove("shown"), this.startMainObserver();
              })
            : setTimeout(() => {
                this.state.loader.el.classList.remove("shown"), this.startMainObserver();
              }, 0));
      }
      setNameSpace() {
        this.state.namespace =
          document.getElementById("content").getAttribute("data-namespace") || "home";
      }
      startRouting() {
        this.router = new Ei({
          container: this.appContainer ? document.getElementById(this.appContainer) : document.body,
          cancelNavigationClass: "out",
          isiOS: this.state.isiOS,
          onStart: {
            value: (e, t) => {
              this.beforePageUnload(e, t);
            },
          },
          onLeaving: {
            duration: this.transitionDuration,
            value: (e, t) => {
              this.onPageUnload();
            },
          },
          onReady: {
            value: (e, t) => {
              this.smoothScroll && this.smoothScroll.update(),
                this.onPageLoad(),
                setTimeout(() => {
                  this.state.loader.el.classList.remove("shown"), this.afterPageLoad();
                }, 500),
                this.analyticsID &&
                  this.gtag &&
                  this.production &&
                  this.gtag("config", this.analyticsID, { page_path: window.location.pathname });
            },
          },
          onWaiting: {
            value: (e, t) => {
              this.state.loader.el.classList.add("shown");
            },
          },
          onError: {
            value: () => {
              this.onPageLoad(),
                setTimeout(() => {
                  this.state.loader.el.classList.remove("shown"), this.afterPageLoad();
                }, 500);
            },
          },
        });
      }
      onPageLoad() {
        if (
          (this.setNameSpace(),
          this.webglLayer && this.state.loader.loaded && this.webglLayer.addPlanes(),
          !this.state.loader.loaded)
        ) {
          let e = (performance || Date).now(),
            t =
              e - this.state.loader.startTs > this.state.loader.minDuration
                ? 0
                : this.state.loader.minDuration - (e - this.state.loader.startTs);
          setTimeout(() => {
            this.perf > this.state.webglPerfThreshold &&
              (this.state.loader.el.classList.remove("shown"), this.startMainObserver());
          }, t);
        }
        (this.state.loader.loaded = !0),
          (this.state.scrollTopButton = document.getElementById("scroll-to-top")),
          this.state.scrollTopButton &&
            this.state.scrollTopButton.addEventListener("click", this.scrollToTop.bind(this), !1),
          this.webglLayer || document.body.classList.remove("page-transition");
      }
      afterPageLoad() {
        this.webglLayer &&
          ((this.webglLayer.renderPass.uniforms.transitionDirection.value = -1),
          ee.to(this.webglLayer.renderPass.uniforms.pageTransition, {
            value: 0,
            duration: this.transitionDuration / 1e3,
            ease: "power3.inOut",
          })),
          setTimeout(() => {
            this.state.hasObserver ? this.startMainObserver() : this.handleObserverError();
          }, this.transitionDuration / 4);
      }
      beforePageUnload(e, t) {
        this.webglLayer
          ? ((this.webglLayer.renderPass.uniforms.transitionDirection.value = 1),
            ee.to(this.webglLayer.renderPass.uniforms.pageTransition, {
              value: 1,
              duration: this.transitionDuration / 1e3,
              ease: "power3.inOut",
            }))
          : document.body.classList.add("page-transition"),
          this.observers.main &&
            this.state.hasObserver &&
            this.observers.main.els.forEach((i) => {
              this.observers.main.unobserveEl(i.el);
            }),
          this.state.scrollTopButton &&
            this.state.scrollTopButton.removeEventListener(
              "click",
              this.scrollToTop.bind(this),
              !1
            );
      }
      onPageUnload() {
        for (let e = 0; e < this.store.pageTweens.length; e++)
          this.store.pageTweens[e].kill(), (this.store.pageTweens[e] = null);
        (this.store.pageTweens = []),
          window.scrollTo(0, 0),
          this.webglLayer && this.webglLayer.removePlanes();
      }
      scrollToTop() {
        if (this.perf < 6) {
          let e = { x: window.pageXOffset, y: window.pageYOffset },
            t = Math.min(2.5, e.y / 1500);
          ee.to(e, {
            duration: t,
            y: 0,
            x: 0,
            ease: "circ.inOut",
            onUpdate: () => {
              window.scrollTo(e.x, e.y);
            },
          });
        } else window.scrollTo(0, 0);
        this.state.scrollTopButton &&
          (this.state.scrollTopButton.classList.add("clicked"),
          setTimeout(() => {
            this.state.scrollTopButton &&
              (this.state.scrollTopButton.classList.remove("clicked"),
              this.state.scrollTopButton.blur());
          }, 1e3));
      }
      setObserver({ name: e, root: t, rootMargin: i, threshold: r = [0, 0.25, 0.5, 0.75, 1] }) {
        this.observers[e || "observer-" + this.observers.length] = new Mi({
          threshold: r,
          root: t,
          rootMargin: i,
        }).onError(() => {
          (this.state.hasObserver = !1), this.handleObserverError();
        });
      }
      handleObserverError() {
        this.webglLayer
          ? this.webglLayer.curtains.planes.forEach((e) => {
              if (e && !e.userData.shown) {
                let t = ee.to(e.uniforms.fadeIn, {
                  value: 1,
                  duration: e.userData.fadeDuration,
                  ease: e.userData.ease || "power4.out",
                  onComplete: () => {
                    (e.userData.shown = !0),
                      e.userData.shown && e.userData.videoLoaded && e.playVideos();
                  },
                });
                this.store.pageTweens.push(t);
              }
            })
          : document.querySelectorAll(".scroll-item").forEach((e) => {
              e.style.opacity = 1;
            });
      }
      startMainObserver() {
        this.observers.main &&
          this.observers.main.observe({
            selector: ".scroll-trigger",
            keepObserving: !1,
            alwaysTrigger: !1,
            stagger: 150,
            onBeforeElVisible: (e) => {
              e.el.classList.contains("main-title-text") && (e.stagger = 100),
                e.el.classList.contains("site-list-separator")
                  ? (e.stagger = 0)
                  : e.el.closest(".site-list-right-content") ||
                    e.el.closest(".site-list-left-content")
                  ? (e.stagger = 50)
                  : e.el.classList.contains("text-plane-is-link") && (e.stagger = 150),
                e.el.hasAttribute("data-stagger") &&
                  (e.stagger = parseInt(e.el.getAttribute("data-stagger")));
            },
            onElVisible: (e) => {
              if (this.webglLayer) {
                let t =
                  this.webglLayer.curtains &&
                  this.webglLayer.curtains.planes.find((i) => i.htmlElement.isSameNode(e.el));
                if (t && !t.userData.shown) {
                  let i = ee.to(t.uniforms.fadeIn, {
                    value: 1,
                    duration: t.userData.fadeDuration,
                    ease: t.userData.ease || "power4.out",
                    onComplete: () => {
                      (t.userData.shown = !0),
                        t.userData.shown && t.userData.videoLoaded && t.playVideos();
                    },
                  });
                  this.store.pageTweens.push(i);
                }
              } else if (!e.el.classList.contains("header-el-shown")) {
                let t = e.el.classList.contains("main-title-text"),
                  i = e.el.classList.contains("hr-plane"),
                  r = e.el.classList.contains("main-project-plane"),
                  a = e.el.hasAttribute("data-min-opacity")
                    ? e.el.getAttribute("data-min-opacity")
                    : 1,
                  n = r && this.store.width < this.store.height ? 1 : a,
                  o = i
                    ? ee.fromTo(
                        e.el,
                        { autoAlpha: 0, scaleX: 0, transformOrigin: "0 50%" },
                        { autoAlpha: 1, scale: 1, scaleX: 1, duration: 1.5, ease: "power4.out" }
                      )
                    : ee.fromTo(
                        e.el,
                        { autoAlpha: 0, scale: t ? 1 : 0.975, y: t ? "25%" : 0 },
                        {
                          autoAlpha: n,
                          scale: 1,
                          y: 0,
                          duration: 2,
                          ease: t || r ? "power4.out" : "back.out",
                          onComplete: () => {
                            e.el.classList.contains("project-plane")
                              ? e.el.classList.add("project-plane-shown")
                              : e.el.classList.contains("header-plane") &&
                                e.el.classList.add("header-el-shown");
                          },
                        }
                      );
                this.store.pageTweens.push(o);
              }
            },
          });
      }
    },
    $h = new Rr({
      analyticsID: "UA-29368338-1",
      production: !0,
      appContainer: "page",
      webglContainer: "canvas",
      transitionDuration: 1500,
    });
})();
/*!
 * CSSPlugin 3.6.0
 * https://greensock.com
 *
 * Copyright 2008-2021, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
 */
/*!
 * GSAP 3.6.0
 * https://greensock.com
 *
 * @license Copyright 2008-2021, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
 */
