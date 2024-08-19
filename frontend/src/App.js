import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import MetadataForm from './MetaDataFetcher/MetadataForm';

const App = () => {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Metadata Fetcher</h1>
      </header>
      <main className="app-main">
        <MetadataForm />
      </main>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

export default App;
