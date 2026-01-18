// https://leetcode.com/problems/h-index/

// TL;DR:
// Can solve with a binary search approach by trying every mid value in range [0, n] and checking if it's a valid h-index
// The valid h-index check is O(n), scanning thorugh the entire citations array and counting each value >= mid
// If current mid is a valid h-index, we save it in ans and try to find a higher h-index by incrementing the left pointer
// If current mid is not a valid h-index, we try to find a lower h-index by decrementing the right pointer
// Return the highest valid h-index found

// Complexities:
// Time => O(n log n), where n is the length of the input array
// Space => O(1)

function isHIndex(citations: number[], h: number): boolean {
	let count = 0;
	for (const citation of citations) {
		if (citation >= h) {
			count++;
		}
	}

	return count >= h;
}

function hIndex(citations: number[]): number {
	let [left, right] = [0, citations.length];
	let ans = 0;
	while (left <= right) {
		const mid = Math.floor((left + right) / 2);
		if (isHIndex(citations, mid)) {
			ans = mid;
			left = mid + 1;
		} else {
			right = mid - 1;
		}
	}

	return ans;
}
