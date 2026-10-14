const express = require("express");
const cors = require("cors");
const path = require("path"); // 1. เพิ่มบรรทัดนี้

const loginRoutes = require('./routes/login');
const nearmissRoutes = require('./routes/NearMissForm');

const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use('/api/login', loginRoutes);

// ล็อคเป้าหมายโฟลเดอร์แบบ Absolute Path
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads'))); 

app.use('/api/nearmiss', nearmissRoutes);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});