import mongoose from 'mongoose';

const CompanySchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
      trim: true,
    },

    websiteUrl: {
      type: String,
      required: false,
    },

    companyEmail: {
      type: String,
      required: false,
      lowercase: true,
    },

    industry: {
      type: String,
      required: true,
    },

    tags: {
      type: [String], // React, Node, AWS, etc
      default: [],
    },

    categories: {
      type: [String], // Common: IT, Finance, Healthcare, Education, E-commerce, etc. Also accepts custom categories.
      default: [],
    },

    status: {
      type: String,
      enum: ["New", "Contacted", "Responded", "Shortlisted"],
      default: "New",
    },
    
    // Additional fields
    personName: {
      type: String,
      required: false,
      trim: true,
    },
    
    phoneNumber: {
      type: String,
      required: false,
    },
    
    alternatePhoneNumber: {
      type: String,
      required: false,
    },
    
    gstNumber: {
      type: String,
      required: false,
      uppercase: true,
      trim: true,
    },
    
    panNumber: {
      type: String,
      required: false,
      uppercase: true,
      trim: true,
    },
    
    // Company document field
    uploadDocument: { type: String }, // URL to company document file in S3
    
    // Reference to the user who created this company
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

const Company = mongoose.model("Company", CompanySchema);

export default Company;
