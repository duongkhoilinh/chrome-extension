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

	// Alarm
	setup();

	// Bookmarks
	dumpBookmarks();
	searchBookMark();
	$('#addBookMark').click(function() {
		$('.addBookMarkBox').show();
		$('#saveBookMark').show();
		$('#updateBookMark').hide()
		$('#idBookMark').prop('disabled', false);
		$('#indexBookMark').prop('disabled', false);
		$('.addBookMarkBox input').val('');
		window.print();

	});

	$('#saveBookMark').click(function() {
		createBookMark();
	});

	$('#updateBookMark').click(function() {
		var id = $(this).parent().attr('id');
		var title = $('#titleBookMark').val();
		var url = $('#urlBookMark').val();
		idInt = id.substr(4,2);
		console.log(idInt,title,url);
		chrome.bookmarks.update(idInt, {title,url}, function() {
			$('#bookmarks > ul').empty();
		});
	})

	$('.btn-cancel').click(function() {
		// $('.addBookMarkBox input').val('');
		$(this).parent().hide();
	});

	// Browser Action
	$('#getTitle').click(function() {
		chrome.browserAction.setTitle({title:"Hello World!"});
		chrome.browserAction.getTitle({},function(title) {
			console.log(title);
		})
	});
});

// Alarm
function createAlarm() {
	chrome.alarms.create("myAlarm", {delayInMinutes: 0.1, periodInMinutes: 0.1});
	// window.close();
	console.log('on')
}
function clearAlarm() {
	chrome.alarms.clear("myAlarm");
	// window.close();
	console.log('off')
}
function getAlarm() {
	chrome.alarms.get("myAlarm",function(alarm){
		chrome.alarms.create("myAlarm", {delayInMinutes: 1, periodInMinutes: 1});
		// window.close();
	})
}
function setup() {
	$("#alarmOn").click(function() {
		createAlarm();
	})
	$("#alarmOff").click(function() {
		clearAlarm();
	})
	$('#alarmGet').click(function() {
		getAlarm()
	})
}

// Bookmarks
function dumpBookmarks() {
  	var bookmarkTreeNodes = chrome.bookmarks.getTree(
    function(bookmarkTreeNodes) {
      	$('#bookmarks').append(dumpTreeNodes(bookmarkTreeNodes));
      	deleteBookMark();
      	editBookMark();
    });
}

function dumpTreeNodes(bookmarkTreeNodes) {
	var list = $('<ul>');
	var i, j;
	var bookmarksBar = bookmarkTreeNodes[0].children[0].children;
	console.log(bookmarksBar);
	for(i = 0; i < bookmarksBar.length; i++) {
		if(bookmarksBar[i].children) {
			var sub = $('<ul id="sub-'+i+'">')
			sub.append('<span>'+bookmarksBar[i].title+'</span>');
			var bookmarksBarSub = bookmarksBar[i].children;
			var class_sub = $('<div class="list-bookmarks-sub">');
			for(j = 0; j < bookmarksBarSub.length; j++) {
				class_sub.append('<li id="'+bookmarksBarSub[j].id+'"><a href="'+bookmarksBarSub[j].url+'"target="_blank">'+bookmarksBarSub[j].title+'</a><i class="deleteBookMark">Delete</i><i class="editBookMark">Edit</i></li>')
			}
			class_sub.append('</div>')
			sub.append(class_sub);
			list.append(sub);
			list.append('</ul>')
		}
		else
			list.append('<li id="'+bookmarksBar[i].id+'"><a href="'+bookmarksBar[i].url+'"target="_blank">'+bookmarksBar[i].title+'</a><i class="deleteBookMark">Delete</i><i class="editBookMark">Edit</i></li>')
	}
	list.append('</ul>');
	return list;
}

function searchBookMark() {
	$('#searchBookMark').on("keyup",function(){
		var g = $(this).val();
		$('#bookmarks a').each(function(){
			var valueBookMark = $(this).html();
			if(valueBookMark.indexOf(g)!=-1) {
				$(this).parent().show();
			}
			else {
				$(this).parent().hide();
			}
		})
	})
}

function deleteBookMark() {
	$('li .deleteBookMark').click(function() {
	  	var valId = $(this).parent().attr('id');
	  	console.log(valId);
	  	chrome.bookmarks.remove(valId, function(){
	  		$('#bookmarks > ul').empty();
	  	});
	});
}

function editBookMark() {
	$('li .editBookMark').click(function() {
		$('.addBookMarkBox').show();
		$('#saveBookMark').hide();
		$('#updateBookMark').show();
		$('#idBookMark').prop('disabled', true);
		$('#indexBookMark').prop('disabled', true);
		var valId = $(this).parent().attr('id');
		var oldTitle = $('#'+valId+ ' a').html();
		var oldUrl = $('#'+valId+ ' a').attr('href');
		$('#titleBookMark').val(oldTitle);
		$('#urlBookMark').val(oldUrl);
		$('.addBookMarkBox').attr('id', 'box-'+valId);
	})
}

function createBookMark() {
	var parentId = $('#idBookMark').val();
	var index = parseInt($('#indexBookMark').val());
	var title = $('#titleBookMark').val();
	var url = $('#urlBookMark').val();
	console.log(parentId,index,title,url);
	chrome.bookmarks.create({parentId,index,title,url}, function() {
		$('#bookmarks > ul').empty();
	});
}















