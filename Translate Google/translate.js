// chrome.browserAction.onClicked.addListener(function(tab) {
// 	var hello = "hello";
// 	var translate = "https://translate.google.com/#auto/vi/"
// 	url = translate+hello;
// 	chrome.tabs.create({url});
// });

// chrome.browserAction.onClicked.addListener(function(tab) {
//   // No tabs or host permissions needed!
//   	var newColor = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
//   	chrome.tabs.executeScript({
// 	    	code: 'document.body.style.backgroundColor="'+newColor+'"'
// 	  	});
// });

$(document).ready(function() {
	$('#btn-translate').click(function() {
		var valTranslate = $('#valueWord').val();
		var from = $('#from').val();
		var to = $('#to').val();
		var url = 'https://translate.google.com/#'+from+'/'+to+'/'+valTranslate
		console.log(url);
		chrome.tabs.create({'url':url});
	});
});