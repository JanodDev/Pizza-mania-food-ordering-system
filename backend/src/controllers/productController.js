const Product = require("../models/Product");

exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    const product = new Product(req.body);
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    next(error);
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    // Handle invalid ID format
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid product ID format" });
    }
    next(error);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    // Handle invalid ID format
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid product ID format" });
    }
    // Handle validation errors
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation Error",
        errors: Object.values(error.errors).map((err) => err.message),
      });
    }
    next(error);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    // Handle invalid ID format
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid product ID format" });
    }

    next(error);
  }
};

exports.getProductsByCategory = async (req, res, next) => {
  try {
    const { category } = req.params;

    const products = await Product.find({ category: category });

    if (!products || products.length === 0) {
      return res.status(404).json({
        message: `No products found in category: ${category}`,
      });
    }

    res.json(products);
  } catch (error) {
    next(error);
  }
};
