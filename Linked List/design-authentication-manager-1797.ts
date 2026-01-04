// https://leetcode.com/problems/design-authentication-manager/

// TL;DR:
// Define an AuthenticationNode class to store a Double Linked List node with tokenId, expireTime, next and prev pointers
// Define an AuthenticationManager class to store the ttl, tokenMap, dummy head and tail pointers
// In the constructor:
//   - Initialize the ttl, tokenMap, dummy head and tail pointers
// In the generate method:
//   - Create a new AuthenticationNode with the tokenId and expireTime (currentTime + ttl)
//   - Append the node to the end of the list (before tail)
//   - Add the node to the tokenMap
// In the renew method:
//   - If the token is not in the map, return
//   - Otherwise:
//     - If the token is expired, delete the node from the list and the tokenMap
//     - Otherwise, update the token's expireTime to the new currentTime + ttl and append the node to the end of the list (before the tail)
// In the countUnexpiredTokens method:
//   - Iterate through the Linked List until we reach the end or an unexpired token node:
//     - For each expired token node, delete it from the list and the tokenMap
//   - Return the size of the tokenMap

// Complexities:
// Time => O(1) for generate, renew and countUnexpiredTokens operations
// Space => O(n), where n is the number of tokens in the manager

class AuthenticationNode {
	readonly tokenId: string;
	expireTime: number;
	next: AuthenticationNode | null;
	prev: AuthenticationNode | null;

	constructor(tokenId: string, expireTime: number) {
		this.tokenId = tokenId;
		this.expireTime = expireTime;
		this.next = null;
		this.prev = null;
	}
}

class AuthenticationManager {
	private readonly ttl: number;
	private readonly tokenMap: Map<string, AuthenticationNode>;
	private readonly head: AuthenticationNode;
	private readonly tail: AuthenticationNode;

	constructor(timeToLive: number) {
		this.ttl = timeToLive;
		this.tokenMap = new Map();

		this.head = new AuthenticationNode("", -1);
		this.tail = new AuthenticationNode("", -1);
		this.head.next = this.tail;
		this.tail.prev = this.head;
	}

	generate(tokenId: string, currentTime: number): void {
		const node = new AuthenticationNode(tokenId, currentTime + this.ttl);
		this._append(node);
		this.tokenMap.set(tokenId, node);
	}

	renew(tokenId: string, currentTime: number): void {
		if (!this.tokenMap.has(tokenId)) {
			return;
		}

		const node = this.tokenMap.get(tokenId)!;
		if (node.expireTime <= currentTime) {
			this._delete(node);
			this.tokenMap.delete(tokenId);
		} else {
			this._delete(node);
			node.expireTime = currentTime + this.ttl;
			this._append(node);
		}
	}

	countUnexpiredTokens(currentTime: number): number {
		let curr = this.head.next!;
		while (curr !== this.tail && curr.expireTime <= currentTime) {
			const next = curr.next!;

			this._delete(curr);
			this.tokenMap.delete(curr.tokenId);

			curr = next;
		}

		return this.tokenMap.size;
	}

	_append(node: AuthenticationNode): void {
		const prev = this.tail.prev!;
		prev.next = node;
		this.tail.prev = node;
		node.prev = prev;
		node.next = this.tail;
	}

	_delete(node: AuthenticationNode): void {
		const prev = node.prev!;
		const next = node.next!;
		prev.next = next;
		next.prev = prev;
	}
}
