import { NextPage } from 'next'
import { ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger } from '../ui/context-menu'
import { useStore } from 'zustand'
import { metaDataStore, windowStore } from '@/store/useStore'
import Settings from '../doc-apps/Settings'
import { MetaDataStoreTypes, WindowStoreTypes } from '@/types/types'


const DesktopContext: NextPage = ({ }) => {
    const { addNewWindow, setActiveWindow }: WindowStoreTypes = useStore(windowStore)
    const { setFolderModal }: MetaDataStoreTypes = useStore(metaDataStore)

    const settingsOpenHandler = () => {
        const id = Math.round(Math.random() * 100000000)
        addNewWindow({ comp: Settings, id, name: 'settings' })
        setActiveWindow(id)
    }
    return (
        <ContextMenuContent>
            <ContextMenuItem onClick={() => setFolderModal(['Home', 'Desktop'])}>New Folder</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem disabled>Paste</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem>Select All</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem>Arrange Icons</ContextMenuItem>
            <ContextMenuSub>
                <ContextMenuSubTrigger inset>Arrange By...</ContextMenuSubTrigger>
                <ContextMenuSubContent className="w-56">
                    <ContextMenuItem>Keep Arranged...</ContextMenuItem>
                    <ContextMenuItem>Kepp Stacked by type...</ContextMenuItem>
                    <ContextMenuItem>Sort Home/Drives/Trash...</ContextMenuItem>
                    <ContextMenuSeparator />
                    <ContextMenuItem>Sort by Name</ContextMenuItem>
                    <ContextMenuItem>Sort by Name Descending</ContextMenuItem>
                    <ContextMenuItem>Sort by Modified Time</ContextMenuItem>
                    <ContextMenuItem>Sort by Type</ContextMenuItem>
                    <ContextMenuItem>Sort by Size</ContextMenuItem>
                </ContextMenuSubContent>
            </ContextMenuSub>
            <ContextMenuSeparator />
            <ContextMenuItem>Show Desktop in Files</ContextMenuItem>
            <ContextMenuItem>Open in Terminal</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem onClick={settingsOpenHandler}>Change Background...</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem onClick={settingsOpenHandler}>Desktop Icons Settings</ContextMenuItem>
            <ContextMenuItem onClick={settingsOpenHandler}>Display Settings</ContextMenuItem>
        </ContextMenuContent>
    )
}

export default DesktopContext