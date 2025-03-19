'use client'
import { paths } from '@/lib/paths'
import { logout } from '@/redux/slices/authSlice'
import { RootState } from '@/redux/store'
import Link from 'next/link'
import { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Header = () => {
    const dispatch = useDispatch()
    const user = useSelector((state: RootState) => state.auth.user)
    const logoutUser = () => {
        dispatch(logout())
    }

    return (
        <header className="w-full flex items-center justify-center gap-4">
            <Link href={paths.root} className="text-2xl font-bold hover:underline hover:cursor-pointer">
                Home
            </Link>
            {user ? (
                <>
                    <Link href={paths.user.root} className="text-2xl font-bold hover:underline hover:cursor-pointer">
                        User
                    </Link>
                    <button onClick={logoutUser} className="text-2xl font-bold hover:underline hover:cursor-pointer">
                        Logout
                    </button>
                </>
            ) : (
                <>
                    <Link href={paths.login.root} className="text-2xl font-bold hover:underline hover:cursor-pointer">
                        Login
                    </Link>
                    <Link
                        href={paths.register.root}
                        className="text-2xl font-bold hover:underline hover:cursor-pointer"
                    >
                        Register
                    </Link>
                </>
            )}
        </header>
    )
}

export default memo(Header)
