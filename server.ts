import express from "express";
import { createServer as createViteServer } from "vite";
import { createClient } from "@supabase/supabase-js";
import multer from "multer";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || "";

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing SUPABASE_URL or SUPABASE_ANON_KEY in environment variables.");
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
  app.get("/api/products", async (req, res) => {
    const { data, error } = await supabase.from("products").select("*");
    if (error) return res.status(500).json({ error: error.message });
    res.json(data.map(r => ({ 
      ...r, 
      flavorProfile: r.flavor_profile, // Map snake_case to camelCase if needed
      isPremium: Boolean(r.is_premium) 
    })));
  });

  app.post("/api/products", async (req, res) => {
    const { name, price, stock, category, image, size, flavorProfile, isPremium } = req.body;
    const { data, error } = await supabase.from("products").insert([{
      name, 
      price, 
      stock, 
      category, 
      image, 
      size, 
      flavor_profile: flavorProfile || [], 
      is_premium: isPremium 
    }]).select();
    if (error) return res.status(500).json({ error: error.message });
    res.json({ id: data[0].id });
  });

  app.put("/api/products/:id", async (req, res) => {
    const { name, price, stock, category, image, size, flavorProfile, isPremium } = req.body;
    const { error } = await supabase.from("products").update({
      name, 
      price, 
      stock, 
      category, 
      image, 
      size, 
      flavor_profile: flavorProfile || [], 
      is_premium: isPremium 
    }).eq("id", req.params.id);
    if (error) return res.status(500).json({ error: error.message });
    res.json({ success: true });
  });

  app.delete("/api/products/:id", async (req, res) => {
    const { error } = await supabase.from("products").delete().eq("id", req.params.id);
    if (error) return res.status(500).json({ error: error.message });
    res.json({ success: true });
  });

  // Wholesale
  app.get("/api/wholesale", async (req, res) => {
    const { data, error } = await supabase.from("wholesale").select("*");
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
  });

  app.post("/api/wholesale", async (req, res) => {
    const { name, qty, price, image, description, options } = req.body;
    const { data, error } = await supabase.from("wholesale").insert([{
      name, 
      qty, 
      price, 
      image, 
      description, 
      options: options || [] 
    }]).select();
    if (error) return res.status(500).json({ error: error.message });
    res.json({ id: data[0].id });
  });

  app.put("/api/wholesale/:id", async (req, res) => {
    const { name, qty, price, image, description, options } = req.body;
    const { error } = await supabase.from("wholesale").update({
      name, 
      qty, 
      price, 
      image, 
      description, 
      options: options || [] 
    }).eq("id", req.params.id);
    if (error) return res.status(500).json({ error: error.message });
    res.json({ success: true });
  });

  app.delete("/api/wholesale/:id", async (req, res) => {
    const { error } = await supabase.from("wholesale").delete().eq("id", req.params.id);
    if (error) return res.status(500).json({ error: error.message });
    res.json({ success: true });
  });

  // Meetups
  app.get("/api/meetups", async (req, res) => {
    const { data, error } = await supabase.from("meetups").select("*");
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
  });

  app.post("/api/meetups", async (req, res) => {
    const { title, date, time, description, image } = req.body;
    const { data, error } = await supabase.from("meetups").insert([{
      title, 
      date, 
      time, 
      description, 
      image: image || null 
    }]).select();
    if (error) return res.status(500).json({ error: error.message });
    res.json({ id: data[0].id });
  });

  app.put("/api/meetups/:id", async (req, res) => {
    const { title, date, time, description, image } = req.body;
    const { error } = await supabase.from("meetups").update({
      title, 
      date, 
      time, 
      description, 
      image: image || null 
    }).eq("id", req.params.id);
    if (error) return res.status(500).json({ error: error.message });
    res.json({ success: true });
  });

  app.delete("/api/meetups/:id", async (req, res) => {
    const { error } = await supabase.from("meetups").delete().eq("id", req.params.id);
    if (error) return res.status(500).json({ error: error.message });
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
