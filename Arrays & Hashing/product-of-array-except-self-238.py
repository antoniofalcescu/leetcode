# https://leetcode.com/problems/product-of-array-except-self

# TL;DR: 
## Use the answer array (initialized with 1) as the prefix array
## This prefix array will be used to update the product of the values that appear before each current value
## Use a new variable after to update the ans(prefix) array with the product of the values that appear after each current value
## We update this after value by iterating from end to start and updating first the ans array with the after value (initially 1 for the last element) 
##   and then updating the after value by multiplying it with the current value from the array
## Return the ans array

# Complexities:
## Time => O(n), where n is the length of the input array
## Space => O(1) (the returned array doesn't count)

class Solution:
    def productExceptSelf(self, nums: List[int]) -> List[int]:
        ans = [1] * len(nums)

        for i in range(1, len(nums)):
            ans[i] = ans[i - 1] * nums[i - 1]

        after = 1
        for i in range(len(nums) - 1, -1, -1):
            ans[i] *= after
            after *= nums[i]
        
        return ans