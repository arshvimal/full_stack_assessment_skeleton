import React, { useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { checkUser, uncheckUser, clearCheckedUsers, selectHomeToEdit } from "../features/editUserForHome/editUsersSlice"
import { useUpdateHomeUsersMutation, useLazyFindHomesByUserQuery, useFindAllUsersQuery } from "../features/api/apiSlice"
import { setHomesByUser } from '../features/homesByUser/homesByUserSlice'

function EditUserModal() {
  const [saveLoading, setSaveLoading] = useState(false)
  const [updateUsersForHome] = useUpdateHomeUsersMutation()
  const [getHomesByUser] = useLazyFindHomesByUserQuery();
  const dispatch = useDispatch()
  const editUsers = useSelector((state) => state.editUsers)
  const selectedHome = editUsers.selectedHome
  const checkedUsers = editUsers.checkedUsers
  const selectedUser = useSelector((state) => state.userDropdown.selectedUser)
  const {data: allUsers, isLoading: allUsersLoading, error: allUsersError} = useFindAllUsersQuery();

  const handleCheckboxChange = (userId) => {
    if (checkedUsers.map(u => u.id).includes(userId)) {
      dispatch(uncheckUser({ id: userId }))
    } else {
      dispatch(checkUser({ id: userId }))
    }
  }

  const handleCancel = () => {
    dispatch(clearCheckedUsers())
    dispatch(selectHomeToEdit(null))
  }

  const handleSave = async () => {
    setSaveLoading(true)
    const userIds = checkedUsers.map(user => user.id)
    const homeId = selectedHome.id
    await updateUsersForHome({ homeId, userIds })
    dispatch(selectHomeToEdit(null))
    dispatch(clearCheckedUsers())
    const homes = await getHomesByUser({ userId: selectedUser.id }).unwrap()
    dispatch(setHomesByUser(homes))
    setSaveLoading(false)
  }

  if(allUsersLoading){
    return(
      <div className={`fixed backdrop-blur-sm inset-0 flex items-center justify-center ${selectedHome ? 'visible' : 'hidden'}`}>
        <dialog open={selectedHome} className="w-80 p-4 border-2 bg-white border-secondaryMuted rounded-md">
        <p className="text-secondary font-semibold text-xl pb-2">Getting Users</p>
        </dialog>
      </div>
    )
  } else if(allUsersError){
    return(
      <div className={`fixed backdrop-blur-sm inset-0 flex items-center justify-center ${selectedHome ? 'visible' : 'hidden'}`}>
        <dialog open={selectedHome} className="w-80 p-4 border-2 bg-white border-secondaryMuted rounded-md">
        <p className="text-secondary font-semibold text-xl pb-2">Error</p>
        <p className="text-red-700 text-sm font-semibold pb-2">An error occured while fetching users</p>
        </dialog>
      </div>
    )
  }
  else{
    return (
      <div className={`fixed backdrop-blur-sm inset-0 flex items-center justify-center ${selectedHome ? 'visible' : 'hidden'}`}>
          <dialog open={selectedHome} className="w-80 p-4 border-2 bg-white border-secondaryMuted rounded-md">
            <p className="text-secondary font-semibold text-xl pb-2">Modify Users </p>
            {allUsers.map((user) => (
                <div key={user.id} className="flex items-center mb-1 text-secondary">
                  <input disabled={saveLoading} className={`w-4 h-4 rounded-sm bg-white ${saveLoading? `border-secondaryMuted text-primaryMuted focus:ring-primaryMuted`:`border-secondary text-primary focus:ring-primary` } `} type="checkbox" checked={checkedUsers.map(u => u.id).includes(user.id)} onChange={() => handleCheckboxChange(user.id)}  id={user.id} name={user.username} />
                  <label className="ms-2 text-sm font-medium" htmlFor={user.id}>{user.username}</label>
                </div>
              ))}
            <p className={`text-red-700 text-sm font-semibold pb-2 ${checkedUsers<1?'visible' : 'hidden'}`}>At least one user must be selected</p>
            <div className="flex justify-end mt-4">
              <button disabled={saveLoading} onClick={handleCancel} className={`w-18 h-8 bg-white text-sm ${saveLoading?`text-secondaryMuted border-secondaryMuted`:`text-secondary border-secondary`} px-4 py-1 rounded-md me-4`}>Cancel</button>
              <button disabled={saveLoading} onClick={handleSave} className={`w-18 h-8 ${saveLoading||checkedUsers<1?`bg-primaryMuted`:`bg-primary`} text-sm text-white px-4 py-1 rounded-md`}>
                {saveLoading? 'Saving...': 'Save'}
              </button>
            </div>
          </dialog>
      </div>
    );
  }
  
}

export default EditUserModal;