from datetime import datetime

from skyfield.api import load

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
        positions[planet_name] = {"X": x, "Y": y, "Z": z}
    # Add the Sun's coordinates (which are 0, 0, 0 in heliocentric coordinates)
    positions["sun"] = {"X": 0.0, "Y": 0.0, "Z": 0.0}
    return positions
