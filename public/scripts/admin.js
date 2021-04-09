$(document).ready(function() {
  let url = document.URL;
  let front = url.split("admin")[0];
  let back = url.split("admin")[1].split("/")[1];
  $('.link').attr("href", `${front}${back}`);
});
