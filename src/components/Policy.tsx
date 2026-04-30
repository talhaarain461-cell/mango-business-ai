import React from 'react';
import { motion } from 'motion/react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { Truck, RotateCcw, ShieldCheck, FileText } from 'lucide-react';

const policies = {
  'delivery-policy': {
    title: 'Delivery Policy',
    icon: <Truck size={32} className="text-brand-accent" />,
    content: (
      <div className="space-y-8">
        <div>
          <h3 className="text-xl font-black text-slate-900 mb-4 uppercase tracking-tight flex items-center gap-2">
            <span className="w-8 h-1 bg-brand-accent rounded-full"></span>
            Fast & Secure Shipping Across Pakistan
          </h3>
          <p className="text-slate-700 leading-relaxed">
            We deliver fresh mangoes directly from the orchards of Tando Allahyar to all major cities across Pakistan. Our priority is to ensure that you receive your mangoes in the freshest possible condition, perfectly ripened and ready to enjoy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white shadow-sm p-6 rounded-2xl border border-slate-200 focus-within:border-brand-accent/30 transition-colors">
            <h4 className="font-black text-slate-900 text-xs uppercase tracking-widest mb-3 text-brand-accent">Processing Times</h4>
            <p className="text-sm text-slate-600 leading-relaxed">Orders are typically processed within 24 hours. During peak harvest season, we pick mangoes in the morning to dispatch the same evening for maximum freshness.</p>
          </div>
          <div className="bg-white shadow-sm p-6 rounded-2xl border border-slate-200 focus-within:border-brand-accent/30 transition-colors">
            <h4 className="font-black text-slate-900 text-xs uppercase tracking-widest mb-3 text-brand-accent">Transit Times</h4>
            <p className="text-sm text-slate-600 leading-relaxed">Estimated delivery time is 2-4 working days. Karachi deliveries are faster (1-2 days), while remote areas may take up to 4 days.</p>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-black text-slate-900 mb-4 uppercase tracking-tight">Delivery Terms</h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-accent mt-1.5 shrink-0"></div>
              <p className="text-slate-700 text-sm italic">Tracking details are shared via WhatsApp automatically once your order is picked up by our logistics partner.</p>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-accent mt-1.5 shrink-0"></div>
              <p className="text-slate-700 text-sm">We use specialized perforated packaging to ensure ventilation, preventing the mangoes from overheating during transit.</p>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-accent mt-1.5 shrink-0"></div>
              <p className="text-slate-700 text-sm font-bold">Important: Cash on Delivery (COD) is strictly restricted to Tando Allahyar customers. Customers in all other cities must provide advance payment confirmation.</p>
            </li>
          </ul>
        </div>
      </div>
    )
  },
  'return-policy': {
    title: 'Return / Refund Policy',
    icon: <RotateCcw size={32} className="text-brand-accent" />,
    content: (
      <div className="space-y-8">
        <div>
          <h3 className="text-xl font-black text-slate-900 mb-4 uppercase tracking-tight">Quality Guarantee</h3>
          <p className="text-slate-700 leading-relaxed mb-6">
            At Aam Wala, we take immense pride in the quality of our fruit. Every box is hand-inspected before dispatch. However, as mangoes are perishable natural products, we have established clear guidelines for claims.
          </p>
          <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl mb-8">
            <p className="text-slate-700 text-sm font-medium leading-relaxed italic">
              "Due to the perishable nature of fresh fruit, we do not accept general returns or change-of-mind refunds once the box has been opened or the delivery is accepted."
            </p>
          </div>
        </div>

        <div>
           <h4 className="font-black text-slate-900 text-xs uppercase tracking-widest mb-4 text-brand-accent">Damaged or Incorrect Orders</h4>
           <p className="text-slate-700 text-sm mb-4 leading-relaxed">
             If you receive a box that is significantly damaged or contains the wrong variety, please follow these steps within 24 hours of delivery:
           </p>
           <ul className="space-y-4">
            <li className="flex items-start gap-3 bg-white shadow-sm p-4 rounded-xl border border-slate-200 transition-colors hover:border-brand-accent/30">
              <span className="font-black text-brand-accent">01.</span>
              <p className="text-slate-700 text-sm">Take clear high-resolution photos of the packaging and the affected fruit.</p>
            </li>
            <li className="flex items-start gap-3 bg-white shadow-sm p-4 rounded-xl border border-slate-200 transition-colors hover:border-brand-accent/30">
              <span className="font-black text-brand-accent">02.</span>
              <p className="text-slate-700 text-sm">Contact our WhatsApp support team immediately with your Order ID.</p>
            </li>
            <li className="flex items-start gap-3 bg-white shadow-sm p-4 rounded-xl border border-slate-200 transition-colors hover:border-brand-accent/30">
              <span className="font-black text-brand-accent">03.</span>
              <p className="text-slate-700 text-sm">Provide a brief description of the issue (e.g., transit bruising, incorrect weight).</p>
            </li>
          </ul>
        </div>

        <p className="text-xs text-slate-500 border-t border-slate-200 pt-6">Approved claims will be resolved through either a partial/full refund or a discount on your next order, depending on the severity of the issue.</p>
      </div>
    )
  },
  'privacy-policy': {
    title: 'Privacy Policy',
    icon: <ShieldCheck size={32} className="text-brand-accent" />,
    content: (
      <div className="space-y-8">
        <div>
          <h3 className="text-xl font-black text-slate-900 mb-4 uppercase tracking-tight">Your Data, Secured</h3>
          <p className="text-slate-700 leading-relaxed">
            Your trust is our most valuable asset. We are committed to protecting the personal information you share with us when ordering mangoes.
          </p>
        </div>

        <div className="space-y-6">
          <section>
            <h4 className="font-black text-slate-900 text-xs uppercase tracking-widest mb-3 text-brand-accent">Data Collection</h4>
            <p className="text-sm text-slate-600">We only collect essential details needed to fulfill your order: Name, Phone Number, and Shipping Address. We use your WhatsApp number for order updates and tracking links.</p>
          </section>
          
          <section>
            <h4 className="font-black text-slate-900 text-xs uppercase tracking-widest mb-3 text-brand-accent">Third-Party Sharing</h4>
            <p className="text-sm text-slate-600">We never sell or rent your data. Your address and phone number are shared ONLY with our authorized courier partners for the sole purpose of delivering your order.</p>
          </section>

          <section>
            <h4 className="font-black text-slate-900 text-xs uppercase tracking-widest mb-3 text-brand-accent">Payment Security</h4>
            <p className="text-sm text-slate-600">All payments are made via direct bank transfer, JazzCash, or Easypaisa. We do not store any credit card or financial data on our website servers.</p>
          </section>
        </div>

        <div className="bg-white shadow-sm p-6 rounded-2xl pb-0">
          <p className="text-xs text-slate-600 italic leading-relaxed">By using Aam Wala Online Store, you consent to this policy. We may update these terms occasionally to reflect changes in our service or legal requirements.</p>
        </div>
      </div>
    )
  },
  'terms': {
    title: 'Terms & Conditions',
    icon: <FileText size={32} className="text-brand-accent" />,
    content: (
      <div className="space-y-8">
        <div>
          <h3 className="text-xl font-black text-slate-900 mb-4 uppercase tracking-tight">Agreement of Use</h3>
          <p className="text-slate-700 leading-relaxed mb-4">
            By accessing this website and placing an order, you agree to be bound by the following terms and conditions.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div className="p-5 bg-white shadow-sm rounded-2xl border border-slate-200 hover:border-brand-accent/30 transition-colors">
            <h4 className="font-black text-slate-900 text-[10px] uppercase tracking-widest mb-2 text-brand-accent">Order Confirmation</h4>
            <p className="text-sm text-slate-700">Orders are only confirmed once payment evidence is verified (except for COD orders in Tando Allahyar). We reserve the right to cancel any order if payment is not received within 12 hours.</p>
          </div>

          <div className="p-5 bg-white shadow-sm rounded-2xl border border-slate-200 hover:border-brand-accent/30 transition-colors">
            <h4 className="font-black text-slate-900 text-[10px] uppercase tracking-widest mb-2 text-brand-accent">Seasonal Availability</h4>
            <p className="text-sm text-slate-700">Mangoes are seasonal fruits. If a selected variety suddenly becomes unavailable due to weather or quality issues, we will offer you an alternative or a full refund.</p>
          </div>

          <div className="p-5 bg-white shadow-sm rounded-2xl border border-slate-200 hover:border-brand-accent/30 transition-colors">
             <h4 className="font-black text-slate-900 text-[10px] uppercase tracking-widest mb-2 text-brand-accent">Weight Accuracy</h4>
             <p className="text-sm text-slate-700">We weigh every box at dispatch. Please note that fresh fruit can lose a negligible amount of moisture/weight during high-temperature transit. All our weights are "At Dispatch".</p>
          </div>

          <div className="p-5 bg-white shadow-sm rounded-2xl border border-slate-200 hover:border-brand-accent/30 transition-colors">
             <h4 className="font-black text-slate-900 text-[10px] uppercase tracking-widest mb-2 text-brand-accent">Intellectual Property</h4>
             <p className="text-sm text-slate-700">All content, photography, and branding on this site are the property of Aam Wala. Unauthorized use of our images or text is strictly prohibited.</p>
          </div>
        </div>
      </div>
    )
  }
};

export function Policy({ policyId: propsPolicyId }: { policyId?: string }) {
  const { policyId: paramsPolicyId } = useParams<{ policyId: string }>();
  const policyId = propsPolicyId || paramsPolicyId;
  const navigate = useNavigate();
  
  if (!policyId || !(policyId in policies)) {
    return <Navigate to="/" replace />;
  }
  
  const policy = policies[policyId as keyof typeof policies];

  return (
    <div className="py-16 lg:py-24 min-h-screen bg-white">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-slate-100 rounded-3xl p-8 md:p-12 shadow-sm"
        >
          <div className="flex items-center gap-4 mb-8 pb-8 border-b border-slate-100">
            <div className="p-4 bg-white shadow-sm rounded-2xl border border-slate-100">
              {policy.icon}
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-black uppercase tracking-tight">
              {policy.title}
            </h1>
          </div>
          
          <div className="max-w-none">
            {policy.content}
          </div>

          <div className="mt-12 pt-12 border-t border-slate-200">
            <button 
              onClick={() => {
                navigate('/');
              }}
              className="inline-flex items-center gap-2 text-xs font-black text-brand-accent uppercase tracking-widest hover:text-slate-900 transition-colors"
            >
              ← Back to Home
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
