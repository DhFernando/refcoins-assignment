// components/FileUpload.tsx
'use client'
import { BlobServiceClient } from '@azure/storage-blob';
import { useState, ChangeEvent } from 'react';  


interface FileUploadProps {
  getImageUrl: (url: string) => void;
}
 
const FileUpload: React.FC<FileUploadProps> = ({ getImageUrl }) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [selectedFileUrl, setSelectedFileUrl] = useState<string | null>(null);
    const [uploading, setUploading] = useState<boolean>(false);

    
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
      setUploading(true)
      let storageAccountName: string = process.env.NEXT_PUBLIC_STORAGE_ACCOUNT_NAME as string
      let sasToken = process.env.NEXT_PUBLIC_SAS_TOKEN as string
  
      const blobService = new BlobServiceClient(
        `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`
      )

      const containerClient = blobService.getContainerClient('properties'); 
      try {
         await containerClient.createIfNotExists({ access: 'container'})
        const blobClient = containerClient.getBlockBlobClient(`${selectedFile.name}- ${Date.now()}`)
        const options = { blobHTTPHeaders: { blobContentType: selectedFile.type } }

        await blobClient.uploadBrowserData(selectedFile, options);
        setSelectedFileUrl(blobClient.url)
        getImageUrl(blobClient.url)
        setUploading(false)
        setSelectedFile(null)

      } catch (error) {
        console.error('Error uploading image', error);
        setUploading(false)
        setSelectedFile(null)
        alert('Error uploading image');
      }
    };
  
    return (
      <div>
        <h2>Upload Property Image </h2>
          {uploading ? <progress className="progress w-56"></progress> : (
            <img
              src={selectedFileUrl ? selectedFileUrl : process.env.NEXT_PUBLIC_DEFAULT_PROPERTY_IMAGE as string} 
              alt="Shoes"
              className="my-5 rounded-xl"
            />
          )}
          
          <input type="file" onChange={handleFileChange} className="my-5 file-input file-input-bordered file-input-primary file-input-sm w-full max-w-xs" />
     
          {selectedFile && (<button className='btn btn-primary btn-sm' onClick={handleUpload}>Upload</button>)}
         
      </div>
    );
};

export default FileUpload;
