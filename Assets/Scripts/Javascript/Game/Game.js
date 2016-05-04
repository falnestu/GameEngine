function Run() {
	Time.SetTimeValues();
	ctx.fillStyle = "rgba(255,255,255,0.6)";
	ctx.fillRect(0,0,canvas.width,canvas.height);
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	if (Application.LoadedScene != null) {
		Application.LoadedScene.Start();
	}
	
	RequestAnimationFrame(Run);
}