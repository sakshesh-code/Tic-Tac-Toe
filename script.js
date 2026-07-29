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


const Game = (function (player1Name = "Player1", player2Name = "Player2"){

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
        winner: ""
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
            gameObj.count++;
            printBoard();
            gameValidator.isGameOver();
            toggleActivePlayer();
        }else{

            if(player2Slot(row, column) !== undefined){
                console.log(player2Slot(row, column));
                return;
            };

            player2Slot(row, column);
            gameObj.count++;
            printBoard();
            gameValidator.isGameOver();
            toggleActivePlayer();
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
})();


const gameValidator = (function(){
    // Game win or Draw condition

function isGameOver(){

    if(checkWin() === true){
console.log(`
--------------------------
Game Over!! ${Game.gameObj.activePlayer.name} Wins!!
-------------------------- 
            `);

            //------------
        Game.gameObj.winner = Game.gameObj.activePlayer;
        resetGame();
        return;

    }else if(Game.gameObj.count >= 9){
        console.log(`
--------------------------
Game Over!! It's a Draw
-------------------------- 
            `);
            resetGame();
            return;

    }else{
       Game.gameObj.activePlayer === Game.players.player1 ? 

        console.log(`
-------------------------
${Game.players.player2.name} plays next
-------------------------
                `)

               : console.log(`
-------------------------
${Game.players.player1.name} plays next
-------------------------
                `); 

    };

};

//Check winning condition

function checkWin(){
if(rowCheck()){
    return true;
}else if(diagCheck()){
    return true;
}else if(colCheck()){
    return true;
}else{
    return false;
}

};

function rowCheck(){
    return Gameboard.gameboard.some(row=>{
        return row[0] === row[1] && row[1] === row[2] && row[0] !== " ";
});
};

function colCheck(){
    const board = Gameboard.gameboard;

    return [0,1,2].some(col=>{
        return (
            board[0][col] !== " "
            && board[0][col] === board[1][col]
            && board[1][col] === board[2][col] 
        )
    });
};

function diagCheck(){
    const board = Gameboard.gameboard;
    if(board[1][1] === " "){
        return false;
    }

    return board[0][0] === board[1][1] && board[1][1] === board[2][2] ? 
        true : board[0][2] === board[1][1] && board[1][1] === board[2][0] ? 
            true : false;
}

// Reset game

function resetGame(){
    Game.gameObj.activePlayer = Game.players.player1;
    Game.gameObj.count = 0;
    Gameboard.gameboard.forEach(row=>{
        [row[0], row[1], row[2]] = [" ", " ", " "];
    });
};

return {isGameOver};

})();


// Functions -------------- - ------------------/

function printBoard(){
    Gameboard.gameboard.forEach(row=>{
        console.log(row);
    }); 
if(Game.gameObj.count === 0){
    console.log(`
----------------------
${Game.gameObj.activePlayer.name} Starts the Game!!
----------------------
        `);
}
};







// DOM

const domObj = (function(){

    const container = document.createElement("div");
    container.classList.add("container");

    const playGame = document.querySelector("#play-game");

    
    playGame.addEventListener("click", e=>{
        container.textContent = "";
        addSlots();
        createBoard();

        //Click event for slots in container
        container.addEventListener("click", addEvent);
    })


    //Functions
    function createBoard(){
        document.body.appendChild(container);
    };

    //Need a refresh board function

    function addSlots(){

        //row count here
        let rowCount = 0;
        //Add divs for rows and columns
        Gameboard.gameboard.forEach(row=>{
            //col count here
            let colCount = 0;

        row.forEach(item=>{
            const slot = document.createElement("div");

            //Connects slots to gameboard array
            slot.dataset.row = rowCount;
            slot.dataset.col = colCount;

            container.appendChild(slot);

            //col increment
            colCount++;
            });

            //row increment
            rowCount++;
        });
        
    };

    
    function addEvent(e){
        const row = e.target.dataset.row;
        const col = e.target.dataset.col;
        
        Game.playTurn(row, col);
        e.target.textContent = Game.gameObj.winner.token || Gameboard.gameboard[row][col];
        if(Game.gameObj.winner !== ""){

            //Paragraph for announcing winner
            const winnerAnnounce = document.createElement("p");
            winnerAnnounce.setAttribute("id", "winner-result");
            winnerAnnounce.textContent = `Game Over!! ${Game.gameObj.winner.name} Wins!!`;

            document.body.appendChild(winnerAnnounce);

            //Resets winner and removes click event
            Game.gameObj.winner = "";
            container.removeEventListener("click", addEvent);
        }

        
    };
})();



//Last content doesnt show when game ends
//Reset board when game ends

//might wanna check isGameOver for gameObj winner
//function addEvent() might wanna watch