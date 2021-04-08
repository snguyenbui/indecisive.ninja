
$(document).ready(function() {
  console.log('kapil');
  let url = document.URL;
  let front = url.split("admin")[0];
  let back = url.split("admin")[1].split("/")[1];
  $('.link').text(`${front}${back}`);
});
