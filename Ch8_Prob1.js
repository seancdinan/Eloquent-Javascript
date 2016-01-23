// 2 outcomes for primitiveMultiply:
//    - 50% of the time multiplies 2 numbers
//    - 50% of the times raises an exception of type
//			MultiplicatorUnitFailure.
//
// Goal: Write a function that wraps this clunky fxn and just
//       keeps trying until a call succeeds, after which it
//       return the result.
//			- Make sure you only handle the exceptions you're
//				trying to handle.

// Create an Exception Type to get thrown.
function MultiplicatorUnitFailure(message) {
	this.message = message;
	this.stack   = (new Error()).stack;
}
MultiplicatorUnitFailure.prototype = Object.create(Error.prototype);
MultiplicatorUnitFailure.prototype.name = 'MultiplicatorUnitFailure';


// Define the muliply function.
function primitiveMultiply(x, y) {
	// Choose either 0 or 1 for a random outcome.
	var outcome = Math.round(Math.random());
	if (outcome == 0)
		return x * y;
	else
		throw new MultiplicatorUnitFailure('Didn\'t work :(');
}

// Create the function to wrap the multiply function.
function fxnTester(fxn, arg1, arg2) {
	try {
		var result = fxn(arg1, arg2);
	} catch (error) {
		fxnTester(fxn, arg1, arg2);
	}
	return result;
}

console.log(fxnTester(primitiveMultiply,2,4));
console.log(fxnTester(primitiveMultiply,2,5));
console.log(fxnTester(primitiveMultiply,3,4));
console.log(fxnTester(primitiveMultiply,4,4));