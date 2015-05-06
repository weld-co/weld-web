$(document).ready(function() {

  // Add underline and click here to logo
  setTimeout(function() {
    $('.js-intro-1.expander').addClass('hover');
  }, 1500);
  
  // Click the logo to reveal second section, etc
  $('.js-intro-1').click(function() {
    $(this).replaceWith('<span class="js-intro-2">WELD is a <span class="expander">community</span>.</span>');

    $('.js-intro-2').click(function() {
      $(this).replaceWith('<span class="js-intro-3">WELD is a coworking</br>community of <span class="expander">innovators</span>.</span>');
        
      $('.js-intro-3').click(function() {
        $(this).replaceWith('<span class="js-intro-4">WELD is a coworking community of innovators—designers, photographers, illustrators, <span class="expander">entrepreneurs</span>, filmmakers, writers, musicians, and developers.</span>');
          
        $('.js-intro-4').click(function() {
          $(this).replaceWith('<span class="js-intro-5">WELD is a coworking community of innovators—designers, photographers, illustrators, entrepreneurs, filmmakers, writers, musicians, and developers—who <span class="expander">believe</span> in the value of shared space.</span>');
        
          $('.js-intro-5').click(function() {
            $(this).replaceWith('<span class="js-intro-6">WELD is a coworking community of innovators—designers, photographers, illustrators, entrepreneurs, filmmakers, writers, musicians, and developers—who believe in the value of shared space.<span class="tagline">We create better together.</span></span>');
          });
        });
      });
    });
  });
});
