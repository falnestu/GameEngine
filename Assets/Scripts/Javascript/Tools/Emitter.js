function Emitter(position, velocity, spread, rate, max) {
	this.particles = [];
	this.position = position || new Vector();
	this.velocity = velocity || new Vector();
	//angles possible de direction des particules
	this.spread = spread || Math.PI/32;
	this.color = "blue";
	//nombres de particules à la frame
	this.rate = rate || 5;
	this.particlesMax = max || 20000;
	this.i=0;
}

Emitter.prototype.emitParticles = function(){
	var count = this.rate;
	while(count--){
		if (this.particles.length < this.particlesMax) {
			var angle = this.velocity.getAngle() + this.spread - (Math.random() * this.spread * 2) /*+ ++this.i*/;
			var position = new Vector();
			position.x = this.position.x;
			position.y = this.position.y;
			var velocity = this.velocity.fromAngle(angle);
			this.particles.push(new Particle(position, velocity, this.color));
		}
		else return 0;
	}
};

Emitter.prototype.update = function(){
	this.emitParticles();
	for(var index in this.particles){
		this.particles[index].update();	
		this.particles[index].render();	
		if (this.particles[index].position.outOfBounds()) {	
			this.particles.splice(index,1);	
			index--;
		}
	}
};