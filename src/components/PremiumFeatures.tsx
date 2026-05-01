import React from 'react';
import { motion } from 'motion/react';

interface FeatureSectionProps {
  heading: string;
  text: string;
  image: string;
  reverse?: boolean;
  onDiscoverMore?: () => void;
}

const FeatureSection: React.FC<FeatureSectionProps> = ({ heading, text, image, reverse, onDiscoverMore }) => {
  return (
    <div className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center py-20 md:py-24 px-4 sm:px-6 lg:px-12 gap-12 md:gap-24 overflow-hidden`}>
      {/* Image Container */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="w-full md:w-1/2 aspect-square"
      >
        <div className="w-full h-full group cursor-pointer relative">
          <div className="absolute inset-4 bg-white/10 blur-3xl -z-10 group-hover:bg-brand-accent/20 transition-colors duration-1000"></div>
          
          <div className="w-full h-full overflow-hidden rounded-[48px] shadow-2xl border-4 border-white/20">
            <img 
              src={image} 
              alt={heading} 
              className="w-full h-full object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-110"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </motion.div>

      {/* Text Container */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="w-full md:w-1/2 flex flex-col justify-center"
      >
        <div className="max-w-xl mx-auto md:mx-0">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-1 bg-brand-accent rounded-full"></div>
            <div className="w-3 h-3 border-2 border-white/30 rounded-full"></div>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8 uppercase tracking-tighter leading-[0.9] flex flex-col">
            <span className="text-brand-accent text-sm tracking-[0.4em] font-black mb-4 ml-1">Exquisite Selection</span>
            <span className="relative">
              {heading}
            </span>
          </h2>
          
          <p className="text-white/90 text-xl leading-relaxed font-normal">
            {text}
          </p>
          
          <div 
            onClick={onDiscoverMore}
            className="mt-12 group/btn cursor-pointer inline-flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover/btn:border-brand-accent group-hover/btn:bg-brand-accent transition-all duration-500">
              <svg className="w-5 h-5 text-white group-hover/btn:text-slate-900 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
            <span className="text-xs font-black uppercase tracking-[0.3em] text-white group-hover/btn:text-brand-accent transition-colors">
              Discover More
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const PremiumFeatures: React.FC<{ onNavigate: (target: string) => void }> = ({ onNavigate }) => {
  // ... (sections array remains the same)
  const sections = [
    {
      heading: "KING OF FRUITS",
      text: "Mangoes are known as the king of fruits because they are sweet, juicy, and smell amazing. Every bite is full of fresh flavor that melts in your mouth. We grow them with great care so you get the best taste and freshness in every single mango.",
      image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiXfv2juji_ChZWO6rhwey_9wvEE0thMiuyFUiRU2Z9jTZHlQvAkW8abkdNK5OCGgAPZs-HoiSnN8uQ1IYFRmluob54qJHb1GvJb_W1R9o4gxixqOXsFYsIqPSeSyC_o3U6igEN5Lnsrf7mrA3UbrZHCUVVrAZhDJKFo-qgVur_-qnTrVoPoULsdzBGZXA/s1600/blog%20image-9.png",
      reverse: false
    },
    {
      heading: "BEST EXPORT QUALITY",
      text: "We select the finest mangoes meeting international standards. Our team hand-picks them in the unripe stage, carefully inspects them, and packs them securely in high-quality packaging. This ensures freshness and safety until delivery. We focus on size and quality so that every box delivers a premium experience to our customers.",
      image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgicPJSYXQJfkA0c4JJNS9qKMP3pHKNyhpV092syKyx6_Muax1-Xcihn7DuGlgSCilKvE8V0PPChGKg1SXHVpz7r1Z91rXDE033ssY7aRS6GXndok7bw9nHycm4TDRaaegnPgk3HEVIYqIK-R9s4rkpbFaOHq-CX_6QMMfwGxXXA5DE29QUqmCVfzyFRnE/s1600/ChatGPT%20Image%20Apr%2027,%202026,%2001_56_47%20PM.png",
      reverse: true
    },
    {
      heading: "FRESH FROM THE FARM",
      text: "Our mangoes come directly from the famous gardens of Tando Allahyar. We handle them with care from the moment they are picked until they reach your door. This way, you get fruit that is pure, juicy, and tastes just like it was picked today.",
      image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEivw_uDF6Ncp72w1OzB3KbuPZ31RpXT6svD9l9YUhPKMjk1vOt2-ObLal-K7UAqjyS6_EQWO7PSK35IBRaq4Iy8LOcFP3J-q1JTysuszvoRsr9DAts7xdp_bM0zctX8cfQCD2d_xZjYiXsB7q_gS6ElyMpMTsTgplRGwXrBlvmiyWONUXj6hAq0JLUyjz8/s1600/IMG_20210519_201151_900.jpg",
      reverse: false
    }
  ];

  return (
    <section className="bg-brand-primary overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {sections.map((section, index) => (
          <FeatureSection 
            key={index}
            heading={section.heading}
            text={section.text}
            image={section.image}
            reverse={section.reverse}
            onDiscoverMore={() => onNavigate('blog')}
          />
        ))}
      </div>
    </section>
  );
};
