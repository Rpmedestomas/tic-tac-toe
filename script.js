//select all essential elements
const selectBox = document.querySelector(".player-select-box"),
    selectXButton = selectBox.querySelector(".playerX"),
    selectOButton = selectBox.querySelector(".playerO"),
    gameBoard = document.querySelector(".game-board"),
    allBox = document.querySelectorAll("section span"),
    players = document.querySelector(".players"),
    resultBox = document.querySelector(".result-box"),
    winMessage = resultBox.querySelector(".win-message"),
    restartButton = resultBox.querySelector(".restart"),
    board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
    ];
var historyState = [];

  //on load
window.onload = () =>{
    for (let i = 0; i < allBox.length; i ++){
        allBox[i].setAttribute("onclick", "clickedBox(this)");
    }
    //hide the player select box once X button is clicked
    //show the game board once a symbol is selected for the player
    selectXButton.onclick = () =>{
        selectBox.classList.add("hide");
        gameBoard.classList.add("show");
    }

    //hide the player select box once O button is clicked
    //show the game board once a symbol is selected for the player
    selectOButton.onclick = () =>{
        selectBox.classList.add("hide");
        gameBoard.classList.add("show");
        players.setAttribute("class", "players active player");
    }
}

//fontawesome icons
let playerXIcon = "fas fa-times";
let playerOIcon = "far fa-circle";

//set default sign to X
let playerSign = "X"
let runBot = true;

//user click function
function clickedBox(element){
    const dataRow = element.getAttribute("data-row");
    const dataColumn = element.getAttribute("data-column")

    // console.log(element);
    if(players.classList.contains("player")){

        //inserts the icon of O
        element.innerHTML = `<i class="${playerOIcon}"></i>`;

        //for slider to adjust 
        players.classList.add("active");
        playerSign = "O";

        //insert an id tag of O to the span 
        element.setAttribute("id", playerSign);
        board[dataRow][dataColumn] = playerSign;
        historyState.push(board);
    }else{

        //inserts the icon of X
        element.innerHTML = `<i class="${playerXIcon}"></i>`;

        //for slider to adjust 
        players.classList.add("active");
        playerSign = "X";

        //insert an id tag of X to the span
        element.setAttribute("id", playerSign);
        board[dataRow][dataColumn] = playerSign;
        historyState.push(board);
    }
    selectWinner();
    gameBoard.style.pointerEvents = "none";

    //prevents from a tile from getting selected twice
    element.style.pointerEvents = "none";

    //to delay bot's random assignment to a tile
    let randomDelayTime = ((Math.random() * 1000) + 200).toFixed();
    setTimeout(() =>{
        bot(runBot);    
    }, randomDelayTime)
}

//bot click function
function bot(runBot){
    if(runBot){
        playerSign = "O"
        //store unselected tiles
        let array = [];
        for (let i = 0; i < allBox.length; i++){
            if(allBox[i].childElementCount == 0){
                array.push(i);
            }
        }

        //to select a random box 
        let randomBox = array[Math.floor(Math.random() * array.length)]
        const botDataRow = allBox[randomBox].getAttribute("data-row");
        const botDataColumn = allBox[randomBox].getAttribute("data-column");
        
        if(array.length > 0){
            if(players.classList.contains("player")){
                allBox[randomBox].innerHTML = `<i class="${playerXIcon}"></i>`;
                players.classList.remove("active");
                playerSign = "X";
                allBox[randomBox].setAttribute("id", playerSign);
                board[botDataRow][botDataColumn] = playerSign;
                historyState.push(board);

            }else{
                allBox[randomBox].innerHTML = `<i class="${playerOIcon}"></i>`;
                players.classList.remove("active");
                allBox[randomBox].setAttribute("id", playerSign);
                board[botDataRow][botDataColumn] = playerSign;
                historyState.push(board);
            }
            selectWinner();
        }
        //prevents from a tile from getting selected twice
        allBox[randomBox].style.pointerEvents = "none";
        gameBoard.style.pointerEvents = "auto";
        playerSign = "X";
    }
}

function getId(idname){
    return document.querySelector(".tile" + idname).id;
}

function checkId(val1, val2, val3, sign){
    if(getId(val1) ==sign && getId(val2) ==sign && getId(val3) ==sign){
        return true;
    }
}

function selectWinner(){
    if(checkId(1,2,3, playerSign) || 
        checkId(4,5,6, playerSign) || 
        checkId(7,8,9, playerSign) || 
        checkId(1,4,7, playerSign) || 
        checkId(2,5,8, playerSign) || 
        checkId(3,6,9, playerSign) || 
        checkId(1,5,9, playerSign) || 
        checkId(3,5,7, playerSign)
        ){
            console.log(`${playerSign} is the winner!`)
            runBot = false;
            bot(runBot);
            setTimeout(() =>{
                gameBoard.classList.remove("show");
                resultBox.classList.add("show");
            }, 700)

            winMessage.innerHTML = `Player <p>${playerSign}</p> is the winner!`;
    }else{
        if(getId(1) != "" &&
            getId(2) != "" &&
            getId(3) != "" &&
            getId(4) != "" &&
            getId(5) != "" &&
            getId(6) != "" &&
            getId(7) != "" &&
            getId(8) != "" &&
            getId(9) != ""){
                runBot = false;
                bot(runBot);
                setTimeout(() =>{
                    gameBoard.classList.remove("show");
                    resultBox.classList.add("show");
                }, 700)
    
                winMessage.textContent = `Match ended in a DRAW!`;
    
            }
    }
} 

restartButton.onclick = () =>{
    window.location.reload();
}
