function GameObject() 
{
	this.name = "Model";
	this.enabled = true;
	this.started = false;

	this.Awake = function() {
		console.clear();
		console.log("%c System:GameObject " + this.name + " Created!", 'background:#222; color:#bada55');
	}

	this.Start = function() {
		if (!this.started) {
			//To do on start

			this.started = true;
			console.log("%c System:GameObject " + this.name + " Started!", 'background:#222; color:#bada55');

		}
		this.Update();
	}

	this.Update = function() {
		if (this.enabled) {

		}
		this.GUI();
	}

	this.GUI = function() {

	}

	this.Awake();
}