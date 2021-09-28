import { configureStore } from '@reduxjs/toolkit';
import sliceReducer from "../features/problem/problemSlice";
import usersReducer  from "../features/users/usersSlice";
import searchReducer from "../features/search/searchSlice";

export const store = configureStore({
  reducer: {
    problems : sliceReducer, 
    users : usersReducer,
    search : searchReducer
  },
});
