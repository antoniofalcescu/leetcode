// https://leetcode.com/problems/time-needed-to-inform-all-employees/

// TL;DR:
// Build the adjacency list based on the manager array so that each key is the managerId and value is an array of subordinateIds
// Initialize the BFS queue with the headID and 0 time and keep track of the max time
// While the queue is not empty:
//   - Pop the current employee and time
//   - Update the max time with max(maxTime, current time)
//   - For each subordinate of the current employee, add the subordinate and the time + informTime[id] to the queue
// Return the max time

// Complexities:
// Time => O(n), where n is the number of employees
// Space => O(n), where n is the number of employees

import { Queue } from "@datastructures-js/queue";

function numOfMinutes(n: number, headID: number, manager: number[], informTime: number[]): number {
    const adjList = new Map<number, number[]>();
    for (let i = 0; i < n; i++) {
        adjList.set(i, []);
    }
    for (let i = 0; i < n; i++) {
        const boss = manager[i];
        if (boss === -1) {
            continue;
        }
        adjList.get(boss)!.push(i);
    }

    const queue = new Queue<[number, number]>([[headID, 0]]);
    let maxTime = 0;
    while (!queue.isEmpty()) {
        const [id, time] = queue.pop();
        
        maxTime = Math.max(maxTime, time);
        for (const subordinate of adjList.get(id)!) {
            queue.push([subordinate, time + informTime[id]])
        }
    }

    return maxTime;
};