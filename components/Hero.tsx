import { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { Scene, useWebGLSupport } from './ThreeScene';
import { ErrorBoundary } from './ErrorBoundary';
import { useMouseParallax } from '@/hooks/use-mouse-parallax';

function ParallaxRings() {
  const { x: mx, y: my } = useMouseParallax(18);
  const { x: mx2, y: my2 } = useMouseParallax(32);
  const { x: mx3, y: my3 } = useMouseParallax(8);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Deep ambient radial glow — slowest layer */}
      <motion.div
        style={{ x: mx3, y: my3 }}
        className="absolute inset-0 pointer-events-none"
      >
        <div
          className="absolute"
          style={{
            top: '50%', left: '50%',
            width: 1200, height: 1200,
            transform: 'translate(-50%,-50%)',
            background: 'radial-gradient(ellipse, rgba(205,166,90,0.10) 0%, rgba(205,166,90,0.03) 35%, transparent 65%)',
          }}
        />
      </motion.div>

      {/* Ring layer 1 — largest, slowest */}
      <motion.div
        style={{ x: mx3, y: my3 }}
        className="absolute pointer-events-none"
        animate={{ rotate: 360 }}
        transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
        aria-hidden
        role="presentation"
      >
        <div
          className="absolute rounded-full border border-primary/8"
          style={{ width: 1100, height: 1100, top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}
        />
        {/* tick marks on ring */}
        {[0, 90, 180, 270].map(deg => (
          <div
            key={deg}
            className="absolute bg-primary/20"
            style={{
              width: 2, height: 16,
              top: '50%', left: '50%',
              transformOrigin: '1px -550px',
              transform: `translate(-50%, -550px) rotate(${deg}deg)`,
            }}
          />
        ))}
      </motion.div>

      {/* Ring layer 2 — mid speed */}
      <motion.div
        style={{ x: mx2, y: my2 }}
        className="absolute pointer-events-none"
        animate={{ rotate: -360 }}
        transition={{ duration: 55, repeat: Infinity, ease: 'linear' }}
        aria-hidden
        role="presentation"
      >
        <div
          className="absolute rounded-full border border-primary/12"
          style={{ width: 780, height: 780, top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}
        />
        {[45, 135, 225, 315].map(deg => (
          <div
            key={deg}
            className="absolute bg-primary/30"
            style={{
              width: 1, height: 12,
              top: '50%', left: '50%',
              transformOrigin: '0.5px -390px',
              transform: `translate(-50%, -390px) rotate(${deg}deg)`,
            }}
          />
        ))}
      </motion.div>

      {/* Ring layer 3 — fastest, closest */}
      <motion.div
        style={{ x: mx, y: my }}
        className="absolute pointer-events-none"
        animate={{ rotate: 360 }}
        transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
        aria-hidden
        role="presentation"
      >
        <div
          className="absolute rounded-full border border-primary/18"
          style={{ width: 480, height: 480, top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}
        />
        {/* Small diamond dots at 0/180 */}
        {[0, 180].map(deg => (
          <div
            key={deg}
            className="absolute w-1.5 h-1.5 bg-primary/60 rotate-45"
            style={{
              top: '50%', left: '50%',
              transformOrigin: '3px -240px',
              transform: `translate(-50%, -240px) rotate(${deg}deg)`,
            }}
          />
        ))}
      </motion.div>

      {/* Floating architectural corner brackets — mid layer */}
      <motion.div
        style={{ x: mx2, y: my2 }}
        className="absolute pointer-events-none"
      >
        {/* Top-left bracket */}
        <div className="absolute" style={{ top: '14%', left: '12%' }}>
          <motion.div
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="w-10 h-px bg-primary/50" />
            <div className="w-px h-10 bg-primary/50" />
          </motion.div>
        </div>
        {/* Bottom-right bracket */}
        <div className="absolute" style={{ bottom: '16%', right: '14%' }}>
          <motion.div
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 2.5 }}
          >
            <div className="w-10 h-px bg-primary/50 ml-auto" />
            <div className="w-px h-10 bg-primary/50 ml-auto" />
          </motion.div>
        </div>
      </motion.div>

      {/* Floating micro dots — foreground layer */}
      <motion.div
        style={{ x: mx, y: my }}
        className="absolute pointer-events-none w-full h-full"
      >
        {[
          { top: '28%', left: '8%', size: 3, delay: 0, dur: 7 },
          { top: '72%', left: '88%', size: 4, delay: 1.5, dur: 9 },
          { top: '18%', left: '78%', size: 2, delay: 3, dur: 6 },
          { top: '82%', left: '22%', size: 3, delay: 0.8, dur: 8 },
          { top: '42%', left: '94%', size: 2, delay: 2, dur: 7 },
          { top: '55%', left: '4%', size: 2, delay: 4, dur: 10 },
          { top: '35%', left: '60%', size: 1.5, delay: 1, dur: 5 },
        ].map((d, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary"
            style={{ top: d.top, left: d.left, width: d.size, height: d.size }}
            animate={{ y: [-12, 12, -12], opacity: [0.2, 0.7, 0.2] }}
            transition={{ duration: d.dur, repeat: Infinity, ease: 'easeInOut', delay: d.delay }}
          />
        ))}
      </motion.div>

      {/* Horizontal scanning beam */}
      <motion.div
        className="absolute w-full h-px"
        style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(205,166,90,0.12) 40%, rgba(205,166,90,0.22) 50%, rgba(205,166,90,0.12) 60%, transparent 100%)' }}
        animate={{ top: ['20%', '75%', '20%'] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Vertical scanning beam */}
      <motion.div
        className="absolute h-full w-px"
        style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(205,166,90,0.08) 40%, rgba(205,166,90,0.15) 50%, rgba(205,166,90,0.08) 60%, transparent 100%)' }}
        animate={{ left: ['15%', '80%', '15%'] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
      />
    </div>
  );
}

function HeroCanvas() {
  const webGLSupported = useWebGLSupport();
  if (webGLSupported === null || !webGLSupported) return null;
  return (
    <ErrorBoundary fallback={null}>
      <Suspense fallback={null}>
        <Canvas
          camera={{ position: [0, 0, 8], fov: 45 }}
          gl={{ failIfMajorPerformanceCaveat: false }}
          onCreated={({ gl }) => { gl.setPixelRatio(Math.min(window.devicePixelRatio, 2)); }}
          className="absolute inset-0"
        >
          <Scene />
        </Canvas>
      </Suspense>
    </ErrorBoundary>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const textY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const { x: mx, y: my } = useMouseParallax(10);

  return (
    <section
      ref={ref}
      className="relative h-[100dvh] w-full overflow-hidden bg-background flex items-center justify-center"
      data-testid="section-hero"
    >
      {/* Parallax background layer */}
      <motion.div style={{ scale: bgScale }} className="absolute inset-0 z-0">
        <ParallaxRings />
        <HeroCanvas />
      </motion.div>

      {/* Multi-depth fog gradient */}
      <div className="absolute inset-0 z-10 pointer-events-none" style={{
        background: 'linear-gradient(to bottom, rgba(20,14,8,0.15) 0%, rgba(20,14,8,0.05) 30%, rgba(20,14,8,0.05) 65%, rgba(20,14,8,0.75) 100%)',
      }} />

      {/* Text content — parallax scroll */}
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="relative z-20 container mx-auto px-6 flex flex-col items-center justify-center text-center"
      >
        {/* Subtitle — fastest layer */}
        <motion.div style={{ x: mx, y: my }}>
          <motion.span
            initial={{ opacity: 0, letterSpacing: '0.6em' }}
            animate={{ opacity: 1, letterSpacing: '0.35em' }}
            transition={{ duration: 1.4, delay: 0.2 }}
            className="uppercase text-primary text-xs font-medium mb-8 block tracking-[0.35em]"
          >
            Pune, India
          </motion.span>
        </motion.div>

        {/* Main heading — slower parallax */}
        <h1 className="font-serif leading-[0.92] mb-6">
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.35 }}
            className="block text-5xl md:text-7xl lg:text-8xl xl:text-[9rem] tracking-tight text-foreground"
          >
            HOUSE OF
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.5 }}
            className="block font-serif italic text-4xl md:text-6xl lg:text-7xl xl:text-8xl text-gradient-gold"
          >
            Design
          </motion.span>
        </h1>

        <motion.div
          className="w-px h-14 bg-gradient-to-b from-primary/60 to-transparent my-10"
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.9 }}
        />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="max-w-lg mx-auto text-base md:text-lg text-foreground/55 font-light leading-relaxed"
        >
          We transform blank rooms into soulful sanctuaries. Luxury interior design, crafted with purpose — for discerning clients across Pune.
        </motion.p>

        <motion.a
          href="#philosophy"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mt-12 flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-primary/70 hover:text-primary transition-colors duration-300 group"
        >
          Explore Our Work
          <span className="w-8 h-px bg-primary/60 group-hover:w-14 transition-all duration-500" />
        </motion.a>
      </motion.div>

      {/* Scroll indicator — foreground layer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        style={{ opacity: textOpacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
          <ArrowDown size={16} strokeWidth={1} className="text-primary/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
