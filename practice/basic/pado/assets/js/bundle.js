!(function (e) {
  var t = {};
  function n(o) {
    if (t[o]) return t[o].exports;
    var i = (t[o] = { i: o, l: !1, exports: {} });
    return e[o].call(i.exports, i, i.exports, n), (i.l = !0), i.exports;
  }
  (n.m = e),
    (n.c = t),
    (n.d = function (e, t, o) {
      n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: o });
    }),
    (n.r = function (e) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (n.t = function (e, t) {
      if ((1 & t && (e = n(e)), 8 & t)) return e;
      if (4 & t && "object" == typeof e && e && e.__esModule) return e;
      var o = Object.create(null);
      if (
        (n.r(o),
        Object.defineProperty(o, "default", { enumerable: !0, value: e }),
        2 & t && "string" != typeof e)
      )
        for (var i in e)
          n.d(
            o,
            i,
            function (t) {
              return e[t];
            }.bind(null, i)
          );
      return o;
    }),
    (n.n = function (e) {
      var t =
        e && e.__esModule
          ? function () {
              return e.default;
            }
          : function () {
              return e;
            };
      return n.d(t, "a", t), t;
    }),
    (n.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (n.p = "/"),
    n((n.s = 6));
})([
  function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 }),
      (t.Link =
        t.markSwupElements =
        t.getCurrentUrl =
        t.transitionEnd =
        t.fetch =
        t.getDataFromHtml =
        t.createHistoryRecord =
        t.classify =
          void 0);
    var o = d(n(11)),
      i = d(n(12)),
      r = d(n(13)),
      a = d(n(14)),
      s = d(n(15)),
      l = d(n(16)),
      u = d(n(17)),
      c = d(n(18));
    function d(e) {
      return e && e.__esModule ? e : { default: e };
    }
    (t.classify = o.default),
      (t.createHistoryRecord = i.default),
      (t.getDataFromHtml = r.default),
      (t.fetch = a.default),
      (t.transitionEnd = s.default),
      (t.getCurrentUrl = l.default),
      (t.markSwupElements = u.default),
      (t.Link = c.default);
  },
  function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    (t.query = function (e) {
      var t =
        arguments.length > 1 && void 0 !== arguments[1]
          ? arguments[1]
          : document;
      return "string" != typeof e ? e : t.querySelector(e);
    }),
      (t.queryAll = function (e) {
        var t =
          arguments.length > 1 && void 0 !== arguments[1]
            ? arguments[1]
            : document;
        return "string" != typeof e
          ? e
          : Array.prototype.slice.call(t.querySelectorAll(e));
      });
  },
  function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    var o = (function () {
      function e(e, t) {
        for (var n = 0; n < t.length; n++) {
          var o = t[n];
          (o.enumerable = o.enumerable || !1),
            (o.configurable = !0),
            "value" in o && (o.writable = !0),
            Object.defineProperty(e, o.key, o);
        }
      }
      return function (t, n, o) {
        return n && e(t.prototype, n), o && e(t, o), t;
      };
    })();
    var i = (function () {
      function e() {
        !(function (e, t) {
          if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function");
        })(this, e),
          (this.isSwupPlugin = !0);
      }
      return (
        o(e, [
          { key: "mount", value: function () {} },
          { key: "unmount", value: function () {} },
          { key: "_beforeMount", value: function () {} },
          { key: "_afterUnmount", value: function () {} },
        ]),
        e
      );
    })();
    t.default = i;
  },
  function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    var o =
        Object.assign ||
        function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var o in n)
              Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o]);
          }
          return e;
        },
      i = (function () {
        function e(e, t) {
          for (var n = 0; n < t.length; n++) {
            var o = t[n];
            (o.enumerable = o.enumerable || !1),
              (o.configurable = !0),
              "value" in o && (o.writable = !0),
              Object.defineProperty(e, o.key, o);
          }
        }
        return function (t, n, o) {
          return n && e(t.prototype, n), o && e(t, o), t;
        };
      })(),
      r = y(n(7)),
      a = y(n(9)),
      s = y(n(10)),
      l = y(n(19)),
      u = y(n(20)),
      c = y(n(21)),
      d = y(n(22)),
      f = y(n(23)),
      p = y(n(24)),
      h = y(n(25)),
      g = n(26),
      m = n(1),
      v = n(0);
    function y(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var w = (function () {
      function e(t) {
        !(function (e, t) {
          if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function");
        })(this, e);
        var n = {
            animateHistoryBrowsing: !1,
            animationSelector: '[class*="transition-"]',
            linkSelector:
              'a[href^="' +
              window.location.origin +
              '"]:not([data-no-swup]), a[href^="/"]:not([data-no-swup]), a[href^="#"]:not([data-no-swup])',
            cache: !0,
            containers: ["#swup"],
            requestHeaders: {
              "X-Requested-With": "swup",
              Accept: "text/html, application/xhtml+xml",
            },
            plugins: [],
            skipPopStateHandling: function (e) {
              return !(e.state && "swup" === e.state.source);
            },
          },
          i = o({}, n, t);
        (this._handlers = {
          animationInDone: [],
          animationInStart: [],
          animationOutDone: [],
          animationOutStart: [],
          animationSkipped: [],
          clickLink: [],
          contentReplaced: [],
          disabled: [],
          enabled: [],
          openPageInNewTab: [],
          pageLoaded: [],
          pageRetrievedFromCache: [],
          pageView: [],
          popState: [],
          samePage: [],
          samePageWithHash: [],
          serverError: [],
          transitionStart: [],
          transitionEnd: [],
          willReplaceContent: [],
        }),
          (this.scrollToElement = null),
          (this.preloadPromise = null),
          (this.options = i),
          (this.plugins = []),
          (this.transition = {}),
          (this.delegatedListeners = {}),
          (this.boundPopStateHandler = this.popStateHandler.bind(this)),
          (this.cache = new a.default()),
          (this.cache.swup = this),
          (this.loadPage = s.default),
          (this.renderPage = l.default),
          (this.triggerEvent = u.default),
          (this.on = c.default),
          (this.off = d.default),
          (this.updateTransition = f.default),
          (this.getAnimationPromises = p.default),
          (this.getPageData = h.default),
          (this.log = function () {}),
          (this.use = g.use),
          (this.unuse = g.unuse),
          (this.findPlugin = g.findPlugin),
          this.enable();
      }
      return (
        i(e, [
          {
            key: "enable",
            value: function () {
              var e = this;
              if ("undefined" != typeof Promise) {
                (this.delegatedListeners.click = (0, r.default)(
                  document,
                  this.options.linkSelector,
                  "click",
                  this.linkClickHandler.bind(this)
                )),
                  window.addEventListener(
                    "popstate",
                    this.boundPopStateHandler
                  );
                var t = (0, v.getDataFromHtml)(
                  document.documentElement.outerHTML,
                  this.options.containers
                );
                (t.url = t.responseURL = (0, v.getCurrentUrl)()),
                  this.options.cache && this.cache.cacheUrl(t),
                  (0, v.markSwupElements)(
                    document.documentElement,
                    this.options.containers
                  ),
                  this.options.plugins.forEach(function (t) {
                    e.use(t);
                  }),
                  window.history.replaceState(
                    Object.assign({}, window.history.state, {
                      url: window.location.href,
                      random: Math.random(),
                      source: "swup",
                    }),
                    document.title,
                    window.location.href
                  ),
                  this.triggerEvent("enabled"),
                  document.documentElement.classList.add("swup-enabled"),
                  this.triggerEvent("pageView");
              }
            },
          },
          {
            key: "destroy",
            value: function () {
              var e = this;
              this.delegatedListeners.click.destroy(),
                window.removeEventListener(
                  "popstate",
                  this.boundPopStateHandler
                ),
                this.cache.empty(),
                this.options.plugins.forEach(function (t) {
                  e.unuse(t);
                }),
                (0, m.queryAll)("[data-swup]").forEach(function (e) {
                  e.removeAttribute("data-swup");
                }),
                this.off(),
                this.triggerEvent("disabled"),
                document.documentElement.classList.remove("swup-enabled");
            },
          },
          {
            key: "linkClickHandler",
            value: function (e) {
              if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)
                this.triggerEvent("openPageInNewTab", e);
              else if (0 === e.button) {
                this.triggerEvent("clickLink", e), e.preventDefault();
                var t = new v.Link(e.delegateTarget);
                if (
                  t.getAddress() == (0, v.getCurrentUrl)() ||
                  "" == t.getAddress()
                ) {
                  if ("" != t.getHash())
                    this.triggerEvent("samePageWithHash", e),
                      null != document.querySelector(t.getHash()) &&
                        history.replaceState(
                          {
                            url: t.getAddress() + t.getHash(),
                            random: Math.random(),
                            source: "swup",
                          },
                          document.title,
                          t.getAddress() + t.getHash()
                        );
                  else this.triggerEvent("samePage", e);
                } else {
                  "" != t.getHash() && (this.scrollToElement = t.getHash());
                  var n = e.delegateTarget.getAttribute("data-swup-transition");
                  this.loadPage(
                    { url: t.getAddress(), customTransition: n },
                    !1
                  );
                }
              }
            },
          },
          {
            key: "popStateHandler",
            value: function (e) {
              if (!this.options.skipPopStateHandling(e)) {
                var t = new v.Link(
                  e.state ? e.state.url : window.location.pathname
                );
                "" !== t.getHash()
                  ? (this.scrollToElement = t.getHash())
                  : e.preventDefault(),
                  this.triggerEvent("popState", e),
                  this.loadPage({ url: t.getAddress() }, e);
              }
            },
          },
        ]),
        e
      );
    })();
    t.default = w;
  },
  function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    var o =
        Object.assign ||
        function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var o in n)
              Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o]);
          }
          return e;
        },
      i =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
          ? function (e) {
              return typeof e;
            }
          : function (e) {
              return e &&
                "function" == typeof Symbol &&
                e.constructor === Symbol &&
                e !== Symbol.prototype
                ? "symbol"
                : typeof e;
            },
      r = (function () {
        function e(e, t) {
          for (var n = 0; n < t.length; n++) {
            var o = t[n];
            (o.enumerable = o.enumerable || !1),
              (o.configurable = !0),
              "value" in o && (o.writable = !0),
              Object.defineProperty(e, o.key, o);
          }
        }
        return function (t, n, o) {
          return n && e(t.prototype, n), o && e(t, o), t;
        };
      })(),
      a = l(n(2)),
      s = l(n(27));
    function l(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var u = (function (e) {
      function t(e) {
        !(function (e, t) {
          if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function");
        })(this, t);
        var n = (function (e, t) {
          if (!e)
            throw new ReferenceError(
              "this hasn't been initialised - super() hasn't been called"
            );
          return !t || ("object" != typeof t && "function" != typeof t) ? e : t;
        })(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
        (n.name = "ScrollPlugin"),
          (n.getOffset = function () {
            var e =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : null;
            switch (i(n.options.offset)) {
              case "number":
                return n.options.offset;
              case "function":
                return parseInt(n.options.offset(e), 10);
              default:
                return parseInt(n.options.offset, 10);
            }
          }),
          (n.onSamePage = function () {
            n.swup.scrollTo(0);
          }),
          (n.onSamePageWithHash = function (e) {
            var t = e.delegateTarget,
              o = document.querySelector(t.hash),
              i =
                o.getBoundingClientRect().top +
                window.pageYOffset -
                n.getOffset(o);
            n.swup.scrollTo(i);
          }),
          (n.onTransitionStart = function (e) {
            n.options.doScrollingRightAway &&
              !n.swup.scrollToElement &&
              n.doScrolling(e);
          }),
          (n.onContentReplaced = function (e) {
            (n.options.doScrollingRightAway && !n.swup.scrollToElement) ||
              n.doScrolling(e);
          }),
          (n.doScrolling = function (e) {
            var t = n.swup;
            if (!e || t.options.animateHistoryBrowsing)
              if (null != t.scrollToElement) {
                var o = document.querySelector(t.scrollToElement);
                if (null != o) {
                  var i =
                    o.getBoundingClientRect().top +
                    window.pageYOffset -
                    n.getOffset(o);
                  t.scrollTo(i);
                }
                t.scrollToElement = null;
              } else t.scrollTo(0);
          });
        return (
          (n.options = o(
            {},
            {
              doScrollingRightAway: !1,
              animateScroll: !0,
              scrollFriction: 0.3,
              scrollAcceleration: 0.04,
              offset: 0,
            },
            e
          )),
          n
        );
      }
      return (
        (function (e, t) {
          if ("function" != typeof t && null !== t)
            throw new TypeError(
              "Super expression must either be null or a function, not " +
                typeof t
            );
          (e.prototype = Object.create(t && t.prototype, {
            constructor: {
              value: e,
              enumerable: !1,
              writable: !0,
              configurable: !0,
            },
          })),
            t &&
              (Object.setPrototypeOf
                ? Object.setPrototypeOf(e, t)
                : (e.__proto__ = t));
        })(t, e),
        r(t, [
          {
            key: "mount",
            value: function () {
              var e = this,
                t = this.swup;
              (t._handlers.scrollDone = []),
                (t._handlers.scrollStart = []),
                (this.scrl = new s.default({
                  onStart: function () {
                    return t.triggerEvent("scrollStart");
                  },
                  onEnd: function () {
                    return t.triggerEvent("scrollDone");
                  },
                  onCancel: function () {
                    return t.triggerEvent("scrollDone");
                  },
                  friction: this.options.scrollFriction,
                  acceleration: this.options.scrollAcceleration,
                })),
                (t.scrollTo = function (n) {
                  e.options.animateScroll
                    ? e.scrl.scrollTo(n)
                    : (t.triggerEvent("scrollStart"),
                      window.scrollTo(0, n),
                      t.triggerEvent("scrollDone"));
                }),
                t.options.animateHistoryBrowsing &&
                  (window.history.scrollRestoration = "manual"),
                t.on("samePage", this.onSamePage),
                t.on("samePageWithHash", this.onSamePageWithHash),
                t.on("transitionStart", this.onTransitionStart),
                t.on("contentReplaced", this.onContentReplaced);
            },
          },
          {
            key: "unmount",
            value: function () {
              (this.swup.scrollTo = null),
                delete this.scrl,
                (this.scrl = null),
                this.swup.off("samePage", this.onSamePage),
                this.swup.off("samePageWithHash", this.onSamePageWithHash),
                this.swup.off("transitionStart", this.onTransitionStart),
                this.swup.off("contentReplaced", this.onContentReplaced),
                (this.swup._handlers.scrollDone = null),
                (this.swup._handlers.scrollStart = null),
                (window.history.scrollRestoration = "auto");
            },
          },
        ]),
        t
      );
    })(a.default);
    t.default = u;
  },
  function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    var o = (function () {
        function e(e, t) {
          for (var n = 0; n < t.length; n++) {
            var o = t[n];
            (o.enumerable = o.enumerable || !1),
              (o.configurable = !0),
              "value" in o && (o.writable = !0),
              Object.defineProperty(e, o.key, o);
          }
        }
        return function (t, n, o) {
          return n && e(t.prototype, n), o && e(t, o), t;
        };
      })(),
      i = l(n(2)),
      r = l(n(28)),
      a = n(1),
      s = n(0);
    function l(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function u(e, t) {
      if (!(e instanceof t))
        throw new TypeError("Cannot call a class as a function");
    }
    function c(e, t) {
      if (!e)
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called"
        );
      return !t || ("object" != typeof t && "function" != typeof t) ? e : t;
    }
    var d = (function (e) {
      function t() {
        var e, n, o;
        u(this, t);
        for (var i = arguments.length, r = Array(i), l = 0; l < i; l++)
          r[l] = arguments[l];
        return (
          (n = o =
            c(
              this,
              (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(
                e,
                [this].concat(r)
              )
            )),
          (o.name = "PreloadPlugin"),
          (o.onContentReplaced = function () {
            o.swup.preloadPages();
          }),
          (o.onMouseover = function (e) {
            var t = o.swup;
            t.triggerEvent("hoverLink", e);
            var n = new s.Link(e.delegateTarget);
            n.getAddress() === (0, s.getCurrentUrl)() ||
              t.cache.exists(n.getAddress()) ||
              null != t.preloadPromise ||
              ((t.preloadPromise = t.preloadPage(n.getAddress())),
              (t.preloadPromise.route = n.getAddress()),
              t.preloadPromise.finally(function () {
                t.preloadPromise = null;
              }));
          }),
          (o.preloadPage = function (e) {
            var t = o.swup,
              n = new s.Link(e);
            return new Promise(function (e, o) {
              n.getAddress() == (0, s.getCurrentUrl)() ||
              t.cache.exists(n.getAddress())
                ? e(t.cache.getPage(n.getAddress()))
                : (0, s.fetch)(
                    { url: n.getAddress(), headers: t.options.requestHeaders },
                    function (i) {
                      if (500 === i.status) t.triggerEvent("serverError"), o();
                      else {
                        var r = t.getPageData(i);
                        if (null == r) return void o(n.getAddress());
                        (r.url = n.getAddress()),
                          t.cache.cacheUrl(r, t.options.debugMode),
                          t.triggerEvent("pagePreloaded"),
                          e(t.cache.getPage(n.getAddress()));
                      }
                    }
                  );
            });
          }),
          (o.preloadPages = function () {
            (0, a.queryAll)("[data-swup-preload]").forEach(function (e) {
              o.swup.preloadPage(e.href);
            });
          }),
          c(o, n)
        );
      }
      return (
        (function (e, t) {
          if ("function" != typeof t && null !== t)
            throw new TypeError(
              "Super expression must either be null or a function, not " +
                typeof t
            );
          (e.prototype = Object.create(t && t.prototype, {
            constructor: {
              value: e,
              enumerable: !1,
              writable: !0,
              configurable: !0,
            },
          })),
            t &&
              (Object.setPrototypeOf
                ? Object.setPrototypeOf(e, t)
                : (e.__proto__ = t));
        })(t, e),
        o(t, [
          {
            key: "mount",
            value: function () {
              var e = this.swup;
              (e._handlers.pagePreloaded = []),
                (e._handlers.hoverLink = []),
                (e.preloadPage = this.preloadPage),
                (e.preloadPages = this.preloadPages),
                (e.delegatedListeners.mouseover = (0, r.default)(
                  document.body,
                  e.options.linkSelector,
                  "mouseover",
                  this.onMouseover.bind(this)
                )),
                e.preloadPages(),
                e.on("contentReplaced", this.onContentReplaced);
            },
          },
          {
            key: "unmount",
            value: function () {
              var e = this.swup;
              (e._handlers.pagePreloaded = null),
                (e._handlers.hoverLink = null),
                (e.preloadPage = null),
                (e.preloadPages = null),
                e.delegatedListeners.mouseover.destroy(),
                e.off("contentReplaced", this.onContentReplaced);
            },
          },
        ]),
        t
      );
    })(i.default);
    t.default = d;
  },
  function (e, t, n) {
    "use strict";
    n.r(t);
    var o = n(3),
      i = n.n(o),
      r = n(4),
      a = n.n(r),
      s = n(5),
      l = n.n(s);
    n(30);
    const u = new i.a({
      plugins: [
        new l.a(),
        new a.a({ doScrollingRightAway: !1, animateScroll: !1 }),
      ],
    });
    $(document).ready(function () {
      browserDetect();
      var e,
        t = !1;
      function n() {
        document.querySelector("#atlas") &&
          (t = mixitup("#atlas", {
            selectors: { target: ".atlas__item" },
            load: { sort: "random" },
            animation: { duration: 300 },
          }));
      }
      function o() {
        setVH(),
          openLinksInNewTab(),
          preLoad(),
          projectSliceMeta(),
          resizeSetHeight(),
          watchForHover(),
          addBodyClass(),
          dominantColors(),
          toggleMenu(),
          langMobileHidden(),
          document.querySelector("#atlas") &&
            (lazyload(), atlasImgHover(), atlasImgClick(), atlasSortMix()),
          projectToggleLayers(),
          projectSlideshowSlick(),
          projectReadMore(),
          projectDeleteZoomImg(),
          generalMinHeight();
      }
      document.querySelector("#atlas") && n(),
        o(),
        u.on("contentReplaced", o),
        u.on("pageView", o),
        u.on("willReplaceContent", function () {
          t && (t.destroy(), (t = !1));
        }),
        u.on("contentReplaced", n),
        u.on("contentReplaced", dominantColors),
        u.on("contentReplaced", resizeSetHeight),
        $(window).on("resize scroll touchstart", function () {
          setVH();
        }),
        $(window).resize(function () {
          wbrDatenschutz(),
            langMobileHidden(),
            projectSliceMeta(),
            projectSetMetaHeight(),
            clearTimeout(e),
            (e = setTimeout(function () {
              resizeSetHeight(), projectSliceMeta(), generalMinHeight();
            }, 200));
        });
    });
  },
  function (e, t, n) {
    var o = n(8);
    function i(e, t, n, i) {
      return function (n) {
        (n.delegateTarget = o(n.target, t)), n.delegateTarget && i.call(e, n);
      };
    }
    e.exports = function (e, t, n, o, r) {
      var a = i.apply(this, arguments);
      return (
        e.addEventListener(n, a, r),
        {
          destroy: function () {
            e.removeEventListener(n, a, r);
          },
        }
      );
    };
  },
  function (e, t) {
    if ("undefined" != typeof Element && !Element.prototype.matches) {
      var n = Element.prototype;
      n.matches =
        n.matchesSelector ||
        n.mozMatchesSelector ||
        n.msMatchesSelector ||
        n.oMatchesSelector ||
        n.webkitMatchesSelector;
    }
    e.exports = function (e, t) {
      for (; e && 9 !== e.nodeType; ) {
        if ("function" == typeof e.matches && e.matches(t)) return e;
        e = e.parentNode;
      }
    };
  },
  function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    var o = (function () {
      function e(e, t) {
        for (var n = 0; n < t.length; n++) {
          var o = t[n];
          (o.enumerable = o.enumerable || !1),
            (o.configurable = !0),
            "value" in o && (o.writable = !0),
            Object.defineProperty(e, o.key, o);
        }
      }
      return function (t, n, o) {
        return n && e(t.prototype, n), o && e(t, o), t;
      };
    })();
    var i = (t.Cache = (function () {
      function e() {
        !(function (e, t) {
          if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function");
        })(this, e),
          (this.pages = {}),
          (this.last = null);
      }
      return (
        o(e, [
          {
            key: "cacheUrl",
            value: function (e) {
              e.url in this.pages == !1 && (this.pages[e.url] = e),
                (this.last = this.pages[e.url]),
                this.swup.log(
                  "Cache (" + Object.keys(this.pages).length + ")",
                  this.pages
                );
            },
          },
          {
            key: "getPage",
            value: function (e) {
              return this.pages[e];
            },
          },
          {
            key: "getCurrentPage",
            value: function () {
              return this.getPage(
                window.location.pathname + window.location.search
              );
            },
          },
          {
            key: "exists",
            value: function (e) {
              return e in this.pages;
            },
          },
          {
            key: "empty",
            value: function () {
              (this.pages = {}),
                (this.last = null),
                this.swup.log("Cache cleared");
            },
          },
          {
            key: "remove",
            value: function (e) {
              delete this.pages[e];
            },
          },
        ]),
        e
      );
    })());
    t.default = i;
  },
  function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    var o =
        Object.assign ||
        function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var o in n)
              Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o]);
          }
          return e;
        },
      i = n(0);
    t.default = function (e, t) {
      var n = this,
        r = [],
        a = void 0;
      this.triggerEvent("transitionStart", t),
        null != e.customTransition
          ? (this.updateTransition(
              window.location.pathname,
              e.url,
              e.customTransition
            ),
            document.documentElement.classList.add(
              "to-" + (0, i.classify)(e.customTransition)
            ))
          : this.updateTransition(window.location.pathname, e.url),
        !t || this.options.animateHistoryBrowsing
          ? (function () {
              if (
                (n.triggerEvent("animationOutStart"),
                document.documentElement.classList.add("is-changing"),
                document.documentElement.classList.add("is-leaving"),
                document.documentElement.classList.add("is-animating"),
                t && document.documentElement.classList.add("is-popstate"),
                document.documentElement.classList.add(
                  "to-" + (0, i.classify)(e.url)
                ),
                (r = n.getAnimationPromises("out")),
                Promise.all(r).then(function () {
                  n.triggerEvent("animationOutDone");
                }),
                !t)
              ) {
                var o = void 0;
                (o =
                  null != n.scrollToElement
                    ? e.url + n.scrollToElement
                    : e.url),
                  (0, i.createHistoryRecord)(o);
              }
            })()
          : this.triggerEvent("animationSkipped"),
        this.cache.exists(e.url)
          ? ((a = new Promise(function (e) {
              e();
            })),
            this.triggerEvent("pageRetrievedFromCache"))
          : (a =
              this.preloadPromise && this.preloadPromise.route == e.url
                ? this.preloadPromise
                : new Promise(function (t, r) {
                    (0,
                    i.fetch)(o({}, e, { headers: n.options.requestHeaders }), function (o) {
                      if (500 === o.status)
                        return n.triggerEvent("serverError"), void r(e.url);
                      var i = n.getPageData(o);
                      null != i
                        ? ((i.url = e.url),
                          n.cache.cacheUrl(i),
                          n.triggerEvent("pageLoaded"),
                          t())
                        : r(e.url);
                    });
                  })),
        Promise.all(r.concat([a]))
          .then(function () {
            n.renderPage(n.cache.getPage(e.url), t), (n.preloadPromise = null);
          })
          .catch(function (e) {
            (n.options.skipPopStateHandling = function () {
              return (window.location = e), !0;
            }),
              window.history.go(-1);
          });
    };
  },
  function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    t.default = function (e) {
      var t = e
        .toString()
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/\//g, "-")
        .replace(/[^\w\-]+/g, "")
        .replace(/\-\-+/g, "-")
        .replace(/^-+/, "")
        .replace(/-+$/, "");
      return "/" === t[0] && (t = t.splice(1)), "" === t && (t = "homepage"), t;
    };
  },
  function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    t.default = function (e) {
      window.history.pushState(
        {
          url: e || window.location.href.split(window.location.hostname)[1],
          random: Math.random(),
          source: "swup",
        },
        document.getElementsByTagName("title")[0].innerText,
        e || window.location.href.split(window.location.hostname)[1]
      );
    };
  },
  function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    var o =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
          ? function (e) {
              return typeof e;
            }
          : function (e) {
              return e &&
                "function" == typeof Symbol &&
                e.constructor === Symbol &&
                e !== Symbol.prototype
                ? "symbol"
                : typeof e;
            },
      i = n(1);
    t.default = function (e, t) {
      var n = document.createElement("html");
      n.innerHTML = e;
      for (
        var r = [],
          a = function (e) {
            if (null == n.querySelector(t[e])) return { v: null };
            (0, i.queryAll)(t[e]).forEach(function (o, a) {
              (0, i.queryAll)(t[e], n)[a].setAttribute("data-swup", r.length),
                r.push((0, i.queryAll)(t[e], n)[a].outerHTML);
            });
          },
          s = 0;
        s < t.length;
        s++
      ) {
        var l = a(s);
        if ("object" === (void 0 === l ? "undefined" : o(l))) return l.v;
      }
      var u = {
        title: n.querySelector("title").innerText,
        pageClass: n.querySelector("body").className,
        originalContent: e,
        blocks: r,
      };
      return (n.innerHTML = ""), (n = null), u;
    };
  },
  function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    var o =
      Object.assign ||
      function (e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = arguments[t];
          for (var o in n)
            Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o]);
        }
        return e;
      };
    t.default = function (e) {
      var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
        n = {
          url: window.location.pathname + window.location.search,
          method: "GET",
          data: null,
          headers: {},
        },
        i = o({}, n, e),
        r = new XMLHttpRequest();
      return (
        (r.onreadystatechange = function () {
          4 === r.readyState && (r.status, t(r));
        }),
        r.open(i.method, i.url, !0),
        Object.keys(i.headers).forEach(function (e) {
          r.setRequestHeader(e, i.headers[e]);
        }),
        r.send(i.data),
        r
      );
    };
  },
  function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    t.default = function () {
      var e = document.createElement("div"),
        t = {
          WebkitTransition: "webkitTransitionEnd",
          MozTransition: "transitionend",
          OTransition: "oTransitionEnd otransitionend",
          transition: "transitionend",
        };
      for (var n in t) if (void 0 !== e.style[n]) return t[n];
      return !1;
    };
  },
  function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    t.default = function () {
      return window.location.pathname + window.location.search;
    };
  },
  function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    var o = n(1);
    t.default = function (e, t) {
      for (
        var n = 0,
          i = function (i) {
            null == e.querySelector(t[i]) ||
              (0, o.queryAll)(t[i]).forEach(function (r, a) {
                (0, o.queryAll)(t[i], e)[a].setAttribute("data-swup", n), n++;
              });
          },
          r = 0;
        r < t.length;
        r++
      )
        i(r);
    };
  },
  function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    var o = (function () {
      function e(e, t) {
        for (var n = 0; n < t.length; n++) {
          var o = t[n];
          (o.enumerable = o.enumerable || !1),
            (o.configurable = !0),
            "value" in o && (o.writable = !0),
            Object.defineProperty(e, o.key, o);
        }
      }
      return function (t, n, o) {
        return n && e(t.prototype, n), o && e(t, o), t;
      };
    })();
    var i = (function () {
      function e(t) {
        !(function (e, t) {
          if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function");
        })(this, e),
          t instanceof Element || t instanceof SVGElement
            ? (this.link = t)
            : ((this.link = document.createElement("a")), (this.link.href = t));
      }
      return (
        o(e, [
          {
            key: "getPath",
            value: function () {
              var e = this.link.pathname;
              return "/" !== e[0] && (e = "/" + e), e;
            },
          },
          {
            key: "getAddress",
            value: function () {
              var e = this.link.pathname + this.link.search;
              return (
                this.link.getAttribute("xlink:href") &&
                  (e = this.link.getAttribute("xlink:href")),
                "/" !== e[0] && (e = "/" + e),
                e
              );
            },
          },
          {
            key: "getHash",
            value: function () {
              return this.link.hash;
            },
          },
        ]),
        e
      );
    })();
    t.default = i;
  },
  function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    var o =
        Object.assign ||
        function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var o in n)
              Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o]);
          }
          return e;
        },
      i = (n(1), n(0));
    t.default = function (e, t) {
      var n = this;
      document.documentElement.classList.remove("is-leaving");
      var r = new i.Link(e.responseURL);
      window.location.pathname !== r.getPath() &&
        (window.history.replaceState(
          { url: r.getPath(), random: Math.random(), source: "swup" },
          document.title,
          r.getPath()
        ),
        this.cache.cacheUrl(o({}, e, { url: r.getPath() }))),
        (t && !this.options.animateHistoryBrowsing) ||
          document.documentElement.classList.add("is-rendering"),
        this.triggerEvent("willReplaceContent", t);
      for (var a = 0; a < e.blocks.length; a++)
        document.body.querySelector('[data-swup="' + a + '"]').outerHTML =
          e.blocks[a];
      if (
        ((document.title = e.title),
        this.triggerEvent("contentReplaced", t),
        this.triggerEvent("pageView", t),
        this.options.cache || this.cache.empty(),
        setTimeout(function () {
          (t && !n.options.animateHistoryBrowsing) ||
            (n.triggerEvent("animationInStart"),
            document.documentElement.classList.remove("is-animating"));
        }, 10),
        !t || this.options.animateHistoryBrowsing)
      ) {
        var s = this.getAnimationPromises("in");
        Promise.all(s).then(function () {
          n.triggerEvent("animationInDone"),
            n.triggerEvent("transitionEnd", t),
            document.documentElement.className.split(" ").forEach(function (e) {
              (new RegExp("^to-").test(e) ||
                "is-changing" === e ||
                "is-rendering" === e ||
                "is-popstate" === e) &&
                document.documentElement.classList.remove(e);
            });
        });
      } else this.triggerEvent("transitionEnd", t);
      this.scrollToElement = null;
    };
  },
  function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    t.default = function (e, t) {
      this._handlers[e].forEach(function (e) {
        try {
          e(t);
        } catch (e) {}
      });
      var n = new CustomEvent("swup:" + e, { detail: e });
      document.dispatchEvent(n);
    };
  },
  function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    t.default = function (e, t) {
      this._handlers[e] && this._handlers[e].push(t);
    };
  },
  function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    t.default = function (e, t) {
      var n = this;
      if (null != e)
        if (null != t) {
          if (
            this._handlers[e] &&
            this._handlers[e].filter(function (e) {
              return e === t;
            }).length
          ) {
            var o = this._handlers[e].filter(function (e) {
                return e === t;
              })[0],
              i = this._handlers[e].indexOf(o);
            i > -1 && this._handlers[e].splice(i, 1);
          }
        } else this._handlers[e] = [];
      else
        Object.keys(this._handlers).forEach(function (e) {
          n._handlers[e] = [];
        });
    };
  },
  function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    t.default = function (e, t, n) {
      this.transition = { from: e, to: t, custom: n };
    };
  },
  function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    var o = n(1),
      i = n(0);
    t.default = function () {
      var e = [];
      return (
        (0, o.queryAll)(this.options.animationSelector).forEach(function (t) {
          var n = new Promise(function (e) {
            t.addEventListener((0, i.transitionEnd)(), function (n) {
              t == n.target && e();
            });
          });
          e.push(n);
        }),
        e
      );
    };
  },
  function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    var o = n(0);
    t.default = function (e) {
      var t = e.responseText,
        n = (0, o.getDataFromHtml)(t, this.options.containers);
      return n
        ? ((n.responseURL = e.responseURL
            ? e.responseURL
            : window.location.href),
          n)
        : null;
    };
  },
  function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    (t.use = function (e) {
      if (e.isSwupPlugin)
        return (
          this.plugins.push(e),
          (e.swup = this),
          "function" == typeof e._beforeMount && e._beforeMount(),
          e.mount(),
          this.plugins
        );
    }),
      (t.unuse = function (e) {
        var t = void 0;
        if (
          (t =
            "string" == typeof e
              ? this.plugins.find(function (t) {
                  return e === t.name;
                })
              : e)
        ) {
          t.unmount(),
            "function" == typeof t._afterUnmount && t._afterUnmount();
          var n = this.plugins.indexOf(t);
          return this.plugins.splice(n, 1), this.plugins;
        }
      }),
      (t.findPlugin = function (e) {
        return this.plugins.find(function (t) {
          return e === t.name;
        });
      });
  },
  function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    var o =
      Object.assign ||
      function (e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = arguments[t];
          for (var o in n)
            Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o]);
        }
        return e;
      };
    t.default = function e(t) {
      var n = this;
      !(function (e, t) {
        if (!(e instanceof t))
          throw new TypeError("Cannot call a class as a function");
      })(this, e),
        (this._raf = null),
        (this._positionY = 0),
        (this._velocityY = 0),
        (this._targetPositionY = 0),
        (this._targetPositionYWithOffset = 0),
        (this._direction = 0),
        (this.scrollTo = function (e) {
          if (e && e.nodeType)
            n._targetPositionY = Math.round(
              e.getBoundingClientRect().top + window.pageYOffset
            );
          else {
            if (parseInt(n._targetPositionY) !== n._targetPositionY) return;
            n._targetPositionY = Math.round(e);
          }
          n._targetPositionY >
            document.documentElement.scrollHeight - window.innerHeight &&
            (n._targetPositionY =
              document.documentElement.scrollHeight - window.innerHeight),
            (n._positionY =
              document.body.scrollTop || document.documentElement.scrollTop),
            (n._direction = n._positionY > n._targetPositionY ? -1 : 1),
            (n._targetPositionYWithOffset = n._targetPositionY + n._direction),
            (n._velocityY = 0),
            n._positionY !== n._targetPositionY
              ? (n.options.onStart(), n._animate())
              : n.options.onAlreadyAtPositions();
        }),
        (this._animate = function () {
          n._update();
          n._render(),
            (1 === n._direction && n._targetPositionY > n._positionY) ||
            (-1 === n._direction && n._targetPositionY < n._positionY)
              ? ((n._raf = requestAnimationFrame(n._animate)),
                n.options.onTick())
              : ((n._positionY = n._targetPositionY),
                n._render(),
                (n._raf = null),
                n.options.onTick(),
                n.options.onEnd());
        }),
        (this._update = function () {
          var e = n._targetPositionYWithOffset - n._positionY,
            t = e * n.options.acceleration;
          return (
            (n._velocityY += t),
            (n._velocityY *= n.options.friction),
            (n._positionY += n._velocityY),
            Math.abs(e)
          );
        }),
        (this._render = function () {
          window.scrollTo(0, n._positionY);
        });
      (this.options = o(
        {},
        {
          onAlreadyAtPositions: function () {},
          onCancel: function () {},
          onEnd: function () {},
          onStart: function () {},
          onTick: function () {},
          friction: 0.7,
          acceleration: 0.04,
        },
        t
      )),
        t && t.friction && (this.options.friction = 1 - t.friction),
        window.addEventListener(
          "mousewheel",
          function (e) {
            n._raf &&
              (n.options.onCancel(),
              cancelAnimationFrame(n._raf),
              (n._raf = null));
          },
          { passive: !0 }
        );
    };
  },
  function (e, t, n) {
    var o = n(29);
    function i(e, t, n, o, i) {
      var a = r.apply(this, arguments);
      return (
        e.addEventListener(n, a, i),
        {
          destroy: function () {
            e.removeEventListener(n, a, i);
          },
        }
      );
    }
    function r(e, t, n, i) {
      return function (n) {
        (n.delegateTarget = o(n.target, t)), n.delegateTarget && i.call(e, n);
      };
    }
    e.exports = function (e, t, n, o, r) {
      return "function" == typeof e.addEventListener
        ? i.apply(null, arguments)
        : "function" == typeof n
        ? i.bind(null, document).apply(null, arguments)
        : ("string" == typeof e && (e = document.querySelectorAll(e)),
          Array.prototype.map.call(e, function (e) {
            return i(e, t, n, o, r);
          }));
    };
  },
  function (e, t) {
    if ("undefined" != typeof Element && !Element.prototype.matches) {
      var n = Element.prototype;
      n.matches =
        n.matchesSelector ||
        n.mozMatchesSelector ||
        n.msMatchesSelector ||
        n.oMatchesSelector ||
        n.webkitMatchesSelector;
    }
    e.exports = function (e, t) {
      for (; e && 9 !== e.nodeType; ) {
        if ("function" == typeof e.matches && e.matches(t)) return e;
        e = e.parentNode;
      }
    };
  },
  function (e, t, n) {
    !(function (t, n) {
      var o = (function (e, t, n) {
        "use strict";
        var o, i;
        if (
          ((function () {
            var t,
              n = {
                lazyClass: "lazyload",
                loadedClass: "lazyloaded",
                loadingClass: "lazyloading",
                preloadClass: "lazypreload",
                errorClass: "lazyerror",
                autosizesClass: "lazyautosizes",
                fastLoadedClass: "ls-is-cached",
                iframeLoadMode: 0,
                srcAttr: "data-src",
                srcsetAttr: "data-srcset",
                sizesAttr: "data-sizes",
                minSize: 40,
                customMedia: {},
                init: !0,
                expFactor: 1.5,
                hFac: 0.8,
                loadMode: 2,
                loadHidden: !0,
                ricTimeout: 0,
                throttleDelay: 125,
              };
            for (t in ((i = e.lazySizesConfig || e.lazysizesConfig || {}), n))
              t in i || (i[t] = n[t]);
          })(),
          !t || !t.getElementsByClassName)
        )
          return { init: function () {}, cfg: i, noSupport: !0 };
        var r = t.documentElement,
          a = e.HTMLPictureElement,
          s = "addEventListener",
          l = "getAttribute",
          u = e[s].bind(e),
          c = e.setTimeout,
          d = e.requestAnimationFrame || c,
          f = e.requestIdleCallback,
          p = /^picture$/i,
          h = ["load", "error", "lazyincluded", "_lazyloaded"],
          g = {},
          m = Array.prototype.forEach,
          v = function (e, t) {
            return (
              g[t] || (g[t] = new RegExp("(\\s|^)" + t + "(\\s|$)")),
              g[t].test(e[l]("class") || "") && g[t]
            );
          },
          y = function (e, t) {
            v(e, t) ||
              e.setAttribute("class", (e[l]("class") || "").trim() + " " + t);
          },
          w = function (e, t) {
            var n;
            (n = v(e, t)) &&
              e.setAttribute("class", (e[l]("class") || "").replace(n, " "));
          },
          b = function (e, t, n) {
            var o = n ? s : "removeEventListener";
            n && b(e, t),
              h.forEach(function (n) {
                e[o](n, t);
              });
          },
          _ = function (e, n, i, r, a) {
            var s = t.createEvent("Event");
            return (
              i || (i = {}),
              (i.instance = o),
              s.initEvent(n, !r, !a),
              (s.detail = i),
              e.dispatchEvent(s),
              s
            );
          },
          P = function (t, n) {
            var o;
            !a && (o = e.picturefill || i.pf)
              ? (n &&
                  n.src &&
                  !t[l]("srcset") &&
                  t.setAttribute("srcset", n.src),
                o({ reevaluate: !0, elements: [t] }))
              : n && n.src && (t.src = n.src);
          },
          E = function (e, t) {
            return (getComputedStyle(e, null) || {})[t];
          },
          S = function (e, t, n) {
            for (
              n = n || e.offsetWidth;
              n < i.minSize && t && !e._lazysizesWidth;

            )
              (n = t.offsetWidth), (t = t.parentNode);
            return n;
          },
          O = (function () {
            var e,
              n,
              o = [],
              i = [],
              r = o,
              a = function () {
                var t = r;
                for (r = o.length ? i : o, e = !0, n = !1; t.length; )
                  t.shift()();
                e = !1;
              },
              s = function (o, i) {
                e && !i
                  ? o.apply(this, arguments)
                  : (r.push(o), n || ((n = !0), (t.hidden ? c : d)(a)));
              };
            return (s._lsFlush = a), s;
          })(),
          k = function (e, t) {
            return t
              ? function () {
                  O(e);
                }
              : function () {
                  var t = this,
                    n = arguments;
                  O(function () {
                    e.apply(t, n);
                  });
                };
          },
          M = function (e) {
            var t,
              o = 0,
              r = i.throttleDelay,
              a = i.ricTimeout,
              s = function () {
                (t = !1), (o = n.now()), e();
              },
              l =
                f && a > 49
                  ? function () {
                      f(s, { timeout: a }),
                        a !== i.ricTimeout && (a = i.ricTimeout);
                    }
                  : k(function () {
                      c(s);
                    }, !0);
            return function (e) {
              var i;
              (e = !0 === e) && (a = 33),
                t ||
                  ((t = !0),
                  (i = r - (n.now() - o)) < 0 && (i = 0),
                  e || i < 9 ? l() : c(l, i));
            };
          },
          T = function (e) {
            var t,
              o,
              i = 99,
              r = function () {
                (t = null), e();
              },
              a = function () {
                var e = n.now() - o;
                e < i ? c(a, i - e) : (f || r)(r);
              };
            return function () {
              (o = n.now()), t || (t = c(a, i));
            };
          },
          C = (function () {
            var a,
              f,
              h,
              g,
              S,
              C,
              j,
              H,
              z,
              L,
              R,
              x,
              q = /^img$/i,
              Y = /^iframe$/i,
              D = "onscroll" in e && !/(gle|ing)bot/.test(navigator.userAgent),
              N = 0,
              W = 0,
              B = 0,
              U = -1,
              F = function (e) {
                B--, (!e || B < 0 || !e.target) && (B = 0);
              },
              I = function (e) {
                return (
                  null == x && (x = "hidden" == E(t.body, "visibility")),
                  x ||
                    !(
                      "hidden" == E(e.parentNode, "visibility") &&
                      "hidden" == E(e, "visibility")
                    )
                );
              },
              $ = function (e, n) {
                var o,
                  i = e,
                  a = I(e);
                for (
                  H -= n, R += n, z -= n, L += n;
                  a && (i = i.offsetParent) && i != t.body && i != r;

                )
                  (a = (E(i, "opacity") || 1) > 0) &&
                    "visible" != E(i, "overflow") &&
                    ((o = i.getBoundingClientRect()),
                    (a =
                      L > o.left &&
                      z < o.right &&
                      R > o.top - 1 &&
                      H < o.bottom + 1));
                return a;
              },
              V = function () {
                var e,
                  n,
                  s,
                  u,
                  c,
                  d,
                  p,
                  h,
                  m,
                  v,
                  y,
                  w,
                  b = o.elements;
                if ((g = i.loadMode) && B < 8 && (e = b.length)) {
                  for (n = 0, U++; n < e; n++)
                    if (b[n] && !b[n]._lazyRace)
                      if (!D || (o.prematureUnveil && o.prematureUnveil(b[n])))
                        te(b[n]);
                      else if (
                        (((h = b[n][l]("data-expand")) && (d = 1 * h)) ||
                          (d = W),
                        v ||
                          ((v =
                            !i.expand || i.expand < 1
                              ? r.clientHeight > 500 && r.clientWidth > 500
                                ? 500
                                : 370
                              : i.expand),
                          (o._defEx = v),
                          (y = v * i.expFactor),
                          (w = i.hFac),
                          (x = null),
                          W < y && B < 1 && U > 2 && g > 2 && !t.hidden
                            ? ((W = y), (U = 0))
                            : (W = g > 1 && U > 1 && B < 6 ? v : N)),
                        m !== d &&
                          ((C = innerWidth + d * w),
                          (j = innerHeight + d),
                          (p = -1 * d),
                          (m = d)),
                        (s = b[n].getBoundingClientRect()),
                        (R = s.bottom) >= p &&
                          (H = s.top) <= j &&
                          (L = s.right) >= p * w &&
                          (z = s.left) <= C &&
                          (R || L || z || H) &&
                          (i.loadHidden || I(b[n])) &&
                          ((f && B < 3 && !h && (g < 3 || U < 4)) ||
                            $(b[n], d)))
                      ) {
                        if ((te(b[n]), (c = !0), B > 9)) break;
                      } else
                        !c &&
                          f &&
                          !u &&
                          B < 4 &&
                          U < 4 &&
                          g > 2 &&
                          (a[0] || i.preloadAfterLoad) &&
                          (a[0] ||
                            (!h &&
                              (R ||
                                L ||
                                z ||
                                H ||
                                "auto" != b[n][l](i.sizesAttr)))) &&
                          (u = a[0] || b[n]);
                  u && !c && te(u);
                }
              },
              K = M(V),
              G = function (e) {
                var t = e.target;
                t._lazyCache
                  ? delete t._lazyCache
                  : (F(e),
                    y(t, i.loadedClass),
                    w(t, i.loadingClass),
                    b(t, Z),
                    _(t, "lazyloaded"));
              },
              X = k(G),
              Z = function (e) {
                X({ target: e.target });
              },
              J = function (e, t) {
                var n = e.getAttribute("data-load-mode") || i.iframeLoadMode;
                0 == n
                  ? e.contentWindow.location.replace(t)
                  : 1 == n && (e.src = t);
              },
              Q = function (e) {
                var t,
                  n = e[l](i.srcsetAttr);
                (t = i.customMedia[e[l]("data-media") || e[l]("media")]) &&
                  e.setAttribute("media", t),
                  n && e.setAttribute("srcset", n);
              },
              ee = k(function (e, t, n, o, r) {
                var a, s, u, d, f, g;
                (f = _(e, "lazybeforeunveil", t)).defaultPrevented ||
                  (o &&
                    (n ? y(e, i.autosizesClass) : e.setAttribute("sizes", o)),
                  (s = e[l](i.srcsetAttr)),
                  (a = e[l](i.srcAttr)),
                  r && (d = (u = e.parentNode) && p.test(u.nodeName || "")),
                  (g = t.firesLoad || ("src" in e && (s || a || d))),
                  (f = { target: e }),
                  y(e, i.loadingClass),
                  g && (clearTimeout(h), (h = c(F, 2500)), b(e, Z, !0)),
                  d && m.call(u.getElementsByTagName("source"), Q),
                  s
                    ? e.setAttribute("srcset", s)
                    : a && !d && (Y.test(e.nodeName) ? J(e, a) : (e.src = a)),
                  r && (s || d) && P(e, { src: a })),
                  e._lazyRace && delete e._lazyRace,
                  w(e, i.lazyClass),
                  O(function () {
                    var t = e.complete && e.naturalWidth > 1;
                    (g && !t) ||
                      (t && y(e, i.fastLoadedClass),
                      G(f),
                      (e._lazyCache = !0),
                      c(function () {
                        "_lazyCache" in e && delete e._lazyCache;
                      }, 9)),
                      "lazy" == e.loading && B--;
                  }, !0);
              }),
              te = function (e) {
                if (!e._lazyRace) {
                  var t,
                    n = q.test(e.nodeName),
                    o = n && (e[l](i.sizesAttr) || e[l]("sizes")),
                    r = "auto" == o;
                  ((!r && f) ||
                    !n ||
                    (!e[l]("src") && !e.srcset) ||
                    e.complete ||
                    v(e, i.errorClass) ||
                    !v(e, i.lazyClass)) &&
                    ((t = _(e, "lazyunveilread").detail),
                    r && A.updateElem(e, !0, e.offsetWidth),
                    (e._lazyRace = !0),
                    B++,
                    ee(e, t, r, o, n));
                }
              },
              ne = T(function () {
                (i.loadMode = 3), K();
              }),
              oe = function () {
                3 == i.loadMode && (i.loadMode = 2), ne();
              },
              ie = function () {
                f ||
                  (n.now() - S < 999
                    ? c(ie, 999)
                    : ((f = !0), (i.loadMode = 3), K(), u("scroll", oe, !0)));
              };
            return {
              _: function () {
                (S = n.now()),
                  (o.elements = t.getElementsByClassName(i.lazyClass)),
                  (a = t.getElementsByClassName(
                    i.lazyClass + " " + i.preloadClass
                  )),
                  u("scroll", K, !0),
                  u("resize", K, !0),
                  u("pageshow", function (e) {
                    if (e.persisted) {
                      var n = t.querySelectorAll("." + i.loadingClass);
                      n.length &&
                        n.forEach &&
                        d(function () {
                          n.forEach(function (e) {
                            e.complete && te(e);
                          });
                        });
                    }
                  }),
                  e.MutationObserver
                    ? new MutationObserver(K).observe(r, {
                        childList: !0,
                        subtree: !0,
                        attributes: !0,
                      })
                    : (r[s]("DOMNodeInserted", K, !0),
                      r[s]("DOMAttrModified", K, !0),
                      setInterval(K, 999)),
                  u("hashchange", K, !0),
                  [
                    "focus",
                    "mouseover",
                    "click",
                    "load",
                    "transitionend",
                    "animationend",
                  ].forEach(function (e) {
                    t[s](e, K, !0);
                  }),
                  /d$|^c/.test(t.readyState)
                    ? ie()
                    : (u("load", ie), t[s]("DOMContentLoaded", K), c(ie, 2e4)),
                  o.elements.length ? (V(), O._lsFlush()) : K();
              },
              checkElems: K,
              unveil: te,
              _aLSL: oe,
            };
          })(),
          A = (function () {
            var e,
              n = k(function (e, t, n, o) {
                var i, r, a;
                if (
                  ((e._lazysizesWidth = o),
                  (o += "px"),
                  e.setAttribute("sizes", o),
                  p.test(t.nodeName || ""))
                )
                  for (
                    r = 0, a = (i = t.getElementsByTagName("source")).length;
                    r < a;
                    r++
                  )
                    i[r].setAttribute("sizes", o);
                n.detail.dataAttr || P(e, n.detail);
              }),
              o = function (e, t, o) {
                var i,
                  r = e.parentNode;
                r &&
                  ((o = S(e, r, o)),
                  (i = _(e, "lazybeforesizes", { width: o, dataAttr: !!t }))
                    .defaultPrevented ||
                    ((o = i.detail.width) &&
                      o !== e._lazysizesWidth &&
                      n(e, r, i, o)));
              },
              r = T(function () {
                var t,
                  n = e.length;
                if (n) for (t = 0; t < n; t++) o(e[t]);
              });
            return {
              _: function () {
                (e = t.getElementsByClassName(i.autosizesClass)),
                  u("resize", r);
              },
              checkElems: r,
              updateElem: o,
            };
          })(),
          j = function () {
            !j.i && t.getElementsByClassName && ((j.i = !0), A._(), C._());
          };
        return (
          c(function () {
            i.init && j();
          }),
          (o = {
            cfg: i,
            autoSizer: A,
            loader: C,
            init: j,
            uP: P,
            aC: y,
            rC: w,
            hC: v,
            fire: _,
            gW: S,
            rAF: O,
          })
        );
      })(t, t.document, Date);
      (t.lazySizes = o), e.exports && (e.exports = o);
    })("undefined" != typeof window ? window : {});
  },
]);
//# sourceMappingURL=bundle.js.map
