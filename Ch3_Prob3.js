function countBs (string) { 
	var count = 0;
	for (N=0; N <= string.length - 1; N++){
		if (string.charAt(N) === 'B')
			count++;
	} 
	return count;
}

function countChar (string,letter) {
	var count = 0;
	for (N=0; N <= string.length - 1; N++){
		if (string.charAt(N) === letter)
			count++;
	} 
	return count;
}


console.log(countChar('Big Blue Ducks','l'));