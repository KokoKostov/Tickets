import React, { useEffect, useState } from 'react'
import api from '../../api'
import TicketCard from '../TicketCard/TicketCard'
import {useAuth} from '../../providers/AuthProvider'
const Profile = () => {
    
    const [tickets, setTickets] = useState([]);
    const [boughtTickets, setBoughtTickets] = useState(true);
    const {user} = useAuth()

    useEffect(() => {
        const fetchTicket = async () => {
            try {

                const ticketsResponse = await api.get('/tickets'); 
                const ticketData = ticketsResponse.data;

                const filteredTickets = boughtTickets 
                ? ticketData.filter(ticket => ticket.buyer.includes(user._id) ) 
                : ticketData.filter(ticket => ticket.user === user._id);

                setTickets(filteredTickets);
            } catch (err) {
                console.error(err);
            } 
        };

        fetchTicket();
    }, [boughtTickets,user]); 

    return (
        <div className='h-screen flex items-center justify-center'>
            <div className="flex h-fit w-fit items-center justify-center bg-gradient-to-t from-blue-800 to-purple-800 rounded-xl">
                <div className='h-[700px] w-[1200px] m-3 bg-white bg-opacity-20 flex flex-col justify-start items-center '>
                    <div className='w-40 h-20 flex justify-center m-2 items-center  '>
                        {boughtTickets ? (
                            <button 
                                onClick={() => setBoughtTickets(false)} 
                                className='bg-yellow-600 text-lg flex items-center justify-center transform hover:-translate-y-0 hover:scale-110 m-0 p-1'>
                                Created Tickets
                            </button>
                        ) : (
                            <button 
                                onClick={() => setBoughtTickets(true)} 
                                className='bg-yellow-600 text-lg flex items-center justify-center transform hover:-translate-y-0 hover:scale-110 m-0 p-1'>
                                Bought Tickets
                            </button>
                        )}
                    </div>

                    <div className='flex flex-wrap overflow-y-auto justify-start bg-black bg-opacity-40 p-4 w-full h-full'>                  
                    {tickets.map((ticket) => (
                            <div key={ticket.id} className="flex-shrink-0">
                                <TicketCard ticket={ticket} />
                            </div>
                        ))}
                        </div>
                </div>

            </div>
        </div>
    )
}

export default Profile;
