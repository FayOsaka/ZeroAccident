const db = require('../models/db'); 

// 1. ฟังก์ชันบันทึกข้อมูล
const submitForm = async (req, res) => {
  try {
    const {
      fullname, age, gender, division, position, work_time,
      incident_date, incident_time, location, incident_scene,
      incident_nature, cause_type, cause_detail,
      immediate_action, preventive_measures
    } = req.body;

    const image = req.file ? req.file.filename : null;

    const sql = `
      INSERT INTO form (
        fullname, age, gender, division, position, work_time,
        incident_date, incident_time, location, incident_scene,
        incident_nature, cause_type, cause_detail,
        immediate_action, preventive_measures, image, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'รอดำเนินการ')
    `;

    const values = [
      fullname, age, gender, division, position, work_time,
      incident_date, incident_time, location, incident_scene,
      incident_nature, cause_type, cause_detail,
      immediate_action, preventive_measures, image
    ];

    const [result] = await db.execute(sql, values);

    res.status(201).json({
      message: 'บันทึกรายงานอุบัติการณ์สำเร็จ',
      insertId: result.insertId,
      imagePath: image
    });

  } catch (error) {
    console.error('Submit Near Miss Error:', error);
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการบันทึกข้อมูล' });
  }
};

// 2. ฟังก์ชันดึงข้อมูลทั้งหมด (เพิ่มใหม่สำหรับหน้า Tracking)
const getForms = async (req, res) => {
  try {
    // ดึงข้อมูลทั้งหมด เรียงจากวันที่และเวลาล่าสุด
    const sql = "SELECT * FROM form ORDER BY incident_date DESC, incident_time DESC";
    
    // ใช้ db.execute หรือ db.query ก็ได้
    const [results] = await db.execute(sql);
    
    // ส่งข้อมูลกลับไปให้ React
    res.status(200).json(results);
  } catch (error) {
    console.error('Get Forms Error:', error);
    res.status(500).json({ error: 'ไม่สามารถดึงข้อมูลได้' });
  }
};

// 3. ฟังก์ชันสำหรับอัปเดตสถานะ
const updateStatus = async (req, res) => {
  try {
    const { id } = req.params; // รับ ID ของฟอร์ม
    const { status } = req.body; // รับสถานะใหม่ที่ส่งมา

    const sql = "UPDATE form SET status = ? WHERE id = ?";
    const [result] = await db.execute(sql, [status, id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'ไม่พบข้อมูลฟอร์มนี้' });
    }

    res.status(200).json({ message: 'อัปเดตสถานะเรียบร้อยแล้ว' });
  } catch (error) {
    console.error('Update Status Error:', error);
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการอัปเดตสถานะ' });
  }
};

module.exports = { submitForm, getForms, updateStatus };