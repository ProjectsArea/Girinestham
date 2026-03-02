import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import csurf from "csurf";
import { APP_CONFIG, SECURITY_CONSTANTS, ERROR_MESSAGES, HTTP_STATUS } from "./constants/index.js";
import { logApplicationEvent } from "./utils/logger.js";

dotenv.config();
const app = express();

/* ================= SECURITY HEADERS ================= */
app.use(helmet());

/* ================= TRUST PROXY ================= */
app.set("trust proxy", APP_CONFIG.TRUST_PROXY);

/* ================= CORS ================= */
app.use(cors({
   origin: APP_CONFIG.CORS_ORIGINS,
   credentials: APP_CONFIG.CORS_CREDENTIALS
}));

/* ================= RATE LIMIT ================= */
const limiter = rateLimit({
   windowMs: SECURITY_CONSTANTS.RATE_LIMIT_WINDOW_MS,
   max: SECURITY_CONSTANTS.RATE_LIMIT_MAX_REQUESTS,
   message: ERROR_MESSAGES.TOO_MANY_REQUESTS,
   handler: (req, res) => {
      logApplicationEvent({
         logLevel: "WARNING",
         logType: "security",
         method: req.method,
         endpoint: req.originalUrl,
         statusCode: HTTP_STATUS.TOO_MANY_REQUESTS,
         message: "Rate limit exceeded",
         responseTime: 0,
         req,
      });

      res.status(HTTP_STATUS.TOO_MANY_REQUESTS).json({
         message: ERROR_MESSAGES.TOO_MANY_REQUESTS
      });
   }
});
app.use(limiter);

/* ================= BODY + COOKIES ================= */
app.use(express.json());
app.use(cookieParser());

/* ================= GLOBAL REQUEST LOGGER ================= */
app.use((req, res, next) => {
   const startTime = Date.now();

   res.on("finish", () => {
      const responseTime = Date.now() - startTime;

      logApplicationEvent({
         logLevel: res.statusCode >= 500
            ? "ERROR"
            : res.statusCode >= 400
            ? "WARNING"
            : "INFO",
         logType: "api_request",
         method: req.method,
         endpoint: req.originalUrl,
         adminId: req.admin?.id || null,
         userId: req.user?.id || null,
         statusCode: res.statusCode,
         message: `API ${req.method} ${req.originalUrl}`,
         responseTime,
         req,
      });
   });

   next();
});

/* ================= CSRF ================= */
const csrfProtection = csurf({
   cookie: SECURITY_CONSTANTS.COOKIE_OPTIONS
});
app.use(csrfProtection);

/* ================= PUBLIC ROUTES ================= */
import homeRoutes from "./routes/public/homeRoutes.js";
import aboutRoutes from "./routes/public/aboutRoutes.js";
import tournamentRoutes from "./routes/public/tournamentRoutes.js";
import contactRoutes from "./routes/public/contactRoutes.js";
import donateRoutes from "./routes/public/donateRoutes.js";

app.use(APP_CONFIG.API_ROUTES.HOME, homeRoutes);
app.use(APP_CONFIG.API_ROUTES.ABOUT, aboutRoutes);
app.use(APP_CONFIG.API_ROUTES.TOURNAMENTS, tournamentRoutes);
app.use(APP_CONFIG.API_ROUTES.CONTACT, contactRoutes);
app.use(APP_CONFIG.API_ROUTES.DONATE, donateRoutes);

/* ================= ADMIN ROUTES ================= */
import adminRoutes from "./routes/admin/adminRoutes.js";
app.use(APP_CONFIG.API_ROUTES.ADMIN, adminRoutes);

/* ================= ERROR HANDLER ================= */
app.use((err, req, res, next) => {

   const responseTime = 0;

   if (err.code === "EBADCSRFTOKEN") {

      logApplicationEvent({
         logLevel: "WARNING",
         logType: "security",
         method: req.method,
         endpoint: req.originalUrl,
         statusCode: HTTP_STATUS.FORBIDDEN,
         message: "Invalid CSRF token",
         stackTrace: err.stack,
         responseTime,
         req,
      });

      return res.status(HTTP_STATUS.FORBIDDEN).json({
         message: ERROR_MESSAGES.INVALID_CSRF_TOKEN
      });
   }

   logApplicationEvent({
      logLevel: "ERROR",
      logType: "system",
      method: req.method,
      endpoint: req.originalUrl,
      statusCode: err.status || 500,
      message: err.message || "Unhandled server error",
      stackTrace: err.stack,
      responseTime,
      req,
   });

   res.status(err.status || 500).json({
      message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR
   });
});

/* ================= SERVER START ================= */
const PORT = process.env.PORT || APP_CONFIG.DEFAULT_PORT;

app.listen(PORT, () => {
   console.log(`🚀 Server running on port ${PORT}`);
import express from 'express';

const app = express();
const PORT = 5000;

app.get("/", (req, res) => {
  res.send("Welcome to backend");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});