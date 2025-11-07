// https://leetcode.com/problems/group-anagrams/

// TL;DR:
// Iterate through the input array and for each string:
//   - Create a 26 length array to store the frequency of each letter in the string
//   - Iterate through the string and increment the frequency of the current letter
//   - Use the frequency array as the key and push the string to the values answer array
// Return the values of the hash map

// Complexities:
// Time => O(n * m), where n is the length of the input array and m is the length of the longest string
// Space => O(n * m), where n is the length of the input array and m is the length of the longest string

function groupAnagrams(strs: string[]): string[][] {
	const ans = {};
	for (const str of strs) {
		const freq = new Array(26).fill(0);

		for (const c of str) {
			const index = c.charCodeAt(0) - "a".charCodeAt(0);
			freq[index] += 1;
		}

		const freqAsKey = JSON.stringify(freq);
		ans[freqAsKey] = ans[freqAsKey] ? [...ans[freqAsKey], str] : [str];
	}

	return Object.values(ans);
}
