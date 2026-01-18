import React, { useState, useEffect } from 'react';
import Card from './Card';
import { updateItemProgress } from '../utils/storage';
import { getSectionTheme } from '../utils/theme';
import { motion, AnimatePresence } from 'framer-motion';
import LanguageToggle from './LanguageToggle';

const StudyMode = ({ items, onExit, onUpdateProgress, progress, onToggleLanguage }) => {
    const [queue, setQueue] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [complete, setComplete] = useState(false);
    const [sessionStats, setSessionStats] = useState({ correct: 0, total: 0 });

    useEffect(() => {
        setQueue(prevQueue => {
            if (prevQueue.length === 0) {
                return [...items].sort(() => 0.5 - Math.random());
            }
            const allIdsMatch = prevQueue.every(q => items.find(i => i.id === q.id));
            if (allIdsMatch && prevQueue.length === items.length) {
                return prevQueue.map(q => items.find(i => i.id === q.id));
            }
            return [...items].sort(() => 0.5 - Math.random());
        });
    }, [items]);

    const handleInstantMaster = () => {
        const currentItem = queue[currentIndex];
        const newProgress = updateItemProgress(currentItem.content, true, true);
        onUpdateProgress(newProgress);

        setSessionStats(prev => ({
            total: prev.total + 1,
            correct: prev.correct + 1
        }));

        if (currentIndex < queue.length - 1) {
            setTimeout(() => setCurrentIndex(prev => prev + 1), 300);
        } else {
            setComplete(true);
        }
    };

    const handleResult = (isCorrect) => {
        const currentItem = queue[currentIndex];
        const newProgress = updateItemProgress(currentItem.content, isCorrect, false);
        onUpdateProgress(newProgress);

        setSessionStats(prev => ({
            total: prev.total + 1,
            correct: isCorrect ? prev.correct + 1 : prev.correct
        }));

        if (currentIndex < queue.length - 1) {
            setTimeout(() => setCurrentIndex(prev => prev + 1), 300);
        } else {
            setComplete(true);
        }
    };

    const currentItem = queue[currentIndex];

    if (complete) {
        const completionRate = Math.round((sessionStats.correct / sessionStats.total) * 100) || 0;
        return (
            <div className="container" style={{ textAlign: 'center', minHeight: '90vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    transition={{ type: "spring", damping: 20 }}
                    className="glass-panel"
                    style={{ padding: '4rem 3rem', maxWidth: '500px' }}
                >
                    <div style={{
                        width: '100px',
                        height: '100px',
                        background: 'var(--success-color)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 2rem',
                        boxShadow: `0 0 40px ${completionRate > 50 ? 'var(--success-color)' : 'var(--accent-purple)'}40`
                    }}>
                        <span style={{ fontSize: '2.5rem' }}>✨</span>
                    </div>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'white' }}>Session Complete!</h2>
                    <div style={{ fontSize: '1.2rem', marginBottom: '2.5rem', color: 'var(--text-secondary)' }}>
                        <p style={{ margin: '0 0 1rem 0' }}>You mastered <span style={{ color: 'white', fontWeight: '800' }}>{sessionStats.correct}</span> out of <span style={{ color: 'white' }}>{sessionStats.total}</span> cards.</p>
                        <div style={{ height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', overflow: 'hidden', marginTop: '1rem' }}>
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${completionRate}%` }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                style={{ height: '100%', background: 'var(--primary-color)' }}
                            />
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                        <button className="btn btn-secondary" onClick={onExit}>Back Home</button>
                        <button className="btn btn-primary" onClick={() => {
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

    if (!currentItem) return <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>Loading session...</div>;

    const theme = getSectionTheme(currentItem.section);
    const progressPercent = ((currentIndex) / queue.length) * 100;

    return (
        <div className="container" style={{ minHeight: '100dvh', padding: '1rem' }}>
            {/* Immersive Header */}
            <div style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '3rem',
                gap: '2rem'
            }}>
                <button className="btn btn-secondary" onClick={onExit} style={{ padding: '0.6rem 1.2rem', minWidth: '100px' }}>&larr; Exit</button>

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                        <span style={{ color: 'white', fontWeight: '800', fontSize: '1.2rem' }}>{currentIndex + 1}</span>
                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>/ {queue.length}</span>
                    </div>
                    <div style={{ width: '100%', maxWidth: '200px', height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', overflow: 'hidden' }}>
                        <motion.div
                            animate={{ width: `${progressPercent}%` }}
                            transition={{ duration: 0.5 }}
                            style={{ height: '100%', background: 'var(--primary-color)', boxShadow: '0 0 10px var(--primary-glow)' }}
                        />
                    </div>
                </div>

                <div style={{ minWidth: '100px', display: 'flex', justifyContent: 'flex-end' }}>
                    <LanguageToggle onToggle={onToggleLanguage} />
                </div>
            </div>

            <AnimatePresence mode='wait'>
                <motion.div
                    key={`${currentItem.id}-${currentIndex}`}
                    initial={{ opacity: 0, scale: 0.95, rotateY: -10 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    exit={{ opacity: 0, scale: 1.05, rotateY: 10 }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
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
