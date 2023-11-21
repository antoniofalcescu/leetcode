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
        l = 0
        r = len(s) - 1

        while l <= r:
            if not s[l].isalnum():
                l += 1
                continue
            if not s[r].isalnum():
                r -= 1
                continue

            if s[l].lower() != s[r].lower():
                return False
            
            l += 1
            r -= 1
        
        return True