const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const geocodeRoutes = require("./routes/geocode");
const searchRoutes = require("./routes/searchBusinesses");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const { MONGODB_URI, PORT = 5000 } = process.env;

if (!MONGODB_URI) {
  console.warn("MONGODB_URI is not set. Lead persistence will fail without it.");
} else {
  mongoose
    .connect(MONGODB_URI)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.error("MongoDB connection error:", error);
    });
}

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/geocode", geocodeRoutes);
app.use("/api/search-businesses", searchRoutes);

app.listen(PORT, () => {
  console.log(`MapLeads Finder API running on port ${PORT}`);
});
