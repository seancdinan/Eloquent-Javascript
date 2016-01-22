//*************************************************
//******  CHAPTER 7: ELECTRONIC LIFE  *************
//*************************************************

// PROJECT GOAL: Build a virtual ecosystem, a little
// world populated with critters that move around and
// struggle for survival.

var plan = ["############################",
						"#        #    #      o    ##",
						"#                          #",
						"#            #####         #",
						"##           #   #    ##   #",
						"###             ##     #   #",
						"#             ###      #   #",
						"#   ####                   #",
						"#   ##         o           #",
						"# o  #           o     ### #",
						"#    #                     #",
						"############################"];

// 'Vector' is used to represent coord pairs on the grid.
function Vector(x, y) {
	this.x = x;
	this.y = y;
}
Vector.prototype.plus = function(other) {
	// Adds two vector coords together into a new coord pair.
	return new Vector(this.x + other.x, this.y + other.y);
};

// We will create a seperate grid object to keep the world
// object simple. The world should focus on world things,
// and the grid on grid things.

// The grid is stored in a single array with size width*height.
// Element (x, y) can be found at position x + (y * width).

// Let's define the 'Grid' object w/ some basic methods.
function Grid(width, height) {
	this.space = new Array(width * height);
	this.width = width;
	this.height= height;
}
// Confirm that a vector is within the grid boundaries
Grid.prototype.isInside = function(vector) {
	return vector.x >= 0 && vector.x < this.width &&
				 vector.y >= 0 && vector.y < this.height;
};
// Return the array location of a given vector
Grid.prototype.get = function(vector) {
	return this.space[vector.x + this.width * vector.y];
};
// Set the array location of a given vector to a value
Grid.prototype.set = function(vector, value) {
	this.space[vector.x + this.width * vector.y] = value;
};


// Create an object to map from direction names
// to coordinate offsets.
var directions = {
	'n': new Vector(0, -1),
	'ne':new Vector(1, -1),
	'e': new Vector(1,  0),
	'se':new Vector(1,  1),
	's': new Vector(0,  1),
	'sw':new Vector(-1, 1),
	'w': new Vector(-1, 0),
	'nw':new Vector(-1, -1)
};

// Here's a stupid critter that goes until it hits
// an obstacle then bounces off in a random open direction.

// Given an array, pick a random value (helper function)
function randomElement(array) {
	return array[Math.floor(Math.random() * array.length)];
}

// Create a list of all possible directions.
var directionNames = 'n ne e se s sw w nw'.split(' ');

// Pick a random direction from the list of possibilities
function BouncingCritter() {
	this.direction = randomElement(directionNames);
};

// look & find functions will be defined later
BouncingCritter.prototype.act = function(view) {
	if (view.look(this.direction) != ' ')
		this.direction = view.find(' ') || 's';
	return {type: 'move', direction: this.direction};
};

// Now we can start on the 'World' object type.
// It takes a plan as well as a legend of arguments.

// Look up the character's constructor and apply new to it
// to create an instance of the right type.
// Then use originChar to make it easy to find out where
// the element was originally created.
function elementFromChar(legend, ch) {
	if (ch === ' ')
		return null;
	var element = new legend[ch]();
	element.originChar = ch;
	return element;
}
// Given the map, create a grid that's x wide and y long.
function World(map, legend) {
	var grid = new Grid(map[0].length, map.length);
	this.grid = grid;
	this.legend = legend;

// FIGURE OUT WHAT THIS DOES?
	map.forEach(function(line, y) {
		for (var x = 0; x < line.length; x++)
			grid.set(new Vector(x, y), elementFromChar(legend, line[x]));
	});
}

// Either return an empty space or the appropriate character.
function charFromElement(element) {
	if (element === null)
		return ' ';
	else
		return element.originChar;
}

World.prototype.toString = function() {
	var output = '';
	for (var y = 0; y < this.grid.height; y++) {
		for (var x = 0; x < this.grid.width; x++) {
			var element = this.grid.get(new Vector(x, y));
			output += charFromElement(element);
		}
		output += '\n';
	}
	return output;
};

// A wall is a simple object. It is only used for taking up
// space and has no 'act' method.
function Wall() {}

// Let's use the plan from earlier to make a world.
var world = new World(plan, {'#': Wall, 'o': BouncingCritter});
console.log(world.toString());










