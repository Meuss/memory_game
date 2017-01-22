// =====================================================
// Get json from leaderboard.json and display it
// =====================================================
$(() => {
  $.getJSON('leaderboard.json', (data) => {
    data.sort((a, b) => a.finaltimeformatted.localeCompare(b.finaltimeformatted));
    let scoreboard = '';
    let i = 1;
    $.each(data, (index, val) => {
      scoreboard += `<div class="single-score"><span>${i}: ${val.nickname}</span><span>${val.finaltime}</span></div>`;
      i++
    });

    $(scoreboard).appendTo('#leaderboard');
  });
});
