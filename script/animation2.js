var canvas= document.createElement('canvas');
canvas.width=500;
canvas.height=500;
document.body.appendChild(canvas);
var ctx = canvas.getContext('2d');

var rectangle = {
	x:canvas.width/2,
	y:canvas.height/2,
	h:Math.random()*20+30,
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
		ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
		ctx.fillRect(0, 0, rectangle.x, rectangle.y);
		ctx.fillStyle = 'black';
		rectangle.x+=1;
		rectangle.y+=1;
	 	ctx.fillRect(rectangle.x-rectangle.h/2, rectangle.y-rectangle.h/2, rectangle.h, rectangle.h);	
	 }
}
