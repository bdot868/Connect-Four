var destinationBox = $('.circle')
var images = $('.boxes')
var start = $('#start')
var stop = $('#stop')
var red = $('.red')
var black = $('.black')
var currentPlayer = null;

var chipSound = new Audio("https://0.s3.envato.com/files/193203869/preview.mp3")
var winningSound = new Audio("https://0.s3.envato.com/files/221646418/preview.mp3")

var counter = 0;

var pieces = [
  {marker: '<img src="red piece.jpg" alt="">', color: 'Red'},
  {marker: '<img src="black piece.jpg">', color: 'Black'}
]

gameDefault()


//start game button triggers all functions to began running for gameplay
start.on('click', gameStart)
stop.on('click', gameQuit)


//Game start function that alerts player 1 to pick their color, 2nd color defaults to the 2nd player
function gameStart(){
  alert('Player 1 please select your color');
  red.on('click', function(){
    currentPlayer = pieces[0]
    gamePlay()

  })
  black.on('click', function(){
    currentPlayer = pieces[1]
    gamePlay()

  })

// gamePlay()

}

//Function when players want to quit the game
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
  start.fadeIn()
  destinationBox.off()

}
   /* Create jquery functions to move the pieces across each column and then drop down into the bottom most empty circle that was clicked by each
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

//function that places the pieces
   function gamePlay(){
     start.fadeOut()
     playerIs()
     destinationBox.on('click', function(){
       chipSound.play()
       // the index of the box we just clicked
       var index = destinationBox.index(this)
       dropAtLastEmpty(index)
       red.off()
       black.off()
       checkWinner()
     })
   }
   //create functions to toggle between the players to alternate turns
   function switchTurns(){
     if(currentPlayer == pieces[0]){
       currentPlayer = pieces[1];
     } else {
       currentPlayer = pieces[0];
     }

     playerIs()

   }

function playerIs(){

  var player = $('<div>Current Player<p>' + currentPlayer.color +'</p></div>').css({'text-align': 'center','color': 'black', 'position': 'absolute', 'height': '60px', 'width': '120px', 'background': 'white', 'top': '300px', 'margin': '0 5px'})
  $('.board').append(player)

}


function isDraw(){
counter++;
  console.log('counter')
   if(destinationBox.length === counter) {

      winnerIs('Nobody')
      return;
    }
   return;
}
   //create a function that will check every time a piece is placed if
   //there is a winner by seeing if anybody has four in a row: vertically, diagonally, horizontally
   function checkWinner(){

     isDraw()

     for (var i = 0; i < destinationBox.length; i++) {
          if(destinationBox[i].innerHTML !== ''){
            if(i >= 0 && i <= 20){
                 if(destinationBox[i].innerHTML == currentPlayer.marker && destinationBox[i+7].innerHTML == currentPlayer.marker && destinationBox[i+14].innerHTML == currentPlayer.marker && destinationBox[i+21].innerHTML == currentPlayer.marker){
                   winnerIs(currentPlayer.color)
                   console.log('vertical win')
                   break;
                 }
                     else if( (i >= 0  && i <= 3) || (i >= 7  && i <= 10) || (i >= 14  && i <= 17) || (i >= 21  && i <= 24) || (i >= 28  && i <= 31) || (i >= 35  && i <= 38) ){
                      if(destinationBox[i].innerHTML == currentPlayer.marker && destinationBox[i+8].innerHTML == currentPlayer.marker && destinationBox[i+16].innerHTML == currentPlayer.marker && destinationBox[i+24].innerHTML == currentPlayer.marker){
                        winnerIs(currentPlayer.color)
                        console.log('diagonal win')
                        break;
                      }
                    }
                    else if( (i >= 3  && i <= 6) || (i >= 10  && i <= 13) || (i >= 17  && i <= 20) || (i >= 24  && i <= 27) || (i >= 31  && i <= 34) || (i >= 38  && i <= 41) ){
                      if(destinationBox[i].innerHTML == currentPlayer.marker && destinationBox[i+6].innerHTML == currentPlayer.marker && destinationBox[i+12].innerHTML == currentPlayer.marker && destinationBox[i+18].innerHTML == currentPlayer.marker){
                      winnerIs(currentPlayer.color)
                      console.log('diagonal win')
                      break;
                   }
                 }
                 }
                 else if((i >= 2  && i <= 5) || (i >= 9  && i <= 12) || (i >= 16  && i <= 19) || (i >= 23  && i <= 26) || (i >= 30  && i <= 33) || (i >= 37  && i <= 40)){
                     if(destinationBox[i].innerHTML == currentPlayer.marker && destinationBox[i-1].innerHTML == currentPlayer.marker && destinationBox[i-2].innerHTML == currentPlayer.marker && destinationBox[i+1].innerHTML == currentPlayer.marker){
                       winnerIs(currentPlayer.color)
                       console.log('horizontal 2 down 1 up')
                       break;
                     }
                 } else if((i >= 1  && i <= 4) || (i >= 8  && i <= 11) || (i >= 15  && i <= 18) || (i >= 22  && i <= 25) || (i >= 30  && i <= 32) || (i >= 36  && i <= 39)){
                     if(destinationBox[i].innerHTML == currentPlayer.marker && destinationBox[i+1].innerHTML == currentPlayer.marker && destinationBox[i+2].innerHTML == currentPlayer.marker && destinationBox[i-1].innerHTML == currentPlayer.marker){
                       winnerIs(currentPlayer.color)
                       console.log('horizontal 1 down 2 up')
                       break;
                     }
                 } else if((i >= 0  && i <= 3) || (i >= 7  && i <= 10) || (i >= 14  && i <= 17) || (i >= 21  && i <= 24) || (i >= 28  && i <= 31) || (i >= 35  && i <= 38)){
                     if(destinationBox[i].innerHTML == currentPlayer.marker && destinationBox[i+1].innerHTML == currentPlayer.marker && destinationBox[i+2].innerHTML == currentPlayer.marker && destinationBox[i+3].innerHTML == currentPlayer.marker){
                      winnerIs(currentPlayer.color)
                      console.log('horizontal win adding up')
                      break;
                     }
                 } else if((i >= 3  && i <= 6) || (i >= 10  && i <= 13) || (i >= 17  && i <= 20) || (i >= 24  && i <= 27) || (i >= 31  && i <= 34) || (i >= 38  && i <= 41)){
              if(destinationBox[i].innerHTML == currentPlayer.marker && destinationBox[i-1].innerHTML == currentPlayer.marker && destinationBox[i-2].innerHTML == currentPlayer.marker && destinationBox[i-3].innerHTML == currentPlayer.marker){
                  winnerIs(currentPlayer.color)
                  console.log('horizontal win subtracting')
                  break;
                }
              }
            }
      }

     switchTurns()
   }

   //Create logic for displaying who won on the screen
function winnerIs(who){
  var winner = $('<h2>' + who + ' Wins!</h2>').css({'color': who, 'font-size': '150px', 'z-index': 100, 'left': '360px', 'position': 'absolute', 'margin-bottom': '300px', 'bottom': 0})
  $('body').append(winner)
  $('.board').css('opacity', '.5')
  destinationBox.off()
  winningSound.play()
  var playAgain = setInterval(function(){
    if(window.confirm('Would you like to Play Again?')){
      destinationBox.empty()
      $('h2').empty()
      $('.board').css('opacity', '1')
      switchTurns()
      gamePlay()
    } else {
      gameQuit()
      $('h2').empty()
      $('.board').css('opacity', '1')
    }
    clearInterval(playAgain)
  },3000)
}
