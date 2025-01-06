# https://leetcode.com/problems/concatenation-of-array/

# TL;DR: 
## Iterate through the array and:
##    append the current element to the current index of the ans array
##    append the current element to the current index + N of the ans array

# Complexities:
## Time => O(n), where n is the length of the input array
## Space => O(2 * n) = O(n), where n is the size of the input array

class Solution:
    def getConcatenation(self, nums: List[int]) -> List[int]:
        ans = [0] * (len(nums) * 2)
        for i in range(len(nums)):
            ans[i] = nums[i]
            ans[i + len(nums)] = nums[i]
        return ans