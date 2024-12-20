import { NextPage } from 'next'
import { ContextMenuContent, ContextMenuItem, ContextMenuSeparator } from '../ui/context-menu'
import { FileSystemStoreTypes, FileSystemTypes } from '@/types/types'
import { useStore } from 'zustand'
import { fileSystemStore } from '@/store/useStore'

interface Props {
    data: FileSystemTypes
}

const TrashFolderContext: NextPage<Props> = ({data}) => {
    const { setDeleteFromTrashModal }: FileSystemStoreTypes = useStore(fileSystemStore)

    return (
        <ContextMenuContent>
            <ContextMenuItem disabled>Open</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem disabled>Cut</ContextMenuItem>
            <ContextMenuItem disabled>Copy</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem disabled>Rename</ContextMenuItem>
            <ContextMenuItem onClick={() => setDeleteFromTrashModal(data)}>Delete From Trash...</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem disabled>Properties</ContextMenuItem>
        </ContextMenuContent>
    )
}

export default TrashFolderContext