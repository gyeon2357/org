const PX_RATIO = window.devicePixelRatio;
/*
 * Reference: https://threejs.org/examples/?q=ascii#webgl_effects_ascii
 */
Math.map = (n, start, stop, start2, stop2) => {
  return ((n - start) / (stop - start)) * (stop2 - start2) + start2;
};

class AsciiFilter {
  constructor(renderer, args) {
    if (args === undefined) args = {};
    this.renderer = renderer;
    this.invert = args.invert || true;
    // container
    this.domElement = document.createElement("div");
    //
    this.pre = document.createElement("pre");
    this.domElement.appendChild(this.pre);
    // canvas
    this.canvas = document.createElement("canvas");
    this.context = this.canvas.getContext("2d");
    this.domElement.appendChild(this.canvas);
    this.deg = 0;
    this.setup();
    // Charset & font attributes
    this.fontSize = args.fontSize || 14;
    this.fontFamily = args.fontFamily || "'Courier New', Consolas, monospace";
    this.charset =
      args.charset ||
      " .'`^\",:;Il!i~+_-?][}{1)(|/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$";
    document.addEventListener("mousemove", (e) => this.onMouseMove(e), false);
  }

  setup() {
    this.domElement.style.position = "absolute";
    this.domElement.style.left = 0;
    this.domElement.style.top = 0;
    this.domElement.style.width = "640px";
    this.domElement.style.height = "640px";
    this.pre.style.fontSize = `${this.fontSize}px`;
    this.context.webkitImageSmoothingEnabled = false;
    this.context.mozImageSmoothingEnabled = false;
    this.context.msImageSmoothingEnabled = false;
    this.context.imageSmoothingEnabled = false;
  }

  get charWidth() {
    this.context.font = `${this.fontSize}px ${this.fontFamily}`;
    return this.context.measureText("A").width;
  }

  reset() {
    this.cols = ~~(
      this.width /
      (this.fontSize * (this.charWidth / this.fontSize))
    );
    this.rows = ~~(this.height / this.fontSize);

    this.canvas.width = this.cols;
    this.canvas.height = this.rows;

    this.pre.style.fontFamily = this.fontFamily;
    this.pre.style.fontSize = this.fontSize + "px";
  }

  setSize(_width = window.innerWidth, _height = window.innerHeight) {
    [this.width, this.height] = [_width, _height];
    this.renderer.setSize(_width, _height);
    this.reset();
    this.center = {
      x: this.width / 2,
      y: this.height / 2,
    };
    this.mouse = {
      x: this.width / 2,
      y: this.height / 2,
    };
  }

  render(scene, camera) {
    this.renderer.render(scene, camera);
    //
    const [w, h] = [this.canvas.width, this.canvas.height];
    this.context.clearRect(0, 0, w, h);
    this.context.drawImage(this.renderer.domElement, 0, 0, w, h);
    //
    this.asciify(this.context, w, h);

    this.hue();
  }

  onMouseMove(e) {
    this.mouse.x = e.clientX * PX_RATIO;
    this.mouse.y = e.clientY * PX_RATIO;
  }

  get dx() {
    return this.mouse.x - this.center.x;
  }

  get dy() {
    return this.mouse.y - this.center.y;
  }

  hue() {
    const deg = (Math.atan2(this.dy, this.dx) * 180) / Math.PI;
    this.deg += (deg - this.deg) * 0.075;
    this.domElement.style.filter = `hue-rotate(${this.deg.toFixed(1)}deg)`;
  }

  asciify(ctx, w, h) {
    const imgData = ctx.getImageData(0, 0, w, h).data;
    let str = "";
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const i = x * 4 + y * 4 * w;
        const [r, g, b, a] = [
          imgData[i],
          imgData[i + 1],
          imgData[i + 2],
          imgData[i + 3],
        ];
        let gray = (0.3 * r + 0.6 * g + 0.1 * b) / 255;
        if (a == 0) gray = 0.9;
        let char = ~~((1 - gray) * (this.charset.length - 1));
        if (this.invert) char = this.charset.length - char - 1;
        str += this.charset[char];
      }
      str += "\n";
    }
    this.pre.innerHTML = str;
  }
}

class CanvasTxt {
  constructor(txt, args) {
    if (args === undefined) args = {};
    this.canvas = document.createElement("canvas");
    this.context = this.canvas.getContext("2d");
    //
    this.fontSize = 200;
    this.lineHeight = this.fontSize * 0.88;
    this.fontFamily = args.fontFamily || "Arial, Helvetica, sans-serif";
    this.font = `600 ${this.fontSize}px ${this.fontFamily}`;
    this.color = args.color || "#fdf9f3";
    this.txt = txt || "Lorem Ipsum";
  }

  get texture() {
    return this.canvas;
  }

  resize() {
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  get width() {
    this.context.font = this.font;
    return ~~this.context.measureText(this.txt).width;
  }

  get metrics() {
    this.context.font = this.font;
    return this.context.measureText(this.txt);
  }

  get height() {
    return ~~(
      (this.metrics.actualBoundingBoxAscent +
        this.metrics.actualBoundingBoxDescent) *
      1.42
    );
  }

  render(t) {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.fillStyle = this.color;
    this.context.font = this.font;
    this.context.fillText(
      this.txt,
      0,
      this.metrics.actualBoundingBoxAscent * 1.2
    );
  }
}

class CanvAscii {
  constructor(_str) {
    this.str = _str || "11195";
    this.container = document.body;
    this.camera = new THREE.PerspectiveCamera(
      45,
      this.width / this.height,
      1,
      1000
    );
    this.camera.position.z = 50;
    this.scene = new THREE.Scene();
    // mesh
    this.setMesh();

    this.mouse = {
      x: 1,
      y: 1,
    };

    this.setRenderer();
    document.addEventListener("mousemove", (e) => this.onMouseMove(e), false);
    document.addEventListener("touchmove", (e) => this.onMouseMove(e), false);
  }

  load() {
    this.onWindowResize();
    this.animate();
  }

  setMesh() {
    this.text = new CanvasTxt(this.str);
    this.texture = new THREE.CanvasTexture(this.text.texture);
    this.texture.minFilter = THREE.NearestFilter;

    this.geometry = new THREE.PlaneGeometry(40, 10, 36, 36);
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.mesh);
  }

  get width() {
    return window.innerWidth;
  }

  get height() {
    return window.innerHeight;
  }

  onMouseMove(e) {
    if (e.touches) e = e.touches[0];
    this.mouse = {
      x: e.clientX,
      y: e.clientY,
    };
  }

  get material() {
    return new THREE.ShaderMaterial({
      vertexShader: document.getElementById("vertex").textContent,
      fragmentShader: document.getElementById("frag").textContent,
      transparent: true,
      uniforms: {
        uTime: {
          value: 0,
        },
        mouse: {
          value: 1.0,
        },
        uTexture: {
          value: this.texture,
        },
      },
    });
  }

  setRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: false,
    });
    this.renderer.setPixelRatio(1);
    //
    this.filter = new AsciiFilter(this.renderer, {
      fontFamily: "IBM Plex Mono",
      // charset: ' .¨`^,:;Il!-~+=*',
      blendMode: "hue",
      fontSize: 12,
      color: true,
    });
    // this.container.appendChild(this.renderer.domElement)
    this.container.appendChild(this.filter.domElement);
    window.addEventListener("resize", () => this.onWindowResize(), false);
    this.onWindowResize();
  }

  onWindowResize() {
    this.center = {
      x: this.width / 2,
      y: this.height / 2,
    };
    this.text.resize();

    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.width, this.height);
    this.filter.setSize(this.width, this.height);
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    this.render();
  }

  render() {
    let time = new Date().getTime() * 0.001;
    this.text.render(time);
    this.texture.needsUpdate = true;

    this.mesh.material.uniforms.mouse.value = this.text.dist;
    this.mesh.material.uniforms.uTime.value = Math.sin(time);
    this.updateRotation();

    this.camera.lookAt(this.scene.position);
    this.filter.render(this.scene, this.camera);
  }

  updateRotation() {
    let x = Math.map(this.mouse.y, 0, this.height, 0.5, -0.5);
    let y = Math.map(this.mouse.x, 0, this.width, -0.5, 0.5);
    this.mesh.rotation.x += (x - this.mesh.rotation.x) * 0.05;
    this.mesh.rotation.y += (y - this.mesh.rotation.y) * 0.05;
  }
}

const _asciiText = new CanvAscii("11195.org");
window.onload = () => _asciiText.load();
