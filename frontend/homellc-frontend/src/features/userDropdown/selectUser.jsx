import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  selectedUser: null,
}

export const userDropdownSlice = createSlice({
  name: 'userDropdown',
  initialState,
  reducers: {
    selectUser: (state, action) => {
      state.selectedUser = action.payload
    },
  },
})

export const { selectUser } = userDropdownSlice.actions
export default userDropdownSlice.reducer