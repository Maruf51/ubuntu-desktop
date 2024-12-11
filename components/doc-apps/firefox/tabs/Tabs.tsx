import { LayoutList, Plus, X } from 'lucide-react'
import { NextPage } from 'next'
import Image from 'next/image'
import { twMerge } from 'tailwind-merge'
import BrowserIcon from '@/images/app-icons/firefox.png'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { BrowserTabTypes } from '@/types/types'

interface Props {
    tabs: BrowserTabTypes[],
    tabCount: number,
    setActiveTab: (e: number) => void,
    activeTab: number,
    setTabs: (e: BrowserTabTypes[] | ((prevState: BrowserTabTypes[]) => BrowserTabTypes[])) => void
}


const newTab = (): BrowserTabTypes => {
    const newId: number = Math.round(Math.random() * 1000000)
    return {
        title: 'New Tab',
        url: null,
        id: newId
    }
}

const Tabs: NextPage<Props> = ({ tabs, tabCount, setActiveTab, activeTab, setTabs }) => {

    const newTabHandler = () => {
        const nTab: BrowserTabTypes = newTab()
        setTabs((prevState: BrowserTabTypes[]) => [...prevState, nTab])
    }

    const closeTabHandler = (id: number) => {
        if (tabs.length === 1) {
            const nTab: BrowserTabTypes = newTab()
            setTabs([nTab])
        } else {
            setTabs((prevState: BrowserTabTypes[]) => {
                const filteredTabs: BrowserTabTypes[] = prevState.filter((tab: BrowserTabTypes) => tab.id !== id)
                return filteredTabs;
            })
        }
    }
    return (
        <div
            className='flex items-center p-1 gap-1 w-auto'
        >
            {
                tabs.slice(0, tabCount).map((tab: BrowserTabTypes, index: number) => {
                    return (
                        <div
                            onClick={() => setActiveTab(tab.id)}
                            key={index}
                            className={twMerge('flex justify-between items-center duration-300 bg-transparent rounded-md h-9 pl-3 pr-1.5 py-2 gap-2 w-[200px] relative z-10 hover:bg-[#4242421e] dark:hover:bg-[#c9c9c91e]', activeTab === tab.id && 'bg-[#ffffff] hover:bg-[#ffffff] dark:bg-[#4c4c4c] dark:hover:bg-[#4c4c4c] shadow-equal')}
                        >
                            <div className='flex items-center gap-2 h-9 py-2'>
                                <Image src={BrowserIcon} height={40} width={40} alt='browser' className='w-auto h-full' />
                                <h2>{tab.title}</h2>
                            </div>
                            <X onClick={() => closeTabHandler(tab.id)} className=' duration-300 hover:bg-[#0000001c] dark:hover:bg-[#ffffff1c] rounded-sm p-1' />
                        </div>
                    )
                })
            }
            {
                tabs.length > tabCount && <DropdownMenu>
                    <DropdownMenuTrigger className='z-10'>
                        <LayoutList className='hover:bg-[#4242421e] dark:hover:bg-[#c9c9c91e] w-9 h-9 p-2 rounded-sm duration-300' />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='z-10 max-h-[300px] h-auto overflow-auto bg-[#eeeeee] dark:bg-[#232323]'>
                        {
                            tabs.slice(tabCount, tabs.length).map((tab: BrowserTabTypes) => {
                                return (
                                    <DropdownMenuItem
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={twMerge('flex justify-between items-center duration-300 bg-transparent rounded-md h-9 pl-3 pr-1 py-2 gap-2 w-[200px] relative z-10 hover:!bg-[#42424227] dark:hover:!bg-[#c9c9c91e]', activeTab === tab.id && '!bg-[#ffffff] hover:!bg-[#ffffff] dark:!bg-[#4c4c4c] dark:hover:!bg-[#4c4c4c] shadow-equal')}
                                    >
                                        <div className='flex items-center gap-2 h-9 py-2'>
                                            <Image src={BrowserIcon} height={40} width={40} alt='browser' className='w-auto h-full' />
                                            <h2>{tab.title}</h2>
                                        </div>
                                        <X onClick={() => closeTabHandler(tab.id)} className=' duration-300 hover:bg-[#0000001c] dark:hover:bg-[#ffffff1c] rounded-sm p-1.5 text-2xl !w-7 !h-7 text-gray-700 dark:text-gray-300' />
                                    </DropdownMenuItem>
                                )
                            })
                        }
                    </DropdownMenuContent>
                </DropdownMenu>
            }
            <Plus onClick={newTabHandler} className='hover:bg-[#4242421e] dark:hover:bg-[#c9c9c91e] w-9 h-9 p-2 rounded-sm duration-300 z-10 cursor-pointer' />
        </div>
    )
}

export default Tabs