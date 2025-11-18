// https://leetcode.com/problems/time-based-key-value-store/

// TL;DR:
// Use a map with key, [value, timestamp] pairs
// In the set method:
//   - Just push the [value, timestamp] pair to the map inside the values array
// In the get method:
//   - Get the values array from the map (if exists)
//   - Perform a binary search on the array to find the value at the given timestamp (return value with the highest timestamp <= requested timestamp)
//   - We can do binary search because the problem states that set timestamp are strictly increasing

// Complexities:
// Time => O(log(n)), where n is the number of key-value pairs
// Space => O(n), where n is the number of key-value pairs

class TimeMap {
	private readonly map: Map<string, [string, number][]>;

	constructor() {
		this.map = new Map();
	}

	set(key: string, value: string, timestamp: number): void {
		if (!this.map.has(key)) {
			this.map.set(key, []);
		}
		this.map.get(key)!.push([value, timestamp]);
	}

	get(key: string, timestamp: number): string {
		if (!this.map.has(key)) {
			return "";
		}
		const values = this.map.get(key)!;

		let ans = "";
		let left = 0;
		let right = values.length - 1;
		while (left <= right) {
			const mid = Math.floor((left + right) / 2);
			if (values[mid][1] === timestamp) {
				ans = values[mid][0];
				break;
			}

			if (values[mid][1] > timestamp) {
				right = mid - 1;
			} else {
				left = mid + 1;
				ans = values[mid][0];
			}
		}

		return ans;
	}
}

/**
 * Your TimeMap object will be instantiated and called as such:
 * var obj = new TimeMap()
 * obj.set(key,value,timestamp)
 * var param_2 = obj.get(key,timestamp)
 */
