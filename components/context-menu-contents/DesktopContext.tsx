import { NextPage } from 'next'
import { ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger } from '../ui/context-menu'

interface Props { }

const DesktopContext: NextPage<Props> = ({ }) => {
    return (
        <ContextMenuContent>
            <ContextMenuItem>New Folder</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem>Paste</ContextMenuItem>
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
            <ContextMenuItem>Change Background...</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem>Desktop Icons Settings</ContextMenuItem>
            <ContextMenuItem>Display Settings</ContextMenuItem>
        </ContextMenuContent>
    )
}

export default DesktopContext