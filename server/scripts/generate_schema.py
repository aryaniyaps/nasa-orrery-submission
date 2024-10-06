import json
import os
import requests
import time
from pathlib import Path
from app import create_app

# Define the path for caching the NEO data and the cache expiration time
NEO_JSON_FILE_PATH = Path("NASA_space_apps/neo_data.json")
CACHE_EXPIRATION = 86400  # Cache expiration time in seconds (24 hours)

def fetch_neo_data(api_key):
    # Fetch only the NEO data from the NASA API
    neo_api_url = f"https://api.nasa.gov/neo/rest/v1/neo/browse?api_key={api_key}"
    neo_response = requests.get(neo_api_url)
    neo_data = neo_response.json()

    # Add a timestamp to the data for caching
    neo_data['timestamp'] = time.time()

    # Save the fetched data to the JSON file
    NEO_JSON_FILE_PATH.parent.mkdir(parents=True, exist_ok=True)
    with open(NEO_JSON_FILE_PATH, 'w') as json_file:
        json.dump(neo_data, json_file)

    return neo_data

def get_cached_neo_data(api_key):
    try:
        # Load the cached NEO data if it exists
        with open(NEO_JSON_FILE_PATH) as json_file:
            data = json.load(json_file)

        # Check if the cached data is still valid
        if time.time() - data['timestamp'] < CACHE_EXPIRATION:
            return data
    except (FileNotFoundError, KeyError, json.JSONDecodeError):
        pass
    
    # If cache is invalid or not found, fetch new NEO data
    return fetch_neo_data(api_key)

# Load or fetch NEO data and save it to the JSON file
api_key = 'yqngDr6ngGBAMdK0s0SuPKvTKP9Ds1NKYDznhdph'  # Replace with your actual API key
neo_data = get_cached_neo_data(api_key)

# Create FastAPI app and generate the OpenAPI schema
app = create_app()
openapi_schema_path = Path("../schema/openapi.json")

# Generate the OpenAPI schema content
openapi_content = app.openapi()

# Adjust the operation IDs for readability
for path_data in openapi_content["paths"].values():
    for operation in path_data.values():
        tag = operation["tags"][0]
        operation_id = operation["operationId"]
        to_remove = f"{tag}-"
        new_operation_id = operation_id[len(to_remove):]
        operation["operationId"] = new_operation_id

# Write the OpenAPI schema content to a file
openapi_schema_path.parent.mkdir(parents=True, exist_ok=True)
openapi_schema_path.write_text(json.dumps(openapi_content))
