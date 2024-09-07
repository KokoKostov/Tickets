import React, { useEffect, useState } from 'react'
import api from '../../api'
import TicketCard from '../TicketCard/TicketCard'

const Profile = () => {
    
    const [user, setUser] = useState(null);
    const [tickets, setTickets] = useState([]);
    const [boughtTickets, setBoughtTickets] = useState(true);
  
    useEffect(() => {
        const fetchUserAndTickets = async () => {
            try {
               
                const userResponse = await api.get('/me');
                setUser(userResponse.data);
                
             
                const ticketsResponse = await api.get('/tickets'); 
                const data = ticketsResponse.data;
                
              
                const filteredTickets = boughtTickets 
                ? data.filter(ticket => ticket.buyer.includes(userResponse.data._id) ) 
                : data.filter(ticket => ticket.user === userResponse.data._id);

                setTickets(filteredTickets);
            } catch (err) {
                console.error(err);
            } 
        };

        fetchUserAndTickets();
    }, [boughtTickets]); 

    return (
        <div className='h-screen flex items-center justify-center'>
            <div className="flex h-fit w-fit items-center justify-center bg-gradient-to-t from-blue-800 to-purple-800 rounded-xl">
                <div className='h-[700px] w-[1200px] m-3 bg-white bg-opacity-20 flex flex-col justify-start items-center '>
                    <div className='w-40 h-20 flex justify-center m-2  '>
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
                    
                    {boughtTickets? (
                        tickets.map((ticket) => (
                            <div key={ticket.id} className="flex-shrink-0">
                                <TicketCard ticket={ticket} />
                            </div>
                        ))
                    ) : 
                        (
                            tickets.map((ticket) => (
                                <div key={ticket.id} className="flex-shrink-0">
                                    <TicketCard ticket={ticket} />
                                </div>
                            ))
                        )}
                        </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;
