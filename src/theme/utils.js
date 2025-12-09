// ---- dynamic utilities ----
export function makeGradient(h, s, l, strength = 10) {
  return `linear-gradient(135deg,
    hsl(${h}, ${s}%, ${l}%),
    hsl(${h}, ${s}%, ${l + strength}%)
  )`;
}

export function getTextColor(h, s, l) {
  const compHue = (h + 180) % 360;
  const lightThreshold = 60;
  return l < lightThreshold
    ? `hsl(${compHue}, ${s}%, 90%)`
    : `hsl(${compHue}, ${s}%, 20%)`;
}
 
