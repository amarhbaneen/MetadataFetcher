import axios from 'axios'; 

/*
  Service to fetch metadata from the given URLs.
  Handles API requests and processes responses.
*/
const API_ENDPOINT = 'https://metadatafetcher-production.up.railway.app/fetcher';

// Function to fetch metadata for a list of URLs
const fetchMetadata = async (urls) => {
    console.log(urls); // Log URLs to see what we're working with

    try {
        // Make a POST request to the API with the URLs in the request body
        const response = await axios.post(API_ENDPOINT, { urls });
        
        // Process and return the metadata from the API response
        return response.data.map((item) => {
            // If metadata is available, return it; otherwise, return an error object
            return item.metadata ? item.metadata : { error: item.error };
        });
    } catch (error) {
        // Log the error for debugging purposes
        console.error('Error fetching metadata:', error.response || error.message);

        // Return a user-friendly error message with details if available
        return {
            error: 'Oops! Something went wrong while fetching metadata. Please try again later.',
            details: error.response ? error.response.data : error.message,
        };
    }
};

export default {
    fetchMetadata,
};
