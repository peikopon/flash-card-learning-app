import {
    FaChartBar, FaServer, FaDatabase, FaNetworkWired, FaLock,
    FaBrain, FaTasks, FaCloud, FaMoneyBillWave, FaTools,
    FaUserFriends, FaDesktop, FaMobileAlt, FaWifi, FaGlobe, FaBriefcase
} from 'react-icons/fa';

export const getSectionTheme = (sectionName) => {
    const normalized = sectionName?.toLowerCase() || '';

    if (normalized.includes('application integration')) return { color: '#db2777', icon: FaNetworkWired }; // Pink-700
    if (normalized.includes('business')) return { color: '#ca8a04', icon: FaBriefcase }; // Yellow-700
    if (normalized.includes('analytics')) return { color: '#3b82f6', icon: FaChartBar }; // Blue
    if (normalized.includes('compute')) return { color: '#f97316', icon: FaServer }; // Orange
    if (normalized.includes('storage')) return { color: '#10b981', icon: FaDatabase }; // Green
    if (normalized.includes('database')) return { color: '#8b5cf6', icon: FaDatabase }; // Purple
    if (normalized.includes('network')) return { color: '#ec4899', icon: FaNetworkWired }; // Pink
    if (normalized.includes('security')) return { color: '#ef4444', icon: FaLock }; // Red
    if (normalized.includes('machine learning')) return { color: '#06b6d4', icon: FaBrain }; // Cyan
    if (normalized.includes('management')) return { color: '#eab308', icon: FaTasks }; // Yellow
    if (normalized.includes('cloud financial')) return { color: '#84cc16', icon: FaMoneyBillWave }; // Lime
    if (normalized.includes('developer')) return { color: '#6366f1', icon: FaTools }; // Indigo
    if (normalized.includes('customer')) return { color: '#f43f5e', icon: FaUserFriends }; // Rose
    if (normalized.includes('end-user')) return { color: '#d946ef', icon: FaDesktop }; // Fuchsia
    if (normalized.includes('frontend')) return { color: '#0ea5e9', icon: FaMobileAlt }; // Sky
    if (normalized.includes('iot')) return { color: '#14b8a6', icon: FaWifi }; // Teal
    if (normalized.includes('global')) return { color: '#64748b', icon: FaGlobe }; // Slate
    if (normalized.includes('migration')) return { color: '#8b5cf6', icon: FaCloud }; // Violet

    return { color: '#94a3b8', icon: FaCloud }; // Default Slate
};
