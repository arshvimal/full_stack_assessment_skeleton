import React, { useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { selectUsers, unselectUsers, clearSelectedUsers } from "../features/editUserForHome/editUsersSlice"
import { useUpdateHomeUsersMutation, useLazyFindHomesByUserQuery, useFindAllUsersQuery } from "../features/api/apiSlice"
import { selectEditHome } from '../features/editUserForHome/editUsersSlice'
import { setHomesByUser } from '../features/homesByUser/homesByUserSlice'

function EditUserModal() {
  const [saveLoading, setSaveLoading] = useState(false)
  const [updateUsersForHome] = useUpdateHomeUsersMutation()
  const [getHomesByUser] = useLazyFindHomesByUserQuery();
  const dispatch = useDispatch()
  const selectedHome = useSelector((state) => state.editUsers.selectedHome)
  const selectedUsers = useSelector((state) => state.editUsers.selectedUsers)
  const selectedUser = useSelector((state) => state.userDropdown.selectedUser)
  const {data: allUsers, isLoading: allUsersLoading} = useFindAllUsersQuery();

  const handleCheckboxChange = (userId) => {
    if (selectedUsers.map(u => u.id).includes(userId)) {
      dispatch(unselectUsers({ id: userId }))
    } else {
      dispatch(selectUsers({ id: userId }))
    }
  }

  const handleCancel = () => {
    dispatch(clearSelectedUsers())
    dispatch(selectEditHome(null))
  }

  const handleSave = async () => {
    setSaveLoading(true)
    const userIds = selectedUsers.map(user => user.id)
    const homeId = selectedHome.id
    await updateUsersForHome({ homeId, userIds })
    dispatch(selectEditHome(null))
    dispatch(clearSelectedUsers())
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
  } else{
    return (
      <>
        <div className={`fixed backdrop-blur-sm inset-0 flex items-center justify-center ${selectedHome ? 'visible' : 'hidden'}`}>
            <dialog open={selectedHome} className="w-80 p-4 border-2 bg-white border-secondaryMuted rounded-md">
              <p className="text-secondary font-semibold text-xl pb-2">Modify Users </p>
              {allUsers.map((user) => (
                  <div key={user.id} className="flex items-center mb-1 text-secondary">
                    <input disabled={saveLoading} className={`w-4 h-4 rounded-sm bg-white ${saveLoading? `border-secondaryMuted text-primaryMuted focus:ring-primaryMuted`:`border-secondary text-primary focus:ring-primary` } `} type="checkbox" checked={selectedUsers.map(u => u.id).includes(user.id)} onChange={() => handleCheckboxChange(user.id)}  id={user.id} name={user.username} />
                    <label className="ms-2 text-sm font-medium" htmlFor={user.id}>{user.username}</label>
                  </div>
                ))}
              <p className={`text-red-700 text-sm font-semibold pb-2 ${selectedUsers<1?'visible' : 'hidden'}`}>At least one user must be selected</p>
              <div className="flex justify-end mt-4">
                <button disabled={saveLoading} onClick={handleCancel} className={`w-18 h-8 bg-white text-sm ${saveLoading?`text-secondaryMuted border-secondaryMuted`:`text-secondary border-secondary`} px-4 py-1 rounded-md me-4`}>Cancel</button>
                <button disabled={saveLoading} onClick={handleSave} className={`w-18 h-8 ${saveLoading||selectedUsers<1?`bg-primaryMuted`:`bg-primary`} text-sm text-white px-4 py-1 rounded-md`}>
                  {saveLoading? 'Saving...': 'Save'}
                </button>
              </div>
            </dialog>
        </div>
      </>
    );
  }
  
}

export default EditUserModal;