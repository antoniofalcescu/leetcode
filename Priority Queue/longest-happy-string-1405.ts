// https://leetcode.com/problems/longest-happy-string/

// TL;DR:
// Use a max heap to store the character and its frequency
// Use a variable to keep track of the answer
// While we have elements in the heap:
//   - Pop the front character from the max heap (most frequent one currently)
//   - If the last two characters in the answer are the same as the current character:
//     - If the heap is empty, break the loop (reached a dead end)
//     - Otherwise, pop the next character from the heap, add it to the answer and push it back to the heap if the frequency is greater than 1
//   - Otherwise, add the current character to the answer and decrement the frequency
//   - If the frequency is greater than 0, push it back to the heap
// Return the answer

// Complexities:
// Time => O(n * log(3)) = O(n), where n is the sum of the frequencies of the characters
// Space => O(3) = O(1), where 3 is the number of unique characters

function longestDiverseString(a: number, b: number, c: number): string {
	const maxHeap = new MaxPriorityQueue<[string, number]>((elem) => elem[1]);
	const input: [string, number][] = [
		["a", a],
		["b", b],
		["c", c],
	];
	for (const [c, freq] of input) {
		if (freq > 0) {
			maxHeap.enqueue([c, freq]);
		}
	}

	let ans = "";
	while (!maxHeap.isEmpty()) {
		let [c, freq] = maxHeap.dequeue();
		const isTheSame =
			ans.length > 1 && ans[ans.length - 2] === c && ans[ans.length - 1] === c;
		if (isTheSame) {
			if (maxHeap.isEmpty()) {
				break;
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
