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
      required: true,
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
      match: [/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number'],
    },
    
    alternatePhoneNumber: {
      type: String,
      required: false,
      match: [/^\+?[1-9]\d{1,14}$/, 'Please enter a valid alternate phone number'],
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
      match: [/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Please enter a valid PAN number'],
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
