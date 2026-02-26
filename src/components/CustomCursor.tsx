import { useEffect, useRef, useState } from "react";

const INTERACTIVE_SELECTOR =
  "a, button, [role='button'], input, textarea, select, summary, label, [data-cursor='hover'], .cursor-hover";

const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const auraRef = useRef<HTMLDivElement | null>(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const ringPosRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef<number | null>(null);
  const pressedRef = useRef(false);
  const hasMovedRef = useRef(false);
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [interactive, setInteractive] = useState(false);

  useEffect(() => {
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const touchCapable = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    setEnabled(!(coarsePointer && touchCapable));
  }, []);

  useEffect(() => {
    if (!enabled) {
      document.documentElement.classList.remove("custom-cursor-enabled");
      return;
    }

    document.documentElement.classList.add("custom-cursor-enabled");

    const animate = () => {
      const ring = ringPosRef.current;
      const target = targetRef.current;

      ring.x += (target.x - ring.x) * 0.16;
      ring.y += (target.y - ring.y) * 0.16;

      if (dotRef.current) {
        const dotScale = pressedRef.current ? 0.7 : 1;
        dotRef.current.style.transform = `translate3d(${target.x}px, ${target.y}px, 0) translate(-50%, -50%) scale(${dotScale})`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%)`;
      }

      if (auraRef.current) {
        auraRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%)`;
      }

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    const onMouseMove = (event: MouseEvent) => {
      targetRef.current = { x: event.clientX, y: event.clientY };
      if (!hasMovedRef.current) {
        ringPosRef.current = { x: event.clientX, y: event.clientY };
        hasMovedRef.current = true;
      }
      setVisible(true);

      const element = event.target as Element | null;
      setInteractive(Boolean(element?.closest(INTERACTIVE_SELECTOR)));
    };

    const onMouseDown = () => {
      pressedRef.current = true;
      setPressed(true);
    };
    const onMouseUp = () => {
      pressedRef.current = false;
      setPressed(false);
    };
    const onMouseLeave = () => setVisible(false);
    const onMouseEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("mouseenter", onMouseEnter);

    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("mouseenter", onMouseEnter);
      document.documentElement.classList.remove("custom-cursor-enabled");
    };
  }, [enabled]);

  if (!enabled) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-[100]">
      <div
        ref={ringRef}
        className="fixed left-0 top-0 h-10 w-10 rounded-full border border-primary/40 bg-primary/10 transition-[opacity,width,height,background-color,border-color] duration-200 ease-out"
        style={{
          opacity: visible ? 1 : 0,
          width: interactive ? "42px" : "28px",
          height: interactive ? "42px" : "28px",
          borderColor: interactive ? "hsl(var(--primary) / 0.7)" : "hsl(var(--primary) / 0.32)",
          backgroundColor: interactive ? "hsl(var(--primary) / 0.14)" : "hsl(var(--primary) / 0.06)",
        }}
      />
      <div
        ref={dotRef}
        className="fixed left-0 top-0 h-2 w-2 rounded-full bg-primary shadow-[0_0_14px_hsl(var(--primary)/0.45)] transition-[opacity,transform,background-color] duration-150 ease-out"
        style={{
          opacity: visible ? 1 : 0,
          backgroundColor: pressed ? "hsl(var(--primary) / 0.9)" : "hsl(var(--primary))",
        }}
      />
      <div
        ref={auraRef}
        className="fixed left-0 top-0 rounded-full border-2 border-primary/70 transition-[opacity,width,height,transform,border-color,box-shadow] duration-200 ease-out"
        style={{
          opacity: visible && interactive ? 0.8 : 0,
          width: interactive ? (pressed ? "48px" : "56px") : "0px",
          height: interactive ? (pressed ? "48px" : "56px") : "0px",
          borderColor: pressed ? "hsl(var(--primary) / 0.8)" : "hsl(var(--primary) / 0.62)",
          boxShadow: pressed
            ? "0 0 0 2px hsl(var(--primary) / 0.14), 0 0 18px hsl(var(--primary) / 0.22)"
            : "0 0 0 4px hsl(var(--primary) / 0.10), 0 0 22px hsl(var(--primary) / 0.20)",
        }}
      />
    </div>
  );
};

export default CustomCursor;