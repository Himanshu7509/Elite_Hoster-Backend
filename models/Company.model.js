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
      required: true,
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
  },
  { timestamps: true }
);

const Company = mongoose.model("Company", CompanySchema);

export default Company;
