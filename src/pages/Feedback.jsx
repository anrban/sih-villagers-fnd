import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { User, Calendar, Star, MessageSquare as CommentIcon, Send, Loader2 } from 'lucide-react';

// A simple, reusable Star Rating component
const StarRating = ({ rating, setRating }) => (
  <div className="flex justify-center gap-2">
    {[1, 2, 3, 4, 5].map((star) => (
      <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} key={star}>
        <Star
          size={40}
          className={`cursor-pointer transition-colors ${rating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
          fill={rating >= star ? 'currentColor' : 'none'}
          onClick={() => setRating(star)}
        />
      </motion.div>
    ))}
  </div>
);

export default function Feedback({ isLoggedIn }) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    ashaName: '',
    visitDate: new Date().toISOString().split('T')[0], // Default to today
    rating: 0,
    comments: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      alert("Please log in to submit feedback.");
      return;
    }
    if (formData.rating === 0) {
      alert("Please provide a rating.");
      return;
    }
    setIsLoading(true);
    // Simulate API call
    console.log("Submitting feedback:", formData);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    alert("Thank you! Your feedback has been submitted successfully.");
    // Reset form
    setFormData({ ashaName: '', visitDate: new Date().toISOString().split('T')[0], rating: 0, comments: '' });
  };
  
  if (!isLoggedIn) {
    return (
      <div className="text-center p-10 max-w-2xl mx-auto">
        <CommentIcon size={48} className="mx-auto text-primary opacity-50" />
        <h2 className="text-2xl font-bold text-gray-700 mt-4">Login Required</h2>
        <p className="mt-2 text-gray-500">Please log in to provide feedback.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="text-center">
          <h1 className="text-3xl md:text-5xl font-black text-primary">{t('Feedback')}</h1>
          <p className="text-text-dark/70 mt-2">{t('Your Feedback is valuable to us')}</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" name="ashaName" placeholder={t('asha_worker_name')} value={formData.ashaName} onChange={handleChange} required className="w-full p-4 pl-12 bg-white/50 rounded-lg border-2 border-transparent focus:border-accent focus:outline-none transition" />
          </div>
          <div className="relative">
            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="date" name="visitDate" value={formData.visitDate} onChange={handleChange} required className="w-full p-4 pl-12 bg-white/50 rounded-lg border-2 border-transparent focus:border-accent focus:outline-none transition" />
          </div>
          
          <div>
            <p className="text-center font-semibold text-text-dark/80 mb-2">{t('How Much did she helped You')}</p>
            <StarRating rating={formData.rating} setRating={(r) => setFormData({...formData, rating: r})} />
          </div>

          <div className="relative">
             <CommentIcon className="absolute left-4 top-5 text-gray-400" />
             <textarea name="comments" placeholder={t('comments')} value={formData.comments} onChange={handleChange} rows="4" className="w-full p-4 pl-12 bg-white/50 rounded-lg border-2 border-transparent focus:border-accent focus:outline-none transition"></textarea>
          </div>

          <button type="submit" disabled={isLoading} className="w-full bg-primary text-white font-bold py-4 rounded-xl text-lg hover:bg-secondary transition-colors flex items-center justify-center gap-2 disabled:bg-gray-400">
            {isLoading ? <Loader2 className="animate-spin" /> : <Send />}
            {t('submit_feedback')}
          </button>
        </form>
      </motion.div>
    </div>
  );
}