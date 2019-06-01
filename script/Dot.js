Dot.all = {};
Dot.count = 0;

function Dot(x,y){
	Dot.count++;
	this.id = Dot.count;
	Dot.all[this.id] = this;

	this.x = x;
	this.y = y;
	this.d = 0;

	this.mod_x = VAR.rand(3,7)*(VAR.rand(0,1) ? 1 : -1);
	this.mod_y = VAR.rand(3,7)*(VAR.rand(0,1) ? 1 : -1);
}
Dot.prototype.draw = function(){
	this.x+=this.mod_x;
	this.y+=this.mod_y;
	this.d+=1;
	Game.ctx.fillStyle = 'white';
	Game.ctx.fillRect(this.x,this.y, 3, 3);
	Game.ctx.fillStyle = 'black';
	if(this.d>25){
		delete Dot.all[this.id];
	}
};
Dot.add = function(x,y){
	var n = VAR.rand(10,20);
	for(var i=0;i<n;i++){
		new Dot(x,y);
	}
};
Dot.draw = function(){
	for(var d in Dot.all){
		Dot.all[d].draw();
	}
};