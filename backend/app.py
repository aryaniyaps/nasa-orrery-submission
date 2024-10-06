from flask import Flask, send_from_directory, jsonify
import os
import json
import requests  # Ensure you have requests installed

app = Flask(__name__)

# Define the path to the JSON files
JSON_FILE_PATH = os.path.join(os.path.dirname(__file__), '..', 'celestial_data.json')
DATE_LOCATION_JSON_PATH = os.path.join(os.path.dirname(__file__), '..', 'date_location_data.json')

def fetch_celestial_data():
    # Example function to fetch data from an API (adjust as necessary)
    planet_api_url = "https://api.le-systeme-solaire.net/rest/bodies/"
    neo_api_url = "https://data.nasa.gov/resource/yqngDr6ngGBAMdK0s0SuPKvTKP9Ds1NKYDznhdph.json"

    # Fetch planets data
    planets_response = requests.get(planet_api_url)
    planets_data = planets_response.json()

    # Fetch NEO data
    neo_response = requests.get(neo_api_url)
    neo_data = neo_response.json()

    # Combine data as needed
    celestial_data = {
        'planets': planets_data,
        'nears_earth_objects': neo_data
    }

    # Write the combined data to the JSON file
    with open(JSON_FILE_PATH, 'w') as json_file:
        json.dump(celestial_data, json_file)

    # Extract date and location data
    date_location_data = extract_date_location_data(neo_data)

    # Write the date and location data to a separate JSON file
    with open(DATE_LOCATION_JSON_PATH, 'w') as date_location_file:
        json.dump(date_location_data, date_location_file)

def extract_date_location_data(neo_data):
    date_location_dict = {}

    for item in neo_data:
        # Assuming NEO data has 'close_approach_data' field containing date and location info
        for approach in item.get('close_approach_data', []):
            date = approach.get('close_approach_date')
            location = {
                'miss_distance_km': approach.get('miss_distance', {}).get('kilometers'),
                'relative_velocity_km_s': approach.get('relative_velocity', {}).get('kilometers_per_hour')
            }

            if date:
                date_location_dict[date] = location

    return date_location_dict

@app.route('/')
def index():
    return send_from_directory('client', 'index.html')

@app.route('/api/celestial-data')
def get_celestial_data():
    try:
        # Load celestial data from the JSON file
        with open(JSON_FILE_PATH) as json_file:
            data = json.load(json_file)
        return jsonify(data)
    except Exception as e:
        return jsonify({'error': str(e)})

@app.route('/api/date-location-data')
def get_date_location_data():
    try:
        # Load date and location data from the JSON file
        with open(DATE_LOCATION_JSON_PATH) as json_file:
            data = json.load(json_file)
        return jsonify(data)
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    # Fetch and create the JSON files before starting the server
    fetch_celestial_data()
    app.run(debug=True)
