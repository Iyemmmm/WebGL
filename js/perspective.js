"use strict";

var perspectiveExample = function () {
  var canvas;
  var gl;

  var currentShape = ""; // Tidak ada objek yang tampil saat awal
  var numPositions = 108;
  var vBuffer, cBuffer; // Buffer untuk posisi
  var positionLoc; // Lokasi atribut posisi dalam shader
  var colorLoc; // Lokasi atribut warna dalam shader

  var positions = [];
  var colors = [];
  var normals = []; // Untuk shading yang solid

  const A = (1 + Math.sqrt(5)) / 2; // The golden ratio
  const B = 1 / A;

  // Vertices for the top and bottom of the triangular prism
  var verticesPrism = [
    vec4(0.0, 1.0, 0.0, 1.0), // Puncak atas
    vec4(-1.0, 0.0, 1.0, 1.0), // Kiri bawah (alas depan)
    vec4(1.0, 0.0, 1.0, 1.0), // Kanan bawah (alas depan)
    vec4(0.0, 1.0, -1.0, 1.0), // Puncak bawah (alas belakang)
    vec4(-1.0, 0.0, -1.0, 1.0), // Kiri bawah (alas belakang)
    vec4(1.0, 0.0, -1.0, 1.0), // Kanan bawah (alas belakang)
  ];

  // Colors for the triangular prism vertices
  var vertexColorsPrism = [
    vec4(1.0, 0.0, 0.0, 1.0), // Red for top front
    vec4(0.0, 1.0, 0.0, 1.0), // Green for left bottom
    vec4(0.0, 0.0, 1.0, 1.0), // Blue for right bottom
    vec4(1.0, 1.0, 0.0, 1.0), // Yellow for top back
    vec4(1.0, 0.0, 1.0, 1.0), // Magenta for left back
    vec4(0.0, 1.0, 1.0, 1.0), // Cyan for right back
  ];

  // Colors for the cone vertices
  var vertexColorsCone = [
    vec4(1.0, 0.0, 0.0, 1.0), // Red for the tip
    vec4(0.0, 1.0, 0.0, 1.0), // Green for the base vertices
    vec4(0.0, 0.0, 1.0, 1.0), // Blue
    vec4(1.0, 1.0, 0.0, 1.0), // Yellow
    vec4(1.0, 0.0, 1.0, 1.0), // Magenta
  ];

  var verticesDodecahedron = [
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

  var vertexColorsDodecahedron = [
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

  var verticesCube = [
    vec4(-0.5, -0.5, 1.5, 1.0),
    vec4(-0.5, 0.5, 1.5, 1.0),
    vec4(0.5, 0.5, 1.5, 1.0),
    vec4(0.5, -0.5, 1.5, 1.0),
    vec4(-0.5, -0.5, 0.5, 1.0),
    vec4(-0.5, 0.5, 0.5, 1.0),
    vec4(0.5, 0.5, 0.5, 1.0),
    vec4(0.5, -0.5, 0.5, 1.0),
  ];

  var vertexColorsCube = [
    vec4(0.0, 0.0, 0.0, 1.0), // black
    vec4(1.0, 0.0, 0.0, 1.0), // red
    vec4(1.0, 1.0, 0.0, 1.0), // yellow
    vec4(0.0, 1.0, 0.0, 1.0), // green
    vec4(0.0, 0.0, 1.0, 1.0), // blue
    vec4(1.0, 0.0, 1.0, 1.0), // magenta
    vec4(0.0, 1.0, 1.0, 1.0), // cyan
    vec4(1.0, 1.0, 1.0, 1.0), // white
  ];

  var verticesPyramid = [
    vec4(0.0, 1.0, 0.0, 1.0), // Puncak
    vec4(-1.0, -1.0, 1.0, 1.0), // Alas kiri depan
    vec4(1.0, -1.0, 1.0, 1.0), // Alas kanan depan
    vec4(1.0, -1.0, -1.0, 1.0), // Alas kanan belakang
    vec4(-1.0, -1.0, -1.0, 1.0), // Alas kiri belakang
  ];

  var vertexColorsPyramid = [
    vec4(1.0, 0.0, 0.0, 1.0), // Merah untuk puncak
    vec4(0.0, 1.0, 0.0, 1.0), // Hijau untuk alas kiri depan
    vec4(0.0, 0.0, 1.0, 1.0), // Biru untuk alas kanan depan
    vec4(1.0, 1.0, 0.0, 1.0), // Kuning untuk alas kanan belakang
    vec4(1.0, 0.0, 1.0, 1.0), // Magenta untuk alas kiri belakang
  ];

  // Translasi pada sumbu X
  // Kecepatan translasi
  const TRANSLATE_LIMIT_R = 18.0;
  const TRANSLATE_LIMIT_L = -18.0;
  var near = 0.2;
  var far = 10.0;
  var radius = 8.0;
  var theta = 0.0;
  var angle = 0.0;
  // -1.0471975511965976
  // var phi = 1.570796326794896;
  var phi = 0.0;
  var dr = (5.0 * Math.PI) / 180.0;

  var fovy = 60.0; // Field-of-view in Y direction angle (in degrees)
  var aspect; // Viewport aspect ratio

  var modelViewMatrixLoc, projectionMatrixLoc, rotatedMatrixLoc;
  var modelViewMatrix, projectionMatrix, rotatedMatrix;
  var eye;
  var rightButton = false;
  var leftButton = false;
  var MoveRButton = false;
  var MoveLButton = false;
  var MoveRGLBBButton = false;
  var MoveLGLBBButton = false;
  var buttonParabola = false;
  var parabolaButton = false;
  var changeDedocahedron = false;
  var changeCube = false;
  var changeLimas = false;
  var changeBall = false;
  var changeCone = false;
  var changePrism = false;

  var tx = 0.0;
  var px = 0.0;
  var py = 0.0;
  var deltaPx = 0.04;
  var deltaPy = 0.04;
  let lastUpdateTime = 0;
  var kecepatanGLBB;
  var akselerasi;

  const at = vec3(0.0, 0.0, 0.0);
  const up = vec3(0.0, 1.0, 0.0);

  function rotateRight() {
    angle += 3.0;
    rotatedMatrix = rotate(angle, [0, 0, 1]);
  }
  function rotateLeft() {
    angle -= 3.0;
    rotatedMatrix = rotate(angle, [0, 0, 1]);
  }
  function moveRight(deltaTx) {
    tx += deltaTx;
    if (tx > TRANSLATE_LIMIT_R) {
      tx = TRANSLATE_LIMIT_L;
    }
  }
  function moveLeft(deltaTx) {
    tx -= deltaTx;
    if (tx < TRANSLATE_LIMIT_L) {
      tx = TRANSLATE_LIMIT_R;
    }
  }
  function moveRightGLBB(perlambatan, percepatan) {
    const currentTime = Date.now(); // Waktu saat ini dalam milidetik
    // Inisialisasi saat fungsi pertama kali dipanggil
    if (!moveRightGLBB.hasBeenCalled) {
      kecepatanGLBB = 0.05;
      lastUpdateTime = currentTime; // Set waktu saat ini sebagai waktu terakhir update
      moveRightGLBB.hasBeenCalled = true;
    }

    // Periksa apakah sudah lebih dari 1 detik sejak update terakhir
    akselerasi = percepatan - perlambatan;
    if (kecepatanGLBB < 0) {
      kecepatanGLBB = 0;
    }
    if (currentTime - lastUpdateTime >= 1000) {
      kecepatanGLBB += akselerasi;
      lastUpdateTime = currentTime;
    }
    tx += kecepatanGLBB;

    // Reset posisi jika melebihi batas
    if (tx > TRANSLATE_LIMIT_R) {
      tx = TRANSLATE_LIMIT_L;
    }
  }
  function moveLeftGLBB(perlambatan, percepatan) {
    const currentTime = Date.now(); // Waktu saat ini dalam milidetik
    // Inisialisasi saat fungsi pertama kali dipanggil
    if (!moveLeftGLBB.hasBeenCalled) {
      kecepatanGLBB = 0.05;
      lastUpdateTime = currentTime; // Set waktu saat ini sebagai waktu terakhir update
      moveLeftGLBB.hasBeenCalled = true;
    }
    // Periksa apakah sudah lebih dari 1 detik sejak update terakhir
    akselerasi = percepatan - perlambatan;
    if (kecepatanGLBB < 0) {
      kecepatanGLBB = 0;
    }
    if (currentTime - lastUpdateTime >= 1000) {
      kecepatanGLBB += akselerasi;
      lastUpdateTime = currentTime;
    }
    tx -= kecepatanGLBB;

    // Reset posisi jika melebihi batas
    if (tx < TRANSLATE_LIMIT_L) {
      tx = TRANSLATE_LIMIT_R;
    }
  }
  function parabolic(acc) {
    px += deltaPx;
    py += deltaPy;
    console.log("py", py);
    const currentTime = Date.now(); // Waktu saat ini dalam milidetik
    // Inisialisasi saat fungsi pertama kali dipanggil
    if (!parabolic.hasBeenCalled) {
      lastUpdateTime = currentTime; // Set waktu saat ini sebagai waktu terakhir update
      parabolic.hasBeenCalled = true;
    }
    if (py > 0) {
      if (currentTime - lastUpdateTime >= 50) {
        deltaPy -= acc;
        lastUpdateTime = currentTime;
        console.log("Halo1");
      }
    } else {
      if (currentTime - lastUpdateTime >= 50) {
        deltaPy += acc;
        lastUpdateTime = currentTime;
        console.log("Halo2");
      }
    }
    if (px > TRANSLATE_LIMIT_R) {
      px = TRANSLATE_LIMIT_L;
    }
    if (py > TRANSLATE_LIMIT_R) {
      py = TRANSLATE_LIMIT_L;
    }
    if (py < TRANSLATE_LIMIT_L) {
      py = TRANSLATE_LIMIT_R;
    }
  }
  document.getElementById("Button0").addEventListener("click", function () {
    tx = 0.0;
    px = 0.0;
    py = 0.0;
    leftButton = false;
    rightButton = false;
    MoveRButton = false;
    MoveLButton = false;
    MoveRGLBBButton = false;
    MoveLGLBBButton = false;
    moveRightGLBB.hasBeenCalled = false;
    moveLeftGLBB.hasBeenCalled = false;
    parabolaButton = false;
  });
  document.getElementById("Button1").addEventListener("click", function () {
    rightButton = true;
    leftButton = false;
    MoveRButton = false;
    MoveLButton = false;
    MoveRGLBBButton = false;
    MoveLGLBBButton = false;
    moveRightGLBB.hasBeenCalled = false;
    moveLeftGLBB.hasBeenCalled = false;
    parabolaButton = false;
  });
  document.getElementById("Button2").addEventListener("click", function () {
    leftButton = true;
    rightButton = false;
    MoveRButton = false;
    MoveLButton = false;
    MoveRGLBBButton = false;
    MoveLGLBBButton = false;
    moveRightGLBB.hasBeenCalled = false;
    moveLeftGLBB.hasBeenCalled = false;
    parabolaButton = false;
  });
  document.getElementById("Button3").addEventListener("click", function () {
    leftButton = false;
    rightButton = false;
    MoveRButton = false;
    MoveLButton = false;
    MoveRGLBBButton = false;
    MoveLGLBBButton = false;
    moveRightGLBB.hasBeenCalled = false;
    moveLeftGLBB.hasBeenCalled = false;
    parabolaButton = false;
  });

  document.getElementById("Button4").addEventListener("click", function () {
    leftButton = false;
    rightButton = true;
    MoveRButton = true;
    MoveLButton = false;
    MoveRGLBBButton = false;
    MoveLGLBBButton = false;
    moveRightGLBB.hasBeenCalled = false;
    moveLeftGLBB.hasBeenCalled = false;
    parabolaButton = false;
  });
  document.getElementById("Button5").addEventListener("click", function () {
    leftButton = true;
    rightButton = false;
    MoveRButton = false;
    MoveLButton = true;
    MoveRGLBBButton = false;
    MoveLGLBBButton = false;
    moveRightGLBB.hasBeenCalled = false;
    moveLeftGLBB.hasBeenCalled = false;
    parabolaButton = false;
  });
  document.getElementById("Button6").addEventListener("click", function () {
    leftButton = false;
    rightButton = true;
    MoveRButton = false;
    MoveLButton = false;
    MoveRGLBBButton = true;
    MoveLGLBBButton = false;
    moveLeftGLBB.hasBeenCalled = false;
    parabolaButton = false;
  });
  document.getElementById("Button7").addEventListener("click", function () {
    leftButton = true;
    rightButton = false;
    MoveRButton = false;
    MoveLButton = false;
    MoveRGLBBButton = false;
    MoveLGLBBButton = true;
    moveRightGLBB.hasBeenCalled = false;
    parabolaButton = false;
  });
  document.getElementById("Button8").addEventListener("click", function () {
    leftButton = false;
    rightButton = true;
    MoveRButton = false;
    MoveLButton = false;
    MoveRGLBBButton = false;
    MoveLGLBBButton = false;
    moveRightGLBB.hasBeenCalled = false;
    parabolaButton = true;
  });
  document
    .getElementById("dodecahedron")
    .addEventListener("click", function () {
      currentShape = "dodecahedron";
      changeDedocahedron = true;
      changeBall = false;
      changeCube = false;
      changeLimas = false;
      changeCone = false;
      changePrism = false;
      theta = 0.08;
      phi = -2;
    });
  document.getElementById("kubus").addEventListener("click", function () {
    currentShape = "cube";
    changeCube = true;
    changeBall = false;
    changeDedocahedron = false;
    changeLimas = false;
    changeCone = false;
    changePrism = false;
    theta = 0.001;
    phi = -1;
  });
  document.getElementById("bola").addEventListener("click", function () {
    currentShape = "sphere";
    changeBall = true;
    changeDedocahedron = false;
    changeCube = false;
    changeLimas = false;
    changeCone = false;
    changePrism = false;
    theta = 0.3;
    phi = 1; //makin besar makin besar bolanya
  });
  document.getElementById("limas").addEventListener("click", function () {
    currentShape = "pyramid";
    changeLimas = true;
    changeBall = false;
    changeCube = false;
    changeDedocahedron = false;
    changeCone = false;
    changePrism = false;
    theta = 0.08;
    phi = -2;
  });
  document.getElementById("kerucut").addEventListener("click", function () {
    currentShape = "cone";
    changeCone = true;
    changeLimas = false;
    changeBall = false;
    changeCube = false;
    changeDedocahedron = false;
    changePrism = false;
  });
  document.getElementById("prisma").addEventListener("click", function () {
    currentShape = "prism";
    changePrism = true;
    changeCone = false;
    changeLimas = false;
    changeBall = false;
    changeCube = false;
    changeDedocahedron = false;
  });

  function trianglePyramid(a, b, c, colorIndex) {
    positions.push(verticesPyramid[a]);
    positions.push(verticesPyramid[b]);
    positions.push(verticesPyramid[c]);

    var color = vertexColorsPyramid[colorIndex];
    colors.push(color);
    colors.push(color);
    colors.push(color);
  }

  function quadPyramid(a, b, c, d, colorIndex) {
    positions.push(verticesPyramid[a]);
    colors.push(vertexColorsPyramid[colorIndex]);

    positions.push(verticesPyramid[b]);
    colors.push(vertexColorsPyramid[colorIndex]);

    positions.push(verticesPyramid[c]);
    colors.push(vertexColorsPyramid[colorIndex]);

    positions.push(verticesPyramid[a]);
    colors.push(vertexColorsPyramid[colorIndex]);

    positions.push(verticesPyramid[c]);
    colors.push(vertexColorsPyramid[colorIndex]);

    positions.push(verticesPyramid[d]);
    colors.push(vertexColorsPyramid[colorIndex]);
  }

  function createPyramid() {
    positions = [];
    colors = [];

    // 4 sisi segitiga
    trianglePyramid(0, 1, 2, 0); // sisi depan
    trianglePyramid(0, 2, 3, 1); // sisi kanan
    trianglePyramid(0, 3, 4, 2); // sisi belakang
    trianglePyramid(0, 4, 1, 3); // sisi kiri

    // Sisi alas persegi
    quadPyramid(1, 4, 3, 2, 4); // alas

    numPositions = positions.length;
    console.log(numPositions);

    updateBuffer();
    // render();
  }

  function createSphere(latitudeBands, longitudeBands, radius) {
    positions = [];
    colors = [];
    normals = []; // Untuk shading yang solid

    for (var latNumber = 0; latNumber <= latitudeBands; latNumber++) {
      var theta = (latNumber * Math.PI) / latitudeBands;
      var sinTheta = Math.sin(theta);
      var cosTheta = Math.cos(theta);

      for (var longNumber = 0; longNumber <= longitudeBands; longNumber++) {
        var phi = (longNumber * 2 * Math.PI) / longitudeBands;
        var sinPhi = Math.sin(phi);
        var cosPhi = Math.cos(phi);

        var x = cosPhi * sinTheta;
        var y = cosTheta;
        var z = sinPhi * sinTheta;

        positions.push(vec4(radius * x, radius * y, radius * z, 1.0));

        // Normal untuk shading yang solid
        normals.push(vec3(x, y, z));

        // colors.push(vec4(0, 0.0, 0.0, 1.0)); // Warna merah
        colors.push(vec4(Math.abs(x), Math.abs(y), Math.abs(z), 1.0)); // Warna sesuai posisi untuk gradien
      }
    }

    var indices = [];

    for (var latNumber = 0; latNumber < latitudeBands; latNumber++) {
      for (var longNumber = 0; longNumber < longitudeBands; longNumber++) {
        var first = latNumber * (longitudeBands + 1) + longNumber;
        var second = first + longitudeBands + 1;

        indices.push(first);
        indices.push(second);
        indices.push(first + 1);

        indices.push(second);
        indices.push(second + 1);
        indices.push(first + 1);
      }
    }

    return {
      positions: positions,
      normals: normals,
      indices: indices,
      colors: colors,
    };
  }

  function colorSphere() {
    positions = [];
    colors = [];

    var sphereData = createSphere(30, 30, 1.0); // 30 segmen latitude, 30 segmen longitude, radius 1.0
    positions = sphereData.positions;
    colors = sphereData.colors;

    numPositions = positions.length;
    console.log(numPositions);

    updateBuffer();

    // render(); // Panggil render setelah buffer diisi ulang
  }

  // Fungsi untuk membuat kerucut dengan alas lingkaran
  function createCone() {
    positions = [];
    colors = [];

    const numSegments = 30; // Jumlah segmen untuk membentuk alas lingkaran
    const radius = 1.0; // Radius alas kerucut
    const height = 2.0; // Tinggi kerucut

    // Titik puncak kerucut
    const tip = vec4(0.0, height, 0.0, 1.0);

    // Iterasi untuk membuat alas lingkaran
    for (let i = 0; i < numSegments; i++) {
      const theta = (i / numSegments) * 2 * Math.PI;
      const nextTheta = ((i + 1) / numSegments) * 2 * Math.PI;

      const x1 = radius * Math.cos(theta);
      const z1 = radius * Math.sin(theta);
      const x2 = radius * Math.cos(nextTheta);
      const z2 = radius * Math.sin(nextTheta);

      // Buat sisi segitiga antara titik puncak dan dua titik pada alas
      positions.push(tip);
      colors.push(vertexColorsCone[0]);

      positions.push(vec4(x1, 0.0, z1, 1.0));
      colors.push(vertexColorsCone[1]);

      positions.push(vec4(x2, 0.0, z2, 1.0));
      colors.push(vertexColorsCone[2]);

      // Buat alas lingkaran sebagai dua segmen
      positions.push(vec4(0.0, 0.0, 0.0, 1.0)); // Titik tengah alas
      colors.push(vertexColorsCone[3]);

      positions.push(vec4(x1, 0.0, z1, 1.0));
      colors.push(vertexColorsCone[4]);

      positions.push(vec4(x2, 0.0, z2, 1.0));
      colors.push(vertexColorsCone[4]);
    }

    numPositions = positions.length;
    console.log(numPositions);

    updateBuffer();
  }

  function fives(a, b, c, d, e, f) {
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
      positions.push(verticesDodecahedron[indices[i]]);
      colors.push(vertexColorsDodecahedron[f]); // Use the color of the first vertex for solid colors
    }
  }

  function quadCube(a, b, c, d) {
    positions.push(verticesCube[a]);
    colors.push(vertexColorsCube[a]);
    positions.push(verticesCube[b]);
    colors.push(vertexColorsCube[a]);
    positions.push(verticesCube[c]);
    colors.push(vertexColorsCube[a]);
    positions.push(verticesCube[a]);
    colors.push(vertexColorsCube[a]);
    positions.push(verticesCube[c]);
    colors.push(vertexColorsCube[a]);
    positions.push(verticesCube[d]);
    colors.push(vertexColorsCube[a]);
  }

  function updateBuffer() {
    // Buffer posisi
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(positions), gl.STATIC_DRAW);
    gl.vertexAttribPointer(positionLoc, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(positionLoc);

    // Buffer warna
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);
    gl.vertexAttribPointer(colorLoc, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(colorLoc);
  }

  function colorCube() {
    positions = [];
    colors = [];

    quadCube(1, 0, 3, 2);
    quadCube(2, 3, 7, 6);
    quadCube(3, 0, 4, 7);
    quadCube(6, 5, 1, 2);
    quadCube(4, 5, 6, 7);
    quadCube(5, 4, 0, 1);

    numPositions = positions.length;
    console.log(numPositions);

    updateBuffer();

    // render(); // Panggil render setelah buffer diisi ulang
  }

  function colorDodecahedron() {
    positions = [];
    colors = [];

    fives(0, 16, 2, 10, 8, 1);
    fives(0, 8, 4, 14, 12, 2);
    fives(16, 17, 1, 12, 0, 3);
    fives(1, 9, 11, 3, 17, 4);
    fives(1, 12, 14, 5, 9, 5);
    fives(2, 13, 15, 6, 10, 6);
    fives(13, 3, 17, 16, 2, 0);
    fives(3, 11, 7, 15, 13, 8);
    fives(4, 8, 10, 6, 18, 9);
    fives(14, 5, 19, 18, 4, 10);
    fives(5, 19, 7, 11, 9, 11);
    fives(15, 7, 19, 18, 6, 12);

    numPositions = positions.length;
    console.log(numPositions);
    updateBuffer();

    // render(); // Panggil render setelah buffer diisi ulang
  }

  // Helper function to create triangles
  function trianglePrism(a, b, c, colorIndex) {
    positions.push(verticesPrism[a]);
    positions.push(verticesPrism[b]);
    positions.push(verticesPrism[c]);

    // Warna yang sama untuk setiap vertex pada sisi segitiga
    var color = vertexColorsPrism[colorIndex];
    colors.push(color);
    colors.push(color);
    colors.push(color);
  }

  // Helper function to create quads (rectangular sides)
  function quadPrism(a, b, c, d, colorIndex) {
    positions.push(verticesPrism[a]);
    colors.push(vertexColorsPrism[colorIndex]); // Warna yang sama untuk semua vertex

    positions.push(verticesPrism[b]);
    colors.push(vertexColorsPrism[colorIndex]);

    positions.push(verticesPrism[c]);
    colors.push(vertexColorsPrism[colorIndex]);

    positions.push(verticesPrism[a]);
    colors.push(vertexColorsPrism[colorIndex]);

    positions.push(verticesPrism[c]);
    colors.push(vertexColorsPrism[colorIndex]);

    positions.push(verticesPrism[d]);
    colors.push(vertexColorsPrism[colorIndex]);
  }

  // Function to create the triangular prism
  function createTriangularPrism() {
    positions = [];
    colors = [];

    // Front face (triangle) - Warna merah
    trianglePrism(0, 1, 2, 0); // Sisi depan

    // Back face (triangle) - Warna hijau
    trianglePrism(3, 4, 5, 1); // Sisi belakang

    // Side faces (connecting front and back) - Warna yang berbeda
    quadPrism(0, 1, 4, 3, 2); // Sisi kiri - Biru
    quadPrism(0, 2, 5, 3, 5); // Sisi kanan - Cyan
    quadPrism(1, 2, 5, 4, 4); // Sisi bawah - Magenta

    numPositions = positions.length;
    console.log(numPositions);

    updateBuffer();
  }

  function init() {
    canvas = document.getElementById("gl-canvas");

    // gl = canvas.getContext("webgl2");
    gl = canvas.getContext("webgl2", { antialias: true });
    if (!gl) alert("WebGL 2.0 isn't available");

    gl.viewport(0, 0, canvas.width, canvas.height);

    aspect = canvas.width / canvas.height;

    gl.clearColor(1.0, 0.5, 0.0, 1.0);

    gl.enable(gl.DEPTH_TEST);

    //
    //  Load shaders and initialize attribute buffers
    //
    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    // colorDodecahedron();

    // Buat buffer tapi jangan isi datanya
    vBuffer = gl.createBuffer();
    cBuffer = gl.createBuffer();

    positionLoc = gl.getAttribLocation(program, "aPosition");
    colorLoc = gl.getAttribLocation(program, "aColor");

    modelViewMatrixLoc = gl.getUniformLocation(program, "uModelViewMatrix");
    projectionMatrixLoc = gl.getUniformLocation(program, "uProjectionMatrix");

    // buttons for viewing parameters

    render(); // Render awal (kosong) hanya untuk membersihkan layar
  }

  function render() {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    const kecepatan = document.getElementById("ButtonKecepatan");
    const speedValue = parseFloat(kecepatan.value);
    const percepatan = document.getElementById("ButtonPercepatan");
    const accValue = parseFloat(percepatan.value);
    const perlambatanValue = parseFloat(
      document.getElementById("ButtonPerlambatan").value
    );
    const parabolaValue = parseFloat(
      document.getElementById("ButtonParabola").value
    );
    eye = vec3(
      radius * Math.sin(theta) * Math.cos(phi),
      radius * Math.sin(theta) * Math.sin(phi),
      radius * Math.cos(theta)
      // 0,0,1
    );

    var posisiawal = translate(-6, 0.0, 0.0);
    var translationMatrix = translate(tx, 0.0, 0.0);
    var parabolicMatrix = translate(px, py, 0.0);
    rotatedMatrix = rotate(angle, [0, 0, 1]);
    modelViewMatrix = lookAt(eye, at, up);
    projectionMatrix = perspective(fovy, aspect, near, far);
    modelViewMatrix = mult(modelViewMatrix, posisiawal);
    modelViewMatrix = mult(modelViewMatrix, parabolicMatrix);
    modelViewMatrix = mult(modelViewMatrix, translationMatrix);
    modelViewMatrix = mult(modelViewMatrix, rotatedMatrix);

    if (rightButton) {
      rotateRight();
    }
    if (leftButton) {
      rotateLeft();
    }
    if (MoveRButton) {
      moveRight(speedValue);
    }
    if (MoveLButton) {
      moveLeft(speedValue);
    }
    if (MoveRGLBBButton) {
      moveRightGLBB(perlambatanValue, accValue);
    }
    if (MoveLGLBBButton) {
      moveLeftGLBB(perlambatanValue, accValue);
    }
    if (parabolaButton) {
      parabolic(parabolaValue);
    }
    if (changeDedocahedron) {
      colorDodecahedron();
    }
    if (changeCube) {
      colorCube();
    }
    if (changeBall) {
      colorSphere();
    }
    if (changeLimas) {
      createPyramid();
    }
    if (changeCone) {
      createCone();
    }
    if (changePrism) {
      createTriangularPrism();
    }

    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
    gl.uniformMatrix4fv(projectionMatrixLoc, false, flatten(projectionMatrix));
    gl.uniformMatrix4fv(rotatedMatrixLoc, false, flatten(rotatedMatrix));
    if (currentShape === "cube") {
      // Gambar Kubus
      console.log(currentShape);
      gl.drawArrays(gl.TRIANGLES, 0, numPositions);
    } else if (currentShape === "dodecahedron") {
      // Gambar Dodecahedron
      console.log(currentShape);
      gl.drawArrays(gl.TRIANGLES, 0, numPositions);
    } else if (currentShape === "sphere") {
      // Gambar sphere;
      console.log(currentShape);
      gl.drawArrays(gl.TRIANGLES, 0, numPositions);
    } else if (currentShape === "pyramid") {
      // Gambar limas segi empat
      console.log(currentShape);
      gl.drawArrays(gl.TRIANGLES, 0, numPositions);
    } else if (currentShape === "cone") {
      // Gambar limas segi empat
      // if (MoveRButton || MoveRGLBBButton || parabolaButton) {
      //   rightButton = false;
      // }
      // if (MoveLButton || MoveLGLBBButton) {
      //   leftButton = false;
      // }
      console.log(currentShape);
      gl.drawArrays(gl.TRIANGLES, 0, numPositions);
    } else if (currentShape === "prism") {
      // Gambar limas segi empat
      console.log(currentShape);
      gl.drawArrays(gl.TRIANGLES, 0, numPositions);
    }

    requestAnimationFrame(render);
  }
  init();
};
perspectiveExample();
