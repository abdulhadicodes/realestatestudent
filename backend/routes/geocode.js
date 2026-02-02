const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/", async (req, res) => {
  const { location } = req.query;

  if (!location || typeof location !== "string") {
    return res.status(400).json({ error: "Location text is required." });
  }

  const apiKey = process.env.LOCATIONIQ_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: "LocationIQ API key is missing." });
  }

  try {
    const response = await axios.get("https://us1.locationiq.com/v1/search", {
      params: {
        key: apiKey,
        q: location,
        format: "json",
        limit: 1
      }
    });

    const [result] = response.data;

    if (!result) {
      return res.status(404).json({ error: "No results found for that location." });
    }

    return res.json({
      lat: result.lat,
      lon: result.lon,
      displayName: result.display_name
    });
  } catch (error) {
    console.error("LocationIQ geocoding error:", error.response?.data || error.message);
    return res.status(500).json({
      error: "Failed to geocode location. Please try again later."
    });
  }
});

module.exports = router;
