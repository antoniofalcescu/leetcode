// https://leetcode.com/problems/letter-combinations-of-a-phone-number/

// TL;DR:
// Use a backtracking approach
//   - Base case: if the index is equal to the length of the digits string, push the current combination to the answer array and return
//   - For each index:
//     - Iterate through the letters for the current digit
//     - Recursively call the bkt function with the next index and the current combination + the letter

// Complexities:
// Time: O(n * 4^n), where n is the length of the digits string (O(4^n) is the recursion tree time and O(n) is for the curr + letters[j] which creates a copy)
// Space: O(n), where n is the length of the digits string

function letterCombinations(digits: string): string[] {
	const PHONE_MAP: Record<string, string[]> = {
		2: ["a", "b", "c"],
		3: ["d", "e", "f"],
		4: ["g", "h", "i"],
		5: ["j", "k", "l"],
		6: ["m", "n", "o"],
		7: ["p", "q", "r", "s"],
		8: ["t", "u", "v"],
		9: ["w", "x", "y", "z"],
	};

	const ans: string[] = [];

	function bkt(i: number, curr: string) {
		if (i === digits.length) {
			ans.push(curr);
			return;
		}

		const letters = PHONE_MAP[digits[i]];
		for (let j = 0; j < letters.length; j++) {
			bkt(i + 1, curr + letters[j]);
		}
	}

	bkt(0, "");
	return ans;
}
