function arrayToList(input) {
	function magicBox(input, n) {
		if (n < input.length) {
			var localOutput = {};
			localOutput.value = input[n];
			localOutput.rest = magicBox(input, n+1);
			if (localOutput.rest === undefined) {
				localOutput.rest = null;
			}
		}
	return localOutput;
	}
	var n = 0;
	var result = magicBox(input, n);
	return result;
}


function listToArray(input) {
	var result = [];
	arraySpot = 0;
	while (input.rest !== null) {
		result[arraySpot] = input.value;
		input = input.rest;
		arraySpot++;
	}
	result[arraySpot] = input.value;
	return result;
}



var x = arrayToList([1,2,3]);
var y = listToArray(x);

console.log(x);
console.log(y);