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
var rows = [];
for (var i = 0; i < 5; i++) {
	var row = [];
	for (var j = 0; j < 5; j++) {
		if ((j + i) % 2 == 0)
			row.push(new TextCell('##'));
		else
			row.push(new TextCell('  '));
	}
	rows.push(row);
}
console.log(drawTable(rows));




















