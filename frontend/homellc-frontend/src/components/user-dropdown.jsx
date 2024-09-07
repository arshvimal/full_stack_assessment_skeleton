import React from 'react';
import { useFindAllUsersQuery, useLazyFindHomesByUserQuery } from '../features/api/apiSlice';
import { useDispatch } from 'react-redux';
import { selectUser } from '../features/userDropdown/selectUser';
import { setAllUsers } from '../features/allUsers/allUsersSlice';
import { setHomesByUser, setTotalPages } from '../features/homesByUser/homesByUserSlice';

function UserDropdown() {
  const { data: users, isLoading } = useFindAllUsersQuery();
  const [getHomesByUser] = useLazyFindHomesByUserQuery();
  const dispatch = useDispatch()

  const handleChange = async (e) => {
    const selectedUser = users.find((user) => user.id === parseInt(e))
    const homes = await getHomesByUser({ userId: selectedUser.id }).unwrap()
    dispatch(setHomesByUser(homes))
    dispatch(setTotalPages(homes.totalPages))
    dispatch(selectUser(selectedUser))
    dispatch(setAllUsers(users))
  }

  return (
    <select defaultValue={0} onChange={(e) => handleChange(e.target.value)} className='h-10 w-32 rounded-md px-2 text-sm font-semibold text-secondary'>
    <option value={0} disabled hidden>Select User</option>
      {isLoading? 
      <option>Loading...</option>
      : users.map((user) => (
        <option key={user.id} value={user.id}>
          {user.username}
        </option>
      ))}
    </select>
  );
};

export default UserDropdown;