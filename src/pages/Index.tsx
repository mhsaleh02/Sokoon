import { useState } from 'react';
import { motion } from 'framer-motion';
import Preloader from '@/components/Preloader';
import BreathingGradient from '@/components/BreathingGradient';
import FloatingParticles from '@/components/FloatingParticles';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import ExperienceSection from '@/components/ExperienceSection';
import PhilosophySection from '@/components/PhilosophySection';
import CTASection from '@/components/CTASection';
import '../lib/script.js';
<!-- Start of HubSpot Embed Code -->
<script type="text/javascript" id="hs-script-loader" async defer src="//js-eu1.hs-scripts.com/147407225.js"></script>
<!-- End of HubSpot Embed Code -->
const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}

      <motion.main
        className="relative bg-background min-h-screen overflow-x-hidden"
      >
        <FloatingParticles />
        {
          !isLoading && (
            <>
              {/* Atmospheric Background */}
              <BreathingGradient />

              {/* Navigation */}
              <Navigation />

              {/* Page Sections */}
              <HeroSection />
              <ExperienceSection />
              <PhilosophySection />
              <CTASection />
            </>
          )
        }
      </motion.main>
    </>
  );
};

export default Index;
