$('document').ready(() => {

  let id = $('.poll-id-passthrough').text().trim();

  setTimeout(function() {
    console.log('inside set timeout');
    let url = document.URL;
    let front = url.split(":id")[0];

    window.location = `${front}${id}`
  }, 2500)

})

