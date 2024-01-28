const fs = require('fs')

function getPartition(p, n)
{
    let partition = [];
    for(let i = 0; i < n; i++) {
        let part = p[i] - 1;
        if (part != 0) {
            partition.push(part);
        }
    }
    if (partition.length == 0) {
        partition.push(0);
    }    
    return partition;
}
   
// Function to generate all unique 
// partitions of an integer
function getAllStates(n)
{
       
    // An array to store a partition and all partitions
    let p = new Array(n); 
    var allStates = [];
       
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
        let newPartition = getPartition(p, k + 1);
        allStates.push(newPartition);
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
        return allStates;
 
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
    // Form the adjacency matrix identifiers
    var adjMatrix = Array(count + 1).fill(0).map(()=>Array(count + 2).fill(0));
    adjMatrix[0][1] = null
    adjMatrix[0][0] = 'MEX'
    for (let a = 0; a < count; a ++) {
        //index the states along the matrix
        adjMatrix[0][a + 2] = stateArray[a];
        adjMatrix[a + 1][0] = -1
        adjMatrix[a + 1][1] = stateArray[a];
    }
    // Since this is a winning state set its MEX value to 0.
    adjMatrix[count - 1][0] = 0;
    //console.log('');
    // the rows will identify the state we are starting from
    for (let row = 1; row < adjMatrix.length; row ++) {
        // current testing state and the states it can reach in one move
        let currentGameState = adjMatrix[row][1];
        let adjacentStates = getAdjGameStates(currentGameState);
        // get the possible reachable state and test if it can be reached by the current state.
        for (let column = 2 + row; column < adjMatrix[row].length; column ++) {
            possibleState = adjMatrix[0][column];
            // stringify to compare arrays
            var tester1 = JSON.stringify(adjacentStates);
            var tester2 = JSON.stringify(possibleState);
            var tester3 = tester1.indexOf(tester2);
            // if possible state is in the adjacent states we do the following
            if(tester3 != -1){
                // set the index to 1 and remove that state from the adjacencyStates list
                adjMatrix[row][column] = 1;
                tester1 = tester1.replace(tester2+',', '');
                tester1 = tester1.replace(','+tester2, '');
                adjacentStates = JSON.parse(tester1);
            }
            
        }
    }
    //console.log(adjMatrix);
    return adjMatrix;
}

// Currently throwing error.
function setMexValues (adjMat) {
    let rowLength = adjMat.length;
    let columnLength = adjMat[0].length;
    for (let row = rowLength - 3; row > 0; row --) {
        //console.log("row: "+row);
        let adjMex = [];
        for (let column = 2; column < columnLength; column ++) {
            //console.log("column: " + column);
            if (adjMat[row][column] == 1) {
                adjMex.push(adjMat[column - 1][0]);
                //console.log(adjMex);
            }
        }
        // get the Mex Value by looking at the other Mex values
        for (let iterator = 0; iterator < rowLength; iterator ++) {
            if (!adjMex.includes(iterator)) {
                adjMat[row][0] = iterator;
                iterator = rowLength;
            }
        }
    }
    // get the MEX value for the circle. Only two values need to be checked so if else is sufficient.
    let adjMex = [];
    adjMex.push(adjMat[1][0]);
    adjMex.push(adjMat[2][0]);
    if (adjMex.includes(0)) {
        if (adjMex.includes(1)) {
            adjMat[0][1] = 2;
        } else {
            adjMat[0][1] = 1;
        }
    } else {
        adjMat[0][1] = 0;
    }
    //console.log(adjMat);
    return adjMat;
}

function extractStateAndMex(adjMatWithMex, circleSize) {
    let length = adjMatWithMex.length;
    var stateMat = [];
    // Push the first line that contatins the MEX value of the circle
    stateMat.push([[circleSize+'c'],adjMatWithMex[0][1]]);
    // Push the rest of the states with their MEX Values
    for (let index = 0; index < length - 1; index ++) {
        let state = adjMatWithMex[index + 1][1];
        let mexValue = adjMatWithMex[index + 1][0];
        stateMat.push([state,mexValue]);
    }
    return stateMat;
}

function driver (n) {
    console.log("All Possible Game States for a circle of "+ (n) + '\n');
    let allPossibleStates = getAllStates(n);
    console.log(allPossibleStates);
    let adjacencyMatrix = getAdjacencyMatrix(allPossibleStates);
    let finishedAdjMat = setMexValues(adjacencyMatrix);
    console.log("Adjacency Matrix with MEX:");
    console.log(finishedAdjMat);
    console.log('\n\nStates with Mex Values:');
    let statesAndMex = extractStateAndMex(finishedAdjMat, n);
    console.log(statesAndMex);
    let winningStates = [];
    let winningStatesString = '';
    for (let state = 0; state < statesAndMex.length; state ++) {
        if (statesAndMex[state][1] == 0) {
            winningStates.push(statesAndMex[state]);
            winningStatesString = winningStatesString + JSON.stringify(statesAndMex[state]) + '\n';
        }
    }
    console.log('\n\nWinning States: ');
    //let winningStatesString = JSON.stringify(winningStates);
    //console.log(winningStates);
    fs.writeFile('Output.txt', winningStatesString, (err) => {
 
        // In case of a error throw err.
        if (err) throw err;
    })
}

// 30 does not crash. Crashes at 40
driver(30);
 
// This code is contributed by divyesh072019