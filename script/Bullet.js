Bullet.all = {};
Bullet.max = 5;
Bullet.count = 0;
Bullet.active_count = 0;
Bullet.speed = 0.02;
Bullet.life = 35;

function Bullet(){
	if(Bullet.active_count<Bullet.max){
		Sounds.play('laser');
		Bullet.count++;
		Bullet.active_count++;

		this.id = Bullet.count.toString();
		Bullet.all[this.id] = this;

		this.life = 0;
		this.a = Game.ship.a;
		this.x = Game.ship.points[0].x;
		this.y = Game.ship.points[0].y;

		this.modX = Math.sin(Math.PI/180*this.a)*Bullet.speed*VAR.d;
		this.modY = -Math.cos(Math.PI/180*this.a)*Bullet.speed*VAR.d;
	}
};

Bullet.draw = function(){
	for(var i in Bullet.all){
		for(var r in Rock.all){
			if(Rock.all[r].hitTest(Bullet.all[i].x, Bullet.all[i].y)){
				Bullet.all[i].life+=Bullet.life
				Rock.all[r].remove()
				break;
			}
		}

		if(Bullet.all[i].life<Bullet.life){
			Bullet.all[i].life++;
			Bullet.all[i].x += Bullet.all[i].modX;
			Bullet.all[i].y += Bullet.all[i].modY;

			if(Bullet.all[i].x<0){
				Bullet.all[i].x+=VAR.W;
			}else if(Bullet.all[i].x>VAR.W) {
				Bullet.all[i].x-=VAR.W;
			}
			if(Bullet.all[i].y<0) {
				Bullet.all[i].y+=VAR.H;
			}else if(Bullet.all[i].y>VAR.H) {
				Bullet.all[i].y-=VAR.H;
			}

			Game.ctx.beginPath();
			Game.ctx.fillStyle = 'lime';
			Game.ctx.arc(Bullet.all[i].x, Bullet.all[i].y, 3, 0, Math.PI/180*360);
			Game.ctx.closePath();
			Game.ctx.fill();
			Game.ctx.fillStyle = 'black';
		}else{
			Bullet.active_count--;
			delete Bullet.all[i];
		}
	}
};