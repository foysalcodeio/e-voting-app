import { motion } from 'framer-motion';

const ConfirmModel = ({ isOpen, onClose, onConfirm, trackingId }) => {

    console.log('Tracking ID in ConfirmModel:', trackingId);
    console.log('Candidate in ConfirmModel:', candidate);
    if (!isOpen || !candidate) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 z-50"
            onClick={onClose} // Use onClose prop
        >
            <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-0 max-w-md w-full shadow-2xl relative overflow-hidden ring-1 ring-white/20"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Decorative Gradient Header */}
                <div
                    className="absolute top-0 left-0 w-full h-32 opacity-20"
                    style={{ background: candidate.gradient }}
                />

                <div className="relative z-10 px-8 pt-10 pb-8">
                    {/* Floating Icon */}
                    <motion.div
                        initial={{ scale: 0, rotate: -45 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
                        className="w-24 h-24 mx-auto mb-6 rounded-3xl flex items-center justify-center shadow-2xl relative"
                        style={{ background: candidate.gradient }}
                    >
                        <svg className="w-12 h-12 text-white drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                    </motion.div>

                    {/* Header Text */}
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-2 tracking-tight">
                            Confirm Your Vote
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 font-medium">
                            Are you sure you want to vote for:
                        </p>
                    </div>

                    {/* Candidate Card */}
                    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-3xl p-6 mb-8 text-center border border-gray-100 dark:border-gray-700/50 relative overflow-hidden group">
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500" style={{ background: candidate.gradient }}></div>

                        <div className="w-20 h-20 mx-auto mb-4 bg-white dark:bg-gray-800 rounded-2xl p-2 shadow-sm relative z-10">
                            <img src={candidate.logo} alt={candidate.name} className="w-full h-full object-contain" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1 relative z-10">{candidate.name}</h3>
                        <p className="text-gray-500 dark:text-gray-400 text-xs font-medium uppercase tracking-wider relative z-10">{candidate.fullName}</p>
                    </div>

                    {/* Warning Box */}
                    <div className="flex items-start gap-3 bg-orange-50 dark:bg-orange-500/10 border border-orange-100 dark:border-orange-500/20 rounded-2xl p-4 mb-8">
                        <svg className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <p className="text-orange-600 dark:text-orange-400 text-sm font-medium leading-relaxed text-left">
                            This action cannot be undone. You can only vote once.
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col-reverse sm:flex-row gap-4">
                        <button
                            onClick={onClose} // Use onClose prop
                            className="flex-1 py-4 rounded-full font-bold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all active:scale-95"
                        >
                            Cancel
                        </button>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={onConfirm} // Use onConfirm prop
                            className="flex-1 py-4 px-6 rounded-full font-bold text-white shadow-lg shadow-blue-500/30 transition-all"
                            style={{ background: candidate.gradient }}
                        >
                            Confirm Vote
                        </motion.button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default ConfirmModel;
