'use client'

import { MutableRefObject, useCallback, useEffect, useRef } from 'react'

export function useClickOutside(
    handler: () => void
): MutableRefObject<HTMLDivElement | null> {
    const ref = useRef<HTMLDivElement | null>(null)

    const handleClickOutside = useCallback(
        (event: MouseEvent | TouchEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                handler()
            }
        },
        [handler, ref]
    )

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        document.addEventListener('touchstart', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
            document.removeEventListener('touchstart', handleClickOutside)
        }
    }, [handler, handleClickOutside])

    return ref
}

export default useClickOutside
