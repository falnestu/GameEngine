function Scene1() {

	this.name = "Model";
	this.GameObjects = [];

	this.started = false;

	this.Awake = function() {
		//console.clear();
		console.log("%c System:Scene " + this.name + " Created!", 'background:#222; color:#bada55');
	}

	this.Start = function() {
		
		if (!this.started) {
			Time.SetTimeWhenSceneBegin();
			//First Frame
			this.GameObjects.push(new ParticlesSystem());
			//this.GameObjects.push(new GameObject1());
			//var go = new GameObject1();
			//go.Transform.angle = 0;
			//this.GameObjects.push(go);
			this.started = true;
			console.log("%c System:Scene " + this.name + " Started!", 'background:#222; color:#bada55');
			Time.SetTimeWhenSceneLoaded();
		}
		this.Update();
	}

	this.Update = function() {
/*		ctx.fillStyle = "blue";
		ctx.fillRect(0,0,canvas.height, canvas.width)*/
		if (!Application.GamePaused) {
			for (var i = 0; i < this.GameObjects.length; i++) {
				this.GameObjects[i].Start();
			}	
		}
		if (Application.isDebug) {
			Debug.Scene();
			Debug.GameObject();
		}
		this.GUI();
	}

	this.GUI = function () {
		if (!Application.GamePaused) {
			// SHOW UI
		} else {
			// SHOW PAUSE MENU
		}  
	}
	this.Awake();
}