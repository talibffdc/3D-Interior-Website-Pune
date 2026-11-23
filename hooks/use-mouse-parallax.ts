import { useEffect } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';

export function useMouseParallax(strength = 1) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springCfg = { stiffness: 60, damping: 20, mass: 1 };
  const x = useSpring(mouseX, springCfg);
  const y = useSpring(mouseY, springCfg);

  useEffect(() => {
    function onMove(e: MouseEvent) {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      mouseX.set(((e.clientX - cx) / cx) * strength);
      mouseY.set(((e.clientY - cy) / cy) * strength);
    }
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [mouseX, mouseY, strength]);

  return { x, y };
}
