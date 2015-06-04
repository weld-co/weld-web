$(document).ready(function() {
  $('.nav-link').click(function (e) {
    e.preventDefault();
    // store anchor href
    var navLink = this.getAttribute("href");
    // Delay link clicks to show click animation
    setTimeout(function(){
      window.location = navLink;
    }, 150);
  });
});