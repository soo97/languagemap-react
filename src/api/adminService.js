import {
  adminContentList,
  adminMemberList,
  adminMissionSeeds,
  adminNoticeList,
  adminPlaceSearchTypeOptions,
  adminPlaceSeeds,
  adminRegionOptions,
  adminScenarioCategoryOptions,
  adminScenarioLevelOptions,
  adminScenarioSeeds,
} from '../mocks/adminMockData';

function fetchAdminMembers() {
  return adminMemberList;
}

function fetchAdminNotices() {
  return adminNoticeList;
}

function fetchAdminContent() {
  return adminContentList;
}

function fetchAdminPlaces() {
  return adminPlaceSeeds;
}

function fetchAdminScenarios() {
  return adminScenarioSeeds;
}

function fetchAdminMissions() {
  return adminMissionSeeds;
}

function fetchAdminRegions() {
  return adminRegionOptions;
}

function fetchAdminPlaceSearchTypes() {
  return adminPlaceSearchTypeOptions;
}

function fetchAdminScenarioLevelOptions() {
  return adminScenarioLevelOptions;
}

function fetchAdminScenarioCategoryOptions() {
  return adminScenarioCategoryOptions;
}

export const adminService = {
  fetchAdminMembers,
  fetchAdminNotices,
  fetchAdminContent,
  fetchAdminPlaces,
  fetchAdminScenarios,
  fetchAdminMissions,
  fetchAdminRegions,
  fetchAdminPlaceSearchTypes,
  fetchAdminScenarioLevelOptions,
  fetchAdminScenarioCategoryOptions,
};
