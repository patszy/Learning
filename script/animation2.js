var canvas= document.createElement('canvas');
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
document.body.appendChild(canvas);
var ctx = canvas.getContext('2d');

var rectangle = {
	x:canvas.width/2,
	y:canvas.height/2,
	h:rand(10, 100),
	r:rand(0, 255),
	g:rand(0, 255),
	b:rand(0, 255),
	speedx:rand(-10, 10),
	speedy:rand(-10, 10),
}
while(rectangle.speedx==0 && rectangle.speedy==0){
	rectangle.speedx=rand(-10, 10);
	rectangle.speedy=rand(-10, 10);
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
		ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = 'rgb('+rectangle.r+','+rectangle.g+','+rectangle.b+')';
		rectangle.x+=rectangle.speedx;
		rectangle.y+=rectangle.speedy;
	 	ctx.fillRect(rectangle.x-rectangle.h/2, rectangle.y-rectangle.h/2, rectangle.h, rectangle.h);	
	 }
}

function rand(min, max){
	return Math.round(Math.random()*(max-min)+min);
}
