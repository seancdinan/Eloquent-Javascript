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