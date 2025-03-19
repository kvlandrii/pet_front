import { UserType } from '@/lib/types'
import { FC } from 'react'

interface Props {
    user: UserType
    onClick: () => void
}

const User: FC<Props> = ({ user, onClick }) => {
    return (
        <div onClick={onClick} className="w-full flex items-center p-1 border">
            <span className="text-sm">{user.name}</span>
        </div>
    )
}

export default User
