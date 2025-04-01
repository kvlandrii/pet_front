'use client'
import { cn } from '@/helpers/cn'
import { paths } from '@/lib/paths'
import { logout } from '@/redux/slices/authSlice'
import { RootState } from '@/redux/store'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Header = () => {
    const dispatch = useDispatch()
    const user = useSelector((state: RootState) => state.auth.user)
    const logoutUser = () => {
        dispatch(logout())
    }
    const pathname = usePathname()

    return (
        <header className="w-full flex items-center justify-center gap-10 h-10">
            <Link
                href={paths.root}
                className="text-2xl font-bold hover:underline hover:cursor-pointer"
            >
                Home
            </Link>
            {user ? (
                <>
                    <Link
                        href={paths.todos.root}
                        className={cn(
                            'text-2xl font-bold hover:underline hover:cursor-pointer',
                            {
                                underline: pathname === paths.todos.root,
                            }
                        )}
                    >
                        REST API Todos
                    </Link>
                    <Link
                        href={paths.gqlTodos.root}
                        className={cn(
                            'text-2xl font-bold hover:underline hover:cursor-pointer',
                            {
                                underline: pathname === paths.gqlTodos.root,
                            }
                        )}
                    >
                        GQL Todos
                    </Link>
                    <Link
                        href={paths.chat.root}
                        className={cn(
                            'text-2xl font-bold hover:underline hover:cursor-pointer',
                            {
                                underline: pathname === paths.chat.root,
                            }
                        )}
                    >
                        Chat
                    </Link>
                    <Link
                        href={paths.user.root}
                        className={cn(
                            'text-2xl font-bold hover:underline hover:cursor-pointer',
                            {
                                underline: pathname === paths.user.root,
                            }
                        )}
                    >
                        User
                    </Link>
                    <button
                        onClick={logoutUser}
                        className="text-2xl font-bold hover:underline hover:cursor-pointer"
                    >
                        Logout
                    </button>
                </>
            ) : (
                <>
                    <Link
                        href={paths.login.root}
                        className={cn(
                            'text-2xl font-bold hover:underline hover:cursor-pointer',
                            {
                                underline: pathname === paths.login.root,
                            }
                        )}
                    >
                        Login
                    </Link>
                    <Link
                        href={paths.register.root}
                        className={cn(
                            'text-2xl font-bold hover:underline hover:cursor-pointer',
                            {
                                underline: pathname === paths.register.root,
                            }
                        )}
                    >
                        Register
                    </Link>
                </>
            )}
        </header>
    )
}

export default memo(Header)
