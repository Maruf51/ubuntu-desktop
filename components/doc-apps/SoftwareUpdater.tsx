import { NextPage } from 'next'
import WindowControlButton from '../shared/WindowControlButton'
import Image from 'next/image'
import softwareUpdaterIcon from '@/images/app-icons/software-updater.png'
import { useStore } from 'zustand'
import { windowStore } from '@/store/useStore'
import { useEffect, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import Moveable from 'react-moveable'
import { WindowStoreTypes } from '@/types/types'

interface Props {
    id: number,
    zIndex: number
}

const SoftwareUpdater: NextPage<Props> = ({ id, zIndex }) => {
    const { removeWindow, setActiveWindow, activeWindow }: WindowStoreTypes = useStore(windowStore)
    const [isUpdateCompleted, setIsUpdateCompleted] = useState<boolean>(false)

    const windowRef = useRef<HTMLDivElement>(null)
    const headerRef = useRef<HTMLDivElement>(null)
    return (
        <div style={{ zIndex: zIndex }} className={twMerge('w-[650px] absolute top-[100px] left-[200px] select-none', activeWindow === id && ' z-10')} ref={windowRef} onClick={() => setActiveWindow(id)}>
            <Moveable
                target={windowRef.current}
                draggable={true}
                dragArea={true}
                onDragStart={() => setActiveWindow(id)}
                onDrag={({ beforeTranslate }) => {
                    if (windowRef.current) windowRef.current.style.transform = `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px)`
                }}
            />
            <div ref={headerRef} className='w-full h-9 bg-[#ececec] dark:bg-[#202020] flex relative justify-center items-center rounded-t-xl text-sm font-semibold border-b border-[#c1c1c1] dark:border-[#030303] duration-300'>
                <h2>Software Updater {id}</h2>
                <WindowControlButton closeHandler={() => removeWindow(id)} minMax={false} className='absolute right-2 z-10' />
            </div>
            <div className='bg-[#fafafa] dark:bg-[#2c2c2c] duration-300 p-3 z-10 relative'>
                {
                    isUpdateCompleted ? <UpdateCompleted id={id} /> : <Updating setCompleted={setIsUpdateCompleted} id={id} />
                }
            </div>
        </div>
    )
}

export default SoftwareUpdater

const Updating = ({ id, setCompleted }: { id: number, setCompleted: (e: boolean) => void }) => {
    const { removeWindow }: WindowStoreTypes = useStore(windowStore)
    const [loadingPercent, setLoadingPercent] = useState<number>(0)
    const [stopped, setStopped] = useState<boolean>(false)

    useEffect(() => {
        let timer: NodeJS.Timeout;

        // Reset and start the progress when the component is rendered or re-rendered
        if (!stopped) {
            setLoadingPercent(0); // Reset to 0 initially

            const updateProgress = () => {
                setLoadingPercent((prevPercent: number) => {
                    if (prevPercent < 100) {
                        return prevPercent + 20;
                    } else {
                        clearTimeout(timer);
                        return 100;
                    }
                });
            };

            timer = setInterval(updateProgress, 500); // Increment by 20 every 500ms
        } else if (stopped) {
            setTimeout(() => {
                removeWindow(id)
            }, 1000)
        }

        return () => {
            clearTimeout(timer); // Cleanup the timer when the component unmounts or re-renders
        };
    }, [stopped]);

    useEffect(() => {
        if (loadingPercent === 100) {
            setTimeout(() => {
                setCompleted(true)
            }, 1000)
        }
    }, [loadingPercent])
    return (
        <>
            <h3 className={twMerge('text-sm duration-300', (stopped || loadingPercent === 100) && 'opacity-40')}>Checking for updates...</h3>
            <div className='flex gap-2 pb-3 items-end mt-5'>
                <div className='w-full flex-1 relative h-1 pb-2 overflow-hidden'>
                    <div className='bg-[#e1e1e1] h-1 border border-[#dbdbdb] dark:bg-[#4b4b4b] dark:border-[#4b4b4b] duration-300'>

                    </div>
                    <div style={{ transform: `translateX(-${100 - loadingPercent}%)` }} className='bg-highlight dark:bg-highlight absolute left-0 bottom-1 w-full h-1 duration-300'></div>
                </div>
                <button disabled={stopped || loadingPercent === 100} onClick={() => setStopped(true)} className='border border-[#c7c7c7] dark:border-[#181818] dark:bg-[#3c3c3c] bg-[#fafafa] hover:bg-[#eeeeee] dark:hover:bg-[#424242] dark:text-white duration-300 px-9 py-1.5 rounded-sm text-sm disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-[#fafafa] disabled:dark:hover:bg-[#3c3c3c]'>Stop</button>
            </div>
            <p className={twMerge('text-xs text-gray-800 dark:text-gray-200 duration-300', (stopped || loadingPercent === 100) && 'opacity-40')}>{stopped ? 'Stoped updating...' : (loadingPercent === 100 ? 'Finished checking' : 'Checking...')}</p>
        </>
    )
}

const UpdateCompleted = ({ id }: { id: number }) => {
    const { removeWindow }: WindowStoreTypes = useStore(windowStore)
    return (
        <>
            <div className='flex gap-3 pb-3'>
                <Image width={60} height={60} className='w-[60px] h-[60px]' src={softwareUpdaterIcon} alt='Software Updater' />
                <div className='pt-3'>
                    <h1 className='font-semibold'>The Software on this computer is up to date.</h1>
                    <p className='text-sm text-gray-700 dark:text-gray-300 pr-3'><strong className='text-gray-800 dark:text-gray-100'>Tip:</strong> You can use livepatch with Ubuntu Pro to keep your computer more secure between restarts.</p>
                </div>
            </div>
            <div className='flex justify-between h-9 text-gray-800'>
                <button className='border dark:text-white border-[#c7c7c7] dark:border-[#181818] bg-[#fafafa] dark:bg-[#3c3c3c] hover:bg-[#eeeeee] dark:hover:bg-[#424242] duration-300 px-6 rounded-sm text-sm'>Settings & Pro...</button>
                <button onClick={() => removeWindow(id)} className='border border-[#c7c7c7] dark:border-[#181818] dark:bg-[#3c3c3c] bg-[#fafafa] hover:bg-[#eeeeee] dark:hover:bg-[#424242] dark:text-white duration-300 px-9 rounded-sm text-sm'>OK</button>
            </div>
        </>
    )
}