$(document).ready(function () {

  //Initial array of topics populated on start 

  var topics = ["Kevin Malone", "Dwight Schrute", "Michael Scott", "Jim Halpert", "Andy Bernard"];

  //Function that renders initial buttons
  function renderButtons() {
    $("#button-area").empty();

    for (var i = 0; i < topics.length; i++) {

      var officeButton = $("<button>");

      officeButton.addClass("office");
      officeButton.addClass("btn btn-primary")
      officeButton.attr("data-name", topics[i]);
      officeButton.text(topics[i]);
      $("#button-area").append(officeButton);
    }
  }

  //Function that adds new button
  $("#addGif").on("click", function (event) {
    event.preventDefault();
    var office = $("#Gif-search").val().trim();
    if (office == "") {
      return false; // prevents blank buttons
    }
    topics.push(office);
    renderButtons();
  });

  $(document).on("click", ".office", displayInfo);
  //run function to display all buttons on startup
  renderButtons();

  });


  // Call to API
  function displayInfo() {
  var office = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + office + "&api_key=0X4hj4vheUvjJrIj7iXzqcfjylEXoZKa";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function (response) {
    $("#gif-area").empty();

    var results = response.data;

    for (var i = 0; i < results.length; i++) {
      var gifDiv = $("<div class= 'giphyDiv'>");
      var rating = results[i].rating;
      var pRate = $("<p>").text("Rating: " + rating);

      //Variables for still url and animated url 

      var urlStill = results[i].images.fixed_height_still.url;
      var urlPlaying = results[i].images.fixed_height.url;

      //gif needs still source to load, and data attributes to store the still and animated gifs for pausing function

      var gif = $("<img>")
      .addClass("gif")
      .attr("src", urlStill)
      .attr("data-still", urlStill)
      .attr("data-animate", urlPlaying)
      .attr("data-state", "still");

      //append the gif and rating to the new div created 

      gifDiv.append(gif);
      gifDiv.append(pRate);
      $("#gif-area").append(gifDiv);
    }
      //on click of still image animate; pause on second click once animated
      $(".gif").on("click", function() {
        var state = $(this).attr("data-state");

        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
       } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
      }

  });

  });
}
