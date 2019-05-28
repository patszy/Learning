var canvas= document.createElement('canvas');

layout();
window.addEventListener('resize', layout, false);
/*Portable Version, Lane89.
window.addEventListener('mousemove', onMove, false);*/
window.addEventListener('touchstart', onMove, false);
window.addEventListener('touchmove', onMove, false);
window.addEventListener('touchend', onMove, false);

var source_x=0.5;
var source_y=0.5;

var touches=[];

var global_target_r=0.4; 

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

		global_target_r=Math.min(0.4, global_target_r+0.005);

		visibleRectangles.length=0;
		if(touches.length>0){
			for(i=0; i<10; i++){
				var p=touches[rand(0, touches.length-1)];
				rectanglesArray.push({
					start_x:p.pageX/canvas.width,
					start_y:p.pageY/canvas.height,
					target_r:global_target_r,
					angle:rand(0, 360),
					//
					t:0,
					d:2000,
					//
					h:0.001*rand(1,10),
					color_r:rand(0, 100),
					color_g:rand(128, 255),
					color_b:rand(128, 255),
				})
			}
		}
		//ctx.clearRect(0, 0, canvas.width, canvas.height); From earlier lesson.
		
		for(var i=0; i<rectanglesArray.length; i++){
			var rectangle = rectanglesArray[i];
			
			rectangle.t+=1000/fps;

			ctx.fillStyle = 'rgb('+rectangle.color_r+','+rectangle.color_g+','+rectangle.color_b+')';

			rectangle.r=Easing.get(ease, 0, rectangle.target_r*canvas.height, rectangle.t, rectangle.d);
			rectangle.a=Easing.get(ease, rectangle.angle, rectangle.angle+180, rectangle.t, rectangle.d);

			rectangle.x=Math.sin(Math.PI/180*rectangle.a)*rectangle.r+rectangle.start_x*canvas.width;
			rectangle.y=Math.cos(Math.PI/180*rectangle.a)*rectangle.r+rectangle.start_y*canvas.height;

			ctx.fillStyle = 'rgba('+rectangle.color_r+','+rectangle.color_g+','+rectangle.color_b+',1)';

		 	ctx.fillRect(rectangle.x-(rectangle.h*canvas.width)/2, rectangle.y-(rectangle.h*canvas.height)/2, rectangle.h*canvas.width, rectangle.h*canvas.height);

		 	if(rectangle.t<rectangle.d){
		 		visibleRectangles.push(rectangle);
		 	}
		}
		rectanglesArray = visibleRectangles.concat();
	}
}

function onMove(event){
	/*Portable Version
	source_x=event.x/canvas.width;
	source_y=event.y/canvas.height;*/
	touches=event.touches;
	event.preventDefault();
	global_target_r=Math.max(0.1, global_target_r-0.01);
}
function layout(event){
	canvas.width=window.innerWidth;
	canvas.height=window.innerHeight;
	console.log(canvas.width);
}

function rand(min, max){
	return Math.round(Math.random()*(max-min)+min);
}
