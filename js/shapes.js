export function createCube() {
  const verticesCube = [
    vec4(-0.5, -0.5, 1.5, 1.0),
    vec4(-0.5, 0.5, 1.5, 1.0),
    vec4(0.5, 0.5, 1.5, 1.0),
    vec4(0.5, -0.5, 1.5, 1.0),
    vec4(-0.5, -0.5, 0.5, 1.0),
    vec4(-0.5, 0.5, 0.5, 1.0),
    vec4(0.5, 0.5, 0.5, 1.0),
    vec4(0.5, -0.5, 0.5, 1.0),
  ];

  const vertexColorsCube = [
    vec4(0.0, 0.0, 0.0, 1.0), // black
    vec4(1.0, 0.0, 0.0, 1.0), // red
    vec4(1.0, 1.0, 0.0, 1.0), // yellow
    vec4(0.0, 1.0, 0.0, 1.0), // green
    vec4(0.0, 0.0, 1.0, 1.0), // blue
    vec4(1.0, 0.0, 1.0, 1.0), // magenta
    vec4(0.0, 1.0, 1.0, 1.0), // cyan
    vec4(1.0, 1.0, 1.0, 1.0), // white
  ];

  let positions = [];
  let colors = [];

  const quadCube = (a, b, c, d) => {
    positions.push(verticesCube[a], verticesCube[b], verticesCube[c]);
    colors.push(vertexColorsCube[a], vertexColorsCube[a], vertexColorsCube[a]);

    positions.push(verticesCube[a], verticesCube[c], verticesCube[d]);
    colors.push(vertexColorsCube[a], vertexColorsCube[a], vertexColorsCube[a]);
  };

  quadCube(1, 0, 3, 2);
  quadCube(2, 3, 7, 6);
  quadCube(3, 0, 4, 7);
  quadCube(6, 5, 1, 2);
  quadCube(4, 5, 6, 7);
  quadCube(5, 4, 0, 1);

  return { positions, colors };
}

export function createPyramid() {
  const verticesPyramid = [
    vec4(0.0, 1.0, 0.0, 1.0), // Puncak
    vec4(-1.0, -1.0, 1.0, 1.0), // Alas kiri depan
    vec4(1.0, -1.0, 1.0, 1.0), // Alas kanan depan
    vec4(1.0, -1.0, -1.0, 1.0), // Alas kanan belakang
    vec4(-1.0, -1.0, -1.0, 1.0), // Alas kiri belakang
  ];

  const vertexColorsPyramid = [
    vec4(1.0, 0.0, 0.0, 1.0), // Merah untuk puncak
    vec4(0.0, 1.0, 0.0, 1.0), // Hijau untuk alas kiri depan
    vec4(0.0, 0.0, 1.0, 1.0), // Biru untuk alas kanan depan
    vec4(1.0, 1.0, 0.0, 1.0), // Kuning untuk alas kanan belakang
    vec4(1.0, 0.0, 1.0, 1.0), // Magenta untuk alas kiri belakang
  ];

  let positions = [];
  let colors = [];

  const triangle = (a, b, c) => {
    positions.push(verticesPyramid[a], verticesPyramid[b], verticesPyramid[c]);

    colors.push(
      vertexColorsPyramid[a],
      vertexColorsPyramid[b],
      vertexColorsPyramid[c]
    );
  };

  const quadPyramid = (a, b, c, d) => {
    positions.push(verticesPyramid[a], verticesPyramid[b], verticesPyramid[c]);
    colors.push(
      vertexColorsPyramid[a],
      vertexColorsPyramid[a],
      vertexColorsPyramid[a]
    );

    positions.push(verticesPyramid[a], verticesPyramid[c], verticesPyramid[d]);
    colors.push(
      vertexColorsPyramid[a],
      vertexColorsPyramid[a],
      vertexColorsPyramid[a]
    );
  };
  // 4 sisi segitiga
  triangle(0, 1, 2); // sisi depan
  triangle(0, 2, 3); // sisi kanan
  triangle(0, 3, 4); // sisi belakang
  triangle(0, 4, 1); // sisi kiri

  // Sisi alas persegi
  quadPyramid(1, 4, 3, 2); // alas

  return { positions, colors };
}

export function createDodecahedron() {
  const verticesDodecahedron = [
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

  const vertexColorsDodecahedron = [
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

  let positions = [];
  let colors = [];

  const fives = (a, b, c, d, e, f) => {
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
  };

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

  return { positions, colors };
}

export function colorSphere() {
  let positions = [];
  let colors = [];
  const createSphere = (latitudeBands, longitudeBands, radius) => {
    var positions = [];
    var colors = [];
    var normals = []; // Untuk shading yang solid

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

        var u = 1 - longNumber / longitudeBands;
        var v = 1 - latNumber / latitudeBands;

        positions.push(vec4(radius * x, radius * y, radius * z, 1.0));

        // Normal untuk shading yang solid
        normals.push(vec3(x, y, z));

        colors.push(vec4(0.0, 0.0, 0.0, 1.0)); // Warna merah
        // colors.push(vec4(Math.abs(x), Math.abs(y), Math.abs(z), 1.0)); // Warna sesuai posisi untuk gradien
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
  };

  var sphereData = createSphere(30, 30, 1.0); // 30 segmen latitude, 30 segmen longitude, radius 1.0
  positions = sphereData.positions;
  colors = sphereData.colors;

  return { positions, colors };
}
