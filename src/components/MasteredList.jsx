import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { getSectionTheme } from '../utils/theme';
import { updateItemProgress } from '../utils/storage';
import { FaChevronDown, FaChevronUp, FaExternalLinkAlt, FaTrash, FaSearch } from 'react-icons/fa';
import LanguageToggle from './LanguageToggle';

const MasteredList = ({ data, progress, onExit, onUpdateProgress, onToggleLanguage }) => {
    const { i18n, t } = useTranslation();
    const isJa = i18n.language === 'ja';

    const [expandedId, setExpandedId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSection, setSelectedSection] = useState(null);

    const masteredItems = useMemo(() => data.filter(item => progress[item.content]?.mastered), [data, progress]);
    const sections = useMemo(() => [...new Set(masteredItems.map(item => item.section))].sort(), [masteredItems]);

    const filteredItems = masteredItems.filter(item => {
        if (searchTerm) {
            const lowerTerm = searchTerm.toLowerCase();
            const matchesTerm = item.content.toLowerCase().includes(lowerTerm) ||
                item.section.toLowerCase().includes(lowerTerm);
            if (!matchesTerm) return false;
        }
        if (selectedSection && item.section !== selectedSection) {
            return false;
        }
        return true;
    });

    const toggleExpand = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    const handleDelist = (e, item) => {
        e.stopPropagation();
        if (window.confirm(`Are you sure you want to un-master "${item.content}"?`)) {
            const newProgress = updateItemProgress(item.content, false);
            onUpdateProgress(newProgress);
        }
    };

    const handleSectionClick = (section) => {
        setSelectedSection(selectedSection === section ? null : section);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="container"
            style={{ paddingBottom: '3rem' }}
        >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '3rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <button className="btn btn-secondary" onClick={onExit}>&larr; Back</button>
                    <div>
                        <h1 style={{ margin: 0, fontSize: '2.5rem', color: 'white' }}>Mastered Cards</h1>
                        <p style={{ color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>Review and manage your accomplishments</p>
                    </div>
                </div>
                <div style={{
                    background: 'var(--primary-color)',
                    color: 'white',
                    padding: '8px 20px',
                    borderRadius: '20px',
                    fontWeight: '800',
                    boxShadow: '0 0 20px var(--primary-glow)'
                }}>
                    {masteredItems.length} Total
                </div>
            </div>

            {/* Controls */}
            <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ position: 'relative' }}>
                    <FaSearch style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                    <input
                        type="text"
                        placeholder="Search mastered services..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '1rem 1rem 1rem 3.5rem',
                            borderRadius: '16px',
                            border: '1px solid rgba(255,255,255,0.05)',
                            background: 'rgba(255, 255, 255, 0.03)',
                            color: 'var(--text-main)',
                            fontSize: '1rem',
                            outline: 'none',
                            boxSizing: 'border-box',
                            transition: 'all 0.3s'
                        }}
                        onFocus={(e) => e.target.style.borderColor = 'var(--primary-color)'}
                        onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.05)'}
                    />
                </div>

                {sections.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                        {sections.map(section => {
                            const theme = getSectionTheme(section);
                            const isSelected = selectedSection === section;

                            return (
                                <motion.button
                                    key={section}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleSectionClick(section)}
                                    style={{
                                        background: isSelected ? theme.color : 'rgba(255, 255, 255, 0.03)',
                                        color: isSelected ? '#fff' : 'var(--text-secondary)',
                                        border: `1px solid ${isSelected ? theme.color : 'rgba(255,255,255,0.05)'}`,
                                        padding: '6px 16px',
                                        borderRadius: '20px',
                                        cursor: 'pointer',
                                        fontSize: '0.85rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        transition: 'all 0.3s',
                                        fontWeight: isSelected ? '700' : '400',
                                        boxShadow: isSelected ? `0 0 15px ${theme.color}40` : 'none'
                                    }}
                                >
                                    <theme.icon size={12} />
                                    {section}
                                </motion.button>
                            )
                        })}
                    </div>
                )}
            </div>

            {masteredItems.length === 0 ? (
                <div className="glass-panel" style={{ textAlign: 'center', padding: '5rem 2rem' }}>
                    <div style={{ fontSize: '4rem', marginBottom: '1.5rem', opacity: 0.3 }}>🏔️</div>
                    <h3 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '0.5rem' }}>No cards mastered yet</h3>
                    <p style={{ color: 'var(--text-secondary)' }}>The peak is waiting. Start your study session to see your progress here.</p>
                    <button className="btn btn-primary" onClick={onExit} style={{ marginTop: '2rem' }}>Start Studying</button>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <AnimatePresence mode='popLayout'>
                        {filteredItems.map((item) => {
                            const theme = getSectionTheme(item.section);
                            const isExpanded = expandedId === item.id;

                            return (
                                <motion.div
                                    key={item.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="glass-panel"
                                    style={{
                                        padding: '0',
                                        overflow: 'hidden',
                                        borderLeft: `4px solid ${isExpanded ? theme.color : 'transparent'}`,
                                        borderColor: isExpanded ? theme.color : 'rgba(255,255,255,0.05)'
                                    }}
                                >
                                    <div
                                        onClick={() => toggleExpand(item.id)}
                                        style={{
                                            padding: '1.2rem 1.5rem',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            background: isExpanded ? 'rgba(255,255,255,0.03)' : 'transparent',
                                            transition: 'background 0.3s'
                                        }}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', flex: 1 }}>
                                            <div style={{
                                                color: theme.color,
                                                background: `${theme.color}15`,
                                                width: '40px',
                                                height: '40px',
                                                borderRadius: '12px',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                border: `1px solid ${theme.color}30`
                                            }}>
                                                <theme.icon size={18} />
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <div style={{ fontSize: '0.75rem', color: theme.color, fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>{item.section}</div>
                                                <div style={{ fontSize: '1.1rem', fontWeight: '600', color: 'white' }}>{item.content}</div>
                                            </div>
                                        </div>

                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                            <motion.button
                                                whileHover={{ scale: 1.2, color: 'var(--error-color)' }}
                                                className="btn"
                                                title="Un-master"
                                                onClick={(e) => handleDelist(e, item)}
                                                style={{
                                                    background: 'transparent',
                                                    padding: '8px',
                                                    color: 'var(--text-secondary)',
                                                    border: 'none',
                                                    boxShadow: 'none'
                                                }}
                                            >
                                                <FaTrash size={16} />
                                            </motion.button>

                                            <div style={{ color: 'rgba(255,255,255,0.2)' }}>
                                                {isExpanded ? <FaChevronUp size={16} /> : <FaChevronDown size={16} />}
                                            </div>
                                        </div>
                                    </div>

                                    <AnimatePresence>
                                        {isExpanded && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                            >
                                                <div style={{ padding: '0 1.5rem 1.5rem 4.7rem' }}>
                                                    <div style={{
                                                        padding: '1.5rem',
                                                        background: 'rgba(255,255,255,0.02)',
                                                        borderRadius: '12px',
                                                        lineHeight: '1.7',
                                                        color: '#cbd5e1',
                                                        fontSize: '1rem',
                                                        border: '1px solid rgba(255,255,255,0.05)'
                                                    }}>
                                                        {item.details}
                                                        {item.link && (
                                                            <div style={{ marginTop: '1.5rem' }}>
                                                                <a
                                                                    href={item.link}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="btn btn-secondary"
                                                                    style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }}
                                                                    onClick={(e) => e.stopPropagation()}
                                                                >
                                                                    <FaExternalLinkAlt size={10} /> Reference Documentation
                                                                </a>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '4rem' }}>
                <LanguageToggle onToggle={onToggleLanguage} />
            </div>
        </motion.div>
    );
};


export default MasteredList;
