import { createSlice } from '@reduxjs/toolkit'

interface ChatState {
    selectedUserId: string
}

const initialState: ChatState = {
    selectedUserId: '',
}

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setSelectedUserId: (state, action) => {
            state.selectedUserId = action.payload
        },
    },
})

export const { setSelectedUserId } = chatSlice.actions
export const chatReducer = chatSlice.reducer
