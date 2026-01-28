import express from 'express';
import controller from '../controllers/Company.controller.js';
import { protect, adminProtect } from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.route("/")
  .post(protect, upload.single('uploadDocument'), controller.createCompany)
  .get(protect, controller.getCompanies);

router.get("/stats", protect, controller.getCompanyStats);

router.get("/categories", protect, controller.getCommonCategories);

router.route("/:id")
  .get(protect, controller.getCompanyById)
  .put(protect, upload.single('uploadDocument'), controller.updateCompany)
  .delete(adminProtect, controller.deleteCompany); // Only admin can delete

export default router;
