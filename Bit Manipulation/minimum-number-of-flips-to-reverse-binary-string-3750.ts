// https://leetcode.com/problems/minimum-number-of-flips-to-reverse-binary-string/

// TL;DR:
// Convert the number to a binary string
// Iterate through the binary string and count the number of mismatches between the current index and the mirrored index

// Complexities:
// Time => O(log n), where n is the input number
// Space => O(1)

function minimumFlips(n: number): number {
	let reversedBinary = "";
	while (n > 0) {
		reversedBinary += n % 2;
		n = Math.floor(n / 2);
	}

	const length = reversedBinary.length - 1;
	let ans = 0;
	for (let i = 0; i <= length; i++) {
		if (reversedBinary[i] !== reversedBinary[length - i]) {
			ans++;
		}
	}
	return ans;
}
