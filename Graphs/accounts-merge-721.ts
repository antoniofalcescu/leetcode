// https://leetcode.com/problems/accounts-merge/

// TL;DR:
// Use a Union Find approach
// We want to first map each email to an account index (the index in the input array)
//   - If the email is already mapped to an account index, we union the 2 indices
//   - Otherwise, we add the account index to the email in the map
// Afterwards, build a map of account indices to emails where we handle merging using the find method:
//   - Itereate through the emailToAccountIdx map and for each email, find the parent account index and add the email to the map of that idx in a list
// Finally, iterate through the accountIdxToEmails map and return the name and the sorted emails for each account

// Complexities:
// Time => O(n * e * log(n * e)), where n is the number of accounts and e is the number of emails
// Space => O(n * e), where n is the number of accounts and e is the number of emails

function accountsMerge(accounts: string[][]): string[][] {
	const n = accounts.length;

	const parents: number[] = [];
	const ranks: number[] = [];
	for (let i = 0; i < n; i++) {
		parents.push(i);
		ranks.push(1);
	}

	function find(node: number): number {
		while (node !== parents[node]) {
			parents[node] = parents[parents[node]];
			node = parents[node];
		}
		return node;
	}

	function union(node1: number, node2: number): boolean {
		const [parent1, parent2] = [find(node1), find(node2)];
		if (parent1 === parent2) {
			return false;
		}

		if (ranks[parent1] >= ranks[parent2]) {
			parents[parent2] = parent1;
			ranks[parent1] += ranks[parent2];
		} else {
			parents[parent1] = parent2;
			ranks[parent2] += ranks[parent1];
		}

		return true;
	}

	const emailToAccountIdx = new Map<string, number>();
	for (let i = 0; i < n; i++) {
		for (let j = 1; j < accounts[i].length; j++) {
			const email = accounts[i][j];
			if (emailToAccountIdx.has(email)) {
				const existingAccountIdx = emailToAccountIdx.get(email)!;
				union(existingAccountIdx, i);
			} else {
				emailToAccountIdx.set(email, i);
			}
		}
	}

	const accountIdxToEmails = new Map<number, string[]>();
	for (const [email, accountIdx] of emailToAccountIdx.entries()) {
		const parentIdx = find(accountIdx);
		if (!accountIdxToEmails.has(parentIdx)) {
			accountIdxToEmails.set(parentIdx, []);
		}
		accountIdxToEmails.get(parentIdx)!.push(email);
	}

	const ans: string[][] = [];
	for (const [accountIdx, emails] of accountIdxToEmails.entries()) {
		const name = accounts[accountIdx][0];
		emails.sort();
		ans.push([name, ...emails]);
	}

	return ans;
}
