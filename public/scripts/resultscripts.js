function copyToClipboard(textToCopy) {
  // navigator clipboard api needs a secure context (https)
  if (navigator.clipboard && window.isSecureContext) {
    // navigator clipboard api method'
    return navigator.clipboard.writeText(textToCopy);
  } else {
    // text area method
    let textArea = document.createElement("textarea");
    textArea.value = textToCopy;
    // make the textarea out of viewport
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    return new Promise((res, rej) => {
      // here the magic happens
      document.execCommand('copy') ? res() : rej();
      textArea.remove();
    });
  }
}



$(document).ready(function() {


  $('.log-button').on('click', (e) => {
    $('.logs').toggle(300);
  });

  $('.copy-button').on('click', (e) => {
    copyToClipboard(`${document.URL}/vote`)
      .then(() => {
        $('.copy-button').text('Voter link copied!');

        setTimeout(function() {
          $('.copy-button').text('Copy Voter Link');
        }, 1000);
      });



  });

});

