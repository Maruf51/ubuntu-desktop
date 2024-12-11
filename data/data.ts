import firefoxIcon from '@/images/app-icons/firefox.png'
import filesIcon from '@/images/app-icons/filemanager-app.png'
import softwareUpdaterIcon from '@/images/app-icons/software-updater.png'
import SoftwareUpdater from '@/components/doc-apps/SoftwareUpdater'
import Configure from '@/images/app-icons/configure.png'
import { BsHddNetwork } from "react-icons/bs";
import { FaBluetooth } from "react-icons/fa";
import { FaDisplay } from "react-icons/fa6";
import { LuVolume2 } from "react-icons/lu";
import { FaBoltLightning } from "react-icons/fa6";
import { TbBoxMultiple } from "react-icons/tb";
import { FaBrush } from "react-icons/fa6";
import { PiDesktopTowerBold } from "react-icons/pi";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { FaRegBell } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { IoIosCloudOutline } from "react-icons/io";
import { LuShare2 } from "react-icons/lu";
import { PiMouse } from "react-icons/pi";
import { FaRegKeyboard } from "react-icons/fa";
import { IoColorFilterOutline } from "react-icons/io5";
import { FiPrinter } from "react-icons/fi";
import { IoAccessibility } from "react-icons/io5";
import { IoHandLeftOutline } from "react-icons/io5";
import { FiSettings } from "react-icons/fi";
import Settings from '@/components/doc-apps/Settings';
import { DocAppTypes, FileSystemTypes, SettingsSidebarTypes, StartMenuAppTypes } from '@/types/types'
import Files from '@/components/doc-apps/files/Files'
import folder from '@/images/app-icons/folders/folder.png'
import avatar from '@/images/app-icons/avatar.png'
import document from '@/images/app-icons/folders/document.png'
import download from '@/images/app-icons/folders/download.png'
import music from '@/images/app-icons/folders/music.png'
import pictures from '@/images/app-icons/folders/pictures.png'
import videos from '@/images/app-icons/folders/videos.png'
import desktop from '@/images/app-icons/folders/desktop.png'
import Portfolio from '@/components/doc-apps/Portfolio'
import Firefox from '@/components/doc-apps/firefox/Firefox'
import appCenter from '@/images/start-apps/app-center.png'
import calculator from '@/images/start-apps/calculator-app.png'
import calendar from '@/images/start-apps/calendar-app.png'
import clock from '@/images/start-apps/clock-app.png'
import diskUsage from '@/images/start-apps/disk-usage-app.png'
import disks from '@/images/start-apps/disk-utility-app.png'
import gallery from '@/images/start-apps/gallery-app.png'
import gparted from '@/images/start-apps/gparted.png'
import additionalDrivers from '@/images/start-apps/jockey.png'
import maps from '@/images/start-apps/maps-app.png'
import powerStatistics from '@/images/start-apps/power-statistics.png'
import systemMonitor from '@/images/start-apps/system-monitor-app.png'
import terminal from '@/images/start-apps/terminal-app.png'
import tweaks from '@/images/start-apps/tweaks-app.png'




const wallpapers: string[] = [
    'https://ik.imagekit.io/znex04bydzr/Ubuntu%20Wallpapers/Numbat_wallpaper_dimmed_3480x2160_jOXt7kp5i.png',
    'https://ik.imagekit.io/znex04bydzr/Ubuntu%20Wallpapers/Clouds_by_Tibor_Mokanszki_O4Hkzo_7G.jpg',
    'https://ik.imagekit.io/znex04bydzr/Ubuntu%20Wallpapers/Fuwafuwa_nanbatto_san_by_amaral-dark_f2rMcZwoF.png',
    'https://ik.imagekit.io/znex04bydzr/Ubuntu%20Wallpapers/Fuwafuwa_nanbatto_san_by_amaral-light_tj5ljgv71.png',
    'https://ik.imagekit.io/znex04bydzr/Ubuntu%20Wallpapers/Monument_valley_by_orbitelambda_Siol0ngS_.jpg',
    'https://ik.imagekit.io/znex04bydzr/Ubuntu%20Wallpapers/Northan_lights_by_mizuno_xC63o3s0r.webp',
    'https://ik.imagekit.io/znex04bydzr/Ubuntu%20Wallpapers/ubuntu-wallpaper-d_dLFAFk01d.png'
]

const docApps: DocAppTypes[] = [
    {
        name: 'firefox',
        title: 'Firefox',
        icon: firefoxIcon,
        component: Firefox
    },
    {
        name: 'files',
        title: 'Files',
        icon: filesIcon,
        component: Files
    },
    {
        name: 'software updater',
        title: 'Software Updater',
        icon: softwareUpdaterIcon,
        component: SoftwareUpdater
    },
    {
        name: 'settings',
        title: 'Settings',
        icon: Configure,
        component: Settings
    },
    {
        name: 'portfolio',
        title: 'Portfolio',
        icon: avatar,
        component: Portfolio
    }
]

const settingsSidebar: SettingsSidebarTypes[][] = [
    [
        {
            name: 'Network',
            icon: BsHddNetwork
        },
        {
            name: 'Bluetooth',
            icon: FaBluetooth
        }
    ],
    [
        {
            name: 'Displays',
            icon: FaDisplay
        },
        {
            name: 'Sound',
            icon: LuVolume2
        },
        {
            name: 'Power',
            icon: FaBoltLightning
        },
        {
            name: 'Multitasking',
            icon: TbBoxMultiple
        },
        {
            name: 'Appearance',
            icon: FaBrush
        },
        {
            name: 'Ubuntu Desktop',
            icon: PiDesktopTowerBold
        }
    ],
    [
        {
            name: 'Apps',
            icon: BsFillGrid3X3GapFill
        },
        {
            name: 'Notifications',
            icon: FaRegBell
        },
        {
            name: 'Search',
            icon: FaSearch
        },
        {
            name: 'Online Accounts',
            icon: IoIosCloudOutline
        },
        {
            name: 'Sharing',
            icon: LuShare2
        }
    ],
    [
        {
            name: 'Mouse & Touchpad',
            icon: PiMouse
        },
        {
            name: 'Keyboard',
            icon: FaRegKeyboard
        },
        {
            name: 'Color',
            icon: IoColorFilterOutline
        },
        {
            name: 'Printers',
            icon: FiPrinter
        }
    ],
    [
        {
            name: 'Accessibility',
            icon: IoAccessibility
        },
        {
            name: 'Privacy & Security',
            icon: IoHandLeftOutline
        },
        {
            name: 'System',
            icon: FiSettings
        }
    ]
]

const colors: string[] = [
    '#e95420', '#787859', '#657b69', '#4b8501', '#03875b', '#308280', '#0073e5', '#7764d8', '#b34cb3', '#da3450'
]

const fileSystem: FileSystemTypes[] = [
    {
        id: 1,
        name: 'Recent',
        type: 'folder',
        children: [],
        icon: folder,
        path: ['Recent']
    },
    {
        id: 2,
        name: 'Starred',
        type: 'folder',
        children: [],
        icon: folder,
        path: ['Starred']
    },
    {
        id: 3,
        name: 'Home',
        type: 'folder',
        children: [
            {
                id: 4,
                name: 'Desktop',
                type: 'folder',
                children: [],
                icon: desktop,
                path: ['Home', 'Desktop']
            },
            {
                id: 5,
                name: 'Documents',
                type: 'folder',
                children: [],
                icon: document,
                path: ['Home', 'Documents']
            },
            {
                id: 6,
                name: 'Downloads',
                type: 'folder',
                children: [],
                icon: download,
                path: ['Home', 'Downloads']
            },
            {
                id: 7,
                name: 'Music',
                type: 'folder',
                children: [],
                icon: music,
                path: ['Home', 'Music']
            },
            {
                id: 8,
                name: 'Pictures',
                type: 'folder',
                children: [],
                icon: pictures,
                path: ['Home', 'Pictures']
            },
            {
                id: 9,
                name: 'Videos',
                type: 'folder',
                children: [],
                icon: videos,
                path: ['Home', 'Videos']
            },
        ],
        icon: folder,
        path: ['Home']
    },
    {
        id: 4,
        name: 'Desktop',
        type: 'folder',
        children: [],
        icon: folder,
        path: ['Home', 'Desktop']
    },
    {
        id: 5,
        name: 'Documents',
        type: 'folder',
        children: [],
        icon: folder,
        path: ['Home', 'Documents']
    },
    {
        id: 6,
        name: 'Downloads',
        type: 'folder',
        children: [],
        icon: folder,
        path: ['Home', 'Downloads']
    },
    {
        id: 7,
        name: 'Music',
        type: 'folder',
        children: [],
        icon: folder,
        path: ['Home', 'Music']
    },
    {
        id: 8,
        name: 'Pictures',
        type: 'folder',
        children: [],
        icon: folder,
        path: ['Home', 'Pictures']
    },
    {
        id: 9,
        name: 'Videos',
        type: 'folder',
        children: [],
        icon: folder,
        path: ['Home', 'Videos']
    },
    {
        id: 10,
        name: 'Trash',
        type: 'folder',
        children: [],
        icon: folder,
        path: ['Trash']
    },
]

const startMenuApps: StartMenuAppTypes[] = [
    {
        name: 'app-center',
        title: 'App Center',
        icon: appCenter,
    },
    {
        name: 'portfolio',
        title: 'Portfolio',
        icon: avatar,
        component: Portfolio
    },
    {
        name: 'calculator',
        title: 'Calculator',
        icon: calculator,
    },
    {
        name: 'calendar',
        title: 'Calendar',
        icon: calendar,
    },
    {
        name: 'clock',
        title: 'Clock',
        icon: clock,
    },
    {
        name: 'disk-usage-analyzer',
        title: 'Disk Usage Analyzer',
        icon: diskUsage,
    },
    {
        name: 'software-updater',
        title: 'Software Updater',
        icon: softwareUpdaterIcon,
        component: SoftwareUpdater
    },
    {
        name: 'disks',
        title: 'Disks',
        icon: disks,
    },
    {
        name: 'firefox',
        title: 'Firefox',
        icon: firefoxIcon,
        component: Firefox
    },
    {
        name: 'settings',
        title: 'Settings',
        icon: Configure,
        component: Settings
    },
    {
        name: 'terminal',
        title: 'Terminal',
        icon: terminal,
    },
    {
        name: 'gallery',
        title: 'Gallery',
        icon: gallery,
    },
    {
        name: 'gparted',
        title: 'Gparted',
        icon: gparted,
    },
    {
        name: 'additional-drivers',
        title: 'Additional Drivers',
        icon: additionalDrivers,
    },
    {
        name: 'maps',
        title: 'Maps',
        icon: maps,
    },
    {
        name: 'power-statistics',
        title: 'Power Statistics',
        icon: powerStatistics,
    },
    {
        name: 'system-monitor',
        title: 'System Monitor',
        icon: systemMonitor,
    },
    {
        name: 'tweaks',
        title: 'Tweaks',
        icon: tweaks,
    },
]

export {
    wallpapers,
    docApps,
    settingsSidebar,
    colors,
    fileSystem,
    startMenuApps
}