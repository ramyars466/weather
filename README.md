# 🌤️ Weather Intelligence Platform
A real-time weather forecasting application that provides current weather conditions and 5-day hourly forecasts for 45+ Indian cities. Built with React, FastAPI, and OpenWeatherMap API.
![Weather Dashboard](https://via.placeholder.com/800x400?text=Weather+Intelligence+Dashboard)
## ✨ Features
- 🌡️ **Real-time Temperature** - Live temperature data for each city
- 💧 **Humidity Tracking** - Current humidity levels
- 💨 **Wind Speed** - Live wind speed updates
- 📊 **Interactive Charts** - Temperature and humidity forecast visualization
- 🗓️ **5-Day Hourly Forecast** - Detailed hourly predictions
- 🌙 **Weather Conditions** - Cloudy, clear, rain, etc.
- 🔄 **45+ Indian Cities** - Comprehensive city coverage
## 🏗️ Tech Stack
| Frontend | Backend | API |
|----------|---------|-----|
| React 18 | FastAPI | OpenWeatherMap |
| Vite | Uvicorn | httpx |
| Recharts | Python | |
| TailwindCSS | | |
## 📋 Prerequisites
- Node.js 18+
- Python 3.9+
- OpenWeatherMap API Key (free)

## 📁 Project Structure
```
weather/
├── backend/
│   ├── main.py          # FastAPI backend server
│   ├── requirements.txt # Python dependencies
│   └── Procfile       # Render deployment config
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   └── Dashboard.jsx   # Main weather dashboard
│   │   ├── components/
│   │   └── App.jsx
│   ├── .env           # Environment variables
│   ├── vite.config.js  # Vite configuration
│   └── package.json  # Node dependencies
├── .env              # Project environment variables
└── README.md
```
---
## 🌐 API Endpoints
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/refresh/{city_id}` | POST | Get weather + forecast |
| `/api/weather/current?city_id={id}` | GET | Get current weather |
| `/locations` | GET | List all cities |
### Example Response
```json
{
  "data": {
    "current": {
      "temperature": 33.5,
      "humidity": 30,
      "wind_speed": 32.4,
      "description": "few clouds",
      "confidence": 0.85
    },
    "forecast": [
      {
        "datetime": "2026-04-23 15:00:00",
        "temp": 33.0,
        "humidity": 28,
        "wind_speed": 35.0,
        "description": "scattered clouds"
      }
    ]
  }
}
```
---
## 🗺️ Supported Cities
| ID | City | ID | City |
|----|------|----|------|
| 1 | Bengaluru | 16 | Guwahati |
| 2 | Delhi | 17 | Chandigarh |
| 3 | Mumbai | 18 | Shimla |
| 4 | Chennai | 19 | Dehradun |
| 5 | Kolkata | 20 | Srinagar |
| 6 | Hyderabad | 21 | Jammu |
| 7 | Pune | 22 | Amritsar |
| 8 | Ahmedabad | 23 | Agra |
| 9 | Jaipur | 24 | Varanasi |
| 10 | Lucknow | 25 | Indore |
... and 20 more cities!

### Getting OpenWeatherMap API Key
1. Go to https://openweathermap.org/api
2. Sign up for free account
3. Navigate to "API Keys"
4. Copy your API key
5. Use in .env file
---
## 📱 Usage
1. **Select a City** from the dropdown
2. View **current weather** conditions
3. Check **temperature & humidity charts**
4. Review **5-day hourly forecast table**
## 📦 Project Setup

### Prerequisites

Ensure you have the following installed:

* Node.js (v16+ recommended)
* npm (Node Package Manager)
* Python (v3.8+)

---

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

---

### 2. Setup Frontend

```bash
cd frontend
npm install
```

---

### 3. Setup Backend

```bash
cd backend
pip install -r requirements.txt
```

---

## 🚀 Running the Application

Run frontend and backend in **separate terminals**.

---

### ▶️ Start Backend Server

```bash
cd backend
python main.py
```

Backend will run on:

```
http://127.0.0.1:5000
```

---

### ▶️ Start Frontend

```bash
cd frontend
npm run dev
```

Frontend will run on:

```
http://localhost:5173
```

---

## 🔗 API Configuration

Ensure the frontend points to the correct backend URL.

Example:

```js
const API_URL = "http://127.0.0.1:5000";
```

If using environment variables:

```bash
# frontend/.env
VITE_API_URL=http://127.0.0.1:5000
```

---

## ⚠️ Notes

* Run both frontend and backend simultaneously
* Update ports if your configuration differs

