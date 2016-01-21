//*************************************************
//***************** First Try   *******************
//*************************************************
	
// function makePerson(first, last) {
// 	return {
// 		first: first,
// 		last: last
// 	};
// }
// function personFullName(person) {
// 	return person.first + ' ' + person.last;
// }
// function personFullNameReverse(person) {
// 	return person.last + ', ' + person.first;
// }

// test = makePerson('Sean', 'Dinan');
// console.log(personFullName(test));
// console.log(personFullNameReverse(test));

//*************************************************
//***************** Second Try  *******************
//*************************************************

// We need a way to attach functions to objects so
// as to prevent bogging down the global namespace.

// function makePerson(first, last) {
// 	return {
// 		first: first,
// 		last: last,
// 		fullName: function() {
// 			return this.first + ' ' + this.last;
// 		},
// 		fullNameReversed: function() {
// 			return this.last + ', ' + this.first;
// 		}
// 	};
// }

// s = makePerson('Sean', 'Dinan');
// console.log(s.fullName());

//*************************************************
//*****************  Third Try  *******************
//*************************************************

//We can use the 'this' keyword to improve things.

// function Person(first, last) {
// 	this.first = first;
// 	this.last  = last;
// 	this.fullName = function() {
// 		return this.first + ' ' + this.last;
// 	};
// 	this.fullNameReversed = function() {
// 		return this.last + ', ' + this.first;
// 	};
// }
// var s = new Person('Sean', 'Dinan');
// console.log(s.fullName());

//*************************************************
//***************** Fourth Try  *******************
//*************************************************
	
// // Instead of creating brand new function objects every
// // time a person object is created, why not have the 
// // code be shared between objects?

// // First define the method functions
// function personFullName() {
// 	return this.first + ' ' + this.last; 
// }
// function personFullnameReversed() {
// 	return this.last + ', ' + this.first;
// }
// // Assign the references to these method functions
// // inside of the constructor.
// function Person(first, last) {
// 	this.first = first;
// 	this.last = last;
// 	this.fullName = personFullName;
// 	this.fullNameReversed = personFullnameReversed;
// }


//*************************************************
//***************** Fifth Try   *******************
//*************************************************
	
// But wait! We can do even better.
function Person(first, last) {
	this.first = first;
	this.last  = last;
}
Person.prototype.fullName = function fullName() {
	return this.first + ' ' + this.last;
};
Person.prototype.fullNameReversed = function fullNameReversed() {
	return this.last + ', ' + this.first;
};

var s = new Person('Sean', 'Dinan');

Person.prototype.firstNameCaps = function firstNameCaps() {
	return this.first.toUpperCase()
};

//console.log(s.firstNameCaps());

// apply() has a sister function named 'call' which lets
// you set 'this', but takes an expanded argument list instead
// of an array.

function lastNameCaps() {
	return this.last.toUpperCase();
}
lastNameCaps.call(s);
// is the same as:
s.lastNameCaps = lastNameCaps;
console.log(s.lastNameCaps())













