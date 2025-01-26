# https://leetcode.com/problems/majority-element

# TL;DR: 
## Considering that we know there is an element that appears >= [n // 2] we can use the Boyer-Moore voting algorithm (https://en.wikipedia.org/wiki/Boyer–Moore_majority_vote_algorithm) for 0(1) space solution
## Iterate through the input array:
##  - check if the current majority element's count is 0 -> then the current number will be considered the majority element
##  - increment/decrement the count according to the current element (if it's the same as the majority increment, otherwise decrement)

# Complexities:
## Time => O(n), where n is the length of the input array
## Space => O(1)

class Solution:
    def majorityElement(self, nums: List[int]) -> int:
        ans = None
        count = 0

        for n in nums:
            if count == 0:
                ans = n
            count += 1 if ans == n else -1
        
        return ans
        