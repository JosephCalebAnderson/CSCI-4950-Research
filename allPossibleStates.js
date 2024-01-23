// Javascript program to generate all unique
// partitions of an integer
 
// Function to print an array p[] 
// of size n
var count = 0;
function printArray(p, n)
{
    var partition = '';
    for(let i = 0; i < n; i++) {

        partition = partition + p[i] + ' ';
        //console.log(p[i] + " ");
    }
        console.log(partition);
        console.log("");
}
   
// Function to generate all unique 
// partitions of an integer
function printAllUniqueParts(n)
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
        printArray(p, k + 1);
 
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
}
 
// Driver code
console.log("All Unique Partitions of 10" + "\n");
printAllUniqueParts(10);
 
// This code is contributed by divyesh072019