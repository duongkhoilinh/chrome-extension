$(document).ready(function() {	
    $.ajax({
      url: "https://mail.google.com/mail/feed/atom",
      dataType: "xml",
      success: function(data) {
      	var entries = $(data).find('entry');
      }
    });

    $('.btn-close').click(function() {
      closePopup();
    })

    $('.btn-open-gmail').click(function() {
      chrome.tabs.create({url:"https://mail.google.com/mail/u/0/#inbox"});
      
    })
    chrome.tabs.getCurrent(function(tab) {
        console.log(tab);
      })
});

function closePopup() {
  window.close()
}