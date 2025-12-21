// https://leetcode.com/problems/reorganize-string/

// TL;DR:
// Get the frequency map of the input string
// Use a max heap to store each character and its frequency and pop based on the frequency
// Keep track of the string we build
// While we still have elements in the max heap:
//   - Pop the front character from the max heap and check if it's equal to the last character in the answer
//     - If it is:
//       - If the max heap is empty, return an empty string (impossible to reorganize)
//       - Otherwise, pop the next character from the max heap, add it to the answer, decrement the frequency and push it back to the max heap if it still exists
//     - Otherwise, add the current character to the answer and decrement the frequency and push it back to the max heap if it still exists
// Return the answer

// Complexities:
// Time => O(n * log(26)) = O(n), where n is the length of the input string and 26 is the number of unique characters
// Space => O(26) = O(1), where 26 is the number of unique characters

function reorganizeString(s: string): string {
	const freqMap: Record<string, number> = {};
	for (const c of s) {
		freqMap[c] = (freqMap[c] ?? 0) + 1;
	}

	const maxHeap = new MaxPriorityQueue<[string, number]>((elem) => elem[1]);
	for (const [c, freq] of Object.entries(freqMap)) {
		maxHeap.enqueue([c, freq]);
	}

	let ans = "";
	while (!maxHeap.isEmpty()) {
		let [c, freq] = maxHeap.dequeue();
		if (ans.length && ans[ans.length - 1] === c) {
			if (maxHeap.isEmpty()) {
				return "";
			}

			const [c2, freq2] = maxHeap.dequeue();
			ans += c2;
			if (freq2 > 1) {
				maxHeap.enqueue([c2, freq2 - 1]);
			}
		} else {
			ans += c;
			freq--;
		}

		if (freq > 0) {
			maxHeap.enqueue([c, freq]);
		}
	}

	return ans;
}
