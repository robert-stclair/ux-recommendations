# Park Hyatt Sydney - Rooms & Rates Webapp

A Node.js webapp prototype for displaying hotel rooms and rates, based on the Park Hyatt Sydney website.

## Features

- Original CSS and styling preserved from the saved webpage
- Express.js server for serving static files
- Ready for Heroku deployment
- Fully editable HTML/CSS for prototyping

## Local Development

### Prerequisites

- Node.js 18.x or higher
- npm

### Installation

```bash
npm install
```

### Running Locally

```bash
npm start
```

Or for development with auto-reload:

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment to Heroku

### Prerequisites

- Heroku CLI installed
- Heroku account

### Steps

1. Login to Heroku:
```bash
heroku login
```

2. Create a new Heroku app:
```bash
heroku create your-app-name
```

3. Initialize git repository (if not already done):
```bash
git init
git add .
git commit -m "Initial commit"
```

4. Deploy to Heroku:
```bash
git push heroku main
```

Or if you're on master branch:
```bash
git push heroku master
```

5. Open your app:
```bash
heroku open
```

### Troubleshooting

View logs:
```bash
heroku logs --tail
```

## Project Structure

```
.
├── server.js                 # Express server
├── package.json             # Dependencies and scripts
├── Procfile                 # Heroku configuration
├── public/                  # Static files
│   ├── index.html          # Main page (original HTML)
│   └── Rooms and rates _ A Park Hyatt Sydney_files/  # Assets (CSS, JS, images)
├── ref/                     # Original saved webpage (reference)
└── README.md               # This file
```

## Editing the Page

The main HTML file is located at `public/index.html`. All the original CSS and JavaScript are preserved in the assets folder. You can edit the HTML directly to customize the content while maintaining the original styling.

## License

MIT
