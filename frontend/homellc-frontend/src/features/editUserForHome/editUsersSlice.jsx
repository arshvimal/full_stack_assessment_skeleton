import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  checkedUsers: [],
  selectedHomeToEdit: null,
}

export const editUsersSlice = createSlice({
  name: 'editUsers',
  initialState,
  reducers: {
    checkUsers: (state, action) => {
      state.checkedUsers = action.payload
    },
    checkUser: (state, action) => {
      state.checkedUsers.push(action.payload)
    },
    uncheckUser: (state, action) => {
      state.checkedUsers = state.checkedUsers.filter(user => user.id !== action.payload.id)
    },
    clearCheckedUsers: (state) => {
      state.checkedUsers = []
    },
    selectHomeToEdit: (state, action) => {
      state.selectedHome = action.payload
    },
  },
})

export const { checkUsers, checkUser, selectHomeToEdit, uncheckUser, clearCheckedUsers } = editUsersSlice.actions
export default editUsersSlice.reducer