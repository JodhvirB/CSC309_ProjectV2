import { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs/promises';
import path from 'path';

// Disable bodyParser to handle file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};

// Ensure the `uploads` directory exists
const ensureUploadDir = async () => {
  const uploadDir = path.join(process.cwd(), 'public', 'uploads');
  try {
    await fs.access(uploadDir);
  } catch {
    await fs.mkdir(uploadDir, { recursive: true });
  }
  return uploadDir;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const uploadDir = await ensureUploadDir();

    const form = new formidable.IncomingForm({
      uploadDir,
      keepExtensions: true,
    });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('File upload error:', err);
        return res.status(500).json({ message: 'File upload failed' });
      }

      const uploadedFile = files.file;
      if (Array.isArray(uploadedFile)) {
        return res.status(400).json({ message: 'Only one file can be uploaded at a time' });
      }

      const filePath = uploadedFile.filepath.split('public')[1]; // Relative path
      const fileUrl = `/uploads${filePath}`;

      return res.status(200).json({ message: 'File uploaded successfully', url: fileUrl });
    });
  } catch (error) {
    console.error('Error handling upload:', error);
    return res.status(500).json({ message: 'File upload failed' });
  }
}
