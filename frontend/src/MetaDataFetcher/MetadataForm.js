import React, { useState } from 'react';
import MetadataService from './MetaDataService';
import MetadataDisplay from './MetDataDisplay'; // Fixed typo in import
import LoadingSpinner from '../Spinner_loading/spinner'; // Import the spinner component
import './CSS/MetaDataForm.css'; // Ensure styles are imported

const MetadataForm = () => {
    const [urls, setUrls] = useState(['', '', '']);
    const [metadata, setMetadata] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // Add loading state

    const handleInputChange = (index, event) => {
        const newUrls = [...urls];
        newUrls[index] = event.target.value;
        setUrls(newUrls);
    };

    const addUrlField = () => {
        if (urls.length < 10) { // Set a maximum number of URL fields (optional)
            setUrls([...urls, '']); // Add a new empty URL field
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setLoading(true); // Show spinner when fetching starts

        try { 
            const fetchedMetadata = await MetadataService.fetchMetadata(urls);
            setMetadata(fetchedMetadata);
        } catch (err) {
            setError('Failed to fetch metadata. Please check the URLs and try again.');
        } finally {
            setLoading(false); // Hide spinner when fetching is done
        }
    };

    return (
        <div className="metadata-form-container">
            <h1 className="form-title">Metadata Fetcher</h1>
            <p className="form-subtitle">Please enter at least 3 URLs to fetch metadata.</p>
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
                                &times;
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
                        Add URL
                    </button>
                    <button
                        type="submit"
                        className="submit-button"
                        disabled={urls.length < 3}
                    >
                        Submit
                    </button>
                </div>
            </form>
            {error && <p className="error-message">{error}</p>}
            {loading && <LoadingSpinner />} {/* Show spinner while loading */}
            {metadata.length > 0 && <MetadataDisplay metadata={metadata} />}
        </div>
    );
};

export default MetadataForm;
