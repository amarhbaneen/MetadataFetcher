import React from 'react';
import './CSS/MetadataDisplay.css'; // Import styles for displaying metadata

const MetadataDisplay = ({ metadata }) => {
    // If there's no metadata or it's an empty array, don't render anything
    if (!metadata || metadata.length === 0) return null;

    return (
        <div className="metadata-container">
            {metadata.map((data, index) => (
                <div key={index} className="metadata-card">
                    {data.error ? (
                        // Display error information if there's an error in the metadata
                        <div className="error-card">
                            <h2 className="error-title">Error Encountered</h2>
                            <p className="error-message">{data.error}</p>
                            {data.details && (
                                <div className="error-details">
                                    <h3>Details:</h3>
                                    <pre>{JSON.stringify(data.details, null, 2)}</pre>
                                </div>
                            )}
                        </div>
                    ) : (
                        // Display metadata content if there's no error
                        <div className="metadata-content">
                            <h2 className="metadata-title">{data.title}</h2>
                            <p className="metadata-description">{data.description}</p>
                            {data.image && <img src={data.image} alt={data.title} className="metadata-image" />}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default MetadataDisplay;
