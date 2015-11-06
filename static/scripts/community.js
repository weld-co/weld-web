// IMPORTANT: Make sure to update the totalPages
// array as new communty pages get added

// Set total number of pages available
var totalPages = [1,2];
// First page set by 0 index
var indexOfPage = 0

$(document).ready(function(){
  // Get initial content to load
  shuffle(totalPages);
  getContent();
  // On click, replace with url's content
  trigger.click(function(e) {
    getContent();
  });
});

// Click trigger element
var trigger = $('[data-load-more]');

// Shuffle order of possible pages
function shuffle(totalPages) {
  var currentIndex = totalPages.length, temporaryValue, randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = totalPages[currentIndex];
    totalPages[currentIndex] = totalPages[randomIndex];
    totalPages[randomIndex] = temporaryValue;
  }
  return totalPages;
};

// Get random content from the available pages
function getContent() {
  // Get pages from index of shuffled array
  var url = '/community/' + totalPages[indexOfPage];
  // console.log(indexOfPage +':'+ totalPages[indexOfPage]);
  // Define the element to append repsonse to
  var container = $('[data-infinite-container]');
  // Get content from external other pages
  $.get(url, function(response) {
    // If no repsonse OR if response returns a title of "404"
    // #TODO Test to see if page exists
    if (!response || $(response).filter('title').text() == ("404" || "WELD — 404")) {
      $('.modal').addClass('open');
    } else {
      // replace current content with response
      container.append(response);
    }
  })
  // Add 1 to indexOf page each time getContent is done
  .done(function(response) {
    indexOfPage = indexOfPage > totalPages.length ? 0 : indexOfPage + 1;
  })
  // #TODO Throw error message if it fails
  // container.html("<span class='fail-message row center half-vh important flipIn'>Dang, something ain't right. Please refresh.</span>");
  .fail(function(response) { $('.modal').addClass('open'); });
};
