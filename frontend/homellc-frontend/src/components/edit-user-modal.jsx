import React, { useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { selectUsers, unselectUsers, clearSelectedUsers } from "../features/editUserForHome/editUsersSlice"
import { useUpdateHomeUsersMutation, useLazyFindHomesByUserQuery } from "../features/api/apiSlice"
import { selectEditHome } from '../features/editUserForHome/editUsersSlice'
import { setHomesByUser } from '../features/homesByUser/homesByUserSlice'

function EditUserModal() {
  const [saveLoading, setSaveLoading] = useState(false)
  const [updateUsersForHome] = useUpdateHomeUsersMutation()
  const [getHomesByUser] = useLazyFindHomesByUserQuery();
  const dispatch = useDispatch()
  const selectedUsers = useSelector((state) => state.editUsers.selectedUsers)
  const selectedHome = useSelector((state) => state.editUsers.selectedHome)
  const allUsers = useSelector((state) => state.allUsers.allUsers)
  const selectedUser = useSelector((state) => state.userDropdown.selectedUser)


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
    console.log({ homeId, userIds })
    await updateUsersForHome({ homeId, userIds })
    dispatch(selectEditHome(null))
    dispatch(clearSelectedUsers())
    const homes = await getHomesByUser({ userId: selectedUser.id }).unwrap()
    dispatch(setHomesByUser(homes))
    setSaveLoading(false)
  }
  return (
    <>
      <div className={`fixed backdrop-blur-sm inset-0 flex items-center justify-center ${selectedHome ? 'visible' : 'hidden'}`}>
          <dialog open={selectedHome} className="w-80 p-4 border-2 bg-white border-secondaryMuted rounded-md">
            <p className="text-secondary font-semibold text-xl pb-2">Modify Users </p>
            {saveLoading?
            allUsers.map((user) => (
              <div key={user.id} className="flex items-center mb-1 text-secondary">
                <input disabled className="w-4 h-4 rounded-sm bg-white border-secondaryMuted text-primaryMuted focus:ring-primaryMuted" type="checkbox" checked={selectedUsers.map(u => u.id).includes(user.id)} onChange={() => handleCheckboxChange(user.id)}  id={user.id} name={user.username} />
                <label className="ms-2 text-sm font-medium" htmlFor={user.id}>{user.username}</label>
              </div>
            )) :
            allUsers.map((user) => (
              <div key={user.id} className="flex items-center mb-1 text-secondary">
                <input className="w-4 h-4 rounded-sm bg-white border-secondary text-primary focus:ring-primary" type="checkbox" checked={selectedUsers.map(u => u.id).includes(user.id)} onChange={() => handleCheckboxChange(user.id)}  id={user.id} name={user.username} />
                <label className="ms-2 text-sm font-medium" htmlFor={user.id}>{user.username}</label>
              </div>
            ))}
            <div className="flex justify-end mt-4">
              
              {saveLoading?
              <>
              <button disabled className="w-18 h-8 bg-white text-sm text-secondaryMuted border-secondaryMuted px-4 py-1 rounded-md me-4">Cancel</button>
              <button disabled className="w-18 h-8 bg-primaryMuted text-sm text-white px-4 py-1 rounded-md">Saving...</button>
              </>
              : <>
              <button onClick={handleCancel} className="w-18 h-8 bg-white text-sm text-secondary border-secondary px-4 py-1 rounded-md me-4">Cancel</button>
              <button onClick={handleSave} className="w-18 h-8 bg-primary text-sm text-white px-4 py-1 rounded-md">Save</button>
              </>
              }
              
            </div>
          </dialog>
      </div>
    </>
  );
}

export default EditUserModal;