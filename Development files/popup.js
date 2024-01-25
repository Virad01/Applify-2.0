document.addEventListener('DOMContentLoaded', function () {
  const toggleSwitch = document.getElementById('toggleSwitch');
  const exitButton = document.getElementById('exitButton');
  const redirectButton = document.getElementById('redirectButton');

  toggleSwitch.addEventListener('change', function () {
    // Handle the toggle switch change
    const isEnabled = toggleSwitch.checked;
    chrome.storage.sync.set({ 'trackingEnabled': isEnabled });
  });

  exitButton.addEventListener('click', function () {
    // Handle the exit button click
    window.close();
  });

  redirectButton.addEventListener('click', function () {
    // Handle the redirect button click
    chrome.tabs.create({ url: 'Application Page/index.html' });
  });

  // Initialize toggle switch state
  chrome.storage.sync.get(['trackingEnabled'], function (result) {
    toggleSwitch.checked = result.trackingEnabled || false;
  });
});
