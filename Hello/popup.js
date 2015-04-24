$(document).ready(function(){
	// console.log('here')
	// $.ajax({
	// 	url: "https://gmail.google.com/gmail/feed/atom"
	// }).done(function(data){
	// 	console.log(data);
	// 	// var json = $.xml2json(data);
	// 	// console.log(json);
	// 	$('#sign-in').html(data);
	// })
	setup();
	// getAlarm();
	dumpBookmarks();
	// $('#bookmarks span').click(function(){
	// 	$(this).parent().find('.list-bookmarks-sub').css({'display':'block'});
	// })
});

// Alarm
function createAlarm() {
	chrome.alarms.create("myAlarm", {delayInMinutes: 0.1, periodInMinutes: 0.1});
	window.close();
	console.log('on')
}
function clearAlarm() {
	chrome.alarms.clear("myAlarm");
	window.close();
	console.log('off')
}
function getAlarm() {
	chrome.alarms.get("myAlarm",function(alarm){
		chrome.alarms.create("myAlarm", {delayInMinutes: 1, periodInMinutes: 1});
		window.close();
	})
}
function setup() {
	$("#alarmOn").click(function() {
		createAlarm();
		console('abc')
	})
	$("#alarmOff").click(function() {
		clearAlarm();
	})
	$('#alarmGet').click(function() {
		getAlarm()
	})
}

// Bookmarks
function dumpBookmarks(query) {
  var bookmarkTreeNodes = chrome.bookmarks.getTree(
    function(bookmarkTreeNodes) {
      $('#bookmarks').append(dumpTreeNodes(bookmarkTreeNodes, query));
      // console.log(bookmarkTreeNodes[0].children[0])
    });
}

function dumpTreeNodes(bookmarkTreeNodes,query) {
	var list = $('<ul>');
	var i, j;
	var bookmarksBar = bookmarkTreeNodes[0].children[0].children;
	for(i = 0; i < bookmarksBar.length; i++) {
		if(bookmarksBar[i].children) {
			var sub = $('<ul id="sub-'+i+'">')
			sub.append('<span>'+bookmarksBar[i].title+'</span>');
			var bookmarksBarSub = bookmarksBar[i].children;
			var class_sub = $('<div class="list-bookmarks-sub">');
			for(j = 0; j < bookmarksBarSub.length; j++) {
				class_sub.append('<li>'+'<a href="'+bookmarksBarSub[j].url+'"target="_blank">'+bookmarksBarSub[j].title+'</a>'+'</li>')
			}
			class_sub.append('</div>')
			sub.append(class_sub);
			list.append(sub);
			list.append('</select>')
		}
		else
			list.append('<li><a href="'+bookmarksBar[i].url+'">'+bookmarksBar[i].title+'</a></li>')
	}
	list.append('</ul>');
	return list;
}

function dumpNode(bookmarkNode,query) {
	var anchor = $('<a>');
	anchor.attr('href', bookmarkNode.url);
	anchor.text(bookmarkNode.title);
}
















