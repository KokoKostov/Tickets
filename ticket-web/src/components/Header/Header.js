import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../providers/AuthProvider';
import myLogo from '../../public/7395346.jpg';
import { useEffect, useState } from 'react';
import { api } from '../../api';
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from '../../providers/CartProvider';

const Header = () => {
    const { token, refreshToken, user, logout } = useAuth();
    const [search, setSearch] = useState('');
    const [searchData, setSearchData] = useState([]);
    const { cart } = useCart();
    const navigate = useNavigate();

    const isLoggedIn = !!refreshToken; 
    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleChange = (e) => {
        setSearch(e.target.value);
    };

    const handleNavigation = (ticketId) => {
        navigate(`/tickets/${ticketId}`, { replace: true });
        setSearch(''); 
    };

    
    useEffect(() => {
        const timeoutId = setTimeout(async () => {
            if (search.trim() !== '') {
                try {
                    const res = await api.get(`/search/${search}`);
                    setSearchData(res.data);
                } catch (error) {
                    console.error('Error Fetching Data:', error);
                }
            } else {
                setSearchData([]);
            }
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [search, token]);

    return (
        <div className="flex items-center bg-white bg-opacity-30 w-full">
            <div className="flex justify-between items-center w-full font-medium relative">
               
                <div className="flex p-4 items-center justify-center">
                    <NavLink to="/">
                        <img className="h-[70px] w-[80px] rounded-full" src={myLogo} alt="Logo" />
                    </NavLink>
                </div>

              
                <div className="flex flex-col items-center justify-center absolute top-8 right-1/4 left-1/4">
                    <input
                        className="rounded-xl w-96 text-xl p-2 focus:outline-none text-start"
                        placeholder="Search"
                        type="text"
                        autoComplete="off"
                        onChange={handleChange}
                        value={search}
                    />
                    {searchData.length > 0 && (
                        <div className="bg-white flex flex-col w-96 h-fit mt-2 z-10 border border-gray-300 rounded-md shadow-lg">
                            <ul>
                                {searchData.map((data) => (
                                    <li
                                        key={data._id}
                                        className="list-none flex justify-between items-center py-1 px-2 hover:bg-slate-200 cursor-pointer"
                                        onClick={() => handleNavigation(data._id)}
                                    >
                                        <p className="ml-1 pl-1 py-1">
                                            {data.name}, {data.location}
                                        </p>
                                        <img src={data.image} className="w-[60px] h-[50px]" alt={`${data.name} thumbnail`} />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

             
                <div className="flex">
                    <ul className="flex text-lg">
                        <li className="p-2 hover:text-yellow-200">
                            <NavLink to="/catalog">Browse</NavLink>
                        </li>
                        {isLoggedIn ? (
                            <>
                                <li className="p-2 hover:text-yellow-200">
                                    <NavLink to="/create">Create</NavLink>
                                </li>
                                <li className="p-2 list-none hover:text-yellow-200">
                                    <p className="cursor-pointer" onClick={handleLogout}>
                                        Logout
                                    </p>
                                </li>
                                <li className="p-2 hover:text-yellow-200">
                                    <NavLink to={`/profile/${user?._id}`}>My Profile</NavLink>
                                </li>
                                <li className="p-2 pr-4 text-2xl flex flex-col justify-end items-end hover:text-yellow-200 relative">
                                    <NavLink to="/cart">
                                        <FaShoppingCart />
                                    </NavLink>
                                    {cart.length !== 0 && (
                                        <span className='absolute top-0 right-0 text-xs text-white bg-red-600 rounded-full flex items-center justify-center w-4 h-4'>
                                            {cart.length}
                                        </span>
                                    )}
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="p-2 hover:text-yellow-200">
                                    <NavLink to="/login">Login</NavLink>
                                </li>
                                <li className="p-2 pr-4 hover:text-yellow-200">
                                    <NavLink to="/register">Register</NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Header;
