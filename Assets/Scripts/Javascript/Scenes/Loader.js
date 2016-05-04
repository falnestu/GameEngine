function Loader() {

	this.name = "Loader";
	this.GameObjects = [];

	this.started = false;

	this.Awake = function() {
		LoadImages();
		//console.clear();
		console.log("%c System:Scene " + this.name + " Created!", 'background:#222; color:#bada55');
	}

	this.Start = function() {
		if (!this.started && allImagesLoaded) {
			Time.SetTimeWhenGameBegin();
			//First Frame
			Scenes["Scene1"] = new Scene1();
			this.started = true;
			console.log("%c System:Scene " + this.name + " Started!", 'background:#222; color:#bada55');
			Time.SetTimeWhenGameLoaded();
		}
		this.Update();
	}

	this.Update = function() {
		if (this.imageLoaded) {
			Application.LoadedScene = Scenes["Scene1"];
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