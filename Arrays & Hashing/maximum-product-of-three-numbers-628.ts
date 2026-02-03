// https://leetcode.com/problems/maximum-product-of-three-numbers/

// TL;DR:
// Basically, the maximum product of three numbers can be either:
//   - The product of the 3 biggest numbers
//   - The product of the 2 smallest negative numbers and the biggest number
// So, we need to keep track of the 3 biggest and 2 smallest numbers
// Iterate through the array:
//   - Compare the current number with biggest, secondBiggest, thirdBiggest in order and update accordingly
//   - Compare the current number with smallest, secondSmallest in order and update accordingly
//       - We are ok for all negative numbers edge case as we just take the 3 biggest and thats the answer
// Return max(product of 3 biggest, product of 2 smallest and biggest)

// Complexities:
// Time => O(n), where n is the length of the input array
// Space => O(1), as we are only using a few variables

function maximumProduct(nums: number[]): number {
    let [biggest, secondBiggest, thirdBiggest] = [-Infinity, -Infinity, -Infinity];
    let [smallest, secondSmallest] = [0, 0];

    for (const num of nums) {
        if (num > biggest) {
            [biggest, secondBiggest, thirdBiggest] = [num, biggest, secondBiggest];
        } else if (num > secondBiggest) {
            [secondBiggest, thirdBiggest] = [num, secondBiggest];
        } else if (num > thirdBiggest) {
            thirdBiggest = num;
        }

        if (num < smallest) {
            [smallest, secondSmallest] = [num, smallest];
        } else if (num < secondSmallest) {
            secondSmallest = num;
        }
    }

    return Math.max(biggest * secondBiggest * thirdBiggest, biggest * smallest * secondSmallest);
};