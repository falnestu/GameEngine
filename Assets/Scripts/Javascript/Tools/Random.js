Math.Random = {

	RangeFloat : function(min,max){
		return min + (Math.random() * (max - min));
	},

	RangeInt : function(min,max,isInclusive = true){
		if (isInclusive) {
			return Math.round(this.RangeFloat(min,max));
		}
		else {
			return this.RangeFloat(min,max) | 0;
		}
	},

	InArray : function(array){
		return array[this.RangeInt(0,array.length,false)];
	},

	InCircle : function(circle){
		var randomAngle = this.RangeFloat(0,2*Math.PI);
		return {
			x : circle.x + circle.radius * Math.cos(randomAngle)
			y : circle.y + circle.radius * Math.sin(randomAngle)
		}
	},

	InDisk : function(circle){
		var randomAngle = this.RangeFloat(0,2*Math.PI);
		return {
			x : circle.x + circle.radius * Math.cos(randomAngle) * Math.random();
			y : circle.y + circle.radius * Math.sin(randomAngle) * Math.random();
		}
	},

	InScreen : function(screen){
		return {
			x : this.RangeInt(0,screen.width,false),
			y : this.RangeInt(0,screen.height,false)
		}  
	},

	InScreen : function(box){
		return {
			x : box.x + this.RangeInt(0,box.width,false),
			y : box.y + this.RangeInt(0,box.height,false)
		}  
	},

	ColorRGB : function(){
		var r = this.RangeInt(0,255,true);
		var g = this.RangeInt(0,255,true);
		var b = this.RangeInt(0,255,true);
		return "rgb(" + r + "," + g + "," + b + ")";
	},

	ColorRGBA : function(a){
		var r = this.RangeInt(0,255,true);
		var g = this.RangeInt(0,255,true);
		var b = this.RangeInt(0,255,true);
		return "rgba(" + r + "," + g + "," + b + "," + a + ")";  
	},

	ColorHex : function(){
		var color;
		do{
			color = '#'+Math.floor(Math.random()*16777215).toString(16);
		}while (color.length < 6);
		return color;
	},

	AngleDegree : function(min,max) {
		return this.RangeInt(min,max) % 360;
	},

	AngleRadian : function(min,max) {
		return this.RangeFloat(min,max) % 2*Math.PI;
	},

	IntPondere : function(min,max) {
		
	},

	FloatPondere : function(min,max) {
		
	}

}