# https://leetcode.com/problems/kth-largest-element-in-a-stream/

# TL;DR: 
## Using a min heap to keep track of the first k elements always and have the lowest element as the first one:
##  - in the init method we initialize the heap with all elems of nums
##      - if there are more elems in the heap than k, pop the lowest until it len(heap) == k
##  - in the add method push the new elem in the heap
##      - if the new heap length is greater thank k pop the lowest again
##      - return the first element from the heap (the currently lowest) which is the kth largest elem


# Complexities:
## Time => O(n * log(k)), where n is the len(nums) and k is the input number (size of the heap)
## Space => O(k), where k is the input number (size of the heap)

class KthLargest:

    def __init__(self, k: int, nums: List[int]):
        self.heap, self.k = nums, k
        heapq.heapify(self.heap)
        while len(self.heap) > k:
            heapq.heappop(self.heap)

    def add(self, val: int) -> int:
        heapq.heappush(self.heap, val)
        
        if len(self.heap) > self.k:
            heapq.heappop(self.heap)
        
        return self.heap[0]