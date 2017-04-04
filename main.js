var destinationBox = $('.circle')
var start = $('#start')
var stop = $('#stop')
var red = $('#red')
var black = $('#black')
var currentPlayer = null;
var players = {
  red: '<img src="red piece.jpg" alt="">',
  black: '<img src="black piece.jpg">'
}

var horizontal = [[0,1,2,3,4,5,6], [7,8,9,10,11,12,13], [14,15,16,17,18,19,20], [21,22,23,24,25,26,27], [28,29,30,31,32,33,34], [35,36,37,38,39,40,41]]
var vertical = [[destinationBox[1]], [], [], [], [], [], []]
var diagonal = [[], [], [], [], [], [],
                [], [], [], [], [], []]

gameDefault()
/*I want to allow the first user to pick their color of choice & and make the
2nd color default to the 2nd color*/
start.on('click', gameStart)
stop.on('click', gameQuit)

function gameStart(){
  alert('Player 1 please select your color');
  red.on('click', function(){
    currentPlayer = players.red
  })
  black.on('click', function(){
    currentPlayer = players.black
  })
  gamePlay()
}

function gameQuit() {
  if(window.confirm('Are you sure you want to quit?')){
    gameDefault()
  }

}

function gameDefault(){
  for (var i = 0; i < destinationBox.length; i++) {
    destinationBox[i].innerHTML = ''
    currentPlayer = null
  }
  destinationBox.off()

}

//alert(currentPlayer + ' make your move!')

//var currentPlayer = userPick;
/* upon starting the game I want to randomize who gets to go first,
   and prompt them to make a move*/



   /* I will create jquery functions to move the pieces across the top of the
   board and then drop down into the respective div that was clicked by each
   player */

   function gamePlay(){
     destinationBox.on('click', function(){
       $(this).html(currentPlayer)
       winnerIs()
     })
    //  destinationBox.on('click', winnerIs)


    //   for (var i = 0; i < destinationBox.length; i++) {
    //    destinationBox[i].addEventListener('click', function(){
    //      this.innerHTML = currentPlayer
    //    })
    //    destinationBox[i].addEventListener('click', winnerIs)
    // }
   }

   //I will create functions to toggle between the players to alternate turns
   function switchTurns(){
     if(currentPlayer == players.red){
       currentPlayer = players.black;
     } else {
       currentPlayer = players.red;
     }
   }

   //I will create a function that will check every time a piece is placed if
   //there is a winner by seeing if anybody has four in a row
   function winnerIs(){
     for (var i = 0; i < destinationBox.length; i++) {
          if(destinationBox[i].innerHTML !== ''){
            if(i >= 0 && i <= 20){
                 if((destinationBox[i].innerHTML == currentPlayer && destinationBox[i+7].innerHTML == currentPlayer && destinationBox[i+14].innerHTML == currentPlayer && destinationBox[i+21].innerHTML == currentPlayer) ||
                    (destinationBox[i].innerHTML == currentPlayer && destinationBox[i+8].innerHTML == currentPlayer && destinationBox[i+16].innerHTML == currentPlayer && destinationBox[i+24].innerHTML == currentPlayer) ||
                    (destinationBox[i].innerHTML == currentPlayer && destinationBox[i+6].innerHTML == currentPlayer && destinationBox[i+12].innerHTML == currentPlayer && destinationBox[i+18].innerHTML == currentPlayer)){
                      console.log('it had to come to this - diagonal or vertical')

                   }
                 } else if(i >= 2 & i <= 40){
                     if(destinationBox[i].innerHTML == currentPlayer && destinationBox[i-1].innerHTML == currentPlayer && destinationBox[i-2].innerHTML == currentPlayer && destinationBox[i+1].innerHTML == currentPlayer){
                       console.log('I won horizontal')
                     }
                 } else if(i >= 1 && i <= 39){
                     if(destinationBox[i].innerHTML == currentPlayer && destinationBox[i+1].innerHTML == currentPlayer && destinationBox[i+2].innerHTML == currentPlayer && destinationBox[i-1].innerHTML == currentPlayer){
                       console.log('I won horizontal')
                     }
                 } else if(i <= 38 && i >= 0){
                     if(destinationBox[i].innerHTML == currentPlayer && destinationBox[i+1].innerHTML == currentPlayer && destinationBox[i+2].innerHTML == currentPlayer && destinationBox[i+3].innerHTML == currentPlayer){
                       console.log('I won hun')
                     }
                 } else if(i >= 3){
              if(destinationBox[i].innerHTML == currentPlayer && destinationBox[i-1].innerHTML == currentPlayer && destinationBox[i-2].innerHTML == currentPlayer && destinationBox[i-3].innerHTML == currentPlayer){
                  console.log('winning is what i do!')
                  
                }
              }
            }
      }
     switchTurns()
   }

   //Create logic for displaying who won on the screen

   //create verticle win, diagonal win, horizontal win
