import { NextPage } from 'next'
import { useRef } from 'react';
import Moveable from 'react-moveable';


const Resizables: NextPage = ({ }) => {
    const targetRef = useRef<HTMLDivElement>(null);

    return (
        <div className="root">
            <div className="container">
                <div className="target bg-red-200 absolute top-48 left-48" ref={targetRef} style={{
                    maxWidth: "auto",
                    maxHeight: "auto",
                    minWidth: "auto",
                    minHeight: "auto",
                }}>Target</div>
                <Moveable
                    target={targetRef}
                    draggable={true}
                    throttleDrag={1}
                    edgeDraggable={false}
                    startDragRotate={0}
                    throttleDragRotate={0}
                    onDrag={e => {
                        e.target.style.transform = e.transform;
                    }}
                    resizable={true}
                    keepRatio={false}
                    throttleResize={1}
                    renderDirections={["nw", "n", "ne", "w", "e", "sw", "s", "se"]}
                    onResize={e => {
                        e.target.style.width = `${e.width}px`;
                        e.target.style.height = `${e.height}px`;
                        e.target.style.transform = e.drag.transform;
                    }}
                />
            </div>
        </div>
    );
}

export default Resizables