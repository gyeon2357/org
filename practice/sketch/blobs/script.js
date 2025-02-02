import GUI from "https://cdn.jsdelivr.net/npm/lil-gui@0.18.2/+esm";

const canvasEl = document.getElementsByTagName("canvas")[0];
const devicePixelRatio = Math.min(window.devicePixelRatio, 2);

const params = {
  pointerMultiplier: 0.09,
  pointerPower: 0.35,
  deltaThreshold: 0.1,
  pointerFadeSpeed: 0.75,
  speedTextureFadeSpeed: 0.8,
};

const pointer = {
  x: 0,
  y: 0,
  moving: 0,
  dx: 0,
  dy: 0,
  dxTarget: 0,
  dyTarget: 0,
};
setupEvents();

const inputImageCanvasEl = document.createElement("canvas");
let inputImageTexture;

const vsSource = document.getElementById("vertShader").innerHTML;
const fsSpeedSource = document.getElementById("fragShaderSpeed").innerHTML;
const fsOutputSource = document.getElementById("fragShaderOutput").innerHTML;

const gl = canvasEl.getContext("webgl");
gl.getExtension("OES_texture_float");

const vertexShader = createShader(gl, vsSource, gl.VERTEX_SHADER);
const fragmentSpeedShader = createShader(gl, fsSpeedSource, gl.FRAGMENT_SHADER);
const fragmentOutputShader = createShader(
  gl,
  fsOutputSource,
  gl.FRAGMENT_SHADER
);

const speedShaderProgram = createShaderProgram(
  gl,
  vertexShader,
  fragmentSpeedShader
);
const speedShaderUniforms = getUniforms(speedShaderProgram);
const outputShaderProgram = createShaderProgram(
  gl,
  vertexShader,
  fragmentOutputShader
);
const outputShaderUniforms = getUniforms(outputShaderProgram);

let velocity = createDoubleFBO(canvasEl.width, canvasEl.height);

uploadImageTexture();
// createControls();

render();
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function createShaderProgram(gl, vertexShader, fragmentShader) {
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error(
      "Unable to initialize the shader program: " +
        gl.getProgramInfoLog(program)
    );
    return null;
  }

  return program;
}

function getUniforms(program) {
  let uniforms = [];
  let uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
  for (let i = 0; i < uniformCount; i++) {
    let uniformName = gl.getActiveUniform(program, i).name;
    uniforms[uniformName] = gl.getUniformLocation(program, uniformName);
  }
  return uniforms;
}

function createShader(gl, sourceCode, type) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, sourceCode);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(
      "An error occurred compiling the shaders: " + gl.getShaderInfoLog(shader)
    );
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

function blit(target) {
  const vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]),
    gl.STATIC_DRAW
  );
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(
    gl.ELEMENT_ARRAY_BUFFER,
    new Uint16Array([0, 1, 2, 0, 2, 3]),
    gl.STATIC_DRAW
  );
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(0);

  if (target == null) {
    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  } else {
    gl.viewport(0, 0, target.w, target.h);
    gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
  }
  gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);

  gl.uniform1f(
    outputShaderUniforms.u_pointer_multiplier,
    params.pointerMultiplier
  );
}

function createFBO(w, h) {
  gl.activeTexture(gl.TEXTURE0);

  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, gl.FLOAT, null);

  const fbo = gl.createFramebuffer();
  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
  gl.framebufferTexture2D(
    gl.FRAMEBUFFER,
    gl.COLOR_ATTACHMENT0,
    gl.TEXTURE_2D,
    texture,
    0
  );
  gl.viewport(0, 0, w, h);
  gl.clearColor(0.0, 0.0, 0.0, 0.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  return { fbo, texture, w, h };
}

function createDoubleFBO(w, h) {
  let fbo1 = createFBO(w, h);
  let fbo2 = createFBO(w, h);

  return {
    read: () => {
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, fbo1.texture);
      return fbo1;
    },
    write: () => fbo2,
    swap() {
      let temp = fbo1;
      fbo1 = fbo2;
      fbo2 = temp;
    },
  };
}

function render() {
  const currentTime = performance.now();
  gl.uniform1f(outputShaderUniforms.u_time, currentTime);

  pointer.dx += (pointer.dxTarget - pointer.dx) * params.deltaThreshold;
  pointer.dy += (pointer.dyTarget - pointer.dy) * params.deltaThreshold;
  pointer.moving *= params.pointerFadeSpeed;
  if (pointer.moving < 0.05) pointer.moving = 0;

  gl.useProgram(speedShaderProgram);
  gl.uniform1i(speedShaderUniforms.u_prev_frame_texture, velocity.read());
  gl.uniform2f(
    speedShaderUniforms.u_pointer_position,
    pointer.x / window.innerWidth,
    1 - pointer.y / window.innerHeight
  );
  gl.uniform1f(speedShaderUniforms.u_pointer_power, pointer.moving);
  gl.uniform2f(speedShaderUniforms.u_delta_xy, pointer.dx, pointer.dy);
  gl.uniform1f(speedShaderUniforms.u_ratio, canvasEl.width / canvasEl.height);
  gl.uniform1f(speedShaderUniforms.u_speed_fade, params.speedTextureFadeSpeed);

  blit(velocity.write());
  velocity.swap();

  gl.useProgram(outputShaderProgram);
  gl.uniform1i(outputShaderUniforms.u_speed_texture, velocity.read());
  gl.uniform1f(outputShaderUniforms.u_ratio, canvasEl.width / canvasEl.height);

  blit();

  requestAnimationFrame(render);
}

function uploadImageTexture() {
  const image = new Image();
  image.src = "./bw-text.png";
  image.onload = () => {
    inputImageTexture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, inputImageTexture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      inputImageCanvasEl
    );

    gl.uniform1f(
      outputShaderUniforms.u_img_ratio,
      image.naturalWidth / image.naturalHeight
    );
    gl.uniform1i(outputShaderUniforms.u_image_texture, 2);

    gl.activeTexture(gl.TEXTURE0 + 2);
    gl.bindTexture(gl.TEXTURE_2D, inputImageTexture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
  };
}

function resizeCanvas() {
  canvasEl.width = window.innerWidth * devicePixelRatio;
  canvasEl.height = window.innerHeight * devicePixelRatio;
  velocity = createDoubleFBO(canvasEl.width, canvasEl.height);
}

function setupEvents() {
  window.addEventListener("pointermove", (e) => {
    updateMousePosition(e.pageX, e.pageY);
  });
  window.addEventListener("touchmove", (e) => {
    updateMousePosition(e.targetTouches[0].pageX, e.targetTouches[0].pageY);
  });
  window.addEventListener("click", (e) => {
    updateMousePosition(e.pageX, e.pageY);
  });

  function updateMousePosition(eX, eY) {
    pointer.dxTarget = eX - pointer.x;
    pointer.dyTarget = eY - pointer.y;

    pointer.dxTarget =
      Math.sign(pointer.dxTarget) *
      Math.pow(Math.abs(pointer.dxTarget), params.pointerPower);
    pointer.dyTarget =
      Math.sign(pointer.dyTarget) *
      Math.pow(Math.abs(pointer.dyTarget), params.pointerPower);

    pointer.x = eX;
    pointer.y = eY;

    pointer.moving = 1;
  }
}

// function createControls() {
//     const gui = new GUI();
//     gui
//         .add(params, "pointerMultiplier", 0, .3)
//         .onChange(() => {
//             gl.uniform1f(outputShaderUniforms.u_pointer_multiplier, params.pointerMultiplier);
//         })
//         .name("cursor disturbing power")

// }
