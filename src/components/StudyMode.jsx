import React, { useState, useEffect } from 'react';
import Card from './Card';
import { updateItemProgress } from '../utils/storage';
import { getSectionTheme } from '../utils/theme';
import { motion, AnimatePresence } from 'framer-motion';

const StudyMode = ({ items, onExit, onUpdateProgress, progress }) => {
    // Shuffle items on mount, or assume passed shuffled.
    // We'll shuffle here to ensure randomness as per requirements "appear in random order"
    const [queue, setQueue] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [complete, setComplete] = useState(false);
    const [sessionStats, setSessionStats] = useState({ correct: 0, total: 0 });

    useEffect(() => {
        // Shuffle
        const shuffled = [...items].sort(() => 0.5 - Math.random());
        setQueue(shuffled);
    }, [items]);

    const handleInstantMaster = () => {
        const currentItem = queue[currentIndex];
        const newProgress = updateItemProgress(currentItem.content, true, true); // true, true = isCorrect, isInstant
        onUpdateProgress(newProgress);

        setSessionStats(prev => ({
            total: prev.total + 1,
            correct: prev.correct + 1
        }));

        if (currentIndex < queue.length - 1) {
            setTimeout(() => setCurrentIndex(prev => prev + 1), 200);
        } else {
            setComplete(true);
        }
    };

    const handleResult = (isCorrect) => {
        const currentItem = queue[currentIndex];

        // Update Storage
        const newProgress = updateItemProgress(currentItem.content, isCorrect, false);
        onUpdateProgress(newProgress); // Notify App to update state

        // Update Session Stats
        setSessionStats(prev => ({
            total: prev.total + 1,
            correct: isCorrect ? prev.correct + 1 : prev.correct
        }));

        // Next Card
        if (currentIndex < queue.length - 1) {
            setTimeout(() => setCurrentIndex(prev => prev + 1), 200); // Slight delay for animation
        } else {
            setComplete(true);
        }
    };

    if (!queue.length) return <div className="container" style={{ textAlign: 'center' }}>Loading...</div>;

    if (complete) {
        return (
            <div className="container" style={{ textAlign: 'center', height: '80vh', justifyContent: 'center' }}>
                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass-panel" style={{ padding: '3rem' }}>
                    <h2 style={{ fontSize: '2rem' }}>Session Complete!</h2>
                    <p style={{ fontSize: '1.2rem', margin: '2rem 0' }}>
                        You mastered {sessionStats.correct} out of {sessionStats.total} cards in this session.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                        <button className="btn btn-secondary" onClick={onExit}>Back to Dashboard</button>
                        <button className="btn btn-primary" onClick={() => {
                            // Restart same set
                            const shuffled = [...items].sort(() => 0.5 - Math.random());
                            setQueue(shuffled);
                            setCurrentIndex(0);
                            setComplete(false);
                            setSessionStats({ correct: 0, total: 0 });
                        }}>Study Again</button>
                    </div>
                </motion.div>
            </div>
        );
    }

    const currentItem = queue[currentIndex];
    const theme = getSectionTheme(currentItem.section);

    return (
        <div className="container" style={{
            minHeight: '100dvh', // Dynamic viewport height for mobile
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start', // Start from top to put header
            alignItems: 'center',
            paddingTop: '1rem',
            paddingBottom: '2rem'
        }}>
            {/* Header: Exit + Progress */}
            <div style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '2rem',
                padding: '0 0.5rem'
            }}>
                <button className="btn btn-secondary" onClick={onExit} style={{ padding: '0.6rem 1.2rem' }}>&larr; Exit</button>

                <div style={{ textAlign: 'right' }}>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{currentIndex + 1} / {queue.length}</span>
                    <div style={{ width: '100px', height: '4px', background: 'var(--surface-color)', marginTop: '6px', borderRadius: '2px' }}>
                        <div style={{ width: `${((currentIndex) / queue.length) * 100}%`, height: '100%', background: 'var(--primary-color)', transition: 'width 0.3s' }} />
                    </div>
                </div>
            </div>

            <AnimatePresence mode='wait'>
                <motion.div
                    key={currentItem.content}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.2 }}
                    style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
                >
                    <Card
                        item={currentItem}
                        onResult={handleResult}
                        themeColor={theme.color}
                        ThemeIcon={theme.icon}
                        onInstantMaster={handleInstantMaster}
                        currentProgress={progress[currentItem.content]?.correctCount || 0}
                    />
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default StudyMode;
