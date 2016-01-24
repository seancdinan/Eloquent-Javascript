


var box = {
	locked: true,
	unlock: function() { this.locked = false; },
	lock: function() {this.locked = true; },
	_content: [],
	get content() {
		if (this.locked) throw new Error('Locked!');
		return this._content;
	}
};

function withBoxUnlocked(val) {
// Takes a function value as an argument, unlocks the box,
// runs the function, then ensures that the box is locked
// again before returning, regardless of whether the argument
// function returned normally or threw an exception.	
	val.unlock();
	var result = val.content();
	val.lock();
	console.log(result);
}

withBoxUnlocked(box.content());