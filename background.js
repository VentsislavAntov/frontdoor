// Listen for messages from the content script
// eslint-disable-next-line no-undef
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.selectedText) {
    // Handle the selected text received from the content script
    console.log('Selected Text Background:', message.selectedText);
  }
});
