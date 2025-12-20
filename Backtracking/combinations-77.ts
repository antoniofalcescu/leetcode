// https://leetcode.com/problems/combinations/

// TL;DR:
// Use a backtracking approach to generate all combinations of k numbers out of 1..n
//   - Base case: if the current combination is of length k, push it to the answer array and return
//   - If we reached the end of the input array, return
//   - Otherwise, go through the 2 branches:
//     - Include the current element in the current combination and recursively call the bkt function with the next index (left child of the decision tree)
//     - Exclude the current element from the current combination and recursively call the bkt function with the next index (right child of the decision tree)

// Complexities:
// Time => O(k * C(n, k)), where C(n, k) = n! / (k! * (n - k)!), n is the number of elements and k is the number of elements in the combination
// Space => O(k * C(n, k)), where C(n, k) = n! / (k! * (n - k)!), n is the number of elements and k is the number of elements in the combination

function combine(n: number, k: number): number[][] {
	const ans: number[][] = [];
	const curr: number[] = [];

	function bkt(i: number): void {
		if (curr.length === k) {
			ans.push([...curr]);
			return;
		}
		if (i === n + 1) {
			return;
		}

		curr.push(i);
		bkt(i + 1);

		curr.pop();
		bkt(i + 1);
	}

	bkt(1);
	return ans;
}
