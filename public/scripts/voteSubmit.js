$(document).ready(function() {
  $.get('https://www.cloudflare.com/cdn-cgi/trace', function(data) {
    $('#hidden_ip').val(data.split('\n')[2].split('=')[1]);
  });

  let width = 0;
  for (let option of $('.button')) {
    if (option.value.length > width) {
      width = option.value.length;
    }
  };

  width *= 9.1;
  $('#voterForm').width(width)
});
