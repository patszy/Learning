var canvas= document.createElement('canvas');
canvas.width=500;
canvas.height=500;
document.body.appendChild(canvas);
var ctx = canvas.getContext('2d');

var rectangle = {
	x:canvas.width/2,
	y:canvas.height/2,
	h:rand(20, 30),
	r:rand(0, 240),
	g:rand(0, 240),
	b:rand(0, 240),
}
var fps = 20;

var lastTime = 0;

animationLoop();

function animationLoop(time){
	requestAnimationFrame(animationLoop);
	console.log(time-lastTime);
	if(time-lastTime >= 1000/fps){
		lastTime  = time;
		//ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = 'rgba('+r+','+g+','+b+', 0.2)';
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = 'black';
		rectangle.x+=1;
		rectangle.y+=1;
	 	ctx.fillRect(rectangle.x-rectangle.h/2, rectangle.y-rectangle.h/2, rectangle.h, rectangle.h);	
	 }
}

function rand(min, max){
	return Math.round(Math.random()*(max-min)+min);
}
