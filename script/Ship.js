function Ship(){
	this.r = 0.04;
	this.rear_a = 50;
	this.a = 0;

	this.x = VAR.W/2;
	this.y = VAR.H/2;

	this.modX = 0;
	this.modY = 0;
	this.acc = 0.0004;
	this.maxMod = 0.019;

	this.points = [{}, {}, {}];
}
Ship.prototype.draw = function(){
	if(Game.key_37 || Game.key_39){
		this.a = this.a + 10*(Game.key_37 ? -1 : 1);
	}
	if(Game.key_38){
		this.modX = Math.max(-this.maxMod*VAR.d, Math.min(this.maxMod*VAR.d, this.modX + Math.sin(Math.PI/180*this.a)*this.acc*VAR.d));
		this.modY = this.modY - Math.cos(Math.PI/180*this.a)*this.acc*VAR.d;
	}else{
		this.modX = this.modX*0.98;
		this.modX = Math.abs(this.modX)<0.0001 ? 0 : this.modX;
		this.modY = this.modY*0.98;
		this.modY = Math.abs(this.modY)<0.0001 ? 0 : this.modY;
	}

	this.x+=this.modX;
	this.y+=this.modY;

	Game.ctx.beginPath();
	Game.ctx.strokeStyle = "darkgray";
	Game.ctx.lineWidth = 5;
	Game.ctx.fillStyle = "gray";
	for(var i=0; i<3; i++){
		this.tmp_a = i===0 ? this.a : (this.a+180+(i==1 ? this.rear_a : -this.rear_a));
		this.tmp_r = i===0 ? this.r : this.r*0.6;

		this.points[i].x = Math.sin(Math.PI/180*this.tmp_a)*this.tmp_r*VAR.d+this.x;
		this.points[i].y = -Math.cos(Math.PI/180*this.tmp_a)*this.tmp_r*VAR.d+this.y;
		Game.ctx[i===0 ? 'moveTo' : 'lineTo'](this.points[i].x, this.points[i].y);
	}
	Game.ctx.closePath();
	Game.ctx.stroke();
	Game.ctx.fill();
	Game.ctx.strokeStyle = "white";

	if(Game.key_38 && this.draw_thrust){
		Game.ctx.beginPath();
		Game.ctx.strokeStyle = "red";
		Game.ctx.lineWidth = 7;
		Game.ctx.fillStyle = "gold";
		this.draw_thrust = false;
		for (i = 0; i < 3; i++) {
			this.tmp_a = i!=1 ? this.a+180+(i===0 ? -this.rear_a+30 : this.rear_a-30) : this.a+180;
			this.tmp_r = i==1 ? this.r : this.r*0.7;
			Game.ctx[i===0?'moveTo':'lineTo'](
				(Math.sin(Math.PI/180*this.tmp_a)*this.tmp_r*VAR.d)+this.x,
				(-Math.cos(Math.PI/180*this.tmp_a)*this.tmp_r*VAR.d)+this.y
			);
		}
		Game.ctx.closePath();
		Game.ctx.stroke();
		Game.ctx.fill();
		Game.ctx.strokeStyle = "white";
		Game.ctx.lineWidth = 3;
	}else if(Game.key_38 && !this.draw_thrust){
		this.draw_thrust=true;
	}
}