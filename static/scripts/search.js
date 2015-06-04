$(document).ready(function() {
   $(document).on('tipue_search_started', function() {
      $('.search-form').addClass('active');
   });

   $('#tipue_search_input').tipuesearch({
      highlightEveryTerm: true,
      descriptiveWords: 50
   });
});