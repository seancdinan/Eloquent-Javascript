//*************************************************
//****** Using Fxns as Namespaces *****************
//*************************************************


// // The dayName fxn is part of the module's interface,
// // but the 'names' variable is not.
// var names = ['Sunday', 'Monday', 'Tuesday', 'Wednesday',
// 							'Thursday', 'Friday', 'Saturday'];
// function dayName(number) {
// 	return names[number];
// }

// var dayName = function() {
// 	var names = ['Sunday', 'Monday', 'Tuesday', 'Wednesday',
// 								'Thursday', 'Friday', 'Saturday'];
// 	return function(number) {
// 		return names[number];
// 	};
// }();

// console.log(dayName(3));

// // We can wrap variables inside a function to prevent
// // them from poluting the global namespace.
// // The whole chunk needs to be wrapped in () due to a quirk
// // in JS's syntax. If an expression start with the keyword
// // 'function', it is a function expression. However, if a 
// // *statement* starts with 'function', it is a function
// // *declaration*, which requires a name and, not being an
// // expression, cannot be called by writing () after it.
// (function () {
// 	function square(x) {return x * x; }
// 	var hundred = 100;

// 	console.log(square(hundred));
// })();

// // To add more functionality to the day of the week example,
// // we have to wrap it all in an object.

// var weekDay = function() {
// 	var names = ['Sunday','Monday','Tuesday','Wednesday',
// 								'Thursday','Friday','Saturday'];
// 	return {
// 		name: function(number) {return names[number]; },
// 		number: function(name) {return names.indexOf(name);}
// 	};
// }();

// console.log(weekDay.name(weekDay.number('Sunday')));

// // For big modules, it becomes awkward to have a bunch
// // of exported values at the end of a function. An alternative
// // is to declare an object, 'exports', and add properties
// // to that whenever we are defining something that needs
// // to be exported.

// (function(exports) {
// 	var names = ['Sunday','Monday','Tuesday','Wednesday',
// 								'Thursday','Friday','Saturday'];
// 	exports.name = function(number) {
// 		return names[number];
// 	};
// 	exports.number = function(name) {
// 		return names.indexOf(name);
// 	};
// })(this.weekDay = {});

// console.log(weekDay.name(weekDay.number('Saturday')));

//*************************************************
//******* Evaluating Data as Code *****************
//*************************************************

// // 'eval' can be used to execute a string of code in
// // the *current* scope. Not typically a good idea tho.
// function evalAndReturnX(code) {
// 	eval(code);
// 	return x;
// }

// console.log(evalAndReturnX('var x = 2'));

// // A better way is to use the 'Function' constructor.
// // Takes 2 args: a string with comma-separated list
// // of argument names and a string w/ the fxn's body.
// // With this, we can wrap a module's code in a fxn, with
// // that fxn's scope becoming our module scope.
// var plusOne = new Function('n', 'return n + 1;');
// console.log(plusOne(4));

//*************************************************
//*****************   Require   *******************
//*************************************************

// // The following is a minimal implementation of 'require'
// function require(name) {
// 	var code = new Function('exports', readFile(name));
// 	var exports = {};
// 	code(exports);
// 	return exports;
// }

// console.log(require('weekDay').name(1)); // --> Monday

// // When using this pattern, a module typically starts with
// // a few variable declarations that load the modules
// // it depends on.
// var weekDay = require('weekDay');
// var today   = require('today');

// console.log(weekDay.name(today.dayNumber()));

// This simple version of require has a problem.
// It can't export a value other than the exports object.
// The traditional solution for this is to provide modules
// with another variable, 'module', which is an object that
// has a property 'exports'.

// This style of module system is called CommonJS modules

function require(name) {
	if (name in require.cache)
		return require.cache[name];

	var code = new Function('exports, module', readFile(name));
	var exports = {}, module = {exports: exports};
	code(exports, module);

	require.cache[name] = module.exports;
	return module.exports;
}
require.cache = Object.create(null);





































