// MetadataForm.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MetadataForm from '../MetaDataFetcher/MetadataForm';
import MetadataService from '../MetaDataFetcher/MetaDataService';
import MetadataDisplay from '../MetaDataFetcher/MetDataDisplay';
import LoadingSpinner from '../Spinner_loading/spinner';

// Mock the MetadataService and MetadataDisplay
jest.mock('../MetaDataFetcher/MetaDataService');
jest.mock('../MetaDataFetcher/MetDataDisplay', () => () => <div data-testid="metadata-display" />);
jest.mock('../Spinner_loading/spinner', () => () => <div data-testid="loading-spinner" />);

describe('MetadataForm Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders the MetadataForm with initial URL input fields', () => {
        render(<MetadataForm />);

        const inputElements = screen.getAllByPlaceholderText(/Enter URL/i);
        expect(inputElements).toHaveLength(3); // 3 initial input fields
    });

    test('adds a new URL input field when "Add URL" button is clicked', () => {
        render(<MetadataForm />);

        const addButton = screen.getByText(/Add URL/i);
        fireEvent.click(addButton);

        const inputElements = screen.getAllByPlaceholderText(/Enter URL/i);
        expect(inputElements).toHaveLength(4); // Should have 4 input fields now
    });

    test('removes a URL input field when "×" button is clicked', () => {
        render(<MetadataForm />);

        // Add an extra URL field first
        const addButton = screen.getByText(/Add URL/i);
        fireEvent.click(addButton);

        // Now remove one
        const removeButtons = screen.getAllByText(/×/i);
        fireEvent.click(removeButtons[0]);

        const inputElements = screen.getAllByPlaceholderText(/Enter URL/i);
        expect(inputElements).toHaveLength(3); // Back to 3 input fields
    });

    test('displays a loading spinner during metadata fetching', async () => {
        MetadataService.fetchMetadata.mockResolvedValueOnce([]); // Mock successful fetch

        render(<MetadataForm />);

        const submitButton = screen.getByText(/Submit/i);
        fireEvent.click(submitButton);

        expect(screen.getByTestId('loading-spinner')).toBeInTheDocument(); // Check spinner is shown

        await waitFor(() => expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument()); // Check spinner is hidden
    });

    test('displays fetched metadata when fetching is successful', async () => {
        const mockMetadata = [{ url: 'http://example.com', metadata: { title: 'Example Title' } }];
        MetadataService.fetchMetadata.mockResolvedValueOnce(mockMetadata);

        render(<MetadataForm />);

        const submitButton = screen.getByText(/Submit/i);
        fireEvent.click(submitButton);

        await waitFor(() => expect(screen.getByTestId('metadata-display')).toBeInTheDocument());
    });

    test('displays an error message when fetching fails', async () => {
        MetadataService.fetchMetadata.mockRejectedValueOnce(new Error('Fetch failed'));

        render(<MetadataForm />);

        const submitButton = screen.getByText(/Submit/i);
        fireEvent.click(submitButton);

        const errorMessage = await screen.findByText(/Failed to fetch metadata/i);
        expect(errorMessage).toBeInTheDocument();
    });
});