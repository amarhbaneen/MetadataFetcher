import React, { useState } from 'react';
import MetadataService from './MetaDataService';
import MetadataDisplay from './MetDataDisplay'; // Fixed typo in import path for MetadataDisplay
import LoadingSpinner from '../Spinner_loading/spinner'; // Importing the spinner component for loading state
import './CSS/MetaDataForm.css'; // Importing styles for the form component

const MetadataForm = () => {
    // Initial state for URLs, metadata, error messages, and loading status
    const [urls, setUrls] = useState(['', '', '']);
    const [metadata, setMetadata] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // Controls the visibility of the loading spinner

    // Updates the URL at a specific index when the user types in an input field
    const handleInputChange = (index, event) => {
        const updatedUrls = [...urls];
        updatedUrls[index] = event.target.value;
        setUrls(updatedUrls);
    };

    // Adds a new URL input field if we have fewer than 10
    const addUrlField = () => {
        if (urls.length < 10) { // Limiting the number of URL fields
            setUrls([...urls, '']); // Adding a new empty URL field
        }
    };

    // Handles form submission: fetches metadata and manages loading/error states
    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(''); // Clear any previous errors
        setLoading(true); // Show the spinner while we're fetching data

        try {
            const fetchedMetadata = await MetadataService.fetchMetadata(urls);
            setMetadata(fetchedMetadata); // Update metadata with the fetched data
        } catch (err) {
            setError('Something went wrong. Please check your URLs and try again.'); // Display error message
        } finally {
            setLoading(false); // Hide the spinner once data fetching is complete
        }
    };

    return (
        <div className="metadata-form-container">
            <h1 className="form-title">Metadata Fetcher</h1>
            <p className="form-subtitle">Enter at least 3 URLs to get their metadata.</p>
            <form onSubmit={handleSubmit} className="metadata-form">
                {urls.map((url, index) => (
                    <div key={index} className="url-input-group">
                        <input
                            type="text"
                            value={url}
                            onChange={(e) => handleInputChange(index, e)}
                            placeholder="Enter URL"
                            required
                            className="url-input"
                        />
                        {urls.length > 3 && (
                            <button
                                type="button"
                                className="remove-url-button"
                                onClick={() => setUrls(urls.filter((_, i) => i !== index))}
                            >
                                &times; {/* Button to remove this URL field */}
                            </button>
                        )}
                    </div>
                ))}
                <div className="form-actions">
                    <button
                        type="button"
                        className="add-url-button"
                        onClick={addUrlField}
                        disabled={urls.length >= 10}
                    >
                        Add URL {/* Button to add a new URL field */}
                    </button>
                    <button
                        type="submit"
                        className="submit-button"
                        disabled={urls.length < 3}
                    >
                        Submit {/* Button to submit the form */}
                    </button>
                </div>
            </form>
            {error && <p className="error-message">{error}</p>} {/* Display error message if any */}
            {loading && <LoadingSpinner />} {/* Show loading spinner while fetching data */}
            {metadata.length > 0 && <MetadataDisplay metadata={metadata} />} {/* Display metadata results */}
        </div>
    );
};

export default MetadataForm;
