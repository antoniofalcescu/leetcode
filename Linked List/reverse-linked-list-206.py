# https://leetcode.com/problems/reverse-linked-list/

# TL;DR:
##  We'll use 2 pointers one for the current node starting from head and one for the previous node starting with null
##  Iterate through all nodes of the linked list and for each current node:
##      - create an aux variable nxt that holds the next node from our current node
##      - make the current node point to the previous element
##      - move the previous node to the current node
##      - move the current node to the aux nxt node
##  After finishing iterating return the prev node (the current node will be null and the prev node will hold the last element of our initial list or first element of the reversed list)  

# Complexities:
## Time => O(n), where n is the length of the linked list
## Space => O(1)

class Solution:
    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        if head == None:
            return None

        prev = None
        curr = head
        
        while curr != None:
            nxt = curr.next
            curr.next = prev
            prev = curr
            curr = nxt
        
        return prev