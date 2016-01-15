var rawAncestry = require('./05_higher_order/code/ancestry.js');
var ancestry = JSON.parse(rawAncestry);
// ****************************************************

// function filter(array, test) {
// 	var passed = [];
// 	for (var i = 0; i < array.length; i++) {
// 		if (test(array[i]))
// 			passed.push(array[i]);
// 	}
// 	return passed;
// }
// ****************************************************

// function map(array, transform) {
// 	var mapped = [];
// 	for (var i = 0; i < array.length; i++)
// 		mapped.push(transform(array[i]));
// 	return mapped;
// }

// var overNinety = ancestry.filter(function(person){
// 	return person.died - person.born > 90;
// });

// console.log(map(overNinety, function(person){
// 	return person.name;
// }));
// ****************************************************

// function reduce(array, combine, start) {
// 	var current = start;
// 	for (var i = 0; i < array.length; i++)
// 		current = combine(current, array[i]);
// 	return current;
// }

// console.log(reduce([1,2,3,4],function(a,b) {
// 	return a + b;
// }, 0));

// console.log(ancestry.reduce(function(min, cur){
// 	if (cur.born < min.born) return cur;
// 	else return min;
// }));
// ****************************************************

// function average(array) {
// 	function plus(a, b) { return a + b; }
// 	return array.reduce(plus) / array.length;
// }

// function age(p) { return p.died - p.born; }
// function male(p){ return p.sex == 'm'; }
// function female(p){return p.sex == 'f';}

// console.log(average(ancestry.filter(male).map(age)));
// console.log(average(ancestry.filter(female).map(age)));
// ****************************************************

// var byName = {};
// ancestry.forEach(function(person) {
// 	byName[person.name] = person;
// });

// function reduceAncestors(person, f, defaultValue) {
// 	function valueFor(person) {
// 		if (person === null)
// 			return defaultValue;
// 		else
// 			return f(person, valueFor(byName[person.mother]),
// 											 valueFor(byName[person.father]));
// 	}
// 	return valueFor(person);
// }
// ****************************************************

var theSet = ["Carel Haverbeke", "Maria van Brussel", "Donald Duck"];

function isInSet(set, person) {
	return set.indexOf(person.name) > -1;
}

console.log(ancestry.filter(function(person) {
	return isInSet(theSet, person);
}));

console.log(ancestry.filter(isInSet.bind(null, theSet)));





