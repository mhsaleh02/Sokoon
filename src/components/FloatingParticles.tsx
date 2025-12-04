import { useMemo } from 'react';

interface Particle {
  id: number;
  size: number;
  x: number;
  y: number;
  duration: number;
  delay: number;
  opacity: number;
}

const FloatingParticles = () => {
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: 10 }, (_, i) => ({
      id: i,
      size: Math.random() * 2 + 1,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 20 + 25,
      delay: Math.random() * -30,
      opacity: Math.random() * 0.15 + 0.05,
    }));
  }, []);

  return (
    <>
    <canvas className="fixed inset-0 h-dvh w-dvw" id="particle-canvas"></canvas>
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
    </div>
    </>
  );
};

export default FloatingParticles;
