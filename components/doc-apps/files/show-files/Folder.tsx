import FolderContext from '@/components/context-menu-contents/FolderContext'
import { ContextMenu, ContextMenuTrigger } from '@/components/ui/context-menu'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { findFolder, renameFolder } from '@/functions/functions'
import { fileSystemStore } from '@/store/useStore'
import { FileSystemStoreTypes, FileSystemTypes } from '@/types/types'
import { NextPage } from 'next'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { useStore } from 'zustand'

interface Props {
    data: FileSystemTypes,
    selectedFolder: FileSystemTypes | null,
    setSelectedFolder: (e: FileSystemTypes | null) => void,
    navigateTo: (e: string) => void
}

const Folder: NextPage<Props> = ({ data, selectedFolder, setSelectedFolder, navigateTo }) => {
    const [rename, setRename] = useState<boolean>(false)

    const openHandler = () => {
        navigateTo(data.name)
    }

    const renameOpenHandler = () => {
        setRename(true)
    }
    return (
        <ContextMenu onOpenChange={(e) => {
            if (e) setSelectedFolder(data)
        }}>
            <ContextMenuTrigger>
                <div onDoubleClick={openHandler} onClick={() => setSelectedFolder(data)} className={twMerge('w-[100px] h-auto z-10 relative flex flex-col justify-center items-center duration-300 hover:bg-[#ebebeb] dark:hover:bg-[#272727] px-3 py-2 rounded-lg overflow-hidden', selectedFolder && selectedFolder.name === data.name && 'bg-[#bdd7d6] dark:bg-[#243e3d] hover:bg-[#bdd7d6] dark:hover:bg-[#243e3d]')}>
                    <Image src={data.icon} width={100} height={100} alt='folder' className='w-[80%] aspect-square' />
                    <p className='text-sm text-center line-clamp-2'>{data.name}</p>
                    {
                        data?.path?.length !== 2 && <Popover modal={true} open={rename} onOpenChange={(e) => !e && setRename(false)}>
                            <PopoverTrigger></PopoverTrigger>
                            <PopoverContent className='bg-[#ffffff] dark:bg-[#303030] duration-300'>
                                <RenameFolder data={data} setRename={setRename} />
                            </PopoverContent>
                        </Popover>
                    }
                </div>
                <FolderContext folder={data} openHandler={openHandler} renameOpenHandler={renameOpenHandler} disabled={data.path.length === 2 ? true : false} />
            </ContextMenuTrigger>
        </ContextMenu>
    )
}

export default Folder

interface RenameFolderTypes {
    data: FileSystemTypes,
    setRename: (e: boolean) => void
}

const RenameFolder = ({ data, setRename }: RenameFolderTypes) => {
    const { files, setFiles }: FileSystemStoreTypes = useStore(fileSystemStore)
    const [disabled, setDisabled] = useState<boolean>(false)
    const [folderName, setFolderName] = useState<string>(data.name || '')
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        // Delay focus slightly to ensure the input is fully rendered
        const timer = setTimeout(() => {
            inputRef.current?.focus()
        }, 10)

        return () => clearTimeout(timer) // Clean up the timer
    }, [])

    const folderPath = data.path?.slice(0, -1)
    const folders: FileSystemTypes | undefined = findFolder(files, folderPath || ['Home'])

    useEffect(() => {
        const alreadyExists = folders?.children?.find((folder: FileSystemTypes) => folder.name === folderName)

        if (alreadyExists) {
            setDisabled(true)
        } else {
            setDisabled(false)
        }
    }, [folderName, folders])

    const submitHandler = (e: React.MouseEvent<HTMLFormElement>) => {
        e.preventDefault()

        setFiles(renameFolder(files, data.path, folderName))
        setRename(false)
    }
    return (
        <form onSubmit={submitHandler} className='w-64 h-auto gap-3 bg-[#ffffff] dark:bg-[#303030] duration-300 flex justify-center items-end flex-col p-0 select-none rounded-lg'>
            <h1 className='w-full text-center text-xl font-semibold'>Rename Folder</h1>
            <input autoComplete='off' ref={inputRef} value={folderName} onChange={(e) => setFolderName(e.target.value)} id="folder-name" type="text" className='bg-[#e7e7e7] dark:bg-[#404040] w-full duration-300 border-2 border-[#8bb3b2] dark:border-[#3f7472] rounded-md outline-none h-8 mt-0.5 px-2 text-sm text-slate-800 dark:text-slate-300' />
            <button type='submit' disabled={folderName === '' || disabled} className='h-8 px-5 bg-[#308280] dark:bg-[#308280] disabled:bg-[#97c0bf] dark:disabled:bg-[#305958] disabled:dark:hover:bg-[#305958] disabled:hover:bg-[#97c0bf] text-white dark:text-white hover:bg-[#458e8d] dark:hover:bg-[#458e8d] duration-300 rounded-md text-sm'>Create</button>
        </form>
    )
}