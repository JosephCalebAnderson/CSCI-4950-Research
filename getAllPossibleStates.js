// Javascript program to generate all unique
// partitions of an integer
 
// Function to print an array p[] 
// of size n
var allStatesArray = [];
//var count = 0;
function printArray(p, n)
{
    var partition = [];
    for(let i = 0; i < n; i++) {

        partition.push(p[i]);
    }
        allStatesArray.push(partition);
        //console.log(partition);
}
   
// Function to generate all unique 
// partitions of an integer with k or less parts
function printAllUniquePartitions(n, parts)
{
       
    // An array to store a partition
    let p = new Array(n); 
       
    // Index of last element in a 
    // partition
    let k = 0; 
       
    // Initialize first partition as 
    // number itself
    p[k] = n; 
 
    // This loop first prints current 
    // partition, then generates next
    // partition. The loop stops when 
    // the current partition has all 1s
    while (true)
    {
           
        // print current partition
        if (parts > k) {
            printArray(p, k + 1);
            //else {
                //return;
            //}
    
            // Generate next partition
    
            // Find the rightmost non-one 
            // value in p[]. Also, update 
            // the rem_val so that we know
            // how much value can be 
            // accommodated
            let rem_val = 0;
            
            while (k >= 0 && p[k] == 1)
            {
                rem_val += p[k];
                k--;
            }
    
            // If k < 0, all the values are 1 so
            // there are no more partitions
            if (k < 0) 
                return;
    
            // Decrease the p[k] found above 
            // and adjust the rem_val
            p[k]--;
            rem_val++;
    
            // If rem_val is more, then the sorted
            // order is violated. Divide rem_val in
            // different values of size p[k] and copy
            // these values at different positions
            // after p[k]
            while (rem_val > p[k])
            {
                p[k + 1] = p[k];
                rem_val = rem_val - p[k];
                k++;
            }
    
            // Copy rem_val to next position and 
            // increment position
            p[k + 1] = rem_val;
            k++;
        }
        else {
            p[0] = p[0] - 1
            let max = parts * p[0];
            // return if the max could never reach n
            if (max < n) {
                return;
            }
            k = -1;
            var total = 0;
            // Set p to the correct values
            for (let j = 0; j < parts; j ++) {
                if (total + p[0] >= n) {
                    p[j] = n - total;
                    k = k + 1
                    j = parts
                } else {
                    p[j] = p[0];
                    k = k + 1;
                    total = total + p[j];
                }
            }
        }
    }
}

function getAllPossibleGameStates(n) {
    for (let i = n; i > 0; i--) {
        printAllUniquePartitions(i, n-i+1)
    }
    printArray([0], 1);
    console.log("Total Number of States possible " + allStatesArray.length);
    return allStatesArray;
}
 
// Driver code (change n to change the circle size)
function driver (n) {
    console.log("All Possible Game States for a circle of "+ (n));
    let allStatesArray = getAllPossibleGameStates(n-1);
    getAdjacencyMatrix(allStatesArray);
}

var counter = 0;
// Right now this only counts moves that take 1 stone.
function getAdjGameStates(currentStateArray) {
    var gameStatesArray = [];
    // i loop tracks which string is getting split
    //console.log("Possible states after taking 1 stone:");
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
                if (newArray[i] == 0 && newArray.length > 1) {
                    newArray.splice(i,1);
                }
                // push the new stack if it is a positive value
                if (newStack != 0) {
                    newArray.push(newStack);
                }
                // sort the new array in descending order and print it
                newArray = arrSort(newArray);
                //console.log(newArray);
                gameStatesArray.push(newArray);
                counter = counter + 1;
            }
        }
    }
    //console.log("Possible states after taking 2 stones:");
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
                if (newArray[l] == 0 && newArray.length > 1) {
                    newArray.splice(l,1);
                }
                // push the new stack if it is a positive value
                if (newStack > 0) {
                    newArray.push(newStack);
                }
                // sort the new array in descending order and print it
                newArray = arrSort(newArray);
                gameStatesArray.push(newArray);
                //console.log(newArray);
                counter = counter + 1;
            }
        }
    }
    //console.log("Total: " + counter);
    //console.log("");
    return gameStatesArray;
}

function arrSort(arr) {
    // sort the array in ascedning order
    arr.sort((a,b)=>a-b);
    // reverse the sorted array.
    arr.reverse();
    return arr;
}

function getAdjacencyMatrix (stateArray) {
    // Get all possible states
    let count = stateArray.length
    // Form the adjacency matrix and index the states along the matrix
    var adjMatrix = Array(count + 1).fill(0).map(()=>Array(count + 2).fill(0));
    adjMatrix[0][1] = null
    adjMatrix[0][0] = 'MEX'
    for (let a = 0; a < count; a ++) {
        adjMatrix[0][a + 2] = stateArray[a];
        adjMatrix[a + 1][0] = -1
        adjMatrix[a + 1][1] = stateArray[a];
    }
    console.log('');
    //console.log(adjMatrix);
    for (let row = 1; row < adjMatrix.length; row ++) {
        let currentGameState = adjMatrix[row][1];
        let adjacentStates = getAdjGameStates(currentGameState);
        //console.log(column)
        for (let column = 2 + row; column < adjMatrix[row].length; column ++) {
            possibleState = adjMatrix[0][column];
            var tester1 = JSON.stringify(adjacentStates);
            var tester2 = JSON.stringify(possibleState);
            var tester3 = tester1.indexOf(tester2);
            if(tester3 != -1){
                adjMatrix[row][column] = 1;
                //adjacentStates.splice(tester3,1);
            }
            
        }
    }
    console.log(adjMatrix);
}

function driver (n) {
    console.log("All Possible Game States for a circle of "+ (n));
    let allPossibleStates = getAllPossibleGameStates(n-1);
    getAdjacencyMatrix(allPossibleStates);
}

driver(30);
 
// This code is contributed by divyesh072019