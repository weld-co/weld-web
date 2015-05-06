$(document).ready(function() {

  // Trigger Click with Tab Key if Next button is visible
  $('body').keydown(function(event) {    
    if((event.metaKey || event.ctrlKey) && event.keyCode == 13) {
      // heck if Next button is visible
      if ($('[data-js="next"]').is(':visible')) {
        $('[data-js="next"]').trigger('click');
      }
    }
  });

  // Generate Steps within Form
  step = 0;

  // Update width of progress bar
  function progressUpdate() {    
    var progress = (step / $('.fs-form-item').length ) * 100 + '%';
    $('.fs-progress-bar').width(progress);
  };
  progressUpdate();

  // Next button steps progress bar and moves to next input
  $('[data-js="next"]').click(function() {

    // Show previous button after first step
    $('[data-js="prev"]').removeClass('disabled');

    // Increase step number by one
    step++;

    // Update width of progress bar
    progressUpdate();
    
    // Apply styles for current step and outgoing animation
    var current = $('.fs-form-item.current').toggleClass('current out');
    if(current.next('.fs-form-item') && current.next('.fs-form-item').length) {
      current.next('.fs-form-item').addClass('current');
    } else {
      // Apply Overview styles if no more steps exist
      $('.fs-form-item').removeClass('out');
      $('[data-js="overiew-toggle"]').toggleClass('fs-overview no-scroll');
      $('[data-js="message"]').removeClass('hidden');
      $('[data-js="next"], [data-js="prev"]').hide();
    };
  });

  // Previous button steps progress bar and moves to previous input
  $('[data-js="prev"]').click(function() {

    // Decrease step number by one
    step--;

    // Update width of progress bar
    progressUpdate();
    
    // Apply styles for current step and outgoing animation
    var current = $('.fs-form-item.current').removeClass('current');
    current.prev('.fs-form-item').toggleClass('current out');
  });

  // Add http:// to url inputs
  $('.fs-input[type="url"]').keyup(function() {
      if (!/^http([s]?):\/\//.test(this.value)) {
      this.value = "http://" + this.value;
    }
  });
});