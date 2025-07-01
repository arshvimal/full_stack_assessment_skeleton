import UserDropdown from "./components/user-dropdown"
import EditUserModal from "./components/edit-user-modal"
import HomeCard from "./components/home-card";
import { useSelector } from "react-redux";
import Pagination from "./components/pageination";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function App() {
  const homes = useSelector((state) => state.homesByUser.homesByUser)
  const selectedUser = useSelector((state) => state.userDropdown.selectedUser);
  const frontendHost = import.meta.env.VITE_FRONTEND_HOST

  function Pages(){
    if(selectedUser!=null){
      return(
        <div className="flex text-secondary justify-center pt-4">
          <Pagination currentPage={homes.currentPage} totalPages={homes.totalPages} />
        </div>
      )
    }
  }

  function HomeCards(){
    if(homes.results){
      return(
        <div className="px-8 pt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {homes.results.map((home) => (
            <div key={home.id} className="flex-grow items-center justify-center">
            <HomeCard home={home} />
            </div>
          ))
          }
        </div>
      )
    } else{
      return(
        <div className="px-8 pt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {Array.from({ length: 50 }).map((_, index) => (
            <div key={index} className="p-4 border-2 border-secondaryMuted text-secondary min-w-48 rounded-md">
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
      <div className="flex items-center justify-center h-8 bg-primary">
        <h1 className="text-white text-lg font-bold">Frontend Host: {frontendHost}</h1>
      </div>
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
