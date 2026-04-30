import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Clock } from 'lucide-react';
import { blogPosts } from '../data/blogData';
import { useNavigate } from 'react-router-dom';

export function BlogList({ onNavigate }: { onNavigate: (target: string) => void }) {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="py-16 lg:py-24 bg-transparent min-h-screen"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-5xl font-black text-infinite-night uppercase tracking-tight mb-4"
          >
            AAM WALA <span className="text-brand-accent">BLOG</span>
          </motion.h1>
          <div className="w-24 h-1 bg-brand-accent mx-auto mb-8 rounded-full" />
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl md:text-2xl font-bold text-infinite-night mb-4"
          >
            Welcome to Our Blog
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-slate-500 max-w-3xl mx-auto text-lg leading-relaxed font-medium"
          >
            Discover everything about premium mangoes, farming heritage, quality standards, and expert tips to enjoy the freshest taste of nature. At AAM WALA, we focus on delivering fresh, high-quality mangoes directly from farms to your doorstep.
          </motion.p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {blogPosts.map((post, index) => (
            <motion.article 
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => {
                navigate(`/blog/${post.slug}`);
              }}
              className="group relative h-[400px] md:h-[450px] rounded-[40px] overflow-hidden cursor-pointer shadow-xl shadow-slate-200"
            >
              {/* Background Image */}
              <img 
                src={post.image} 
                alt={post.title} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition-colors duration-500 flex flex-col items-center justify-center p-8 text-center">
                
                {/* Meta info (optional, keeping it for info) */}
                <span className="absolute top-8 left-1/2 -translate-x-1/2 flex items-center gap-2 text-[10px] font-black text-white/70 uppercase tracking-[0.2em]">
                  <Clock size={12} /> {post.readTime}
                </span>

                {/* Title */}
                <h2 className="text-2xl md:text-3xl font-black text-white leading-tight mb-4 drop-shadow-lg">
                  {post.title}
                </h2>

                {/* CTA - Hidden by default, shown on hover? Or just keep it clean */}
                <div className="mt-4 flex items-center font-black text-brand-accent text-xs uppercase tracking-widest opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                  Read Article
                  <ArrowRight size={14} className="ml-2" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Final CTA */}
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="bg-white border border-slate-200 rounded-[40px] p-8 md:p-12 text-center max-w-4xl mx-auto shadow-md"
        >
          <h2 className="text-xl md:text-2xl font-black text-infinite-night mb-8 uppercase tracking-tight leading-relaxed">
            Order premium export quality mangoes today from AAM WALA Online Store and experience the true taste of freshness delivered to your doorstep.
          </h2>
          <button 
            onClick={() => onNavigate('shop')}
            className="inline-block bg-brand-primary text-white px-10 py-4 rounded-xl font-black uppercase tracking-widest text-sm hover:bg-brand-accent hover:text-brand-primary transition-all shadow-md active:scale-95"
          >
            Shop Now
          </button>
        </motion.div>

      </div>
    </motion.div>
  );
}
