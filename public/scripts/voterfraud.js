$('document').ready(() => {

  let id = $('.poll-id-passthrough').text().trim();

  console.log('this is the id', id);

  setTimeout(function() {
    console.log('inside set timeout');
    let url = document.URL;
    let front = url.split(":id")[0];

    console.log('this is where we are sending', `${front}/${id}`);

    window.location = `${front}${id}`
  }, 2000)

})

