// 2016 Thomas Miller

(function(){

  let numbers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],
      randomNumbers = [],
      i = numbers.length,
      j = 0;

  while (i--) {
      j = Math.floor(Math.random() * (i+1));
      randomNumbers.push(numbers[j]);
      numbers.splice(j,1);
  }

  let images2 = randomNumbers.map(ranNum => `./images/${ranNum}.jpg`);

  let lastArrayLength = images2.length * 2;

  let images = repeatArray(images2, lastArrayLength);

  randomizeImages();

  // create the markup
  let output = "<ol>"; 
  for (let i = 0; i < lastArrayLength; i++) { 
    output += "<li>";
    output += "<img src = '" + images[i] + "'/>";
    output += "</li>";
  }
  output += "</ol>";
  $("#container").html(output);

  $("img").addClass('hidden');

  let guess1 = "";
  let guess2 = "";
  let count = 0;

  $("li").click(function() {

    // start the timer ?
    if($('#timer').hasClass('stopped')){
      $('#timer').removeClass('stopped');
      $('#timer').stopwatch().stopwatch('start');
    }

    // check the guesses
    if ((count < 2) &&  ($(this).children("img").hasClass("face-up")) === false) {
      
      count++;
      $(this).children("img").removeClass('hidden');
      $(this).children("img").addClass("face-up");
      
      // first guess
      if (count === 1 ) { 
        guess1 = $(this).children("img").attr("src"); 
      }   
      
      // second guess
      else { 
        guess2 = $(this).children("img").attr("src"); 
        
        // if match
        if (guess1 === guess2) {
          $("li").children("img[src='" + guess2 + "']").addClass("match");
          checkGameFinished();
        } 
        
        // else miss
        else {
          $("li").css('pointer-events', 'none');
          setTimeout(function() {
            $("img").not(".match").addClass('hidden');
            $("img").not(".match").removeClass("face-up");
            $("li").css('pointer-events', 'auto');
          }, 800);
          checkGameFinished();
        }
        
        // reset
        count = 0; 
      }
    }
  });
  // =====================================================
  // randomize array of images
  // =====================================================
  function randomizeImages(){
    Array.prototype.randomize = function()
    {
      let i = this.length, j, temp;
      while ( --i )
      {
        j = Math.floor( Math.random() * (i - 1) );
        temp = this[i];
        this[i] = this[j];
        this[j] = temp;
      }
    };
    
    images.randomize();
  }
})();


// =====================================================
// Repeat array (for double images)
// =====================================================

function repeatArray(arr, count) {
  let ln = arr.length;
  let b = new Array();
  for(i=0; i<count; i++) {
    b.push(arr[i%ln]);
  }
  return b;
}

// =====================================================
// Reset button
// =====================================================

function reset(){
  location.reload();
}

// =====================================================
// Detect end of game
// =====================================================

function checkGameFinished(){
  if ($("img.match.face-up").length == $("img").length) {
    finishTheGame();
  }
}
function finishTheGame(){
  $('body').addClass("finished");
  $('#timer').stopwatch().stopwatch('toggle');
  let score = $('#timer').text();
  let scoreformatted = score.split(':').join('')
  $('form span').empty().text(score);
  $('form #finaltime').val('').val(score);
  $('form #finaltimeformatted').val('').val(scoreformatted);
}



// =====================================================
// Greensock
// =====================================================
TweenMax.staggerFrom("li", 1, { y:200, opacity:0, ease:Power4.easeIn, force3D:true}, 0.05);


// =====================================================
// JSON
// =====================================================
$(document).ready(function(){
    $('form').on('submit', function(e){
        e.preventDefault();
        var $nickname = $("#nickname");
        var $finaltime = $("#finaltime");
        var $finaltimeformatted = $("#finaltimeformatted");
        var params = {
        nickname: $nickname.val(),
        finaltime: $finaltime.val(),
        finaltimeformatted: $finaltimeformatted.val(),
        }

        $.ajax({
          type: 'POST',
          data: params,
          url: 'save_leaderboard.php',

          success: function(data) {
            console.log('success');
            $('.modal').addClass('success');
          },
          error: function(data) {
            console.log('error');
            $('.modal').addClass('error');
          },
          complete: function() {
            console.log('complete');
          }
        });
        return false;
    });
});
