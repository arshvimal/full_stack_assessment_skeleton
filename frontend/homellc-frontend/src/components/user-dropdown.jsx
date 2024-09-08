import React from 'react';
import { useFindAllUsersQuery, useLazyFindHomesByUserQuery } from '../features/api/apiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../features/userDropdown/selectUser';
import { setHomesByUser, clearHomesByUser, setTotalPages, setCurrentPage } from '../features/homesByUser/homesByUserSlice';

function UserDropdown() {
  const { data: users, isLoading } = useFindAllUsersQuery();
  const [getHomesByUser] = useLazyFindHomesByUserQuery();
  const currentPage = useSelector((state) => state.homesByUser.currentPage);
  const dispatch = useDispatch()

  const handleChange = async (e) => {
    dispatch(clearHomesByUser())
    dispatch(setCurrentPage(1))
    const selectedUser = users.find((user) => user.id === parseInt(e))
    dispatch(selectUser(selectedUser))
    const homes = await getHomesByUser({ userId: selectedUser.id, page: currentPage }, true).unwrap()
    dispatch(setHomesByUser(homes))
    dispatch(setTotalPages(homes.totalPages))
  }

  return (
    <select disabled={isLoading} defaultValue={0} onChange={(e) => handleChange(e.target.value)} className='h-10 w-32 rounded-md px-2 text-sm font-semibold text-secondary'>
      <option value={0} disabled hidden>
        {isLoading?
        "Loading..."
        : "Select User"
        }
      </option>
      {isLoading?
      <></>
      : users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.username}
          </option>
        ))}
    </select>
  );
};

export default UserDropdown;