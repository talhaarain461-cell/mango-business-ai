import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      number: 1,
      question: "What does “Export Quality” mean?",
      answer: (
        <>
          <p className="mb-4">
            Export Quality means these are the best of the best mangoes. Usually, these top-grade fruits are sent to other countries. They are big, have a perfect shape, and are extra sweet.
          </p>
          <p>
            At AAM WALA, we bring these same world-class mangoes to you right here in Pakistan.
          </p>
        </>
      )
    },
    {
      number: 2,
      question: "What is the difference in “Premium Quality”?",
      answer: (
        <>
          <p className="mb-4">
            Premium Quality mangoes are carefully selected, hand-picked, and properly cleaned to ensure the best freshness, taste, and appearance. They are of higher quality compared to regular market mangoes, which may have spots or uneven ripening.
          </p>
          <p>
            Both Premium and standard mangoes are naturally grown without harmful chemicals, but Premium ones are more carefully sorted for better quality.
          </p>
        </>
      )
    },
    {
      number: 3,
      question: "How can I place an order?",
      answer: (
        <>
          <p className="mb-4">
            It’s very easy! Just browse our mangoes, choose the ones you like, and click “Buy Now.”
          </p>
          <p className="mb-4">
            Enter your name, phone number, city, address, box size (kg), quantity, and payment details, then confirm your order. We will take care of the rest and deliver it to your doorstep.
          </p>
          <p>
            <strong>Please note:</strong> Advance payment is required for all orders. Cash on Delivery (COD) is only available for customers in Tando Allahyar.
          </p>
        </>
      )
    },
    {
      number: 4,
      question: "Can I buy in bulk or wholesale?",
      answer: (
        <>
          <p className="mb-4">
            Yes, you can. For large orders, please send us a message on WhatsApp. Tell us how much you need and where you want them delivered.
          </p>
          <p>
            We will give you the best wholesale price and tell you when they can arrive.
          </p>
        </>
      )
    },
    {
      number: 5,
      question: "Do I have to pay in advance?",
      answer: (
        <>
          <p className="mb-4">
            Yes, for delivery across Pakistan, we need payment before we send the order. This is because delivery companies don't offer "Cash on Delivery" for fresh fruits like mangoes. 
          </p>
          <p>
            If you are in Tando Allahyar, you can pay when your order arrives.
          </p>
        </>
      )
    },
    {
      number: 6,
      question: "How can I pay?",
      answer: (
        <>
          <p className="mb-4">We make it easy to pay using:</p>
          <p>
            Bank Transfer, Easypaisa, JazzCash, or Raast.
          </p>
        </>
      )
    },
    {
      number: 7,
      question: "Can I return the mangoes?",
      answer: (
        <>
          <p className="mb-4">
            Since mangoes are fresh fruit and can spoil quickly, we cannot take them back once delivered. But don't worry, we check every box carefully before sending it.
          </p>
          <p>
            If you get a box that is damaged, please message us on WhatsApp within 24 hours so we can help you out.
          </p>
        </>
      )
    },
    {
      number: 8,
      question: "How do I track my order?",
      answer: (
        <p>
          Once we send your box, we will share a tracking number with you on WhatsApp. You can use it to see exactly where your mangoes are.
        </p>
      )
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-white relative overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-accent/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 text-brand-accent mb-4">
            <HelpCircle size={20} />
            <span className="text-sm font-black tracking-widest uppercase">Got Questions?</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-infinite-night uppercase tracking-tight mb-4">
            Frequently Asked <span className="text-brand-accent">Questions (FAQ)</span>
          </h2>
          <div className="w-24 h-1 bg-brand-accent mx-auto mt-6 rounded-full px-4" />
        </motion.div>
 
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`bg-white shadow-sm border rounded-2xl overflow-hidden transition-all duration-300 ${
                  isOpen ? 'border-brand-accent shadow-sm shadow-brand-accent/5 bg-white' : 'border-slate-200 hover:border-slate-300 transition-colors'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className={`text-lg font-bold pr-8 transition-colors ${isOpen ? 'text-brand-primary' : 'text-slate-700'}`}>
                    Q{faq.number}: {faq.question}
                  </span>
                  <div className={`p-2 rounded-full transition-colors duration-300 flex-shrink-0 ${
                    isOpen ? 'bg-brand-accent text-slate-900' : 'bg-slate-100 text-slate-600'
                  }`}>
                    <ChevronDown size={20} className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-6 pt-2 text-slate-600 leading-relaxed font-medium">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
 
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center justify-center p-1 rounded-full bg-slate-50 border border-slate-200 shadow-sm mb-6">
            <div className="px-6 py-2 bg-white rounded-full flex items-center gap-2">
              <span className="text-xl">⭐</span>
              <span className="text-brand-accent font-black tracking-widest uppercase text-sm">TRUST STATEMENT</span>
            </div>
          </div>
          <p className="text-xl font-medium text-slate-600 max-w-3xl mx-auto leading-relaxed">
            At AAM WALA, we promise to deliver fresh, clean, and best-quality mangoes from our farm to your home with honesty and care.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
