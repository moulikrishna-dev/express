import express from "express";
import protect from '../middleware/authMiddleware.js';
import weatherController from "../controllers/weatherController.js";

let router = express.Router();

router.get('/', protect, weatherController.getWeather);

export default router;