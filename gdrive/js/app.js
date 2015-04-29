$(document).ready(function() {
  $('#authorize-button').click(function() {
    getToken();
  })
  $('#authorize-button-2').click(function() {
    removeToken();
  })
});

function getToken() {
  chrome.identity.getAuthToken({'interactive': true}, function(token) {
    // chrome.identity.getAccounts(function(account) {
    //   console.log(account);
    // })
  console.log(token);
  return token;
  })

}

function removeToken() {
  var token = getToken();
  chrome.identity.removeCachedAuthToken({token: token}, function() {
    console.log('here' +token)
  })
}