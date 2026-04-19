import { motion } from 'motion/react';

export function About() {
  return (
    <section className="space-y-8">
      <h2 className="text-3xl font-bold tracking-tight text-gray-900">About the Event</h2>
      
      <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed space-y-6">
        <p className="text-lg">
          Experience the pinnacle of electronic music as Midnight Resonance returns for its most ambitious edition yet. Set against the industrial backdrop of JIEXPO, this year's festival transforms the space into a luminous sanctuary of sound and light.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
          <motion.div 
            whileHover={{ y: -4 }}
            className="bg-gray-50 p-8 rounded-3xl border border-gray-100"
          >
            <h4 className="text-indigo-600 font-bold mb-3 tracking-tight">The Lineup</h4>
            <p className="text-sm text-gray-500 leading-relaxed">
              Featuring world-class headliners, local legends, and emerging artists across three immersive stages: The Void, The Pulse, and The Horizon.
            </p>
          </motion.div>
          <motion.div 
            whileHover={{ y: -4 }}
            className="bg-gray-50 p-8 rounded-3xl border border-gray-100"
          >
            <h4 className="text-indigo-600 font-bold mb-3 tracking-tight">The Experience</h4>
            <p className="text-sm text-gray-500 leading-relaxed">
              High-fidelity audio systems, 360-degree visual projections, and curated food & beverage lounges for a complete sensory journey.
            </p>
          </motion.div>
        </div>

        <p className="text-lg">
          Midnight Resonance is more than a music festival—it is a convergence of digital art and sonic mastery. Designed for the discerning listener, every detail from the acoustic treatment of the halls to the choreographed light shows has been precision-engineered for maximum impact.
        </p>
      </div>
    </section>
  );
}
