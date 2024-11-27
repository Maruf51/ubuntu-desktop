import { NextPage } from "next";
import { StaticImageData } from "next/image";
import { IconType } from "react-icons/lib";

interface IDTypes {
    id: number,
    zIndex: number
}

export interface WindowTypes {
    comp: NextPage<IDTypes>,
    id: number,
    name: string,
    zIndex?: number
}

export interface UserStoreTypes {
    user: boolean,
    lock: boolean,
    setUser: (e: boolean) => void,
    setLock: (e: boolean) => void,
}

export interface MetaDataStoreTypes {
    volume: number,
    tempVolume: number,
    theme: 'dark' | 'light',
    power: 'Balanced' | 'Power Saver',
    wallpaper: string,
    nightLight: boolean,
    mute: () => void,
    setVolume: (e: number) => void,
    changeTheme: () => void,
    changePower: () => void,
    changeNightLight: () => void,
    setWallpaper: (e: string) => void
}

// export interface WindowTypes {
//     comp: JSX.Element,
//     id: number,
//     name: string,
//     zIndex: number
// }

export interface WindowStoreTypes {
    windows: WindowTypes[],
    activeWindow: null | number,
    addNewWindow: (newData: WindowTypes) => void,
    removeWindow: (id: number) => void,
    setActiveWindow: (id: number) => void
}

export interface SettingsSidebarTypes {
    name: string,
    icon: IconType
}

export interface DocAppTypes {
    name: string,
    title: string,
    icon: StaticImageData,
    component: NextPage<{id: number, zIndex: number}>
}