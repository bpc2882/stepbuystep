import React, { useState } from "react";
import { SURFACES, HOVERS } from "../theme/objects";

/* ---------- InfoBox (flippable or static) ---------- */
export default function InfoBox({
  icon: Icon,
  title,
  text,
  detail,
  h = 35,
  s = 85,
  l = 55,
  textColor = "#fff",
  border,
  height = "h-64",
  flippable = false,
}) {
  const [flipped, setFlipped] = useState(false);
  const surface = SURFACES.clickable(h, s, l);

  const handleHover = (e, entering) => {
    Object.assign(
      e.currentTarget.style,
      entering ? HOVERS.lift : { transform: "none", boxShadow: surface.boxShadow }
    );
  };

  return (
    <div
      onMouseEnter={() => flippable && setFlipped(true)}
      onMouseLeave={() => flippable && setFlipped(false)}
      className={`relative w-full ${height} perspective`}
    >
      <div
        className={`relative w-full h-full duration-700 preserve-3d ${
          flipped ? "rotate-y-180" : ""
        }`}
      >
        {/* FRONT */}
        <div
          className="absolute inset-0 rounded-default p-6 flex flex-col items-center justify-center text-center backface-hidden"
          style={{
            ...surface,
            color: textColor,
            border: border ? `2px solid ${border}` : surface.border,
          }}
          onMouseEnter={(e) => handleHover(e, true)}
          onMouseLeave={(e) => handleHover(e, false)}
        >
          {Icon && (
            <Icon
              className="absolute inset-0 m-auto w-3/4 h-3/4 opacity-20"
              style={{ color: textColor }}
            />
          )}
          <h3 className="text-2xl font-bold mb-4 tracking-wide relative z-10 leading-snug">
            {title}
          </h3>
          <p className="font-medium text-lg leading-relaxed relative z-10 mt-2">
            {text}
          </p>
        </div>

        {/* BACK */}
        {flippable && (
          <div
            className="absolute inset-0 rounded-default p-6 flex items-center justify-center text-center backface-hidden rotate-y-180"
            style={{
              ...surface,
              color: textColor,
              border: border ? `2px solid ${border}` : surface.border,
            }}
          >
            <p className="font-medium text-lg leading-relaxed">{detail}</p>
          </div>
        )}
      </div>
    </div>
  );
}
