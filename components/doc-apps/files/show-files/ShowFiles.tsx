import { findFolder } from '@/functions/functions'
import { fileSystemStore } from '@/store/useStore'
import { FileSystemStoreTypes, FileSystemTypes } from '@/types/types'
import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { useStore } from 'zustand'
import Folder from './Folder'
import { FolderClosed } from 'lucide-react'
import { twMerge } from 'tailwind-merge'
import { ContextMenu, ContextMenuTrigger } from '@/components/ui/context-menu'
import FoldersContext from '@/components/context-menu-contents/FoldersContext'

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
                <FoldersContext paths={paths} />
            </ContextMenu>
        </div>
    )
}

export default ShowFiles