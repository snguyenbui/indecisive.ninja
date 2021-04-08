$('document').ready(() => {

  let id = $('.poll-id-passthrough').text().trim();

  setTimeout(function() {
    let url = document.URL;
    let front = url.split(":id")[0];

    window.location = `${front}${id}`
  }, 2500)

})

