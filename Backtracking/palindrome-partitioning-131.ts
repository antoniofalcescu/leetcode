// https://leetcode.com/problems/palindrome-partitioning/

// TL;DR:
// Use a backtracking approach
//   - Base case: if the index is equal to the length of the string, push the current partition to the answer array and return
//   - For each index, iterate through the string from current index to the end with another right pointer and:
//     - Check if the substring s[i..r+1] is a palindrome
//     - If it is:
//        - Add the substring to the current partition (left child of the decision tree)
//        - Recursively call the bkt function with the next index (r + 1)
//        - Pop the substring from the current partition (right child of the decision tree)
//     - If it is not, continue to the next index

// Complexities:
// Time: O(n * 2^n), where n is the length of the string
// Space: O(n), where n is the length of the string

function isPalindrome(s: string): boolean {
	let l = 0;
	let r = s.length - 1;
	while (l <= r) {
		if (s[l] !== s[r]) {
			return false;
		}
		l++;
		r--;
	}
	return true;
}

function partition(s: string): string[][] {
	const ans: string[][] = [];
	const curr: string[] = [];

	function bkt(i: number): void {
		if (i === s.length) {
			ans.push([...curr]);
			return;
		}

		for (let r = i; r < s.length; r++) {
			const sliced = s.slice(i, r + 1);
			if (isPalindrome(sliced)) {
				curr.push(sliced);
				bkt(r + 1);
				curr.pop();
			}
		}
	}

	bkt(0);
	return ans;
}
