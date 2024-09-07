import React from 'react';
import { NavLink } from 'react-router-dom';

function Home() {
  //https://images6.alphacoders.com/315/thumb-1920-315762.jpg
  return (
    
    <div className=' bg-full h-screen'>
  
      <div className='  w-[100%] h-[100%]  flex justify-center rounded-xl  items-center '>
        <div className='bg-gray-400 border-gradient-to-r w-[40%] h-[45%] flex justify-center bg-opacity-90 border-gradient-br-blue-green-gray-900 border-transparent border-solid border-4 rounded-xl'>
         <div className='flex-row content-center items-center'>
          <div className='flex items-center justify-center'>
        <h2 className=' text-6xl  text-gray-200 mt-4 '>
            Find the latest Concerts
        </h2>
        </div>
        <div className='flex items-center justify-center mt-4'>
        <p className='text-2xl text-gray-200 p-8 pt-16 text-center w-[80%]'>
          Check out all the upcoming concerts near you and create memories
          
          </p>
          </div>
        <div className='flex items-center justify-center pt-5'>
        <NavLink to={'/catalog'}>
        <button type="button" className="text-white  bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-4 py-4.5 text-center me-4 mb-4  ">Browse</button>
        </NavLink>
        </div>
        </div>
        </div>
        </div>
      
    
    <div className='flex justify-between'>

   

    
    </div>
  
    <hr className='w-[100%] h-1 bg-pink-400 bg-gradient-to-r from-pink-400 to-red-600 border-1 '/>
   
        

    </div>
  );
}

export default Home;