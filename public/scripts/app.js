$(document).ready(function() {
  console.log('The document is ready!');

  //makes character counter a live count of text chars in textarea
  $('#add_option').on('click', function(e) {
    $('#option_list').append(`<div class="card">
    <input type="text" name="options">
  </div>`)
  });


  $('.link').text(`${document.URL}/vote`)
});
