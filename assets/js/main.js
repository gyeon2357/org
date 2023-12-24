"use strict";

/* ======================================================================================================== */

/* SRC/JS/MAIN.JS */

/* ======================================================================================================== */

/* store information about the device */
var Device = {
  touch: false,
  screenWidth: 0,
  screenHeight: 0,
  pixelRes: 1,
  initScreenHeight: 0,
  mobile: false,
  init: function init() {
    /* Detect touch device */
    if (
      "ontouchstart" in window ||
      navigator.MaxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0
    ) {
      Device.touch = true;
      document.getElementsByTagName("html")[0].classList.add("touch");
    } else {
      document.getElementsByTagName("html")[0].classList.add("no-touch");
    }
    /* Get pixel res */
    Device.pixelRes = window.devicePixelRatio;
    Device.refresh();
  },

  /* called on resize to collect information about the viewport */
  refresh: function refresh() {
    /* get screen dimensions and set heigh and true heigh varibles to correct vh units in the CSS */
    if (Device.touch === true) {
      if (Device.screenWidth === window.innerWidth) {
        if (window.innerHeight < Device.screenHeight) {
          Device.screenHeight = window.innerHeight;
        }
      } else {
        Device.screenHeight = window.innerHeight;
      }
    } else {
      Device.screenHeight = window.innerHeight;
    }

    Device.screenWidth = window.innerWidth;
    Device.realScreenHeight = window.innerHeight;

    var _vh = Device.screenHeight * 0.01;

    document.documentElement.style.setProperty("--vh", _vh + "px");

    var _rvh = Device.realScreenHeight * 0.01;

    document.documentElement.style.setProperty("--rvh", _rvh + "px");

    if (document.getElementsByClassName("nav__th--desktop").length !== 0) {
      if (
        document.getElementsByClassName("nav__th--desktop")[0].offsetParent ===
        null
      ) {
        Device.mobile = true;
      } else {
        Device.mobile = false;
      }
    }

    console.log("Device.mobile: " + Device.mobile);
  },
};
var Scroll = {
  lastScrollPos: -1,
  scrollPos: 0,
  loadObs: [],
  resizing: false,
  scrollDown: true,
  init: function init() {
    /* Call the resize event to set everything up */
    Scroll.doResize();
  },
  doScroll: function doScroll() {
    Scroll.lastScrollPos = Scroll.scrollPos;

    var _newPos = Math.floor(window.pageYOffset);

    if (Scroll.lastScrollPos !== _newPos) {
      if (_newPos < Scroll.scrollPos) {
        Scroll.scrollDown = false;
      } else {
        Scroll.scrollDown = true;
      }

      Scroll.scrollPos = _newPos;

      if (Device.portrait === false && Device.touch === false) {
        Scroll.posOffset = Scroll.scrollPos;
      } else {
        Scroll.posOffset = 0;
      }

      Scroll.adjustScrollPos = Scroll.scrollPos;

      if (
        Scroll.adjustScrollPos > Scroll.scrollerStart &&
        Scroll.adjustScrollPos < Scroll.scrollerEnd
      ) {
        Scroll.adjustScrollPos = Scroll.scrollerStart;
      } else if (Scroll.adjustScrollPos >= Scroll.scrollerEnd) {
        Scroll.adjustScrollPos =
          Scroll.scrollPos - (Scroll.scrollerEnd - Scroll.scrollerStart);
      }
    }
  },
  getLoadOffset: function getLoadOffset() {
    Scroll.loadObs = [];

    var _loadEls = document
      .getElementsByClassName("home state-active")[0]
      .getElementsByClassName("js-scroll-load");

    if (_loadEls) {
      for (var _i = 0; _i < _loadEls.length; _i++) {
        Scroll.loadObs[_i] = [];
        Scroll.loadObs[_i]["el"] = _loadEls[_i];
        Scroll.loadObs[_i]["offset"] =
          Helper.getOffsetTop(Scroll.loadObs[_i]["el"]) -
          Device.screenHeight * 2;

        if (
          Boot.pageLoaded === false &&
          Scroll.loadObs[_i]["offset"] < Device.screenHeight * 1.1
        ) {
          Scroll.loadObs[_i]["el"].classList.add("js-state-load-first");
        }

        if (
          Scroll.loadObs[_i]["el"].classList.contains("js-state-load-media")
        ) {
          Scroll.loadObs[_i]["loaded"] = true;
        } else {
          Scroll.loadObs[_i]["loaded"] = false;
        }
      }
    }
  },
  doLoad: function doLoad() {
    if (Scroll.loadObs) {
      for (var _i = 0; _i < Scroll.loadObs.length; _i++) {
        if (
          Scroll.loadObs[_i]["offset"] < Scroll.adjustScrollPos &&
          Scroll.loadObs[_i]["loaded"] === false &&
          Boot.pageLoaded === true
        ) {
          Scroll.loadObs[_i]["el"].classList.add("js-state-load-media");

          Scroll.loadObs[_i]["loaded"] = true;
          LoadMedia.doLoad(Scroll.loadObs[_i]["el"]);
        }
      }
    }
  },
  doResize: function doResize() {
    Scroll.resizing = true;
    Scroll.doScroll();
    Scroll.getLoadOffset();
    Scroll.lastScrollPos = -1;
    Scroll.resizing = false;
  },
  doSoftResize: function doSoftResize() {
    Scroll.doScroll();
    Scroll.getLoadOffset();
  },
};

/* Accordion scripts */
var Accordion = {
  count: 0,
  init: function init() {
    var _page = document.getElementsByClassName("home state-active")[0];

    if (_page) {
      var _els = _page.getElementsByClassName("js-accordion__trigger");

      for (var _i = 0; _i < _els.length; _i++) {
        Accordion.setup(_els[_i]);
      }
    }
  },
  setup: function setup(_el) {
    if (!_el.classList.contains("js-setup")) {
      var _id = "accordion-" + Accordion.count;

      _el.classList.add("js-setup");

      var _parent = _el.closest(".js-accordion");

      var _body = _parent.getElementsByClassName("js-accordion__body")[0];

      var _inner = _parent.getElementsByClassName("js-accordion__inner")[0];

      _el.setAttribute("role", "button");

      _el.setAttribute("aria-expanded", "false");

      _el.setAttribute("aria-controls", _id);

      _body.setAttribute("id", _id);

      _body.setAttribute("aria-hidden", "true");

      _el.addEventListener("click", function (_evt) {
        _evt.preventDefault();

        var _trigger = this;

        var _parent = _trigger.closest(".js-accordion");

        var _body = _parent.getElementsByClassName("js-accordion__body")[0];

        var _inner = _parent.getElementsByClassName("js-accordion__inner")[0];

        var _height = _inner.clientHeight;

        if (_parent.classList.contains("state-accordion-open") === false) {
          _parent.classList.add("state-accordion-open");

          _trigger.classList.add("state-accordion-open");

          _trigger.setAttribute("aria-expanded", "true");

          _body.setAttribute("aria-hidden", "false");

          anime({
            targets: _body,
            height: _height,
            duration: 100,
            easing: "easeInCubic",
            complete: function complete() {
              Scroll.doResize();
              _body.style.height = "auto";

              _parent.classList.add("state-accordion-opened");

              anime({
                targets: _inner,
                opacity: 1,
                duration: 125,
                easing: "linear",
              });
            },
          });
        } else {
          _trigger.setAttribute("aria-expanded", "false");

          _body.setAttribute("aria-hidden", "true");

          _parent.classList.remove("state-accordion-open");

          _parent.classList.remove("state-accordion-opened");

          _trigger.classList.remove("state-accordion-open");

          _body.style.height = _height + "px";
          anime({
            targets: _inner,
            opacity: 0,
            duration: 60,
            easing: "linear",
            complete: function complete() {
              anime({
                targets: _body,
                height: 0,
                duration: 80,
                easing: "easeInCubic",
                complete: function complete() {
                  Scroll.doResize();
                },
              });
            },
          });
        }
      });

      _inner.style.opacity = 0;
      _body.style.height = "0px";
      Accordion.count = Accordion.count + 1;
    }
  },
};
var Video = {
  player: null,
  init: function init() {
    var _els = document.getElementsByClassName("c-video");

    if (_els.length > 0) {
      for (var _i = 0; _i < _els.length; _i++) {
        _els[_i].remove();
      }
    }

    // document.body.innerHTML +=
    //   '<div class="c-video"><a href="#" class="c-video__close-overlay js-video-close"></a><a href="#" class="c-video__close js-video-close"><div class="c-video__close__line c-video__close__line--top"></div><div class="c-video__close__line c-video__close__line--bottom"></div></a><div class="c-video__inner"><a href="#" class="c-video__close-overlay js-video-close"></a><div class="c-video__wrapper js-object-size" data-width="1600" data-height="900"></div></div></div>';
    // _els = document.getElementsByClassName("js-launch-video");

    if (_els.length > 0) {
      for (var _i2 = 0; _i2 < _els.length; _i2++) {
        _els[_i2].addEventListener("click", function (_evt) {
          _evt.preventDefault();

          var _videoID = this.getAttribute("href").split("v=")[1];

          var _ampersandPos = _videoID.indexOf("&");

          if (_ampersandPos != -1) {
            _videoID = _videoID.substring(0, _ampersandPos);
          }

          document.getElementsByClassName("c-video__wrapper")[0].innerHTML =
            '<div class="plyr__video-embed" id="player"><iframe src="https://www.youtube.com/embed/' +
            _videoID +
            "?origin=" +
            window.location.origin +
            '&amp;iv_load_policy=3&amp;modestbranding=1&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;enablejsapi=1" allowfullscreen allowtransparency allow="autoplay"></iframe>';
          document
            .getElementsByClassName("c-video")[0]
            .classList.add("state-video-active");
          Video.player = new Plyr("#player");
          Video.player.on("ready", function (event) {
            if (Device.touch === false) {
              Video.player.play();
            }
          });
          Video.player.on("ended", function (event) {
            document.getElementsByClassName("js-video-close")[0].click();
          });
        });
      }
    }

    _els = document.getElementsByClassName("js-video-close");

    if (_els.length > 0) {
      for (var _i3 = 0; _i3 < _els.length; _i3++) {
        _els[_i3].addEventListener("click", function (_evt) {
          _evt.preventDefault();

          document
            .getElementsByClassName("c-video")[0]
            .classList.remove("state-video-active");

          if (Video.player !== null) {
            Video.player.pause();
          }
        });
      }
    }

    ObjectSize.doResize();
  },
};
var ObjectSize = {
  doResize: function doResize() {
    var _els = document.getElementsByClassName("js-object-size");

    if (_els.length > 0) {
      for (var _i = 0; _i < _els.length; _i++) {
        ObjectSize.sizeEl(_els[_i]);
      }
    }
  },
  sizeEl: function sizeEl(_element) {
    var _parent = _element.parentElement;

    var _width = _element.getAttribute("data-width");

    var _height = _element.getAttribute("data-height");

    var _ratio = _width / _height;

    var _parentWidth = _parent.clientWidth;
    var _parentHeight = _parent.clientHeight;

    var _parentRatio = _parentWidth / _parentHeight;

    var _left = 0;
    var _top = 0;

    if (_parentRatio > _ratio) {
      _height = _parentHeight;
      _width = Math.ceil(_parentHeight * _ratio);
    } else {
      _width = _parentWidth;
      _height = Math.floor(_parentWidth / _ratio);
    }

    _top = (_parentHeight - _height) * 0.5;
    _left = (_parentWidth - _width) * 0.5;
    _element.style.width = _width + "px";
    _element.style.height = _height + "px";
    _element.style.top = _top + "px";
    _element.style.left = _left + "px";
    _element.style.maxWidth = 99999 + "px";
    _element.style.maxHeight = 99999 + "px";
    _element.style.position = "absolute";
  },
};
var Sort = {
  films: null,
  wrapper: null,
  mobile: null,
  init: function init() {
    var _trs = document.getElementsByClassName("project__tr");

    if (_trs) {
      Sort.films = [];

      for (var _i = 0; _i < _trs.length; _i++) {
        Sort.films[_i] = [];
        Sort.films[_i].id = _trs[_i].getAttribute("id");
        Sort.films[_i].title = _trs[_i].getAttribute("data-title");
        Sort.films[_i].year = _trs[_i].getAttribute("data-year");
        Sort.films[_i].tag = _trs[_i].getAttribute("data-tag");
      }

      Sort.wrapper = document.getElementById("index");
      Sort.bindClick();
      Sort.doResize();
    } else {
      Sort.films = null;
    }
  },
  sortASC: function sortASC(_col) {
    if (Sort.films !== null) {
      Sort.films.sort(function (b, a) {
        if (a[_col] < b[_col]) return -1;
        if (a[_col] > b[_col]) return 1;
        return 1;
      });
      console.log(Sort.films);
    }
  },
  sortDSC: function sortDSC(_col) {
    if (Sort.films !== null) {
      Sort.films.sort(function (b, a) {
        if (a[_col] > b[_col]) return -1;
        if (a[_col] < b[_col]) return 1;
        return 0;
      });
      console.log(Sort.films);
    }
  },
  reorderFilms: function reorderFilms() {
    if (Sort.films !== null) {
      for (var _i = 0; _i < Sort.films.length; _i++) {
        Sort.wrapper.appendChild(document.getElementById(Sort.films[_i].id));
      }
    }
  },
  bindClick: function bindClick() {
    var _els = document.getElementsByClassName("js-swap-order");

    if (_els) {
      for (var _i = 0; _i < _els.length; _i++) {
        _els[_i].addEventListener("click", function (_evt) {
          _evt.preventDefault();

          if (this.classList.contains("state-active-asc")) {
            this.classList.remove("state-active-asc");
            this.classList.add("state-active-dsc");
            Sort.sortDSC(this.getAttribute("data-order"));
            Sort.reorderFilms();
          } else if (this.classList.contains("state-active-dsc")) {
            this.classList.remove("state-active-dsc");
            this.classList.add("state-active-asc");
            Sort.sortASC(this.getAttribute("data-order"));
            Sort.reorderFilms();
          } else {
            var _swapEls = document.getElementsByClassName("js-swap-order");

            for (var _j = 0; _j < _swapEls.length; _j++) {
              _swapEls[_j].classList.remove("state-active-asc");

              _swapEls[_j].classList.remove("state-active-dsc");
            }

            this.classList.add("state-active-asc");
            Sort.sortASC(this.getAttribute("data-order"));
            Sort.reorderFilms();
          }
        });
      }

      document.addEventListener(
        "input",
        function (_event) {
          if (_event.target.id !== "mobile-sort") return;
          document.getElementById("select-text").innerHTML =
            _event.target.options[_event.target.selectedIndex].innerHTML;
          Sort.sortDSC(_event.target.value);
          Sort.reorderFilms();
        },
        false
      );
    }
  },
  doResize: function doResize() {
    if (Sort.films !== null) {
      if (Sort.Mobile !== Device.mobile) {
        Sort.Mobile = Device.mobile;

        var _swapEls = document.getElementsByClassName("js-swap-order");

        if (_swapEls.length > 0) {
          for (var _j = 0; _j < _swapEls.length; _j++) {
            _swapEls[_j].classList.remove("state-active-asc");

            _swapEls[_j].classList.remove("state-active-dsc");
          }

          _swapEls[2].classList.add("state-active-dsc");

          document.getElementById("mobile-sort").selectedIndex = 2;
          document.getElementById("select-text").innerHTML = "Sort by: Date";
          Sort.sortDSC("year");
          Sort.reorderFilms();
        }
      }
    }
  },
};
var Layout = {
  doResize: function doResize() {
    var _imgs = document.getElementsByClassName("caption__image");

    if (_imgs) {
      for (var _i = 0; _i < _imgs.length; _i++) {
        _imgs[_i].removeAttribute("style");
      }
    }

    var _text = document.getElementsByClassName("caption__text");

    if (_text) {
      for (var _i4 = 0; _i4 < _text.length; _i4++) {
        _text[_i4].removeAttribute("style");
      }
    }

    var _headings = document.getElementsByClassName("caption__text__heading");

    if (_headings) {
      for (var _i5 = 0; _i5 < _headings.length; _i5++) {
        _headings[_i5].removeAttribute("style");
      }
    }

    var _content = document.getElementsByClassName("caption__text__content");

    if (_content) {
      for (var _i6 = 0; _i6 < _content.length; _i6++) {
        _content[_i6].removeAttribute("style");
      }
    }

    var _titles = document.getElementsByClassName("caption__image");

    if (_imgs) {
      for (var _i7 = 0; _i7 < _imgs.length; _i7++) {
        _imgs[_i7].removeAttribute("style");
      }
    }

    var _tds = document.getElementsByClassName("value__td");

    if (_tds.length > 0) {
      for (var _i8 = 0; _i8 < _tds.length; _i8++) {
        _tds[_i8].removeAttribute("style");
      }

      if (Device.mobile === false) {
        var _tdTitleWidth = 0;
        _tds = document.getElementsByClassName("value__td--title");

        for (var _i9 = 0; _i9 < _tds.length; _i9++) {
          if (_tdTitleWidth < _tds[_i9].clientWidth) {
            _tdTitleWidth = Math.ceil(_tds[_i9].clientWidth);
          }
        }

        var _tdYearWidth = 0;
        _tds = document.getElementsByClassName("value__td--year");

        for (var _i10 = 0; _i10 < _tds.length; _i10++) {
          if (_tdYearWidth < _tds[_i10].clientWidth) {
            _tdYearWidth = Math.ceil(_tds[_i10].clientWidth);
          }
        }

        var _tdtagWidth = 0;
        _tds = document.getElementsByClassName("value__td--tag");

        for (var _i11 = 0; _i11 < _tds.length; _i11++) {
          if (_tdtagWidth < _tds[_i11].clientWidth) {
            _tdtagWidth = Math.ceil(_tds[_i11].clientWidth);
          }
        }

        var _tdCountryWidth = 0;
        _tds = document.getElementsByClassName("value__td--country");

        for (var _i12 = 0; _i12 < _tds.length; _i12++) {
          if (_tdCountryWidth < _tds[_i12].clientWidth) {
            _tdCountryWidth = Math.ceil(_tds[_i12].clientWidth);
          }
        }

        var _tdGenreWidth = 0;
        _tds = document.getElementsByClassName("value__td--genre");

        for (var _i13 = 0; _i13 < _tds.length; _i13++) {
          if (_tdGenreWidth < _tds[_i13].clientWidth) {
            _tdGenreWidth = Math.ceil(_tds[_i13].clientWidth);
          }
        }

        var _totalWidth =
          _tdTitleWidth +
          _tdYearWidth +
          _tdtagWidth +
          _tdCountryWidth +
          _tdGenreWidth;

        var _availableWidth = Math.floor(
          document.getElementsByClassName("project__details__inner")[0]
            .clientWidth
        );

        var _addWidth = Math.floor((_availableWidth - _totalWidth) / 4);

        _tds = document.getElementsByClassName("value__td--title");

        for (var _i14 = 0; _i14 < _tds.length; _i14++) {
          _tds[_i14].style.width = _tdTitleWidth + _addWidth + "px";
        }

        _tds = document.getElementsByClassName("value__td--year");

        for (var _i15 = 0; _i15 < _tds.length; _i15++) {
          _tds[_i15].style.width = _tdYearWidth + _addWidth + "px";
        }

        _tds = document.getElementsByClassName("value__td--tag");

        for (var _i16 = 0; _i16 < _tds.length; _i16++) {
          _tds[_i16].style.width = _tdtagWidth + _addWidth + "px";
        }

        _tds = document.getElementsByClassName("value__td--country");

        for (var _i17 = 0; _i17 < _tds.length; _i17++) {
          _tds[_i17].style.width = _tdCountryWidth + _addWidth + "px";
        }

        _tds = document.getElementsByClassName("value__td--genre");

        for (var _i18 = 0; _i18 < _tds.length; _i18++) {
          _tds[_i18].style.width = _tdGenreWidth + _addWidth + "px";
        }

        for (var _i19 = 0; _i19 < _imgs.length; _i19++) {
          _imgs[_i19].style.width = _tdTitleWidth + _addWidth + "px";
        }

        for (var _i20 = 0; _i20 < _text.length; _i20++) {
          _text[_i20].style.width =
            _tdYearWidth +
            _addWidth +
            _tdtagWidth +
            _addWidth +
            _tdCountryWidth +
            _addWidth +
            _tdGenreWidth +
            _addWidth +
            "px";
        }

        if (Device.screenWidth > 1380) {
          for (var _i21 = 0; _i21 < _headings.length; _i21++) {
            _headings[_i21].style.width = _tdYearWidth + _addWidth + "px";
          }

          for (var _i22 = 0; _i22 < _content.length; _i22++) {
            _content[_i22].style.width =
              _tdtagWidth +
              _addWidth +
              _tdCountryWidth +
              _addWidth +
              _tdGenreWidth +
              "px";
          }
        }
      }
    }
  },
};
/* Dynamically load media */

var LoadMedia = {
  totalBrackets: 6,
  loadFirst: function loadFirst() {
    var _els = document.getElementsByClassName("js-state-load-first");

    Array.from(_els).forEach(function (_el) {
      LoadMedia.doLoad(_el);
    });
  },
  doLoad: function doLoad(_el) {
    if (_el.classList.contains("state-load-called") === false) {
      _el.classList.add("state-load-called");

      var _src = LoadMedia.findSrc(_el);

      var _img = new Image();

      _img.onload = function () {
        setTimeout(function () {
          _el.classList.add("state-media-loaded");

          Boot.checkLoader();
        }, 100);
      };

      _img.src = _src;

      _el.appendChild(_img);
    }
  },
  findSrc: function findSrc(_el) {
    var _src = "";

    var _width = _el.clientWidth * Device.pixelRes;

    var _height = _el.clientHeight * Device.pixelRes;

    var _bracket = -1;

    var _bracketCount = 0;

    for (var _i = 0; _i < LoadMedia.totalBrackets; _i++) {
      var _bracketWidth = _el.getAttribute("data-img-w-" + _i + "");

      var _bracketHeight = _el.getAttribute("data-img-h-" + _i + "");

      if (typeof _bracketWidth === "undefined") {
        break;
      } else {
        if (_width < _bracketWidth) {
          if (_height < _bracketHeight) {
            _src = _el.getAttribute("data-img-s-" + (_i + 1) + "");

            if (typeof _src === "undefined") {
              _bracket = _i;
            } else {
              _bracket = _i;
            }

            break;
          }
        }
      }

      _bracketCount = _bracketCount + 1;
    }

    if (_bracket === -1) {
      _bracket = _bracketCount;
    }

    _src = _el.getAttribute("data-img-s-" + _bracket + "");

    if (typeof _src === "undefined") {
      _bracket = _bracket - 1;
      _src = _el.getAttribute("data-img-s-" + _bracket + "");
    }

    return _src;
  },
};
var Resize = {
  init: function init() {
    window.addEventListener("resize", Resize.doResize);
  },
  doResize: function doResize() {
    Device.refresh();
    ObjectSize.doResize();
    Layout.doResize();
    Scroll.doResize();
  },
};
var Controller = {
  doingResize: false,
  init: function init() {
    Controller.doFrame();
  },
  doFrame: function doFrame() {
    if (Scroll.resizing === false) {
      Scroll.doScroll();
      Scroll.doLoad();
    } else {
      Scroll.lastScrollPos = -1;
    }

    requestAnimationFrame(Controller.doFrame);
  },
};
var SubscribeForm = {
  cookie: null,
  init: function init() {
    if (document.getElementsByClassName("js-toggle-form").length > 0) {
      SubscribeForm.bindSubmit();
      document
        .getElementsByClassName("js-toggle-form")[0]
        .addEventListener("click", function (_evt) {
          _evt.preventDefault();

          document.body.classList.add("show-form");
        });
    }
  },
  bindSubmit: function bindSubmit() {
    Helper.on(
      ".main-wrapper",
      "submit",
      "#mc-embedded-subscribe-form",
      function (_evt) {
        _evt.preventDefault();

        SubscribeForm.doChange();

        if (
          document
            .getElementById("mc-embedded-subscribe-form")
            .classList.contains("state-valid")
        ) {
          SubscribeForm.ajaxPost(this);
        }
      }
    );
  },
  doChange: function doChange() {
    var _input = document.getElementsByClassName("email")[0];
    var _email = _input.value;

    if (/(^\w.*@\w+\.\w)/.test(_email)) {
      document
        .getElementById("mc-embedded-subscribe-form")
        .classList.add("state-valid");
    } else {
      document
        .getElementById("mc-embedded-subscribe-form")
        .classList.remove("state-valid");
    }
  },
  ajaxPost: function ajaxPost(_form) {
    var _url = _form.getAttribute("action");

    _url = _url.replace("/post?u=", "/post-json?u=");
    _url += SubscribeForm.serialize(_form) + "&c=displayMailChimpStatus";

    var _script = window.document.createElement("script");

    _script.src = _url;
    var _ref = window.document.getElementsByTagName("script")[0];

    _ref.parentNode.insertBefore(_script, _ref);

    _script.onload = function () {
      this.remove();
    };
  },
  serialize: function serialize(_form) {
    var _serialized = ""; // Loop through each field in the form

    for (var _i = 0; _i < _form.elements.length; _i++) {
      var _field = _form.elements[_i];
      if (
        !_field.name ||
        _field.disabled ||
        _field.type === "file" ||
        _field.type === "reset" ||
        _field.type === "submit" ||
        _field.type === "button"
      )
        continue;

      if (
        (_field.type !== "checkbox" && _field.type !== "radio") ||
        _field.checked
      ) {
        _serialized +=
          "&" +
          encodeURIComponent(_field.name) +
          "=" +
          encodeURIComponent(_field.value);
      }
    }

    return _serialized;
  },
};

var displayMailChimpStatus = function displayMailChimpStatus() {
  document.body.classList.remove("show-form");
};
/* Helpers - a bunch of helpful functions that can be reused */

var Helper = {
  isVisible: function isVisible(_el) {
    return _el.offsetWidth > 0 && _el.offsetHeight > 0;
  },
  docReady: function docReady(_fn) {
    if (
      document.readyState === "complete" ||
      document.readyState === "interactive"
    ) {
      setTimeout(_fn, 1);
    } else {
      document.addEventListener("DOMContentLoaded", _fn);
    }
  },
  getOffsetTop: function getOffsetTop(_el) {
    var _offsetTop = 0;

    do {
      if (!isNaN(_el.offsetTop)) {
        _offsetTop += _el.offsetTop;
      }
    } while ((_el = _el.offsetParent));

    return _offsetTop;
  },
  getOffsetLeft: function getOffsetLeft(_el) {
    var _offsetLeft = 0;

    do {
      if (!isNaN(_el.offsetLeft)) {
        _offsetLeft += _el.offsetLeft;
      }
    } while ((_el = _el.offsetParent));

    return _offsetLeft;
  },
  on: function on(elSelector, eventName, selector, fn) {
    var element = document.querySelector(elSelector);
    element.addEventListener(eventName, function (event) {
      var possibleTargets = element.querySelectorAll(selector);
      var target = event.target;

      for (var i = 0, l = possibleTargets.length; i < l; i++) {
        var el = target;
        var p = possibleTargets[i];

        while (el && el !== element) {
          if (el === p) {
            return fn.call(p, event);
          }

          el = el.parentNode;
        }
      }
    });
  },
};
/* Boot - boot the site when the DOM is ready */

var Boot = {
  pageLoaded: false,
  site: function site() {
    Device.init();
    Video.init();
    Accordion.init();
    Scroll.init();
    Controller.init();
    Sort.init();
    Resize.init();
    Resize.doResize();
    SubscribeForm.init();
    Boot.pageLoaded = true;
    Boot.checkLoader();
    LoadMedia.loadFirst();
  },
  checkLoader: function checkLoader() {
    var _els = document.getElementsByClassName("js-state-load-first");

    if (_els) {
      var _done = true;

      for (var _i = 0; _i < _els.length; _i++) {
        if (_els[_i].classList.contains("state-media-loaded") === false) {
          _done = false;
        }
      }

      if (_done === true) {
        setTimeout(function () {
          Resize.doResize();
          document.body.classList.add("state-site-loaded");
          setTimeout(function () {
            document.body.classList.add("state-page-loaded");
          }, 600);
        }, 100);
      }
    } else {
      setTimeout(function () {
        Resize.doResize();
        document.body.classList.add("state-site-loaded");
        setTimeout(function () {
          document.body.classList.add("state-page-loaded");
        }, 600);
      }, 100);
    }
  },
};

Helper.docReady(Boot.site);
