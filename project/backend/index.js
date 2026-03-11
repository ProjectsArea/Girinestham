import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import csrf from "csurf";
import { APP_CONFIG } from "./constants/appConfig.js";
import { SECURITY_CONSTANTS } from "./constants/security.js";
import { ERROR_MESSAGES, HTTP_STATUS } from "./constants/httpStatus.js";
import { logApplicationEvent } from "./utils/logger.js";

dotenv.config();
const app = express();

/* ========================================= BODY + COOKIES ========================================= */
app.use(express.json());
app.use(cookieParser());

/* ========================================= SECURITY HEADERS ========================================== */
/* ------------------ HELMET ------------------ */
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  }),
);

/* ------------------ CORS ------------------ */
app.use(
  cors({
    //cors
    origin: APP_CONFIG.CORS_ORIGINS,
    credentials: APP_CONFIG.CORS_CREDENTIALS,
  }),
);

/* ------------------ RATE LIMIT ------------------ */
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
      message: ERROR_MESSAGES.TOO_MANY_REQUESTS,
    });
  },
});
app.use(limiter);

/* ------------------ CSRF PROTECTION ------------------ */
const csrfProtection = csrf({
  cookie: {
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  },
  handler: (req, res) => {
    logApplicationEvent({
      logLevel: "WARNING",
      logType: "security",
      method: req.method,
      endpoint: req.originalUrl,
      statusCode: HTTP_STATUS.FORBIDDEN,
      message: "CSRF token missing or invalid",
      responseTime: 0,
      req,
    });
    res.status(HTTP_STATUS.FORBIDDEN).json({
      message: ERROR_MESSAGES.FORBIDDEN,
    });
  },
});
app.use(csrfProtection);

app.get("/api/csrf-token", (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

/* ========================================= ROUTES ========================================== */

app.get("/", (req, res) => {
  res.send("welcome to backend : Girinestham Project");
});

/* ----------------- PUBLIC ROUTES ----------------- */
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

/* ----------------- ADMIN ROUTES ----------------- */
import adminAuthRoutes from "./routes/admin/authRoutes.js";
import adminRoutes from "./routes/admin/adminRoutes.js";
app.use(APP_CONFIG.API_ROUTES.ADMIN_AUTH, adminAuthRoutes);
app.use(APP_CONFIG.API_ROUTES.ADMIN, adminRoutes);

/* ----------------- VOLUNTEER ROUTES ----------------- */
import studentRoutes from "./routes/volunteer/studentRoutes.js";
import paymentRoutes from "./routes/volunteer/paymentRoutes.js";
app.use(APP_CONFIG.API_ROUTES.STUDENTS, studentRoutes);
app.use(APP_CONFIG.API_ROUTES.PAYMENTS, paymentRoutes);

/* ----------------- SERVER START ----------------- */
const PORT = process.env.PORT || APP_CONFIG.DEFAULT_PORT;

app.listen(PORT, () => {
  console.log(`🚀 HTTP Server running on port http://localhost:${PORT}/`);
});
