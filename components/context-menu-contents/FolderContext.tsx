import { NextPage } from 'next'
import { ContextMenuContent, ContextMenuItem, ContextMenuSeparator } from '../ui/context-menu'
import { moveToTrash } from '@/functions/functions'
import { FileSystemStoreTypes, FileSystemTypes } from '@/types/types'
import { useStore } from 'zustand'
import { fileSystemStore } from '@/store/useStore'

interface Props {
    openHandler: () => void,
    renameOpenHandler: () => void,
    disabled: boolean,
    folder: FileSystemTypes
}

const FolderContext: NextPage<Props> = ({ openHandler, renameOpenHandler, disabled, folder }) => {
    const { files, setFiles }: FileSystemStoreTypes = useStore(fileSystemStore)

    const moveToTrashHnadler = () => {
        const newFiles = moveToTrash(files, folder.path)
        const trashIndex = newFiles.findIndex((file: FileSystemTypes) => file.path[0] === 'Trash')
        newFiles[trashIndex].children = [...(newFiles[trashIndex].children || []), folder]

        setFiles(newFiles || files)
    }
    return (
        <ContextMenuContent>
            <ContextMenuItem onClick={openHandler}>Open</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem disabled>Cut</ContextMenuItem>
            <ContextMenuItem disabled>Copy</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem disabled={disabled} onClick={renameOpenHandler}>Rename</ContextMenuItem>
            <ContextMenuItem onClick={moveToTrashHnadler} disabled={disabled}>Move to Trash</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem>Open Terminal</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem>Properties</ContextMenuItem>
        </ContextMenuContent>
    )
}

export default FolderContext