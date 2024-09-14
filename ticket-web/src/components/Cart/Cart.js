import React from 'react'
import {useCart} from '../../providers/CartProvider'
import { useNavigate } from 'react-router-dom';
const Cart = () => {
    const navigate = useNavigate()
    const {cart,removeFromCart, clearCart, buyCartTicket}= useCart();
   
   const removeHandler=(id)=>{
    removeFromCart(id)
   }
   const buyHandler= (id)=>{
    const res= buyCartTicket(id)
    if(res){
        removeFromCart(id)
       
    }
    navigate('/')
    
   }


  return (
   <div className='h-screen flex justify-center items-center'>
         <div className=" flex  h-fit w-fit items-center justify-center bg-gradient-to-t from-blue-800 to-purple-800 rounded-xl">
        <div className='bg-black bg-opacity-40  flex flex-col items-start  min-h-[500px] min-w-[1000px] m-6'>
            {cart.length ===0 ?
            (<div className='bg-white bg-opacity-65 flex items-center justify-center h-[90%] w-full rounded-md my-2 '>
               <p className='text-xl'>Your cart is currently empty</p> 
                </div>)
            
        : (cart.map((ticket)=>{
       
        return(
        <div className='w-full flex  h-20 m-1  '>
        <div className='bg-white  w-3/4  flex items-center justify-between rounded-xl '>
            <div className='h-full flex items-center'>
        <img src={`${ticket.image}`} alt={`${ticket.name}`} className='h-full w-[100px] rounded-xl'/>
        <p className='text-xl m-2'>{ticket.name}</p>
        </div>
        <div className='m-4'>
            <p>Price {ticket.price}$</p>

            </div>
      </div>
      <div className='flex  w-1/4 h-1/2 m-0 p-0 items-start justify-center mt-4 '>
      <button onClick={()=>buyHandler(ticket._id)} className='bg-green-600 text-l flex w-[40%] h-full items-center justify-center transform hover:-translate-y-1 hover:scale-110 m-2 p-2'>Buy</button>
      <button onClick={()=>removeHandler(ticket._id)} className='bg-red-500 text-l flex w-[40%] h-full items-center justify-center transform hover:-translate-y-1 hover:scale-110 m-2 p-2'>Remove</button>
      </div>
      </div>
        )
    })
            )}
    </div>
    </div>
   </div>
  )
}

export default Cart
