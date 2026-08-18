import "./top-loader.css";

export function TopLoaderBar() {
  return (
    <div
      className="
        pointer-events-none
        absolute inset-x-0 top-0 z-50
        h-0.75 overflow-hidden
        bg-primary/10
      "
      role="progressbar"
      aria-label="Loading"
    >
      <div className="top-loader-bar h-full bg-primary" />
    </div>
  );
}
