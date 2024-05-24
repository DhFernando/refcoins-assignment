// components/FileUpload.tsx
'use client'
import { useState, ChangeEvent } from 'react';  

const FileUpload = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const blobSasUrl: string = 'https://refcoinproperties.blob.core.windows.net/properties?sp=racwdli&st=2024-05-24T11:07:10Z&se=2024-06-07T19:07:10Z&sv=2022-11-02&sr=c&sig=001iAzg6%2FYfq4BdYTm26xa9ztfVr3VZGeRhxe34L3s4%3D';
  
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files.length > 0) {
        setSelectedFile(event.target.files[0]);
      }
    };
  
    const handleUpload = async () => {
      if (!selectedFile) {
        alert('Please select a file');
        return;
      }
  
      try {
        await fetch(blobSasUrl, {
          method: 'PUT',
          body: selectedFile,
          headers: {
            'x-ms-blob-type': 'BlockBlob',
            'Content-Type': selectedFile.type // Optional, set if you want to specify the content type explicitly
          }
        });
  
        alert('Image uploaded successfully');
      } catch (error) {
        console.error('Error uploading image', error);
        alert('Error uploading image');
      }
    };
  
    return (
      <div>
        <h2>Upload Image to Azure Blob Storage</h2>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload</button>
      </div>
    );
};

export default FileUpload;
