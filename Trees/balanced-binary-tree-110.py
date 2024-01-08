# https://leetcode.com/problems/balanced-binary-tree/

# TL;DR:
##  We'll solve the problem recursively with a DFS Postorder approach using a helper function
##  For each node starting with root check if it's null (stop case for the recursive algorithm) and return a tuple [True, 0] which represents [isBalanced, height]
##  With the Postorder approach we have to iterate through the left subtree, then the right and then calculate the values from the root
##  After visiting both subtrees, update the balanced variable by checking if both of it's subtrees are balanced and if the difference in height of the 2 subtrees is <= 1
##  Update the height of the current subtree from the DFS by returning the max height from either left or right subtrees and add 1 to it
##  Call the helper function and return the first value of the tuple

# Complexities:
## Time => O(n), where n is the number of nodes in the tree
## Space => O(1)

class Solution:
    def isBalanced(self, root: Optional[TreeNode]) -> bool:
        def dfs(root):
            if not root:
                return [True, 0]

            left = dfs(root.left)
            right = dfs(root.right)

            balanced = left[0] and right[0] and (abs(left[1] - right[1]) <= 1)
            height = 1 + max(left[1], right[1])

            return [balanced, height]
        
        return dfs(root)[0]