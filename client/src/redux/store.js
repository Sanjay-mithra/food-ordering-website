import { configureStore, combineReducers } from '@reduxjs/toolkit'
import userReducer from './features/userSlice'
import adminReducer from './features/AdminSlice'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

// Combine reducers
const rootReducer = combineReducers({
  user: userReducer,
  admin: adminReducer,
})

// Persist configuration
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'admin'], // only persist user and admin slices
}

// Apply persist reducer to root reducer
const persistedReducer = persistReducer(persistConfig, rootReducer)

// Create store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export const persistor = persistStore(store)
