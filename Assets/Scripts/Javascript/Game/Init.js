window.RequestAnimationFrame = (function(){
    return  window.requestAnimationFrame           ||
            window.webkitRequestAnimationFrame     ||
            window.mozRequestAnimationFrame        ||
            window.oRequestAnimationFrame          ||
            window.msRequestAnimationFrame         ||
    function(callback, element){
        window.setTimeout(callback, 1000 / 60);
    };
})();

/*Scenes["Loader"] = new Loader();
Application.LoadedScene = Scenes["Loader"];*/


document.addEventListener("keydown", Input.KeyDown);
document.addEventListener("keyup", Input.KeyUp);

document.addEventListener("mousedown", Input.MouseDown);
document.addEventListener("mouseup", Input.MouseUp);
document.addEventListener("mousemove", Input.MouseMove);

//Image Loader
function LoadImages() {
    var count = 0;
    for (var i = 0; i < ImagesPath.length; i++) {
        var name = ImagesPath[i].name;
        var content = ImagesPath[i].path;

        Images[name] = new Image();
        Images[name].src = "Assets/Graphics/" + content;

        Images[name].onload = function() {
            count++;
            //Scene.loader.imageLoaded = count;
            if (count == ImagesPath.length) {
                ImageLoaded(count);
            }
        }
    }
}

function ImageLoaded(imageLoaded) {
    console.log("%c System: " + imageLoaded + " images loaded!", 'background:#222; color:#bada55');

}

//Run();

var btn = document.getElementById("test");
btn.addEventListener('click', function() {
	if (Application.LoadedScene == Scenes["Scene1"]) {
		Application.LoadedScene = Scenes["Scene2"];
	} else {
		Application.LoadedScene = Scenes["Scene1"];
	}
})
