import calculateLinearVelocity from "@/utils/linear-velocity";

export const GRAVITATIONAL_CONSTANT = 6.6743e-11;
export const SCALE_FACTOR = 0.0001;

export const SPAWN_RADIUS = 250;

export const SECONDS_IN_A_YEAR = 365 * 24 * 60 * 60; // Total seconds in a year

// export const SUN_RADIUS = 15;
export const SUN_RADIUS = 5;
// Calculate the suns mass from its radius, rounded to 2 decimal places
export const SUN_MASS =
  Math.round((4 / 3) * Math.PI * Math.pow(SUN_RADIUS, 3) * 1410) / 100;

export const PLANETS = [
  {
    key: "Mercury",
    position: [10, 0, 0],
    scale: 0.3,
    orbitalPeriod: 0.241, // In years
    eccentricity: 0.2056, // Mercury's eccentricity
    texture: "/textures/2k_mercury.jpg",
    rotationSpeed: 10.83,
    angle: 0.034, // Axial tilt
    linearVelocity: calculateLinearVelocity({
      radius: 10,
      orbitalPeriod: 0.241,
    }), // Calculate linear velocity
  },
  {
    key: "Venus",
    position: [15, 0, 0],
    scale: 0.7,
    orbitalPeriod: 0.615,
    eccentricity: 0.0068,
    texture: "/textures/2k_venus_atmosphere.jpg",
    rotationSpeed: 6.52,
    angle: 177.4, // Axial tilt
    linearVelocity: calculateLinearVelocity({
      radius: 15,
      orbitalPeriod: 0.615,
    }), // Calculate linear velocity
  },
  {
    key: "Earth",
    position: [20, 0, 0],
    scale: 1,
    orbitalPeriod: 1,
    eccentricity: 0.0167,
    texture: "/textures/2k_earth_daymap.jpg",
    rotationSpeed: 15,
    angle: 23.5, // Axial tilt
    linearVelocity: calculateLinearVelocity({ radius: 20, orbitalPeriod: 1 }), // Calculate linear velocity
  },
  {
    key: "Mars",
    position: [25, 0, 0],
    scale: 0.5,
    orbitalPeriod: 1.881,
    eccentricity: 0.0934,
    texture: "/textures/2k_mars.jpg",
    rotationSpeed: 15.8,
    angle: 25.2, // Axial tilt
    linearVelocity: calculateLinearVelocity({
      radius: 25,
      orbitalPeriod: 1.881,
    }), // Calculate linear velocity
  },
  {
    key: "Jupiter",
    position: [35, 0, 0],
    scale: 1.5,
    orbitalPeriod: 11.9,
    eccentricity: 0.0489,
    texture: "/textures/2k_jupiter.jpg",
    rotationSpeed: 360,
    angle: 3.1, // Axial tilt
    linearVelocity: calculateLinearVelocity({
      radius: 35,
      orbitalPeriod: 11.9,
    }), // Calculate linear velocity
  },
  {
    key: "Saturn",
    position: [45, 0, 0],
    scale: 1.2,
    orbitalPeriod: 29.5,
    eccentricity: 0.0565,
    texture: "/textures/2k_saturn.jpg",
    rotationSpeed: 360,
    angle: 26.7, // Axial tilt
    linearVelocity: calculateLinearVelocity({
      radius: 45,
      orbitalPeriod: 29.5,
    }), // Calculate linear velocity
  },
  {
    key: "Uranus",
    position: [55, 0, 0],
    scale: 1.0,
    orbitalPeriod: 84,
    eccentricity: 0.0472,
    texture: "/textures/2k_uranus.jpg",
    rotationSpeed: 360,
    angle: 97.8, // Axial tilt
    linearVelocity: calculateLinearVelocity({ radius: 55, orbitalPeriod: 84 }), // Calculate linear velocity
  },
  {
    key: "Neptune",
    position: [65, 0, 0],
    scale: 0.9,
    orbitalPeriod: 164.8,
    eccentricity: 0.0086,
    texture: "/textures/2k_neptune.jpg",
    rotationSpeed: 360,
    angle: 28.3, // Axial tilt
    linearVelocity: calculateLinearVelocity({
      radius: 65,
      orbitalPeriod: 164.8,
    }), // Calculate linear velocity
  },
];
