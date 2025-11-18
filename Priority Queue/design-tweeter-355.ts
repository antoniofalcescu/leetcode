// https://leetcode.com/problems/design-twitter/

// TL;DR:
// Use 2 maps and a counter to define recent tweets
// postTweet:
//   - Increment the counter and push the [count, tweetId] pair to the tweet map of the userId
// getNewsFeed:
//   - Initialize the array of userIds for which to fetch the tweets (current userId and his followees)
//   - Initialize a max heap and push the [count, userId, tweetId, index] tuple for each tweet of the users in the userIds array
//   - While the heap is not empty and the answer array is less than 10:
//     - Pop the tuple from the heap
//     - Add the tweet id to the answer array
//     - If the index is greater than 0 (user still has tweets that were not processed), push the [nextCount, nextUserId, nextTweetId, nextIndex] tuple to the heap
//   - Return the answer array
// follow:
//   - Add the followee id to the set of the followerId
// unfollow:
//   - Delete the followee id from the set of the followerId

// Complexities:
// Time:
//   - getNewsFeed: O(10 * log(f * t)), where f is the number of followers and t is the number of tweets of an user
//   - postTweet: O(1)
//   - follow: O(1)
//   - unfollow: O(1)
// Space => O(n * (f + t)), where n is the number of users, f is the number of followers and t is the number of tweets of an user

import { MaxPriorityQueue } from "@datastructures-js/priority-queue";

class Twitter {
	private count: number;
	private readonly tweetMap: Map<number, number[][]>;
	private readonly followMap: Map<number, Set<number>>;

	constructor() {
		this.count = 0;
		this.tweetMap = new Map();
		this.followMap = new Map();
	}

	postTweet(userId: number, tweetId: number): void {
		if (!this.tweetMap.has(userId)) {
			this.tweetMap.set(userId, []);
		}
		this.tweetMap.get(userId)!.push([this.count, tweetId]);
		this.count++;
	}

	getNewsFeed(userId: number): number[] {
		const ans: number[] = [];
		const userIds = [userId];
		if (this.followMap.has(userId)) {
			userIds.push(...this.followMap.get(userId)!);
		}
		const maxHeap = new MaxPriorityQueue<number[]>((elem) => elem[0]);
		for (const userId of userIds) {
			if (this.tweetMap.has(userId)) {
				const userTweets = this.tweetMap.get(userId)!;
				const index = userTweets.length - 1;
				const [count, tweetId] = userTweets[index];
				maxHeap.enqueue([count, userId, tweetId, index]);
			}
		}

		while (!maxHeap.isEmpty() && ans.length < 10) {
			const [count, userId, tweetId, index] = maxHeap.dequeue();
			ans.push(tweetId);

			if (index > 0) {
				const nextIndex = index - 1;
				const [nextCount, nextTweetId] = this.tweetMap.get(userId)![nextIndex];
				maxHeap.enqueue([nextCount, userId, nextTweetId, nextIndex]);
			}
		}

		return ans;
	}

	follow(followerId: number, followeeId: number): void {
		if (!this.followMap.has(followerId)) {
			this.followMap.set(followerId, new Set<number>());
		}

		this.followMap.get(followerId).add(followeeId);
	}

	unfollow(followerId: number, followeeId: number): void {
		if (!this.followMap.has(followerId)) {
			return;
		}
		this.followMap.get(followerId).delete(followeeId);
	}
}

/**
 * Your Twitter object will be instantiated and called as such:
 * var obj = new Twitter()
 * obj.postTweet(userId,tweetId)
 * var param_2 = obj.getNewsFeed(userId)
 * obj.follow(followerId,followeeId)
 * obj.unfollow(followerId,followeeId)
 */
