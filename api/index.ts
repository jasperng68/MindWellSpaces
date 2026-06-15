import express, { type Request, Response, NextFunction } from "express";

let app: express.Express;
let initError: unknown;

try {
  const { registerRoutes } = await import("../server/routes.js"); // ESM requires .js extension
  app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  registerRoutes(app);
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
  });
} catch (err) {
  initError = err;
  app = express();
  app.use((_req: Request, res: Response) => {
    res.status(500).json({
      error: "Server initialization failed",
      detail: String(initError),
      stack: (initError as any)?.stack,
    });
  });
}

export default app;
