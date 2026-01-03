# IC-NBITS 2026 Conference Website

A dynamic website for the **International Conference on Nation-Building through Innovation, Technology and Sustainability (IC-NBITS 2026)** built with Express.js and EJS templating.

**Conference Dates:** 13th-14th March, 2026  
**Organized by:** SIES College of Management Studies (SIESCOMS)

## Features

- **Modular Structure**: Header and footer are separated into reusable partials
- **Responsive Design**: Fully responsive with comprehensive media queries for different screen sizes
- **Express.js Backend**: Server-side rendering with EJS templates
- **Bootstrap 5**: Modern UI framework with custom styling
- **Dynamic Routing**: Easy to add new pages
- **Registration System**: Form submission with JSON and Excel export capabilities
- **Committee Member Profiles**: Display committee members with their photos
- **Interactive UI Elements**: Hover effects on email and address links
- **Multiple Conference Tracks**: Marketing, Finance, HR, Operations & SCM, IT, and General Management
- **Contact Information**: Integrated contact section with venue and email details

## Project Structure

```
Conference/
├── server.js              # Express server configuration
├── package.json           # Dependencies and scripts
├── data/                  # Data storage
│   ├── registrations.json # Registration data (JSON format)
│   └── registrations.xlsx # Registration data (Excel format)
├── utils/                 # Utility functions
│   └── excel.js          # Excel export functionality
├── views/                 # EJS templates
│   ├── index.ejs         # Main homepage with all sections
│   ├── layout.ejs        # Reusable layout template
│   ├── registration.ejs  # Registration page
│   └── partials/         # Reusable components
│       ├── head.ejs      # HTML head section
│       ├── header.ejs    # Navigation header
│       ├── footer.ejs    # Footer section
│       └── scripts.ejs   # JavaScript files
└── public/               # Static files
    ├── images/           # Conference images and committee photos
    │   ├── CAMPUS.jpg    # Campus image
    │   └── Dr.*.jpg/png  # Committee member photos
    ├── styles.css        # Custom styles
    └── script.js         # Custom JavaScript
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/igaryanthakur/Conference.git
cd Conference
```

2. Install dependencies:
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

## Website Sections

The homepage includes the following sections:

1. **Hero Section** - Conference title, dates, and call-to-action
2. **Highlights** - Event dates and venue information
3. **About** - Conference overview, focus areas, and goals
4. **Call for Papers** - Submission guidelines, tracks, and important dates
5. **Organizing Committee** - Committee members with photos
6. **Contact** - Venue and email contact information
7. **Registration** - Registration form and fee structure

## Conference Tracks

- **Marketing** - Consumer behavior, digital marketing, branding
- **Finance** - Sustainable finance, FinTech, corporate governance
- **Human Resources** - AI in HR, sustainable HRM, leadership
- **Operations & Supply Chain Management** - Digital transformation, circular economy
- **Information Technology** - Intelligent computing, enterprise applications
- **General Management** - Strategy, leadership, ESG principles

## Customization

### Styling

- **Brand Colors**: Defined in CSS variables (`--brand-blue`, `--accent`)
- **Committee Images**: Circular avatars with blue border (150px × 150px)
- **Hover Effects**: Email and address links change color on hover
- **Custom Styles**: Edit `public/styles.css`

### Content

- **Page Title**: Pass `title` in the render function
- **Header Links**: Edit `views/partials/header.ejs`
- **Footer Content**: Edit `views/partials/footer.ejs`
- **Main Content**: Edit `views/index.ejs`
- **JavaScript**: Edit `public/script.js`

### Adding Committee Member Images

1. Add image file to `public/images/` folder
2. Name the file exactly as the member's name (e.g., `Dr. Name.jpg`)
3. The image will automatically be styled with circular border and shadow

## Technologies Used

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **EJS** - Embedded JavaScript Templates
- **Bootstrap 5** - CSS framework
- **Bootstrap Icons** - Icon library
- **ExcelJS** - Excel file generation
- **Helmet** - Security middleware
- **Morgan** - HTTP request logger
- **Compression** - Response compression

## Registration System

The website includes a registration system that:
- Collects participant information
- Stores data in JSON format
- Exports data to Excel format
- Validates form inputs
- Supports multiple registration categories

## Quick Smoke Tests

After starting the server, verify the main pages respond with HTTP 200:

**PowerShell:**
```powershell
# start in background (detach) then test
Start-Process -NoNewWindow -FilePath node -ArgumentList server.js
Invoke-WebRequest -UseBasicParsing http://localhost:3000/ | Select-Object StatusCode
foreach ($p in '/','/registration') {
  try { $r = Invoke-WebRequest -UseBasicParsing "http://localhost:3000$p"; "$p -> $($r.StatusCode)" } catch { "$p -> ERROR" }
}
```

**Bash / Git Bash:**
```bash
# run dev (background) then test
npm run dev &>/dev/null &
for p in / /registration; do
  printf "%s -> " "$p"
  curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000"$p"
done
```

## Adding New Pages

1. Create a new EJS file in the `views/` directory (e.g., `views/about.ejs`)
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
   app.get("/about", (req, res) => {
     res.render("about", {
       title: "About - IC-NBITS 2026",
       pageTitle: "About",
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

## License

ISC

## Repository

GitHub: https://github.com/igaryanthakur/Conference.git
