// -----------------------------------------------------------------------------
// ertdfgcvb p4
// by
// ertdfgcvb.xyz
// (c) 2021
// -----------------------------------------------------------------------------
var ertdfgcvb = (function (t) {
  "use strict";
  var e = {
    preferredElementNodeName: "PRE",
    render: function (t, e) {
      const i = t.settings.element;
      (i.style.backgroundColor = t.settings.background),
        (i.style.color = t.settings.color),
        (i.style.fontWeight = t.settings.weight),
        (t.rows != r || t.cols != o) &&
          ((o = t.cols), (r = t.rows), (n.length = 0));
      for (; i.childElementCount < r; ) {
        const t = document.createElement("span");
        (t.style.display = "block"), i.appendChild(t);
      }
      for (; i.childElementCount > r; ) i.removeChild(i.lastChild);
      for (let l = 0; l < r; l++) {
        const r = l * o;
        let c = !1;
        for (let t = 0; t < o; t++) {
          const o = t + r,
            s = e[o],
            i = n[o];
          a(s, i) ||
            ((c = !0),
            (n[o] = {
              ...s,
            }));
        }
        if (0 == c) continue;
        let h = "",
          d = {},
          u = !1;
        for (let n = 0; n < o; n++) {
          const o = e[n + r];
          if (
            (o.beginHTML &&
              (u && ((h += "</span>"), (d = {}), (u = !1)), (h += o.beginHTML)),
            !s(o, d))
          ) {
            u && (h += "</span>");
            const e = o.color === t.settings.color ? null : o.color,
              n = o.background === t.settings.background ? null : o.background,
              r = o.weight === t.settings.weight ? null : o.weight;
            let a = "";
            e && (a += "color:" + e + ";"),
              n && (a += "background:" + n + ";"),
              r && (a += "font-weight:" + r + ";"),
              a && (a = ' style="' + a + '"'),
              (h += "<span" + a + ">"),
              (u = !0);
          }
          (h += o.char),
            (d = o),
            o.endHTML &&
              (u && ((h += "</span>"), (d = {}), (u = !1)), (h += o.endHTML));
        }
        u && (h += "</span>"), (i.childNodes[l].innerHTML = h);
      }
    },
  };
  const n = [];
  let o, r;
  function a(t, e) {
    return (
      "object" == typeof t &&
      "object" == typeof e &&
      t.char === e.char &&
      t.weight === e.weight &&
      t.color === e.color &&
      t.background === e.background
    );
  }
  function s(t, e) {
    return (
      t.weight === e.weight &&
      t.color === e.color &&
      t.background === e.background
    );
  }
  var i = {
    preferredElementNodeName: "CANVAS",
    render: function (t, e) {
      const n = t.settings.element,
        o = devicePixelRatio,
        r = t.cols,
        a = t.rows,
        s = t.metrics,
        i = s.cellWidth,
        l = Math.round(s.lineHeight),
        c = t.settings;
      c.canvasSize
        ? ((n.width = c.canvasSize.width * o),
          (n.height = c.canvasSize.height * o),
          (n.style.width = c.canvasSize.width + "px"),
          (n.style.height = c.canvasSize.height + "px"))
        : ((n.width = t.width * o), (n.height = t.height * o));
      const h = " " + s.fontSize + "px " + s.fontFamily,
        d = c && c.background ? c.background : "white",
        u = c && c.color ? c.color : "black",
        f = c && c.weight ? c.color : "400";
      n.style.backgroundColor = c.background || "white";
      const g = n.getContext("2d");
      if (
        ((g.fillStyle = d),
        g.fillRect(0, 0, n.width, n.height),
        g.save(),
        g.scale(o, o),
        c.canvasOffset)
      ) {
        const t = c.canvasOffset,
          e = Math.round("auto" == t.x ? (n.width / o - r * i) / 2 : t.x),
          s = Math.round("auto" == t.y ? (n.height / o - a * l) / 2 : t.y);
        g.translate(e, s);
      }
      (g.fillStyle = u), (g.textBaseline = "top");
      for (let t = 0; t < a; t++)
        for (let n = 0; n < r; n++) {
          const o = e[t * r + n],
            a = n * i,
            s = t * l;
          o.background &&
            o.background != d &&
            ((g.fillStyle = o.background || d),
            g.fillRect(Math.round(a), s, Math.ceil(i), l)),
            (g.font = (o.weight || f) + h),
            (g.fillStyle = o.color || u),
            g.fillText(o.char, a, s);
        }
      g.restore();
    },
  };
  class l {
    constructor() {
      (this.frames = 0), (this.ptime = 0), (this.fps = 0);
    }
    update(t) {
      return (
        this.frames++,
        t >= this.ptime + 1e3 &&
          ((this.fps = (1e3 * this.frames) / (t - this.ptime)),
          (this.ptime = t),
          (this.frames = 0)),
        this.fps
      );
    }
  }
  var c = function (t, e) {
      try {
        return localStorage.setItem(t, JSON.stringify(e)), !0;
      } catch (t) {
        return !1;
      }
    },
    h = function (t, e = {}) {
      const n = JSON.parse(localStorage.getItem(t));
      return Object.assign(e, n), e;
    };
  const d = {
      canvas: i,
      text: e,
    },
    u = {
      element: null,
      cols: 0,
      rows: 0,
      once: !1,
      fps: 30,
      renderer: "text",
      background: "",
      color: "",
      weight: "",
      allowSelect: !1,
      restoreState: !1,
    };
  function f(t, e, n = {}) {
    return new Promise(function (o) {
      const r = {
          ...u,
          ...e,
          ...t.settings,
        },
        a = {
          time: 0,
          frame: 0,
          cycle: 0,
        },
        s = "currentState";
      let i;
      r.restoreState && (h(s, a), a.cycle++),
        r.element
          ? "canvas" == r.renderer
            ? "CANVAS" == r.element.nodeName
              ? (i = d[r.renderer])
              : console.warn("This renderer expects a canvas target element.")
            : "CANVAS" != r.element.nodeName
            ? (i = d[r.renderer])
            : console.warn("This renderer expects a text target element.")
          : ((i = d[r.renderer] || d.text),
            (r.element = document.createElement(i.preferredElementNodeName)),
            document.body.appendChild(r.element));
      const f = [],
        m = {
          x: 0,
          y: 0,
          pressed: !1,
          px: 0,
          py: 0,
          ppressed: !1,
        };
      var w;
      r.element.addEventListener("pointermove", t => {
        const e = r.element.getBoundingClientRect();
        (m.x = t.clientX - e.left),
          (m.y = t.clientY - e.top),
          f.push("pointerMove");
      }),
        r.element.addEventListener("pointerdown", t => {
          (m.pressed = !0), f.push("pointerDown");
        }),
        r.element.addEventListener("pointerup", t => {
          (m.pressed = !1), f.push("pointerUp");
        }),
        (r.element.style.fontStrech = "normal"),
        r.allowSelect ||
          (((w = r.element).style.userSelect = "none"),
          (w.style.webkitUserSelect = "none"),
          (w.style.mozUserSelect = "none"),
          (w.dataset.selectionEnabled = "false")),
        document.fonts.ready.then(e => {
          let o = 3;
          !(function e() {
            --o > 0
              ? requestAnimationFrame(e)
              : (function () {
                  M = p(r.element);
                  const e = g(a, r, M, b);
                  "function" == typeof t.boot && t.boot(e, x, n);
                  requestAnimationFrame(N);
                })();
          })();
        });
      const b = new l(),
        y = Object.freeze({
          color: r.color,
          background: r.background,
          weight: r.weight,
        }),
        x = [];
      let M;
      let v = 0;
      const S = 1e3 / r.fps,
        k = a.time;
      let A, E;
      function N(e) {
        const l = e - v;
        if (l < S) return void (r.once || requestAnimationFrame(N));
        const h = g(a, r, M, b);
        b.update(e), (v = e - (l % S)), (a.time = e + k), a.frame++, c(s, a);
        const d = {
          x: m.x / M.cellWidth,
          y: m.y / M.lineHeight,
          pressed: m.pressed,
          p: {
            x: m.px / M.cellWidth,
            y: m.py / M.lineHeight,
            pressed: m.ppressed,
          },
        };
        if (
          ((m.px = m.x),
          (m.py = m.y),
          (m.ppressed = m.pressed),
          A != h.cols || E != h.rows)
        ) {
          (A = h.cols), (E = h.rows), (x.length = h.cols * h.rows);
          for (let t = 0; t < x.length; t++)
            x[t] = {
              ...y,
              char: " ",
            };
        }
        if (
          ("function" == typeof t.pre && t.pre(h, d, x, n),
          "function" == typeof t.main)
        )
          for (let e = 0; e < h.rows; e++) {
            const o = e * h.cols;
            for (let r = 0; r < h.cols; r++) {
              const a = r + o,
                s = t.main(
                  {
                    x: r,
                    y: e,
                    index: a,
                  },
                  h,
                  d,
                  x,
                  n
                );
              (x[a] =
                "object" == typeof s && null !== s
                  ? {
                      ...x[a],
                      ...s,
                    }
                  : {
                      ...x[a],
                      char: s,
                    }),
                Boolean(x[a].char) || 0 === x[a].char || (x[a].char = " ");
            }
          }
        for (
          "function" == typeof t.post && t.post(h, d, x, n), i.render(h, x, r);
          f.length > 0;

        ) {
          const e = f.shift();
          e && "function" == typeof t[e] && t[e](h, d, x);
        }
        r.once || requestAnimationFrame(N), o(h);
      }
    });
  }
  function g(t, e, n, o) {
    const r = e.element.getBoundingClientRect(),
      a = e.cols || Math.floor(r.width / n.cellWidth),
      s = e.rows || Math.floor(r.height / n.lineHeight);
    return Object.freeze({
      frame: t.frame,
      time: t.time,
      cols: a,
      rows: s,
      metrics: n,
      width: r.width,
      height: r.height,
      settings: e,
      runtime: Object.freeze({
        cycle: t.cycle,
        fps: o.fps,
      }),
    });
  }
  function p(t) {
    const e = getComputedStyle(t),
      n = e.getPropertyValue("font-family"),
      o = parseFloat(e.getPropertyValue("line-height")),
      r = parseFloat(e.getPropertyValue("font-size")),
      a = (
        "CANVAS" == t.nodeName ? t : document.createElement("canvas")
      ).getContext("2d");
    a.font = r + "px " + n;
    const s = a.measureText("".padEnd(10, "x")).width / 10,
      i = {
        aspect: s / o,
        cellWidth: s,
        lineHeight: o,
        fontFamily: n,
        fontSize: r,
        _update: function () {
          const e = p(t);
          for (var n in e)
            ("number" != typeof e[n] && "string" != typeof e[n]) ||
              (i[n] = e[n]);
        },
      };
    return i;
  }
  class m {
    constructor(t) {
      this.DOMElement = t;
    }
    updateBB() {
      this.bb = this.DOMElement.getBoundingClientRect();
    }
    property(t) {
      return getComputedStyle(this.DOMElement).getPropertyValue(t).trim();
    }
    width(t) {
      return Math.round(this.bb.width / t.cellWidth);
    }
    height(t) {
      return Math.round(this.bb.height / t.lineHeight);
    }
    x(t) {
      return Math.round(this.bb.left / t.cellWidth);
    }
    y(t) {
      return Math.round(this.bb.top / t.lineHeight);
    }
    background() {
      return getComputedStyle(this.DOMElement).backgroundColor;
    }
    update(t) {
      return {
        x: x(t),
        y: y(t),
        width: width(t),
        height: height(t),
      };
    }
  }
  function w(t, e, n) {
    return t < e ? e : t > n ? n : t;
  }
  function b(t, e, n) {
    return t * (1 - n) + e * n;
  }
  function M(t, e, n) {
    const o = w((n - t) / (e - t), 0, 1);
    return o * o * (3 - 2 * o);
  }
  function v(t, e, n, o, r) {
    if (t < 0 || t >= o) return {};
    if (e < 0 || e >= r) return {};
    return n[t + e * o];
  }
  function S(t, e, n, o, r, a) {
    if (e < 0 || e >= r) return;
    if (n < 0 || n >= a) return;
    const s = e + n * r,
      i =
        "object" == typeof o[s]
          ? o[s]
          : {
              char: o[s],
            };
    o[s] = {
      ...i,
      ...t,
    };
  }
  function k(t, e, n, o, r, a, s, i) {
    for (let l = n; l < n + r; l++)
      for (let n = e; n < e + o; n++) S(t, n, l, a, s, i);
  }
  function A(t, e, n, o, r, a) {
    let s, i;
    "object" == typeof t
      ? ((s = t.text),
        (i = {
          ...t,
        }),
        delete i.text)
      : (s = t);
    let l = e,
      c = n;
    const h = [];
    return (
      s.split("\n").forEach((t, n) => {
        t.split("").forEach((t, n) => {
          (l = e + n),
            S(
              {
                char: t,
                ...i,
              },
              l,
              c,
              o,
              r,
              a
            );
        });
        const s = v(e, c, o, r, a),
          d = v(e + t.length - 1, c, o, r, a);
        h.push({
          first: s,
          last: d,
        }),
          c++;
      }),
      (c = Math.max(n, c - 1)),
      {
        offset: {
          col: l,
          row: c,
        },
        wrapInfo: h,
      }
    );
  }
  function E(t, e = 0) {
    if (0 == e)
      return (function (t) {
        let e = 0,
          n = 0,
          o = 0;
        for (let r = 0; r < t.length; r++) {
          "\n" == t[r] ? ((o = 0), e++) : (o++, (n = Math.max(n, o)));
        }
        return {
          text: t,
          numLines: e,
          maxWidth: n,
        };
      })(t);
    const n = t.split("\n");
    let o = "",
      r = 0,
      a = 0;
    for (const t of n) {
      const n = t.split(" ");
      let s = 0;
      for (const t of n)
        0 == s
          ? ((o += t), (s = t.length), (r = Math.max(r, s)))
          : s + 1 + t.length <= e
          ? ((o += " " + t), (s += t.length + 1), (r = Math.max(r, s)))
          : ((o += "\n" + t), (s = t.length + 1), a++);
      (o += "\n"), a++;
    }
    return (
      (o = o.slice(0, -1)),
      "\n" == o.charAt(o.length - 1) && a--,
      {
        text: o,
        numLines: a,
        maxWidth: r,
      }
    );
  }
  class N {
    constructor(t, e) {
      (this.width = t),
        (this.height = e),
        (this.data = new Array(t * e).fill(0));
    }
    setBmp(t, e, n) {
      for (let o = 0; o < t.height; o++)
        for (let r = 0; r < t.width; r++) {
          const a = e + r + (o + n) * this.width;
          this.data[a] = t.get(r, o);
        }
    }
    get(t, e) {
      return t < 0 || t >= this.width || e < 0 || e >= this.height
        ? 0
        : this.data[t + e * this.width];
    }
    sample(t, e) {
      const n = t * this.width - 0.5,
        o = e * this.height - 0.5;
      let r = Math.floor(n),
        a = Math.floor(o),
        s = r + 1,
        i = a + 1;
      const l = n - r,
        c = o - a,
        h = b(this.get(r, a), this.get(s, a), l),
        d = b(this.get(r, i), this.get(s, i), l);
      return b(h, d, c);
    }
    print() {
      let t = "";
      for (let e = 0; e < this.height; e++) {
        for (let n = 0; n < this.width; n++)
          t += this.get(n, e) < 0.5 ? "K" : "T";
        t += "\n";
      }
      return t;
    }
    pack() {
      const t = [],
        e = Math.ceil(this.data.length / 32);
      for (let n = 0; n < e; n++) {
        let e = 0;
        for (let t = 0; t < 32; t++)
          this.data[t + 32 * n] > 0.5 && (e = L(e, t));
        t.push(e);
      }
      return t;
    }
    unpack(t, e) {
      for (let n = 0; n < e; n++) {
        const e = t[Math.floor(n / 32)],
          o = n % 32;
        this.data[n] = C(e, o) ? 1 : 0;
      }
    }
  }
  function C(t, e) {
    return (t >> e) % 2 != 0;
  }
  function L(t, e) {
    return t | (1 << e);
  }
  const T = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    j = new N(8, 11),
    O = {};
  !(function (t, e, n, o, r) {
    const a = e * n,
      s = Math.ceil(a / 32);
    for (let r = 0; r < o.length; r++) {
      const i = new N(e, n),
        l = r * s;
      i.unpack(t.slice(l, l + s), a);
      const c = o[r];
      O[c] = i;
    }
  })(
    [
      1667446300, 1667465059, 25443, 1667457855, 1667457855, 16227, 50553662,
      50529027, 15971, 1667445535, 1667457891, 7987, 50529151, 50529087, 32515,
      50529151, 50529087, 771, 50553662, 1667457915, 32355, 1667457891,
      1667457919, 25443, 202116159, 202116108, 16140, 808464504, 858796080,
      7731, 456352611, 857411343, 25443, 50529027, 50529027, 32515, 2138530659,
      1667984235, 25443, 1734828899, 1936948079, 25443, 1667457854, 1667457891,
      15971, 1667457855, 50544483, 771, 1667457854, 1868784483, 6305371,
      1667457855, 858987327, 25443, 100885310, 1613764620, 15971, 404232447,
      404232216, 6168, 1667457891, 1667457891, 15971, 1667457891, 912483171,
      2076, 1801675619, 2137746283, 13878, 912483171, 1664490524, 25443,
      858993459, 202120755, 3084, 811622527, 50727960, 32515, 1801675582,
      1667984235, 15971, 404626456, 404232216, 32280, 1616929598, 101455920,
      32515, 1616929598, 1616928828, 15971, 1010315296, 813642550, 12336,
      50529151, 1616928831, 15971, 50529852, 1667457855, 15971, 1616929663,
      202119216, 3084, 1667457854, 1667457854, 15971, -471604290, -522125597,
      8429232,
    ],
    8,
    11,
    T
  );
  var H = 8,
    B = 11,
    z = function (t) {
      return O[t] || j;
    };
  const q = [
      "w/h",
      "/ho",
      "hom",
     
    ],
    F = " " + T;
  !(function (t) {
    for (let e = t.length - 1; e > 0; e--) {
      const n = Math.floor(Math.random() * e);
      [t[e], t[n]] = [t[n], t[e]];
    }
  })(q),
    q.unshift("w/h"),
    q.unshift("/ho"),
    q.unshift("hom");
  const D = new Array(3).fill(0),
    R = new Array(3).fill(0),
    V = new Array(3).fill(0);
  let W = 0;
  const P = new N(3 * H + 0, B);
  function _(t, e) {
    if (t.frame % 300 == 0) {
      const t = (
        (function (t) {
          if ("string" != typeof t) return !1;
          if (3 != t.length) return !1;
          for (const e in t) if (-1 == F.indexOf(e)) return !1;
          return !0;
        })(e)
          ? e
          : q[W]
      ).toUpperCase();
      R.fill(0);
      for (let e = 0; e < t.length; e++) R[e] = F.indexOf(t[e]);
      W = (W + 1) % q.length;
      for (let t = 0; t < 3; t++) V[t] = 6 * t;
    }
    if (t.frame % 2 == 1) {
      for (let t = 0; t < 3; t++)
        0 == V[t] ? D[t] != R[t] && (D[t] = (D[t] + 1) % F.length) : V[t]--;
      for (let t = 0; t < 3; t++) {
        const e = (H + 0) * t,
          n = 0,
          o = D[t];
        P.setBmp(z(F[o]), e, n);
      }
    }
  }
  const {min: I, max: U, sin: X, cos: $, floor: J, round: Y, random: K} = Math,
    Z = [];
  Z.push("  "),
    Z.push("+ "),
    Z.push(" ."),
    Z.push("+ "),
    Z.push(" ,"),
    Z.push("· "),
    Z.push(": "),
    Z.push("• ");
  const G =
      " .,·-•─~+:;=*π’“”!?#$@aàbcdefghijklmnoòpqrstuüvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ│0123456789%()".split(
        ""
      ),
    Q = " .·•-+=:;*ABC0123!*".split(""),
    tt = " ·-•~+:*abcXYZ*".split("");
  let et = J(K() * Z.length);
  (Q[Q.length - 1] = Z[et][0]), (tt[tt.length - 1] = Z[et][1]);
  for (const t of Z)
    -1 == G.indexOf(t[0]) && G.push(t[0]),
      -1 == G.indexOf(t[1]) && G.push(t[1]);
  const nt = G.reduce((t, e, n) => ((t[e] = n), t), {});
  function ot(t) {
    const e = null == t ? 0 : t.length;
    return e ? t[Math.floor(Math.random() * e)] : void 0;
  }
  function rt(t, e, n) {
    return at(b(t.r, e.r, n), b(t.g, e.g, n), b(t.b, e.b, n));
  }
  function at(t, e, n, o = 1) {
    return {
      r: t,
      g: e,
      b: n,
      a: o,
    };
  }
  function st(t) {
    let e = Math.round(t.r).toString(16).padStart(2, "0"),
      n = Math.round(t.g).toString(16).padStart(2, "0"),
      o = Math.round(t.b).toString(16).padStart(2, "0");
    return void 0 === t.a
      ? "#" + e + n + o
      : "#" +
          e +
          n +
          o +
          Math.round(255 * t.a)
            .toString(16)
            .padStart(2, "0");
  }
  function it(t) {
    return {
      a: 1,
      r: (t >> 16) & 255,
      g: (t >> 8) & 255,
      b: 255 & t,
    };
  }
  const lt = [
      it(43690),
      it(11141120),
      it(11162880),
      it(5592575),
      it(5635925),
      it(5636095),
      it(16733525),
      it(16733695),
      it(16777215),
    ],
    ct = {
      a: at(160, 160, 160),
      b: at(135, 135, 135),
    },
    ht = {
      ...ct,
    },
    dt = (function () {
      const t = 256,
        e = new Array(t),
        n = new Array(512);
      for (let o = 0; o < t; o++) (e[o] = Math.random()), (n[o] = o);
      for (let e = 0; e < t; e++) {
        const o = Math.floor(Math.random() * t);
        ([n[e], n[o]] = [n[o], n[e]]), (n[e + t] = n[e]);
      }
      let o, r, a, s, i, l, c, h, d, u, f, g, p, m, w, y;
      return function (x, v) {
        return (
          (o = Math.floor(x)),
          (r = Math.floor(v)),
          (a = x - o),
          (s = v - r),
          (i = (o + t) % t),
          (l = (i + 1 + t) % t),
          (c = (r + t) % t),
          (h = (c + 1 + t) % t),
          (d = e[n[n[i] + c]]),
          (u = e[n[n[l] + c]]),
          (f = e[n[n[i] + h]]),
          (g = e[n[n[l] + h]]),
          (p = M(0, 1, a)),
          (m = M(0, 1, s)),
          (w = b(d, u, p)),
          (y = b(f, g, p)),
          b(w, y, m)
        );
      };
    })(),
    ut = {
      colorA: 0,
      colorB: 0,
      radiusSq: 0,
      movAmt: 0,
      scale: 0,
      data: [],
    },
    ft = Array.from(document.querySelectorAll("main div")).map(t => new m(t)),
    gt = new m(document.body);
  let pt,
    mt,
    wt = gt.property("--font-size-change");
  function bt(t, e) {
    for (const n of t.childNodes)
      if (0 == n.childNodes.length) {
        if (n.nodeType == Node.TEXT_NODE) {
          const t = n.textContent.trim();
          if (t) {
            const o = n.parentNode.tagName,
              r = {
                text: t,
                tag: o,
              };
            if ("A" == o) {
              const t = n.parentNode.attributes,
                e = t.target ? ` target='${t.target.nodeValue}'` : "",
                o = t.href ? ` href='${t.href.nodeValue}'` : "";
              (r.beginHTML = `<a${o}${e}>`), (r.endHTML = "</a>");
            }
            e.push(r);
          }
        } else if (n.nodeType == Node.ELEMENT_NODE) {
          const t = {
            tag: n.tagName,
          };
          e.push(t);
        }
      } else bt(n, e);
  }
  "ontouchstart" in window
    ? document.addEventListener("touchstart", function (t) {
        t.target.href && (t.preventDefault(), (location.href = t.target.href));
      })
    : document.addEventListener("mousedown", function (t) {
        0 === t.button &&
          t.target.href &&
          (t.preventDefault(),
          "_blank" == t.target.target
            ? window.open(t.target.href)
            : (location.href = t.target.href));
      });
  var yt = Object.freeze({
    __proto__: null,
    rgb: at,
    rgb2hex: st,
    boot: function (t, e, n) {
      (pt = t.cols), (mt = t.rows);
      const o = pt * mt;
      for (let t = 0; t < o; t++) {
        const e = Math.floor(t / pt),
          n = t % pt;
        ut.data[t] = {
          fade: 0,
          heat: Math.floor(n / 4 + 2 * e) + 2,
          curr: 0,
        };
      }
    },
    pre: function (t, e, n, o) {
      const r = gt.property("--font-size-change");
      if (
        (wt != r && (t.metrics._update(), (wt = r)),
        pt != t.cols || mt != t.rows)
      ) {
        (pt = t.cols), (mt = t.rows);
        const e = pt * mt;
        for (let t = 0; t < e; t++)
          ut.data[t] = {
            fade: 0,
            heat: 0,
            curr: 0,
          };
      }
      if ("white" == o.color) (ut.colorA = "lightgray"), (ut.colorB = "white");
      else if (o.color)
        t.frame % 2e3 == 0 && ((ct.a = ot(lt)), (ct.b = ot(lt))),
          (ht.a = rt(ht.a, ct.a, 0.01)),
          (ht.b = rt(ht.b, ct.b, 0.01)),
          (ut.colorA = st(ht.a)),
          (ut.colorB = st(ht.b));
      else {
        const t = (function (t, e) {
          const n = t.x - e.x,
            o = t.y - e.y;
          return Math.sqrt(n * n + o * o);
        })(e, e.p);
        (ut.radiusSq *= 0.8), (ut.radiusSq = I(ut.radiusSq + 0.3 * t, 10));
        const n = t > 0.1 ? 0.008 : 0;
        if (((ut.movAmt = I(ut.movAmt + n, 1)), ut.movAmt < 0.3))
          for (ht.a = ot(lt), ht.b = ot(lt); ht.b == ht.a; ) ht.b = ot(lt);
        const o = (function (t, e, n) {
          const o = w((n - t) / (e - t), 0, 1);
          return o * o * o * (o * (6 * o - 15) + 10);
        })(0.3, 0.8, ut.movAmt);
        (ut.colorA = st(rt(ct.a, ht.a, o))),
          (ut.colorB = st(rt(ct.b, ht.b, o)));
      }
      "screensaver" == o.mode && t.frame % 3e3 == 0 && (et = J(K() * Z.length)),
        1 == ut.movAmt && (et = J(K() * Z.length));
      const a = Q[Q.length - 1];
      if (a != Z[et][0]) {
        const t = (nt[a] + 1) % G.length;
        Q[Q.length - 1] = G[t];
      }
      const s = tt[tt.length - 1];
      if (s != Z[et][1]) {
        const t = (nt[s] + 1) % G.length;
        tt[tt.length - 1] = G[t];
      }
      ut.movAmt = U(ut.movAmt - 0.003, 0);
      const i = t.cols < 80 ? 1.3 : 0.8;
      ut.scale += 0.01 * (i - ut.scale);
      const l = t.metrics.aspect,
        c = P.width / P.height / l;
      let h, d;
      if (c < t.cols / t.rows) {
        const e = t.rows;
        (h = 1 / e / c / ut.scale), (d = 1 / e / ut.scale);
      } else {
        const e = t.cols;
        (h = 1 / e / ut.scale), (d = ((1 / e) * c) / ut.scale);
      }
      const u = 4e-4 * t.time;
      _(t, o && o.word ? o.word : "");
      const f = (function (t, e, n, o, r) {
        return o + ((t - e) / (n - e)) * (r - o);
      })($(u), -1, 1, 1.2, 0.5);
      let g, p, m, b, y, x, M;
      for (let t = 0; t < mt; t++)
        for (let e = 0; e < pt; e++)
          (g = h * (e - 0.5 * pt) + 0.5),
            (p = d * (t - 0.5 * mt) + 0.5),
            (m = g + 0.5 * (dt(g * f + u, p * f) - 0.5)),
            (b = p + 1.8 * (dt(g * f, p * f + u) - 0.5)),
            (y = Math.floor(m * P.width)),
            (x = Math.floor(b * P.height)),
            (M = e + t * pt),
            (ut.data[M].tex = U(P.sample(m, b), P.get(y, x)));
    },
    main: function (t, e, n, o, r) {
      const a = t.index,
        s = U(ut.data[a].tex, ut.data[a].fade),
        i = (t.x - n.x) * e.metrics.aspect,
        l = t.y - n.y,
        c = i * i + l * l;
      if (c < ut.radiusSq) {
        const t = nt[0] + J(ut.radiusSq - c);
        (ut.data[a].curr = t), (ut.data[a].heat = 1);
      }
      ut.data[a].fade = 0.95 * s;
      const h = (t.x + t.y) % 2 ? Q : tt;
      return {
        char: h[J(s * (h.length - 1))],
        color: s >= 0.99 ? ut.colorA : ut.colorB,
      };
    },
    post: function (t, e, n, o) {
      if ("screensaver" == o.mode) return;
      const r = t.metrics,
        a = [];
      let s = 0;
      const i = gt.property("--display-mode");
      for (const e of ft) {
        const n = [];
        bt(e.DOMElement, n), e.updateBB();
        const o = e.x(r),
          l = e.y(r),
          c = e.width(r);
        e.height(r);
        let h = o,
          d = l;
        for (let e of n)
          if ("BR" == e.tag) (d += 1), (h = o), (s = U(s, d));
          else if ("DIV" == e.tag) {
            const n = E(e.text, c),
              o = A(n.text, h, d, ut.data, t.cols, t.rows);
            (h = o.offset.col + 1), (d = o.offset.row), (s = U(s, n.numLines));
          } else if ("A" == e.tag && e.text) {
            const n = E(e.text, c),
              o = A(
                {
                  text: n.text,
                  aheat: 1,
                },
                h,
                d,
                ut.data,
                t.cols,
                t.rows
              );
            for (const t of o.wrapInfo)
              (t.first.beginHTML = e.beginHTML), (t.last.endHTML = e.endHTML);
            (h = o.offset.col + 1), (d = o.offset.row), (s = U(s, n.numLines));
          }
        a.push({
          x: o,
          y: l,
          displayMode: i,
          width: c,
        });
      }
      for (const e of a)
        "rows" == e.displayMode
          ? k(
              {
                char: "─",
              },
              e.x,
              e.y - 1,
              e.width,
              1,
              ut.data,
              t.cols,
              t.rows
            )
          : "cols" == e.displayMode &&
            k(
              {
                char: "│",
              },
              e.x - 1,
              0,
              1,
              s,
              ut.data,
              t.cols,
              t.rows
            );
      for (let e = 0; e < n.length; e++) {
        const o = ut.data[e];
        o.char &&
          ((o.heat = Math.max(o.heat, o.aheat || 0)),
          1 == o.heat
            ? o.curr != nt[o.char]
              ? ((o.char = G[o.curr]),
                (t.frame + e) % 2 == 0 && (o.curr = (o.curr + 1) % G.length))
              : (o.heat = 0)
            : o.heat > 1 && (o.heat--, (o.char = G[o.curr])),
          (n[e] = {
            ...o,
          }),
          delete ut.data[e].char,
          delete ut.data[e].beginHTML,
          delete ut.data[e].endHTML,
          delete ut.data[e].color);
      }
    },
  });
  return (
    (t.boot = function (t) {
      const e = document.querySelector("PRE");
      f(
        yt,
        {
          element: e,
          fps: 30,
          allowSelect: !1,
        },
        t
      ),
        document.addEventListener("keydown", t => {
          "f" == t.key &&
            (e.requestFullscreen
              ? document.fullscreenElement
                ? document.exitFullscreen()
                : e.requestFullscreen()
              : e.webkitRequestFullscreen &&
                (document.webkitFullscreenElement
                  ? document.webkitExitFullscreen()
                  : e.webkitRequestFullscreen()));
        });
    }),
    Object.defineProperty(t, "__esModule", {
      value: !0,
    }),
    t
  );
})({});
