// Handle recommendation dismissals
document.addEventListener('DOMContentLoaded', function() {
  const dismissButtons = document.querySelectorAll('.rec-dismiss');

  dismissButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();

      const card = this.closest('.rec-card');
      if (card) {
        card.classList.add('dismissed');
      }
    });
  });
});
