// https://leetcode.com/problems/excel-sheet-column-title/

// TL;DR:
// Use a while loop to convert the column number to a title
//   - For each operation decrement columnNumber by 1 to make the math work because A=1 instead of 0
//   - Calculate the remainder and get the letter by the ASCII code of 'A' + remainder
//   - Add the letter to the answer
//   - Update the column number by dividing it by 26 and flooring the result
// Return the answer

// Complexities:
// Time => O(log26(n)), where n is the input number
// Space => O(1)

function convertToTitle(columnNumber: number): string {
	let ans = "";

	while (columnNumber > 0) {
		const remainder = (columnNumber - 1) % 26;
		const letter = String.fromCharCode("A".charCodeAt(0) + remainder);
		ans = letter + ans;
		columnNumber = Math.floor((columnNumber - 1) / 26);
	}

	return ans;
}
