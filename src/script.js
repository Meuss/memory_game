// 2016 Thomas Miller

// =====================================================
// Detect end of game
// =====================================================

function checkGameFinished() {
  if ($('img.match.face-up').length === $('img').length) {
    $('body').addClass('finished');
    $('#timer').stopwatch().stopwatch('toggle');
    const score = $('#timer').text();
    const scoreformatted = score.split(':').join('');
    $('form span').empty().text(score);
    $('form #finaltime').val('').val(score);
    $('form #finaltimeformatted').val('').val(scoreformatted);
  }
}

{
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  const randomNumbers = [];
  let i = numbers.length;
  let j = 0;

  while (i -= 1) {
    j = Math.floor(Math.random() * (i + 1));
    randomNumbers.push(numbers[j]);
    numbers.splice(j, 1);
  }

  const images2 = randomNumbers.map(ranNum => `./images/${ranNum}.jpg`);
  const lastArrayLength = images2.length * 2;

  function repeatArray(arr, count) {
    const ln = arr.length;
    const b = [];
    let k;
    for (k = 0; k < count; k += 1) {
      b.push(arr[k % ln]);
    }
    return b;
  }
  const images = repeatArray(images2, lastArrayLength);

  // create the markup
  let output = '<ol>';
  for (let u = 0; u < lastArrayLength; u += 1) {
    output += '<li>';
    output += `<img src = '${images[u]}'/>`;
    output += '</li>';
  }
  output += '</ol>';
  $('#container').html(output);

  $('img').addClass('hidden');

  let guess1 = '';
  let guess2 = '';
  let count = 0;

  $('li').click(function playmemory() {
    // start the timer ?
    if ($('#timer').hasClass('stopped')) {
      $('#timer').removeClass('stopped');
      $('#timer').stopwatch().stopwatch('start');
    }

    // check the guesses
    if ((count < 2) && ($(this).children('img').hasClass('face-up')) === false) {
      count += 1;
      $(this).children('img').removeClass('hidden');
      $(this).children('img').addClass('face-up');

      // first guess
      if (count === 1) {
        guess1 = $(this).children('img').attr('src');
      } /* second guess */ else {
        guess2 = $(this).children('img').attr('src');
        // if match
        if (guess1 === guess2) {
          $('li').children(`img[src='${guess2}']`).addClass('match');
          checkGameFinished();
        } /* else miss */ else {
          $('li').css('pointer-events', 'none');
          setTimeout(() => {
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
  // =====================================================
  // randomize array of images
  // =====================================================
  function randomizeImages() {
    Array.prototype.randomize = function randomizing() {
      let v = this.length;
      let w;
      let temp;
      while (v -= 1) {
        w = Math.floor(Math.random() * (v - 1));
        temp = this[v];
        this[v] = this[w];
        this[w] = temp;
      }
    };

    images.randomize();
  }
  randomizeImages();
}


// =====================================================
// Repeat array (for double images)
// =====================================================


// =====================================================
// JSON
// =====================================================
$(document).ready(() => {
  $('form').on('submit', (e) => {
    e.preventDefault();
    const $nickname = $('#nickname');
    const $finaltime = $('#finaltime');
    const $finaltimeformatted = $('#finaltimeformatted');
    const params = {
      nickname: $nickname.val(),
      finaltime: $finaltime.val(),
      finaltimeformatted: $finaltimeformatted.val(),
    };

    $.ajax({
      type: 'POST',
      data: params,
      url: 'save_leaderboard.php',

      success() {
        $('.modal').addClass('success');
      },
      error() {
        $('.modal').addClass('error');
      },
      complete() {
      },
    });
    return false;
  });
});
