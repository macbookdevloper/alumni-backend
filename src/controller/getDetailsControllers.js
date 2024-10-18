const alumniModel = require("../model/alumni_model");

async function getallAlumni(req, res) {
  try {
    const loggedInAlumni = await alumniModel.find({ login: true });

    return res.status(200).json({
      data: loggedInAlumni,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Alumni is Not Register",
      error: console.log(error),
    });
  }
}
async function getDetailsById(req, res) {
  try {
    const enrollementNumber = req.params.id;
    const alumniDetails = await alumniModel.findOne({
      enrollementNumber: enrollementNumber,
    });
    if (!alumniDetails) {
      return res.status(404).json({
        success: false,
        massage: "user details not found",
      });
    }
    if (alumniDetails.login != true) {
      return res.status(404).json({
        message: "First Sign up Your Account",
        success: false,
      });
    }

    return res.status(200).json({
      Details: alumniDetails,
      success: true,
    });
    
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = { getallAlumni, getDetailsById };
