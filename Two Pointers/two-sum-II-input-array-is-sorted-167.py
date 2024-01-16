# https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/

# TL;DR: 
## Use 2 pointers (start and end) and use them to iterate through the array
## Starting from start = 0 and end = last_index and until they meet or we find the target value do:
##   - if the current value (sum of the 2 elements at the 2 start, end indices) is equal to our target we found the indices
##   - if it's lower that means we have to increase the lower end (start index) and repeat
##   - if it's higher that means we have to decrease the upper end (end index) and repeat


# Complexities:
## Time => O(n), where n is the length of the input array
## Space => O(1) 

class Solution:
    def twoSum(self, numbers: List[int], target: int) -> List[int]:
        start = 0
        end = len(numbers) - 1
        while start <= end:
            current = numbers[start] + numbers[end]

            if current == target:
                return [start + 1, end + 1]
            elif current < target:
                start += 1
            else:
                end -= 1
        
        return []