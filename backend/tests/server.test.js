const request = require('supertest'); // Import supertest for making HTTP requests in tests
const app = require('../server'); // Import the Express app
const { fetchMetaData } = require('../MetaDataFetcher'); // Import the fetchMetaData function

// Mock the fetchMetaData function to control its behavior during tests
jest.mock('../MetaDataFetcher', () => ({
    fetchMetaData: jest.fn() // Create a mock function for fetchMetaData
}));

describe('POST /fetcher', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Clear any previous mocks before each test
    });

    it('should return metadata for valid URLs', async () => {
        // Arrange
        const urls = ['https://www.example.com'];
        const metadata = { title: 'Example Site', description: 'An example site for testing.' };
        fetchMetaData.mockResolvedValue(metadata); // Mock resolved value for fetchMetaData

        // Act
        const res = await request(app)
            .post('/fetcher')
            .send({ urls });

        // Assert
        expect(res.statusCode).toBe(200); // Check that the status code is 200
        expect(res.body).toBeInstanceOf(Array); // Verify that the response body is an array
        expect(res.body[0]).toHaveProperty('url', 'https://www.example.com'); // Check URL in the response
        expect(res.body[0]).toHaveProperty('metadata'); // Ensure metadata property exists
        expect(res.body[0].metadata).toEqual(metadata); // Validate that metadata matches expected value
    });

    it('should return an error message if fetchMetaData throws an error', async () => {
        // Arrange
        const urls = ['https://www.nonexistentwebsite.com'];
        fetchMetaData.mockRejectedValue(new Error('Website not found')); // Mock rejected value for fetchMetaData

        // Act
        const res = await request(app)
            .post('/fetcher')
            .send({ urls });

        // Assert
        expect(res.statusCode).toBe(200); // Assuming the route sends a 200 status even with errors
        expect(res.body).toBeInstanceOf(Array); // Verify that the response body is an array
        expect(res.body[0]).toHaveProperty('url', 'https://www.nonexistentwebsite.com'); // Check URL in the response
        expect(res.body[0]).toHaveProperty('error', 'Website not found'); // Ensure error message is returned
    });

    it('should return a 400 status for an invalid request body', async () => {
        // Act
        const res = await request(app)
            .post('/fetcher')
            .send({ urls: [] }); // Send an empty array of URLs

        // Assert
        expect(res.statusCode).toBe(400); // Check that the status code is 400
        expect(res.body).toHaveProperty('error', 'Please send an array of URLs.'); // Validate error message
    });

    it('should return a 400 status for missing URLs property', async () => {
        // Act
        const res = await request(app)
            .post('/fetcher')
            .send({}); // Send an empty request body

        // Assert
        expect(res.statusCode).toBe(400); // Check that the status code is 400
        expect(res.body).toHaveProperty('error', 'Please send an array of URLs.'); // Validate error message
    });

    it('should handle requests with non-array URLs property', async () => {
        // Act
        const res = await request(app)
            .post('/fetcher')
            .send({ urls: 'https://www.example.com' }); // Send a string instead of an array

        // Assert
        expect(res.statusCode).toBe(400); // Check that the status code is 400
        expect(res.body).toHaveProperty('error', 'Please send an array of URLs.'); // Validate error message
    });
});
