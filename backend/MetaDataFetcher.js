const cheerio = require('cheerio');
const axios = require('axios'); 

async function fetchMetadata(url) 
{
    try {
        const {data} = await axios.get(url); // using the get Function from Axios will fetch for HTML content from the URL 
        const URLParser = cheerio.load(data); // Cheerio loading the HTML content for parsing it 

        const title = URLParser('head > title').text(); // extracting the title
        const description =URLParser('meta[name="description"]').attr('content')|| 'No description available'; // in case the URL doesn't have meta called "description" and not possible to extract it
        const image = URLParser('meta[property="og:image"]').attr('content')||URLParser('meta[name="image"]').attr('content')||'No image available';// in case the URL doesn't have meta called "og:image" and not possible to extract it
        return {title,description,image}; // return the elements as objects
    } 
    catch(error){
         // handle the coming error e.g. invalid URLs or network issues
        console.error(`Error fetching metadata for URL: ${url}`, error.message);
        throw new Error(`Failed to retrieve metadata for ${url}`);
    }
}

module.exports.fetchMetaData = fetchMetadata; // Export the fetchMetadata function for using it  in other modules
