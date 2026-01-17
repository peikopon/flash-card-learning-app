import React, { useMemo } from 'react';
import { getSectionTheme } from '../utils/theme';
import { motion } from 'framer-motion';

const Dashboard = ({ data, progress, onSelectSection, onStudyRandom, onViewMastered }) => {

    const stats = useMemo(() => {
        const total = data.length;
        const mastered = data.filter(item => progress[item.content]?.mastered).length;

        // Group by section
        const sections = {};
        data.forEach(item => {
            if (!sections[item.section]) {
                sections[item.section] = { name: item.section, total: 0, mastered: 0 };
            }
            sections[item.section].total += 1;
            if (progress[item.content]?.mastered) {
                sections[item.section].mastered += 1;
            }
        });

        return { total, mastered, sections: Object.values(sections) };
    }, [data, progress]);

    const percentage = stats.total > 0 ? Math.round((stats.mastered / stats.total) * 100) : 0;

    return (
        <div className="container animate-fade-in">
            <header className="header" style={{ marginTop: '2rem' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>AWS Cloud Practitioner Prep</h1>
                <p style={{ color: 'var(--text-secondary)' }}>Master the cloud concepts</p>

                <div style={{ margin: '2rem auto', position: 'relative', width: '120px', height: '120px' }}>
                    <svg viewBox="0 0 36 36" style={{ transform: 'rotate(-90deg)', width: '100%', height: '100%' }}>
                        <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#1e293b"
                            strokeWidth="4"
                        />
                        <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="var(--primary-color)"
                            strokeWidth="4"
                            strokeDasharray={`${percentage}, 100`}
                        />
                    </svg>
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{percentage}%</div>
                        <div style={{ fontSize: '0.6rem', color: 'var(--text-secondary)' }}>{stats.mastered} / {stats.total}</div>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <button className="btn btn-primary" onClick={onStudyRandom} style={{ padding: '0.8rem 1.5rem', fontSize: '1rem' }}>
                        Start Random Session
                    </button>
                    <button className="btn btn-secondary" onClick={onViewMastered} style={{ padding: '0.8rem 1.5rem', fontSize: '1rem' }}>
                        View Mastered
                    </button>
                </div>
            </header>

            <h2 style={{ marginBottom: '1rem' }}>Study by Section</h2>
            <div className="card-grid">
                {stats.sections.map((section) => {
                    const { color, icon: Icon } = getSectionTheme(section.name);
                    const secPercentage = Math.round((section.mastered / section.total) * 100);

                    return (
                        <motion.div
                            key={section.name}
                            className="glass-panel"
                            whileHover={{ scale: 1.02, y: -5 }}
                            onClick={() => onSelectSection(section.name)}
                            style={{
                                cursor: 'pointer',
                                borderLeft: `4px solid ${color}`,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                minHeight: '80px',
                                padding: '1rem' // Override default padding for compactness
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.8rem' }}>
                                <div style={{
                                    color: color,
                                    background: `${color}20`,
                                    padding: '8px',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    flexShrink: 0
                                }}>
                                    <Icon size={20} />
                                </div>
                                <div>
                                    <h3 style={{ margin: 0, fontSize: '0.95rem', lineHeight: '1.3' }}>{section.name}</h3>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block' }}>
                                        {section.mastered} / {section.total} mastered
                                    </span>
                                </div>
                            </div>

                            <div style={{ height: '4px', background: 'var(--surface-color)', borderRadius: '2px', overflow: 'hidden', marginTop: 'auto' }}>
                                <div style={{
                                    height: '100%',
                                    width: `${secPercentage}%`,
                                    background: color,
                                    transition: 'width 0.5s ease-out'
                                }} />
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};

export default Dashboard;
