// https://leetcode.com/problems/find-the-winner-of-the-circular-game/

// TL;DR:
// Basically Josephus Problem with a DP approach:
//    - Base case: If there is only one player, the winner is the first player
//    - Iterate through the players from 1 to n:
//      - Winner becomes the previous winner + k % current player (move k steps forward and loop around if needed)
// Return the winner + 1 because the problem is 1-indexed

// Complexities:
// Time => O(n), where n is the number of players
// Space => O(1)

function findTheWinner(n: number, k: number): number {
	let winner = 0;
	for (let player = 1; player <= n; player++) {
		winner = (winner + k) % player;
	}

	return winner + 1;
}
