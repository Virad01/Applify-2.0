// popup.js

document.getElementById('scrapeButton').addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'scrapeJobDetails' }, (response) => {
      if (response) {
        if (response.website === 'indeed.com' || response.website === 'naukri.com') {
          document.getElementById('jobDetails').innerText = `Job Title: ${response.jobTitle}\nCompany: ${response.companyName}\nWebsite: ${response.website}`;
        } else {
          document.getElementById('jobDetails').innerText = 'Error retrieving job details.';
        }
      } else {
        document.getElementById('jobDetails').innerText = 'Error retrieving job details.';
      }
    });
  });
  