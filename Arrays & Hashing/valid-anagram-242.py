# https://leetcode.com/problems/valid-anagram/

# TL;DR:
## Use a hash map to store the number of appearances for each letter in the first string.
## Iterate through the second string and check if the current letter doesn't exist in the map => return False
## If it exists, decrement the appearances of that letter by 1
## If the decremented value is equal to 0, remove the letter from the map (so that the first 'if' will get triggered if we encounter the same letter again)
## Finally return True or False if the map is empty or not

# Complexities:
## Time => O(n), where n is the length of both strings
## Space => O(n), where n is the number of unique characters in the first string (n <= 26)

class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        if len(s) != len(t):
            return False
        apps = dict()

        for c in s:
            apps[c] = apps.get(c, 0) + 1
        
        for c in t:
            if c not in apps:
                return False
            apps[c] -= 1

            if apps[c] == 0:
                apps.pop(c)

        return not apps

