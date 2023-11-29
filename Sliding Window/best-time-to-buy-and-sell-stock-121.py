# https://leetcode.com/problems/best-time-to-buy-and-sell-stock/

# TL;DR:
## We'll use a variable 'buyDay' that represents the index of the min value of the current subarray
## We iterate through the array and for each element we do the following:
##      - update maxProfit variable if (the current element - buyDay element) > maxProfit
##      - update buyDay with our current current index if the current element < buyDay element
## Lastly return maxProfit

# Complexities:
## Time => O(n), where n is the length of the array
## Space => O(1)

class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        buyDay = 0
        maxProfit = 0

        for i in range(1, len(prices)):
            maxProfit = max(maxProfit, prices[i] - prices[buyDay])
            
            if prices[i] < prices[buyDay]:
                buyDay = i

        return maxProfit