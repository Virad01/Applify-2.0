document.addEventListener("DOMContentLoaded", () => {
  // Select the "Summary and Insights" button
  const summaryBtn = document.querySelector("#summary-btn");

  // Attach a click event listener to the "Summary and Insights" button
  summaryBtn.addEventListener("click", async () => {
    try {
      // Send a GET request to the "summary.html" page
      const response = await fetch("summary.html");

      // Parse the HTML content of the "summary.html" page
      const html = await response.text();

      // Select the "content" div where the content will be inserted
      const contentDiv = document.querySelector("#content");

      // Remove the existing content of the "content" div
      contentDiv.innerHTML = "";

      // Insert the HTML content of the "summary.html" page into the "content" div
      contentDiv.innerHTML = html;

      // Scroll to the top of the page
      window.scrollTo(0, 0);

      // Prevent the default link behavior
      return false;
    } catch (error) {
      console.error(error);
      return true;
    }
  });

  // Listen for the 'load' event on the window
  window.addEventListener("load", () => {
    // Initialize the chart after the page and its resources are fully loaded
    initializeChart();
  });

  // Select the "Export" button
  const exportBtns = document.querySelectorAll("nav a:last-child");

  // Attach a click event listener to the "Export" button
  exportBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      exportData();
    });
  });

  // Select the "Import" button
  const importBtn = document.querySelector("#import-btn");

  // Attach a click event listener to the "Import" button
  importBtn.addEventListener("click", () => {
    importData();
  });

  // Select the "Terms of Use" button
  const TermsBtn = document.querySelector("#terms-btn");

  // Attach a click event listener to the "Import" button
  importBtn.addEventListener("click", () => {
    showTermsOfUse();
  });
});

function initializeChart() {
  var xValues = ["Applcation Filled", "Resume Shorlisted", "OA Cleared", "Shortlisted for HR round"];
  var yValues = [123, 55, 40, 28];
  var barColors = [
    'rgb(255, 99, 132)',
    'rgb(54, 162, 235)',
    'rgb(255, 205, 86)',
    'rgb(75, 192, 192)'
  ];

  new Chart("myChart", {
    type: "doughnut",
    data: {
      labels: xValues,
      datasets: [{
        backgroundColor: barColors,
        data: yValues
      }]
    },
    options: {
      title: {
        display: true,
        text: "Insights of my application"
      }
    }
  });
}



function exportData() {
  // Replace this with your logic to fetch and update table data
  const jsonData = [
    { sno: 1, companyName: 'XYZ Corp', jobProfile: 'Data Analyst', appliedOn: '2024-02-01', applicationURL: 'https://xyzcorp.com', status: 'Pending', contactInfo: 'Jane Smith - jane@xyzcorp.com' },
    // Add more rows as needed
  ];

  function importData() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = function(e) {
        const csvContent = e.target.result;
        const jsonData = convertCsvToJson(csvContent);

        // Store the JSON data in chrome.storage.sync
        chrome.storage.sync.set({ 'myApplications': jsonData }, function() {
          console.log('Data saved to chrome.storage.sync');
        });

        // Display the data in the table
        updateTableContent(jsonData);
      };

      reader.readAsText(file);
    }
  }

  // Convert JSON to CSV
  const csvContent = "data:text/csv;charset=utf-8," +
    jsonData.map(entry => Object.values(entry).join(",")).join("\n");

  // Create a download link
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "my_applications.csv");
  document.body.appendChild(link);

  // Trigger the download
  link.click();

  // Remove the link from the DOM
  document.body.removeChild(link);
}

function showTermsOfUse(){
  // Show the terms and conditions inside the tableContainer
  document.getElementById('tableContainer').innerHTML = `
    <h2>Terms and Conditions</h2>
    <p>This is a sample text. Replace it with your actual terms and conditions content.</p>
    <p>More terms and conditions...</p>
    
  `;
}