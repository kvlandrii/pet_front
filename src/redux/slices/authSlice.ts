'use client'

import { queryClient } from '@/clients/queryClient'
import { User } from '@/lib/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
    user: User | null
}

const initialState: AuthState = {
    user: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User | null>) => {
            state.user = action.payload
        },
        logout: (state) => {
            state.user = null
            localStorage.removeItem('token')
            queryClient.setQueryData(['user'], null)
        },
    },
})

export const { setUser, logout } = authSlice.actions
export const authReducer = authSlice.reducer
