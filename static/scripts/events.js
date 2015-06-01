$(document).ready(function() {
  // Submit Email Address to Mailhimp
  $('.ajax-submit').submit(function(e) {
    e.preventDefault();
    var $form = $(e.target);
    var $submit = $('input[type=submit]', $form);
    $.ajax({
      type: $form.prop('method'),
      url: $form.prop('action'),
      accept: { javascript: 'application/javascript' },
      data: $form.serialize(),
      cache: false,
      // JSONP needed to avoid CORS error
      dataType: 'jsonp',
      contentType: "application/json; charset=utf-8",
      beforeSend: function() { $submit.attr('disabled', 'disabled'); },
      error: function(err) {
        alert("Uh oh. Something went wrong. Please resubmit your RSVP.");
        $submit.attr('disabled', false);
      },
      success: function(data) {
        $submit.attr('disabled', false);
        if (data.result != "success") {
          alert(data.msg);
        } else {
          $('.modal').toggleClass('open');
        }
      }
    });
  });

  (function () {
    if (window.addtocalendar) if (typeof window.addtocalendar.start == "function")
      return;
    if (window.ifaddtocalendar == undefined) {
      window.ifaddtocalendar = 1;
      var d = document,
          s = d.createElement('script'),
          g = 'getElementsByTagName';
      s.type = 'text/javascript';
      s.charset = 'UTF-8';
      s.async = true;
      s.src = ('https:' == window.location.protocol ? 'https' : 'http') + '://addtocalendar.com/atc/1.5/atc.min.js';
      var h = d[g]('body')[0];h.appendChild(s);
    }
  })();
});