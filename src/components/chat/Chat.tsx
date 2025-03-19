'use client'
import { config } from '@/configs/env'
import { cn } from '@/helpers/cn'
import { time } from '@/helpers/time'
import { UserType } from '@/lib/types'
import { RootState } from '@/redux/store'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { io, Socket } from 'socket.io-client'

interface Message {
    content: string
    sender: UserType
    createdAt: string
}

const Chat = () => {
    const user = useSelector((state: RootState) => state.auth.user)
    const socketRef = useRef<Socket | null>(null)
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState<Message[]>([])
    const selectedUserId = useSelector(
        (state: RootState) => state.chat.selectedUserId
    )
    const [roomName, setRoomName] = useState('')

    const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (message.trim()) {
            socketRef.current?.emit('message', {
                roomName: roomName,
                content: message,
                senderId: user?.id,
            })
            setMessage('')
        }
    }

    useEffect(() => {
        if (selectedUserId) {
            socketRef.current = io(config.socketUrl)

            socketRef.current.emit('join', {
                userId: user?.id,
                partnerId: selectedUserId,
            })

            socketRef.current.on('joinedRoom', (data) => {
                setRoomName(data.roomName)
                setMessages(data.messages)
            })

            socketRef.current.on('message', (data) => {
                setMessages((prevMessages) => [...prevMessages, data.message])
            })

            socketRef.current.on('error', (data) => {
                console.log(data)
            })
        }

        return () => {
            socketRef.current?.disconnect()
        }
    }, [selectedUserId, user])

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
                                Write your first message
                            </p>
                        )}
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={cn(
                                    'w-full flex items-center',
                                    message.sender.id === user?.id
                                        ? 'justify-end'
                                        : 'justify-start'
                                )}
                            >
                                <div
                                    className={cn(
                                        'border flex flex-col gap-1 p-1 max-w-[200px]',
                                        message.sender.id === user?.id
                                            ? 'items-end'
                                            : 'items-start'
                                    )}
                                >
                                    <div
                                        className={cn(
                                            'flex items-center gap-3',
                                            message.sender.id === user?.id &&
                                                'flex-row-reverse'
                                        )}
                                    >
                                        <span className="text-sm text-gray-200">
                                            {message.sender.name}
                                        </span>
                                        <span className="text-xs text-gray-500">
                                            {time(message.createdAt)}
                                        </span>
                                    </div>
                                    <p className="text-xs">{message.content}</p>
                                </div>
                            </div>
                        ))}
                    </>
                ) : (
                    <p className="text-sm">Select user to chat...</p>
                )}
            </div>
            {selectedUserId && (
                <form
                    onSubmit={sendMessage}
                    className="flex w-full h-10 px-2 gap-2 items-center border"
                >
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="w-full outline-none"
                    />
                    <button className="border h-7 px-2" type="submit">
                        Send
                    </button>
                </form>
            )}
        </div>
    )
}

export default Chat
