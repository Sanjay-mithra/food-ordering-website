import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  adminInfo: {},
}

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setAdminInfo: (state, action) => {
      state.adminInfo = action.payload
    },
    clearAdminInfo: (state) => {
      state.adminInfo = {}
    },
  },
})

export const { setAdminInfo, clearAdminInfo } = adminSlice.actions
export default adminSlice.reducer


// import { createSlice } from '@reduxjs/toolkit'

//   const initialState={
//     user:{}
//   } 
  
// export const userSlice = createSlice({
//   name: 'user',
//   initialState ,
//   reducers: {
//     saveUser: (state,action) => {
//       state.user = action.payload
//     },
//     clearUser: (state) => {
//       state.user = {}
//     },
//   },
// })

// export const { saveUser,clearUser} = userSlice.actions

// export default userSlice.reducer
