export const GRAVITATIONAL_CONSTANT = 6.6743e-11;
export const SCALE_FACTOR = 0.0001;

export const SECONDS_IN_A_YEAR = 365 * 24 * 60 * 60; // Total seconds in a year

// export const SUN_RADIUS = 15;
export const SUN_RADIUS = 2.5;
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

export const POSITION_SCALING_FACTOR = 18;
export const PLANETS = [
  {
    key: "mercury",
    scale: 0.3,
    eccentricity: 0.2056,
    texture: "/textures/2k_mercury.jpg",
    rotationSpeed: scaleRotationSpeed(1407.6),
    revolutionSpeed: scaleRevolutionSpeed(0.241),
    angle: 0.034,
    orbitTilt: 7.0,
    semiMajorAxis: 0.387,
    perihelion: 0.307, // Perihelion in AU
    aphelion: 0.467, // Aphelion in AU
    semiMinorAxis: 0.306, // Semi-minor axis in AU
  },
  {
    key: "venus",
    scale: 0.7,
    eccentricity: 0.0068,
    texture: "/textures/2k_venus_atmosphere.jpg",
    rotationSpeed: scaleRotationSpeed(5832.5),
    revolutionSpeed: scaleRevolutionSpeed(0.615),
    angle: 177.4,
    orbitTilt: 3.4,
    semiMajorAxis: 0.723,
    perihelion: 0.718, // Perihelion in AU
    aphelion: 0.728, // Aphelion in AU
    semiMinorAxis: 0.722, // Semi-minor axis in AU
  },
  {
    key: "earth",
    scale: 1,
    eccentricity: 0.0167,
    texture: "/textures/2k_earth_daymap.jpg",
    rotationSpeed: scaleRotationSpeed(24),
    revolutionSpeed: scaleRevolutionSpeed(1),
    angle: 23.5,
    orbitTilt: 0,
    semiMajorAxis: 1.0,
    perihelion: 0.983, // Perihelion in AU
    aphelion: 1.017, // Aphelion in AU
    semiMinorAxis: 0.999, // Semi-minor axis in AU
  },
  {
    key: "mars",
    scale: 0.5,
    eccentricity: 0.0934,
    texture: "/textures/2k_mars.jpg",
    rotationSpeed: scaleRotationSpeed(24.6),
    revolutionSpeed: scaleRevolutionSpeed(1.881),
    angle: 25.2,
    orbitTilt: 1.9,
    semiMajorAxis: 1.524,
    perihelion: 1.381, // Perihelion in AU
    aphelion: 1.667, // Aphelion in AU
    semiMinorAxis: 1.51, // Semi-minor axis in AU
  },
  {
    key: "jupiter",
    scale: 1.5,
    eccentricity: 0.0489,
    texture: "/textures/2k_jupiter.jpg",
    rotationSpeed: scaleRotationSpeed(9.93),
    revolutionSpeed: scaleRevolutionSpeed(11.9),
    angle: 3.1,
    orbitTilt: 1.31,
    semiMajorAxis: 5.203,
    perihelion: 4.95, // Perihelion in AU
    aphelion: 5.457, // Aphelion in AU
    semiMinorAxis: 5.196, // Semi-minor axis in AU
  },
  {
    key: "saturn",
    scale: 1.2,
    eccentricity: 0.0565,
    texture: "/textures/2k_saturn.jpg",
    rotationSpeed: scaleRotationSpeed(10.7),
    revolutionSpeed: scaleRevolutionSpeed(29.5),
    angle: 26.7,
    orbitTilt: 2.5,
    semiMajorAxis: 9.537,
    perihelion: 9.051, // Perihelion in AU
    aphelion: 10.023, // Aphelion in AU
    semiMinorAxis: 9.423, // Semi-minor axis in AU
  },
  {
    key: "uranus",
    scale: 1.0,
    eccentricity: 0.0472,
    texture: "/textures/2k_uranus.jpg",
    rotationSpeed: scaleRotationSpeed(17.2),
    revolutionSpeed: scaleRevolutionSpeed(84),
    angle: 97.8,
    orbitTilt: 0.76986,
    semiMajorAxis: 19.191,
    perihelion: 18.337, // Perihelion in AU
    aphelion: 20.045, // Aphelion in AU
    semiMinorAxis: 19.059, // Semi-minor axis in AU
  },
  {
    key: "neptune",
    scale: 0.9,
    eccentricity: 0.0086,
    texture: "/textures/2k_neptune.jpg",
    rotationSpeed: scaleRotationSpeed(16.1),
    revolutionSpeed: scaleRevolutionSpeed(164.8),
    angle: 28.3,
    orbitTilt: 1.8,
    semiMajorAxis: 30.068,
    perihelion: 29.081, // Perihelion in AU
    aphelion: 31.055, // Aphelion in AU
    semiMinorAxis: 30.014, // Semi-minor axis in AU
  },
];
