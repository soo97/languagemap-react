import { adminContentList, adminMemberList, adminNoticeList } from '../../mocks/adminMockData';

function fetchAdminMembers() {
  return adminMemberList;
}

function fetchAdminNotices() {
  return adminNoticeList;
}

function fetchAdminContent() {
  return adminContentList;
}

export const adminService = {
  fetchAdminMembers,
  fetchAdminNotices,
  fetchAdminContent,
};
