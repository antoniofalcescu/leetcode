// https://leetcode.com/problems/design-browser-history/

// TL;DR:
// Define a BrowserNode class to store a Double Linked List node with url, next and prev pointers
// Define a BrowserHistory class to store the current node and methods to visit, back and forward
// In the constructor:
//   - Initialize the current node with the homepage
// In the visit method:
//   - Create a new node with the given url
//   - Set the current node's next to the new node and the new node's prev to the current node
//   - Move to the newly created node as the current node
// In the back method:
//   - Iterate through the list until we reach the end or the steps are 0
//      - Move to the previous node as the current node
//      - Decrement the steps
//   - Return the current node's url
// In the forward method:
//   - Iterate through the list until we reach the end or the steps are 0
//      - Move to the next node as the current node
//      - Decrement the steps
//   - Return the current node's url

// Complexities:
// Time => O(1) for visit; O(steps) for back and forward operations
// Space => O(n), where n is the number of visited urls

class BrowserNode {
    url: string;
    next: BrowserNode | null;
    prev: BrowserNode | null;

    constructor(url: string) {
        this.url = url;
        this.next = null;
        this.prev = null;
    }
}

class BrowserHistory {
    private node: BrowserNode;

    constructor(homepage: string) {
        this.node = new BrowserNode(homepage);
    }

    visit(url: string): void {
        const node = new BrowserNode(url);
        this.node.next = node;
        node.prev = this.node;
        this.node = this.node.next;
    }

    back(steps: number): string {
        while (steps && this.node.prev) {
            this.node = this.node.prev;
            steps--;
        }

        return this.node.url;
    }

    forward(steps: number): string {
        while (steps && this.node.next) {
            this.node = this.node.next;
            steps--;
        }

        return this.node.url;
    }
}