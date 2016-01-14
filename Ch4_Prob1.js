function numRange(start, end, step) {
	var numList = [];
	var numVal = start;
	if (step === undefined) {
		for (n = 0; n <= (end-start); n++) {
			numList[n] = numVal;
			numVal++;
		}
	}
	else {
		for (n=0; n <= (end-start)/step; n++) {
			numList[n] = numVal;
			numVal = numVal + step;
		}
	}
	return numList;
}

function numSum(values) {
	var total = 0;
	for (n = 0; n < values.length; n++) {
		total = total + values[n];
	}
	return total;
}

console.log(numRange(1,5));
