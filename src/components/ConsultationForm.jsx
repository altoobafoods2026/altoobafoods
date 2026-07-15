import { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle } from 'lucide-react';
import { useToastStore } from '../store/toastStore';
import { useNavigate } from 'react-router-dom';

export default function ConsultationForm({ initialType = 'Video Consultation', redirectAfterSuccess = false }) {
  const showToast = useToastStore((state) => state.showToast);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    age: '',
    gender: '',
    consultationType: initialType,
    preferredDate: '',
    description: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Reset or redirect after success
      setTimeout(() => {
        showToast(`${formData.consultationType} request received for ${formData.fullName}!`);
        if (redirectAfterSuccess) {
          navigate('/consultation');
        } else {
          // Reset form on same page
          setIsSuccess(false);
          setFormData({
            fullName: '',
            email: '',
            phone: '',
            age: '',
            gender: '',
            consultationType: initialType,
            preferredDate: '',
            description: ''
          });
        }
      }, 3000);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="p-8 sm:p-12 text-center flex flex-col items-center justify-center bg-white rounded-[2rem] shadow-[0_20px_60px_rgba(13,59,42,0.06)] border border-[#0D3B2A]/5 min-h-[500px]">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 15 }}
          className="w-24 h-24 bg-[#D4A24C]/20 rounded-full flex items-center justify-center mb-8"
        >
          <CheckCircle className="w-12 h-12 text-[#D4A24C]" />
        </motion.div>
        <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#0D3B2A] mb-4">Booking Confirmed!</h3>
        <p className="text-[#0D3B2A]/70 font-sans text-lg max-w-md">
          JazakAllah Khair, {formData.fullName}. Your request for a {formData.consultationType} has been received. Our team will contact you shortly to confirm the timing.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#0D3B2A] rounded-[2rem] sm:rounded-[2.5rem] shadow-[0_20px_80px_rgba(13,59,42,0.3)] border border-[#D4A24C]/20 p-5 sm:p-12 relative overflow-hidden group/form">
      {/* Subtle decorative glow */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-[#D4A24C]/20 to-transparent rounded-full blur-[80px] pointer-events-none transition-transform duration-700 group-hover/form:scale-110" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-[#D4A24C]/10 to-transparent rounded-full blur-[80px] pointer-events-none transition-transform duration-700 group-hover/form:scale-110" />
      
      <div className="mb-6 sm:mb-12 text-center relative z-10">
        <h3 className="font-serif text-xl sm:text-3xl font-bold text-[#FAF7F2] mb-2 sm:mb-3">
          Book Your Session
        </h3>
        <p className="text-[#FAF7F2]/70 text-xs sm:text-sm font-sans max-w-sm mx-auto">
          Fill out the details below to schedule your consultation with Hakeem Saab.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 relative z-10">
        {/* Type of Consultation */}
        <div className="space-y-1.5 sm:space-y-2.5">
          <label className="text-[10px] font-bold font-sans text-[#D4A24C] uppercase tracking-widest ml-1">Consultation Type</label>
          <div className="relative">
            <select
              name="consultationType"
              value={formData.consultationType}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl px-4 sm:px-6 py-3 sm:py-4.5 text-xs sm:text-sm text-[#FAF7F2] focus:outline-none focus:ring-2 focus:ring-[#D4A24C]/60 focus:border-[#D4A24C]/60 transition-all appearance-none font-medium shadow-[inset_0_2px_10px_rgba(0,0,0,0.1)] hover:bg-white/10 [&>option]:bg-[#0D3B2A] [&>option]:text-[#FAF7F2]"
            >
              <option value="Video Consultation">📹 Video Consultation (Recommended)</option>
              <option value="Audio Consultation">📞 Audio Consultation</option>
              <option value="WhatsApp Consultation">💬 WhatsApp Chat</option>
            </select>
            <div className="absolute right-4 sm:right-5 top-1/2 -translate-y-1/2 pointer-events-none text-[#D4A24C]">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
            </div>
          </div>
        </div>

        {/* Personal Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div className="space-y-1.5 sm:space-y-2.5">
            <label className="text-[10px] font-bold font-sans text-[#D4A24C] uppercase tracking-widest ml-1">Full Name</label>
            <input
              required
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-[#FAF7F2] focus:outline-none focus:ring-2 focus:ring-[#D4A24C]/60 focus:border-[#D4A24C]/60 transition-all shadow-[inset_0_2px_10px_rgba(0,0,0,0.1)] hover:bg-white/10 placeholder:text-[#FAF7F2]/30"
              placeholder="Enter your name"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 sm:gap-5">
            <div className="space-y-1.5 sm:space-y-2.5">
              <label className="text-[10px] font-bold font-sans text-[#D4A24C] uppercase tracking-widest ml-1">Age</label>
              <input
                required
                type="number"
                name="age"
                min="1"
                max="120"
                value={formData.age}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-[#FAF7F2] focus:outline-none focus:ring-2 focus:ring-[#D4A24C]/60 focus:border-[#D4A24C]/60 transition-all shadow-[inset_0_2px_10px_rgba(0,0,0,0.1)] hover:bg-white/10 placeholder:text-[#FAF7F2]/30"
                placeholder="e.g. 35"
              />
            </div>
            <div className="space-y-1.5 sm:space-y-2.5">
              <label className="text-[10px] font-bold font-sans text-[#D4A24C] uppercase tracking-widest ml-1">Gender</label>
              <div className="relative">
                <select
                  required
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-[#FAF7F2] focus:outline-none focus:ring-2 focus:ring-[#D4A24C]/60 focus:border-[#D4A24C]/60 transition-all appearance-none shadow-[inset_0_2px_10px_rgba(0,0,0,0.1)] hover:bg-white/10 [&>option]:bg-[#0D3B2A] [&>option]:text-[#FAF7F2]"
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                <div className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#D4A24C]">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div className="space-y-1.5 sm:space-y-2.5">
            <label className="text-[10px] font-bold font-sans text-[#D4A24C] uppercase tracking-widest ml-1">Phone Number</label>
            <input
              required
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-[#FAF7F2] focus:outline-none focus:ring-2 focus:ring-[#D4A24C]/60 focus:border-[#D4A24C]/60 transition-all shadow-[inset_0_2px_10px_rgba(0,0,0,0.1)] hover:bg-white/10 placeholder:text-[#FAF7F2]/30"
              placeholder="+91"
            />
          </div>
          <div className="space-y-1.5 sm:space-y-2.5">
            <label className="text-[10px] font-bold font-sans text-[#D4A24C] uppercase tracking-widest ml-1">Preferred Date</label>
            <input
              required
              type="date"
              name="preferredDate"
              value={formData.preferredDate}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-[#FAF7F2] focus:outline-none focus:ring-2 focus:ring-[#D4A24C]/60 focus:border-[#D4A24C]/60 transition-all shadow-[inset_0_2px_10px_rgba(0,0,0,0.1)] hover:bg-white/10 [&::-webkit-calendar-picker-indicator]:invert-[1]"
            />
          </div>
        </div>

        {/* Medical Issue */}
        <div className="space-y-1.5 sm:space-y-2.5">
          <label className="text-[10px] font-bold font-sans text-[#D4A24C] uppercase tracking-widest ml-1">Briefly describe your issue</label>
          <textarea
            required
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="2"
            className="w-full bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-[#FAF7F2] focus:outline-none focus:ring-2 focus:ring-[#D4A24C]/60 focus:border-[#D4A24C]/60 transition-all resize-none shadow-[inset_0_2px_10px_rgba(0,0,0,0.1)] hover:bg-white/10 placeholder:text-[#FAF7F2]/30 sm:rows-3"
            placeholder="Tell us what you're experiencing..."
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-2 sm:mt-4 py-3 sm:py-4.5 rounded-xl sm:rounded-2xl bg-[#D4A24C] text-[#0D3B2A] text-[12px] font-sans font-bold uppercase tracking-[0.2em] hover:bg-[#b5883a] transition-all duration-300 shadow-[0_10px_30px_rgba(212,162,76,0.3)] hover:shadow-[0_15px_40px_rgba(212,162,76,0.4)] hover:-translate-y-1 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex justify-center items-center h-[48px] sm:h-[56px] relative overflow-hidden group/btn"
        >
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite]" />
          <span className="relative z-10 flex items-center gap-3">
            {isSubmitting ? (
              <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-[#0D3B2A]/30 border-t-[#0D3B2A] rounded-full animate-spin"></div>
            ) : (
              <>
                Confirm Booking
                <svg className="w-3 h-3 sm:w-4 sm:h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
              </>
            )}
          </span>
        </button>
      </form>
    </div>
  );
}
