Character.count = 0;
function Character(){
	Character.count++;
	this.id = 'ch_'+Character.count;
	Game.toDraw[this.id] = this;

	this.fW = 21;
	this.fH = 24;
	this.start_x = 0;
	this.start_y = 0;
	this.frames = [1, 0, 2, 0];
	this.current_f = 0;
	this.f_max_delay = 2;
	this.change_f_delay = 0;
}
Character.prototype.draw = function(){
	Game.ctx.drawImage(
		Game.sprite,
		this.start_x+this.frames[this.current_f]*this.fW,
		this.start_y,
		this.fW,
		this.fH,
		0,
		0,
		this.fW*VAR.scale,
		this.fH*VAR.scale
	);
	if(this.change_f_delay<this.f_max_delay){
		this.change_f_delay++;
	}else{
		this.change_f_delay = 0;
		this.current_f = this.current_f+1>=this.frames.length ? 0 : this.current_f+1;
	}
};