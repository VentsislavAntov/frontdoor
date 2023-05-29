// Add an event listener to capture 'mouseup' event
document.addEventListener('mouseup', handleMouseUp);

function handleMouseUp(event) {
  // Get the selected text
  const selectedText = window.getSelection().toString();
  console.log('selectedTex contentt')
  console.log(selectedText)

  // Send a message to the background script
  // eslint-disable-next-line no-undef
  chrome.runtime.sendMessage({ selectedText });
}
