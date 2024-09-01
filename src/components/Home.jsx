// src/components/FileUploadForm.js

import React, { useState } from 'react';
import axios from 'axios';

const FileUploadForm = () => {
  const [pnr, setPnr] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');

  const handlePnrChange = (e) => {
    setPnr(e.target.value);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!pnr) {
      setError('PNR Number is required.');
      return;
    }
    if (!file) {
      setError('File is required.');
      return;
    }
    setError('');

    const formData = new FormData();
    formData.append('pnr', pnr);
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:8081/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Response:', response.data);
    } catch (err) {
      setError('An error occurred while uploading.');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-group">
            <label htmlFor="pnr" className="block text-gray-700 font-semibold">PNR Number:</label>
            <input
              type="text"
              id="pnr"
              value={pnr}
              onChange={handlePnrChange}
              placeholder="Enter PNR number"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="form-group">
            <label htmlFor="file" className="block text-gray-700 font-semibold">Upload File (Image or Video):</label>
            <input
              type="file"
              id="file"
              accept="image/*,video/*"
              onChange={handleFileChange}
              required
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default FileUploadForm;
