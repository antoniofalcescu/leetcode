# https://leetcode.com/problems/merge-two-sorted-lists/

# TL;DR:
##  We'll create a new linked list head and use a tail starting from that head to iterate through the list
##  Iterate through our initial 2 lists until one of them becomes null:
##      - for each current node of our 2 lists check which is lower and assign it to the tail of the newly created linked list
##  After one of the lists becomes null check if the other list still has nodes and append all of them to the tail
##  Return the head.next because head is still null (the way we append nodes to the tail is always by calling tail.next = node so that's why the first node(head) remains null)

# Complexities:
## Time => O(max(n, m)), where n is the length of list1 and m is the length of list2
## Space => O(n + m), where n is the length of list1 and m is the length of list2

class Solution:
    def mergeTwoLists(self, list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:
        head = ListNode()
        tail = head

        while list1 and list2:
            if list1.val < list2.val:
                tail.next = list1
                list1 = list1.next
            else:
                tail.next = list2
                list2 = list2.next
            tail = tail.next

        tail.next = list1 or list2

        return head.next