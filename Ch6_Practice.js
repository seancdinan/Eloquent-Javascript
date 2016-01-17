//*************************************************
//****************   METHODS   ********************
//*************************************************

// function speak(line) {
// 	console.log("The " + this.type + " rabbit says \'" +
// 		line + "\'");
// }

// var whiteRabbit  = {type: 'white', speak: speak};
// var fatRabbit    = {type: 'fat', speak: speak};

// //whiteRabbit.speak('Oh my ears and whiskers, ' + 
// // 'how late it\'s getting!');

// speak.apply(fatRabbit, ['Burp!']);
// speak.call({type: 'old'}, 'Oh my.');

//*************************************************
//***************   PROTOTYPES   ******************
//*************************************************

// var empty = {};
// console.log(empty.toString);
// console.log(empty.toString());

// console.log(Object.getPrototypeOf({}) == Object.prototype);
// console.log(Object.getPrototypeOf(Object.prototype));
// console.log(Object.prototype);

// Define a proto function as an object:
// var protoRabbit = {
// 	speak: function(line) {
// 		console.log('The ' + this.type + ' rabbit says \'' +
// 			line + '\'');
// 	}
// };

// // Appy the proto function to something else
// var killerRabbit = Object.create(protoRabbit);
// killerRabbit.type = 'killer';
// // Since the speak function is a prototype function
// // to the killerRabbit, it can be called without being 
// // a part of the actual killerRabbit object.
// killerRabbit.speak('SKREEEE!');

//*************************************************
//***************   CONSTRUCTORS   ****************
//*************************************************

function Rabbit(type) {
	this.type = type;
}

var killerRabbit = new Rabbit('killer');
var blackRabbit  = new Rabbit('black');
console.log(blackRabbit.type);

// Since all functions, including constructors, contain
// an empty object as their prototype ({}), you can assign
// properties into that empty prototype.

Rabbit.prototype.speak = function(line) {
	console.log('The ' + this.type + ' rabbit says \'' +
		line + '\'');
};
blackRabbit.speak('Doom...');

// OVERRIDING DERIVED PROPERTIES
// Assigning a property to a pre-existing prototype
// property will override the previous only for the 
// specific object, not the prototype as a whole.

Rabbit.prototype.teeth = 'small';
console.log(killerRabbit.teeth);
killerRabbit.teeth = 'long, sharp, and bloody';
console.log(killerRabbit.teeth);
console.log(blackRabbit.teeth);































