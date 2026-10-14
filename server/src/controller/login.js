const db = require('../models/db'); 

const loginUser = async (req, res) => {
  try {
    const { gmail, password } = req.body;

    // ตรวจสอบว่าส่งข้อมูลมาครบหรือไม่
    if (!gmail || !password) {
      return res.status(400).json({ error: 'กรุณากรอกข้อมูลให้ครบถ้วน' });
    }

    // ค้นหาผู้ใช้ในฐานข้อมูล (สมมติว่าคุณสร้างตาราง users ไว้แล้ว)
    const [users] = await db.execute(
      'SELECT id, gmail, firstname, lastname, role FROM user WHERE gmail = ? AND password = ?',
      [gmail, password]
    );

    // ถ้าไม่พบผู้ใช้ หรือรหัสผ่านไม่ตรง
    if (users.length === 0) {
      return res.status(401).json({ error: 'ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง' });
    }

    // ล็อกอินสำเร็จ
    const user = users[0];
    res.status(200).json({ 
      message: 'เข้าสู่ระบบสำเร็จ', 
      user: {
        id: user.id,
        gmail: user.gmail,
        firstName: user.firstname,
        lastName: user.lastname,
        role: user.role
      }
    });

  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ error: 'เกิดข้อผิดพลาดที่เซิร์ฟเวอร์' });
  }
};

module.exports = { loginUser };