function isEven(number) {
	if (number >= 0) {
		if (number === 1)
			return false;
		else if (number === 0)
			return true;
		else {
			var newNumber = number - 2;
			return isEven(newNumber);
		}
	}
	else {
		var newNumber = number + 2;
		return isEven(newNumber);
	}
}

console.log(isEven(2));