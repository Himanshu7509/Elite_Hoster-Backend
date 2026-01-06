import express from 'express';
import controller from '../controllers/Company.controller.js';
import { protect, adminProtect } from '../middleware/auth.js';

const router = express.Router();

router.route("/")
  .post(protect, controller.createCompany)
  .get(protect, controller.getCompanies);

router.get("/stats", protect, controller.getCompanyStats);

router.route("/:id")
  .get(protect, controller.getCompanyById)
  .put(protect, controller.updateCompany)
  .delete(adminProtect, controller.deleteCompany); // Only admin can delete

export default router;
