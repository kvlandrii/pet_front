'use client'
import { config } from '@/configs/env'
import { cn } from '@/helpers/cn'
import { RootState } from '@/redux/store'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { io, Socket } from 'socket.io-client'

const Chat = () => {
    const user = useSelector((state: RootState) => state.auth.user)
    const socketRef = useRef<Socket | null>(null)
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState<string[]>([])
    const chatPartnerId = useSelector(
        (state: RootState) => state.chat.chatWithId
    )
    const [roomName, setRoomName] = useState('')

    const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (message.trim()) {
            socketRef.current?.emit('message', {
                roomName: roomName,
                message: message,
            })
            setMessage('')
        }
    }

    useEffect(() => {
        if (chatPartnerId) {
            socketRef.current = io(config.socketUrl)

            socketRef.current.emit('join', {
                userId: user?.id,
                partnerId: chatPartnerId,
            })

            socketRef.current.on('joinedRoom', (data) => {
                console.log('Joined room:', data)
                setRoomName(data.roomName)
            })

            socketRef.current.on('message', (data) => {
                setMessages((prevMessages) => [...prevMessages, data.message])
            })
        }

        return () => {
            socketRef.current?.disconnect()
        }
    }, [chatPartnerId, user])

    return (
        <div className="flex flex-col w-[500px] gap-2 h-[700px]">
            <div
                className={cn(
                    'flex flex-col gap-1 p-2 border h-full overflow-y-auto',
                    chatPartnerId
                        ? 'justify-end'
                        : 'items-center justify-center'
                )}
            >
                {chatPartnerId ? (
                    <>
                        {messages.map((message, index) => (
                            <div key={index} className="text-sm border">
                                {message}
                            </div>
                        ))}
                    </>
                ) : (
                    <p className="text-sm">Select user to chat...</p>
                )}
            </div>
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
        </div>
    )
}

export default Chat
