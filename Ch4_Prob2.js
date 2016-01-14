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

function reverseArrayInPlace(list) {
	list = [5,4,3,2,1];
}

function changer(z) {
	z = 5;
}

x = 4;
console.log(x);

changer(x);
console.log(x);