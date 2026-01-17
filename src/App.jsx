import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import StudyMode from './components/StudyMode';
import MasteredList from './components/MasteredList';
import { loadCSV } from './utils/csv';
import { getProgress } from './utils/storage';

function App() {
  const [data, setData] = useState([]);
  const [progress, setProgress] = useState({});
  const [view, setView] = useState('dashboard'); // 'dashboard', 'study'
  const [studyItems, setStudyItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const csvData = await loadCSV();
      setData(csvData);

      const storedProgress = getProgress();
      setProgress(storedProgress);
      setLoading(false);
    };
    init();
  }, []);

  const handleUpdateProgress = (newProgress) => {
    setProgress(newProgress);
  };

  const startStudy = (sectionName = null) => {
    let items = [];
    if (sectionName) {
      items = data.filter(d => d.section === sectionName);
    } else {
      // Random study - maybe weighted towards non-mastered?
      // "should to learn randomly"
      items = data;
    }

    // Filter out mastered items? 
    // Requirement says: "We can should to learn by section or should to learn randomly... When card comes up ... it means we already master"
    // Usually people want to review mastered too occasionally, or just focus on new. 
    // Let's filter mastered out for standard study, but maybe allow review?
    // For now, I'll include everything but shuffle. 
    // Actually, if mastered, maybe skip? 
    // Let's prioritize: Non-mastered first.
    // If I sort by not-mastered, it might not be "random".
    // I will pick unmastered items first. If all mastered, show all.

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
        />
      )}

      {view === 'mastered' && (
        <MasteredList
          data={data}
          progress={progress}
          onUpdateProgress={handleUpdateProgress}
          onExit={() => setView('dashboard')}
        />
      )}

      {view === 'study' && (
        <StudyMode
          items={studyItems}
          progress={progress}
          onUpdateProgress={handleUpdateProgress}
          onExit={() => setView('dashboard')}
        />
      )}
    </div>
  );
}

export default App;
