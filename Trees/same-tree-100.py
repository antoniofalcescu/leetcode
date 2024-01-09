# https://leetcode.com/problems/same-tree/

# TL;DR:
##  We'll solve the problem recursively with two DFS Preorder approach algorithms that run in parallel 
##  The stop conditions for the DFS are:
##      - if both trees current nodes are null => we reached the end and we return true
##      - if one of the trees current node is null and the other is not null => return false
##      - if both trees nodes are not null but they have different values => return false
##  Recursively call our DFS again for the 2 subtrees of our both main trees

# Complexities:
## Time => O(p + q), where p and q are the length of the two trees
## Space => O(1)

class Solution:
    def isSameTree(self, p: Optional[TreeNode], q: Optional[TreeNode]) -> bool: 
        if not p and not q:
            return True
        if not p or not q:
            return False
        if p.val != q.val:
            return False
        
        return (
            self.isSameTree(p.left, q.left) and self.isSameTree(p.right, q.right)
        )
        