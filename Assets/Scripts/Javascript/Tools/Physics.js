var Physics = {
	PointBoxCollision : function(point, box) {
		if (point.x >= box.x && point.x <= box.x + box.w) {
			if (point.y >= box.y && point.y <= box.y + box.h) {
				return true;
			}
		}
		return false;
	},

	BoxBoxCollision : function(box1, box2) {
/*		if (box1.x >= box2.x && box1.x <= box2.x + box.w ||
			 box1.x + box1.w >= box2.x && box1.x + box1.w <= box2.x + box2.w) {
			if (box1.y >= box2.y && box1.y <= box2.y + box2.h ||
				 box1.y + box1.w >= box2.y && box1.y + box1.w <= box2.y + box2.h) {
				return true;
			}
		}*/
/*		if (box1.x + box1.w >= box2.x) {
			if (box1.x <= box2.x + box2.w) {
				if (box1.y + box1.h >= box2.y) {
					if (box1.y <= box2.y + box2.h) {
						return true;
					}
				}
			}
		}
		return false;*/
		if (box2.x >= box1.x + box1.w 
			|| box2.x + box2.w <= box1.x
			|| box2.y >= box1.y + box1.head
			|| box2.y + box2.h <= box1.y) {
			return false;
		}
		return true;
	},

	PointCircleCollision : function(point, circle) {
		var dist = point.sub(circle);
		if (dist.length < circle.radius) {
			return true;
		}
		return false;
	},

	CircleCircleCollision : function(circle1, circle2) {
		var dist = circle1.sub(circle2);
		if (dist.length > circle1.radius + circle2.radius) {
			return true;
		}
		return false;
	},

	CircleBoxCollision : function(circle, box) {
		var distX = Math.abs(circle.x - box.x - box.w / 2);
		var distY = Math.abs(circle.y - box.y - box.h / 2);

		if (distX > (box.w/2 + circle.radius)) return false;
		if (distY > (box.h/2 + circle.radius)) return false;

		if (distX <= box.w/2) return true;
		if (distY <= box.h/2) return true;

		var dx = distX - box.w/2;
		var dy = distY - box.h/2;

		return ( dx * dx + dy * dy <= circle.radius * circle.radius );
	},

	TileCollision : function(map, sizeMap, position, direction) {
		var nextPosition = { x : position.x, y : position.y }

		function TileisWalkable() {
			var index = sizeMap.y * nextPosition.y + nextPosition.x;
			return TilesWalkable.indexOf(map[index]) != -1;
		}

		if (TilesWalkable.indexOf(map[index]) != -1) {
			switch (direction) {
			case 1: // HAUT
				nextPosition.y--;
				return position.y > 0 && TileisWalkable();
				break;
			case 2: //DROITE
				nextPosition.x++;
				return position.x < sizemap.x && TileisWalkable();
				break;
			case 3: //BAS
				nextPosition.y++;
				return position.y < sizemap.y && TileisWalkable();
				break;
			case 4: //GAUCHE
				nextPosition.x--;
				return position.x > 0 && TileisWalkable();
				break;
			default:
				break;
			}
		}
		
	}
}

function Box(x,y,width, height) {
	this.x = x;
	this.y = y;
	this.w = width;
	this.h = height;
}

function Circle(x, y, radius) {
	this.x = x;
	this.y = y;
	this.radius = radius;
}