// Find the minimum of two values.

function findMin(x, y) {
	if (x > y)
		return y;
	else if (x < y)
		return x;
	else
		return 'The values are equal.';
}

console.log(findMin(2,4));
console.log(findMin(4,2));
console.log(findMin(3,3));