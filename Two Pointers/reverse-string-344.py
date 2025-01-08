# https://leetcode.com/problems/reverse-string/

# TL;DR: 
## Initialize 2 pointers - 1 at the start and 1 at the end of the array
## Iterate with the 2 pointers until they meet and do a swap of current elements at each step

# Complexities:
## Time => O(n), where n is the length of the input array
## Space => O(1), in-place solution 

class Solution:
    def reverseString(self, s: List[str]) -> None:
        left, right = 0, len(s) - 1
        while left < right:
            s[left], s[right] = s[right], s[left]
            left += 1
            right -= 1
        
        