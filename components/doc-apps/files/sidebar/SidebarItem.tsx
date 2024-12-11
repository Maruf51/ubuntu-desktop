import { FileSystemTypes } from '@/types/types'
import { Clock, Star, Home, Laptop, Folder, Download, Music, Image, Video, Trash2, Box, MoreHorizontal } from 'lucide-react'

const iconMap = {
    Recent: Clock,
    Starred: Star,
    Home: Home,
    Desktop: Laptop,
    Documents: Folder,
    Downloads: Download,
    Music: Music,
    Pictures: Image,
    Videos: Video,
    Trash: Trash2,
    apps: Box,
    'Other Locations': MoreHorizontal
}

interface SidebarItemProps {
    item: FileSystemTypes,
    paths: string[],
    directNavigate: (e: string[]) => void
}

export function SidebarItem({ item, paths, directNavigate }: SidebarItemProps) {
    const Icon = iconMap[item.name as keyof typeof iconMap] || Folder

    return (
        <button
            onClick={() => {
                if (item.path) directNavigate(item.path)
            }}
            className={`w-full flex items-center gap-3 px-3 py-2 text-sm transition-colors hover:bg-[#d8d8d8] dark:hover:bg-[#454545] rounded-lg ${JSON.stringify(item?.path) === JSON.stringify(paths) ? 'bg-[#d8d8d8] dark:bg-[#454545]' : ''
                }`}
        >
            <Icon className="w-4 h-4" />
            <span>{item.name}</span>
        </button>
    )
}

