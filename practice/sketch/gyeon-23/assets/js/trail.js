/**
 * Linear interpolation
 * @param {Number} a - first value to interpolate
 * @param {Number} b - second value to interpolate
 * @param {Number} n - amount to interpolate
 */
const lerp = (a, b, n) => (1 - n) * a + n * b;

/**
 * Gets the cursor position
 * @param {Event} ev - mousemove event
 */
const getCursorPos = ev => {
  return {
    x: ev.clientX,
    y: ev.clientY,
  };
};

/**
 * Map number x from range [a, b] to [c, d]
 */
const map = (x, a, b, c, d) => ((x - a) * (d - c)) / (b - a) + c;

/**
 * Calculates the viewport size
 */
const calcWinsize = () => {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
};


let winsize = calcWinsize();
window.addEventListener("resize", () => (winsize = calcWinsize()));
let cursor = {x: winsize.width / 2, y: winsize.height / 2};
window.addEventListener("mousemove", ev => (cursor = getCursorPos(ev)));

/**
 * Class representing an element that follows the cursor
 * and shows a set of image elements following along,
 * each one with different delays.
 */
class ImageTrailEffect {
  
  DOM = {
    el: null,
    trailElems: null,
  };

  bgImage;

  defaults = {
    perspective: false,
    totalTrailElements: 5,
    valuesFromTo: {
      x: [-90, 90],
      y: [-90, 90],
      rx: [0, 0],
      ry: [0, 0],
      rz: [0, 0],
    },
    // Use different opacities for the inner images
    opacityChange: false,
    // The "amt" is the amount to interpolate.
    // With interpolation, we can achieve a smooth animation effect when moving the cursor.
    // this is the amt value for the trail image that is on top of the stack. (the one with higher opacity)
    amt: pos => 0.02 * pos + 0.05,
    // We can also pass amtMain to override the default value for the image on top of the stack (by default it is the one with the highest amt value, meaning it's the fastest one moving)
    // amtMain deafults to: amt(totalTrailElements - 1)
  };
  // Array to store the transform values for each image element
  imgTransforms = [];

  /**
   * Constructor.
   * @param {Element} DOM_el - the .trail element
   */
  constructor(DOM_el, options) {
    this.DOM.el = DOM_el;
    this.options = Object.assign(this.defaults, options);
 
    this.layout();

    this.imgTransforms = [...new Array(this.options.totalTrailElements)].map(
      () => ({x: 0, y: 0, rx: 0, ry: 0, rz: 0})
    );

    requestAnimationFrame(() => this.render());
  }
  /**
   * Creates the HTML markup for the image trail elements
   */
  layout() {

    this.bgImage = /(?:\(['"]?)(.*?)(?:['"]?\))/.exec(
      this.DOM.el.style.backgroundImage
    )[1];


    this.DOM.el.style.backgroundImage = "none";

    let innerHTML = "";
    for (let i = 0; i <= this.options.totalTrailElements - 1; ++i) {
      const opacityVal =
        i === this.options.totalTrailElements - 1
          ? 1
          : (1 / this.options.totalTrailElements) * i +
            1 / this.options.totalTrailElements;
      innerHTML += `<img class="trail__img" src="${
        this.bgImage
      }" style="opacity: ${this.options.opacityChange ? opacityVal : 1}"/>`;
    }
    // Append to the main element
    this.DOM.el.innerHTML = innerHTML;

    // Get inner .trail__img elements
    this.DOM.trailElems = this.DOM.el.querySelectorAll(".trail__img");

    // 3d
    if (this.options.perspective) {
      this.DOM.el.style.perspective = `${this.options.perspective}px`;
    }
  }
  /**
   * Loop / Interpolation
   */
  render() {
    for (let i = 0; i <= this.options.totalTrailElements - 1; ++i) {
      let amt =
        i < this.options.totalTrailElements - 1
          ? this.options.amt(i)
          : this.options.amtMain
          ? this.options.amtMain
          : this.options.amt(this.options.totalTrailElements - 1);

      // Apply interpolated values (smooth effect)
      this.imgTransforms[i].x = lerp(
        this.imgTransforms[i].x,
        map(
          cursor.x,
          0,
          winsize.width,
          this.options.valuesFromTo.x[0],
          this.options.valuesFromTo.x[1]
        ),
        amt
      );
      this.imgTransforms[i].y = lerp(
        this.imgTransforms[i].y,
        map(
          cursor.y,
          0,
          winsize.height,
          this.options.valuesFromTo.y[0],
          this.options.valuesFromTo.y[1]
        ),
        amt
      );

      this.imgTransforms[i].rz = lerp(
        this.imgTransforms[i].rz,
        map(
          cursor.x,
          0,
          winsize.width,
          this.options.valuesFromTo.rz[0],
          this.options.valuesFromTo.rz[1]
        ),
        amt
      );
      this.imgTransforms[i].rx = !this.options.perspective
        ? 0
        : lerp(
            this.imgTransforms[i].rx,
            map(
              cursor.y,
              0,
              winsize.height,
              this.options.valuesFromTo.rx[0],
              this.options.valuesFromTo.rx[1]
            ),
            amt
          );
      this.imgTransforms[i].ry = !this.options.perspective
        ? 0
        : lerp(
            this.imgTransforms[i].ry,
            map(
              cursor.x,
              0,
              winsize.width,
              this.options.valuesFromTo.ry[0],
              this.options.valuesFromTo.ry[1]
            ),
            amt
          );

      this.DOM.trailElems[
        i
      ].style.transform = `translateX(${this.imgTransforms[i].x}px) translateY(${this.imgTransforms[i].y}px) rotateX(${this.imgTransforms[i].rx}deg) rotateY(${this.imgTransforms[i].ry}deg) rotateZ(${this.imgTransforms[i].rz}deg)`;
    }


    requestAnimationFrame(() => this.render());
  }
}

new ImageTrailEffect(document.querySelector(".trail-0"), {
   totalTrailElements: 6,
  valuesFromTo: {
    x: [-15, 15],
    y: [-15, 15],
    rx: [0, 0],
    ry: [0, 0],
    rz: [0, 0],
  },
  opacityChange: true,
});
new ImageTrailEffect(document.querySelector(".trail-1"), {
   totalTrailElements: 4,
  valuesFromTo: {
    x: [-30, 30],
    y: [-30, 30],
    rx: [0, 0],
    ry: [0, 0],
    rz: [0, 0],
  },
  opacityChange: true,
});
new ImageTrailEffect(document.querySelector(".trail-2"), {
  totalTrailElements: 4,
  valuesFromTo: {
    x: [-30, 30],
    y: [-30, 30],
    rx: [0, 0],
    ry: [0, 0],
    rz: [0, 0],
  },
  opacityChange: true,
});
new ImageTrailEffect(document.querySelector(".trail-3"), {
  totalTrailElements: 4,
  valuesFromTo: {
    x: [-30, 30],
    y: [-30, 30],
    rx: [0, 0],
    ry: [0, 0],
    rz: [0, 0],
  },
  opacityChange: true,
});
new ImageTrailEffect(document.querySelector(".trail-4"), {
  totalTrailElements: 4,
  valuesFromTo: {
    x: [-30, 30],
    y: [-30, 30],
    rx: [0, 0],
    ry: [0, 0],
    rz: [0, 0],
  },
  opacityChange: true,
});
new ImageTrailEffect(document.querySelector(".trail-5"), {
  totalTrailElements: 4,
  valuesFromTo: {
    x: [-30, 30],
    y: [-30, 30],
    rx: [0, 0],
    ry: [0, 0],
    rz: [0, 0],
  },
  opacityChange: true,
});
new ImageTrailEffect(document.querySelector(".trail-6"), {
  totalTrailElements: 4,
  valuesFromTo: {
    x: [-30, 30],
    y: [-30, 30],
    rx: [0, 0],
    ry: [0, 0],
    rz: [0, 0],
  },
  opacityChange: true,
});
new ImageTrailEffect(document.querySelector(".trail-7"), {
  totalTrailElements: 4,
  valuesFromTo: {
    x: [-30, 30],
    y: [-30, 30],
    rx: [0, 0],
    ry: [0, 0],
    rz: [0, 0],
  },
  opacityChange: true,
});
new ImageTrailEffect(document.querySelector(".trail-8"), {
  totalTrailElements: 4,
  valuesFromTo: {
    x: [-30, 30],
    y: [-30, 30],
    rx: [0, 0],
    ry: [0, 0],
    rz: [0, 0],
  },
  opacityChange: true,
});
new ImageTrailEffect(document.querySelector(".trail-9"), {
  totalTrailElements: 4,
  valuesFromTo: {
    x: [-30, 30],
    y: [-30, 30],
    rx: [0, 0],
    ry: [0, 0],
    rz: [0, 0],
  },
  opacityChange: true,
});
new ImageTrailEffect(document.querySelector(".trail-10"), {
  totalTrailElements: 4,
  valuesFromTo: {
    x: [-30, 30],
    y: [-30, 30],
    rx: [0, 0],
    ry: [0, 0],
    rz: [0, 0],
  },
  opacityChange: true,
});
new ImageTrailEffect(document.querySelector(".trail-11"), {
  totalTrailElements: 4,
  valuesFromTo: {
    x: [-30, 30],
    y: [-30, 30],
    rx: [0, 0],
    ry: [0, 0],
    rz: [0, 0],
  },
  opacityChange: true,
});
new ImageTrailEffect(document.querySelector(".trail-12"), {
  totalTrailElements: 4,
  valuesFromTo: {
    x: [-30, 30],
    y: [-30, 30],
    rx: [0, 0],
    ry: [0, 0],
    rz: [0, 0],
  },
  opacityChange: true,
});
new ImageTrailEffect(document.querySelector(".trail-13"), {
  totalTrailElements: 4,
  valuesFromTo: {
    x: [-30, 30],
    y: [-30, 30],
    rx: [0, 0],
    ry: [0, 0],
    rz: [0, 0],
  },
  opacityChange: true,
});
new ImageTrailEffect(document.querySelector(".trail-14"), {
  totalTrailElements: 4,
  valuesFromTo: {
    x: [-30, 30],
    y: [-30, 30],
    rx: [0, 0],
    ry: [0, 0],
    rz: [0, 0],
  },
  opacityChange: true,
});
new ImageTrailEffect(document.querySelector(".trail-15"), {
  totalTrailElements: 4,
  valuesFromTo: {
    x: [-30, 30],
    y: [-30, 30],
    rx: [0, 0],
    ry: [0, 0],
    rz: [0, 0],
  },
  opacityChange: true,
});
new ImageTrailEffect(document.querySelector(".trail-16"), {
  totalTrailElements: 4,
  valuesFromTo: {
    x: [-30, 30],
    y: [-30, 30],
    rx: [0, 0],
    ry: [0, 0],
    rz: [0, 0],
  },
  opacityChange: true,
});
new ImageTrailEffect(document.querySelector(".trail-17"), {
  totalTrailElements: 4,
  valuesFromTo: {
    x: [-30, 30],
    y: [-30, 30],
    rx: [0, 0],
    ry: [0, 0],
    rz: [0, 0],
  },
  opacityChange: true,
});
new ImageTrailEffect(document.querySelector(".trail-18"), {
  totalTrailElements: 4,
  valuesFromTo: {
    x: [-30, 30],
    y: [-30, 30],
    rx: [0, 0],
    ry: [0, 0],
    rz: [0, 0],
  },
  opacityChange: true,
});
new ImageTrailEffect(document.querySelector(".trail-19"), {
  totalTrailElements: 4,
  valuesFromTo: {
    x: [-30, 30],
    y: [-30, 30],
    rx: [0, 0],
    ry: [0, 0],
    rz: [0, 0],
  },
  opacityChange: true,
});

// new ImageTrailEffect(document.querySelector(".trail").forEach, {});
