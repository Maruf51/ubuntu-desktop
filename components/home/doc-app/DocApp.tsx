import DocAppContext from '@/components/context-menu-contents/DocAppContext'
import { ContextMenu, ContextMenuTrigger } from '@/components/ui/context-menu'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { activeWindowFunc } from '@/functions/functions'
import { windowStore } from '@/store/useStore'
import { DocAppTypes, WindowStoreTypes, WindowTypes } from '@/types/types'
import { NextPage } from 'next'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { useStore } from 'zustand'

interface Props {
    data: DocAppTypes
}


const DocApp: NextPage<Props> = ({ data }) => {
    const { addNewWindow, windows, setActiveWindow }: WindowStoreTypes = useStore(windowStore)
    const [active, setActive] = useState<WindowTypes[]>([])
    const [activeNow, setActiveNow] = useState<boolean>(false)

    useEffect(() => {
        const activeWindows = windows.filter((window: WindowTypes) => window.name === data.name)
        setActive(activeWindows || [])

        const activeWindow = activeWindowFunc(windows)

        const activeNowCheck = activeWindows.find((act: WindowTypes) => act.id === activeWindow.id)
        setActiveNow(activeNowCheck ? true : false)
    }, [data, windows])

    const newWindowHandler = () => {
        const id = Math.round(Math.random() * 100000000)
        addNewWindow({ comp: data.component, id, name: data.name, zIndex: 10 })
        setActiveWindow(id)
    }

    const changeActiveWindow = () => {
        const filteredApps = windows.filter((window: WindowTypes) => window.name === data.name)
        if (filteredApps.length === 1) {
            setActiveWindow(filteredApps[0].id)
        } else {
            const activeWindow = activeWindowFunc(windows)
            const removedIdApps = filteredApps.filter((app: WindowTypes) => app.id !== activeWindow.id)
            const topWindow = activeWindowFunc(removedIdApps)
            setActiveWindow(topWindow.id)
        }
    }
    return (
        <>
            <ContextMenu>
                <ContextMenuTrigger className='w-[52px] h-[52px]'>
                    <TooltipProvider delayDuration={350}>
                        <Tooltip>
                            <TooltipTrigger>
                                <div onClick={() => {
                                    if (active.length === 0) {
                                        newWindowHandler()
                                    } else {
                                        changeActiveWindow()
                                    }
                                }} className={twMerge('w-[52px] h-[52px] p-1.5 hover:bg-[#a1a1a15e] dark:hover:bg-[#a1a1a15e] rounded-lg duration-300 relative', activeNow && 'bg-[#a1a1a15e] dark:bg-[#a1a1a15e]')}>
                                    <Image className='w-full h-full p-0.5' src={data.icon} width={40} height={40} alt={data.name} />
                                    <div className='absolute left-px top-0 h-full flex flex-col justify-center gap-0.5'>
                                        {
                                            active.slice(0, 4).map((act: WindowTypes, index: number) => <div key={index} className='w-[5px] h-[5px] bg-[#308280] dark:bg-[#308280] rounded-full'></div>)
                                        }
                                    </div>
                                </div>
                            </TooltipTrigger>
                            <TooltipContent side='right' className='bg-[#222222] dark:bg-[#222222] text-gray-300 dark:text-gray-300 text-[13px] border border-[#464646] dark:border-[#464646] overflow-hidden rounded-full ml-1 py-[5px]'>
                                <p>{data.title}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </ContextMenuTrigger>
                <DocAppContext name={data.name} activeWindows={active} newWindowHandler={newWindowHandler} />
            </ContextMenu>
        </>
    )
}

export default DocApp