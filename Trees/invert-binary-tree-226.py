# https://leetcode.com/problems/invert-binary-tree/

# TL;DR:
##  We'll solve the problem recursively with a DFS Preorder approach
##  For each node starting with root check if it's null (stop case for the recursive algorithm)
##  Swap it's children 
##  Move to the left subtree and then to the right subtree
##  Return the initial root

# Complexities:
## Time => O(n - 1) = O(n) or O(m), where n is the number of nodes in the tree (or m is the number of edges in the tree)
## Space => O(1)

class Solution:
    def invertTree(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        if root == None:
            return None

        aux = root.left
        root.left = root.right
        root.right = aux

        self.invertTree(root.left)
        self.invertTree(root.right)

        return root