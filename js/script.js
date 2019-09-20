const numbers = [2, 5, 7, 10, 34, 16, 879, 1];
function even(){
    var table = [];
    var n = 0;
    for(i=0; i<numbers.length; i++){
        if(numbers[i]%2==0){
            table[n]=numbers[i];
            n++;
        }
    }
    console.log(table);
}