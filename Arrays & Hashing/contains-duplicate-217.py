# https://leetcode.com/problems/contains-duplicate/

# TL;DR: 
## Iterate through the array and use a set to check if we've already seen the current number.
## If the current number exists in the set => return True
## Otherwise add the current number in the set and continue iterating
## If we reach the end of the for loop => return False

# Complexities:
## Time => O(n), where n is the length of the input array
## Space => O(n), where n is the size of the input array

class Solution:
    def containsDuplicate(self, nums: List[int]) -> bool:
        dupes = set()

        for num in nums:
            if num in dupes:
                return True
            dupes.add(num)

        return False

