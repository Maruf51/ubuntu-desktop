'use client'

import { FileSystemTypes } from '@/types/types'
import { SidebarItem } from './SidebarItem'

interface SidebarProps {
    items: FileSystemTypes[],
    paths: string[],
    directNavigate: (e: string[]) => void
}


export function Sidebar({ items, paths, directNavigate }: SidebarProps) {

    return (
        <nav className='overflow-auto h-full duration-300 bg-[#ebebeb] dark:bg-[#303030] w-[230px] flex items-center px-1 flex-col gap-1 py-1 border-r border-[#dbdbdb] dark:border-[#303030]'>
            {items.map((item) => (
                <SidebarItem
                    key={item.id}
                    item={item}
                    paths={paths}
                    directNavigate={directNavigate}
                />
            ))}
        </nav>
    )
}

