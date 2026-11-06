import express from "express";
import { createClient } from "@supabase/supabase-js";
import multer from "multer";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || "";

const supabase =
  supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

if (!supabase) {
  console.warn("SUPABASE_URL or SUPABASE_ANON_KEY not configured; using local fallback data.");
}

function loadJsonFallback(filename: string, defaultVal: any[]) {
  try {
    const filePath = path.join(process.cwd(), "src", "mockData", filename);
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, "utf-8"));
    }
  } catch (err) {
    console.warn(`Could not read fallback ${filename}:`, err);
  }
  return defaultVal;
}

let memoryProducts = loadJsonFallback("fridge.json", []);
let memoryWholesale = loadJsonFallback("wholesale.json", []);
let memoryMeetups = loadJsonFallback("meetups.json", []);

// Ensure src/images directory exists
const imagesDir = path.join(process.cwd(), "src", "images");
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, imagesDir);
  },
  filename: function (_req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());
  app.use("/images", express.static(path.join(process.cwd(), "src", "images")));

  // API routes FIRST
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  app.post("/api/upload", upload.single("image"), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    res.json({ url: `/images/${req.file.filename}` });
  });

  // Products
  app.get("/api/products", async (_req, res) => {
    if (!supabase) {
      return res.json(memoryProducts);
    }
    const { data, error } = await supabase.from("products").select("*");
    if (error) return res.status(500).json({ error: error.message });
    res.json(
      (data || []).map((r) => ({
        ...r,
        flavorProfile: r.flavor_profile,
        isPremium: Boolean(r.is_premium),
      }))
    );
  });

  app.post("/api/products", async (req, res) => {
    const { name, price, stock, category, image, size, flavorProfile, isPremium } = req.body;
    if (!supabase) {
      const newItem = {
        id: Date.now(),
        name,
        price,
        stock,
        category,
        image,
        size,
        flavorProfile: flavorProfile || [],
        isPremium: Boolean(isPremium),
      };
      memoryProducts.unshift(newItem);
      return res.json({ id: newItem.id });
    }
    const { data, error } = await supabase
      .from("products")
      .insert([
        {
          name,
          price,
          stock,
          category,
          image,
          size,
          flavor_profile: flavorProfile || [],
          is_premium: isPremium,
        },
      ])
      .select();
    if (error) return res.status(500).json({ error: error.message });
    res.json({ id: data?.[0]?.id });
  });

  app.put("/api/products/:id", async (req, res) => {
    const { name, price, stock, category, image, size, flavorProfile, isPremium } = req.body;
    if (!supabase) {
      const id = Number(req.params.id);
      memoryProducts = memoryProducts.map((p) =>
        p.id === id
          ? {
              ...p,
              name,
              price,
              stock,
              category,
              image,
              size,
              flavorProfile: flavorProfile || [],
              isPremium: Boolean(isPremium),
            }
          : p
      );
      return res.json({ success: true });
    }
    const { error } = await supabase
      .from("products")
      .update({
        name,
        price,
        stock,
        category,
        image,
        size,
        flavor_profile: flavorProfile || [],
        is_premium: isPremium,
      })
      .eq("id", req.params.id);
    if (error) return res.status(500).json({ error: error.message });
    res.json({ success: true });
  });

  app.delete("/api/products/:id", async (req, res) => {
    if (!supabase) {
      const id = Number(req.params.id);
      memoryProducts = memoryProducts.filter((p) => p.id !== id);
      return res.json({ success: true });
    }
    const { error } = await supabase.from("products").delete().eq("id", req.params.id);
    if (error) return res.status(500).json({ error: error.message });
    res.json({ success: true });
  });

  // Wholesale
  app.get("/api/wholesale", async (_req, res) => {
    if (!supabase) {
      return res.json(memoryWholesale);
    }
    const { data, error } = await supabase.from("wholesale").select("*");
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
  });

  app.post("/api/wholesale", async (req, res) => {
    const { name, qty, price, image, description, options } = req.body;
    if (!supabase) {
      const newCrate = {
        id: Date.now(),
        name,
        qty,
        price,
        image,
        description,
        options: options || [],
      };
      memoryWholesale.unshift(newCrate);
      return res.json({ id: newCrate.id });
    }
    const { data, error } = await supabase
      .from("wholesale")
      .insert([
        {
          name,
          qty,
          price,
          image,
          description,
          options: options || [],
        },
      ])
      .select();
    if (error) return res.status(500).json({ error: error.message });
    res.json({ id: data?.[0]?.id });
  });

  app.put("/api/wholesale/:id", async (req, res) => {
    const { name, qty, price, image, description, options } = req.body;
    if (!supabase) {
      const id = Number(req.params.id);
      memoryWholesale = memoryWholesale.map((c) =>
        c.id === id ? { ...c, name, qty, price, image, description, options: options || [] } : c
      );
      return res.json({ success: true });
    }
    const { error } = await supabase
      .from("wholesale")
      .update({
        name,
        qty,
        price,
        image,
        description,
        options: options || [],
      })
      .eq("id", req.params.id);
    if (error) return res.status(500).json({ error: error.message });
    res.json({ success: true });
  });

  app.delete("/api/wholesale/:id", async (req, res) => {
    if (!supabase) {
      const id = Number(req.params.id);
      memoryWholesale = memoryWholesale.filter((c) => c.id !== id);
      return res.json({ success: true });
    }
    const { error } = await supabase.from("wholesale").delete().eq("id", req.params.id);
    if (error) return res.status(500).json({ error: error.message });
    res.json({ success: true });
  });

  // Meetups
  app.get("/api/meetups", async (_req, res) => {
    if (!supabase) {
      return res.json(memoryMeetups);
    }
    const { data, error } = await supabase.from("meetups").select("*");
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
  });

  app.post("/api/meetups", async (req, res) => {
    const { title, date, time, description, image } = req.body;
    if (!supabase) {
      const newMeetup = {
        id: Date.now(),
        title,
        date,
        time,
        description,
        image: image || null,
      };
      memoryMeetups.unshift(newMeetup);
      return res.json({ id: newMeetup.id });
    }
    const { data, error } = await supabase
      .from("meetups")
      .insert([
        {
          title,
          date,
          time,
          description,
          image: image || null,
        },
      ])
      .select();
    if (error) return res.status(500).json({ error: error.message });
    res.json({ id: data?.[0]?.id });
  });

  app.put("/api/meetups/:id", async (req, res) => {
    const { title, date, time, description, image } = req.body;
    if (!supabase) {
      const id = Number(req.params.id);
      memoryMeetups = memoryMeetups.map((m) =>
        m.id === id ? { ...m, title, date, time, description, image: image || null } : m
      );
      return res.json({ success: true });
    }
    const { error } = await supabase
      .from("meetups")
      .update({
        title,
        date,
        time,
        description,
        image: image || null,
      })
      .eq("id", req.params.id);
    if (error) return res.status(500).json({ error: error.message });
    res.json({ success: true });
  });

  app.delete("/api/meetups/:id", async (req, res) => {
    if (!supabase) {
      const id = Number(req.params.id);
      memoryMeetups = memoryMeetups.filter((m) => m.id !== id);
      return res.json({ success: true });
    }
    const { error } = await supabase.from("meetups").delete().eq("id", req.params.id);
    if (error) return res.status(500).json({ error: error.message });
    res.json({ success: true });
  });

  // Vite middleware for development, static dist for Cloud Run / production
  const isProd = process.env.NODE_ENV === "production" || Boolean(process.env.K_SERVICE);
  if (!isProd) {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
