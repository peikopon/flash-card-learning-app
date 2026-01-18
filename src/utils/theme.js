import {
    FaChartBar, FaServer, FaDatabase, FaNetworkWired, FaLock,
    FaBrain, FaTasks, FaCloud, FaMoneyBillWave, FaTools,
    FaUserFriends, FaDesktop, FaMobileAlt, FaWifi, FaGlobe, FaBriefcase
} from 'react-icons/fa';

export const getSectionTheme = (sectionName) => {
    const normalized = sectionName?.toLowerCase() || '';

    if (normalized.includes('application integration') || normalized.includes('アプリケーション統合')) return { color: '#db2777', icon: FaNetworkWired };
    if (normalized.includes('business') || normalized.includes('ビジネス')) return { color: '#ca8a04', icon: FaBriefcase };
    if (normalized.includes('analytics') || normalized.includes('アナリティクス')) return { color: '#3b82f6', icon: FaChartBar };
    if (normalized.includes('compute') || normalized.includes('コンピュート') || normalized.includes('コンピューティング')) return { color: '#f97316', icon: FaServer };
    if (normalized.includes('storage') || normalized.includes('ストレージ')) return { color: '#10b981', icon: FaDatabase };
    if (normalized.includes('database') || normalized.includes('データベース')) return { color: '#8b5cf6', icon: FaDatabase };
    if (normalized.includes('network') || normalized.includes('ネットワーキング')) return { color: '#ec4899', icon: FaNetworkWired };
    if (normalized.includes('security') || normalized.includes('セキュリティ')) return { color: '#ef4444', icon: FaLock };
    if (normalized.includes('machine learning') || normalized.includes('機械学習')) return { color: '#06b6d4', icon: FaBrain };
    if (normalized.includes('management') || normalized.includes('マネジメント') || normalized.includes('管理')) return { color: '#eab308', icon: FaTasks };
    if (normalized.includes('cloud financial') || normalized.includes('財務管理')) return { color: '#84cc16', icon: FaMoneyBillWave };
    if (normalized.includes('developer') || normalized.includes('開発者')) return { color: '#6366f1', icon: FaTools };
    if (normalized.includes('customer') || normalized.includes('顧客')) return { color: '#f43f5e', icon: FaUserFriends };
    if (normalized.includes('end-user') || normalized.includes('エンドユーザー')) return { color: '#d946ef', icon: FaDesktop };
    if (normalized.includes('frontend') || normalized.includes('フロントエンド')) return { color: '#0ea5e9', icon: FaMobileAlt };
    if (normalized.includes('iot')) return { color: '#14b8a6', icon: FaWifi };
    if (normalized.includes('global') || normalized.includes('グローバル')) return { color: '#64748b', icon: FaGlobe };
    if (normalized.includes('migration') || normalized.includes('移行')) return { color: '#8b5cf6', icon: FaCloud };
    if (normalized.includes('purchasing') || normalized.includes('購入')) return { color: '#f59e0b', icon: FaMoneyBillWave };
    if (normalized.includes('well-architected') || normalized.includes('well-architected')) return { color: '#475569', icon: FaBrain };

    return { color: '#94a3b8', icon: FaCloud }; // Default Slate
};
