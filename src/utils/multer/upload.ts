import multer from 'multer';
import fs from 'fs';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const fullPath = 'uploads/posts';
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
    }
    cb(null, fullPath);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname +
        '-' +
        Date.now() +
        '-' +
        file.originalname.replace(/\s/g, '')
    );
  },
});

const upload = multer({ storage });

export default upload;
