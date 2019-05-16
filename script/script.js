var canvas = document.createElement('canvas');
canvas.width=500;
canvas.height=500;
document.body.appendChild(canvas);

var ctx = canvas.getContext('2d');

//Rectangle
ctx.fillRect(10, 10, 50, 50);

ctx.strokeRect(70, 10, 50, 50);

ctx.clearRect(12, 12, 15, 15);

//Line
ctx.beginPath();
ctx.moveTo(30, 140);
ctx.lineTo(100, 140);
ctx.lineTo(60, 250);
ctx.lineTo(10, 150);
ctx.stroke();
ctx.closePath();

ctx.beginPath();
//rad=Math.PI/180*deg
ctx.arc(200, 100, 50, Math.PI/180*45, Math.PI/180*-120, true);
ctx.stroke();
ctx.closePath();

//Bezier
ctx.beginPath();
ctx.moveTo(200, 250);
ctx.bezierCurveTo(200, 100, 400, 400, 400, 250);
ctx.stroke();
ctx.closePath();

//First shape
ctx.beginPath(40, 300);
ctx.moveTo(300, 320);
ctx.lineTo(400, 380);
ctx.bezierCurveTo(400, 500, 60, 500, 40, 350);
ctx.lineTo(40, 300);
//Second shape, the direction of shape.
ctx.moveTo(150, 350);
ctx.lineTo(175, 400);
ctx.lineTo(200, 350);
ctx.moveTo(150, 350);
ctx.fill();
ctx.closePath();