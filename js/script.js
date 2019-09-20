const person1 = {
    name: "Jill",
    age: 25,
    hobby: "sport"
};
const person2 = {
    name: null,
    age: 25,
    hobby: "sport"
};

window.onload = sayHello(person1);

function sayHello(object){
    if(object.hasOwnProperty('name') && object.name!=null && object.name!=undefined) console.log("Hello: "+object.name);
    else console.log("Hello: No Name.");
}