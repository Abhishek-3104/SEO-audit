
// Check if user is authenticated
const checkAuthStatus = (req, res) => {
    if (req.isAuthenticated()) {
      return res.status(200).json({
        isAuthenticated: true,
        user: req.user
      });
    }
    return res.status(200).json({ isAuthenticated: false });
  };
  
  // Logout user
const logout = (req, res) => {
    req.logout(function(err) {
      if (err) {
        return res.status(500).json({ message: 'Error logging out' });
      }
      res.status(200).json({ message: 'Successfully logged out' });
    });
  };
  
  // Google authentication callback
const googleCallback = (req, res) => {
    res.redirect(process.env.CLIENT_URL);
  };
  
  // Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401).json({ message: 'Unauthorized' });
  };
  
  // Example protected route handler
const getProtectedData = (req, res) => {
    res.json({ 
      message: 'This is protected data', 
      user: req.user 
    });
  };

module.exports = {
    checkAuthStatus,
    logout,
    googleCallback,
    isAuthenticated,
    getProtectedData
}