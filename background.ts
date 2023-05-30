// Listen for messages from the content script
chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.action === 'fetchApis') {
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
        throw new Error('Error fetching summary');
      }

      const summary = await summaryResponse.text();
      console.log('Summary:', summary);

      // On purpose waiting for 1 second to reduce Error 429 with too frequent requests to Open AI
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
        throw new Error('Error fetching tags');
      }

      const tags = await tagsResponse.json();

      console.log('Tags:', tags);
      
      // Call the GraphQL mutation to create a summary
      try {
        // Trigger the summary API
        let formattedTags = '';

        tags.forEach((tag: string) => {
          if (tag.includes('#')) {
            const formattedTag = tag.substring(tag.indexOf('#') + 1);
            formattedTags += `"${formattedTag}", `;
          }
        });
        formattedTags.slice(0, -2);
        console.log('formattedTags', formattedTags);
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
        console.error(error);
      }

    } catch (error) {
      console.error(error);
    }
  }
});
