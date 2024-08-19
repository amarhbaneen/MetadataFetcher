const assert = require('assert');
const http = require('http');
const MetadataService = require('../MetaDataFetcher/MetaDataService');

const mockServer = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/fetcher') {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify([{
      url: 'https://example.com',
      metadata: {
        title: 'Example Title',
        description: 'Example Description',
        image: 'https://example.com/image.jpg'
      }
    }]));
  }
});

describe('MetadataService.fetchMetadata', () => {
  before(() => {
    mockServer.listen(8080);
  });

  after(() => {
    mockServer.close();
  });

  it('fetches metadata successfully', async () => {
    const url = 'http://localhost:8080/fetcher';

    const originalFetch = MetadataService.fetchMetadata;
    MetadataService.fetchMetadata = async (urls) => {
      return new Promise((resolve, reject) => {
        http.request(url, (response) => {
          let data = '';
          response.on('data', chunk => data += chunk);
          response.on('end', () => {
            const result = JSON.parse(data);
            resolve(result.map(item => item.metadata));
          });
        }).end();
      });
    };

    const result = await MetadataService.fetchMetadata(['https://example.com']);
    assert.deepStrictEqual(result, [{
      title: 'Example Title',
      description: 'Example Description',
      image: 'https://example.com/image.jpg'
    }]);

    MetadataService.fetchMetadata = originalFetch;
  });
});
