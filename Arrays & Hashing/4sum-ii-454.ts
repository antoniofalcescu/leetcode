// https://leetcode.com/problems/4sum-ii/


// TL;DR:
// Convert the a[i] + b[j] + c[k] + d[l] = 0 to a[i] + b[j] = -(c[k] + d[l])
// Use a hash map to store the frequency of each sum of two numbers in the first two arrays
// Use a hash map to store the frequency of each sum of two numbers in the last two arrays
// Iterate through the first hash map and for each sum, calculate the needed sum to make it equal to 0 and check if it exists in the second hash map
// Multiply the count of the first sum by the count of the second sum and add it to the answer
// Return the answer

// Complexities:
// Time => O(n^2), where n is the length of the input arrays
// Space => O(n^2), where n is the length of the input arrays

function fourSumCount(nums1: number[], nums2: number[], nums3: number[], nums4: number[]): number {
    const firstCount: Record<number, number> = {};
    for (const num1 of nums1) {
        for (const num2 of nums2) {
            const sum = num1 + num2;
            firstCount[sum] = (firstCount[sum] ?? 0) + 1;
        }
    }

    const secondCount: Record<number, number> = {};
    for (const num3 of nums3) {
        for (const num4 of nums4) {
            const sum = num3 + num4;
            secondCount[sum] = (secondCount[sum] ?? 0) + 1;
        }
    }

    let ans = 0;
    for (const [sum, count] of Object.entries(firstCount)) {
        const needed = Number(sum) * -1;
        if (secondCount[needed]) {
            ans += count * secondCount[needed];
        }
    }
    return ans;
};