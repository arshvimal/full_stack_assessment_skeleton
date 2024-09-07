import { configureStore } from '@reduxjs/toolkit';
import { homellcApi } from '../features/api/apiSlice';
import editUsers from '../features/editUserForHome/editUsersSlice';
import allUsers from '../features/allUsers/allUsersSlice';
import userDropdown from '../features/userDropdown/selectUser';
import homesByUser from '../features/homesByUser/homesByUserSlice';

export const store = configureStore({
  reducer: {
    [homellcApi.reducerPath]: homellcApi.reducer,
    editUsers,
    allUsers,
    userDropdown,
    homesByUser,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(homellcApi.middleware),
});
