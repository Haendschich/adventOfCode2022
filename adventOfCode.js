const fs = require('fs');
function readInput(n) {
    try {
        return fs.readFileSync("input" + n + ".txt", 'utf8');
    } catch (err) {
        console.error('Fehler beim Lesen der Datei: ', err);
        return null;
    }
}

/**
 * Modulo with negative numbers.
 * @param {number} n
 * @param {number} m
 * @returns {number} n % m
 */
const mod = (n, m) => {
    return ((n % m) + m) % m;
}

/**
 * Task 1: Calories of Elves.
 * @param {string} inputString
 * @returns {[number, number]} [Highest Calories, Sum of three highest Calories]
 */
const task1 = inputString => {
    const elves = inputString.split('\r\n\r\n') //splitting different elves
        .map(x => x.split('\r\n')) //splitting values
        .map(x => x.reduce((acc, cur) => acc + parseInt(cur), 0)); //summing values up

    elves.sort();
    elves.reverse();

    return [elves[1], elves.slice(1,4).reduce((acc, cur) => acc + cur, 0)];
}

console.log("Task 1: " + task1(readInput(1)))

/**
 * Task 2: Secret Strategy Guide.
 * @param {string} inputString
 * @returns {[number, number]} [Total Points Strategy 1, Total Points Strategy 2]
 */
const task2 = inputString => {

    // Substitute Characters with the Points they achieve
    const strategy = inputString.replaceAll(/[AX]/g, "1")
        .replaceAll(/[BY]/g, "2")
        .replaceAll(/[CZ]/g, "3");

    let totalPoints1 = 0;
    let totalPoints2 = 0;

    for (const line of strategy.split('\r\n')) {
        // Calculate Points from Sign and Winning with Modulo operator
        totalPoints1 += parseInt(line.slice(-1));
        totalPoints1 += mod(mod(parseInt(line.slice(-1)) - parseInt(line[0]), 3) + 1, 3) * 3;

        // Calculate Points from Winning and Sign with Modulo operator
        totalPoints2 += (parseInt(line.slice(-1)) - 1) * 3;
        totalPoints2 += mod(parseInt(line.slice(-1)) - 1 + parseInt(line[0]) - 2, 3) + 1;
    }

    return [totalPoints1, totalPoints2]
}

console.log("Task 2: " + task2(readInput(2)))

/**
 * Task 3: Double Backbacks
 * @param {string} inputString
 * @returns {[number, number]} [Priority Sum for each Backpack, Priority Sum for each group]
 */
const task3 = inputString => {
    const priority = c => {
        if (/[a-z]/.test(c)) {
            return c.charCodeAt(0) - 96;
        }else{
            return c.charCodeAt(0) - 38;
        }
    }

    const backpack = inputString.split('\r\n')

    let totalPriority1 = 0
    let totalPriority2 = 0

    for (const [i, line] of backpack.entries()) {
        totalPriority1 += Array.from(
                new Set(line.slice(0, line.length/2).split('')
                .filter(x => line.slice(line.length/2, line.length).split('').includes(x))))
            .map(x => priority(x))
            .reduce((acc, cur) => acc + parseInt(cur), 0);



        if (i % 3 === 0) {
            totalPriority2 += backpack[i].split('')
                .filter(x => backpack[i + 1].split('').includes(x))
                .filter(x => backpack[i + 2].split('').includes(x))
                .map(x => priority(x))[0]
        }

    }

    return [totalPriority1, totalPriority2];
}

console.log("Task 3: " + task3(readInput(3)))

/**
* Task 3: Cleaning Spaces
* @param {string} inputString
* @returns {[number, number]} [Number of Inclusions, Number of intersections]
*/
const task4 = inputString => {
    const spaces = inputString.split('\r\n')
        .map(x => x.split(','))
        .map(x => x.map(y => y.split('-')))
        .filter(x => x[0] && x[1]);

    const spaces1 = spaces.filter(x => parseInt(x[0][0]) <= parseInt(x[1][0]) && parseInt(x[0][1]) >= parseInt(x[1][1])
        || parseInt(x[0][0]) >= parseInt(x[1][0]) && parseInt(x[0][1]) <= parseInt(x[1][1])).length
    const spaces2 = spaces.filter(x => parseInt(x[0][1]) >= parseInt(x[1][0]) && parseInt(x[0][0]) <= parseInt(x[1][1])
        || parseInt(x[1][1]) >= parseInt(x[0][0]) && parseInt(x[1][0]) <= parseInt(x[0][0])).length

    return [spaces1, spaces2];
}

console.log("Task 4: " + task4(readInput(4)))