
$(document).ready(function() {


  $('.log-button').on('click', (e) => {
    $('.logs').toggle(300)
  });

  $('.copy-button').on('click', (e) => {
    navigator.clipboard.writeText(`${document.URL}/vote`)
      .then(() => {
        $('.copy-button').text('Voter link copied!')

        setTimeout(function() {
          $('.copy-button').text('Copy Voter Link')
        }, 1000);
      })



  });

});

