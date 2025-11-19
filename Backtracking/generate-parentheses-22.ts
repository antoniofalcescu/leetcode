// https://leetcode.com/problems/generate-parentheses/

// TL;DR:
// Use a backtracking approach
//     - Base case: if the number of open and closed parentheses are equal to n, push the current generated string to the answer array and return
//     - If the number of open parentheses is greater than the number of closed parentheses:
//         - Add a close parenthesis and recursively call the bkt function with incremented number of closed parentheses and new generated string
//     - If the number of open parentheses is less than n:
//         - Add an open parenthesis and recursively call the bkt function with incremented number of open parentheses and new generated string

// Complexities:
// Time: O(C(n)), where n is the number of pairs of parentheses - C(n) = Catalan number ~= 4^n / sqrt(n)
// Space: O(n), where n is the number of pairs of parentheses - 2^n recursion tree => n height => n space

function generateParenthesis(n: number): string[] {
	const ans: string[] = [];

	function bkt(open: number, closed: number, gen: string): void {
		if (open === n && closed === n) {
			ans.push(gen);
			return;
		}

		if (open > closed) {
			bkt(open, closed + 1, gen + ")");
		}

		if (open < n) {
			bkt(open + 1, closed, gen + "(");
		}
	}

	bkt(0, 0, "");
	return ans;
}
