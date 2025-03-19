'use client'

import { useUsersQuery } from '@/api/queries'
import ComponentLoader from '../loaders/ComponentLoader'
import User from './User'
import { useDispatch } from 'react-redux'
import { setChatWithId } from '@/redux/slices/chatSlice'

const UsersStack = () => {
    const { data: users, isPending } = useUsersQuery()
    const dispatch = useDispatch()

    if (isPending) {
        return (
            <div className="w-[200px] border h-[700px]">
                <ComponentLoader />
            </div>
        )
    }

    return (
        <div className="w-[200px] border flex flex-col h-[700px]">
            {users?.map((user, index) => (
                <User
                    key={index}
                    user={user}
                    onClick={() => dispatch(setChatWithId(user.id))}
                />
            ))}
        </div>
    )
}

export default UsersStack
