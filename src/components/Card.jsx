import React, { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { FaThumbsUp, FaThumbsDown, FaExternalLinkAlt, FaStar } from 'react-icons/fa';

const Card = ({ item, onResult, themeColor, ThemeIcon, onInstantMaster, currentProgress }) => {
    const [flipped, setFlipped] = useState(false);
    const x = useMotionValue(0);
    const rotate = useTransform(x, [-200, 200], [-30, 30]);
    const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);

    // Color indicators on drag
    const bg = useTransform(x,
        [-150, 0, 150],
        ['rgba(239, 68, 68, 1)', themeColor || 'rgba(30, 41, 59, 1)', 'rgba(16, 185, 129, 1)']
    );

    const handleDragEnd = (event, info) => {
        if (info.offset.x > 100) {
            onResult(true);
        } else if (info.offset.x < -100) {
            onResult(false);
        }
    };

    const handleFlip = () => setFlipped(!flipped);

    return (
        <div style={{
            perspective: 1000,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2rem',
            width: '100%',
            maxWidth: '400px', // slightly wider to fit content better
            margin: '0 auto'
        }}>
            <motion.div
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                style={{
                    x,
                    rotate,
                    opacity,
                    width: '300px',
                    height: '450px', // Fixed height defined
                    cursor: 'grab',
                    zIndex: 1,
                    position: 'relative', // relative for 3d context
                    transformStyle: 'preserve-3d' // CRITICAL FIX for flip
                }}
                onDragEnd={handleDragEnd}
                animate={{ rotateY: flipped ? 180 : 0 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
                onClick={handleFlip}
            >
                <div
                    style={{
                        width: '100%', height: '100%', position: 'relative',
                        transformStyle: 'preserve-3d',
                        borderRadius: '20px',
                        boxShadow: '0 10px 30px -5px rgba(0,0,0,0.3)'
                    }}
                >
                    {/* FRONT */}
                    <div style={{
                        position: 'absolute', width: '100%', height: '100%',
                        backfaceVisibility: 'hidden',
                        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                        padding: '24px',
                        boxSizing: 'border-box',
                        textAlign: 'center',
                        background: `linear-gradient(135deg, ${themeColor} 0%, ${themeColor}dd 100%)`,
                        color: 'white',
                        borderRadius: '20px',
                        border: '2px solid rgba(255,255,255,0.1)'
                    }}>
                        <div style={{
                            background: 'rgba(255,255,255,0.2)',
                            borderRadius: '50%',
                            padding: '16px',
                            marginBottom: '20px',
                            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                        }}>
                            {ThemeIcon && <ThemeIcon size={40} color="white" />}
                        </div>

                        <h3 style={{
                            fontSize: '1rem',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            opacity: 0.9,
                            marginBottom: '10px'
                        }}>
                            {item.section}
                        </h3>

                        <h1 style={{
                            fontSize: '1.8rem',
                            fontWeight: '800',
                            lineHeight: '1.4',
                            textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                        }}>
                            {item.content}
                        </h1>

                        <div style={{ marginTop: 'auto', opacity: 0.8, fontSize: '0.9rem' }}>
                            <span style={{ display: 'inline-block', padding: '6px 12px', background: 'rgba(0,0,0,0.2)', borderRadius: '20px' }}>
                                Tap to Flip
                            </span>
                        </div>
                    </div>

                    {/* BACK */}
                    <div style={{
                        position: 'absolute', width: '100%', height: '100%',
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                        padding: '24px', boxSizing: 'border-box', textAlign: 'center',
                        background: 'var(--surface-color)', /* Keep back neutral for readability */
                        color: 'var(--text-main)',
                        borderRadius: '20px',
                        border: `2px solid ${themeColor}`
                    }}>
                        <h3 style={{ color: themeColor, marginBottom: '1rem' }}>Answer / Details</h3>
                        <p style={{ fontSize: '1.1rem', lineHeight: '1.6', flex: 1, overflowY: 'auto', display: 'flex', alignItems: 'center' }}>
                            {item.details}
                        </p>
                        {item.link && (
                            <a
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="btn"
                                style={{
                                    marginTop: '20px',
                                    fontSize: '0.9rem',
                                    background: themeColor,
                                    color: 'white',
                                    width: '100%'
                                }}
                            >
                                <FaExternalLinkAlt size={12} /> Read Documentation
                            </a>
                        )}
                    </div>
                </div>
            </motion.div>

            {/* Controls Container */}
            <div style={{
                display: 'flex', gap: '2rem', alignItems: 'center',
                paddingBottom: '1.5rem'
            }}>
                <button className="btn" style={{ background: '#ef4444', color: 'white', borderRadius: '50%', width: '60px', height: '60px', padding: 0, boxShadow: '0 4px 12px rgba(239, 68, 68, 0.4)' }} onClick={() => onResult(false)}>
                    <FaThumbsDown size={24} />
                </button>

                {/* Star / Instant Master Button */}
                <button
                    className="btn"
                    style={{
                        background: '#eab308', // Yellow/Gold
                        color: 'white',
                        borderRadius: '50%',
                        width: '48px',
                        height: '48px',
                        padding: 0,
                        boxShadow: '0 4px 12px rgba(234, 179, 8, 0.4)'
                    }}
                    onClick={(e) => {
                        e.stopPropagation(); // Prevent card flip
                        onInstantMaster();
                    }}
                    title="Master Instantly"
                >
                    <FaStar size={20} />
                </button>

                <button className="btn" style={{ background: '#10b981', color: 'white', borderRadius: '50%', width: '60px', height: '60px', padding: 0, boxShadow: '0 4px 12px rgba(16, 185, 129, 0.4)' }} onClick={() => onResult(true)}>
                    <FaThumbsUp size={24} />
                </button>
            </div>

            {/* Mastery HP Bar */}
            <div style={{
                width: '100%',
                maxWidth: '300px',
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '12px',
                padding: '12px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    <span>Mastery Progress</span>
                    <span>{Math.min(currentProgress || 0, 3)} / 3</span>
                </div>
                <div style={{ display: 'flex', gap: '4px', height: '8px' }}>
                    {[1, 2, 3].map(step => (
                        <div key={step} style={{
                            flex: 1,
                            borderRadius: '4px',
                            background: step <= (currentProgress || 0) ? (themeColor || 'var(--primary-color)') : 'rgba(255,255,255,0.1)',
                            transition: 'background 0.3s'
                        }} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Card;
