import axios from 'axios'; 

/* 
 A service to handle the API request and response
*/
const API_ENDPOINT = 'https://metadatafetcher-production.up.railway.app/fetcher';

const fetchMetadata = async (urls) => {
    console.log(urls); // Log the URLs to verify

    try {
        // Send a POST request with URLs as JSON
        const response = await axios.post(API_ENDPOINT, { urls });
        
        
        // Return the metadata from the response
        return response.data.map((item) => {
            // Check if metadata exists; otherwise, return an error object
            return item.metadata ? item.metadata : { error: item.error };
        });
    } catch (error) {
        // Log error details for debugging
        console.error('Error fetching metadata:', error.response || error.message);

        // Return a user-friendly error message or object
        return {
            error: 'Failed to fetch metadata. Please try again later.',
            details: error.response ? error.response.data : error.message,
        };
    }
};

export default {
    fetchMetadata,
};