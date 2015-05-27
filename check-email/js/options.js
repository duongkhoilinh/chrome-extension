$(document).ready(function() {
  // Saves options to chrome.storage
  var onOffSpeak = localStorage.onOffSpeak;
  localStorage.onOffSpeak = 'on';
  if(localStorage.length == 0) {
  	$('#control-speak').val('on');
  }
  else {
  	$('#control-speak').val(onOffSpeak);
  }
  $('#control-speak').change(function() {
    localStorage.onOffSpeak = $(this).val();
  })
});