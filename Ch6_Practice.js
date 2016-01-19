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

// function Rabbit(type) {
// 	this.type = type;
// }

// var killerRabbit = new Rabbit('killer');
// var blackRabbit  = new Rabbit('black');
// console.log(blackRabbit.type);

// // Since all functions, including constructors, contain
// // an empty object as their prototype ({}), you can assign
// // properties into that empty prototype.

// Rabbit.prototype.speak = function(line) {
// 	console.log('The ' + this.type + ' rabbit says \'' +
// 		line + '\'');
// };
// blackRabbit.speak('Doom...');

// // OVERRIDING DERIVED PROPERTIES
// // Assigning a property to a pre-existing prototype
// // property will override the previous only for the 
// // specific object, not the prototype as a whole.

// Rabbit.prototype.teeth = 'small';
// console.log(killerRabbit.teeth);
// killerRabbit.teeth = 'long, sharp, and bloody';
// console.log(killerRabbit.teeth);
// console.log(blackRabbit.teeth);

//*************************************************
//***************   POLYMORPHISM   ****************
//*************************************************

var mountains = require('./06_object/code/mountains.js');

// Compute arrays of minimum column widths and row
// heights for a grid of cells.
function rowHeights(rows) {
	return rows.map(function(row) {
		return row.reduce(function(max, cell) {
			return Math.max(max, cell.minHeight());
		}, 0);
	});
}

function colWidths(rows) {
	return rows[0].map(function(_, i) {
		return rows.reduce(function(max, row) {
			return Math.max(max, row[i].minWidth());
		}, 0);
	});
}

// Draw the actual table.
function drawTable(rows) {
	var heights = rowHeights(rows);
	var widths  = colWidths(rows);

	function drawLine(blocks, lineNo) {
		return blocks.map(function(block) {
			return block[lineNo];
		}).join(" ");
	}

	function drawRow(row, rowNum) {
		var blocks = row.map(function(cell, colNum) {
			return cell.draw(widths[colNum], heights[rowNum]);
		});
		return blocks[0].map(function(_, lineNo) {
			return drawLine(blocks, lineNo);
		}).join('\n');
	}

	return rows.map(drawRow).join('\n');
}

// Next, create a constructor for cells that contain
// text, which implements the interface for table cells.
function repeat(string, times) {
	var result = '';
	for (var i = 0; i < times; i++)
		result += string;
	return result;
}

function TextCell(text) {
	this.text = text.split('\n');
}
TextCell.prototype.minWidth = function() {
	return this.text.reduce(function(width, line) {
		return Math.max(width, line.length);
	}, 0);
};
TextCell.prototype.minHeight = function() {
	return this.text.length;
};
TextCell.prototype.draw = function(width, height) {
	var result = [];
	for (var i = 0; i < height; i++) {
		var line = this.text[i] || '';
		result.push(line + repeat(' ', width - line.length));
	}
	return result;
};

// Let's use all this to build a checkerboard.
// var rows = [];
// for (var i = 0; i < 5; i++) {
// 	var row = [];
// 	for (var j = 0; j < 5; j++) {
// 		if ((j + i) % 2 == 0)
// 			row.push(new TextCell('##'));
// 		else
// 			row.push(new TextCell('  '));
// 	}
// 	rows.push(row);
// }
// console.log(drawTable(rows));

//Highlight the top row by underlining the column names.
function UnderlinedCell(inner) {
	this.inner = inner;
}

UnderlinedCell.prototype.minWidth = function() {
	return this.inner.minWidth();
};
UnderlinedCell.prototype.minHeight = function() {
	return this.inner.minHeight() + 1;
};
UnderlinedCell.prototype.draw = function(width,height) {
	return this.inner.draw(width, height - 1)
	.concat([repeat('-', width)]);
};

// function dataTable(data) {
// 	var keys = Object.keys(data[0]);
// 	var headers = keys.map(function(name) {
// 		return new UnderlinedCell(new TextCell(name));
// 	});
// 	var body = data.map(function(row) {
// 		return keys.map(function(name) {
// 			return new TextCell(String(row[name]));
// 		});
// 	});
// 	return [headers].concat(body);
// }

// console.log(drawTable(dataTable(mountains)));

//*************************************************
//************** GETTERS & SETTERS ****************
//*************************************************


// get and set notation for properties allows you to
// specify a function to be run when the property is
// read or written. You can also use Object.defineProperty
// to add such a property to an existing object.
// var pile = {
// 	elements: ['eggshell', 'orange peel', 'worm'],
// 	get height() {
// 		return this.elements.length;
// 	},
// 	set height(value) {
// 		console.log('Ignoring attempt to set height to', value);
// 	}
// };

// console.log(pile.height);
// pile.height = 100;


Object.defineProperty(TextCell.prototype, "heightProp", {
	get: function() {return this.text.length; }
});

var cell = new TextCell('no\nway');
console.log(cell.heightProp);

// If a getter is set but a setter is not, attempts
// to write to the property are simply ignored.
// cell.heightProp = 100;
// console.log(cell.heightProp);

//*************************************************
//***************** INHERITANCE *******************
//*************************************************

// RTextCell is basically the same as TextCell, except
// its draw method contains a different function.
// This pattern is called 'inheritance'.
function RTextCell(text) {
	TextCell.call(this, text);
}

RTextCell.prototype = Object.create(TextCell.prototype);
RTextCell.prototype.draw = function(width, height) {
	var result = [];
	for (var i = 0; i < height; i++) {
		var line = this.text[i] || '';
		result.push(repeat(' ', width - line.length) + line);
	}
	return result;
};

function dataTable(data) {
	var keys = Object.keys(data[0]);
	var headers = keys.map(function(name) {
		return new UnderlinedCell(new TextCell(name));
	});
	var body = data.map(function(row) {
		return keys.map(function(name) {
			var value = row[name];
			//This was changed:
			if (typeof value == 'number')
				return new RTextCell(String(value));
			else
				return new TextCell(String(value));
		});
	});
	return [headers].concat(body);
}

// console.log(drawTable(dataTable(mountains)));




























