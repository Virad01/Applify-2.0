var email
chrome.identity.getProfileUserInfo({'accountStatus': 'ANY'}, function(info) {
  email = info.email;
  console.log(typeof(email));
});

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("sendButton").addEventListener("click", async function() {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      const tabUrl = { link: tab.url, uid:email};
      const data = await fetchData(tabUrl);
      console.log(data);
    });
  });
  
  async function fetchData(tabUrl) {
    try {
      const response = await fetch("https://xf3mnw4d-2000.inc1.devtunnels.ms/scrape", {
        method: "POST",
        headers: {
          "Content-Type": "application/json" 
        },
        body: JSON.stringify(tabUrl)
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
  
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  }
  
  
  