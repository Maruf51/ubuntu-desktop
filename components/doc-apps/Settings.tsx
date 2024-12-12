import { useRef, useState } from 'react'
import { useStore } from 'zustand'
import { metaDataStore, windowStore } from '@/store/useStore'
import { twMerge } from 'tailwind-merge'
import WindowControlButton from '../shared/WindowControlButton'
import { FaBars, FaBrush, FaSearch } from 'react-icons/fa'
import { colors, settingsSidebar, wallpapers } from '@/data/data'
import { Separator } from '../ui/separator'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import { MetaDataStoreTypes, SettingsSidebarTypes, WindowStoreTypes } from '@/types/types'
import { IconType } from 'react-icons/lib'
import Draggable from '../shared/Draggable'

interface Props {
    id: number,
    zIndex: number
}

export default function Settings({ id, zIndex }: Props) {
    const { removeWindow, setActiveWindow }: WindowStoreTypes = useStore(windowStore)
    const [fullScreen, setFullScreen] = useState<boolean>(false)
    const [selectedSetting, setSelectedSetting] = useState<{ name: string, icon: IconType }>({
        name: 'Appearance',
        icon: FaBrush
    })

    const windowRef = useRef<HTMLDivElement>(null)
    const headerRef = useRef<HTMLDivElement>(null)
    return (
        <Draggable id={id} zIndex={zIndex} draggableRef={headerRef} width={1000} height={500} fullScreen={fullScreen} >
            <div
                style={{ zIndex: zIndex }}
                className={twMerge('w-full h-full select-none rounded-xl overflow-hidden min_max_transition flex flex-col')}
                ref={windowRef}
                onClick={() => setActiveWindow(id)}
                onDoubleClick={() => {
                    setActiveWindow(id)
                    setFullScreen(!fullScreen)
                }}
            >
                <div ref={headerRef} className='w-full h-10 shrink-0 flex relative justify-between items-center text-sm font-semibold duration-300'>
                    <div className='h-full duration-300 bg-[#ebebeb] dark:bg-[#303030] max-w-[500px] min-w-[300px] w-[25%] flex justify-between items-center px-4 border-r border-b border-[#dbdbdb] dark:border-[#4f4f4f]'>
                        <FaSearch />
                        <h2>Settings</h2>
                        <FaBars />
                    </div>
                    <div className='w-full h-full duration-300 bg-[#fafafa] dark:bg-[#2c2c2c] flex-1 flex justify-center items-center border-b border-[#dbdbdb] dark:border-[#1e1e1e]'>
                        <h2>{selectedSetting.name}</h2>
                        <WindowControlButton closeHandler={() => removeWindow(id)} className='absolute right-2 z-10' minMaxHandler={() => setFullScreen(!fullScreen)} />
                    </div>
                </div>
                <div onDoubleClick={(e) => e.stopPropagation()} className='bg-[#fafafa] dark:bg-[#2c2c2c] duration-300 z-10 relative h-full flex flex-1 overflow-auto'>
                    <SettingsSidebar selectedSetting={selectedSetting} setSelectedSetting={setSelectedSetting} />
                    <SettingsDetails selectedSetting={selectedSetting} />
                </div>
            </div>
        </Draggable>
    )
}

const SettingsSidebar = ({ selectedSetting, setSelectedSetting }: { selectedSetting: SettingsSidebarTypes, setSelectedSetting: (e: SettingsSidebarTypes) => void }) => {
    return (
        <div className='overflow-auto h-full duration-300 bg-[#ebebeb] dark:bg-[#303030] max-w-[500px] min-w-[300px] w-[25%] flex justify-between items-center px-1 border-r border-[#dbdbdb] dark:border-[#4f4f4f] flex-col gap-1 py-1'>
            {
                settingsSidebar.map((setting: SettingsSidebarTypes[], index: number) => {
                    return (
                        <div key={index} className='w-full flex flex-col justify-center gap-1'>
                            {
                                setting.map((stng: SettingsSidebarTypes, index2: number) => <div onClick={() => setSelectedSetting(stng)} className={twMerge('px-4 py-2 rounded-md text-sm hover:bg-[#d8d8d8] dark:hover:bg-[#454545] flex gap-3 items-center duration-300', selectedSetting.name === stng.name && 'bg-[#d8d8d8] dark:bg-[#454545]')} key={index2}>
                                    <stng.icon />
                                    <h4>{stng.name}</h4>
                                </div>)
                            }
                            {
                                settingsSidebar.length !== (index + 1) && <Separator className='bg-[#cfcfcf] dark:bg-[#4f4f4f] duration-300 my-1' />
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}

const SettingsDetails = ({ selectedSetting }: { selectedSetting: SettingsSidebarTypes }) => {
    const { wallpaper, setWallpaper }: MetaDataStoreTypes = useStore(metaDataStore)
    const { theme, setTheme } = useTheme()
    return (
        <div className='bg-[#fafafa] dark:bg-[#2c2c2c] duration-300 w-full h-full flex flex-col justify-center items-center gap-5 flex-1 overflow-auto'>
            {
                selectedSetting.name === 'Appearance' ?
                    <div className='overflow-auto w-full h-full flex justify-center items-center pt-5'>
                        <div className='max-w-[600px] w-[90%] h-full flex flex-col items-center gap-5'>
                            <div className='w-full'>
                                <h2 className=' font-semibold pb-2'>Style</h2>
                                <div className='bg-[#ffffff] dark:bg-[#3d3d3d] border border-[#e2e2e2] dark:border-[#282828] duration-300 rounded-xl'>
                                    <div className='flex justify-center gap-5 px-5 py-5 border-b border-[#ededed] dark:border-[#282828] duration-300'>
                                        <div onClick={() => setTheme('light')} className=' max-w-[200px] w-full text-center flex flex-col gap-2'>
                                            <div className={twMerge('relative border-[3px] border-transparent p-[3px] rounded-xl w-full duration-300', theme === 'light' && ' border-[#308280]')}>
                                                <div className='absolute w-[55%] h-[50%] bg-[#242424] dark:bg-[#242424] rounded-md top-5 right-5 overflow-hidden'>
                                                    <div className='bg-[#242424] dark:bg-[#242424] w-full h-5 border-b border-[#171717] dark:border-[#171717]'></div>
                                                </div>
                                                <div className='absolute w-[55%] h-[50%] bg-[#fafafa] dark:bg-[#fafafa] rounded-md bottom-5 left-5 overflow-hidden'>
                                                    <div className='bg-[#ebebeb] dark:bg-[#ebebeb] w-full h-5 border-b border-[#dbdbdb] dark:border-[#dbdbdb]'></div>
                                                </div>
                                                <Image src={wallpaper} width={200} height={150} alt='wallpaper' className='w-full aspect-[4/3] object-cover rounded-lg' />
                                            </div>
                                            <p>Default</p>
                                        </div>
                                        <div onClick={() => setTheme('dark')} className=' max-w-[200px] w-full text-center flex flex-col gap-2'>
                                            <div className={twMerge('relative border-[3px] border-transparent p-[3px] rounded-xl w-full duration-300', theme === 'dark' && ' border-[#308280]')}>
                                                <div className='absolute w-[55%] h-[50%] bg-[#242424] dark:bg-[#242424] rounded-md top-5 right-5 overflow-hidden'>
                                                    <div className='bg-[#242424] dark:bg-[#242424] w-full h-5 border-b border-[#171717] dark:border-[#171717]'></div>
                                                </div>
                                                <div className='absolute w-[55%] h-[50%] bg-[#242424] dark:bg-[#242424] rounded-md bottom-5 left-5 overflow-hidden'>
                                                    <div className='bg-[#303030] dark:bg-[#303030] w-full h-5 border-b border-[#1f1f1f] dark:border-[#1f1f1f]'></div>
                                                </div>
                                                <Image src={wallpaper} width={200} height={150} alt='wallpaper' className='w-full aspect-[4/3] object-cover rounded-lg' />
                                            </div>
                                            <p>Dark</p>
                                        </div>
                                    </div>
                                    <div className='px-4 py-3 flex gap-5 items-center'>
                                        <p>Color</p>
                                        <div className='grid grid-cols-10 gap-3 w-full'>
                                            {
                                                colors.map((color: string, index: number) => <div style={{ backgroundColor: color === '#308280' ? '#308280' : 'transparent' }} className={twMerge(` max-w-10 aspect-square w-full min-w-2 rounded-full p-0.5`)} key={index}>
                                                    <div style={{ backgroundColor: color }} className={twMerge(` w-full h-full border-2 border-[#ffffff] dark:border-[#3d3d3d] duration-300 rounded-full`)}>

                                                    </div>
                                                </div>)
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='w-full pb-5'>
                                <h2 className=' font-semibold pb-2'>Background</h2>
                                <div className='bg-[#ffffff] dark:bg-[#3d3d3d] border border-[#e2e2e2] dark:border-[#282828] duration-300 rounded-xl'>
                                    <div className='flex justify-center items-center flex-wrap gap-4 p-4'>
                                        {
                                            wallpapers.map((wp: string, index: number) => {
                                                return (
                                                    <div onClick={() => setWallpaper(wp)} className='w-[150px] aspect-[4/3] rounded-lg overflow-hidden' key={index}>
                                                        <Image src={wp} width={200} height={150} alt='wallpaper' className='w-full h-full object-cover' />
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> :
                    <>
                        <selectedSetting.icon className='w-24 h-24' />
                        <h1 className='text-2xl font-medium'>Coming soon...</h1>
                    </>
            }
        </div>
    )
}

