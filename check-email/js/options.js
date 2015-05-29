$(document).ready(function() {
  var onOffSpeak = localStorage.onOffSpeak;
  var checkStorage = localStorage.checkStorage;

  checkStorage = '';

  if(checkStorage.lenght < 0) {
    $('#control-speak').val('on');
    onOffSpeak = 'on';
  }
  else {
    $('#control-speak').val(onOffSpeak);
  }

  $('#control-speak').change(function() {
    localStorage.onOffSpeak = $(this).val();
  })

  $( "#container" ).tabs();
});