function every(array, condition) {
	var decider = false;
	for (var n = 0; n < array.length; n++) {
		decider = condition(array[n]);
		if(decider === false) return decider;
	}
	return true;
}
function some(array, condition) {
	var decider = false;
	for (var n = 0; n < array.length; n++) {
		decider = condition(array[n]);
		if(decider === true) return decider;
	}
	return false;
}


var arrayA = [1,2,3,4,5];
var arrayB = ['dog','cat','dog','mouse'];
var arrayC = [5,5,5,5,5,5];

console.log(every(arrayB, function(val){
	return val === 'dog';
}))

console.log(some(arrayB, function(val){
	return val === 'dog';
}))