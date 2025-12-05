import { motion, useAnimation } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function Home() {
    const navigate = useNavigate();
    const controls = useAnimation();

    useEffect(() => {
        controls.start(i => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.1 }
        }));
    }, [controls]);

    const features = [
        {
            icon: '🔒',
            title: 'Secure',
            desc: 'End-to-end encryption',
            color: 'from-yellow-400 to-orange-500'
        },
        {
            icon: '✓',
            title: 'Verified',
            desc: 'NID authentication',
            color: 'from-blue-400 to-indigo-500'
        },
        {
            icon: '👁️',
            title: 'Transparent',
            desc: 'Blockchain ready',
            color: 'from-purple-400 to-pink-500'
        },
        {
            icon: '⚡',
            title: 'Fast',
            desc: 'Instant results',
            color: 'from-green-400 to-emerald-500'
        },
    ];

    const trustBadges = [
        { icon: '🛡️', text: 'SSL Secured' },
        { icon: '🔐', text: 'Encrypted' },
        { icon: '✅', text: 'Verified' },
        { icon: '⚡', text: 'Real-time' },
    ];

    return (
        <div className="min-h-screen flex items-center justify-center p-4 overflow-hidden relative bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900">
            {/* Animated background blobs */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                    rotate: [0, 90, 0],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full blur-3xl opacity-30"
            />
            <motion.div
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.2, 0.4, 0.2],
                    rotate: [0, -90, 0],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                }}
                className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-pink-400 to-purple-500 rounded-full blur-3xl opacity-20"
            />

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 w-full max-w-2xl"
            >
                {/* Main Card */}
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-10 md:p-12 shadow-2xl backdrop-blur-xl border border-white/10">

                    {/* Logo/Icon */}
                    <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                        className="mb-8 text-center"
                    >
                        <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl relative">
                            <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-50 blur-xl"
                            />
                            <svg className="w-14 h-14 text-white relative z-10" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                        </div>

                        <motion.h1
                            className="text-4xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            Bangladesh E-Voting
                        </motion.h1>

                        <motion.p
                            className="text-xl text-gray-300 mb-2 font-semibold"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                        >
                            নিরাপদ ও স্বচ্ছ নির্বাচন
                        </motion.p>

                        <motion.p
                            className="text-lg text-gray-400"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7 }}
                        >
                            Secure & Transparent Elections
                        </motion.p>
                    </motion.div>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="text-gray-300 text-center text-base mb-8 leading-relaxed max-w-xl mx-auto"
                    >
                        Cast your vote securely using your National ID. Experience the future of democratic participation with our state-of-the-art e-voting platform.
                    </motion.p>

                    {/* Features Grid */}
                    <motion.div
                        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9 }}
                    >
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                custom={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={controls}
                                whileHover={{ scale: 1.05, y: -5 }}
                                className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-5 cursor-pointer hover:border-white/20 transition-all"
                            >
                                <div className={`w-12 h-12 mx-auto mb-3 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center shadow-lg`}>
                                    <span className="text-2xl">{feature.icon}</span>
                                </div>
                                <h3 className="font-bold text-white text-center mb-1 text-sm">{feature.title}</h3>
                                <p className="text-xs text-gray-400 text-center">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* CTA Button */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.1, type: 'spring' }}
                        className="text-center mb-8"
                    >
                        <motion.button
                            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(168, 85, 247, 0.4)" }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate('/verify')}
                            className="btn btn-lg bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 hover:from-purple-600 hover:via-pink-600 hover:to-purple-600 text-white border-none px-12 py-4 text-lg font-bold rounded-full shadow-2xl transition-all duration-300 group relative overflow-hidden"
                        >
                            <motion.div
                                animate={{ x: ['0%', '100%'] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                            />
                            <span className="flex items-center gap-3 relative z-10">
                                Start Voting
                                <motion.svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    whileHover={{ x: 5 }}
                                    transition={{ type: 'spring', stiffness: 400 }}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </motion.svg>
                            </span>
                        </motion.button>
                    </motion.div>

                    {/* Trust Badges */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.3 }}
                        className="pt-6 border-t border-white/10"
                    >
                        <p className="text-gray-400 text-sm mb-4 text-center">Trusted by millions of voters</p>
                        <div className="flex items-center justify-center gap-6 flex-wrap">
                            {trustBadges.map((badge, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 1.4 + index * 0.1 }}
                                    whileHover={{ scale: 1.1 }}
                                    className="flex items-center gap-2 text-gray-300 text-sm bg-white/5 px-4 py-2 rounded-full border border-white/10"
                                >
                                    <span className="text-lg">{badge.icon}</span>
                                    <span className="font-medium">{badge.text}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Floating particles */}
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-purple-400/40 rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -40, 0],
                            opacity: [0.2, 0.8, 0.2],
                            scale: [1, 1.5, 1],
                        }}
                        transition={{
                            duration: 3 + Math.random() * 3,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                        }}
                    />
                ))}
            </motion.div>
        </div>
    );
}

export default Home;
