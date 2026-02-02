# MapLeads Finder

MapLeads Finder is a full-stack SaaS starter that helps freelancers discover local business leads using LocationIQ. It geocodes a plain-text location, fetches nearby POIs, and highlights businesses without a website.

## Tech Stack

- **Frontend:** React (JSX) + Tailwind CSS
- **Backend:** Node.js + Express
- **Database:** MongoDB (Mongoose)
- **Location Provider:** LocationIQ (OpenStreetMap)

## Required Data Flow (Critical)

1. The user submits **plain-text** location input (e.g. "Denver").
2. The backend converts the text into **latitude/longitude** using the LocationIQ Search API.
3. The backend uses the lat/lon values to query LocationIQ Nearby / POI.

✅ Do **not** treat the location text as an object.
✅ Do **not** call `.get()` on strings.

## Backend Setup

```bash
cd backend
npm install
cp ../.env.example .env
npm run dev
```

### API Routes

- `GET /api/geocode?location=Denver`
  - Returns latitude/longitude for a plain-text location.
- `POST /api/search-businesses`
  - Body:
    ```json
    {
      "businessType": "coffee",
      "location": "Denver",
      "radius": 1000
    }
    ```
  - Returns nearby businesses + lead metadata.

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The React UI includes:

- `SearchForm` with business type, location, radius, search button.
- `ResultsTable` with has-website badges.
- Client-side filters for category + "no website only" toggle.
- CSV export button.

## MongoDB Schema

Leads are stored with the following schema:

- `name` (String)
- `category` (String)
- `address` (String)
- `phone` (String)
- `website` (String | null)
- `hasWebsite` (Boolean)
- `lat` (String)
- `lon` (String)
- `createdAt` (Date)

## Environment Variables

See `.env.example` for required keys.

- `LOCATIONIQ_API_KEY`
- `MONGODB_URI`
- `PORT`

## Notes

- Use LocationIQ APIs only (no scraping).
- Errors are handled with clear messages and try/catch blocks.
- Add rate limiting if you expect heavy usage.
