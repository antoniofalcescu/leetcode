# https://leetcode.com/problems/contains-duplicate-ii/

# TL;DR:
## We need to keep track of current elements of the window in a set
## Iterate through the array and:
##  - check if the current element is in the set -> return True
##  - add the current element in the set
##  - if the current right - left == k then it means that we need to move the window to the right:
##      - remove nums[left] element from the set and increment left pointer

# Complexities:
## Time => O(n), where n is the length of the array
## Space => O(k), where k is the max size of the window

class Solution:
    def containsNearbyDuplicate(self, nums: List[int], k: int) -> bool:
        if k == 0:
            return False
        
        nums_in_window = set()

        left, right = 0, 0
        for right in range(len(nums)):
            if nums[right] in nums_in_window:
                return True

            nums_in_window.add(nums[right])
            
            if right - left == k:
                nums_in_window.remove(nums[left])
                left += 1
        
        return False