# https://leetcode.com/problems/design-hashset/

# TL;DR: 
## Use an array with linked lists as the elements
## Use a basic module hashing to decide which index of the array will hold the value
## For add - iterate through the LinkedList of the index and at the end add a new ListNode with the added key
## For remove - iterate through the LinkedList of the index and when finding the value remove the ListNode
## For contains - iterate through the LinkedList of the index and when finding the value return True

# Complexities:
## Time => O(n / k), where n is the number of keys and k is the set size (10_000 for this input)
## Space => O(m + k), where m is the number of unique keys and k is the set size (10_000 for this input)

class ListNode:
    def __init__(self, key):
        self.key = key
        self.next = None


class MyHashSet:

    def __init__(self):
        self.set = [ListNode(0) for i in range(10**4)]        

    def add(self, key: int) -> None:
        index = key % len(self.set)
        curr = self.set[index]

        while curr.next:
            if curr.next.key == key:
                return
            curr = curr.next
        
        curr.next = ListNode(key)

    def remove(self, key: int) -> None:
        index = key % len(self.set)
        curr = self.set[index]

        while curr.next:
            if curr.next.key == key:
                curr.next = curr.next.next
                return
            curr = curr.next

    def contains(self, key: int) -> bool:
        index = key % len(self.set)
        curr = self.set[index]

        while curr.next:
            if curr.next.key == key:
                return True
            curr = curr.next
        
        return False
