const Product = require('../models/Product')
const Cart = require('../models/cart')
const { STATUS_CODE } = require('../constants/statusCode')

exports.addProductToCart = (request, response) => {
  const { name, description, price } = request.body

  const newProduct = new Product(name, description, Number(price))
  Product.add(newProduct)

  try {
    Cart.add(name)
  } catch (error) {
    return response
      .status(STATUS_CODE.NOT_FOUND)
      .json({ success: false, message: error.message })
  }

  response.status(STATUS_CODE.FOUND).redirect('/products/new')
}

exports.getProductsCount = (request, response) => {
  const quantity = Cart.getProductsQuantity()

  response.status(STATUS_CODE.OK).json({ quantity })
}
