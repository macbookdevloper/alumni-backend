require("dotenv").config();
const express = require("express");
const cors = require("cors");
const databaseConnection = require("../src/config/DBConnection");
const adminRoutes = require("../src/routes/admin");
const alumniRoutes = require("../src/routes/alumniRoutes");
const app = express();
const PORT = process.env.PORT || 8080;

// Setup CORS
app.use(cors({
  origin: process.env.CORS_ORIGIN,
}));

// Setup JSON and URL-encoded middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static("public"));

// Use routes
app.use("/v1", adminRoutes);
app.use("/v2", alumniRoutes);

// Connect to the database and start the server
databaseConnection().then(() => {
  app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
  });
});
