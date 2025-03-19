'use client'
import { cn } from '@/helpers/cn'
import { time } from '@/helpers/time'
import useClickOutside from '@/hooks/useClickOutside'
import { MoreIcon } from '@/lib/icons'
import { MessageType } from '@/lib/types'
import { RootState } from '@/redux/store'
import { FC, useState } from 'react'
import { useSelector } from 'react-redux'

interface Props {
    message: MessageType
    onEdit: () => void
    onDelete: () => void
    isEdit: boolean
}

const Message: FC<Props> = ({ message, onDelete, onEdit, isEdit }) => {
    const user = useSelector((state: RootState) => state.auth.user)
    const [isHovered, setIsHovered] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const ref = useClickOutside(() => setIsMenuOpen(false))

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={cn(
                'w-full flex items-center',
                message.sender.id === user?.id ? 'justify-end' : 'justify-start'
            )}
        >
            <div
                className={cn(
                    'border flex flex-col gap-1 p-1 max-w-[200px] relative',
                    message.sender.id === user?.id
                        ? 'items-end'
                        : 'items-start',
                    isEdit && 'bg-gray-800'
                )}
            >
                <div
                    className={cn(
                        'flex items-center gap-3',
                        message.sender.id === user?.id && 'flex-row-reverse'
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
                {(isHovered || isMenuOpen) &&
                    message.sender.id === user?.id && (
                        <div
                            className={cn(
                                'absolute bottom-0',
                                message.sender.id === user?.id
                                    ? 'right-full mr-2'
                                    : 'left-full ml-2'
                            )}
                        >
                            {!isMenuOpen ? (
                                <button
                                    onClick={() => setIsMenuOpen(true)}
                                    className="border size-4 flex items-center justify-center hover:cursor-pointer"
                                >
                                    <MoreIcon className="size-3" />
                                </button>
                            ) : (
                                <div
                                    ref={ref}
                                    className="flex flex-col z-1 bg-black"
                                >
                                    <button
                                        onClick={() => {
                                            onEdit()
                                            setIsMenuOpen(false)
                                        }}
                                        className="border p-1 h-7 flex items-center"
                                    >
                                        <span className="text-sm">Edit</span>
                                    </button>
                                    <button
                                        onClick={() => {
                                            onDelete()
                                            setIsMenuOpen(false)
                                        }}
                                        className="border p-1 h-7 flex items-center"
                                    >
                                        <span className="text-sm">Delete</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
            </div>
        </div>
    )
}

export default Message
