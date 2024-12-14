import { windowStore } from '@/store/useStore'
import { StartMenuAppTypes, WindowStoreTypes, WindowTypes } from '@/types/types'
import { NextPage } from 'next'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { useStore } from 'zustand'

const activeWindowFunc = (windows: WindowTypes[]): WindowTypes => {
    const largestIdObject = windows.reduce((max, current) => {
        return current.zIndex > max.zIndex ? current : max;
    }, windows[0]);
    return largestIdObject;
}


interface Props {
    apps: StartMenuAppTypes[],
}

const StartMenuApps: NextPage<Props> = ({ apps }) => {
    return (
        <div className={twMerge('w-full h-full max-w-[1200px] flex flex-wrap justify-center content-end mx-auto gap-6 duration-300')}>
            {
                apps.map((app: StartMenuAppTypes, index: number) => <StartMenuApp key={index} app={app} />)
            }
        </div>
    )
}

export default StartMenuApps

const StartMenuApp = ({ app }: { app: StartMenuAppTypes }) => {
    const { name, title, icon } = app
    const { setStartMenu }: WindowStoreTypes = useStore(windowStore)

    const { addNewWindow, windows, setActiveWindow }: WindowStoreTypes = useStore(windowStore)
    const [active, setActive] = useState<WindowTypes[]>([])

    useEffect(() => {
        const activeWindows = windows.filter((window: WindowTypes) => window.name === app.name)
        setActive(activeWindows || [])
    }, [app, windows])

    const newWindowHandler = () => {
        const id = Math.round(Math.random() * 100000000)
        if (app.component) addNewWindow({ comp: app.component, id, name: app.name, zIndex: 10 })
        setActiveWindow(id)
        setStartMenu(false)
    }

    const changeActiveWindow = () => {
        const filteredApps = windows.filter((window: WindowTypes) => window.name === app.name)
        if (filteredApps.length === 1) {
            setActiveWindow(filteredApps[0].id)
        } else {
            // const activeWindow = activeWindowFunc(windows)
            // const removedIdApps = filteredApps.filter((app: WindowTypes) => app.id !== activeWindow.id)
            const topWindow = activeWindowFunc(filteredApps)
            setActiveWindow(topWindow.id)
        }
        setStartMenu(false)
    }
    return (
        <div onClick={() => {
            if (active.length === 0) {
                newWindowHandler()
            } else {
                changeActiveWindow()
            }
        }} className='hover:bg-[#343434] dark:hover:bg-[#343434] w-[110px] h-[130px] px-5 py-3 rounded-xl text-center'>
            <Image src={icon} width={100} height={100} alt={name} className='w-full aspect-square mb-3' />
            <h3 className=' truncate text-sm text-white dark:text-white'>{title}</h3>
        </div>
    )
}