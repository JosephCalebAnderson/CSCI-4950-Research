var gameArray = [5,3,3];
var count = 0;
function getGameStateNum(currentStateArray) {
    for (let i = 0; i < currentStateArray.length; i ++) {
        for (let j = 1; j <= (currentStateArray[i] + 1)/2; j ++) {
            let splitValue = currentStateArray[i]-j;
            let newStack = j-1;
            let newArray = []
            for (let k = 0; k < currentStateArray.length; k ++) {
                if (currentStateArray[k] != 0) {
                    newArray.push(currentStateArray[k]);
                }
            }
            newArray[i] = currentStateArray[i] - j;
            if (newStack != 0) {
                newArray.push(newStack);
            }
            newArray = arrSort(newArray);
            console.log(newArray);
        }
    }
}

function arrSort(arr) {
    arr.sort((a,b)=>a-b);
    arr.reverse();
    return arr;
}
getGameStateNum(gameArray);