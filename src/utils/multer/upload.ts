import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    // remove spaces from original file name
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
