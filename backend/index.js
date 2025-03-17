require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// PostgreSQL Connection
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "Repo",
  password: "newpassword",
  port: 5432,
});

pool.connect((err) => {
  if (err) {
    console.error("Database connection error:", err);
  } else {
    console.log("Connected to PostgreSQL!");
  }
});



// Store personal info and send confirmation code
app.post("/personal-info", async (req, res) => {
  const { fullName, email, birthDate, gender, phone, role } = req.body;

  if (!fullName || !email || !birthDate || !gender || !phone || !role) {
    return res.status(400).json({ error: "Все поля обязательны" });
  }

  try {
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1 OR phone = $2",
      [email, phone]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: "Email или телефон уже зарегистрированы" });
    }

    await pool.query(
      "INSERT INTO users (full_name, email, birth_date, gender, phone, role) VALUES ($1, $2, $3, $4, $5, $6)",
      [fullName, email, birthDate, gender, phone, role]
    );

    res.status(200).json({ message: "Личная информация сохранена. Код подтверждения отправлен.", phone });
  } catch (error) {
    console.error("Ошибка БД:", error);
    res.status(500).json({ error: "Ошибка сервера, попробуйте еще раз" });
  }
});

  
  

// Verify confirmation code (simulate check)
app.post("/verify-code", (req, res) => {
  const { phone, code } = req.body;
  const correctCode = "1234"; 

  if (code === correctCode) {
    res.status(200).json({ message: "Code verified", phone });
  } else {
    res.status(400).json({ error: "Incorrect code" });
  }
});

app.post("/register", async (req, res) => {
  const { phone, username, password } = req.body;

  if (!phone || !username || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const result = await pool.query(
      "UPDATE users SET username = $1, password = $2 WHERE phone = $3 RETURNING *",
      [username, password, phone]
    );

    if (result.rowCount > 0) {
      const user = result.rows[0];

      // Генерируем токен при регистрации
      const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: "24h" });

      res.status(201).json({ message: "User registered successfully", user, token });
    } else {
      res.status(404).json({ error: "Phone number not found" });
    }
  } catch (error) {
    console.error("Database Error:", error);
    res.status(500).json({ error: "Server error, please try again" });
  }
});

  
  // User login
  app.post("/login", async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const result = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
  
      if (result.rows.length > 0 && result.rows[0].password === password) {
        const user = result.rows[0];
  
        // Генерируем JWT токен
        const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: "24h" });
  
        res.json({ message: "Login successful", user, token });
      } else {
        res.status(401).json({ error: "Invalid username or password" });
      }
    } catch (error) {
      console.error("Database Error:", error);
      res.status(500).json({ error: "Server error, please try again" });
    }
  });
  


  const jwt = require("jsonwebtoken"); // Подключаем JWT
  const secretKey = "your_secret_key"; // Секретный ключ (должен быть в .env)
  
  app.get("/profile", async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.status(401).json({ error: "Нет токена" });
      }
  
      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, secretKey);
  
      const userId = decoded.id; // Здесь используем `id`
  
      const result = await pool.query("SELECT * FROM users WHERE id = $1", [userId]);
  
      if (result.rows.length > 0) {
        res.json(result.rows[0]);
      } else {
        res.status(404).json({ error: "Профиль не найден" });
      }
    } catch (error) {
      console.error("Ошибка получения профиля:", error);
      res.status(500).json({ error: "Ошибка сервера" });
    }
  });
  
  

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
