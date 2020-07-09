import { combineReducers } from '@reduxjs/toolkit'
import gifStreamSlice from './gifStreamSlice'

const rootReducer = combineReducers({ gifStreamSlice })

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer