function Particle(position, velocity, color) {
	this.position = position;
	this.velocity = velocity;
	this.color = color;
	this.acceleration = new Vector();
}

Particle.prototype.update = function(){
	this.velocity.add(this.acceleration);
	this.position.add(this.velocity);
	this.submitToFields();
};

Particle.prototype.render = function(){
	ctx.fillStyle = this.color;
	ctx.fillRect(this.position.x, this.position.y, 1, 1);
};

Particle.prototype.submitToFields = function(){
	var accelerationX = 0;
	var accelerationY = 0;

	for (var i = 0; i < Application.LoadedScene.GameObjects[0].fields.length; i++) {
		var field = Application.LoadedScene.GameObjects[0].fields[i];
		var vector = new Vector();
			vector.x = field.position.x - this.position.x;
			vector.y = field.position.y - this.position.y;
		var strength = field.mass / Math.pow(vector.lengthSq(),1.5);

		accelerationX = vector.x * strength;
		accelerationY = vector.y * strength;

	}

	this.acceleration.x = accelerationX;
	this.acceleration.y = accelerationY;
};