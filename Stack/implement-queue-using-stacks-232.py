# https://leetcode.com/problems/implement-queue-using-stacks/

# TL;DR:
## This approach uses O(1) for push and amortized O(1) for pop/peek
## The main logic is that we have stack1 for pushing and stack2 for popping
## When stack2 is empty we transfer all elements from stack1 to stack2
## The empty method also needs to check for both stacks to see if the queue is empty

# Complexities:
## Time => O(1) for push, O(1) average - O(n) worst case for pop/peek
## Space => O(n), where n is the amount of numbers passed as input

class MyQueue:

    def __init__(self):
        self.stack1 = []
        self.stack2 = []


    def push(self, x: int) -> None:
        self.stack1.append(x)


    def pop(self) -> int:
        if not self.stack2:
            while self.stack1:
                self.stack2.append(self.stack1.pop())
        return self.stack2.pop()

    def peek(self) -> int:
        if not self.stack2:
            while self.stack1:
                self.stack2.append(self.stack1.pop())
        return self.stack2[-1]

    def empty(self) -> bool:
        return max(len(self.stack1), len(self.stack2)) == 0


# Your MyQueue object will be instantiated and called as such:
# obj = MyQueue()
# obj.push(x)
# param_2 = obj.pop()
# param_3 = obj.peek()
# param_4 = obj.empty()