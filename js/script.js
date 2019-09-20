const students = ["John","Bill","Emma","Stella","Rob"];
window.onload = random(students);

function random(table){
    console.log(table[Math.floor(Math.random()*table.length)]);
}