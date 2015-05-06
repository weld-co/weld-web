$(document).ready(function(){
  $(window).keydown(function(event){
    if(event.keyCode == 13) {
      event.preventDefault();
      return false;
    }
  });
  $('.js-password').keyup(function(event) {
    if ($(this).val() === 'wecreateweld') {
      $('.js-protected').fadeOut(function() {
        $('section').fadeIn();
      });
    }
  });
});
