chrome.alarms.onAlarm.addListener(function(alarm) {
  alert("Hello World!",alarm);
});
chrome.bookmarks.onRemoved.addListener(function() {
	// alert('Delete a bookmarks!')
	dumpBookmarks();
});
chrome.bookmarks.onCreated.addListener(function() {
	dumpBookmarks();
})
chrome.bookmarks.onChanged.addListener(function() {
	dumpBookmarks();
});