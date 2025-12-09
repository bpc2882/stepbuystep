// src/theme.js

// Utility: make gradient from a base color
export function makeGradient(h, s, l, strength = 10) {
  return `linear-gradient(135deg,
    hsl(${h}, ${s}%, ${l}%),
    hsl(${h}, ${s}%, ${l + strength}%)
  )`;
}

// Toggle complementary text colours
const USE_COMPLEMENTARY_TEXT = true;

// Pick best text colour
export function getTextColor(h, s, l) {
  if (USE_COMPLEMENTARY_TEXT) {
    const compHue = (h + 180) % 360;
    const lightThreshold = 60;

    if (l < lightThreshold) {
      return `hsl(${compHue}, ${s}%, 90%)`; // light text
    } else {
      return `hsl(${compHue}, ${s}%, 20%)`; // dark text
    }
  } else {
    return l > 50 ? "#2A2A2A" : "#FFF8F0";
  }
}

// Global styles
export const SHADOW_STRENGTH = "8px 8px 20px rgba(0,0,0,0.6)";
export const ROUNDED = "rounded-lg";
export const BASE_TEXT_COLOR = "#3A2C28";

// Brand colours
export const contactHSL = { h: 28, s: 54, l: 52 }; // copper
export const aboutHSL   = { h: 28, s: 54, l: 52 }; // amber
