$( document ).ready(function() {

  var words = ["<a href='http://www.brandt.id.au/newbookoldhymns/hymns/rorate.html'>rorate</a>", "<a href='http://www.brandt.id.au/newbookoldhymns/hymns/conditor.html'>Conditor</a>", "<a href='http://www.brandt.id.au/newbookoldhymns/hymns/alma.html'>alma</a>", "sit", "amet", "consect", "adipisci", "elit,", "sed.", "Eiusmod", "tempor", "a", "enim", "minim", "season", "nulla", "dolore", "sint", "id", "est", "laboris", "ut.", "aute", "laborum", "toe"];

  var message = "";
  var date = new Date();
  var day = date.getDate();
  var month = date.getMonth() + 1;
  var scrolled = false;
  var timeDelay = 200;

  // function to reveal message
  var cardReveal = function() {
    $("#message").text(message).show();
  }  

//  day=1; // uncomment to skip to 25
//  month=12;

  // Only work in December
  if(month === 12) {
    // Loop through each calendar window
    $("li").each( function( index ) {
      var adventwindow = index + 1;
      var item = $(this);

      // Open past windows
      if( day !== adventwindow && adventwindow < day ) {
        window.setTimeout(function(){
          item.children(".door").addClass("open");
        }, timeDelay);
      }

      // timeout offset for past window opening animation
      timeDelay += 100;

      // Add words so far to message variable
      if( adventwindow <= day ) {
        var word = words[index];
        $(this).append('<div class="revealed">' + word + '</div>');
        message = message + " " + word;
      }

      // Add jiggle animation to current day window
      if(adventwindow === day) {
        $(this).addClass("current");
        $(this).addClass("jiggle");
      }

      // On clicking a window, toggle it open/closed and
      // handle other things such as removing jiggle and 25th
      $(this).on("click", function() {
        if(adventwindow <= day) { 
          $(this).children(".door").toggleClass("open");
        }

        $(this).removeClass("jiggle");

        // If 25th, can show the message
        if(day >= 25 && adventwindow === 25) {
          messageReveal();

          // Animate scroll to message if not already done
          if(!scrolled) {
            $('html, body').animate({
              scrollTop: $("#message").offset().top
            }, 2000);
            scrolled = true;
          }
        }
      });

    });

    // If beyond 24, show message
    if(day >= 26){
      messageReveal();
    }

  }

});
