const Cart = require('../models/Cart');
const MobileProducts = require('../models/MobileProduct');
const TabletProducts = require('../models/TabletProduct');
const AccessoriesProducts = require('../models/AccessoriesProducts');
// const queryCreator = require('../commonHelpers/queryCreator');
const _ = require('lodash');

exports.createCart = async (req, res, next) => {
  try {
    const existingCart = await Cart.findOne({ customerId: req.user._id });
    if (existingCart) {
      return res.status(400).json({ message: "Cart for this customer already exists." });
    }

    if (!req.body.products || !Array.isArray(req.body.products) || req.body.products.length === 0) {
      return res.status(400).json({ message: "Products are required to create a cart." });
    }

    const newCartData = {
      customerId: req.user._id,
      products: req.body.products
    };

    const newCart = new Cart(newCartData);
    await newCart.save();

    res.json(newCart);
  } catch (err) {
    res.status(500).json({ message: `Error happened on server: "${err}"` });
  }
};

exports.updateCart = async (req, res, next) => {
  
  try {
    const cart = await Cart.findOne({ customerId: req.user._id });
    
    if (!cart) {
      const newCartData = {
        customerId: req.user._id,
        products: req.body.products || [] 
      };
      const newCart = new Cart(newCartData);
      const savedCart = await newCart.save();
      
      return res.json(savedCart);
    } else {
      
      cart.products = req.body.products || cart.products;
      const updatedCart = await cart.save();
      return res.json(updatedCart);
    }
  } catch (error) {
    res.status(500).json({ message: `Error happened on server: "${error}"` });
  }
};


exports.addProductToCart = async (req, res, next) => {
  const { _id, category } = req.body;
  const productModel = { 'phones': MobileProducts, 'tablets': TabletProducts, 'accessories': AccessoriesProducts }[category];


  if (!productModel) {
    return res.status(400).json({ message: "Invalid product category" });
  }

  try {
    const productToAdd = await productModel.findOne({ _id });
    if (!productToAdd) {
      return res.status(400).json({
        message: `Product with _id "${_id}" does not exist in category "${category}"`,
      });
    }

    let cart = await Cart.findOne({ customerId: req.user._id });
    if (!cart) {
      cart = new Cart({
        customerId: req.user._id,
        products: []
      });
    }

    const productIndex = cart.products.findIndex(item => item.productId.equals(_id));

    if (productIndex !== -1) {
      cart.products[productIndex].cartQuantity += 1;
    } else {
      cart.products.push({
        productId: _id,
        customId: productToAdd.id,
        ...productToAdd.toObject(),
        cartQuantity: 1,
      });
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: `Error happened on server: "${err}" ` });
  }
};

exports.increaseCartProductQuantity = async (req, res, next) => {
  
  try {
    const cart = await Cart.findOne({ customerId: req.user._id });
    
    if (!cart) {
      return res.status(404).json({ message: 'Cart does not exist.' });
    }

    const productIndex = cart.products.findIndex(product => product.productId.equals(req.params.productId));

    if (productIndex === -1) {
      return res.status(404).json({ message: 'Product not found in cart.' });
    }

    cart.products[productIndex].cartQuantity += 1;

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: `Error happened on server: "${error}"` });
  }
};


exports.decreaseCartProductQuantity = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ customerId: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: 'Cart does not exist.' });
    }

    const productIndex = cart.products.findIndex(product => product.productId.equals(req.params.productId));

    if (productIndex === -1) {
      return res.status(404).json({ message: 'Product not found in cart.' });
    }

    cart.products[productIndex].cartQuantity -= 1;

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: `Error happened on server: "${error}"` });
  }
};


exports.deleteCart = async (req, res, next) => {
  try {
    const result = await Cart.deleteOne({ customerId: req.user._id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Cart not found or already deleted.' });
    }
    res.status(200).json({ message: 'Cart successfully deleted.' });
  } catch (error) {
    res.status(500).json({ message: `Error happened on server: "${error}"` });
  }
};

exports.deleteProductFromCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ customerId: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: `Cart does not exist.` });
    }

    const productsAfterRemoval = cart.products.filter(product => !product.productId.equals(req.params.productId));

    if (productsAfterRemoval.length === 0) {
      await Cart.deleteOne({ customerId: req.user._id });
      return res.status(200).json({ message: 'Cart has been deleted.' });
    } else if (productsAfterRemoval.length === cart.products.length) {
      return res.status(404).json({ message: `Product with ID ${req.params.productId} not found in cart.` });
    } else {
      cart.products = productsAfterRemoval;
      await cart.save();
      res.json(cart);
    }
  } catch (error) {
    res.status(500).json({ message: `Error happened on server: "${error}"` });
  }
};


exports.getCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ customerId: req.user._id });
    if (!cart) {
      return res.json({customerId: req.user._id, products: []});
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: `Error happened on server: "${error}"` });
  }
};

exports.synchronizeCart = async (req, res, next) => {
  const localProducts = req.body.products || [];
  const customerId = req.user._id;

  try {
    let cart = await Cart.findOne({ customerId });
    if (!cart) {
      if (localProducts.length > 0) {
        cart = new Cart({
          customerId,
          products: []
        });
      } else {
        return res.json({ message: "No cart exists and no products provided for synchronization." });
      }
    }

    for (const localProduct of localProducts) {

      const { productId, category } = localProduct;
      const productModel = { 'phones': MobileProducts, 'tablets': TabletProducts, 'accessories': AccessoriesProducts }[category];

      if (!productModel) {
        console.error(`Invalid product category for product ID: ${productId}`);
        continue;
      }
      
      const productToAdd = await productModel.findOne({ _id: productId });
      if (!productToAdd) {
        console.error(`Product with ID ${productId} not found in category ${category}`);
        continue;
      }
      
      const productIndex = cart.products.findIndex(item => item.productId.equals(productId));
      if (productIndex !== -1) {
        // Update product quantity if product already exists in cart
        cart.products[productIndex].cartQuantity = Math.max(cart.products[productIndex].cartQuantity, localProduct.cartQuantity);
      } else {
        // Add new product to cart
        cart.products.push({
          productId,
          category,
          customId: localProduct.id,
          ...localProduct,
          cartQuantity: localProduct.cartQuantity
        });
      }
    }

    if (cart.products.length > 0) {
      await cart.save();
      res.json(cart);
    } else {
      res.json({ message: "Cart is empty after synchronization." });
    }
  } catch (error) {
    res.status(500).json({ message: `Error happened on server: "${error}"` });
  }
};




