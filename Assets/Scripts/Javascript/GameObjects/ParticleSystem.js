function ParticlesSystem() 
{
	this.name = "ParticlesSystem";
	this.enabled = true;
	this.started = false;
	this.frameHovered = 0;
	this.rendered = false;
	this.emitters = [];
	this.fields = [];

	this.Transform = {
		position : new Vector(),
		size : new Vector(),
		scale : new Vector(),
		pivot : new Vector(),
		angle : 0
	}

	this.Physics = {
		enabled: true,
		clickable : false,
		dragAndDroppable : false,
		colliderIsSameSizeAsTransform : true,
		boxCollider : {
			position : new Vector(),
			size : new Vector(),
			scale : new Vector(),
			pivot : new Vector()
		}
	}

	this.SetPosition = function (x,y) {
		this.Transform.position.x = x;
		this.Transform.position.y = y;
		if (!this.Physics.colliderIsSameSizeAsTransform) {
			this.Physics.boxCollider.position.x = this.Physics.boxCollider.position.x;
			this.Physics.boxCollider.position.y = this.Physics.boxCollider.position.y;
		}
	}

	this.SetSize = function(x,y) {
		this.Transform.size.x = x;
		this.Transform.size.y = y;
		if (!this.Physics.colliderIsSameSizeAsTransform) {
			this.Physics.boxCollider.size.x = this.Physics.boxCollider.size.x;
			this.Physics.boxCollider.size.y = this.Physics.boxCollider.size.y;
		}
	}

	this.SetScale = function(x,y) {
		this.Transform.scale.x = x;
		this.Transform.scale.y = y;
		if (!this.Physics.colliderIsSameSizeAsTransform) {
			this.Physics.boxCollider.scale.x = this.Physics.boxCollider.scale.x;
			this.Physics.boxCollider.scale.y = this.Physics.boxCollider.scale.y;
		}		
	}

	this.SetPivot = function(x,y) {
		this.Transform.pivot.x = x;
		this.Transform.pivot.y = y;
		if (!this.Physics.colliderIsSameSizeAsTransform) {
			this.Physics.boxCollider.pivot.x = this.Physics.boxCollider.pivot.x;
			this.Physics.boxCollider.pivot.y = this.Physics.boxCollider.position.y;
		}		
	}

	this.Awake = function() {
		this.Transform.position.x = 100;
		this.Transform.position.y = 100;
		console.clear();
		console.log("%c System:GameObject " + this.name + " Created!", 'background:#222; color:#bada55');
	}

	this.Start = function() {
		if (!this.started) {
			//To do on start
			var positionEmitter = new Vector();
				positionEmitter.x = canvas.width / 2 - 150;
				positionEmitter.y = canvas.height / 2;
			var velocityEmitter = new Vector();
				velocityEmitter.x = 2 * Math.cos(0);
				velocityEmitter.y = 2 * Math.sin(0); 

			this.emitters.push(new Emitter(positionEmitter, velocityEmitter, Math.PI/32, 20));

			var positionField = new Vector();
				positionField.x = canvas.width / 2 + 150;
				positionField.y = canvas.height / 2;
			this.fields.push(new Field(positionField, -140));

			if (this.Renderer.isSpriteSheet) {
				for (var y = 0; y * this.Renderer.Material.SizeFrame.y < this.Renderer.Material.source.height; y++) {
					this.Renderer.Animation.animations.push([]);
					for (var x = 0; x * this.Renderer.Material.SizeFrame.x < this.Renderer.Material.source.width; x++) {
						var frame = new Vector();
						frame.x = x * this.Renderer.Material.SizeFrame.x; 
						frame.y = y * this.Renderer.Material.SizeFrame.y;
						this.Renderer.Animation.animations[y].push(frame);
					}
				}
			}

			if (this.Physics.colliderIsSameSizeAsTransform) {
				this.Physics.boxCollider = this.Transform;
			}
			this.started = true;
			console.log("%c System:GameObject " + this.name + " Started!", 'background:#222; color:#bada55');
		}
		this.Update();
	}

	this.Update = function() {
		if (this.enabled) {
			for(var emitter in this.emitters){
				this.emitters[emitter].update();
			}
			for (var field in this.fields){
				ctx.fillStyle = this.fields[field].drawColor;
				ctx.fillRect(this.fields[field].position.x, this.fields[field].position.y, 10, 10);
			}
/*			if (this.rendered) {
				this.Renderer.Draw();
			}*/
		}
		this.GUI();
	}

	this.Renderer = {
		that : this.Transform,
		isVisible : true,
		isSpriteSheet : false,
		Material : {
			source : "",
			SizeFrame : new Vector(),
			CurrentFrame : new Vector()
		},
		Animation : {
			animated : false,
			animations : [],
			current : [],
			currentFrame : 0,
			framesAnimate : 0,
			totalAnimationLength : 0
		},
		Draw : function() {
			ctx.translate( -this.that.position.x, -this.that.position.y);
			ctx.rotate(Math.DegreeToRadian(this.that.angle));
			if (this.isSpriteSheet) {
				//tourner les animations
				if (this.Animation.animated) {
					this.Animation.framesAnimate+= Time.DeltaTime;
					if (this.Animation.framesAnimate >=  (this.Animation.currentFrame+1) * this.Animation.totalAnimationLength / this.Animation.current.length) {
						this.Animation.currentFrame++;
						if (this.Animation.currentFrame >= this.Animation.current.length) {
							this.Animation.currentFrame = 0;
							this.Animation.framesAnimate = 0;
						}
					}
				} else {
					this.Animation.currentFrame = 0;
					this.Animation.framesAnimate = 0;
				}
				this.Material.CurrentFrame = this.Animation.current[this.Animation.currentFrame];
				ctx.drawImage(this.Material.source,
							this.Material.CurrentFrame.x,
							this.Material.CurrentFrame.y,
							this.Material.SizeFrame.x,
							this.Material.SizeFrame.y,
							this.that.position.x - this.that.pivot.x * this.that.size.x * this.that.scale.x,
							this.that.position.y - this.that.pivot.y * this.that.size.y * this.that.scale.y,
							this.that.size.x * this.that.scale.x,
							this.that.size.y * this.that.scale.x);
			}
			else{
				ctx.drawImage(this.Material.source,
							this.that.position.x - this.that.pivot.x * this.that.size.x * this.that.scale.x,
							this.that.position.y - this.that.pivot.y * this.that.size.y * this.that.scale.y,
							this.that.size.x * this.that.scale.x,
							this.that.size.y * this.that.scale.x);	
			}
			ctx.rotate(-Math.DegreeToRadian(this.that.angle));
			ctx.translate(this.that.position.x, this.that.position.y);
		}
	}

	this.GUI = function() {
		if (Application.isDebug) {
			Debug.GameObject();
		}
	}

	this.OnClicked = function() {
		this.frameHovered++;
	}

	this.OnHovered = function() {
		this.frameHovered++;
	}

	this.UnHovered = function () {
		this.frameHovered = 0;
	}

	this.Awake();
}