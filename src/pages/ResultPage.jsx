import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { useVotes } from '../context/VoteContext';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

function ResultPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { candidate, nid } = location.state || {};
    const { votes, getTotalVotes, getVotePercentage, voterPhoto } = useVotes();

    useEffect(() => {
        if (!candidate || !nid) {
            navigate('/');
            return;
        }

        // Trigger confetti
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
            });
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
            });
        }, 250);

        return () => clearInterval(interval);
    }, [candidate, nid, navigate]);

    if (!candidate || !nid) {
        return null;
    }

    const totalVotes = getTotalVotes();
    const candidateNames = Object.keys(votes);
    const candidateVotes = Object.values(votes);

    const chartColors = {
        'NCP': '#10b981',
        'BNP': '#3b82f6',
        'Jamayat Sibit': '#8b5cf6',
        'Jatio Party': '#f59e0b',
    };

    const doughnutData = {
        labels: candidateNames,
        datasets: [{
            data: candidateVotes,
            backgroundColor: candidateNames.map(name => chartColors[name] || '#6b7280'),
            borderColor: 'transparent',
            borderWidth: 0,
            hoverOffset: 10,
        }]
    };

    const barData = {
        labels: candidateNames,
        datasets: [{
            label: 'Votes',
            data: candidateVotes,
            backgroundColor: candidateNames.map(name => chartColors[name] || '#6b7280'),
            borderRadius: 12,
            barThickness: 40,
        }]
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    color: 'rgb(156, 163, 175)',
                    padding: 20,
                    font: { size: 13, weight: '500' },
                    usePointStyle: true,
                    pointStyle: 'circle',
                }
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.9)',
                padding: 16,
                titleFont: { size: 15, weight: 'bold' },
                bodyFont: { size: 14 },
                borderColor: 'rgba(255, 255, 255, 0.1)',
                borderWidth: 1,
                cornerRadius: 12,
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-base-100 via-base-200 to-base-100 p-4 md:p-8 relative overflow-hidden">
            {/* Animated Background Orbs */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.2, 0.1],
                }}
                transition={{ duration: 8, repeat: Infinity }}
                className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary rounded-full blur-3xl"
            />
            <motion.div
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.1, 0.15, 0.1],
                }}
                transition={{ duration: 10, repeat: Infinity, delay: 1 }}
                className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary rounded-full blur-3xl"
            />

            <div className="max-w-4xl mx-auto relative z-10">
                {/* Success Card - Modern Centered Design */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.6, type: 'spring' }}
                    className="bg-base-100 rounded-3xl p-10 md:p-14 mb-8 shadow-2xl border border-base-300 text-center relative"
                >
                    {/* Theme Toggle in top right */}
                    <div className="absolute top-6 right-6">
                        <button className="w-10 h-10 bg-base-200 hover:bg-base-300 rounded-full flex items-center justify-center transition-colors">
                            <svg className="w-5 h-5 text-base-content" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                            </svg>
                        </button>
                    </div>

                    {/* Voter Photo or Icon */}
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                        className="mb-8"
                    >
                        {voterPhoto ? (
                            <div className="relative inline-block">
                                <img
                                    src={voterPhoto}
                                    alt="Voter"
                                    className="w-28 h-28 object-cover rounded-3xl border-4 border-primary shadow-2xl mx-auto"
                                />
                                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
                                    <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                        ) : (
                            <div className="w-28 h-28 mx-auto bg-gradient-to-br from-primary to-secondary rounded-3xl flex items-center justify-center shadow-2xl relative">
                                <motion.div
                                    animate={{ scale: [1, 1.1, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="absolute inset-0 bg-primary rounded-3xl opacity-30 blur-xl"
                                />
                                <svg className="w-14 h-14 text-white relative z-10" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            </div>
                        )}
                    </motion.div>

                    {/* Success Message */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-3xl md:text-4xl font-bold text-base-content mb-3"
                    >
                        Vote Submitted Successfully!
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-lg text-base-content/70 mb-8"
                    >
                        আপনার ভোট সফলভাবে জমা হয়েছে
                    </motion.p>

                    {/* Voted Candidate */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="mb-8"
                    >
                        <p className="text-base-content/60 text-sm mb-2">You voted for:</p>
                        <h2 className="text-2xl font-bold text-base-content mb-1">{candidate.name}</h2>
                    </motion.div>

                    {/* Vote Details Grid */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto mb-8"
                    >
                        <div className="text-left">
                            <p className="text-base-content/60 text-sm mb-1">Voter ID</p>
                            <p className="text-base-content font-mono text-sm">{nid.replace(/(\d{4})/g, '$1 ').trim()}</p>
                        </div>
                        <div className="text-left md:text-right">
                            <p className="text-base-content/60 text-sm mb-1">Timestamp</p>
                            <p className="text-base-content font-mono text-sm">{new Date().toLocaleString('en-GB', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}</p>
                        </div>
                    </motion.div>

                    {/* Print Button */}
                    <motion.button
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.7 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => window.print()}
                        className="btn btn-outline btn-primary rounded-full px-8"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                        </svg>
                        Print Receipt
                    </motion.button>
                </motion.div>

                {/* Dashboard Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="text-center mb-10"
                >
                    <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent mb-3">
                        Live Results Dashboard
                    </h2>
                    <p className="text-base-content/60">Real-time election statistics and analytics</p>
                </motion.div>

                {/* Total Votes Card - Ultra Modern Smooth UI */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9, type: 'spring', stiffness: 100 }}
                    className="relative mb-10"
                >
                    {/* Glassmorphism Card with Colorful Gradient */}
                    <div className="relative rounded-[2rem] p-12 md:p-16 text-center overflow-hidden shadow-2xl backdrop-blur-xl border border-white/20" style={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%)'
                    }}>
                        {/* Animated Background Orbs */}
                        <motion.div
                            animate={{
                                x: [0, 100, 0],
                                y: [0, -50, 0],
                                scale: [1, 1.2, 1],
                            }}
                            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"
                        />
                        <motion.div
                            animate={{
                                x: [0, -80, 0],
                                y: [0, 60, 0],
                                scale: [1, 1.3, 1],
                            }}
                            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                            className="absolute bottom-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl"
                        />

                        {/* Rotating Gradient Overlay */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 opacity-20"
                            style={{
                                background: 'conic-gradient(from 0deg, transparent 0%, white 50%, transparent 100%)'
                            }}
                        />

                        {/* Content */}
                        <div className="relative z-10">
                            {/* Icon */}
                            <motion.div
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ delay: 1, type: 'spring', stiffness: 200 }}
                                className="inline-flex items-center justify-center w-20 h-20 mb-6 bg-white/20 backdrop-blur-sm rounded-2xl shadow-lg"
                            >
                                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                                </svg>
                            </motion.div>

                            {/* Label */}
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.1 }}
                                className="text-white/95 text-lg md:text-xl mb-4 font-semibold tracking-wide"
                            >
                                Total Votes Cast
                            </motion.p>

                            {/* Animated Counter */}
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 1.2, type: 'spring', stiffness: 150 }}
                                className="mb-4"
                            >
                                <motion.p
                                    className="text-7xl md:text-8xl font-bold text-white tracking-tight"
                                    style={{
                                        textShadow: '0 4px 20px rgba(0,0,0,0.3), 0 0 40px rgba(255,255,255,0.2)'
                                    }}
                                >
                                    {totalVotes.toLocaleString()}
                                </motion.p>
                            </motion.div>

                            {/* Subtitle with Icon */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.3 }}
                                className="flex items-center justify-center gap-2 text-white/85"
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span className="text-sm md:text-base font-medium">Across all candidates</span>
                            </motion.div>

                            {/* Decorative Line */}
                            <motion.div
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ delay: 1.4, duration: 0.8 }}
                                className="mt-6 h-1 w-32 mx-auto bg-gradient-to-r from-transparent via-white/50 to-transparent rounded-full"
                            />
                        </div>

                        {/* Floating Particles */}
                        {[...Array(6)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-2 h-2 bg-white/40 rounded-full"
                                style={{
                                    left: `${15 + i * 15}%`,
                                    top: `${20 + (i % 3) * 25}%`,
                                }}
                                animate={{
                                    y: [0, -30, 0],
                                    opacity: [0.2, 0.6, 0.2],
                                    scale: [1, 1.5, 1],
                                }}
                                transition={{
                                    duration: 3 + i * 0.5,
                                    repeat: Infinity,
                                    delay: i * 0.3,
                                }}
                            />
                        ))}
                    </div>
                </motion.div>

                {/* Charts Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* Doughnut Chart */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.0 }}
                        className="bg-base-100 rounded-3xl p-8 shadow-xl border border-base-300"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                                <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                                    <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-base-content">Vote Distribution</h3>
                        </div>
                        <div className="max-w-sm mx-auto">
                            <Doughnut data={doughnutData} options={chartOptions} />
                        </div>
                    </motion.div>

                    {/* Bar Chart */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.1 }}
                        className="bg-base-100 rounded-3xl p-8 shadow-xl border border-base-300"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
                                <svg className="w-6 h-6 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-base-content">Vote Comparison</h3>
                        </div>
                        <Bar data={barData} options={{
                            ...chartOptions,
                            scales: {
                                y: {
                                    beginAtZero: true,
                                    ticks: { color: 'rgb(156, 163, 175)', font: { size: 12 } },
                                    grid: { color: 'rgba(156, 163, 175, 0.1)' }
                                },
                                x: {
                                    ticks: { color: 'rgb(156, 163, 175)', font: { size: 12 } },
                                    grid: { display: false }
                                }
                            }
                        }} />
                    </motion.div>
                </div>

                {/* Candidate Results Cards - Ultra Modern */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10"
                >
                    {candidateNames.map((name, index) => (
                        <motion.div
                            key={name}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1.3 + index * 0.1 }}
                            whileHover={{ scale: 1.03, y: -8 }}
                            className="bg-base-100 rounded-3xl p-7 shadow-xl border-2 hover:shadow-2xl transition-all duration-300 relative overflow-hidden group"
                            style={{ borderColor: chartColors[name] + '30' }}
                        >
                            {/* Gradient overlay on hover */}
                            <div
                                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                                style={{ background: `linear-gradient(135deg, ${chartColors[name]}20 0%, transparent 100%)` }}
                            />
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-4">
                                    <div
                                        className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg"
                                        style={{ backgroundColor: chartColors[name] + '20' }}
                                    >
                                        <svg className="w-8 h-8" style={{ color: chartColors[name] }} fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-base-content">{name}</h4>
                                        <p className="text-base-content/60 text-sm">
                                            {votes[name].toLocaleString()} votes
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-4xl font-bold" style={{ color: chartColors[name] }}>
                                        {getVotePercentage(name)}%
                                    </p>
                                </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="w-full bg-base-200 rounded-full h-4 overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${getVotePercentage(name)}%` }}
                                    transition={{ delay: 1.4 + index * 0.1, duration: 1, ease: "easeOut" }}
                                    className="h-full rounded-full relative overflow-hidden"
                                    style={{ backgroundColor: chartColors[name] }}
                                >
                                    <motion.div
                                        animate={{ x: ['0%', '100%'] }}
                                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                                    />
                                </motion.div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Return Home Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.6 }}
                    className="text-center"
                >
                    <motion.button
                        whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/')}
                        className="btn btn-lg bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white border-none px-10 font-bold rounded-full shadow-xl"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        Return to Home
                    </motion.button>
                </motion.div>
            </div>
        </div>
    );
}

export default ResultPage;
