// main.js

import { createCube, createPyramid } from "./shapes.js";
import { updateBuffer, render } from "./render.js";
import {
  getModelViewMatrix,
  getProjectionMatrix,
  rotateRight,
  translateMatrix,
} from "./transform.js";

function main() {
  const canvas = document.getElementById("gl-canvas");
  const gl = canvas.getContext("webgl2");

  let vBuffer = gl.createBuffer();
  let cBuffer = gl.createBuffer();
  let positions = [];
  let colors = [];

  // Setup shaders, matrices, etc.
  let program = initShaders(gl, "vertex-shader", "fragment-shader");
  gl.useProgram(program);

  let modelViewMatrixLoc = gl.getUniformLocation(program, "uModelViewMatrix");
  let projectionMatrixLoc = gl.getUniformLocation(program, "uProjectionMatrix");

  // Example: create cube
  let cube = createCube();
  positions = cube.positions;
  colors = cube.colors;
  updateBuffer(gl, vBuffer, cBuffer, positions, colors);

  const eye = vec3(0.0, 0.0, 5.0);
  const at = vec3(0.0, 0.0, 0.0);
  const up = vec3(0.0, 1.0, 0.0);

  let posisiawal = translateMatrix(-6, 0.0, 0.0);
  let translationMatrix = translateMatrix(0.0, 0.0, 0.0);
  let rotatedMatrix = rotateRight(0);

  let modelViewMatrix = getModelViewMatrix(
    eye,
    at,
    up,
    posisiawal,
    translationMatrix,
    translateMatrix(0, 0, 0),
    rotatedMatrix
  );
  let projectionMatrix = getProjectionMatrix(
    60.0,
    canvas.width / canvas.height,
    0.2,
    10.0
  );

  gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
  gl.uniformMatrix4fv(projectionMatrixLoc, false, flatten(projectionMatrix));
}
