import { memo } from 'react'

const FullScreenLoader = () => {
    return (
        <div className="fixed inset-0 z-[99999] w-full h-full flex items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-y-8 border-green-500" />
        </div>
    )
}

export default memo(FullScreenLoader)
