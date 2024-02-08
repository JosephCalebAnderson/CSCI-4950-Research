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
var counter = 0;

function getAdjGameStates(currentStateArray) {
    var gameStatesArray = [];
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
                if (newArray[i] == 0 && newArray.length > 1) {
                    newArray.splice(i,1);
                }
                // push the new stack if it is a positive value
                if (newStack != 0) {
                    newArray.push(newStack);
                }
                // sort the new array in descending order and print it
                newArray = arrSort(newArray);
                gameStatesArray.push(newArray);
                counter = counter + 1;
            }
        }
    }
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
                counter = counter + 1;
            }
        }
    }
    return gameStatesArray;
}

function arrSort(arr) {
    // sort the array in ascedning order
    arr.sort((a,b)=>a-b);
    // reverse the sorted array.
    arr.reverse();
    return arr;
}

function getAdjacencyObjects (gameStatesArr){
    let count = gameStatesArr.length
    let adjacencyObjsArr = [];
    // Create the objects for each state
    // The objects contain current state, adjacent states, and the mex.
    for (let state = 0; state < count; state ++) {
        let adjStates = getAdjGameStates(gameStatesArr[state]);
        let newState = {
            current: gameStatesArr[state],
            adjacent: adjStates,
            mex: null,
            next: -1
        };
        adjacencyObjsArr.push(newState);
    }
    // changes MEX value for [0].
    // CHANGE THE FOLLOWING LINE TO 0 FOR TAKE LAST TO WIN AND -1 TO GIVE LAST TO WIN.
    adjacencyObjsArr[count - 1].mex = -1;
    // changes MEX value for [1].
    // CHANGE THIS FOLLOWING LINE TO 1 FOR TAKE LAST TO WIN AND 0 FOR GIVE LAST TO WIN.
    adjacencyObjsArr[count - 2].mex = 0;
    return adjacencyObjsArr;
}

function searchForArray(haystack, needle){
    var i, j, current;
    for(i = 0; i < haystack.length; ++i){
      if(needle.length === haystack[i].length){
        current = haystack[i];
        for(j = 0; j < needle.length && needle[j] === current[j]; ++j);
        if(j === needle.length)
          return i;
      }
    }
    return -1;
}

function setMexValues (adjObjsArr, circleSize) {
    let length = adjObjsArr.length;
    // Go through each state to find their mex value

    for (let currState = length - 3; currState >= 0; currState --) {
        let count = 0;
        let adjMex = [];
        let adjNum = adjObjsArr[currState].adjacent;
        // check if each state after the current is an adjacent state
        // This is working, but it is very slow because of JSON.stringify
        /*
        for (let testingState = currState + 1; testingState < length; testingState ++) {
            let tester1 = JSON.stringify(adjObjsArr[currState].adjacent);
            let tester2 = JSON.stringify(adjObjsArr[testingState].current);
            let tester3 = tester1.indexOf(tester2);
            // if possible state is in the adjacent states we do the following
            if(tester3 != -1){
                //push the mex value and remove it from the adjacent states.
                adjMex.push(adjObjsArr[testingState].mex);
                tester1 = tester1.replace(tester2+',', '');
                tester1 = tester1.replace(','+tester2, '');
                adjObjsArr[currState].adjacent = JSON.parse(tester1);
                if (adjObjsArr[currState].adjacent.length == 0) {
                    testingState = length;
                }
            }
        }
        */
        let maxMex = 0;
        let largestIndex = -1;
        // Currently adding more here to attempt to create next state logic.
        for (let tester = currState + 1; tester < length; tester ++) {
            // Check to see if a state exists in an array
              let index = searchForArray(adjObjsArr[currState].adjacent, adjObjsArr[tester].current);
              // If the testing state is an adjacent state do the following
            if (index != -1) {
                // only push to the adjacency matrix if it is a new mex value
                if (!adjMex.includes(adjObjsArr[tester].mex)) {
                    adjMex.push(adjObjsArr[tester].mex);
                    // If this is a new largest max then save its index.
                    if (adjObjsArr[tester].mex > maxMex) {
                        largestIndex = index;
                    }
                }
                // if a mex value of 0 is found update the 'next' value with this index.
                if (adjObjsArr[tester].mex == 0) {
                    adjObjsArr[currState].next = index;
                }
                count = count + 1;
                // if all adjacent states have been found then we can stop searching.
                if (count == adjNum) {
                    tester = length;
                }
            }
        }
        // Get the mex value based off adjacent mex values and store it.
        for (let iterator = 0; iterator < length; iterator ++) {
            if (!adjMex.includes(iterator)) {
                adjObjsArr[currState].mex = iterator;
                iterator = length;
            }
        }
        // Update the next value with the adjacent state with the largest index.
        if (adjObjsArr[currState].mex == 0) {
            adjObjsArr[currState].next = largestIndex;
        }
    }
    // get the MEX value for the circle. Only two values need to be checked so if else is sufficient.
    let adjMex = [];
    adjMex.push(adjObjsArr[0].mex);
    adjMex.push(adjObjsArr[1].mex);
    let value = 0;
    if (adjMex.includes(0)) {
        if (adjMex.includes(1)) {
            value = 2;
        } else {
            value = 1;
        }
    } else {
        value = 0;
    }
    let obj = {
        current: ['' + circleSize + 'c'],
        adjacent: [[circleSize-1],[circleSize-2]],
        mex: value
    }
    adjObjsArr.unshift(obj);
    return adjObjsArr;
}

//Look at extractStateAndMex
function extractStatesAndMex (adjObjsWithMexArr) {
    let length = adjObjsWithMexArr.length;
    var stateArr = [];
    // Store the game state and mex in a more readable array.
    for (let state = 0; state < length; state ++) {
        let gameState = adjObjsWithMexArr[state].current;
        let mex = adjObjsWithMexArr[state].mex;
        stateArr.push([gameState,mex]);
    }
    return stateArr;
}


function searchGameObjects(haystack, needle){
    var i, j, current;
    for(i = 0; i < haystack.length; ++i){
      if(needle.length === haystack[i].current.length){
        current = haystack[i].current;
        for(j = 0; j < needle.length && needle[j] === current[j]; ++j);
        if(j === needle.length)
          return i;
      }
    }
    return -1;
}

function getPerfectPlayMove(objList ,gameState) {
    let index = searchGameObjects(objList, gameState);
    console.log(objList[index]);
    console.log(index);
    let adjacentLocation = objList[index].next;
    return objList[index].adjacent[adjacentLocation];
}

//Look at driver
function driver (size) {
    // For a circle with (size) stones, get the states and their mex values.
    console.log('calculating...\n');
    let allPossibleStates = getAllStates(size);
    console.log('All Possible States Found.\n');
    let objArr = getAdjacencyObjects(allPossibleStates);
    console.log('Adjacency Objects Found.\n')
    let objsWithMex = setMexValues(objArr, size);
    console.log('Mex Values Found.\n')
    let statesAndMex = extractStatesAndMex(objsWithMex);
    console.log('Readability increased.\n');
    //console.log(statesAndMex);

    // This is where operations can be performed on the states with mex array to look at certain values.
    let winningStatesString = '';
    let losingStatesString = '';
    let mod = 4;
    let product = 1;
    for (let state = 0; state < statesAndMex.length; state ++) {
        // Impose conditions on the winning states here.
        if (statesAndMex[state][1] == 0) {
            let length = statesAndMex[state][0].length
            let product = 1;
            let sum = 0;
            for (let values = 0; values < length; values ++) {
                if (values % 2 == 0) {
                    sum = sum + statesAndMex[state][0][values];
                } else {
                    sum = sum + statesAndMex[state][0][values];
                }
                product = product * statesAndMex[state][0][values];
            }
            sum = sum % mod;
            product = product % mod;
            winningStatesString = winningStatesString + JSON.stringify(statesAndMex[state]) + ' ' + product + '\n';
        }
        product = 1;
        // Impose conditions on the losing states here.
        if (statesAndMex[state][1] != 0) {
            losingStatesString = losingStatesString + JSON.stringify(statesAndMex[state]) + '\n';
        }
    }

    //Write the winning and losing states to a file.
    fs.writeFile('winning.txt', winningStatesString, (err) => {
 
        // In case of a error throw err.
        if (err) throw err;
    })

    fs.writeFile('losing.txt', losingStatesString, (err) => {
 
        // In case of a error throw err.
        if (err) throw err;
    })
    console.log('Writing to files.\n');
    let result = getPerfectPlayMove(objsWithMex,[10,8,3]);
    console.log(result);
}

driver(25);