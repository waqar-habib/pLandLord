$(document).ready(function() {
  
    var queryURL =
      "https://api.unsplash.com/search/photos?page=1&query=apartment&client_id=e695357d9933d3349f7a52b274a8465349d176b86c17a1459309a2733c7ca46b";
  
    console.log(queryURL);
  
    // Make an AJAX call using queryURL
    $.ajax({
      url: queryURL,
      method: "GET"
    
    }).then(function(response) {
      console.log(response);
      
      // generate random num to cycle thru the pulled images
      var randomNum = Math.floor(Math.random() * 11);
      console.log(randomNum);

      var src = response.results[randomNum].urls.small;

      $('#hero').css('background-image','url('+src+')').css('background-size','cover');
      
    });
  });
  