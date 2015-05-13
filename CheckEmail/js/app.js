$(document).ready(function() {	
    $.ajax({
      url: "https://mail.google.com/mail/feed/atom",
      dataType: "xml"
    }).done(function(data) {
        getInfoEmails(data);

        $('#listMail li').click(function() {
          var url = $(this).data('url');
          createTabs(url);
        })
    }).fail(function() {
      $('#inbox').hide();
      var signin = "<a id='btn-signin' href=''>Signin</a>";
      $('#listMail').html(signin);
      $('#btn-signin').click(function() {
        var url = "https://mail.google.com/mail/u/0/#inbox";
        createTabs(url);
      });
    });

    $('.btn-close').click(function() {
      closePopup();
    })

    $('.btn-open-gmail').click(function() {
      chrome.tabs.create({url:"https://mail.google.com/mail/u/0/#inbox"});
    })

});

function closePopup() {
  window.close()
}

function getInfoEmails(data) {
  var entries = $(data).find('entry');
  var ul = "<ul>";
  $(entries).each(function(email) {
    var iId = $(this).find('id').text();
    var iNameAuthor = $(this).find('author name').text();
    var iTitle = $(this).find('title').text();
    var iSummary = $(this).find('summary').text();
    var iDate = $(this).find('modified').text();
    var iEmailAuthor = $(this).find('author email').text();
    var iLink = $(this).find('link').attr('href');
    ul += "<li data-url='" + iLink + "'>"+
              "<p class='name-author'>" + iNameAuthor + "</p>" +
              "<p class='title'>" + iTitle + "</p>" +
              "<p class='summary'>" + iSummary + "</p>" +
          "</li>";
  });
  ul += "</ul>";
  $('#listMail').html(ul);
}

function createTabs(url) {
  chrome.tabs.create({url:url});
}

// function getUrlEmail(data,id) {
//   var entries = $(data).find('entry');
//   var url;
//   $(entries).each(function(email) {
//     var current_id = $(this).find('id').text();
//     if(current_id == id) {
//       url = $(this).find('title').text();
//     }
//     return url;
//   })
// }