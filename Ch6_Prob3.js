// 1. Design an *interface* that abstracts iteration over
//    a collection of values.
// 2. An object that provides this interface represents a 
//    sequence, and the interface must be able to iterate
//    over the sequence doing:
//      a. Looking at the element values it is made up of.
//      b. Having some way to find out when the end of the
//         sequence is reached.
// 3. Write a function 'logFive' that:
//      a. Takes a sequence object
//			b. Calls console.log on its first 5 elements
//			     i. Or fewer if the sequence is < 5 elements.
// 4. Implement an object type 'ArraySeq' that:
//			a. Wraps an array
//			b. Allows iteration over the array using the
//				 interface you designed.
// 5. Implement an object type 'RangeSeq' that iterates
//	  over a range of integers (taking 'from' and 'to'
//		arguments to its constructor) instead.

function Interface(sequence, action, amount) {
	this.sequence = sequence; // Specify the sequence of values
	this.action   = action;   // Specify the function to initiate
	this.amount   = amount;   // Specify the # of elements to take
}
Interface.prototype.runIt = function() {

}

var logFive = function(values) {
	// Log (at most) the first 5 values of a sequence.
	if (values.length < 5) {
		for (var i = 0; i < values.length; i++)
			console.log(values[i]);
	}
	else {
		for (var i = 0; i < 5; i++)
			console.log(values[i]);
	}
}




testSequence = [1, 2, 3, 4, 5];