import { supportFaqItems, supportInquiryTemplates, supportNoticeItems } from '../../mocks/supportMockData';

function fetchSupportNotices() {
  return supportNoticeItems;
}

function fetchSupportFaqs() {
  return supportFaqItems;
}

function fetchSupportInquiryTemplates() {
  return supportInquiryTemplates;
}

export const supportService = {
  fetchSupportNotices,
  fetchSupportFaqs,
  fetchSupportInquiryTemplates,
};
