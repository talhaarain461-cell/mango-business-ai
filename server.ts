import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware for setting cache headers on images
  const setCacheHeaders = (res: express.Response, path: string) => {
    const images = /\.(jpg|jpeg|png|gif|webp|svg|ico)$/i;
    if (images.test(path)) {
      // Set cache for 30 days
      res.setHeader('Cache-Control', 'public, max-age=2592000');
    }
  };

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });

    // Use vite's connect instance as middleware
    app.use(vite.middlewares);
  } else {
    // Serve static files from the dist folder with cache headers
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath, {
      setHeaders: setCacheHeaders
    }));

    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
