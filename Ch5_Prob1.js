var startArray = [[1,2,3],[4,5,6],[7,8,9]];

var flattened = startArray.reduce(function(a, b){
	return a.concat(b);
})


console.log(startArray)
console.log(flattened)