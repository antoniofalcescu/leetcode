# https://leetcode.com/problems/remove-element

# TL;DR: 
## Initialize a k at the start and use another pointer to iterate through the array:
##  - for each element check if it's different than the value we need to remove
##  - if yes then put it at the beginning (at the k position) and increment k
## Return k

# Complexities:
## Time => O(n), where n is the length of the input array
## Space => O(1), in-place solution as required

class Solution:
    def removeElement(self, nums: List[int], val: int) -> int:
        k = 0
        for i in range(len(nums)):
            if nums[i] != val:
                nums[k] = nums[i]
                k += 1
        
        return k
            
