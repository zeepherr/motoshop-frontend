import "./content-loader.css";

export function ContentLoader() {
  return (
    <div
      className="
        absolute inset-0 z-30
        flex items-center justify-center
        bg-background/55
      "
    >
      <div className="flex flex-col items-center gap-4">
        <MotorcycleMark />

        <div className="dot-typing " />
      </div>
    </div>
  );
}

function MotorcycleMark() {
  return (
    <div className="motor-loader">
      <svg viewBox="0 0 96 48" className="h-14 w-28" aria-label="Loading">
        {/* Neutral motorcycle */}
        <g className="motor-base">
          <MotorcycleShape />
        </g>

        {/* Moving primary highlight */}
        <g className="motor-highlight">
          <MotorcycleShape />
        </g>
      </svg>
    </div>
  );
}

function MotorcycleShape() {
  return (
    <>
      {/* Wheels */}
      <circle cx="19" cy="34" r="9" />
      <circle cx="76" cy="34" r="9" />

      {/* Frame */}
      <path d="M28 34L39 19H57L68 34" />
      <path d="M29 34H48L58 24" />

      {/* Engine */}
      <path d="M40 24H53L57 33H43Z" />

      {/* Tank */}
      <path d="M45 19C49 13 58 13 64 18L57 23H42Z" />

      {/* Seat */}
      <path d="M33 17H47" />

      {/* Rear */}
      <path d="M34 18L26 25" />

      {/* Front fork */}
      <path d="M62 18L76 34" />

      {/* Handlebar */}
      <path d="M60 16H69" />
      <path d="M64 16L67 12" />
    </>
  );
}
