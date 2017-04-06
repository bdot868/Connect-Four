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

gameDefault()
/*I want to allow the first user to pick their color of choice & and make the
2nd color default to the 2nd color*/
start.on('click', gameStart)
stop.on('click', gameQuit)

function gameStart(){
  alert('Player 1 please select your color');
  red.on('click', function(){
    currentPlayer = pieces[0]

  })
  black.on('click', function(){
    currentPlayer = pieces[1]
  })
  gamePlay()
}

function gameQuit() {
  if(window.confirm('Are you sure you want to quit?')){
    gameDefault()
  }

}

//function to create empty game
function gameDefault(){
  for (var i = 0; i < destinationBox.length; i++) {
    destinationBox[i].innerHTML = ''
    currentPlayer = null
  }
  destinationBox.off()

}

//alert(currentPlayer + ' make your move!')

//var currentPlayer = userPick;




   /* I will create jquery functions to move the pieces across the top of the
   board and then drop down into the respective div that was clicked by each
   player */

   function dropAtLastEmpty(index){
     // are we at a row where there even is a next row? And, if so, does the next row have a populated circle?
     if(!destinationBox[index].innerHTML){
       if(index < destinationBox.length - 7 && !destinationBox[index + 7].innerHTML){
         dropAtLastEmpty(index + 7)
       } else {
         destinationBox[index].innerHTML = currentPlayer.marker
       }
     }
   }


   function gamePlay(){
     destinationBox.on('click', function(){
       // the index of the box we just clicked
       var index = destinationBox.index(this)
       dropAtLastEmpty(index)
       red.off()
       black.off()
       checkWinner()
     })
   }
console.log(destinationBox)
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
                      winnerIs()

                   }
                 } else if(i >= 2 & i <= 40){
                     if(destinationBox[i].innerHTML == currentPlayer.marker && destinationBox[i-1].innerHTML == currentPlayer.marker && destinationBox[i-2].innerHTML == currentPlayer.marker && destinationBox[i+1].innerHTML == currentPlayer.marker){
                       winnerIs()
                     }
                 } else if(i >= 1 && i <= 39){
                     if(destinationBox[i].innerHTML == currentPlayer.marker && destinationBox[i+1].innerHTML == currentPlayer.marker && destinationBox[i+2].innerHTML == currentPlayer.marker && destinationBox[i-1].innerHTML == currentPlayer.marker){
                       winnerIs()
                     }
                 } else if(i <= 38 && i >= 0){
                     if(destinationBox[i].innerHTML == currentPlayer.marker && destinationBox[i+1].innerHTML == currentPlayer.marker && destinationBox[i+2].innerHTML == currentPlayer.marker && destinationBox[i+3].innerHTML == currentPlayer.marker){
                      winnerIs()
                     }
                 } else if(i >= 3){
              if(destinationBox[i].innerHTML == currentPlayer.marker && destinationBox[i-1].innerHTML == currentPlayer.marker && destinationBox[i-2].innerHTML == currentPlayer.marker && destinationBox[i-3].innerHTML == currentPlayer.marker){
                  winnerIs()
                }
              }
            }
      }
     switchTurns()
   }

   //Create logic for displaying who won on the screen

   //create verticle win, diagonal win, horizontal win
function winnerIs(){
  var winner = $('<h2>' + currentPlayer.color + ' Wins!</h2>').css({'color': currentPlayer.color, 'font-size': '150px', 'z-index': 100, 'left': '360px', 'position': 'absolute', 'margin-bottom': '300px', 'bottom': 0})
  $('body').append(winner)
  $('.board').css('opacity', '.5')
  destinationBox.off()
  var playAgain = setInterval(function(){
    if(window.confirm('Would you like to Play Again?')){
      destinationBox.empty()
      $('h2').empty()
      $('.board').css('opacity', '1')
      switchTurns()
      gamePlay()
    } else {
      gameQuit()
      $('h1').empty()
      $('.board').css('opacity', '1')
    }
    clearInterval(playAgain)
  },3000)
}
