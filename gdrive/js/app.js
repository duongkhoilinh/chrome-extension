$(document).ready(function() {
  $('#authorize-button').click(function() {
    signIn();
  })
  $('#authorize-button-2').click(function() {
    removeToken();
  })
  $('#getInfo').click(function() {
    getInfo(true);
  })
});

function withAuth(url,interactive,callback) {
  var access_token;

  getToken();

  function getToken() {
    chrome.identity.getAuthToken({'interactive': true}, function(token) {
      access_token = token;

      requestStart();
    })
  }

  function requestStart() {
    $.ajax({
      url:url,
      beforeSend: function(header) {
        header.setRequestHeader('Authorization', 'Bearer ' + access_token)
      }
    }).done(function(data) {
      // requestComplete();
      console.log('data' +data);
    })
  }

  function requestComplete() {
    if (this.status == 401) {
      chrome.identity.removeCachedAuthToken({ token: access_token },
                                            getToken);
    } else {
      callback(null, this.status, this.response);
    }
  }
}

function getInfo(interactive) {
  withAuth('https://www.googleapis.com/plus/v1/people/me',interactive,onUserInfo);
}

function onUserInfo(error, status, response) {
    if (!error && status == 200) {
      // sampleSupport.log(response);
      var user_info = JSON.parse(response);
      console.log(user_info)
      console.log(status);
    }
  }

function signIn() {
  chrome.identity.getAuthToken({ 'interactive': true }, function(token) {
    console.log(token);
  });
}


function removeToken() {
  chrome.identity.getAuthToken({'interactive': false}, function(current_token) {
    if (!chrome.runtime.lastError) {
      chrome.identity.removeCachedAuthToken({token:current_token}, function () {});
      $.ajax({
        url:'https://accounts.google.com/o/oauth2/revoke?token=' + current_token
      }).done(function() {
        alert("Removed Token");
      });
    }
  })
}