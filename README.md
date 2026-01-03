# CPCON 2026 Conference Website

A dynamic website for the International Conference on Clinical Pharmacy built with Express.js and EJS templating.

## Features

- **Modular Structure**: Header and footer are separated into reusable partials
- **Responsive Design**: Fully responsive with comprehensive media queries
- **Express.js Backend**: Server-side rendering with EJS templates
- **Bootstrap 5**: Modern UI framework
- **Dynamic Routing**: Easy to add new pages

## Project Structure

```
Conference/
├── server.js              # Express server configuration
├── package.json           # Dependencies and scripts
├── views/                 # EJS templates
│   ├── index.ejs         # Home page
│   ├── layout.ejs        # Reusable layout template
│   └── partials/         # Reusable components
│       ├── head.ejs      # HTML head section
│       ├── header.ejs    # Navigation header
│       ├── footer.ejs    # Footer section
│       └── scripts.ejs   # JavaScript files
├── public/                # Static files
│   ├── styles.css        # Custom styles
│   └── script.js         # Custom JavaScript
└── index.html            # Original HTML (can be removed)

```

## Installation

1. Install dependencies:

```bash
npm install
```

## Running the Server

### Development Mode (with auto-reload):

```bash
npm run dev
```

### Production Mode:

```bash
npm start
```

The server will run on `http://localhost:3000`

## Quick Smoke Tests

After starting the server, verify the main pages respond with HTTP 200 using these commands.

PowerShell

```
# start in background (detach) then test
Start-Process -NoNewWindow -FilePath node -ArgumentList server.js
Invoke-WebRequest -UseBasicParsing http://localhost:3000/ | Select-Object StatusCode
foreach ($p in '/about','/papers','/committee','/registration','/contact') {
  try { $r = Invoke-WebRequest -UseBasicParsing "http://localhost:3000$p"; "$p -> $($r.StatusCode)" } catch { "$p -> ERROR" }
}
```

Bash / Git Bash

```
# run dev (background) then test
npm run dev &>/dev/null &
for p in / /about /papers /committee /registration /contact; do
  printf "%s -> " "$p"
  curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000"$p"
done
```

## Adding New Pages

1. Create a new EJS file in the `views/` directory (e.g., `views/abstract.ejs`)
2. Use the layout template or include partials:
   ```ejs
   <%- include('partials/head') %>
   <body>
     <%- include('partials/header') %>
     <!-- Your page content here -->
     <%- include('partials/footer') %>
     <%- include('partials/scripts') %>
   </body>
   ```
3. Add a route in `server.js`:
   ```javascript
   app.get("/abstract", (req, res) => {
     res.render("abstract", {
       title: "Abstract Submission - CPCON 2026",
       pageTitle: "Abstract",
     });
   });
   ```

## Using Partials

### Header

```ejs
<%- include('partials/header') %>
```

### Footer

```ejs
<%- include('partials/footer') %>
```

### Head Section

```ejs
<%- include('partials/head') %>
```

### Scripts

```ejs
<%- include('partials/scripts') %>
```

## Customization

- **Page Title**: Pass `title` in the render function
- **Header Links**: Edit `views/partials/header.ejs`
- **Footer Content**: Edit `views/partials/footer.ejs`
- **Styles**: Edit `public/styles.css`
- **JavaScript**: Edit `public/script.js`

## Technologies Used

- Node.js
- Express.js
- EJS (Embedded JavaScript Templates)
- Bootstrap 5
- Bootstrap Icons
- Font Awesome
