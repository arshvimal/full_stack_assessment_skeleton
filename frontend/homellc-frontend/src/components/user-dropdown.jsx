import React from 'react';
import { useFindAllUsersQuery, useLazyFindHomesByUserQuery } from '../features/api/apiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../features/userDropdown/selectUser';
import { setHomesByUser, clearHomesByUser, setTotalPages, setCurrentPage } from '../features/homesByUser/homesByUserSlice';

function UserDropdown() {
  const { data: allUsers, isLoading: allUsersLoading, error: allUsersError } = useFindAllUsersQuery();
  const [getHomesByUser,{error:findHomesByUserError}] = useLazyFindHomesByUserQuery();
  const currentPage = useSelector((state) => state.homesByUser.currentPage);
  const dispatch = useDispatch()

  const handleChange = async (e) => {
    dispatch(clearHomesByUser())
    dispatch(setCurrentPage(1))
    const selectedUser = allUsers.find((user) => user.id === parseInt(e))
    dispatch(selectUser(selectedUser))
    const homes = await getHomesByUser({ userId: selectedUser.id, page: currentPage }, true).unwrap()
    dispatch(setHomesByUser(homes))
    dispatch(setTotalPages(homes.totalPages))
  }

  return (
    <>
    <div className={`fixed backdrop-blur-sm inset-0 flex items-center justify-center ${findHomesByUserError ? 'visible' : 'hidden'}`}>
      <dialog open={findHomesByUserError} className="w-80 p-4 border-2 bg-white border-secondaryMuted rounded-md">
      <p className="text-secondary font-semibold text-xl">API Error Fetching Homes</p>
      </dialog>
    </div>
    <select disabled={allUsersLoading||allUsersError} defaultValue={0} onChange={(e) => handleChange(e.target.value)} className='h-10 w-32 rounded-md px-2 text-sm font-semibold text-secondary'>
      <option value={0} disabled hidden>
        {allUsersError?('API Error'):(allUsersLoading? "Loading..." : "Select User")}
      </option>
      {allUsersLoading||allUsersError?
      <></>
      : allUsers.map((user) => (
          <option key={user.id} value={user.id}>
            {user.username}
          </option>
        ))}
    </select>
    </>
  );
};

export default UserDropdown;