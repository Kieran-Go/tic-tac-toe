function newGame(){
    const gameboard = (function(){
        const gb = Array(9).fill("");

        const reset = function(){
            gb.fill("");
        }
        return {gb, reset};
    })();

    const player1 = (function(){
        const name = "Player 1"; // Default name
        const select = function(index){
            gameboard.gb[index] = "o";
            const cell = document.getElementById(`cell-${index}`);
            cell.textContent = gameboard.gb[index];
            cell.style.color = "blue";
            round.activePlayer = player2;
        }
        return {name, select};
    })();

    const player2 = (function(){
        const name = "Player 2"; // Default name
        const select = function(index){
            gameboard.gb[index] = "x";
            const cell = document.getElementById(`cell-${index}`);
            cell.textContent = gameboard.gb[index];
            cell.style.color = "red";
            round.activePlayer = player1;
        }
        return {name, select};
    })();

    const round = (function(){
        // Initialize the active player as player1, since player1 goes first
        let activePlayer = player1;

        const checkWinner = function(){
            const winningCombos = [
                [0, 1, 2], // Top row
                [3, 4, 5], // Middle row
                [6, 7, 8], // Bottom row
                [0, 3, 6], // Left column
                [1, 4, 7], // Middle column
                [2, 5, 8], // Right column
                [0, 4, 8], // Diagonal top-left to bottom-right
                [2, 4, 6], // Diagonal top-right to bottom-left
                
            ]

            for(let combo of winningCombos){
                const [a, b, c] = combo;
                // Check if the three cells in the combo are equal and not empty
                if (gameboard.gb[a] !== "" && gameboard.gb[a] === gameboard.gb[b] && gameboard.gb[a] === gameboard.gb[c]) {
                    if(gameboard.gb[a] === "o") return player1;
                    else if(gameboard.gb[a] === "x") return player2;
                }
            }
            return null;
        }

        return {activePlayer, checkWinner};
    })();

    const display = (function(){
        // Add the event listener to the play button
        let btn = document.querySelector(".btn-play");
        btn.addEventListener("click", () =>{
            // Init the game message
            const msg = document.querySelector(".msg");

            //Format the button and message
            btn.classList.toggle("btn-playing");
            if(btn.classList.contains("btn-playing")){
                btn.textContent = "Restart";

            // Prompt each player for their name
            player1.name = prompt("Enter the name for player 1:","");
            player2.name = prompt("Enter the name for player 2:","");

            //Display the appropriate turn message
                msg.textContent = `${round.activePlayer.name}'s turn`;
                
            } 
            else{
                btn.textContent = "Play";
                msg.textContent = ""
            }

            // Toggle game container active status
            const gameContainer = document.querySelector(".game-container");
            if(gameContainer.classList.contains("inactive")) gameContainer.classList.remove("inactive");
            else gameContainer.classList.add("inactive");

            // Reset the gameboard
            gameboard.reset();

            // Reset player turn to player1
            round.activePlayer = player1;
            
            for(let i = 0; i < 9; i++){
                const cell = document.getElementById(`cell-${i}`);
                cell.textContent = "";
                cell.addEventListener("click", function() {
                    if((cell.textContent !== "x" && cell.textContent !== "o") && !gameContainer.classList.contains("inactive")){
                        round.activePlayer.select(i);

                        // Check for winner
                        let winner = round.checkWinner();
                        // No winner found
                        if(winner === null){
                            msg.textContent = `${round.activePlayer.name}'s turn`
                        }
                        // A winner is found
                        else{
                            // Announce the winner
                            msg.textContent = winner === player1 ? `WINNER: ${player1.name}` : `WINNER: ${player2.name}`

                            // Disable the game container
                            gameContainer.classList.add("inactive");
                            
                            // Reset the button
                            btn.classList.toggle("btn-playing");
                            btn.textContent = "Play";
                        }
                    }
                });
            }
        });
    })();

    return {gameboard, player1, player2, round, display};
}

const game = newGame();