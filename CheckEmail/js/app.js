$(document).ready(function() {	
    var url_gmail = isGmail();
    $.ajax({
        url: "https://mail.google.com/mail/feed/atom",
        dataType: "xml"
      }).done(function(data) {

          getInfoEmails(data);

          getInfoPersonal(data);

          $('#listMail li').click(function() {
            var url = $(this).data('url');
            console.log(url);
            createTabs(url);
          });

          console.log(data);

      }).fail(function() {
        $('#inbox').hide();
        $('#informationPersonal').hide();
        var signin = "<a id='btn-signin' href=''>Signin</a>";
        $('#listMail').html(signin);
        $('#btn-signin').click(function() {
          createTabs(url_gmail);
        });
    });

    $('.btn-close').click(function() {
      closePopup();
    })

    reloadGmail();

    $('.btn-open-gmail').click(function() {
      createTabs(isGmail());
    })

    // $('#play').click(function() {
    //   document.getElementById('alarmNewEmail').play();
    // })
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
  var checkNewEmail = '<check>True</check>';
  var entries = $(data).find('entry');
  var ul = "<ul>";
  $(entries).each(function(email) {
    $(this).append(checkNewEmail);
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

function reloadGmail() {
  $('.btn-reload').click(function() {
    $.ajax({
      url: "https://mail.google.com/mail/feed/atom",
      dataType: "xml",
      beforeSend: function(hr) {
        $('#alert').show();
      }
    }).done(function(data) {
      $('#alert').hide();
      getInfoPersonal(data);
      getInfoEmails(data);
    });
  });
}

function createTabs(currentUrl) {
  var check = 0;
  chrome.tabs.query({}, function(tabs) {
    for(var i = 0; i < tabs.length; i ++) {
      var string = tabs[i].url;
      if(string == currentUrl) {
        chrome.tabs.update(tabs[i].id, {selected:true, url:currentUrl});
      }
      check ++;
    }
    if(check == tabs.length) {
      chrome.tabs.create({url:currentUrl});
    }
    console.log(tabs.length,check);
  });
}

function createWindows(url,type) {
  chrome.windows.create({url:url,type:type,width:300,height:300});
}

function closePopup() {
  window.close()
}