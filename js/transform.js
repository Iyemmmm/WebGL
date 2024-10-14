// transform.js

export function getModelViewMatrix(
  eye,
  at,
  up,
  posisiawal,
  translationMatrix,
  parabolicMatrix,
  rotatedMatrix
) {
  let modelViewMatrix = lookAt(eye, at, up);
  modelViewMatrix = mult(modelViewMatrix, posisiawal);
  modelViewMatrix = mult(modelViewMatrix, parabolicMatrix);
  modelViewMatrix = mult(modelViewMatrix, translationMatrix);
  return mult(modelViewMatrix, rotatedMatrix);
}

export function getProjectionMatrix(fovy, aspect, near, far) {
  return perspective(fovy, aspect, near, far);
}

export function rotateRight(angle) {
  return rotate(angle, [0, 0, 1]);
}

export function translateMatrix(tx, ty, tz) {
  return translate(tx, ty, tz);
}
