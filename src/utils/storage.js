export const STORAGE_KEY = 'aws-practitioner-progress';

export const getProgress = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch (e) {
    console.error('Error loading progress', e);
    return {};
  }
};

export const saveProgress = (progress) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Error saving progress', e);
  }
};

export const updateItemProgress = (itemName, isCorrect, isInstant = false) => {
  const progress = getProgress();
  const current = progress[itemName] || { correctCount: 0, mastered: false, encounters: 0 };

  current.encounters += 1;

  if (isInstant) {
    current.correctCount = 3;
    current.mastered = true;
  } else if (isCorrect) {
    current.correctCount += 1;
    if (current.correctCount >= 3) {
      current.mastered = true;
    }
  } else {
    // Demote immediately on failure as requested
    current.correctCount = 0;
    current.mastered = false;
  }

  progress[itemName] = current;
  saveProgress(progress);
  return progress;
};
