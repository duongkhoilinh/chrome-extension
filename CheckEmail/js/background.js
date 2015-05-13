$(document).ready(function() {
  var result;
  var canvas = document.getElementById("canvas");
  var loggedInImage = document.getElementById('logged_in');
  var canvasContext = canvas.getContext("2d");

  getData();
  refresh();

  chrome.alarms.onAlarm.addListener(function(alarm) {
    getData();
  });

  function getData() {
    $.ajax({
      url: "https://mail.google.com/mail/feed/atom",
      dataType: "xml"
    }).done(function(data) {
      $('#logged_in').attr('src','images/gmail_logged_in.png');
      result = $(data).find('fullcount').text();
      if(result!=0)
        setIcon(result);
      else 
        $('#logged_in').attr('src','images/gmail_not_logged_in.png');
    }).fail(function() {
      $('#logged_in').attr('src','images/gmail_not_logged_in.png');
      result="";
      setIcon(result);
    })
  }

  function setIcon(fullcount) {
    canvasContext.fillStyle = "white";
    canvasContext.fillRect(25,25,120,100);
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
        canvasContext.drawImage(loggedInImage,0, 0);
    canvasContext.fillStyle = "red";
    canvasContext.fillText(fullcount,6,19);
    chrome.browserAction.setIcon({imageData:canvasContext.getImageData(0, 0, canvas.width,canvas.height)
    });
  }

  function refresh() {
    chrome.alarms.create('refresh', {periodInMinutes: 0.01});
  }

});

