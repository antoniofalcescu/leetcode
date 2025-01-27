# https://leetcode.com/problems/binary-tree-preorder-traversal/

# TL;DR:
## We'll use a recursive DFS to iterate through the tree's nodes
## Create the ans array and a helper recursive method in which we call the nodes in the preorder way:
##  - Append the current val
##  - Go to the left child
##  - Go to the right child 

# Complexities:
## Time => O(n), where n is the number of nodes in the tree
## Space => O(n), where n is the call stack and output array

class Solution:
    def preorderTraversal(self, root: Optional[TreeNode]) -> List[int]:
        ans = []

        def preorder(node: Optional[TreeNode]):
            if not node:
                return
            
            ans.append(node.val)
            preorder(node.left)
            preorder(node.right)
        
        preorder(root)
        return ans