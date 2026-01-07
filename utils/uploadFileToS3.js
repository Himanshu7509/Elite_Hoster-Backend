import s3 from './s3.js';
import { v4 as uuidv4 } from 'uuid';

const uploadFileToS3 = async (file, folder = 'documents') => {
  try {
    // Validate file type (PDF only for documents)
    const allowedTypes = ['application/pdf'];
    if (!allowedTypes.includes(file.mimetype)) {
      throw new Error('Only PDF files are allowed');
    }

    // Check file size (limit to 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    if (file.size > maxSize) {
      throw new Error('File size exceeds 10MB limit');
    }

    const fileKey = `${folder}/${uuidv4()}-${file.originalname}`;

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileKey,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    const result = await s3.upload(params).promise();
    return result.Location; // Return the URL of the uploaded file
  } catch (error) {
    console.error('Error uploading file to S3:', error);
    throw error;
  }
};

// Function to delete file from S3
const deleteFileFromS3 = async (fileUrl) => {
  try {
    if (!fileUrl) return;
    
    // Extract the file key from the URL
    const urlParts = fileUrl.split('.amazonaws.com/');
    if (urlParts.length < 2) {
      console.error('Invalid S3 URL format:', fileUrl);
      return;
    }
    
    const fileKey = urlParts[1];
    
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileKey,
    };
    
    await s3.deleteObject(params).promise();
    console.log('File deleted from S3 successfully:', fileKey);
  } catch (error) {
    console.error('Error deleting file from S3:', error);
    // Don't throw error as we don't want to fail the entire delete operation
    // if S3 deletion fails
  }
};

export { uploadFileToS3, deleteFileFromS3 };