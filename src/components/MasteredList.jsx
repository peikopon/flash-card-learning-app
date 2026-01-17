import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getSectionTheme } from '../utils/theme';
import { updateItemProgress } from '../utils/storage';
import { FaChevronDown, FaChevronUp, FaExternalLinkAlt, FaTrash, FaSearch } from 'react-icons/fa';

const MasteredList = ({ data, progress, onExit, onUpdateProgress }) => {
    // State for expanded rows
    const [expandedId, setExpandedId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSection, setSelectedSection] = useState(null);

    // Filter mastered items first
    const masteredItems = useMemo(() => data.filter(item => progress[item.content]?.mastered), [data, progress]);

    // Get unique sections from mastered items
    const sections = useMemo(() => [...new Set(masteredItems.map(item => item.section))].sort(), [masteredItems]);

    // Combined Filter
    const filteredItems = masteredItems.filter(item => {
        // 1. Text Search
        if (searchTerm) {
            const lowerTerm = searchTerm.toLowerCase();
            const matchesTerm = item.content.toLowerCase().includes(lowerTerm) ||
                item.section.toLowerCase().includes(lowerTerm);
            if (!matchesTerm) return false;
        }

        // 2. Section Filter
        if (selectedSection && item.section !== selectedSection) {
            return false;
        }

        return true;
    });

    const toggleExpand = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    const handleDelist = (e, item) => {
        e.stopPropagation(); // Prevent row expand
        if (window.confirm(`Are you sure you want to un-master "${item.content}"?`)) {
            const newProgress = updateItemProgress(item.content, false);
            onUpdateProgress(newProgress);
        }
    };

    const handleSectionClick = (section) => {
        if (selectedSection === section) {
            setSelectedSection(null); // Deselect
        } else {
            setSelectedSection(section);
        }
    };

    return (
        <div className="container animate-fade-in" style={{ paddingBottom: '3rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <button className="btn btn-secondary" onClick={onExit}>&larr; Back</button>
                    <h1 style={{ margin: 0, fontSize: '1.8rem' }}>Mastered Cards</h1>
                    <span style={{
                        background: 'var(--success-color)',
                        color: 'white',
                        padding: '2px 8px',
                        borderRadius: '12px',
                        fontSize: '0.8rem',
                        fontWeight: 'bold'
                    }}>
                        {masteredItems.length}
                    </span>
                </div>
            </div>

            {/* Search Bar */}
            <div style={{ marginBottom: '0.05rem', position: 'relative' }}>
                <FaSearch style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                <input
                    type="text"
                    placeholder="Filter by topic..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '1rem 1rem 1rem 3rem',
                        borderRadius: '12px',
                        border: '1px solid var(--surface-hover)',
                        background: 'rgba(30, 41, 59, 0.5)',
                        color: 'var(--text-main)',
                        fontSize: '1rem',
                        outline: 'none'
                    }}
                />
            </div>

            {/* Section Filter Tags */}
            {sections.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem', marginBottom: '1rem' }}>
                    {sections.map(section => {
                        const theme = getSectionTheme(section);
                        const isSelected = selectedSection === section;

                        return (
                            <button
                                key={section}
                                onClick={() => handleSectionClick(section)}
                                style={{
                                    background: isSelected ? theme.color : 'rgba(255, 255, 255, 0.05)',
                                    color: isSelected ? '#fff' : 'var(--text-main)',
                                    border: `1px solid ${isSelected ? theme.color : 'rgba(255,255,255,0.1)'}`,
                                    padding: '6px 12px',
                                    borderRadius: '20px',
                                    cursor: 'pointer',
                                    fontSize: '0.9rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    transition: 'all 0.2s',
                                    boxShadow: isSelected ? `0 4px 12px ${theme.color}40` : 'none'
                                }}
                                className="hover:scale-105" // Tailwind utility for scale if available, otherwise transition handles basics
                            >
                                <theme.icon size={14} />
                                {section}
                                {isSelected && <span style={{ fontSize: '0.8em', marginLeft: '4px' }}>×</span>}
                            </button>
                        )
                    })}
                </div>
            )}

            {masteredItems.length === 0 ? (
                <div className="glass-panel" style={{ textAlign: 'center', padding: '4rem' }}>
                    <h3 style={{ color: 'var(--text-secondary)' }}>No cards mastered yet.</h3>
                    <p>Keep studying to fill this list!</p>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    {filteredItems.length === 0 && (
                        <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                            No matches found.
                        </div>
                    )}

                    {filteredItems.map((item) => {
                        const theme = getSectionTheme(item.section);
                        const isExpanded = expandedId === item.id;

                        return (
                            <motion.div
                                key={item.id}
                                layout
                                className="glass-panel"
                                style={{ padding: '0', overflow: 'hidden', borderLeft: `4px solid ${theme.color}` }}
                            >
                                <div
                                    onClick={() => toggleExpand(item.id)}
                                    style={{
                                        padding: '0.8rem 1.2rem',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        background: isExpanded ? 'rgba(255,255,255,0.03)' : 'transparent'
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
                                        <div style={{
                                            color: theme.color,
                                            background: `${theme.color}20`,
                                            padding: '6px',
                                            borderRadius: '50%',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                                        }}>
                                            <theme.icon size={14} />
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontSize: '0.75rem', color: theme.color, fontWeight: 'bold' }}>{item.section}</div>
                                            <div style={{ fontSize: '1rem', fontWeight: '500' }}>{item.content}</div>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <button
                                            className="btn"
                                            title="Un-master (Remove from list)"
                                            onClick={(e) => handleDelist(e, item)}
                                            style={{
                                                background: 'transparent',
                                                padding: '8px',
                                                color: 'var(--text-secondary)',
                                                border: '1px solid transparent'
                                            }}
                                        >
                                            <FaTrash size={14} className="hover:text-red-500" />
                                        </button>

                                        <div style={{ color: 'var(--text-secondary)' }}>
                                            {isExpanded ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}
                                        </div>
                                    </div>
                                </div>

                                <AnimatePresence>
                                    {isExpanded && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            style={{ overflow: 'hidden' }}
                                        >
                                            <div style={{ padding: '0 1.5rem 1.5rem 1.5rem', borderTop: '1px solid var(--surface-hover)' }}>
                                                <div style={{ marginTop: '1rem', lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                                                    {item.details}
                                                </div>
                                                {item.link && (
                                                    <a
                                                        href={item.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="btn btn-secondary"
                                                        style={{ marginTop: '1rem', fontSize: '0.9rem' }}
                                                    >
                                                        <FaExternalLinkAlt size={12} /> View Docs
                                                    </a>
                                                )}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default MasteredList;
