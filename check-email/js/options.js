$(document).ready(function() {
  // Saves options to chrome.storage
  var onOffSpeak = localStorage.onOffSpeak;
  $('#control-speak').val(onOffSpeak);
  $('#control-speak').change(function() {
    localStorage.onOffSpeak = $(this).val();
  })
});