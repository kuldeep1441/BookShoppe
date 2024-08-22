// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   getProducts,
//   deleteProduct,
//   createProduct,
// } from '../actions/productActions';
// import { PRODUCT_CREATE_RESET } from '../constants/productConstants';
// import { useHistory, useParams, Link } from 'react-router-dom';

// const ProductListScreen = () => {
//   const { pageNumber = 1 } = useParams();
//   const history = useHistory();
//   const dispatch = useDispatch();

//   const productList = useSelector((state) => state.productList);
//   const { loading, error, products } = productList;

//   const productDelete = useSelector((state) => state.productDelete);
//   const { loading: loadingDelete, error: errorDelete } = productDelete;

//   const productCreate = useSelector((state) => state.productCreate);
//   const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct } = productCreate;

//   const userLogin = useSelector((state) => state.userLogin);
//   const { userInfo } = userLogin;

//   useEffect(() => {
//     dispatch({ type: PRODUCT_CREATE_RESET });

//     if (!userInfo || !userInfo.isAdmin) {
//       history.push('/login');
//     }

//     if (successCreate) {
//       history.push(`/admin/product/${createdProduct._id}/edit`);
//     } else {
//       dispatch(getProducts('', pageNumber));
//     }
//   }, [
//     dispatch,
//     history,
//     userInfo,
//     successCreate,
//     createdProduct,
//     pageNumber,
//   ]);

//   const deleteHandler = (id) => {
//     if (window.confirm('Are you sure')) {
//       dispatch(deleteProduct(id));
//     }
//   };

//   const createProductHandler = () => {
//     dispatch(createProduct());
//   };

//   return (
//     <>
//       <div className="flex items-center justify-between mb-6">
//         <h1 className="text-2xl font-bold">Products</h1>
//         <button
//           className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
//           onClick={createProductHandler}
//         >
//           <i className="fas fa-plus"></i> Create Product
//         </button>
//       </div>

//       {loadingDelete && <p>Loading...</p>}
//       {errorDelete && <p className="text-red-600">{errorDelete}</p>}
//       {loadingCreate && <p>Loading...</p>}
//       {errorCreate && <p className="text-red-600">{errorCreate}</p>}
//       {loading ? (
//         <p>Loading...</p>
//       ) : error ? (
//         <p className="text-red-600">{error}</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-white">
//             <thead>
//               <tr>
//                 <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                   ID
//                 </th>
//                 <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                   NAME
//                 </th>
//                 <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                   PRICE
//                 </th>
//                 <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                   CATEGORY
//                 </th>
//                 <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                   BRAND
//                 </th>
//                 <th className="px-6 py-3 border-b-2 border-gray-300"></th>
//               </tr>
//             </thead>
//             <tbody className="bg-white">
//               {products.map((product) => (
//                 <tr key={product._id}>
//                   <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{product._id}</td>
//                   <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{product.name}</td>
//                   <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">Rs.{product.price}</td>
//                   <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{product.category}</td>
//                   <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{product.brand}</td>
//                   <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm font-medium">
//                     <Link
//                       to={`/admin/product/${product._id}/edit`}
//                       className="text-indigo-600 hover:text-indigo-900"
//                     >
//                       <i className="fas fa-edit"></i>
//                     </Link>
//                     <button
//                       className="text-red-600 hover:text-red-900 ml-4"
//                       onClick={() => deleteHandler(product._id)}
//                     >
//                       <i className="fas fa-trash"></i>
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </>
//   );
// };

// export default ProductListScreen;
