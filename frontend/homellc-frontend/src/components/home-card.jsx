import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { selectHomeToEdit, checkUsers } from '../features/editUserForHome/editUsersSlice';
import { useLazyFindUsersByHomeQuery } from '../features/api/apiSlice';

function HomeCard({home}) {
  const dispatch = useDispatch()
  const [getUsersByHome, {error}] = useLazyFindUsersByHomeQuery()
  const [gettingUsers, setGettingUsers] = useState(false)

  const editUsers = async () => {
    setGettingUsers(true)
    const selectedUsers = await getUsersByHome(home.id).unwrap()
    dispatch(selectHomeToEdit(home))
    dispatch(checkUsers(selectedUsers))
    setGettingUsers(false)
  }
  return (
    <div className="p-4 border-2 border-secondaryMuted text-secondary min-w-48 rounded-md">
      <p className="font-black text-secondary text-2xl">$ {home.list_price}</p>
      <p className="font-bold">{home.street_address}</p>
      <p className="font-semibold text-secondary">{home.state}, {home.zip}</p>
      <p className="font-medium">{home.sqft} ft{'\u00B2'} </p>
      <div className="flex justify-start space-x-2 mt-1">
        <div className="flex bg-primaryMuted text-secondary px-2 py-1 rounded-lg">
        <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-bed"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 9m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M22 17v-3h-20" /><path d="M2 8v9" /><path d="M12 14h10v-2a3 3 0 0 0 -3 -3h-7v5z" /></svg>
        <p className="font-medium pl-1">{home.beds} </p>
        </div>
        <div className="flex bg-primaryMuted text-secondary px-2 py-1 rounded-lg">
        <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-bath"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 12h16a1 1 0 0 1 1 1v3a4 4 0 0 1 -4 4h-10a4 4 0 0 1 -4 -4v-3a1 1 0 0 1 1 -1z" /><path d="M6 12v-7a2 2 0 0 1 2 -2h3v2.25" /><path d="M4 21l1 -1.5" /><path d="M20 21l-1 -1.5" /></svg>
        <p className="font-medium pl-1">{home.baths} </p>
        </div>
      </div>
      <div>
      <button disabled={gettingUsers} onClick={editUsers} className={`w-full ${gettingUsers||error? `bg-primaryMuted`:`bg-primary`}  text-white rounded-md mt-2`}>
      {error?('API Error...'):(gettingUsers? 'Please Wait...': 'Edit Users')}
      </button>
      </div>
    </div>
  )
}

export default HomeCard;