var rawAncestry = require('./05_higher_order/code/ancestry.js');
var ancestry = JSON.parse(rawAncestry);
// ****************************************************

function aveAgeByCentury(array) {
	var info = array.map(function(person) {
		return [person.born, person.died]
	})
	var age = [];
	var century = [];
	for (var n = 0; n < info.length; n++) {
		age[n] = info[n][1] - info[n][0];
	}
	for (var n = 0; n < info.length; n++) {
		century[n] = [age[n],Math.ceil(info[n][1]/100)];
	}
	var sums = [0,0,0,0,0];
	var amount=[0,0,0,0,0];
	var counter = 0;
	for (var i = 16; i <= 20; i++){
		for (var n = 0; n < info.length; n++) {
			if(century[n][1] === i) {
				sums[counter] += century[n][0];
				amount[counter] ++;
			}
		}
		counter++;
	}
	var aveAge = [];
	for (var n = 0; n < sums.length; n++) {
		aveAge[n] = sums[n]/amount[n];
	}
	return aveAge;
}

console.log(aveAgeByCentury(ancestry))

