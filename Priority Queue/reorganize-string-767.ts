// https://leetcode.com/problems/reorganize-string/

// TL;DR:
// Get the frequency map of the input string
// Use a max heap to store each character and its frequency and pop based on the frequency
// Keep track of the string we build and a previous variable to make sure we don't add consecutive characters if possible
// While we still have characters that need to be processed (maxHeap is not empty or prev is not null)
//   - If the max heap is empty and prev is not null, return an empty string (impossible to reorganize)
//   - Pop the front character from the max heap, add it to the answer
//   - If prev is not null, push it back to the max heap
//   - If the frequency of the current character is greater than 1, assing it to prev with decremented frequency
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
	let prev: [string, number] | null = null;
	while (!maxHeap.isEmpty() || prev) {
		if (prev && maxHeap.isEmpty()) {
			return "";
		}

		const [c, freq] = maxHeap.dequeue();
		ans += c;
		if (prev) {
			maxHeap.enqueue(prev);
			prev = null;
		}
		if (freq > 1) {
			prev = [c, freq - 1];
		}
	}

	return ans;
}
