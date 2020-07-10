import { combineReducers } from "@reduxjs/toolkit";
import gifStreamSlice from "./gifStreamSlice";
import gifSlice from "./gifSlice";

const rootReducer = combineReducers({ gifStreamSlice, gifSlice });

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
