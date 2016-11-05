// =====================================================
// Get json from leaderboard.json and display it
// =====================================================
$(function(){
  
  $.getJSON('leaderboard.json', function (data) {
    data.sort((a, b) => a.finaltimeformatted.localeCompare(b.finaltimeformatted));
    let scoreboard = "";
    // sort data array by finaltimeformatted value
    console.log(data);
    $.each(data, function(index, val) {
      scoreboard += "<div><span>"+val.nickname+"</span><span>"+val.finaltime+"</span</div>";
    });


    $(scoreboard).appendTo('#leaderboard');

  });


});
