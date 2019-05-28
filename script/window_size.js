var canvas= document.createElement('canvas');
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
document.body.appendChild(canvas);
var ctx = canvas.getContext('2d');

var rectanglesArray = [];
var visibleRectangles = [];

var ease='easeOutQuart';

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

		for(i=0; i<10; i++){
			rectanglesArray.push({
				start_x:canvas.width/2,
				start_y:canvas.height/2,
				target_r:Math.round(canvas.height*0.4),
				angle:rand(0, 360),
				//
				t:0,
				d:2000,
				//
				h:rand(1, 10),
				color_r:rand(0, 100),
				color_g:rand(128, 255),
				color_b:rand(128, 255),
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

			ctx.fillStyle = 'rgb('+rectangle.color_r+','+rectangle.color_g+','+rectangle.color_b+')';

			rectangle.r=Easing.get(ease, 0, rectangle.target_r, rectangle.t, rectangle.d);
			rectangle.a=Easing.get(ease, rectangle.angle, rectangle.angle+180, rectangle.t, rectangle.d);

			rectangle.x=Math.sin(Math.PI/180*rectangle.a)*rectangle.r+rectangle.start_x;
			rectangle.y=Math.cos(Math.PI/180*rectangle.a)*rectangle.r+rectangle.start_y;

			ctx.fillStyle = 'rgba('+rectangle.color_r+','+rectangle.color_g+','+rectangle.color_b+',1)';

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
