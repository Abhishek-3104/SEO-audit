// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
  checkAuthStatus,
  logout,
  googleCallback,
  isAuthenticated,
  getProtectedData,
} = require("../controllers/auth.controllers");

// Google OAuth routes
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: process.env.CLIENT_URL,
    session: true,
  }),
  googleCallback
);

// Check authentication status
router.get("/status", checkAuthStatus);

// Logout route
router.get("/logout", logout);

// Protected route example
router.get("/protected", isAuthenticated, getProtectedData);

module.exports = router;
