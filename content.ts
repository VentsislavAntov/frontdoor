// Add an event listener to capture 'mouseup' event
document.addEventListener('mouseup', handleMouseUp);

function handleMouseUp(event: MouseEvent) {
  // Get the selected text
  const selectedText = window.getSelection()?.toString();
  console.log('Selected Text Content:', selectedText);

  // Send a message to the background script
  if (selectedText) {
    // @ts-ignore
    chrome.runtime.sendMessage({ action: 'fetchApis', selectedText });
  }
}
