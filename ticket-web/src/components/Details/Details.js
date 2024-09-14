import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { api } from '../../api';
import { useCart } from '../../providers/CartProvider';
import { useAuth } from '../../providers/AuthProvider';

function Details() {
    const navigate = useNavigate();
    const [ticket, setTicket] = useState(null);
    const { id } = useParams();
    const { addToCart, cart } = useCart();
    const { user } = useAuth();

    useEffect(() => {
        const fetchTicket = async () => {
            try {
                const response = await api.get(`/tickets/${id}`);
                setTicket(response.data);
                
            } catch (error) {
                console.error('Failed to fetch ticket:', error);
            }
        };

        fetchTicket();
    }, [id]);

    const deleteHandler = async () => {
        if (window.confirm('Are you sure you want to delete this ticket?')) {
            try {
                await api.delete(`/tickets/${id}`);
                navigate('/catalog');
            } catch (error) {
                console.error('Failed to delete ticket:', error);
            }
        }
    };

    const addHandler = () => {
        if (cart.some((cartItem) => cartItem._id === ticket._id)) {
            return window.alert('This item is already in your cart');
        }

        if (!user) {
            window.alert('You need to log in to buy a ticket');
            navigate('/login');
            return;
        }
        
        addToCart(ticket);
        window.alert('Ticket has been added to your cart');
        navigate('/catalog');
    };

    if (!ticket) {
        return <p>No ticket details available</p>;
    }

    return (
        <div className='min-h-screen flex justify-center items-center m-4 pb-5'>
            <div className='text-white flex flex-col justify-center items-center w-fit h-fit'>
                <div className='top-48 relative flex-col items-center justify-center'>
                    <div className='bg-gradient-to-b from-green-600 to-purple-800 h-fit w-fit flex items-center justify-center p-3 rounded-full'>
                        <img src={ticket.image} alt={ticket.name} className='h-[300px] w-[550px] rounded-full border-2-black' />
                    </div>
                    <h1 className='text-4xl font-semibold flex justify-center items-center mt-4'>{ticket.name}</h1>
                </div>
                <div className='w-fit h-fit bg-gradient-to-b from-green-600 to-purple-800'>
                    <div className='bg-black bg-opacity-65 w-[75rem] h-auto rounded-xl flex flex-col justify-center m-2 text-cyan-50'>
                        <div className='flex justify-between text-wrap'>
                            <div className='p-6'>
                                <p className='mb-6'>Location: {ticket.location}</p>
                                <p>Address: {ticket.address}</p>
                            </div>
                            <div className='p-6'>
                                <p className='mb-6'>Date: {new Date(ticket.date).toLocaleDateString()}</p>
                                <p>Price: {ticket.price}$</p>
                            </div>
                        </div>
                        <div className='mt-16 p-6'>
                            <p>Event description:</p>
                            <p>{ticket.description}</p>
                        </div>

                        {/* Conditional rendering for ticket actions */}
                        {user && ticket.user === user._id ? (
                            <div className='flex items-center justify-between m-4 align-bottom'>
                                <Link to={`/tickets/edit/${ticket._id}`}>
                                    <button className='bg-green-600 text-xl flex items-center justify-center transform hover:-translate-y-1 hover:scale-110'>
                                        Edit
                                    </button>
                                </Link>
                                <button onClick={deleteHandler} className='bg-red-600 text-xl flex items-center justify-center transform hover:-translate-y-1 hover:scale-110'>
                                    Delete
                                </button>
                            </div>
                        ) : (
                           
                            ticket.buyer.includes(user?._id) ? (
                                <></>
                            ) : (
                                <div className='flex items-center justify-center m-4'>
                                    <button onClick={addHandler} className='bg-green-600 text-xl flex items-center justify-center transform hover:-translate-y-1 hover:scale-110'>
                                        Add to cart
                                    </button>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Details;
