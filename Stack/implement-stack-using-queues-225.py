# https://leetcode.com/problems/implement-stack-using-queues/

# TL;DR:
## This approach uses O(n) for push operation and O(1) for pop
## In push we append the element to queue2, take all elements from queue1 and put them in queue2 and then put all elements of queue2 back to queue1
## This assures the following:
##  - we add the new element as the first one in queue2 and then all of the previous elements from queue1 follow him in queue2
##  - we then move the current queue2 back to queue1 (the primary queue) so that we have the newly added element as the first one in the queu (mimicking LIFO)

# Complexities:
## Time => O(n) for push, O(1) for pop, where n is the amount of numbers passed as input
## Space => O(n), where n is the amount of numbers passed as input

class MyStack:
    def __init__(self):
        self.queue1 = collections.deque()
        self.queue2 = collections.deque()

    def push(self, x: int) -> None:
        self.queue2.append(x)

        while self.queue1:
            self.queue2.append(self.queue1.popleft())

        while self.queue2:
            self.queue1.append(self.queue2.popleft())

    def pop(self) -> int:
        return self.queue1.popleft()

    def top(self) -> int:
        return self.queue1[0]

    def empty(self) -> bool:
        return not self.queue1
