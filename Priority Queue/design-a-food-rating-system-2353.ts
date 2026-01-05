// https://leetcode.com/problems/design-a-food-rating-system/

// TL;DR:
// Use a map to store the food to its cuisine and rating
// Use a map to store the cuisine to its max priority queue of foods
// In the constructor:
//   - Initialize the foodMap and cuisineToFoods maps
//   - Iterate through the foods, cuisines and ratings arrays
//   - For each food, cuisine and rating:
//     - Initialize the food as the key for the foodMap and push the cuisine and rating values
//     - Initialize the cuisine as the key for the cuisineToFoods map and push the food and rating values to the max priority queue
// In the changeRating method:
//   - Get the cuisine of the food from the foodMap and update the rating in the cuisineToFoods map priority queue
//   - Update the rating in the foodMap
// In the highestRated method:
//   - Get the max priority queue of the cuisine from the cuisineToFoods map
//   - Take the top element from the cuisine and compare it with its real rating in the foodMap:
//     - While the top rating is not the same as the real rating, remove it as its stale and take the next element from the cuisine
//   - Return the food

// Complexities:
// Time:
//   - constructor: O(n log n)
//   - changeRating: O(log(n))
//   - highestRated: O(log(n))
// Space => O(n), where n is the number of foods

import { PriorityQueue } from "@datastructures-js/priority-queue";

class FoodRatings {
	private readonly cuisineToFoods: Map<string, PriorityQueue<[string, number]>>;
	private readonly foodMap: Map<string, [string, number]>;

	constructor(foods: string[], cuisines: string[], ratings: number[]) {
		const n = foods.length;

		this.foodMap = new Map();
		this.cuisineToFoods = new Map();
		for (let i = 0; i < n; i++) {
			this.foodMap.set(foods[i], [cuisines[i], ratings[i]]);

			if (!this.cuisineToFoods.has(cuisines[i])) {
				const pq = new PriorityQueue<[string, number]>((a, b) => {
					if (a[1] === b[1]) {
						return a[0].localeCompare(b[0]);
					}

					return b[1] - a[1];
				});
				this.cuisineToFoods.set(cuisines[i], pq);
			}
			this.cuisineToFoods.get(cuisines[i]).enqueue([foods[i], ratings[i]]);
		}
	}

	changeRating(food: string, newRating: number): void {
		const cuisine = this.foodMap.get(food)![0];
		this.cuisineToFoods.get(cuisine)!.enqueue([food, newRating]);

		this.foodMap.get(food)![1] = newRating;
	}

	highestRated(cuisine: string): string {
		const pq = this.cuisineToFoods.get(cuisine);
		let [food, rating] = pq.front();
		while (this.foodMap.get(food)![1] !== rating) {
			pq.dequeue();
			[food, rating] = pq.front();
		}

		return food;
	}
}
