'use client'

import { NextPage } from 'next'
import { FaPowerOff } from 'react-icons/fa'
import { PopoverContent } from '../ui/popover'
import { Slider } from '../ui/slider'
import { useMetaDataStore, userStore } from '@/store/useStore'
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



interface Props { }

const volumeIcon = (volume: number) => {
    if (volume === 0) return <FaVolumeXmark className='hover:bg-[#3e3e3e] w-7 h-7 p-1.5 rounded-full' />
    else if (volume < 50) return <FaVolumeLow className='hover:bg-[#3e3e3e] w-7 h-7 p-2 rounded-full' />
    return <FaVolumeHigh className='hover:bg-[#3e3e3e] w-7 h-7 p-1.5 rounded-full' />
}

const PowerDropdown: NextPage<Props> = ({ }) => {
    const { volume, setVolume, nightLight, power, changeTheme, changePower, changeNightLight, mute }: any = useMetaDataStore()
    const { user, setLock, setUser }: any = useStore(userStore)

    const { theme, setTheme } = useTheme()

    return (
        <PopoverContent className='primary-bg border border-[#3e3e3e] mr-1 mt-1 rounded-2xl text-white flex flex-col gap-3 w-96 select-none'>
            <div className='flex items-center justify-between'>
                <div className='flex gap-2.5 items-center'>
                    {
                        user && <>
                            <RiScreenshot2Line className='item-hover' />
                            <LuSettings className='item-hover' />
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