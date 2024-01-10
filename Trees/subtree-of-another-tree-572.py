# https://leetcode.com/problems/subtree-of-another-tree

# TL;DR:
##  We'll solve the problem recursively with two DFS Preorder approach algorithms that are nested:
##  The first DFS is the outer one which will check for each node in the root tree (the big one) if the current root node is the root of the subtree
##  If that's the case we enter the inner DFS which will traverse both subtrees (the subtree from the current node that matched and the initial other subtree)
##  Check for each node in the 2 subtrees if they are equal and if so continue the DFS, otherwise return False
##  If we returned true in the inner DFS we also return true in the outer DFS as the final answer
##  If we returned false we check further (if we still have nodes in our big tree)
##  If we run out of nodes we stop and return False

# Complexities:
## Time => O(r * s), where r is the length of the root tree and s the subroot tree
## Space => O(1)

class Solution:
    def sameTree(self, s, t):
        if not s and not t:
            return True
        if s and t and s.val == t.val:
            return (
                self.sameTree(s.left, t.left) and self.sameTree(s.right, t.right)
            )

        return False  


    def isSubtree(self, root: Optional[TreeNode], subRoot: Optional[TreeNode]) -> bool:
        if not subRoot:
            return True
        if not root:
            return False
        
        if self.sameTree(root, subRoot):
            return True

        return (self.isSubtree(root.left, subRoot) or self.isSubtree(root.right, subRoot))