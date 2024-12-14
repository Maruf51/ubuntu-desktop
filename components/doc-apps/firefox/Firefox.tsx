import { useEffect, useRef, useState } from 'react'
import { useStore } from 'zustand'
import { windowStore } from '@/store/useStore'
import { twMerge } from 'tailwind-merge'
import { BrowserTabTypes, WindowStoreTypes } from '@/types/types'
import WindowControlButton from '@/components/shared/WindowControlButton'
import Tabs from './tabs/Tabs'
import { ContextMenu, ContextMenuTrigger } from '@/components/ui/context-menu'
import { ArrowLeft, ArrowRight, RotateCw } from 'lucide-react'
import { FaBars, FaRegUserCircle, FaSearch } from 'react-icons/fa'
import { IoExtensionPuzzleOutline } from 'react-icons/io5'
import Tab from './tabs/Tab'
import Draggable from '@/components/shared/Draggable'

interface Props {
    id: number,
    zIndex: number
}

export default function Firefox({ id, zIndex }: Props) {
    const { removeWindow }: WindowStoreTypes = useStore(windowStore)
    const [fullScreen, setFullScreen] = useState<boolean>(false)
    const [searchValue, setSearchValue] = useState<string>('')
    const [tabs, setTabs] = useState<BrowserTabTypes[]>([
        {
            title: 'New Tab',
            url: null,
            id: 1
        }
    ])
    const [activeTab, setActiveTab] = useState<number>(1)
    const [tabCount, setTabCount] = useState<number>(1)

    const windowRef = useRef<HTMLDivElement>(null)
    const headerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleResize = (entries: ResizeObserverEntry[]) => {
            if (entries[0].contentRect) {
                // setWidth(entries[0].contentRect.width); // Update width when size changes
                setTabCount(Math.floor((entries[0].contentRect.width - 250) / 200))
            }
        };

        const observer = new ResizeObserver(handleResize);

        if (windowRef.current) {
            observer.observe(windowRef.current);
        }

        return () => {
            if (windowRef.current) {
                observer.unobserve(windowRef.current);
            }
        };
    }, []);

    // for selecting new active tab
    useEffect(() => {
        setActiveTab(tabs[tabs.length - 1].id)
    }, [tabs])

    useEffect(() => {
        const index = tabs.findIndex((tab: BrowserTabTypes) => tab.id === activeTab)
        const getTab = tabs[index]
        setSearchValue(getTab.url || '')
    }, [activeTab])

    const handleSearch = (e: React.MouseEvent<HTMLFormElement>) => {
        e.preventDefault()

        setTabs((prevState: BrowserTabTypes[]) => {
            const newTabs = [...prevState]
            const index = newTabs.findIndex((tab: BrowserTabTypes) => tab.id === activeTab)
            if (searchValue.includes('https://')) {
                newTabs[index].url = searchValue
            } else {
                newTabs[index].url = `https://${searchValue}`
            }
            return newTabs || prevState
        })

        // setSearchUrl(`https://www.google.com/search?q=${encodeURIComponent(searchValue)}`)
    }
    return (
        <Draggable id={id} fullScreen={fullScreen} draggableRef={headerRef} zIndex={zIndex}>
            <ContextMenu>
                <ContextMenuTrigger>
                    <div style={{ zIndex: zIndex }} onDoubleClick={() => {
                        setFullScreen(!fullScreen)
                    }} className={twMerge('w-full h-full select-none rounded-xl overflow-hidden min_max_transition flex flex-col border border-[#ececec] dark:border-[#0e0e0e] duration-300')} ref={windowRef}>
                        <div ref={headerRef} className='w-full h-11 shrink-0 flex relative justify-between items-center text-sm font-semibold duration-300'>
                            <div className='w-full h-full duration-300 bg-[#eeeeee] dark:bg-[#232323] flex-1 flex items-center'>
                                <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} tabCount={tabCount} setTabs={setTabs} />
                                <WindowControlButton closeHandler={() => removeWindow(id)} className='absolute right-2 z-10' minMaxHandler={() => setFullScreen(!fullScreen)} />
                            </div>
                        </div>
                        <form onDoubleClick={(e) => e.stopPropagation()} onSubmit={handleSearch} className='bg-[#ffffff] dark:bg-[#4c4c4c] border-b border-[#c7c7c7] dark:border-[#181818] duration-300 w-full z-10 relative h-10 flex items-center justify-between px-3'>
                            <div className='flex items-center'>
                                <ArrowLeft className='w-7 h-7 p-1.5 text-gray-600 dark:text-gray-400' />
                                <ArrowRight className='w-7 h-7 p-1.5 text-gray-600 dark:text-gray-400' />
                                <RotateCw className='w-7 h-7 p-1.5 text-gray-600 dark:text-gray-400' />
                            </div>
                            <label htmlFor='search' className='w-[65%] bg-[#f2f2f2] dark:bg-[#353535] duration-300 h-8 rounded-sm overflow-hidden relative flex justify-center items-center'>
                                <FaSearch className='absolute left-0 bg-transparent w-8 h-8 p-2 text-gray-800 dark:text-gray-300' />
                                <input onChange={(e) => setSearchValue(e.target.value)} value={searchValue} id='search' type="text" className='bg-transparent w-full h-full text-sm pl-8' placeholder='Search with Google or enter address' />
                            </label>
                            <div className='flex items-center'>
                                <FaRegUserCircle className='w-7 h-7 p-1.5 text-gray-600 dark:text-gray-400' />
                                <IoExtensionPuzzleOutline className='w-7 h-7 p-1.5 text-gray-600 dark:text-gray-400' />
                                <FaBars className='primary-hover-bg w-6 h-6 rounded-sm p-[5px]' />
                            </div>
                        </form>
                        <div onDoubleClick={(e) => e.stopPropagation()} className='bg-[#f9f9fb] dark:bg-[#2c2c2c] duration-300 w-full z-10 relative h-full min-h-[50%] flex flex-1 overflow-auto'>
                            <Tab data={tabs.find((tab: BrowserTabTypes) => tab.id === activeTab) || null} />
                        </div>
                    </div>
                </ContextMenuTrigger>
            </ContextMenu>
        </Draggable>
    )
}
