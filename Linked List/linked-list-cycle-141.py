# https://leetcode.com/problems/linked-list-cycle/

# TL;DR:
##  We'll use 2 pointers (slow and fast) initialized as seen in the code.
##  The logic behind these 2 pointers is that we iterate through the linked list with our fast pointer
##  The fast pointer moves 2 steps at a time while the slow pointer moves one step at a time
##  If the slow pointer catches up with the fast one it means that there is a cycle => return True
##  If the fast pointer or his next node become null, then it means that there is no cycle and we return False

# Complexities:
## Time => O(n), where n is the length of the linked list
## Space => O(1)

class Solution:
    def hasCycle(self, head: Optional[ListNode]) -> bool:
        if head == None or head.next == None:
            return False

        slow = head.next
        fast = head.next.next

        while fast and fast.next:
            if slow == fast:
                return True

            slow = slow.next
            fast = fast.next.next

        return False