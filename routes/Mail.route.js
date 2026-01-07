import express from "express";
import { 
  sendSingleMail, 
  sendGroupMail, 
  uploadFiles,
  getSentMails,
  getSentMailById
} from "../controllers/Mail.controller.js";
import { protect } from "../middleware/auth.js";

const mailRouter = express.Router();

// Apply file upload middleware to routes that need it
mailRouter.post("/send-single", protect, uploadFiles.array('attachments', 5), sendSingleMail);
mailRouter.post("/send-group", protect, uploadFiles.array('attachments', 5), sendGroupMail);

// GET routes for tracking sent emails
mailRouter.get("/", protect, getSentMails);
mailRouter.get("/:id", protect, getSentMailById);

export default mailRouter;