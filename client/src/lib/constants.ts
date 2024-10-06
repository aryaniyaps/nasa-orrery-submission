export const GRAVITATIONAL_CONSTANT = 6.6743e-11;
export const SCALE_FACTOR = 0.0001;

export const SPAWN_RADIUS = 250;

export const SECONDS_IN_A_YEAR = 365 * 24 * 60 * 60; // Total seconds in a year

// export const SUN_RADIUS = 15;
export const SUN_RADIUS = 5;
// Calculate the suns mass from its radius, rounded to 2 decimal places
export const SUN_MASS =
  Math.round((4 / 3) * Math.PI * Math.pow(SUN_RADIUS, 3) * 1410) / 100;

export const TIME_SCALE = 365;

// Function to scale rotation and revolution speeds based on Earth
const scaleRotationSpeed = (planetRotationPeriod: number) => {
  const earthRotationPeriod = 24; // Earth's rotation period in hours
  return earthRotationPeriod / planetRotationPeriod;
};

const scaleRevolutionSpeed = (planetOrbitalPeriod: number) => {
  const earthOrbitalPeriod = 1; // Earth's orbital period in years
  return earthOrbitalPeriod / planetOrbitalPeriod;
};

export const PLANETS = [
  {
    key: "Mercury",
    position: [10, 0, 0],
    scale: 0.3,
    eccentricity: 0.2056, // Mercury's eccentricity
    texture: "/textures/2k_mercury.jpg",
    rotationSpeed: scaleRotationSpeed(1407.6), // Mercury's rotation period in hours
    revolutionSpeed: scaleRevolutionSpeed(0.241), // Mercury's orbital period in years
    angle: 0.034, // Axial tilt
  },
  {
    key: "Venus",
    position: [15, 0, 0],
    scale: 0.7,
    eccentricity: 0.0068,
    texture: "/textures/2k_venus_atmosphere.jpg",
    rotationSpeed: scaleRotationSpeed(5832.5), // Venus' rotation period in hours
    revolutionSpeed: scaleRevolutionSpeed(0.615), // Venus' orbital period in years
    angle: 177.4, // Axial tilt
  },
  {
    key: "Earth",
    position: [20, 0, 0],
    scale: 1,
    eccentricity: 0.0167,
    texture: "/textures/2k_earth_daymap.jpg",
    rotationSpeed: scaleRotationSpeed(24), // Earth's rotation period in hours
    revolutionSpeed: scaleRevolutionSpeed(1), // Earth's orbital period in years
    angle: 23.5, // Axial tilt
  },
  {
    key: "Mars",
    position: [25, 0, 0],
    scale: 0.5,
    eccentricity: 0.0934,
    texture: "/textures/2k_mars.jpg",
    rotationSpeed: scaleRotationSpeed(24.6), // Mars' rotation period in hours
    revolutionSpeed: scaleRevolutionSpeed(1.881), // Mars' orbital period in years
    angle: 25.2, // Axial tilt
  },
  {
    key: "Jupiter",
    position: [35, 0, 0],
    scale: 1.5,
    eccentricity: 0.0489,
    texture: "/textures/2k_jupiter.jpg",
    rotationSpeed: scaleRotationSpeed(9.93), // Jupiter's rotation period in hours
    revolutionSpeed: scaleRevolutionSpeed(11.9), // Jupiter's orbital period in years
    angle: 3.1, // Axial tilt
  },
  {
    key: "Saturn",
    position: [45, 0, 0],
    scale: 1.2,
    eccentricity: 0.0565,
    texture: "/textures/2k_saturn.jpg",
    rotationSpeed: scaleRotationSpeed(10.7), // Saturn's rotation period in hours
    revolutionSpeed: scaleRevolutionSpeed(29.5), // Saturn's orbital period in years
    angle: 26.7, // Axial tilt
  },
  {
    key: "Uranus",
    position: [55, 0, 0],
    scale: 1.0,
    eccentricity: 0.0472,
    texture: "/textures/2k_uranus.jpg",
    rotationSpeed: scaleRotationSpeed(17.2), // Uranus' rotation period in hours
    revolutionSpeed: scaleRevolutionSpeed(84), // Uranus' orbital period in years
    angle: 97.8, // Axial tilt
  },
  {
    key: "Neptune",
    position: [65, 0, 0],
    scale: 0.9,
    eccentricity: 0.0086,
    texture: "/textures/2k_neptune.jpg",
    rotationSpeed: scaleRotationSpeed(16.1), // Neptune's rotation period in hours
    revolutionSpeed: scaleRevolutionSpeed(164.8), // Neptune's orbital period in years
    angle: 28.3, // Axial tilt
  },
];
