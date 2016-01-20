// Write a constructor 'Vector' that represents a vector in
// two-dimensional space. It takes x & y parameters (numbers),
// which it should save to properties of the same name.
// Give the 'Vector' prototype two methods, 'plus' & 'minus'
// that take another vector as a parameter and return a new
// vector that has the sum or difference of the two vectors'
// (the one in 'this' and the parameter) x and y values.
// Add a getter property 'length' to the prototype that
// computes the length of the vector -- that is, the distance
// of the point (x, y) from the origin (0, 0).

// Define the Vector Constructor.
function Vector(x, y) {
	this.x = x;
	this.y = y;
}

// Create 2 functions to add or subtract respectively.
Vector.prototype.plus = function(newVector) {
	var xSum = this.x + newVector.x;
	var ySum = this.y + newVector.y;
	return new Vector(xSum, ySum);
}
Vector.prototype.minus = function(newVector) {
	var xSum = this.x - newVector.x;
	var ySum = this.y - newVector.y;
	return new Vector(xSum, ySum); 
}

// Make a getter fxn to calculate length from a vector
// and the origin (0,0);
Object.defineProperty(Vector.prototype, 'length', {
	get: function() { 
		var dist = Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
		return dist;
	}
});


// Test em out & print the results.
var vector = new Vector(12,20);
var tester = new Vector(10,4);
var adder  = vector.plus(tester);
var subber = vector.minus(tester);

console.log(vector);
console.log(tester);
console.log('***********************')
console.log(adder);
console.log(subber);
console.log('***********************');
console.log(vector.length);
console.log(tester.length);
console.log('***********************');