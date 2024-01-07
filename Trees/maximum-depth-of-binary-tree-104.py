# https://leetcode.com/problems/maximum-depth-of-binary-tree/

# TL;DR:
##  We'll solve the problem recursively with a DFS approach
##  For each node starting with root check if it's null (stop case for the recursive algorithm)
##  Calculate the depth of the left subtree and the right subtree add 1 to it (the current root node)
##  Return the max of the 2 depths

# Complexities:
## Time => O(n), where n is the number of nodes in the tree
## Space => O(1)

class Solution:
    def maxDepth(self, root: Optional[TreeNode]) -> int:
        if root == None:
            return 0
            
        return max(
            1 + self.maxDepth(root.left), 1 + self.maxDepth(root.right)
        )