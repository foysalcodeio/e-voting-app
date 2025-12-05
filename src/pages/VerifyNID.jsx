import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVotes } from '../context/VoteContext';

function VerifyNID() {
    const [nid, setNid] = useState('');
    const [dob, setDob] = useState('');
    const [photo, setPhoto] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(null);
    const [error, setError] = useState('');
    const [isVerifying, setIsVerifying] = useState(false);
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const { hasVotedWithNID, setVoterPhoto } = useVotes();

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                setError('Photo size must be less than 5MB');
                return;
            }
            setPhoto(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleVerify = (e) => {
        e.preventDefault();
        setError('');

        // Validate NID (10 or 13 or 17 digits)
        if (!/^\d{10}$|^\d{13}$|^\d{17}$/.test(nid)) {
            setError('Please enter a valid National ID (10, 13, or 17 digits)');
            return;
        }

        // Check if already voted
        if (hasVotedWithNID(nid)) {
            setError('This NID has already been used to vote. Each person can only vote once.');
            return;
        }

        setIsVerifying(true);

        // Simulate verification
        setTimeout(() => {
            setIsVerifying(false);
            if (photoPreview) {
                setVoterPhoto(photoPreview);
            }
            navigate('/vote', { state: { nid } });
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-base-100 to-base-200 p-4 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>

            <div className="max-w-2xl mx-auto relative z-10 py-8">
                {/* Back to Home Button */}
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 text-base-content/70 hover:text-base-content transition-colors mb-8 group"
                >
                    <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    <span className="font-medium">Back to Home</span>
                </motion.button>

                {/* Main Card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-base-100 rounded-3xl shadow-2xl p-8 md:p-12"
                >
                    {/* Icon */}
                    <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                        className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-xl"
                    >
                        <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                    </motion.div>

                    {/* Title */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-center mb-8"
                    >
                        <h1 className="text-4xl font-bold text-base-content mb-3">NID Verification</h1>
                        <p className="text-base-content/60 text-lg">Verify your identity to proceed with voting</p>
                    </motion.div>

                    {/* Form */}
                    <form onSubmit={handleVerify} className="space-y-6">
                        {/* Photo Upload */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <label className="flex items-center gap-2 text-base-content font-semibold mb-3">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                                </svg>
                                Voter Photo
                            </label>

                            <div className="flex items-center gap-4">
                                {photoPreview ? (
                                    <div className="relative">
                                        <img
                                            src={photoPreview}
                                            alt="Voter"
                                            className="w-32 h-32 object-cover rounded-2xl border-4 border-primary shadow-lg"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setPhoto(null);
                                                setPhotoPreview(null);
                                                if (fileInputRef.current) fileInputRef.current.value = '';
                                            }}
                                            className="absolute -top-2 -right-2 w-8 h-8 bg-error rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                ) : (
                                    <div
                                        onClick={() => fileInputRef.current?.click()}
                                        className="w-32 h-32 bg-base-200 border-2 border-dashed border-base-300 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-base-300 transition-all"
                                    >
                                        <svg className="w-8 h-8 text-base-content/40 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                        </svg>
                                        <span className="text-xs text-base-content/60">Upload Photo</span>
                                    </div>
                                )}

                                <div className="flex-1">
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        onChange={handlePhotoChange}
                                        className="hidden"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => fileInputRef.current?.click()}
                                        className="btn btn-outline btn-primary rounded-xl"
                                    >
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        {photoPreview ? 'Change Photo' : 'Take/Upload Photo'}
                                    </button>
                                    <p className="text-base-content/50 text-xs mt-2">Max size: 5MB</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* National ID Number */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            <label className="flex items-center gap-2 text-base-content font-semibold mb-3">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                </svg>
                                National ID Number
                            </label>
                            <input
                                type="text"
                                value={nid}
                                onChange={(e) => setNid(e.target.value.replace(/\D/g, ''))}
                                placeholder="Enter your 10, 13, or 17 digit NID"
                                maxLength="17"
                                className="w-full px-5 py-4 bg-base-200 border-2 border-base-300 rounded-xl text-base-content text-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                required
                            />
                            <p className="text-base-content/50 text-sm mt-2">{nid.length} / 17 digits</p>
                        </motion.div>

                        {/* Date of Birth */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 }}
                        >
                            <label className="flex items-center gap-2 text-base-content font-semibold mb-3">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                </svg>
                                Date of Birth
                            </label>
                            <input
                                type="text"
                                value={dob}
                                onChange={(e) => setDob(e.target.value)}
                                placeholder="mm/dd/yyyy"
                                className="w-full px-5 py-4 bg-base-200 border-2 border-base-300 rounded-xl text-base-content text-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                            />
                        </motion.div>

                        {/* Info Box */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                            className="flex items-start gap-3 bg-info/10 border border-info/30 rounded-xl p-4"
                        >
                            <svg className="w-5 h-5 text-info flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                            <p className="text-base-content/70 text-sm leading-relaxed">
                                Your information is encrypted and secured. Each NID can only be used once to vote. Photo upload is optional but recommended for verification.
                            </p>
                        </motion.div>

                        {/* Error Message */}
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex items-center gap-3 bg-error/10 border border-error/30 rounded-xl p-4"
                            >
                                <svg className="w-5 h-5 text-error flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
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
                            {isVerifying ? (
                                <>
                                    <span className="loading loading-spinner"></span>
                                    Verifying...
                                </>
                            ) : (
                                <>
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    Verify My Identity
                                </>
                            )}
                        </motion.button>
                    </form>
                </motion.div>

                {/* Feature Cards */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8"
                >
                    <div className="bg-base-100 rounded-2xl p-6 shadow-lg">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center">
                                <svg className="w-5 h-5 text-success" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <h3 className="font-bold text-base-content">One Vote Per Person</h3>
                        </div>
                        <p className="text-base-content/60 text-sm">Each NID can only vote once</p>
                    </div>

                    <div className="bg-base-100 rounded-2xl p-6 shadow-lg">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <h3 className="font-bold text-base-content">Privacy Protected</h3>
                        </div>
                        <p className="text-base-content/60 text-sm">Your data is encrypted end-to-end</p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

export default VerifyNID;
