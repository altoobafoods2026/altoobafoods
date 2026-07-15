import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Phone, Mail, Clock, MessageSquare, ShieldCheck, Zap, Award, ChevronDown, Send } from 'lucide-react';
import { useToastStore } from '../store/toastStore';

export default function ContactUs() {
  const showToast = useToastStore((state) => state.showToast);
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [activeFaq, setActiveFaq] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const faqs = [
    { q: "How quickly do you respond?", a: "We aim to respond to all inquiries within 2-4 business hours during our regular operating times. For urgent matters, please use our WhatsApp support line." },
    { q: "Can I contact via WhatsApp?", a: "Yes, absolutely. You can reach our dedicated WhatsApp support line at +91 85919 16905 for quick queries, order updates, or consultations." },
    { q: "What are your business hours?", a: "Our team is available Monday through Saturday, from 10:00 AM to 7:00 PM (IST). We are closed on Sundays and public holidays." },
    { q: "Where are you located?", a: "Our primary apothecary lab and fulfillment center is located in Rampur, Uttar Pradesh, India (244901). All our authentic remedies are shipped globally from here." }
  ];

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      showToast('Message sent successfully! We will get back to you soon.');
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="bg-[#FAF7F2] min-h-screen font-sans overflow-x-hidden selection:bg-[#D4A24C] selection:text-white">
      
      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 px-6 sm:px-12 flex flex-col items-center justify-center text-center z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#F3EBE0] to-[#FAF7F2] -z-10" />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[url('/bg_minimal_gold_mandala_1782721892727.png')] bg-contain bg-no-repeat bg-center opacity-5 -translate-y-1/2 translate-x-1/4 pointer-events-none -z-10" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[url('/bg_minimal_gold_mandala_1782721892727.png')] bg-contain bg-no-repeat bg-center opacity-[0.03] translate-y-1/3 -translate-x-1/4 pointer-events-none -z-10" />
        
        <motion.span 
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="text-[#D4A24C] text-[11px] md:text-[13px] font-sans font-bold uppercase tracking-[0.3em] mb-4"
        >
          Get In Touch
        </motion.span>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
          className="font-serif font-bold text-4xl md:text-6xl lg:text-7xl text-[#0D3B2A] tracking-tight mb-6 drop-shadow-sm"
        >
          Connect With Us
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[15px] md:text-[17px] text-[#0D3B2A]/70 max-w-2xl mx-auto leading-relaxed"
        >
          Experience premium care and personalized support. Reach out for queries regarding our prophetic medicine, natural ingredients, or your orders.
        </motion.p>
      </section>

      {/* MAIN 2-COLUMN LAYOUT */}
      <section className="max-w-[1300px] mx-auto px-6 sm:px-8 lg:px-12 -mt-4 mb-24 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* LEFT: Luxury Contact Card */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="lg:col-span-2 bg-[#0D3B2A] rounded-[32px] p-8 sm:p-10 md:p-12 text-white relative overflow-hidden shadow-[0_20px_40px_rgba(13,59,42,0.15)] h-full flex flex-col justify-between"
          >
            {/* Dark Pattern Overlay */}
            <div className="absolute inset-0 bg-[url('/bg_minimal_gold_mandala_1782721892727.png')] bg-cover bg-center opacity-[0.04] pointer-events-none mix-blend-overlay"></div>
            
            <div className="relative z-10">
              <h2 className="font-serif text-3xl font-bold mb-2">Al-Tooba</h2>
              <p className="text-[#D4A24C] font-sans text-[10px] uppercase tracking-[0.2em] font-bold mb-12 opacity-90">Islamic Wellness</p>
              
              <div className="space-y-8">
                <div className="flex items-start gap-5 group">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10 group-hover:border-[#D4A24C]/60 group-hover:bg-[#D4A24C]/10 transition-all duration-300">
                    <MapPin className="text-[#D4A24C] w-5 h-5" />
                  </div>
                  <div className="pt-1">
                    <h4 className="text-[10px] uppercase tracking-widest text-[#D4A24C] font-bold mb-1.5">Apothecary Lab</h4>
                    <p className="text-[14px] text-white/80 leading-relaxed font-light">Rampur, Uttar Pradesh<br/>India, 244901</p>
                  </div>
                </div>

                <div className="flex items-start gap-5 group">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10 group-hover:border-[#D4A24C]/60 group-hover:bg-[#D4A24C]/10 transition-all duration-300">
                    <Phone className="text-[#D4A24C] w-5 h-5" />
                  </div>
                  <div className="pt-1">
                    <h4 className="text-[10px] uppercase tracking-widest text-[#D4A24C] font-bold mb-1.5">Direct Line</h4>
                    <a href="tel:+918591916905" className="text-[14px] text-white/80 hover:text-white transition-colors block mb-1 font-light">+91 85919 16905</a>
                    <a href="https://wa.me/918591916905" target="_blank" rel="noreferrer" className="text-[13px] text-[#D4A24C] hover:text-white transition-colors flex items-center gap-1.5 mt-2">
                      <MessageSquare className="w-4 h-4" /> WhatsApp Support
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-5 group">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10 group-hover:border-[#D4A24C]/60 group-hover:bg-[#D4A24C]/10 transition-all duration-300">
                    <Mail className="text-[#D4A24C] w-5 h-5" />
                  </div>
                  <div className="pt-1">
                    <h4 className="text-[10px] uppercase tracking-widest text-[#D4A24C] font-bold mb-1.5">Email Support</h4>
                    <a href="mailto:sales@al-tooba.com" className="text-[14px] text-white/80 hover:text-white transition-colors font-light">sales@al-tooba.com</a>
                  </div>
                </div>

                <div className="flex items-start gap-5 group">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10 group-hover:border-[#D4A24C]/60 group-hover:bg-[#D4A24C]/10 transition-all duration-300">
                    <Clock className="text-[#D4A24C] w-5 h-5" />
                  </div>
                  <div className="pt-1">
                    <h4 className="text-[10px] uppercase tracking-widest text-[#D4A24C] font-bold mb-1.5">Operating Hours</h4>
                    <p className="text-[14px] text-white/80 leading-relaxed font-light">Mon - Sat: 10:00 AM - 7:00 PM<br/><span className="text-[#D4A24C]/90 text-[12px] italic mt-1 block">Quick 2-hour response time</span></p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Premium Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="lg:col-span-3 bg-white rounded-[32px] p-8 sm:p-10 md:p-12 shadow-[0_8px_30px_rgba(13,59,42,0.06)] border border-[#0D3B2A]/5 relative h-full flex flex-col justify-center"
          >
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#0D3B2A] mb-8">Send a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="relative group">
                  <input type="text" name="name" value={form.name} onChange={handleInputChange} required id="name"
                    className="block w-full px-5 pt-7 pb-3 text-[14px] font-medium text-[#0D3B2A] bg-[#FAF7F2] border border-transparent rounded-[16px] appearance-none focus:outline-none focus:border-[#D4A24C] focus:ring-1 focus:ring-[#D4A24C] transition-all peer" placeholder=" " />
                  <label htmlFor="name" className="absolute text-[11px] text-[#0D3B2A]/50 duration-300 transform -translate-y-2 scale-75 top-4 z-10 origin-[0] px-5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-1 peer-focus:scale-75 peer-focus:-translate-y-2 left-0 font-bold uppercase tracking-wider pointer-events-none">Your Name *</label>
                </div>
                <div className="relative group">
                  <input type="email" name="email" value={form.email} onChange={handleInputChange} required id="email"
                    className="block w-full px-5 pt-7 pb-3 text-[14px] font-medium text-[#0D3B2A] bg-[#FAF7F2] border border-transparent rounded-[16px] appearance-none focus:outline-none focus:border-[#D4A24C] focus:ring-1 focus:ring-[#D4A24C] transition-all peer" placeholder=" " />
                  <label htmlFor="email" className="absolute text-[11px] text-[#0D3B2A]/50 duration-300 transform -translate-y-2 scale-75 top-4 z-10 origin-[0] px-5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-1 peer-focus:scale-75 peer-focus:-translate-y-2 left-0 font-bold uppercase tracking-wider pointer-events-none">Email Address *</label>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="relative group">
                  <input type="tel" name="phone" value={form.phone} onChange={handleInputChange} id="phone"
                    className="block w-full px-5 pt-7 pb-3 text-[14px] font-medium text-[#0D3B2A] bg-[#FAF7F2] border border-transparent rounded-[16px] appearance-none focus:outline-none focus:border-[#D4A24C] focus:ring-1 focus:ring-[#D4A24C] transition-all peer" placeholder=" " />
                  <label htmlFor="phone" className="absolute text-[11px] text-[#0D3B2A]/50 duration-300 transform -translate-y-2 scale-75 top-4 z-10 origin-[0] px-5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-1 peer-focus:scale-75 peer-focus:-translate-y-2 left-0 font-bold uppercase tracking-wider pointer-events-none">Phone Number</label>
                </div>
                <div className="relative group">
                  <input type="text" name="subject" value={form.subject} onChange={handleInputChange} required id="subject"
                    className="block w-full px-5 pt-7 pb-3 text-[14px] font-medium text-[#0D3B2A] bg-[#FAF7F2] border border-transparent rounded-[16px] appearance-none focus:outline-none focus:border-[#D4A24C] focus:ring-1 focus:ring-[#D4A24C] transition-all peer" placeholder=" " />
                  <label htmlFor="subject" className="absolute text-[11px] text-[#0D3B2A]/50 duration-300 transform -translate-y-2 scale-75 top-4 z-10 origin-[0] px-5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-1 peer-focus:scale-75 peer-focus:-translate-y-2 left-0 font-bold uppercase tracking-wider pointer-events-none">Subject *</label>
                </div>
              </div>

              <div className="relative group">
                <textarea name="message" value={form.message} onChange={handleInputChange} required id="message" rows="5"
                  className="block w-full px-5 pt-7 pb-3 text-[14px] font-medium text-[#0D3B2A] bg-[#FAF7F2] border border-transparent rounded-[16px] appearance-none focus:outline-none focus:border-[#D4A24C] focus:ring-1 focus:ring-[#D4A24C] transition-all peer resize-none" placeholder=" "></textarea>
                <label htmlFor="message" className="absolute text-[11px] text-[#0D3B2A]/50 duration-300 transform -translate-y-2 scale-75 top-4 z-10 origin-[0] px-5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-1 peer-focus:scale-75 peer-focus:-translate-y-2 left-0 font-bold uppercase tracking-wider pointer-events-none">How can we help you? *</label>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto min-w-[220px] rounded-[16px] py-4 px-8 bg-[#0D3B2A] text-white text-[12px] font-sans font-bold uppercase tracking-[0.2em] hover:bg-[#D4A24C] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(212,162,76,0.25)] flex items-center justify-center gap-3 group disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                  {!isSubmitting && <Send className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* TRUST SECTION */}
      <section className="max-w-[1300px] mx-auto px-6 sm:px-8 lg:px-12 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-[24px] p-8 text-center shadow-[0_4px_20px_rgba(13,59,42,0.03)] border border-[#0D3B2A]/5 flex flex-col items-center hover:-translate-y-2 hover:shadow-[0_12px_30px_rgba(13,59,42,0.06)] transition-all duration-300">
            <div className="w-16 h-16 rounded-full bg-[#FAF7F2] flex items-center justify-center mb-6 text-[#D4A24C] border border-[#D4A24C]/10">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h4 className="font-serif font-bold text-[19px] text-[#0D3B2A] mb-3">Secure Communication</h4>
            <p className="text-[14px] text-[#0D3B2A]/70 leading-relaxed max-w-[250px]">Your privacy is our priority. All inquiries are kept strictly confidential.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-[24px] p-8 text-center shadow-[0_4px_20px_rgba(13,59,42,0.03)] border border-[#0D3B2A]/5 flex flex-col items-center hover:-translate-y-2 hover:shadow-[0_12px_30px_rgba(13,59,42,0.06)] transition-all duration-300">
            <div className="w-16 h-16 rounded-full bg-[#FAF7F2] flex items-center justify-center mb-6 text-[#D4A24C] border border-[#D4A24C]/10">
              <Zap className="w-8 h-8" />
            </div>
            <h4 className="font-serif font-bold text-[19px] text-[#0D3B2A] mb-3">Fast Response</h4>
            <p className="text-[14px] text-[#0D3B2A]/70 leading-relaxed max-w-[250px]">Experience our swift 2-4 hour response time during business hours.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-[24px] p-8 text-center shadow-[0_4px_20px_rgba(13,59,42,0.03)] border border-[#0D3B2A]/5 flex flex-col items-center hover:-translate-y-2 hover:shadow-[0_12px_30px_rgba(13,59,42,0.06)] transition-all duration-300">
            <div className="w-16 h-16 rounded-full bg-[#FAF7F2] flex items-center justify-center mb-6 text-[#D4A24C] border border-[#D4A24C]/10">
              <Award className="w-8 h-8" />
            </div>
            <h4 className="font-serif font-bold text-[19px] text-[#0D3B2A] mb-3">Trusted Islamic Brand</h4>
            <p className="text-[14px] text-[#0D3B2A]/70 leading-relaxed max-w-[250px]">Authentic prophetic remedies crafted with uncompromising quality.</p>
          </motion.div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="max-w-3xl mx-auto px-6 sm:px-8 mb-32">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <span className="text-[#D4A24C] text-[11px] md:text-[13px] font-sans font-bold uppercase tracking-[0.3em] mb-4 block">Got Questions?</span>
          <h2 className="font-serif font-bold text-3xl md:text-5xl text-[#0D3B2A]">Frequently Asked</h2>
        </motion.div>
        
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-[24px] shadow-[0_4px_20px_rgba(13,59,42,0.02)] border border-[#0D3B2A]/5 overflow-hidden transition-all duration-300 hover:shadow-[0_8px_30px_rgba(13,59,42,0.05)]"
            >
              <button 
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full px-6 py-5 md:px-8 md:py-6 flex items-center justify-between text-left focus:outline-none"
              >
                <span className="font-serif font-bold text-[#0D3B2A] text-[16px] md:text-[19px]">{faq.q}</span>
                <div className={`w-8 h-8 rounded-full bg-[#FAF7F2] flex items-center justify-center shrink-0 transition-transform duration-300 ${activeFaq === idx ? 'rotate-180 bg-[#D4A24C] text-white' : 'text-[#D4A24C]'}`}>
                  <ChevronDown className="w-5 h-5" />
                </div>
              </button>
              <AnimatePresence>
                {activeFaq === idx && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 md:px-8 md:pb-8 pt-0 text-[14px] md:text-[15px] text-[#0D3B2A]/70 font-sans leading-relaxed">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
}
