$(document).ready(function() {
  console.log('The document is ready!');

  //makes character counter a live count of text chars in textarea
  $('#add_option').on('click', function(e) {
    $('#option_list').append(`<input type="text" name="options">`)
  });

  $('#remove_option').on('click', function(e) {
    console.log("minus clicked")
    console.log($('#option_list').children().last('input'))
    if ($('#option_list').children().length > 2) {
      $('#option_list').children().last('input').remove();
    }
  });
});
