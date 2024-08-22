import { products } from "./constants/data.js"; // Array of objects -> that's the documents
import Product from "./model/productSchema.js";

const DefaultData = async () => {
    try {
        await Product.deleteMany()
        await Product.insertMany(products); // Use await to handle the asynchronous operation
        console.log('Data imported successfully');
    } catch (error) {
        console.log(`Error while inserting default data: ${error.message}`);
    }
};

export default DefaultData;
