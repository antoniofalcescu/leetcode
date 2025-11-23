// https://leetcode.com/problems/total-waviness-of-numbers-in-range-i/

// TL;DR:
// Brute force

// Complexities:
// Time => O(n * m), where is the length of [num1, num2] and m is the number of digits in the numbers
// Space => O(1)

function getNumberWaviness(num: number): number {
	if (num < 100) {
		return 0;
	}

	let waviness = 0;
	const str = num.toString();
	for (let i = 1; i < str.length - 1; i++) {
		const prev = Number(str[i - 1]);
		const curr = Number(str[i]);
		const next = Number(str[i + 1]);

		if ((curr < prev && curr < next) || (curr > prev && curr > next)) {
			waviness++;
		}
	}
	return waviness;
}

function totalWaviness(num1: number, num2: number): number {
	let ans = 0;
	for (let num = num1; num <= num2; num++) {
		ans += getNumberWaviness(num);
	}
	return ans;
}
