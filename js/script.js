function count(){
    var time = new Date();
    var day = time.getDate();
    var month = time.getMonth()+1;
    var year = time.getFullYear();

    var hour = time.getHours();
    var minute = time.getMinutes();
    var second = time.getSeconds();

    document.getElementsById("clock").innerHTML=
    day+"/"+month+"/"+year+" | "+hour+":"+minute+"/"+second;
    console.log("HERE");
}

function calc(){
    var number1 = document.getElementById("field_1").value;
    var number2 = document.getElementById("field_2").value;
    var result = "";

    for(i=0; i<=number2; i++){
        result += i+" ";
    }
    document.getElementById("result").innerHTML = result;
}