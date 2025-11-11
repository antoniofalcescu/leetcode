# https://leetcode.com/problems/diameter-of-binary-tree/

# TL;DR:
##  We'll solve the problem recursively with a DFS Postorder approach using a helper function
##  For each node starting with root check if it's null (stop case for the recursive algorithm) and return 0 representing the diameter of the node
##  With the Postorder approach we have to iterate through the left subtree, then the right and then calculate the values from the root
##  After visiting both subtrees, update the max_diam variable with the left diameter + right diameter
##  Update the diameter of the current subtree from the DFS by returning the max diameter from either left or right subtrees and add 1 to it
##  Call the helper function and return the value stored inside the max_diam variable

# Complexities:
## Time => O(n), where n is the number of nodes in the tree
## Space => O(h), where h is the height of the tree

class Solution:
    def diameterOfBinaryTree(self, root: Optional[TreeNode]) -> int:
        max_diam = 0

        def dfs(root):
            nonlocal max_diam
            
            if root == None:
                return 0

            left = dfs(root.left)
            right = dfs(root.right)
            max_diam = max(max_diam, left + right)

            return 1 + max(left, right)
        
        dfs(root)
        return max_diam