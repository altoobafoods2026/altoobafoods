import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ConsultationForm from '../components/ConsultationForm';

export default function Booking() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const initialType = searchParams.get('type') || 'Video Consultation';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#FAF7F2] min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-28 pb-20 px-6 sm:px-8 flex flex-col items-center justify-center">
        <div className="w-full max-w-3xl">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm font-sans font-bold text-[#0D3B2A]/60 hover:text-[#0D3B2A] transition-colors mb-6 uppercase tracking-wider w-fit"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>

          <ConsultationForm initialType={initialType} redirectAfterSuccess={true} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
