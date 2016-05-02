function GameObject() 
{
	this.name = "Model";
	this.enabled = true;
	this.started = false;
	this.frameHovered = 0;
	this.rendered = true;

	this.Transform = {
		position : new Vector(),
		size : new Vector(),
		scale : new Vector(),
		pivot : new Vector()
	}
	this.Physics = {
		enabled: true,
		clickable : false,
		dragAndDroppable : false,
		colliderIsSameSizeAsTransform : false,
		boxCollider : {
			position : new Vector(),
			size : new Vector()
		}
	}

	this.Awake = function() {
		this.Transform.scale.x = 1;
		this.Transform.scale.y = 1;
		this.Transform.pivot.x = 0.5;
		this.Transform.pivot.y = 0.5;
		console.clear();
		console.log("%c System:GameObject " + this.name + " Created!", 'background:#222; color:#bada55');
	}

	this.Start = function() {
		if (!this.started) {
			//To do on start
			this.Transform.position.x = 200;
			this.Transform.position.y = 200;
			this.Transform.size.x = 128;
			this.Transform.size.y = 192;
			this.Renderer.Material.source = Images["SpriteSheet"];
			this.Renderer.Material.SizeFrame.x = 32;
			this.Renderer.Material.SizeFrame.y = 48;
			this.Renderer.Animation.totalAnimationLength = 1.2;

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
			console.log(this.Renderer.Animation.animations)
			this.Renderer.Animation.current = this.Renderer.Animation.animations[0];
			if (this.colliderIsSameSizeAsTransform) {
				this.Transform.size = this.boxCollider.size;
			}
			this.started = true;
			console.log("%c System:GameObject " + this.name + " Started!", 'background:#222; color:#bada55');
		}
		this.Update();
	}

	this.Update = function() {
		if (this.enabled) {
			if (Input.KeysDown[37]) {
				this.Renderer.Animation.current = this.Renderer.Animation.animations[1];
				this.Renderer.Animation.animated = true;
			}else if (Input.KeysDown[39]) {
				this.Renderer.Animation.animated = true;
				this.Renderer.Animation.current = this.Renderer.Animation.animations[2];
			}else if (Input.KeysDown[38]) {
				this.Renderer.Animation.animated = true;
				this.Renderer.Animation.current = this.Renderer.Animation.animations[3];
			}else if (Input.KeysDown[40]) {
				this.Renderer.Animation.animated = true;
				this.Renderer.Animation.current = this.Renderer.Animation.animations[0];
			}
			else {
				this.Renderer.Animation.animated = false;
				this.Renderer.Animation.currentFrame = 0;
				this.Renderer.Material.CurrentFrame = this.Renderer.Animation.current[0];
			}
			this.Renderer.Draw();
		}
		this.GUI();
	}

	this.Renderer = {
		that : this.Transform,
		isVisible : true,
		isSpriteSheet : true,
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
			if (this.isSpriteSheet) {
				//tourner les animations
				ctx.drawImage(this.Material.source,
							this.Material.CurrentFrame.x,
							this.Material.CurrentFrame.y,
							this.Material.SizeFrame.x,
							this.Material.SizeFrame.y,
							this.that.position.x - this.that.pivot.x * this.that.size.x * this.that.scale.x,
							this.that.position.y - this.that.pivot.y * this.that.size.y * this.that.scale.y,
							this.that.size.x * this.that.scale.x,
							this.that.size.y * this.that.scale.x);
				if (this.Animation.animated) {
					this.Animation.framesAnimate+= Time.DeltaTime;
					console.log(this.Animation.framesAnimate)
					if (this.Animation.framesAnimate >=  (this.Animation.currentFrame+1) * this.Animation.totalAnimationLength / this.Animation.current.length) {
						this.Animation.currentFrame++;
						if (this.Animation.currentFrame >= this.Animation.current.length) {
							this.Animation.currentFrame = 0;
							this.Animation.framesAnimate = 0;
						}
						this.Material.CurrentFrame = this.Animation.current[this.Animation.currentFrame];
					}	
				}
			}
			else{
				ctx.drawImage(this.Material.source,
							this.that.position.x - this.that.pivot.x * this.that.size.x * this.that.scale.x,
							this.that.position.y - this.that.pivot.y * this.that.size.y * this.that.scale.y,
							this.that.size.x * this.that.scale.x,
							this.that.size.y * this.that.scale.x);	
			}
		}
	}

	this.GUI = function() {

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