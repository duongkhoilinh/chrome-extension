$(document).ready(function() {	
    $.ajax({
      url: "https://mail.google.com/mail/feed/atom",
      dataType: "xml",
      success: function(data) {
      	var fullcount = $(data).find('fullcount').text();
      	var entries = $(data).find('entry');
      	var lengthEntry = entries.length;
      	var html = "";
      	for(var i = 0; i < lengthEntry; i ++) {
      		
      	}
      }
    });
});