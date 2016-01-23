//*************************************************
//***************** Find the Error! ***************
//*************************************************

// function numberToString(n, base) {
// 	var result = '', sign = '';
// 	if (n < 0) {
// 		sign = '-';
// 		n = -n;
// 	}
// 	do {
// 		result = String(n % base) + result;
// 		//n /= base;
// 		n = Math.floor(n / base);
// 	} while (n > 0);
// 	return sign + result;
// }

// console.log(numberToString(13, 10));

//*************************************************
//***************** Exceptions  *******************
//*************************************************

// function promptDirection(question) {
// 	var result = prompt(question, '');
// 	if (result.toLowerCase() == 'left') return 'L';
// 	if (result.toLowerCase() == 'right') return 'R';
// 	throw new Error('Invalid direction: ' + result);
// }

// function look() {
// 	if (promptDirection('Which way?') == 'L')
// 		return 'a house';
// 	else
// 		return 'two angry bears';
// }

// try {
// 	console.log('You see', look());
// } catch (error) {
// 	console.log('Something went wrong: ' + error);
// }

//*************************************************
//********* Cleaning Up After Exceptions **********
//*************************************************

// var context = null;

// function withContext(newContext, body) {
// 	var oldContext = context;
// 	context = newContext;
// 	var result = body();
// 	context = oldContext;
// 	return result;
// }

// try {
// 	withContext(5, function() {
// 		if (context < 10)
// 			throw new Error('Not enough context!');
// 	});
// } catch (e) {
// 	console.log('Ignoring: ' + e);
// }

// console.log(context);


//*************************************************
//************ Selective Catching *****************
//*************************************************

// This is a way to intentionally create a loop that 
// doesn't terminate on its own. The only way to break 
// out of the loop is when a valid direction is given.

for (;;) {
	try {
		var dir = promptDirection('Where?');
		console.log('You chose: ', dir);
		break;
	} catch (e) {
		console.log('Not a valid direction. Try again.');
	}
}

// We can define a new type of error and use 'instanceOf'
// to identify it.

function InputError(message) {
	this.message = message;
	this.stack   = (new Error()).stack;
}
// The prototype is made to derive from Error.prototype
// so that instanceOf Error will also return true for
// InputError objects.
InputError.prototype = Object.create(Error.prototype);
InputError.prototype.name = 'InputError';








