$(document).ready(function() {
  $("#dallas, #nashville, #event, #studio").change(function() {
    if ($("#nashville").is(":checked") || $("#dallas").is(":checked")) {
      $(".nashville-amenities, .dallas-amenities").toggleClass("hidden");
    }
    if ($("#dallas").is(":checked") && $("#studio").is(":checked")) {
      $(".js-hide-studio-form").addClass("hidden");
      $(".dallas-studio-message").removeClass("hidden");
    } else {
      $(".js-hide-studio-form").removeClass("hidden");
      $(".dallas-studio-message").addClass("hidden");
    }
  });
});
