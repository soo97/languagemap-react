import {
  badgeCatalog,
  growthHighlights,
  learningActivities,
  learningChecklist,
  learningGoalSuggestions,
  learningLevelOptions,
  learningSummary,
} from '../mocks/learningMockData';

function fetchLearningSummary() {
  return learningSummary;
}

function fetchGrowthHighlights() {
  return growthHighlights;
}

function fetchLearningChecklist() {
  return learningChecklist;
}

function fetchLearningActivities() {
  return learningActivities;
}

function fetchBadgeCatalog() {
  return badgeCatalog;
}

function fetchLearningLevelOptions() {
  return learningLevelOptions;
}

function fetchLearningGoalSuggestions() {
  return learningGoalSuggestions;
}

export const learningService = {
  fetchLearningSummary,
  fetchGrowthHighlights,
  fetchLearningChecklist,
  fetchLearningActivities,
  fetchBadgeCatalog,
  fetchLearningLevelOptions,
  fetchLearningGoalSuggestions,
};
