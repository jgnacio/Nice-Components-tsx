import { gsap } from "gsap";
import { useEffect, useRef } from "react";

export default function CircularText({
  text,
  radius,
  fontSize,
}: {
  text: string;
  radius: number;
  fontSize: string;
}) {
  const circumference = 2 * Math.PI * radius;
  const characterSpacing = circumference / text.length;

  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      const characters = (containerRef.current as any).querySelectorAll(
        ".char"
      );
      const startAngle = 190; // Ángulo inicial
      const angleStep = 360 / characters.length; // Espacio entre las letras

      characters.forEach((char: string, index: number) => {
        const angle = startAngle + index * angleStep; // Sumar el ángulo de cada letra

        // Coloca cada carácter en la posición correcta usando GSAP
        gsap.set(char, {
          rotation: angle + 80,
          x: radius * Math.cos((angle * Math.PI) / 180),
          y: radius * Math.sin((angle * Math.PI) / 180),
          transformOrigin: "center center",
        });
      });
    }
  }, [text, radius]);

  return (
    <div ref={containerRef} className="relative">
      {text.split("").map((char, index) => (
        <span
          key={index}
          className="char absolute uppercase font-light text-primary mix-blend-exclusion"
          style={{
            fontSize,
            rotate: `${(index / text.length) * 180}deg`,
            transformOrigin: "center center",
            letterSpacing: `${characterSpacing}px`,
          }}
        >
          {char}
        </span>
      ))}
    </div>
  );
}
