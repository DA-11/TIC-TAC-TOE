let grid = [[-1,-1,-1],[-1,-1,-1],[-1,-1,-1]];
let currentElement = 'X'; 
let moves = 0;

const reset = function(){
    const block = document.getElementsByClassName('block');
    for(let i = 0 ; i < block.length ; i++){
        block[i].innerText = '';
    }

    const winnerBoard = document.getElementsByClassName('winnerBoard')[0];
    winnerBoard.style.opacity = 0;
    document.getElementsByClassName('game')[0].style.opacity = 1;
    winnerBoard.innerText = ``;
    
    grid = [[-1,-1,-1],[-1,-1,-1],[-1,-1,-1]];
    currentElement = 'X'; 
    moves = 0;

    document.getElementById('visctoryMusic').currentTime = 0;
    document.getElementById('visctoryMusic').pause();

}

const restartBtn = document.getElementsByClassName('restart')[0];
restartBtn.addEventListener("click", reset);

const playmove = function(id){

    let index = id.charAt(id.length - 1);
    let x_index = Math.floor(index/3);
    let y_index = (index % 3);

    if(grid[x_index][y_index] === -1){
       
        document.getElementById(id).innerText = currentElement;
        grid[x_index][y_index] = currentElement === 'O' ? 0 : 1;
        moves++;

        if(moves >= 5){
            calculateWinner(grid,currentElement);
        }
       
        currentElement = currentElement === 'O' ? 'X' : 'O';
    }
}

document.getElementById("block0").addEventListener("click",function() {playmove('block0')});
document.getElementById("block1").addEventListener("click",function() {playmove('block1')});
document.getElementById("block2").addEventListener("click",function() {playmove('block2')});
document.getElementById('block3').addEventListener("click",function() {playmove('block3')});
document.getElementById('block4').addEventListener("click",function() {playmove('block4')});
document.getElementById('block5').addEventListener("click",function() {playmove('block5')});
document.getElementById('block6').addEventListener("click",function() {playmove('block6')});
document.getElementById('block7').addEventListener("click",function() {playmove('block7')});
document.getElementById('block8').addEventListener("click",function() {playmove('block8')});

function calculateWinner(grid,currentElement){

    if(areEqual(grid[0][0],grid[0][1],grid[0][2]) || 
    areEqual(grid[0][0],grid[1][0],grid[2][0]) || 
    areEqual(grid[1][0],grid[1][1],grid[1][2]) || 
    areEqual(grid[0][1],grid[1][1],grid[2][1]) || 
    areEqual(grid[2][0],grid[2][1],grid[2][2]) || 
    areEqual(grid[0][2],grid[1][2],grid[2][2]) || 
    areEqual(grid[0][0],grid[1][1],grid[2][2]) || 
    areEqual(grid[0][2],grid[1][1],grid[2][0])){ 

        playVictoryMusic();

        const winnerBoard = document.getElementsByClassName('winnerBoard')[0];
        document.getElementsByClassName('game')[0].style.opacity = 0;
        winnerBoard.style.opacity = 1;
        winnerBoard.innerHTML = `Player ${currentElement} wins`;
        grid.fill(0);
    }else if(moves === 9){
        const winnerBoard = document.getElementsByClassName('winnerBoard')[0];
        document.getElementsByClassName('game')[0].style.opacity = 0;
        winnerBoard.style.opacity = 1;
        winnerBoard.innerHTML = `It's a Tie`;
    }
}
function areEqual(a,b,c){
    if((a === b && b === c) && (a !== -1 || b !== -1 || c !== -1)) return true;
    
    return false;
}

reset();

function playbackgroundMusic(){
    const audioElement = document.getElementById("backgroundMusic");
    const slash = document.getElementsByClassName('slash')[0];
    slash.style.opacity = 0;
    audioElement.volume = 0.2;
    audioElement.play();
};

function stopbackgroundMusic(){
    const audioElement = document.getElementById("backgroundMusic");
    audioElement.pause();
    const slash = document.getElementsByClassName('slash')[0];
    slash.style.opacity = 1;
}

const music = document.getElementsByClassName('music')[0];
let playOrStop = 1;

music.addEventListener("click",function(){
    playOrStop = playOrStop === 1 ? 0 : 1;
    playOrStop === 1 ? playbackgroundMusic() : stopbackgroundMusic();
})

function playVictoryMusic(){
    stopbackgroundMusic();

    const confettiElement = document.getElementById('confetti');
    const jsconfetti = new JSConfetti();
    jsconfetti.addConfetti({
        emojis:['✨','🎉','💖','🎇','✨','👑','🏆','🥇','🥂','💥'],
    });
    const victoryAudioElement = document.getElementById('visctoryMusic');
    victoryAudioElement.volume = 0.4;
    victoryAudioElement.play();
}