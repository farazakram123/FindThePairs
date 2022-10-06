//Creating an array of letters+numbers and suffling this array randomly.
var arr = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","1","2","3","4","5","6","7","8"];
var swapping_var, num, p = arr.length;
if(p) while(--p) {
   num = Math.floor(Math.random() * (p + 1));
   swapping_var = arr[num];
   arr[num] = arr[p];
   arr[p] = swapping_var;
}

//Variable Decleration is done here
//We can flip the img element using the CSS transform property.
/* flip horizontally -- rotateY(180deg)*/
/* flip vertically -- rotateX(180deg)*/
var pre="", pID, ppID=0, turn=0, t="transform", flip="rotateY(180deg)", flipBack="rotateY(0deg)", time, mode;

//Resizing the Screen
window.onresize = func;
function func() {
   wid = innerWidth;
   hght = innerHeight;
   $('body').height(hght+"px");
   $('#ol').height(wid+"px");
}

//Showing instructions
//The window object represents the browser window. The onload property processes load events after the element 
//has finished loading. This is used with the window element to execute a script after the webpage has completely 
//loaded.
window.onload = function() {
    $("#ol").html(`<center><div id="inst"><h3>Hello User !</h3>Instructions For Game<br><br><li>By flipping the similar blocks you can make pairs.</li><li>Click on the block to flip it.</li><li>If two blocks you clicked are not similar, they will be flipped back.</li><p style="font-size:19px;">Click one of the following mode to start the game.</p></div><button onclick="start(3, 4)">3 x 4</button> <button onclick="start(4, 4)" style="w">4 x 4</button><button onclick="start(4, 5)">4 x 5</button><button onclick="start(5, 6)">5 x 6</button><button onclick="start(6, 6)">6 x 6</button></center>`);
}

//Starting the game
function start(row,col) {
    //Now setting the timer and counting moves

    min=0, sec=0, moves=0;
    $("#time").html("Time: 00:00");
    $("#moves").html("Moves: 0");
    time = setInterval(function() {
      sec++;
      if(sec==60) {
          min++; sec=0;
      }
      if(sec<10)
          $("#time").html("Time: 0"+min+":0"+sec);
      else 
        $("#time").html("Time: 0"+min+":"+sec);
    }, 1000);


    rem=row*col/2, noItems=rem;
    mode = row+"x"+col;
    //Generating letter array
    var newArr = [];
    //Pushing letters
    for (var i=0;i<noItems;i++)
        newArr.push(arr[i]);
    //Again pushing same letters as earliers
    for (var i=0;i<noItems;i++)
        newArr.push(arr[i]);
    //Shuffling the New Array
    var temp, n, p = newArr.length;
    if(p) while(--p) {
        n = Math.floor(Math.random() * (p + 1));
        temp = newArr[n];
        newArr[n] = newArr[p];
        newArr[p] = temp;
    }
    
    //Creating table
    $("table").html("");
    var n=1;
    for (var i = 1;i<=row;i++) {
        $("table").append("<tr>");
        for (var j = 1;j<=col;j++) {
           $("table").append(`<td id='${n}' onclick="change(${n})"><div class='inner'><div class='front'></div><div class='back'><p>${newArr[n-1]}</p></div></div></td>`);
           n++;
         }
         $("table").append("</tr>");
    }
    
    //fading out the instructions from the screen
    $("#ol").fadeOut(200);
}



//Function for flipping blocks
function change(x) {
  //decleration of variable
  let i = "#"+x+" .inner";
  let f = "#"+x+" .inner .front";
  let b = "#"+x+" .inner .back";
  
  //Do not flip for these conditions
  if (turn==2 || $(i).attr("flip")=="block" || ppID==x) {

  }
  
  //Flip only here
  else {
    $(i).css(t, flip);
    if (turn==1) {
      //This value will prevent spam//many clicking
      turn=2;
      
      //If both flipped blocks are not same,then---->
      if (pre!=$(b).text()) {
         setTimeout(function() {
            $(pID).css(t, flipBack);
            $(i).css(t, flipBack);
            ppID=0;
         },1000);
      }
      
      //If blocks flipped are same,then----->
      else {
          rem--;
          $(i).attr("flip", "block");
          $(pID).attr("flip", "block");
      }
      
      setTimeout(function() {
         turn=0;
         //Increase moves 
         moves++;
         $("#moves").html("Moves: "+moves);
      },1000);
      
    }
    //Initially the counter is here.....>
    else {
      pre = $(b).text();
      ppID = x;
      pID = "#"+x+" .inner";
      turn=1;
    }
    
    //If all pairs are matched
    if (rem==0) {
          clearInterval(time);
          if (min==0) {
              time = `${sec} seconds`;
          }
          else {
              time = `${min} minute(s) and ${sec} second(s)`;
          }
          setTimeout(function() {
              $("#ol").html(`<center><div id="iol"><h2>Congrats!</h2><p style="font-size:23px;padding:10px;">You completed the ${mode} mode in ${moves} moves. It took you ${time}.</p><p style="font-size:18px"><br/>Play Again ?</p><button onclick="start(3, 4)">3 x 4</button> <button onclick="start(4, 4)" style="w">4 x 4</button><button onclick="start(4, 5)">4 x 5</button><button onclick="start(5, 6)">5 x 6</button><button onclick="start(6, 6)">6 x 6</button></div></center>`);
              $("#ol").fadeIn(1000);
          }, 1500);
    }
  }
}