// src/pages/Modals.jsx 

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVotes } from '../context/VoteContext';
import { useForm } from 'react-hook-form';

// Utility to generate a unique tracking ID
const generateTrackingId = () => {
  return 'VID-' + Math.random().toString(36).substr(2, 9).toUpperCase();
};

function Modals() {
  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    defaultValues: { nid: '', dob: '' }
  });

  const [error, setError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [trackingId, setTrackingId] = useState(null);

  const navigate = useNavigate();
  const { hasVotedWithNID, setTrackingInfo } = useVotes();

  const onSubmit = (data) => {
    setError('');
    const nidVal = data.nid;

    // Check if NID already voted
    if (hasVotedWithNID(nidVal)) {
      setError('This NID has already been used to vote. Each person can only vote once.');
      return;
    }

    // Generate tracking ID
    const id = generateTrackingId();
    setTrackingId(id);
    setTrackingInfo({ nid: nidVal, trackingId: id });

    setIsVerifying(true);

    // Simulate verification delay
    setTimeout(() => {
      setIsVerifying(false);
      // Optional: navigate to vote page after verification
      navigate('/vote', { state: { nid: nidVal, trackingId: id } });
    }, 1500);
  };

  // Copy tracking ID to clipboard
  const copyTrackingId = () => {
    if (trackingId) {
      navigator.clipboard.writeText(trackingId);
      alert('Tracking ID copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-500">
      <div className="max-w-2xl w-full relative z-10 py-8">

        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-500 hover:text-base-content transition-colors mb-8 group"
        >
          <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="font-medium">Back to Home</span>
        </motion.button>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-base-100 rounded-3xl shadow-2xl p-8 md:p-12"
        >
          {/* Title */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-center mb-8">
            <h1 className="text-4xl font-bold text-base-content mb-3">NID Verification</h1>
            <p className="text-base-content/60 text-lg">Verify your identity to proceed with voting</p>
          </motion.div>

          {!trackingId ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

              {/* NID Input */}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
                <label className="flex items-center gap-2 text-base-content font-semibold mb-3">National ID Number</label>
                <input
                  type="text"
                  {...register('nid', {
                    required: 'NID is required',
                    pattern: { value: /^(?:\d{10}|\d{13}|\d{17})$/, message: 'Enter a valid NID (10, 13, or 17 digits)' },
                    maxLength: { value: 17, message: 'Max 17 digits' }
                  })}
                  onChange={(e) => {
                    e.target.value = e.target.value.replace(/\D/g, '').slice(0, 17);
                  }}
                  placeholder="Enter your NID"
                  className="w-full px-5 py-4 bg-base-200 border-2 border-base-300 rounded-xl text-base-content text-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
                <p className="text-base-content/50 text-sm mt-2">{(watch('nid') || '').length} / 17 digits</p>
                {errors.nid && <p className="text-error text-sm mt-2">{errors.nid.message}</p>}
              </motion.div>

              {/* DOB Input */}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>
                <label className="flex items-center gap-2 text-base-content font-semibold mb-3">Date of Birth</label>
                <input
                  type="date"
                  {...register('dob', { required: 'Date of Birth is required' })}
                  className="w-full px-5 py-4 bg-base-200 border-2 border-base-300 rounded-xl text-base-content text-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
                {errors.dob && <p className="text-error text-sm mt-2">{errors.dob.message}</p>}
              </motion.div>

              {/* Error Message */}
              {error && (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-3 bg-error/10 border border-error/30 rounded-xl p-4">
                  <p className="text-error text-sm font-medium">{error}</p>
                </motion.div>
              )}

              {/* Submit Button */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(0,0,0,0.15)" }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isVerifying}
                className="w-full btn btn-lg bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white border-none text-lg font-bold rounded-xl shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isVerifying ? 'Verifying...' : 'Verify My Identity'}
              </motion.button>
            </form>
          ) : (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4">
              <p className="text-lg text-base-content">Your verification is successful!</p>
              <p className="text-base-content/70">Your Tracking ID:</p>
              <div className="flex items-center justify-center gap-2 mt-2">
                <span className="px-4 py-2 bg-base-200 rounded-xl font-mono text-lg">{trackingId}</span>
                <button
                  onClick={copyTrackingId}
                  className="btn btn-sm btn-primary"
                >
                  Copy
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default Modals;
