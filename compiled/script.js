'use strict';

// 2016 Thomas Miller

// =====================================================
// Detect end of game
// =====================================================

function checkGameFinished() {
  if ($('img.match.face-up').length === $('img').length) {
    $('body').addClass('finished');
    $('#timer').stopwatch().stopwatch('toggle');
    var score = $('#timer').text();
    var scoreformatted = score.split(':').join('');
    $('form span').empty().text(score);
    $('form #finaltime').val('').val(score);
    $('form #finaltimeformatted').val('').val(scoreformatted);
  }
}

{
  (function () {
    var repeatArray = function repeatArray(arr, count) {
      var ln = arr.length;
      var b = [];
      var k = void 0;
      for (k = 0; k < count; k += 1) {
        b.push(arr[k % ln]);
      }
      return b;
    };

    // =====================================================
    // randomize array of images
    // =====================================================
    var randomizeImages = function randomizeImages() {
      Array.prototype.randomize = function randomizing() {
        var v = this.length;
        var w = void 0;
        var temp = void 0;
        while (v -= 1) {
          w = Math.floor(Math.random() * (v - 1));
          temp = this[v];
          this[v] = this[w];
          this[w] = temp;
        }
      };

      images.randomize();
    };

    var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    var randomNumbers = [];
    var i = numbers.length;
    var j = 0;

    while (i -= 1) {
      j = Math.floor(Math.random() * (i + 1));
      randomNumbers.push(numbers[j]);
      numbers.splice(j, 1);
    }

    var images2 = randomNumbers.map(function (ranNum) {
      return './images/' + ranNum + '.jpg';
    });
    var lastArrayLength = images2.length * 2;

    var images = repeatArray(images2, lastArrayLength);

    // create the markup
    var output = '<ol>';
    for (var u = 0; u < lastArrayLength; u += 1) {
      output += '<li>';
      output += '<img src = \'' + images[u] + '\'/>';
      output += '</li>';
    }
    output += '</ol>';
    $('#container').html(output);

    $('img').addClass('hidden');

    var guess1 = '';
    var guess2 = '';
    var count = 0;

    $('li').click(function playmemory() {
      // start the timer ?
      if ($('#timer').hasClass('stopped')) {
        $('#timer').removeClass('stopped');
        $('#timer').stopwatch().stopwatch('start');
      }

      // check the guesses
      if (count < 2 && $(this).children('img').hasClass('face-up') === false) {
        count += 1;
        $(this).children('img').removeClass('hidden');
        $(this).children('img').addClass('face-up');

        // first guess
        if (count === 1) {
          guess1 = $(this).children('img').attr('src');
        } /* second guess */else {
            guess2 = $(this).children('img').attr('src');
            // if match
            if (guess1 === guess2) {
              $('li').children('img[src=\'' + guess2 + '\']').addClass('match');
              checkGameFinished();
            } /* else miss */else {
                $('li').css('pointer-events', 'none');
                setTimeout(function () {
                  $('img').not('.match').addClass('hidden');
                  $('img').not('.match').removeClass('face-up');
                  $('li').css('pointer-events', 'auto');
                }, 800);
                checkGameFinished();
              }

            // reset
            count = 0;
          }
      }
    });
    randomizeImages();
  })();
}

// =====================================================
// Repeat array (for double images)
// =====================================================


// =====================================================
// JSON
// =====================================================
$(document).ready(function () {
  $('form').on('submit', function (e) {
    e.preventDefault();
    var $nickname = $('#nickname');
    var $finaltime = $('#finaltime');
    var $finaltimeformatted = $('#finaltimeformatted');
    var params = {
      nickname: $nickname.val(),
      finaltime: $finaltime.val(),
      finaltimeformatted: $finaltimeformatted.val()
    };

    $.ajax({
      type: 'POST',
      data: params,
      url: 'save_leaderboard.php',

      success: function success() {
        $('.modal').addClass('success');
      },
      error: function error() {
        $('.modal').addClass('error');
      },
      complete: function complete() {}
    });
    return false;
  });
});