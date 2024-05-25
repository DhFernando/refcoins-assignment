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
      let storageAccountName: string = 'refcoinproperties'
      let sasToken ='sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2024-06-08T11:57:39Z&st=2024-05-25T03:57:39Z&spr=https,http&sig=e8TfvTWrpk8W0OSmAkfPkx16cVjAxOgpz5v9aG8B1rU%3D'
  
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
              src={selectedFileUrl ? selectedFileUrl : "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"} 
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
