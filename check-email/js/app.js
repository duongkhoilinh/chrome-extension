$(document).ready(function() {	
    var url_gmail = isGmail();
    var onOffSpeak = localStorage.onOffSpeak;
    $.ajax({
        url: "https://mail.google.com/mail/feed/atom",
        dataType: "xml",
        beforeSend: function() {
          $('#listMail').hide();
        }
      }).done(function(data) {

          $('#listMail').show();

          getInfoEmails(data);

          getInfoPersonal(data);

          $('#listMail li').click(function() {
            var url = $(this).data('url');
            console.log(url);
            createTabs(url);
          });

          var fullcount = $(data).find('fullcount').text();

          if(fullcount <= 5) {
            $('#listMail').css({'height':'auto'});
          }
          else {
            $('#listMail').css({'height':'500px'});
          }

      }).fail(function() {
        $('#inbox').hide();
        $('#informationPersonal').hide();
        var signin = "<a id='btn-signin' href=''>Signin</a>";
        $('#listMail').show();
        $('#listMail').css('height','50px');
        $('#listMail').css('border','none');
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
      createTabs(url_gmail);
    })

    $('#inbox').click(function() {
      createTabs(url_gmail);
    })

    $('.btn-search').click(function() {
      $('#btn-search').show();
      $(this).hide();
    })

    $('#btn-cancel').click(function() {
      $('#btn-search').hide();
      $('.btn-search').show();
    })

    $('#btn-submit').click(function() {
      var nameSearch = $('#btn-search input').val();
      var url = url_gmail + '#search/' + nameSearch;
      if(nameSearch!="") {
        createTabs(url);
      }
    })

    $('.btn-option').click(function() {
      var url_option = "chrome://extensions/?options=plencmnoenokgmemjliblkammbbinocj";
      createTabs(url_option);
    })

    if(onOffSpeak == 'on') {
      $('.btn-volume-on').show();
      $('.btn-volume-off').hide();
    }
    else {
      $('.btn-volume-off').show();
      $('.btn-volume-on').hide();
    }



    
});

function isGmail() {
  return "https://mail.google.com/mail/u/0/";
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
        if(tabs[i].url == url_gmail) {
          chrome.tabs.update(tab[i].id, {active:"true"});
        }
      }
    })
  });

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
    var iDate = moment($(this).find('modified').text()).format('LLL');
    ul += "<li data-url='" + iLink + "'>"+
              "<p class='name-author'>" + iNameAuthor + "</p>" +
              "<p class='date'>" + iDate + "</p>" +
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