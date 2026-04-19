import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Loader2,
  Calendar, 
  Upload,
  Star as StarIcon,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

// --- Mock Types & Services (In production, import these from your files) ---
interface EventSummary {
  id: string;
  title: string;
  imageUrl: string;
  date: string;
  price: number;
  currency: string;
}

// --- Reusable Star Component ---
function Star({ filled, onClick, onMouseEnter, onMouseLeave }: any) {
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="transition-transform active:scale-90"
    >
      <StarIcon 
        className={`w-10 h-10 transition-colors ${
          filled 
            ? 'fill-[#2563EB] text-[#2563EB]' 
            : 'text-gray-200'
        }`}
      />
    </button>
  );
}

export default function ReviewApp() {
  const [event, setEvent] = useState<EventSummary | null>(null);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Simulate fetching event data
  useEffect(() => {
    // Replace with your actual API call: reviewService.getEventDetails('123')
    const mockData: EventSummary = {
      id: '123',
      title: 'Midnight Jazz & Blues: Rooftop Session',
      imageUrl: 'https://images.unsplash.com/photo-1514525253361-bee0438d59ef',
      date: 'Saturday, 24 Aug 2024',
      price: 350000,
      currency: 'Rp'
    };
    setEvent(mockData);
  }, []);

  const handleResetForm = () => {
    setRating(0);
    setComment('');
    setPhotos([]);
    setSubmitted(false);
  };

  const handleSubmit = async () => {
    if (rating === 0) return;
    setIsSubmitting(true);
    
    // Simulate API delay
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1200);
  };

  // --- Loading State ---
  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  // --- Thank You / Success State ---
  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#F8FAFC]">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-8 rounded-3xl shadow-xl shadow-blue-100 text-center max-w-sm w-full space-y-6 border border-gray-50"
        >
          <div className="mx-auto w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-[#2563EB]" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-gray-900">Thank you!</h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              Your feedback helps us curate better events for the community.
            </p>
          </div>

          <div className="flex flex-col gap-3 pt-4">
            <button 
              onClick={() => window.location.href = '/profile'} 
              className="w-full bg-[#2563EB] hover:bg-blue-700 text-white py-4 rounded-xl font-bold shadow-lg shadow-blue-200 transition-all active:scale-95"
            >
              Go to Profile
            </button>
            <button 
              onClick={handleResetForm}
              className="w-full bg-white border border-gray-200 text-gray-600 py-4 rounded-xl font-bold hover:bg-gray-50 transition-all active:scale-95"
            >
              Write Another Review
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // --- Main Review Form ---
  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-gray-900 antialiased pb-20">
      <main className="max-w-xl mx-auto px-6 py-12 space-y-10">
        
        {/* Event Card */}
        <section className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex gap-4">
          <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
            <img src={event.imageUrl} alt="Event" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="font-bold text-gray-900 text-lg leading-tight">{event.title}</h2>
            <p className="text-gray-400 text-xs flex items-center gap-1 mt-1">
              <Calendar className="w-3.5 h-3.5" /> {event.date}
            </p>
            <p className="text-[#2563EB] font-bold text-sm mt-1">
              {event.currency} {event.price.toLocaleString('id-ID')}
            </p>
          </div>
        </section>

        {/* Rating Question */}
        <section className="text-center space-y-3">
          <h3 className="font-bold text-xl text-gray-800">How was your experience?</h3>
          <p className="text-gray-500 text-sm">Your feedback helps us curate better events</p>
          <div className="flex justify-center gap-2 pt-2">
            {[1, 2, 3, 4, 5].map((idx) => (
              <Star 
                key={idx}
                filled={(hoverRating || rating) >= idx}
                onMouseEnter={() => setHoverRating(idx)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(idx)}
              />
            ))}
          </div>
        </section>

        {/* Text Input */}
        <section className="space-y-3">
          <label className="font-bold text-gray-800 text-sm">Write your honest review here...</label>
          <div className="relative">
            <textarea 
              className="w-full bg-[#F1F5F9] border-none rounded-2xl p-5 text-sm min-h-[160px] focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:text-gray-400"
              placeholder="Tell us about the atmosphere, sound quality, and the view..."
              value={comment}
              onChange={(e) => setComment(e.target.value.slice(0, 500))}
            />
            <span className="absolute bottom-4 right-5 text-[10px] text-gray-400 font-mono">
              {comment.length}/500
            </span>
          </div>
        </section>

        {/* Photo Upload */}
        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-gray-800 text-sm">Add photos to your review</h3>
            <span className="text-[10px] text-[#2563EB] font-bold uppercase tracking-tight">Max 5 photos</span>
          </div>
          
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            <button className="w-24 h-24 bg-[#E2E8F0] border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center group active:scale-95 transition-transform">
              <div className="p-2 bg-white rounded-lg shadow-sm">
                <Upload className="w-5 h-5 text-gray-500" />
              </div>
              <span className="text-[9px] font-bold text-gray-500 mt-2 uppercase tracking-tighter">Upload</span>
            </button>
            
            {/* Mocked uploaded photos */}
            <div className="w-24 h-24 relative rounded-xl overflow-hidden group flex-shrink-0">
              <img src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30" className="w-full h-full object-cover" alt="Review 1" />
              <button className="absolute top-1 right-1 bg-red-500 text-white rounded-md p-0.5"><X className="w-3 h-3" /></button>
            </div>
          </div>
        </section>

        {/* Final Submit Button */}
        <section className="pt-4 space-y-4 text-center">
          <button 
            onClick={handleSubmit}
            disabled={rating === 0 || isSubmitting}
            className={`w-full py-4 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2 ${
              rating > 0 && !isSubmitting ? 'bg-[#2563EB] shadow-lg shadow-blue-200 active:scale-[0.98]' : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            {isSubmitting ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                Submit Review
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </button>
          
          <p className="text-[10px] text-gray-400 leading-normal px-8">
            By submitting, you agree to our <span className="text-[#2563EB] underline font-medium cursor-pointer">Community Guidelines</span> regarding honest feedback.
          </p>
        </section>

      </main>
    </div>
  );
}