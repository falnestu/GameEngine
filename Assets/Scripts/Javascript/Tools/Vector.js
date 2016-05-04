function Vector() {

	this.x = 0;
	this.y = 0;

	//Vector de direction
	this.add = function (vector) {
		this.x += vector.x;
		this.y += vector.y;

		return this;
	}

	//Vector entre deux positions
	this.sub = function (vector) {
		this.x -= vector.x;
		this.y -= vector.y;

		return this;
	}

	//Distance 
	this.lengthSq = function(vector) {
		return this.x * this.x + this.y * this.y;
	}

	//Magnitude
	this.length = function(vector) {
		//return Math.sqrt(this.x * this.x + this.y * this.y);
		return Math.sqrt(this.lengthSq());
	}

	//Multiplicate
	this.mul = function(factor) {
		this.x *= factor;
		this.y *= factor;

		return this;	
	}

	this.div = function(factor) {
		this.x /= factor;
		this.y /= factor;

		return this;	
	}

	this.normalize = function() {
		var vector = new Vector();
		vector.x = this.x;
		vector.y = this.y;
		vector.div(this.length());
		return Vector;
	}

	this.getAngle = function() {
		return Math.atan2(this.y, this.x)
	}

	//Next point from angle
	this.fromAngle = function(angle) {
		var vector = new Vector();
		vector.x = this.length() * Math.cos(angle);
		vector.y = this.length() * Math.sin(angle);
		return vector;
	}

	this.outOfBounds = function() {
		return this.x < 0 || this.x > canvas.width ||
			 this.y < 0 || this.y > canvas.height;
	}
}

