import React from 'react';
import './CSS/MetadataDisplay.css'; // Ensure you have appropriate styles in this CSS file

const MetadataDisplay = ({ metadata }) => {
    if (!metadata || metadata.length === 0) return null;

    return (
        <div className="metadata-container">
            {metadata.map((data, index) => (
                <div key={index} className="metadata-card">
                    {data.error ? (
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
