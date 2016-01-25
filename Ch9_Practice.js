// A regular expression is a type of object.
// 2 ways to make one:
var re1 = new RegExp('abc');
var re2 = /abc/;

// You can use 'test' to return a boolean w/ Reg Exps.
console.log(/abc/.test('abcde')); // true
console.log(/abc/.test('abxde')); // false

// We'll come back to this chapter later.
// For now, I would like to learn more about implementing
// Javascript into actual pages to begin creating things.