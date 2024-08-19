/*
Importing the required modules:

Express: Ideal for quickly setting up a server with minimal code.
Express Rate Limit: Handles rate limiting to prevent abuse.
Helmet: Adds security-related HTTP headers.
CSRF: Provides CSRF protection.
Morgan: Logs HTTP requests for monitoring and debugging.
MetaDataFetcher: Contains our function to fetch metadata from URLs.
*/

const cors = require('cors'); // Import CORS middleware
const express = require('express'); // Import Express to set up our server
const rateLimit = require('express-rate-limit'); // Import rate limiter to keep requests in check
const helmet = require('helmet'); // Add some security headers with Helmet
const csurf = require('csurf'); // Middleware to protect against CSRF attacks
const morgan = require('morgan'); // Log requests for monitoring and debugging
const { fetchMetaData } = require('./MetaDataFetcher'); // Our function to fetch metadata from URLs

// Using rateLimit dependency to allow a maximum of 5 requests per second
const limiter = rateLimit({
    windowMs: 1000,  // 1-second window
    max: 5, // Limit each IP to 5 requests per windowMs
    message: 'Easy there! We’re taking a short break to handle the requests. Check back in a few seconds.' // Message to show to the client if they exceed the limit
});

const app = express(); // Creating the Express app
const port = 5000; // Using port 5000 for running the server

app.use(cors()); //  to able access from Frontend
app.use(limiter); // Apply the rate limiter to all requests
app.use(express.json()); // Parse JSON in requests

// Security enhancements
app.use(helmet()); // Helmet adds security-related headers
/* since using postman for testing and for unit testing it disabled  */
// app.use(csurf()); // Add CSRF protection // disable it for testing you can enable it for production 

app.use(morgan('combined')); // Log HTTP requests for debugging

// Creating our main endpoint that will handle the fetching from URL
app.post('/fetcher', async (request, response) => {
    const { urls } = request.body; // Get the list of URLs from the request body

    if (!Array.isArray(urls) || urls.length === 0) { // Check if the URLs array is not empty: input validation
        return response.status(400).json({ // Return this response if the input isn't valid
            error: "Please send an array of URLs."
        });
    }

    const result = await Promise.all(
        urls.map(async (url) => {
            try {
                const metadata = await fetchMetaData(url); // Fetch metadata for each URL using the fetchMetaData function
                return { url, metadata }; // For each URL, return the URL and its metadata

            } catch (error) {
                return { url, error: error.message }; // Return error message if fetching metadata fails
            }
        })
    );

    response.json(result); // Send the result as a JSON response to the client
});

app.listen(port, () => { // Start the server
    console.log(`Server is running on port: ${port}`); // Show a message indicating which port the server is listening on
});


module.exports = app; // Export the Express app for testing