const fs = require('fs');
function readInput(n) { return fs.readFileSync("input" + n + ".txt", 'utf8') }

/*
    eighthree has to read 83 and not 8hree... 
    To be honest: was stuck here and had to look that up. 
    But the workaround by adding the spelled out words before and after the number was my idea again

    To solve the first part, just comment out the .replaceAll Statements
*/
const task1 = (inputString) => {
    return inputString.slice(0, -1).split('\n').map(line => {
        const res = line
            .replaceAll('one', 'one1one').replaceAll('two', 'two2two').replaceAll('three', 'three3three')
            .replaceAll('four', 'four4four').replaceAll('five', 'five5five').replaceAll('six', 'six6six')
            .replaceAll('seven', 'seven7seven').replaceAll('eight', 'eight8eight').replaceAll('nine', 'nine9nine')
            .split('').filter(c => RegExp('^[0-9]$').test(c));
        return parseInt([res[0], res.splice(-1)].join(''));
    }).reduce((acc, cur) => acc + cur, 0)
}

//console.log(task1(readInput(1)));

const task21 = (inputString) => {
    return inputString.slice(0, -1).split('\n').map(line => {
        let gameNumber = parseInt(line.split(':')[0].slice(5));

        line.split(':')[1].split(';').forEach(test => {
            test.split(',').forEach(e => {
                if (e.includes('red') && parseInt(e.match(/\d+/g)) > 12
                    || e.includes('green') && parseInt(e.match(/\d+/g)) > 13
                    || e.includes('blue') && parseInt(e.match(/\d+/g)) > 14) {
                    gameNumber = 0
                }
            })
        })
        return gameNumber;
    }).reduce((acc, cur) => acc + cur, 0)
}

//console.log(task21(readInput(2)));

const task22 = (inputString) => {
    return inputString.split('\n').map(line => {
        const maxValues = { red: 0, blue: 0, green: 0 };
        line.split(':')[1].split(';').forEach(test => {
            test.split(',').map(s => s.trim()).forEach(e => {
                maxValues[e.split(' ')[1]] = Math.max(parseInt(e.split(' ')[0]), maxValues[e.split(' ')[1]])
            })
        })
        return maxValues.red * maxValues.green * maxValues.blue;
    }).reduce((acc, cur) => acc + cur, 0)
}

//console.log(task22(readInput(2)));

const task3 = (inputString) => {
    const checkNumberValid = () => {
        for (let i = -1; i <= 1; i++) {
            for (let j = i * lineLength + pos; j >= i * lineLength + pos - stack.length - 1; j--) {
                if (inputString.split('')[j] && !/^[0-9.\n]$/.test(inputString.split('')[j])){
                    return true;
                }
            }
        }
        return false;
    }

    let sum = 0;
    let pos = 0
    let state = 'searching'
    let stack = []
    const lineLength = inputString.split('\n')[0].length + 1 // length + \n-Character

    inputString.split('').forEach(c => {
        if (state === 'searching') {
            if (c === '.' || c === '\n') { pos++ }
            else if (!isNaN(parseInt(c))) { stack.push(parseInt(c)); state = 'numberFound'; pos++ }
            else { pos++ };
        }
        else if (state === 'numberFound') {
            if (c === '.' || c === '\n') {
                if (checkNumberValid()) {
                    sum += parseInt(stack.join(''));
                }
                stack = []
                state = 'searching';
                pos++;
            }
            else if (!isNaN(parseInt(c))) { stack.push(parseInt(c)); pos++ }
            else {
                sum += parseInt(stack.join(''));
                stack = []
                state = 'searching';
                pos++;
            }
        }
    })
    return sum;
}

console.log(task3(readInput(3)));