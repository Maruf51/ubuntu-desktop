import { findFolder } from '@/functions/functions'
import { fileSystemStore } from '@/store/useStore'
import { FileSystemStoreTypes, FileSystemTypes } from '@/types/types'
import { NextPage } from 'next'
import { useEffect, useMemo, useState } from 'react'
import { useStore } from 'zustand'
import Folder from './Folder'
import { FolderClosed, Trash2 } from 'lucide-react'
import { twMerge } from 'tailwind-merge'
import { ContextMenu, ContextMenuTrigger } from '@/components/ui/context-menu'
import FoldersContext from '@/components/context-menu-contents/FoldersContext'
import TrashFoldersContext from '@/components/context-menu-contents/TrashFoldersContext'
import Image from 'next/image'
import TrashFolderContext from '@/components/context-menu-contents/TrashFolderContext'

interface Props {
    paths: string[],
    navigateTo: (e: string) => void
}

const ShowFiles: NextPage<Props> = ({ paths, navigateTo }) => {
    const { files }: FileSystemStoreTypes = useStore(fileSystemStore)
    const [folders, setFolders] = useState<FileSystemTypes | undefined>(findFolder(files, paths))
    const [selectedFolder, setSelectedFolder] = useState<FileSystemTypes | null>(null)

    useEffect(() => {
        setFolders(findFolder(files, paths))
        setSelectedFolder(null)
    }, [files, paths])
    return (
        <div className='w-full h-full flex-1 overflow-auto relative'>
            <ContextMenu >
                {
                    paths[0] === 'Trash' ? <TrashFolders selectedFolder={selectedFolder} setSelectedFolder={setSelectedFolder} /> :
                        <ContextMenuTrigger>
                            <div className='w-full h-full'>
                                <div className={twMerge('bg-[#ffffff] dark:bg-[#1e1e1e] duration-300 w-full flex items-start gap-3 flex-wrap flex-1 overflow-auto p-3', folders?.children?.[0] ? 'h-min' : 'h-full')}>
                                    {
                                        folders?.children && folders.children.map((folder: FileSystemTypes, index: number) => <Folder navigateTo={navigateTo} selectedFolder={selectedFolder} setSelectedFolder={setSelectedFolder} data={folder} key={index} />)
                                    }
                                    {
                                        !folders?.children?.[0] && <div className='w-full h-full flex justify-center items-center flex-col'>
                                            <FolderClosed className='text-[#949494] dark:text-[#959595] duration-300 w-28 h-28' />
                                            <h1 className='text-3xl'>Folder is empty</h1>
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className='w-full h-full absolute top-0 left-0 z-0' onClick={() => setSelectedFolder(null)}></div>
                        </ContextMenuTrigger>
                }
                {
                    paths[0] === 'Trash' ? <TrashFoldersContext /> : <FoldersContext paths={paths} />
                }
            </ContextMenu>
        </div>
    )
}

export default ShowFiles

const TrashFolders = ({ selectedFolder, setSelectedFolder }: { selectedFolder: FileSystemTypes | null, setSelectedFolder: (e: FileSystemTypes | null) => void, }) => {
    const { files, setEmptyTrashModal }: FileSystemStoreTypes = fileSystemStore()
    const [folders, setFolders] = useState<FileSystemTypes>()

    useMemo(() => {
        setFolders(files.find((file: FileSystemTypes) => file.name === "Trash"))
    }, [files])
    return (
        <ContextMenu>
            <ContextMenuTrigger className='flex flex-col w-full h-full'>
                <div className='bg-[#30828186] w-full h-10 flex justify-end items-center p-1'>
                    <button onClick={() => setEmptyTrashModal(true)} className='h-full px-3 bg-[#ffffff1c] dark:bg-[#ffffff1c] hover:bg-[#ffffff2d] dark:hover:bg-[#ffffff2d] cursor-pointer duration-300 rounded-md text-sm'>Empty Trash</button>
                </div>
                <div className='w-full h-full flex-1 relative'>
                    <div className={twMerge('bg-[#ffffff] dark:bg-[#1e1e1e] duration-300 w-full flex items-start gap-3 flex-wrap flex-1 overflow-auto p-3', folders?.children?.[0] ? 'h-min' : 'h-full')}>
                        {
                            folders?.children && folders.children.map((folder: FileSystemTypes, index: number) => <TrashFolder selectedFolder={selectedFolder} setSelectedFolder={setSelectedFolder} key={index} data={folder} />)
                        }
                        {
                            !folders?.children?.[0] && <div className='w-full h-full flex justify-center items-center flex-col'>
                                <Trash2 className='text-[#949494] dark:text-[#959595] duration-300 w-28 h-28' />
                                <h1 className='text-3xl mt-3'>Trash is empty</h1>
                            </div>
                        }
                    </div>
                    <div className='w-full h-full absolute top-0 left-0 z-0' onClick={() => setSelectedFolder(null)}></div>
                </div>
            </ContextMenuTrigger>
            <TrashFoldersContext />
        </ContextMenu>
    )
}

const TrashFolder = ({ data, selectedFolder, setSelectedFolder }: { data: FileSystemTypes, selectedFolder: FileSystemTypes | null, setSelectedFolder: (e: FileSystemTypes | null) => void }) => {

    return (
        <ContextMenu onOpenChange={(e) => {
            if (e) setSelectedFolder(data)
        }}>
            <ContextMenuTrigger>
                <div onClick={() => setSelectedFolder(data)} className={twMerge('w-[100px] h-auto z-10 relative flex flex-col justify-center items-center duration-300 hover:bg-[#ebebeb] dark:hover:bg-[#272727] px-3 py-2 rounded-lg overflow-hidden', selectedFolder && selectedFolder.name === data.name && 'bg-[#bdd7d6] dark:bg-[#243e3d] hover:bg-[#bdd7d6] dark:hover:bg-[#243e3d]')}>
                    <Image src={data.icon} width={100} height={100} alt='folder' className='w-[80%] aspect-square' />
                    <p className='text-sm text-center line-clamp-2'>{data.name}</p>
                </div>
                <TrashFolderContext data={data} />
            </ContextMenuTrigger>
        </ContextMenu>
    )
}