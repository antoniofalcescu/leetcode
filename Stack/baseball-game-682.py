# https://leetcode.com/problems/baseball-game/

# TL;DR:
## Use a stack to keep track of scores state
## Iterate through the input string and do the operation as described in the requirements:

# Complexities:
## Time => O(n), where n is the length of the array
## Space => O(n), where n is the length of the array

class Solution:
    def calPoints(self, operations: List[str]) -> int:
        stack = []
        for op in operations:
            if op == '+':
                toPush = stack[-1] + stack[-2]
                stack.append(toPush)
            elif op == 'D':
                toPush = stack[-1] * 2
                stack.append(toPush)
            elif op == 'C':
                stack.pop()
            else:
                stack.append(int(op))
        
        return sum(stack)