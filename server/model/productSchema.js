import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 }, // Added validation for rating
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', // This assumes you have a User model defined elsewhere
    },
  },
  {
    timestamps: true,
  }
);

const productSchema = new mongoose.Schema(
  {
    id: {type:String, required: true},
    url: { type: String, required: true },
    detailUrl: { type: String, required: true },
    title: {
      type: Object,
      required: true,
      // Assuming title has specific fields like shortTitle and longTitle
      shortTitle: { type: String, required: true },
      longTitle: { type: String, required: true },
    },
    price: {
      type: Object,
      required: true,
      // Assuming price has fields like mrp, cost, and discount
      mrp: { type: Number, required: true },
      cost: { type: Number, required: true },
      discount: { type: String },
    },
    quantity: { type: Number, required: true, default: 1 },
    description: { type: String, required: false },
    discount: { type: String },
    tagline: { type: String },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
      max: 5,
    },
    category: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);
export default Product;



