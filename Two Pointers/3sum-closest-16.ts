// https://leetcode.com/problems/3sum-closest/

// Hint:
// - Variant of 3Sum, just keep track of closest sum if we don't find an exact match

// TL;DR:
// Sort the input array and iterate through it by fixing each nums[i] as the first element of the triplet and use 2 pointers (left and right) to find the target sum
// Iterate with the 2 pointers in another loop and calculate the sum of the triplet
// If the sum is equal to the target, return the sum
// Otherwise, calculate the difference between the sum and the target and update the closest sum if the current difference is smaller
// Decide to increment left or decrement right pointer based on the sum and the target
// Return the closest sum

// Complexities:
// Time => O(n^2), where n is the length of the input array
// Space => O(1)

function threeSumClosest(nums: number[], target: number): number {
	let closestSum = Infinity;
	nums.sort((a, b) => a - b);

	for (let i = 0; i < nums.length - 2; i++) {
		const fixed = nums[i];
		let [left, right] = [i + 1, nums.length - 1];
		while (left < right) {
			const sum = fixed + nums[left] + nums[right];
			if (sum === target) {
				return sum;
			}

			const closestDiff = Math.abs(closestSum - target);
			const currentDiff = Math.abs(sum - target);
			if (currentDiff < closestDiff) {
				closestSum = sum;
			}

			if (sum < target) {
				left++;
			} else {
				right--;
			}
		}
	}

	return closestSum;
}
