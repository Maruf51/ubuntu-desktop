import { windowStore } from '@/store/useStore';
import { WindowStoreTypes } from '@/types/types';
import { NextPage } from 'next'
import Moveable from 'react-moveable';
import { useStore } from 'zustand';

interface Props {
    windowRef: React.RefObject<HTMLDivElement>,
    id: number
}

const Draggable: NextPage<Props> = ({ windowRef, id }) => {
    const { setActiveWindow }: WindowStoreTypes = useStore(windowStore)
    return (
        <Moveable
            target={windowRef.current}
            draggable={true}
            dragArea={true}
            onDragStart={() => setActiveWindow(id)}
            onDrag={({ beforeTranslate }) => {
                if (windowRef.current) {
                    const y = Math.max(beforeTranslate[1], -100);

                    windowRef.current.style.transform = `translate(${beforeTranslate[0]}px, ${y}px)`;
                }
            }}
        />
    )
}

export default Draggable