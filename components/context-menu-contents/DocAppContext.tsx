import { NextPage } from 'next'
import { ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger } from '../ui/context-menu'
import { WindowStoreTypes, WindowTypes } from '@/types/types'
import { useStore } from 'zustand'
import { windowStore } from '@/store/useStore'

interface Props {
    newWindowHandler: () => void,
    activeWindows: WindowTypes[],
    name: string
}

const DocAppContext: NextPage<Props> = ({ newWindowHandler, activeWindows, name }) => {
    const {quitWindows}: WindowStoreTypes = useStore(windowStore)

    const quitHandler = () => {
        quitWindows(name)
    }
    return (
        <ContextMenuContent>
            <ContextMenuItem onClick={newWindowHandler}>New Window</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem disabled>Unpin</ContextMenuItem>
            {
                activeWindows.length !== 0 && <>
                    <ContextMenuSeparator />
                    <ContextMenuItem onClick={quitHandler}>{activeWindows.length === 1 ? 'Quit' : `Quit ${activeWindows.length} Windows`}</ContextMenuItem>
                </>
            }
        </ContextMenuContent>
    )
}

export default DocAppContext