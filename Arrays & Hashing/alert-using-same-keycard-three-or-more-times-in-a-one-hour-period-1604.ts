// https://leetcode.com/problems/alert-using-same-keycard-three-or-more-times-in-a-one-hour-period/

// TL;DR:
// Use a hash map to store the converted times to minutes for each worker
// Iterate through the keyName and keyTime arrays and convert the HH:MM time to minutes 
// Iterate through the hash map and for each worker:
//   - Sort the minutes ASC
//   - Iterate through the sorted minutes in batches of 3 and check if third - first <= 60, then add the worker name to the answer and break to avoid duplicates
// Return the answer sorted alphabetically

// Complexities:
// Time => O(n * log(n)), where n is the number of keyName and keyTime pairs
// Space => O(n), where n is the number of keyName and keyTime pairs

function convertTimeToMinutes(time: string): number {
    const [hour, minutes] = time.split(':').map(Number);
    return hour * 60 + minutes;
}

function alertNames(keyName: string[], keyTime: string[]): string[] {
    const timesByName: Record<string, number[]> = {};
    for (let i = 0; i < keyName.length; i++) {
        if (!timesByName[keyName[i]]) {
            timesByName[keyName[i]] = [];
        }

        const minutes = convertTimeToMinutes(keyTime[i]);
        timesByName[keyName[i]].push(minutes);
    }

    const workers: string[] = [];
    for (let [name, times] of Object.entries(timesByName)) {
        times.sort((a, b) => a - b);
        for (let i = 0; i < times.length - 2; i++) {
            const [first, third] = [times[i], times[i + 2]];
            if (third - first <= 60) {
                workers.push(name);
                break;
            }
        }
    }

    return workers.sort();
};