# babel-plugin-debug-functions

Plugin inserts console.log(\"[ DEBUG line:\", \<LINE\>, \"file:\", \<FILE\>, \"function:\", \<FUNCTION\>, \" ]\", \<ENTER or EXIT\>, \<PARAMETERS or RETURN VALUE\>) on all functions between __DEBUG_START and __DEBUG_END.

## Usage

```javascript
{
  plugins: [ [ '@rob.j.qva/babel-plugin-debug-functions' , {'production': false, 'use_parameters': true} ] ]
}
```
The option use_parameters will also print parameters on enter and exit, plus the return value on returns.
To disable debugging and remove all __DEBUG_START and __DEBUG_END, set production to true.

## Example

The example below uses options use_parameters: true and production: false.

Input:

```javascript
__DEBUG_START

function v({p=2, l}={}) {
	return false
}

function a() {
	let a = 1
	return a
}

 class A {
   w()  {}
  constructor() {
    var a = 'middle';
  }
}


let b = () => {if (true) {return 2} else {return 3}}

__DEBUG_END

function c() {
	let a = 1
	let b = 2
}

__DEBUG_START

var fullName = function(firstName, lastName) {
 return `${firstName} ${lastName}`;
}

const addAll = (x, y, z) => x + y + z;

function w() {
	return a()
}

v()
a()
let aa = new A()
aa.w()
b()
c()
fullName('alpha', 'beta')
addAll(1,1,1)
w()
```

Output:

```javascript
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
```

Console output:

```bash
[ DEBUG line: 3 file: code.js function: v ] ENTER p: 2 l: undefined
[ DEBUG line: 4 file: code.js function: v ] EXIT RETURN: false
[ DEBUG line: 7 file: code.js function: a ] ENTER
[ DEBUG line: 9 file: code.js function: a ] EXIT RETURN: 1
[ DEBUG line: 14 file: code.js function: constructor ] ENTER
[ DEBUG line: 16 file: code.js function: constructor ] EXIT
[ DEBUG line: 13 file: code.js function: w ] ENTER
[ DEBUG line: 13 file: code.js function: w ] EXIT
[ DEBUG line: 20 file: code.js function: <NO NAME> ] ENTER
[ DEBUG line: 20 file: code.js function: <NO NAME> ] EXIT RETURN: 2
[ DEBUG line: 31 file: code.js function: <NO NAME> ] ENTER firstName: alpha lastName: beta
[ DEBUG line: 32 file: code.js function: <NO NAME> ] EXIT RETURN: alpha beta
[ DEBUG line: 35 file: code.js function: <NO NAME> ] ENTER x: 1 y: 1 z: 1
[ DEBUG line: 35 file: code.js function: <NO NAME> ] EXIT RETURN: 3
[ DEBUG line: 37 file: code.js function: w ] ENTER
[ DEBUG line: 38 file: code.js function: w ] EXIT RETURN: <CONTAINS FUNCTION CALLS>
[ DEBUG line: 7 file: code.js function: a ] ENTER
[ DEBUG line: 9 file: code.js function: a ] EXIT RETURN: 1
```
