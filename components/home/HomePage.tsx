import { NextPage } from 'next'
import Nav from '../shared/Nav'
import { docApps, wallpapers } from '@/data/data'
import { FaUbuntu } from 'react-icons/fa6'
import { DocAppTypes, WindowStoreTypes } from '@/types/types'
import Image from 'next/image'
import { useStore } from 'zustand'
import { windowStore } from '@/store/useStore'
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '../ui/context-menu'
import DesktopContext from '../context-menu-contents/DesktopContext'
import Settings from '../doc-apps/Settings'

interface Props { }

const HomePage: NextPage<Props> = ({ }) => {
  const { addNewWindow, windows, setActiveWindow, activeWindow }: any = useStore(windowStore)
  return (
    <div className='w-screen h-screen'>
      <div className="w-full h-full flex flex-col">
        <Nav />
        <div className='w-full h-full bg-cover bg-center bg-no-repeat bg-[#4b4b4b] flex flex-1' style={{ backgroundImage: `url(${wallpapers[0]})` }}>
          <div className='h-full pr-1 bg-[#00000062] flex flex-col justify-between py-1.5 select-none'>
            <div className='flex flex-col gap-1'>
              {
                docApps.map((doc: DocAppTypes, index: number) => <div onClick={() => {
                  const id = Math.round(Math.random() * 100000000)
                  addNewWindow({ comp: doc.component, id, name: doc.name })
                  setActiveWindow(id)
                }} className='w-11 h-11 p-1.5 hover:bg-[#77777736] dark:hover:bg-[#77777736] rounded-lg' key={index}><Image className='w-full h-full' src={doc.icon} width={40} height={40} alt={doc.name} /></div>)
              }
            </div>
            <FaUbuntu className='w-11 h-11 p-2 hover:bg-[#77777736] dark:hover:bg-[#77777736] rounded-lg text-white' />
          </div>
          <ContextMenu>
            <ContextMenuTrigger className='w-full h-full relative overflow-hidden'>
              {
                windows.map((window: WindowStoreTypes) => {
                  const Component = window.comp;
                  return <Component id={window.id} zIndex={window.zIndex} key={window.id} />
                })
              }
            </ContextMenuTrigger>
            <DesktopContext />
          </ContextMenu>
        </div>
      </div>
    </div>
  )
}

export default HomePage