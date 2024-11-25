import { Monitor, Wifi, Bluetooth, Volume2, Power, Layout, Palette, Bell, Search, Users, Share2, Mouse, Keyboard, Printer } from 'lucide-react'
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRef, useState } from 'react'
import { useStore } from 'zustand'
import { windowStore } from '@/store/useStore'
import { twMerge } from 'tailwind-merge'
import Moveable from 'react-moveable'
import WindowControlButton from '../shared/WindowControlButton'
import { FaBars, FaBrush, FaSearch } from 'react-icons/fa'
import { settingsSidebar } from '@/data/data'
import { Separator } from '../ui/separator'

interface Props {
    id: number,
    zIndex: number
}

export default function Settings({ id, zIndex }: Props) {
    const { removeWindow, setActiveWindow, activeWindow }: any = useStore(windowStore)
    const [fullScreen, setFullScreen] = useState<boolean>(false)
    const [selectedSetting, setSelectedSetting] = useState<{ name: string, icon: any }>({
        name: 'Appearance',
        icon: FaBrush
    })

    const windowRef = useRef<any>(null)
    const headerRef = useRef<any>(null)
    return (
        <div style={{ zIndex: zIndex }} className={twMerge('w-[70%] h-[70%] absolute top-[100px] left-[200px] select-none rounded-xl overflow-hidden', activeWindow === id && ' z-10', fullScreen && '!top-0 !left-0 !w-full !h-full !transform-none !rounded-none')} ref={windowRef} onClick={() => setActiveWindow(id)}>
            <Moveable
                target={windowRef.current}
                draggable={true}
                dragArea={true}
                onDragStart={() => setActiveWindow(id)}
                onDrag={({ beforeTranslate }) => {
                    windowRef.current.style.transform = `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px)`
                }}
            />
            <div ref={headerRef} className='w-full h-10 flex relative justify-between items-center text-sm font-semibold duration-300'>
                <div className='h-full duration-300 bg-[#ebebeb] max-w-[500px] min-w-[300px] w-[25%] flex justify-between items-center px-4 border-r border-b border-[#dbdbdb]'>
                    <FaSearch />
                    <h2>Settings</h2>
                    <FaBars />
                </div>
                <div className='w-full h-full duration-300 bg-[#fafafa] flex-1 flex justify-center items-center border-b border-[#dbdbdb]'>
                    <h2>{selectedSetting.name}</h2>
                    <WindowControlButton closeHandler={() => removeWindow(id)} className='absolute right-2 z-10' minMaxHandler={() => setFullScreen(!fullScreen)} />
                </div>
            </div>
            <div className='bg-[#fafafa] dark:bg-[#2c2c2c] duration-300 z-10 relative h-full flex flex-1'>
                <SettingsSidebar selectedSetting={selectedSetting} setSelectedSetting={setSelectedSetting} />
                <SettingsDetails selectedSetting={selectedSetting} />
            </div>
        </div>
    )
}

const SettingsSidebar = ({ selectedSetting, setSelectedSetting }: { selectedSetting: { name: string, icon: any }, setSelectedSetting: (e: { name: string, icon: any }) => void }) => {
    return (
        <div className='overflow-auto h-full duration-300 bg-[#ebebeb] max-w-[500px] min-w-[300px] w-[25%] flex justify-between items-center px-1 border-r border-[#dbdbdb] flex-col gap-1 py-1'>
            {
                settingsSidebar.map((setting: any, index: number) => {
                    console.log(settingsSidebar, index)
                    return (
                        <div key={index} className='w-full flex flex-col justify-center gap-1'>
                            {
                                setting.map((stng: { name: string, icon: any }, index2: number) => <div onClick={() => setSelectedSetting(stng)} className={twMerge('px-4 py-2 rounded-md text-sm hover:bg-[#d8d8d8] flex gap-3 items-center', selectedSetting.name === stng.name && 'bg-[#d8d8d8]')} key={index2}>
                                    <stng.icon />
                                    <h4>{stng.name}</h4>
                                </div>)
                            }
                            {
                                settingsSidebar.length !== (index + 1) && <Separator className='bg-[#cfcfcf] my-1' />
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}

const SettingsDetails = ({ selectedSetting }: { selectedSetting: { name: string, icon: any } }) => {
    return (
        <div className='bg-[#fafafa] w-full h-full flex flex-col justify-center items-center gap-5'>
            <selectedSetting.icon className='w-24 h-24' />
            <h1 className='text-2xl font-medium'>Coming soon...</h1>
        </div>
    )
}

