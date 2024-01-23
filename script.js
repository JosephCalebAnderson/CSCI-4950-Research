var gameArray = [5,3,3];
var count = 0;
function getGameStates(currentStateArray) {
    // i loop tracks which string is getting split
    for (let i = 0; i < currentStateArray.length; i ++) {
        if (currentStateArray[i] != currentStateArray[i+1]) {
            // j value tracks how much to split the given value
            for (let j = 1; j <= (currentStateArray[i] + 1)/2; j ++) {
                // size of the new stack that will be formed after the split
                let newStack = j-1;
                // This array will hold the new partition
                let newArray = []
                // push all of the positive values into the new array
                for (let k = 0; k < currentStateArray.length; k ++) {
                    if (currentStateArray[k] != 0) {
                        newArray.push(currentStateArray[k]);
                    }
                }
                // perform the split on the selected value
                newArray[i] = currentStateArray[i] - j;
                // push the new stack if it is a positive value
                if (newStack != 0) {
                    newArray.push(newStack);
                }
                // sort the new array in descending order and print it
                newArray = arrSort(newArray);
                console.log(newArray);
            }
        }
    }
}

function arrSort(arr) {
    arr.sort((a,b)=>a-b);
    arr.reverse();
    return arr;
}
getGameStates(gameArray);