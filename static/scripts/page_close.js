$(document).ready(function(){
  $('.page-close').click(function() {
    // If coming from outside our domain, page close goes to homepage
    // take referring url, split at slash, traverse output array to get domain
    if (document.referrer.split( '/' )[2] != window.location.host) {
      window.location = '/';
    // If coming from inside our domain, go to previous page
    } else {
      history.back();
      return false;
    }
  });
});