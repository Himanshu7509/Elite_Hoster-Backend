import Company from "../models/Company.model.js";
import { uploadFileToS3, deleteFileFromS3 } from "../utils/uploadFileToS3.js";
import commonCategories from "../utils/commonCategories.js";

/**
 * CREATE Company
 */
// @desc    Create company
// @route   POST /api/companies
// @access  Private
const createCompany = async (req, res) => {
  try {
    let companyData = { 
      ...req.body,
      createdBy: req.user._id  // Set the user who created this company
    };
    
    // Handle document upload if present
    if (req.file) {
      const documentUrl = await uploadFileToS3(req.file, 'company-documents');
      companyData.uploadDocument = documentUrl;
    }
    
    const company = await Company.create(companyData);
    res.status(201).json({ success: true, data: company });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * GET All Companies (Search + Filter + Sort)
 */
// @desc    Get all companies
// @route   GET /api/companies
// @access  Private
const getCompanies = async (req, res) => {
  try {
    const { search, status, sort } = req.query;

    // Check if user is admin or developer - if not, only show companies created by this user
    let query = {};
    if (req.user.role !== 'admin' && req.user.role !== 'developer') {
      query.createdBy = req.user._id;  // Only show companies created by this user
    }

    if (search) {
      query.companyName = { $regex: search, $options: "i" };
    }

    if (status && status !== "All") {
      query.status = status;
    }

    // Populate the createdBy field to show employee name
    let companies = Company.find(query).populate('createdBy', 'name email');

    if (sort === "name") {
      companies = companies.sort({ companyName: 1 });
    } else {
      companies = companies.sort({ createdAt: -1 });
    }

    const data = await companies;
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * GET Single Company
 */
// @desc    Get company by ID
// @route   GET /api/companies/:id
// @access  Private
const getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id).populate('createdBy', 'name email');
    if (!company)
      return res.status(404).json({ message: "Company not found" });

    res.json({ success: true, data: company });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * UPDATE Company
 */
// @desc    Update company
// @route   PUT /api/companies/:id
// @access  Private
const updateCompany = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      return res.status(404).json({ success: false, message: 'Company not found' });
    }
    
    let companyData = { ...req.body };
    
    // Handle document upload if present
    if (req.file) {
      // If company already has a document, delete the old one from S3
      if (company.uploadDocument) {
        await deleteFileFromS3(company.uploadDocument);
      }
      
      const documentUrl = await uploadFileToS3(req.file, 'company-documents');
      companyData.uploadDocument = documentUrl;
    }
    
    const updatedCompany = await Company.findByIdAndUpdate(
      req.params.id,
      companyData,
      { new: true }
    );
    
    res.json({ success: true, data: updatedCompany });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * DELETE Company
 */
// @desc    Delete company
// @route   DELETE /api/companies/:id
// @access  Private (Admin only)
const deleteCompany = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      return res.status(404).json({ success: false, message: 'Company not found' });
    }
    
    // If company has a document, delete it from S3
    if (company.uploadDocument) {
      await deleteFileFromS3(company.uploadDocument);
    }
    
    await Company.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Company deleted" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * DASHBOARD COUNTS
 */
// @desc    Get company statistics
// @route   GET /api/companies/stats
// @access  Private
const getCompanyStats = async (req, res) => {
  try {
    const total = await Company.countDocuments();
    const responded = await Company.countDocuments({ status: "Responded" });
    const shortlisted = await Company.countDocuments({ status: "Shortlisted" });
    const contacted = await Company.countDocuments({ status: "Contacted" });

    res.json({
      success: true,
      data: { total, responded, shortlisted, contacted },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * GET Common Categories for Dropdown
 */
// @desc    Get common categories for dropdown
// @route   GET /api/companies/categories
// @access  Private
const getCommonCategories = async (req, res) => {
  try {
    res.json({ success: true, data: commonCategories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export default {
  createCompany,
  getCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
  getCompanyStats,
  getCommonCategories
};
