import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useVotes } from '../context/VoteContext';
import ncpLogo from '../assets/ncp.png';
import bnpLogo from '../assets/bnp_logo.png';
import jamayatLogo from '../assets/jamayat.png';
import jatioLogo from '../assets/jatio-party.png';

const candidates = [
    {
        id: 1,
        name: 'NCP',
        fullName: 'National Congress Party',
        logo: ncpLogo,
        gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        glowColor: 'rgba(16, 185, 129, 0.2)'
    },
    {
        id: 2,
        name: 'BNP',
        fullName: 'Bangladesh Nationalist Party',
        logo: bnpLogo,
        gradient: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
        glowColor: 'rgba(59, 130, 246, 0.3)'
    },
    {
        id: 3,
        name: 'Jamayat Sibit',
        fullName: 'Jamayat-e-Islami Bangladesh',
        logo: jamayatLogo,
        gradient: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
        glowColor: 'rgba(139, 92, 246, 0.3)'
    },
    {
        id: 4,
        name: 'Jatio Party',
        fullName: 'Jatiya Party Bangladesh',
        logo: jatioLogo,
        gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
        glowColor: 'rgba(245, 158, 11, 0.3)'
    },
];

function VotingPage() {
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const nid = location.state?.nid;
    const { castVote } = useVotes();

    // Redirect if no NID
    if (!nid) {
        navigate('/verify');
        return null;
    }

    const handleVoteClick = (candidate) => {
        setSelectedCandidate(candidate);
        setShowModal(true);
    };

    const confirmVote = () => {
        const success = castVote(selectedCandidate.name, nid);
        if (!success) {
            alert('This NID has already voted!');
            navigate('/');
            return;
        }
        setShowModal(false);
        navigate('/result', { state: { candidate: selectedCandidate, nid } });
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 overflow-hidden relative bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-500">
            {/* Animated Background Orbs */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    x: [0, 50, 0],
                    y: [0, -30, 0],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-10 right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl"
            />
            <motion.div
                animate={{
                    scale: [1, 1.3, 1],
                    x: [0, -60, 0],
                    y: [0, 40, 0],
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute bottom-10 left-10 w-[600px] h-[500px] bg-white/10 rounded-full blur-3xl"
            />

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <motion.h1
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200 }}
                        className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-gray-300 mb-4"
                        style={{
                            textShadow: '0 4px 20px dark:rgba(0,0,0,0.3), 0 0 40px rgba(255,255,255,0.2)'
                        }}
                    >
                        Cast Your Vote
                    </motion.h1>
                    <p className="dark:text-gray-300 text-gray-900 text-lg md:text-xl mb-6">Select your preferred candidate</p>

                    {/* Voter ID Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="inline-block bg-white/20 backdrop-blur-xl px-8 py-3 rounded-full border border-white/30 shadow-xl"
                    >
                        <div className="flex items-center gap-3">
                            <svg className="w-5 h-5 dark:text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                            </svg>
                            <p className="dark:text-white text-gray-900 font-semibold">Voter ID: {nid.replace(/(\d{4})/g, '$1 ').trim()}</p>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Candidate Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {candidates.map((candidate, index) => (
                        <motion.div
                            key={candidate.id}
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ delay: 0.3 + index * 0.1, type: 'spring' }}
                            whileHover={{ scale: 1.03, y: -10 }}
                            className="group relative"
                        >
                            {/* Glow Effect */}
                            <div
                                className="absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl"
                                style={{ background: candidate.gradient }}
                            />

                            {/* Card */}
                            <div
                                className="relative bg-white/95 backdrop-blur-xl rounded-xl p-8 cursor-pointer shadow-xl border border-white/80 overflow-hidden"
                                onClick={() => handleVoteClick(candidate)}
                            >
                                {/* Gradient Accent */}
                                <div
                                    className="absolute top-0 right-0 w-32 h-32 opacity-10 rounded-full blur-xl"
                                    style={{ background: candidate.gradient }}
                                />

                                <div className="relative z-10 flex items-center gap-6">
                                    {/* Logo */}
                                    <motion.div
                                        whileHover={{ rotate: 2, scale: 1.1 }}
                                        className="relative"
                                    >
                                        <div
                                            className="w-24 h-24 rounded-2xl p-0.5 border border-white/80 shadow-xl"
                                            style={{ background: candidate.gradient }}
                                        >
                                            <div className="w-full h-full rounded-xl bg-white flex items-center justify-center overflow-hidden">
                                                <img src={candidate.logo} alt={candidate.name} className="w-20 h-20 object-contain" />
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* Info */}
                                    <div className="flex-1">
                                        <h3 className="text-2xl font-bold text-base-content dark:text-gray-900 mb-1">{candidate.name}</h3>
                                        <p className="dark:text-base-content dark:text-gray-900 text-sm mb-4">{candidate.fullName}</p>

                                        {/* Vote Button */}
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="px-6 py-2.5 rounded-full text-white font-semibold shadow-lg flex items-center gap-2 text-sm"
                                            style={{ background: candidate.gradient }}
                                        >
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            Vote Now
                                        </motion.button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Back Button */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-center"
                >
                    <button
                        onClick={() => navigate('/verify')}
                        className="bg-white/20 hover:bg-white/30 backdrop-blur-xl dark:text-white text-gray-900  px-8 py-3 rounded-full border border-white/30 font-semibold transition-all duration-300 shadow-xl"
                    >
                        ← Back to Verification
                    </button>
                </motion.div>
            </div>

            {/* Confirmation Modal */}
            {showModal && selectedCandidate && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 z-50"
                    onClick={() => setShowModal(false)}
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
                            style={{ background: selectedCandidate.gradient }}
                        />

                        <div className="relative z-10 px-8 pt-10 pb-8">
                            {/* Floating Icon */}
                            <motion.div
                                initial={{ scale: 0, rotate: -45 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
                                className="w-24 h-24 mx-auto mb-6 rounded-3xl flex items-center justify-center shadow-2xl relative"
                                style={{ background: selectedCandidate.gradient }}
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
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500" style={{ background: selectedCandidate.gradient }}></div>

                                <div className="w-20 h-20 mx-auto mb-4 bg-white dark:bg-gray-800 rounded-2xl p-2 shadow-sm relative z-10">
                                    <img src={selectedCandidate.logo} alt={selectedCandidate.name} className="w-full h-full object-contain" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1 relative z-10">{selectedCandidate.name}</h3>
                                <p className="text-gray-500 dark:text-gray-400 text-xs font-medium uppercase tracking-wider relative z-10">{selectedCandidate.fullName}</p>
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
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 py-4 rounded-full font-bold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all active:scale-95"
                                >
                                    Cancel
                                </button>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={confirmVote}
                                    className="flex-1 py-4 px-6 rounded-full font-bold text-white shadow-lg shadow-blue-500/30 transition-all"
                                    style={{ background: selectedCandidate.gradient }}
                                >
                                    Confirm Vote
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
}

export default VotingPage;
