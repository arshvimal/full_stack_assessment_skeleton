import UserDropdown from "./components/user-dropdown"
import EditUserModal from "./components/edit-user-modal"
import React from 'react';
import HomeCard from "./components/home-card";
import { useSelector } from "react-redux";
import Pagination from "./components/pageination";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function App() {
  var homes = useSelector((state) => state.homesByUser.homesByUser)
  const selectedUser = useSelector((state) => state.userDropdown.selectedUser);

  function Pages(){
    if(selectedUser!=null){
      return(
        <div className="flex text-secondary justify-center pt-2">
          <Pagination currentPage={homes.currentPage} totalPages={homes.totalPages} />
        </div>
      )
    }
  }

  function HomeCards(){
    if(homes.results){
      return(
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {homes.results.map((home) => (
            <HomeCard key={home.id} home={home} />
          ))
          }
        </div>
      )
    } else{
      return(
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {Array.from({ length: 50 }).map((_, index) => (
            <div key={index} className="p-4 border-2 border-secondaryMuted text-secondary max-w-96 min-w-64 rounded-md">
              <Skeleton className="h-7 w-4/6"/>
              <Skeleton className="h-5 w-4/5"/>
              <Skeleton className="h-5 w-3/5"/>
              <Skeleton className="h-5 w-2/5"/>
              <div className="flex justify-start space-x-2 mt-1">
                <Skeleton className="bg-primaryMuted h-7 w-12"/>
                <Skeleton className="bg-primaryMuted h-7 w-12"/>
              </div>
              <div>
                <button disabled className=" w-full bg-primaryMuted text-white rounded-md mt-2">Loading...</button>
              </div>
            </div>
          ))}
        </div>
      )
    }
  }

  function Homes() {
    if(selectedUser!=null){
      return(
        <HomeCards/>
      )
    }else{
      return(
        <div className="flex items-center justify-center">
          <p className="text-secondary font-bold text-2xl">Select a user to view homes</p>
        </div>
      )
    }
  }
  return (
    <div className="grid ">
      <EditUserModal/>
      <div className="flex items-center justify-center h-16">
      <UserDropdown />
      </div>
      <div className="w-11/12 m-auto h-0.5 bg-secondaryMuted"></div>
      <div>
        <Pages/>
        <Homes/>
      </div>
    </div>
  )
}

export default App
