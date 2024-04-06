document.addEventListener('DOMContentLoaded', function () {
  const toggleSwitch = document.getElementById('toggleSwitch');
  const exitButton = document.getElementById('exitButton');
  const redirectButton = document.getElementById('redirectButton');

  toggleSwitch.addEventListener('change', function () {
    console.log("Toggle switch changed");
    // Handle the toggle switch change
    const isEnabled = toggleSwitch.checked;
    chrome.storage.sync.set({ 'trackingEnabled': isEnabled });

    if (isEnabled) {
        console.log("Tracking enabled");
        sendUrlToApi();
    }
});

document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM loaded");
    document.getElementById("sendButton").addEventListener("click", async function () {
        console.log("Send button clicked");
        sendUrlToApi();
    });
});

async function sendUrlToApi() {
    try {
        console.log("Sending URL to API");
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        const tabUrl = { link: tab.url };
        console.log("Tab URL:", tabUrl);
        const data = await fetchData(tabUrl);
        console.log("API response:", data);
    } catch (error) {
        console.error("Error sending URL to API:", error);
    }
}

async function fetchData(tabUrl) {
    try {
        console.log("Fetching data from API");
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


  exitButton.addEventListener('click', function () {
    // Handle the exit button click
    window.close();
  });

  redirectButton.addEventListener('click', function () {
    // Handle the redirect button click
    chrome.tabs.create({ url: 'Application Page/index.html' });
  });

  // // Initialize toggle switch state
  // chrome.storage.sync.get(['trackingEnabled'], function (result) {
  //   toggleSwitch.checked = result.trackingEnabled || false;
  // });
});