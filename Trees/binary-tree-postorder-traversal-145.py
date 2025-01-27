# https://leetcode.com/problems/binary-tree-postorder-traversal/

# TL;DR:
## We'll use a recursive DFS to iterate through the tree's nodes
## Create the ans array and a helper recursive method in which we call the nodes in the postorder way:
##  - Go to the left child
##  - Go to the right child 
##  - Append the current val

# Complexities:
## Time => O(n), where n is the number of nodes in the tree
## Space => O(n), where n is the call stack and output array

class Solution:
    def postorderTraversal(self, root: Optional[TreeNode]) -> List[int]:
        ans = []

        def postorder(node: Optional[TreeNode]):
            if not node:
                return
            
            postorder(node.left)
            postorder(node.right)
            ans.append(node.val)
        
        postorder(root)
        return ans