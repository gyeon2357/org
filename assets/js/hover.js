/**
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2018, Codrops
 * http://www.codrops.com
 */
{
  const mapNumber = (X, A, B, C, D) => ((X - A) * (D - C)) / (B - A) + C;
  // from http://www.quirksmode.org/js/events_properties.html#position
  const getMousePos = e => {
    let posx = 0;
    let posy = 0;
    if (!e) e = window.event;
    if (e.pageX || e.pageY) {
      posx = e.pageX;
      posy = e.pageY;
    } else if (e.clientX || e.clientY) {
      posx =
        e.clientX +
        document.body.scrollLeft +
        document.documentElement.scrollLeft;
      posy =
        e.clientY +
        document.body.scrollTop +
        document.documentElement.scrollTop;
    }
    return {x: posx, y: posy};
  };
  // Generate a random float.
  const getRandomFloat = (min, max) =>
    (Math.random() * (max - min) + min).toFixed(2);

  /**
   * One class per effect.
   * Lots of code is repeated, so that single effects can be easily used.
   */

  // Effect 1
  class HoverImgFx1 {
    constructor(el) {
      this.DOM = {el: el};
      this.DOM.reveal = document.createElement("div");
      this.DOM.reveal.className = "hover-reveal";
      this.DOM.reveal.innerHTML = `<div class="hover-reveal__inner"><div class="hover-reveal__img" style="background-image:url(${this.DOM.el.dataset.img})"></div></div>`;
      this.DOM.el.appendChild(this.DOM.reveal);
      this.DOM.revealInner = this.DOM.reveal.querySelector(
        ".hover-reveal__inner"
      );
      this.DOM.revealInner.style.overflow = "hidden";
      this.DOM.revealImg =
        this.DOM.revealInner.querySelector(".hover-reveal__img");

      this.initEvents();
    }
    initEvents() {
      this.positionElement = ev => {
        const mousePos = getMousePos(ev);
        const docScrolls = {
          left: document.body.scrollLeft + document.documentElement.scrollLeft,
          top: document.body.scrollTop + document.documentElement.scrollTop,
        };
        this.DOM.reveal.style.top = `${mousePos.y + 15 - docScrolls.top}px`;
        this.DOM.reveal.style.left = `${mousePos.x + 15 - docScrolls.left}px`;
      };
      this.mouseenterFn = ev => {
        this.positionElement(ev);
        this.showImage();
      };
      this.mousemoveFn = ev =>
        requestAnimationFrame(() => {
          this.positionElement(ev);
        });
      this.mouseleaveFn = () => {
        this.hideImage();
      };

      this.DOM.el.addEventListener("mouseenter", this.mouseenterFn);
      this.DOM.el.addEventListener("mousemove", this.mousemoveFn);
      this.DOM.el.addEventListener("mouseleave", this.mouseleaveFn);
    }
    showImage() {
      TweenMax.killTweensOf(this.DOM.revealInner);
      TweenMax.killTweensOf(this.DOM.revealImg);

      this.tl = new TimelineMax({
        onStart: () => {
          this.DOM.reveal.style.opacity = 1;
          TweenMax.set(this.DOM.el, {zIndex: 10002});
        },
      })
        .add("begin")
        .add(
          new TweenMax(this.DOM.revealInner, 0.1, {
            ease: Sine.easeOut,
            startAt: {x: "-100%", scale: 0},
            x: "0%",
            scale: 1,
          }),
          "begin"
        )
        .add(
          new TweenMax(this.DOM.revealImg, 0.1, {
            ease: Sine.easeOut,
            startAt: {x: "100%", scale: 1},
            x: "0%",
            scale: 1,
          }),
          "begin"
        );
    }
    hideImage() {
      TweenMax.killTweensOf(this.DOM.revealInner);
      TweenMax.killTweensOf(this.DOM.revealImg);

      this.tl = new TimelineMax({
        onStart: () => {
          TweenMax.set(this.DOM.el, {zIndex: 10001});
        },
        onComplete: () => {
          TweenMax.set(this.DOM.el, {zIndex: ""});
          TweenMax.set(this.DOM.reveal, {opacity: 0});
        },
      })

        .add("begin")
        .add(
          new TweenMax(this.DOM.revealInner, 0.1, {
            ease: Sine.easeOut,
            delay: "1",
            x: "100%",
            scale: 1,
          }),
          "begin"
        )

        .add(
          new TweenMax(this.DOM.revealImg, 0.1, {
            ease: Sine.easeOut,
            delay: "1",
            x: "-100%",
            scale: 0,
          }),
          "begin"
        );
    }
  }

  // Effect 2
  class HoverImgFx2 {
    constructor(el) {
      this.DOM = {el: el};
      this.DOM.reveal = document.createElement("div");
      this.DOM.reveal.className = "hover-reveal";
      this.DOM.reveal.innerHTML = `<div class="hover-reveal__inner"><div class="hover-reveal__img" style="background-image:url(${this.DOM.el.dataset.img})"></div></div>`;
      this.DOM.el.appendChild(this.DOM.reveal);
      this.DOM.revealInner = this.DOM.reveal.querySelector(
        ".hover-reveal__inner"
      );
      this.DOM.revealInner.style.overflow = "hidden";
      this.DOM.revealImg =
        this.DOM.revealInner.querySelector(".hover-reveal__img");

      this.initEvents();
    }
    initEvents() {
      this.positionElement = ev => {
        const mousePos = getMousePos(ev);
        const docScrolls = {
          left: document.body.scrollLeft + document.documentElement.scrollLeft,
          top: document.body.scrollTop + document.documentElement.scrollTop,
        };
        this.DOM.reveal.style.top = `${mousePos.y + 20 - docScrolls.top}px`;
        this.DOM.reveal.style.left = `${mousePos.x + 20 - docScrolls.left}px`;
      };
      this.mouseenterFn = ev => {
        this.positionElement(ev);
        this.showImage();
      };
      this.mousemoveFn = ev =>
        requestAnimationFrame(() => {
          this.positionElement(ev);
        });
      this.mouseleaveFn = () => {
        this.hideImage();
      };

      this.DOM.el.addEventListener("mouseenter", this.mouseenterFn);
      this.DOM.el.addEventListener("mousemove", this.mousemoveFn);
      this.DOM.el.addEventListener("mouseleave", this.mouseleaveFn);
    }
    showImage() {
      TweenMax.killTweensOf(this.DOM.revealInner);
      TweenMax.killTweensOf(this.DOM.revealImg);

      this.tl = new TimelineMax({
        onStart: () => {
          this.DOM.reveal.style.opacity = 1;
          TweenMax.set(this.DOM.el, {zIndex: 10002});
        },
      })
        .add("begin")
        .add(
          new TweenMax(this.DOM.revealInner, 0.5, {
            ease: Quint.easeOut,
            startAt: {x: "-100%", y: "-100%"},
            x: "0%",
            y: "0%",
          }),
          "begin"
        )
        .add(
          new TweenMax(this.DOM.revealImg, 0.5, {
            ease: Quint.easeOut,
            startAt: {x: "100%", y: "100%"},
            x: "0%",
            y: "0%",
          }),
          "begin"
        );
    }
    hideImage() {
      TweenMax.killTweensOf(this.DOM.revealInner);
      TweenMax.killTweensOf(this.DOM.revealImg);

      this.tl = new TimelineMax({
        onStart: () => {
          TweenMax.set(this.DOM.el, {zIndex: 10001});
        },
        onComplete: () => {
          TweenMax.set(this.DOM.el, {zIndex: ""});
          TweenMax.set(this.DOM.reveal, {opacity: 0});
        },
      })
        .add("begin")
        .add(
          new TweenMax(this.DOM.revealInner, 0.125, {
            ease: Quint.easeOut,
            delay: ".875",
            x: "100%",
            y: "100%",
          }),
          "begin"
        )

        .add(
          new TweenMax(this.DOM.revealImg, 0.125, {
            ease: Quint.easeOut,
            delay: ".875",
            x: "-100%",
            y: "-100%",
          }),
          "begin"
        );
    }
  }

  // Effect 4
  class HoverImgFx4 {
    constructor(el) {
      this.DOM = {el: el};
      this.DOM.reveal = document.createElement("div");
      this.DOM.reveal.className = "hover-reveal";
      this.DOM.reveal.innerHTML = `<div class="hover-reveal__img" style="background-image:url(${this.DOM.el.dataset.img})"></div>`;
      this.DOM.el.appendChild(this.DOM.reveal);
      this.DOM.revealImg = this.DOM.reveal.querySelector(".hover-reveal__img");

      this.initEvents();
    }
    initEvents() {
      this.positionElement = ev => {
        const mousePos = getMousePos(ev);
        const docScrolls = {
          left: document.body.scrollLeft + document.documentElement.scrollLeft,
          top: document.body.scrollTop + document.documentElement.scrollTop,
        };
        this.DOM.reveal.style.top = `${mousePos.y + 20 - docScrolls.top}px`;
        this.DOM.reveal.style.left = `${mousePos.x + 20 - docScrolls.left}px`;
      };
      this.mouseenterFn = ev => {
        this.positionElement(ev);
        this.showImage();
        this.animateLetters();
      };
      this.mousemoveFn = ev =>
        requestAnimationFrame(() => {
          this.positionElement(ev);
        });
      this.mouseleaveFn = () => {
        this.hideImage();
      };

      this.DOM.el.addEventListener("mouseenter", this.mouseenterFn);
      this.DOM.el.addEventListener("mousemove", this.mousemoveFn);
      this.DOM.el.addEventListener("mouseleave", this.mouseleaveFn);
    }
    showImage() {
      TweenMax.killTweensOf(this.DOM.revealInner);
      TweenMax.killTweensOf(this.DOM.revealImg);

      this.tl = new TimelineMax({
        onStart: () => {
          this.DOM.reveal.style.opacity = 1;
          TweenMax.set(this.DOM.el, {zIndex: 10002});
        },
      })
        .add("begin")
        .add(
          new TweenMax(this.DOM.revealInner, 0.8, {
            ease: Expo.easeOut,
            startAt: {opacity: 0, y: "50%", scale: 0},
            y: "0%",

            opacity: 1,
            scale: 1,
          }),
          "begin"
        )
        .add(
          new TweenMax(this.DOM.revealImg, 0.8, {
            ease: Expo.easeOut,
            startAt: {scale: 2},

            scale: 1,
          }),
          "begin"
        );
    }
    hideImage() {
      TweenMax.killTweensOf(this.DOM.revealInner);
      TweenMax.killTweensOf(this.DOM.revealImg);

      this.tl = new TimelineMax({
        onStart: () => {
          TweenMax.set(this.DOM.el, {zIndex: 10001});
        },
        onComplete: () => {
          TweenMax.set(this.DOM.el, {zIndex: ""});
          TweenMax.set(this.DOM.reveal, {opacity: 0});
        },
      })
        .add("begin")
        .add(
          new TweenMax(this.DOM.revealInner, 0.15, {
            ease: Sine.easeOut,
            delay: ".875",
            y: "-40%",

            scale: 0.9,
            opacity: 0,
          }),
          "begin"
        )
        .add(
          new TweenMax(this.DOM.revealImg, 0.15, {
            ease: Sine.easeOut,
            delay: ".875",

            scale: 1.5,
          }),
          "begin"
        );
    }
    animateLetters() {
      TweenMax.killTweensOf(this.DOM.letters);
      TweenMax.set(this.DOM.letters, {opacity: 0});
      TweenMax.staggerTo(
        this.DOM.letters,
        0.8,
        {
          ease: Expo.easeOut,
          startAt: {y: "50%"},
          y: "0%",
          opacity: 1,
        },
        0.03
      );
    }
  }

  // Effect 11
  class HoverImgFx11 {
    constructor(el) {
      this.DOM = {el: el};

      this.DOM.reveal = document.createElement("div");
      this.DOM.reveal.className = "hover-reveal";
      this.DOM.reveal.style.overflow = "hidden";
      this.DOM.reveal.innerHTML = `<div class="hover-reveal__deco"></div><div class="hover-reveal__inner"><div class="hover-reveal__img" style="background-image:url(${this.DOM.el.dataset.img})"></div></div>`;
      this.DOM.el.appendChild(this.DOM.reveal);
      this.DOM.revealInner = this.DOM.reveal.querySelector(
        ".hover-reveal__inner"
      );
      this.DOM.revealInner.style.overflow = "hidden";
      this.DOM.revealDeco = this.DOM.reveal.querySelector(
        ".hover-reveal__deco"
      );
      TweenMax.set(this.DOM.revealDeco, {
        width: "1%",
        height: "100%",
        background: "white",
        left: "50%",
      });
      this.DOM.revealImg =
        this.DOM.revealInner.querySelector(".hover-reveal__img");
      charming(this.DOM.el);
      this.DOM.letters = [...this.DOM.el.querySelectorAll("span")];
      this.initEvents();
    }
    initEvents() {
      this.positionElement = ev => {
        const mousePos = getMousePos(ev);
        const docScrolls = {
          left: document.body.scrollLeft + document.documentElement.scrollLeft,
          top: document.body.scrollTop + document.documentElement.scrollTop,
        };
        this.DOM.reveal.style.top = `${mousePos.y + 20 - docScrolls.top}px`;
        this.DOM.reveal.style.left = `${mousePos.x + 20 - docScrolls.left}px`;
      };
      this.mouseenterFn = ev => {
        this.positionElement(ev);
        this.showImage();
        this.animateLetters();
      };
      this.mousemoveFn = ev =>
        requestAnimationFrame(() => {
          this.positionElement(ev);
        });
      this.mouseleaveFn = () => {
        this.hideImage();
      };

      this.DOM.el.addEventListener("mouseenter", this.mouseenterFn);
      this.DOM.el.addEventListener("mousemove", this.mousemoveFn);
      this.DOM.el.addEventListener("mouseleave", this.mouseleaveFn);
    }
    showImage() {
      TweenMax.killTweensOf(this.DOM.reveal);
      TweenMax.killTweensOf(this.DOM.revealInner);
      TweenMax.killTweensOf(this.DOM.revealImg);
      TweenMax.killTweensOf(this.DOM.revealDeco);

      this.tl = new TimelineMax({
        onStart: () => {
          this.DOM.reveal.style.opacity = 1;
          TweenMax.set(this.DOM.el, {zIndex: 10002});
        },
      })
        .add("begin")
        .set(this.DOM.revealInner, {y: "100%"})
        .set(this.DOM.revealDeco, {transformOrigin: "50% 100%"})
        .add(
          new TweenMax(this.DOM.revealDeco, 0.3, {
            ease: Sine.easeInOut,
            startAt: {scaleY: 0, scaleX: 10},
            scaleY: 1,
            scaleX: 1,
          }),
          "begin"
        )
        .set(this.DOM.revealDeco, {transformOrigin: "50% 0%"})
        .add(
          new TweenMax(this.DOM.revealDeco, 0.3, {
            ease: Expo.easeOut,
            scaleY: 0,
          }),
          "begin+=0.3"
        )
        .add(
          new TweenMax(this.DOM.revealInner, 0.5, {
            ease: Expo.easeOut,
            startAt: {y: "100%"},
            y: "0%",
          }),
          "begin+=0.4"
        )
        .add(
          new TweenMax(this.DOM.revealImg, 0.5, {
            ease: Expo.easeOut,
            startAt: {y: "-100%"},
            y: "0%",
          }),
          "begin+=0.4"
        )
        .add(
          new TweenMax(this.DOM.revealImg, 0.5, {
            ease: Expo.easeOut,
            startAt: {y: "100%"},
            y: "0%",
          }),
          "begin+=0.4"
        )
        .add(
          new TweenMax(this.DOM.reveal, 1.1, {
            ease: Expo.easeOut,
            startAt: {y: "50%", rotation: 10},
            y: "0%",
            rotation: 0,
          }),
          "begin"
        );
    }
    hideImage() {
      TweenMax.killTweensOf(this.DOM.reveal);
      TweenMax.killTweensOf(this.DOM.revealInner);
      TweenMax.killTweensOf(this.DOM.revealImg);
      TweenMax.killTweensOf(this.DOM.revealDeco);

      this.tl = new TimelineMax({
        onStart: () => {
          TweenMax.set(this.DOM.el, {zIndex: 10001});
        },
        onComplete: () => {
          TweenMax.set(this.DOM.el, {zIndex: ""});
          TweenMax.set(this.DOM.reveal, {opacity: 0});
        },
      })
        .add("begin")
        .add(
          new TweenMax(this.DOM.revealInner, 0.1, {
            ease: Sine.easeOut,
            y: "-100%",
          }),
          "begin"
        )
        .add(
          new TweenMax(this.DOM.revealImg, 0.1, {
            ease: Sine.easeOut,
            y: "100%",
          }),
          "begin"
        );
    }
    animateLetters() {
      TweenMax.killTweensOf(this.DOM.letters);
      TweenMax.set(this.DOM.letters, {opacity: 0});
      TweenMax.staggerTo(
        this.DOM.letters,
        0.1,
        {
          ease: Expo.easeOut,
          startAt: {y: "50%"},
          y: "0%",
          opacity: 1,
        },
        0.06
      );
    }
  }

  // Effect 22
  class HoverImgFx22 {
    constructor(el) {
      this.DOM = {el: el};
      this.DOM.reveal = document.createElement("div");
      this.DOM.reveal.className = "hover-reveal";
      this.DOM.reveal.innerHTML = `<div class="hover-reveal__img" style="background-image:url(${this.DOM.el.dataset.img})"></div>`;
      this.DOM.el.appendChild(this.DOM.reveal);
      this.DOM.revealImg = this.DOM.reveal.querySelector(".hover-reveal__img");

      this.initEvents();
    }
    initEvents() {
      this.positionElement = ev => {
        const mousePos = getMousePos(ev);
        const docScrolls = {
          left: document.body.scrollLeft + document.documentElement.scrollLeft,
          top: document.body.scrollTop + document.documentElement.scrollTop,
        };
        this.DOM.reveal.style.top = `${mousePos.y + -5 - docScrolls.top}px`;
        this.DOM.reveal.style.left = `${mousePos.x + -5 - docScrolls.left}px`;
      };
      this.mouseenterFn = ev => {
        this.positionElement(ev);
        this.showImage();
      };
      this.mousemoveFn = ev =>
        requestAnimationFrame(() => {
          this.positionElement(ev);
        });
      this.mouseleaveFn = () => {
        this.hideImage();
      };

      this.DOM.el.addEventListener("mouseenter", this.mouseenterFn);
      this.DOM.el.addEventListener("mousemove", this.mousemoveFn);
      this.DOM.el.addEventListener("mouseleave", this.mouseleaveFn);
    }
    showImage() {
      TweenMax.killTweensOf(this.DOM.revealImg);

      this.tl = new TimelineMax({
        onStart: () => {
          this.DOM.reveal.style.opacity = 1;
          TweenMax.set(this.DOM.el, {zIndex: 10002});
        },
      })
        .add("begin")
        .set(this.DOM.revealImg, {transformOrigin: "50% 95%", y: "20%"})
        .add(
          new TweenMax(this.DOM.revealImg, 0.2, {
            ease: Sine.easeOut,
            startAt: {scaleX: 0.5, scaleY: 1},
            scaleX: 1,
            scaleY: 0.9,
          }),
          "begin"
        )
        .add(
          new TweenMax(this.DOM.revealImg, 0.8, {
            ease: Expo.easeOut,
            startAt: {rotation: 5, y: "5%", opacity: 0},
            rotation: 0,
            y: "0%",
            opacity: 0.9,
          }),
          "begin"
        )
        .set(this.DOM.revealImg, {transformOrigin: "50% 0%"})
        .add(
          new TweenMax(this.DOM.revealImg, 0.5, {
            ease: Expo.easeOut,
            scaleX: 1,
            scaleY: 1,
            opacity: 0.9,
          }),
          "begin+=0.1"
        )
        .add(
          new TweenMax(this.DOM.revealImg, 0.6, {
            ease: Expo.easeOut,
            x: "0%",
          }),
          "begin+=0.1"
        );
    }
    hideImage() {
      TweenMax.killTweensOf(this.DOM.revealImg);

      this.tl = new TimelineMax({
        onStart: () => {
          TweenMax.set(this.DOM.el, {zIndex: 10001});
        },
        onComplete: () => {
          TweenMax.set(this.DOM.el, {zIndex: ""});
          TweenMax.set(this.DOM.reveal, {opacity: 0});
        },
      })
        .add("begin")
        .add(
          new TweenMax(this.DOM.revealImg, 0.2, {
            ease: Sine.easeOut,
            opacity: 0,
            x: "0%",
          }),
          "begin"
        );
    }
  }

  [...document.querySelectorAll('[data-fx="1"] > a, a[data-fx="1"]')].forEach(
    link => new HoverImgFx1(link)
  );
  [...document.querySelectorAll('[data-fx="2"] > a, a[data-fx="2"]')].forEach(
    link => new HoverImgFx2(link)
  );
  [...document.querySelectorAll('[data-fx="4"] > a, a[data-fx="4"]')].forEach(
    link => new HoverImgFx4(link)
  );
  [...document.querySelectorAll('[data-fx="11"] > a, a[data-fx="11"]')].forEach(
    link => new HoverImgFx4(link)
  );
  [...document.querySelectorAll('[data-fx="22"] > a, a[data-fx="22"]')].forEach(
    link => new HoverImgFx22(link)
  );

  // Demo purspose only: Preload all the images in the page..
  const contentel = document.querySelector("#index");
  [
    ...document.querySelectorAll(
      ".block__title, .block__link, .content__text-link"
    ),
  ].forEach(el => {
    const imgsArr = el.dataset.img.split(",");
    for (let i = 0, len = imgsArr.length; i <= len - 1; ++i) {
      const imgel = document.createElement("img");
      imgel.style.visibility = "hidden";
      imgel.style.position = "absolute";
      imgel.style.width = 0;

      imgel.src = imgsArr[i];
      imgel.className = "preload";
      contentel.appendChild(imgel);
    }
  });
  imagesLoaded(document.querySelectorAll(".preload"), () =>
    document.body.classList.remove("loading")
  );
}
