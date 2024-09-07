import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';

function Layout() {
  return (
    <div
      className="bg-cover bg-center h-screen bg-no-repeat"
      style={{
        backgroundImage: "url('https://besthqwallpapers.com/Uploads/8-5-2020/132559/night-summer-party-4k-beach-abstract-nightscapes-concert.jpg')",
      }}
    >
      <div className="flex-col w-full h-full flex bg-black bg-opacity-60">
        <Header />
        <div className="flex-grow flex justify-center items-center">
          <Outlet /> {/* This will render the current route's component */}
        </div>
      </div>
    </div>
  );
}

export default Layout;
