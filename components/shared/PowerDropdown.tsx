'use client'

import { NextPage } from 'next'
import { FaPowerOff } from 'react-icons/fa'
import { PopoverContent } from '../ui/popover'
import { Slider } from '../ui/slider'
import { metaDataStore, userStore, windowStore } from '@/store/useStore'
import { PiNetworkFill } from 'react-icons/pi'
import { SlSpeedometer } from 'react-icons/sl'
import { LuSunMoon } from 'react-icons/lu'
import { VscColorMode } from 'react-icons/vsc'
import { twMerge } from 'tailwind-merge'
import { FaVolumeHigh, FaVolumeLow, FaVolumeXmark } from 'react-icons/fa6'
import { useStore } from 'zustand'
import { MdLockOutline } from "react-icons/md";
import { LuSettings } from "react-icons/lu";
import { RiScreenshot2Line } from "react-icons/ri";
import { useTheme } from 'next-themes'
import { MetaDataStoreTypes, UserStoreTypes, WindowStoreTypes, WindowTypes } from '@/types/types'
import Settings from '../doc-apps/Settings'
import { activeWindowFunc } from '@/functions/functions'


const volumeIcon = (volume: number) => {
    if (volume === 0) return <FaVolumeXmark className='hover:bg-[#3e3e3e] w-7 h-7 p-1.5 rounded-full' />
    else if (volume < 50) return <FaVolumeLow className='hover:bg-[#3e3e3e] w-7 h-7 p-2 rounded-full' />
    return <FaVolumeHigh className='hover:bg-[#3e3e3e] w-7 h-7 p-1.5 rounded-full' />
}

interface Props {
    closePopover: () => void,
    screenshotHandler: () => void
}

const PowerDropdown: NextPage<Props> = ({ closePopover, screenshotHandler }) => {
    const { volume, setVolume, nightLight, power, changePower, changeNightLight, mute }: MetaDataStoreTypes = metaDataStore()
    const { user, setLock, setUser }: UserStoreTypes = useStore(userStore)
    const { addNewWindow, setActiveWindow, windows }: WindowStoreTypes = windowStore()

    const { theme, setTheme } = useTheme()

    const settingsOpenHandler = () => {
        const filteredApps = windows.filter((window: WindowTypes) => window.name === 'settings')

        if (filteredApps.length === 0) {
            // opening new setting
            const id = Math.round(Math.random() * 100000000)
            addNewWindow({ comp: Settings, id, name: 'settings', zIndex: 100 })
            setActiveWindow(id)
        } // getting setting on top
        else if (filteredApps.length === 1) {
            setActiveWindow(filteredApps[0].id)
        } else {
            const activeWindow = activeWindowFunc(windows)
            const removedIdApps = filteredApps.filter((app: WindowTypes) => app.id !== activeWindow.id)
            const topWindow = activeWindowFunc(removedIdApps)
            setActiveWindow(topWindow.id)
        }

        closePopover() // closing the popover
    }
    return (
        <PopoverContent className='primary-bg border border-[#dedede] dark:border-[#3e3e3e] mr-1 mt-1 rounded-2xl text-white flex flex-col gap-3 w-96 select-none'>
            <div className='flex items-center justify-between'>
                <div className='flex gap-2.5 items-center'>
                    {
                        user && <>
                            <RiScreenshot2Line onClick={screenshotHandler} className='item-hover' />
                            <LuSettings onClick={settingsOpenHandler} className='item-hover' />
                        </>
                    }
                </div>
                <div className='flex gap-2.5 items-center'>
                    {
                        user && <MdLockOutline onClick={() => {
                            setUser(false)
                            setLock(true)
                        }} className='item-hover' />
                    }
                    <FaPowerOff onClick={() => {
                        setUser(false)
                        setLock(false)
                    }} className='item-hover' />
                </div>
            </div>
            <div className='w-full flex items-center justify-between gap-3'>
                <span onClick={() => mute()}>
                    {
                        volumeIcon(volume)
                    }
                </span>
                <Slider onValueChange={(e) => setVolume(e[0])} value={[volume]} max={100} min={0} step={1} />
            </div>
            <div className='grid grid-cols-2 gap-3'>
                <div className={twMerge('flex gap-2 !px-4 item-hover items-center !h-12 cursor-pointer item-hover-active')}>
                    <PiNetworkFill />
                    <div>
                        <h3 className='text-sm'>Wired</h3>
                    </div>
                </div>
                <div className={twMerge('flex gap-2 !px-4 item-hover items-center !h-12 cursor-pointer', power !== 'Balanced' && 'item-hover-active')} onClick={() => changePower()}>
                    <SlSpeedometer />
                    <div>
                        <h3 className='text-sm'>Power Mode</h3>
                        <p className='text-xs capitalize'>{power}</p>
                    </div>
                </div>
                <div className={twMerge('flex gap-2 !px-4 item-hover items-center !h-12 cursor-pointer', nightLight && 'item-hover-active')} onClick={() => changeNightLight()}>
                    <LuSunMoon />
                    <div>
                        <h3 className='text-sm'>Night Light</h3>
                    </div>
                </div>
                <div className={twMerge('flex gap-2 !px-4 item-hover items-center !h-12 cursor-pointer', theme === 'dark' && 'item-hover-active')} onClick={() => setTheme((prevTheme: string) => {
                    return prevTheme === 'dark' ? 'light' : 'dark'
                })}>
                    <VscColorMode />
                    <div>
                        <h3 className='text-sm'>Dark Style</h3>
                    </div>
                </div>
            </div>
        </PopoverContent>
    )
}

export default PowerDropdown