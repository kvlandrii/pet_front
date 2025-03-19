import { cn } from '@/helpers/cn'
import { UserType } from '@/lib/types'
import { RootState } from '@/redux/store'
import { FC } from 'react'
import { useSelector } from 'react-redux'

interface Props {
    user: UserType
    onClick: () => void
}

const User: FC<Props> = ({ user, onClick }) => {
    const selectedUserId = useSelector(
        (state: RootState) => state.chat.selectedUserId
    )

    return (
        <div
            onClick={onClick}
            className={cn(
                'w-full flex items-center p-1 border',
                user.id === selectedUserId && 'bg-white/10'
            )}
        >
            <span className="text-sm">{user.name}</span>
        </div>
    )
}

export default User
