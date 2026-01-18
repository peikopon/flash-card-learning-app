import React, { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { FaThumbsUp, FaThumbsDown, FaExternalLinkAlt, FaStar } from 'react-icons/fa';

const Card = ({ item, onResult, themeColor, ThemeIcon, onInstantMaster, currentProgress }) => {
    const [flipped, setFlipped] = useState(false);
    const x = useMotionValue(0);
    const rotate = useTransform(x, [-200, 200], [-25, 25]);
    const opacity = useTransform(x, [-250, -150, 0, 150, 250], [0, 1, 1, 1, 0]);

    const handleDragEnd = (event, info) => {
        if (info.offset.x > 120) {
            onResult(true);
        } else if (info.offset.x < -120) {
            onResult(false);
        }
    };

    const handleFlip = () => setFlipped(!flipped);

    return (
        <div style={{
            perspective: 2000,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2.5rem',
            width: '100%',
            maxWidth: '450px',
            margin: '0 auto'
        }}>
            <motion.div
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                style={{
                    x,
                    rotate,
                    opacity,
                    width: '320px',
                    height: '480px',
                    cursor: 'grab',
                    zIndex: 1,
                    position: 'relative',
                    transformStyle: 'preserve-3d'
                }}
                onDragEnd={handleDragEnd}
                animate={{ rotateY: flipped ? 180 : 0 }}
                transition={{ duration: 0.7, type: "spring", stiffness: 180, damping: 20 }}
                onClick={handleFlip}
                whileTap={{ cursor: 'grabbing', scale: 0.98 }}
            >
                <div
                    style={{
                        width: '100%', height: '100%', position: 'relative',
                        transformStyle: 'preserve-3d',
                        borderRadius: '24px',
                        boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
                    }}
                >
                    {/* FRONT */}
                    <div style={{
                        position: 'absolute', width: '100%', height: '100%',
                        backfaceVisibility: 'hidden',
                        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                        padding: '32px',
                        boxSizing: 'border-box',
                        textAlign: 'center',
                        background: themeColor,
                        color: 'white',
                        borderRadius: '24px',
                        border: '2px solid rgba(255, 255, 255, 0.2)',
                        backdropFilter: 'blur(20px)'
                    }}>
                        <div style={{
                            background: 'rgba(255,255,255,0.2)',
                            borderRadius: '50%',
                            padding: '20px',
                            marginBottom: '24px',
                            border: '1px solid rgba(255,255,255,0.3)'
                        }}>
                            {ThemeIcon && <ThemeIcon size={48} color="white" />}
                        </div>

                        <h3 style={{
                            fontSize: '0.85rem',
                            textTransform: 'uppercase',
                            letterSpacing: '2px',
                            color: 'rgba(255, 255, 255, 0.8)',
                            marginBottom: '12px',
                            fontWeight: '800'
                        }}>
                            {item.section}
                        </h3>


                        <h1 style={{
                            fontSize: '2.2rem',
                            fontWeight: '800',
                            lineHeight: '1.2',
                            margin: '0 0 20px 0',
                            color: 'white'
                        }}>
                            {item.content}
                        </h1>

                        <div style={{ marginTop: 'auto', opacity: 0.6, fontSize: '0.85rem' }}>
                            <span style={{
                                display: 'inline-block',
                                padding: '8px 16px',
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '20px'
                            }}>
                                Click to Reveal
                            </span>
                        </div>
                    </div>

                    {/* BACK */}
                    <div style={{
                        position: 'absolute', width: '100%', height: '100%',
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                        display: 'flex', flexDirection: 'column', alignItems: 'center',
                        padding: '32px', boxSizing: 'border-box',
                        background: 'rgba(15, 23, 42, 0.9)',
                        color: 'var(--text-main)',
                        borderRadius: '24px',
                        border: `2px solid ${themeColor}`,
                        backdropFilter: 'blur(20px)'
                    }}>
                        <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            background: `${themeColor}15`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: themeColor,
                            marginBottom: '1.5rem',
                            border: `1px solid ${themeColor}30`
                        }}>
                            {ThemeIcon && <ThemeIcon size={20} />}
                        </div>

                        <p style={{
                            fontSize: '1.15rem',
                            lineHeight: '1.7',
                            flex: 1,
                            overflowY: 'auto',
                            margin: 0,
                            paddingRight: '8px',
                            color: '#e2e8f0',
                            textAlign: 'left'
                        }}>
                            {item.details}
                        </p>

                        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '20px' }}>
                            {item.link && (
                                <a
                                    href={item.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="btn btn-secondary"
                                    style={{
                                        fontSize: '0.85rem',
                                        width: '100%',
                                        padding: '0.6rem',
                                        borderColor: `${themeColor}40`
                                    }}
                                >
                                    <FaExternalLinkAlt size={12} /> AWS Documentation
                                </a>
                            )}
                        </div>
                    </div>

                </div>
            </motion.div>

            {/* Controls */}
            <div style={{
                display: 'flex', gap: '1.5rem', alignItems: 'center',
                paddingBottom: '1rem'
            }}>
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="btn"
                    style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '50%', width: '64px', height: '64px', padding: 0 }}
                    onClick={(e) => { e.stopPropagation(); onResult(false); }}
                >
                    <FaThumbsDown size={24} />
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.1, rotate: 180 }}
                    whileTap={{ scale: 0.9 }}
                    className="btn"
                    style={{
                        background: 'rgba(234, 179, 8, 0.15)',
                        color: '#eab308',
                        border: '1px solid rgba(234, 179, 8, 0.3)',
                        borderRadius: '50%',
                        width: '52px',
                        height: '52px',
                        padding: 0
                    }}
                    onClick={(e) => {
                        e.stopPropagation();
                        onInstantMaster();
                    }}
                    title="Master Instantly"
                >
                    <FaStar size={24} />
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="btn"
                    style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '50%', width: '64px', height: '64px', padding: 0 }}
                    onClick={(e) => { e.stopPropagation(); onResult(true); }}
                >
                    <FaThumbsUp size={24} />
                </motion.button>
            </div>

            {/* Mastery Progress */}
            <div className="glass-panel" style={{
                width: '100%',
                maxWidth: '320px',
                padding: '1rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: '600' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Session Mastery</span>
                    <span style={{ color: themeColor }}>{Math.min(currentProgress || 0, 3)} / 3</span>
                </div>
                <div style={{ display: 'flex', gap: '6px', height: '6px' }}>
                    {[1, 2, 3].map(step => (
                        <div key={step} style={{
                            flex: 1,
                            borderRadius: '10px',
                            background: step <= (currentProgress || 0) ? (themeColor || 'var(--primary-color)') : 'rgba(255,255,255,0.05)',
                            transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                            boxShadow: step <= (currentProgress || 0) ? `0 0 10px ${themeColor}60` : 'none'
                        }} />
                    ))}
                </div>
            </div>
        </div>
    );
};


export default Card;
