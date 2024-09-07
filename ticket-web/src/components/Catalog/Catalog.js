import { useEffect, useState } from "react";
import TicketCard from "../TicketCard/TicketCard";
import api from "../../api";

const Catalog = () => {
    const [tickets, setTickets] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [userId, setUserId] = useState(null);
    const ticketsToShow = 4;

  
    useEffect(() => {
        const fetchUserAndTickets = async () => {
            try {
                
                const user = await api.get('/me');
                setUserId(user.data._id);
                
               
                const response = await fetch('http://localhost:5000/api/tickets');
                if (!response.ok) {
                    throw new Error('Failed to Fetch');
                }
                const data = await response.json();
                
                
                const filteredTickets = data.filter(ticket => !ticket.buyer.includes(user.data._id));
                setTickets(filteredTickets);

            } catch (err) {
                console.error(err);
            }
        };

        fetchUserAndTickets();
    }, []); 

    const handleNext = () => {
        if (currentIndex === tickets.length - ticketsToShow) {
            setCurrentIndex(0);
        }
        if (currentIndex < tickets.length - ticketsToShow) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handlePrev = () => {
        if (currentIndex === 0) {
            setCurrentIndex(tickets.length - ticketsToShow);
        }
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    return (
        <div className="h-screen flex items-center justify-center">
            <div className="h-[56%] w-[96%] flex items-center justify-center bg-gradient-to-t from-blue-800 to-purple-800 rounded-xl">
                <div className="h-[98%] w-[99%] bg-black bg-opacity-40 flex rounded-lg items-center m-4 p-8">
                    <button
                        onClick={handlePrev}
                        className="text-black text-2xl w-[100px] m-4 flex items-center justify-center bg-gradient-to-l from-purple-600 to bg-red-600 rounded-xl"
                    >
                        &lt;
                    </button>
                    <div className="flex justify-around items-center h-full overflow-hidden w-full">
                        <div
                            className="flex transition-transform duration-[500ms]"
                            style={{ transform: `translateX(-${currentIndex * (100 / tickets.length)}%)` }}
                        >
                            {tickets.length > 0 ? (
                                tickets.map((ticket) => (
                                    <div key={ticket.id} className="flex-shrink-0">
                                        <TicketCard ticket={ticket} />
                                    </div>
                                ))
                            ) : (
                                <div className="bg-white bg-opacity-10 w-[400px] h-[200px] flex items-center justify-center rounded-lg">
                                    <p className="text-white text-[24px]">No tickets available</p>
                                </div>
                            )}
                        </div>
                    </div>
                    <button
                        onClick={handleNext}
                        className="text-black text-2xl w-[100px] m-4 flex items-center justify-center bg-gradient-to-l from-purple-600 to bg-red-600 rounded-xl"
                    >
                        &gt;
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Catalog;
