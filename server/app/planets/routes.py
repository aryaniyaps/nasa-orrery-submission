from datetime import datetime
from typing import Annotated
from fastapi import APIRouter, Query
import json
import os
import time

from app.planets.services import fetch_planet_positions

planet_router = APIRouter(prefix="/planets", tags=["Planets"])

# Define the path to the cached planet positions data
PLANET_POSITIONS_CACHE_PATH = "NASA_space_apps/planet_positions.json"
CACHE_EXPIRATION = 86400  # Cache expiration time in seconds (24 hours)

def get_cached_planet_positions(target_date: datetime):
    # Check if the cached data is valid and for the correct date
    try:
        with open(PLANET_POSITIONS_CACHE_PATH) as json_file:
            data = json.load(json_file)
            if (time.time() - data['timestamp'] < CACHE_EXPIRATION and 
                data['date'] == target_date.strftime('%Y-%m-%d')):
                return data['positions']
    except (FileNotFoundError, KeyError, json.JSONDecodeError):
        pass
    
    # If cache is expired or not available, fetch new data
    positions = fetch_planet_positions(target_date=target_date)
    
    # Update the cache with new data
    os.makedirs(os.path.dirname(PLANET_POSITIONS_CACHE_PATH), exist_ok=True)
    with open(PLANET_POSITIONS_CACHE_PATH, 'w') as json_file:
        json.dump({
            'date': target_date.strftime('%Y-%m-%d'),
            'timestamp': time.time(),
            'positions': positions
        }, json_file)
    
    return positions

@planet_router.get("/positions")
async def read_planet_positions(
    target_date: Annotated[
        datetime,
        Query(
            description="Date to read planet positions for",
        ),
    ],
):
    # Use the cached planet positions if available
    positions = get_cached_planet_positions(target_date)
    return positions
