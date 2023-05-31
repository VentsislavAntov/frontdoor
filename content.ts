// Add an event listener to capture 'mouseup' event
document.addEventListener('mouseup', handleMouseUp);

let loadingState = false;

function handleMouseUp(event: MouseEvent) {
  // Get the selected text
  const selectedText = window.getSelection()?.toString();

  // Send a message to the background script
  if (selectedText && !loadingState) {
    chrome.runtime.sendMessage({ action: 'fetchApis', selectedText });
  }
}

chrome.runtime.onMessage.addListener((message) => {
  if (message.action === 'loading') {
    loadingState = true;
    console.log('Loading');
  }
  if (message.action === 'loaded') {
    loadingState = false;
    console.log('Loaded');
  }
});
