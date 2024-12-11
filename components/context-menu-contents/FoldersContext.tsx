import { NextPage } from 'next'
import { ContextMenuContent, ContextMenuItem, ContextMenuSeparator } from '../ui/context-menu'
import { useStore } from 'zustand'
import { metaDataStore } from '@/store/useStore'
import { MetaDataStoreTypes } from '@/types/types'

interface Props {
    paths: string[]
}

const FoldersContext: NextPage<Props> = ({ paths }) => {
    const { setFolderModal }: MetaDataStoreTypes = useStore(metaDataStore)

    return (
        <ContextMenuContent>
            <ContextMenuItem onClick={() => setFolderModal(paths || ['Home'])}>New Folder...</ContextMenuItem>
            <ContextMenuItem>Open WIth...</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem disabled>Paste</ContextMenuItem>
            <ContextMenuItem>Select All</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem>Open Terminal</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem>Properties</ContextMenuItem>
        </ContextMenuContent>
    )
}

export default FoldersContext