// https://leetcode.com/problems/partition-labels/

// TL;DR:
// Use a hash map to store the last index of each character in the string
// Use 2 variables to track the size of the current partition and the end of the current partition
// Iterate through the string and:
//   - Increment the size of the current partition
//   - If the current char's ends after the current end, update the end variable
//   - If the current index is equal to the end, push the size of the current partition to the answer and reset the size

// Complexities:
// Time => O(n), where n is the length of the input string
// Space => O(1), as we have a fixed size of 26 for the hash map

function partitionLabels(s: string): number[] {
	const map: Record<string, number> = {};
	for (let i = 0; i < s.length; i++) {
		map[s[i]] = i;
	}

	let size = 0;
	let end = 0;
	const ans: number[] = [];

	for (let i = 0; i < s.length; i++) {
		size++;
		end = Math.max(end, map[s[i]]);
		if (i === end) {
			ans.push(size);
			size = 0;
		}
	}

	return ans;
}
