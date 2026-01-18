import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './i18n'; // Init i18n
import Dashboard from './components/Dashboard';
import StudyMode from './components/StudyMode';
import MasteredList from './components/MasteredList';
import LanguageToggle from './components/LanguageToggle';
import { loadCSV } from './utils/csv';
import { getProgress } from './utils/storage';
import { FaGlobe } from 'react-icons/fa';

function App() {
  const { t, i18n } = useTranslation();
  const [data, setData] = useState([]);
  const [progress, setProgress] = useState({});
  const [view, setView] = useState('dashboard'); // 'dashboard', 'study', 'mastered'
  const [studyItems, setStudyItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Initial Load
  useEffect(() => {
    const init = async () => {
      // Load data based on current language
      const csvData = await loadCSV(i18n.language);
      setData(csvData);

      // If we are currently studying, we need to translate the active items
      // to match the new language data.
      if (studyItems.length > 0) {
        const newStudyItems = studyItems.map(item => {
          // Find the same item in the new dataset
          const newItem = csvData.find(d => d.id === item.id);
          // Fallback to old item if not found (shouldn't happen if IDs match)
          return newItem || item;
        });
        setStudyItems(newStudyItems);
      }

      const storedProgress = getProgress();
      setProgress(storedProgress);
      setLoading(false);
    };
    init();
  }, [i18n.language]); // Reload when language changes

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ja' : 'en';
    i18n.changeLanguage(newLang);
    // Don't set loading(true) here to avoid unmounting components
  };

  const handleUpdateProgress = (newProgress) => {
    setProgress(newProgress);
  };

  const startStudy = (sectionName = null) => {
    let items = [];
    if (sectionName) {
      items = data.filter(d => d.section === sectionName);
    } else {
      items = data;
    }

    const unmastered = items.filter(item => !progress[item.content]?.mastered);
    const toStudy = unmastered.length > 0 ? unmastered : items;

    setStudyItems(toStudy);
    setView('study');
  };

  if (loading) {
    return <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>Loading...</div>;
  }

  return (
    <div>
      {view === 'dashboard' && (
        <Dashboard
          data={data}
          progress={progress}
          onSelectSection={(section) => startStudy(section)}
          onStudyRandom={() => startStudy(null)}
          onViewMastered={() => setView('mastered')}
          onToggleLanguage={toggleLanguage}
        />
      )}

      {view === 'mastered' && (
        <MasteredList
          data={data}
          progress={progress}
          onUpdateProgress={handleUpdateProgress}
          onExit={() => setView('dashboard')}
          onToggleLanguage={toggleLanguage}
        />
      )}

      {view === 'study' && (
        <StudyMode
          items={studyItems}
          progress={progress}
          onUpdateProgress={handleUpdateProgress}
          onExit={() => setView('dashboard')}
          onToggleLanguage={toggleLanguage}
        />
      )}
    </div>
  );
}

export default App;
