$(document).ready(function() {
  $('.button, .button-secondary').click(function() {
    $(this).html('<span class="loader"></span>');
  });
});