function v({
  p = 2,
  l
} = {}) {
  console.log("\x1B[33m%s\x1B[0m", "[ DEBUG line: 3 file: code.js function: v ]", "ENTER", "p:", p, "l:", l);
  console.log("\x1B[33m%s\x1B[0m", "[ DEBUG line: 4 file: code.js function: v ]", "EXIT", "RETURN:", false);
  return false;
  console.log("\x1B[33m%s\x1B[0m", "[ DEBUG line: 5 file: code.js function: v ]", "EXIT", "p:", p, "l:", l);
}

function a() {
  console.log("\x1B[33m%s\x1B[0m", "[ DEBUG line: 7 file: code.js function: a ]", "ENTER");
  let a = 1;
  console.log("\x1B[33m%s\x1B[0m", "[ DEBUG line: 9 file: code.js function: a ]", "EXIT", "RETURN:", a);
  return a;
  console.log("\x1B[33m%s\x1B[0m", "[ DEBUG line: 10 file: code.js function: a ]", "EXIT");
}

class A {
  w() {
    console.log("\x1B[33m%s\x1B[0m", "[ DEBUG line: 13 file: code.js function: w ]", "ENTER");
    console.log("\x1B[33m%s\x1B[0m", "[ DEBUG line: 13 file: code.js function: w ]", "EXIT");
  }

  constructor() {
    console.log("\x1B[33m%s\x1B[0m", "[ DEBUG line: 14 file: code.js function: constructor ]", "ENTER");
    var a = 'middle';
    console.log("\x1B[33m%s\x1B[0m", "[ DEBUG line: 16 file: code.js function: constructor ]", "EXIT");
  }

}

let b = () => {
  console.log("\x1B[33m%s\x1B[0m", "[ DEBUG line: 20 file: code.js function: <NO NAME> ]", "ENTER");

  if (true) {
    console.log("\x1B[33m%s\x1B[0m", "[ DEBUG line: 20 file: code.js function: <NO NAME> ]", "EXIT", "RETURN:", 2);
    return 2;
  } else {
    console.log("\x1B[33m%s\x1B[0m", "[ DEBUG line: 20 file: code.js function: <NO NAME> ]", "EXIT", "RETURN:", 3);
    return 3;
  }

  console.log("\x1B[33m%s\x1B[0m", "[ DEBUG line: 20 file: code.js function: <NO NAME> ]", "EXIT");
};

function c() {
  let a = 1;
  let b = 2;
}

var fullName = function (firstName, lastName) {
  console.log("\x1B[33m%s\x1B[0m", "[ DEBUG line: 31 file: code.js function: <NO NAME> ]", "ENTER", "firstName:", firstName, "lastName:", lastName);
  console.log("\x1B[33m%s\x1B[0m", "[ DEBUG line: 32 file: code.js function: <NO NAME> ]", "EXIT", "RETURN:", `${firstName} ${lastName}`);
  return `${firstName} ${lastName}`;
  console.log("\x1B[33m%s\x1B[0m", "[ DEBUG line: 33 file: code.js function: <NO NAME> ]", "EXIT", "firstName:", firstName, "lastName:", lastName);
};

const addAll = function (x, y, z) {
  console.log("\x1B[33m%s\x1B[0m", "[ DEBUG line: 35 file: code.js function: <NO NAME> ]", "ENTER", "x:", x, "y:", y, "z:", z);
  console.log("\x1B[33m%s\x1B[0m", "[ DEBUG line: 35 file: code.js function: <NO NAME> ]", "EXIT", "RETURN:", x + y + z);
  return x + y + z;
};

function w() {
  console.log("\x1B[33m%s\x1B[0m", "[ DEBUG line: 37 file: code.js function: w ]", "ENTER");
  console.log("\x1B[33m%s\x1B[0m", "[ DEBUG line: 38 file: code.js function: w ]", "EXIT", "RETURN:", "<CONTAINS FUNCTION CALLS>");
  return a();
  console.log("\x1B[33m%s\x1B[0m", "[ DEBUG line: 39 file: code.js function: w ]", "EXIT");
}

v();
a();
let aa = new A();
aa.w();
b();
c();
fullName('alpha', 'beta');
addAll(1, 1, 1);
w();
