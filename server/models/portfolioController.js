const Portfolio = require("../models/Portfolio");

exports.createPortfolio = async (req, res) => {
  try {
    const { title, description, category, images, style } = req.body;
    if (!title || !description || !category)
      return res.status(400).json({ message: "Title, description and category are required" });

    const portfolio = await Portfolio.create({
      designer: req.user.id,
      title,
      description,
      category,
      images,
      style,
    });
    res.status(201).json(portfolio);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.getPortfolios = async (req, res) => {
  try {
    const { category, style, designer } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (style) filter.style = style;
    if (designer) filter.designer = designer;

    const portfolios = await Portfolio.find(filter)
      .populate("designer", "name email")
      .sort({ createdAt: -1 });
    res.json(portfolios);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.getPortfolioById = async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id).populate("designer", "name email");
    if (!portfolio) return res.status(404).json({ message: "Portfolio not found" });
    res.json(portfolio);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.updatePortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);
    if (!portfolio) return res.status(404).json({ message: "Portfolio not found" });
    if (portfolio.designer.toString() !== req.user.id)
      return res.status(403).json({ message: "Not your portfolio" });

    const updated = await Portfolio.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.deletePortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);
    if (!portfolio) return res.status(404).json({ message: "Portfolio not found" });
    if (portfolio.designer.toString() !== req.user.id)
      return res.status(403).json({ message: "Not your portfolio" });

    await portfolio.deleteOne();
    res.json({ message: "Portfolio deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
