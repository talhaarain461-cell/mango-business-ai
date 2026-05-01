import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { blogPosts } from '../data/blogData';
import { ArrowLeft, Clock } from 'lucide-react';

export function BlogDetail({ onNavigate }: { onNavigate: (target: string) => void }) {
  const { slug } = useParams();
  const navigate = useNavigate();
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="py-16 lg:py-24 text-center min-h-screen bg-transparent">
          <h1 className="text-3xl text-infinite-night font-bold mb-4">Blog Post Not Found</h1>
        <button onClick={() => onNavigate('blog')} className="text-brand-accent hover:underline font-bold">
          Return to Blog
        </button>
      </div>
    );
  }

  return (
    <motion.article 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen bg-transparent pb-24"
    >
      {/* Banner Image Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative h-[400px] md:h-[500px] w-full overflow-hidden"
      >
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 flex items-end">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <div className="flex items-center gap-4 text-[10px] font-black text-white/80 uppercase tracking-[0.2em] mb-4">
                <span className="flex items-center gap-2 bg-brand-accent text-slate-900 px-3 py-1 rounded-full"><Clock size={12} /> {post.readTime}</span>
                <span>{post.date}</span>
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] max-w-4xl drop-shadow-2xl">
                {post.title}
              </h1>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        
        {/* Back Button */}
        <button 
          onClick={() => onNavigate('blog')}
          className="flex items-center text-slate-500 hover:text-brand-accent transition-colors mb-12 group"
        >
          <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">Back to Blog</span>
        </button>

        {/* Post Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="prose prose-slate prose-lg max-w-none 
            [&_h2]:text-infinite-night [&_h2]:font-black [&_h2]:uppercase [&_h2]:tracking-tight
            prose-p:text-slate-700 prose-p:leading-relaxed prose-p:font-medium
            prose-li:text-slate-700 prose-li:font-medium
            prose-strong:text-slate-900 prose-strong:font-black
            prose-img:rounded-[32px] prose-img:shadow-xl
            mb-16"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Shop Now Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <button 
            onClick={() => onNavigate('shop')}
            className="inline-block bg-brand-primary text-white px-10 py-4 rounded-xl font-black uppercase tracking-widest text-sm hover:bg-brand-accent hover:text-brand-primary transition-all shadow-md active:scale-95"
          >
            Shop Now
          </button>
        </motion.div>

        {/* Post Footer */}
        <div className="mt-16 pt-8 border-t border-slate-200 text-center text-slate-600">
          <p className="font-medium tracking-wide">Thank you for reading!</p>
          <p className="text-sm mt-2">Prepared by the Aam Wala Team</p>
        </div>

      </div>
    </motion.article>
  );
}
