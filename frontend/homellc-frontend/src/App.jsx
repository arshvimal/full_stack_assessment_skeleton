import UserDropdown from "./components/user-dropdown"
import EditUserModal from "./components/edit-user-modal"
import React from 'react';
import HomeCard from "./components/home-card";
import { useSelector } from "react-redux";
import Pagination from "./components/pageination";

function App() {
  const homes = useSelector((state) => state.homesByUser.homesByUser)
  return (
    <div className="grid ">
      <EditUserModal/>
      <div className="flex items-center justify-center h-16">
      <UserDropdown />
      </div>
      <div className="w-11/12 m-auto h-0.5 bg-secondaryMuted"></div>
      {
        !homes.results?
        <div className="flex items-center justify-center">
          <p className="text-secondary font-bold text-2xl">Select a user to view homes</p>
        </div>
        : <div>
          <div className="flex text-secondary justify-center pt-2">
            <Pagination currentPage={homes.currentPage} totalPages={homes.totalPages} />
          </div>
            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
              {homes.results.map((home) => (
                <HomeCard key={home.id} home={home} />
              ))
              }
            </div>
        </div>
        
      }
    </div>
  )
}

export default App
