Board.templates = [
	[
		'WWWWWWWWWWWWWWW',
		'W             W',
		'W X X X X X X W',
		'W             W',
		'W X X X X X X W',
		'W             W',
		'W X X X X X X W',
		'W             W',
		'W X X X X X X W',
		'W             W',
		'WWWWWWWWWWWWWWW',
	],
	[
		'WWWWWWWWWWWWWWW',
		'W             W',
		'W X XXX XXX X W',
		'W             W',
		'W X X X X X X W',
		'W X         X W',
		'W X X X X X X W',
		'W             W',
		'W X XXX XXX X W',
		'W             W',
		'WWWWWWWWWWWWWWW',
	],
	[
		'WWWWWWWWWWWWWWW',
		'W             W',
		'W XXXXX XXX X W',
		'W           X W',
		'W X X X X X X W',
		'W XXX       X W',
		'W X XXX X X X W',
		'W             W',
		'W XXXXX XXX X W',
		'W    X        W',
		'WWWWWWWWWWWWWWW',
	]
]

Board.elements = {
	'floor':{sx:174, sy:16, type:'empty'},
	'W':{sx:190, sy:16, type:'solid'},
	'X':{sx:206, sy:16, type:'solid'},
	'box':{sx:126, sy:0, type:'soft'},
};
function Board(){
	this.fW = 16;
	this.fH = 16;
	this.parse(Board.templates[VAR.rand(0, Board.templates.length-1)]);
	for(var i=0; i<20; i++){
		this.addCrate();
	}
};
Board.prototype.getEmptySpace = function(){
	return this.emptySpaces.length>0 ? this.emptySpaces.shift() : null;
};
Board.prototype.addCrate = function(){
	var position = this.getEmptySpace();
	if(position){
		this.b[position.y][position.x] = Board.elements.box;
	}
};
Board.prototype.draw = function(){
	for(var i=0; i<this.b.length; i++){
		for(var j=0; j<this.b[i].length; j++){
			Game.ctx.drawImage(
				Game.sprite,
				this.b[i][j].sx,
				this.b[i][j].sy,
				this.fW,
				this.fH,
				j*this.fW*VAR.scale,
				i*this.fH*VAR.scale,
				this.fW*VAR.scale,
				this.fW*VAR.scale
			);
			if(this.b[i][j].sub_type=='bomb'){
				this.b[i][j].draw();
			}
		}
	}
};
Board.prototype.parse = function(array){
	this.emptySpaces = [];
	this.b = [];
	for(var i=0; i<array.length; i++){
		this.b.push([]);
		for(var j=0; j<array[i].length; j++){
			this.b[i].push(Board.elements[array[i].charAt(j)==' ' ? 'floor' : array[i].charAt(j)]);
			if(this.b[i][j].type=='empty' && !(i==1 && j==1) && !(i==2 && j==1) && !(i==1 && j==2)){
				this.emptySpaces.push( {x:j, y:i});
			}
		}
	}
	this.emptySpaces = VAR.shuffle(this.emptySpaces);
};