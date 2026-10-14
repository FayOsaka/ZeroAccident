const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { submitForm, getForms, updateStatus } = require('../controller/NearMissForm');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // ล็อคให้สร้าง/บันทึกไว้ที่โฟลเดอร์หลักเสมอ
    const dir = path.join(process.cwd(), 'uploads');
    
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'incident-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

router.post('/', upload.single('image'), submitForm);
router.get('/', getForms);
router.put('/:id/status', updateStatus);

module.exports = router;