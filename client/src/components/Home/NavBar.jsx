import { navData } from '../../constants/data';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <div className="flex flex-wrap justify-around items-center bg-white py-2 sm:py-4 shadow-md mx-auto mb-2 sm:mb-4">
      {navData.map((img, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center mx-2 sm:mx-4 my-2 sm:my-0 w-1/4 sm:w-auto"
        >
          <Link
          to={`/category/${img.text}`}
          key={img.id}
          className="no-underline"
        >
            <img
              src={img.url}
              alt="NavBar Item"
              className="h-12 sm:h-16 w-auto"
            />
            <p className="mt-2 text-center text-xs sm:text-sm md:text-base">
              {img.text}
          </p>
          </Link>
          </div>
      ))}
    </div>
  );
}

export default NavBar;

