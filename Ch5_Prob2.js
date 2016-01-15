var rawAncestry = require('./05_higher_order/code/ancestry.js');
var ancestry = JSON.parse(rawAncestry);
// ****************************************************

function aveMotherAge(array) {
	function childInfo(list) {
		var info = list.map(function(person){
			return [person.name, person.born, person.mother];
		});
		return info;
	}
	function getColumn(list,column) {
		var result = [];
		for (var n = 0; n < list.length; n++)
			result[n] = list[n][column];
		return result;
	}
	function getMoms(list) {
		var result = [];
		for (var i = 0; i < list.length; i++) {
			for (var n = 0; n < list.length; n++) {
				if (list[i][2] === list[n][0])
					result[i] = list[n][1];
			}
		}
		return result;
	}
	function getAge(kidYear, momYear) {
		var result = [];
		var counter= 0;
		for (var n = 0; n < kidYear.length; n++) {
			if (isNaN(momYear[n]) == false) {
				result[counter] = kidYear[n] - momYear[n];
				counter++ 
			};
		};
		var amount = result.length;
		var total  = result.reduce(function(a, b){
			return a+b;
		})
		var average = total/amount;
		return average;
	}
	var children = childInfo(ancestry);
	var childrenYears = getColumn(children,1);
	var momYears = getMoms(children);
	var momAges = getAge(childrenYears, momYears);
	return momAges;
}

console.log(aveMotherAge(ancestry));