var canvas= document.createElement('canvas');
canvas.width=500;
canvas.height=500;
document.body.appendChild(canvas);
var ctx = canvas.getContext('2d');

var x = canvas.width/2;
var y = canvas.height/2;
var h = 40;
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
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = 'black';
		x+=1;
		y+=1;
	 	ctx.fillRect(x-h/2, y-h/2, h, h);	
	 }
}
