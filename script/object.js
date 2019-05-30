/*var canvas=document.createElement('canvas');
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
var ctx=canvas.getContext('2d');
document.body.appendChild(canvas);*/


//Constructor name from BigLetter;
function Animal(type, gender){
	this.type = type;
	this.gender = gender;

	if(gender=='male'){
		Animal.countMale++;
	}
	else if(gender=='female'){
		Animal.countFemale++;
	}
}

Animal.countMale = 0;
Animal.countFemale = 0;

Animal.prototype.eat = function(food){
	return this.type + ' ate.' + food + ' become a shit.';
}

var cat = new Animal('cat', 'male');
var dog = new Animal('gog', 'male');

console.log(cat);
console.log(dog);
console.log(cat.eat('ham'));

function Pet(name, type, gender){
	Animal.call(this, type, gender);
	this.name = name;
}

Pet.prototype = new Animal();
Pet.prototype.constructor = Pet;

var hau = new Pet('pucek', 'dog', 'male');
console.log(hau);
console.log(hau.eat('sausage'));

console.log(Animal.countMale);