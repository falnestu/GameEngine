var Debug = {
	ShowFPS : function() {
		var color = "red";
		if (Time.FPS > 40) {
			color  = 'green';
		} else if (Time.FPS > 20) {
			color  = 'orange';
		}
		drawText("FPS",Time.FPS,40,20,color);
	},

	Scene : function() {
		//draw box
		ctx.fillStyle = "rgba(122,122,122,0.4)";
		ctx.fillRect(4,4,200,100);

		//FPS Counter
		this.ShowFPS();

		//Game Begin
		drawText("Game", (Time.GetTimeSinceGameBegin() / 1000 |0).toString().toHHMMSS(), 15, 40);
		drawText("Scene", (Time.GetTimeSinceSceneLoaded() / 1000 |0).toString().toHHMMSS(), 15, 60);

		//Mouse position
		ctx.fillStyle = Input.MouseClick ? 'green' : "white";
		ctx.fillText("x: " + Input.MousePosition.x + ", y: " + Input.MousePosition.y, Input.MousePosition.x + 10, Input.MousePosition.y);

		//Scene name
		ctx.fillStyle = "rgba(122,122,122,0.4)";
		ctx.fillRect(canvas.width - 130, 4, 125, 30);
		drawText("Scene", Application.LoadedScene.name, canvas.width - 120, 23);
	},

	GameObject : function() {
		for (var i = 0; i < Application.LoadedScene.GameObjects.length; i++) {
			var go = Application.LoadedScene.GameObjects[i];

			//Collider
			var collider = {
				position : {
					x : go.Physics.boxCollider.position.x - go.Physics.boxCollider.pivot.x * go.Physics.boxCollider.size.x * go.Physics.boxCollider.scale.x,
					y : go.Physics.boxCollider.position.y - go.Physics.boxCollider.pivot.y * go.Physics.boxCollider.size.y * go.Physics.boxCollider.scale.y
				},
				size : {
					x : go.Physics.boxCollider.size.x * go.Physics.boxCollider.scale.x,
					y : go.Physics.boxCollider.size.y * go.Physics.boxCollider.scale.y,
				}
			}
			ctx.fillStyle = "rgba(19,255,0,0.4)";
			ctx.fillRect(collider.position.x, collider.position.y, collider.size.x, collider.size.y);

			//Outline Sprite
			var sprite = {
				position : {
					x : go.Transform.position.x - go.Transform.pivot.x * go.Transform.size.x * go.Transform.scale.x,
					y : go.Transform.position.y - go.Transform.pivot.y * go.Transform.size.y * go.Transform.scale.y
				},
				size : {
					x : go.Transform.size.x * go.Transform.scale.x,
					y : go.Transform.size.y * go.Transform.scale.y,
				}
			}
			ctx.strokeStyle = "rgba(255,0,0,0.4)";
			ctx.lineWidth = 3;
			ctx.strokeRect(sprite.position.x, sprite.position.y, sprite.size.x, sprite.size.y)

			//draw box
			ctx.fillStyle = "rgba(122,122,122,0.4)";
			ctx.fillRect(sprite.position.x, sprite.position.y - 110, 130 , 110)

			//Nom
			drawText("Name", go.name, sprite.position.x, sprite.position.y - 5)

			//size sprite
			ctx.fillStyle = "red";
			ctx.fillText("Sprite : ", sprite.position.x, sprite.position.y - 55);
			drawText("x", sprite.position.x, sprite.position.x, sprite.position.y - 40, "red")
			drawText("y", sprite.position.y, sprite.position.x + 60, sprite.position.y - 40, "red")
			drawText("w", sprite.size.x, sprite.position.x, sprite.position.y - 25, "red")
			drawText("h", sprite.size.y, sprite.position.x + 60, sprite.position.y - 25, "red")

			//size Collider
			ctx.fillStyle = "green";
			ctx.fillText("collider : ", sprite.position.x, sprite.position.y - 100);
			drawText("x", sprite.position.x, sprite.position.x, sprite.position.y - 85, "green")
			drawText("y", sprite.position.y, sprite.position.x + 60, sprite.position.y - 85, "green")
			drawText("w", sprite.size.x, sprite.position.x, sprite.position.y - 70, "green")
			drawText("h", sprite.size.y, sprite.position.x + 60, sprite.position.y - 70, "green")

			//draw pivot
			var offset = 5;
			ctx.fillStyle = "red";
			ctx.fillRect(go.Transform.position.x - offset/2, go.Transform.position.y - 2 * offset, offset, 4 * offset);
			ctx.fillRect(go.Transform.position.x - 2 * offset, go.Transform.position.y - offset/2, 4 * offset, offset);
		}
	}


}