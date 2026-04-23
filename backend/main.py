import os
import json
from datetime import datetime
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import httpx
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv("../.env")

app = FastAPI(title="Weather Intelligence API")

OPENWEATHER_API_KEY = os.getenv("OPENWEATHER_API_KEY", "") or "dcd931bb602931442dd43a2cf906438b"
print(f"DEBUG: API Key loaded: '{OPENWEATHER_API_KEY[:10]}...'" if OPENWEATHER_API_KEY else f"DEBUG: API Key is EMPTY")
OPENWEATHER_BASE_URL = "https://api.openweathermap.org/data/2.5"

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

CITIES = {
    1: {"name": "Bengaluru", "lat": 12.9716, "lon": 77.5946},
    2: {"name": "Delhi", "lat": 28.6139, "lon": 77.2090},
    3: {"name": "Mumbai", "lat": 19.0760, "lon": 72.8777},
    4: {"name": "Chennai", "lat": 13.0827, "lon": 80.2707},
    5: {"name": "Kolkata", "lat": 22.5726, "lon": 88.3639},
    6: {"name": "Hyderabad", "lat": 17.3850, "lon": 78.4867},
    7: {"name": "Pune", "lat": 18.5204, "lon": 73.8567},
    8: {"name": "Ahmedabad", "lat": 23.0225, "lon": 72.5714},
    9: {"name": "Jaipur", "lat": 26.9124, "lon": 75.7873},
    10: {"name": "Lucknow", "lat": 26.8467, "lon": 80.9462},
    11: {"name": "Bhopal", "lat": 23.2599, "lon": 77.4126},
    12: {"name": "Patna", "lat": 25.5941, "lon": 85.1376},
    13: {"name": "Bhubaneswar", "lat": 20.2961, "lon": 85.8245},
    14: {"name": "Raipur", "lat": 21.2500, "lon": 81.6299},
    15: {"name": "Ranchi", "lat": 23.3441, "lon": 85.3095},
    16: {"name": "Guwahati", "lat": 26.1445, "lon": 91.7362},
    17: {"name": "Chandigarh", "lat": 30.6920, "lon": 76.7656},
    18: {"name": "Shimla", "lat": 31.1048, "lon": 77.1734},
    19: {"name": "Dehradun", "lat": 30.3165, "lon": 78.0322},
    20: {"name": "Srinagar", "lat": 34.0837, "lon": 74.7973},
    21: {"name": "Jammu", "lat": 32.7266, "lon": 74.8570},
    22: {"name": "Amritsar", "lat": 31.6340, "lon": 74.8723},
    23: {"name": "Agra", "lat": 27.1767, "lon": 78.0081},
    24: {"name": "Varanasi", "lat": 25.3176, "lon": 82.9739},
    25: {"name": "Indore", "lat": 22.7196, "lon": 75.8577},
    26: {"name": "Nagpur", "lat": 21.1458, "lon": 79.0822},
    27: {"name": "Coimbatore", "lat": 11.0168, "lon": 76.9558},
    28: {"name": "Visakhapatnam", "lat": 17.6868, "lon": 83.2185},
    29: {"name": "Thiruvananthapuram", "lat": 8.5241, "lon": 76.9366},
    30: {"name": "Kochi", "lat": 9.9312, "lon": 76.2673},
    31: {"name": "Mysuru", "lat": 12.2958, "lon": 76.6394},
    32: {"name": "Panaji", "lat": 15.4917, "lon": 73.8128},
    33: {"name": "Leh", "lat": 34.0522, "lon": 77.5622},
    34: {"name": "Aizawl", "lat": 23.7271, "lon": 92.7176},
    35: {"name": "Imphal", "lat": 24.8175, "lon": 93.9568},
    36: {"name": "Shillong", "lat": 25.5787, "lon": 91.8933},
    37: {"name": "Kohima", "lat": 25.6751, "lon": 94.1106},
    38: {"name": "Agartala", "lat": 23.8298, "lon": 91.4268},
    39: {"name": "Itanagar", "lat": 27.0844, "lon": 93.6055},
    40: {"name": "Gangtok", "lat": 27.3389, "lon": 88.6065},
    41: {"name": "Puducherry", "lat": 11.9414, "lon": 79.8088},
    42: {"name": "Port Blair", "lat": 11.6643, "lon": 92.7356},
    43: {"name": "Kavaratti", "lat": 10.5593, "lon": 72.6377},
    44: {"name": "Daman", "lat": 20.4424, "lon": 72.8298},
    45: {"name": "Silvassa", "lat": 20.3151, "lon": 73.0189},
}

class RefreshRequest(BaseModel):
    city_id: int

def fetch_weather_sync(city):
    print(f"DEBUG: Fetching {city['name']} at {city['lat']},{city['lon']}")
    API_KEY = "dcd931bb602931442dd43a2cf906438b"
    client = httpx.Client(timeout=30.0)
    weather_resp = client.get(
        f"{OPENWEATHER_BASE_URL}/weather",
        params={"lat": city["lat"], "lon": city["lon"], "appid": API_KEY, "units": "metric"}
    )
    weather_data = weather_resp.json()
    print(f"Response temp: {weather_data.get('main',{}).get('temp')}")
    
    forecast_resp = client.get(
        f"{OPENWEATHER_BASE_URL}/forecast",
        params={"lat": city["lat"], "lon": city["lon"], "appid": API_KEY, "units": "metric"}
    )
    forecast_data = forecast_resp.json()
    client.close()
    return weather_data, forecast_data

@app.get("/")
def root():
    return {"status": "ok", "message": "Weather Intelligence API"}

@app.get("/locations")
def get_locations():
    return [{"id": k, "name": v["name"]} for k, v in CITIES.items()]

@app.get("/api/weather/current")
def get_current_weather(city_id: int):
    if city_id not in CITIES:
        raise HTTPException(status_code=404, detail="City not found")
    
    city = CITIES[city_id]
    
    if not OPENWEATHER_API_KEY:
        print(f"WARNING: No API key! Returning mock data for {city['name']}")
        return {
            "data": {
                "current": {
                    "temperature": 28,
                    "humidity": 65,
                    "wind_speed": 12,
                    "confidence": 0.85
                }
            }
        }
    
    try:
        weather_data, _ = fetch_weather_sync(city)
        
        main = weather_data.get("main", {})
        wind = weather_data.get("wind", {})
        clouds = weather_data.get("clouds", {})
        
        result = {
            "data": {
                "current": {
                    "temperature": round(main.get("temp", 25), 1),
                    "humidity": main.get("humidity", 60),
                    "wind_speed": round(wind.get("speed", 5) * 3.6, 1),
                    "confidence": 0.85 if clouds.get("all", 0) < 50 else 0.70
                }
            }
        }
        return result
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/refresh/{city_id}")
def refresh_weather(city_id: int):
    if city_id not in CITIES:
        raise HTTPException(status_code=404, detail="City not found")
    
    city = CITIES[city_id]
    
    if not OPENWEATHER_API_KEY:
        print(f"WARNING: No API key! Returning mock data for {city['name']}")
        return {
            "data": {
                "current": {
                    "temperature": 28,
                    "humidity": 65,
                    "wind_speed": 12,
                    "confidence": 0.85
                },
                "forecast": [
                    {"horizon": "1", "temp_p50": 28, "temp_p10": 25, "temp_p90": 31},
                    {"horizon": "3", "temp_p50": 28, "temp_p10": 25, "temp_p90": 31},
                    {"horizon": "6", "temp_p50": 29, "temp_p10": 26, "temp_p90": 32},
                    {"horizon": "12", "temp_p50": 30, "temp_p10": 27, "temp_p90": 33},
                    {"horizon": "24", "temp_p50": 29, "temp_p10": 26, "temp_p90": 32},
                    {"horizon": "72", "temp_p50": 28, "temp_p10": 25, "temp_p90": 31},
                ]
            }
        }
    
    try:
        weather_data, forecast_data = fetch_weather_sync(city)
        
        main = weather_data.get("main", {})
        wind = weather_data.get("wind", {})
        clouds = weather_data.get("clouds", {})
        
        forecast_list = []
        if "list" in forecast_data:
            for i, item in enumerate(forecast_data["list"]):
                if i == 0:
                    horizon = "1"
                elif i <= 2:
                    horizon = "3"
                elif i <= 5:
                    horizon = "6"
                elif i <= 11:
                    horizon = "12"
                elif i <= 23:
                    horizon = "24"
                else:
                    horizon = "72"
                
                temp = item.get("main", {}).get("temp", 25)
                forecast_list.append({
                    "horizon": horizon,
                    "temp_p50": round(temp, 1),
                    "temp_p10": round(temp - 3, 1),
                    "temp_p90": round(temp + 3, 1),
                })
        
        forecast_list = [f for i, f in enumerate(forecast_list) if i % max(1, len(forecast_list)//6) == 0][:6]
        
        result = {
            "data": {
                "current": {
                    "temperature": round(main.get("temp", 25), 1),
                    "humidity": main.get("humidity", 60),
                    "wind_speed": round(wind.get("speed", 5) * 3.6, 1),
                    "confidence": 0.85 if clouds.get("all", 0) < 50 else 0.70
                },
                "forecast": forecast_list
            }
        }
        return result
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)