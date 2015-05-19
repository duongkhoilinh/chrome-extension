$(document).ready(function() {
  var result;
  var currentFullCount = -1;
  var canvas = document.getElementById("canvas");
  var loggedInImage = document.getElementById('logged_in');
  var canvasContext = canvas.getContext("2d");

  getData();
  refresh();

  chrome.alarms.onAlarm.addListener(function(alarm) {
    getData();
  });

  chrome.notifications.onClicked.addListener(function() {
    chrome.tabs.create({url:"https://mail.google.com/"});
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
          createNotications('You have ' + result + ' unread emails','');
          currentFullCount = result;
        } else {
          if (result > currentFullCount) {
            var iNameAuthor = $(data).find('entry author name')[0].text();
            var iTitle = $(data).find('entry title')[0].text();
            createNotications('You 1 new email', iTitle);
          } else if (result < currentFullCount) {
            createNotications('You still ' + result + ' unread emails','');
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
    canvasContext.fillText(fullcount,8,19);
    chrome.browserAction.setIcon({imageData:canvasContext.getImageData(0, 0, canvas.width,canvas.height)
    });
  }

  function refresh() {
    chrome.alarms.create('refresh', {periodInMinutes: 0.01});
  }

  function createNotications(title,message) {
    var opt = {
      type: "basic",
      title: title,
      message: message,
      priority: 2,
      iconUrl:'../images/icon_128.png'
    }
    var random = Math.floor((Math.random() * 1000) + 1);
    // var id = random.toString();
    var id = '1';
    chrome.notifications.create(id, opt, function(id) {
      // alert(id);
      // chrome.notifications.clear(id);
      setTimeout(function() {
        // chrome.notifications.clear(id);
      },1000)
    });
  }
});

