import React, { useMemo } from 'react';
import { getSectionTheme } from '../utils/theme';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import LanguageToggle from './LanguageToggle';

const Dashboard = ({ data, progress, onSelectSection, onStudyRandom, onViewMastered, onToggleLanguage }) => {
    const { t } = useTranslation();

    const stats = useMemo(() => {
        const total = data.length;
        const mastered = data.filter(item => progress[item.content]?.mastered).length;

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

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <motion.div
            className="container"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{ position: 'relative' }}
        >
            <div style={{ position: 'absolute', top: -10, right: 0, zIndex: 10 }}>
                <LanguageToggle onToggle={onToggleLanguage} />
            </div>

            <header className="header" style={{ marginTop: '3rem' }}>
                <motion.h1
                    variants={itemVariants}
                    style={{
                        fontSize: '3.5rem',
                        marginBottom: '0.5rem',
                        color: 'white'
                    }}
                >
                    {t('dashboard_title')}
                </motion.h1>
                <motion.p variants={itemVariants} style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
                    {t('dashboard_subtitle')}
                </motion.p>

                <motion.div
                    variants={itemVariants}
                    style={{
                        margin: '0 auto 3rem',
                        position: 'relative',
                        width: '180px',
                        height: '180px',
                        padding: '10px',
                        background: 'rgba(255,255,255,0.03)',
                        borderRadius: '50%',
                        border: '1px solid rgba(255,255,255,0.05)',
                        boxShadow: '0 0 40px rgba(0,0,0,0.2)'
                    }}
                >
                    <svg viewBox="0 0 36 36" style={{ transform: 'rotate(-90deg)', width: '100%', height: '100%' }}>
                        <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="rgba(255,255,255,0.05)"
                            strokeWidth="3"
                        />
                        <motion.path
                            initial={{ strokeDasharray: "0, 100" }}
                            animate={{ strokeDasharray: `${percentage}, 100` }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="var(--primary-color)"
                            strokeWidth="3"
                            strokeLinecap="round"
                        />
                    </svg>
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                        <div style={{ fontSize: '2.5rem', fontWeight: '800', color: 'white' }}>{percentage}%</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '2px' }}>
                            {t('mastered')}
                        </div>
                        <div style={{ fontSize: '0.85rem', color: 'white', opacity: 0.8, fontWeight: '700' }}>
                            {stats.mastered} <span style={{ opacity: 0.5, fontWeight: '400' }}>/</span> {stats.total}
                        </div>
                    </div>
                </motion.div>

                <motion.div variants={itemVariants} style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
                    <button className="btn btn-primary" onClick={onStudyRandom}>
                        {t('start_random')}
                    </button>
                    <button className="btn btn-secondary" onClick={onViewMastered}>
                        {t('view_mastered')}
                    </button>
                </motion.div>
            </header>

            <motion.h2 variants={itemVariants} style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>{t('study_by_section')}</motion.h2>
            <div className="card-grid">
                {stats.sections.map((section) => {
                    const { color, icon: Icon } = getSectionTheme(section.name);
                    const secPercentage = Math.round((section.mastered / section.total) * 100);

                    return (
                        <motion.div
                            key={section.name}
                            variants={itemVariants}
                            className="glass-panel"
                            whileHover={{ scale: 1.02, y: -5 }}
                            onClick={() => onSelectSection(section.name)}
                            style={{
                                cursor: 'pointer',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                minHeight: '120px',
                                padding: '1.5rem',
                                border: `1px solid ${color}40`,
                                borderLeft: `4px solid ${color}`
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1.5rem' }}>
                                <div style={{
                                    color: color,
                                    background: `${color}15`,
                                    padding: '12px',
                                    borderRadius: '16px',
                                    display: 'flex',
                                    border: `1px solid ${color}30`
                                }}>
                                    <Icon size={24} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <h3 style={{ margin: '0 0 4px 0', fontSize: '1.1rem', color: 'white' }}>{section.name}</h3>
                                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                        {t('mastered_count', { count: section.mastered, total: section.total })}
                                    </span>
                                </div>
                                <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: color }}>
                                    {secPercentage}%
                                </div>
                            </div>

                            <div style={{ height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', overflow: 'hidden' }}>
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${secPercentage}%` }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                    style={{
                                        height: '100%',
                                        background: color
                                    }}
                                />
                            </div>
                        </motion.div>
                    );
                })}
            </div>

        </motion.div>
    );
};


export default Dashboard;
