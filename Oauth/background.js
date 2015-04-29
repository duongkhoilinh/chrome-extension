var oauth = ChromeExOAuth.initBackgroundPage({
  'request_url': 'https://www.google.com/accounts/OAuthGetRequestToken',
  'authorize_url': 'https://www.google.com/accounts/OAuthAuthorizeToken',
  'access_url': 'https://www.google.com/accounts/OAuthGetAccessToken',
  'consumer_key': 'anonymous',
  'consumer_secret': 'anonymous',
  'scope': 'https://mail.google.com/',
  'app_name': 'Gmail'
});

var contacts = null;

function setIcon() {
  if(oauth.hasToken) {
    chrome.browserAction.setIcon({'path':'img/icon-19-on.png'})
  } 
  else {
    chrome.browserAction.setIcon({'path':'img/icon-19-off.png'})
  }
}

function onContacts(text, xhr) {
  contacts = [];
  var data = JSON.parse(text);
  for (var i, entry; entry = data.feed.entry[i]; i++) {
    var contact = {
      'name' : entry['title']['$t'],
      'id' : entry['id']['$t'],
      'emails' : []
    };

    if(entry['gd$emails']) {
      var emails = entry['gd$emails'];
      for (var j, email; email = emails[j]; j++) {
        contact['emails'].push(email['address']);
      }
    }

    if(!contact['name']) {
      contact['name'] = contact['name'][0] || "<Unknown>";
    }

    contacts.push(contact);
  }
  chrome.tabs.create({'url':'contacts.html'});
};

function getContact() {
  oauth.authorize(function() {
    console.log("on authorize");
    setIcon();
    var url = "http://www.google.com/m8/feeds/contacts/default/full";
    oauth.sendSignedRequest(url, onContacts, {
      'parameters' : {
        'alt' : 'json',
        'max-results' : 100
      }
    });
  });
};

function logout() {
  oauth.clearTokens();
  setIcon();
};

setIcon();
chrome.browserAction.onClicked.addListener(getContact);














