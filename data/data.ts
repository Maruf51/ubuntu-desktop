import braveIcon from '@/images/app-icons/brave.png'
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


const wallpapers = [
    'https://ik.imagekit.io/znex04bydzr/Ubuntu%20Wallpapers/Numbat_wallpaper_dimmed_3480x2160_jOXt7kp5i.png',
    'https://ik.imagekit.io/znex04bydzr/Ubuntu%20Wallpapers/Clouds_by_Tibor_Mokanszki_O4Hkzo_7G.jpg',
    'https://ik.imagekit.io/znex04bydzr/Ubuntu%20Wallpapers/Fuwafuwa_nanbatto_san_by_amaral-dark_f2rMcZwoF.png',
    'https://ik.imagekit.io/znex04bydzr/Ubuntu%20Wallpapers/Fuwafuwa_nanbatto_san_by_amaral-light_tj5ljgv71.png',
    'https://ik.imagekit.io/znex04bydzr/Ubuntu%20Wallpapers/Monument_valley_by_orbitelambda_Siol0ngS_.jpg',
    'https://ik.imagekit.io/znex04bydzr/Ubuntu%20Wallpapers/Northan_lights_by_mizuno_xC63o3s0r.webp',
    'https://ik.imagekit.io/znex04bydzr/Ubuntu%20Wallpapers/ubuntu-wallpaper-d_dLFAFk01d.png'
]

const docApps = [
    {
        name: 'brave',
        title: 'Brave Web Browser',
        active: null,
        icon: braveIcon,
        open: null,
        component: SoftwareUpdater
    },
    {
        name: 'files',
        title: 'Files',
        active: null,
        icon: filesIcon,
        open: null,
        component: SoftwareUpdater
    },
    {
        name: 'software updater',
        title: 'Software Updater',
        active: null,
        icon: softwareUpdaterIcon,
        open: null,
        component: SoftwareUpdater
    },
    {
        name: 'settings',
        title: 'Settings',
        active: null,
        icon: Configure,
        open: null,
        component: Settings
    }
]

const settingsSidebar = [
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

const colors = [
    '#e95420', '#787859', '#657b69', '#4b8501', '#03875b', '#308280', '#0073e5', '#7764d8', '#b34cb3', '#da3450'
]

export {
    wallpapers,
    docApps,
    settingsSidebar,
    colors
}