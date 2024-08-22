// import axios from "axios";

// const url = ;

// export const authenticateLogin = async (user) => {
//     try {
//         const response = await axios.post(`${url}/login`, user);
//         localStorage.setItem('userInfo', JSON.stringify(response.data)); // Save only relevant data
//         return response.data;
//     } catch (error) {
//         console.error('Error while calling login API:', error.message); // Improved error handling
//         throw error; // Rethrow to allow further handling if needed
//     }
// }

// export const authenticateSignup = async (user) => {
//     try {
//         const response = await axios.post(`${url}/signup`, user);
//         localStorage.setItem('userInfo', JSON.stringify(response.data)); // Save only relevant data
//         return response.data;
//     } catch (error) {
//         console.error('Error while calling signup API:', error.message); // Improved error handling
//         throw error; // Rethrow to allow further handling if needed
//     }
// }

// export const getProductDetails = async (id) => {
//     try {
//         const response = await axios.get(`${url}/product/${id}`);
//         return response.data; // Return only the relevant data
//     } catch (error) {
//         console.error('Error while getting product by id:', error.message); // Improved error handling
//         throw error; // Rethrow to allow further handling if needed
//     }
// }

// export const payUsingPaytm = async (data) => {
//   try {
//     const response = await axios.post(`${url}/payment`, data);
//     return response.data; // Return only the relevant data
//   } catch (error) {
//     console.error("Error while processing payment:", error.message); // Improved error handling
//     throw error; // Rethrow to allow further handling if needed
//   }
// };
