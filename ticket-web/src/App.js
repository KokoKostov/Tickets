
import React, { Suspense } from "react";
import  "./App.css"
import ProtectedRoutes from "./utils/ProtectedRoutes"
import { AuthProvider } from "./providers/AuthProvider";
import { CartProvider } from "./providers/CartProvider";
import { Route, Routes } from "react-router-dom";

import Header from "./components/Header/Header";
import CreateEvent from "./components/CreateEvent/CreateEvent";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Home from "./components/Home/Home";
import Edit from "./components/Edit/Edit";
import Loading from "./components/Loading/Loading";

const LazyCart = React.lazy(()=>import('./components/Cart/Cart'))
const LazyDetails = React.lazy(()=>import('./components/Details/Details'))
const LazyProfile = React.lazy(()=>import('./components/Profile/Profile'))
const LazyCatalog = React.lazy(()=>import('./components/Catalog/Catalog'))


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
          <Route
                path="/tickets/:id"
                element={
                  <Suspense fallback={<div>{Loading}</div>}>
                    <LazyDetails />
                  </Suspense>
                }
              />
          <Route
                path="/catalog"
                element={
                  <Suspense fallback={<div>{Loading}</div>}>
                    <LazyCatalog />
                  </Suspense>
                }
              />
          <Route element={<ProtectedRoutes/>}>
          <Route path="/create" element={<CreateEvent/> }/>
          <Route
                path="/profile/:id"
                element={
                  <Suspense fallback={<div>{Loading}</div>}>
                    <LazyProfile />
                  </Suspense>
                }
              />
          <Route
                path="/cart"
                element={
                  <Suspense fallback={<div>{Loading}</div>}>
                    <LazyCart />
                  </Suspense>
                }
              />
          <Route path="/tickets/edit/:id" element={<Edit/>}/>
        </Route>

      </Routes>
      </CartProvider>
      </AuthProvider>
    
    </div>
  );
}

export default App;
