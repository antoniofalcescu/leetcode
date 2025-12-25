// https://leetcode.com/problems/multiply-strings/

// TL;DR:
// Basically, run the math operation manually digit by digit in the algorithm:
// Reverse both numbers for simpler code
// Initialize a multiplied array with the length of the numbers sum
// Iterate through the first number:
//   - Iterate through the second number:
//     - Convert both current chars to numeric digits and multiply them
//     - Add the result to the current index in the multiplied array (index = i + j)
//     - Add the leftover to the next index in the multiplied array (ther are 2 leftovers to take into acccount: the leftover from the multiplication and the leftover from the addition)
//     - Remove the leftover from the current index in the multiplied array so that we have only one digit
// After the loops, reverse the multiplied array and remove leading zeros
// Return the multiplied array as a string

// Complexities:
// Time => O(n * m), where n and m are the lengths of the input numbers
// Space => O(n + m), where n and m are the lengths of the input numbers

function multiply(num1: string, num2: string): string {
	if ([num1, num2].includes("0")) {
		return "0";
	}

	const l1 = num1.length;
	const l2 = num2.length;
	num1 = [...num1].reverse().join("");
	num2 = [...num2].reverse().join("");

	const multiplied = Array.from({ length: l1 + l2 }, () => 0);
	for (let i = 0; i < l1; i++) {
		for (let j = 0; j < l2; j++) {
			const res = Number(num1[i]) * Number(num2[j]);

			multiplied[i + j] += res;
			multiplied[i + j + 1] += Math.floor(multiplied[i + j] / 10);
			multiplied[i + j] %= 10;
		}
	}

	multiplied.reverse();
	let i = 0;
	while (i < multiplied.length && multiplied[i] === 0) {
		i++;
	}

	return multiplied.slice(i).join("");
}
