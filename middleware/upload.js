import multer from 'multer';
import path from 'path';

// Configure storage
const storage = multer.memoryStorage(); // Store file in memory buffer

// File filter to allow only PDF files
const fileFilter = (req, file, cb) => {
  // Check if file type is PDF
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are allowed'), false);
  }
};

// Create multer instance
const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

export default upload;