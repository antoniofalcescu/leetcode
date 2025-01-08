# https://leetcode.com/problems/valid-palindrome-ii/

# TL;DR:
## We'll use two indexes (starting at 0, respectively n - 1) to iterate through the string in parallel
## While iterating we have to check for the following:
##  - If we find a mismatch between the current elements then we need to check if one of the 2 substrings are palindrome:
##  - Substring that skipped current left element or substring that skipped current right element
## We do this O(n) operation only once so the complexity is still O(n + n) = O(2 * n) = O(n)

# Complexities:
## Time => O(n), where n is the length of the string
## Space => O(1)

class Solution:
    def validPalindrome(self, s: str) -> bool:
        def is_palindrome(s: str) -> bool:
            return s == s[::-1]

        left, right = 0, len(s) - 1

        while left < right:
            if s[left] != s[right]:
                return is_palindrome(s[left + 1: right + 1]) or is_palindrome(s[left: right])

            left += 1
            right -= 1

        return True
