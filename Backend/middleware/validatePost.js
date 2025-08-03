function validatePost(req, res, next) {
    const { name, bloodType, location, urgency, problem } = req.body;
  
    if (!name || !bloodType || !location || !urgency || !problem) {
      return res.status(400).json({ message: 'All required fields must be filled' });
    }
  
    next();
  }
  
  module.exports = validatePost;