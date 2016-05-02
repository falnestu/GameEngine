var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var Scenes = {};

var Application = 
{
	LoadedScene : null,
	GamePaused : false,
	isDebug : false
};

var Gravity = new Vector();
	Gravity.x = 0;
	Gravity.y = -2;

var ImagesPath = [
	{ name : "SpriteSheet", path : "sprites.png" }
];

var Images = {
	//"monImage" : object
};

var allImagesLoaded = false;

var TilesWalkable = [];

