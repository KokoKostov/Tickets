import { useEffect, useState } from "react";
import TicketCard from "../TicketCard/TicketCard";
import { api } from "../../api";
import { useAuth } from "../../providers/AuthProvider";

const Catalog = () => {
    const [tickets, setTickets] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const ticketsToShow = 4;

    const { user } = useAuth();

    const fetchTickets = async () => {
        try {
            const ticketResponse = await api.get('/tickets');
            if (ticketResponse.status !== 200) {
                throw new Error('Failed to fetch tickets.');
            }

            const ticketData = ticketResponse.data;
            const filteredTickets = userId
                ? ticketData.filter(ticket => !ticket.buyer.includes(userId))
                : ticketData;

            setTickets(filteredTickets);
        } catch (err) {
            console.error('Error fetching tickets:', err);
            setError('Failed to load tickets'); 
        } finally {
            setLoading(false); 
        }
    };

    useEffect(() => {
        const fetchUserAndTickets = async () => {
            try {
                if (user && user._id) {
                    setUserId(user._id);
                }
                await fetchTickets();
            } catch (err) {
                console.error('Error fetching user and tickets:', err);
                setError('Failed to load user data');
            }
        };

        fetchUserAndTickets();
    }, [user]); 

    const handleNext = () => {
        if (currentIndex < tickets.length - ticketsToShow) {
            setCurrentIndex(currentIndex + 1);
        } else {
            setCurrentIndex(0);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        } else {
            setCurrentIndex(tickets.length - ticketsToShow); 
        }
    };

    if (loading) {
        return (
            <div>Loading...</div> 
        );
    }

    if (error) {
        return (
            <div>{error}</div>
        );
    }

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
                                    <div key={ticket._id} className="flex-shrink-0">
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
