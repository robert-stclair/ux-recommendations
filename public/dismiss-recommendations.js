// Handle recommendation dismissals and expandable content
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

  // Handle "Tell me more" toggle
  const tellMeMoreLinks = document.querySelectorAll('.rec-tell-me-more');

  tellMeMoreLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();

      const index = this.getAttribute('data-rec-index');
      const expandedContent = document.querySelector(`.rec-expanded-content[data-rec-index="${index}"]`);

      if (expandedContent) {
        const isExpanded = expandedContent.classList.contains('expanded');

        if (!isExpanded) {
          // Show expanded content with transition
          expandedContent.classList.add('expanded');
          this.style.display = 'none'; // Hide "Tell me more"
        }
      }
    });
  });

  // Handle "Show less" toggle
  const showLessLinks = document.querySelectorAll('.rec-show-less');

  showLessLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();

      const index = this.getAttribute('data-rec-index');
      const expandedContent = document.querySelector(`.rec-expanded-content[data-rec-index="${index}"]`);
      const tellMeMoreLink = document.querySelector(`.rec-tell-me-more[data-rec-index="${index}"]`);

      if (expandedContent) {
        // Hide expanded content with transition
        expandedContent.classList.remove('expanded');

        if (tellMeMoreLink) {
          tellMeMoreLink.style.display = 'inline-block'; // Show "Tell me more"
        }
      }
    });
  });
});
