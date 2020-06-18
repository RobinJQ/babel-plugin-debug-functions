function a() {
  console.log("\x1B[33m%s\x1B[0m", "[ DEBUG line: 3 file: code.js function: a ]", "ENTER");
  let a = 1;
  console.log("\x1B[33m%s\x1B[0m", "[ DEBUG line: 5 file: code.js function: a ]", "EXIT");
  return a;
  console.log("\x1B[33m%s\x1B[0m", "[ DEBUG line: 6 file: code.js function: a ]", "EXIT");
}

class A {
  w() {
    console.log("\x1B[33m%s\x1B[0m", "[ DEBUG line: 9 file: code.js function: w ]", "ENTER");
    console.log("\x1B[33m%s\x1B[0m", "[ DEBUG line: 9 file: code.js function: w ]", "EXIT");
  }

  constructor() {
    console.log("\x1B[33m%s\x1B[0m", "[ DEBUG line: 10 file: code.js function: constructor ]", "ENTER");
    var a = 'middle';
    console.log("\x1B[33m%s\x1B[0m", "[ DEBUG line: 12 file: code.js function: constructor ]", "EXIT");
  }

}

let b = () => {
  console.log("\x1B[33m%s\x1B[0m", "[ DEBUG line: 16 file: code.js function: <NO NAME> ]", "ENTER");

  if (true) {
    console.log("\x1B[33m%s\x1B[0m", "[ DEBUG line: 16 file: code.js function: <NO NAME> ]", "EXIT");
    return 2;
  } else {
    console.log("\x1B[33m%s\x1B[0m", "[ DEBUG line: 16 file: code.js function: <NO NAME> ]", "EXIT");
    return 3;
  }

  console.log("\x1B[33m%s\x1B[0m", "[ DEBUG line: 16 file: code.js function: <NO NAME> ]", "EXIT");
};

function c() {
  let a = 1;
  let b = 2;
}

var fullName = function (firstName, lastName) {
  console.log("\x1B[33m%s\x1B[0m", "[ DEBUG line: 27 file: code.js function: <NO NAME> ]", "ENTER");
  console.log("\x1B[33m%s\x1B[0m", "[ DEBUG line: 28 file: code.js function: <NO NAME> ]", "EXIT");
  return `${firstName} ${lastName}`;
  console.log("\x1B[33m%s\x1B[0m", "[ DEBUG line: 29 file: code.js function: <NO NAME> ]", "EXIT");
};

const addAll = function (x, y, z) {
  console.log("\x1B[33m%s\x1B[0m", "[ DEBUG line: 31 file: code.js function: <NO NAME> ]", "ENTER");
  console.log("\x1B[33m%s\x1B[0m", "[ DEBUG line: 31 file: code.js function: <NO NAME> ]", "EXIT");
  return x + y + z;
};

a();
let aa = new A();
aa.w();
b();
c();
fullName('alpha', 'beta');
addAll(1, 1, 1);
