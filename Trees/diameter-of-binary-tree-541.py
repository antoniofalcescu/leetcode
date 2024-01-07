# https://leetcode.com/problems/diameter-of-binary-tree/

# TL;DR:
##  We'll solve the problem recursively with a DFS Postorder approach using a helper function
##  For each node starting with root check if it's null (stop case for the recursive algorithm) and return -1 which is the height of that node
##  With the Postorder approach we have to iterate through the left subtree, then the right and then calculate the values from the root
##  After visiting both subtrees, update the max_diam variable with the left_height + right_height + 2 (use 2 to counter the -1 for null subtrees)
##  Update the height of the current subtree from the DFS by returning the max height from either left or right subtrees and add 1 to it
##  Call the helper function and return the value stored inside the max_diam variable

# Complexities:
## Time => O(n), where n is the number of nodes in the tree
## Space => O(1)

class Solution:
    def diameterOfBinaryTree(self, root: Optional[TreeNode]) -> int:
        max_diam = 0

        def dfs(root):
            nonlocal max_diam
            
            if root == None:
                return -1

            left = dfs(root.left)
            right = dfs(root.right)
            max_diam = max(max_diam, left + right + 2)

            return 1 + max(left, right)
        
        dfs(root)
        return max_diam