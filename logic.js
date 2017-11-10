$(document).ready(function(){
  //GLOBAL VARIABLE
  var shows = ['Arrested Development', 'Stranger Things', 'Black Mirror', 'Firefly', 'Twilight Zone', 'Breaking Bad', 'Game of Thrones', 'Buffy the Vampire Slayer', 'X-Files',];

  //BUTTON INITIALIZATION
  function initializeButtons() {

    $('#button-display').empty();

    for (var i = 0; i < shows.length; i++) {
      var colors = ['btn-info', 'btn-danger', 'btn-warning', 'btn-success'];
      var buttonColors = colors[Math.floor(Math.random() * colors.length)];

      var button = $("<button>").addClass('show btn button_margin ' + buttonColors).text(shows[i]);

      button.attr('data-name', shows[i]);

      $('#button-display').append(button);

      console.log(buttonColors)
    }
  }

  //ADDS NEW BUTTONS
  $('#add-gif').on('click', function(event) {

    event.preventDefault();

    var newShow = $('#gif-input').val().trim();

    shows.push(newShow);

    initializeButtons();
  });

  //DISPLAY THE GIFS
  function gifDisplay() {
    var chosenShow = $(this).attr('data-name');

    console.log(chosenShow);

    var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + chosenShow + '&api_key=oUKtEeROwqbfb8SbwJWIhDlXrad4nz4K&limit=15';

    $.ajax({
      url: queryURL,
      mehtod: 'GET'
    }).done(function(response){
      console.log(response);
      $('#gif-display').empty();

      var result = response.data;

      for (var i = 0; i < result.length; i++) {
        var gifDiv = $("<div>");
        gifDiv.addClass('col-12 col-md-6 col-lg-4');

        var rating = result[i].rating;
        var p = $('<p>')
        p.text("Rating: " + rating);

        var image = $('<img>').addClass('img-fluid gif');
        image.attr('src', result[i].images.fixed_height.url);
        image.attr('data-state', 'animate');
        image.attr('data-animate', result[i].images.fixed_height.url);
        image.attr('data-still', result[i].images.fixed_height_still.url);

        gifDiv.append(image);
        gifDiv.append(p);

        $('#gif-display').append(gifDiv);
      }
    });
  }

  //GIF ANIMATIONS (PLAY/PAUSE)
  $('body').on('click', '.gif',function(){
      console.log('clicked!');

      var state = $(this).attr('data-state');

      if (state === 'animate') {
        $(this).attr('src', $(this).attr('data-still'));
        $(this).attr('data-state', 'still');
      } else {
        $(this).attr('src', $(this).attr('data-animate'));
        $(this).attr('data-state', 'animate');
      }
  });

  $(document).on('click', '.show', '.gif', gifDisplay);

  initializeButtons();
});
