from datetime import datetime
from skyfield.api import load
import requests

# NASA NEO API information
API_KEY = "yqngDr6ngGBAMdK0s0SuPKvTKP9Ds1NKYDznhdph"
NEO_API_URL = f"https://api.nasa.gov/neo/rest/v1/feed?start_date=2024-10-01&end_date=2024-10-07&api_key={API_KEY}"

# Load planetary ephemeris data
ts = load.timescale()
planets = load("de440.bsp")  # Load the JPL DE440 ephemeris
sun = planets["sun"]

# List of planets with their appropriate keys
planet_names = {
    "mercury": "mercury barycenter",
    "venus": "venus barycenter",
    "earth": "earth barycenter",
    "mars": "mars barycenter",
    "jupiter": "jupiter barycenter",  # Use barycenter for Jupiter
    "saturn": "saturn barycenter",  # Use barycenter for Saturn
    "uranus": "uranus barycenter",  # Use barycenter for Uranus
    "neptune": "neptune barycenter",  # Use barycenter for Neptune
}


def fetch_planet_positions(target_date: datetime):
    """
    Get planetary positions relative to the Sun for a given date.

    :param target_date: The date for which to get the planetary positions.
    :return: Dictionary of planetary positions (X, Y, Z).
    """
    # Convert the date to a Skyfield Time object
    t = ts.utc(target_date.year, target_date.month, target_date.day)

    positions = {}
    for planet_name, planet_key in planet_names.items():
        planet = planets[planet_key]
        astrometric = planet.at(t).observe(sun)
        x, y, z = astrometric.position.au
        positions[planet_name] = [x, y, z]
    # Add the Sun's coordinates (which are 0, 0, 0 in heliocentric coordinates)
    positions["sun"] = [0.0, 0.0, 0.0]
    return positions


def fetch_neo_data():
    """
    Fetch NEO (Near-Earth Object) data from NASA's API.

    :return: List of NEOs with their orbital elements.
    """
    response = requests.get(NEO_API_URL)
    neo_data = response.json()

    neos = []
    for neo in neo_data['near_earth_objects']:
        for obj in neo_data['near_earth_objects'][neo]:
            neos.append({
                'name': obj['name'],
                'semi_major_axis': float(obj['orbital_data']['semi_major_axis']),
                'eccentricity': float(obj['orbital_data']['eccentricity']),
                'inclination': float(obj['orbital_data']['inclination']),
                'longitude_of_ascending_node': float(obj['orbital_data']['ascending_node_longitude']),
                'argument_of_periapsis': float(obj['orbital_data']['perihelion_argument']),
                'mean_anomaly': float(obj['orbital_data']['mean_anomaly']),
            })
    return neos


def compute_neo_positions(neos, target_date: datetime):
    """
    Compute NEO positions relative to the Sun using their Keplerian elements.

    :param neos: List of NEOs with their orbital elements.
    :param target_date: The date for which to compute the positions.
    :return: Dictionary of NEO positions (X, Y, Z).
    """
    positions = {}
    t = ts.utc(target_date.year, target_date.month, target_date.day)

    for neo in neos:
        # Keplerian elements (simplified for demonstration purposes)
        a = neo['semi_major_axis']  # in AU
        e = neo['eccentricity']
        i = neo['inclination']  # in degrees
        omega = neo['longitude_of_ascending_node']  # in degrees
        w = neo['argument_of_periapsis']  # in degrees
        M = neo['mean_anomaly']  # in degrees

        # For simplicity, we'll assume the NEO orbits can be computed using these elements.
        # You would normally use Skyfield's orbit propagation mechanisms or SPICE kernels for more precision.
        # Here, we will mock this data to simulate the output.

        # Mocked position data (replace this with actual computations)
        x, y, z = a * (1 - e**2), 0, 0  # Replace with actual position calculations

        positions[neo['name']] = [x, y, z]

    return positions


def fetch_all_celestial_positions(target_date: datetime):
    """
    Fetch positions for both planets and NEOs.

    :param target_date: The date for which to fetch the positions.
    :return: Combined dictionary of planetary and NEO positions.
    """
    planets_positions = fetch_planet_positions(target_date)
    neos = fetch_neo_data()
    neo_positions = compute_neo_positions(neos, target_date)

    # Combine planetary and NEO positions
    celestial_positions = {
        "planets": planets_positions,
        "neos": neo_positions
    }
    return celestial_positions


# Example usage
target_date = datetime(2024, 10, 1)  # Example date

# Fetch all celestial positions
celestial_positions = fetch_all_celestial_positions(target_date)

# Output the positions
print(json.dumps(celestial_positions, indent=4))
