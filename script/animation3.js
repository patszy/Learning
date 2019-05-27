var canvas= document.createElement('canvas');
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
document.body.appendChild(canvas);
var ctx = canvas.getContext('2d');

var x=Math.round(canvas.width*0.1);
var y=100;
var h=100;
var forward=true;
var d=1000;
var t=0;
var easeType = 'easeInOutQuad';

var fps=60;
var lastTime=0;

animationLoop();

function animationLoop(time){
	requestAnimationFrame(animationLoop);
	if(time-lastTime>=1000/fps){
		lastTime=time;
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.fillRect(x, y, h, h);
		//x=forward ? x+10 : x-10;
		x=Easing.get(easeType,
					(forward ? Math.round(canvas.width*0.1) : Math.round(canvas.width*0.9-h)),
					(!forward ? Math.round(canvas.width*0.1) : Math.round(canvas.width*0.9-h)),
					t,d);
		t += 1000/fps;

		if(t>=d){
			forward=!forward;
			t=0;	
		}
	}
}

