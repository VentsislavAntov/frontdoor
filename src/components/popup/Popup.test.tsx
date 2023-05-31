import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import Popup, { GET_SUMMARIES } from "./Popup";
import { MockedProvider } from '@apollo/client/testing';
import '@testing-library/jest-dom/extend-expect'; // Import the extended matchers

describe('68732957', () => {
  test('should load the data then render the page', async () => {
    const mocks = [
      {
        request: {
          query: GET_SUMMARIES,
        },
        result: jest.fn().mockReturnValue({
          data: {
            summaries: [
              {
                id: 1,
                originalText: 'Sample original text 1',
                summary: 'Sample summary 1',
                date: '2023-05-30',
                tags: ['tag1', 'tag2'],
              },
              {
                id: 2,
                originalText: 'Sample original text 2',
                summary: 'Sample summary 2',
                date: '2023-06-01',
                tags: ['tag2', 'tag3'],
              },
            ]
          },
        }),
      },
    ];

    const mockSpy = mocks[0].result;
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Popup />
      </MockedProvider>,
    );

    await waitFor(() => expect(mockSpy).toBeCalledTimes(1));

    // Wait for data to be loaded
    await screen.findByText('My Highlights');

    // Assert rendered highlights
    const highlightElements = screen.getAllByTestId('highlight');
    expect(highlightElements).toHaveLength(2);
  });

  test('handles tag selection', async () => {
    const mocks = [
    {
      request: {
        query: GET_SUMMARIES,
      },
      result: jest.fn().mockReturnValue({
        data: {
          summaries: [
            {
              id: 1,
              originalText: 'Sample original text 1',
              summary: 'Sample summary 1',
              date: '2023-05-30',
              tags: ['tag1', 'tag2'],
            },
            {
              id: 2,
              originalText: 'Sample original text 2',
              summary: 'Sample summary 2',
              date: '2023-06-01',
              tags: ['tag2', 'tag3'],
            },
          ]
        },
      }),
    },
  ];
    
    const mockSpy = mocks[0].result;
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Popup />
      </MockedProvider>,
    );

  await waitFor(() => expect(mockSpy).toBeCalledTimes(1));

  // Wait for data to be loaded
  await screen.findByText('My Highlights');

  // Select a tag
  const tagSelectElement = screen.getByTestId('tag-select');
  fireEvent.change(tagSelectElement, { target: { value: 'tag2' } });

  // Assert filtered highlights
  const highlightElements = screen.getAllByTestId('highlight');
  expect(highlightElements).toHaveLength(2); // Both highlights have tag2
  });

  test('handles tag selection second', async () => {

    const mocks = [
      {
        request: {
          query: GET_SUMMARIES,
        },
        result: jest.fn().mockReturnValue({
          data: {
            summaries: [
              {
                id: 1,
                originalText: 'Sample original text 1',
                summary: 'Sample summary 1',
                date: '2023-05-30',
                tags: ['tag1', 'tag2'],
              },
              {
                id: 2,
                originalText: 'Sample original text 2',
                summary: 'Sample summary 2',
                date: '2023-06-01',
                tags: ['tag2', 'tag3'],
              },
            ]
          },
        }),
      },
    ];
    
    const mockSpy = mocks[0].result;
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Popup />
      </MockedProvider>,
    );

  await waitFor(() => expect(mockSpy).toBeCalledTimes(1));

  // Wait for data to be loaded
  await screen.findByText('My Highlights');

  // Select a tag
  const tagSelectElement = screen.getByTestId('tag-select');
  fireEvent.change(tagSelectElement, { target: { value: 'tag1' } });

  // Assert filtered highlights
  const highlightElements = screen.getAllByTestId('highlight');
  expect(highlightElements).toHaveLength(1); // Only one highlight has tag1
  });

  test('handles sort by date asc', async () => {

    const mocks = [
      {
        request: {
          query: GET_SUMMARIES,
        },
        result: jest.fn().mockReturnValue({
          data: {
            summaries: [
              {
                id: 1,
                originalText: 'Sample original text 1',
                summary: 'Sample summary 1',
                date: '2023-05-30',
                tags: ['tag1', 'tag2'],
              },
              {
                id: 2,
                originalText: 'Sample original text 2',
                summary: 'Sample summary 2',
                date: '2023-06-01',
                tags: ['tag2', 'tag3'],
              },
            ]
          },
        }),
      },
    ];
    
    const mockSpy = mocks[0].result;
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Popup />
      </MockedProvider>,
    );

    await waitFor(() => expect(mockSpy).toBeCalledTimes(1));

    // Wait for data to be loaded
    await screen.findByText('My Highlights');

    // Select descending sort
    const sortSelectElement = screen.getByTestId('sort-select');
    fireEvent.change(sortSelectElement, { target: { value: 'asc' } });

    // Assert sorted highlights
    const originalTexttElements = screen.getAllByTestId('original-text');
    expect(originalTexttElements).toHaveLength(2);
    expect(originalTexttElements[0]).toHaveTextContent('Sample original text 1');
    expect(originalTexttElements[1]).toHaveTextContent('Sample original text 2');
  });

  test('handles sort by date desc', async () => {

    const mocks = [
      {
        request: {
          query: GET_SUMMARIES,
        },
        result: jest.fn().mockReturnValue({
          data: {
            summaries: [
              {
                id: 1,
                originalText: 'Sample original text 1',
                summary: 'Sample summary 1',
                date: '2023-05-30',
                tags: ['tag1', 'tag2'],
              },
              {
                id: 2,
                originalText: 'Sample original text 2',
                summary: 'Sample summary 2',
                date: '2023-06-01',
                tags: ['tag2', 'tag3'],
              },
            ]
          },
        }),
      },
    ];
    
    const mockSpy = mocks[0].result;
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Popup />
      </MockedProvider>,
    );

    await waitFor(() => expect(mockSpy).toBeCalledTimes(1));

    // Wait for data to be loaded
    await screen.findByText('My Highlights');

    // Select descending sort
    const sortSelectElement = screen.getByTestId('sort-select');
    fireEvent.change(sortSelectElement, { target: { value: 'desc' } });

    // Assert sorted highlights
    const originalTexttElements = screen.getAllByTestId('original-text');
    expect(originalTexttElements).toHaveLength(2);
    expect(originalTexttElements[0]).toHaveTextContent('Sample original text 2');
    expect(originalTexttElements[1]).toHaveTextContent('Sample original text 1');
  });

  test('shows correctly no results', async () => {
    const mocks = [
      {
        request: {
          query: GET_SUMMARIES,
        },
        result: jest.fn().mockReturnValue({
          data: {
            summaries: [],
          },
        }),
      },
    ];

    const mockSpy = mocks[0].result;
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Popup />
      </MockedProvider>
    );

    await waitFor(() => expect(mockSpy).toBeCalledTimes(1));


    // Assert "No highlights available" text
    const noHighlightsElement = screen.getByTestId('no-highlights');
    expect(noHighlightsElement).toBeInTheDocument();
  });
});
