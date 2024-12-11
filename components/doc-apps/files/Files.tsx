import { useRef, useState } from 'react'
import { useStore } from 'zustand'
import { fileSystemStore, windowStore } from '@/store/useStore'
import { twMerge } from 'tailwind-merge'
import { FaBars, FaSearch } from 'react-icons/fa'
import { FileSystemStoreTypes, WindowStoreTypes } from '@/types/types'
import WindowControlButton from '@/components/shared/WindowControlButton'
import { Sidebar } from './sidebar/Sidebar'
import ShowFiles from './show-files/ShowFiles'
import { ChevronLeft, ChevronRight, EllipsisVertical, Home } from 'lucide-react'
import { ContextMenu, ContextMenuTrigger } from '@/components/ui/context-menu'
import Draggable from '@/components/shared/Draggable'

interface Props {
    id: number,
    zIndex: number
}

export default function Files({ id, zIndex }: Props) {
    const { removeWindow, setActiveWindow, activeWindow }: WindowStoreTypes = useStore(windowStore)
    const { files }: FileSystemStoreTypes = useStore(fileSystemStore)
    const [fullScreen, setFullScreen] = useState<boolean>(false)
    const [paths, setPaths] = useState<string[]>(['Home'])

    const navigateTo = (path: string) => {
        setPaths((prevPaths: string[]) => {
            return [...prevPaths, path]
        })
    }
    const directNavigate = (path: string[]) => {
        setPaths(path)
    }
    const returnHandler = () => {
        if (paths.length !== 1) {
            setPaths((prevPaths: string[]) => {
                const newPaths = prevPaths.slice(0, -1)
                return newPaths
            })
        }
    }

    const windowRef = useRef<HTMLDivElement>(null)
    const headerRef = useRef<HTMLDivElement>(null)
    return (
        <>
            <ContextMenu>
                <ContextMenuTrigger>
                    <div
                        style={{ zIndex: zIndex }}
                        onDoubleClick={() => {
                            setActiveWindow(id)
                            setFullScreen(!fullScreen)
                        }}
                        className={twMerge('w-[70%] h-[70%] absolute top-[100px] left-[200px] select-none rounded-xl overflow-hidden min_max_transition flex flex-col dark:border dark:border-[#2e2e2e]', activeWindow === id && ' z-10', fullScreen && '!top-0 !left-0 !w-full !h-full !transform-none !rounded-none')}
                        ref={windowRef}
                        onClick={() => setActiveWindow(id)}
                    >
                        <Draggable windowRef={windowRef} id={id} />
                        <div ref={headerRef} className='w-full h-10 shrink-0 flex relative justify-between items-center text-sm font-semibold duration-300'>
                            <div className='h-full duration-300 bg-[#ebebeb] dark:bg-[#303030] w-[230px] flex justify-between items-center px-4 border-r border-[#dbdbdb] dark:border-[#303030]'>
                                <FaSearch />
                                <h2>Files</h2>
                                <FaBars />
                            </div>
                            <div className='w-full h-full py-1 duration-300 bg-[#ffffff] dark:bg-[#1e1e1e] flex-1 flex justify-center items-center gap-3 px-2'>
                                <div className='flex gap-1 z-10'>
                                    <ChevronLeft onClick={returnHandler} className={twMerge('rounded-sm p-1', paths.length === 1 ? 'text-gray-400 dark:text-gray-600' : 'primary-hover-bg')} />
                                    <ChevronRight className='rounded-sm p-1 text-gray-400 dark:text-gray-600' />
                                </div>
                                <div className='w-full flex-1 flex items-center bg-[#ececec] dark:bg-[#343434] h-full rounded-sm overflow-hidden'>
                                    <div className='flex w-full flex-1 pl-3'>
                                        <Home className='w-4 h-4' />
                                        {
                                            paths.map((path: string, index: number) => {
                                                return (
                                                    <div className='flex' key={index}>
                                                        <p className='text-sm primary-text px-2 h-full'>{path}</p>
                                                        {
                                                            paths.length - 1 !== index && <span>/</span>
                                                        }
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    <EllipsisVertical className='h-8 w-8 hover:bg-[#d8d8d8] dark:hover:bg-[#414141] aspect-square duration-300 p-2 primary-text z-10' />
                                </div>
                                <WindowControlButton closeHandler={() => removeWindow(id)} className='z-10' minMaxHandler={() => setFullScreen(!fullScreen)} />
                            </div>
                        </div>
                        <div onDoubleClick={(e) => e.stopPropagation()} className='bg-[#fafafa] dark:bg-[#1e1e1e] duration-300 z-10 relative h-full flex flex-1'>
                            <Sidebar paths={paths} directNavigate={directNavigate} items={files} />
                            <ShowFiles paths={paths} navigateTo={navigateTo} />
                        </div>
                    </div>
                </ContextMenuTrigger>
            </ContextMenu>
        </>
    )
}