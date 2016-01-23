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

// Let's create a forEach prototype function that supports
// a context parameter. It calls a given function for each
// element in the grid that isn't null or undefined.
Grid.prototype.forEach = function(f, context) {
	for (var y = 0; y < this.height; y++) {
		for (var x = 0; x < this.width; x++) {
			var value = this.space[x + y * this.width];
			if (value != null)
				f.call(context, value, new Vector(x, y));
		}
	}
};

// Next, we write a 'turn' method for the world object
// that gives the critters a chance to act. It'll go over
// the grid using forEach and look for objects with an 'act'
// method to get an action object and carry out the action.
// To avoid double-moving creatures, we'll need an array
// of critters that have already moved.
World.prototype.turn = function() {
	var acted = [];
	this.grid.forEach(function(critter, vector) {
		if (critter.act && acted.indexOf(critter) == -1) {
			acted.push(critter);
			this.letAct(critter, vector);
		}
	}, this);
};

// The letAct method contains the actual logic that allows
// the critters to move.
World.prototype.letAct = function(critter, vector) {
	var action = critter.act(new View(this, vector));
	if (action && action.type == 'move') {
		var dest = this.checkDestination(action, vector);
		if (dest && this.grid.get(dest) == null) {
			this.grid.set(vector, null);
			this.grid.set(dest, critter);
		}
	}
};

World.prototype.checkDestination = function(action, vector) {
	if (directions.hasOwnProperty(action.direction)) {
		var dest = vector.plus(directions[action.direction]);
		if (this.grid.isInside(dest))
			return dest;
	}
}

// The only part we're still missing is the 'View' type.
function View(world, vector) {
	this.world = world;
	this.vector = vector;
}
View.prototype.look = function(dir) {
	var target = this.vector.plus(directions[dir]);
	if (this.world.grid.isInside(target))
		return charFromElement(this.world.grid.get(target));
	else
		return '#';
};
View.prototype.findAll = function(ch) {
	var found = [];
	for (var dir in directions)
		if (this.look(dir) == ch)
			found.push(dir);
		return found;
};
View.prototype.find = function(ch) {
	var found = this.findAll(ch);
	if (found.length == 0) return null;
	return randomElement(found);
}

// Let's now add some functions to make a critter
// that can walk alongside a wall
function dirPlus(dir, n) {
	var index = directionNames.indexOf(dir);
	return directionNames[(index + n + 8) % 8];
}

function WallFollower() {
	this.dir = 's';
}

// This act method scans the surroundings, starting
// at the left and going clockwise in its search for an
// empty space.
WallFollower.prototype.act = function(view) {
	var start = this.dir;
	if (view.look(dirPlus(this.dir, -3)) != ' ')
		start = this.dir = dirPlus(this.dir, -2);
	while (view.look(this.dir) != ' ') {
		this.dir = dirPlus(this.dir, 1);
		if (this.dir == start) break;
	}
	return {type: "move", direction: this.dir};
};
























