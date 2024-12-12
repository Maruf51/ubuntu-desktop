import { NextPage } from 'next'
import Nav from '../shared/Nav'
import { docApps, startMenuApps } from '@/data/data'
import { FaUbuntu } from 'react-icons/fa6'
import { DocAppTypes, MetaDataStoreTypes, WindowStoreTypes, WindowTypes } from '@/types/types'
import { useStore } from 'zustand'
import { metaDataStore, windowStore } from '@/store/useStore'
import { ContextMenu, ContextMenuTrigger } from '../ui/context-menu'
import DesktopContext from '../context-menu-contents/DesktopContext'
import DocApp from './doc-app/DocApp'
import { twMerge } from 'tailwind-merge'
import { useEffect, useRef, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import StartMenuApps from '../start-menu/StartMenuApps'
import Resizables from '../shared/Resizable'

const HomePage: NextPage = ({ }) => {
  const { windows, startMenu, setStartMenu }: WindowStoreTypes = useStore(windowStore)
  const { wallpaper }: MetaDataStoreTypes = useStore(metaDataStore)
  const mainDesktopRef = useRef<HTMLDivElement>(null)

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [scaledDimensions, setScaledDimensions] = useState({ width: 0, height: 0 });
  const scaleFactor = startMenu ? 0.17 : 1;

  useEffect(() => {
    const updateDimensions = () => {
      if (mainDesktopRef.current) {
        const { offsetWidth, offsetHeight } = mainDesktopRef.current;
        const scaledWidth = parseFloat((offsetWidth * scaleFactor).toFixed(1));
        const scaledHeight = parseFloat((offsetHeight * scaleFactor).toFixed(1));

        setDimensions({ width: offsetWidth, height: offsetHeight });
        setScaledDimensions((prevState: {width: number, height: number}) => {
          const scaledState = {width: scaledWidth, height: scaledHeight}
          return offsetWidth === scaledWidth ? prevState : scaledState
        });
      }
    };

    updateDimensions(); // Get dimensions on mount

    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [scaleFactor]);
  return (
    <div className='w-screen h-screen'>
      <div className="w-full h-full flex flex-col overflow-hidden">
        <Nav />
        <div style={{ height: `calc(100% - 36px)` }} className='w-full h-full bg-[#222222] flex flex-1'>
          <ContextMenu>
            <ContextMenuTrigger>
              <div className='h-full px-0.5 bg-[#3a3a3aa2] flex flex-col justify-between py-1.5 select-none'>
                <div className='flex flex-col gap-1'>
                  {
                    docApps.map((doc: DocAppTypes, index: number) => <DocApp key={index} data={doc} />)
                  }
                </div>
                <FaUbuntu onClick={() => setStartMenu(!startMenu)} className='w-[52px] h-[52px] p-2 hover:bg-[#77777736] dark:hover:bg-[#77777736] rounded-lg text-white' />
              </div>
            </ContextMenuTrigger>
          </ContextMenu>
          <div className='w-full h-full overflow-hidden relative flex flex-col items-center justify-between'>
            <div style={{ marginBottom: `${scaledDimensions.height + 60}px` }} className='w-[400px] bg-[#353535] dark:bg-[#353535] hover:bg-[#414141] dark:hover:bg-[#414141] duration-300 h-10 rounded-full overflow-hidden mt-7 flex border-2 border-[#353535] dark:border-[#353535] hover:border-[#414141] dark:hover:border-[#414141] focus-within:border-[#308280] dark:focus-within:border-[#308280] focus-within:hover:border-[#308280] dark:focus-within:hover:border-[#308280] focus-within:hover:bg-[#353535] dark:focus-within:hover:bg-[#353535] relative'>
              <FaSearch className='w-10 h-full p-3 text-gray-400' />
              <input type="text" placeholder='Type to search' className=' outline-none pr-3 w-full h-full bg-transparent text-sm text-gray-400' />
            </div>
            <div onClick={() => {
              if (startMenu) setStartMenu(false)
            }} style={{ backgroundImage: `url(${wallpaper})`, left: `-${startMenu ? (scaledDimensions.width / 2) + 10 : 0}px` }} className={twMerge('w-full h-full overflow-hidden flex duration-300 transition-all absolute top-0 left-0 scale-100 bg-cover bg-center bg-no-repeat z-10', startMenu && 'scale-[.17] shadow-equal origin-top top-[95px]')}>
              <ContextMenu>
                <ContextMenuTrigger className='w-full h-full relative overflow-hidden'>
                  {/* {
                startMenu && <StartMenu />
              } */}
                  {
                    windows.map((window: WindowTypes) => {
                      const Component = window.comp;
                      return <Component id={window.id} zIndex={window.zIndex || 0} key={window.id} />
                    })
                  }
                  {/* <Resizables />
                  <Resizables /> */}
                </ContextMenuTrigger>
                {
                  !startMenu && <DesktopContext />
                }
              </ContextMenu>
            </div>
            <div ref={mainDesktopRef} style={{ backgroundImage: `url(${wallpaper})`, left: `${(scaledDimensions.width / 2) + 10}px` }} className={twMerge('w-full h-full overflow-hidden flex duration-300 transition-all absolute scale-[.17] bg-cover bg-center bg-no-repeat shadow-equal origin-top top-[95px]')}>
              <ContextMenu>
                <ContextMenuTrigger className='w-full h-full relative overflow-hidden'>

                </ContextMenuTrigger>
                {
                  !startMenu && <DesktopContext />
                }
              </ContextMenu>
            </div>
            <div style={{maxHeight: `${dimensions.height - (scaledDimensions.height + 250)}px`}} className={twMerge('w-full h-[fit-content] flex-1 flex absolute bottom-0 overflow-auto mb-[100px] duration-300', !startMenu && 'bottom-[-100%]')}>
              <StartMenuApps apps={startMenuApps} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage