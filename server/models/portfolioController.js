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
