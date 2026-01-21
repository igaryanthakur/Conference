const express = require("express");
const path = require("path");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");

const app = express();
const PORT = process.env.PORT || 3000;

// Parse request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Basic security and performance middleware
app.disable("x-powered-by");
app.use(helmet());

// Content Security Policy: allow trusted CDNs and self. Adjust as needed.
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: [
        "'self'",
        "https://cdn.jsdelivr.net",
        "https://cdnjs.cloudflare.com",
        "'unsafe-inline'",
      ],
      styleSrc: [
        "'self'",
        "https://cdn.jsdelivr.net",
        "https://cdnjs.cloudflare.com",
        "'unsafe-inline'",
      ],
      imgSrc: ["'self'", "data:", "https:"],
      fontSrc: [
        "'self'",
        "https://cdn.jsdelivr.net",
        "https://cdnjs.cloudflare.com",
        "data:",
      ],
      connectSrc: [
        "'self'",
        "https://cdn.jsdelivr.net",
        "https://cdnjs.cloudflare.com",
      ],
      objectSrc: ["'none'"],
      frameAncestors: ["'none'"],
      baseUri: ["'self'"],
    },
  })
);
app.use(compression());

// Dev logging
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files from public directory with cache headers
app.use(
  express.static(path.join(__dirname, "public"), {
    maxAge: "7d",
  })
);

// Enable view caching in production
if (process.env.NODE_ENV === "production") {
  app.set("view cache", true);
}

// Routes
app.get("/", (req, res) => {
  res.render("index", {
    title: "IC‑NBITS 2026 - International Conference on Nation-Building",
    pageTitle: "Home",
  });
});

// About page
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About - IC‑NBITS 2026",
    pageTitle: "About",
  });
});

// Abstract page (renamed to Papers)
app.get("/papers", (req, res) => {
  res.render("papers", {
    title: "Call for Papers - IC‑NBITS 2026",
    pageTitle: "Papers",
  });
});

// Keep /abstract as fallback for backward compatibility
app.get("/abstract", (req, res) => {
  res.render("papers", {
    title: "Call for Papers - IC‑NBITS 2026",
    pageTitle: "Papers",
  });
});

// Committee page
app.get("/committee", (req, res) => {
  res.render("committee", {
    title: "Committee - IC‑NBITS 2026",
    pageTitle: "Committee",
  });
});


// Contact page
app.get("/contact", (req, res) => {
  res.render("contact", {
    title: "Contact Us - IC‑NBITS 2026",
    pageTitle: "Contact",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
