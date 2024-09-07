import { Link } from "react-router-dom";

const TicketCard = ({ ticket }) => {
    
    return (
        <div className="bg-gradient-to-r from-purple-600 to-pink-800 w-[358px] h-[355px] flex items-center justify-center rounded-2xl m-2">
        <Link
            to={`/tickets/${ticket._id}`}
            state={{ ticket }}
            className="group flex flex-col shadow-lg w-[350px] rounded-[15px] relative overflow-hidden transition-transform duration-500"
        >
            <div className="bg-red-600 w-[90px] absolute h-[90px] flex flex-col items-center justify-center right-5 rounded-b-full  ">
                <p className="text-[16px] text-red-50">Date:</p>
                <p className="px-4 text-red-50 text-[16px]">{new Date(ticket.date).toLocaleDateString()}</p>
           
            
            </div>
            <img
                className="w-full h-[350px] object-cover"
                src={ticket.image || "https://t3.ftcdn.net/jpg/05/03/58/28/360_F_503582859_7SJMOrd2Xf5ujdBjrBCam7ngr9wc84vH.jpg"}
                alt={ticket.name}
            />
                
  
            <div className="flex flex-col absolute left-0 right-0 -bottom-1/4 bg-black bg-opacity-80 text-white transition-transform duration-700 ease-in-out transform group-hover:translate-y-[-80px] h-[40%]">
                <div className="flex  justify-around items-center mt-2">
                    <h2 className="text-[22px] m-0">{ticket.name}</h2>
                    <p className="text-[20px] text-red-50">{ticket.price}$</p>
                   
                    
                </div>
                <div className="pt-[10px] pb-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out">
                    <div className="flex justify-between text-[18px] my-[10px]">
                        <p className="px-4">Location: {ticket.location}</p>
                        <p className=" px-4">Address: {ticket.address}</p>
                        
                    </div>
                    {/* <div className="flex justify-between text-[16px] my-[10px]">
                        
                    </div> */}
                </div>
            </div>
        </Link>
        </div>
    );
};

export default TicketCard;
