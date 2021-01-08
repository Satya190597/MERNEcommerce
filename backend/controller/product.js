const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

exports.getProductById = (request, response, next, id) => {
  Product.findById(id)
    .populate("category")
    .exec((error, product) => {
      if (error) {
        return response.status(400).json({
          message: "NO PRODUCT FOUND.",
        });
      }
      request.product = product;
      next();
    });
};

exports.getProduct = (request, response) => {
  if (request.product) request.product.photo = undefined;
  response.json(request.product);
};

exports.photo = (request, response) => {
  if (request.product.photo.data) {
    response.set("Content-Type", request.product.photo.contentType);
    return response.send(request.product.photo.data);
  }
  next();
};

/**
 * DELETED PRODUCT
 */
exports.removeProduct = (request, response) => {
  let product = request.product;
  product.remove((error, product) => {
    if (error) {
      return response.status(400).json({
        message: "UNABLE TO DELETE THE PRODUCT",
      });
    }
    response.json({
      message: "PRODUCT DELETED SUCCESSFULLY",
      deletedProduct: product,
    });
  });
};

/**
 * UPDATE PRODUCT
 */
exports.updateProduct = (request, response) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true; // Keep Form Extensions.

  // 1st Parameter - Request.
  // 2nd Parameter - A Callback with error,field and file.

  form.parse(request, (error, fields, file) => {
    if (error) {
      return response.status(400).json({
        message: "UNABLE TO PROCESS THE FILE.",
        error: error,
      });
    }

    // UPDATE PRODUCT DATA USING LOAD-DASH
    let product = request.product;
    product = _.extend(product, fields);

    if (file.photo) {
      if (file.photo.size > 3000000) {
        return response.status(400).json({
          error: "File Size Is Too Big.",
        });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }

    // SAVE PRODUCT TO DB
    product.save((error, product) => {
      if (error) {
        return response.status(400).json({
          message: "PRODUCT UPDATE FAILED.",
        });
      }
      product.photo.data = undefined;
      response.json(product);
    });
  });
};

/**
 * CREATE PRODUCT METHOD
 */
exports.createProduct = (request, response) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true; // Keep Form Extensions.

  // 1st Parameter - Request.
  // 2nd Parameter - A Callback with error,field and file.

  form.parse(request, (error, fields, file) => {
    if (error) {
      return response.status(400).json({
        message: "UNABLE TO PROCESS THE FILE.",
        error: error,
      });
    }

    let product = new Product(fields);

    // Destructuring the fields
    const { name, description, category, stock, price } = fields;

    if (!name || !description || !category || !price || !stock || !price) {
      return response.status(400).json({
        message: "Please Include All Fields.",
      });
    }

    if (file.photo) {
      if (file.photo.size > 3000000) {
        return response.status(400).json({
          error: "File Size Is Too Big.",
        });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }

    // SAVE PRODUCT TO DB
    product.save((error, product) => {
      if (error) {
        return response.status(400).json({
          message: "UNABLE TO SAVE PRODUCT DETAIL.",
        });
      }
      response.json(product);
    });
  });
};

/**
 * Product Listing
 */
exports.getAllProducts = (request, response) => {
  let limit = request.query.limit ? parseInt(request.query.limit) : 8;
  let sortBy = request.query.sortBy ? request.query.sortByInt : "_id";
  Product.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((error, products) => {
      if (error) {
        return response.status(400).json({
          message: "NO PRODUCT FOUND",
        });
      }
    });
};

/**
 * UPDATE STOCK
 */
exports.updateStock = (request, response, next) => {
  let operations = request.body.order.products.map((product) => {
    return {
      updateOne: {
        filter: { _id: product_id },
        update: { $inc: { stock: -product.count, sold: +product.count } },
      },
    };
  });
  Product.bulkWrite(operations, {}, (error, products) => {
    if (error) {
      return response.status(400).json({
        message: "INVENTORY UPDATE FAILED",
      });
    }
    next();
  });
};
