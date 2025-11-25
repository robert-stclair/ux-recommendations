const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Function to randomly select 5 recommendations
function getRandomRecommendations() {
  const recommendations = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'recommendations.json'), 'utf8')
  );

  // Shuffle array and take first 5
  const shuffled = [...recommendations].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 5);
}

// Function to generate recommendation HTML
function generateRecommendationHTML(recommendation, index) {
  return `<div class="rec-card" data-rec-index="${index}">
    <div class="rec-header">
      <div class="rec-icon">${recommendation.icon}</div>
      <button class="rec-dismiss" data-rec-index="${index}" aria-label="Dismiss recommendation">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 10L8.5 12.5L14 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>
    <h3 class="rec-title">${recommendation.title}</h3>
    <p class="rec-description">${recommendation.description}</p>
    <button class="rec-action">${recommendation.buttonText}</button>
  </div>`;
}

// Serve the main page with random recommendations (BEFORE static middleware)
app.get('/', (req, res) => {
  const htmlPath = path.join(__dirname, 'public', 'index.html');
  const settingsPanelPath = path.join(__dirname, 'public', 'settings-panel.html');

  let html = fs.readFileSync(htmlPath, 'utf8');
  const settingsPanel = fs.readFileSync(settingsPanelPath, 'utf8');

  // Check if smart guide is enabled (passed as query param from client)
  const smartGuideEnabled = req.query.smartGuide === 'true';

  let recommendationHTML = '';
  let index = 0;
  let allRecommendations = [];

  // Load regular recommendations
  const recommendations = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'recommendations.json'), 'utf8')
  );

  // If smart guide is enabled, add 3 smart guide recs to the regular 7
  if (smartGuideEnabled) {
    try {
      const smartGuideRecs = JSON.parse(
        fs.readFileSync(path.join(__dirname, 'smart-guide-recommendations.json'), 'utf8')
      );
      // Shuffle and take 3 smart guide recs
      const shuffledSmartGuide = [...smartGuideRecs].sort(() => Math.random() - 0.5);
      const selectedSmartGuide = shuffledSmartGuide.slice(0, 3);

      // Combine 3 smart guide + 7 regular (total 10)
      allRecommendations = [...selectedSmartGuide, ...recommendations];
    } catch (err) {
      console.log('No smart guide recommendations found');
      allRecommendations = recommendations;
    }
  } else {
    // Just show the 7 regular recommendations
    allRecommendations = recommendations;
  }

  // Show all recommendations (no shuffling or limiting at this level)
  recommendationHTML += allRecommendations.map((rec) => generateRecommendationHTML(rec, index++)).join('');

  // Replace the placeholder in the HTML
  html = html.replace('<!-- RECOMMENDATIONS_PLACEHOLDER -->', recommendationHTML);

  // Inject settings panel and scripts before closing body
  const scripts = `
${settingsPanel}
<script src="/settings-panel.js"></script>
<script src="/dismiss-recommendations.js"></script>
`;
  html = html.replace('</body>', scripts + '</body>');

  res.send(html);
});

// Serve static files from public directory (AFTER the root route)
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT}`);
});
