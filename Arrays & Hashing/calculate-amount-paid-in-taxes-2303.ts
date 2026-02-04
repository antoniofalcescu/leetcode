// https://leetcode.com/problems/calculate-amount-paid-in-taxes/

// TL;DR:
// Keep track of the previous limit and the total tax
// Iterate through the brackets and for each bracket:
//   - If the previous limit is greater than the income, break the loop
//   - The current amount to tax is min(current limit - previous limit, income - previous limit)
//   - Take the percentage and just divide by 100 for easier math
//   - Add the amount to tax * tax percentage to the total tax
//   - Update the previous limit to the current limit
// Return the total tax

// Complexities:
// Time => O(n), where n is the length of the brackets array
// Space => O(1), as we are only using a few variables

function calculateTax(brackets: number[][], income: number): number {
    let tax = 0;
    let prevLimit = 0;
    for (const [limit, percent] of brackets) {
        if (prevLimit > income) {
            break;
        }
        
        const toTax = Math.min(limit - prevLimit, income - prevLimit);
        const taxPercent = percent / 100;
        tax += toTax * taxPercent;

        prevLimit = limit;
    }

    return tax;
};
