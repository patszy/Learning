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
//Colour
ctx.fillStyle = '#ffffff';
ctx.fillRect(300, 30, 20, 20);
ctx.fillStyle = 'rgb(215, 80, 255)';
ctx.fillRect(300, 70, 20, 20);
ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
ctx.fillRect(340, 30, 20, 20);
ctx.fillStyle = 'pink';
ctx.fillRect(340, 70, 20, 20);
ctx.strokeStyle = '#ffffff';
ctx.strokeRect(300, 110, 20, 20);

ctx.globalAlpha = 0.5;
ctx.fillStyle = 'black';
ctx.fillRect(340, 110, 20, 20);
ctx.globalAlpha = 1;

ctx.lineWidth = 10;
ctx.strokeRect(380, 30, 20, 20);

ctx.lineJoin = 'round';
ctx.strokeRect(380, 70, 20, 20);

ctx.lineJoin = 'miter';
ctx.miterLimit = 1;
ctx.beginPath();
ctx.moveTo(420, 30);
ctx.lineTo(430, 70);
ctx.lineTo(440, 30);
ctx.stroke();
//Gradient
var gradient = ctx.createLinearGradient(450, 0, 500, 500);
gradient.addColorStop(0, '#dcf255');
gradient.addColorStop(0.32, '#0ce0ff');
gradient.addColorStop(1, '#ff4992');
ctx.fillStyle = gradient;
ctx.fillRect(450, 0, 500, 500)