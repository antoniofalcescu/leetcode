// https://leetcode.com/problems/add-binary/

// TL;DR:
// Use two pointers to iterate through the strings from right to left
// Keep track of a carry variable and a result array
// Loop until both pointers are out of bounds and we have no carry left:
//   - Get the current digits from the strings or 0 if we are out of bounds
//   - Calculate the sum of the digits and the carry (sum = aDigit + bDigit + carry)
//   - Push the result digit to the result array (result digit = sum % 2)
//   - Update the carry (carry = Math.floor(sum / 2))
// Reverse the result array and join it to get the final result

// Complexities:
// Time => O(max(a.length, b.length)), where a.length and b.length are the lengths of the input strings
// Space => O(max(a.length, b.length)), where a.length and b.length are the lengths of the input strings

function addBinary(a: string, b: string): string {
	let [i, j] = [a.length - 1, b.length - 1];
	const ans: number[] = [];

	let carry = 0;
	while (i >= 0 || j >= 0 || carry) {
		const aDigit = i >= 0 ? Number(a[i--]) : 0;
		const bDigit = j >= 0 ? Number(b[j--]) : 0;

		const sum = aDigit + bDigit + carry;
		ans.push(sum % 2);
		carry = Math.floor(sum / 2);
	}

	return ans.reverse().join("");
}
