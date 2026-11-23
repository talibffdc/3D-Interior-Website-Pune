import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { MapPin, Mail, Phone } from 'lucide-react';
import { useMouseParallax } from '@/hooks/use-mouse-parallax';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Please enter a valid email address.'),
  phone: z.string().min(5, 'Please enter a valid phone number.'),
  projectType: z.string().min(1, 'Please select a project type.'),
  message: z.string().min(10, 'Message must be at least 10 characters.'),
});

export function Contact() {
  const { toast } = useToast();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const bgY    = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const leftY  = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const rightY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const { x: mx, y: my } = useMouseParallax(16);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '', email: '', phone: '', projectType: '', message: '' },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({ title: 'Inquiry Received', description: 'We will contact you shortly to discuss your project.' });
    form.reset();
  }

  return (
    <section id="contact" ref={sectionRef} className="py-32 bg-secondary relative overflow-hidden" data-testid="section-contact">
      {/* Layer 0 — background depth glow */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[700px] h-[700px]"
          style={{ background: 'radial-gradient(ellipse at 80% 20%, rgba(205,166,90,0.07) 0%, transparent 65%)' }}
        />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px]"
          style={{ background: 'radial-gradient(ellipse at 20% 80%, rgba(205,166,90,0.04) 0%, transparent 65%)' }}
        />
      </motion.div>

      {/* Layer 1 — floating geometric rings */}
      <motion.div style={{ x: mx, y: my }} className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute rounded-full border border-primary/6"
          style={{ width: 600, height: 600, top: '-10%', right: '-15%' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 65, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute rounded-full border border-foreground/4"
          style={{ width: 400, height: 400, bottom: '-15%', left: '-10%' }}
          animate={{ rotate: -360 }}
          transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
        />
        {/* Floating lines */}
        <motion.div
          className="absolute w-px h-36 bg-gradient-to-b from-primary/25 to-transparent"
          style={{ top: '8%', left: '50%' }}
          animate={{ y: [-12, 12, -12] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left info — parallax upward */}
          <motion.div
            style={{ y: leftY }}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="uppercase tracking-[0.25em] text-primary text-xs font-medium mb-4 block">Inquiries</span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 leading-tight">
              Begin the<br />Conversation
            </h2>
            <div className="w-12 h-px bg-primary/50 mb-10" />
            <p className="text-foreground/60 font-light leading-relaxed mb-14 max-w-md text-lg">
              We accept a limited number of commissions each year to ensure uncompromising quality and meticulous attention to detail.
            </p>

            <div className="space-y-8">
              {[
                { icon: MapPin, label: 'Studio', lines: ['Plot 7, Koregaon Park Lane 3', 'Pune, Maharashtra 411001', 'India'] },
                { icon: Mail, label: 'Email', lines: ['hello@houseofdesign.in'] },
                { icon: Phone, label: 'Phone', lines: ['+91 20 4108 5500'] },
              ].map(({ icon: Icon, label, lines }, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.12, duration: 0.6 }}
                >
                  <div className="w-10 h-10 rounded-full border border-primary/25 flex items-center justify-center flex-shrink-0 bg-primary/5 mt-1">
                    <Icon size={16} className="text-primary" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="uppercase tracking-[0.2em] text-xs text-foreground/40 mb-2">{label}</h4>
                    {lines.map((l, j) => (
                      <p key={j} className="text-foreground/80 font-light leading-relaxed">{l}</p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right form — parallax at a different speed */}
          <motion.div
            style={{ y: rightY }}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="glass-card rounded-sm p-8 md:p-12 relative"
          >
            {/* Inner depth shadow */}
            <div className="absolute inset-0 rounded-sm pointer-events-none"
              style={{ boxShadow: 'inset 0 1px 0 rgba(255,248,235,0.07), inset 0 -1px 0 rgba(12,8,4,0.5)' }}
            />
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase tracking-[0.18em] text-xs font-light text-foreground/50">Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Priya Sharma" {...field}
                          className="bg-transparent border-border/40 focus-visible:ring-primary rounded-none border-x-0 border-t-0 px-0 focus-visible:ring-0 focus-visible:border-primary transition-colors"
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase tracking-[0.18em] text-xs font-light text-foreground/50">Email</FormLabel>
                      <FormControl>
                        <Input placeholder="priya@example.com" type="email" {...field}
                          className="bg-transparent border-border/40 focus-visible:ring-primary rounded-none border-x-0 border-t-0 px-0 focus-visible:ring-0 focus-visible:border-primary transition-colors"
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField control={form.control} name="phone" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase tracking-[0.18em] text-xs font-light text-foreground/50">Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="+91 98765 43210" type="tel" {...field}
                          className="bg-transparent border-border/40 focus-visible:ring-primary rounded-none border-x-0 border-t-0 px-0 focus-visible:ring-0 focus-visible:border-primary transition-colors"
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="projectType" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase tracking-[0.18em] text-xs font-light text-foreground/50">Project Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-transparent border-border/40 focus:ring-primary rounded-none border-x-0 border-t-0 px-0 focus:ring-0 focus:border-primary transition-colors">
                            <SelectValue placeholder="Select a type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-card border-border rounded-sm">
                          <SelectItem value="residential">Residential</SelectItem>
                          <SelectItem value="commercial">Commercial</SelectItem>
                          <SelectItem value="hospitality">Hospitality</SelectItem>
                          <SelectItem value="kitchen-bath">Kitchen & Bath</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )} />
                </div>
                <FormField control={form.control} name="message" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase tracking-[0.18em] text-xs font-light text-foreground/50">Project Details</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Tell us about your space and vision..."
                        className="min-h-[120px] bg-transparent border-border/40 focus-visible:ring-primary rounded-none border-x-0 border-t-0 px-0 focus-visible:ring-0 focus-visible:border-primary transition-colors resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )} />
                <Button type="submit"
                  className="w-full rounded-none uppercase tracking-[0.25em] text-xs font-medium btn-gold text-primary-foreground h-14 mt-2"
                  data-testid="button-submit-contact"
                >
                  Submit Inquiry
                </Button>
              </form>
            </Form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
