$(document).ready(function() {
  $('#js-countdown').countdown({
    until: new Date(2015, 5-1, 11),
    padZeroes: true,
    // The expanded texts for the counters 
    labels: ['Y ', 'M ', 'W ', 'D ', 'H ', 'M ', 'S '], 
    // The display texts for the counters if only one 
    labels1: ['Y ', 'M ', 'W ', 'D ', 'H ', 'M ', 'S '],
    // Text after counter
    description: 'until Nashville!'
  });
});