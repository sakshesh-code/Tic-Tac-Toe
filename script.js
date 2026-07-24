//IIFE for gameboard object with gameboard array
const Gameboard = (function Gameboard (){
        const gameboard = [];
        const row = 3;
        const column = 3;

        // 2D array for gameboard
        for(let i = 0; i < row; i++){
            gameboard[i] = [];
            for(let j = 0; j < column; j++){
                gameboard[i][j] = "";
            }
        }

        return {gameboard};
})();


const Game = initGame();

printBoard();
Game.playTurn(0,0);
Game.playTurn(0,1);
Game.playTurn(1,0);
Game.playTurn(1,0);


// Functions -------------- - ------------------/

function printBoard(){
    console.table(Gameboard.gameboard);
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

            player1Slot(row, column);
            toggleActivePlayer();
            printBoard();
        }else{

            player2Slot(row, column);
            toggleActivePlayer();
            printBoard();
        }
    };

    function token(player){
        const token = player.token;
       return function selectSlot(row, column){

            if(Gameboard.gameboard[row][column] !== ""){
                return "Please select an empty Slot";
            }
            return Gameboard.gameboard[row][column] = token;
        };
    };

    return {gameObj, players, toggleActivePlayer, playTurn};
}


