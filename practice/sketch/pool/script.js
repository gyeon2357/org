const maxDrops = 20;
const shadersSource = {
  simple: {
    vertex: {
      type: "VERTEX_SHADER",
      source: `
				attribute vec2 position;
				attribute vec2 texCoord;
				uniform vec2 resolution;
				varying vec2 texCoordV;
				void main() {
					gl_Position = vec4(((position / resolution) * 2.0 - 1.0) * vec2(1, -1), 0, 1);
					texCoordV = texCoord;
				}`,
    },
    fragment: {
      type: "FRAGMENT_SHADER",
      source: `
				precision mediump float;
				uniform sampler2D texture0;
				uniform float amount;
				uniform float time;
				uniform vec3 drops[${maxDrops}]; // x,y are pos z is age
				uniform float aspect;
				varying vec2 texCoordV;

				vec2 offset;
				float dist;
				float wave;
				vec2 surf;
				vec2 dir;
				vec2 txC;
				float w;
				float cau;

				void main() {
					txC = texCoordV * vec2(1.0, aspect);
					cau = distance(vec2(-1.0, -1.0), txC) * 20.0 + time;
					surf = vec2(sin(cau), cos(cau)) * 0.01;
					cau = distance(vec2(1.0, 1.0), txC) * 30.0 + time;
					surf += vec2(sin(cau), cos(cau)) * 0.02;
					for(int i = 0; i < ${maxDrops}; i+= 1){
						if(drops[i].z > -90.0){
							dir = drops[i].xy - txC;
							dist = length(dir);
							dir = normalize(dir);
							w = cos((4.0 / (1.0 + pow(2.0, dist * 50.0 - drops[i].z))) * ${(
                Math.PI * 2
              ).toFixed(6)}) * -0.5 + 0.5;
							wave = w * pow(2.0, -dist * 8.0);
							surf += dir * wave;
						}
					}
					offset = texCoordV + surf * amount;
					vec3 tx = vec3(texCoordV, 0.0);
					vec3 norm = normalize(vec3(surf, 1.0));
					vec3 toLight = normalize(vec3(0.0, -0.0, 1.0) - tx);
					vec3 toCamera = normalize(vec3(0.0, 0.0, 1.0) - tx);
					vec3 lRef = normalize(2.0 * dot(norm, toLight) * norm - toLight);
					float spec = dot(lRef, toCamera) * 2.0;
					spec = clamp(spec, 0.0, 1.3) - 0.6;
					spec = pow(spec, 8.0) * 4.0;           
					vec4 col = texture2D(texture0, offset);
					col.xyz = col.xyz + spec;
					gl_FragColor = col;
				}`,
    },
  },
};

// boiler plate
const U = undefined;
const doFor = (count, callback) => {
  var i = 0;
  while (i < count && callback(i++) !== true);
}; // the ; after while loop is important don't remove
const eachOf = (array, callback) => {
  var i = 0;
  const len = array.length;
  while (i < len && callback(array[i], i++, len) !== true);
};
const randI = (min, max = min + (min = 0)) =>
  (Math.random() * (max - min) + min) | 0;
const rand = (min, max = min + (min = 0)) => Math.random() * (max - min) + min;
const odds = (val) => Math.random() < val;
const clamp = (v, min = 1, max = min + (min = 0)) =>
  v < min ? min : v > max ? max : v;
const hsla = (h, s = h.s, l = h.l, a = ((a = h.a), (h = h.h), a)) =>
  a === U
    ? `hsl(${h | 0},${s | 0}%,${l | 0}%)`
    : `hsla(${h | 0},${s | 0}%,${l | 0}%,${a})`;
const rgba = (r, g = r.g, b = r.b, a = ((a = r.a), (r = r.r), a)) =>
  a === U
    ? `rgb(${r | 0},${g | 0},${b | 0})`
    : `rgba(${r | 0},${g | 0},${b | 0},${a})`;
const str2Hex = (str, i, l = 2) => parseInt(str.substr(i, l), 16);
const RGBA = { r: 0, g: 0, b: 0, a: U };
const HSLA = { h: 0, s: 0, l: 0, a: U };
const hex2rgb = (hex, rgb = {}) => {
  if (hex.length >= 7) {
    rgb.r = str2Hex(hex, 1);
    rgb.g = str2Hex(hex, 3);
    rgb.b = str2Hex(hex, 5);
    if (hex.length === 7) {
      return rgb;
    }
    rgb.a = str2Hex(hex, 7) / 255;
    return rgb;
  }
  rgb.r = str2Hex(hex, 1, 1);
  rgb.g = str2Hex(hex, 2, 1);
  rgb.b = str2Hex(hex, 3, 1);
  if (hex.length === 4) {
    return rgb;
  }
  rgb.a = str2Hex(hex, 4, 1) / 15;
  return rgb;
};
function createGradient(ctx, type, x, y, xx, yy, colours) {
  var i, g, c;
  const len = colours.length;
  if (type[0].toLowerCase() === "l") {
    g = ctx.createLinearGradient(x, y, xx, yy);
  } else {
    g = ctx.createRadialGradient(x, y, xx, x, y, yy);
  }
  eachOf(colours, (col, i, len) => {
    if (col) {
      g.addColorStop(Math.min(1, i / (len - 1)), col);
    }
  });
  return g;
}
function createCanvas() {
  var c, cs;
  cs = (c = document.createElement("canvas")).style;
  cs.position = "absolute";
  cs.top = cs.left = "0px";
  c.ctx = c.getContext("2d");
  document.body.appendChild(c);
  return c;
}
function resizeCanvas() {
  ch = (h = canvas.height = innerHeight) / 2;
  cw = (w = canvas.width = innerWidth) / 2;
}
function createMouse() {
  function preventDefault(e) {
    e.preventDefault();
  }
  const mouse = { x: 0, y: 0, buttonRaw: 0 };
  const bm = [1, 2, 4, 6, 5, 3]; // bit masks for mouse buttons
  const mouseEvents = "mousemove,mousedown,mouseup".split(",");
  const m = mouse;
  function mouseMove(e) {
    m.bounds = m.element.getBoundingClientRect();
    m.x = e.pageX - m.bounds.left - scrollX;
    m.y = e.pageY - m.bounds.top - scrollX;
    if (e.type === "mousedown") {
      m.buttonRaw |= bm[e.which - 1];
    } else if (e.type === "mouseup") {
      m.buttonRaw &= bm[e.which + 2];
    }
    e.preventDefault();
  }
  m.start = function (element, blockContextMenu) {
    m.element = element;
    mouseEvents.forEach((n) => document.addEventListener(n, mouseMove));
    if (blockContextMenu === true) {
      document.addEventListener("contextmenu", preventDefault, false);
    }
    return m;
  };
  return m;
}
function update(timer) {
  // Main update loop
  globalTime = timer + 120000;
  if (w !== innerWidth || h !== innerHeight) {
    resizeCanvas();
  }
  display(); // call demo code
  requestAnimationFrame(update);
}
/* From groover JS_GL beta */
function createProgram(gl, pname) {
  const getLocs = (type, source) => {
    var lines = source.split(type);
    lines.shift();
    lines.forEach((str) =>
      locs[type + "s"].push(str.split(";")[0].split(" ").pop().split("[")[0])
    );
  };
  const shaders = [];
  const locs = { uniforms: [], attributes: [] };
  [shadersSource[pname].vertex, shadersSource[pname].fragment].forEach(
    (script) => {
      var shader = gl.createShader(gl[script.type]);
      gl.shaderSource(shader, script.source);
      gl.compileShader(shader);
      shaders.push(shader);
      getLocs("uniform", script.source);
      getLocs("attribute", script.source);
    }
  );
  var program = gl.createProgram();
  shaders.forEach((shader) => gl.attachShader(program, shader));
  gl.linkProgram(program);
  program.locations = {};
  locs.uniforms.forEach(
    (uname) =>
      (program.locations[uname] = gl.getUniformLocation(program, uname))
  );
  locs.attributes.forEach(
    (uname) => (program.locations[uname] = gl.getAttribLocation(program, uname))
  );
  if (gl.programs === undefined) {
    gl.programs = {};
  } // please don use gl.programs = gl.programs || {}
  gl.programs[pname] = program;
  return program;
}
function createTexture(gl, image, settings) {
  settings = Object.assign(
    { wrap: "CLAMP_TO_EDGE", filter: "LINEAR", textureNum: 1 },
    settings
  );
  const texture = gl.createTexture();
  const tn = settings.textureNum;
  if (tn) {
    gl.activeTexture(gl.TEXTURE0 + tn);
    if (gl.currentProgram.locations["texture" + tn]) {
      gl.uniform1i(gl.currentProgram.locations["texture" + tn], tn);
    }
  }
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(
    gl.TEXTURE_2D,
    gl.TEXTURE_WRAP_S,
    settings.wrap ? gl[settings.wrap] : gl[settings.wrapS]
  );
  gl.texParameteri(
    gl.TEXTURE_2D,
    gl.TEXTURE_WRAP_T,
    settings.wrap ? gl[settings.wrap] : gl[settings.wrapT]
  );
  gl.texParameteri(
    gl.TEXTURE_2D,
    gl.TEXTURE_MIN_FILTER,
    settings.filter ? gl[settings.filter] : gl[settings.filterMin]
  );
  gl.texParameteri(
    gl.TEXTURE_2D,
    gl.TEXTURE_MAG_FILTER,
    settings.filter ? gl[settings.filter] : gl[settings.filterMag]
  );
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
  return texture;
}
function setVertexBuffer(gl, settings) {
  settings = Object.assign({ type: "FLOAT", size: 2 }, settings);
  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, settings.data, gl.STATIC_DRAW);
  gl.enableVertexAttribArray(gl.currentProgram.locations[settings.name]);
  gl.vertexAttribPointer(
    gl.currentProgram.locations[settings.name],
    settings.size,
    gl[settings.type],
    false,
    0,
    0
  );
}
/* end groover JS_GL beta */

//========================================================================================================
// Demo code starts here
// globals w = width, h = height, t = top,  l = left, cw = center width, ch = center height, ctx = context
var w,
  h,
  t,
  l,
  cw,
  ch,
  ctx,
  globalTime = 0;
var webGL;

const aspect = 250 / 1500;

var drops = new Float32Array(3 * maxDrops);
doFor(maxDrops, (i) => {
  i *= 3;
  drops[i++] = Math.random();
  drops[i++] = Math.random();
  drops[i] = -100;
});
var currentDrop = 0;
drops[0] = 0.5;
drops[1] = 0.5;
drops[2] = -2;

var pool = document.createElement("canvas");
const c = (pool.ctx = pool.getContext("2d"));

const iw = (pool.width = 1024);
const ih = (pool.height = 512);
const canvas = createCanvas();
ctx = canvas.ctx;

c.fillStyle = "#09F";
c.fillRect(0, 0, iw, ih);
const tile = 80;
const tileCol = "#abc,#CDE,#26D,#18D".split(",");
const tileInset = 2;
for (var y = -tile / 2; y < ih; y += tile) {
  for (var x = -tile / 2; x < iw; x += tile) {
    for (var z = 0; z < tileCol.length; z += 1) {
      c.fillStyle = tileCol[z];
      const ti = tileInset * z;
      c.fillRect(x + ti, y + ti, tile - ti * 2, tile - ti * 2);
    }
  }
}
c.font = "36px Arial";
c.textAlign = "center";
c.textBaseline = "middle";
c.shadowOffsetX = pool.ctx.shadowOffsetY = 5;
c.shadowBlur = 5;
c.shadowColor = "rgba(0,0,0,0.5)";
c.lineJoin = "round";
c.lineWidth = 32;
c.strokeStyle = "Blue";
c.fillStyle = "black";
c.strokeText("", iw / 2, 128);
c.lineWidth = 16;
c.strokeStyle = "white";
c.font = "36px Arial";
c.strokeText("", iw / 2, 128);
c.fillText("", iw / 2, 128);
c.fillStyle = "white";
c.lineWidth = 2;
c.strokeStyle = "black";
c.font = "24px Arial  black";
c.strokeText("splash in the water", iw / 2, ih - 76);
c.fillText("splash in the water", iw / 2, ih - 76);
c.fillStyle = "#0F8";
c.font = "32px Arial black";
// c.fillText("Click mouse button to add ripples",iw / 2,ih - 136);

resizeCanvas();
const mouse = createMouse().start(canvas, true);
startWebGL([{ image: pool, wrap: "MIRRORED_REPEAT" }]);
requestAnimationFrame(update);

function display() {
  ctx.setTransform(1, 0, 0, 1, 0, 0); // reset transform
  ctx.globalAlpha = 1; // reset alpha
  ctx.clearRect(0, 0, w, h);
  if (webGL !== undefined) {
    webGLRender();
  }
}

function startWebGL(images, width, height) {
  webGL = document.createElement("canvas");
  const w = (webGL.width = width ? width : images[0].image.width);
  const h = (webGL.height = height ? height : images[0].image.height);
  webGL.gl = webGL.getContext("webgl");
  const gl = webGL.gl;
  const program = createProgram(gl, "simple");
  gl.useProgram(program);
  gl.currentProgram = program;
  setVertexBuffer(gl, {
    name: "texCoord",
    data: new Float32Array([
      0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0,
    ]),
  });
  setVertexBuffer(gl, {
    name: "position",
    data: new Float32Array([0, 0, w, 0, 0, h, 0, h, w, 0, w, h]),
  });
  eachOf(images, (imageDesc, i) =>
    createTexture(
      gl,
      imageDesc.image,
      Object.assign({ textureNum: i }, imageDesc)
    )
  );
  gl.uniform2f(program.locations.resolution, w, h);
}

function webGLRender() {
  var gl = webGL.gl;
  if (mouse.buttonRaw !== 0) {
    mouse.buttonRaw = 0;
    var x = mouse.x / canvas.width;
    var y = mouse.y / canvas.height;
    var ind = (currentDrop++ % maxDrops) * 3;
    drops[ind] = x;
    drops[ind + 1] = y * ((h / w) * 2);
    drops[ind + 2] = -2;
  }
  // animate drops
  for (var i = 0; i < maxDrops; i++) {
    if (drops[i * 3 + 2] > -90) {
      drops[i * 3 + 2] += 0.1;
      if (drops[i * 3 + 2] > 50) {
        drops[i * 3 + 2] = -100;
      }
    }
  }
  const loc = gl.currentProgram.locations;
  gl.uniform1f(loc.aspect, (h / w) * 2);
  gl.uniform1f(loc.amount, 0.1);
  gl.uniform1f(loc.time, globalTime / 1000);
  gl.uniform3fv(loc.drops, drops);
  gl.drawArrays(gl.TRIANGLES, 0, 6);
  ctx.drawImage(webGL, 0, 0, canvas.width, canvas.height);
}
