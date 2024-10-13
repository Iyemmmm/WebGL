"use strict";

var perspectiveExample = function () {
  var canvas;
  var gl;

  var numPositions = 108;

  var positions = [];
  var colors = [];

  const A = (1 + Math.sqrt(5)) / 2; // The golden ratio
  const B = 1 / A;
  var vertices = [
    vec4(1, 1, 1, 1.0),
    vec4(1, 1, -1, 1.0),
    vec4(1, -1, 1, 1.0),
    vec4(1, -1, -1, 1.0),
    vec4(-1, 1, 1, 1.0),
    vec4(-1, 1, -1, 1.0),
    vec4(-1, -1, 1, 1.0),
    vec4(-1, -1, -1, 1.0),
    vec4(0, B, A, 1.0),
    vec4(0, B, -A, 1.0),
    vec4(0, -B, A, 1.0),
    vec4(0, -B, -A, 1.0),
    vec4(B, A, 0, 1.0),
    vec4(B, -A, 0, 1.0),
    vec4(-B, A, 0, 1.0),
    vec4(-B, -A, 0, 1.0),
    vec4(A, 0, B, 1.0),
    vec4(A, 0, -B, 1.0),
    vec4(-A, 0, B, 1.0),
    vec4(-A, 0, -B, 1.0),
  ];

  // var vertices = [
  //   vec4(-1.37638, 0, 0.262866, 1.0),
  //   vec4(1.37638, 0, -0.262866, 1.0),
  //   vec4(-0.425325, -1.30902, 0.262866, 1.0),
  //   vec4(-0.425325, 1.30902, 0.262866, 1.0),
  //   vec4(1.11352, -0.809017, 0.262866, 1.0),
  //   vec4(1.11352, 0.809017, 0.262866, 1.0),
  //   vec4(-0.262866, -0.809017, 1.11352, 1.0),
  //   vec4(-0.262866, 0.809017, 1.11352, 1.0),
  //   vec4(-0.688191, -0.5, -1.11352, 1.0),
  //   vec4(-0.688191, 0.5, -1.11352, 1.0),
  //   vec4(0.688191, -0.5, 1.11352, 1.0),
  //   vec4(0.688191, 0.5, 1.11352, 1.0),
  //   vec4(0.850651, 0, -1.11352, 1.0),
  //   vec4(-1.11352, -0.809017, -0.262866, 1.0),
  //   vec4(-1.11352, 0.809017, -0.262866, 1.0),
  //   vec4(-0.850651, 0, 1.11352, 1.0),
  //   vec4(0.262866, -0.809017, -1.11352, 1.0),
  //   vec4(0.262866, 0.809017, -1.11352, 1.0),
  //   vec4(0.425325, -1.30902, -0.262866, 1.0),
  //   vec4(0.425325, 1.30902, -0.262866, 1.0),
  // ];

  var vertexColors = [
    vec4(0.0, 0.0, 0.0, 1.0), // black
    vec4(1.0, 0.0, 0.0, 1.0), // red
    vec4(1.0, 1.0, 0.0, 1.0), // yellow
    vec4(0.0, 1.0, 0.0, 1.0), // green
    vec4(0.0, 0.0, 1.0, 1.0), // blue
    vec4(1.0, 0.0, 1.0, 1.0), // magenta
    vec4(0.0, 1.0, 1.0, 1.0), // cyan
    vec4(1.0, 1.0, 1.0, 1.0), // white
    vec4(0.5, 0.0, 0.0, 1.0), // dark red
    vec4(0.5, 0.5, 0.0, 1.0), // olive
    vec4(0.0, 0.5, 0.0, 1.0), // dark green
    vec4(0.0, 0.0, 0.5, 1.0), // dark blue
    vec4(0.5, 0.0, 0.5, 1.0), // purple
    vec4(0.0, 0.5, 0.5, 1.0), // teal
    vec4(0.5, 0.5, 0.5, 1.0), // gray
    vec4(1.0, 0.5, 0.0, 1.0), // orange
    vec4(0.5, 1.0, 0.0, 1.0), // lime
    vec4(0.0, 1.0, 0.5, 1.0), // aqua
    vec4(1.0, 0.0, 0.5, 1.0), // pink
    vec4(0.5, 0.0, 1.0, 1.0), // violet
  ];

  // var near = 0.3;
  // var far = 3.0;
  // var radius = 4.0;
  // var theta = 0.0;
  // var phi = 0.0;
  // var dr = (5.0 * Math.PI) / 180.0;
  var tx = 0.0; // Translasi pada sumbu X
  // Kecepatan translasi
  var deltaTx = 0.05;
  const TRANSLATE_LIMIT_R = 12.0;
  const TRANSLATE_LIMIT_L = -12.0;
  var near = 0.1;
  var far = 100.0;
  var radius = 5.0;
  var theta = -1.0;
  var angle = 0.0;
  // -1.0471975511965976
  var phi = 1.570796326794896;
  var dr = (5.0 * Math.PI) / 180.0;

  var fovy = 45.0; // Field-of-view in Y direction angle (in degrees)
  var aspect; // Viewport aspect ratio

  var modelViewMatrixLoc, projectionMatrixLoc, rotatedMatrixLoc;
  var modelViewMatrix, projectionMatrix, rotatedMatrix;
  var eye;
  var rightButton = false;
  var leftButton = false;
  var MoveRButton = false;
  var MoveLButton = false;
  const at = vec3(0.0, 0.0, 0.0);
  const up = vec3(0.0, 1.0, 0.0);

  function rotateRight() {
    angle += 3.0;
    // theta += 0.005;
    rotatedMatrix = rotate(angle, [0, 0, 1]);
  }
  function rotateLeft() {
    angle -= 3.0;
    // theta -= 0.005;
    rotatedMatrix = rotate(angle, [0, 0, 1]);
  }
  function moveRight() {
    tx += deltaTx;
    if (tx > TRANSLATE_LIMIT_R) {
      tx = TRANSLATE_LIMIT_L;
    }
  }
  function moveLeft() {
    tx -= deltaTx;
    if (tx < TRANSLATE_LIMIT_L) {
      tx = TRANSLATE_LIMIT_R;
    }
  }
  // function stop() {
  //   theta = 1.0;
  //   rotatedMatrix = rotate(theta, [0, 0, 1]);
  // }
  document.getElementById("Button1").addEventListener("click", function () {
    rightButton = true;
    leftButton = false;
    MoveRButton = false;
    MoveLButton = false;
  });
  document.getElementById("Button2").addEventListener("click", function () {
    leftButton = true;
    rightButton = false;
    MoveRButton = false;
    MoveLButton = false;
  });
  document.getElementById("Button3").addEventListener("click", function () {
    leftButton = false;
    rightButton = false;
    MoveRButton = false;
    MoveLButton = false;
  });

  document.getElementById("Button4").addEventListener("click", function () {
    leftButton = false;
    rightButton = true;
    MoveRButton = true;
    MoveLButton = false;
  });
  document.getElementById("Button5").addEventListener("click", function () {
    leftButton = true;
    rightButton = false;
    MoveRButton = false;
    MoveLButton = true;

  });

  function fives(a, b, c, d, e,f) {
    var indices = [
      a,
      b,
      c, // First triangle
      a,
      c,
      d, // Second triangle
      a,
      d,
      e, // Third triangle
    ];

    for (var i = 0; i < indices.length; ++i) {
      positions.push(vertices[indices[i]]);
      colors.push(vertexColors[f]); // Use the color of the first vertex for solid colors
    }
  }

  init();

  function colorCube() {
    fives(0, 16, 2, 10, 8,1);
    fives(0, 8, 4, 14, 12,2);
    fives(16, 17, 1, 12, 0,3);
    fives(1, 9, 11, 3, 17,4);
    fives(1, 12, 14, 5, 9,5);
    fives(2, 13, 15, 6, 10,6);
    fives(13, 3, 17, 16, 2,0);
    fives(3, 11, 7, 15, 13,8);
    fives(4, 8, 10, 6, 18,9);
    fives(14, 5, 19, 18, 4,10);
    fives(5, 19, 7, 11, 9,11);
    fives(15, 7, 19, 18, 6,12);
    // fives(0, 8, 10, 2, 16);
    // fives(0, 16, 17, 4, 12);
    // fives(0, 12, 13, 1, 8);
    // fives(1, 13, 3, 18, 9);
    // fives(1, 9, 11, 5, 8);
    // fives(2, 10, 6, 19, 14);
    // fives(2, 14, 15, 3, 16);
    // fives(3, 15, 19, 7, 18);
    // fives(4, 17, 6, 10, 0);
    // fives(5, 11, 7, 19, 6);
    // fives(5, 6, 17, 16, 3);
    // fives(7, 19, 14, 15, 18);
  }

  function init() {
    canvas = document.getElementById("gl-canvas");

    gl = canvas.getContext("webgl2");
    if (!gl) alert("WebGL 2.0 isn't available");

    gl.viewport(0, 0, canvas.width, canvas.height);

    aspect = canvas.width / canvas.height;

    gl.clearColor(1.0, 1.0, 1.0, 1.0);

    gl.enable(gl.DEPTH_TEST);

    //
    //  Load shaders and initialize attribute buffers
    //
    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    colorCube();

    var cBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);

    var colorLoc = gl.getAttribLocation(program, "aColor");
    gl.vertexAttribPointer(colorLoc, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(colorLoc);

    var vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(positions), gl.STATIC_DRAW);

    var positionLoc = gl.getAttribLocation(program, "aPosition");
    gl.vertexAttribPointer(positionLoc, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(positionLoc);

    modelViewMatrixLoc = gl.getUniformLocation(program, "uModelViewMatrix");
    projectionMatrixLoc = gl.getUniformLocation(program, "uProjectionMatrix");
    // rotatedMatrixLoc = gl.getUniformLocation(program, "rotatedMatrix");
    rotatedMatrix = rotate(angle, [0, 0, 1]); 

    // buttons for viewing parameters

    render();
  }

  function render() {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    eye = vec3(
      radius * Math.sin(theta) * Math.cos(phi),
      radius * Math.sin(theta) * Math.sin(phi),
      radius * Math.cos(theta)
      // 0,0,1
    );

    var translationMatrix = translate(tx, 0.0, 0.0);
    modelViewMatrix = lookAt(eye, at, up);
    projectionMatrix = perspective(fovy, aspect, near, far);
    modelViewMatrix = mult(modelViewMatrix, translationMatrix);
    modelViewMatrix = mult(modelViewMatrix, rotatedMatrix);
    

    
    if (rightButton) {
      rotateRight();
    }
    if (leftButton) {
      rotateLeft();
    }
    if (MoveRButton) {
      moveRight();
    }
    if (MoveLButton) {
      moveLeft();
    }
    
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
    gl.uniformMatrix4fv(projectionMatrixLoc, false, flatten(projectionMatrix));
    gl.uniformMatrix4fv(rotatedMatrixLoc, false, flatten(rotatedMatrix));
    gl.drawArrays(gl.TRIANGLES, 0, numPositions);
    requestAnimationFrame(render);
  }
};
perspectiveExample();
