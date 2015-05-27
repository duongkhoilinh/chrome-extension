$(document).ready(function() {
  var result;
  var currentFullCount = -1;
  var canvas = document.getElementById("canvas");
  var loggedInImage = document.getElementById('logged_in');
  var canvasContext = canvas.getContext("2d");
  var onOffSpeak = localStorage.onOffSpeak;

  getData();
  refresh();

  chrome.alarms.onAlarm.addListener(function(alarm) {
    getData();
  });

  chrome.notifications.onClicked.addListener(function() {
    chrome.tabs.create({url:"https://mail.google.com/"});
    chrome.tts.stop();
  });

  chrome.notifications.onClosed.addListener(function() {
    chrome.tts.stop();
  });

  function getData() {
    $.ajax({
      url: "https://mail.google.com/mail/feed/atom",
      dataType: "xml"
    }).done(function(data) {
      $('#logged_in').attr('src','images/gmail_logged_in.png');
      result = $(data).find('fullcount').text();
      if (result != 0) {
        setIcon(result);
        if (currentFullCount == -1) {
          createNotications('','You have ' + result + ' unread emails');
          currentFullCount = result;
          if(onOffSpeak == 'on')
            chrome.tts.speak('You have ' + result + ' unread emails',{'rate': 1});
        } else {
          if (result > currentFullCount) {
            var iNameAuthor = $(data).find('entry:nth-child(6) author name').text();
            var iTitle = $(data).find('entry:nth-child(6) title').text();
            var iSummary = $(data).find('entry:nth-child(6) summary').text();
            createNotications(iNameAuthor + ' - ' + iTitle, iSummary);
            if(onOffSpeak == 'on') {
              chrome.tts.speak('You have a new email from' + iNameAuthor);
              // chrome.tts.speak('Please, click on notification to read it.', {'enqueue': true});
            }
          } else if (result < currentFullCount) {
            createNotications('','You still ' + result + ' unread emails');
            if(onOffSpeak == 'on')
              chrome.tts.speak('You still ' + result + ' unread emails');
          }
          currentFullCount = result;    
        }
      } else { 
        $('#logged_in').attr('src','images/gmail_not_logged_in.png');
      }
    }).fail(function() {
      $('#logged_in').attr('src','images/gmail_not_logged_in.png');
      result="";
      setIcon(result);
    });
  }

  function setIcon(fullcount) {
    canvasContext.fillStyle = "white";
    canvasContext.fillRect(25,25,120,100);
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
        canvasContext.drawImage(loggedInImage,0, 0);
    canvasContext.fillStyle = "red";
    if(fullcount <= 9)
      canvasContext.fillText(fullcount,12,19);
    else {
      if(fullcount <= 99)
        canvasContext.fillText(fullcount,8,19);
      else {
        if(fullcount <= 999)
        canvasContext.fillText(fullcount,1,19);
      }
    }
    chrome.browserAction.setIcon({imageData:canvasContext.getImageData(0, 0, canvas.width,canvas.height)
    });
  }

  function refresh() {
    chrome.alarms.create('refresh', {periodInMinutes: 0.1});
  }

  function createNotications(title,message) {
    var opt = {
      type: "basic",
      title: title,
      message: message,
      priority: 1,
      iconUrl:'../images/icon_128.png'
    }
    var random = Math.floor((Math.random() * 1000) + 1);
    var id = random.toString();
    chrome.notifications.create(id, opt, function() {
      setTimeout(function() {
        chrome.notifications.clear(id, function(){});
      },10000)
    });
  }
});

