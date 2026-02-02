const express = require("express");
const axios = require("axios");

const Lead = require("../models/Lead");

const router = express.Router();

router.post("/", async (req, res) => {
  const { businessType, location, radius } = req.body;

  if (!businessType || !location || !radius) {
    return res.status(400).json({ error: "Business type, location, and radius are required." });
  }

  const apiKey = process.env.LOCATIONIQ_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: "LocationIQ API key is missing." });
  }

  try {
    const geoResponse = await axios.get("https://us1.locationiq.com/v1/search", {
      params: {
        key: apiKey,
        q: location,
        format: "json",
        limit: 1
      }
    });

    const [geoResult] = geoResponse.data;

    if (!geoResult) {
      return res.status(404).json({ error: "No results found for that location." });
    }

    const { lat, lon } = geoResult;

    const poiResponse = await axios.get("https://us1.locationiq.com/v1/nearby", {
      params: {
        key: apiKey,
        lat,
        lon,
        tag: businessType,
        radius,
        format: "json"
      }
    });

    const results = (poiResponse.data || []).map((item) => {
      const website = item.extratags?.website || item.extratags?.contact_website || null;
      const hasWebsite = Boolean(website && website.trim());

      return {
        name: item.name || item.display_name || "Unknown",
        category: item.type || businessType,
        address: item.address?.road
          ? `${item.address.road}, ${item.address.city || item.address.town || ""} ${item.address.state || ""}`.trim()
          : item.display_name,
        phone: item.extratags?.phone || item.extratags?.contact_phone || "",
        website: website ? website.trim() : null,
        hasWebsite,
        lat: item.lat,
        lon: item.lon
      };
    });

    if (process.env.MONGODB_URI) {
      await Lead.insertMany(
        results.map((lead) => ({
          ...lead,
          createdAt: new Date()
        })),
        { ordered: false }
      ).catch((error) => {
        console.warn("Lead insert warning:", error.message);
      });
    }

    return res.json({
      location: { lat, lon, displayName: geoResult.display_name },
      results
    });
  } catch (error) {
    console.error("LocationIQ search error:", error.response?.data || error.message);
    return res.status(500).json({
      error: "Failed to fetch businesses from LocationIQ. Please try again later."
    });
  }
});

module.exports = router;
