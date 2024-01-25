

// Function to fetch and process JSON data from scraping
function fetchData() {
  // Replace the following line with your scraping logic
  const scrapedData = [
    {
      "sno": 1,
      "companyName": "ABC Inc",
      "jobProfile": "Software Engineer",
      "appliedOn": "2024-01-25",
      "applicationURL": "https://example.com",
      "status": "Applied",
      "contactInfo": "John Doe - john@example.com"
    },
    // ... other entries
  ];

  // Save the scraped data to Chrome storage
  chrome.storage.sync.set({ 'jobApplications': scrapedData }, function () {
    console.log('Scraped data saved to Chrome storage:', scrapedData);
  });
}

// Function to update the HTML page with the stored data
function updatePageWithData() {
  chrome.storage.sync.get('jobApplications', function (result) {
    const data = result.jobApplications || [];

    // Get the table body
    const tableBody = document.querySelector('#dataTable tbody');

    // Clear existing rows
    tableBody.innerHTML = '';

    // Iterate through the data and add rows to the table
    data.forEach(entry => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${entry.sno}</td>
        <td>${entry.companyName}</td>
        <td>${entry.jobProfile}</td>
        <td>${entry.appliedOn}</td>
        <td>${entry.applicationURL}</td>
        <td>${entry.status}</td>
        <td>${entry.contactInfo}</td>
      `;
      tableBody.appendChild(row);
    });
  });
}

// Call fetchData when the extension is loaded or at a specific trigger point
fetchData();

// Set up a listener for changes in Chrome storage
chrome.storage.onChanged.addListener(function (changes, namespace) {
  if ('jobApplications' in changes) {
    // Update the HTML page when the storage changes
    updatePageWithData();
  }
});
