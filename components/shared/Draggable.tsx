import { windowStore } from '@/store/useStore';
import { WindowStoreTypes } from '@/types/types';
import { NextPage } from 'next'
import { PropsWithChildren, useRef, useState } from 'react';
import Moveable from 'react-moveable';
import { twMerge } from 'tailwind-merge';
import { useStore } from 'zustand';

interface Props {
    id: number,
    fullScreen: boolean,
    draggableRef: React.RefObject<HTMLDivElement>,
    width?: number,
    height?: number,
    minWIdth?: number,
    minHeight?: number,
    zIndex: number,
    reSize?: boolean
}

const Draggable: NextPage<PropsWithChildren<Props>> = ({ id, children, fullScreen, draggableRef, width = 800, height = 450, minWIdth, minHeight, zIndex = 10, reSize = true }) => {
    const { setActiveWindow }: WindowStoreTypes = useStore(windowStore);
    const targetRef = useRef<HTMLDivElement>(null);
    const [isDraggingOrResizing, setIsDraggingOrResizing] = useState(false);

    const currentWindowHandler = () => {
        setActiveWindow(id)
    }
    return (
        <div className="root">
            <div className="container">
                <div
                    className={twMerge(
                        "target bg-transparent absolute top-32 left-48 transition-[top,left,width,height,transform] duration-300",
                        fullScreen && '!top-0 !left-0 !w-full !h-full !translate-x-0 !translate-y-0',
                        isDraggingOrResizing && 'transition-none'
                    )}
                    ref={targetRef}
                    style={{
                        maxWidth: "auto",
                        maxHeight: "auto",
                        minWidth: minWIdth || "500px",
                        minHeight: minHeight || "300px",
                        width: width,
                        height: height,
                        zIndex: zIndex
                    }}
                    onPointerDown={currentWindowHandler}
                >
                    {children}
                </div>
                {
                    !fullScreen &&
                    <Moveable
                        target={targetRef}
                        dragTarget={draggableRef}
                        draggable={true}
                        throttleDrag={1}
                        edgeDraggable={false}
                        startDragRotate={0}
                        throttleDragRotate={0}
                        onDragStart={() => setIsDraggingOrResizing(true)} // Disable transition on start
                        onDrag={e => {
                            e.target.style.transform = e.transform;
                        }}
                        onDragEnd={() => setIsDraggingOrResizing(false)} // Re-enable transition on end
                        resizable={reSize}
                        keepRatio={false}
                        throttleResize={1}
                        renderDirections={["nw", "n", "ne", "w", "e", "sw", "s", "se"]}
                        onResizeStart={() => setIsDraggingOrResizing(true)} // Disable transition on start
                        onResize={e => {
                            e.target.style.width = `${e.width}px`;
                            e.target.style.height = `${e.height}px`;
                            e.target.style.transform = e.drag.transform;
                        }}
                        onResizeEnd={() => setIsDraggingOrResizing(false)} // Re-enable transition on end
                    />
                }
            </div>
        </div>
    );
}

export default Draggable;
