import { useState, useEffect } from 'react';

import SearchIcon from '@mui/icons-material/Search';
import { InputBase, List, ListItem, Box, styled } from '@mui/material';

import { useSelector, useDispatch } from 'react-redux'; // hooks
import { getProducts as listProducts } from '../../redux/actions/productActions';
import { Link } from 'react-router-dom';

const SearchContainer = styled(Box)`
  border-radius: 2px;
  margin-left: 10px;
  width: 50vw;
  background-color: #bfdbfe;
  display: flex;
  color: #000;
`;

const SearchIconWrapper = styled(Box)`
  margin-left: auto;
  padding: 5px;
  display: flex;
  color: blue;
`;

const ListWrapper = styled(List)`
  position: absolute;
  color: #000;
  background: #FFFFFF;
  margin-top: 36px;
`;

const InputSearchBase = styled(InputBase)`
  font-size: unset;
  width: 100%;
  padding-left: 20px;
`;

const Search = () => {
    const [ text, setText ] = useState();
    const [ open, setOpen ] = useState(true)

    const getText = (text) => {
        setText(text);
        setOpen(false)
    }

    const getProducts = useSelector(state => state.getProducts);
    const { products } = getProducts;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch])

    return (
        <SearchContainer>
            <InputSearchBase
              placeholder="Search for Books"
              inputProps={{ 'aria-label': 'search' }}
              onChange={(e) => getText(e.target.value)}
            />
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            {
              text && 
              <ListWrapper hidden={open}>
                {
                  products.filter(product => product.title.longTitle.toLowerCase().includes(text.toLowerCase())).map(product => (
                    <ListItem>
                      <Link 
                        to={`/product/${product.id}`} 
                        style={{ textDecoration:'none', color:'inherit'}}
                        onClick={() => setOpen(true)}  
                      >
                        {product.title.longTitle}
                      </Link>
                    </ListItem>
                  ))
                }  
              </ListWrapper>
            }
        </SearchContainer>
    )
}

export default Search;






// import { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { getProducts as listProducts } from '../../redux/actions/productActions';
// import { Link } from 'react-router-dom';
// import SearchIcon from '@mui/icons-material/Search';
// const Search = () => {
//   const [text, setText] = useState('');
//   const [open, setOpen] = useState(false); // State to control visibility

//   const getProducts = useSelector((state) => state.getProducts);
//   const { products } = getProducts;

//   const dispatch = useDispatch();

//   useEffect(() => {
//     // Fetch products on mount
//     dispatch(listProducts());
//   }, [dispatch]);

//   const handleChange = (e) => {
//     const input = e.target.value;
//     setText(input);
//     setOpen(!!input); // Open suggestions if there's input
//   };

//   const handleProductClick = () => {
//     setText('');
//     setOpen(false); // Close suggestions on selection
//   };

//   return (
//     <div className="relative flex bg-blue-100 items-center justify-center w-full md:w-[50vw] mx-2 md:mx-4 rounded-lg overflow-hidden">
//       <input
//         type="text"
//         placeholder="Search for products, brands and more"
//         className="h-10 px-4 py-2 flex-grow bg-blue-100 text-sm text-black focus:outline-none"
//         value={text}
//         onChange={handleChange}
//       />
//       <button className="h-10 px-4 py-2 bg-blue-100 text-black flex items-center justify-center">
//         <SearchIcon />
//       </button>
//       {text && open && (
//         <ul className="sticky left-0 mt-[30px] w-full bg-white border rounded shadow-lg z-50">
//           {products.length > 0 ? (
//             products
//               .filter((product) =>
//                 product.title.longTitle.toLowerCase().includes(text.toLowerCase())
//               )
//               .map((product) => (
//                 <li key={product.id} className="hover:bg-gray-100">
//                   <Link
//                     to={/product/${product.id}}
//                     className="block px-4 py-2 text-sm"
//                     onClick={handleProductClick}
//                   >
//                     {product.title.longTitle}
//                   </Link>
//                 </li>
//               ))
//           ) : (
//             <li className="px-4 py-2 text-sm">No products found</li>
//           )}
//         </ul>
//       )}
//     </div>
//   );
// };
