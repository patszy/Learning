/*var canvas=document.createElement('canvas');
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
document.body.appendChild(canvas);
var ctx=canvas.getContext('2d');*/

window.addEventListener('keydown', onAction, false);
window.addEventListener('keyup', onAction, false);
window.addEventListener('click', onAction, false);
window.addEventListener('mousedown', onAction, false);
window.addEventListener('mouseup', onAction, false);



function onAction(event){
	console.log(event.type)
	if(event.type=='mouseup'){
		window.removeEventListener('mouseup', onAction);
	}
}