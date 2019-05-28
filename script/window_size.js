var canvas= document.createElement('canvas');
var ctx = canvas.getContext('2d');

var retinaBoost=devicePixelRatio && devicePixelRatio>1
				&& ctx.webkitBackingStorePixelRatio
				&& ctx.webkitBackingStorePixelRatio!=devicePixelRatio;

if(retinaBoost) canvas.className='onRetina';

layout();
window.addEventListener('resize', layout, false);

var touches = [];
var global_target_r=0.4; 

if(!Modernizr.touch){
	window.addEventListener('mousemove', onMove, false);
	touches.push({pageX:Math.round(canvas.width/2), pageY:Math.round(canvas.height/2)})
}else{
	window.addEventListener('touchstart', onMove, false);
	window.addEventListener('touchend', onMove, false);
	window.addEventListener('touchmove', onMove, false);
}

document.body.appendChild(canvas);

var rectanglesArray = [];
var visibleRectangles = [];

var ease='easeOutQuart';

var fps = 60;
var lastTime = 0;

animationLoop();

function animationLoop(time){
	requestAnimationFrame(animationLoop);
	if(time-lastTime >= 1000/fps){
		lastTime  = time;

		ctx.clearRect(0, 0, canvas.width, canvas.height);
		visibleRectangles.length=0;	

		global_target_r=Math.min(0.4, global_target_r+0.005);

		if(touches.length>0){
			for(i=0; i<10; i++){
				var p=touches[rand(0, touches.length-1)]
				rectanglesArray.push({
					start_x:p.pageX/canvas.width,
					start_y:p.pagey/canvas.height,
					target_r:global_target_r,
					angle:rand(0, 360),
					//
					t:0,
					d:2000,
					//
					h:rand(1,10),
					color_r:rand(0, 100),
					color_g:rand(128, 255),
					color_b:rand(128, 255),
				})
			}
		}
		
		for(var i=0; i<rectanglesArray.length; i++){
			var rectangle = rectanglesArray[i];
			
			rectangle.t+=1000/fps;

			rectangle.r=Easing.get(ease, 0, Math.round(rectangle.target_r*canvas.height*(retinaBoost ? 0.5 : 1)), rectangle.t, rectangle.d);
			rectangle.a=Easing.get(ease, rectangle.angle, rectangle.angle+180, rectangle.t, rectangle.d);

			rectangle.x=Math.sin(Math.PI/180*rectangle.a)*rectangle.r+rectangle.start_x*canvas.width;
			rectangle.y=Math.cos(Math.PI/180*rectangle.a)*rectangle.r+rectangle.start_y*canvas.height;
			
			if(retinaBoost){
				rectangle.x=rectangle.x*2;
				rectangle.y=rectangle.y*2;
			}

			ctx.fillStyle = 'rgba('+rectangle.color_r+','+rectangle.color_g+','+rectangle.color_b+',1)';
		 	ctx.fillRect(rectangle.x-rectangle.h/2, rectangle.y-rectangle.h/2, rectangle.h*canvas.width, rectangle.h*canvas.height);

		 	if(rectangle.t<rectangle.d){
		 		visibleRectangles.push(rectangle);
		 	}
		}
		rectanglesArray = visibleRectangles.concat();
	}
}

function onMove(event){
	if(event.type=='mousemove'){
		touches[0].pageX = event.x;
		touches[0].pageY = event.y;
	}else{
		touches = event.touches;
		event.preventDefault()
	}
	global_target_r=Math.max(0.1, global_target_r-0.01);
}
function layout(event){
	if(retinaBoost){
		canvas.width=window.innerWidth*2;
		canvas.height=window.innerHeight*2;
	}else{
		canvas.width=window.innerWidth;
		canvas.height=window.innerHeight;
	}
}

function rand(min, max){
	return Math.round(Math.random()*(max-min)+min);
}
