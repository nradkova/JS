function solve(input) {
    let dashboard =
        [[false, false, false],
        [false, false, false],
        [false, false, false]];

    let outputMessage = '';
    let player = 'X';
    let hasWon = false;

    for (const move of input) {

        let [row, col] = move.split(' ').map(Number);
        if (dashboard[row][col]) {
            outputMessage +=
                'This place is already taken. Please choose another!\n';
            continue;
        }
        dashboard[row][col] = player;
        if (checkIfWins(player)) {
            hasWon = true;
            break;
        }
        if (areFilledAll()) {
            break;
        }
        player = player === 'X' ? 'O' : 'X';

    }

    if (hasWon) {
        outputMessage += `Player ${player} wins!\n`;
    } else {
        outputMessage += 'The game ended! Nobody wins :(\n';
    }

    dashboard.forEach(row => {
        outputMessage += row.join('\t');
        outputMessage += '\n';
    })

    return outputMessage.trimEnd();

    function areFilledAll() {
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                if (!dashboard[row][col])
                    return false;
            }
        }
        return true;
    }

    function checkIfWins(player) {

        if (dashboard[0][0] === player
            && dashboard[1][1] === player
            && dashboard[2][2] === player) {
            return true;
        }

        if (dashboard[2][0] === player
            && dashboard[1][1] === player
            && dashboard[0][2] === player) {
            return true;
        }

        for (let col = 0; col < 3; col++) {
            if (dashboard[0][col] === player
                && dashboard[1][col] === player
                && dashboard[2][col] === player) {
                return true;
            }
        }

        for (let row = 0; row < 3; row++) {
            if (dashboard[row][0] === player
                && dashboard[row][1] === player
                && dashboard[row][2] === player) {
                return true;
            }
        }

        return false;
    }
}

console.log(solve(["0 1",
"0 0",
"0 2",
"2 0",
"1 0",
"1 2",
"1 1",
"2 1",
"2 2",
"0 0"]));