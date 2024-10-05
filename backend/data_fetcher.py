import requests

def fetch_planetary_data():
    # Example URL for a planetary data API (modify as needed)
    url = "https://api.le-systeme-solaire.net/rest/bodies/"
    response = requests.get(url)
    planetary_data = response.json()['bodies']
    return [{'name': body['englishName'], 'position': [body['semimajorAxis'], body['periapsis'], body['apoapsis']]} for body in planetary_data if body['isPlanet']]

def fetch_comet_data(api_key):
    url = f"https://data.nasa.gov/resource/ysqn-vd8v.json?$$app_token={api_key}"
    response = requests.get(url)
    comets_data = response.json()
    return [{'name': comet['name'], 'position': [comet['a'], comet['e'], comet['i']]} for comet in comets_data]

def fetch_asteroid_data(api_key):
    url = f"https://api.nasa.gov/neo/rest/v1/neo/browse?api_key={api_key}"
    response = requests.get(url)
    asteroids_data = response.json()['near_earth_objects']
    return [{'name': asteroid['name'], 'position': [asteroid['orbital_data']['semi_major_axis'], asteroid['orbital_data']['eccentricity'], asteroid['orbital_data']['inclination']]} for asteroid in asteroids_data]

def fetch_all_celestial_objects(api_key):
    planets = fetch_planetary_data()
    comets = fetch_comet_data(api_key)
    asteroids = fetch_asteroid_data(api_key)
    
    combined_data = {
        "planets": planets,
        "comets": comets,
        "asteroids": asteroids
    }
    
    return combined_data
