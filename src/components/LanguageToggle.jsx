import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaGlobe } from 'react-icons/fa';

const LanguageToggle = ({ onToggle }) => {
    const { i18n } = useTranslation();

    return (
        <motion.button
            whileHover={{ scale: 1.05, background: 'rgba(255,255,255,0.1)' }}
            whileTap={{ scale: 0.95 }}
            onClick={onToggle}
            style={{
                background: 'rgba(255, 255, 255, 0.05)',
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '50px',
                padding: '8px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                cursor: 'pointer',
                backdropFilter: 'blur(12px)',
                fontSize: '0.85rem',
                fontWeight: '600',
                whiteSpace: 'nowrap',
                boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                transition: 'border-color 0.3s'
            }}
        >
            <FaGlobe style={{ color: 'var(--primary-color)' }} />
            <span>{i18n.language === 'en' ? '日本語' : 'English'}</span>
        </motion.button>
    );
};


export default LanguageToggle;
