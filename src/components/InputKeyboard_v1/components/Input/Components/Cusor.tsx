import { useState, useEffect, CSSProperties } from "react";

export interface CursorProps {
  style?: CSSProperties;
}
const Cursor = (props: CursorProps) => {
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setBlink((prev) => !prev);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ width: "2px", height: "1.2em", display: "inline-block", ...(props.style ?? {}) }}>
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "currentColor",
          transform: blink ? "scaleY(1)" : "scaleY(0.5)",
          transition: "all 0.25s ease-in-out",
          opacity: blink ? 1 : 0,
        }}
      ></div>
    </div>
  );
};

export default Cursor;
