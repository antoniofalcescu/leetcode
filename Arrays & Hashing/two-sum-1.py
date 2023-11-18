# https://leetcode.com/problems/two-sum/

# TL;DR:
## We'll use a hash map to store the numbers in the following format => {target - nums[i]: i}
## Iterate through the input array and check if the current number exists in the map => return the current index and the index of the current number stored in the map
## If it doesn't exist store it with the previously mentioned format
## Considering the problem mentions there is always a solution we can return an empty array at the end (or simply omit the return) because we will never react that return statement

# Complexities:
## Time => O(n), where n is the length of the input array
## Space => O(n), where n is the number of unique numbers in the input array

class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        ans = dict()

        for i in range(len(nums)):
            if nums[i] in ans:
                return [i, ans[nums[i]]]
            ans[target - nums[i]] = i

        return []
        