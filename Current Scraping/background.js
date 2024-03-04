chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "scrapeJobDetails") {
      const tabUrl = sender.tab.url;
      
      if (tabUrl.includes("indeed.com")) {
        fetch('http://localhost:5000/scrape', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ website: 'indeed.com' }),
        })
        .then(response => response.json())
        .then(data => sendResponse(data))
        .catch(error => sendResponse({ error: 'Error scraping Indeed data' }));
      } else if (tabUrl.includes("naukri.com")) {
        fetch('http://localhost:5000/scrape', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ website: 'naukri.com' }),
        })
        .then(response => response.json())
        .then(data => sendResponse(data))
        .catch(error => sendResponse({ error: 'Error scraping Naukri data' }));
      } else {
        sendResponse({ error: 'Unsupported website' });
      }
  
      return true;
    }
  });
  