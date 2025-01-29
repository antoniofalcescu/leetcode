# https://leetcode.com/problems/remove-duplicates-from-sorted-array/

# TL;DR: 
## Use 2 pointers (left and right) starting from 1 and use the right to iterate through the array:
##  - for each nums[r] compare if it's different that the nums[r - 1]
##  - if yes, assign it to current nums[l] and increment l by 1 (to put the new unique number forward)
## Return l which represents the length of the sorted array with only unique numbers


# Complexities:
## Time => O(n), where n is the length of the input array
## Space => O(1) 

class Solution:
    def removeDuplicates(self, nums: List[int]) -> int:
        l = 1
        for r in range(1, len(nums)):
            if nums[r] == nums[r - 1]:
                continue
            
            nums[l] = nums[r]
            l += 1
        
        return l