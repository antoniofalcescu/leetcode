# https://leetcode.com/problems/longest-common-prefix/

# TL;DR: 
## Find the smallest word by length from the array
## Iterate through the smallest word found to get the current letter and then through each word in the list
##  if any word doesn't have the current letter at the current position, return early ans
##  else if all words have the letter add it to the ans

# Complexities:
## Time => O(n), where n is the length of the input array
## Space => O(1)

class Solution:
    def longestCommonPrefix(self, strs: List[str]) -> str:
        smallest_word = strs[0]
        for i in range(1, len(strs)):
            word = strs[i]
            if len(word) < len(smallest_word):
                smallest_word = word
        
        ans = ""
        for i in range(len(smallest_word)):
            letter = smallest_word[i]
            for word in strs:
                if word[i] != letter:
                    return ans
            ans += letter
        return ans
