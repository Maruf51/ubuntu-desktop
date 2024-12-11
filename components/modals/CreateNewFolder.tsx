import { createNewFolder, findFolder } from '@/functions/functions'
import { fileSystemStore, metaDataStore } from '@/store/useStore'
import { FileSystemStoreTypes, FileSystemTypes, MetaDataStoreTypes } from '@/types/types'
import { NextPage } from 'next'
import { useEffect, useRef, useState } from 'react'
import { useStore } from 'zustand'
import folder from '@/images/app-icons/folders/folder.png'

const CreateNewFolder: NextPage = ({ }) => {
    const { files, setFiles }: FileSystemStoreTypes = useStore(fileSystemStore)
    const { folderModal, setFolderModal }: MetaDataStoreTypes = useStore(metaDataStore)
    const [disabled, setDisabled] = useState<boolean>(false)
    const [folderName, setFolderName] = useState<string>('')
    const [error, setError] = useState<string>('')
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        // Delay focus slightly to ensure the input is fully rendered
        const timer = setTimeout(() => {
            inputRef.current?.focus()
        }, 10)

        return () => clearTimeout(timer) // Clean up the timer
    }, [])

    const folders: FileSystemTypes | undefined = findFolder(files, folderModal || ['Home'])

    useEffect(() => {
        const alreadyExists = folders?.children?.find((folder: FileSystemTypes) => folder.name === folderName)

        if (alreadyExists) {
            setDisabled(true)
            setError('A folder with that name already exists.')
        } else {
            setDisabled(false)
            setError('')
        }
    }, [folderName, folders])

    const createfolderHandler = (e: React.MouseEvent<HTMLFormElement>) => {
        e.preventDefault()
        const newFolder: FileSystemTypes = {
            id: Math.round(Math.random() * 1000000),
            name: folderName,
            type: 'folder',
            children: [],
            icon: folder,
            path: [...folderModal || 'Home', folderName],
        };
        setFiles(createNewFolder(files, [...folderModal || 'Home'], newFolder))
        setFolderModal(null)
    }
    return (
        <form onSubmit={createfolderHandler} className='fixed animated-opacity top-0 left-0 w-full h-full bg-[#00000062] dark:bg-[#00000062] z-[99999] flex justify-center items-center select-none'>
            <div className='w-[400px] h-auto rounded-lg overflow-hidden animated-modal duration-300 dark:border dark:border-[#3b3b3b]'>
                <div className='w-full h-11 bg-[#ffffff] dark:bg-[#303030] duration-300 border-b border-[#e0e0e0] dark:border-[#1f1f1f] p-1.5 flex justify-between items-center'>
                    <button type='button' onClick={() => setFolderModal(null)} className='h-full px-5 bg-[#ececec] dark:bg-[#444444] hover:bg-[#e2e2e2] dark:hover:bg-[#4e4e4e] duration-300 rounded-md text-sm'>Cancel</button>
                    <h2>New Folder</h2>
                    <button type='submit' disabled={folderName === '' || disabled} className='h-full px-5 bg-[#308280] dark:bg-[#308280] disabled:bg-[#97c0bf] dark:disabled:bg-[#305958] disabled:dark:hover:bg-[#305958] disabled:hover:bg-[#97c0bf] text-white dark:text-white hover:bg-[#458e8d] dark:hover:bg-[#458e8d] duration-300 rounded-md text-sm'>Create</button>
                </div>
                <div className='w-full h-auto bg-[#fafafa] dark:bg-[#2c2c2c] duration-300 flex flex-col p-5'>
                    <label htmlFor="folder-name">Folder Name</label>
                    <input autoComplete='off' ref={inputRef} value={folderName} onChange={(e) => setFolderName(e.target.value)} id="folder-name" type="text" className='bg-[#e7e7e7] dark:bg-[#404040] duration-300 border-2 border-[#8bb3b2] dark:border-[#3f7472] rounded-md outline-none h-8 mt-0.5 px-2 text-sm' />
                    {
                        error && <p className='text-sm m-0 p-0 pt-2 -mb-1 shake-animation'>{error}</p>
                    }
                </div>
            </div>
        </form>
    )
}

export default CreateNewFolder