$(document).ready(function() {
  $('#dallas, #nashville').change(function(){
    if ($('#nashville').is(':checked')) {
      $('.nashville-amenities').show();
      $('.dallas-amenities').hide();
    } else if ($('#dallas').is(':checked')) {
      $('.dallas-amenities').show();
      $('.nashville-amenities').hide();
    }
  });
});