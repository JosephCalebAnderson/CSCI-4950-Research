var gameArray = [5,4,3,2];

var count = 0;
// Right now this only counts moves that take 1 stone.
function getAdjGameStates(currentStateArray) {
    var gameStatesArray = [];
    // i loop tracks which string is getting split
    console.log("Possible states after taking 1 stone:");
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
                if (newArray[i] == 0) {
                    newArray.splice(i,1);
                }
                // push the new stack if it is a positive value
                if (newStack != 0) {
                    newArray.push(newStack);
                }
                // sort the new array in descending order and print it
                newArray = arrSort(newArray);
                console.log(newArray);
                gameStatesArray.push(newArray);
                count = count + 1;
            }
        }
    }
    console.log("Possible states after taking 2 stones:");
    //This is meant to count moves that take 2 stones.
    for (let l = 0; l < currentStateArray.length; l ++) {
        if (currentStateArray[l] != currentStateArray[l+1]) {
            // j value tracks how much to split the given value
            for (let m = 1; m <= (currentStateArray[l])/2; m ++) {
                // size of the new stack that will be formed after the split
                let newStack = m-1;
                // This array will hold the new partition
                let newArray = []
                // push all of the positive values into the new array
                for (let n = 0; n < currentStateArray.length; n ++) {
                    if (currentStateArray[n] != 0) {
                        newArray.push(currentStateArray[n]);
                    }
                }
                // perform the split on the selected value
                newArray[l] = currentStateArray[l] - m - 1;
                if (newArray[l] == 0) {
                    newArray.splice(l,1);
                }
                // push the new stack if it is a positive value
                if (newStack > 0) {
                    newArray.push(newStack);
                }
                // sort the new array in descending order and print it
                newArray = arrSort(newArray);
                console.log(newArray);
                count = count + 1;
            }
        }
    }
    console.log("Total: " + count);
    console.log("");
    return gameStatesArray;
}

function arrSort(arr) {
    // sort the array in ascedning order
    arr.sort((a,b)=>a-b);
    // reverse the sorted array.
    arr.reverse();
    return arr;
}

console.log("All reachable states in 1 move:")
let tempArray = getAdjGameStates(gameArray);
//console.log(tempArray);