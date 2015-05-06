$(document).ready(function() {
  $('.next-button, .prev-button').click(function() {
    var $this = $(this); // storing $(this)
    $this.addClass('isLoading');
    $this.data('initialText', $this.text());
    $this.html('<span class="loader"></span>');
    setTimeout(function() {
      $this.text($this.data('initialText'));
      $this.removeClass('isLoading');
    }, 750);
  });
});