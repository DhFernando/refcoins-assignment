// pages/api/upload.ts

import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

type UploadRequestBody = {
  fileName: string;
  fileType: string;
  file: Buffer;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { fileName, fileType, file }: UploadRequestBody = req.body;

    const sasToken = "sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2024-09-07T18:09:22Z&st=2024-05-24T10:09:22Z&spr=https,http&sig=tO7QWV1Q8M%2Bcpg4We7Xy6BEN1zwBrNRLdPt96QQH5CI%3D"; // Replace this with your actual SAS Token
    const storageAccountName = "refcoinproperties"; // Replace with your storage account name
    const containerName = "properties"; // Replace with your container name

    const url = `https://${storageAccountName}.blob.core.windows.net/${containerName}/${fileName}?${sasToken}`;

    const options = {
      headers: {
        'x-ms-blob-type': 'BlockBlob',
        'Content-Type': fileType,
      }
    };

    try {
        const response = await axios.put(url, file, options);
        res.status(200).json({ url: url.split("?")[0] }); // Return the URL without the SAS Token
      } catch (error) {
        res.status(500).json({ error: 'Error uploading file to Azure Blob Storage' });
      }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};
