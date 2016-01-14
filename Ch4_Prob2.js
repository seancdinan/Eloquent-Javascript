function reverseArray(list) {
	// Takes array as argument, produces new array
	// that has the same elements in reverse order.
	var newList = [];
	var oldSpot = list.length - 1;
	for (n = 0; n < list.length; n++) {
		newList[n] = list[oldSpot];
		oldSpot--;
	}
	return newList;
}

function reverseArrayInPlace() {
	var newList = [];
	var oldSpot = list.length - 1;
	for (n = 0; n < list.length; n++) {
		newList[n] = list[oldSpot];
		oldSpot--;
	}
	list = newList;
}

list = [1,2,3,4,5];

reverseArrayInPlace();
console.log(list);