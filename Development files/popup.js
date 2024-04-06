chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  var url = tabs[0].url;
  
  // // Example data
  // var companyName = 'Company XYZ';
  // var jobProfile = 'Software Engineer';
  // var dateOfApplication = '2024-03-25';
  
  // Encode data for URL query parameters
  var params = new URLSearchParams({
    company_name: companyName,
    job_profile: jobProfile,
    date_of_application: dateOfApplication
  });
  
  // Construct API URL with query parameters
  var apiUrl = 'https://xf3mnw4d-2000.inc1.devtunnels.ms/scrape?' + params.toString();
  
  // Send GET request with the API URL and include header
  sendData(url, apiUrl);
});

function sendData(url, apiUrl) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', apiUrl);
  
  // Include a header with the URL of the current page
  xhr.setRequestHeader('Current-Page-URL', url);
  
  xhr.onload = function() {
    if (xhr.status === 200) {
      console.log('Data sent successfully');
    } else {
      console.error('Failed to send data:', xhr.statusText);
    }
  };
  
  xhr.onerror = function() {
    console.error('Failed to send data');
  };
  
  xhr.send();
}
