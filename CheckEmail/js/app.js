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

    $('.btn-reload').click(function() {
      $.ajax({
        url: "https://mail.google.com/mail/feed/atom",
        dataType: "xml",
        beforeSend: function(hr) {
          $('#alert').show();
        }
      }).done(function() {
        $('#alert').hide();
        getInfoPersonal(data);
        getInfoEmails(data);
      });
    });


});

function isGmail() {
  return "https://mail.google.com/mail/u/0/#inbox";
}

function getInfoPersonal(data) {
  var fullcount = $(data).find('fullcount').text();
  var title = $(data).find('feed > title:first-child').text();
  var emailName = title.substr(18);
  $('.myEmailName').html(emailName + '(' + fullcount + ')');
  $('.myEmailName').click(function() {
    // var url = isGmail();
    // chrome.tabs.create({url:url});
    chrome.tabs.query({}, function(tabs) {
      console.log(tabs[5]);
      for(var i = 0; i < tabs.length; i++) {
        if(tabs[i].url == isGmail) {
          chrome.tabs.update(tab[i].id, {active:"true"});
        }
      }
    })
  })
}

function getInfoEmails(data) {
  var entries = $(data).find('entry');
  entries.each(function() {
      var Title = $(this).find('title').text();
      var Summary = $(this).find('summary').text();
      var Links = $(this).find('link').text();
      var Modified = $(this).find('modified').text();
      var Issued = $(this).find('issued').text();
      var Id = $(this).find('id').text();
  });
}

function createTab(url) {

}

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