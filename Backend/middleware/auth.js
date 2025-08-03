function requireAuth(req, res, next) {
    // here you’d check token/session/header etc.
    const auth = req.headers.authorization;
    if (!auth) return res.status(403).json({ message: 'Unauthorized' });
  
    next();
  }
  
  module.exports = requireAuth;