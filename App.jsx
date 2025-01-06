import { useState, useEffect } from 'react';
import './App.css'; // Ensure this is imported

function App() {
  const [url, setUrl] = useState('');
  const [links, setLinks] = useState([]);
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    const savedLinks = JSON.parse(localStorage.getItem('links')) || [];
    setLinks(savedLinks);
  }, []);

  useEffect(() => {
    localStorage.setItem('links', JSON.stringify(links));
  }, [links]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlPattern = /^(https?:\/\/)/;
    if (!url) {
      setValidationError('URL cannot be empty');
      return;
    } else if (!urlPattern.test(url)) {
      setValidationError('Invalid URL. Make sure it starts with http:// or https://');
      return;
    }
    setValidationError('');
    const shortCode = Math.random().toString(36).substring(2, 8);
    setLinks([...links, { original: url, short: shortCode, clicks: 0 }]);
    setUrl('');
  };

  const handleLinkClick = (shortCode) => {
    setLinks(
      links.map((link) =>
        link.short === shortCode ? { ...link, clicks: link.clicks + 1 } : link
      )
    );
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Link Shortener & Analytics</h1>
      <form onSubmit={handleSubmit} className="form-container">
        <input
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
            setValidationError('');
          }}
          placeholder="Enter URL"
          className="input-field"
        />
        <button type="submit" className="submit-button">Shorten</button>
        {validationError && <p className="error-message">{validationError}</p>}
      </form>
      <h2 className="dashboard-title">Analytics Dashboard</h2>
      <table className="analytics-table">
        <thead>
          <tr>
            <th>Short URL</th>
            <th>Original URL</th>
            <th>Clicks</th>
          </tr>
        </thead>
        <tbody>
          {links.map((link) => (
            <tr key={link.short}>
              <td>
                <a
                  href={link.original}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleLinkClick(link.short)}
                  className="short-url"
                >
                  {link.short}
                </a>
              </td>
              <td>{link.original}</td>
              <td>{link.clicks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;