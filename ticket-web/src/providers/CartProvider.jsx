import React, { createContext, useState, useContext } from 'react';
import {api} from '../api'

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (item) => {
      
        setCart([...cart, item]);
    };

    const removeFromCart = (itemId) => {
        setCart(cart.filter(item => item._id !== itemId));
    };

    const clearCart = () => {
        setCart([]);
    };

   const buyCartTicket = async (ticketId)=>{
     const response= await api.post(`/tickets/${ticketId}/purchase`)
     return response
   }

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart,buyCartTicket, useCart }}>
            {children}
        </CartContext.Provider>
    );
};
