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