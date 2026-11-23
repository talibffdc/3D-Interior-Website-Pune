import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTilt } from '@/hooks/use-tilt';
import { useMouseParallax } from '@/hooks/use-mouse-parallax';

const team = [
  {
    id: 1,
    name: 'Aditi Ranade',
    role: 'Principal Designer & Founder',
    image: '/images/team-1.png',
    bio: 'Trained at NID Ahmedabad, Aditi brings 14 years of transforming Pune\'s most ambitious residences and commercial spaces.',
  },
  {
    id: 2,
    name: 'Rohan Mehta',
    role: 'Lead Architect & Design Director',
    image: '/images/team-2.png',
    bio: 'With roots in sustainable Indian architecture, Rohan blends Pune\'s urban identity with global design sensibility.',
  },
];

function TeamCard({ member, index }: { member: typeof team[number]; index: number }) {
  const { ref, rotateX, rotateY, onMouseMove, onMouseLeave } = useTilt(6);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, rotateX: 14 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.85, delay: index * 0.2, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 1000 }}
      className="group"
    >
      {/* Image container — extra parallax inside the card */}
      <div className="relative aspect-[3/4] overflow-hidden mb-6 bg-card gold-border-glow">
        <motion.img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover"
          style={{ scale: 1.08 }}
          whileHover={{ scale: 1.0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          loading="lazy"
        />
        {/* Hover overlay bio — pushed forward in Z */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6"
          style={{ transform: 'translateZ(20px)' }}
        >
          <div className="glass rounded-sm p-4">
            <p className="text-foreground/70 font-light text-sm leading-relaxed">{member.bio}</p>
          </div>
        </div>

        {/* Index number — very deep background layer */}
        <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <span className="font-serif text-5xl text-foreground/8 leading-none select-none">0{member.id}</span>
        </div>
      </div>

      {/* Name + role — pushed forward */}
      <div style={{ transform: 'translateZ(18px)' }} className="flex items-start justify-between">
        <div>
          <h3 className="font-serif text-2xl text-foreground mb-1">{member.name}</h3>
          <p className="uppercase tracking-[0.18em] text-xs text-primary/70 font-light">{member.role}</p>
        </div>
        <div className="w-8 h-px bg-primary/40 mt-3 group-hover:w-14 transition-all duration-500" />
      </div>
    </motion.div>
  );
}

export function Team() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const bgY  = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const fgY  = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const { x: mx, y: my } = useMouseParallax(18);

  return (
    <section id="team" ref={sectionRef} className="py-32 bg-background relative overflow-hidden" data-testid="section-team">
      {/* Layer 0 — background glow + giant ghost text */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px]"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(205,166,90,0.06) 0%, transparent 70%)' }}
        />
        {/* Ghost text */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden flex justify-center">
          <span className="font-serif text-[20vw] leading-none text-foreground/[0.018] select-none whitespace-nowrap">STUDIO</span>
        </div>
      </motion.div>

      {/* Layer 1 — floating rings */}
      <motion.div style={{ x: mx, y: my }} className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute rounded-full border border-primary/6"
          style={{ width: 550, height: 550, top: '50%', right: '-15%', transform: 'translateY(-50%)' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 70, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute rounded-full border border-foreground/4"
          style={{ width: 380, height: 380, bottom: '-5%', left: '-5%' }}
          animate={{ rotate: -360 }}
          transition={{ duration: 55, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute w-px h-28 bg-gradient-to-b from-primary/25 to-transparent"
          style={{ top: '8%', left: '50%' }}
          animate={{ y: [-15, 15, -15] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* Layer 2 — content */}
      <motion.div style={{ y: fgY }} className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="uppercase tracking-[0.25em] text-primary text-xs font-medium mb-4 block">The Studio</span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight">Our Leadership</h2>
          <div className="w-12 h-px bg-primary/50 mx-auto mt-8" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-5xl mx-auto" style={{ perspective: '1200px' }}>
          {team.map((member, index) => (
            <TeamCard key={member.id} member={member} index={index} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
