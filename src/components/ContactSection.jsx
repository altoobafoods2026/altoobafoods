import { useState } from 'react';
import { useToastStore } from '../store/toastStore';
import { MapPin, Phone, Mail, MessageCircle, Send, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function ContactSection({ title = "Connect With Us", subtitle = "Have questions? Reach out to our healing consultants.", bg = "bg-white" }) {
  const showToast = useToastStore((state) => state.showToast);

  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: 'general',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      showToast('Please complete all form fields', 'error');
      return;
    }

    setSubmitted(true);
    showToast('Your message has been sent to Al-Tooba.');
    setForm({ name: '', email: '', subject: 'general', message: '' });
  };

  return (
    <section className={`relative ${bg} py-12 md:py-16 px-6 sm:px-8 border-t border-[#0D3B2A]/5 overflow-hidden`}>
      <div className="max-w-6xl mx-auto relative z-10">
        
        <div className="text-center mb-12 sm:mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="text-[#D4A24C] text-[11px] md:text-[13px] font-sans font-bold uppercase tracking-[0.3em] mb-4 block"
          >
            Get In Touch
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif font-bold text-4xl md:text-5xl lg:text-6xl text-[#0D3B2A] tracking-tight mb-5 drop-shadow-sm"
          >
            Connect With Us
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[15px] md:text-[17px] text-[#0D3B2A]/70 max-w-2xl mx-auto leading-relaxed"
          >
            Experience premium care and personalized support. Reach out for queries regarding our prophetic medicine, natural ingredients, or your orders.
          </motion.p>
        </div>

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
                    <p className="text-[14px] text-white/80 leading-relaxed font-light">Bilaspur Gate, Nainital Road<br/>Rampur, UP</p>
                  </div>
                </div>

                <div className="flex items-start gap-5 group">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10 group-hover:border-[#D4A24C]/60 group-hover:bg-[#D4A24C]/10 transition-all duration-300">
                    <Phone className="text-[#D4A24C] w-5 h-5" />
                  </div>
                  <div className="pt-1">
                    <h4 className="text-[10px] uppercase tracking-widest text-[#D4A24C] font-bold mb-1.5">Direct Line</h4>
                    <a href="tel:+918433284322" className="text-[14px] text-white/80 hover:text-white transition-colors block mb-1 font-light">+91 84332 84322</a>
                    <a href="https://wa.me/918433284322" target="_blank" rel="noreferrer" className="text-[13px] text-[#D4A24C] hover:text-white transition-colors flex items-center gap-1.5 mt-2">
                      <MessageCircle className="w-4 h-4" /> WhatsApp Support
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-5 group">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10 group-hover:border-[#D4A24C]/60 group-hover:bg-[#D4A24C]/10 transition-all duration-300">
                    <Mail className="text-[#D4A24C] w-5 h-5" />
                  </div>
                  <div className="pt-1">
                    <h4 className="text-[10px] uppercase tracking-widest text-[#D4A24C] font-bold mb-1.5">Email Support</h4>
                    <a href="mailto:altoobafoods2026@gmail.com" className="text-[14px] text-white/80 hover:text-white transition-colors font-light">altoobafoods2026@gmail.com</a>
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
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <CheckCircle2 className="w-16 h-16 text-[#D4A24C] mx-auto mb-4" />
                <h4 className="font-serif font-bold text-2xl text-[#0D3B2A] mb-3">Message Sent!</h4>
                <p className="text-sm text-[#0D3B2A]/70 max-w-xs mx-auto mb-8">
                  We'll get back to you shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="rounded-full px-8 py-3 bg-transparent border border-[#0D3B2A] text-[#0D3B2A] text-[11px] font-sans font-bold uppercase tracking-widest hover:bg-[#0D3B2A] hover:text-white transition-colors"
                >
                  Send another
                </button>
              </motion.div>
            ) : (
              <>
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#0D3B2A] mb-8">Send a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="relative group">
                      <input type="text" name="name" value={form.name} onChange={handleInputChange} required id="section_name"
                        className="block w-full px-5 pt-7 pb-3 text-[14px] font-medium text-[#0D3B2A] bg-[#FAF7F2] border border-transparent rounded-[16px] appearance-none focus:outline-none focus:border-[#D4A24C] focus:ring-1 focus:ring-[#D4A24C] transition-all peer" placeholder=" " />
                      <label htmlFor="section_name" className="absolute text-[11px] text-[#0D3B2A]/50 duration-300 transform -translate-y-2 scale-75 top-4 z-10 origin-[0] px-5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-1 peer-focus:scale-75 peer-focus:-translate-y-2 left-0 font-bold uppercase tracking-wider pointer-events-none">Your Name *</label>
                    </div>
                    <div className="relative group">
                      <input type="email" name="email" value={form.email} onChange={handleInputChange} required id="section_email"
                        className="block w-full px-5 pt-7 pb-3 text-[14px] font-medium text-[#0D3B2A] bg-[#FAF7F2] border border-transparent rounded-[16px] appearance-none focus:outline-none focus:border-[#D4A24C] focus:ring-1 focus:ring-[#D4A24C] transition-all peer" placeholder=" " />
                      <label htmlFor="section_email" className="absolute text-[11px] text-[#0D3B2A]/50 duration-300 transform -translate-y-2 scale-75 top-4 z-10 origin-[0] px-5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-1 peer-focus:scale-75 peer-focus:-translate-y-2 left-0 font-bold uppercase tracking-wider pointer-events-none">Email Address *</label>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="relative group">
                      <input type="tel" name="phone" value={form.phone} onChange={handleInputChange} id="section_phone"
                        className="block w-full px-5 pt-7 pb-3 text-[14px] font-medium text-[#0D3B2A] bg-[#FAF7F2] border border-transparent rounded-[16px] appearance-none focus:outline-none focus:border-[#D4A24C] focus:ring-1 focus:ring-[#D4A24C] transition-all peer" placeholder=" " />
                      <label htmlFor="section_phone" className="absolute text-[11px] text-[#0D3B2A]/50 duration-300 transform -translate-y-2 scale-75 top-4 z-10 origin-[0] px-5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-1 peer-focus:scale-75 peer-focus:-translate-y-2 left-0 font-bold uppercase tracking-wider pointer-events-none">Phone Number</label>
                    </div>
                    <div className="relative group">
                      <input type="text" name="subject" value={form.subject} onChange={handleInputChange} required id="section_subject"
                        className="block w-full px-5 pt-7 pb-3 text-[14px] font-medium text-[#0D3B2A] bg-[#FAF7F2] border border-transparent rounded-[16px] appearance-none focus:outline-none focus:border-[#D4A24C] focus:ring-1 focus:ring-[#D4A24C] transition-all peer" placeholder=" " />
                      <label htmlFor="section_subject" className="absolute text-[11px] text-[#0D3B2A]/50 duration-300 transform -translate-y-2 scale-75 top-4 z-10 origin-[0] px-5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-1 peer-focus:scale-75 peer-focus:-translate-y-2 left-0 font-bold uppercase tracking-wider pointer-events-none">Subject *</label>
                    </div>
                  </div>

                  <div className="relative group">
                    <textarea name="message" value={form.message} onChange={handleInputChange} required id="section_message" rows="5"
                      className="block w-full px-5 pt-7 pb-3 text-[14px] font-medium text-[#0D3B2A] bg-[#FAF7F2] border border-transparent rounded-[16px] appearance-none focus:outline-none focus:border-[#D4A24C] focus:ring-1 focus:ring-[#D4A24C] transition-all peer resize-none" placeholder=" "></textarea>
                    <label htmlFor="section_message" className="absolute text-[11px] text-[#0D3B2A]/50 duration-300 transform -translate-y-2 scale-75 top-4 z-10 origin-[0] px-5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-1 peer-focus:scale-75 peer-focus:-translate-y-2 left-0 font-bold uppercase tracking-wider pointer-events-none">How can we help you? *</label>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full sm:w-auto min-w-[220px] rounded-[16px] py-4 px-8 bg-[#0D3B2A] text-white text-[12px] font-sans font-bold uppercase tracking-[0.2em] hover:bg-[#D4A24C] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(212,162,76,0.25)] flex items-center justify-center gap-3 group"
                    >
                      <span>Send Message</span>
                      <Send className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </button>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
