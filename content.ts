// Add an event listener to capture 'mouseup' event
document.addEventListener('mouseup', handleMouseUp);

function handleMouseUp(event: MouseEvent) {
  // Get the selected text
  const selectedText = window.getSelection()?.toString();

  // Send a message to the background script
  if (selectedText) {
    chrome.runtime.sendMessage({ action: 'fetchApis', selectedText });
  }
}
