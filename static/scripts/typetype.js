$(document).ready(function() {
  // Get TypeType Element
  var $elem = $('.js-typetype');
  // Pull content from data attr
  var content = $elem.attr("data-typetype-text");

  function setCookie() {
    setTimeout(function() {
      $.cookie('hasSeenTyping', 'true', { expires: 60 });
    }, 500)
  };

  setCookie();

  // If already seen, don't animate and show CTA
  if ($.cookie('hasSeenTyping') === 'true') {
    // Fill Element with content & fade in
    $elem.text(content);
    $('.main-cta').toggleClass('opacity-0 opacity-1');
  } else {
    $elem.typetype(content, {
      e: 0.01, // error rate
      t: 50, // typing rate
      callback: function () {
        $('.main-cta').toggleClass('opacity-0 opacity-1');
      }
    })
  };
  // Used for dev puposes to delete cookie
  $('.logo').click(function() {
    $.removeCookie('hasSeenTyping');
  });
});
