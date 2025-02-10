# https://leetcode.com/problems/last-stone-weight/

# TL;DR: 
## Using a max heap (min heap with negative numbers)
## Iterate through the heap while we have at least 2 elements and pop the top 2 elements
## If they are not equal push back to the heap the difference of them
## Return the last element or 0 if there isn't one


# Complexities:
## Time => O(n * log(n)), where n is len(stones)
## Space => O(n), where n is len(stones)

class Solution:
    def lastStoneWeight(self, stones: List[int]) -> int:
        stones = [stone * -1 for stone in stones]
        heapq.heapify(stones)
        
        while len(stones) > 1:
            first = heapq.heappop(stones) * -1
            second = heapq.heappop(stones) * -1
            if first != second:
                heapq.heappush(stones, (first - second) * -1)
        
        return (stones[0] * -1) if stones else 0