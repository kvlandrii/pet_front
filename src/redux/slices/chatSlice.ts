import { createSlice } from '@reduxjs/toolkit'

interface ChatState {
    chatWithId: string
}

const initialState: ChatState = {
    chatWithId: '',
}

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setChatWithId: (state, action) => {
            state.chatWithId = action.payload
        },
    },
})

export const { setChatWithId } = chatSlice.actions
export const chatReducer = chatSlice.reducer
