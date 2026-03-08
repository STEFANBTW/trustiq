import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import multer from "multer";
import path from "path";
import fs from "fs";
import { products } from "./src/data/products";
import { crateProducts } from "./src/data/wholesale";
import { meetupEvents } from "./src/data/meetups";

// Ensure src/images directory exists
const imagesDir = path.join(process.cwd(), "src", "images");
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, imagesDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Initialize DB
const db = new Database("database.sqlite");

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    price REAL,
    stock INTEGER,
    category TEXT,
    image TEXT,
    size TEXT,
    flavorProfile TEXT,
    isPremium BOOLEAN
  );

  CREATE TABLE IF NOT EXISTS wholesale (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    qty TEXT,
    price TEXT,
    image TEXT,
    description TEXT,
    options TEXT
  );

  CREATE TABLE IF NOT EXISTS meetups (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    date TEXT,
    time TEXT,
    description TEXT,
    image TEXT
  );
`);

// Seed data if empty
const productCount = db.prepare("SELECT COUNT(*) as count FROM products").get() as { count: number };
if (productCount.count === 0) {
  const insertProduct = db.prepare("INSERT INTO products (name, price, stock, category, image, size, flavorProfile, isPremium) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
  const insertProductTransaction = db.transaction((items) => {
    for (const item of items) {
      insertProduct.run(item.name, item.price, item.stock, item.category, item.image, item.size, JSON.stringify(item.flavorProfile || []), item.isPremium ? 1 : 0);
    }
  });
  insertProductTransaction(products);
}

const wholesaleCount = db.prepare("SELECT COUNT(*) as count FROM wholesale").get() as { count: number };
if (wholesaleCount.count === 0) {
  const insertWholesale = db.prepare("INSERT INTO wholesale (name, qty, price, image, description, options) VALUES (?, ?, ?, ?, ?, ?)");
  const insertWholesaleTransaction = db.transaction((items) => {
    for (const item of items) {
      insertWholesale.run(item.name, item.qty, item.price, item.image, item.description, JSON.stringify(item.options || []));
    }
  });
  insertWholesaleTransaction(crateProducts);
}

const meetupCount = db.prepare("SELECT COUNT(*) as count FROM meetups").get() as { count: number };
if (meetupCount.count === 0) {
  const insertMeetup = db.prepare("INSERT INTO meetups (title, date, time, description, image) VALUES (?, ?, ?, ?, ?)");
  const insertMeetupTransaction = db.transaction((items) => {
    for (const item of items) {
      insertMeetup.run(item.title, item.date, item.time, item.description, item.image || null);
    }
  });
  insertMeetupTransaction(meetupEvents);
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  app.use("/images", express.static(path.join(process.cwd(), "src", "images")));

  // API routes FIRST
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.post("/api/upload", upload.single("image"), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    res.json({ url: `/images/${req.file.filename}` });
  });

  // Products
  app.get("/api/products", (req, res) => {
    const rows = db.prepare("SELECT * FROM products").all() as any[];
    res.json(rows.map(r => ({ ...r, flavorProfile: JSON.parse(r.flavorProfile), isPremium: Boolean(r.isPremium) })));
  });
  app.post("/api/products", (req, res) => {
    const { name, price, stock, category, image, size, flavorProfile, isPremium } = req.body;
    const info = db.prepare("INSERT INTO products (name, price, stock, category, image, size, flavorProfile, isPremium) VALUES (?, ?, ?, ?, ?, ?, ?, ?)").run(name, price, stock, category, image, size, JSON.stringify(flavorProfile || []), isPremium ? 1 : 0);
    res.json({ id: info.lastInsertRowid });
  });
  app.put("/api/products/:id", (req, res) => {
    const { name, price, stock, category, image, size, flavorProfile, isPremium } = req.body;
    db.prepare("UPDATE products SET name=?, price=?, stock=?, category=?, image=?, size=?, flavorProfile=?, isPremium=? WHERE id=?").run(name, price, stock, category, image, size, JSON.stringify(flavorProfile || []), isPremium ? 1 : 0, req.params.id);
    res.json({ success: true });
  });
  app.delete("/api/products/:id", (req, res) => {
    db.prepare("DELETE FROM products WHERE id=?").run(req.params.id);
    res.json({ success: true });
  });

  // Wholesale
  app.get("/api/wholesale", (req, res) => {
    const rows = db.prepare("SELECT * FROM wholesale").all() as any[];
    res.json(rows.map(r => ({ ...r, options: JSON.parse(r.options) })));
  });
  app.post("/api/wholesale", (req, res) => {
    const { name, qty, price, image, description, options } = req.body;
    const info = db.prepare("INSERT INTO wholesale (name, qty, price, image, description, options) VALUES (?, ?, ?, ?, ?, ?)").run(name, qty, price, image, description, JSON.stringify(options || []));
    res.json({ id: info.lastInsertRowid });
  });
  app.put("/api/wholesale/:id", (req, res) => {
    const { name, qty, price, image, description, options } = req.body;
    db.prepare("UPDATE wholesale SET name=?, qty=?, price=?, image=?, description=?, options=? WHERE id=?").run(name, qty, price, image, description, JSON.stringify(options || []), req.params.id);
    res.json({ success: true });
  });
  app.delete("/api/wholesale/:id", (req, res) => {
    db.prepare("DELETE FROM wholesale WHERE id=?").run(req.params.id);
    res.json({ success: true });
  });

  // Meetups
  app.get("/api/meetups", (req, res) => {
    const rows = db.prepare("SELECT * FROM meetups").all();
    res.json(rows);
  });
  app.post("/api/meetups", (req, res) => {
    const { title, date, time, description, image } = req.body;
    const info = db.prepare("INSERT INTO meetups (title, date, time, description, image) VALUES (?, ?, ?, ?, ?)").run(title, date, time, description, image || null);
    res.json({ id: info.lastInsertRowid });
  });
  app.put("/api/meetups/:id", (req, res) => {
    const { title, date, time, description, image } = req.body;
    db.prepare("UPDATE meetups SET title=?, date=?, time=?, description=?, image=? WHERE id=?").run(title, date, time, description, image || null, req.params.id);
    res.json({ success: true });
  });
  app.delete("/api/meetups/:id", (req, res) => {
    db.prepare("DELETE FROM meetups WHERE id=?").run(req.params.id);
    res.json({ success: true });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static("dist"));
    app.get("*", (req, res) => {
      res.sendFile("dist/index.html", { root: "." });
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
