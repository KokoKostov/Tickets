import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';

import {api} from '../../api'
const Edit = () => {
    const navigate= useNavigate()
    const {id}= useParams()
    const [ticket,setTicket]= useState({
        id: id,
        name: '',
        description:'',
        location: '',
        date: '',
        address:'',
        price:'',
        image: '',


    })
    useEffect(()=>{
     api.get(`/tickets/${id}`)
     .then(res=>
        setTicket({
            ...ticket, 
            name:res.data.name,
            description:res.data.description,
        location: res.data.location,
        date: res.data.date,
        address:res.data.address,
        price:res.data.price,
        image: res.data.image
        }),

        
    )
     .catch(err=> console.error(err))
    },[])
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setTicket((prevFormData) => ({ ...prevFormData, [name]: value }));
    };
    const handleSubmit=(e)=>{
        e.preventDefault()
        api.put('/tickets/'+ id,ticket)
        .then(res=>{
            navigate(`/tickets/${id}`)
        })
        .catch(err=> console.log(err)
        )
    }
    
    
    return (
         <div className=' min-h-screen flex justify-center items-center m-4 pb-5'>
       <div className=' text-white flex flex-col justify-center items-center w-fit h-fit'>
           
            <div className='w-fit h-fit bg-gradient-to-b from-green-600 to-purple-800'>
            <div className='bg-black  bg-opacity-65 w-[75rem] h-auto rounded-xl  flex flex-col justify-center ite m-2 text-cyan-50  '>
              
                <div className='flex  justify-between text-wrap '>
                <div className='p-6'>
          
            <p className='mb-6'>Name: 
            <input
            type='text'
            id='name'
            name='name'
            value={ticket?.name}
            onChange={handleChange}
            className='text-black px-1 mx-1 bg-white opacity-90'
            >
                </input>
                </p> 
    
            <p className=''>Image:
            <input
            type='text'
            id='image'
            name='image'
            value={ticket?.image}
            onChange={handleChange}
            className='text-black px-1 mx-1 bg-white opacity-90'
            >
             
                </input>
                </p>
                </div>  
                    
           
            <div className='p-6 '>
            <p className='mb-6'>Location: 
            <input
            type='text'
            id='location'
            name='location'
            value={ticket?.location}
            onChange={handleChange}
            className='text-black px-1 mx-1 bg-white opacity-90'
            >
                </input></p>
            <p>Address:  <input
            type='text'
            id='address'
            name='address'
            value={ticket?.address}
            onChange={handleChange}
            className='text-black px-1 mx-1 bg-white opacity-90'
            >
                </input></p>
            </div>
            <div className='p-6'>
            
            <p className='mb-6'>Date:
            <input
            type='date'
            id='date'
            name='date'
            value={ticket?.date}
            onChange={handleChange}
            className='text-black px-1 mx-2 bg-white opacity-90 '
            >
                </input>
            </p>
            <p>Price:  <input
            type='text'
            id='price'
            name='price'
            value={ticket?.price}
            onChange={handleChange}
            className='text-black px-1 mx-1 bg-white opacity-90'
            >
                </input></p>
            </div>
            
            </div>
            <div className='mt-16 p-6 '>
                <p>Event description:</p>
                <p>  <textarea
            type='text'
            id='description'
            name='description'
            value={ticket?.description}
            onChange={handleChange}
            className='text-black  my-4 p-1 bg-white opacity-90 w-full h-60 '
            >
                </textarea>
                </p>
             
               
           
            </div>
            <div className='flex  items-center justify-center m-4 '>
        <button onClick={handleSubmit} className='bg-green-600 text-xl flex items-center justify-center transform hover:-translate-y-1 hover:scale-110'>Edit</button>
        </div>
        
            </div>
        </div>
        </div>
        </div>
    );
}

export default Edit
