# Scripts

## Fetch race meetings (HKJC GraphQL)

Fetches race meetings and horses from the Hong Kong Jockey Club API.

### Setup

```bash
cd scripts
pip install -r requirements.txt
```

### Usage

```bash
# Default: today’s date, venue HV (Happy Valley)
python fetch_race_meetings.py

# Specific date and venue
python fetch_race_meetings.py --date 2026-02-25 --venue HV

# Venue ST = Sha Tin; omit --venue to get all venues for the date
python fetch_race_meetings.py --date 2026-02-26 --venue ST

# Save to file (minified)
python fetch_race_meetings.py --date 2026-02-25 --venue HV --out result.json

# Pretty-print to stdout
python fetch_race_meetings.py --date 2026-02-25 --venue HV --pretty
```

### Response shape

- `data.timeOffset` – server time offset
- `data.activeMeetings` – active meetings summary
- `data.raceMeetings` – full meeting(s) with `races[].runners` (horses, jockeys, trainers, odds, etc.)

Use `fetch_race_meetings(date, venue_code)` in your own code for integration with FastAPI or cron jobs.
