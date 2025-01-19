# https://leetcode.com/problems/merge-strings-alternately/

# TL;DR: 
## Find the min length of the two words and use that to iterate to both words
## Iterate through the possible remaining parts of the 2 words to add the remaining letters at the end

# Complexities:
## Time => O(n), where n is the length of the larger word
## Space => O(n + m), where n and m are the lengths of the two words 

class Solution:
    def mergeAlternately(self, word1: str, word2: str) -> str:
        ans = ""
        
        length = len(word1) if len(word1) < len(word2) else len(word2)
        for i in range(length):
            ans += word1[i] + word2[i]
        
        for i in range(length, len(word1)):
            ans += word1[i]
        
        for i in range(length, len(word2)):
            ans += word2[i]

        return ans