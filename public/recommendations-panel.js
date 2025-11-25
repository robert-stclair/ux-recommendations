// Prevent console.clear from clearing our debug logs
const originalClear = console.clear;
console.clear = function() {
  console.log('console.clear() was blocked to preserve debug logs');
};

console.log('recommendations-panel.js loaded');

$(document).ready(function() {
  console.log('jQuery ready, $ is:', typeof $);
  console.log('Close button found:', $('.pp-side-panel__close').length);
  console.log('Badge found:', $('.recommended-badge').length);

  const panel = $('.pp-side-panel')[0];
  const badge = $('.recommended-badge')[0];

  if (panel) {
    console.log('Panel element:', panel);
    console.log('Panel display:', window.getComputedStyle(panel).display);
    console.log('Panel position:', window.getComputedStyle(panel).position);
    console.log('Panel visibility:', window.getComputedStyle(panel).visibility);
  }

  if (badge) {
    console.log('Badge display:', window.getComputedStyle(badge).display);
  }

  function toggleRecommendations() {
    console.log('Toggle called!');
    $('.pp-side-panel').toggleClass('hidden');
    $('.recommended-badge').toggleClass('visible');
  }

  $('.pp-side-panel__close').on('click', function(e) {
    console.log('Close button clicked!');
    toggleRecommendations();
  });

  $('.recommended-badge').on('click', function(e) {
    console.log('Badge clicked!');
    toggleRecommendations();
  });
});
