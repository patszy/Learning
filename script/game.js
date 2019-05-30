window.onload = function(){
	Game.init();
}

VAR = {
	fps:60,
	W:0,
	H:0,
	lastTime:0,
	lastUpdate:-1,
	rand:function(min, max){
		return Math.floor(Math.random()*(max-min+1))+min;
	}
};
Game = {
	init:function(){
		Game.canvas = document.createElement('canvas');
		Game.ctx = Game.canvas.getContext('2d');
		Game.layout();

		window.addEventListener('resize', Game.layout, false);

		document.body.appendChild(Game.canvas);

		Game.animationLoop();
	},
	layout:function(event){
		VAR.W = window.innerWidth;
		VAR.H = window.innerHeight;

		VAR.d = Math.min(VAR.W, VAR.H);

		Game.canvas.width = VAR.W;
		Game.canvas.heigth = VAR.H;

		Game.ctx.fillStyle = 'white';
		Game.ctx.strokeStyle = 'white';
		Game.ctx.lineWidth = 3;
		Game.ctx.lineJoin = 'round';
	},
	animationLoop:function(time){
		requestAnimationFrame(Game.animationLoop);
		if(time-VAR.lastTime>=1000/VAR.fps){
			VAR.lastTime = time;
			
			Game.ctx.clearRect(0, 0, VAR.W, VAR.H);
		}
	}
};