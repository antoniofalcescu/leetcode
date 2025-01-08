# https://leetcode.com/problems/valid-palindrome/

# TL;DR:
## We'll use two indexes (starting at 0, respectively n - 1) to iterate through the string in parallel
## While iterating we have to check for the following:
##  - If the characters at the two indexes are not alphanumeric => increment/decrement them accordingly
##  - If the current two characters are both alphanumeric and not equal => it's not a palindrome
##  - If the left index has become greater than the right index => it's a palindrome

# Complexities:
## Time => O(n), where n is the length of the string
## Space => O(1)

class Solution:
    def isPalindrome(self, s: str) -> bool:
        left, right = 0, len(s) - 1
        while left < right:
            while left < right and not s[left].isalnum():
                left += 1
            while left < right and not s[right].isalnum():
                right -= 1
            
            if s[left].lower() != s[right].lower():
                return False
            left += 1
            right -= 1
        
        return True
                