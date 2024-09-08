

import Header from "./components/Header/Header";
import ProtectedRoutes from "./utils/ProtectedRoutes"
import  "./App.css"
import CreateEvent from "./components/CreateEvent/CreateEvent";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Details from "./components/Details/Details";
import { AuthProvider } from "./providers/AuthProvider";
import Home from "./components/Home/Home";
import Catalog from "./components/Catalog/Catalog";
import Edit from "./components/Edit/Edit";
import Profile from "./components/Profile/Profile";
import { CartProvider } from "./providers/CartProvider";
import Cart from "./components/Cart/Cart";


function App() {

  return (
    <div className="App">
  
      
      <AuthProvider>
        <CartProvider>
      <Header/>
      <Routes>
    
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/> }/>
        <Route path="/register" element={<Register/> }/>
        <Route path= "/tickets/:id" element={<Details/> }/>
        <Route path= "/catalog" element={<Catalog/>}/>

        <Route element={<ProtectedRoutes/>}>
          <Route path="/create" element={<CreateEvent/> }/>
          <Route path="/profile/:id" element={<Profile/> }/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path="/tickets/edit/:id" element={<Edit/>}/>
        </Route>
     
      </Routes>
      </CartProvider>
      </AuthProvider>
     
    
    </div>
  );
}

export default App;
