$(document).ready(function() {
  $('.ajax-submit').submit(function(e) {
    e.preventDefault();
    var $form = $(e.target);
    var $submit = $('input[type=submit]', $form);
    $.ajax({
      type: 'POST',
      url: $form.prop('action'),
      accept: { javascript: 'application/javascript' },
      data: $form.serialize(),
      cache: false,
      dataType: 'jsonp',
      contentType: "application/json; charset=utf-8",
      beforeSend: function() { $submit.attr('disabled', 'disabled'); },
      error: function(err) { alert("Uh oh. Something went wrong. Please resubmit your RSVP."); },
      success: function(data) {
        if (data.result != "success") {
          alert(data.msg);
        } else {
          $submit.attr('disabled', false);
          $('.modal').toggleClass('open');
        }
      }
    });
  });
});