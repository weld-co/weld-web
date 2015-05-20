$(document).keyup(function(e) {
  if (e.keyCode == 27) $('.modal').removeClass('open');
});

$(document).ready(function(){
  $('.modal-background').click(function() {
    $('.modal').removeClass('open');
  });
});