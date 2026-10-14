const express = require('express');
const router = express.Router();
const { loginUser } = require('../controller/login');

// กำหนด Route เมื่อมีการ POST เข้ามาที่ /api/login
router.post('/', loginUser);

module.exports = router;