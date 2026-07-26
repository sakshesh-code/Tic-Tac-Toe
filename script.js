//IIFE for gameboard object with gameboard array
const Gameboard = (function Gameboard (){
        const gameboard = [];
        const row = 3;
        const column = 3;

        // 2D array for gameboard
        for(let i = 0; i < row; i++){
            gameboard[i] = [];
            for(let j = 0; j < column; j++){
                gameboard[i][j] = " ";
            }
        }

        return {gameboard};
})();


const Game = initGame();

// printBoard();
// Game.playTurn(0,0);
// Game.playTurn(0,1);
// Game.playTurn(0,2);
// Game.playTurn(1,0);
// Game.playTurn(2,0);
// Game.playTurn(2,2);
// Game.playTurn(2,1);
// Game.playTurn(1,1);
// Game.playTurn(1,2);


console.log(Game.gameObj.count);

// Functions -------------- - ------------------/

function printBoard(){
    Gameboard.gameboard.forEach(row=>{
        console.log(row);
    });
    isGameOver();
};


// Game win or Draw condition

function isGameOver(){
    if(Game.gameObj.count >= 9){
        console.log(`
--------------------------
Game Over!! It's a Draw
-------------------------- 
            `);
            return;
    }   
    console.log(`
-------------------------
${Game.gameObj.activePlayer.name} plays next
-------------------------
                `);
};


// Reset game

function resetGame(){
    Game.gameObj.activePlayer = Game.players.player1;
    Game.gameObj.count = 0;
    Gameboard.gameboard.forEach(row=>{
        [row[0], row[1], row[2]] = [" ", " ", " "];
    });
    printBoard();
    
};






// Game controller --------------------------

function initGame(player1Name = "Player1", player2Name = "Player2"){

    const players = {
            player1: {
                token: "X",
                name: player1Name
            },
            player2: {
                token: "O",
                name: player2Name
            }
        };

    // Store Game Data
    const gameObj = {
        activePlayer: players.player1,
        count: 0,
    };  
    
    const player1Slot = token(players.player1);
    const player2Slot = token(players.player2);

    //Game controller Functions

    function toggleActivePlayer(){
        gameObj.activePlayer === players.player1 ? 
            gameObj.activePlayer = players.player2 : gameObj.activePlayer = players.player1;
    };


    function playTurn(row, column){

        if(gameObj.activePlayer === players.player1){

            if(player1Slot(row, column) !== undefined){
                console.log(player1Slot(row,column));
                return;
            };

            player1Slot(row, column);
            toggleActivePlayer();
            gameObj.count++;
            printBoard();
        }else{

            if(player2Slot(row, column) !== undefined){
                console.log(player2Slot(row, column));
                return;
            };

            player2Slot(row, column);
            toggleActivePlayer();
            gameObj.count++;
            printBoard();
        };
    };

    function token(player){
        const token = player.token;
        return function selectSlot(row, column){

            if(Gameboard.gameboard[row][column] !== " "){
                return `
---------------------------------
Please select an empty Slot
---------------------------------
---------------------------------
${gameObj.activePlayer.name} plays next
---------------------------------
                `;
            }
            Gameboard.gameboard[row][column] = token;
        };
    };

    return {gameObj, players, toggleActivePlayer, playTurn};
}


