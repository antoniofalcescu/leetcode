# https://leetcode.com/problems/valid-parentheses/

# TL;DR:
## Use a stack to keep track of parentheses state
## Iterate through the input string and:
##  - for each open parentheses add it to the stack
##  - for each closing parentheses check if the top of the stack is the correct parentheses (also treat the empty stack case)

# Complexities:
## Time => O(n), where n is the length of the array
## Space => O(n), where n is the length of the array

class Solution:
    def isValid(self, s: str) -> bool:
        PARENTHESES =  {
            '(': ')',
            '[': ']',
            '{': '}',
        }

        stack = []
        for c in s:
            if c in ['(', '[', '{']:
                stack.append(c)
            else:
                if len(stack) == 0:
                    return False
                top = stack.pop()
                if PARENTHESES[top] != c:
                    return False
        
        return len(stack) == 0