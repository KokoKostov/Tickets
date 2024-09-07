import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../providers/AuthProvider';
import myLogo from '../../public/7395346.jpg';
import { useEffect, useState } from 'react';
import { api } from '../../api';
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from '../../providers/CartProvider';


const Header = () => {
    const { logout } = useAuth();
    const [search, setSearch] = useState('');
    const [searchData, setSearchData] = useState([]);
    const [userId, setUserId] = useState('')
    const {cart} = useCart()
    const navigate = useNavigate();

    const currentUser = localStorage.getItem('refreshToken');

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
        const fetchData = async () => {
            if (search !== '') {
                try {
                    const res = await api.get(`/search/${search}`);
                    setSearchData(res.data);
                } catch (error) {
                    console.error('Error Fetching Data:', error);
                }
            } else {
                setSearchData([]);
            }
        };

        fetchData();
    }, [search]);
    useEffect(()=>{
        const fetchData = async ()=>{
            if(!localStorage.getItem('refreshToken')){
                return
            }
            try{
                
                const res = await api.get(`/me`)
                setUserId(res.data._id );

                
            }catch(err){
                console.log(err);
                
            }
        }
        fetchData()
    },[userId])

    return (
        <div className="flex items-center bg-white bg-opacity-30 w-full">
            <div className="flex justify-between items-center w-full font-medium">
                <div className="flex p-4 items-center justify-center">
                    <NavLink to="/">
                        <img className="h-[70px] w-[80px] rounded-full" src={myLogo} alt="Logo" />
                    </NavLink>
                </div>
                <div className="flex flex-col items-center justify-center absolute top-8 right-1/4 left-1/4 inset-100">
                    <input
                        className="rounded-xl w-96 text-xl p-2 focus:outline-none text-start"
                        placeholder="Search"
                        type="text"
                        autoComplete="off"
                        onChange={handleChange}
                        value={search}
                    />
                    <div className="bg-white flex flex-col w-96 h-fit mt-2 z-10">
                        {searchData.map((data) => (
                            <li
                                key={data._id}
                                className="list-none flex justify-between items-center py-1 hover:bg-slate-200 cursor-pointer"
                                onClick={() => handleNavigation(data._id)}
                            >
                                <p className="ml-1 pl-1 py-1">
                                    {data.name}, {data.location}
                                </p>
                                <img src={data.image} className="w-[60px] h-[50px]" alt={`${data.name} thumbnail`} />
                            </li>
                        ))}
                    </div>
                </div>
                <div className="flex">
                    <ul className="flex text-lg ">
                        <li className="p-2 hover:text-yellow-200">
                            <NavLink to="/catalog">Browse</NavLink>
                        </li>
                      
                        {currentUser ? (
                            <>
                                <li className="p-2 hover:text-yellow-200">
                                    <NavLink to="/create">Create</NavLink>
                                </li>
                                <li className="p-2  list-none hover:text-yellow-200">
                                    <p className="cursor-pointer" onClick={handleLogout}>
                                        Logout
                                    </p>
                                </li>
                                <li className="p-2  hover:text-yellow-200">
                                    <NavLink to={`/profile/${userId}`}>My Profile</NavLink>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="p-2 hover:text-yellow-200">
                                    <NavLink to="/login">Login</NavLink>
                                </li>
                                <li className="p-2 hover:text-yellow-200">
                                    <NavLink to="/register">Register</NavLink>
                                </li>
                            </>
                        )}
                          <li className="p-2 pr-4 text-2xl flex flex-col justify-end items-end hover:text-yellow-200  ">
                            <NavLink to="/cart"><FaShoppingCart />
                            </NavLink>
                           {cart.length!==0? 
                           <p className='text-xs text-yellow-500 bg-red-600 rounded-full flex items-center justify-center w-4'>{cart.length}</p>
                           : <></>}
                           
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Header;
