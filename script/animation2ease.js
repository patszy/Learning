var canvas= document.createElement('canvas');
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
document.body.appendChild(canvas);
var ctx = canvas.getContext('2d');

var rectanglesArray = [];
var visibleRectangles = [];

var ease='easeInOutExpo';

var fps = 60;
var lastTime = 0;

animationLoop();

function animationLoop(time){
	requestAnimationFrame(animationLoop);

	console.log(time-lastTime);
	if(time-lastTime >= 1000/fps){
		lastTime  = time;

		ctx.clearRect(0, 0, canvas.width, canvas.height);

		visibleRectangles.length=0;

		for(i=0; i<5; i++){
			rectanglesArray.push({
				start_x:canvas.width/2,
				start_y:canvas.height/2,
				target_x:rand(0, Math.round(canvas.width)),
				target_y:rand(0, Math.round(canvas.height)),
				//
				t:0,
				d:2000,
				//
				h:rand(1, 10),
				start_r:rand(0, 100),
				start_g:rand(128, 255),
				start_b:255,
			})
			while(rectanglesArray[rectanglesArray.length-1].speedx==0 && rectanglesArray[rectanglesArray.length-1].speedy==0){
				rectanglesArray[rectanglesArray.length-1].speedx=rand(-10, 10);
				rectanglesArray[rectanglesArray.length-1].speedy=rand(-10, 10);
			}
		}
		//ctx.clearRect(0, 0, canvas.width, canvas.height); From earlier lesson.
		
		for(var i=0; i<rectanglesArray.length; i++){
			var rectangle = rectanglesArray[i];
			
			rectangle.t+=1000/fps;

			ctx.fillStyle = 'rgb('+rectangle.r+','+rectangle.g+','+rectangle.b+')';
			rectangle.x=Easing.get(ease, rectangle.start_x, rectangle.target_x, rectangle.t, rectangle.d);
			rectangle.y=Easing.get(ease, rectangle.start_y, rectangle.target_y, rectangle.t, rectangle.d);

			rectangle.r = Easing.getRound(ease, rectangle.start_r, 255, rectangle.t, rectangle.d);
			rectangle.g = Easing.getRound(ease, rectangle.start_g, 255, rectangle.t, rectangle.d);
			rectangle.b = Easing.getRound(ease, rectangle.start_b, 255, rectangle.t, rectangle.d);

			ctx.fillStyle = 'rgba('+rectangle.r+','+rectangle.g+','+rectangle.b+',1)';

		 	ctx.fillRect(rectangle.x-rectangle.h/2, rectangle.y-rectangle.h/2, rectangle.h, rectangle.h);

		 	if(rectangle.t<rectangle.d){
		 		visibleRectangles.push(rectangle);
		 	}
		}
		rectanglesArray = visibleRectangles.concat();
	}
}

function rand(min, max){
	return Math.round(Math.random()*(max-min)+min);
}
