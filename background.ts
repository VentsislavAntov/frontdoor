// Listen for messages from the content script
chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  // Leaving console logs on purpose for easier demo/investigation
  if (message.action === 'fetchApis') {
    // Notify the content script of the loading state
    // @ts-ignore
    chrome.tabs.sendMessage(sender.tab.id, { action: 'loading' });
    const { selectedText } = message;

    try {
      // Trigger the summary API
      const summaryResponse = await fetch('http://localhost:3000/openai/summary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: selectedText,
        }),
      });

      if (!summaryResponse.ok) {
        // @ts-ignore
        chrome.tabs.sendMessage(sender.tab.id, { action: 'loaded' });
        throw new Error('Error fetching summary');
      }

      const summary = await summaryResponse.text();
      console.log('Summary:', summary);

      // On purpose waiting for 1 second to reduce Error 429 with too frequent requests to Open AI which sometimes happened for me locally
      // This is a point between two consequential api calls
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Trigger the tags API
      const tagsResponse = await fetch('http://localhost:3000/openai/tags', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: selectedText,
        }),
      });

      if (!tagsResponse.ok) {
         // @ts-ignore
        chrome.tabs.sendMessage(sender.tab.id, { action: 'loaded' });
        throw new Error('Error fetching tags');
      }

      const tags = await tagsResponse.json();

      console.log('Tags:', tags);
      
      // Call the GraphQL mutation to create a summary
      try {
        let formattedTags = '';

        // This is a workaround to get the tags in the right format for graphql
        tags.forEach((tag: string) => {
          if (tag.includes('#')) {
            const formattedTag = tag.substring(tag.indexOf('#') + 1);
            formattedTags += `"${formattedTag}", `;
          }
        });
        formattedTags.slice(0, -2);

        const summaryResponse = await fetch('http://localhost:3000/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: `
              mutation {
                createSummary(input: {
                  originalText: "${selectedText.trim()}",
                  summary: "${summary.trim()}",
                  tags: [${formattedTags}],
                  date: "${new Date().toISOString()}"
                }) {
                  id
                  originalText
                  summary
                  date
                  tags
                }
              }
            `,
          }),
        });
        console.log('summaryResponse', summaryResponse);

      } catch (error) {
         // @ts-ignore
        chrome.tabs.sendMessage(sender.tab.id, { action: 'loaded' });
        console.error(error);
      }

    } catch (error) {
      // @ts-ignore
      chrome.tabs.sendMessage(sender.tab.id, { action: 'loaded' });
      console.error(error);
    }
    // @ts-ignore
    chrome.tabs.sendMessage(sender.tab.id, { action: 'loaded' });
  }
});
