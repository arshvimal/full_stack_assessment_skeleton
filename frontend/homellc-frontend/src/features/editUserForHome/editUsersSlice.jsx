import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  selectedUsers: [],
  selectedHome: null,
}

export const editUsersSlice = createSlice({
  name: 'editUsers',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.selectedUsers = action.payload
    },
    selectUsers: (state, action) => {
      state.selectedUsers.push(action.payload)
    },
    unselectUsers: (state, action) => {
      state.selectedUsers = state.selectedUsers.filter(user => user.id !== action.payload.id)
    },
    clearSelectedUsers: (state) => {
      state.selectedUsers = []
    },
    selectEditHome: (state, action) => {
      state.selectedHome = action.payload
    },
  },
})

export const { setUsers, selectUsers, selectEditHome, unselectUsers, clearSelectedUsers } = editUsersSlice.actions
export default editUsersSlice.reducer