let nums = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],
    ranNums = [],
    i = nums.length, // 16
    j = 0;

while (i--) {
    j = Math.floor(Math.random() * (i+1));
    ranNums.push(nums[j]);
    nums.splice(j,1);
}

let images2 = ranNums.map(function(ranNum){
  return '/images/' + ranNum + '.jpg';
})

let lastArrayLength = images2.length * 2;
function repeatArray(arr, count) {
  let ln = arr.length;
  let b = new Array();
  for(i=0; i<count; i++) {
    b.push(arr[i%ln]);
  }
  return b;
}
let images = repeatArray(images2, lastArrayLength);

// console.log(images);

randomizeImages();

// output images then hide them
let output = "<ol>"; 
for (let i = 0; i < 32; i++) { 
  output += "<li>";
  output += "<img src = '" + images[i] + "'/>";
  output += "</li>";
}
output += "</ol>";
document.getElementById("container").innerHTML = output;
$("img").addClass('hidden');

let guess1 = "";
let guess2 = "";
let count = 0;

$("li").click(function() {
  if ((count < 2) &&  ($(this).children("img").hasClass("face-up")) === false) {
    
    // increment guess count, show image, mark it as face up
    count++;
    $(this).children("img").removeClass('hidden');
    $(this).children("img").addClass("face-up");
    
    //guess #1
    if (count === 1 ) { 
      guess1 = $(this).children("img").attr("src"); 
    }   
    
    //guess #2
    else { 
      guess2 = $(this).children("img").attr("src"); 
      
      // since it's the 2nd guess check for match
      if (guess1 === guess2) { 
        console.log("gj bronze");
        $("li").children("img[src='" + guess2 + "']").addClass("match");
      } 
      
      // else it's a miss
      else { 
        console.log("noob");
        setTimeout(function() {
          $("img").not(".match").addClass('hidden');
          $("img").not(".match").removeClass("face-up");
        }, 800);
      }
      
      // reset
      count = 0; 
      setTimeout(function() { console.clear(); }, 60000);      
    }
  }
});

// randomize array of images
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
// reset button
function reset(){
  console.log('reset');
  $("img").addClass('hidden');
  $("img").removeClass('match');
  $("img").removeClass("face-up");
}