// https://leetcode.com/problems/evaluate-division

// TL;DR:
// The main idea is to view this as a Graph problem where:
//   - The letters from the equations are the nodes
//   - The values from the equations are the weights of the edges (a/b => a->b with weight=value and b->a with weight=1/value)
//   - The equations are the edges
// Build the adjacency list based on the equations and values
// For each query, use DFS to find the result:
//   - If the source or target is not in the adjacency list, return -1
//   - Base case: source === target, return 1
//   - Recursive case:
//     - Add the current node to the visited set
//     - For each unvisited neighbor of the source, recursively call DFS on the neighbor with the target and the visited set
//     - If one DFS call returns a non -1 result, return the result * current edge weight
//     - Return -1 after all DFS calls are done

// Complexities:
// Time => O(q * e), where q is the number of queries and e is the number of equations
// Space => O(e + q), where e is the number of equations and q is the number of queries

function calcEquation(equations: string[][], values: number[], queries: string[][]): number[] {
    const adjList = new Map<string, [string, number][]>();
    for (let i = 0; i < equations.length; i++) {
        const [x, y] = equations[i];
        const val = values[i];
        if (!adjList.has(x)) {
            adjList.set(x, []);
        }
        if (!adjList.has(y)) {
            adjList.set(y, []);
        }

        adjList.get(x)!.push([y, val]);
        adjList.get(y)!.push([x, 1 / val]);
    }

    function dfs(src: string, target: string, visited: Set<string>): number {
        if (!adjList.has(src) || !adjList.has(target)) {
            return -1;
        }
        if (src === target) {
            return 1;
        }
        visited.add(src);

        for (const [nei, weight] of adjList.get(src)!) {
            if (!visited.has(nei)) {
                const result = dfs(nei, target, visited);
                if (result !== -1) {
                    return result * weight;
                }
            }
        }

        return -1;
    }

    const ans: number[] = [];
    for (const [x, y] of queries) {
        const visited = new Set<string>();
        const result = dfs(x, y, visited);
        ans.push(result);
    }   

    return ans;
    
};