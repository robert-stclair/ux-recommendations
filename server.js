const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve the main page with recommendations panel (BEFORE static middleware)
app.get('/', (_req, res) => {
  const htmlPath = path.join(__dirname, 'public', 'index.html');
  const settingsPanelPath = path.join(__dirname, 'public', 'settings-panel.html');
  const recommendationsPanelPath = path.join(__dirname, 'public', 'recommendations-panel-complete.html');

  let html = fs.readFileSync(htmlPath, 'utf8');
  const settingsPanel = fs.readFileSync(settingsPanelPath, 'utf8');
  const recommendationsPanel = fs.readFileSync(recommendationsPanelPath, 'utf8');

  // Replace the placeholder with the complete recommendations panel (cards are now loaded client-side)
  html = html.replace('<!-- RECOMMENDATIONS_PLACEHOLDER -->', recommendationsPanel);

  // Inject settings panel and script before closing body
  const scripts = `
${settingsPanel}
<script src="/settings-panel.js"></script>
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
