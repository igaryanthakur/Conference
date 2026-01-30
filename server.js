/**
 * IC-NBITS 2026 Conference Website Server
 * Express.js server configuration for the conference website
 */

// Core dependencies
const express = require("express");
const path = require("path");
const helmet = require("helmet"); // Security headers middleware
const compression = require("compression"); // Response compression
const morgan = require("morgan"); // HTTP request logger

// Initialize Express application
const app = express();

// Server port configuration - uses environment variable or defaults to 3000
const PORT = process.env.PORT || 3000;

// ========================================
// MIDDLEWARE CONFIGURATION
// ========================================

// Parse JSON request bodies
app.use(express.json());

// Parse URL-encoded request bodies (for form submissions)
app.use(express.urlencoded({ extended: true }));


// ========================================
// SECURITY MIDDLEWARE
// ========================================

// Remove X-Powered-By header to hide server technology
app.disable("x-powered-by");

// Helmet.js - sets various HTTP headers for security
app.use(helmet());

// Content Security Policy (CSP) - restricts resource loading to prevent XSS attacks
// Allows trusted CDNs (Bootstrap, Font Awesome) and inline styles/scripts
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"], // Default source for all resource types
      scriptSrc: [
        "'self'",
        "https://cdn.jsdelivr.net", // Bootstrap JS
        "https://cdnjs.cloudflare.com", // Font Awesome
        "'unsafe-inline'", // Required for inline scripts
      ],
      styleSrc: [
        "'self'",
        "https://cdn.jsdelivr.net", // Bootstrap CSS
        "https://cdnjs.cloudflare.com", // Font Awesome CSS
        "'unsafe-inline'", // Required for inline styles
      ],
      imgSrc: ["'self'", "data:", "https:"], // Allow images from self, data URIs, and HTTPS
      fontSrc: [
        "'self'",
        "https://cdn.jsdelivr.net", // Bootstrap Icons fonts
        "https://cdnjs.cloudflare.com", // Font Awesome fonts
        "data:", // Data URIs for fonts
      ],
      connectSrc: [
        "'self'",
        "https://cdn.jsdelivr.net",
        "https://cdnjs.cloudflare.com",
      ],
      objectSrc: ["'none'"], // Block object, embed, and applet elements
      frameAncestors: ["'none'"], // Prevent page from being embedded in frames
      baseUri: ["'self'"], // Restrict base tag URLs
    },
  })
);

// Compression middleware - compresses response bodies for better performance
app.use(compression());

// ========================================
// LOGGING MIDDLEWARE
// ========================================

// Development logging - only enabled in non-production environments
// Logs HTTP requests in a concise format for debugging
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// ========================================
// VIEW ENGINE CONFIGURATION
// ========================================

// Set EJS (Embedded JavaScript) as the templating engine
app.set("view engine", "ejs");

// Set the directory where EJS templates are located
app.set("views", path.join(__dirname, "views"));

// ========================================
// STATIC FILES CONFIGURATION
// ========================================

// Serve static files (CSS, JS, images) from the public directory
// maxAge: 7 days - sets cache-control header for browser caching
app.use(
  express.static(path.join(__dirname, "public"), {
    maxAge: "7d",
  })
);

// ========================================
// PRODUCTION OPTIMIZATIONS
// ========================================

// Enable view caching in production for better performance
// Caches compiled EJS templates to avoid recompilation on each request
if (process.env.NODE_ENV === "production") {
  app.set("view cache", true);
}

// ========================================
// ROUTES
// ========================================

// Main route - Single-page application
// All content is rendered on the home page with anchor links
app.get("/", (req, res) => {
  res.render("index", {
    title: "IC‑NBITS 2026 - International Research Conference on Nation-Building",
    pageTitle: "Home",
  });
});

// ========================================
// ERROR HANDLING
// ========================================

// 404 Handler - redirect all unmatched routes to home page
// This is appropriate for a single-page application
app.use((req, res) => res.redirect(301, "/"));

// ========================================
// SERVER INITIALIZATION
// ========================================

// Start the Express server and listen on the configured port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
