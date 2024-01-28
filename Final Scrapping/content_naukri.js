chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "scrapeJobDetails") {
      chrome.runtime.sendMessage({ action: 'scrapeJobDetails', website: 'naukri.com' });
    }
  });