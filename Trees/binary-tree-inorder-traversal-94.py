# https://leetcode.com/problems/binary-tree-inorder-traversal/

# TL;DR:
## We'll use a recursive DFS to iterate through the tree's nodes
## Create the ans array and a helper recursive method in which we call the nodes in the inorder way:
##  - Go to the left child
##  - Append the current val
##  - Go to the right child 

# Complexities:
## Time => O(n), where n is the number of nodes in the tree
## Space => O(n), where n is the call stack and output array


class Solution:
    def inorderTraversal(self, root: Optional[TreeNode]) -> List[int]:
        ans = []

        def inorder(node: Optional[TreeNode]):
            if not node:
                return
            
            inorder(node.left)
            ans.append(node.val)
            inorder(node.right)
        
        inorder(root)
        return ans
