class Matrix {
  rows;
  cols;
  elements;
  matrix = [[]];

  constructor(rows, cols, elements) {
    this.rows = rows;
    this.cols = cols;
    this.elements = elements;

    for (let i = 0; i < rows; i++) {
      this.matrix[i] = [];
      for (let j = 0; j < cols; j++) {
        this.matrix[i].push(elements[i][j]);
      }
    }
  }

  get(i, j) {
    return this.matrix[i][j];
  }
  set(i, j, value) {
    return (this.matrix[i][j] = value);
  }
}

class Vector {
  dim;
  elements;
  vector = [];

  constructor(dim, elements) {
    this.dim = dim;
    this.elements = elements;

    for (var i = 0; i < dim; i++) {
      this.vector.push(elements[i]);
    }
  }
  get(i) {
    return this.vector[i];
  }
  set(i, value) {
    return (this.vector[i] = value);
  }
}

class LinearAlgebra {
  matrix = [];
  elements;

  transpose(a) {
    let [row] = a;
    return row.map((value, column) => a.map((row) => row[column]));
  }

  sum(a, b) {
    const Matriz = [];
    for (var i = 0; i < a.length; i++) {
      Matriz.push([]);
      for (var j = 0; j < a[i].length; j++) {
        Matriz[i].push([]);
        Matriz[i][j] = a[i][j] + b[i][j];
      }
    }
    return Matriz;
  }

  times(a, b) {
    var aRows = a.length,
      aCols = a[0].length,
      bRows = b.length,
      bCols = b[0].length,
      m = new Array(aRows);
    for (var r = 0; r < aRows; ++r) {
      m[r] = new Array(bCols);
      for (var c = 0; c < bCols; ++c) {
        m[r][c] = 0;
        for (var i = 0; i < aCols; ++i) {
          m[r][c] += a[r][i] * b[i][c];
        }
      }
    }
    return m;
  }

  dot(a, b) {
    const Matriz = [];
    for (var i = 0; i < a.length; i++) {
      Matriz.push([]);
      for (var j = 0; j < a[i].length; j++) {
        Matriz[i].push([]);
        Matriz[i][j] = a[i][j] * b[i][j];
      }
    }
    return Matriz;
  }
}

// gauss
function print(M) {
  for (var k = 0; k < M.length; ++k) {
    console.log(M[k]);
  }
}

function diagonalize(M) {
  var m = M.length;
  var n = M[0].length;
  for (var k = 0; k < Math.min(m, n); ++k) {
    // Find the k-th pivot
    var i_max = findPivot(M, k);
    if (A[(i_max, k)] == 0) throw "matrix is singular";
    swap_rows(M, k, i_max);
    // Do for all rows below pivot
    for (var i = k + 1; i < m; ++i) {
      // Do for all remaining elements in current row:
      var c = A[i][k] / A[k][k];
      for (var j = k + 1; j < n; ++j) {
        A[i][j] = A[i][j] - A[k][j] * c;
      }
      // Fill lower triangular matrix with zeros
      A[i][k] = 0;
    }
  }
}

function findPivot(M, k) {
  var i_max = k;
  for (var i = k + 1; i < M.length; ++i) {
    if (Math.abs(M[i][k]) > Math.abs(M[i_max][k])) {
      i_max = i;
    }
  }
  return i_max;
}

function swap_rows(M, i_max, k) {
  if (i_max != k) {
    var temp = A[i_max];
    A[i_max] = A[k];
    A[k] = temp;
  }
}

function makeM(A, b) {
  for (var i = 0; i < A.length; ++i) {
    A[i].push(b[i]);
  }
}

function substitute(M) {
  var m = M.length;
  for (var i = m - 1; i >= 0; --i) {
    var x = M[i][m] / M[i][i];
    for (var j = i - 1; j >= 0; --j) {
      M[j][m] -= x * M[j][i];
      M[j][i] = 0;
    }
    M[i][m] = x;
    M[i][i] = 1;
  }
}

function extractX(M) {
  var x = [];
  var m = A.length;
  var n = A[0].length;
  for (var i = 0; i < m; ++i) {
    x.push(A[i][n - 1]);
  }
  return x;
}

function solve(A, b) {
  //print(A, "A");
  makeM(A, b);
  //print(A, "M");
  diagonalize(A);
  //print(A, "diag");
  substitute(A);
  //print(A, "subst");
  var x = extractX(A);
  //print(x, "x");
  return x;
}

// Transpose
// Parametro a  : A2x3 [ [2,4,6], [3,5,7] ]
// REturnm      : A3x2 [ [2,3] [4,5] [6,7] ]
const c = [
  [3, 9, 8],
  [5, 6, 8],
  [5, 4, 2],
];
var teste = new Matrix(3, 3, c);
console.table(teste.matrix);

var teste = new Vector(4, [25, 42, 35, 43]);
console.table(teste.vector);

var teste = new LinearAlgebra();
const t = [
  [6, 5, 5],
  [2, 3, 8],
];

console.table(teste.transpose(t));

const f = [
  [6, 5],
  [2, 3],
];
const g = [
  [3, 9],
  [5, 6],
];

console.table(teste.sum(f, g));

const a = [
  [8, 3],
  [2, 4],
  [3, 6],
];
const b = [
  [1, 2, 3],
  [4, 6, 8],
];
console.table(teste.times(a, b));

const r = [
  [5, 8, 7],
  [18, 27, 12],
];
const v = [
  [12, 19, 2],
  [5, 3, 8],
];
console.table(teste.dot(r, v));

const A = [
  [45, 32, 43],
  [46, 35, 44],
  [21, 11, 12],
];

const B = [7, 8, 3];

var x = solve(A, B);

console.table(x);
