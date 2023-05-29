// Listen for messages from the content script
// @ts-ignore
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'fetchApis') {
    const { selectedText } = message;
    console.log('selectedText background', selectedText);

    // Trigger the summary API
    fetch('http://localhost:3000/openai/summary', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: selectedText,
      }),
    })
      .then((response) => response.text())
      .then((summary) => {
        // Store the summary result in a constant
        const summaryResult = summary;
        console.log('Summary:', summaryResult);
      })
      .catch((error) => console.error('Error fetching summary:', error));

    // Trigger the tags API
    fetch('http://localhost:3000/openai/tags', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: selectedText,
      }),
    })
      .then((response) => response.json())
      .then((tags) => {
        // Store the tags result in a constant
        const tagsResult = tags;
        console.log('Tags:', tagsResult);
      })
      .catch((error) => console.error('Error fetching tags:', error));
  }
});
