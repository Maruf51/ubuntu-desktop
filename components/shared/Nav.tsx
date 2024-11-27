'use client'

import { NextPage } from 'next'
import NotificationMenu from '../notification-menu/NotificationMenu'
import PowerMenu from '../power-menu/PowerMenu'
import { useStore } from 'zustand'
import { userStore } from '@/store/useStore'
import { twMerge } from 'tailwind-merge'
import { useState } from 'react'
import { UserStoreTypes } from '@/types/types'

const Nav: NextPage = ({ }) => {
    const { user }: UserStoreTypes = useStore(userStore)
    const [activeTab, setActiveTab] = useState<number>(1)
    const tabs = [1, 2]

    const tabScrollHandler = (e: React.WheelEvent<HTMLDivElement>) => {
        if (e.deltaY > 0) {
            if (tabs.length !== activeTab) setActiveTab((prevState: number) => prevState + 1)
        } else if (e.deltaY < 0) {
            if (activeTab !== 1) setActiveTab((prevState: number) => prevState - 1)
        }
    }
    return (
        <nav className='bg-[#1d1d1d] w-full h-9 text-white grid grid-cols-3 items-center px-1 py-1'>
            <div className='h-full'>
                {
                    user && <div className='h-full'>
                        <div onWheel={(e) => tabScrollHandler(e)} className='hover:bg-[#343434] dark:hover:bg-[#343434] duration-300 w-[fit-content] h-full flex items-center px-3 gap-2 rounded-full'>
                            {
                                tabs.map((numb: number, index: number) => <div className={twMerge('w-2 h-2 bg-[#f2f2f2b0] dark:bg-[#f2f2f2b0] rounded-full duration-100', numb === activeTab && 'w-6')} key={index}></div>)
                            }
                        </div>
                    </div>
                }
            </div>
            <div className='flex justify-center h-full'>
                <NotificationMenu />
            </div>
            <div className='flex justify-end h-full'>
                <PowerMenu />
            </div>
        </nav>
    )
}

export default Nav