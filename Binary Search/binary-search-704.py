# https://leetcode.com/problems/binary-search/

# TL;DR:
## We'll use two indexes (left starting at 0, respectively right at n - 1) to iterate through the array
## We also keep a 'mid' variable that stores the middle index of the subarray [left, right]
## With this 'mid' variable we check if nums[mid] is:
##      - equal to our target => return mid
##      - greater than our target => our target could be in the lower half of the subarray
##      - lower than our target => our target could be in the upper half of the subarray
## If we exit the while loop and we have not yet found the target number
## => return -1 because the target is not in the input array

# Complexities:
## Time => O(log(n)), where n is the length of the array
## Space => O(1)

class Solution:
    def search(self, nums: List[int], target: int) -> int:
        left = 0
        right = len(nums) - 1

        while left <= right:
            mid = (left + right) // 2

            if nums[mid] == target:
                return mid
            elif nums[mid] > target:
                right = mid - 1
            else: 
                left = mid + 1
            
        return -1