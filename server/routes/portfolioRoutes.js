const express = require("express");
const {
  createPortfolio,
  getPortfolios,
  getPortfolioById,
  updatePortfolio,
  deletePortfolio,
} = require("../controllers/portfolioController");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getPortfolios);
router.get("/:id", getPortfolioById);
router.post("/", protect, authorizeRoles("designer"), createPortfolio);
router.put("/:id", protect, authorizeRoles("designer"), updatePortfolio);
router.delete("/:id", protect, authorizeRoles("designer"), deletePortfolio);

module.exports = router;
