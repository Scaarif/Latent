import React from 'react';
import { Link } from 'react-router-dom';

const MobileMenu = ({ user, handleLogout }) =>
  // const [showProfile, setShowProfile] = useState(false);
  (
    <div className="flex flex-col space-y-2 bg-white p-4 pr-12 pb-16 text-md rounded-b-sm transition-colors">
      { !user ? (
        <><span className="p-1 cursor-pointer capitalize hover:text-green"><a href="#hero">home</a></span><span className="p-1 cursor-pointer capitalize hover:text-green"><a href="#services">services</a></span><span className="p-1 cursor-pointer capitalize hover:text-green"><a href="#contacts">contact us</a></span><span className="p-1 cursor-pointer capitalize hover:text-green"><a href="#explore">explore</a></span><Link to="/login">
          <span className="p-1 cursor-pointer capitalize hover:text-green">Login</span>
        </Link><Link to="/signup">
                                                                                                                                                                                                                                                                                                                                                                                                                                    <span className="p-1 cursor-pointer capitalize hover:text-green">Sign up</span>
                                                                                                                                                                                                                                                                                                                                                                                                                                         </Link>
        </>
      ) : (
        <><Link to="/" className="p-1 cursor-pointer capitalize hover:text-green">home</Link><Link to="/explore" className="p-1 cursor-pointer capitalize hover:text-green">explore</Link><Link to="/user/cart" className="p-1 cursor-pointer capitalize hover:text-green">cart</Link><span className="p-1 cursor-pointer capitalize hover:text-green">profile</span><span className="p-1 font-semibold cursor-pointer capitalize hover:text-green" onClick={() => handleLogout()}>Logout</span></>
      )}
    </div>
  );

export default MobileMenu;