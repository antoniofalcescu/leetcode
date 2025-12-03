// https://leetcode.com/problems/insert-delete-getrandom-o1/

// Hint:
// - Use a Map (value-idx pairs) and an Array with the values

// TL;DR:
// Use a map to store the value and its index in the list
// Use a list to store the values
// For insert, check if the value is already in the map, if yes return false, otherwise add the value to the list and the map (O(1) because we push to the end of the list)
// For remove, check if the value is in the map, if not return false, otherwise swap the last element with the one to remove and pop it (O(1) because we remove the last element of the list)
// For getRandom, return a random value from the list

// Complexities:
// Time => O(1), for insert, remove and getRandom operations
// Space => O(n), where n is the number of unique values

class RandomizedSet {
	private readonly uniques: Map<number, number>;
	private readonly list: number[];

	constructor() {
		this.uniques = new Map();
		this.list = [];
	}

	insert(val: number): boolean {
		if (this.uniques.has(val)) {
			return false;
		}

		this.list.push(val);
		this.uniques.set(val, this.list.length - 1);
		return true;
	}

	remove(val: number): boolean {
		if (!this.uniques.has(val)) {
			return false;
		}

		const idx = this.uniques.get(val)!;
		const lastItem = this.list[this.list.length - 1];

		this.uniques.set(lastItem, idx);
		this.list[idx] = lastItem;

		this.list.pop();
		this.uniques.delete(val);
		return true;
	}

	getRandom(): number {
		const randomIdx = Math.floor(Math.random() * this.list.length);
		return this.list[randomIdx];
	}
}
