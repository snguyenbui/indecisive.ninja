$(document).ready(function() {
  $.get('https://www.cloudflare.com/cdn-cgi/trace', function(data) {
    $('#hidden_ip').val(data.split('\n')[2].split('=')[1]);
  });
});
