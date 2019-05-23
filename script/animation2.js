var canvas= document.createElement('canvas');
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
document.body.appendChild(canvas);
var ctx = canvas.getContext('2d');

var rectanglesArray = [];
var visibleRectangles = [];

var fps = 60;
var lastTime = 0;
var gravity = 1;
animationLoop();

function animationLoop(time){
	requestAnimationFrame(animationLoop);

	console.log(time-lastTime);
	if(time-lastTime >= 1000/fps){
		lastTime  = time;

		ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		visibleRectangles.length=0;

		for(i=0; i<15; i++){
			rectanglesArray.push({
				x:canvas.width/2,
				y:canvas.height/2,
				h:rand(1, 10),
				r:rand(0, 100),
				g:rand(128, 255),
				b:255,
				speedx:rand(-10, 10),
				speedy:rand(-10, 10),
			})
			while(rectanglesArray[rectanglesArray.length-1].speedx==0 && rectanglesArray[rectanglesArray.length-1].speedy==0){
				rectanglesArray[rectanglesArray.length-1].speedx=rand(-10, 10);
				rectanglesArray[rectanglesArray.length-1].speedy=rand(-10, 10);
			}
		}
		//ctx.clearRect(0, 0, canvas.width, canvas.height); From earlier lesson.
		
		for(var i=0; i<rectanglesArray.length; i++){
			var rectangle = rectanglesArray[i];
			
			ctx.fillStyle = 'rgb('+rectangle.r+','+rectangle.g+','+rectangle.b+')';
			rectangle.x+=rectangle.speedx;
			rectangle.y+=rectangle.speedy;
			//Pseudo Gravity
			rectangle.speedy+=gravity;

			rectangle.r = Math.min(255, rectangle.r+5);
			rectangle.g = Math.min(255, rectangle.g+5);
			rectangle.b = Math.min(255, rectangle.b+5);

		 	ctx.fillRect(rectangle.x-rectangle.h/2, rectangle.y-rectangle.h/2, rectangle.h, rectangle.h);

		 	if(rectangle.x+rectangle.h/2>0 && rectangle.x-rectangle.h/2<canvas.width &&
		 	 	rectangle.y+rectangle.h/2>0 && rectangle.y-rectangle.h/2<canvas.height &&
		 	 	(rectangle.r!=255 || rectangle.g!=255 || rectangle.b!=255)){
		 		visibleRectangles.push(rectangle);
		 	}
		}

		rectanglesArray = visibleRectangles.concat();
		/*if(rectanglesArray.length>20){
			rectanglesArray.shift();
		}*/
	}
}

function rand(min, max){
	return Math.round(Math.random()*(max-min)+min);
}
