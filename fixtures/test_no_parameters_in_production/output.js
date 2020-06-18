function v({
  p = 2,
  l
} = {}) {
  return false;
}

function a() {
  let a = 1;
  return a;
}

class A {
  w() {}

  constructor() {
    var a = 'middle';
  }

}

let b = () => {
  if (true) {
    return 2;
  } else {
    return 3;
  }
};

function c() {
  let a = 1;
  let b = 2;
}

var fullName = function (firstName, lastName) {
  return `${firstName} ${lastName}`;
};

const addAll = function (x, y, z) {
  return x + y + z;
};

function w() {
  return a();
}

a();
let aa = new A();
aa.w();
b();
c();
fullName('alpha', 'beta');
addAll(1, 1, 1);
