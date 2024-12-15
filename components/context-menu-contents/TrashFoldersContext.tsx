import { NextPage } from 'next'
import { ContextMenuContent, ContextMenuItem, ContextMenuSeparator } from '../ui/context-menu'
import { FileSystemStoreTypes } from '@/types/types'
import { fileSystemStore } from '@/store/useStore'


const TrashFoldersContext: NextPage = ({ }) => {
    const { setEmptyTrashModal }: FileSystemStoreTypes = fileSystemStore()
    return (
        <ContextMenuContent>
            <ContextMenuItem disabled>New Folder</ContextMenuItem>
            <ContextMenuItem disabled>Open WIth...</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem disabled>Paste</ContextMenuItem>
            <ContextMenuItem disabled>Select All</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem onClick={() => setEmptyTrashModal(true)}>Empty Trash</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem disabled>Properties</ContextMenuItem>
        </ContextMenuContent>
    )
}

export default TrashFoldersContext