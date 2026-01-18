import React from 'react';
import { FaGlobe } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const LanguageToggle = ({ onToggle }) => {
    const { i18n } = useTranslation();

    return (
        <button
            onClick={onToggle}
            style={{
                background: 'rgba(60, 60, 60, 0.8)',
                color: 'white',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '20px',
                padding: '8px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                backdropFilter: 'blur(5px)',
                fontSize: '0.9rem',
                whiteSpace: 'nowrap'
            }}
            className="hover:bg-white/10"
        >
            <FaGlobe />
            {i18n.language === 'en' ? '日本語' : 'English'}
        </button>
    );
};

export default LanguageToggle;
