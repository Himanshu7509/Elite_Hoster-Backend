import Company from "../models/Company.model.js";

// @desc    Get all companies (Developer only)
// @route   GET /api/developer/companies
// @access  Private (Developer only)
export const getCompanies = async (req, res) => {
  try {
    // Developers can see all companies
    const companies = await Company.find({}).populate('createdBy', 'name email');
    
    res.json({ success: true, data: companies });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get company by ID (Developer only)
// @route   GET /api/developer/companies/:id
// @access  Private (Developer only)
export const getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id).populate('createdBy', 'name email');
    
    if (!company) {
      return res.status(404).json({ success: false, message: 'Company not found' });
    }
    
    res.json({ success: true, data: company });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};