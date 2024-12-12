import { useRef, useState } from 'react'
import { useStore } from 'zustand'
import { windowStore } from '@/store/useStore'
import { twMerge } from 'tailwind-merge'
import WindowControlButton from '../shared/WindowControlButton'
import { WindowStoreTypes } from '@/types/types'
import Draggable from '../shared/Draggable'

interface Props {
    id: number,
    zIndex: number
}

export default function Portfolio({ id, zIndex }: Props) {
    const { removeWindow, setActiveWindow, activeWindow }: WindowStoreTypes = useStore(windowStore)
    const [fullScreen, setFullScreen] = useState<boolean>(false)

    const windowRef = useRef<HTMLDivElement>(null)
    const headerRef = useRef<HTMLDivElement>(null)
    return (
        <Draggable id={id} fullScreen={fullScreen} draggableRef={headerRef} zIndex={zIndex} >
            <div style={{ zIndex: zIndex }} onDoubleClick={() => {
                setActiveWindow(id)
                setFullScreen(!fullScreen)
            }} className={twMerge('w-full h-full select-none rounded-xl overflow-hidden min_max_transition flex flex-col')} ref={windowRef} onClick={() => setActiveWindow(id)}>
                <div ref={headerRef} className='w-full h-10 shrink-0 flex relative justify-between items-center text-sm font-semibold duration-300'>
                    <div className='w-full h-full duration-300 bg-[#fafafa] dark:bg-[#2c2c2c] flex-1 flex justify-center items-center border-b border-[#dbdbdb] dark:border-[#1e1e1e]'>
                        <h2>Portfolio</h2>
                        <WindowControlButton closeHandler={() => removeWindow(id)} className='absolute right-2 z-10' minMaxHandler={() => setFullScreen(!fullScreen)} />
                    </div>
                </div>
                <div onDoubleClick={(e) => e.stopPropagation()} className='bg-[#fafafa] dark:bg-[#2c2c2c] duration-300 w-full z-10 relative h-full min-h-[50%] flex flex-1 overflow-auto'>
                    {/* <iframe src="https://maruf-portfolio-pied.vercel.app/" className='w-full h-full'></iframe> */}
                </div>
            </div>
        </Draggable>
    )
}
