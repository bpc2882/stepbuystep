// ---------- objects.js ----------
import { makeGradient } from "../theme/utils.js";

export const SURFACES = {
  card: {
    borderRadius: "1rem",
    boxShadow: "6px 10px 20px rgba(0,0,0,0.28)",
    border: "1px solid rgba(255,255,255,0.08)",
    background: "rgba(255,255,255,0.04)",
    color: "#fff",
  },

  clickable: (h = 30, s = 80, l = 55) => ({
    borderRadius: "0.15rem",
    boxShadow: "6px 10px 20px rgba(0,0,0,0.28)",
    border: "1px solid rgba(255,255,255,0.12)",
    background: makeGradient(h, s, l),
    color: "#fff",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  }),
};

export const HOVERS = {
  lift: {
    transform: "translateY(-4px)",
    boxShadow: "0 12px 28px rgba(0,0,0,0.35)",
  },
};
