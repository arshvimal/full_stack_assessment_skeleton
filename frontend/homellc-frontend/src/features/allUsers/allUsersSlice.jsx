import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  allUsers: [],
}

const allUsersSlice = createSlice({
  name: 'allUsers',
  initialState,
  reducers: {
    setAllUsers: (state, action) => {
      state.allUsers = action.payload
    },
  },
})

export const { setAllUsers } = allUsersSlice.actions
export default allUsersSlice.reducer

