// =====================================================
// Get json from leaderboard.json and display it
// =====================================================
$(() => {
  $.getJSON('leaderboard.json', (data) => {
    data.sort((a, b) => a.finaltimeformatted.localeCompare(b.finaltimeformatted));
    let scoreboard = '';

    $.each(data, (index, val) => {
      scoreboard += `<div class="single-score"><span>${val.nickname}</span><span>${val.finaltime}</span></div>`;
    });

    $(scoreboard).appendTo('#leaderboard');
  });
});
