$(document).ready(function() {

  var desk = $('[data-js="desk-toggle"]');
  var office = $('[data-js="office-toggle"]');
  
  var baseTarget = $('.base-cost');
  var startingAt = $('.starting-at');
  var baseCost = parseInt(baseTarget.text());
  var deskCost = baseCost + parseInt($('.desk-cost').text());
  var officeCost = baseCost + parseInt($('.office-cost').text());
  var applyButton = $('[data-js="button-text"]');

  function changeEffect() {
    $('.tier-price-primary').toggleClass('flipIn');
  } 

  function resetButton() {
    applyButton.text('Apply For Membership');
  }

  desk.click(function() {
    $(this).toggleClass('button-grey add button added');
    office.removeClass('button added').addClass('button-grey add');
    changeEffect();
    if ($(this).hasClass('added')) {
      startingAt.text('');
      baseTarget.text(deskCost);
      applyButton.text('Apply For Membership + Desk');
    } else {
      baseTarget.text(baseCost);
      resetButton();
    }
  });

  office.click(function() {
    $(this).toggleClass('button-grey add button added');
    desk.removeClass('button added').addClass('button-grey add');
    changeEffect();
    if ($(this).hasClass('added')) {
      startingAt.text('Starting at ');
      baseTarget.text(officeCost);
      applyButton.text('Apply For Membership + Office');
    } else {
      startingAt.text('');
      baseTarget.text(baseCost);
      resetButton();
    }
  });

});