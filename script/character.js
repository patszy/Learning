Character.count = 0;
function Character(inheritance){
	Character.count++;
	this.id = 'ch_'+Character.count;
	if(!inheritance) Game.toDraw[this.id] = this;

	this.fW = 21;
	this.fH = 24;
	this.mod_x = -2;
	this.mod_y = -9;
	this.speed = 2;
	this.current_f = 0;
	this.f_max_delay = 2;
	this.change_f_delay = 0;
}
Character.prototype.draw = function(){
	if(this.state=='down_go'){
		this.y+=this.speed;
	}else if(this.state=='right_go'){
		this.x+=this.speed;
	}else if(this.state=='up_go'){
		this.y-=this.speed;
	}else if(this.state=='left_go'){
		this.x-=this.speed;
	}

	if(this.states[this.state].flip){
		Game.ctx.save();
		Game.ctx.scale(-1, 1);
	}
	Game.ctx.drawImage(
		Game.sprite,
		this.states[this.state].sx+this.states[this.state].f[this.current_f]*this.fW,
		this.states[this.state].sy,
		this.fW,
		this.fH,
		this.states[this.state].flip ? (-this.fW-this.mod_x-this.x)*VAR.scale : (this.x+this.mod_x)*VAR.scale,
		(this.y+this.mod_y)*VAR.scale,
		this.fW*VAR.scale,
		this.fH*VAR.scale
	);
	if(this.states[this.state].flip){
		Game.ctx.restore();
	}
	if(this.change_f_delay<this.f_max_delay){
		this.change_f_delay++;
	}else{
		this.change_f_delay = 0;
		this.current_f = this.current_f+1>=this.states[this.state].f.length ? 0 : this.current_f+1;
	}
};
function Hero(){
	Character.call(this);
	this.state = 'down';
	this.states = {
		'down':{sx:0, sy:0, f:[0]},
		'down_go':{sx:0, sy:0, f:[1, 0, 2, 0]},
		'left':{sx:63, sy:0, f:[0]},
		'left_go':{sx:63, sy:0, f:[1, 0, 2, 0]},
		'up':{sx:0, sy:24, f:[0]},
		'up_go':{sx:0, sy:24, f:[1, 0, 2, 0]},
		'right':{sx:63, sy:0, f:[0], flip:true},
		'right_go':{sx:63, sy:0, f:[1, 0, 2, 0], flip:true},
		'ko':{sx:0, sy:48, f:[0, 1, 0, 1, 0, 1, 2, 3, 4]}
	};
	this.x = Game.board.fW;
	this.y = Game.board.fH;
}
Hero.prototype = new Character(true);
Hero.prototype.constructor = Hero;
Hero.prototype.updateState = function(){
	this.tmp_state = null;
	if(Game.key_37){
		this.tmp_state = 'left_go';
	}else if(Game.key_38){
		this.tmp_state = 'up_go';
	}else if(Game.key_39){
		this.tmp_state = 'right_go';
	}else if(Game.key_40){
		this.tmp_state = 'down_go';
	}else if(this.state.slice(-2)=='go'){
		this.tmp_state = this.state.slice(0, this.state.indexOf('_go'));
	}
	if(this.tmp_state!=this.state){
		this.current_f = 0;
		this.state = this.tmp_state;
	}
}
function Enemy(){
	Character.call(this);
	this.state = 'right_go';
	this.states = {
		'down':{sx:0, sy:72, f:[0]},
		'down_go':{sx:0, sy:72, f:[1, 0, 2, 0]},
		'left':{sx:63, sy:24, f:[0]},
		'left_go':{sx:63, sy:24, f:[1, 0, 2, 0]},
		'up':{sx:63, sy:72, f:[0]},
		'up_go':{sx:63, sy:72, f:[1, 0, 2, 0]},
		'right':{sx:63, sy:24, f:[0], flip:true},
		'right_go':{sx:63, sy:24, f:[1, 0, 2, 0], flip:true},
		'ko':{sx:0, sy:96, f:[0, 1, 2, 3, 4 , 5]}
	};
}
Enemy.prototype = new Character(true);
Enemy.prototype.constructor = Hero;