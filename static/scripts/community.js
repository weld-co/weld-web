$(document).ready(function(){
  // Set initial page value to build first url
  var page = 2;
  // Set click trigger element
  var trigger = $('[data-load-more]');
  // Define the element to append repsonse to
  var container = $('[data-infinite-container]');

  trigger.click(function(e){
    // Build url with page variable
    var url = "./" + page;
    $.get(url, function(response) {
      // If no repsonse OR if response returns a title of "404"
      if (!response || $(response).filter('title').text() == "404") {
        trigger.html("<a class='important flipIn' href='http://eepurl.com/bgi3M1' target='_blank'>That’s it for now. Get Notified of updates!</a>");
      } else {
        container.append(response);
        history.pushState(null, null, url);
      }
    })
    // Advance page number variable
    .done(function(response) { page += 1 })
    // Throw error message if it fails
    .fail(function(response) { trigger.text("Oops. There was an error! Please refresh the page.") });
  });
});