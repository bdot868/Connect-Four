var destinationBox = $('.circle')
var start = $('#start')
var stop = $('#stop')
var red = $('#red')
var black = $('#black')
var currentPlayer = null;
var pieces = [
  {marker: '<img src="red piece.jpg" alt="">', color: 'Red'},
  {marker: '<img src="black piece.jpg">', color: 'Black'}
]
var player1, player2;

gameDefault()
/*I want to allow the first user to pick their color of choice & and make the
2nd color default to the 2nd color*/
start.on('click', gameStart)
stop.on('click', gameQuit)

function gameStart(){
  alert('Player 1 please select your color');
  red.on('click', function(){
    currentPlayer = pieces[0]
    //player1 = pieces[0].color
    //player2 = pieces[1].color
  })
  black.on('click', function(){
    currentPlayer = pieces[1]
    //player1 = pieces[1].color
    //player2 = pieces[0].color
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
       $(this).html(currentPlayer.marker)
       checkWinner()
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
     if(currentPlayer == pieces[0]){
       currentPlayer = pieces[1];
     } else {
       currentPlayer = pieces[0];
     }
   }

   //I will create a function that will check every time a piece is placed if
   //there is a winner by seeing if anybody has four in a row
   function checkWinner(){
     for (var i = 0; i < destinationBox.length; i++) {
          if(destinationBox[i].innerHTML !== ''){
            if(i >= 0 && i <= 20){
                 if((destinationBox[i].innerHTML == currentPlayer.marker && destinationBox[i+7].innerHTML == currentPlayer.marker && destinationBox[i+14].innerHTML == currentPlayer.marker && destinationBox[i+21].innerHTML == currentPlayer.marker) ||
                    (destinationBox[i].innerHTML == currentPlayer.marker && destinationBox[i+8].innerHTML == currentPlayer.marker && destinationBox[i+16].innerHTML == currentPlayer.marker && destinationBox[i+24].innerHTML == currentPlayer.marker) ||
                    (destinationBox[i].innerHTML == currentPlayer.marker && destinationBox[i+6].innerHTML == currentPlayer.marker && destinationBox[i+12].innerHTML == currentPlayer.marker && destinationBox[i+18].innerHTML == currentPlayer.marker)){
                      console.log('it had to come to this ' + currentPlayer.color + 'wins diagonal or vertical')

                   }
                 } else if(i >= 2 & i <= 40){
                     if(destinationBox[i].innerHTML == currentPlayer.marker && destinationBox[i-1].innerHTML == currentPlayer.marker && destinationBox[i-2].innerHTML == currentPlayer.marker && destinationBox[i+1].innerHTML == currentPlayer.marker){
                       console.log(currentPlayer.color + ' won horizontal')
                     }
                 } else if(i >= 1 && i <= 39){
                     if(destinationBox[i].innerHTML == currentPlayer.marker && destinationBox[i+1].innerHTML == currentPlayer.marker && destinationBox[i+2].innerHTML == currentPlayer.marker && destinationBox[i-1].innerHTML == currentPlayer.marker){
                       console.log(currentPlayer.color + ' won horizontal')
                     }
                 } else if(i <= 38 && i >= 0){
                     if(destinationBox[i].innerHTML == currentPlayer.marker && destinationBox[i+1].innerHTML == currentPlayer.marker && destinationBox[i+2].innerHTML == currentPlayer.marker && destinationBox[i+3].innerHTML == currentPlayer.marker){
                       console.log(currentPlayer.color + ' won hun')
                     }
                 } else if(i >= 3){
              if(destinationBox[i].innerHTML == currentPlayer.marker && destinationBox[i-1].innerHTML == currentPlayer.marker && destinationBox[i-2].innerHTML == currentPlayer.marker && destinationBox[i-3].innerHTML == currentPlayer.marker){
                  console.log('winning is ' + currentPlayer.color)

                }
              }
            }
      }
     switchTurns()
   }

   //Create logic for displaying who won on the screen

   //create verticle win, diagonal win, horizontal win
