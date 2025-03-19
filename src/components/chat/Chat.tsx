'use client'
import { config } from '@/configs/env'
import { cn } from '@/helpers/cn'
import { MessageType } from '@/lib/types'
import { RootState } from '@/redux/store'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { io, Socket } from 'socket.io-client'
import Message from './Message'
import { getToken } from '@/helpers/getToken'

const Chat = () => {
    const socketRef = useRef<Socket | null>(null)
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState<MessageType[]>([])
    const selectedUserId = useSelector(
        (state: RootState) => state.chat.selectedUserId
    )
    const [roomName, setRoomName] = useState('')
    const [isEditMessage, setIsEditMessage] = useState(false)
    const [editMessageId, setEditMessageId] = useState('')

    const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (message.trim()) {
            socketRef.current?.emit('message', {
                roomName: roomName,
                content: message,
            })

            setMessage('')
        }
    }

    const updateMessage = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (message.trim()) {
            socketRef.current?.emit('updateMessage', {
                roomName: roomName,
                messageId: editMessageId,
                content: message,
            })

            setMessage('')
            setIsEditMessage(false)
        }
    }

    const handleCancelEdit = () => {
        setIsEditMessage(false)
        setEditMessageId('')
        setMessage('')
    }

    const onInputKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
        if (e.key === 'Escape') {
            e.preventDefault()
            handleCancelEdit()
        }
    }

    const handleEdit = (message: MessageType) => {
        setIsEditMessage(true)
        setEditMessageId(message.id)
        setMessage(message.content)
    }

    const handleDelete = (message: MessageType) => {
        socketRef.current?.emit('deleteMessage', {
            roomName: roomName,
            messageId: message.id,
        })
    }

    useEffect(() => {
        if (selectedUserId) {
            socketRef.current = io(config.socketUrl, {
                auth: { token: getToken() },
            })

            socketRef.current.emit('join', {
                partnerId: selectedUserId,
            })

            socketRef.current.on('joinedRoom', (data) => {
                setRoomName(data.roomName)
                setMessages(data.messages)
            })

            socketRef.current.on('message', (data) => {
                setMessages((prevMessages) => [...prevMessages, data.message])
            })

            socketRef.current.on('deleteMessage', (data) => {
                setMessages(data.messages)
            })

            socketRef.current.on('updateMessage', (data) => {
                setMessages(data.messages)
            })

            socketRef.current.on('error', (data) => {
                console.log(data)
            })
        }

        return () => {
            socketRef.current?.disconnect()
        }
    }, [selectedUserId])

    return (
        <div className="flex flex-col w-[500px] gap-2 h-[700px]">
            <div
                className={cn(
                    'flex flex-col gap-1 p-2 border h-full overflow-y-auto',
                    selectedUserId
                        ? 'justify-end'
                        : 'items-center justify-center'
                )}
            >
                {selectedUserId ? (
                    <>
                        {messages.length === 0 && (
                            <p className="text-center">
                                Send your first message
                            </p>
                        )}
                        {messages.map((message, index) => (
                            <Message
                                key={index}
                                message={message}
                                onEdit={() => handleEdit(message)}
                                onDelete={() => handleDelete(message)}
                                isEdit={
                                    isEditMessage &&
                                    editMessageId === message.id
                                }
                            />
                        ))}
                    </>
                ) : (
                    <p className="text-sm">Select user to chat...</p>
                )}
            </div>
            {selectedUserId && (
                <form
                    onKeyDown={onInputKeyDown}
                    onSubmit={isEditMessage ? updateMessage : sendMessage}
                    className="flex w-full h-10 px-2 gap-2 items-center border"
                >
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="w-full outline-none"
                    />
                    {isEditMessage && (
                        <button
                            onClick={handleCancelEdit}
                            type="button"
                            className="border h-7 px-2"
                        >
                            Cancel
                        </button>
                    )}
                    <button className="border h-7 px-2" type="submit">
                        {isEditMessage ? 'Update' : 'Send'}
                    </button>
                </form>
            )}
        </div>
    )
}

export default Chat
