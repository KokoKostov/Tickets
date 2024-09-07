import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateEvent.css";

import {api} from '../../api'
const CreateEvent =  () => {
  
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    date: "",
    address: "",
    image: "",
    price: "",
    description: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((ogFormData) => ({ ...ogFormData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
  
      
      const response = await api.post("/tickets", formData);
  
    
      console.log("Created Event:", response.data);
      
      navigate("/"); 
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while creating the event.");
    }
  };
  

  return (
    <div className="flex items-center justify-center py-8">
    <div className="w-fit max-h-fit bg-gradient-to-r from-red-500 to-pink-800">
    <div className="flex justify-center p-2">
      
      <form className="flex flex-col justify-center items-center w-[400px] p-8 rounder-l bg-white opacity-85" onSubmit={handleSubmit}>
        <h2 className="text-2xl mb-4">Create a new Event</h2>

        <div className="input-container">
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Event Name"
            value={formData.name}
            onChange={handleChange}
            className="input-field"
            
          />
          <label htmlFor="name" className="input-label">
            Event Name
          </label>
          <span className="input-highlight"></span>
        </div>

        <div className="input-container">
          <input
            type="date"
            id="date"
            name="date"
           placeholder="Event date"
           
            value={formData.date}
            onChange={handleChange}
            className="input-field"
            
          />
          <label htmlFor="date" className="input-label">
            Event Date
          </label>
          <span className="input-highlight"></span>
        </div>

        <div className="input-container">
          <input
            type="text"
            id="location"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
           className="input-field"
            
          />
          <label htmlFor="location" className="input-label">
            Location
          </label>
          <span className="input-highlight"></span>
        </div>

        <div className="input-container">
          <input
            type="text"
            id="address"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
           className="input-field"
            
          />
          <label htmlFor="address" className="input-label">
            Address
          </label>
          <span className="input-highlight"></span>
        </div>

        <div className="input-container">
          <input
            type="text"
            id="image"
            name="image"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleChange}
           className="input-field"
          />
          <label htmlFor="image" className="input-label">
            Image URL
          </label>
          <span className="Image-url"></span>
        </div>

        <div className="input-container">
          <input
            type="text"
            id="price"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
           className="input-field"
            
          />
          <label htmlFor="price" className="input-label">
            Price
          </label>
          <span className="Price"></span>
        </div>
        <div className="input-container">
          <input
            type="text"
            id="description"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
           className="input-field"
            
          />
          <label htmlFor="description" className="input-label">
         Description
          </label>
          <span className="description"></span>
        </div>

        <button type="submit">Create</button>
      </form>
    </div>
    </div>
    </div>
  );
};

export default CreateEvent;
