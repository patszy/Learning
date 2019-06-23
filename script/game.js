window.onload = function(){
	Game.sprite = new Image();
	Game.sprite.onload = Game.init;
	Game.sprite.src = 'img/sheet.png';
};
VAR = {
	fps:15,
	W:0,
	H:0,
	scale:3,
	lastTime:0,
	rand:function(min,max){
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

		Game.toDraw = {};
		//Game.hero = new Hero();
		Game.enemy = new Enemy();

		Game.animationLoop();
	},
	layout:function(ev){
		VAR.W = window.innerWidth;
		VAR.H = window.innerHeight;
		Game.canvas.width = VAR.W;
		Game.canvas.height = VAR.H;

		Game.ctx.imageSmoothingEnabled = false;

	},
	animationLoop:function(time){
		requestAnimationFrame( Game.animationLoop );
		if(time-VAR.lastTime>=1000/VAR.fps){
			VAR.lastTime = time;
			Game.ctx.clearRect(0,0,VAR.W, VAR.H);	
			for(var o in Game.toDraw){
				Game.toDraw[o].draw();
			}
		}
	}
};