const Product = require("../Models/productsModels");
const emailService = require("../services/emailServices");

const createProduct = async (req, res) => {
  try {
    const { name, price, description, sizes, colors, brand } = req.body;
    const product = new Product({
      name,
      price,
      description,
      sizes,
      colors,
      brand,
    });

    const result = await product.save();
    res.status(201).json({
      status: "Success",
      message: "Producto creado exitosamente",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "Error",
      message: "No se pùdo crear el producto",
      error: error.message,
    });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();

    await emailService.sendEmail();

    res.status(200).json({
      status: "Success",
      message: "Producto obtenido exitosamente",
      data: products,
    });
  } catch (error) {
    console.log("→ Error en getAllProducts:", error.message);

    res.status(400).json({
      status: "Error",
      message: "No se pudieron obtener los productos",
      error: error.message,
    });
  }
};

/*const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    await emailService.sendEmail();
    res.status(200).json({
      status: "Success",
      message: "Producto Obtenido exitosamente",
      data: products,
    });
  } catch (error) {
    res.status(400).json({
      status: "Error",
      message: "No se pudieron obtenr los prductos",
      error: error.message,
    });
  }
};*/

const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
      res.status(200).json({
        status: "Success",
        message: "Producto obtenido exitosamente ",
        data: product,
      });
    } else {
      res.status(404).json({
        status: "Error",
        message: "Producto no encontrado",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "Error",
      message: "No se pudo obtener el producto",
      error: error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        status: "Error",
        message: "Producto no encontrado",
      });
    }

    if (req.body.name) {
      product.name = req.body.name;
    }
    if (req.body.price) {
      product.price = req.body.price;
    }
    if (req.body.description) {
      product.description = req.body.description;
    }
    if (req.body.sizes) {
      product.sizes = req.body.sizes;
    }
    if (req.body.colors) {
      product.colors = req.body.colors;
    }
    if (req.body.brand) {
      product.brand = req.body.brand;
    }

    await product.save();

    res.status(200).json({
      status: "Success",
      message: "Producto actualizado exitosamente",
      data: product,
    });
  } catch (error) {
    res.status(400).json({
      status: "Error",
      message: "No se pudo actualizar el producto",
      error: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findByIdAndDelete(productId);
    if (product) {
      res.status(200).json({
        status: "Success",
        message: "Producto eliminado exitosamente",
        data: product,
      });
    } else {
      res.status(404).json({
        status: "Error",
        message: "Producto no encontrado",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "Error",
      message: "Producto no encontrado",
      error: error.message,
    });
  }
};

const getAveragePrice = async (req, res) => {
  try {
    const averagePrice = await Product.aggregate([
      {
        $group: {
          _id: null,
          average: { $avg: "$price" },
        },
      },
      {
        $project: {
          _id: 0,
          averagePrice: "$average",
        },
      },
    ]);

    if (averagePrice.length === 0) {
      return res.status(404).json({
        status: "Error",
        message: "No hay productos para calcular el promedio de precios",
      });
    }

    res.status(200).json({
      status: "Success",
      message: "Media de precios calculada exitosamente",
      averagePrice: averagePrice,
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: " No se pudo calcular la media de precios",
      error: error.message,
    });
  }
};

const getSizesByProductId = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId, "sizes");

    if (!product) {
      return res.status(404).json({
        status: "Error",
        message: "Producto no encontrado",
      });
    }
    const sizes = product.sizes;
    res.status(200).json({
      status: "Success",
      message: "Tallas del producto obtenidas exitosamente",
      sizes: sizes,
    });
  } catch (error) {
    res.status(400).json({
      status: "Error",
      message: " No se pudieron obtener las tallas del producto",
      error: error.message,
    });
  }
};

const deleteColorByProductId = async (req, res) => {
  try {
    const productId = req.params.id;
    const colorToDelete = req.params.color;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        status: "Error",
        message: "Producto no encontrado",
      });
    }
    const colors = product.colors;

    const indexOfColor = colors.indexOf(colorToDelete);
    if (indexOfColor === -1) {
      return res.status(404).json({
        status: "Error",
        message: "Color no encontrado en el producto",
      });
    }

    colors.splice(indexOfColor, 1);
    await product.save();

    res.status(200).json({
      status: "Success",
      message: "Color eliminado del producto exitosamente",
      remainingColors: colors,
    });
  } catch (error) {
    res.status(400).json({
      status: "Error",
      message: "No se pudo eliminar el color del porducto",
      error: error.message,
    });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  deleteColorByProductId,
  getAveragePrice,
  getSizesByProductId,
};
