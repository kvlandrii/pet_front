import Chat from '@/components/chat/Chat'
import UsersStack from '@/components/chat/UsersStack'

const PageContent = () => {
    return (
        <div className="flex items-center justify-center size-full gap-2">
            <UsersStack />
            <Chat />
        </div>
    )
}

export default PageContent
