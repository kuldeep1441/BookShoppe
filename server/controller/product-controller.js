// import asyncHandler from 'express-async-handler'
import Product from '../model/productSchema.js';          // importing collection


export const getProducts = async (request, response) => {
    try {
        const products = await Product.find({});
        response.json(products);
    }catch (error) {

    }
}


export const getProductById = async (request, response) => {
  try {
    let product = await Product.findOne({ id: request.params.id });

    // If product is not found by 'id', try searching by '_id'
    if (!product) {
      product = await Product.findOne({ _id: request.params.id });
    }

    // If product is still not found, return 404 error
    if (!product) {
      return response.status(404).json({ message: "Product not found" });
    }

    response.json(product);
  } catch (error) {
    // Return 500 status code for server errors
    response
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};



// const createProduct = asyncHandler(async (req, res) => {
//     const product = new Product({
//       name: 'Sample name',
//       price: 0,
//       user: req.user._id,
//       image: '/images/sample.jpg',
//       brand: 'Sample brand',
//       category: 'Sample category',
//       countInStock: 0,
//       numReviews: 0,
//       description: 'Sample description',
//     })
  
//     const createdProduct = await product.save()
//     res.status(201).json(createdProduct)
//   })


// const deleteProduct = asyncHandler(async (req, res) => {
//     const product = await Product.findById(req.params.id)
  
//     if (product) {
//       await product.remove()
//       res.json({ message: 'Product removed' })
//     } else {
//       res.status(404)
//       throw new Error('Product not found')
//     }
//   })


//   const updateProduct = asyncHandler(async (req, res) => {
//     const {
//       name,
//       price,
//       description,
//       image,
//       brand,
//       category,
//       countInStock,
//     } = req.body
  
//     const product = await Product.findById(req.params.id)
  
//     if (product) {
//       product.name = name
//       product.price = price
//       product.description = description
//       product.image = image
//       product.brand = brand
//       product.category = category
//       product.countInStock = countInStock
  
//       const updatedProduct = await product.save()
//       res.json(updatedProduct)
//     } else {
//       res.status(404)
//       throw new Error('Product not found')
//     }
//   })


//   const createProductReview = asyncHandler(async (req, res) => {
//     const { rating, comment } = req.body
  
//     const product = await Product.findById(req.params.id)
  
//     if (product) {
//       const alreadyReviewed = product.reviews.find(
//         (r) => r.user.toString() === req.user._id.toString()
//       )
  
//       if (alreadyReviewed) {
//         res.status(400)
//         throw new Error('Product already reviewed')
//       }
  
//       const review = {
//         name: req.user.name,
//         rating: Number(rating),
//         comment,
//         user: req.user._id,
//       }
  
//       product.reviews.push(review)
  
//       product.numReviews = product.reviews.length
  
//       product.rating =
//         product.reviews.reduce((acc, item) => item.rating + acc, 0) /
//         product.reviews.length
  
//       await product.save()
//       res.status(201).json({ message: 'Review added' })
//     } else {
//       res.status(404)
//       throw new Error('Product not found')
//     }
//   })


//   export {
//     getProducts,
//     getProductById,
//     deleteProduct,
//     createProduct,
//     updateProduct,
//     createProductReview
//   }







