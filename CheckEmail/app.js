$(document).ready(function() {	
    $.ajax({
      url: "https://mail.google.com/mail/feed/atom",
      dataType: "xml",
      success: function(data) {
        getInfoPersonal(data);
        getInfoEmails(data);
      }
    });
    console.log(isGmail());
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