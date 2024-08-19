 # 🌐 Metadata Fetcher App  Welcome to the **Metadata Fetcher App**! 
 🚀 This full-stack application is designed to fetch and display metadata from various URLs. Perfect for developers and data enthusiasts looking to quickly gain insights from web pages. 
 ## 🚀 Live Demos 
 - **Backend Service**: [Explore Metadata Fetcher API](https://metadatafetcher-production.up.railway.app) 
 - **Frontend Application**: [Try the Frontend Demo](https://reactlivedemo-production.up.railway.app/) 
 - ## 📚 Overview  This project includes: 
 - - **Backend**: A Node.js and Express service that retrieves metadata from URLs, featuring rate limiting, security headers, and error handling.  
 - - **Frontend**: A React-based UI that allows users to input URLs, view metadata, and handle errors effectively.  
 - ## 🛠️ Getting Started  Follow these steps to set up and run the application locally. 
 - ### Prerequisites  
 - - [Node.js](https://nodejs.org/) (v14+)  
 - - [npm](https://www.npmjs.com/)  
 - ### Backend Setup  1.
 - **Clone the Repository:**   
 - ```bash   
        git clone https://github.com/your-username/metadata-fetcher.git  
        cd metadata-fetcher   

-  ```bash 
      npm install
    
- **Create a .env file in the backend directory with the following content:**
- ```env
  PORT=5000
    
- ```bash
  npm start
The backend service will be available at http://localhost:5000.
    

### Frontend Setup

-  ```bash
      cd frontend
    
-   ```bash
       npm install
    
-   ```bash
      npm start
   
The frontend application will be available at http://localhost:3000.
    

📡 API Usage
------------

*   **Endpoint:**
*   POST /fetcher
  **Request:**
-   ```json
    { "urls": [ "https://www.example.com" ]}
    
*   **Responses:**
    
-   ```json
          { "url": "https://www.example.com", "metadata": { "title": "Sample Title", "description": "This is a sample description.", "image": "https://www.example.com/sample.jpg" }}
        
-  ```json
   { "url": "https://www.example.com", "error": "Failed to retrieve metadata for https://www.example.com"}
        

🎨 Design Choices & Trade-offs
------------------------------

*   **Rate Limiting:** Limited to 5 requests per second to manage performance and server load.
    
*   **Security:** Includes Helmet for essential security headers. CSRF protection is disabled for testing but should be enabled in production.
    
*   **Error Handling:** Provides clear error messages to users for better debugging and UX.
    
*   **UI/UX:** Features a modern and minimal design with dynamic URL fields and responsive loading indicators.
    

🧪 Testing
----------

### Backend

*   bashCopy codenpm test
    
*   bashCopy codenpm run test:integration
    

### Frontend

*   bashCopy codenpm test
    

🤝 Contributing
---------------

We welcome contributions! If you have ideas, fixes, or improvements, please fork the repository and submit a pull request. For issues or feature requests, please open a new issue on the GitHub repository.

📄 License
----------

This project is licensed under the MIT License. See the LICENSE file for details.

Created by Ammar Alsanah | [LinkedIn](https://www.linkedin.com/in/amarhbaneen/)
