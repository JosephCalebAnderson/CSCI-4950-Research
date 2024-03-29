const fs = require('fs');
const prompt = require("prompt-sync")();

function getPartition(p, n) {
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
function getAllStates(n) {
       
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
    while (true) {
           
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
           
        while (k >= 0 && p[k] == 1) {
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
        while (rem_val > p[k]) {
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

// Get all adjacent states for a given state that take only one stone.
function getAdjSingleStoneMoves (currentStateArray) {
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
    return gameStatesArray;
}

// get all adjacent game states for a given state.
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

// function to sort an array.
function arrSort(arr) {
    // sort the array in ascedning order
    arr.sort((a,b)=>a-b);
    // reverse the sorted array.
    arr.reverse();
    return arr;
}

// create the adjacency objects with a list of game states.
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
    //Set the next value of [1] to 0 so it can move to [0].
    adjacencyObjsArr[count - 2].next = 0;
    return adjacencyObjsArr;
}

// search an array of arrays for a given array
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

// set the mex values on adjacency objects.
function setMexValues (adjObjsArr, circleSize) {
    let length = adjObjsArr.length;
    // Go through each state to find their mex value

    for (let currState = length - 3; currState >= 0; currState --) {
        // needed initial variables.
        let count = 0;
        let adjMex = [];
        let adjNum = adjObjsArr[currState].adjacent;
        let maxMex = 0;
        let largestIndex = -1;
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
        // CHANGE TO UPDATE WHAT TO DO WHEN PLACED IN A LOSING POSITION
        // Update the next value with the adjacent state with the largest index.
        if (adjObjsArr[currState].mex == 0) {
            // The following would be used to pick a random one stone move.
            let oneStoneMoves = getAdjSingleStoneMoves(adjObjsArr[currState].current);
            let amount = oneStoneMoves.length;
            // return a random number from 0 to amount - 1
            let move = Math.floor(Math.random() * amount);
            adjObjsArr[currState].next = move;
            // The following would be used to pick the next move which has the largest mex value.
            //adjObjsArr[currState].next = largestIndex;
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
        mex: value,
        next: 0
    }
    if (adjObjsArr[1].mex == 0) {
        obj.next = 1;
    }
    adjObjsArr.unshift(obj);
    return adjObjsArr;
}

// make a more readable array of states with their mex values.
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

// search a list of gameObjects for an array.
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

// use perfectPlay, while losing choose the game state based on criteria when assigning next values.
function getPerfectPlayMove(objList, gameState) {
    let index = searchGameObjects(objList, gameState);
    let adjacentLocation = objList[index].next;
    return objList[index].adjacent[adjacentLocation];
}

function getPlayerMove(objList, gameState) {
    let found = false;
    let newState = gameState;
    while (!found) {
        const userInput = prompt("Please enter your next move in the form x,y,z,... : ");
        // Error checking below
        let userState = userInput.split(',').map(Number);
        let currentStateIndex = searchGameObjects(objList, gameState);
        let index = searchForArray(objList[currentStateIndex].adjacent, userState);
        if (index > -1) {
            newState = userState;
            found = true;
        } else {
            console.log("\nThat is not a reachable state at this time.\n");
        }
    }
    return newState;
}

// Let's a user play against the computer
// playerStarts is true if the player starts and false if the computer starts
function playerVSComputer (circleSize, adjObjs, playerStarts) {
    let playersTurn = playerStarts;
    let currentState = [];
    currentState.push(circleSize + 'c');
    console.log("Starting a game of Circular Nim on the following state:");
    console.log(currentState);
    let gameDone = false;
    while(!gameDone) {
        // This is what occurs if it is the players turn.
        if (playersTurn) {
            console.log("Player 1's turn, the current state is ")
            console.log(currentState);
            currentState = getPlayerMove(adjObjs, currentState);
            playersTurn = false;
        // This is what occurs if it is the computers turn.
        } else {
            // Check to see if the player ended the game on their turn.
            if (currentState.length == 1 && currentState [0] == 0) {
                gameDone = true;
            } else {
                currentState = getPerfectPlayMove(adjObjs, currentState);
                playersTurn = true;
                console.log("\nCPU's turn complete.\n");
                // Check to see if the move the CPU just made ended the game.
                if (currentState.length == 1 && currentState [0] == 0) {
                    console.log("The current state is: ");
                    console.log(currentState);
                    gameDone = true;
                }
            }
        }
    }
    // Let the player know who won.
    if (playersTurn) {
        // Should display 'You Win!' for misere condition and 'You Lose.' for normal condition.
        console.log('You Win!');
    } else {
        // Should display 'You Lose.' for misere condition and 'You Win!' for normal condition.
        console.log('You Lose.');
    }
}

// A player can play against a player
function playerVSPlayer (circleSize, adjObjs, player1Starts) {
    let player1Turn = player1Starts;
    let currentState = [];
    currentState.push(circleSize + 'c');
    console.log("Starting a game of Circular Nim on the following state:");
    console.log(currentState);
    let gameDone = false;
    while(!gameDone) {
        // This is what occurs if it is the players turn.
        if (player1Turn) {
            console.log("Player 1's turn, the current state is ")
            console.log(currentState);
            currentState = getPlayerMove(adjObjs, currentState);
            player1Turn = false;
        // This is what occurs if it is the computers turn.
        } else {
            // Check to see if the player ended the game on their turn.
            if (currentState.length == 1 && currentState [0] == 0) {
                gameDone = true;
            } else {
            console.log("Player 2's turn, the current state is ")
            console.log(currentState);
            currentState = getPlayerMove(adjObjs, currentState);
            player1Turn = true;
                // Check to see if the move the CPU just made ended the game.
                if (currentState.length == 1 && currentState [0] == 0) {
                    console.log("The current state is: ");
                    console.log(currentState);
                    gameDone = true;
                }
            }
        }
    }
    // Let the player know who won.
    if (player1Turn) {
        // Should display 'Player 1 Wins!' for misere condition and 'Player 2 Wins!' for normal condition.
        console.log('Player 1 Wins!');
    } else {
        // Should display 'Player 2 Wins!' for misere condition and 'Player 1 Wins!' for normal condition.
        console.log('Player 2 Wins!');
    }
}

// A computer can play against a computer.
function computerVSComputer (circleSize, adjObjs, computer1Starts) {
    let computer1Turn = computer1Starts;
    let currentState = [];
    currentState.push(circleSize + 'c');
    console.log("Starting a game of Circular Nim on the following state:");
    console.log(currentState);
    let gameDone = false;
    while(!gameDone) {
        // This is what occurs if it is the players turn.
        if (computer1Turn) {
            currentState = getPerfectPlayMove(adjObjs, currentState);
            console.log("Computer 1 moves to the following state:");
            console.log(currentState);
            console.log();
            computer1Turn = false;
        // This is what occurs if it is the computers turn.
        } else {
            // Check to see if the player ended the game on their turn.
            if (currentState.length == 1 && currentState [0] == 0) {
                gameDone = true;
            } else {
                currentState = getPerfectPlayMove(adjObjs, currentState);
                console.log("Computer 2 moves to the following state:");
                console.log(currentState);
                console.log();
                computer1Turn = true;
                // Check to see if the move the CPU just made ended the game.
                if (currentState.length == 1 && currentState [0] == 0) {
                    gameDone = true;
                }
            }
        }
    }
    // Let the player know who won.
    if (computer1Turn) {
        // Should display 'Computer 1 Win!' for misere condition and 'Computer 2 Win!' for normal condition.
        console.log('Computer 1 Win!');
    } else {
        // Should display 'Computer 2 Win!' for misere condition and 'Computer 1 Win!' for normal condition.
        console.log('Computer 2 Win!');
    }
}

// Driver program initializes the game and lets you run simulations.
function driver (size) {
    // For a circle with (size) stones, get the states and their mex values.
    console.log('calculating...\n');
    let allPossibleStates = getAllStates(size);
    console.log('All Possible States Found.\n');
    let objArr = getAdjacencyObjects(allPossibleStates);
    console.log('Adjacency Objects Found.\n');
    let objsWithMex = setMexValues(objArr, size);
    console.log('Mex Values Found.\n');
    // This can be changed to change the type of game played. Possibilities include:
    // playerVSPlayer
    // playerVSComputer
    // computerVSComputer
    computerVSComputer(size, objsWithMex, true);


    // The following only needs to be used for analysis:
    /*
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
    */
}

driver(10);