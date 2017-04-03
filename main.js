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
     if(destinationBox[0].innerHTML !== ''){
       if(destinationBox[0].innerHTML == destinationBox[1].innerHTML || destinationBox[0].innerHTML == destinationBox[2].innerHTML){
         console.log('You won!')
       }
     }
     switchTurns()
   }

   //Create logic for displaying who won on the screen

   //create verticle win, diagonal win, horizontal win
