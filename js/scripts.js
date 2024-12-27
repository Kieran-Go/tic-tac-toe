function newGame(){
    const gameboard = (function(){
        const gb = Array(9).fill("[ ]");

        const printBoard = function(){
            let loggedBoard = "";
            for(let i = 0; i < gb.length; i+=3){
                loggedBoard+= gb[i] + gb[i+1] + gb[i+2] + '\n';
            }
            console.log(loggedBoard);
        }
        return {gb, printBoard};
    })();

    const player1 = (function(){
        const name = "Player 1";
        const select = function(index){
            gameboard.gb[index] = "[O]";
        }
        return {name, select};
    })();

    const player2 = (function(){
        const name = "Player 2";
        const select = function(index){
            gameboard.gb[index] = "[X]";
        }
        return {name, select};
    })();

    const game = (function(){
        const players = [player1, player2];
        let activePlayer = players[0];

        const play = function(){
            let winner = null;
            while(winner === null){
                const index = window.prompt(activePlayer.name + "'s turn", "");
                activePlayer.select(index);
                if (activePlayer == players[0]) activePlayer = players[1];
                else activePlayer = players[0];
                gameboard.printBoard();

                winner = checkWinner();
            }
            console.log("The winner is: " + winner.name);
        }

        const checkWinner = function(){
            const winConditions = [
                [0, 1, 2], // Top row
                [3, 4, 5], // Middle row
                [6, 7, 8], // Bottom row
                [0, 3, 6], // Left column
                [1, 4, 7], // Middle column
                [2, 5, 8], // Right column
                [0, 4, 8], // Diagonal top-left to bottom-right
                [2, 4, 6], // Diagonal top-right to bottom-left
            ]

            for(let combo of winConditions){
                const [a, b, c] = combo;
                // Check if the three cells in the combo are equal and not empty
                if (gameboard.gb[a] !== "[ ]" && gameboard.gb[a] === gameboard.gb[b] && gameboard.gb[a] === gameboard.gb[c]) {
                    if(gameboard.gb[a] === "[O]") return player1;
                    else return player2;
                }
                else return null;
            }
        }

        return {play, checkWinner};
    })();

    return {gameboard, player1, player2, game};
}

const game1 = newGame();
// game1.game.play();