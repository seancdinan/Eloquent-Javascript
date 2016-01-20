// Make a cell type named StretchCell(inner, width, height)
// that conforms to the table cell interface described earlier
// in the chapter. It should wrap another cell and ensure
// that the resulting cell has at least the given width and 
// height, even if the inner cell would naturally be smaller.

function StretchCell(inner, width, height) {
	this.inner = inner;
	this.width = width;
	this.height= height;
	var finalCell = [];
	function repeat(string, length) {
		var str = [];
		for (i = 0; i < length; i++)
			str[i] = string;
		return str;
	}
	// Figure out size of left & right spacers
	if (width >= inner.length)
		var widthSpace = (width - inner.length)/2;
	else
		console.log('Width must be larger than string');
	// Figure out size of top & bottom spacers
	if ((height - 1) % 2 === 0) {
		var hTop = (height - 1)/2;
		var hBot = (height - 1)/2;
	}
	else {
		var hTop = height/2;
		var hBot = hTop - 1;
	}
	// Assemble the final cell.
	var heightCounter = 0;
	for (var i = 0; i < hTop; i++) {
		finalCell[i] = repeat(' ', width);
		heightCounter++;
	}
	finalCell[heightCounter] = repeat(' ',widthSpace)
	 + inner + repeat(' ',widthSpace);
	heightCounter++;
	for (var i = heightCounter; i < height; i++) {
		finalCell[i] = repeat(' ', width);
	}
	return finalCell;
}


var testString = 'Hello World';
var tester = new StretchCell(testString, 20, 3);

console.log(tester);




