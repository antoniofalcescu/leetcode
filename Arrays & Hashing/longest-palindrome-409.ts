// https://leetcode.com/problems/longest-palindrome/

// TL;DR:
// Use a hash map to store the frequency of each character in the string
// Iterate through the hash map and for each frequency vakye:
//   - Add the frequency - frequency % 2 to the answer (if odd it adds the freq - 1, if even it adds the freq)
//   - If the frequency is odd, set the odd flag to 1
// Return the answer + odd flag

// Complexities:
// Time => O(n), where n is the length of the input string
// Space => O(1), because all maps are of fixed size (26 + 26)

function longestPalindrome(s: string): number {
	const freqMap: Record<string, number> = {};
	for (const c of s) {
		freqMap[c] = (freqMap[c] ?? 0) + 1;
	}

	let odd = 0;
	let ans = 0;
	for (const freq of Object.values(freqMap)) {
		ans += freq - (freq % 2);
		if (freq % 2 !== 0) {
			odd = 1;
		}
	}
	ans += odd;
	return ans;
}
